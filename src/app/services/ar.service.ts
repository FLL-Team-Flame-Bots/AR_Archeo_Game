import { Injectable, NgZone, signal } from '@angular/core';
import * as THREE from 'three';

@Injectable({ providedIn: 'root' })
export class ArService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private xrSession: XRSession | null = null;
  private fossilMeshes: Map<string, THREE.Mesh> = new Map();
  private animationId: number = 0;

  supported = signal(false);
  active = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

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

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffd27d, 1.5);
    dirLight.position.set(1, 2, 1);
    this.scene.add(dirLight);
  }

  async startAR(): Promise<void> {
    if (!navigator.xr) {
      this.error.set('WebXR not available in this browser');
      return;
    }

    this.error.set(null);
    this.loading.set(true);

    try {
      this.xrSession = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: [],
        optionalFeatures: ['hit-test'],
      });

      // Must be awaited — session isn't ready to render until this resolves
      await this.renderer.xr.setSession(this.xrSession);
      this.active.set(true);

      this.xrSession.addEventListener('end', () => {
        this.ngZone.run(() => {
          this.active.set(false);
          this.loading.set(false);
          this.xrSession = null;
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
    this.renderer.setAnimationLoop(null);
  }

  placeFossil(id: string, position: THREE.Vector3): void {
    if (this.fossilMeshes.has(id)) return;

    // Fossil bone visual — simple geometry placeholder until real models are added
    const group = new THREE.Group();

    const bodyGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0xc8a86b, roughness: 0.8 });
    const body = new THREE.Mesh(bodyGeo, material);
    group.add(body);

    // Glow ring
    const ringGeo = new THREE.TorusGeometry(0.07, 0.005, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.6 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    group.position.copy(position);
    this.scene.add(group);
    this.fossilMeshes.set(id, group as unknown as THREE.Mesh);
  }

  removeFossil(id: string): void {
    const mesh = this.fossilMeshes.get(id);
    if (mesh) {
      this.scene.remove(mesh);
      this.fossilMeshes.delete(id);
    }
  }

  private tick(_frame: XRFrame | null): void {
    // Animate glow rings
    this.fossilMeshes.forEach((mesh) => {
      if (mesh.children?.[1]) {
        mesh.children[1].rotation.z += 0.01;
      }
    });
    this.renderer.render(this.scene, this.camera);
  }
}
