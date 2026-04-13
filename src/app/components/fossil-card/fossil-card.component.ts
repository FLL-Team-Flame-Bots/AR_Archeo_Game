import {
  Component, Input, Output, EventEmitter,
  ViewChild, ElementRef, AfterViewInit, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FossilLocation } from '../../data/fossil.model';

@Component({
  selector: 'app-fossil-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fossil-card" [class]="'rarity-' + fossil.rarity">

      <!-- ── Brush phase ── -->
      <div class="brush-phase" [class.hidden-phase]="phase !== 'brushing'">
        <div class="card-header">
          <span class="rarity-badge">{{ rarityLabel }}</span>
          <button class="close-btn" (click)="close.emit()">✕</button>
        </div>

        <!-- Fossil preview sits UNDER the canvas -->
        <div class="sediment-preview">
          <div class="preview-emoji">{{ fossilEmoji }}</div>
          <p class="preview-name">{{ fossil.name }}</p>
          <p class="preview-sub">Brush to reveal</p>

          <!-- Canvas overlays the preview; events attached in code (outside zone) -->
          <canvas #brushCanvas class="brush-canvas"></canvas>
        </div>

        <div class="brush-progress-wrap">
          <div class="brush-progress-bar" [style.width.%]="brushProgress"></div>
        </div>
        <p class="brush-hint">Swipe to brush away the sediment</p>
      </div>

      <!-- ── Revealed phase ── -->
      <div class="reveal-phase" [class.hidden-phase]="phase !== 'revealed'">
        <div class="card-header">
          <span class="rarity-badge">{{ rarityLabel }}</span>
          <button class="close-btn" (click)="close.emit()">✕</button>
        </div>

        <div class="fossil-icon">{{ fossilEmoji }}</div>
        <h2 class="fossil-name">{{ fossil.name }}</h2>
        <p class="fossil-species"><em>{{ fossil.species }}</em></p>

        <div class="info-grid">
          <div class="info-item">
            <span class="label">Era</span>
            <span class="value">{{ fossil.era }}</span>
          </div>
          <div class="info-item">
            <span class="label">Period</span>
            <span class="value">{{ fossil.period }}</span>
          </div>
          <div class="info-item">
            <span class="label">Discovered</span>
            <span class="value">{{ fossil.yearDiscovered }}</span>
          </div>
        </div>

        <p class="description">{{ fossil.description }}</p>

        <div class="fun-fact">
          <span class="fun-fact-label">Fun Fact</span>
          <p>{{ fossil.funFact }}</p>
        </div>

        <button class="collect-btn" (click)="collect.emit(fossil)">
          Collect Fossil
        </button>
      </div>

    </div>
  `,
  styles: [`
    .fossil-card {
      background: linear-gradient(145deg, #2a1a00, #3d2a00);
      border: 2px solid #8B6914;
      border-radius: 16px;
      overflow: hidden;
      color: #f5e6c8;
      max-width: 360px;
      width: 90vw;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    }
    .hidden-phase { display: none !important; }

    /* ── Brush phase ── */
    .brush-phase { padding: 16px 20px 20px; }

    .sediment-preview {
      position: relative;
      height: 180px;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(ellipse at center, #5c3d11 0%, #3d2200 70%);
    }
    .preview-emoji { font-size: 64px; filter: brightness(0.55) sepia(0.4); user-select: none; }
    .preview-name  { font-size: 16px; font-weight: 700; color: #c8a86b; margin: 6px 0 2px; }
    .preview-sub   { font-size: 11px; color: rgba(200,168,107,0.5); }

    .brush-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      cursor: crosshair;
      touch-action: none;
    }

    .brush-progress-wrap {
      margin-top: 10px;
      height: 5px;
      background: rgba(0,0,0,0.4);
      border-radius: 20px;
      overflow: hidden;
    }
    .brush-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #8B6914, #ffd700);
      border-radius: 20px;
      transition: width 0.15s ease;
    }
    .brush-hint {
      text-align: center;
      font-size: 11px;
      color: rgba(200,168,107,0.6);
      margin: 8px 0 0;
    }

    /* ── Revealed phase ── */
    .reveal-phase {
      padding: 20px;
      animation: fadeReveal 0.4s ease;
    }
    @keyframes fadeReveal {
      from { opacity: 0; transform: scale(0.97); }
      to   { opacity: 1; transform: scale(1); }
    }

    /* Shared */
    .card-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .rarity-badge {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1px; padding: 3px 8px; border-radius: 4px;
      background: rgba(255,255,255,0.1);
    }
    .close-btn {
      background: none; border: none; color: #f5e6c8;
      font-size: 18px; cursor: pointer; padding: 4px; line-height: 1;
    }

    .rarity-legendary { border-color: #ffd700; box-shadow: 0 0 20px rgba(255,215,0,0.3); }
    .rarity-rare      { border-color: #a855f7; box-shadow: 0 0 20px rgba(168,85,247,0.3); }
    .rarity-common    { border-color: #6b7280; }

    .fossil-icon { font-size: 48px; text-align: center; margin: 8px 0; }
    .fossil-name { font-size: 20px; font-weight: 700; text-align: center; margin: 0 0 4px; }
    .fossil-species { font-size: 13px; color: #c8a86b; text-align: center; margin: 0 0 16px; }

    .info-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 8px; margin-bottom: 16px;
    }
    .info-item {
      text-align: center; background: rgba(0,0,0,0.2);
      border-radius: 8px; padding: 8px 4px;
    }
    .label { display: block; font-size: 10px; text-transform: uppercase; color: #c8a86b; margin-bottom: 4px; }
    .value { display: block; font-size: 13px; font-weight: 600; }

    .description { font-size: 13px; line-height: 1.5; color: #e0cca8; margin-bottom: 16px; }

    .fun-fact {
      background: rgba(255,215,0,0.08); border-left: 3px solid #ffd700;
      padding: 10px 12px; border-radius: 0 8px 8px 0; margin-bottom: 16px;
    }
    .fun-fact-label { font-size: 10px; text-transform: uppercase; color: #ffd700; font-weight: 700; }
    .fun-fact p { font-size: 13px; color: #f5e6c8; margin: 4px 0 0; line-height: 1.4; }

    .collect-btn {
      width: 100%; padding: 12px;
      background: linear-gradient(135deg, #8B6914, #c8a020);
      border: none; border-radius: 10px; color: #fff;
      font-size: 16px; font-weight: 700; cursor: pointer; letter-spacing: 0.5px;
    }
    .collect-btn:active { transform: scale(0.97); }
  `]
})
export class FossilCardComponent implements AfterViewInit {
  @Input() fossil!: FossilLocation;
  @Output() close   = new EventEmitter<void>();
  @Output() collect = new EventEmitter<FossilLocation>();
  @ViewChild('brushCanvas') brushCanvasRef!: ElementRef<HTMLCanvasElement>;

  phase: 'brushing' | 'revealed' = 'brushing';
  brushProgress = 0;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private strokeCount = 0;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Let layout settle before reading canvas dimensions
    setTimeout(() => this.initCanvas(), 60);
  }

  // ── Canvas setup ──────────────────────────────────────────────────────────

  private initCanvas(): void {
    const canvas = this.brushCanvasRef.nativeElement;
    canvas.width  = canvas.offsetWidth  || 320;
    canvas.height = canvas.offsetHeight || 180;
    this.ctx = canvas.getContext('2d')!;
    this.drawSediment();

    // Attach pointer listeners outside Angular zone — no change detection per frame
    this.ngZone.runOutsideAngular(() => {
      canvas.addEventListener('pointerdown',  (e) => this.onDown(e),  { passive: false });
      canvas.addEventListener('pointermove',  (e) => this.onMove(e),  { passive: false });
      canvas.addEventListener('pointerup',    ()  => this.isDrawing = false);
      canvas.addEventListener('pointerleave', ()  => this.isDrawing = false);
    });
  }

  private drawSediment(): void {
    const { width, height } = this.ctx.canvas;

    // Earthy gradient base
    const grad = this.ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0,   '#b07830');
    grad.addColorStop(0.5, '#8B5e14');
    grad.addColorStop(1,   '#5c3a08');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, width, height);

    // Sand/rock texture blobs
    for (let i = 0; i < 220; i++) {
      const r = 130 + Math.random() * 70  | 0;
      const g = 65  + Math.random() * 55  | 0;
      const b = 8   + Math.random() * 35  | 0;
      const a = (0.2 + Math.random() * 0.5).toFixed(2);
      this.ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
      this.ctx.beginPath();
      this.ctx.arc(
        Math.random() * width,
        Math.random() * height,
        2 + Math.random() * 14, 0, Math.PI * 2,
      );
      this.ctx.fill();
    }

    // Dark crack lines
    this.ctx.strokeStyle = 'rgba(35,15,0,0.4)';
    for (let i = 0; i < 14; i++) {
      this.ctx.lineWidth = 0.5 + Math.random() * 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(Math.random() * width, Math.random() * height);
      this.ctx.bezierCurveTo(
        Math.random() * width, Math.random() * height,
        Math.random() * width, Math.random() * height,
        Math.random() * width, Math.random() * height,
      );
      this.ctx.stroke();
    }
  }

  // ── Brush interaction ─────────────────────────────────────────────────────

  private onDown(e: PointerEvent): void {
    this.isDrawing = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    this.brush(e);
  }

  private onMove(e: PointerEvent): void {
    if (this.isDrawing) this.brush(e);
  }

  private brush(e: PointerEvent): void {
    const canvas = this.brushCanvasRef.nativeElement;
    const rect   = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width  / rect.width);
    const y = (e.clientY - rect.top)  * (canvas.height / rect.height);

    // Soft radial eraser
    const r   = 34;
    const grd = this.ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0,   'rgba(0,0,0,1)');
    grd.addColorStop(0.5, 'rgba(0,0,0,0.85)');
    grd.addColorStop(1,   'rgba(0,0,0,0)');
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = grd;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();

    // Sample cleared area every 8 strokes (getImageData is expensive)
    if (++this.strokeCount % 8 === 0) {
      this.checkProgress();
    }
  }

  private checkProgress(): void {
    const { width, height } = this.ctx.canvas;
    const data    = this.ctx.getImageData(0, 0, width, height).data;
    let   cleared = 0;
    const total   = Math.floor(data.length / 16); // sample every 4th pixel
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] < 128) cleared++;
    }
    const pct = Math.min(100, Math.round((cleared / total) * 100));

    // Re-enter Angular zone only when state changes
    this.ngZone.run(() => {
      this.brushProgress = pct;
      if (pct >= 65) this.phase = 'revealed';
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  get rarityLabel(): string {
    return ({ common: 'Common', rare: 'Rare', legendary: 'Legendary' } as Record<string, string>)[this.fossil.rarity] ?? this.fossil.rarity;
  }

  get fossilEmoji(): string {
    const baseId = this.fossil.id.split('_')[0];
    const map: Record<string, string> = {
      'flint-handaxe-01':      '🪓',
      'bone-needle-01':        '🪡',
      'clay-pot-shard-01':     '🏺',
      'bronze-fibula-01':      '📌',
      'roman-coin-01':         '🪙',
      'obsidian-arrowhead-01': '🏹',
      'golden-torc-01':        '📿',
      'clay-tablet-01':        '📜',
      'iron-dagger-01':        '🗡️',
      'human-femur-01':        '🦴',
      'wooden-post-01':        '🪵',
      'ivory-necklace-01':     '💛',
    };
    return map[baseId] ?? '🪨';
  }
}
