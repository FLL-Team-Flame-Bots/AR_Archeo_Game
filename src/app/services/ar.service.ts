import { Injectable, NgZone, signal } from '@angular/core';
import * as THREE from 'three';
import { DEVICE_HEIGHT_M } from './orientation.service';

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

  /** Debug readouts for the on-screen floor-detection panel. */
  groundYSignal = signal<number | null>(null);
  hitCount      = signal(0);
  rejectedCount = signal(0);
  lastReject    = signal<string>('');

  private debugHits = 0;
  private debugRej  = 0;
  private debugLast = '';
  private debugLastFlush = 0;

  constructor(private ngZone: NgZone) {}

  async checkSupport(): Promise<boolean> {
    if (!navigator.xr) {
      this.error.set('WebXR not available in this browser');
      return false;
    }
    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    this.supported.set(supported);
    if (!supported) this.error.set('AR not supported on this device');
    return supported;
  }

  async init(canvas: HTMLCanvasElement): Promise<void> {
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
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffd27d, 1.5);
    dirLight.position.set(1, 2, 1);
    this.scene.add(dirLight);
  }

  async startAR(overlayRoot?: Element): Promise<void> {
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
    if (this.xrSession) {
      await this.xrSession.end();
    }
    if (this.renderer) this.renderer.setAnimationLoop(null);
  }

  placeFossil(id: string, position: THREE.Vector3): void {
    if (this.fossilMeshes.has(id)) return;

    const group = new THREE.Group();

    // children[0] — visible sphere body
    const bodyGeo = new THREE.SphereGeometry(0.08, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0xc8a86b, roughness: 0.6, metalness: 0.2 });
    const body = new THREE.Mesh(bodyGeo, material);
    group.add(body);

    // children[1] — inner glow ring (spins)
    const ringGeo = new THREE.TorusGeometry(0.13, 0.008, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.7 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // children[2] — outer pulse ring
    const outerGeo = new THREE.TorusGeometry(0.18, 0.004, 8, 32);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.3 });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    outer.rotation.x = Math.PI / 2;
    group.add(outer);

    // children[3] — downward cone locator, bobs up/down
    const coneGeo = new THREE.ConeGeometry(0.03, 0.09, 6);
    const coneMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.rotation.z = Math.PI;
    cone.position.y = 0.24;
    group.add(cone);

    // children[4] — invisible large hit sphere for tap detection
    const hitGeo = new THREE.SphereGeometry(0.28, 6, 6);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitSphere = new THREE.Mesh(hitGeo, hitMat);
    group.add(hitSphere);

    // position is a camera-relative offset; convert to world space by adding
    // the camera's current position so fossils are anchored to the real world,
    // not to the AR session origin. Y comes from the live ground hit-test
    // when available, falling back to the caller's y (usually -deviceHeight).
    const y = this.groundY ?? position.y;
    group.position.set(
      this.camera.position.x + position.x,
      y,
      this.camera.position.z + position.z,
    );
    this.scene.add(group);
    this.fossilMeshes.set(id, group as unknown as THREE.Mesh);
  }

  setTapHandler(fn: (fossilId: string) => void): void {
    this.tapHandler = fn;
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
    const raycaster = new THREE.Raycaster(origin.clone(), direction.clone().normalize(), 0.01, 20);

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
    this.ngZone.run(() => {
      this.groundYSignal.set(g);
      this.hitCount.set(h);
      this.rejectedCount.set(r);
      this.lastReject.set(last);
    });
  }

  private tick(frame: XRFrame | null): void {
    const t = performance.now() / 1000;

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

    // Keep fossils seated on the ground. A fossil adopts the current ground
    // height only when the player is within UPDATE_GROUND_R_M of it, so a
    // fossil on flat grass doesn't jump when the player walks up a hill.
    const currentGround   = this.groundY ?? -DEVICE_HEIGHT_M;
    const UPDATE_GROUND_R = 4; // metres

    this.fossilMeshes.forEach((mesh) => {
      const g = mesh as unknown as THREE.Group;
      const dx = g.position.x - this.camera.position.x;
      const dz = g.position.z - this.camera.position.z;
      if (dx * dx + dz * dz < UPDATE_GROUND_R * UPDATE_GROUND_R) {
        g.position.y = currentGround;
      }
      if (mesh.children[1]) mesh.children[1].rotation.z += 0.015;
      if (mesh.children[2]) {
        mesh.children[2].rotation.z -= 0.008;
        const mat = (mesh.children[2] as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = 0.15 + Math.abs(Math.sin(t * 1.5)) * 0.25;
      }
      if (mesh.children[3]) {
        mesh.children[3].position.y = 0.24 + Math.sin(t * 2.5) * 0.03;
      }
    });
    this.renderer.render(this.scene, this.camera);
  }
}
