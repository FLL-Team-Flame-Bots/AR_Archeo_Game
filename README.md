# ARArcheoGame

An outdoor augmented reality archaeology game built by [FlameBots](https://flamebots.org). Walk around in the real world, discover hidden fossils using GPS proximity, and view them through your phone's camera in AR.

## How It Works

- **Endless GPS grid** — The world is divided into 10 m cells. Each cell you enter rolls 0–2 fossils (25% empty, 50% one, 25% two) and remembers the result, so fossils persist but new ground always has fresh finds.
- **Radar + AR overlay** — Fossils within 40 m appear in the AR camera view, anchored by compass bearing and gyroscope; the HUD radar points at everything active.
- **Walk up to collect** — Get within 5 m to tap a fossil and start the "brush it clean" mini-game.
- **Rarity + levels** — Every spawn rolls a rarity: ~74% common, 25% rare, 1% legendary, 0.01% chroma (epic fossils are hand-placed). Score scales with rarity (1 / 5 / 50 / 1000 pts) and feeds into the player level shown on the HUD.
- **No backend required** — Fully client-side PWA. Works offline after first load.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular (standalone components, signals) |
| AR / 3D | Three.js + WebXR (`immersive-ar`) |
| Camera passthrough | ARCore (Android) via WebXR |
| GPS | Browser Geolocation API |
| Compass / gyro | DeviceOrientationEvent |
| PWA / Play Store | `@angular/pwa` + Trusted Web Activity (TWA) |

## Requirements

- Android device with ARCore support (most phones made after 2018)
- **Google Chrome** (Samsung Internet and Firefox do not support WebXR)
- HTTPS — required by WebXR

## Running Locally

```bash
npm install
npm start -- --host 0.0.0.0
```

To test on a physical Android device, expose the local server over HTTPS:

```bash
npx localtunnel --port 4200
```

Open the tunnel URL in Chrome on your Android device.

## Building for Production

```bash
npm run build
```

Output is in `dist/AR_Archeo_Game/browser`. Deploy to any static host (Firebase Hosting, GitHub Pages, Netlify, etc.).

## Play Store Deployment

The app ships as a PWA and can be wrapped as a Trusted Web Activity (TWA) using [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) for Google Play Store distribution.

## Project Structure

```
src/
  app/
    components/
      ar-view/        # Main camera + AR scene component
      fossil-card/    # Fossil discovery popup
      hud/            # Heads-up display (score, GPS status)
    services/
      ar.service.ts          # Three.js + WebXR session management
      gps.service.ts         # Geolocation tracking + proximity detection
      orientation.service.ts # Compass heading + gyroscope
    data/
      fossils.json    # Fossil definitions (name, rarity, description)
      fossil.model.ts # TypeScript interface
    utils/
      geo.utils.ts    # Haversine distance, random scatter logic
```

## License

MIT — [flamebots.org](https://flamebots.org)
