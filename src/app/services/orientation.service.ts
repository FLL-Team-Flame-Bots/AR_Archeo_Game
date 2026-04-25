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

  /** Raw alpha/beta/gamma straight from the event (degrees). Needed for the
   *  iOS fallback's quaternion-based camera rotation, which has to handle
   *  arbitrary screen orientation (portrait vs landscape) — the cooked
   *  heading/pitch above is portrait-only. */
  rawOrientation = signal<{ alpha: number; beta: number; gamma: number } | null>(null);

  /** Heading captured at AR session start. WebXR's world-space axes are
   *  anchored to whatever direction the device was facing at that moment,
   *  so all subsequent compass-to-XR projections must use this as their
   *  reference — not the live heading — or fossils placed at different
   *  times end up in different "frames" and visually cluster wherever the
   *  player happened to be facing. */
  headingReference = signal<number | null>(null);

  private bound!: (e: DeviceOrientationEvent) => void;
  private boundEvent: 'deviceorientationabsolute' | 'deviceorientation' = 'deviceorientation';

  constructor(private ngZone: NgZone) {}

  /** Lock in the current heading as the world-space reference. Call once
   *  AR has started AND the orientation signal has a real reading. */
  captureHeadingReference(): boolean {
    const o = this.orientation();
    if (!o) return false;
    this.headingReference.set(o.heading);
    return true;
  }
  clearHeadingReference(): void { this.headingReference.set(null); }

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

        // beta  — 0 = flat (screen up), 90 = held upright; we want pitch=0
        //         to mean horizontal, positive = tilting down.
        const pitch = (e.beta ?? 0) - 90;

        // Derive compass heading (CW from north).
        //  • iOS Safari exposes it directly via webkitCompassHeading.
        //  • Everywhere else, alpha is counter-clockwise from north, so we
        //    flip it: compass = (360 - alpha) % 360.
        const webkitHdg = (e as unknown as { webkitCompassHeading?: number }).webkitCompassHeading;
        const heading = typeof webkitHdg === 'number'
          ? webkitHdg
          : (360 - (e.alpha ?? 0)) % 360;

        this.orientation.set({ heading, pitch, roll: e.gamma ?? 0 });
        this.rawOrientation.set({
          alpha: e.alpha ?? 0,
          beta: e.beta ?? 0,
          gamma: e.gamma ?? 0,
        });
      });
    };
    // Prefer absolute (true compass) over relative orientation when available.
    if ('ondeviceorientationabsolute' in window) {
      this.boundEvent = 'deviceorientationabsolute';
    } else {
      this.boundEvent = 'deviceorientation';
    }
    window.addEventListener(this.boundEvent, this.bound as EventListener, true);
  }

  stop(): void {
    if (this.bound) window.removeEventListener(this.boundEvent, this.bound as EventListener, true);
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
   * Given a compass bearing to a fossil and a distance in metres, returns
   * a THREE.js-compatible {x, y, z} offset in WebXR world space.
   *
   * Uses the locked-in heading reference (captured at AR start) rather than
   * the live heading, so every fossil placed during the session lands in
   * the same world-XR frame — even ones placed seconds apart while the
   * player was rotating.
   *
   *  - x: world-XR east(+) / west(–) relative to session origin
   *  - y: fixed at -deviceHeightM so fossils sit on the ground
   *  - z: world-XR south(+) / north(–) relative to session origin
   */
  fossilOffset(
    compassBearingDeg: number,
    distanceM: number,
    deviceHeightM = DEVICE_HEIGHT_M
  ): { x: number; y: number; z: number } {
    const ref = this.headingReference() ?? this.orientation()?.heading ?? 0;
    const relRad = ((compassBearingDeg - ref) * Math.PI) / 180;
    return {
      x: distanceM * Math.sin(relRad),
      y: -deviceHeightM,
      z: -distanceM * Math.cos(relRad),
    };
  }
}
