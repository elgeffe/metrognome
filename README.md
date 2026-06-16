# Metrognome

A modern, mobile-first **metronome PWA** built for focused practice. It keeps
rock-solid time, automates tempo changes, and — most importantly — **tracks your
practice by bars played or time passed** so you can stay on top of your drills.

Runs in any modern mobile or desktop browser, and installs to your home screen
as an offline-capable Progressive Web App.

## Features

### 🎯 Practice tracking (the headline)
- Count **bars played** and **time elapsed**, live, every session.
- Set a goal **by bars** or **by minutes** — the metronome **auto-stops** when
  you hit it, with a progress bar and a "goal reached" cue.
- Every session is **logged automatically** (duration, bars, tempo range, time
  signature, automation used, goal hit/miss) and persisted on-device.
- Running totals across all sessions.

### ⏩ Tempo automation
- **Step trainer** — nudge the tempo by N BPM every M bars (hold / loop / bounce
  at the limit). The classic speed drill.
- **Smooth ramp by time** — glide from one tempo to another over a duration.
- **Smooth ramp by bars** — glide over a number of bars.
- **Gap-click / mute trainer** — silence bars (cyclically or randomly) so you
  have to keep time on your own.

### 🎤 Reactive tempo (experimental)
- Listens through the microphone, detects the tempo you're playing via onset
  detection + inter-onset-interval analysis, and **follows along** — or just
  shows the detected BPM with a confidence read-out for you to adopt.

### 🧰 The essentials, done well
- Sample-accurate timing using the Web Audio clock (no `setInterval` drift).
- Tap tempo, time signatures, subdivisions, accented downbeat, volume.
- Beat visualizer, spacebar start/stop, screen wake-lock while playing.
- Installable PWA, fully usable offline.

## Tech stack

- **SvelteKit + Svelte 5 (runes)** — small bundle, fine-grained reactivity, ideal
  for a phone-first PWA.
- **Vite** build tooling, **TypeScript** throughout.
- **Web Audio API** for a framework-free, jitter-free scheduler.
- **vite-plugin-pwa / @vite-pwa/sveltekit** (Workbox) for offline + install.
- **adapter-static** → deploys anywhere (Cloudflare Pages, GitHub Pages, Netlify…).
- **Vitest** for the pure engine logic.

## Architecture

```
src/lib/
├── audio/        Web Audio core (framework-free)
│   ├── context.ts      shared AudioContext + resume()
│   ├── click.ts        synthesized click voices
│   ├── timing.ts       pure timing maths (tested)
│   └── metronome.ts    look-ahead scheduler engine ("two clocks" pattern)
├── automation/   pure tempo & mute strategies (tested)
├── tempo/        microphone onset detection + BPM estimation (estimate.ts tested)
├── practice/     session types + localStorage history
├── state/        store.svelte.ts — the runes "brain" wiring it all together
└── components/   UI cards (transport, practice, automation, mic, sound, history)
```

The timing-critical engine schedules audio slightly ahead on the audio hardware
clock while a `requestAnimationFrame` loop fires UI callbacks exactly when each
beat is heard — so the audio never drifts even when the main thread is busy.

## Development

```bash
npm install
npm run dev        # start the dev server
npm run check      # type-check (svelte-check)
npm test           # run unit tests (Vitest)
npm run build      # production build → ./build
npm run preview    # preview the production build
npm run gen:icons  # regenerate PWA icons from the SVG logo
```

### Deploying

The build is fully static. Deploy the `build/` directory to any static host.
For project-subpath hosting (e.g. GitHub Pages) set `BASE_PATH`:

```bash
BASE_PATH=/metrognome npm run build
```

## Notes & browser support

- Audio requires a user gesture to start (a mobile-browser rule) — the first
  **Start** tap unlocks it.
- The microphone feature needs mic permission and a secure context (HTTPS or
  `localhost`). It is experimental and works best with a clear percussive source.
- Practice history is stored locally in the browser (no account, no server).
