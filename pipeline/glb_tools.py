#!/usr/bin/env python3
"""GLB loader + true per-vertex color sampling for option B.

Parses a baked-skinned glTF-binary mesh: positions, uvs, triangle indices,
per-primitive material -> baseColor texture. Produces a TRUE RGB per vertex by
sampling the material texture at the vertex UV (glTF flip-Y). This is the stable
body-point color that blocks carry, so colors follow the body.
"""
import json, struct, io
import numpy as np
from PIL import Image

COMP = {5120:('b',1),5121:('B',1),5122:('h',2),5123:('H',2),5125:('I',4),5126:('f',4)}
VECC = {'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}

def _read_accessor(g, acc):
    bv = g['bufferViews'][acc['bufferView']]
    off = bv.get('byteOffset',0) + acc.get('byteOffset',0)
    t, sz = COMP[acc['componentType']]
    n = VECC[acc['type']]
    count = acc['count']
    raw = g['_bin'][off: off+count*n*sz]
    arr = np.frombuffer(raw, dtype=np.dtype(t))
    return arr.reshape(count, n).astype(np.float64)

def load_glb(path, light=False):
    data = open(path,'rb').read()
    assert data[:4]==b'glTF'
    off=12; bin_bytes=None
    while off < len(data):
        ln = struct.unpack('<I', data[off:off+4])[0]
        ctype = data[off+4:off+8]
        body = data[off+8:off+8+ln]
        if ctype==b'JSON': json_bytes=body
        elif ctype[:3]==b'BIN': bin_bytes=body
        off += 8+ln
    g = json.loads(json_bytes)
    g['_bin']=bin_bytes
    A = lambda i: _read_accessor(g, g['accessors'][i])
    images=[]
    if light:
        # geometry-only: skip heavy texture decode; still build V, UV, F
        pass
    else:
        for im in g.get('images',[]):
            if 'bufferView' in im:
                bv=g['bufferViews'][im['bufferView']]
                img=Image.open(io.BytesIO(bin_bytes[bv['byteOffset']:bv['byteOffset']+bv['byteLength']]))
                images.append(np.asarray(img.convert('RGB')))
            else:
                images.append(None)
    tex_src=[ t.get('source') for t in g.get('textures',[]) ]
    mat_tex=[]
    for m in g.get('materials',[]):
        bct = m.get('pbrMetallicRoughness',{}).get('baseColorTexture')
        mat_tex.append(tex_src[bct['index']] if bct is not None else None)
    verts=[]; uvs=[]; faces=[]; vtex=[]; vbase=0
    for prim in g['meshes'][0]['primitives']:
        pos=A(prim['attributes']['POSITION'])
        uv = A(prim['attributes']['TEXCOORD_0']) if 'TEXCOORD_0' in prim['attributes'] else np.zeros((len(pos),2))
        idx = A(prim['indices']) if 'indices' in prim else np.arange(len(pos)).reshape(-1,1)
        idx = idx.reshape(-1,3).astype(np.int64)
        mat = prim.get('material')
        timg = mat_tex[mat] if mat is not None else None
        verts.append(pos); uvs.append(uv)
        vtex.append(np.full(len(pos), timg if timg is not None else -1, dtype=np.int64))
        faces.append(idx + vbase); vbase += len(pos)
    return {'V':np.vstack(verts),'UV':np.vstack(uvs),'F':np.vstack(faces),
            'VT':np.concatenate(vtex),'images':images}

def vertex_true_colors(g):
    V=g['V']; UV=g['UV']; VT=g['VT']; images=g['images']
    rgb=np.zeros((len(V),3),dtype=np.float64)
    for timg in np.unique(VT):
        if timg<0 or images[timg] is None:
            rgb[VT==timg]=[0.6,0.6,0.6]; continue
        img=images[timg]; H,W=img.shape[:2]
        uv=UV[VT==timg]
        u=np.clip(uv[:,0],0,1)*(W-1)
        v=(1.0-np.clip(uv[:,1],0,1))*(H-1)
        rgb[VT==timg]=img[v.round().astype(int), u.round().astype(int)].astype(np.float64)/255.0
    return rgb

if __name__=='__main__':
    import os
    d='frames_glb'
    f=os.path.join(d, sorted(os.listdir(d))[0])
    g=load_glb(f)
    print('V',g['V'].shape,'UV',g['UV'].shape,'F',g['F'].shape)
    print('bbox min',g['V'].min(0).round(3),'max',g['V'].max(0).round(3))
    rgb=vertex_true_colors(g)
    print('rgb first5',rgb[:5].round(3))
    print('rgb range',rgb.min(0).round(3),rgb.max(0).round(3))
    print('images',[None if i is None else i.shape for i in g['images']])
