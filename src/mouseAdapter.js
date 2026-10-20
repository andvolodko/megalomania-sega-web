/**
 * Mouse Adapter for Sega Genesis Mega-Lo-Mania / Tyrants
 * Translates mouse movement and clicks into Sega Genesis Mega Drive controller inputs.
 *
 * Sega Genesis 3-Button Controller to RetroPad Mapping:
 * - Button C (Action / Confirm / Assign): RetroPad A (id: 8, key: 'c')
 * - Button B (Cancel / Deselect / Back):   RetroPad B (id: 0, key: 'x')
 * - Button A (Inspect / Info / Details):   RetroPad Y (id: 1, key: 'z')
 * - Start    (Pause / Overview Map):       RetroPad Start (id: 3, key: 'Enter')
 * - D-Pad Up:                              RetroPad Up (id: 4, key: 'ArrowUp')
 * - D-Pad Down:                            RetroPad Down (id: 5, key: 'ArrowDown')
 * - D-Pad Left:                            RetroPad Left (id: 6, key: 'ArrowLeft')
 * - D-Pad Right:                           RetroPad Right (id: 7, key: 'ArrowRight')
 */

export class GenesisMouseAdapter {
  constructor(canvasContainerId, options = {}) {
    this.container = document.getElementById(canvasContainerId);
    this.options = {
      sensitivity: options.sensitivity || 1.4,
      deadzone: options.deadzone || 4,
      dampening: options.dampening || 0.65,
      pointerLock: options.pointerLock ?? true,
      enableVisualReticle: options.enableVisualReticle ?? true,
      ...options
    };

    // Button states
    this.buttonStates = {
      up: false,
      down: false,
      left: false,
      right: false,
      btnA: false, // Sega A (Inspect)
      btnB: false, // Sega B (Cancel)
      btnC: false, // Sega C (Action)
      start: false
    };

    // Velocity accumulators
    this.accX = 0;
    this.accY = 0;
    this.lastMoveTime = 0;
    this.lastClientX = null;
    this.lastClientY = null;
    this.isPointerLocked = false;
    this.isActive = true;

    // Visual reticle tracking
    this.reticlePos = { x: 160, y: 112 };

    // Callbacks for UI updates
    this.onStateChange = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.startLoop();
  }

  setSensitivity(val) {
    this.options.sensitivity = Math.max(0.2, Math.min(5.0, parseFloat(val)));
  }

  setPointerLockEnabled(enabled) {
    this.options.pointerLock = !!enabled;
    if (!this.options.pointerLock && this.isPointerLocked) {
      document.exitPointerLock?.();
    }
  }

  bindEvents() {
    // Mouse movement
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

    // Mouse buttons
    window.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mouseup', (e) => this.handleMouseUp(e));

    // Prevent default context menu on right click everywhere over the container
    document.addEventListener('contextmenu', (e) => {
      const target = e.target;
      if (this.container && (this.container.contains(target) || target.closest('#game') || this.isPointerLocked)) {
        e.preventDefault();
        return false;
      }
    });

    // Pointer Lock change listener
    document.addEventListener('pointerlockchange', () => {
      this.isPointerLocked = (document.pointerLockElement === this.container || 
                              document.pointerLockElement === this.getCanvas() ||
                              document.pointerLockElement?.closest('#game-wrapper'));
      this.notifyState();
    });

    // Container click to request pointer lock if enabled
    if (this.container) {
      this.container.addEventListener('click', (e) => {
        if (this.options.pointerLock && !this.isPointerLocked && e.button === 0) {
          const canvas = this.getCanvas() || this.container;
          canvas.requestPointerLock?.();
        }
      });
    }

    // Keyboard fallback (Space for Start)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        this.triggerStart(true);
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        this.triggerStart(false);
      }
    });
  }

  getCanvas() {
    return this.container?.querySelector('canvas') || document.querySelector('#game canvas');
  }

  handleMouseMove(e) {
    if (!this.isActive) return;

    const now = performance.now();
    let dx = 0;
    let dy = 0;

    if (this.isPointerLocked) {
      dx = e.movementX || 0;
      dy = e.movementY || 0;
    } else {
      // Relative movement tracking when hovering over game container
      const rect = this.container?.getBoundingClientRect();
      if (!rect) return;

      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isInside) {
        if (this.lastClientX !== null && this.lastClientY !== null) {
          dx = e.clientX - this.lastClientX;
          dy = e.clientY - this.lastClientY;
        }
        this.lastClientX = e.clientX;
        this.lastClientY = e.clientY;
      } else {
        this.lastClientX = null;
        this.lastClientY = null;
        return;
      }
    }

    // Filter anomalous giant jumps (e.g. upon pointer lock transition)
    if (Math.abs(dx) > 200 || Math.abs(dy) > 200) {
      dx = 0;
      dy = 0;
    }

    // Accumulate with sensitivity
    this.accX += dx * this.options.sensitivity;
    this.accY += dy * this.options.sensitivity;
    this.lastMoveTime = now;

    // Update visual reticle coordinates (0 to 320, 0 to 224 for Sega Genesis)
    this.reticlePos.x = Math.max(0, Math.min(320, this.reticlePos.x + dx * 0.5));
    this.reticlePos.y = Math.max(0, Math.min(224, this.reticlePos.y + dy * 0.5));
  }

  handleMouseDown(e) {
    if (!this.isActive) return;

    // Check if click originates inside game or pointer is locked
    const isTargetGame = this.isPointerLocked || 
                         (this.container && this.container.contains(e.target)) || 
                         e.target.closest('#game') ||
                         e.target.closest('.game-interactive-area');

    if (!isTargetGame) return;

    if (e.button === 0) {
      // Left click -> Sega Button C (Confirm / Select / Assign)
      this.setButtonState('btnC', true, 8, 'c', 'KeyC');
    } else if (e.button === 2) {
      // Right click -> Sega Button B (Cancel / Deselect / Back)
      e.preventDefault();
      this.setButtonState('btnB', true, 0, 'x', 'KeyX');
    } else if (e.button === 1) {
      // Middle click -> Sega Button A (Inspect / Info)
      e.preventDefault();
      this.setButtonState('btnA', true, 1, 'z', 'KeyZ');
    }
  }

  handleMouseUp(e) {
    if (!this.isActive) return;

    if (e.button === 0) {
      this.setButtonState('btnC', false, 8, 'c', 'KeyC');
    } else if (e.button === 2) {
      e.preventDefault();
      this.setButtonState('btnB', false, 0, 'x', 'KeyX');
    } else if (e.button === 1) {
      e.preventDefault();
      this.setButtonState('btnA', false, 1, 'z', 'KeyZ');
    }
  }

  triggerStart(isPressed) {
    this.setButtonState('start', isPressed, 3, 'Enter', 'Enter');
  }

  /**
   * Dispatches input to both EmulatorJS direct manager AND synthetic keyboard event
   */
  setButtonState(name, isPressed, retroPadId, key, code) {
    if (this.buttonStates[name] === isPressed) return;
    this.buttonStates[name] = isPressed;

    // 1. Direct EmulatorJS simulation API
    try {
      if (window.EJS_emulator?.gameManager?.simulateInput) {
        window.EJS_emulator.gameManager.simulateInput(0, retroPadId, isPressed ? 1 : 0);
      }
    } catch (err) {
      // Ignore if core not ready
    }

    // 2. Synthetic keyboard event dispatch
    const eventType = isPressed ? 'keydown' : 'keyup';
    const canvas = this.getCanvas();
    const event = new KeyboardEvent(eventType, {
      key: key,
      code: code,
      keyCode: this.getKeyCode(key),
      bubbles: true,
      cancelable: true
    });

    if (canvas) canvas.dispatchEvent(event);
    window.dispatchEvent(event);

    this.notifyState();
  }

  getKeyCode(key) {
    const map = {
      'c': 67,
      'x': 88,
      'z': 90,
      'Enter': 13,
      'ArrowUp': 38,
      'ArrowDown': 40,
      'ArrowLeft': 37,
      'ArrowRight': 39
    };
    return map[key] || 0;
  }

  startLoop() {
    const tick = () => {
      const now = performance.now();
      const timeSinceMove = now - this.lastMoveTime;

      // Inactivity timeout: if no mouse motion for 60ms, release directional pad immediately
      if (timeSinceMove > 65) {
        this.accX = 0;
        this.accY = 0;
        this.setButtonState('right', false, 7, 'ArrowRight', 'ArrowRight');
        this.setButtonState('left', false, 6, 'ArrowLeft', 'ArrowLeft');
        this.setButtonState('up', false, 4, 'ArrowUp', 'ArrowUp');
        this.setButtonState('down', false, 5, 'ArrowDown', 'ArrowDown');
      } else {
        const threshold = this.options.deadzone;

        // Process Horizontal (X)
        if (this.accX > threshold) {
          this.setButtonState('right', true, 7, 'ArrowRight', 'ArrowRight');
          this.setButtonState('left', false, 6, 'ArrowLeft', 'ArrowLeft');
          this.accX *= this.options.dampening;
        } else if (this.accX < -threshold) {
          this.setButtonState('left', true, 6, 'ArrowLeft', 'ArrowLeft');
          this.setButtonState('right', false, 7, 'ArrowRight', 'ArrowRight');
          this.accX *= this.options.dampening;
        } else {
          this.setButtonState('right', false, 7, 'ArrowRight', 'ArrowRight');
          this.setButtonState('left', false, 6, 'ArrowLeft', 'ArrowLeft');
        }

        // Process Vertical (Y)
        if (this.accY > threshold) {
          this.setButtonState('down', true, 5, 'ArrowDown', 'ArrowDown');
          this.setButtonState('up', false, 4, 'ArrowUp', 'ArrowUp');
          this.accY *= this.options.dampening;
        } else if (this.accY < -threshold) {
          this.setButtonState('up', true, 4, 'ArrowUp', 'ArrowUp');
          this.setButtonState('down', false, 5, 'ArrowDown', 'ArrowDown');
          this.accY *= this.options.dampening;
        } else {
          this.setButtonState('up', false, 4, 'ArrowUp', 'ArrowUp');
          this.setButtonState('down', false, 5, 'ArrowDown', 'ArrowDown');
        }
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  notifyState() {
    if (typeof this.onStateChange === 'function') {
      this.onStateChange({
        ...this.buttonStates,
        isPointerLocked: this.isPointerLocked,
        reticle: { ...this.reticlePos }
      });
    }
  }
}
