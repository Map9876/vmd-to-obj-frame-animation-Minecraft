# vmd-to-obj-frame-animation-Minecraft

把 MMD 舞蹈模型（.pmx 模型 + .vmd 动作）转成「逐帧模型」，用于用真实 Minecraft
方块搭出来并在网页里播放。这是 mc-voxel-video 项目的 STAGE 1 / STAGE 2 转换代码。

## 能力
- `pipeline/sample_mmd.py` —— STAGE 1：Blender 把动作烘焙成逐帧 GLB（每帧一个静态网格，
  自带贴图）。任意 VMD 动作 + 任意 PMX 模型都能用 `--vmd` / `--pmx` 指定。
- `pipeline/b_anchor.py` —— STAGE 2（方案 B）：把逐帧 GLB 体素化成 MC 方块。
  每个三角形只分配一次固定方块类型（取第 0 帧顶点色），之后三角形随身体在网格里
  平移 —— 也就是时间相干（temporal coherence），用来消除逐帧抖色/雪花/马赛克。
- `pipeline/stabilize_global.py` / `stabilize.py` / `stabilize_groups.py` —— 体素后处理，
  进一步把颜色闪烁压到 0。
- `pipeline/glb_tools.py` —— GLB 读取 / 顶点真色工具。
- `pipeline/spring_bones.py` —— 基于动作强度的头发/裙子二次运动。

## 用法
```bash
# STAGE 1: VMD -> 逐帧 GLB
./tools/blender -b -P pipeline/sample_mmd.py -- \
  --pmx  assets/MODEL.pmx --vmd assets/MOTION.vmd \
  --out frames_glb --max 30 --fps 24

# STAGE 2: GLB -> MC 方块 (方案 B, 时间相干)
pip install numpy pillow
python3 pipeline/b_anchor.py   # -> player/data/frames_stable.json + frames.json
```

完整使用文档见 `docs/USAGE.md`（含所有文件路径、已知问题：前后抖动 / 雪花马赛克）。

## 依赖
- Blender 4.2+（含 mmd_tools）用于 STAGE 1
- Python: numpy, Pillow 用于 STAGE 2
- STAGE 3（litematic -> 网页播放器）在 mc-voxel-video/player/
