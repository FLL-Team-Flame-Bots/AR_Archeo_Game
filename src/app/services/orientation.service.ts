import { Injectable, NgZone, signal } from '@angular/core';

export const DEVICE_HEIGHT_M = 1.0668; // 3.5 feet in meters

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

  /** accelerationIncludingGravity from the most recent devicemotion event,
   *  in m/s². Used to derive pitch from gravity (orientation-independent) —
   *  avoids the beta/gamma entanglement that Euler-based pitch math hits in
   *  landscape. */
  gravity = signal<{ x: number; y: number; z: number } | null>(null);

  /** Orientation-independent pitch derived from gravity, in degrees.
   *  -90 = device pointed straight up (sky), 0 = horizontal, +90 = straight
   *  down (ground). Works the same whether held portrait or landscape since
   *  it just measures the device's back-camera axis vs world up. */
  gravityPitchDeg = signal<number | null>(null);

  /** Screen orientation angle captured at the moment startAR was called.
   *  0 / 180 = portrait, 90 / -90 / 270 = landscape. Cleared on stop. */
  startOrientationAngle = signal<number | null>(null);
  startOrientationType  = signal<string | null>(null);

  /** Call from ar.service.startAR (any path) so the debug panel + downstream
   *  math can know how the device was held when the AR session began. */
  captureStartOrientation(): void {
    const o = (window.screen as unknown as { orientation?: { angle: number; type: string } }).orientation;
    if (o) {
      this.startOrientationAngle.set(o.angle);
      this.startOrientationType.set(o.type);
    } else {
      // iOS Safari pre-16.4 only had window.orientation (now deprecated).
      const legacy = (window as unknown as { orientation?: number }).orientation ?? 0;
      this.startOrientationAngle.set(legacy);
      this.startOrientationType.set(Math.abs(legacy) === 90 ? 'landscape' : 'portrait');
    }
  }
  clearStartOrientation(): void {
    this.startOrientationAngle.set(null);
    this.startOrientationType.set(null);
  }

  private bound!: (e: DeviceOrientationEvent) => void;
  private boundMotion?: (e: DeviceMotionEvent) => void;
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

  /** Call this on a user gesture (button tap) — required on iOS 13+.
   *  Asks for both DeviceOrientation (compass/heading) and DeviceMotion
   *  (gravity for pitch) permissions in parallel. */
  async requestPermission(): Promise<boolean> {
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    const DME = DeviceMotionEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    let orientGranted = true;
    let motionGranted = true;
    if (typeof DOE.requestPermission === 'function') {
      const result = await DOE.requestPermission();
      orientGranted = result === 'granted';
    }
    if (typeof DME.requestPermission === 'function') {
      try {
        const result = await DME.requestPermission();
        motionGranted = result === 'granted';
      } catch {
        motionGranted = false;
      }
    }
    if (!orientGranted) {
      this.permissionDenied.set(true);
      return false;
    }
    // Motion permission is optional — yaw still works without it, you just
    // lose pitch. So we don't fail the whole flow if it's denied.
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

    // devicemotion: capture accelerationIncludingGravity for pitch derivation.
    this.boundMotion = (e: DeviceMotionEvent) => {
      const g = e.accelerationIncludingGravity;
      if (!g || g.x == null || g.y == null || g.z == null) return;
      const gx = g.x!, gy = g.y!, gz = g.z!;
      const mag = Math.sqrt(gx * gx + gy * gy + gz * gz);
      // Pitch from gravity vector projected on device's Z axis (camera axis).
      // Orientation-independent: same answer in portrait or landscape.
      let pitchDeg: number | null = null;
      if (mag > 0.1) {
        const clamped = Math.max(-1, Math.min(1, gz / mag));
        pitchDeg = (Math.asin(clamped) * 180) / Math.PI;
      }
      this.ngZone.run(() => {
        this.gravity.set({ x: gx, y: gy, z: gz });
        if (pitchDeg !== null) this.gravityPitchDeg.set(pitchDeg);
      });
    };
    window.addEventListener('devicemotion', this.boundMotion, true);
  }

  stop(): void {
    if (this.bound) window.removeEventListener(this.boundEvent, this.bound as EventListener, true);
    if (this.boundMotion) window.removeEventListener('devicemotion', this.boundMotion, true);
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
   * Given a compass bearing to a fossil and a distance in meters, returns
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
