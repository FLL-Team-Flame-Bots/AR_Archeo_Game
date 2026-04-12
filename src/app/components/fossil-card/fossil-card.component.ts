import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FossilLocation } from '../../data/fossil.model';

@Component({
  selector: 'app-fossil-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fossil-card" [class]="'rarity-' + fossil.rarity">
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
  `,
  styles: [`
    .fossil-card {
      background: linear-gradient(145deg, #2a1a00, #3d2a00);
      border: 2px solid #8B6914;
      border-radius: 16px;
      padding: 20px;
      color: #f5e6c8;
      max-width: 360px;
      width: 90vw;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    }

    .rarity-legendary { border-color: #ffd700; box-shadow: 0 0 20px rgba(255,215,0,0.3); }
    .rarity-rare      { border-color: #a855f7; box-shadow: 0 0 20px rgba(168,85,247,0.3); }
    .rarity-common    { border-color: #6b7280; }

    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }

    .rarity-badge {
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
      padding: 3px 8px; border-radius: 4px; background: rgba(255,255,255,0.1);
    }

    .close-btn {
      background: none; border: none; color: #f5e6c8; font-size: 18px;
      cursor: pointer; padding: 4px; line-height: 1;
    }

    .fossil-icon { font-size: 48px; text-align: center; margin: 8px 0; }

    .fossil-name { font-size: 20px; font-weight: 700; text-align: center; margin: 0 0 4px; }
    .fossil-species { font-size: 13px; color: #c8a86b; text-align: center; margin: 0 0 16px; }

    .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
    .info-item { text-align: center; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 8px 4px; }
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
      width: 100%; padding: 12px; background: linear-gradient(135deg, #8B6914, #c8a020);
      border: none; border-radius: 10px; color: #fff; font-size: 16px; font-weight: 700;
      cursor: pointer; letter-spacing: 0.5px;
    }
    .collect-btn:active { transform: scale(0.97); }
  `]
})
export class FossilCardComponent {
  @Input() fossil!: FossilLocation;
  @Output() close = new EventEmitter<void>();
  @Output() collect = new EventEmitter<FossilLocation>();

  get rarityLabel(): string {
    return { common: 'Common', rare: 'Rare', legendary: 'Legendary' }[this.fossil.rarity];
  }

  get fossilEmoji(): string {
    // Generated IDs are like "trex-skull-01_1715000000000_0" — extract base template ID
    const baseId = this.fossil.id.split('_')[0];
    const map: Record<string, string> = {
      'trex-skull-01': '🦴',
      'triceratops-horn-01': '🦕',
      'ammonite-01': '🐚',
      'mammoth-tusk-01': '🦣',
      'shark-tooth-01': '🦈',
    };
    return map[baseId] ?? '🪨';
  }
}
