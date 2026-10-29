# mc-voxel-video 完整使用文档

把一段 MMD 舞蹈模型（.pmx 模型 + .vmd 动作）转成「用真实 Minecraft 方块搭出来」的逐帧模型，
再在纯前端网页里 24fps 播放。不进真实 MC 世界，交付物是一个网页播放器。

> 角色当前用的是 **提弗洛斯 (Typhoea)**：模型 assets/提弗洛斯.pmx，贴图 assets/textures/T_actor_typhoea_*。

---

## 1. 输入文件（任意 VMD 都可以）

| 用途 | 文件 | 路径 | 说明 |
|------|------|------|------|
| 模型/皮肤 | 提弗洛斯.pmx | assets/提弗洛斯.pmx | MMD 模型（含骨骼、贴图）。CJK 文件名，shell 里必须加引号 |
| 身体动作 | daybyday适用tda等通用版本.vmd | assets/daybyday适用tda等通用版本.vmd | 任意 VMD 均可，用 --vmd 指定即可 |
| 身体动作(备选) | daybyday适用yyb版.vmd | assets/daybyday适用yyb版.vmd | 另一套动作 |
| 镜头动作 | 镜头.vmd | assets/镜头.vmd | 仅给网页播放器当相机轨迹，**不参与** 体素化 |

**关键点：动作文件不是写死的。** 你手头任何 .vmd（下载的、自己 K 的）都能直接喂给下面的
--vmd 参数，模型会自动套上该动作并逐帧烘焙。镜头 .vmd 是独立的一条，只用于最终网页镜头。

---

## 2. 完整流水线（3 个阶段）

MMD (.pmx + .vmd)
   STAGE 1  pipeline/sample_mmd.py  (Blender 烘焙)
逐帧 GLB  frames_glb/frame_00001.glb ... frame_00030.glb  + manifest.json
   STAGE 2  ObjToSchematic  run-ots-frame.ts  (体素化)
MC 方块    frames_ots/frame_0000N.litematic   (真实方块 + 真实颜色)
   STAGE 3  player/build.mjs  (解析 litematic)
网页数据    player/data/frames.json  +  player/assets/block-textures/*.png
   player/index.html (THREE.js 渲染, 24fps 切换帧)
浏览器播放

---

## 3. STAGE 1 —— MMD 到 逐帧 GLB（把动作转成每帧模型）

脚本：pipeline/sample_mmd.py
工具：tools/blender（-> tools/blender-4.2.3-linux-x64/blender）

    cd /workspace/mc-voxel-video
    ./tools/blender -b -P pipeline/sample_mmd.py -- \
      --pmx  assets/提弗洛斯.pmx \
      --vmd  assets/daybyday适用tda等通用版本.vmd \
      --out  frames_glb \
      --max  30 \
      --fps  24

参数：
- --pmx  模型文件（皮肤）。任意 PMX 都能用，换模型只改这里。
- --vmd  动作文件。任意 VMD 都能用，换动作只改这里。
- --out  输出目录，默认 frames_glb。
- --max  烘焙多少帧（默认 30）。动作会连续采样这 N 帧（不是铺满整支舞）。
- --fps  源帧率（默认 24）。
- --start 从动作的哪一帧开始（默认 0 = 动作开头）。
- --sim 1 --sim-bones hair 开启基于动作强度的头发/裙子物理（SpringBone）。

脚本内部做的事（无需你操心）：
1. 导入 PMX，注册 mmd_tools（用 tools/mmdtools_src 这份可用源码）。
2. 在材质节点树里把自定义 MMD shader 换成干净 Principled BSDF 并打包贴图
   （gltfify_materials()），否则 GLB 会带 0 张贴图、体素化时方块颜色会变随机。
3. 找出唯一带 ARMATURE 修改器的网格（真实角色，其余 ~929 个是刚体代理，忽略）。
4. 逐帧：复制身体网格 -> 删 shape key -> modifier_apply('Armature') 把当前姿态烤进静态顶点
   -> 用骨骼的 Center 骨做平移对齐（原地跳舞、不漂移）-> 脚底落到 y=0 -> 导出 GLB。

输出：frames_glb/frame_00001.glb ... frame_00030.glb 和 frames_glb/manifest.json。

> 不烘焙骨骼直接导出 -> 30 帧全部一样/静止。必须先 modifier_apply('Armature')。

---

## 4. STAGE 2 —— GLB 到 MC 方块（体素化 / 关键步骤）

工具目录：/workspace/objtoschematic_tool/（LucasDower/ObjToSchematic 的 clone，已 npm install）
驱动脚本：tools/run-ots-frame.ts（批量 GLB->litematic）
环境钩子：tools/ots_hook.js（stub 掉 .png/.atlas/.fs/.vs，让 headless ts-node 能跑）

    cd /workspace/objtoschematic_tool
    VOX=solid ./node_modules/.bin/ts-node --transpile-only -r ./tools/ots_hook.js \
      ./tools/run-ots-frame.ts \
      --input-dir  /workspace/mc-voxel-video/frames_glb \
      --output-dir /workspace/mc-voxel-video/frames_ots \
      --size 150 \
      --exporter litematic

参数：
- VOX=solid  **必须加！** 见下方已知问题。
- --size  体素网格分辨率，决定人物多高。80 约矮，150 约 100+ 格高（用户要的 100多格）。越大方块越多、litematic 越大。
- --exporter litematic  导出 litematic（网页播放器读的格式）。
- 调色板：res/palettes/colourful（80 种哑光方块：羊毛/混凝土/陶瓦/釉面砖），不用金属/发光块（否则皮肤会映射到铜/菌丝光，很怪）。

内部流程：glTF 导入 -> bvh-ray/solid 体素化 -> BlockMesh.createFromVoxelMesh -> litematic 导出。
GLB 自带的 baseColor 贴图让 ObjToSchematic 按真实表面颜色分配方块。

输出：frames_ots/frame_0000N.litematic（每帧一个）。

> 注意：/workspace/objtoschematic_tool 当前是空目录。
> 需要重新 git clone https://github.com/LucasDower/ObjToSchematic 到这里，
> 再放回我们自己的 tools/run-ots-frame.ts + tools/ots_hook.js，
> 并加上 SolidVoxeliser（见下）。否则 STAGE 2 跑不起来。

---

## 5. STAGE 3 —— litematic 到 网页数据

脚本：player/build.mjs
数据：player/data/frames.json + 贴图 player/assets/block-textures/*.png

    cd /workspace/mc-voxel-video/player
    node build.mjs
    # 起本地服务（端口任意，下面用 8123 举例）
    python3 -m http.server 8123 --bind 0.0.0.0

- build.mjs 内含从零写的 NBT 读取 + Litematica 位解包（修复了 long 边界跨越）。
- 它会从 ref-viewers/mcblock/bundle.zip 解包出 5196 个方块面贴图到 player/assets/block-textures/。
- 缺 ~11 个贴图（fletching_table / lodestone 等）时 main.js 会优雅降级，不影响播放。

预览地址规律：本地端口 X -> https://<会话前缀>-X.cnb.run/player/index.html。

---

## 6. 网页播放器

- player/index.html + player/main.js + player/vendor/（THREE.js）
- 每个方块变体一个 InstancedMesh，24fps 切帧。
- 顶部可切换动作 / 暂停 / 原始镜头 VMD（镜头 .vmd 走相机动画）。

---

## 7. 已知问题：电视雪花 / 马赛克（你那段视频就是它）

现象：人物不像人，而是一团密集闪烁的彩色噪点，像电视无信号雪花。

**根因**：ObjToSchematic 默认的表面（surface）体素器（bvh-ray / ncrb / ray 等）对每条射线在
每一个与三角形的交点都落一个 voxel。舞蹈姿势里手臂穿过身体、身体折叠时，一条射线会打到很多层表面，
于是每一帧被撒上大量内部切片 -> 一团散云，而不是一个连贯的人。Pose 恰好不自交的那一帧（如第 19 帧）看着还行，
其余 ~29 帧全散了。

**修复**：用我们加的 SolidVoxeliser（注册名 solid）—— 沿 x/y/z 投射线，按交点深度排序，
在每对 进/出 之间填充（even-odd 奇偶），再取三轴填充的并集，得到任意姿势下一个实心物体。
表面颜色在入口命中处按 UV 采样，所以调色板映射、抖动、litematic 导出全部复用，无需改别的。

**所以 STAGE 2 必须带 VOX=solid**（见第 4 节命令）。不带它就会得到你视频里那种雪花结果。

下面就是你那段录屏（已裁掉前 5 秒）的效果——这是错误示范，用来对照：

![体素化雪花/马赛克错误示范（未使用 VOX=solid）](voxel_snow_demo.gif)

正确运行（VOX=solid）后，每帧应是约 90 万方块、70+ 方块类型、能认出的人形舞者。

---

## 8. 详细路径速查表

| 阶段 | 文件/目录 | 绝对路径 |
|------|-----------|----------|
| 模型 | 提弗洛斯.pmx | /workspace/mc-voxel-video/assets/提弗洛斯.pmx |
| 动作(tda) | .vmd | /workspace/mc-voxel-video/assets/daybyday适用tda等通用版本.vmd |
| 动作(yyb) | .vmd | /workspace/mc-voxel-video/assets/daybyday适用yyb版.vmd |
| 镜头 | 镜头.vmd | /workspace/mc-voxel-video/assets/镜头.vmd |
| 贴图 | 模型贴图 | /workspace/mc-voxel-video/assets/textures/T_actor_typhoea_* |
| STAGE1 脚本 | sample_mmd.py | /workspace/mc-voxel-video/pipeline/sample_mmd.py |
| STAGE1 输出 | GLB 帧 | /workspace/mc-voxel-video/frames_glb/frame_000NN.glb + manifest.json |
| Blender | 可执行 | /workspace/mc-voxel-video/tools/blender -> tools/blender-4.2.3-linux-x64/blender |
| mmd_tools 源码 | — | /workspace/mc-voxel-video/tools/mmdtools_src |
| STAGE2 工具 | ObjToSchematic | /workspace/objtoschematic_tool/（当前为空，需重新 clone + 放回驱动脚本） |
| STAGE2 驱动 | run-ots-frame.ts / ots_hook.js | /workspace/objtoschematic_tool/tools/ |
| STAGE2 调色板 | colourful | /workspace/objtoschematic_tool/res/palettes/colourful |
| STAGE2 输出 | litematic | /workspace/mc-voxel-video/frames_ots/frame_0000N.litematic |
| STAGE3 脚本 | build.mjs | /workspace/mc-voxel-video/player/build.mjs |
| 网页数据 | frames.json | /workspace/mc-voxel-video/player/data/frames.json |
| 方块贴图 | PNG | /workspace/mc-voxel-video/player/assets/block-textures/*.png |
| 网页播放器 | index.html | /workspace/mc-voxel-video/player/index.html |
| 参考查看器 | shulkr/mcblock 镜像 | /workspace/mc-voxel-video/ref-viewers/mcblock/bundle.zip |
| 本文档 | USAGE | /workspace/mc-voxel-video/docs/USAGE.md |

---

## 9. 想换模型 / 换动作时

1. 把新 .pmx 丢进 assets/（保留原名或用 CJK 文件名都行，命令里加引号）。
2. 把新 .vmd 丢进 assets/。
3. STAGE 1 的 --pmx / --vmd 换成新文件，重跑 STAGE 1 -> 2 -> 3 即可。
   体素化、网页播放逻辑完全不用改。
