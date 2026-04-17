import { Injectable, signal } from '@angular/core';
import {
  collection, doc, getDocs, updateDoc, serverTimestamp,
  orderBy, query, limit,
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { AccountService } from './account.service';

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  score: number;
  fossilCount: number;
}

/** Firestore rules enforce ≥3s between writes; keep just above that. */
const MIN_WRITE_INTERVAL_MS = 3200;

/** Reads the top-N leaderboard and pushes the player's current score.
 *  Debounces writes so rapid collects coalesce into one Firestore write. */
@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  entries = signal<LeaderboardEntry[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  private lastWriteAt = 0;
  private pendingTimer: number | null = null;
  private pending: { score: number; fossilCount: number } | null = null;

  constructor(
    private fb: FirebaseService,
    private account: AccountService,
  ) {}

  /** Push current totals to the user's doc. Safe to call many times/sec. */
  async syncScore(score: number, fossilCount: number): Promise<void> {
    if (!this.account.ready()) return;

    const now = Date.now();
    const elapsed = now - this.lastWriteAt;
    if (elapsed >= MIN_WRITE_INTERVAL_MS) {
      this.lastWriteAt = now;
      void this.writeNow(score, fossilCount);
      return;
    }

    // Too soon — queue a trailing write with the latest values.
    this.pending = { score, fossilCount };
    if (this.pendingTimer !== null) return;
    this.pendingTimer = window.setTimeout(() => {
      this.pendingTimer = null;
      const data = this.pending;
      this.pending = null;
      if (data) {
        this.lastWriteAt = Date.now();
        void this.writeNow(data.score, data.fossilCount);
      }
    }, MIN_WRITE_INTERVAL_MS - elapsed);
  }

  private async writeNow(score: number, fossilCount: number): Promise<void> {
    const ok = await this.account.ensureUserDoc();
    if (!ok) return;
    const user = this.account.user();
    const name = this.account.displayName();
    if (!user || !name) return;

    const ref = doc(this.fb.db, 'users', user.uid);
    try {
      await updateDoc(ref, {
        displayName: name,
        score,
        fossilCount,
        updatedAt: serverTimestamp(),
      });
    } catch (e: unknown) {
      // Rule denials and transient errors are logged but not surfaced —
      // the score is still correct in the UI, just temporarily out of sync.
      console.warn('score sync failed', e);
    }
  }

  /** Pull the top-N entries for the leaderboard screen. */
  async loadTop(n = 50): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const q = query(
        collection(this.fb.db, 'users'),
        orderBy('score', 'desc'),
        limit(n),
      );
      const snap = await getDocs(q);
      this.entries.set(
        snap.docs.map(d => {
          const data = d.data();
          return {
            uid: d.id,
            displayName: (data['displayName'] as string) || '???',
            score: (data['score'] as number) || 0,
            fossilCount: (data['fossilCount'] as number) || 0,
          };
        }),
      );
    } catch (e: unknown) {
      this.error.set('Could not load leaderboard: ' + (e as Error).message);
    } finally {
      this.loading.set(false);
    }
  }
}
