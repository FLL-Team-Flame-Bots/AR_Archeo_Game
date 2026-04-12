import { Injectable, NgZone, signal } from '@angular/core';

export const DEVICE_HEIGHT_M = 1.0668; // 3.5 feet in metres

export interface DeviceOrientation {
  heading: number;   // compass direction device faces, 0–360 (north = 0)
  pitch: number;     // tilt forward/back in degrees (-90 up, 0 horizontal, 90 down)
  roll: number;      // tilt left/right in degrees
}

@Injectable({ providedIn: 'root' })
export class OrientationService {
  orientation = signal<DeviceOrientation | null>(null);
  permissionDenied = signal(false);

  private bound!: (e: DeviceOrientationEvent) => void;

  constructor(private ngZone: NgZone) {}

  /** Call this on a user gesture (button tap) — required on iOS 13+ */
  async requestPermission(): Promise<boolean> {
    // iOS 13+ gate
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    if (typeof DOE.requestPermission === 'function') {
      const result = await DOE.requestPermission();
      if (result !== 'granted') {
        this.permissionDenied.set(true);
        return false;
      }
    }
    return true;
  }

  start(): void {
    this.bound = (e: DeviceOrientationEvent) => {
      this.ngZone.run(() => {
        if (e.alpha == null) return;

        // alpha  = compass heading (0-360, clockwise from north)
        // beta   = front-back tilt. 0 = flat, 90 = standing upright, -90 = upside down
        // gamma  = left-right tilt. -90 to 90

        // Convert beta into a "tilt from horizontal":
        // beta=0 → flat (looking at ceiling); beta=90 → vertical (looking at horizon)
        // We normalise so that pitch=0 means horizontal, positive = tilting down
        const pitch = (e.beta ?? 0) - 90; // degrees below/above horizon

        this.orientation.set({
          heading: e.alpha ?? 0,
          pitch,
          roll: e.gamma ?? 0,
        });
      });
    };
    window.addEventListener('deviceorientation', this.bound, true);
  }

  stop(): void {
    if (this.bound) window.removeEventListener('deviceorientation', this.bound, true);
  }

  /**
   * Estimates how far in front of the device the camera is aimed at the ground.
   * Uses: ground_distance = device_height / tan(pitch_below_horizon)
   * Clamped between 0.3 m and 10 m so the value stays useful.
   */
  groundLookDistance(deviceHeightM = DEVICE_HEIGHT_M): number {
    const o = this.orientation();
    if (!o) return 2; // default 2 m until we have a reading
    const pitchRad = (Math.abs(o.pitch) * Math.PI) / 180;
    if (pitchRad < 0.05) return 10; // nearly horizontal — cap at 10 m
    return Math.min(10, Math.max(0.3, deviceHeightM / Math.tan(pitchRad)));
  }

  /**
   * Given a compass bearing to a fossil and a distance in metres,
   * returns a THREE.js-compatible {x, y, z} offset from the camera origin.
   *
   *  - x: left (negative) / right (positive) relative to device facing
   *  - y: fixed at -deviceHeightM so fossils sit on the ground
   *  - z: negative = in front of camera, positive = behind
   */
  fossilOffset(
    compassBearingDeg: number,
    distanceM: number,
    deviceHeightM = DEVICE_HEIGHT_M
  ): { x: number; y: number; z: number } {
    const o = this.orientation();
    const heading = o?.heading ?? 0;

    // Angle of fossil relative to the direction the device is currently facing
    const relDeg = compassBearingDeg - heading;
    const relRad = (relDeg * Math.PI) / 180;

    return {
      x: distanceM * Math.sin(relRad),
      y: -deviceHeightM,                     // ground level
      z: -distanceM * Math.cos(relRad),       // negative Z = forward in THREE.js
    };
  }
}
