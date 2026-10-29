import bpy, sys, os, glob, mathutils
HERE = os.path.dirname(os.path.abspath(__file__))
MMD_SRC = '/workspace/mc-voxel-video/tools/mmdtools_src'
sys.path.insert(0, MMD_SRC); sys.path.insert(0, HERE)
import mmd_tools, spring_bones
OUT = open('/tmp/bake.txt', 'w')
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
log('hair sims', len(sims))

# find the name of a hair vertex group so we can locate hair vertices
vg_names = [g.name for g in body.vertex_groups]
hair_vg = [n for n in vg_names if 'hair' in n.lower()]
log('hair vertex groups', len(hair_vg), hair_vg[:3])

# map vertices -> hair group index
def hair_vert_coords(dup):
    idxs = [g.index for g in dup.vertex_groups if 'hair' in g.name.lower()]
    coords = []
    for vi, v in enumerate(dup.data.vertices):
        for g in v.groups:
            if g.group in idxs:
                coords.append(dup.matrix_world @ v.co)
                break
    return coords

def bake(f, use_sim):
    scene.frame_set(f); bpy.context.view_layer.update()
    if use_sim:
        colliders = spring_bones.build_colliders(arm)
        spring_bones.simulate_frame(arm, sims, colliders, ref_speed=0.04)
        bpy.context.view_layer.update()
    dup = body.copy(); dup.data = body.data.copy()
    bpy.context.collection.objects.link(dup)
    bpy.context.view_layer.objects.active = dup
    if dup.data.shape_keys:
        bpy.ops.object.shape_key_remove(all=True)
    for mod in list(dup.modifiers):
        if mod.type == 'ARMATURE':
            bpy.ops.object.modifier_apply(modifier=mod.name)
    c = hair_vert_coords(dup)
    bpy.data.objects.remove(dup, do_unlink=True)
    return c

f = 30
a = bake(f, False)
# debug single bone: compare FK head vs sim new for first hair bone
b_debug = sec[0]
scene.frame_set(f); bpy.context.view_layer.update()
colls = spring_bones.build_colliders(arm)
import mathutils as mu
fk0 = b_debug.head.copy()
spring_bones.simulate_frame(arm, sims, colls, ref_speed=0.04)
bpy.context.view_layer.update()
sim0 = b_debug.head.copy()
log('DBG fk head', fk0)
log('DBG sim head', sim0)
log('DBG shift %.4f' % (fk0 - sim0).length)
b = bake(f, True)
if a and b:
    ca = sum(a, mathutils.Vector()) / len(a)
    cb = sum(b, mathutils.Vector()) / len(b)
    log('hair centroid FK  ', ca)
    log('hair centroid SIM ', cb)
    log('centroid shift %.4f' % (ca - cb).length)
    # per-vertex max shift
    n = min(len(a), len(b))
    mx = max((a[i] - b[i]).length for i in range(n))
    log('max per-vertex shift %.4f over %d verts' % (mx, n))
else:
    log('NO hair verts found')
log('DONE')
OUT.close()
