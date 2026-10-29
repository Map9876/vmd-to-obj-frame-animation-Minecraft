import bpy, sys, os, mathutils

MMD_SRC = '/workspace/mc-voxel-video/tools/mmdtools_src'
if MMD_SRC not in sys.path:
    sys.path.insert(0, MMD_SRC)
import addon_utils
addon_utils.enable('mmd_tools', default_set=False, persistent=True)

def arg(n, d=None):
    return sys.argv[sys.argv.index(n) + 1] if n in sys.argv else d

pmx = arg('--pmx', 'assets/提弗洛斯.pmx')
vmd = arg('--vmd', 'assets/daybyday适用tda等通用版本.vmd')
out = arg('--out', '/workspace/mc-voxel-video/ref_video.mp4')
start = int(arg('--start', '20'))
count = int(arg('--count', '60'))
fps = int(arg('--fps', '30'))
rw = int(arg('--rw', '854'))
rh = int(arg('--rh', '480'))
single = arg('--single', None)

bpy.ops.mmd_tools.import_model(filepath=pmx)
root = bpy.context.active_object
bpy.ops.mmd_tools.import_vmd(filepath=vmd)

sc = bpy.context.scene
sc.frame_start = start
sc.frame_end = start + count - 1
sc.render.fps = fps
sc.render.resolution_x = rw
sc.render.resolution_y = rh
sc.render.resolution_percentage = 100

# Cycles CPU (no GL context needed in headless) -> renders authentic MMD toon materials
sc.render.engine = 'CYCLES'
sc.cycles.device = 'CPU'
sc.cycles.samples = 16
sc.cycles.use_denoising = False
sc.cycles.max_bounces = 2
if hasattr(sc, 'display'):
    sd = sc.display.shading
    sd.background_type = 'VIEWPORT'

# Frame the character using its bounding box
def bbox_world():
    mins = [1e9,1e9,1e9]; maxs = [-1e9,-1e9,-1e9]
    for o in bpy.data.objects:
        if o.type != 'MESH': continue
        for c in o.bound_box:
            v = o.matrix_world @ mathutils.Vector(c)
            for i in range(3):
                mins[i]=min(mins[i],v[i]); maxs[i]=max(maxs[i],v[i])
    return mins, maxs

mins, maxs = bbox_world()
center = [(mins[i]+maxs[i])/2 for i in range(3)]
size = [maxs[i]-mins[i] for i in range(3)]
maxdim = max(size)
d = maxdim * 1.8
cam = bpy.data.cameras.new('RefCam')
cam_obj = bpy.data.objects.new('RefCam', cam)
sc.collection.objects.link(cam_obj)
cam_obj.location = (center[0], center[1] - d, center[2] + maxdim*0.25)
direction = mathutils.Vector((center[0], center[1], center[2])) - cam_obj.location
cam_obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
cam_obj.data.lens = 35

sc.camera = cam_obj
sc.render.image_settings.file_format = 'FFMPEG'
sc.render.ffmpeg.format = 'MPEG4'
sc.render.ffmpeg.codec = 'H264'
sc.render.ffmpeg.constant_rate_factor = 'MEDIUM'
sc.render.filepath = out

if single:
    sc.frame_set(int(single))
    sp = os.path.join(os.path.dirname(out), 'ref_single.png')
    sc.render.image_settings.file_format = 'PNG'
    sc.render.filepath = sp
    bpy.ops.render.render(write_still=True)
    print('rendered single', sp)
else:
    bpy.ops.render.render(animation=True)
    print('rendered video', out)
