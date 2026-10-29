# 中立体素帧格式（Voxel Frame Format）v0.1

本格式是整套管线的核心中间表示，引擎无关。所有端（MC / Blender / Unity / UE5）只写各自的 exporter 读它。

## 目录布局（由 voxelize.py 产出）
frames_vox/
  frames.npz        压缩后的体素帧堆叠，键 grid = uint8[F, N, N, N]，0=空，1=实心
  vox_00001.npy     单帧体素占用 bool/uint8[N,N,N]
  proj_00001.ppm    单帧投影预览（PPM，白=实心），仅供人眼核对
  meta.json         网格尺寸、帧数、每帧占用体素数

## 后续扩展（TODO）
- block 调色板：每格从单 id(实心) 升级为 (block_id, color) ，由模型贴图/材质映射（接 ObjToSchematic 的 _assign）
- 多 block 类型：区分 皮肤/头发/衣物/眼睛等，提升辨识度
- 帧间 delta 编码：相邻帧差异极小，只存变化体素，支撑高密度帧

## MC 端（bake 法，采纳）
把每帧体素模型按网格铺进 MC 世界不同位置（一次性静态摆放），自动相机沿网格逐帧瞬移截图，ffmpeg 合成 mp4。
可选 ReplayMod 录一段可漫游/运镜/子弹时间的版本。
