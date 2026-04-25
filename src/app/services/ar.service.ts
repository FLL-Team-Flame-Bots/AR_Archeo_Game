import { Injectable, NgZone, signal } from '@angular/core';
import * as THREE from 'three';
import { DEVICE_HEIGHT_M, OrientationService } from './orientation.service';

/** Per-fossil ground-height state. Attached to each fossil group's userData.
 *  Converges to the closest observation of the player's groundY and locks
 *  after two distinct approaches inside 1.5 m, so distant fossils on flat
 *  terrain don't jump around when the player walks up a hill. */
interface FossilHeightState {
  /** Last accepted ground height for this fossil. Null until first obs. */
  recordedY: number | null;
  /** Closest player-to-fossil distance at which recordedY was updated. */
  closestSeenDistance: number;
  /** Count of transitions from outside 1.5 m to inside. Locks at 2. */
  closeApproaches: number;
  /** Hysteresis flag: true while inside 1.5 m, cleared when past 1.7 m. */
  nearZone: boolean;
  /** Once true, recordedY is never updated again. */
  locked: boolean;
}

/** Convert (alpha, beta, gamma) device orientation + screen angle (all
 *  degrees) into a Three.js quaternion. Same algorithm Three.js's
 *  DeviceOrientationControls uses — handles portrait/landscape correctly. */
function quatFromDeviceOrientation(
  alphaDeg: number, betaDeg: number, gammaDeg: number, screenAngleDeg: number,
): THREE.Quaternion {
  const alpha = (alphaDeg * Math.PI) / 180;
  const beta  = (betaDeg  * Math.PI) / 180;
  const gamma = (gammaDeg * Math.PI) / 180;
  const orient = (screenAngleDeg * Math.PI) / 180;

  // YXZ Euler from device frame
  const euler = new THREE.Euler(beta, alpha, -gamma, 'YXZ');
  const q = new THREE.Quaternion().setFromEuler(euler);

  // Camera looks out the device's -Z (back side) — this is the standard
  // "the device is held like a phone" rotation.
  const Q1 = new THREE.Quaternion(-Math.SQRT1_2, 0, 0, Math.SQRT1_2);
  q.multiply(Q1);

  // Adjust for screen orientation (portrait/landscape rotation).
  const Q0 = new THREE.Quaternion();
  Q0.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -orient);
  q.multiply(Q0);

  return q;
}

/** Inside this distance the fossil's Y can be refined by the player's Y. */
const REFINE_RADIUS_M = 5;
/** Entering this distance counts as a close-approach observation. */
const CLOSE_APPROACH_IN_M = 1.5;
/** Must leave past this distance before another close-approach can count. */
const CLOSE_APPROACH_OUT_M = 1.7;
/** Number of close approaches that lock the fossil's Y forever. */
const CLOSE_APPROACHES_TO_LOCK = 2;

@Injectable({ providedIn: 'root' })
export class ArService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private xrSession: XRSession | null = null;
  private fossilMeshes: Map<string, THREE.Mesh> = new Map();
  private animationId: number = 0;
  private tapHandler?: (fossilId: string) => void;

  /** Live ground height (y, in XR local space) sampled each frame via hit-test.
   *  Null until the first hit succeeds; fallback is -DEVICE_HEIGHT_M. */
  private groundY: number | null = null;
  private hitTestSource: XRHitTestSource | null = null;

  supported = signal(false);
  active = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  /** True when running via camera + DeviceOrientation fallback (iOS Safari).
   *  False when using WebXR (Android Chrome). Public so the component can
   *  skip the walk-closer distance gate (no walking possible in fallback). */
  iosFallback = signal(false);

  private canvasRef: HTMLCanvasElement | null = null;
  private videoEl: HTMLVideoElement | null = null;
  private videoStream: MediaStream | null = null;

  /** Captured on the first orientation reading after iOS-mode AR starts.
   *  Subsequent frames apply (referenceQuat^-1 * currentDeviceQuat) so the
   *  camera starts looking at scene -Z (matches fossil placement) regardless
   *  of how the iPad was tilted at session start. */
  private referenceQuat: THREE.Quaternion | null = null;

  /** Camera position in XR world space, updated every frame. */
  cameraPosition = signal<{ x: number; z: number }>({ x: 0, z: 0 });

  /** iOS-mode debug readout: current camera rotation + orientation input,
   *  so we can see whether the rotation pipeline is wired up. */
  iosDebug = signal<{
    heading: number; pitch: number; ref: number; yaw: number; camPitch: number;
    fossilCount: number; camX: number; camY: number; camZ: number;
  } | null>(null);

  /** Debug readouts for the on-screen floor-detection panel. */
  groundYSignal = signal<number | null>(null);
  hitCount      = signal(0);
  rejectedCount = signal(0);
  lastReject    = signal<string>('');

  private debugHits = 0;
  private debugRej  = 0;
  private debugLast = '';
  private debugLastFlush = 0;

  constructor(private ngZone: NgZone, private orientation: OrientationService) {}

  async checkSupport(): Promise<boolean> {
    // Prefer WebXR immersive-ar (Android Chrome with ARCore).
    if (navigator.xr) {
      try {
        const xrOk = await navigator.xr.isSessionSupported('immersive-ar');
        if (xrOk) {
          this.iosFallback.set(false);
          this.supported.set(true);
          return true;
        }
      } catch { /* fall through to camera fallback */ }
    }
    // iOS Safari path: camera passthrough via getUserMedia + DeviceOrientation.
    const hasGum = !!navigator.mediaDevices?.getUserMedia;
    const hasOrient = typeof DeviceOrientationEvent !== 'undefined';
    if (hasGum && hasOrient) {
      this.iosFallback.set(true);
      this.supported.set(true);
      return true;
    }
    this.error.set('AR requires a device with camera and orientation sensors');
    return false;
  }

  async init(canvas: HTMLCanvasElement): Promise<void> {
    this.canvasRef = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.xr.enabled = true;
    this.renderer.xr.setReferenceSpaceType('local');

    // Non-XR fallback: raycast using touch coords against camera
    canvas.addEventListener('touchend', (e) => {
      if (this.xrSession) return;
      const touch = (e as TouchEvent).changedTouches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((touch.clientX - rect.left) / rect.width) * 2 - 1,
        -((touch.clientY - rect.top) / rect.height) * 2 + 1,
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, this.camera);
      this.checkFossilHit(raycaster.ray.origin, raycaster.ray.direction);
    }, { passive: true });

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffd27d, 1.5);
    dirLight.position.set(1, 2, 1);
    this.scene.add(dirLight);
  }

  async startAR(overlayRoot?: Element): Promise<void> {
    if (this.iosFallback()) {
      await this.startARFallback();
      return;
    }

    if (!navigator.xr) {
      this.error.set('WebXR not available in this browser');
      return;
    }

    this.error.set(null);
    this.loading.set(true);

    try {
      const sessionInit: Record<string, unknown> = {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
      };
      if (overlayRoot) sessionInit['domOverlay'] = { root: overlayRoot };

      this.xrSession = await (navigator.xr as any).requestSession('immersive-ar', sessionInit);

      await this.renderer.xr.setSession(this.xrSession);
      this.active.set(true);

      // Request a persistent hit-test source that fires a ray straight down
      // from the viewer each frame — we use the hit's y as the live ground level.
      const session = this.xrSession!;
      try {
        const viewerSpace = await session.requestReferenceSpace('viewer');
        const XRRayCtor = (window as unknown as { XRRay: new (init: object) => object }).XRRay;
        const downRay = new XRRayCtor({
          origin:    { x: 0, y: 0, z: 0, w: 1 },
          direction: { x: 0, y: -1, z: 0, w: 0 },
        });
        this.hitTestSource = await (session as unknown as {
          requestHitTestSource: (opts: { space: XRSpace; offsetRay: object }) => Promise<XRHitTestSource>;
        }).requestHitTestSource({ space: viewerSpace, offsetRay: downRay });
      } catch {
        // Hit-test unavailable — fossils will use the fallback height instead.
        this.hitTestSource = null;
      }

      // XR screen tap — get the input ray and raycast against fossil hit spheres
      this.xrSession!.addEventListener('select', (event: Event) => {
        const xrEvent = event as any; // XRInputSourceEvent
        const refSpace = this.renderer.xr.getReferenceSpace();
        if (!refSpace || !xrEvent.frame || !xrEvent.inputSource) return;

        const pose = xrEvent.frame.getPose(xrEvent.inputSource.targetRaySpace, refSpace);
        if (!pose) return;

        const m = new THREE.Matrix4().fromArray(pose.transform.matrix);
        const origin = new THREE.Vector3().setFromMatrixPosition(m);
        const quat = new THREE.Quaternion().setFromRotationMatrix(m);
        const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(quat).normalize();

        this.checkFossilHit(origin, direction);
      });

      this.xrSession!.addEventListener('end', () => {
        this.ngZone.run(() => {
          this.active.set(false);
          this.loading.set(false);
          this.xrSession = null;
          this.hitTestSource = null;
          this.groundY = null;
          this.debugHits = 0;
          this.debugRej  = 0;
          this.debugLast = '';
          this.groundYSignal.set(null);
          this.hitCount.set(0);
          this.rejectedCount.set(0);
          this.lastReject.set('');
        });
      });

      this.ngZone.runOutsideAngular(() => {
        this.renderer.setAnimationLoop((_time, frame) => {
          this.tick(frame);
        });
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.error.set(`AR failed: ${msg}`);
      if (this.xrSession) {
        await this.xrSession.end().catch(() => {});
        this.xrSession = null;
      }
    } finally {
      this.loading.set(false);
    }
  }

  async stopAR(): Promise<void> {
    if (this.iosFallback()) {
      this.stopFallback();
      return;
    }
    if (this.xrSession) {
      await this.xrSession.end();
    }
    if (this.renderer) this.renderer.setAnimationLoop(null);
  }

  /** iOS Safari path: camera feed as background, Three.js canvas transparent
   *  on top, camera rotation driven by DeviceOrientationEvent. No SLAM, no
   *  hit-test — player is stationary at origin and rotates to look around. */
  private async startARFallback(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });

      if (!this.videoEl) {
        const video = document.createElement('video');
        video.playsInline = true;
        video.muted = true;
        video.autoplay = true;
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
        Object.assign(video.style, {
          position: 'fixed', inset: '0', width: '100%', height: '100%',
          objectFit: 'cover', zIndex: '0',
        });
        // Insert video immediately before the canvas so canvas layers on top.
        const parent = this.canvasRef?.parentElement ?? document.body;
        parent.insertBefore(video, this.canvasRef ?? null);
        this.videoEl = video;
      }
      this.videoEl.style.display = 'block';
      this.videoEl.srcObject = this.videoStream;
      await this.videoEl.play();

      if (this.canvasRef) this.canvasRef.style.zIndex = '1';
      this.renderer.setClearColor(0x000000, 0);

      // Eye at human height; ground at y=0. Matches WebXR's local ref space,
      // so fossils (y=0) and grid (y=0.02) sit naturally below the horizon
      // when the user holds the iPad upright (pitch≈0).
      this.camera.position.set(0, DEVICE_HEIGHT_M, 0);
      this.camera.rotation.set(0, 0, 0);
      this.referenceQuat = null;  // re-capture on next valid frame

      // Debug test marker — bright red sphere 3m in front of camera at
      // ground level. If the user can see this but not the GPS-based
      // fossils, the issue is fossil placement direction, not rendering.
      const testGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const testMat = new THREE.MeshStandardMaterial({
        color: 0xff2040, emissive: 0xff2040, emissiveIntensity: 0.6,
      });
      const testMesh = new THREE.Mesh(testGeo, testMat);
      testMesh.position.set(0, 0.4, -3);
      testMesh.userData['testMarker'] = true;
      this.scene.add(testMesh);

      this.active.set(true);

      this.ngZone.runOutsideAngular(() => {
        const tick = () => {
          if (!this.active() || !this.iosFallback()) return;
          this.tickFallback();
          this.animationId = requestAnimationFrame(tick);
        };
        this.animationId = requestAnimationFrame(tick);
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.error.set(`Camera/AR failed: ${msg}`);
      this.stopFallback();
    } finally {
      this.loading.set(false);
    }
  }

  private stopFallback(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(t => t.stop());
      this.videoStream = null;
    }
    if (this.videoEl) {
      this.videoEl.srcObject = null;
      this.videoEl.style.display = 'none';
    }
    // Remove the debug test marker if present
    const marker = this.scene?.children.find(o => (o as THREE.Mesh).userData?.['testMarker']);
    if (marker) {
      this.scene.remove(marker);
      const m = marker as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material as THREE.Material | THREE.Material[];
      if (Array.isArray(mat)) mat.forEach(x => x.dispose());
      else if (mat) mat.dispose();
    }
    this.active.set(false);
    this.camera.rotation.set(0, 0, 0);
  }

  private tickFallback(): void {
    const o = this.orientation.orientation();
    const raw = this.orientation.rawOrientation();
    let deviceHeading = -1, devicePitch = -1;
    if (o) { deviceHeading = o.heading; devicePitch = o.pitch; }

    if (raw) {
      // Standard pattern from Three.js DeviceOrientationControls: convert
      // (alpha, beta, gamma) + screen orientation into a quaternion that
      // represents the device's pose in world space. Then divide by the
      // reference quaternion captured at session start so the camera starts
      // facing scene -Z and rotates relative to the user's initial pose.
      const screenAngleDeg = (screen.orientation?.angle ?? 0);
      const current = quatFromDeviceOrientation(raw.alpha, raw.beta, raw.gamma, screenAngleDeg);
      if (!this.referenceQuat) {
        this.referenceQuat = current.clone();
      }
      // camera = ref^-1 * current
      const refInv = this.referenceQuat.clone().invert();
      this.camera.quaternion.copy(refInv).multiply(current);
    }

    // Push debug values at most 4×/sec to avoid signal-update thrash.
    const now = performance.now();
    if (now - this.debugLastFlush > 250) {
      this.debugLastFlush = now;
      const cx = this.camera.position.x;
      const cy = this.camera.position.y;
      const cz = this.camera.position.z;
      const fc = this.fossilMeshes.size;
      const ref = this.orientation.headingReference() ?? deviceHeading;
      const e = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
      this.ngZone.run(() => this.iosDebug.set({
        heading: deviceHeading, pitch: devicePitch, ref, yaw: e.y, camPitch: e.x,
        fossilCount: fc, camX: cx, camY: cy, camZ: cz,
      }));
    }

    // Fallback has no hit-test — fossils stay at the Y set in placeFossil.
    // Still scale by distance so distant ones stay readable.
    this.fossilMeshes.forEach((mesh) => {
      const g = mesh as unknown as THREE.Group;
      const dx = g.position.x - this.camera.position.x;
      const dz = g.position.z - this.camera.position.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      g.scale.setScalar(Math.max(1, dist / 5));
    });

    this.renderer.render(this.scene, this.camera);
  }

  placeFossil(id: string, position: THREE.Vector3, shiny = false): void {
    if (this.fossilMeshes.has(id)) return;

    const group = new THREE.Group();

    // children[0] — visible sphere body (shinies get a bright emissive sheen)
    const bodyGeo = new THREE.SphereGeometry(0.08, 10, 10);
    const material = shiny
      ? new THREE.MeshStandardMaterial({
          color: 0xfff4c2, roughness: 0.2, metalness: 0.9,
          emissive: 0xffe080, emissiveIntensity: 0.55,
        })
      : new THREE.MeshStandardMaterial({ color: 0xc8a86b, roughness: 0.6, metalness: 0.2 });
    const body = new THREE.Mesh(bodyGeo, material);
    group.add(body);

    // children[1] — invisible large hit sphere for tap detection
    const hitGeo = new THREE.SphereGeometry(0.28, 6, 6);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitSphere = new THREE.Mesh(hitGeo, hitMat);
    group.add(hitSphere);

    // Position is an origin-relative world-space offset (anchored to the GPS
    // origin captured at AR session start). Place directly — do NOT add the
    // camera position, or fossils drift as the player walks.
    // Both modes: ground is y=0. WebXR refines with live hit-test; fallback
    // stays at 0 because there is no hit-test.
    const y = this.groundY ?? 0;
    group.position.set(position.x, y, position.z);
    const heightState: FossilHeightState = {
      recordedY: null,
      closestSeenDistance: Infinity,
      closeApproaches: 0,
      nearZone: false,
      locked: false,
    };
    group.userData = heightState;
    this.scene.add(group);
    this.fossilMeshes.set(id, group as unknown as THREE.Mesh);
  }

  xrDistanceTo(fossilId: string): number {
    const mesh = this.fossilMeshes.get(fossilId);
    if (!mesh) return Infinity;
    return this.camera.position.distanceTo(mesh.position);
  }

  setTapHandler(fn: (fossilId: string) => void): void {
    this.tapHandler = fn;
  }

  /** Raycast at the given screen coords and fire tapHandler if a fossil is hit.
   *  Used when pointer events are captured by a DOM overlay above the canvas
   *  (iOS fallback) so we can't rely on the canvas's own touchend listener. */
  handleTap(clientX: number, clientY: number): void {
    if (!this.canvasRef || !this.camera) return;
    if (this.xrSession) return;  // WebXR 'select' handles taps during immersive-ar.
    const rect = this.canvasRef.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, this.camera);
    this.checkFossilHit(raycaster.ray.origin, raycaster.ray.direction);
  }

  private gridMesh: THREE.LineSegments | null = null;

  /** Draws a wireframe overlay of grid cells on the ground.
   *  `segments` is a flat list of (start,end) pairs in camera-relative XZ.
   *  Y is taken from the live ground hit-test, with a small lift so lines
   *  don't z-fight with the real floor. */
  placeGrid(segments: { x1: number; z1: number; x2: number; z2: number }[]): void {
    if (this.gridMesh) {
      this.scene.remove(this.gridMesh);
      this.gridMesh.geometry.dispose();
      (this.gridMesh.material as THREE.Material).dispose();
    }
    if (segments.length === 0) {
      this.gridMesh = null;
      return;
    }
    const cx = this.camera.position.x;
    const cz = this.camera.position.z;
    const positions = new Float32Array(segments.length * 6);
    segments.forEach((s, i) => {
      positions[i * 6 + 0] = cx + s.x1;
      positions[i * 6 + 1] = 0;
      positions[i * 6 + 2] = cz + s.z1;
      positions[i * 6 + 3] = cx + s.x2;
      positions[i * 6 + 4] = 0;
      positions[i * 6 + 5] = cz + s.z2;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: 0xffd700, transparent: true, opacity: 0.55,
    });
    this.gridMesh = new THREE.LineSegments(geo, mat);
    this.gridMesh.position.y = (this.groundY ?? 0) + 0.02;
    this.scene.add(this.gridMesh);
  }

  clearGrid(): void {
    this.placeGrid([]);
  }

  removeFossil(id: string): void {
    const mesh = this.fossilMeshes.get(id);
    if (mesh) {
      this.scene.remove(mesh);
      (mesh as unknown as THREE.Group).traverse(obj => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach(x => x.dispose());
        else if (mat) mat.dispose();
      });
      this.fossilMeshes.delete(id);
    }
  }

  /** Raycast along origin→direction; fires tapHandler with fossil ID if a fossil is hit. */
  private checkFossilHit(origin: THREE.Vector3, direction: THREE.Vector3): void {
    const raycaster = new THREE.Raycaster(origin.clone(), direction.clone().normalize(), 0.01, 50);

    // Map every child object → parent fossil ID for quick lookup after intersection
    const objectToId = new Map<THREE.Object3D, string>();
    this.fossilMeshes.forEach((group, id) => {
      (group as unknown as THREE.Group).traverse(child => objectToId.set(child, id));
      objectToId.set(group as unknown as THREE.Object3D, id);
    });

    const targets = Array.from(objectToId.keys());
    const intersects = raycaster.intersectObjects(targets, false);

    if (intersects.length > 0) {
      const fossilId = objectToId.get(intersects[0].object);
      if (fossilId) {
        this.ngZone.run(() => this.tapHandler?.(fossilId));
      }
    }
  }

  /** Pushes debug counters into signals at most ~4×/sec so CD doesn't thrash. */
  private flushDebug(force: boolean): void {
    const now = performance.now();
    if (!force && now - this.debugLastFlush < 250) return;
    this.debugLastFlush = now;
    const g = this.groundY;
    const h = this.debugHits;
    const r = this.debugRej;
    const last = this.debugLast;
    const cx = this.camera.position.x;
    const cz = this.camera.position.z;
    this.ngZone.run(() => {
      this.cameraPosition.set({ x: cx, z: cz });
      this.groundYSignal.set(g);
      this.hitCount.set(h);
      this.rejectedCount.set(r);
      this.lastReject.set(last);
    });
  }

  private tick(frame: XRFrame | null): void {
    // Three.js copies cameraXR.matrixWorld onto the user camera but never
    // writes back to camera.position — it stays (0, 0, 0) forever. Extract
    // world position ourselves so cameraPosition/precisePosition can track
    // the player as they walk.
    if (this.renderer.xr.isPresenting) {
      const xrCam = this.renderer.xr.getCamera();
      this.camera.position.setFromMatrixPosition(xrCam.matrixWorld);
    }

    // Sample the ground below the viewer each frame via WebXR hit-test.
    // Filter the raw hit: (1) horizontal surfaces only (reject walls, slopes,
    // car hoods), (2) sanity-range around the camera's y (reject ceilings and
    // weird jumps), (3) low-pass smoothing so a single bad hit can't teleport
    // fossils.
    if (frame && this.hitTestSource) {
      const refSpace = this.renderer.xr.getReferenceSpace();
      if (refSpace) {
        const hits = (frame as unknown as {
          getHitTestResults: (src: XRHitTestSource) => { getPose: (s: XRReferenceSpace) => XRPose | null }[];
        }).getHitTestResults(this.hitTestSource);
        if (hits.length > 0) {
          const pose = hits[0].getPose(refSpace);
          if (pose) {
            const q = pose.transform.orientation;
            const normal = new THREE.Vector3(0, 1, 0)
              .applyQuaternion(new THREE.Quaternion(q.x, q.y, q.z, q.w));

            const hitY   = pose.transform.position.y;
            const camY   = this.camera.position.y;
            const isFlat = normal.y > 0.85;                 // ~≤32° from vertical
            const inRange = hitY > camY - 2.5 && hitY < camY + 0.5;

            if (isFlat && inRange) {
              // Low-pass filter: 80% previous, 20% new. First accepted hit
              // initialises the value directly.
              const firstHit = this.groundY === null;
              this.groundY = firstHit
                ? hitY
                : this.groundY! * 0.8 + hitY * 0.2;
              this.debugHits++;
              if (firstHit) this.flushDebug(true);
            } else {
              this.debugRej++;
              this.debugLast = !isFlat
                ? `slope(n.y=${normal.y.toFixed(2)})`
                : `range(Δ=${(hitY - camY).toFixed(2)}m)`;
            }
          }
        }
      }
      this.flushDebug(false);
    }
    // Always push camera position even if hit-test is unavailable,
    // so precisePosition stays up to date as the player walks.
    this.flushDebug(false);

    // Keep all fossils seated on the ground. In WebXR local space the floor
    // is at y≈0; we refine with hit-test when available.
    const currentGround = this.groundY ?? 0;

    this.fossilMeshes.forEach((mesh) => {
      const g = mesh as unknown as THREE.Group;
      const dx = g.position.x - this.camera.position.x;
      const dz = g.position.z - this.camera.position.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      // Per-fossil ground-Y refinement. The fossil's recorded Y is updated
      // only from progressively closer observations, and is frozen after two
      // distinct close approaches. Fossils with no observation yet fall back
      // to the live global groundY (old behaviour).
      const state = g.userData as FossilHeightState;
      if (!state.locked) {
        if (dist <= REFINE_RADIUS_M && dist < state.closestSeenDistance) {
          state.recordedY = currentGround;
          state.closestSeenDistance = dist;
        }
        // Close-approach counter with 1.5 m enter / 1.7 m exit hysteresis.
        if (!state.nearZone && dist <= CLOSE_APPROACH_IN_M) {
          state.nearZone = true;
          state.closeApproaches++;
          if (state.closeApproaches >= CLOSE_APPROACHES_TO_LOCK) {
            state.locked = true;
          }
        } else if (state.nearZone && dist > CLOSE_APPROACH_OUT_M) {
          state.nearZone = false;
        }
      }
      g.position.y = state.recordedY ?? currentGround;

      // Scale with distance so a 0.08 m sphere stays readable past 5 m.
      // At the 5 m collection radius it's normal-sized; at 30 m it's ~6×.
      g.scale.setScalar(Math.max(1, dist / 5));
    });

    // Keep the grid overlay flush with the live ground (lifted slightly to avoid z-fighting).
    if (this.gridMesh) this.gridMesh.position.y = currentGround + 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
