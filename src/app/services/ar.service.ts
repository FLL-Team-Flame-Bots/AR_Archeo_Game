import { Injectable, NgZone, signal } from '@angular/core';
import * as THREE from 'three';
import { DEVICE_HEIGHT_M, OrientationService } from './orientation.service';

/** Minimal typings for the global window.XR8 added by the 8th Wall engine
 *  binary script tag in index.html. There is no official @types package;
 *  full API at https://8thwall.org/docs/engine/overview. */
interface Xr8PipelineModule {
  name: string;
  onStart?: (args: { canvas: HTMLCanvasElement; canvasWidth: number; canvasHeight: number }) => void;
  onUpdate?: (args: { processCpuResult?: unknown; processGpuResult?: unknown; frameStartResult?: unknown }) => void;
  onException?: (err: unknown) => void;
  onAttach?: (args: unknown) => void;
}
interface Xr8Global {
  run: (opts: { canvas: HTMLCanvasElement; allowedDevices?: unknown }) => void;
  stop: () => void;
  addCameraPipelineModules: (mods: unknown[]) => void;
  clearCameraPipelineModules: () => void;
  GlTextureRenderer: { pipelineModule: () => unknown };
  Threejs: {
    pipelineModule: () => unknown;
    xrScene: () => { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer };
  };
  XrController: {
    pipelineModule: () => unknown;
    configure: (opts: { disableWorldTracking?: boolean; scale?: 'absolute' | 'responsive' }) => void;
    recenter?: () => void;
  };
  XrConfig?: { device: () => { ANY: unknown } };
}


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
/** Side length (m) of each spatial cell in the ground-height cache. Smaller
 *  cells capture hill variation more finely but require more walking to
 *  populate; 2 m balances both for human walking speeds. */
const GROUND_CELL_M = 2;
/** Caps the running-average sample count per cell so old samples lose
 *  weight as new ones come in (otherwise a stale value entrenched after
 *  1000 visits would never budge). */
const GROUND_SAMPLE_CAP = 20;
/** Reject any ground sample whose Y is above this threshold (relative to
 *  the AR-start camera). Holding a phone normally always puts the camera
 *  at least ~0.5m above the floor — a "floor" reading higher than this
 *  is impossible and almost certainly SLAM drift or the camera pointed
 *  at the ceiling. Filtering these out keeps the cell averages sane. */
const MAX_GROUND_SAMPLE_Y = -0.5;

@Injectable({ providedIn: 'root' })
export class ArService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private xrSession: XRSession | null = null;
  private fossilMeshes: Map<string, THREE.Mesh> = new Map();
  private tapHandler?: (fossilId: string) => void;

  /** Live ground height (y, in XR/world space) sampled each frame via hit-test
   *  in WebXR mode. In 8th Wall mode it's set once to -DEVICE_HEIGHT_M at
   *  session start (XR8 doesn't expose hit-test in the engine-binary subset). */
  private groundY: number | null = null;
  private hitTestSource: XRHitTestSource | null = null;

  supported = signal(false);
  active = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  /** True when running via 8th Wall engine binary (iOS Safari and any
   *  browser without WebXR immersive-ar). False when using WebXR
   *  (Android Chrome with ARCore). Public so the component can adjust
   *  the splash hint text. With 8th Wall the user CAN walk — SLAM tracks
   *  player position — so the walk-closer collect gate applies in both. */
  iosFallback = signal(false);

  private canvasRef: HTMLCanvasElement | null = null;
  private fullWindowResizeHandler: (() => void) | null = null;
  private rendererResizeHandler: (() => void) | null = null;

  /** Spatial cache of ground heights, keyed by GROUND_CELL_M cell. Built up
   *  as the player walks — each cell stores a running average of observed
   *  ground heights for that area. Used by placeFossil to seat newly-spawned
   *  fossils at the right local terrain height (so a fossil that pops in on
   *  a hill the player already visited starts at the hill's height, not the
   *  player's current location's height). Cleared on stopAR. */
  private groundSamples: Map<string, { avg: number; n: number }> = new Map();
  /** Last cell key we sampled at. Prevents repeated samples within the same
   *  cell from being added every frame — only resamples when the player
   *  walks into a different cell, so phone wobble while standing still
   *  doesn't drift the cell's average. */
  private lastSampledCellKey: string | null = null;

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

    // WebGLRenderer: only created in WebXR mode. In iOS mode, 8th Wall owns
    // the canvas's GL context and provides its own Three.js renderer.
    if (!this.iosFallback()) {
      this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.xr.enabled = true;
      this.renderer.xr.setReferenceSpaceType('local');
    }
  }

  // ── Ground-height cache ────────────────────────────────────────────────────

  private groundCellKey(x: number, z: number): string {
    return `${Math.floor(x / GROUND_CELL_M)}:${Math.floor(z / GROUND_CELL_M)}`;
  }

  /** Add a new ground-height observation at (x, z). Maintains a per-cell
   *  running average, capped at GROUND_SAMPLE_CAP so old values lose weight. */
  private recordSurfaceAt(x: number, z: number, y: number): void {
    const key = this.groundCellKey(x, z);
    const prev = this.groundSamples.get(key);
    if (!prev) {
      this.groundSamples.set(key, { avg: y, n: 1 });
      return;
    }
    const n = Math.min(prev.n + 1, GROUND_SAMPLE_CAP);
    const avg = (prev.avg * prev.n + y) / (prev.n + 1);
    this.groundSamples.set(key, { avg, n });
  }

  /** Best estimate of ground height at (x, z). Null if this cell has no
   *  observations yet — caller should fall back to live groundY. */
  private surfaceAt(x: number, z: number): number | null {
    const cell = this.groundSamples.get(this.groundCellKey(x, z));
    return cell ? cell.avg : null;
  }

  /** Cell-transition ground-sample writer. Called every frame but only adds
   *  a sample the first frame we enter a new cell. Standing still in one
   *  cell while moving the phone up/down does NOT inject more samples, so
   *  phone-height wobble can't drift the cell's averaged ground estimate. */
  private maybeSampleGroundAtPlayer(x: number, z: number, y: number): void {
    const key = this.groundCellKey(x, z);
    if (key === this.lastSampledCellKey) return;
    this.lastSampledCellKey = key;
    this.recordSurfaceAt(x, z, y);
  }

  /** Shared per-fossil refinement loop used by both WebXR tick() and the
   *  8th Wall onUpdate. Decides each fossil's display Y from (priority order):
   *    1. state.recordedY — set once locked or while close, stable.
   *    2. surfaceAt(fossil.x, fossil.z) — cached avg for the fossil's cell.
   *    3. this.groundY — live estimate at the player's current position.
   *  Also runs the close-approach hysteresis that locks recordedY after
   *  CLOSE_APPROACHES_TO_LOCK distinct close passes. */
  private refineFossilGrounds(camX: number, camZ: number): void {
    this.fossilMeshes.forEach((mesh) => {
      const g = mesh as unknown as THREE.Group;
      const dx = g.position.x - camX;
      const dz = g.position.z - camZ;
      const dist = Math.sqrt(dx * dx + dz * dz);

      const cellH = this.surfaceAt(g.position.x, g.position.z);
      const groundForThisFossil = cellH ?? this.groundY ?? 0;

      const state = g.userData as FossilHeightState;
      if (!state.locked) {
        if (dist <= REFINE_RADIUS_M && dist < state.closestSeenDistance) {
          state.recordedY = groundForThisFossil;
          state.closestSeenDistance = dist;
        }
        if (!state.nearZone && dist <= CLOSE_APPROACH_IN_M) {
          state.nearZone = true;
          state.closeApproaches++;
          if (state.closeApproaches >= CLOSE_APPROACHES_TO_LOCK) state.locked = true;
        } else if (state.nearZone && dist > CLOSE_APPROACH_OUT_M) {
          state.nearZone = false;
        }
      }
      g.position.y = state.recordedY ?? groundForThisFossil;
      g.scale.setScalar(Math.max(1, dist / 5));
    });
  }

  async startAR(overlayRoot?: Element): Promise<void> {
    // Snap which way the device was being held at session start. The debug
    // panel surfaces it; downstream code can branch on it (e.g. flip pitch
    // sign in landscape) without needing a screen-orientation listener.
    this.orientation.captureStartOrientation();
    if (this.iosFallback()) {
      await this.startAR8thWall();
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
      this.stop8thWall();
      return;
    }
    if (this.xrSession) {
      await this.xrSession.end();
    }
    if (this.renderer) this.renderer.setAnimationLoop(null);
  }

  /** iOS Safari path: 8th Wall engine binary (free, no app key). Provides
   *  real SLAM/6DoF tracking via the XR8 global loaded from a CDN script tag
   *  in index.html. We hand it our canvas; it takes over the GL context,
   *  renders camera passthrough, and tracks the device through world space.
   *
   *  Our existing scene/camera/renderer (set up in init for the WebXR path)
   *  are swapped to XR8's instances in onStart. Lights and any pre-placed
   *  fossils are moved over to the new scene. From that point on,
   *  `this.scene`/`this.camera`/`this.renderer` all refer to XR8's objects,
   *  so the existing placeFossil/syncARMarkers/grid logic works unchanged. */
  private async startAR8thWall(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    try {
      // 8th Wall's Threejs pipeline module reads window.THREE to bind itself.
      // We import Three.js as an ES module, which never sets the global, so
      // expose it manually before XR8 boots.
      (window as unknown as { THREE: typeof THREE }).THREE = THREE;
      const XR8 = await this.waitForXR8();
      if (!this.canvasRef) throw new Error('AR canvas not initialized');

      const ngZone = this.ngZone;
      const service = this;

      // Dispatched repeatedly during the first ~2s of an AR session and
       // from our pipeline module's onStart, so XR8 picks up the current
       // screen.orientation.angle reliably regardless of when its handler
       // becomes ready. Empirically a single dispatch sometimes lands before
       // XR8's listener is installed and the scene comes up rotated 90°.
      const pushOrientation = () => {
        try { window.dispatchEvent(new Event('orientationchange')); } catch { /* ignore */ }
        try { window.dispatchEvent(new Event('resize')); } catch { /* ignore */ }
      };

      const syncRendererSize = () => {
        if (!service.renderer || !service.camera) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        service.renderer.setPixelRatio(dpr);
        service.renderer.setSize(w, h, false);  // false = don't restyle the canvas (we manage that)
        service.camera.aspect = w / h;
        service.camera.updateProjectionMatrix();
      };

      const appPipelineModule = {
        name: 'archeo-app',
        onStart: () => {
          const xrScene = XR8.Threejs.xrScene();

          // Carry lights + any already-placed fossils into XR8's scene.
          const carryOver: THREE.Object3D[] = [];
          service.scene.children
            .filter(c => c.type === 'AmbientLight' || c.type === 'DirectionalLight')
            .forEach(l => carryOver.push(l));
          service.fossilMeshes.forEach(m => carryOver.push(m as unknown as THREE.Object3D));
          carryOver.forEach(o => xrScene.scene.add(o));

          service.scene = xrScene.scene;
          service.camera = xrScene.camera;
          service.renderer = xrScene.renderer;

          // Three.js renderer was created from the canvas at XR8 boot, which
          // can be at default 300×150 or the video resolution rather than the
          // window size. Resize it now (after Threejs.pipelineModule.onStart)
          // so the 3D overlay fills the same area as the camera feed.
          syncRendererSize();
          window.addEventListener('resize', syncRendererSize);
          window.addEventListener('orientationchange', syncRendererSize);
          service.rendererResizeHandler = syncRendererSize;

          // XR8 starts the camera at the device's pose at session start.
          // Treat that pose as eye height; ground sits DEVICE_HEIGHT_M below.
          // The existing placeFossil/tick logic reads groundY to seat fossils.
          service.groundY = -DEVICE_HEIGHT_M;
          ngZone.run(() => service.groundYSignal.set(service.groundY));

          // Force XR8 to recheck screen orientation now that all pipeline
          // modules are attached. The single dispatch after XR8.run sometimes
          // fires too early — XR8 hasn't installed its handler yet. Firing
          // from onStart guarantees the handler exists.
          setTimeout(pushOrientation, 50);
          setTimeout(pushOrientation, 500);
          setTimeout(pushOrientation, 1500);
        },
        onUpdate: () => {
          const cam = service.camera;
          const camX = cam.position.x;
          const camY = cam.position.y;
          const camZ = cam.position.z;

          // Raw camera-derived ground estimate. Naive use of this as the live
          // groundY makes the whole scene follow phone-vertical motion (lift
          // the iPad → fossils + grid rise with it). To decouple phone-height
          // wobble from real elevation, we feed rawGroundY into the spatial
          // cache and read back the player's CURRENT cell average as groundY.
          // Over many samples in a cell, phone-height variation averages out;
          // walking into a new cell with a different average picks up the
          // real elevation change.
          const rawGroundY = camY - DEVICE_HEIGHT_M;
          // Only sample when the phone is held in a normal forward-viewing
          // pose (gravity-derived pitch within ±35° of horizontal). Tilting
          // up to point at a wall/ceiling or down to point at the floor
          // gives misleading samples — the user's intent is "look at this
          // surface", not "this surface is the ground". Filter those out.
          const phonePitch = service.orientation.gravityPitchDeg();
          const phoneIsLevel = phonePitch !== null && Math.abs(phonePitch) < 35;
          // Also reject impossibly-high ground readings — the floor can't be
          // above the camera-held-at-chest. Catches SLAM drift before it
          // contaminates the cell averages.
          if (phoneIsLevel && rawGroundY < MAX_GROUND_SAMPLE_Y) {
            service.maybeSampleGroundAtPlayer(camX, camZ, rawGroundY);
          }
          const cellAvg = service.surfaceAt(camX, camZ);
          service.groundY = cellAvg ?? rawGroundY;
          ngZone.run(() => service.groundYSignal.set(service.groundY));

          // Per-fossil refinement: each fossil's display Y comes from its
          // own cell's avg or its locked recordedY — independent of player
          // motion or phone height once samples have accumulated.
          service.refineFossilGrounds(camX, camZ);

          // Push debug + camera position at ~4×/sec so signals don't thrash.
          const now = performance.now();
          if (now - service.debugLastFlush > 250) {
            service.debugLastFlush = now;
            const o = service.orientation.orientation();
            // Use the orientation-independent gravity-derived pitch (works in
            // landscape on iPad) instead of the portrait-only beta-90 value.
            const gravPitch = service.orientation.gravityPitchDeg();
            const fc = service.fossilMeshes.size;
            ngZone.run(() => {
              service.cameraPosition.set({ x: camX, z: camZ });
              service.iosDebug.set({
                heading: o?.heading ?? -1,
                pitch: gravPitch ?? -1,
                ref: service.orientation.headingReference() ?? 0,
                yaw: 0,
                camPitch: 0,
                fossilCount: fc, camX, camY, camZ,
              });
            });
          }
        },
        onException: (err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          ngZone.run(() => service.error.set(`8th Wall error: ${msg}`));
        },
      };

      // Size the canvas to fill the window BEFORE XR8.run reads its dimensions.
      // Three.js's pipeline module captures canvas.width/height during onStart
      // to set the camera's aspect ratio — if the canvas is still at its DOM
      // default size (300×150) at that moment, the rendered scene comes out
      // badly distorted ("vertical"-looking) even after a later resize.
      const canvas = this.canvasRef;
      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width  = Math.round(window.innerWidth  * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        canvas.style.width  = window.innerWidth  + 'px';
        canvas.style.height = window.innerHeight + 'px';
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('orientationchange', resizeCanvas);
      this.fullWindowResizeHandler = resizeCanvas;

      // 'absolute' keeps 1 unit = 1 meter, matching our GPS-bearing-to-XR math.
      // 'responsive' (default) auto-scales the world to fit visible content,
      // which warps long-distance placements like ours.
      XR8.XrController.configure({ disableWorldTracking: false, scale: 'absolute' });
      XR8.addCameraPipelineModules([
        XR8.GlTextureRenderer.pipelineModule(),
        XR8.Threejs.pipelineModule(),
        XR8.XrController.pipelineModule(),
        appPipelineModule,
      ]);

      XR8.run({ canvas: this.canvasRef });
      // Additional orientation pushes happen from inside appPipelineModule's
      // onStart (above) — fired AFTER all modules attach, which is the
      // reliable moment for XR8 to pick it up.
      this.active.set(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.error.set(`8th Wall AR failed: ${msg}`);
    } finally {
      this.loading.set(false);
    }
  }

  /** Poll up to 10s for the async <script> tag in index.html to define window.XR8. */
  private async waitForXR8(): Promise<Xr8Global> {
    const w = window as unknown as { XR8?: Xr8Global };
    if (w.XR8?.run) return w.XR8;
    return new Promise<Xr8Global>((resolve, reject) => {
      const start = Date.now();
      const check = () => {
        if (w.XR8?.run) return resolve(w.XR8!);
        if (Date.now() - start > 10000) {
          return reject(new Error('XR8 script failed to load within 10s — check that the script tag in index.html loaded'));
        }
        setTimeout(check, 50);
      };
      check();
    });
  }

  /** Force XR8 to re-anchor the world frame at the current camera pose.
   *  Useful when SLAM has drifted or snapped to a bad orientation — instead
   *  of restarting AR entirely, the user can tap a button to recover. Also
   *  clears the spatial ground cache since old samples are in the (now-
   *  invalid) old world frame. */
  recenter8thWall(): void {
    const XR8 = (window as unknown as { XR8?: Xr8Global }).XR8;
    if (XR8?.XrController?.recenter) XR8.XrController.recenter();
    this.groundSamples.clear();
    this.lastSampledCellKey = null;
    this.groundY = -DEVICE_HEIGHT_M;
    this.ngZone.run(() => this.groundYSignal.set(this.groundY));
  }

  private stop8thWall(): void {
    const XR8 = (window as unknown as { XR8?: Xr8Global }).XR8;
    if (XR8?.stop) XR8.stop();
    if (XR8?.clearCameraPipelineModules) XR8.clearCameraPipelineModules();
    if (this.fullWindowResizeHandler) {
      window.removeEventListener('resize', this.fullWindowResizeHandler);
      window.removeEventListener('orientationchange', this.fullWindowResizeHandler);
      this.fullWindowResizeHandler = null;
    }
    if (this.rendererResizeHandler) {
      window.removeEventListener('resize', this.rendererResizeHandler);
      window.removeEventListener('orientationchange', this.rendererResizeHandler);
      this.rendererResizeHandler = null;
    }
    this.active.set(false);
    this.groundY = null;
    this.groundSamples.clear();
    this.lastSampledCellKey = null;
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
    // Y preference: cached cell height for fossil's location (set if player
    // has already walked through here), else the live ground estimate. This
    // makes a fossil spawning on a hill the player already visited start
    // at the hill's height, not the player's current location's height.
    const cellH = this.surfaceAt(position.x, position.z);
    const y = cellH ?? this.groundY ?? 0;
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
              // initializes the value directly.
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

    // Feed the live hit-test result into the spatial cache at the player's
    // current cell, then run shared per-fossil refinement (same logic 8th Wall
    // mode uses, just with WebXR's hit-test as the ground source instead of
    // camera.y - DEVICE_HEIGHT_M).
    const camX = this.camera.position.x;
    const camZ = this.camera.position.z;
    if (this.groundY !== null) {
      this.maybeSampleGroundAtPlayer(camX, camZ, this.groundY);
    }
    this.refineFossilGrounds(camX, camZ);

    const currentGround = this.groundY ?? 0;
    if (this.gridMesh) this.gridMesh.position.y = currentGround + 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
