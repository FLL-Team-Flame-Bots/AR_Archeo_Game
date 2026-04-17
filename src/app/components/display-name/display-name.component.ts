import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/** First-launch modal that asks for the player's leaderboard name.
 *  Emits once the name has been accepted; the parent handles persistence. */
@Component({
  selector: 'app-display-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dn-backdrop">
      <div class="dn-card">
        <div class="dn-logo">🦴</div>
        <h2>Welcome, Archaeologist</h2>
        <p class="dn-sub">Pick a name for the leaderboard. You can change it later.</p>
        <input
          class="dn-input"
          type="text"
          [(ngModel)]="name"
          maxlength="24"
          placeholder="Your name (max 24 chars)"
          (keydown.enter)="submit()"
          autofocus
        />
        <div class="dn-count">{{ name.length }}/24</div>
        <button class="dn-btn" [disabled]="!canSubmit()" (click)="submit()">
          Start Digging
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dn-backdrop {
      position: fixed; inset: 0; z-index: 300;
      background: radial-gradient(ellipse at center, #3d2a00 0%, #1a0f00 70%);
      display: flex; align-items: center; justify-content: center;
      pointer-events: all;
    }
    .dn-card {
      background: linear-gradient(145deg, #2a1a00, #3d2a00);
      border: 2px solid #8B6914; border-radius: 16px;
      padding: 24px 28px; color: #f5e6c8; max-width: 340px; width: 90vw;
      text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    }
    .dn-logo { font-size: 48px; margin-bottom: 8px; }
    h2 { font-size: 22px; color: #ffd700; margin: 0 0 6px; letter-spacing: 1px; }
    .dn-sub { font-size: 13px; color: #c8a86b; margin: 0 0 18px; line-height: 1.4; }
    .dn-input {
      width: 100%; padding: 10px 12px;
      background: rgba(0,0,0,0.35);
      border: 1px solid rgba(139,105,20,0.6); border-radius: 8px;
      color: #f5e6c8; font-size: 15px; text-align: center;
      outline: none; box-sizing: border-box;
    }
    .dn-input:focus { border-color: #ffd700; }
    .dn-count {
      font-size: 11px; color: rgba(200,168,107,0.5);
      text-align: right; margin: 2px 4px 12px;
    }
    .dn-btn {
      width: 100%; padding: 12px;
      background: linear-gradient(135deg, #8B6914, #c8a020);
      border: none; border-radius: 10px; color: #fff;
      font-size: 16px; font-weight: 700; cursor: pointer;
      letter-spacing: 0.5px;
    }
    .dn-btn:active { transform: scale(0.97); }
    .dn-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  `]
})
export class DisplayNameComponent {
  @Output() submitted = new EventEmitter<string>();
  name = '';
  canSubmit(): boolean { return this.name.trim().length > 0; }
  submit(): void {
    const clean = this.name.trim().slice(0, 24);
    if (!clean) return;
    this.submitted.emit(clean);
  }
}
