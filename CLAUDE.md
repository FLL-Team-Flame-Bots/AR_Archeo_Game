# AR Archeo Game — agent guide

Outdoor GPS + AR archaeology game by [Flame Bots](https://flamebots.org) (FLL Team 67092).
Walk around the real world, find GPS-anchored fossils, view them in AR through the
phone camera, brush them clean, and climb a Firestore leaderboard.

Angular 21 (standalone components + signals) · Three.js · Firebase (Hosting + Firestore).

## ⚠️ Deployment topology — read this first (it is not obvious)

**The live site `https://ar.flamebots.org` is served by FIREBASE HOSTING, not GitHub Pages.**

```
ar.flamebots.org  --CNAME-->  austin-test-450819.web.app  (Firebase Hosting, default site)
```

- The `gh-pages` branch and its `CNAME` file are **DEAD / abandoned leftovers.** Nothing
  resolves to them. Do NOT use `gh-pages` to reason about what is live — it is months stale
  (an old Android-only WebXR build) and will mislead you. Verify the live build instead:
  `curl -sL https://ar.flamebots.org/ | grep main-` then curl that JS and grep for the version.
- **Deploys are currently MANUAL:** someone runs `npx firebase deploy` (or `--only hosting`)
  from their machine. The `.firebase/hosting.*.cache` file is the fingerprint of the last
  manual deploy.
- The GitHub Actions workflows (`.github/workflows/firebase-hosting-*.yml`) only trigger on
  the **`main`** branch. `main` is STALE (Android-only v4.0.x). All real work — including all
  iOS 8th Wall support — lives on the **`ios-safari-support`** branch, which has never been
  merged to `main`. So CI is effectively NOT publishing the real game; manual deploy is.

### Firebase project
- Project: **`austin-test-450819`** (Blaze plan).
- Two Hosting targets defined in `firebase.json` / `.firebaserc`:
  - `android` → site `austin-test-450819` (this is what `ar.flamebots.org` points at)
  - `ios` → site `austin-test-450819-ios`
  Both serve the **identical** build (`dist/AR_Archeo_Game/browser`) — see "one build" below,
  the iOS/Android split is at runtime, not build time.
- Firestore holds the leaderboard at `/users/{uid}`. Rules in `firestore.rules` enforce
  anti-cheat: monotonic score, per-write delta cap, 3 s rate limit, no deletes.

## Branches

| Branch | State |
|---|---|
| `ios-safari-support` | **ACTIVE / real game.** v4.5.x, full 8th Wall iOS + WebXR Android. Ahead of `main`, unmerged. Develop here. |
| `main` | STALE — Android-only WebXR v4.0.x. The CI auto-deploy target, but not the live build. |
| `fix/ux-and-leaks` | Old fix branch (v3.3.x). |
| `gh-pages` | DEAD. Abandoned GitHub Pages build + stale `CNAME`. Ignore. |

## Architecture: one codebase, one build, runtime engine selection

There is no separate iOS build and Android build. The same JS bundle detects the platform at
runtime and picks an AR engine. All of this lives in `src/app/services/ar.service.ts`.

- `checkSupport()` tries WebXR `immersive-ar` first.
  - **Supported (Android Chrome + ARCore)** → WebXR path. `iosFallback = false`.
  - **Not supported (iOS Safari, etc.)** → **8th Wall** path. `iosFallback = true`.
- **Android / WebXR** (`startAR` + `tick`): native `THREE.WebGLRenderer` with `renderer.xr`,
  downward hit-test ray for live ground height, XR `select` events for taps, native
  `dom-overlay` for UI. **All interactive UI MUST be a descendant of `.ar-overlay`** — during
  an `immersive-ar` session the compositor only shows dom-overlay descendants; anything outside
  is invisible.
- **iOS / 8th Wall** (`startAR8thWall`): the free `@8thwall/engine-binary` loaded via the CDN
  `<script>` in `src/index.html` (no app key). Real SLAM 6DoF. XR8 takes over the canvas/GL and
  supplies its own scene/camera/renderer; in `onStart` we swap `this.scene/camera/renderer` to
  XR8's instances and carry lights + fossils over, so all shared logic works unchanged. No
  hit-test in the engine-binary subset, so ground = `camera.y - DEVICE_HEIGHT_M` fed through a
  per-cell spatial averaging cache. Taps route through a DOM-overlay tap → manual raycast.
  Requires a visible "Powered by 8th Wall" credit (license).
- **Shared:** GPS-origin anchoring (placed once, SLAM tracks the rest), per-cell ground-height
  cache, per-fossil ground refinement + locking, fossil spawning/rarity, leaderboard,
  localStorage persistence. The splash + HUD show `v<x>-iphone-8thwall` or `v<x>-android-webxr`
  so you can confirm which engine a device selected.

## Key files

- `src/app/services/ar.service.ts` — the AR engine fork + all 3D/tracking logic.
- `src/app/components/ar-view/ar-view.component.ts` — main game component, fossil spawning,
  GPS origin, UI overlay (note the dom-overlay rule above).
- `src/app/services/{gps,orientation,firebase,account,leaderboard}.service.ts`
- `firestore.rules` — leaderboard anti-cheat.
- `src/environments/environment.ts` — Firebase web config (public keys, safe to commit).

## Commands

```bash
npm install
npm start -- --host 0.0.0.0          # dev server
npx localtunnel --port 4200          # expose over HTTPS for on-device testing (WebXR needs HTTPS)
npm run build                        # prod build → dist/AR_Archeo_Game/browser
npx firebase deploy                  # manual deploy to Firebase Hosting (current real deploy path)
```

## Conventions
- American English spelling in code/comments (behavior, color, meter, math).
- Requirements: Android needs Chrome + ARCore (Samsung Internet / Firefox lack WebXR); iOS uses
  Safari via 8th Wall. HTTPS required everywhere (WebXR + camera).
