# ARArcheoGame

An outdoor augmented reality archaeology game built by [FlameBots](https://flamebots.org). Walk around in the real world, discover hidden fossils using GPS proximity, and view them through your phone's camera in AR.

## How It Works

- **GPS-based discovery** — Fossils are randomly scattered within 30–150 m of you when the app starts. Walk near one (within 30 m) to trigger it.
- **AR overlay** — Once nearby, the fossil appears in your camera view positioned using your device's compass and gyroscope.
- **Learn** — Each fossil has a name, rarity, and description to collect.
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
