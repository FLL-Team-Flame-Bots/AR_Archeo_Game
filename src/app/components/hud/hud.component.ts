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
          <span class="score-label">Fossils</span>
          <span class="score-value">{{ collected }} / {{ total }}</span>
        </div>
        <div class="title">AR Archaeology</div>
        <div class="gps-badge" [class.gps-ok]="gpsActive" [class.gps-error]="!gpsActive">
          {{ gpsActive ? '📍 GPS' : '⚠️ No GPS' }}
        </div>
      </div>

      <!-- Nearby fossils hint -->
      <div class="nearby-panel" *ngIf="nearbyCount > 0">
        <span class="pulse-dot"></span>
        {{ nearbyCount }} fossil{{ nearbyCount > 1 ? 's' : '' }} nearby — use radar to locate!
      </div>

      <!-- No GPS / AR prompt -->
      <div class="center-prompt" *ngIf="showARPrompt">
        <div class="prompt-box">
          <p>Tap to enter AR mode</p>
          <button class="ar-btn" (click)="startAR.emit()">Start AR</button>
        </div>
      </div>

      <!-- ── AR Overlays (only when AR session is active) ── -->
      <ng-container *ngIf="arActive">

        <!-- Edge direction arrows for off-screen fossils -->
        <div class="edge-arrow"
             *ngFor="let f of offScreenFossils; let i = index"
             [class.arrow-left]="f.side === 'left'"
             [class.arrow-right]="f.side === 'right'"
             [class.arrow-behind]="f.side === 'behind'"
             [style.top]="(120 + i * 72) + 'px'">
          <div class="arrow-chevron">{{ f.side === 'left' ? '◀' : f.side === 'right' ? '▶' : '▼' }}</div>
          <div class="arrow-label">{{ f.name }}<br><small>{{ f.distance }}m</small></div>
        </div>

        <!-- Mini radar compass (bottom-right) -->
        <div class="radar-wrap" *ngIf="fossilDirections.length > 0">
          <div class="radar-title">RADAR</div>
          <svg class="radar-svg" viewBox="-50 -50 100 100">
            <!-- Background -->
            <circle cx="0" cy="0" r="49" fill="rgba(0,0,0,0.65)" stroke="rgba(255,215,0,0.4)" stroke-width="1"/>
            <!-- Distance rings: inner = 30 m collect zone, outer = 100 m -->
            <circle cx="0" cy="0" r="13" fill="none" stroke="rgba(74,222,128,0.4)" stroke-width="0.8" stroke-dasharray="2,2"/>
            <circle cx="0" cy="0" r="32" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="0.5"/>
            <text x="14" y="-11" font-size="5" fill="rgba(74,222,128,0.6)">30m</text>
            <!-- Cardinal lines -->
            <line x1="0" y1="-48" x2="0" y2="48" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
            <line x1="-48" y1="0" x2="48" y2="0" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
            <!-- Forward arrow (north = ahead) -->
            <polygon points="0,-45 3,-36 -3,-36" fill="#4ade80" opacity="0.9"/>
            <text x="0" y="-40" text-anchor="middle" font-size="6" fill="#4ade80" dy="-2">N</text>
            <!-- Fossil dots -->
            <ng-container *ngFor="let dot of radarDots">
              <circle [attr.cx]="dot.x" [attr.cy]="dot.y" r="5" fill="#ffd700" opacity="0.9"/>
              <text [attr.x]="dot.x" [attr.y]="dot.y - 7"
                    text-anchor="middle" font-size="7" fill="#ffd700">{{ dot.distance }}m</text>
            </ng-container>
            <!-- Player dot -->
            <circle cx="0" cy="0" r="3" fill="white"/>
          </svg>
        </div>

      </ng-container>

      <!-- Version stamp -->
      <div class="version-stamp">v1.0.0</div>

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

    /* Edge direction arrows */
    .edge-arrow {
      position: fixed; display: flex; align-items: center; gap: 6px;
      pointer-events: none;
    }
    .arrow-left  { left: 8px; flex-direction: row; }
    .arrow-right { right: 8px; flex-direction: row-reverse; }
    .arrow-behind { bottom: 90px; left: 50%; transform: translateX(-50%); flex-direction: column; align-items: center; }

    .arrow-chevron {
      width: 32px; height: 32px; background: rgba(255,215,0,0.85);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 16px; color: #1a0f00; font-weight: 900;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
      animation: arrowPulse 1.5s ease-in-out infinite;
    }
    @keyframes arrowPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }
    .arrow-label {
      background: rgba(0,0,0,0.7); border: 1px solid rgba(255,215,0,0.4);
      border-radius: 8px; padding: 4px 8px; font-size: 11px; color: #f5e6c8;
      line-height: 1.4; max-width: 80px;
    }
    .arrow-label small { color: #ffd700; font-weight: 700; }

    /* Mini radar */
    .radar-wrap {
      position: fixed; bottom: 90px; right: 12px;
      display: flex; flex-direction: column; align-items: center; gap: 2px;
      pointer-events: none;
    }
    .radar-title {
      font-size: 9px; color: rgba(255,215,0,0.7); letter-spacing: 2px; font-weight: 700;
    }
    .radar-svg { width: 110px; height: 110px; }

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
      font-size: 10px; color: rgba(255,255,255,0.35);
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

  @Output() startAR = new EventEmitter<void>();
  @Output() openMap = new EventEmitter<void>();
  @Output() openCollection = new EventEmitter<void>();
  @Output() openLearn = new EventEmitter<void>();

  /** Fossils positioned on the mini radar SVG (max 200 m shown). */
  get radarDots(): Array<{ x: number; y: number; distance: number }> {
    const MAX_DIST = 200;
    const MAX_R = 44;
    return this.fossilDirections.map(f => {
      const r = Math.min(MAX_R, (f.distance / MAX_DIST) * MAX_R);
      const rad = (f.relAngle * Math.PI) / 180;
      return {
        x: +( r * Math.sin(rad)).toFixed(1),
        y: +(-r * Math.cos(rad)).toFixed(1),
        distance: f.distance,
      };
    });
  }

  /** Fossils outside the camera's horizontal field of view (~±50°). */
  get offScreenFossils(): Array<FossilDirection & { side: 'left' | 'right' | 'behind' }> {
    return this.fossilDirections
      .map(f => {
        const a = f.relAngle > 180 ? f.relAngle - 360 : f.relAngle; // -180..+180
        const side: 'left' | 'right' | 'behind' =
          a < -50 ? 'left' : a > 50 ? 'right' : 'behind';
        return { ...f, normAngle: a, side };
      })
      .filter(f => Math.abs(f.normAngle) > 50 || f.side === 'behind');
  }
}
