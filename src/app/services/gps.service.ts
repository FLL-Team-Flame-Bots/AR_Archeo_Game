import { Injectable, NgZone, signal } from '@angular/core';
import { FossilLocation } from '../data/fossil.model';

export interface PlayerPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

const DISCOVERY_RADIUS_METERS = 10;

@Injectable({ providedIn: 'root' })
export class GpsService {
  playerPosition = signal<PlayerPosition | null>(null);
  nearbyFossils = signal<FossilLocation[]>([]);
  error = signal<string | null>(null);

  private watchId: number | null = null;
  private fossils: FossilLocation[] = [];

  constructor(private ngZone: NgZone) {}

  loadFossils(fossils: FossilLocation[]): void {
    this.fossils = fossils;
  }

  startTracking(): void {
    if (!navigator.geolocation) {
      this.error.set('Geolocation is not supported by your browser');
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (pos) => {
        this.ngZone.run(() => {
          const player: PlayerPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          this.playerPosition.set(player);
          this.updateNearby(player);
          this.error.set(null);
        });
      },
      (err) => {
        this.ngZone.run(() => {
          this.error.set(`GPS error: ${err.message}`);
        });
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
  }

  stopTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  private updateNearby(player: PlayerPosition): void {
    const nearby = this.fossils.filter((f) => {
      const dist = this.haversineMeters(player.lat, player.lng, f.lat, f.lng);
      return dist <= DISCOVERY_RADIUS_METERS;
    });
    this.nearbyFossils.set(nearby);
  }

  distanceTo(fossil: FossilLocation): number {
    const player = this.playerPosition();
    if (!player) return Infinity;
    return this.haversineMeters(player.lat, player.lng, fossil.lat, fossil.lng);
  }

  /** Compass bearing from player to fossil, in degrees (0 = north, 90 = east). */
  bearingTo(fossil: FossilLocation): number {
    const player = this.playerPosition();
    if (!player) return 0;
    const lat1 = this.toRad(player.lat);
    const lat2 = this.toRad(fossil.lat);
    const dLng = this.toRad(fossil.lng - player.lng);
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  }

  private haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371000;
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }
}
