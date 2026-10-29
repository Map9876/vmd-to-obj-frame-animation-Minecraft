import bpy, sys, os, glob, mathutils
sys.path.insert(0, '/workspace/mc-voxel-video/tools/mmdtools_src')
sys.path.insert(0, '/workspace/mc-voxel-video/pipeline')
import mmd_tools
from spring_bones import find_secondary_bones, build_colliders, SpringBoneSim, simulate_frame
OUT=open('/tmp/p.txt','w')
def log(*a): OUT.write(' '.join(map(str,a))+chr(10)); OUT.flush()
mmd_tools.register()
pmx=glob.glob('/workspace/mc-voxel-video/assets/*.pmx')[0]
vmd=glob.glob('/workspace/mc-voxel-video/assets/daybyday*.vmd')[0]
bpy.ops.mmd_tools.import_model(filepath=pmx)
bpy.ops.mmd_tools.import_vmd(filepath=vmd)
scene=bpy.context.scene
arm_obj=[o for o in bpy.data.objects if o.type=='ARMATURE'][0]
hair=find_secondary_bones(arm_obj, ('hair',))
tail=find_secondary_bones(arm_obj, ('tail',))
log('hair bones', len(hair), 'tail bones', len(tail))
params={'gravity':0.9,'frame_dt':1/30.0,'inertia_min':0.80,'inertia_max':0.97}
colls=build_colliders(arm_obj)
log('colliders', len(colls))
sims=[SpringBoneSim(b, arm_obj, params) for b in hair]
tb=hair[0]
def head_local(): return tb.head.copy()
def setf(f):
    scene.frame_set(f); bpy.context.view_layer.update()
# FK positions
setf(20); fk20=head_local()
setf(40); fk40=head_local()
# simulate at intensity 0.5
setf(20); simulate_frame(arm_obj, sims, colls, 0.5); s20=head_local()
setf(40); simulate_frame(arm_obj, sims, colls, 0.5); s40=head_local()
log('FK   20->40 move %.4f'%( (fk40-fk20).length ))
log('SIM  20->40 move %.4f'%( (s40-s20).length ))
log('SIM differs from FK at f40: %.4f'%((s40-fk40).length))
log('DONE')
OUT.close()
