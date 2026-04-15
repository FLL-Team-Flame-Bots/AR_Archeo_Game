import {
  Component, ElementRef, ViewChild, OnInit, OnDestroy, effect, computed, signal, untracked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { ArService } from '../../services/ar.service';
import { GpsService } from '../../services/gps.service';
import { FossilLocation } from '../../data/fossil.model';
import { FossilCardComponent } from '../fossil-card/fossil-card.component';
import { HudComponent } from '../hud/hud.component';
import { OrientationService, DEVICE_HEIGHT_M } from '../../services/orientation.service';
import fossilTemplates from '../../data/fossils.json';

/** Grid cell size (m). Each cell ever produces at most one fossil. */
const AREA_CELL_M = 10;
/** Cells in each direction around the player that stay populated. A value
 *  of 1 means a 3×3 ring of cells is always alive around the player. */
const ACTIVE_RADIUS_CELLS = 1;
/** Player must be within this many metres of a fossil's GPS location to
 *  open its card. Stops you grabbing fossils from across the field. */
const COLLECT_RADIUS_M = 5;

/** Per-spawn rarity probabilities. Sum to 1. */
const RARITY_WEIGHTS: Record<string, number> = {
  chroma:    0.0001,  // 0.01%
  legendary: 0.01,    // 1%
  rare:      0.25,    // 25%
  common:    0.7399,  // ~74%
};
/** Score awarded when a fossil of each rarity is collected. */
const RARITY_POINTS: Record<string, number> = {
  common:    1,
  rare:      5,
  legendary: 50,
  chroma:    1000,
};

@Component({
  selector: 'app-ar-view',
  standalone: true,
  imports: [CommonModule, FossilCardComponent, HudComponent],
  template: `
    <div class="ar-container">

      <!-- Splash screen -->
      <div class="no-ar-bg" *ngIf="!arService.active()">
        <div class="no-ar-content">
          <div class="logo">🦴</div>
          <h1>ARArcheoGame</h1>
          <div class="status-row">
            <span [class.ok]="!!gps.playerPosition()" [class.waiting]="!gps.playerPosition()">
              {{ gps.playerPosition() ? '📍 GPS active' : '⏳ Waiting for GPS...' }}
            </span>
          </div>
          <div class="fossil-count">{{ allFossils().length }} fossils hidden nearby</div>

          <button class="start-ar-btn" (click)="onStartAR()" [disabled]="arService.loading()">
            {{ arService.loading() ? '⏳ Starting...' : '📷 Start AR' }}
          </button>

          <p class="hint" *ngIf="!arService.supported()">
            ⚠️ AR not detected — needs Chrome on Android with ARCore
          </p>
          <p class="hint error" *ngIf="arService.error()">{{ arService.error() }}</p>
        </div>
      </div>

      <!-- XR canvas — must stay OUTSIDE the dom-overlay root -->
      <canvas #arCanvas class="ar-canvas"></canvas>

      <!-- dom-overlay root: transparent, no background -->
      <div #arOverlay class="ar-overlay">
        <app-hud
          [collected]="collectedIds.size"
          [total]="(fossilTemplates).length"
          [nearbyCount]="gps.nearbyFossils().length"
          [gpsActive]="!!gps.playerPosition()"
          [showARPrompt]="!arService.active() && arService.supported()"
          [arActive]="arService.active()"
          [fossilDirections]="fossilDirections()"
          (startAR)="onStartAR()"
          (openMap)="showMap = true"
          (openCollection)="showCollection.set(true)"
          (openLearn)="showLearn = true"
        />

        <!-- Fossil card popup -->
        <div class="overlay-backdrop" *ngIf="selectedFossil()" (click)="selectedFossil.set(null)">
          <div class="overlay-center" (click)="$event.stopPropagation()">
            <app-fossil-card
              [fossil]="selectedFossil()!"
              (close)="selectedFossil.set(null)"
              (collect)="onCollect($event)"
            />
          </div>
        </div>

        <!-- GPS error toast -->
        <div class="gps-error-toast" *ngIf="gps.error()">{{ gps.error() }}</div>

        <!-- "Too far to collect" toast -->
        <div class="too-far-toast" *ngIf="tooFarToast()">{{ tooFarToast() }}</div>

        <!-- Collection screen -->
        <div class="overlay-backdrop" *ngIf="showCollection()" (click)="showCollection.set(false)">
          <div class="collection-panel" (click)="$event.stopPropagation()">
            <div class="collection-header">
              <div>
                <div class="collection-title">Your Collection</div>
                <div class="collection-score">Score: <strong>{{ score() }}</strong></div>
              </div>
              <button class="close-btn" (click)="showCollection.set(false)">✕</button>
            </div>
            <div class="collection-body">
              <p class="collection-empty" *ngIf="collectionGrouped.length === 0">
                No fossils yet — go find some!
              </p>
              <div class="collection-item" *ngFor="let g of collectionGrouped"
                   [class]="'rarity-' + g.rarity">
                <span class="collection-emoji">{{ g.emoji }}</span>
                <div class="collection-meta">
                  <div class="collection-name">{{ g.name }}</div>
                  <div class="collection-rarity">{{ g.rarity }} · {{ pointsFor(g.rarity) }} pt</div>
                </div>
                <span class="collection-count" *ngIf="g.count > 1">×{{ g.count }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Celebration overlay (legendary / chroma) -->
        <div class="celebration" *ngIf="celebrating() as f"
             [class.celebration-chroma]="f.rarity === 'chroma'">
          <div class="celebration-confetti">
            <span *ngFor="let i of confettiPieces">{{ confettiEmoji(f.rarity) }}</span>
          </div>
          <div class="celebration-text">
            <div class="celebration-banner">
              {{ f.rarity === 'chroma' ? '⟡ CHROMA ⟡' : 'LEGENDARY!' }}
            </div>
            <div class="celebration-name">{{ f.name }}</div>
            <div class="celebration-points">+{{ pointsFor(f.rarity) }} points</div>
          </div>
        </div>

        <!-- Floor-detection debug readout (only while AR is active) -->
        <div class="floor-debug" *ngIf="arService.active()">
          <div class="floor-debug-row">
            <span class="floor-debug-label">Floor:</span>
            <span class="floor-debug-value"
                  [class.ok]="arService.groundYSignal() !== null"
                  [class.waiting]="arService.groundYSignal() === null">
              {{ arService.groundYSignal() === null
                  ? 'searching…'
                  : 'y=' + arService.groundYSignal()!.toFixed(2) + 'm' }}
            </span>
          </div>
          <div class="floor-debug-row">
            <span class="floor-debug-label">hits:</span>
            <span class="floor-debug-value">{{ arService.hitCount() }}</span>
            <span class="floor-debug-label">rej:</span>
            <span class="floor-debug-value">{{ arService.rejectedCount() }}</span>
          </div>
          <div class="floor-debug-row" *ngIf="arService.lastReject()">
            <span class="floor-debug-label">last:</span>
            <span class="floor-debug-value">{{ arService.lastReject() }}</span>
          </div>
          <button class="grid-toggle" (click)="toggleGrid()"
                  [class.on]="showGrid()">
            Grid: {{ showGrid() ? 'ON' : 'OFF' }}
          </button>
          <div class="debug-row">
            <button class="debug-btn legendary" (click)="debugCollect('legendary')">+Legendary</button>
            <button class="debug-btn chroma"    (click)="debugCollect('chroma')">+Chroma</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ar-container { position: fixed; inset: 0; background: #1a0f00; }
    .ar-canvas    { position: fixed; inset: 0; width: 100%; height: 100%; display: block; }
    .ar-overlay   { position: fixed; inset: 0; pointer-events: none; }

    .no-ar-bg {
      position: fixed; inset: 0; z-index: 10;
      background: radial-gradient(ellipse at center, #3d2a00 0%, #1a0f00 70%);
      display: flex; align-items: center; justify-content: center;
    }
    .no-ar-content { text-align: center; color: #f5e6c8; padding: 24px; }
    .logo { font-size: 64px; margin-bottom: 12px; }
    h1 { font-size: 28px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px; color: #ffd700; }
    .status-row { margin-bottom: 12px; }
    .status-row .ok      { color: #4ade80; font-weight: 600; }
    .status-row .waiting { color: #facc15; font-weight: 600; }
    .fossil-count {
      display: inline-block; background: rgba(139,105,20,0.3);
      border: 1px solid #8B6914; border-radius: 20px;
      padding: 6px 16px; font-size: 13px; color: #f5e6c8; margin-bottom: 24px;
    }
    .start-ar-btn {
      display: block; width: 200px; margin: 0 auto 16px;
      padding: 14px; background: linear-gradient(135deg, #8B6914, #c8a020);
      border: none; border-radius: 12px; color: #fff;
      font-size: 18px; font-weight: 700; cursor: pointer;
      box-shadow: 0 4px 20px rgba(139,105,20,0.5);
    }
    .start-ar-btn:active   { transform: scale(0.96); }
    .start-ar-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
    .hint { font-size: 12px; color: #facc15; margin-top: 8px; padding: 0 20px; }
    .hint.error { color: #f87171; background: rgba(200,0,0,0.2); border-radius: 8px; padding: 8px 16px; }

    .overlay-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      display: flex; align-items: center; justify-content: center; z-index: 100;
      pointer-events: all;
    }
    .gps-error-toast {
      position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
      background: rgba(200,80,0,0.9); color: #fff; padding: 8px 16px;
      border-radius: 20px; font-size: 12px; pointer-events: none;
    }
    .too-far-toast {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.85); border: 1px solid #ffd700; color: #ffd700;
      padding: 12px 20px; border-radius: 24px; font-size: 14px; font-weight: 700;
      pointer-events: none; z-index: 50;
      animation: toastIn 0.18s ease-out;
    }
    @keyframes toastIn { from { opacity: 0; transform: translate(-50%, -45%); } to { opacity: 1; transform: translate(-50%, -50%); } }

    /* Collection panel */
    .collection-panel {
      background: linear-gradient(145deg, #2a1a00, #3d2a00);
      border: 2px solid #8B6914; border-radius: 16px;
      color: #f5e6c8; max-width: 380px; width: 92vw;
      max-height: 80vh; display: flex; flex-direction: column;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    }
    .collection-header {
      display: flex; justify-content: space-between; align-items: flex-start;
      padding: 14px 18px; border-bottom: 1px solid rgba(139,105,20,0.4);
    }
    .collection-title { font-size: 18px; font-weight: 700; color: #ffd700; }
    .collection-score { font-size: 13px; color: #c8a86b; margin-top: 2px; }
    .collection-score strong { color: #ffd700; font-size: 16px; margin-left: 4px; }
    .collection-body { padding: 12px 14px 18px; overflow-y: auto; }
    .collection-empty { text-align: center; color: rgba(200,168,107,0.6); padding: 24px 0; }
    .collection-item {
      display: flex; align-items: center; gap: 12px;
      padding: 8px 12px; margin-bottom: 6px; border-radius: 10px;
      background: rgba(0,0,0,0.25); border-left: 3px solid #6b7280;
    }
    .collection-item.rarity-rare      { border-left-color: #a855f7; }
    .collection-item.rarity-legendary { border-left-color: #ffd700; background: rgba(255,215,0,0.1); }
    .collection-item.rarity-chroma {
      border-left: 3px solid transparent;
      background:
        rgba(0,0,0,0.4) padding-box,
        linear-gradient(90deg, #ff0040, #ffe000, #00e060, #00c0ff, #ff00d0) border-box;
      animation: chromaSpin 6s linear infinite;
    }
    .collection-emoji { font-size: 26px; }
    .collection-meta { flex: 1; }
    .collection-name { font-size: 14px; font-weight: 600; }
    .collection-rarity { font-size: 11px; color: #c8a86b; text-transform: capitalize; }
    .collection-count {
      font-size: 13px; font-weight: 700; color: #ffd700;
      background: rgba(255,215,0,0.15); padding: 3px 8px; border-radius: 10px;
    }
    .close-btn {
      background: none; border: none; color: #f5e6c8;
      font-size: 18px; cursor: pointer; padding: 4px; line-height: 1;
    }
    @keyframes chromaSpin { to { filter: hue-rotate(360deg); } }

    /* Celebration overlay */
    .celebration {
      position: fixed; inset: 0; z-index: 200;
      pointer-events: none; overflow: hidden;
      background: radial-gradient(circle at center, rgba(255,215,0,0.25), transparent 60%);
      animation: celebFade 2.6s ease-out forwards;
    }
    .celebration.celebration-chroma {
      background: radial-gradient(circle at center,
        rgba(255,0,150,0.35), rgba(0,200,255,0.25), transparent 70%);
      animation: celebFadeChroma 4.4s ease-out forwards;
    }
    @keyframes celebFade {
      0%, 70% { opacity: 1; } 100% { opacity: 0; }
    }
    @keyframes celebFadeChroma {
      0%, 80% { opacity: 1; } 100% { opacity: 0; }
    }
    .celebration-confetti { position: absolute; inset: 0; }
    .celebration-confetti span {
      position: absolute; top: 50%; left: 50%;
      font-size: 28px; opacity: 0;
      animation: confettiFly 1.6s ease-out forwards;
    }
    .celebration-confetti span:nth-child(1)  { --a:   0deg; animation-delay: 0s; }
    .celebration-confetti span:nth-child(2)  { --a:  15deg; animation-delay: 0.02s; }
    .celebration-confetti span:nth-child(3)  { --a:  30deg; animation-delay: 0.04s; }
    .celebration-confetti span:nth-child(4)  { --a:  45deg; animation-delay: 0.06s; }
    .celebration-confetti span:nth-child(5)  { --a:  60deg; animation-delay: 0.08s; }
    .celebration-confetti span:nth-child(6)  { --a:  75deg; animation-delay: 0.10s; }
    .celebration-confetti span:nth-child(7)  { --a:  90deg; animation-delay: 0.12s; }
    .celebration-confetti span:nth-child(8)  { --a: 105deg; animation-delay: 0.14s; }
    .celebration-confetti span:nth-child(9)  { --a: 120deg; animation-delay: 0.16s; }
    .celebration-confetti span:nth-child(10) { --a: 135deg; animation-delay: 0.18s; }
    .celebration-confetti span:nth-child(11) { --a: 150deg; animation-delay: 0.20s; }
    .celebration-confetti span:nth-child(12) { --a: 165deg; animation-delay: 0.22s; }
    .celebration-confetti span:nth-child(13) { --a: 180deg; animation-delay: 0.24s; }
    .celebration-confetti span:nth-child(14) { --a: 195deg; animation-delay: 0.26s; }
    .celebration-confetti span:nth-child(15) { --a: 210deg; animation-delay: 0.28s; }
    .celebration-confetti span:nth-child(16) { --a: 225deg; animation-delay: 0.30s; }
    .celebration-confetti span:nth-child(17) { --a: 240deg; animation-delay: 0.32s; }
    .celebration-confetti span:nth-child(18) { --a: 255deg; animation-delay: 0.34s; }
    .celebration-confetti span:nth-child(19) { --a: 270deg; animation-delay: 0.36s; }
    .celebration-confetti span:nth-child(20) { --a: 285deg; animation-delay: 0.38s; }
    .celebration-confetti span:nth-child(21) { --a: 300deg; animation-delay: 0.40s; }
    .celebration-confetti span:nth-child(22) { --a: 315deg; animation-delay: 0.42s; }
    .celebration-confetti span:nth-child(23) { --a: 330deg; animation-delay: 0.44s; }
    .celebration-confetti span:nth-child(24) { --a: 345deg; animation-delay: 0.46s; }
    @keyframes confettiFly {
      0%   { opacity: 0; transform: translate(-50%, -50%) rotate(var(--a)) translateY(0)    rotate(0); }
      15%  { opacity: 1; }
      100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--a)) translateY(-260px) rotate(720deg); }
    }
    .celebration-text {
      position: absolute; top: 38%; left: 50%; transform: translate(-50%, -50%);
      text-align: center; color: #fff;
      text-shadow: 0 0 18px rgba(255,215,0,0.8), 0 2px 8px rgba(0,0,0,0.7);
      animation: celebPop 0.6s cubic-bezier(.2,1.6,.4,1) forwards;
    }
    .celebration-banner {
      font-size: 38px; font-weight: 900; letter-spacing: 4px;
      color: #ffd700;
    }
    .celebration.celebration-chroma .celebration-banner {
      background: linear-gradient(90deg, #ff0040, #ffe000, #00e060, #00c0ff, #ff00d0);
      -webkit-background-clip: text; background-clip: text;
      color: transparent;
      animation: chromaSpin 1.6s linear infinite;
    }
    .celebration-name { font-size: 18px; margin-top: 6px; font-weight: 700; }
    .celebration-points { font-size: 16px; margin-top: 4px; color: #ffe066; font-weight: 700; }
    @keyframes celebPop {
      0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    .floor-debug {
      position: fixed; top: 58px; left: 12px;
      background: rgba(0,0,0,0.6); color: #f5e6c8;
      border: 1px solid rgba(255,215,0,0.3);
      border-radius: 8px; padding: 6px 10px;
      font-size: 11px; font-family: monospace; line-height: 1.4;
      pointer-events: none; z-index: 30;
    }
    .floor-debug-row { display: flex; gap: 6px; }
    .floor-debug-label { color: rgba(200,168,107,0.7); }
    .floor-debug-value { color: #f5e6c8; }
    .floor-debug-value.ok      { color: #4ade80; font-weight: 600; }
    .floor-debug-value.waiting { color: #facc15; }
    .grid-toggle {
      margin-top: 4px; padding: 3px 8px;
      background: rgba(0,0,0,0.5); border: 1px solid rgba(255,215,0,0.4);
      color: #f5e6c8; font-family: monospace; font-size: 11px;
      border-radius: 4px; cursor: pointer; pointer-events: all;
    }
    .grid-toggle.on { background: rgba(255,215,0,0.25); color: #ffd700; }
    .debug-row { display: flex; gap: 4px; margin-top: 4px; }
    .debug-btn {
      flex: 1; padding: 3px 6px; border: none; border-radius: 4px;
      font-family: monospace; font-size: 10px; font-weight: 700;
      cursor: pointer; pointer-events: all; color: #000;
    }
    .debug-btn.legendary { background: #ffd700; }
    .debug-btn.chroma {
      background: linear-gradient(90deg, #ff0040, #ffe000, #00e060, #00c0ff, #ff00d0);
      color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
  `]
})
export class ArViewComponent implements OnInit, OnDestroy {
  @ViewChild('arCanvas',  { static: true }) canvasRef!:  ElementRef<HTMLCanvasElement>;
  @ViewChild('arOverlay', { static: true }) overlayRef!: ElementRef<HTMLDivElement>;

  readonly fossilTemplates = fossilTemplates as FossilLocation[];

  /** Live pool of active (uncollected) fossils. Starts empty; filled on first GPS fix. */
  allFossils = signal<FossilLocation[]>([]);
  collectedIds = new Set<string>();
  /** Every fossil the player has collected, in collection order. */
  collectedFossils = signal<FossilLocation[]>([]);
  /** Total points earned. Each rarity contributes RARITY_POINTS. */
  score = computed(() =>
    this.collectedFossils().reduce((s, f) => s + (RARITY_POINTS[f.rarity] ?? 0), 0)
  );
  selectedFossil = signal<FossilLocation | null>(null);
  /** Set briefly after collecting a legendary or chroma fossil — drives the
   *  celebration overlay. */
  celebrating = signal<FossilLocation | null>(null);
  private celebrateTimeout = 0;
  showMap = false;
  showCollection = signal(false);
  showLearn = false;

  private spawnCounter = 0;
  /** GPS coords captured at AR session start. Fossil world-space positions
   *  are computed as offsets from this origin, NOT from the live player
   *  GPS. WebXR SLAM tracks player motion through world space on its own,
   *  so re-placing fossils on every GPS update double-counts motion and
   *  makes fossils snap whenever a noisy fix arrives. With a fixed origin,
   *  each fossil is placed once and then WebXR keeps it stable as the
   *  player walks through it. */
  private originPos: { lat: number; lng: number } | null = null;
  /** Ids already placed in the AR scene this session. Placement is
   *  one-shot per fossil to keep it anchored under GPS jitter. */
  private placedFossilIds = new Set<string>();
  /** Per-cell state. Each cell rolls 0/1/2 fossils on first visit and
   *  remembers them; collected ones are tracked separately so they don't
   *  respawn while the rest of the cell still might. */
  private cellStates = new Map<string, { fossils: FossilLocation[]; collected: Set<string> }>();
  /** Cached cell key the player was in last time we regenerated the AR grid overlay. */
  private lastGridKey = '';
  /** "Walk closer — Xm away" toast shown when the player taps a far fossil. */
  tooFarToast = signal<string | null>(null);
  private tooFarTimeout = 0;
  /** When false, the AR grid overlay is hidden. */
  showGrid = signal(true);

  toggleGrid(): void {
    const next = !this.showGrid();
    this.showGrid.set(next);
    if (!next) {
      this.arService.clearGrid();
      this.lastGridKey = '';
    } else {
      const pos = this.gps.playerPosition();
      if (pos) this.refreshGridOverlay(pos);
    }
  }

  /** Bearing + distance to every active uncollected fossil, for the HUD radar/arrows. */
  fossilDirections = computed(() => {
    const all     = this.allFossils();
    const heading = this.orientation.orientation()?.heading ?? 0;
    if (!this.gps.playerPosition()) return [];

    return all
      .filter(f => !this.collectedIds.has(f.id) && !f.discovered)
      .map(f => {
        const bearing  = this.gps.bearingTo(f);
        const relAngle = ((bearing - heading) % 360 + 360) % 360;
        return { id: f.id, name: f.name, relAngle, distance: Math.round(this.gps.distanceTo(f)) };
      })
      .sort((a, b) => a.distance - b.distance);
  });

  constructor(
    public arService: ArService,
    public gps: GpsService,
    public orientation: OrientationService
  ) {
    // On every GPS update: despawn fossils >100 m away, spawn to maintain density
    effect(() => {
      const pos = this.gps.playerPosition();
      if (!pos) return;
      untracked(() => this.replenishFossils(pos));
    });

    // Keep AR markers in sync with nearby fossils
    effect(() => {
      const nearby = this.gps.nearbyFossils();
      this.syncARMarkers(nearby);
    });

    // Redraw the AR grid overlay whenever the player crosses into a new cell.
    effect(() => {
      const pos = this.gps.playerPosition();
      const active = this.arService.active();
      const on = this.showGrid();
      if (!pos || !active || !on) return;
      untracked(() => this.refreshGridOverlay(pos));
    });
  }

  /** Builds a 5×5 ring of cells around the player's current cell and pushes
   *  it to the AR scene as ground-level wireframe lines. */
  private refreshGridOverlay(pos: { lat: number; lng: number }): void {
    const step  = AREA_CELL_M / 111_000;
    const cLat  = Math.floor(pos.lat / step);
    const cLng  = Math.floor(pos.lng / step);
    const key   = `${cLat}:${cLng}`;
    if (key === this.lastGridKey) return;
    this.lastGridKey = key;

    const RING = 2; // cells on each side → (2*2+1)² = 25 cells
    // Use the locked-in heading reference so the grid sits in the same
    // world-XR frame as the fossils (which also use the reference).
    const headingRef = this.orientation.headingReference()
      ?? this.orientation.orientation()?.heading ?? 0;
    const segs: { x1: number; z1: number; x2: number; z2: number }[] = [];

    const project = (lat: number, lng: number): { x: number; z: number } => {
      const dN = (lat - pos.lat) * 111_000;
      const dE = (lng - pos.lng) * 111_000 * Math.cos(pos.lat * Math.PI / 180);
      const headRad = (headingRef * Math.PI) / 180;
      const x = dE * Math.cos(headRad) - dN * Math.sin(headRad);
      const z = -(dE * Math.sin(headRad) + dN * Math.cos(headRad));
      return { x, z };
    };

    for (let dy = -RING; dy <= RING; dy++) {
      for (let dx = -RING; dx <= RING; dx++) {
        const lat0 = (cLat + dy) * step, lat1 = (cLat + dy + 1) * step;
        const lng0 = (cLng + dx) * step, lng1 = (cLng + dx + 1) * step;
        const sw = project(lat0, lng0);
        const nw = project(lat1, lng0);
        const ne = project(lat1, lng1);
        const se = project(lat0, lng1);
        // Four edges per cell. Adjacent cells share edges (drawn twice) — fine
        // for a few dozen lines and keeps the code simple.
        segs.push({ x1: sw.x, z1: sw.z, x2: nw.x, z2: nw.z });
        segs.push({ x1: nw.x, z1: nw.z, x2: ne.x, z2: ne.z });
        segs.push({ x1: ne.x, z1: ne.z, x2: se.x, z2: se.z });
        segs.push({ x1: se.x, z1: se.z, x2: sw.x, z2: sw.z });
      }
    }
    this.arService.placeGrid(segs);
  }

  async ngOnInit(): Promise<void> {
    await this.arService.checkSupport();
    await this.arService.init(this.canvasRef.nativeElement);
    this.orientation.start();
    this.gps.startTracking();

    // Tap on a fossil's 3D hit sphere → open its card
    this.arService.setTapHandler((fossilId: string) => {
      if (this.selectedFossil()) return;
      const fossil = this.allFossils()
        .find(f => f.id === fossilId && !this.collectedIds.has(f.id) && !f.discovered);
      if (!fossil) return;
      const distM = this.gps.distanceTo(fossil);
      if (distM > COLLECT_RADIUS_M) {
        this.tooFarToast.set(`Walk closer — ${Math.round(distM)} m away`);
        clearTimeout(this.tooFarTimeout);
        this.tooFarTimeout = window.setTimeout(() => this.tooFarToast.set(null), 1800);
        return;
      }
      this.selectedFossil.set(fossil);
    });
  }

  async onStartAR(): Promise<void> {
    await this.orientation.requestPermission();
    await this.arService.startAR(this.overlayRef.nativeElement);

    // Lock in a heading reference for AR placement. WebXR's world axes are
    // anchored to the device pose at session start, so we need to know which
    // compass direction that pose corresponds to and use it consistently.
    // The orientation signal may not be ready yet — poll briefly.
    if (!this.orientation.captureHeadingReference()) {
      const start = Date.now();
      const tryCapture = () => {
        if (this.orientation.captureHeadingReference()) return;
        if (Date.now() - start > 3000) return;
        setTimeout(tryCapture, 100);
      };
      tryCapture();
    }

    // Lock in a GPS origin too. All fossil placements this session are
    // offsets from this single point, so live GPS jitter no longer moves
    // already-placed fossils. If GPS isn't ready yet, poll briefly.
    const completeOriginSetup = () => {
      this.placedFossilIds.clear();
      this.lastGridKey = '';
      this.allFossils().forEach(f => this.arService.removeFossil(f.id));
      const p = this.gps.playerPosition();
      if (p) {
        this.replenishFossils(p);
        this.syncARMarkers(this.gps.nearbyFossils());
      }
    };
    this.originPos = this.gps.playerPosition();
    if (this.originPos) {
      completeOriginSetup();
    } else {
      const originStart = Date.now();
      const tryCaptureOrigin = () => {
        const p = this.gps.playerPosition();
        if (p) { this.originPos = p; completeOriginSetup(); return; }
        if (Date.now() - originStart > 3000) return;
        setTimeout(tryCaptureOrigin, 100);
      };
      tryCaptureOrigin();
    }
  }

  onCollect(fossil: FossilLocation): void {
    this.collectedIds.add(fossil.id);
    this.collectedFossils.update(list => [...list, fossil]);
    const rec = this.cellStates.get(this.cellKey(fossil.lat, fossil.lng));
    if (rec) rec.collected.add(fossil.id);
    this.arService.removeFossil(fossil.id);
    this.selectedFossil.set(null);

    this.allFossils.update(list => list.filter(f => f.id !== fossil.id));
    this.gps.loadFossils(this.allFossils());

    // Celebrate legendary and chroma drops with an overlay.
    if (fossil.rarity === 'legendary' || fossil.rarity === 'chroma') {
      this.celebrating.set(fossil);
      clearTimeout(this.celebrateTimeout);
      this.celebrateTimeout = window.setTimeout(
        () => this.celebrating.set(null),
        fossil.rarity === 'chroma' ? 4500 : 2800,
      );
    }
  }

  /** Collected fossils grouped by template id, with count + rarity. */
  get collectionGrouped(): Array<{ baseId: string; name: string; rarity: string; count: number; emoji: string }> {
    const map = new Map<string, { baseId: string; name: string; rarity: string; count: number; emoji: string }>();
    for (const f of this.collectedFossils()) {
      const baseId = f.id.split('_')[0];
      const existing = map.get(baseId);
      if (existing) existing.count++;
      else map.set(baseId, { baseId, name: f.name, rarity: f.rarity, count: 1, emoji: this.emojiFor(baseId) });
    }
    const order: Record<string, number> = { chroma: 0, legendary: 1, rare: 2, common: 3 };
    return [...map.values()].sort((a, b) => (order[a.rarity] ?? 9) - (order[b.rarity] ?? 9));
  }

  pointsFor(rarity: string): number { return RARITY_POINTS[rarity] ?? 0; }

  /** Test helper: fabricate a fossil of the given rarity and run it through
   *  the normal collection flow so the celebration + collection panel update. */
  debugCollect(rarity: string): void {
    const tpl = this.fossilTemplates.find(t => t.rarity === rarity);
    if (!tpl) return;
    this.spawnCounter++;
    this.onCollect({
      ...tpl,
      id: `debug_${tpl.id}_${this.spawnCounter}`,
      lat: 0, lng: 0, discovered: false,
    });
  }

  confettiPieces = Array.from({ length: 24 }, (_, i) => i);
  confettiEmoji(rarity: string): string {
    return rarity === 'chroma' ? '🌈' : '✨';
  }

  private emojiFor(baseId: string): string {
    const m: Record<string, string> = {
      'flint-handaxe-01': '🪓', 'bone-needle-01': '🪡', 'clay-pot-shard-01': '🏺',
      'bronze-fibula-01': '📌', 'roman-coin-01': '🪙', 'obsidian-arrowhead-01': '🏹',
      'golden-torc-01': '📿', 'clay-tablet-01': '📜', 'iron-dagger-01': '🗡️',
      'human-femur-01': '🦴', 'wooden-post-01': '🪵', 'ivory-necklace-01': '💛',
      'iridescent-prism-01': '🌈',
    };
    return m[baseId] ?? '🪨';
  }

  /** Maintains the (2*ACTIVE_RADIUS_CELLS+1)² ring of cells around the player.
   *  Each cell rolls 0/1/2 fossils on first visit (probabilities ¼/½/¼) and
   *  remembers the result, so the same cell always has the same loot. */
  private replenishFossils(pos: { lat: number; lng: number }): void {
    const step = AREA_CELL_M / 111_000;
    const cLat = Math.floor(pos.lat / step);
    const cLng = Math.floor(pos.lng / step);
    const r    = ACTIVE_RADIUS_CELLS;
    const active: FossilLocation[] = [];

    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const key = `${cLat + dy}:${cLng + dx}`;
        let rec = this.cellStates.get(key);
        if (!rec) {
          rec = this.rollCell(cLat + dy, cLng + dx, step);
          this.cellStates.set(key, rec);
        }
        rec.fossils.forEach(f => {
          if (!rec!.collected.has(f.id)) active.push(f);
        });
      }
    }

    // Despawn anything in the previous pool that isn't part of the new ring.
    const activeIds = new Set(active.map(f => f.id));
    this.allFossils().forEach(f => {
      if (!activeIds.has(f.id)) this.arService.removeFossil(f.id);
    });

    this.allFossils.set(active);
    this.gps.loadFossils(active);
  }

  /** Decides how many fossils a never-visited cell gets, then spawns them.
   *  Distribution: 25% empty, 50% one fossil, 25% two fossils. */
  private rollCell(cLat: number, cLng: number, step: number): { fossils: FossilLocation[]; collected: Set<string> } {
    const r = Math.random();
    const count = r < 0.25 ? 0 : r < 0.75 ? 1 : 2;
    const fossils: FossilLocation[] = [];
    for (let i = 0; i < count; i++) fossils.push(this.spawnInCell(cLat, cLng, step));
    return { fossils, collected: new Set() };
  }

  /** Picks a position somewhere inside the cell (not flush against an edge),
   *  rolls a rarity by weight, and picks a random template of that rarity. */
  private spawnInCell(cLat: number, cLng: number, step: number): FossilLocation {
    const lat = (cLat + 0.2 + Math.random() * 0.6) * step;
    const lng = (cLng + 0.2 + Math.random() * 0.6) * step;
    const rarity = this.pickRarity();
    const candidates = this.fossilTemplates.filter(t => t.rarity === rarity);
    const tpl = candidates.length
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : this.fossilTemplates[0];
    this.spawnCounter++;
    return { ...tpl, id: `${tpl.id}_${Date.now()}_${this.spawnCounter}`, lat, lng, discovered: false };
  }

  /** Weighted random rarity pick honouring RARITY_WEIGHTS. */
  private pickRarity(): string {
    const r = Math.random();
    let cum = 0;
    for (const [rarity, w] of Object.entries(RARITY_WEIGHTS)) {
      cum += w;
      if (r < cum) return rarity;
    }
    return 'common';
  }

  /** Grid key for the cell containing a given lat/lng. */
  private cellKey(lat: number, lng: number): string {
    const step = AREA_CELL_M / 111_000;
    return `${Math.floor(lat / step)}:${Math.floor(lng / step)}`;
  }

  private syncARMarkers(nearby: FossilLocation[]): void {
    const origin = this.originPos;
    // Until AR is started and GPS origin is captured, nothing to place.
    if (!origin) return;
    const headingRef = this.orientation.headingReference()
      ?? this.orientation.orientation()?.heading ?? 0;
    const headRad = (headingRef * Math.PI) / 180;
    const cosLat = Math.cos(origin.lat * Math.PI / 180);

    nearby.forEach((f) => {
      if (this.collectedIds.has(f.id)) return;
      // Place once. Never reposition a placed fossil — that's what caused
      // the "snap" on GPS updates.
      if (this.placedFossilIds.has(f.id)) return;
      // ENU delta from the session origin to this fossil's GPS coords.
      const dN = (f.lat - origin.lat) * 111_000;
      const dE = (f.lng - origin.lng) * 111_000 * cosLat;
      // Rotate ENU into WebXR world axes (locked at session start).
      const x =  dE * Math.cos(headRad) - dN * Math.sin(headRad);
      const z = -(dE * Math.sin(headRad) + dN * Math.cos(headRad));
      const y = -DEVICE_HEIGHT_M;
      this.arService.placeFossil(f.id, new THREE.Vector3(x, y, z));
      this.placedFossilIds.add(f.id);
    });

    const nearbyIds = new Set(nearby.map(f => f.id));
    this.allFossils().forEach(f => {
      if (!nearbyIds.has(f.id) && !this.collectedIds.has(f.id)) {
        this.arService.removeFossil(f.id);
        this.placedFossilIds.delete(f.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.gps.stopTracking();
    this.orientation.stop();
    this.orientation.clearHeadingReference();
    this.originPos = null;
    this.placedFossilIds.clear();
    this.arService.stopAR();
  }
}
