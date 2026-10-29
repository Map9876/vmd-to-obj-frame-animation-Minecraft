import bpy, sys, os, glob, mathutils as mu
HERE = os.path.dirname(os.path.abspath(__file__))
MMD_SRC = '/workspace/mc-voxel-video/tools/mmdtools_src'
sys.path.insert(0, MMD_SRC); sys.path.insert(0, HERE)
import mmd_tools, spring_bones
OUT = open('/tmp/stable.txt', 'w')
def log(*a): OUT.write(' '.join(map(str, a)) + chr(10)); OUT.flush()
mmd_tools.register()
pmx = glob.glob('/workspace/mc-voxel-video/assets/*.pmx')[0]
vmd = glob.glob('/workspace/mc-voxel-video/assets/daybyday*.vmd')[0]
bpy.ops.mmd_tools.import_model(filepath=pmx)
bpy.ops.mmd_tools.import_vmd(filepath=vmd)
scene = bpy.context.scene
body = [o for o in bpy.data.objects if o.type == 'MESH' and any(m.type == 'ARMATURE' for m in o.modifiers)][0]
arm = body.find_armature()
sim_params = {'gravity': 0.9, 'frame_dt': 1/30.0, 'inertia_min': 0.80,
              'inertia_max': 0.97, 'stiffness': 0.35}
sec = spring_bones.find_secondary_bones(arm, ('hair',))
sims = [spring_bones.SpringBoneSim(b, arm, sim_params) for b in sec]
idxs = [g.index for g in body.vertex_groups if 'hair' in g.name.lower()]

def hair_verts_deformed():
    dup = body.copy(); dup.data = body.data.copy()
    bpy.context.collection.objects.link(dup)
    bpy.context.view_layer.objects.active = dup
    if dup.data.shape_keys:
        bpy.ops.object.shape_key_remove(all=True)
    for mod in list(dup.modifiers):
        if mod.type == 'ARMATURE':
            bpy.ops.object.modifier_apply(modifier=mod.name)
    verts = []
    for v in dup.data.vertices:
        for g in v.groups:
            if g.group in idxs:
                verts.append(v.co.copy())
                break
    bpy.data.objects.remove(dup, do_unlink=True)
    return verts

prev_v = None

prev = None
for f in range(20, 45):
    scene.frame_set(f); bpy.context.view_layer.update()
    colliders = spring_bones.build_colliders(arm)
    spring_bones.simulate_frame(arm, sims, colliders, ref_speed=0.04)
    bpy.context.view_layer.update()
    c = hair_verts_deformed()
    # centroid of current hair verts
    cen = sum(c, mu.Vector()) / max(len(c), 1)
    d = (cen - prev).length if prev is not None else 0.0
    # max per-vertex displacement vs previous frame (tip swing)
    mx = 0.0
    if prev_v is not None:
        m = min(len(c), len(prev_v))
        mx = max((c[i] - prev_v[i]).length for i in range(m))
    # instrument a few bones: root, mid, tip
    b0 = sims[0].cur; bm = sims[len(sims)//2].cur; bt = sims[-1].cur
    log('f=%d cenStep=%.4f maxTipSwing=%.4f | cur0=%.2f curM=%.2f curT=%.2f'
        % (f, d, mx, b0.length if b0 else -1, bm.length if bm else -1, bt.length if bt else -1))
    prev = cen
    prev_v = c
log('DONE')
OUT.close()
