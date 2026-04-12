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
import { generateFossilInstances } from '../../utils/geo.utils';
import { OrientationService } from '../../services/orientation.service';
import fossilTemplates from '../../data/fossils.json';

/** Target number of fossils kept within 100 m of the player at all times. */
const TARGET_DENSITY = 10;
/** Fossils beyond this distance are despawned to free memory. */
const DESPAWN_RADIUS_M = 100;

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
      if (fossil) this.selectedFossil.set(fossil);
    });
  }

  async onStartAR(): Promise<void> {
    await this.orientation.requestPermission();
    await this.arService.startAR(this.overlayRef.nativeElement);
  }

  onCollect(fossil: FossilLocation): void {
    this.collectedIds.add(fossil.id);
    this.arService.removeFossil(fossil.id);
    this.selectedFossil.set(null);

    // Remove from active pool — no replacement (fixed pool per area)
    this.allFossils.update(list => list.filter(f => f.id !== fossil.id));
    this.gps.loadFossils(this.allFossils());
  }

  /** Despawn fossils beyond DESPAWN_RADIUS_M, then top up to TARGET_DENSITY near the player. */
  private replenishFossils(pos: { lat: number; lng: number }): void {
    const all = this.allFossils();
    const remaining = all.filter(f => {
      if (this.gps.distanceTo(f) > DESPAWN_RADIUS_M) {
        this.arService.removeFossil(f.id);
        return false;
      }
      return true;
    });

    const needed = Math.max(0, TARGET_DENSITY - remaining.length);
    const fresh = needed > 0
      ? generateFossilInstances(this.fossilTemplates, needed, pos.lat, pos.lng)
      : [];

    if (remaining.length !== all.length || fresh.length > 0) {
      const updated = [...remaining, ...fresh];
      this.allFossils.set(updated);
      this.gps.loadFossils(updated);
    }
  }

  private syncARMarkers(nearby: FossilLocation[]): void {
    nearby.forEach((f) => {
      if (this.collectedIds.has(f.id)) return;
      const distM   = this.gps.distanceTo(f);
      const bearing = this.gps.bearingTo(f);
      const arDistM = Math.min(3, distM * 0.1);
      const { x, y, z } = this.orientation.fossilOffset(bearing, arDistM);
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
    this.arService.stopAR();
  }
}
