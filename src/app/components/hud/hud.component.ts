import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hud',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hud">
      <!-- Top bar -->
      <div class="top-bar">
        <div class="score-badge">
          <span class="score-label">Fossils</span>
          <span class="score-value">{{ collected }} / {{ total }}</span>
        </div>
        <div class="title">AR Archaeology</div>
        <div class="gps-badge" [class.gps-ok]="gpsActive" [class.gps-error]="!gpsActive">
          {{ gpsActive ? '📍 GPS' : '⚠️ No GPS' }}
        </div>
      </div>

      <!-- Nearby fossils list -->
      <div class="nearby-panel" *ngIf="nearbyCount > 0">
        <span class="pulse-dot"></span>
        {{ nearbyCount }} fossil{{ nearbyCount > 1 ? 's' : '' }} nearby — point your camera!
      </div>

      <!-- No GPS / AR prompt -->
      <div class="center-prompt" *ngIf="showARPrompt">
        <div class="prompt-box">
          <p>Tap to enter AR mode</p>
          <button class="ar-btn" (click)="startAR.emit()">Start AR</button>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="bottom-bar">
        <button class="icon-btn" (click)="openMap.emit()">🗺️<span>Map</span></button>
        <button class="icon-btn" (click)="openCollection.emit()">🦴<span>Collection</span></button>
        <button class="icon-btn" (click)="openLearn.emit()">📚<span>Learn</span></button>
      </div>
    </div>
  `,
  styles: [`
    .hud { position: fixed; inset: 0; pointer-events: none; display: flex; flex-direction: column; }

    .top-bar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 16px; background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%);
      pointer-events: all;
    }

    .score-badge, .gps-badge {
      background: rgba(0,0,0,0.5); border-radius: 20px; padding: 4px 10px;
      font-size: 12px; color: #f5e6c8; font-weight: 600;
    }
    .score-label { display: block; font-size: 9px; text-transform: uppercase; color: #c8a86b; }
    .score-value { display: block; font-size: 16px; font-weight: 700; }

    .gps-ok   { color: #4ade80; }
    .gps-error { color: #f87171; }

    .title { font-size: 16px; font-weight: 700; color: #f5e6c8; text-shadow: 0 1px 4px rgba(0,0,0,0.8); }

    .nearby-panel {
      margin: 8px 16px 0; background: rgba(139,105,20,0.85); color: #fff;
      padding: 8px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;
      display: flex; align-items: center; gap: 8px; pointer-events: all; align-self: flex-start;
    }

    .pulse-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #ffd700;
      animation: pulse 1.2s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.6; }
    }

    .center-prompt {
      flex: 1; display: flex; align-items: center; justify-content: center; pointer-events: all;
    }
    .prompt-box {
      background: rgba(0,0,0,0.7); border: 1px solid #8B6914; border-radius: 12px;
      padding: 20px 28px; text-align: center; color: #f5e6c8;
    }
    .prompt-box p { margin-bottom: 12px; font-size: 16px; }

    .ar-btn {
      background: linear-gradient(135deg, #8B6914, #c8a020); border: none;
      color: #fff; font-size: 16px; font-weight: 700; padding: 10px 28px;
      border-radius: 8px; cursor: pointer;
    }

    .bottom-bar {
      display: flex; justify-content: space-around; padding: 8px 0 20px;
      background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
      pointer-events: all;
    }
    .icon-btn {
      background: none; border: none; color: #f5e6c8; font-size: 22px;
      cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .icon-btn span { font-size: 10px; }
  `]
})
export class HudComponent {
  @Input() collected = 0;
  @Input() total = 0;
  @Input() nearbyCount = 0;
  @Input() gpsActive = false;
  @Input() showARPrompt = false;

  @Output() startAR = new EventEmitter<void>();
  @Output() openMap = new EventEmitter<void>();
  @Output() openCollection = new EventEmitter<void>();
  @Output() openLearn = new EventEmitter<void>();
}
