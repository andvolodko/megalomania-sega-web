# Mega-Lo-Mania: Sega Genesis Web Edition (Mouse Enhanced)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: Web](https://img.shields.io/badge/Platform-Web%20%2F%20WASM-cyan.svg)](https://developer.mozilla.org/en-US/docs/WebAssembly)
[![Engine: Genesis Plus GX](https://img.shields.io/badge/Core-Genesis%20Plus%20GX-purple.svg)](https://github.com/ekeeke/Genesis-Plus-GX)
[![Build Tool: Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)

A modern, browser-based web edition of the classic 1991 real-time strategy god game **Mega-Lo-Mania** (*Tyrants: Fight Through Time* on Sega Genesis / Mega Drive) by Sensible Software, featuring **native PC mouse controls**, a real-time telemetry HUD, an interactive Strategy Codex, 28 island passwords, and retro CRT scanline shaders.

---

## 🎯 The Motivation

When Sensible Software ported the Amiga hit *Mega-Lo-Mania* to the Sega Mega Drive / Genesis, the original computer mouse interface was adapted to a 3-button gamepad. Moving the strategic cursor with a directional D-pad often felt slow and awkward compared to point-and-click gaming.

This project bridges that gap by running the authentic Sega Genesis ROM in modern web browsers at **60 FPS** while translating mouse gestures and clicks into instantaneous directional controller signals via a dedicated **Dynamic Velocity PWM Mouse Engine**.

---

## ✨ Features

- **Intuitive Mouse Controls:**
  - **Left Click:** Sega Button C (Select, confirm actions, assign men, launch invasions).
  - **Right Click:** Sega Button B (Cancel, deselect, retreat units, close dialogs). Context menu suppressed.
  - **Middle Click:** Sega Button A (Examine sector, inspect technologies and resources).
  - **Dynamic Velocity Steering (PWM):** Cursor accelerates smoothly with fast mouse flicks and stops dead on release without drift.
  - **HTML5 Pointer Lock API:** Locks cursor within the game viewport on click to prevent slipping out of bounds.
  - **Adjustable Sensitivity:** Slider scaling from `0.4x` to `3.5x` in real time.
- **Interactive Telemetry HUD:** Live visual feedback lights up active controller buttons (C, B, A, Start) and directional vectors during play.
- **Interactive Tech Tree Codex:** Full guide covering all 10 epochs (Stone Age 28,000 BC to Nuclear/Space Age 2001+ AD), listing inventions, unit types, and required manpower.
- **28-Island Password Vault:** Single-click copy for all level progression passwords (`JOE`, `LIZ`, `MAX`, `GUY`, `WAR`, etc.).
- **Authentic Retro Features:**
  - **CRT Scanline Shader:** Realistic 90s television aperture scanline overlay.
  - **Quick Save & Quick Load:** Save states in slot memory.
  - **2x Fast Forward:** Accelerate weapon research and resource mining times.
  - **Dual ROM Support:** Switch between European (*Mega-Lo-Mania*) and North American (*Tyrants: Fight Through Time*) releases.

---

## 🎮 Controls Summary

| Physical Input | Sega Genesis Equivalent | In-Game Action |
| :--- | :--- | :--- |
| **Left Click (LMB)** | **Button C** | Select sector / Confirm / Assign workers / Attack |
| **Right Click (RMB)** | **Button B** | Cancel / Recall troops / Close menu window |
| **Middle Click (MMB)** | **Button A** | Sector statistics / Weapon inspection |
| **Mouse Motion** | **D-Pad (Arrows)** | Directional cursor movement with auto-damping |
| **Click Game Canvas** | **Pointer Lock** | Locks cursor inside the game window (`ESC` to release) |
| **Space / Enter** | **Start Button** | Pause / Island overview map |
| **F2 / F4** | **Save / Load** | Quick Save state / Quick Load state |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [npm](https://www.npmjs.com/) v9.0.0 or higher

### Installation & Local Run

1. Clone or navigate to the repository:
   ```bash
   cd megalomania_sega_game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:5173/
   ```

### Building for Production
To generate a production-ready static bundle:
```bash
npm run build
```
The output files will be located in the `dist/` directory, ready to deploy to any static web host (GitHub Pages, Vercel, Netlify, Cloudflare Pages, etc.).

---

## 📂 Project Structure

```
megalomania_sega_game/
├── index.html              # Main web application entry point & layout
├── package.json            # Project manifest, dependencies, and scripts
├── LICENSE                 # MIT License with IP disclaimer
├── README.md               # English project documentation
├── public/
│   ├── favicon.png         # Pixel art browser icon
│   ├── assets/             # Generated banners and logos
│   │   ├── banner.jpg      # 16-bit retro widescreen banner
│   │   └── icon.jpg        # Game crown emblem
│   └── roms/               # Game ROMs served locally
│       ├── megalomania_rev01.bin  # Mega-Lo-Mania (Europe Rev 01)
│       └── tyrants_usa.bin        # Tyrants: Fight Through Time (USA)
├── src/
│   ├── main.js             # Emulator lifecycle, UI events, and audio management
│   ├── mouseAdapter.js     # Mouse-to-Genesis controller translation engine
│   ├── gameCodex.js        # Data for all 10 epochs, 28 islands & passwords
│   └── style.css           # Vanilla CSS design system, CRT shaders & glassmorphism
└── data/                   # Original ROM archives and backups
```

---

## ⚖️ License & Disclaimer

### Source Code License
The frontend application code, the `GenesisMouseAdapter` engine, interactive codex data, and custom stylesheets are released under the [MIT License](LICENSE).

### Intellectual Property Disclaimer
- **Mega-Lo-Mania** and **Tyrants: Fight Through Time** were developed by Sensible Software and published by Virgin Interactive Entertainment.
- All game titles, trademarks, audio tracks, and ROM binary contents are the property of their respective copyright owners.
- This repository is an independent, non-commercial preservation and educational project designed to explore retro controller adaptation and browser-based WebAssembly emulation.
