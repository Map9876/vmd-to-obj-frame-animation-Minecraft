# mc-voxel-video - progress report and dev docs

Goal in one line: turn an MMD dance model into a figure built from REAL Minecraft
blocks, then play it back at 24fps in a web page. No live Minecraft world; the
deliverable is a web player.

## Status 2026-10-28
- [x] STAGE 1: MMD sampled into 30 baked-pose GLBs (md5 differs per frame, poses correct)
- [x] STAGE 2: ObjToSchematic voxelizes GLB into real MC block litematics (6464-7210 blocks/frame, 49-56 block types, colored human, not a box)
- [x] Palette fix: PALETTE_ALL_RELEASE (metal/glowing) -> PALETTE_COLOURFUL (matte only); skin no longer maps to copper/shroomlight
- [x] STAGE 3 parser: from-scratch NBT reader + Litematica bit-unpacker (64-bit boundary fix, 23863==TotalBlocks)
- [x] Web player: THREE InstancedMesh per-frame swap, 24fps, FALLBACK for ~11 missing textures
- [ ] build.mjs BigInt error on newest litematics (see below)
- [ ] Scale voxels to ~150 tall (user wants 100+ blocks)
- [ ] Screenshot proof for user (textured human)
- [ ] Copy mcblock site CSS 100% (lighting/material list/grid/axes/measure/annotate/transparency/entity toggles)

## Architecture
MMD(.pmx+.vmd) --[Blender bake]--> GLB --[ObjToSchematic]--> litematic --[build.mjs]--> frames.json --[THREE]--> 24fps animation

### Key decisions
1. Do NOT write blocks into real MC; use a web viewer (better quality: textures + lighting).
2. Voxelization MUST reuse ObjToSchematic (hand-written trimesh voxelizer has no color->block map).
3. Use restricted matte palette (ALL_RELEASE maps skin to metal/glow blocks, looks weird).

## STAGE 1: MMD -> GLB (pipeline/sample_mmd.py)
Fixes:
- Blender headless missing X11/GL libs -> apt-get install libgl1 etc.
- mmd_tools addon was broken typings version -> replaced with UuuNyaa/blender_mmd_tools source.
- Of 931 meshes, 929 are rigidbody proxies; only one (提弗洛ス_mesh, with ARMATURE modifier) is the real character.
- Exporting mesh without baking skeleton -> glTF exporter cannot capture deformation -> all static.
  Fix: per frame copy body -> remove shape keys -> modifier_apply('Armature') bakes pose into static vertices -> export only the copy.

## STAGE 2: GLB -> litematic (/workspace/objtoschematic_tool)
Driver run-ots-frame.ts runs real pipeline: gltf load -> bvh-ray voxelise ->
BlockMesh.createFromVoxelMesh -> export litematic. ots_hook.js stubs .png/.atlas/.fs/.vs
so ts-node runs headless.

## STAGE 3: litematic -> web (player/)
build.mjs: NBT read + Litematica bit-unpack -> data/frames.json (217123 blocks) + extract textures.
main.js: one InstancedMesh per block variant, 24fps frame swap. Local: python3 -m http.server 8123.

## BUG TO FIX: build.mjs BigInt
Rerunning build.mjs on the 19:12 litematics throws "Cannot mix BigInt and other types" at line 71.
Cause: BlockStates may be TAG 11 (IntArray) not the TAG 12 (LongArray) the code expects.
Fix: coerce longs[o] with BigInt() before shifting (BigInt() accepts number and BigInt).

## Reused resources
- ref-viewers/mcblock/bundle.zip: 13MB, 5196 block-face textures, already downloaded.
- Original site CSS/JS in ref-viewers/ (read-only reference).

## How to verify
- Preview URL: local port X -> https://<prefix>-X.cnb.run/player/index.html
- Acceptance: 30 frames at 24fps show a recognizable humanoid dancer in matte MC block
  colors with real textures; figure height >= 100 blocks; screenshot confirms textured
  person; mcblock visual styling present.

---

## 演示 / 已知问题：电视雪花马赛克

下面是把体素化结果录屏裁掉前 5 秒后的 GIF。**这是错误示范**——它对应的是 STAGE 2
没加 `VOX=solid` 时的表面体素化散云（手臂穿过身体时一条射线打到多层表面，每帧被撒成
内部切片，像电视无信号雪花）。

![体素化错误示范：前后抖动 / 雪花](docs/voxel_snow_demo.gif)

**正确做法**：STAGE 2 必须带 `VOX=solid`（even-odd 实心体素器）。详见
[docs/USAGE.md](docs/USAGE.md) 第 4、7 节。

**完整使用文档（任意 VMD + 皮肤 -> 逐帧模型 -> 体素化 -> 网页播放，含所有文件路径）**：
[docs/USAGE.md](docs/USAGE.md)
