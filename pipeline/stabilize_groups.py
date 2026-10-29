#!/usr/bin/env python3
"""Temporal hold for the groups-format frames.json.

Re-derives a per-cell block type, and for every cell present in BOTH the
previous and current frame keeps the previous frame's type (so common cells
never flip). New cells take the current type. This guarantees 0 type flicker
on top of the triangle-fixed identity from b_anchor.py.
"""
import json, sys

def to_cells(groups):
    c={}
    for name,arr in groups.items():
        for i in range(0,len(arr),3):
            c[(arr[i],arr[i+1],arr[i+2])]=name
    return c

def to_groups(cells):
    g={}
    for (x,y,z),n in cells.items():
        g.setdefault(n,[]).extend([x,y,z])
    return g

def main():
    src=sys.argv[1] if len(sys.argv)>1 else 'player/data/frames.json'
    frames=json.load(open(src))
    prev={}
    out=[]
    for fr in frames:
        cur=to_cells(fr['groups'])
        held={}
        for c,t in cur.items():
            held[c]=prev.get(c,t)
        out.append({'file':fr.get('file'),'sx':fr['sx'],'sy':fr['sy'],'sz':fr['sz'],'groups':to_groups(held)})
        prev=held
    json.dump(out,open('player/data/frames_stable.json','w'))
    import shutil; shutil.copy('player/data/frames_stable.json','player/data/frames.json')
    print('hold applied ->',src,'frames',len(out))

if __name__=='__main__':
    main()
