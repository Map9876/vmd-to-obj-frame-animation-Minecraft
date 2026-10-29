// camera-modes.js — shulkr camera mode controller, faithfully ported from shulkr.com's WebGL engine.
//
// SOURCE: /tmp/sh_engine.js (reverse-engineered shulkr engine = three.js + shulkr glue).
//
// shulkr method names found in sh_engine.js and their status in this port:
//   --- Mode state machine (the `y` class wrapping a "host"; drives transitions) ---
//   [FOUND]  easeOutCubic easing:  var v=e=>1-(1-e)**3   -> ported VERBATIM as `easeOutCubic`
//   [FOUND]  y#to(e)               -> ported as ShulkrCameraController#setMode (rename only)
//   [FOUND]  y#update(e)           -> ported as #update(dtMs)
//   [FOUND]  y#startMove(e,t)      -> ported as #startMove (calls resetCameraBaseline + beginCameraMove)
//   [FOUND]  y#settleIfInstant()   -> ported as #settleIfInstant
//   [FOUND]  y#settle()            -> ported as #settle
//   [FOUND]  y#cancel()            -> ported as #cancel
//   [FOUND]  y#get current/target/isTransitioning/inputLocked  -> ported as getters
//
//   --- Host class (the big ShulkrStage-like renderer; performs the actual camera moves) ---
//   [FOUND]  host#resetCameraBaseline()  -> ported as #resetCameraBaseline
//   [FOUND]  host#exitMode(e)            -> ported as #exitMode
//   [FOUND]  host#prepareMode(e,t)       -> ported as #prepareMode (no pointer-lock in this port)
//   [FOUND]  host#fovFor(e)              -> ported as #fovFor   (plan uses orbitFov, explore uses exploreFov)
//   [FOUND]  host#beginCameraMove(e,t)   -> ported as #beginCameraMove
//   [FOUND]  host#startTween(e)          -> ported as #startTween  (sets modeTween, returns duration)
//   [FOUND]  host#advanceCameraMove(e)   -> ported as #advanceCameraMove (VERBATIM lerpVectors logic)
//   [FOUND]  host#enterMode(e)           -> ported as #enterMode
//   [FOUND]  host#captureCam()           -> ported as #captureCam
//   [FOUND]  host#alignToSlice(e,t)      -> ported as #alignToSlice (mirrored for plan top-down slice)
//   [FOUND]  host#computePlanView()      -> ported as #computePlanView (top-down slice view)
//   [FOUND]  host#computeIsoFrame()      -> ported as #computeIsoFrame (isometric orbit view)
//   [FOUND]  host#aimFov(e)              -> ported as #aimFov (we fold the FOV tween into the camera move)
//
// Authoritative shulkr constants recovered from sh_engine.js:
//   Gb = 70        (explore FOV)            -> this.exploreFov
//   orbitFov = 45  (default orbit FOV)      -> this.orbitFov  (plan reuses orbitFov)
//   ex = .05       (baseline near plane)    -> this.defaultNear
//   nx = 8e3       (baseline far plane)     -> this.defaultFar
//   rx = .5        (transition duration s)  -> this.moveDuration = 500 (ms)
//   tx = .02       (explore near plane)     -> used as explore near in computeExploreView
//
// NOTE on 'explore': shulkr's explore is a first-person (pointer-lock) arrival driven by
// `pendingArrival`. Per the task spec, this port redefines 'explore' as a *close-up* orbit of
// the current target (computeExploreView). We keep controls enabled (orbit) for usability and
// constrain min/max distance; this is the one intentional deviation from shulkr's FPS explore.
//
// NOTE on update(): shulkr's machine.update() is fed dt in *seconds* and rx=0.5s. This port's
// #update(dtMs) takes milliseconds (as the task specifies) and uses moveDuration=500ms, so the
// eased timeline is identical (500ms transition).

import * as THREE from 'three';

// ---- shulkr easeOutCubic easing — VERBATIM from sh_engine.js: var v=e=>1-(1-e)**3 ----
const easeOutCubic = (e) => 1 - (1 - e) ** 3;

export class ShulkrCameraController {
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;

    // mode state machine
    this.mode = 'orbit';
    this.transition = null;   // { from, to, elapsed, duration }
    this.modeTween = null;    // { fromPos, toPos, fromTarget, toTarget, fromUp, toUp, fromFov, toFov }

    // FOV / camera baseline (shulkr: Gb=70, orbitFov=45, ex=.05, nx=8e3)
    this.orbitFov = 45;
    this.exploreFov = 70;
    this.planFov = 45;        // fovFor('plan') === orbitFov in shulkr
    this.defaultNear = 0.05;
    this.defaultFar = 8000;
    this.moveDuration = 500;  // shulkr rx = .5 s

    // controls config
    this.panEnabled = true;
    this.zoomToCursorPref = false;

    // saved camera states (orbit/plan), mirroring shulkr's orbitSaved / planSaved
    this.orbitSaved = null;
    this.planSaved = null;
    this.planMode = false;

    // world bounds + slice config (set via setWorldBounds / setClip)
    this.bounds = null;       // { min:{x,y,z}, max:{x,y,z} }
    this.clipAxis = 1;        // 0 = x, 1 = y, 2 = z  (shulkr default slice along Y)
    this.clipY = null;        // explicit slice coordinate, or null => midpoint

    // fov aim target set by aimFov()
    this._aimFov = undefined;

    // optional callback: onModeChange(mode)
    this.onModeChange = null;

    // apply baseline
    this.camera.near = this.defaultNear;
    this.camera.far = this.defaultFar;
    this.camera.up.set(0, 1, 0);
    this.camera.updateProjectionMatrix();
  }

  // ---- mode state getters (shulkr y#current / target / isTransitioning / inputLocked) ----
  get current() { return this.mode; }
  get target() { return this.transition ? this.transition.to : this.mode; }
  get isTransitioning() { return this.transition !== null; }
  get inputLocked() { return this.transition !== null; }

  // ---- public API ----
  setMode(e) {
    if (e === this.target && this.transition === null) return;
    if (this.transition) {
      if (e === this.transition.to) return;
      this.prepareMode(this.transition.from, e);
      this.transition = {
        from: this.transition.from,
        to: e,
        elapsed: 0,
        duration: this.startMove(this.transition.from, e),
      };
      this.settleIfInstant();
      return;
    }
    const from = this.mode;
    this.prepareMode(from, e);
    this.exitMode(from);
    this.transition = {
      from,
      to: e,
      elapsed: 0,
      duration: this.startMove(from, e),
    };
    this.settleIfInstant();
  }

  update(dtMs) {
    const t = this.transition;
    if (!t) return;
    t.elapsed += dtMs;
    const n = Math.min(1, t.elapsed / t.duration);
    this.advanceCameraMove(easeOutCubic(n));
    if (n >= 1) this.settle();
  }

  cancel() {
    if (this.transition) this.settle();
  }

  // ---- world / slice configuration (used by computePlanView / computeIsoFrame) ----
  setWorldBounds(min, max) {
    this.bounds = { min: { ...min }, max: { ...max } };
  }
  setClipAxis(axis) { this.clipAxis = axis | 0; }
  setClipY(y) { this.clipY = (y === null || y === undefined) ? null : y; }

  // ---- transition helpers (shulkr y#startMove / settleIfInstant / settle) ----
  startMove(from, to) {
    this.resetCameraBaseline();
    return Math.max(0, this.beginCameraMove(from, to));
  }
  settleIfInstant() {
    if (this.transition && this.transition.duration <= 0) {
      this.advanceCameraMove(1);
      this.settle();
    }
  }
  settle() {
    const e = this.transition;
    if (e) {
      this.transition = null;
      this.mode = e.to;
      this.enterMode(e.to);
    }
  }

  // =================== HOST CAMERA-MOVE METHODS (shulkr) ===================

  // shulkr: resetCameraBaseline()
  resetCameraBaseline() {
    this.camera.near = this.defaultNear;
    this.camera.far = this.defaultFar;
    this.camera.up.set(0, 1, 0);
    this.camera.rotation.z = 0;
    this.camera.updateProjectionMatrix();
    this.controls.enabled = true;
    this.controls.enableRotate = true;
    this.controls.enablePan = this.panEnabled;
    this.controls.zoomToCursor = this.zoomToCursorPref;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    this.controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };
    this.syncControlsUp();
  }

  // shulkr: exitMode(e)
  exitMode(e) {
    if (e === 'orbit') {
      this.orbitSaved = this.captureCam();
    } else if (e === 'plan') {
      this.planSaved = { cam: this.captureCam() };
      this.planMode = false;
    }
    // explore: teardownFirstPerson() — no first-person in this port, nothing to tear down.
  }

  // shulkr: prepareMode(e,t) — requestPointerLock for explore; not driven here.
  prepareMode(/* from, to */) { /* intentionally a no-op in this port */ }

  // shulkr: fovFor(e) — plan reuses orbitFov (only explore differs)
  fovFor(e) {
    return e === 'explore' ? this.exploreFov : this.orbitFov;
  }

  // shulkr: beginCameraMove(e,t)
  beginCameraMove(from, to) {
    this.aimFov(this.fovFor(to));
    if (to === 'plan') {
      const e = this.planSaved ? this.planSaved.cam : null;
      if (e) this.alignToSlice(e.position, e.target);
      return this.startTween(e ?? this.computePlanView());
    }
    if (to === 'explore') {
      // shulkr uses pendingArrival (first-person). We tween to a close-up instead.
      return this.startTween(this.computeExploreView());
    }
    // orbit (return)
    const n = this.orbitSaved
      ? this.orbitSaved
      : (this.bounds ? this.computeIsoFrame() : null);
    return n ? this.startTween(n) : 0;
  }

  // shulkr: startTween(e) — sets modeTween and returns transition duration (shulkr: rx = .5)
  startTween(e) {
    this.camera.near = Math.min(this.camera.near, e.near);
    this.camera.far = Math.max(this.camera.far, e.far);
    this.camera.updateProjectionMatrix();
    this.controls.minDistance = e.minDistance;
    this.controls.maxDistance = e.maxDistance;
    this.controls.enabled = false;            // disabled during the eased move
    const fromFov = this.camera.fov;
    const toFov = (this._aimFov !== undefined) ? this._aimFov : fromFov;
    this.modeTween = {
      fromPos: this.camera.position.clone(),
      toPos: e.position,
      fromTarget: this.controls.target.clone(),
      toTarget: e.target,
      fromUp: this.camera.up.clone(),
      toUp: e.up,
      fromFov,
      toFov,
    };
    this._aimFov = undefined;
    return this.moveDuration;
  }

  // shulkr: advanceCameraMove(e) — VERBATIM lerpVectors logic (+ folded FOV tween)
  advanceCameraMove(e) {
    const t = this.modeTween;
    if (!t) return;
    this.camera.position.lerpVectors(t.fromPos, t.toPos, e);
    this.controls.target.lerpVectors(t.fromTarget, t.toTarget, e);
    this.camera.up.lerpVectors(t.fromUp, t.toUp, e).normalize();
    if (t.fromFov !== undefined) {
      this.camera.fov = t.fromFov + (t.toFov - t.fromFov) * e;
      this.camera.updateProjectionMatrix();
    }
    this.camera.lookAt(this.controls.target);
    if (e >= 1) this.modeTween = null;
  }

  // shulkr: enterMode(e)
  enterMode(e) {
    // shulkr: controls.enabled = (e !== 'explore'). We keep explore usable as a close-up orbit.
    this.controls.enabled = true;
    if (e === 'plan') {
      this.planMode = true;
      this.controls.enableRotate = false;
      this.controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };
      this.controls.touches = {
        ONE: THREE.TOUCH.PAN,
        TWO: THREE.TOUCH.DOLLY_PAN,
      };
    } else if (e === 'explore') {
      // close-up orbit: constrain min/max so the user inspects the focal point
      this.controls.enableRotate = true;
    } else {
      // orbit
      this.controls.enableRotate = true;
    }
    this.controls.update();
    if (this.onModeChange) this.onModeChange(e);
  }

  // shulkr: captureCam()
  captureCam() {
    return {
      position: this.camera.position.clone(),
      target: this.controls.target.clone(),
      up: this.camera.up.clone(),
      near: this.camera.near,
      far: this.camera.far,
      minDistance: this.controls.minDistance,
      maxDistance: this.controls.maxDistance,
    };
  }

  // shulkr: alignToSlice(e,t) — snap a (position,target) pair onto the slice plane, preserving offset
  alignToSlice(e, t) {
    if (!this.bounds) return;
    const n = this.sliceCoord();
    const r = this.clipAxis;
    const i = r === 0 ? 'x' : r === 1 ? 'y' : 'z';
    const a = e[i] - t[i];
    t[i] = n;
    e[i] = n + a;
  }

  // shulkr: computePlanView() — top-down slice view (mirrored faithfully)
  computePlanView() {
    const e = this.bounds;
    if (!e) return this._defaultFrame('plan');
    const t = {
      x: e.max.x + 1 - e.min.x,
      y: e.max.y + 1 - e.min.y,
      z: e.max.z + 1 - e.max.z,
    };
    const n = new THREE.Vector3(
      (e.min.x + e.max.x + 1) / 2,
      (e.min.y + e.max.y + 1) / 2,
      (e.min.z + e.max.z + 1) / 2
    );
    const r = this.clipAxis;
    const i = r === 0 ? { w: t.z, h: t.y }
            : r === 1 ? { w: t.x, h: t.z }
                     : { w: t.x, h: t.y };
    const a = this.fovFor('plan') * Math.PI / 180;
    const o = 2 * Math.atan(Math.tan(a / 2) * this.camera.aspect);
    const s = Math.max(i.h / 2 / Math.tan(a / 2), i.w / 2 / Math.tan(o / 2), 1) * 1.12;
    const c = r === 0 ? e.max.x : r === 1 ? e.max.y : e.max.z;
    const l = r === 0 ? e.min.x : r === 1 ? e.min.y : e.min.z;
    const u = this.sliceCoord();
    const d = n.clone();
    const f = n.clone();
    const p = new THREE.Vector3(0, 1, 0);
    if (r === 0) { d.x = u; f.set(u + s, n.y, n.z); }
    else if (r === 1) { d.y = u; f.set(n.x, u + s, n.z); p.set(0, 0, -1); }
    else { d.z = u; f.set(n.x, n.y, u + s); }
    const m = c + 1 - l;
    return {
      position: f,
      target: d,
      up: p,
      near: Math.max(0.05, s * 0.02),
      far: s + m + 10 + s * 4,
      minDistance: 1,
      maxDistance: s * 4,
    };
  }

  // shulkr: computeIsoFrame() — isometric orbit view (mirrored faithfully)
  computeIsoFrame() {
    const e = this.bounds;
    if (!e) return this._defaultFrame('orbit');
    const t = new THREE.Vector3(e.min.x, e.min.y, e.min.z);
    const n = new THREE.Vector3(e.max.x + 1, e.max.y + 1, e.max.z + 1);
    const r = t.clone().add(n).multiplyScalar(0.5);
    const i = n.clone().sub(t).length() / 2;
    const a = new THREE.Vector3(0.7, 0.55, 0.7).normalize();
    const o = this.fovFor('orbit');
    const c = i / Math.sin(o * Math.PI / 360) * 1.15;
    const l = c * 3;
    return {
      position: r.clone().addScaledVector(a, c),
      target: r,
      up: new THREE.Vector3(0, 1, 0),
      near: Math.max(0.05, i * 0.02),
      far: l + i * 24,
      minDistance: i * 0.2,
      maxDistance: l,
    };
  }

  // close-up view for 'explore' (task-mandated; replaces shulkr's first-person arrival)
  computeExploreView() {
    const target = this.controls.target.clone();
    const dir = new THREE.Vector3().subVectors(this.camera.position, target);
    if (dir.lengthSq() < 1e-6) dir.set(0.7, 0.55, 0.7).normalize();
    dir.normalize();
    const dist = 18;
    const position = target.clone().addScaledVector(dir, dist);
    return {
      position,
      target,
      up: new THREE.Vector3(0, 1, 0),
      near: 0.02,                      // shulkr tx = .02
      far: this.camera.far,
      minDistance: 2,
      maxDistance: dist * 4,
    };
  }

  // shulkr: aimFov(e) — we store the target FOV and fold it into startTween's eased move.
  aimFov(e) {
    this._aimFov = e;
  }

  // shulkr: syncControlsUp() — keep OrbitControls' internal up-quaternion in sync with camera.up
  syncControlsUp() {
    const e = this.controls;
    if (e._quat && e._quatInverse) {
      e._quat.setFromUnitVectors(this.camera.up, new THREE.Vector3(0, 1, 0));
      e._quatInverse.copy(e._quat).invert();
    }
  }

  // ---- slice coordinate helper (mirrors shulkr T(clipY??null, visibleRange())) ----
  sliceCoord() {
    const range = this.visibleRange();
    return (this.clipY !== null && this.clipY !== undefined)
      ? this.clipY
      : (range.min + range.max) / 2;
  }
  visibleRange() {
    if (!this.bounds) return { min: 0, max: 0 };
    const e = this.clipAxis;
    return e === 0 ? { min: this.bounds.min.x, max: this.bounds.max.x }
         : e === 1 ? { min: this.bounds.min.y, max: this.bounds.max.y }
                  : { min: this.bounds.min.z, max: this.bounds.max.z };
  }

  // fallback frames when no world bounds are configured yet
  _defaultFrame(mode) {
    const target = this.controls.target.clone();
    if (mode === 'plan') {
      const dist = this.camera.position.distanceTo(target) || 100;
      const up = new THREE.Vector3(0, 0, -1);
      return {
        position: new THREE.Vector3(target.x, target.y + dist, target.z),
        target,
        up,
        near: 0.05,
        far: dist * 8,
        minDistance: 1,
        maxDistance: dist * 4,
      };
    }
    // orbit / orbit-return: stay put (identity tween)
    return {
      position: this.camera.position.clone(),
      target,
      up: this.camera.up.clone(),
      near: this.camera.near,
      far: this.camera.far,
      minDistance: this.controls.minDistance,
      maxDistance: this.controls.maxDistance,
    };
  }
}
