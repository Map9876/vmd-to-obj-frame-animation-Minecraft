// explore-mode.js
// First-person ("explore") camera mode, faithfully ported from shulkr.com's
// WebGL engine (three.js under the hood). See /tmp/sh_engine.js.
//
// ---------------------------------------------------------------------------
// shulkr explore fields / methods this module is based on (reverse-engineered)
// ---------------------------------------------------------------------------
//   explore          : boolean  -- whether first-person mode is active
//   yaw, pitch       : number   -- free-look angles in radians
//   flyPos           : Vector3  -- the camera position while in FP mode
//   pressed          : Set      -- currently-held KeyboardEvent.code values
//   flySpeed         : number   -- movement speed multiplier (default 1)
//   pointerLockWanted: boolean  -- whether explore should grab pointer lock
//   pointerLockLook  : boolean  -- whether look is driven by pointer lock
//   lookLive         : boolean  -- whether look input is currently accepted
//   flyLookDirty     : boolean  -- flag requesting a re-apply of yaw/pitch
//   Gb = 70          : explore FOV in degrees (vs orbitFov = 45)
//   tx = .02         : camera.near used while exploring
//   sx = .0022       : free-look mouse sensitivity
//   cx = (0,1,0)     : world-up used to derive the right vector
//
//   setupFirstPerson(): explore=!0; derive pitch=asin(dir.y), yaw=atan2(dir.x,dir.z)
//                       from the current camera direction; flyPos.copy(camera.position);
//                       controls.enabled=!1; camera.near=tx
//   flyLook(e,t)     : yaw -= e*sx; pitch -= t*sx; clamp pitch to ±(π/2 - .02)
//   forwardVec(e)    : e.set(cos(pitch)*sin(yaw), sin(pitch), cos(pitch)*cos(yaw))
//   updateFly(dt)    : forward = forwardVec(); right = cross(forward, up);
//                       velocity = forward*fwd + right*strafe + up*vertical,
//                       normalized to 11*flySpeed; flyPos += velocity*dt;
//                       camera.position = flyPos; camera.up = (0,1,0);
//                       camera.lookAt(flyPos + forward)
//   prepareMode(_, t): when t==='explore' && pointerLockWanted -> requestPointerLock()
// ---------------------------------------------------------------------------

import * as THREE from 'three';

const DEG = Math.PI / 180;
const PITCH_LIMIT = Math.PI / 2 - 0.02;   // shulkr clamps pitch to ±(π/2 - .02)
const MAX_DT = 0.1;                       // shulkr's Ab(e) clamps dt to <= .1s
const BASE_SPEED = 11;                    // shulkr normalizes velocity to 11*flySpeed

export class ExploreMode {
  /**
   * @param {THREE.PerspectiveCamera} camera      - the camera to drive
   * @param {HTMLElement}             domElement  - element to request pointer lock on (renderer.domElement)
   * @param {object}                   [options]
   * @param {number}  [options.fov=70]            - explore FOV in degrees (shulkr Gb)
   * @param {number}  [options.near=0.02]         - explore near plane (shulkr tx)
   * @param {number}  [options.sensitivity=0.0022]- look sensitivity (shulkr sx)
   * @param {number}  [options.flySpeed=1]        - movement speed multiplier
   * @param {number}  [options.speed=BASE_SPEED]  - base units/sec before flySpeed
   * @param {boolean} [options.usePointerLock=true]- grab pointer lock on enable
   * @param {boolean} [options.exitOnUnlock=true] - disable() when pointer lock is lost (e.g. Esc)
   * @param {(active:boolean)=>void} [options.onActiveChange] - callback toggled with mode state.
   *        Wire OrbitControls here: (active) => { orbit.enabled = !active }  // see INTEGRATION below
   * @param {object}  [options.orbitControls]     - if given, its .enabled is toggled automatically.
   */
  constructor(camera, domElement, options = {}) {
    this.camera = camera;
    this.domElement = domElement;

    this.fov = options.fov ?? 70;
    this.near = options.near ?? 0.02;
    this.sensitivity = options.sensitivity ?? 0.0022;
    this.flySpeed = options.flySpeed ?? 1;
    this.speed = options.speed ?? BASE_SPEED;
    this.usePointerLock = options.usePointerLock ?? true;
    this.exitOnUnlock = options.exitOnUnlock ?? this.usePointerLock;
    this.onActiveChange = options.onActiveChange ?? null;
    this.orbitControls = options.orbitControls ?? null;

    this.enabled = false;
    this.yaw = 0;
    this.pitch = 0;
    this.flyPos = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.forward = new THREE.Vector3();
    this.right = new THREE.Vector3();
    this.up = new THREE.Vector3(0, 1, 0);
    this.keys = new Set();

    this.pointerLocked = false;
    this.lookLive = false;
    this.dragging = false;
    this.lookX = 0;
    this.lookY = 0;

    this._savedFov = camera.fov;
    this._savedNear = camera.near;

    // bound handlers so we can add/remove them cleanly
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this._onPointerLockChange = this._onPointerLockChange.bind(this);
    this._onWheel = this._onWheel.bind(this);
  }

  enable() {
    if (this.enabled) return;
    this.enabled = true;

    // Derive initial yaw/pitch from the camera's current view (shulkr setupFirstPerson).
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    this.pitch = Math.asin(Math.max(-1, Math.min(1, dir.y)));
    this.yaw = Math.atan2(dir.x, dir.z);
    this.flyPos.copy(this.camera.position);

    // Stash orbit state and switch to explore projection (shulkr sets near=tx, fov=Gb).
    this._savedFov = this.camera.fov;
    this._savedNear = this.camera.near;
    this.camera.fov = this.fov;
    this.camera.near = this.near;
    this.camera.updateProjectionMatrix();

    // Disable orbit while exploring (documented callback / optional controls instance).
    if (this.orbitControls) this.orbitControls.enabled = false;
    if (this.onActiveChange) this.onActiveChange(true);

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    document.addEventListener('pointerlockchange', this._onPointerLockChange);
    document.addEventListener('mousemove', this._onMouseMove);
    this.domElement.addEventListener('pointerdown', this._onPointerDown);
    window.addEventListener('pointerup', this._onPointerUp);
    this.domElement.addEventListener('contextmenu', this._onContextMenu);
    this.domElement.addEventListener('wheel', this._onWheel, { passive: false });

    // Grab pointer lock if wanted (shulkr prepareMode -> requestPointerLock()).
    if (this.usePointerLock && this.domElement.requestPointerLock) {
      const p = this.domElement.requestPointerLock();
      if (p && typeof p.catch === 'function') p.catch(() => {}); // user/permission may deny
    }
  }

  disable() {
    if (!this.enabled) return;
    this.enabled = false;

    if (document.pointerLockElement === this.domElement && document.exitPointerLock) {
      document.exitPointerLock();
    }
    this.keys.clear();
    this.dragging = false;
    this.pointerLocked = false;
    this.lookLive = false;

    // Restore orbit projection.
    this.camera.fov = this._savedFov;
    this.camera.near = this._savedNear;
    this.camera.updateProjectionMatrix();

    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    document.removeEventListener('pointerlockchange', this._onPointerLockChange);
    document.removeEventListener('mousemove', this._onMouseMove);
    this.domElement.removeEventListener('pointerdown', this._onPointerDown);
    window.removeEventListener('pointerup', this._onPointerUp);
    this.domElement.removeEventListener('contextmenu', this._onContextMenu);
    this.domElement.removeEventListener('wheel', this._onWheel);

    if (this.orbitControls) this.orbitControls.enabled = true;
    if (this.onActiveChange) this.onActiveChange(false);
    // 通知外层(按钮状态同步)探索已退出
    window.dispatchEvent(new CustomEvent('shulkr-explore-exit'));
  }

  /** Per-frame update; call from the render loop with the frame delta in seconds. */
  update(dtSeconds) {
    if (!this.enabled) return;
    const dt = Math.max(0, Math.min(dtSeconds, MAX_DT)); // shulkr Ab(e) clamp

    // Forward / right vectors from yaw & pitch (shulkr forwardVec + updateFly).
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    this.forward.set(cp * Math.sin(this.yaw), sp, cp * Math.cos(this.yaw)).normalize();
    this.right.crossVectors(this.forward, this.up).normalize();

    const has = (code) => (this.keys.has(code) ? 1 : 0);
    const fwd = has('KeyW') - has('KeyS') + has('ArrowUp') - has('ArrowDown');
    const strafe = has('KeyD') - has('KeyA') + has('ArrowRight') - has('ArrowLeft');
    const vertical = has('Space') - (has('ShiftLeft') || has('ShiftRight') ? 1 : 0);

    // velocity = forward*fwd + right*strafe + up*vertical, normalized to 11*flySpeed
    this.velocity.set(0, vertical, 0)
      .addScaledVector(this.forward, fwd)
      .addScaledVector(this.right, strafe);

    if (this.velocity.lengthSq() > 1e-6) {
      this.velocity.multiplyScalar((this.speed * this.flySpeed) / Math.max(1, this.velocity.length()));
      this.flyPos.addScaledVector(this.velocity, dt);
    }

    // Apply position + free-look orientation to the camera (shulkr camera.lookAt(flyPos+forward)).
    this.camera.position.copy(this.flyPos);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.forward.clone().add(this.flyPos));
  }

  // ---- internal handlers -------------------------------------------------

  _onKeyDown(e) {
    if (!this.enabled) return;
    // Prevent page scroll / default actions for keys we use.
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault();
    }
    if (e.code === 'Escape') { this.disable(); return; }
    this.keys.add(e.code);
  }

  _onKeyUp(e) {
    if (!this.enabled) return;
    this.keys.delete(e.code);
  }

  _onMouseMove(e) {
    if (!this.enabled) return;
    if (this.pointerLocked) {
      this._flyLook(e.movementX || 0, e.movementY || 0);
    } else if (this.dragging) {
      this._flyLook(e.clientX - this.lookX, e.clientY - this.lookY);
      this.lookX = e.clientX;
      this.lookY = e.clientY;
    }
  }

  _onPointerDown(e) {
    if (!this.enabled) return;
    if (!this.pointerLocked) {
      // Fallback drag-to-look when pointer lock is unavailable/denied.
      this.dragging = true;
      this.lookX = e.clientX;
      this.lookY = e.clientY;
    }
  }

  _onPointerUp() {
    this.dragging = false;
  }

  _onContextMenu(e) {
    if (this.enabled) e.preventDefault(); // shulkr: explore suppresses context menu
  }

  _onWheel(e) {
    if (!this.enabled) return;
    e.preventDefault();
    // Scroll wheel adjusts fly speed (shulkr: wheelNotches -> setFlySpeed).
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    this.flySpeed = Math.max(0.1, Math.min(20, this.flySpeed * factor));
  }

  _onPointerLockChange() {
    this.pointerLocked = document.pointerLockElement === this.domElement;
    this.lookLive = this.pointerLocked;
    // Esc (or any pointer-lock exit) while exploring -> leave explore mode.
    if (!this.pointerLocked && this.enabled && this.exitOnUnlock) {
      this.disable();
    }
  }

  _flyLook(dx, dy) {
    // shulkr flyLook(e,t): yaw -= e*sx; pitch -= t*sx; clamp pitch.
    this.yaw -= dx * this.sensitivity;
    this.pitch -= dy * this.sensitivity;
    this.pitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, this.pitch));
  }
}

/*
 * ===========================================================================
 * INTEGRATION NOTE — how replica.js should wire ExploreMode to the
 * "贴近 / explore" button (enable on click, disable on Esc).
 * ===========================================================================
 *
 * In replica.js (DO NOT edit this file — just follow the pattern), after the
 * camera and OrbitControls are created:
 *
 *     import { ExploreMode } from './explore-mode.js';
 *
 *     const explore = new ExploreMode(camera, renderer.domElement, {
 *       // Toggling orbit is handled for you if you pass the controls instance,
 *       // or you can use the explicit callback form below.
 *       orbitControls: orbit,
 *       // onActiveChange: (active) => { orbit.enabled = !active; }
 *     });
 *
 *     // Wire the "贴近 / explore" button:
 *     exploreButton.addEventListener('click', () => {
 *       if (explore.enabled) explore.disable();
 *       else explore.enable();
 *     });
 *
 *     // Esc is already handled inside ExploreMode (keydown + pointerlockchange),
 *     // but you can also force-exit from anywhere:
 *     //   window.addEventListener('keydown', e => { if (e.code === 'Escape') explore.disable(); });
 *
 *     // Drive the mode from the existing render loop:
 *     function animate() {
 *       requestAnimationFrame(animate);
 *       const dt = clock.getDelta();
 *       if (explore.enabled) explore.update(dt);   // free-look + WASD movement
 *       else orbit.update();                        // normal orbit interaction
 *       renderer.render(scene, camera);
 *     }
 *
 * Controls while active:
 *   - Mouse            : free-look (pointer lock; or click-drag if lock denied)
 *   - W / up , S / down: move forward / back
 *   - A / left , D / right: strafe left / right
 *   - Space / Shift    : rise / descend
 *   - Mouse wheel      : adjust fly speed
 *   - Esc              : exit explore mode (restores OrbitControls + cursor)
 * ===========================================================================
 */
