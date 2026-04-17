import { Injectable, signal, computed } from '@angular/core';
import {
  signInAnonymously, onAuthStateChanged, User,
  GoogleAuthProvider, linkWithPopup,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, updateDoc, serverTimestamp,
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';

const DISPLAY_NAME_KEY = 'aragame.displayName';

/** Manages the player's Firebase identity: automatic anonymous sign-in on
 *  first load, display-name entry + persistence, optional Google upgrade. */
@Injectable({ providedIn: 'root' })
export class AccountService {
  /** Firebase user — null until anonymous sign-in completes. */
  user = signal<User | null>(null);
  /** Chosen player name. Empty string means "prompt the user". */
  displayName = signal<string>('');
  /** True when we have both a user and a name — safe to play + sync score. */
  ready = computed(() => !!this.user() && this.displayName().length > 0);
  /** Surface sign-in / provisioning errors to the UI. */
  error = signal<string | null>(null);

  /** True once we've created the Firestore user doc for this session. */
  private userDocEnsured = false;

  constructor(private fb: FirebaseService) {
    const cached = localStorage.getItem(DISPLAY_NAME_KEY);
    if (cached) this.displayName.set(cached);

    onAuthStateChanged(this.fb.auth, async (user) => {
      this.user.set(user);
      if (!user) {
        // Fire-and-forget anonymous sign-in on first load or after logout.
        try {
          await signInAnonymously(this.fb.auth);
        } catch (e: unknown) {
          this.error.set('Sign-in failed: ' + (e as Error).message);
        }
        return;
      }
      // User is present. If no local name, try to pull one from Firestore
      // (e.g. user played before and localStorage was cleared but they still
      // have the same uid — possible after a Google link).
      if (!this.displayName()) {
        try {
          const snap = await getDoc(doc(this.fb.db, 'users', user.uid));
          const name = snap.data()?.['displayName'];
          if (typeof name === 'string' && name) {
            this.displayName.set(name);
            localStorage.setItem(DISPLAY_NAME_KEY, name);
            this.userDocEnsured = true;
          }
        } catch { /* rules may block reads pre-name; ignore */ }
      }
    });
  }

  /** First-launch flow: user picks a name, we create their leaderboard doc. */
  async setDisplayName(name: string): Promise<void> {
    const clean = name.trim().slice(0, 24);
    if (!clean) return;
    const user = this.user();
    if (!user) {
      this.error.set('Not signed in yet — try again in a moment.');
      return;
    }

    this.displayName.set(clean);
    localStorage.setItem(DISPLAY_NAME_KEY, clean);

    const ref = doc(this.fb.db, 'users', user.uid);
    try {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        await updateDoc(ref, { displayName: clean, updatedAt: serverTimestamp() });
      } else {
        await setDoc(ref, {
          displayName: clean,
          score: 0,
          fossilCount: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      this.userDocEnsured = true;
    } catch (e: unknown) {
      this.error.set('Could not save name: ' + (e as Error).message);
    }
  }

  /** Lazy provisioning used by the leaderboard service so the first score
   *  sync always has a doc waiting. */
  async ensureUserDoc(): Promise<boolean> {
    if (this.userDocEnsured) return true;
    const user = this.user();
    const name = this.displayName();
    if (!user || !name) return false;
    const ref = doc(this.fb.db, 'users', user.uid);
    try {
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          displayName: name,
          score: 0,
          fossilCount: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      this.userDocEnsured = true;
      return true;
    } catch (e: unknown) {
      this.error.set('Could not provision account: ' + (e as Error).message);
      return false;
    }
  }

  /** Upgrade the anonymous account to a real Google identity. Collection +
   *  score follow the uid, so nothing is lost. */
  async linkGoogle(): Promise<void> {
    const user = this.user();
    if (!user) return;
    try {
      await linkWithPopup(user, new GoogleAuthProvider());
    } catch (e: unknown) {
      this.error.set('Google link failed: ' + (e as Error).message);
    }
  }
}
