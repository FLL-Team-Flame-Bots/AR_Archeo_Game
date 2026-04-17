import { Component, EventEmitter, Output, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardService } from '../../services/leaderboard.service';
import { AccountService } from '../../services/account.service';

/** Modal that shows the top scores. Refreshes on open and on pull. */
@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lb-backdrop" (click)="close.emit()">
      <div class="lb-panel" (click)="$event.stopPropagation()">
        <div class="lb-header">
          <div>
            <div class="lb-title">🏆 Leaderboard</div>
            <div class="lb-sub">Top scores worldwide</div>
          </div>
          <button class="lb-close" (click)="close.emit()">✕</button>
        </div>

        <div class="lb-body">
          <p class="lb-empty" *ngIf="leaderboard.loading() && leaderboard.entries().length === 0">
            Loading…
          </p>
          <p class="lb-error" *ngIf="leaderboard.error() as err">{{ err }}</p>
          <p class="lb-empty" *ngIf="!leaderboard.loading() && leaderboard.entries().length === 0 && !leaderboard.error()">
            No scores yet — be the first!
          </p>

          <div
            class="lb-row"
            *ngFor="let e of leaderboard.entries(); let i = index"
            [class.self]="e.uid === currentUid()"
            [class.podium1]="i === 0"
            [class.podium2]="i === 1"
            [class.podium3]="i === 2"
          >
            <span class="lb-rank">{{ i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1) }}</span>
            <span class="lb-name">{{ e.displayName }}</span>
            <span class="lb-count">🦴 {{ e.fossilCount }}</span>
            <span class="lb-score">{{ e.score }}</span>
          </div>

          <!-- Current user outside top N -->
          <div class="lb-you" *ngIf="myEntryRank() === null && currentUid() && !leaderboard.loading()">
            <span class="lb-you-label">You are not in the top 50 yet — keep digging!</span>
          </div>
        </div>

        <button class="lb-refresh" (click)="refresh()" [disabled]="leaderboard.loading()">
          {{ leaderboard.loading() ? 'Refreshing…' : '↻ Refresh' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .lb-backdrop {
      position: fixed; inset: 0; z-index: 150;
      background: rgba(0,0,0,0.65);
      display: flex; align-items: center; justify-content: center;
      pointer-events: all;
    }
    .lb-panel {
      background: linear-gradient(145deg, #2a1a00, #3d2a00);
      border: 2px solid #8B6914; border-radius: 16px;
      color: #f5e6c8; max-width: 420px; width: 92vw;
      max-height: 82vh; display: flex; flex-direction: column;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    }
    .lb-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      padding: 14px 18px; border-bottom: 1px solid rgba(139,105,20,0.4);
    }
    .lb-title { font-size: 18px; font-weight: 700; color: #ffd700; }
    .lb-sub { font-size: 11px; color: #c8a86b; margin-top: 2px; }
    .lb-close {
      background: none; border: none; color: #f5e6c8;
      font-size: 18px; cursor: pointer; padding: 4px; line-height: 1;
    }
    .lb-body { padding: 8px 14px 14px; overflow-y: auto; flex: 1; }
    .lb-empty, .lb-error {
      text-align: center; padding: 24px 0; color: rgba(200,168,107,0.7);
    }
    .lb-error { color: #f87171; }

    .lb-row {
      display: grid;
      grid-template-columns: 46px 1fr auto auto;
      gap: 10px; align-items: center;
      padding: 8px 12px; margin-bottom: 4px; border-radius: 10px;
      background: rgba(0,0,0,0.25); border-left: 3px solid #6b7280;
      font-size: 13px;
    }
    .lb-row.podium1 { border-left-color: #ffd700; background: rgba(255,215,0,0.1); }
    .lb-row.podium2 { border-left-color: #cbd5e1; background: rgba(203,213,225,0.08); }
    .lb-row.podium3 { border-left-color: #c88b40; background: rgba(200,139,64,0.08); }
    .lb-row.self {
      border-left-color: #4ade80;
      background: rgba(74,222,128,0.15);
      box-shadow: inset 0 0 8px rgba(74,222,128,0.2);
    }
    .lb-rank { font-weight: 700; color: #c8a86b; }
    .lb-row.podium1 .lb-rank { font-size: 18px; }
    .lb-row.podium2 .lb-rank, .lb-row.podium3 .lb-rank { font-size: 16px; }
    .lb-name {
      font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .lb-count { font-size: 11px; color: #c8a86b; }
    .lb-score { font-weight: 700; color: #ffd700; min-width: 54px; text-align: right; }

    .lb-you {
      margin-top: 10px; padding: 10px; text-align: center;
      background: rgba(74,222,128,0.08); border-radius: 8px;
    }
    .lb-you-label { font-size: 12px; color: #86efac; }

    .lb-refresh {
      margin: 0 14px 14px; padding: 10px;
      background: rgba(139,105,20,0.4); border: 1px solid rgba(255,215,0,0.3);
      color: #f5e6c8; border-radius: 8px; font-size: 13px; font-weight: 600;
      cursor: pointer;
    }
    .lb-refresh:disabled { opacity: 0.5; cursor: wait; }
  `]
})
export class LeaderboardComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  account = inject(AccountService);
  leaderboard = inject(LeaderboardService);

  currentUid = computed(() => this.account.user()?.uid ?? null);
  myEntryRank = computed(() => {
    const uid = this.currentUid();
    if (!uid) return null;
    const idx = this.leaderboard.entries().findIndex(e => e.uid === uid);
    return idx >= 0 ? idx + 1 : null;
  });

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    void this.leaderboard.loadTop(50);
  }
}
