import bpy, sys, os, json

HERE = os.path.dirname(os.path.abspath(__file__))
# Prefer the mmd_tools bundled with this Blender build (persistent, no clone
# needed). Fall back to a separately cloned source tree if present.
BLENDER_ADDONS = '/workspace/mc-voxel-video/tools/blender-4.2.3-linux-x64/4.2/scripts/addons'
MMD_SRC = '/workspace/mc-voxel-video/tools/mmdtools_src'
for p in (BLENDER_ADDONS, MMD_SRC):
    if p not in sys.path:
        sys.path.insert(0, p)
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import spring_bones

# Load mmd_tools directly (addon_utils.enable is unreliable headless).
for m in bpy.data.objects:
    m.select_set(False)
try:
    import mmd_tools
    mmd_tools.register()
    print('mmd_tools registered: ok')
except Exception as e:
    print('mmd_tools register FAILED:', repr(e))

def arg(name, default=None):
    if name in sys.argv:
        return sys.argv[sys.argv.index(name) + 1]
    return default

pmx = arg('--pmx')
vmd = arg('--vmd')
out = arg('--out', '/workspace/mc-voxel-video/frames_glb')
fps = int(arg('--fps', '24'))
max_frames = int(arg('--max', '30'))
clip_start = int(arg('--start', '0'))   # 0 = from motion start
sim_on = arg('--sim', '0') == '1'        # enable motion-intensity hair physics
sim_keywords = arg('--sim-bones', 'hair').split(',')
os.makedirs(out, exist_ok=True)

bpy.ops.mmd_tools.import_model(filepath=pmx)
root = bpy.context.active_object
if root is None:
    raise RuntimeError('PMX import produced no active object')
print('model root:', root.name)

for o in bpy.data.objects:
    o.select_set(False)
root.select_set(True)
bpy.context.view_layer.objects.active = root
bpy.ops.mmd_tools.import_vmd(filepath=vmd)

scene = bpy.context.scene
start, end = int(scene.frame_start), int(scene.frame_end)
src_fps = float(getattr(scene.render, 'fps', 30) or 30)
total = max(0, end - start + 1)
print('motion range:', start, '..', end, 'total=', total, 'src_fps=', src_fps)

body = None
for o in bpy.data.objects:
    if o.type == 'MESH' and any(m.type == 'ARMATURE' for m in o.modifiers):
        body = o
        break
if body is None:
    raise RuntimeError('No skinned body mesh found')
print('body mesh:', body.name, 'verts=', len(body.data.vertices))

# ---- optional motion-intensity secondary motion (SpringBone) ----
arm_obj = body.find_armature()
sims = []
if sim_on and arm_obj is not None:
    sim_params = {'gravity': 0.9, 'frame_dt': 1/30.0,
                  'inertia_min': 0.80, 'inertia_max': 0.97,
                  'stiffness': 0.35,
                  'influence_base': 0.15, 'influence_max': 0.5}
    sec = spring_bones.find_secondary_bones(arm_obj, tuple(sim_keywords))
    sims = [spring_bones.SpringBoneSim(b, arm_obj, sim_params) for b in sec]
    print('SPRINGBONE: %d %s bones simulated' % (len(sims), '/'.join(sim_keywords)))
else:
    print('SPRINGBONE: disabled')

def gltfify_materials():
    for m in bpy.data.materials:
        if not m.use_nodes:
            continue
        nt = m.node_tree
        diff_img = None
        best = 0
        for n in nt.nodes:
            if n.type == 'TEX_IMAGE' and n.image:
                w, h = n.image.size
                if w * h > best and 'toon' not in n.image.name.lower():
                    best = w * h
                    diff_img = n.image
        nt.nodes.clear()
        outn = nt.nodes.new('ShaderNodeOutputMaterial')
        bsdf = nt.nodes.new('ShaderNodeBsdfPrincipled')
        nt.links.new(bsdf.outputs['BSDF'], outn.inputs['Surface'])
        if diff_img is not None:
            tex = nt.nodes.new('ShaderNodeTexImage')
            tex.image = diff_img
            nt.links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
            try:
                diff_img.pack()
            except Exception:
                pass
        else:
            c = m.diffuse_color
            bsdf.inputs['Base Color'].default_value = (c[0], c[1], c[2], 1.0)
        try:
            m.blend_method = 'OPAQUE'
        except Exception:
            pass

gltfify_materials()
print('materials converted for glTF export')

# ---- CONSECUTIVE sampling (smooth motion), not spread across whole dance ----
if clip_start and clip_start > start:
    s = clip_start
else:
    s = start
if max_frames and max_frames < total:
    frames = [s + i for i in range(max_frames)]
else:
    frames = list(range(start, end + 1))
frames = [min(f, end) for f in frames if f >= start]
frames = sorted(set(frames))
print('sampling', len(frames), 'CONSECUTIVE frames from', frames[0])

def anchor_point(src_body):
    # Stable reference = the MMD 'Center' bone (it carries the model's translation).
    # Using the Center bone (which moves SMOOTHLY) instead of the per-frame bbox
    # centre removes gross drift WITHOUT the jitter that bbox-recentring caused
    # (bbox centre shifts whenever a limb swings out -> twitch). Falls back to the
    # armature object origin if no Center bone exists.
    arm = src_body.find_armature()
    if arm is None:
        return None
    pbs = arm.pose.bones
    bone = None
    for nm in ('Center', 'センター', 'Root', 'root', 'Parent'):
        if nm in pbs:
            bone = pbs[nm]
            break
    if bone is None:
        return arm.matrix_world.translation.copy()
    return (arm.matrix_world @ bone.matrix).translation.copy()

def align(dup, anchor):
    # Remove gross translation using the (smooth) Center-bone world position so the
    # figure dances in place and stays put across frames. Then ground the feet at y=0.
    if anchor is not None:
        dup.location.x -= anchor.x
        dup.location.z -= anchor.z
        dup.location.y -= anchor.y
    ys = [v.co.y for v in dup.data.vertices]
    miny = min(ys)
    dup.location.y -= miny

def bake_frame(f):
    scene.frame_set(f)
    bpy.context.view_layer.update()
    # run secondary motion BEFORE the armature modifier is applied so the
    # baked mesh already carries the hair/skirt swing
    if sims:
        colliders = spring_bones.build_colliders(arm_obj)
        spring_bones.simulate_frame(arm_obj, sims, colliders, ref_speed=0.04)
        bpy.context.view_layer.update()
    anchor = anchor_point(body)
    dup = body.copy()
    dup.data = body.data.copy()
    bpy.context.collection.objects.link(dup)
    bpy.context.view_layer.objects.active = dup
    if dup.data.shape_keys:
        bpy.ops.object.shape_key_remove(all=True)
    for mod in list(dup.modifiers):
        if mod.type == 'ARMATURE':
            bpy.ops.object.modifier_apply(modifier=mod.name)
    align(dup, anchor)
    return dup

manifest = []
for idx, f in enumerate(frames):
    dup = bake_frame(f)
    name = os.path.join(out, 'frame_%05d.glb' % (idx + 1))
    for o in bpy.data.objects:
        o.select_set(False)
    dup.select_set(True)
    bpy.ops.export_scene.gltf(
        filepath=name,
        export_format='GLB',
        use_selection=True,
        export_apply=True,
        export_materials='EXPORT',
        export_image_format='AUTO',
        export_animations=False,
        export_extras=False,
    )
    bpy.data.objects.remove(dup, do_unlink=True)
    manifest.append({'frame': idx + 1, 'src_frame': f, 'glb': name})
    print('exported', name)

with open(os.path.join(out, 'manifest.json'), 'w') as fh:
    json.dump({'pmx': pmx, 'vmd': vmd, 'fps': fps, 'src_fps': src_fps,
               'total_frames': len(manifest), 'start': start, 'end': end,
               'clip_start': s, 'frames': manifest}, fh, indent=2)
print('DONE exported', len(manifest), 'frames to', out)
