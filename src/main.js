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

    // Quick Save
    document.getElementById('btn-quick-save')?.addEventListener('click', () => {
      try {
        if (window.EJS_emulator?.gameManager?.saveState) {
          window.EJS_emulator.gameManager.saveState();
        } else {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F2', code: 'F2' }));
          this.showToast('💾 Save State Triggered');
        }
      } catch (err) {
        this.showToast('Save state not ready yet');
      }
    });

    // Quick Load
    document.getElementById('btn-quick-load')?.addEventListener('click', () => {
      try {
        if (window.EJS_emulator?.gameManager?.loadState) {
          window.EJS_emulator.gameManager.loadState();
        } else {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F4', code: 'F4' }));
          this.showToast('📂 Load State Triggered');
        }
      } catch (err) {
        this.showToast('Load state not ready yet');
      }
    });

    // Fast Forward
    const btnFf = document.getElementById('btn-fast-forward');
    btnFf?.addEventListener('click', () => {
      this.isFastForward = !this.isFastForward;
      if (this.isFastForward) {
        btnFf.classList.add('btn-active');
        btnFf.innerHTML = '<span>⏩</span> Speed: FAST';
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Space', code: 'Space' }));
        this.showToast('⏩ Fast Forward ON (Speeding up mining/research)');
      } else {
        btnFf.classList.remove('btn-active');
        btnFf.innerHTML = '<span>⏩</span> Speed 2x';
        window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Space', code: 'Space' }));
        this.showToast('Speed Normalized');
      }
    });

    // Pause / Resume
    const btnPause = document.getElementById('btn-pause-emulator');
    btnPause?.addEventListener('click', () => {
      this.isPaused = !this.isPaused;
      const icon = document.getElementById('pause-icon');
      const text = document.getElementById('pause-text');
      if (this.isPaused) {
        window.EJS_emulator?.gameManager?.pause?.();
        if (icon) icon.textContent = '▶️';
        if (text) text.textContent = 'Resume';
        btnPause.classList.add('btn-active');
        this.showToast('Game Paused');
      } else {
        window.EJS_emulator?.gameManager?.resume?.();
        if (icon) icon.textContent = '⏸️';
        if (text) text.textContent = 'Pause';
        btnPause.classList.remove('btn-active');
        this.showToast('Game Resumed');
      }
    });

    // Mute / Sound
    const btnMute = document.getElementById('btn-mute-sound');
    btnMute?.addEventListener('click', () => {
      this.isMuted = !this.isMuted;
      const icon = document.getElementById('sound-icon');
      if (window.EJS_emulator) {
        window.EJS_emulator.muted = this.isMuted;
      }
      if (this.isMuted) {
        if (icon) icon.textContent = '🔇';
        btnMute.classList.add('btn-active');
        this.showToast('Audio Muted');
      } else {
        if (icon) icon.textContent = '🔊';
        btnMute.classList.remove('btn-active');
        this.showToast('Audio Unmuted');
      }
    });

    // Reset Game
    document.getElementById('btn-reset-game')?.addEventListener('click', () => {
      if (confirm('Restart Mega-Lo-Mania from title screen?')) {
        window.EJS_emulator?.gameManager?.restart?.();
        this.showToast('🔄 Game Restarted');
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
        <p style="font-size: 0.76rem; color: var(--text-dim); margin-bottom: 6px;">${epoch.description}</p>
        <div>
          ${epoch.inventions.map(inv => `
            <span class="invention-pill" title="${inv.desc}">
              <b>${inv.name}</b> <span class="men">(${inv.men} men)</span>
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  renderIslands() {
    const container = document.getElementById('island-list-container');
    if (!container) return;

    container.innerHTML = GAME_CODEX.epochs.map(epoch => `
      <div class="epoch-card">
        <div class="epoch-header">
          <div class="epoch-title">Epoch ${epoch.id} Islands</div>
          <div class="epoch-era">${epoch.era}</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${epoch.islands.map(island => `
            <div class="island-row">
              <div>
                <b>${island.name}</b> (${island.sectors} sectors) &bull; <span style="color: var(--text-dim);">${island.difficulty}</span>
              </div>
              <button class="island-pass" data-pass="${island.password}" title="Click to copy password">
                ${island.password} 📋
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Attach copy password event
    container.querySelectorAll('.island-pass').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pass = btn.getAttribute('data-pass');
        if (pass) {
          navigator.clipboard?.writeText(pass);
          this.showToast(`🔑 Password "${pass}" copied to clipboard!`);
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
