import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FossilDirection {
  id: string;
  name: string;
  relAngle: number;   // 0 = ahead, 90 = right, 180 = behind, 270 = left
  distance: number;   // metres
}

@Component({
  selector: 'app-hud',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hud">
      <!-- Top bar -->
      <div class="top-bar">
        <div class="score-badge">
          <span class="score-label">Collected</span>
          <span class="score-value">{{ collected }}</span>
        </div>
        <div class="title">AR Archaeology</div>
        <div class="gps-badge" [class.gps-ok]="gpsActive" [class.gps-error]="!gpsActive">
          {{ gpsActive ? '📍 GPS' : '⚠️ No GPS' }}
        </div>
      </div>

      <!-- Nearby fossils hint -->
      <div class="nearby-panel" *ngIf="nearbyCount > 0">
        <span class="pulse-dot"></span>
        {{ nearbyCount }} fossil{{ nearbyCount > 1 ? 's' : '' }} nearby — tap screen to collect!
      </div>

      <!-- No GPS / AR prompt -->
      <div class="center-prompt" *ngIf="showARPrompt">
        <div class="prompt-box">
          <p>Tap to enter AR mode</p>
          <button class="ar-btn" (click)="startAR.emit()">Start AR</button>
        </div>
      </div>

      <!-- ── AR Overlays ── -->
      <ng-container *ngIf="arActive">

        <!-- Edge dots — one per off-screen fossil, size = closeness -->
        <div class="edge-dot"
             *ngFor="let f of offScreenFossils; trackBy: trackById"
             [ngStyle]="f.style"
             [style.width.px]="f.size"
             [style.height.px]="f.size">
        </div>

        <!-- Mini radar (bottom-right) -->
        <div class="radar-wrap" *ngIf="fossilDirections.length > 0">
          <div class="radar-title">RADAR</div>
          <svg class="radar-svg" viewBox="-50 -50 100 100">
            <circle cx="0" cy="0" r="49" fill="rgba(0,0,0,0.6)" stroke="rgba(255,215,0,0.35)" stroke-width="1"/>
            <!-- 5 m ring, 10 m edge ring -->
            <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(74,222,128,0.3)" stroke-width="0.8" stroke-dasharray="2,2"/>
            <circle cx="0" cy="0" r="44" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
            <line x1="0" y1="-48" x2="0" y2="48" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
            <line x1="-48" y1="0" x2="48" y2="0" stroke="rgba(255,255,255,0.07)" stroke-width="0.5"/>
            <!-- Forward indicator -->
            <polygon points="0,-45 2.5,-37 -2.5,-37" fill="#4ade80" opacity="0.85"/>
            <!-- Fossil dots — size encodes closeness, trackBy keeps transitions smooth -->
            <circle
              *ngFor="let dot of radarDots; trackBy: trackById"
              class="fossil-dot"
              [attr.cx]="dot.x"
              [attr.cy]="dot.y"
              [attr.r]="dot.r"
              fill="#ffd700"/>
            <!-- Player -->
            <circle cx="0" cy="0" r="2.5" fill="white"/>
          </svg>
        </div>

      </ng-container>

      <!-- Version stamp -->
      <div class="version-stamp">v2.1.7</div>

      <!-- Bottom bar -->
      <div class="bottom-bar">
        <button class="icon-btn" (click)="openMap.emit()">🗺️<span>Map</span></button>
        <button class="icon-btn" (click)="openCollection.emit()">🦴<span>Collection</span></button>
        <button class="icon-btn" (click)="openLearn.emit()">📚<span>Learn</span></button>
      </div>
    </div>
  `,
  styles: [`
    .hud { position: fixed; inset: 0; pointer-events: none; display: flex; flex-direction: column; z-index: 20; }

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
    .gps-ok    { color: #4ade80; }
    .gps-error { color: #f87171; }
    .title { font-size: 16px; font-weight: 700; color: #f5e6c8; text-shadow: 0 1px 4px rgba(0,0,0,0.8); }

    .nearby-panel {
      margin: 8px 16px 0; background: rgba(139,105,20,0.85); color: #fff;
      padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
      display: flex; align-items: center; gap: 8px; pointer-events: all; align-self: flex-start;
    }
    .pulse-dot {
      width: 7px; height: 7px; border-radius: 50%; background: #ffd700;
      animation: pulse 1.2s infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%       { transform: scale(1.4); opacity: 0.6; }
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

    /* Edge dots — pulsing circles, no text, size = closeness */
    .edge-dot {
      position: fixed;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #ffe066, #e67e00);
      box-shadow: 0 0 10px rgba(255,200,0,0.55);
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: edgePulse 1.8s ease-in-out infinite;
      transition: top 0.45s ease, left 0.45s ease,
                  right 0.45s ease, bottom 0.45s ease,
                  width 0.45s ease, height 0.45s ease;
    }
    @keyframes edgePulse {
      0%, 100% { opacity: 0.85; transform: translate(-50%, -50%) scale(1);   }
      50%       { opacity: 1;    transform: translate(-50%, -50%) scale(1.18); }
    }

    /* Radar */
    .radar-wrap {
      position: fixed; bottom: 90px; right: 12px;
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      pointer-events: none;
    }
    .radar-title { font-size: 9px; color: rgba(255,215,0,0.6); letter-spacing: 2px; font-weight: 700; }
    .radar-svg   { width: 90px; height: 90px; }

    /* SVG dot transitions — Chrome supports cx/cy/r via CSS */
    .fossil-dot {
      opacity: 0.9;
      transition: cx 0.4s ease, cy 0.4s ease, r 0.35s ease;
    }

    /* Bottom bar */
    .bottom-bar {
      position: fixed; bottom: 0; left: 0; right: 0;
      display: flex; justify-content: space-around; padding: 8px 0 20px;
      background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%);
      pointer-events: all;
    }
    .icon-btn {
      background: none; border: none; color: #f5e6c8; font-size: 22px;
      cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .icon-btn span { font-size: 10px; }

    .version-stamp {
      position: fixed; bottom: 72px; right: 8px;
      font-size: 10px; color: rgba(255,255,255,0.3);
      pointer-events: none; letter-spacing: 0.5px;
    }
  `]
})
export class HudComponent {
  @Input() collected = 0;
  @Input() total = 0;
  @Input() nearbyCount = 0;
  @Input() gpsActive = false;
  @Input() showARPrompt = false;
  @Input() arActive = false;
  @Input() fossilDirections: FossilDirection[] = [];

  @Output() startAR     = new EventEmitter<void>();
  @Output() openMap     = new EventEmitter<void>();
  @Output() openCollection = new EventEmitter<void>();
  @Output() openLearn   = new EventEmitter<void>();

  trackById(_: number, f: { id: string }) { return f.id; }

  /** Radar dots — only fossils within 10 m, max 10, size encodes closeness. */
  get radarDots(): Array<{ id: string; x: number; y: number; r: number }> {
    const MAX_DIST = 10, MAX_R = 44;
    return this.fossilDirections.filter(f => f.distance <= 10).slice(0, 10).map(f => {
      const dist  = Math.min(f.distance, MAX_DIST);
      const pos   = (dist / MAX_DIST) * MAX_R;
      const rad   = (f.relAngle * Math.PI) / 180;
      const dotR  = 1 + (1 - dist / MAX_DIST) * 2.5;  // 1 (far) → 3.5 (close)
      return {
        id: f.id,
        x:  +(pos * Math.sin(rad)).toFixed(2),
        y:  +(-pos * Math.cos(rad)).toFixed(2),
        r:  +dotR.toFixed(2),
      };
    });
  }

  /** Edge dots for fossils within 10 m that are outside the camera FOV (~±50°). */
  get offScreenFossils(): Array<{ id: string; size: number; style: Record<string, string> }> {
    return this.fossilDirections
      .filter(f => f.distance <= 10)
      .map(f => {
        const norm = f.relAngle > 180 ? f.relAngle - 360 : f.relAngle; // −180..+180
        if (Math.abs(norm) <= 50) return null;

        // Dot size: 12 px (200 m away) → 34 px (right next to you)
        const size = Math.round(12 + (1 - Math.min(f.distance, 200) / 200) * 22);

        // Project bearing onto screen edge
        const rad  = (f.relAngle * Math.PI) / 180;
        const sx   = Math.sin(rad);             // +right / −left
        const sy   = -Math.cos(rad);            // −ahead (top) / +behind (bottom)
        const absX = Math.abs(sx), absY = Math.abs(sy);

        let style: Record<string, string>;
        if (absX * 1.8 > absY) {               // hits left or right edge
          const top = Math.max(12, Math.min(88, 50 + (sy / absX) * 30)) + '%';
          style = sx > 0
            ? { right: '14px', top }
            : { left:  '14px', top };
        } else {                                // hits top or bottom edge
          const left = Math.max(12, Math.min(88, 50 + (sx / absY) * 38)) + '%';
          style = sy > 0
            ? { bottom: '85px', left }
            : { top:    '70px', left };
        }

        return { id: f.id, size, style };
      })
      .filter((f): f is NonNullable<typeof f> => f !== null);
  }
}
