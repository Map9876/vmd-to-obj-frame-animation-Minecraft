#!/usr/bin/env python3
"""Motion-intensity driven secondary motion for hair / skirt / tail bones.

This is the industry-standard SpringBone technique (the same family used by
Genshin / VRM / Dynamic Bone): each secondary bone is a point mass integrated
with Verlet, pulled toward its rest/animated target by a spring (stiffness),
pushed by gravity, and damped. The *velocity retention* (how much it lags and
overshoots) scales with the bone's own motion intensity, so a fast head turn
whips the hair more than a slow one -- that is exactly "physics based on motion
intensity". Sphere colliders on body / tail bones push the hair out, which is
what prevents hair-vs-tail clipping.

It is implemented as a generic add-on to the MMD bake: chains are found by
keyword (hair_ / skirt_ / tail_ ...) which is model-agnostic, and the
simulation runs per frame BEFORE the armature modifier is applied, so the baked
mesh already carries the secondary motion.

Reference techniques (searched, not hand-rolled):
  - Genshin / VRM SpringBone: chain of bones, length constraint, colliders.
  - Spring-to-target + Verlet: x' = x + ((x - x_prev)*retain) + (target - x)*k + g.
  - Constraint: keep |x - parent| == bone_length (pendulum about parent).
  - Collision: push x out of collider spheres.
  - Orientation is applied via PoseBone.matrix_basis (local pose transform),
    NOT matrix, because matrix is parent-relative and would compound down the
    chain and explode.
"""
import bpy
import mathutils

UP = mathutils.Vector((0.0, 1.0, 0.0))
ZERO = mathutils.Vector((0.0, 0.0, 0.0))


def find_secondary_bones(arm_obj, keywords=('hair', 'skirt', 'tail')):
    """Return pose bones whose name contains one of the keywords.
    Generic: works for any model that names its soft-shell chains."""
    out = []
    for b in arm_obj.pose.bones:
        low = b.name.lower()
        if any(k in low for k in keywords):
            out.append(b)
    return out


def build_colliders(arm_obj, keywords=('spine', 'neck', 'head', 'tail', 'body',
                                       'shoulder', 'arm', 'leg', 'center')):
    """Sphere colliders at body/tail joints, read LIVE from the current pose so
    they follow the animated body. center=bone head, radius=heuristic."""
    colliders = []
    for b in arm_obj.pose.bones:
        low = b.name.lower()
        if any(k in low for k in keywords):
            head = b.head.copy()
            radius = max((b.tail - b.head).length, 0.05) * 1.2
            colliders.append((head, radius))
    return colliders


class SpringBoneSim:
    def __init__(self, bone, arm_obj, params):
        self.bone = bone
        self.arm = arm_obj
        self.p = params
        self.rest_len = (bone.tail - bone.head).length or 0.01
        self.cur = None          # last simulated head position (armature-local)
        self.vel = ZERO.copy()   # last velocity
        self.fk_prev = None      # previous-frame FK head (for intensity)

    def step(self, parent_head_local, target_local, colliders, intensity):
        fk_head = target_local
        if self.cur is None:
            self.cur = fk_head.copy()
            self.vel = ZERO.copy()
        # velocity RETENTION: high when moving fast (hair keeps swinging /
        # overshoots), lower when still (hair settles quickly)
        retain = self.p['inertia_min'] + (self.p['inertia_max'] - self.p['inertia_min']) * intensity
        stiff = self.p['stiffness']
        dt2 = self.p['frame_dt'] ** 2
        gravity = mathutils.Vector((0.0, -self.p['gravity'], 0.0)) * dt2
        # spring toward the rest/animated target + gravity, retain velocity
        force = (fk_head - self.cur) * stiff + gravity
        self.vel = (self.vel + force) * retain
        new = self.cur + self.vel
        # length constraint: keep |new - parent| == rest_len (pendulum about parent)
        d = new - parent_head_local
        if d.length > 1e-6:
            new = parent_head_local + d.normalized() * self.rest_len
        # collide with body/tail spheres
        for c, r in colliders:
            dd = new - c
            if dd.length < r:
                new = c + dd.normalized() * r
        self.cur = new.copy()
        # ORIENT via matrix_basis (LOCAL pose transform, relative to parent) so
        # the transform does not compound down the chain. To keep the CURL (a
        # wavy strand) from collapsing into a blob, we keep MOST of the bone's
        # REST orientation and only NUDGE toward the simulated direction; the
        # nudge grows with motion intensity. The strand's wave shape therefore
        # survives, while the whole strand still sways / lags with physics.
        dir_local = new - parent_head_local
        if dir_local.length > 1e-6:
            dir_local.normalize()
            rest_dir = self.bone.bone.tail_local - self.bone.bone.head_local
            if rest_dir.length > 1e-6:
                rest_dir.normalize()
                inf = self.p.get('influence_base', 0.15) + \
                      (self.p.get('influence_max', 0.5) - self.p.get('influence_base', 0.15)) * intensity
                fin = rest_dir * (1.0 - inf) + dir_local * inf
                if fin.length > 1e-6:
                    fin.normalize()
                    q = rest_dir.rotation_difference(fin)
                    self.bone.matrix_basis = q.to_matrix().to_4x4()
        return new


def simulate_frame(arm_obj, sims, colliders, ref_speed=0.03):
    """Step all sims in hierarchy order (parents before children).
    Intensity per bone = velocity of its own FK head vs previous frame."""
    def depth(b):
        d = 0
        p = b.parent
        while p:
            d += 1
            p = p.parent
        return d
    ordered = sorted(sims, key=lambda s: depth(s.bone))
    # current-frame FK head positions (pose-evaluated, before sim)
    fk_now = {s.bone.name: s.bone.head.copy() for s in sims}
    sim_head = {}
    for s in ordered:
        pb = s.bone
        parent = pb.parent
        if parent is not None and parent.name in sim_head:
            parent_head_local = sim_head[parent.name]
        else:
            parent_head_local = (parent.head.copy() if parent else ZERO.copy())
        # motion intensity from this bone's own FK-head velocity
        if s.fk_prev is not None:
            vel = (fk_now[pb.name] - s.fk_prev).length
            intensity = min(1.0, vel / ref_speed)
        else:
            intensity = 0.0
        s.fk_prev = fk_now[pb.name].copy()
        new = s.step(parent_head_local, fk_now[pb.name], colliders, intensity)
        sim_head[pb.name] = new
    return
