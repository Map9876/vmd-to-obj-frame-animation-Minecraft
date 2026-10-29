#!/usr/bin/env python3
"""Option B: body-anchored voxelisation with stable per-body-point colors.

For every frame we rasterise the CURRENT mesh surface into ONE consistent grid
(so blocks follow the body). Crucially, the block TYPE of each rasterised cell is
NOT re-quantised per frame from the cell's sampled color (that is what produced
the snow: a body patch landed in a different cell each frame -> different block).
Instead each mesh triangle carries a FIXED block type, decided once from the
frame-0 vertex colors. A triangle therefore always paints the same block and
merely translates through the grid as the body moves -- this is the deterministic
analogue of vertex-tracking / motion-vector reprojection / temporal coherence.
Palette RGB is taken from the player's own block-texture PNGs.
"""
import os, json, time, math
import numpy as np
from PIL import Image
from glb_tools import load_glb, vertex_true_colors

ROOT='.'
GLB='frames_glb'
PAL_DIR='player/assets/block-textures'
HEIGHT_VOX=192

def build_palette():
    names=sorted(os.listdir(PAL_DIR))
    rgb={}
    for n in names:
        if not n.endswith('.png'): continue
        im=np.asarray(Image.open(os.path.join(PAL_DIR,n)).convert('RGB')).reshape(-1,3)
        rgb['minecraft:'+n[:-4]]=im.mean(0)/255.0
    return rgb

def light_bbox(path):
    g=load_glb(path, light=True)
    return g['V'].min(0), g['V'].max(0)

def rasterise(V, F, tri_type, origin, vs):
    # tri_type[i] = fixed block name for global triangle i (stable across frames).
    out={}
    for ti, tri in enumerate(F):
        p=V[tri]
        n=np.cross(p[1]-p[0], p[2]-p[0])
        ax=int(np.argmax(np.abs(n)))
        b,c=tuple(i for i in range(3) if i!=ax)
        tb=p[:,[b,c]].astype(np.float64)
        b0=int(math.floor(tb[:,0].min())); b1=int(math.ceil(tb[:,0].max()))
        c0=int(math.floor(tb[:,1].min())); c1=int(math.ceil(tb[:,1].max()))
        if b1<b0 or c1<c0: continue
        bb=np.arange(b0,b1+1); cc=np.arange(c0,c1+1)
        B,C=np.meshgrid(bb,cc); B=B.ravel(); C=C.ravel()
        P=np.stack([B,C],1).astype(np.float64)
        def edge(a,d,e): return (e[:,0]-a[0])*(d[1]-a[1])-(e[:,1]-a[1])*(d[0]-a[0])
        e0=edge(tb[0],tb[1],P); e1=edge(tb[1],tb[2],P); e2=edge(tb[2],tb[0],P)
        inside=((e0>=0)&(e1>=0)&(e2>=0))|((e0<=0)&(e1<=0)&(e2<=0))
        if not inside.any(): continue
        B=B[inside]; C=C[inside]
        denom=(tb[2,0]-tb[0,0])*(tb[1,1]-tb[0,1])-(tb[2,1]-tb[0,1])*(tb[1,0]-tb[0,0])
        if abs(denom)<1e-12: continue
        w0=edge(tb[1],tb[2],P)/denom
        w1=edge(tb[2],tb[0],P)/denom
        w2=1.0-w0-w1
        a_val=w0*p[0,ax]+w1*p[1,ax]+w2*p[2,ax]
        aiv_lo=np.floor(a_val).astype(int); aiv_hi=np.ceil(a_val).astype(int)
        bname=tri_type[ti]
        for k in range(len(B)):
            base=[0,0,0]; base[b]=int(B[k]); base[c]=int(C[k])
            for al in (int(aiv_lo[k]), int(aiv_hi[k])):
                coord=base[:]; coord[ax]=al
                x,y,z=tuple(coord)
                if x<0 or y<0 or z<0: continue
                out[(x,y,z)]=bname
    if not out:
        return out, (1,1,1)
    xs=max(k[0] for k in out); ys=max(k[1] for k in out); zs=max(k[2] for k in out)
    return out, (xs+1,ys+1,zs+1)

def main():
    t0=time.time()
    pal=build_palette()
    # flesh is assigned only via the explicit head-skin rule below, so keep it
    # OUT of the general nearest-palette set (otherwise red clothing that is
    # warm-colored would also snap to flesh).
    pal_names=[n for n in pal if n!='minecraft:flesh']
    pal_rgb=np.array([pal[n] for n in pal_names],dtype=np.float64)
    print('palette blocks',len(pal_names),'(+flesh by rule)')
    files=sorted([f for f in os.listdir(GLB) if f.endswith('.glb')])
    gmin=np.full(3,1e9); gmax=np.full(3,-1e9)
    for f in files:
        lo,hi=light_bbox(os.path.join(GLB,f)); gmin=np.minimum(gmin,lo); gmax=np.maximum(gmax,hi)
    yext=gmax[1]-gmin[1]; vs=yext/HEIGHT_VOX
    margin=2*vs; origin=gmin-margin
    fixed_dims=tuple(int(np.ceil((gmax-origin)/vs)[i])+1 for i in range(3))
    print('voxel_size',vs,'origin',origin.round(4),'fixed_dims',fixed_dims,'frames',len(files))
    # frame-0 vertex colors -> fixed per-triangle block type (stable identity).
    # Generic style-class assignment (NO model-specific labels / magic numbers).
    # A triangle is a "soft-shell" (skin-like) candidate when its averaged color
    # is WARM (R > B -- a generic skin cue across characters) AND SMOOTH (low
    # per-triangle colour variance: a flat continuous patch, not a creased /
    # textured garment). flesh is assigned ONLY through this rule and is kept
    # out of the general nearest-palette set. Pure colour/geometry rules cannot
    # tell a smooth warm shirt from skin; that separation is the job of the
    # region tracker (persistent body shell vs loose garment shell) described in
    # the design notes, which refines this later.
    g0=load_glb(os.path.join(GLB,files[0]), light=False)
    vcol0=vertex_true_colors(g0)
    WARM_THR=0.04
    SMOOTH_THR=0.05
    tri_type=np.empty(len(g0['F']), dtype=object)
    nskin=0
    for i,tri in enumerate(g0['F']):
        cv=vcol0[tri]
        c=cv.mean(0)
        warmth=c[0]-c[2]
        smooth=cv.std(0).mean()
        if warmth > WARM_THR and smooth < SMOOTH_THR:
            tri_type[i]='minecraft:flesh'; nskin+=1
        else:
            d=((pal_rgb-c)**2).sum(1)
            tri_type[i]=pal_names[int(d.argmin())]
    print('triangle types assigned',len(tri_type),'soft-shell(flesh) tris',nskin,'elapsed',round(time.time()-t0,1))
    out_frames=[]
    for i,f in enumerate(files):
        g=load_glb(os.path.join(GLB,f), light=True)
        Vg=(g['V']-origin)/vs
        out,sz=rasterise(Vg, g['F'], tri_type, origin, vs)
        groups={}
        for (x,y,z),bn in out.items():
            groups.setdefault(bn,[]).extend([x,y,z])
        out_frames.append({'file':f,'sx':fixed_dims[0],'sy':fixed_dims[1],'sz':fixed_dims[2],'groups':groups})
        print(f'frame {i}: voxels={len(out)} dims={sz} t={round(time.time()-t0,1)}s')
    with open('player/data/frames_stable.json','w') as fh:
        json.dump(out_frames,fh)
    import shutil; shutil.copy('player/data/frames_stable.json','player/data/frames.json')
    print('WROTE frames.json + frames_stable.json total',round(time.time()-t0,1),'s')

if __name__=='__main__':
    main()
