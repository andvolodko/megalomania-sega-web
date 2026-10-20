import { GenesisMouseAdapter } from './mouseAdapter.js';
import { GAME_CODEX } from './gameCodex.js';

class MegaLoManiaApp {
  constructor() {
    this.currentRom = new URL('roms/megalomania_rev01.bin', window.location.href).href;
    this.mouseAdapter = null;
    this.isMuted = false;
    this.isPaused = false;
    this.isFastForward = false;
    this.isCrtActive = false;
    this.pointerLockEnabled = true;

    this.init();
  }

  init() {
    this.renderCodex();
    this.renderIslands();
    this.setupUI();
    this.loadEmulator();
    this.setupMouseAdapter();
    this.setupHeightSync();
  }

  loadEmulator() {
    const statusText = document.getElementById('system-status-text');
    if (statusText) statusText.textContent = 'LOADING CORE & ROM...';

    // Set EmulatorJS global options
    window.EJS_player = '#game';
    window.EJS_core = 'segaMD';
    window.EJS_gameUrl = this.currentRom;
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    window.EJS_startOnLoaded = true;
    window.EJS_color = '#07090e';

    // Standard controls are handled natively by EmulatorJS + GenesisMouseAdapter

    window.EJS_onSaveState = () => {
      this.showToast('💾 State saved successfully!');
    };

    window.EJS_onLoadState = () => {
      this.showToast('📂 State loaded successfully!');
    };

    // Load loader.js
    const script = document.createElement('script');
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
    script.async = true;
    script.onload = () => {
      if (statusText) statusText.textContent = 'ENGINE ACTIVE (60 FPS)';
      this.showToast('🎮 Mega-Lo-Mania Engine Ready!');
    };
    script.onerror = () => {
      if (statusText) statusText.textContent = 'NETWORK ERROR LOADING EMULATOR';
    };
    document.body.appendChild(script);
  }

  setupMouseAdapter() {
    this.mouseAdapter = new GenesisMouseAdapter('game-wrapper', {
      sensitivity: 1.4,
      deadzone: 4,
      pointerLock: this.pointerLockEnabled
    });

    // Update telemetry HUD whenever mouse state changes
    this.mouseAdapter.onStateChange = (state) => {
      this.updateHudTelemetry(state);
    };
  }

  updateHudTelemetry(state) {
    // Buttons
    this.toggleActive('ind-btn-c', state.btnC);
    this.toggleActive('ind-btn-b', state.btnB);
    this.toggleActive('ind-btn-a', state.btnA);
    this.toggleActive('ind-btn-start', state.start);

    // D-Pad
    this.toggleActive('dpad-up', state.up);
    this.toggleActive('dpad-down', state.down);
    this.toggleActive('dpad-left', state.left);
    this.toggleActive('dpad-right', state.right);

    // Pointer Lock hint
    const hint = document.getElementById('pointer-lock-hint');
    if (hint) {
      if (state.isPointerLocked) {
        hint.classList.add('show');
      } else {
        hint.classList.remove('show');
      }
    }

    const mouseStatus = document.getElementById('mouse-mode-status');
    if (mouseStatus) {
      mouseStatus.textContent = state.isPointerLocked ? 'POINTER LOCKED' : 'MOUSE ACTIVE';
      mouseStatus.style.color = state.isPointerLocked ? '#06b6d4' : '#10b981';
    }

    const vectorStatus = document.getElementById('vector-status');
    if (vectorStatus) {
      const activeDirs = [];
      if (state.up) activeDirs.push('UP');
      if (state.down) activeDirs.push('DOWN');
      if (state.left) activeDirs.push('LEFT');
      if (state.right) activeDirs.push('RIGHT');
      vectorStatus.textContent = activeDirs.length > 0 ? activeDirs.join('+') : 'NEUTRAL';
      vectorStatus.style.color = activeDirs.length > 0 ? '#10b981' : '#64748b';
    }
  }

  toggleActive(elementId, isActive) {
    const el = document.getElementById(elementId);
    if (el) {
      if (isActive) el.classList.add('active');
      else el.classList.remove('active');
    }
  }

  setupUI() {
    // ROM Selector
    const romSelect = document.getElementById('rom-select');
    romSelect?.addEventListener('change', (e) => {
      this.currentRom = new URL(e.target.value, window.location.href).href;
      const badge = document.getElementById('active-rom-badge');
      if (badge) {
        badge.textContent = e.target.selectedIndex === 0 ? 'MEGA-LO-MANIA (EU)' : 'TYRANTS (USA)';
      }
      this.showToast(`Loading: ${e.target.options[e.target.selectedIndex].text}...`);
      window.location.reload();
    });

    // Sensitivity Slider
    const sensInput = document.getElementById('mouse-sensitivity');
    const sensVal = document.getElementById('sensitivity-value');
    sensInput?.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      sensVal.textContent = `${val.toFixed(1)}x`;
      this.mouseAdapter?.setSensitivity(val);
    });

    // Pointer Lock Button
    const btnPointerLock = document.getElementById('btn-pointerlock-toggle');
    btnPointerLock?.addEventListener('click', () => {
      this.pointerLockEnabled = !this.pointerLockEnabled;
      this.mouseAdapter?.setPointerLockEnabled(this.pointerLockEnabled);
      if (this.pointerLockEnabled) {
        btnPointerLock.classList.add('btn-active');
        btnPointerLock.innerHTML = '<span>🎯</span> Pointer Lock: ON';
        this.showToast('🎯 Pointer Lock enabled (Click game screen to lock)');
      } else {
        btnPointerLock.classList.remove('btn-active');
        btnPointerLock.innerHTML = '<span>🎯</span> Pointer Lock: OFF';
        this.showToast('Pointer Lock disabled');
      }
    });

    // CRT Toggle
    const btnCrt = document.getElementById('btn-crt-toggle');
    btnCrt?.addEventListener('click', () => {
      this.isCrtActive = !this.isCrtActive;
      const card = document.getElementById('game-card');
      if (this.isCrtActive) {
        card?.classList.add('crt-active');
        btnCrt.classList.add('btn-active');
        this.showToast('📺 CRT Scanline Shader: ENABLED');
      } else {
        card?.classList.remove('crt-active');
        btnCrt.classList.remove('btn-active');
        this.showToast('CRT Shader: DISABLED');
      }
    });

    // Fullscreen
    const btnFs = document.getElementById('btn-fullscreen');
    btnFs?.addEventListener('click', () => {
      const target = document.getElementById('game-card');
      if (!document.fullscreenElement) {
        target?.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });

    // Quick Save (In-Memory + Storage Slot 1)
    document.getElementById('btn-quick-save')?.addEventListener('click', () => {
      try {
        const emu = window.EJS_emulator;
        if (emu?.gameManager?.getState) {
          const state = emu.gameManager.getState();
          if (state && state.length > 0) {
            this.quickSaveBuffer = state;
            try {
              // Persist backup in localStorage
              const binaryStr = Array.from(state).map(b => String.fromCharCode(b)).join('');
              localStorage.setItem('megalomania_quicksave', btoa(binaryStr));
            } catch (e) {}
            this.showToast('💾 Game Saved to Slot 1!');
            return;
          }
        }
        // Fallback to EmulatorJS internal save button
        if (emu?.elements?.bottomBar?.saveState?.[0]) {
          emu.elements.bottomBar.saveState[0].click();
          this.showToast('💾 Save State Triggered');
        } else {
          this.showToast('⚠️ Emulator not ready for save yet');
        }
      } catch (err) {
        this.showToast('Save error: ' + err.message);
      }
    });

    // Quick Load (Slot 1)
    document.getElementById('btn-quick-load')?.addEventListener('click', () => {
      try {
        const emu = window.EJS_emulator;
        let stateData = this.quickSaveBuffer;
        if (!stateData) {
          try {
            const savedB64 = localStorage.getItem('megalomania_quicksave');
            if (savedB64) {
              const binaryStr = atob(savedB64);
              stateData = new Uint8Array(binaryStr.length);
              for (let i = 0; i < binaryStr.length; i++) {
                stateData[i] = binaryStr.charCodeAt(i);
              }
              this.quickSaveBuffer = stateData;
            }
          } catch (e) {}
        }

        if (stateData && emu?.gameManager?.loadState) {
          emu.gameManager.loadState(stateData);
          this.showToast('📂 Slot 1 Loaded Successfully!');
          return;
        }

        if (!stateData) {
          this.showToast('⚠️ No Save found in Slot 1! Press Quick Save first.');
          return;
        }

        if (emu?.elements?.bottomBar?.loadState?.[0]) {
          emu.elements.bottomBar.loadState[0].click();
        }
      } catch (err) {
        this.showToast('Load error: ' + err.message);
      }
    });

    // Fast Forward (Speed Toggle)
    const btnFf = document.getElementById('btn-fast-forward');
    btnFf?.addEventListener('click', () => {
      this.isFastForward = !this.isFastForward;
      const emu = window.EJS_emulator;
      try {
        if (emu?.gameManager) {
          if (this.isFastForward) {
            emu.isFastForward = true;
            emu.gameManager.setFastForwardRatio?.(3.0);
            emu.gameManager.toggleFastForward?.(1);
            btnFf.classList.add('btn-active');
            btnFf.innerHTML = '<span>⏩</span> Speed: FAST (3x)';
            this.showToast('⏩ Fast Forward ON (3x Speed)');
          } else {
            emu.isFastForward = false;
            emu.gameManager.toggleFastForward?.(0);
            btnFf.classList.remove('btn-active');
            btnFf.innerHTML = '<span>⏩</span> Speed 2x';
            this.showToast('Speed Normalized (1x)');
          }
          return;
        }
      } catch (e) {}
      this.showToast('Speed toggle not ready yet');
    });

    // Pause / Resume
    const btnPause = document.getElementById('btn-pause-emulator');
    btnPause?.addEventListener('click', () => {
      this.isPaused = !this.isPaused;
      const icon = document.getElementById('pause-icon');
      const text = document.getElementById('pause-text');
      const emu = window.EJS_emulator;

      try {
        if (this.isPaused) {
          if (typeof emu?.pause === 'function') {
            emu.pause();
          } else if (emu?.elements?.bottomBar?.playPause?.[0]) {
            emu.elements.bottomBar.playPause[0].click();
          }
          if (icon) icon.textContent = '▶️';
          if (text) text.textContent = 'Resume';
          btnPause.classList.add('btn-active');
          this.showToast('⏸️ Game Paused');
        } else {
          if (typeof emu?.play === 'function') {
            emu.play();
          } else if (emu?.elements?.bottomBar?.playPause?.[1]) {
            emu.elements.bottomBar.playPause[1].click();
          }
          if (icon) icon.textContent = '⏸️';
          if (text) text.textContent = 'Pause';
          btnPause.classList.remove('btn-active');
          this.showToast('▶️ Game Resumed');
        }
      } catch (err) {
        this.showToast('Pause error: ' + err.message);
      }
    });

    // Mute / Unmute Sound
    const btnMute = document.getElementById('btn-mute-sound');
    btnMute?.addEventListener('click', () => {
      this.isMuted = !this.isMuted;
      const emu = window.EJS_emulator;

      try {
        if (this.isMuted) {
          if (emu) {
            emu.muted = true;
            emu.setVolume?.(0);
          }
          btnMute.classList.add('btn-active');
          btnMute.innerHTML = '<span id="sound-icon">🔇</span> Unmute';
          this.showToast('🔇 Audio Muted');
        } else {
          if (emu) {
            emu.muted = false;
            emu.setVolume?.(emu.volume || 0.6);
          }
          btnMute.classList.remove('btn-active');
          btnMute.innerHTML = '<span id="sound-icon">🔊</span> Mute';
          this.showToast('🔊 Audio Unmuted');
        }
      } catch (err) {
        this.showToast('Audio error: ' + err.message);
      }
    });

    // Reset Game
    document.getElementById('btn-reset-game')?.addEventListener('click', () => {
      if (confirm('Restart Mega-Lo-Mania from title screen?')) {
        const emu = window.EJS_emulator;
        try {
          if (emu?.gameManager?.restart) {
            emu.gameManager.restart();
          } else if (emu?.elements?.bottomBar?.restart?.[0]) {
            emu.elements.bottomBar.restart[0].click();
          }
          this.showToast('🔄 Game Restarted');
        } catch (e) {
          window.location.reload();
        }
      }
    });

    // Sidebar Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });
        document.getElementById(targetId)?.classList.add('active');
      });
    });

    // Guide Modal
    const guideModal = document.getElementById('guide-modal');
    document.getElementById('btn-guide-modal')?.addEventListener('click', () => {
      guideModal?.classList.add('show');
    });
    document.getElementById('btn-close-modal')?.addEventListener('click', () => {
      guideModal?.classList.remove('show');
    });
    document.getElementById('btn-modal-gotit')?.addEventListener('click', () => {
      guideModal?.classList.remove('show');
    });
  }

  renderCodex() {
    const container = document.getElementById('epoch-list-container');
    if (!container) return;

    container.innerHTML = GAME_CODEX.epochs.map(epoch => `
      <div class="epoch-card">
        <div class="epoch-header">
          <div class="epoch-title">Epoch ${epoch.id}: ${epoch.name}</div>
          <div class="epoch-era">${epoch.era}</div>
        </div>

        ${epoch.milestone ? `
          <div class="milestone-badge">${epoch.milestone}</div>
        ` : ''}

        <p class="epoch-desc">${epoch.description}</p>

        <div class="tech-grid">
          <div class="tech-row">
            <span class="tech-tag offense">⚔️ Offense</span>
            <div class="tech-info">
              <span class="tech-name">${epoch.inventions.offense.name}</span>
              <span class="tech-desc">${epoch.inventions.offense.desc}</span>
            </div>
          </div>
          <div class="tech-row">
            <span class="tech-tag defense">🛡️ Defense</span>
            <div class="tech-info">
              <span class="tech-name">${epoch.inventions.defense.name}</span>
              <span class="tech-desc">${epoch.inventions.defense.desc}</span>
            </div>
          </div>
          <div class="tech-row">
            <span class="tech-tag shield">🧱 Shield</span>
            <div class="tech-info">
              <span class="tech-name">${epoch.inventions.shield.name}</span>
              <span class="tech-desc">${epoch.inventions.shield.desc}</span>
            </div>
          </div>
        </div>

        ${epoch.proTip ? `
          <div class="epoch-pro-tip">
            <span class="pro-tip-icon">💡</span>
            <span>${epoch.proTip}</span>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  setupHeightSync() {
    this.syncSidebarHeight();
    window.addEventListener('resize', () => this.syncSidebarHeight());
    const leftStage = document.querySelector('.game-stage-wrapper');
    if (leftStage && window.ResizeObserver) {
      new ResizeObserver(() => this.syncSidebarHeight()).observe(leftStage);
    }
  }

  syncSidebarHeight() {
    const leftStage = document.querySelector('.game-stage-wrapper');
    const sideCodex = document.querySelector('.side-codex');
    if (leftStage && sideCodex) {
      if (window.innerWidth > 1200) {
        const targetHeight = leftStage.offsetHeight;
        sideCodex.style.height = `${targetHeight}px`;
        sideCodex.style.maxHeight = `${targetHeight}px`;
      } else {
        sideCodex.style.height = '';
        sideCodex.style.maxHeight = '';
      }
    }
  }

  renderIslands() {
    const container = document.getElementById('island-list-container');
    if (!container) return;

    let html = '';

    // Secret arcade minigame
    if (GAME_CODEX.secretCodes?.length > 0) {
      html += `
        <div class="epoch-card" style="border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.05); margin-bottom: 6px;">
          <div class="epoch-header">
            <div class="epoch-title" style="color: var(--accent-gold);">👾 Secret Arcade Mini-Game</div>
            <span class="badge-sub">EASTER EGG</span>
          </div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin: 4px 0 8px;">
            Enter in <b>Options ➔ Load</b> to play a hidden <i>Asteroids / Sinistar</i> shooter!
          </p>
          <div class="island-row" style="border-left-color: var(--accent-gold);">
            <div><b>Sinistar Shooter:</b> <code style="color: var(--accent-gold); font-size: 0.9rem;">JOOLS</code></div>
            <button class="island-pass" data-pass="JOOLS" title="Click to copy">JOOLS 📋</button>
          </div>
        </div>
      `;
    }

    // Epochs & Verified Sega Genesis Passwords
    html += GAME_CODEX.epochs.map(epoch => `
      <div class="epoch-card">
        <div class="epoch-header">
          <div class="epoch-title">Epoch ${epoch.id}: ${epoch.name}</div>
          <div class="epoch-era">${epoch.era}</div>
        </div>
        
        <!-- Verified Sega Genesis Password -->
        <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: var(--radius-sm); padding: 8px 10px; margin: 4px 0 8px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="font-size: 0.7rem; color: var(--accent-cyan); font-family: var(--font-mono); font-weight: 600;">
              SEGA LOAD CODE &bull; ${epoch.passwordDesc || 'Options ➔ Load'}
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 700; color: #fff; letter-spacing: 0.08em;">
              ${epoch.password}
            </div>
          </div>
          <button class="island-pass" data-pass="${epoch.password}" title="Click to copy Sega password">
            Copy 📋
          </button>
        </div>

        <!-- Islands in Epoch -->
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-family: var(--font-mono); font-weight: 600;">
            Islands in this Epoch:
          </div>
          ${epoch.islands.map(island => `
            <div class="island-row" style="padding: 4px 8px; font-size: 0.74rem;">
              <span><b>${island.name}</b> (${island.sectors} sectors)</span>
              <span style="color: var(--text-dim);">${island.difficulty}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    container.innerHTML = html;

    // Attach copy password event
    container.querySelectorAll('.island-pass').forEach(btn => {
      btn.addEventListener('click', () => {
        const pass = btn.getAttribute('data-pass');
        if (pass) {
          navigator.clipboard?.writeText(pass);
          this.showToast(`🔑 Sega Password "${pass}" copied!`);
        }
      });
    });
  }

  showToast(message) {
    const toast = document.getElementById('toast-msg');
    const toastText = document.getElementById('toast-text');
    if (toast && toastText) {
      toastText.textContent = message;
      toast.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }
}

// Start app
window.addEventListener('DOMContentLoaded', () => {
  new MegaLoManiaApp();
});
