import {
  Component, ElementRef, ViewChild, OnInit, OnDestroy, effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { ArService } from '../../services/ar.service';
import { GpsService } from '../../services/gps.service';
import { FossilLocation } from '../../data/fossil.model';
import { FossilCardComponent } from '../fossil-card/fossil-card.component';
import { HudComponent } from '../hud/hud.component';
import { scatterFossils } from '../../utils/geo.utils';
import { OrientationService } from '../../services/orientation.service';
import fossils from '../../data/fossils.json';

@Component({
  selector: 'app-ar-view',
  standalone: true,
  imports: [CommonModule, FossilCardComponent, HudComponent],
  template: `
    <div class="ar-container">

      <!-- Background shown whenever AR isn't running (desktop or pre-start on Android) -->
      <div class="no-ar-bg" *ngIf="!arService.active()">
        <div class="no-ar-content">
          <div class="logo">🦴</div>
          <h1>ARArcheoGame</h1>
          <div class="status-row">
            <span [class.ok]="!!gps.playerPosition()" [class.waiting]="!gps.playerPosition()">
              {{ gps.playerPosition() ? '📍 GPS active' : '⏳ Waiting for GPS...' }}
            </span>
          </div>
          <div class="fossil-count">{{ allFossils.length }} fossils hidden nearby</div>

          <!-- Show Start AR button on any device — let WebXR fail gracefully if unsupported -->
          <button class="start-ar-btn" (click)="onStartAR()" [disabled]="arService.loading()">
            {{ arService.loading() ? '⏳ Starting...' : '📷 Start AR' }}
          </button>

          <p class="hint" *ngIf="!arService.supported()">
            ⚠️ AR not detected — needs Chrome on Android with ARCore
          </p>
          <p class="hint error" *ngIf="arService.error()">{{ arService.error() }}</p>
        </div>
      </div>

      <!-- AR canvas — always present so WebGL context stays alive -->
      <canvas #arCanvas class="ar-canvas"></canvas>

      <app-hud
        [collected]="collectedIds.size"
        [total]="allFossils.length"
        [nearbyCount]="gps.nearbyFossils().length"
        [gpsActive]="!!gps.playerPosition()"
        [showARPrompt]="!arService.active() && arService.supported()"
        (startAR)="onStartAR()"
        (openMap)="showMap = true"
        (openCollection)="showCollection = true"
        (openLearn)="showLearn = true"
      />

      <!-- Fossil discovered popup -->
      <div class="overlay-backdrop" *ngIf="selectedFossil" (click)="selectedFossil = null">
        <div class="overlay-center" (click)="$event.stopPropagation()">
          <app-fossil-card
            [fossil]="selectedFossil!"
            (close)="selectedFossil = null"
            (collect)="onCollect($event)"
          />
        </div>
      </div>

      <!-- GPS error -->
      <div class="gps-error-toast" *ngIf="gps.error()">
        {{ gps.error() }}
      </div>
    </div>
  `,
  styles: [`
    .ar-container { position: fixed; inset: 0; background: #1a0f00; }
    .ar-canvas { position: fixed; inset: 0; width: 100%; height: 100%; display: block; }

    .no-ar-bg {
      position: fixed; inset: 0; z-index: 10;
      background: radial-gradient(ellipse at center, #3d2a00 0%, #1a0f00 70%);
      display: flex; align-items: center; justify-content: center;
    }
    .no-ar-content { text-align: center; color: #f5e6c8; padding: 24px; }
    .logo { font-size: 64px; margin-bottom: 12px; }
    h1 { font-size: 28px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px; color: #ffd700; }
    .subtitle { font-size: 14px; color: #c8a86b; margin-bottom: 24px; }
    .status-row { margin-bottom: 12px; }
    .status-row .ok     { color: #4ade80; font-weight: 600; }
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
    .start-ar-btn:active { transform: scale(0.96); }
    .hint { font-size: 12px; color: #facc15; margin-top: 8px; padding: 0 20px; }
    .hint.error { color: #f87171; background: rgba(200,0,0,0.2); border-radius: 8px; padding: 8px 16px; }
    .start-ar-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .overlay-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      display: flex; align-items: center; justify-content: center; z-index: 100;
    }

    .gps-error-toast {
      position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
      background: rgba(200,80,0,0.9); color: #fff; padding: 8px 16px;
      border-radius: 20px; font-size: 12px; pointer-events: none;
    }
  `]
})
export class ArViewComponent implements OnInit, OnDestroy {
  @ViewChild('arCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  allFossils: FossilLocation[] = fossils as FossilLocation[];
  collectedIds = new Set<string>();
  selectedFossil: FossilLocation | null = null;
  showMap = false;
  showCollection = false;
  showLearn = false;
  private fossilsScattered = false;

  constructor(
    public arService: ArService,
    public gps: GpsService,
    public orientation: OrientationService
  ) {
    // Scatter fossils on first GPS fix, then react to nearby changes
    effect(() => {
      const pos = this.gps.playerPosition();
      if (pos && !this.fossilsScattered) {
        this.fossilsScattered = true;
        this.allFossils = scatterFossils(this.allFossils, pos.lat, pos.lng);
        this.gps.loadFossils(this.allFossils);
      }
    });

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
  }

  async onStartAR(): Promise<void> {
    // iOS 13+ requires a user-gesture to unlock DeviceOrientationEvent
    await this.orientation.requestPermission();
    await this.arService.startAR();
  }

  onCollect(fossil: FossilLocation): void {
    fossil.discovered = true;
    this.collectedIds.add(fossil.id);
    this.arService.removeFossil(fossil.id);
    this.selectedFossil = null;
  }

  private syncARMarkers(nearby: FossilLocation[]): void {
    nearby.forEach((f) => {
      if (this.collectedIds.has(f.id)) return;

      const distM = this.gps.distanceTo(f);
      const bearing = this.gps.bearingTo(f);

      // Use compass bearing + device heading to place fossil in the correct
      // real-world direction. Clamp display distance so very far fossils
      // still show up within arm's reach in AR (they're nearby on GPS but
      // could be 30 m away — we scale down to 3 m max for readability).
      const arDistM = Math.min(3, distM * 0.1);
      const { x, y, z } = this.orientation.fossilOffset(bearing, arDistM);

      this.arService.placeFossil(f.id, new THREE.Vector3(x, y, z));
    });

    // Remove markers no longer nearby
    const nearbyIds = new Set(nearby.map((f) => f.id));
    this.allFossils.forEach((f) => {
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
