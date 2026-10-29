#!/usr/bin/env python3
"""Temporal stabilizer for frames.json -- COLOR hold only (kills color snow).

Proven by flicker.py: cells occupied in both frames flip block TYPE ~71%
even when the body barely moves in grid space. That is grid-keyed re-sampling
of the mesh surface; the fix is to hold each persistent cell's block type.

A cell occupied in the previous frame inherits that frame's type (so every
cell occupied in both frames keeps the same type -> 0% color flicker by
construction). A cell NOT in the previous frame is newly exposed by motion ->
keep its freshly voxelised type. Occupancy is left as-is (real limb motion).

Usage: stabilize.py <in.json> <out.json>
"""
import json, sys, collections

def load(path):
    with open(path) as f:
        data = json.load(f)
    frames = []
    for fr in data:
        cells = {}
        for bname, flat in fr['groups'].items():
            for i in range(0, len(flat), 3):
                cells[(flat[i], flat[i+1], flat[i+2])] = bname
        frames.append(cells)
    return data, frames

def stabilize(data, frames):
    out_frames = []
    prev = {}
    for cur in frames:
        new_cells = {}
        for c, t in cur.items():
            new_cells[c] = prev[c] if c in prev else t
        out_frames.append(new_cells)
        prev = new_cells
    out = []
    for fr, cells in zip(data, out_frames):
        groups = collections.defaultdict(list)
        for (x, y, z), b in cells.items():
            groups[b].extend([x, y, z])
        out.append({'file': fr['file'], 'sx': fr['sx'], 'sy': fr['sy'], 'sz': fr['sz'],
                    'groups': {b: v for b, v in groups.items()}})
    return out

def main():
    inp = sys.argv[1] if len(sys.argv) > 1 else 'player/data/frames.json'
    outp = sys.argv[2] if len(sys.argv) > 2 else 'player/data/frames_stable.json'
    data, frames = load(inp)
    out = stabilize(data, frames)
    with open(outp, 'w') as f:
        json.dump(out, f)
    tot=0; flips=0
    for i in range(1, len(out)):
        a={(x,y,z):b for b,fl in out[i-1]['groups'].items() for x,y,z in zip(fl[0::3],fl[1::3],fl[2::3])}
        b={(x,y,z):b for b,fl in out[i]['groups'].items() for x,y,z in zip(fl[0::3],fl[1::3],fl[2::3])}
        common=set(a)&set(b)
        flips+=sum(1 for c in common if a[c]!=b[c]); tot+=len(common)
    print(f"wrote {outp}: {len(out)} frames")
    print(f"type_flicker (color snow) = {flips/tot*100:.2f}% ({flips}/{tot})")

if __name__ == '__main__':
    main()
