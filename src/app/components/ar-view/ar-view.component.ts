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
import { OrientationService } from '../../services/orientation.service';
import fossilTemplates from '../../data/fossils.json';

/** Grid cell size (m). Each cell ever produces at most one fossil. */
const AREA_CELL_M = 10;
/** Cells in each direction around the player that stay populated. A value
 *  of 1 means a 3×3 ring of cells is always alive around the player. */
const ACTIVE_RADIUS_CELLS = 1;
/** Player must be within this many metres of a fossil's GPS location to
 *  open its card. Stops you grabbing fossils from across the field. */
const COLLECT_RADIUS_M = 1;

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
          (openCollection)="showCollection = true"
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
  `]
})
export class ArViewComponent implements OnInit, OnDestroy {
  @ViewChild('arCanvas',  { static: true }) canvasRef!:  ElementRef<HTMLCanvasElement>;
  @ViewChild('arOverlay', { static: true }) overlayRef!: ElementRef<HTMLDivElement>;

  readonly fossilTemplates = fossilTemplates as FossilLocation[];

  /** Live pool of active (uncollected) fossils. Starts empty; filled on first GPS fix. */
  allFossils = signal<FossilLocation[]>([]);
  collectedIds = new Set<string>();
  selectedFossil = signal<FossilLocation | null>(null);
  showMap = false;
  showCollection = false;
  showLearn = false;

  private spawnCounter = 0;
  /** Per-cell state: a stored fossil that respawns when the player returns,
   *  or 'collected' once the player has picked it up (never respawns). */
  private cellStates = new Map<string, FossilLocation | 'collected'>();
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

    // Force-rebuild the grid + fossils with the new reference frame.
    this.lastGridKey = '';
    this.allFossils().forEach(f => this.arService.removeFossil(f.id));
    const pos = this.gps.playerPosition();
    if (pos) this.replenishFossils(pos);
  }

  onCollect(fossil: FossilLocation): void {
    this.collectedIds.add(fossil.id);
    this.cellStates.set(this.cellKey(fossil.lat, fossil.lng), 'collected');
    this.arService.removeFossil(fossil.id);
    this.selectedFossil.set(null);

    this.allFossils.update(list => list.filter(f => f.id !== fossil.id));
    this.gps.loadFossils(this.allFossils());
  }

  /** Maintains exactly the (2*ACTIVE_RADIUS_CELLS+1)² ring of fossils around
   *  the player. Cells already collected stay empty; cells the player has
   *  visited before re-emit the same fossil they had previously. */
  private replenishFossils(pos: { lat: number; lng: number }): void {
    const step = AREA_CELL_M / 111_000;
    const cLat = Math.floor(pos.lat / step);
    const cLng = Math.floor(pos.lng / step);
    const r    = ACTIVE_RADIUS_CELLS;
    const active: FossilLocation[] = [];

    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const key = `${cLat + dy}:${cLng + dx}`;
        const state = this.cellStates.get(key);
        if (state === 'collected') continue;
        if (state) {
          active.push(state);
        } else {
          const fossil = this.spawnInCell(cLat + dy, cLng + dx, step);
          this.cellStates.set(key, fossil);
          active.push(fossil);
        }
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

  /** Picks a position somewhere inside the cell (not flush against an edge)
   *  and creates a fossil instance from the next template in rotation. */
  private spawnInCell(cLat: number, cLng: number, step: number): FossilLocation {
    const lat = (cLat + 0.2 + Math.random() * 0.6) * step;
    const lng = (cLng + 0.2 + Math.random() * 0.6) * step;
    const tpl = this.fossilTemplates[this.spawnCounter % this.fossilTemplates.length];
    this.spawnCounter++;
    return { ...tpl, id: `${tpl.id}_${Date.now()}_${this.spawnCounter}`, lat, lng, discovered: false };
  }

  /** Grid key for the cell containing a given lat/lng. */
  private cellKey(lat: number, lng: number): string {
    const step = AREA_CELL_M / 111_000;
    return `${Math.floor(lat / step)}:${Math.floor(lng / step)}`;
  }

  private syncARMarkers(nearby: FossilLocation[]): void {
    nearby.forEach((f) => {
      if (this.collectedIds.has(f.id)) return;
      const distM   = this.gps.distanceTo(f);
      const bearing = this.gps.bearingTo(f);
      // Place fossils at their real-world distance so they line up with the
      // AR grid overlay (and with each other).
      const { x, y, z } = this.orientation.fossilOffset(bearing, distM);
      this.arService.placeFossil(f.id, new THREE.Vector3(x, y, z));
    });

    const nearbyIds = new Set(nearby.map(f => f.id));
    this.allFossils().forEach(f => {
      if (!nearbyIds.has(f.id) && !this.collectedIds.has(f.id)) {
        this.arService.removeFossil(f.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.gps.stopTracking();
    this.orientation.stop();
    this.orientation.clearHeadingReference();
    this.arService.stopAR();
  }
}
