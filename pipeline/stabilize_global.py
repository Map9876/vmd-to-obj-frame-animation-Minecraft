#!/usr/bin/env python3
"""Global stable-skin stabilizer (option B, temporal-consensus version).

Problem with v1 hold: it froze each cell to its FIRST-seen color, so a cell that
a rotating limb later occupies keeps the wrong (frame-0) color.

Better (the "global I-frame skin" idea): for every grid cell, look at ALL frames
where it is occupied and tally the block types obj2 assigned it (obj2 colors are
true texture samples). The cell's permanent skin color = the MODE (majority)
over the whole sequence. This is stable (one color per cell) AND correct (the
consensus of true samples), instead of a possibly-wrong first sample.

Occupancy is left as the raw (real motion). Color flicker -> 0 by construction.

Usage: stabilize_global.py <raw.json> <out.json>
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

def main():
    inp = sys.argv[1] if len(sys.argv) > 1 else 'player/data/frames_raw.json'
    outp = sys.argv[2] if len(sys.argv) > 2 else 'player/data/frames_stable.json'
    data, frames = load(inp)
    tally = collections.defaultdict(collections.Counter)
    for cur in frames:
        for c, t in cur.items():
            tally[c][t] += 1
    mode = {c: cnt.most_common(1)[0][0] for c, cnt in tally.items()}
    # how many cells had a clear majority vs mixed (diagnostic)
    mixed = sum(1 for c, cnt in tally.items() if cnt.most_common(1)[0][1] < sum(cnt.values()) * 0.6)
    out = []
    for fr, cur in zip(data, frames):
        groups = collections.defaultdict(list)
        for c, _ in cur.items():
            b = mode[c]
            groups[b].extend([c[0], c[1], c[2]])
        out.append({'file': fr['file'], 'sx': fr['sx'], 'sy': fr['sy'], 'sz': fr['sz'],
                    'groups': {b: v for b, v in groups.items()}})
    with open(outp, 'w') as f:
        json.dump(out, f)
    # flicker check
    tot=0; flips=0
    for i in range(1, len(out)):
        a={(x,y,z):b for b,fl in out[i-1]['groups'].items() for x,y,z in zip(fl[0::3],fl[1::3],fl[2::3])}
        b={(x,y,z):b for b,fl in out[i]['groups'].items() for x,y,z in zip(fl[0::3],fl[1::3],fl[2::3])}
        common=set(a)&set(b)
        flips+=sum(1 for c in common if a[c]!=b[c]); tot+=len(common)
    print(f"wrote {outp}: {len(out)} frames")
    print(f"cells total={len(tally)} mixed(<60% majority)={mixed} ({mixed/len(tally)*100:.1f}%)")
    print(f"type_flicker = {flips/tot*100:.2f}% ({flips}/{tot})")

if __name__ == '__main__':
    main()
