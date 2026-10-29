#!/usr/bin/env python3
"""Objective inter-frame flicker (snow) analyzer for frames.json.

The "snow" the user reports = grid cells that stay OCCUPIED across consecutive
frames but flip their block TYPE (like TV static). This measures exactly that.

Two metrics:
  - occ_flicker: fraction of cells occupied in frame N that are NOT occupied in N+1
                 (expected during normal motion; not "snow").
  - type_flicker: among cells occupied in BOTH N and N+1, fraction whose block
                 TYPE differs. THIS is the snow.
We also report, per cell, the entropy of block types it takes over the sequence
(high entropy on a persistently-occupied cell == snow).
"""
import json, sys, collections, math

def load(path):
    with open(path) as f:
        data = json.load(f)
    frames = []
    for fr in data:
        cells = {}
        for bname, flat in fr['groups'].items():
            for i in range(0, len(flat), 3):
                x, y, z = flat[i], flat[i+1], flat[i+2]
                cells[(x, y, z)] = bname
        frames.append(cells)
    return frames

def main():
    path = sys.argv[1] if len(sys.argv) > 1 else 'player/data/frames.json'
    frames = load(path)
    n = len(frames)
    print(f"frames={n}")

    type_flips_total = 0
    both_total = 0
    occ_flick_total = 0
    occ_total = 0

    per_pair = []
    for i in range(1, n):
        a, b = frames[i-1], frames[i]
        common = set(a) & set(b)
        flips = sum(1 for c in common if a[c] != b[c])
        gone = sum(1 for c in a if c not in b)
        both_total += len(common)
        type_flips_total += flips
        occ_total += len(a)
        occ_flick_total += gone
        rate = flips / len(common) if common else 0
        per_pair.append(rate)
        if i <= 6 or i == n-1:
            print(f"  pair {i-1}->{i}: common={len(common)} type_flips={flips} "
                  f"type_flicker={rate*100:.1f}%  occ_gone={gone} occ_flick={gone/len(a)*100:.1f}%")

    print()
    print(f"GLOBAL type_flicker (snow) = {type_flips_total/both_total*100:.2f}% "
          f"({type_flips_total}/{both_total} common cells)")
    print(f"GLOBAL occ_flicker (motion) = {occ_flick_total/occ_total*100:.2f}% "
          f"({occ_flick_total}/{occ_total} cells)")
    avg = sum(per_pair)/len(per_pair)
    print(f"AVG per-pair type_flicker = {avg*100:.2f}%")

    cell_types = collections.defaultdict(collections.Counter)
    for fr in frames:
        for c, b in fr.items():
            cell_types[c][b] += 1
    persistent = {c: cnt for c, cnt in cell_types.items() if sum(cnt.values()) >= 40}
    diversity = []
    for c, cnt in persistent.items():
        tot = sum(cnt.values())
        ent = -sum((v/tot)*math.log2(v/tot) for v in cnt.values())
        diversity.append((ent, len(cnt), tot, cnt.most_common(4)))
    diversity.sort(reverse=True)
    print()
    print(f"persistent cells (>=40 frames present): {len(persistent)}")
    print("Top 15 highest-entropy persistent cells (worst snow):")
    for ent, k, tot, top in diversity[:15]:
        print(f"  H={ent:.2f} types={k} present={tot} top={top}")

if __name__ == '__main__':
    main()
