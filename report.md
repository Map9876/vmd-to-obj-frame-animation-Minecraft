# mc-voxel-video — 完整项目报告（AI → AI 交替交接）

> 本报告整合 `HANDOFF.md` / `STATUS.md` / `DESIGN.md` / `README.md` / `docs/*` 的全部技术要点、
> 已落盘产物、参考文献（ref）与**用户原始诉求（原话写入，见 §8）**，供下一个接手工件的 AI 直接续干。

---

## 0. 项目一句话目标

把一段 MMD 舞蹈模型（`.pmx` + `.vmd`）采样成逐帧姿态网格 → 用 **LucasDower/ObjToSchematic** 把
每一帧体素化成「真·Minecraft 方块」（带正确颜色→方块映射，不是单色盒子）→ 打包成 `.litematic`
序列 → 在**纯前端网页查看器**里以 30fps 播放这段舞蹈动画。

- **不往真实 MC 里写方块**；交付物是一个能播放舞蹈的网页（复用 shulkr/mcblock 风格的游戏级渲染）。
- 关键素材（CJK 文件名，勿改名）：
  - `assets/提弗洛斯.pmx` —— MMD 角色模型（《明日方舟：终末地》提弗洛斯）
  - `assets/daybyday适用tda等通用版本.vmd` —— 舞蹈动作

---

## 1. 完整管线（正确、已端到端跑通的路径）

```
MMD(.pmx+.vmd)
  └─[STAGE 1: Blender 烘焙每帧 posed GLB]──> frames_glb/*.glb
        └─[STAGE 2: ObjToSchematic 体素化+选块]──> frames_ots/*.litematic
              └─[STAGE 3: build.mjs 解码 NBT+Litematica 位解包]──> player/data/frames.json + 方块贴图
                    └─[STAGE 3: THREE.js InstancedMesh 逐帧切换]──> 网页 30fps 动画
```

### STAGE 1 — MMD → 烘焙姿态 GLB  `pipeline/sample_mmd.py`
- 关键算子：`bpy.ops.mmd_tools.import_vmd`；`bpy.ops.export_scene.gltf`
  （`export_format=GLB`, `export_image_format=AUTO`，保留内嵌贴图）。
- **根因修复**：931 个网格里 929 个是 rigidbody 代理，只有 1 个 `提弗洛ス_mesh`（1184 顶点组 + ARMATURE 修改器）
  是真实角色网格。每帧：复制 body → 清 shape keys → `modifier_apply('Armature')` 把当前姿态**烤成静态顶点**
  → 仅导出该副本（否则 glTF 导出器抓不到骨架形变，全帧静止）。
- **修复抖动（鬼畜抽搐根因）**：改用 `start=20`、VMD 源 30fps 的**连续抽帧**（之前是 ~20 帧间隔 spread 抽样），
  并用 **Center 骨骼锚定**，消除逐帧 bbox 抖动。
- 当前 `frames_glb/`：60 帧连续抽帧 GLB（已验证 md5 逐帧不同 = 姿态正确）。

### STAGE 2 — GLB → MC 方块蓝图  `/workspace/objtoschematic_tool`
- 驱动 `tools/run-ots-frame.ts`（自写，进程内 `WorkerClient` 单例）：
  `ImporterFactor.GetImporter('gltf') → VoxeliserFactory.GetVoxeliser(VOX) → BlockMesh.createFromVoxelMesh → ExporterFactory.GetExporter('litematic')`。
- 头部补丁 `tools/ots_hook.js`：Node 无头桩（`.png/.jpg/.atlas/.fs/.vs/.glsl`），
  并注入 `globalThis._parseImageNode = require('@loaders.gl/polyfills/.../parse-image.node.js').parseImageNode`
  （否则 GLB 内嵌贴图解码崩）。需要 `@loaders.gl/polyfills@3.3.1 --legacy-peer-deps` + get-pixels/pngjs/jpeg-js。
- GLB 内嵌 `baseColorTexture` → ObjToSchematic 按**真实表面颜色**选块。
- 体素器开关（env `VOX`）：`solid`（even-odd 实体）/ `distance`（参数无关 SDF 表面，默认）/ 等。
- 抖动开关（env `DITHER`）：默认 `off`；`ordered`（magnitude 32）为一致的 ordered 基线。
- 调色板：`PALETTE_COLOURFUL`（80 种哑光方块：wool/concrete/terracotta/glazed），**已弃用**
  `PALETTE_ALL_RELEASE`（309 种含金属/发光块，会把肤色映射到 copper/shroomlight 显得怪）。

### STAGE 3 — litematic → 网页查看器  `player/`
- `build.mjs`：从零实现的 **NBT 读取器 + Litematica 位解包器**（含 64-bit Long 边界跨越修复
  `l |= longs[o+1] << (64-s)`，否则解码数差 120）。解码轴序必须是 **XZY**
  （`x=e%sx; z=floor(e/sx)%sz; y=floor(e/(sx*sz))`），早期误用 XYZ 导致“脑切片/散云”伪影。
- `main.js`：每种方块 variant 一个 `InstancedMesh`，按 30fps 切换帧；对 ~11 种缺贴图（fletching_table/lodestone/…）
  做 FALLBACK 兜底不崩。播放间隔 `1000/(30*speed)`，与 VMD 真实 30fps 时长一致。
- 渲染：THREE.js + 从 `ref-viewers/mcblock/bundle.zip` 抽取的真实 MC 方块面纹理（5196 张，覆盖全部 1.20.x 方块）。
- 本地预览：`cd player && python3 -m http.server 8123 --bind 0.0.0.0` →
  `https://<prefix>-8123.cnb.run/player/index.html`。

---

## 2. 已解决的关键技术问题（不要重复争论）

| # | 问题 | 根因 / 修复 |
|---|------|-------------|
| 1 | Blender 无头起不来 | 缺 X11/GL 库 → `apt-get install libgl1 libice6 libsm6 libxfixes3 libxi6 libxkbcommon0 libxrender1 libxxf86vm1 libglx-mesa0 libxshmfence1` |
| 2 | mmd_tools 破损 | 原是带 typings 的错误版本 → `git clone UuuNyaa/blender_mmd_tools` 覆盖 `addons/mmd_tools`（破损版移 `mmd_tools_broken`） |
| 3 | 30 帧全相同/静止 | 未烤骨架 → STAGE 1 的 `modifier_apply('Armature')` 烘焙修复 |
| 4 | “空心浅蓝盒子” | 那是更早被删的 trimesh 手写体素器产物，非 ObjToSchematic；当前 `frames_ots/` 是真实彩色人物（6464–7210 块/帧，49–56 种方块） |
| 5 | 脑切片/散云（看起来像人形云） | 表面体素器在自交姿态（手臂穿躯干）单射线打中多面沉积多体素；改用 `SolidVoxeliser`（x/y/z 三轴 even-odd 并集）；**真正根因**其实是 build.mjs 把 litematic 的 XZY 误按 XYZ 解码（见上） |
| 6 | 肤色发怪 | `PALETTE_ALL_RELEASE`（金属/发光）→ 换 `PALETTE_COLOURFUL`（哑光） |
| 7 | 贴图全零（ZERO 内嵌贴图） | MMD 材质是 mmd_tools 自定义 shader → glTF 导出 0 贴图；`gltfify_materials()` 清空节点树、重建 Principled+TexImage 并 pack 图片（验证 GLB 内嵌 8 张 diffuse） |
| 8 | build.mjs BigInt 崩溃 | BlockStates 可能是 TAG 11(IntArray) 而非 TAG 12(LongArray) → 解码前用 `BigInt()` 强制转换 |
| 9 | 鬼畜抽搐 | 之前 ~20 帧间隔 spread 抽样 + 无锚定；换连续抽帧(start=20,30fps) + Center 骨骼锚定 |
| 10 | 单面零厚度卡片（裙摆/发片/睫毛） | MMD 建模特性（distance-field shell 把卡片渲成 1 体素薄面 + 穿洞）；非体素 bug，靠 Blender Solidify 或真 SDF（scan-based sign）解决 |

---

## 3. 已落盘的关键产物（均在 `/workspace/mc-voxel-video`，git 仓库，关机不丢）

- `frames_glb/`：60 帧连续抽帧 GLB（`start=20`，VMD 源 30fps）—— 修复“抽搐”的关键，已用 Center 骨骼锚定。
- `frames_ots/` + `frames_ots_ordered/`：各 60 个 litematic（一致的 ordered 基线，互相备份）。
- `player/data/frames.json`：已构建（60 帧，3.56M 方块），player 已改 30fps 与 VMD 真实时长一致。
- `ref_single.png`：Blender(Cycles) 第 40 帧参考图，颜色真实可见。
- `HANDOFF.md`（§14）：完整 resume 命令 + 研究结论。
- `ref-viewers/mcblock/bundle.zip`：13MB 版本钉死资源包（5196 张方块面纹理 + 图集 + 模型/状态 JSON）。
- 备份目录：`frames_ots_bak_solid|shell2|surface|80`、`frames_glb_bak_spread`、`frames_ots_shell`、`frames_ots_test` 等。

---

## 4. 关机前状态与恢复命令（HANDOFF §14）

**当前已验证状态**：frames_glb 60 连续帧（Center 锚定）；frames_ots 已还原为一致的 ordered 基线
（dithering='ordered', magnitude 32），并备份为 frames_ots_ordered；frames.json 基于 ordered 基线
（60 帧，3.56M 块）；player 为 revert 后的非卡顿版本（无 PCFSoftShadowMap / 逐面顶点色 / 地面 ShadowMaterial）。

**关机前主动停掉的“关抖动”重烘**（跑到 11/60 被 kill），避免 frames_ots 留下“11 新 + 49 旧”混合态；已还原有序基线。

**重启后一条命令即可补齐**：
```bash
# 1) DITHER=off 重烘 60 帧（关掉“疮疤”和帧间抖色）
cd /workspace/objtoschematic_tool && VOX=distance DITHER=off \
  ./node_modules/.bin/ts-node --transpile-only -r ./tools/ots_hook.js \
  ./tools/run-ots-frame.ts --input-dir /workspace/mc-voxel-video/frames_glb \
  --output-dir /workspace/mc-voxel-video/frames_ots --size 150
# 2) 重建 player 数据
cd /workspace/mc-voxel-video/player && node build.mjs
# 3) 截图（需 http.server :8123 + playwright/chromium swiftshader）
#    另开 shell: python3 -m http.server 8123  (从 /workspace/mc-voxel-video)
node shot.cjs   # 抓 shots/frame_01|08|15|22|30.png
# 4) A/B 对比：frames_ots_ordered(当前) vs 新 off 运行
```

**参考视频（HANDOFF §14）**：`ref_video.mp4` 是坏的（只有容器头、无媒体数据 mdat，Blender 内部 ffmpeg 没写出）。
可靠做法：改用 **Playwright 录 GLB 序列**（chromium swiftshader 已验证可用）→ 真正的可播放视频。
`pipeline/render_ref_video.py` 用 Blender Cycles CPU 渲染（Workbench 无头崩，Cycles 无需 GL），单帧可用。

---

## 5. 参考文献与资料（Refs，全部列出）

### 5.1 论文（arXiv）
- **Palette Guidance — arXiv 2501.19331（SJTU）**：单一**全局调色板**跨整段序列共享，是消除帧间颜色闪烁的关键。
  已在 obj2 内实质全局化；杠杆是“去掉抖动 + 稳定 颜色→方块 映射”。
- **FRESCO — arXiv 2403.12962**：时序一致性损失（temporal-consistency loss），用于让视频扩散帧间稳定。
  对应我们加 obj2 时序一致性 pass 的思路。
- **0fps（Ben Golus）“稳定取整 / geomorphing”**：稳定取整/地变形技术，用于跨帧一致的体素/量化分配。

### 5.2 图形学 / 引擎技术
- **UE5 TSR（Temporal Super Resolution）**：运动矢量重投影（motion-vector reprojection）+ 历史累积/拒绝
  （keep persistent history buffer, WARP prev frame by motion vectors, accumulate/blend, REJECT where material changed）。
  我们比光流更强：同一 MMD 网格/顶点/UV 跨帧**完全一致**，对应精确 → 可把上一帧体素方块分配重投影到当前姿态，
  仅在身体部位真变处接受新数据。
- **iq（Inigo Quilez）“simple voxel” / distance-to-triangle**：SDF 体素化对非水密动画网格是稳健方法
  （我们的 `distance-voxeliser` 已用 `three-mesh-bvh` 的 `closestPointToPoint` SDF 实现）。

### 5.3 开源工具 / 库
- **LucasDower/ObjToSchematic**（克隆在 `/workspace/objtoschematic_tool`）：TypeScript/Node 体素化器，
  四步 `_import → _voxelise → _assign → _export`，输出 .schematic/.litematica/.schem/.nbt。可脚本化魔改。
- **UuuNyaa/blender_mmd_tools**：可用的 mmd_tools 插件源码（替换破损版）。
- **three-mesh-bvh**：`closestPointToPoint`（无符号距离场），`distance-voxeliser` 的核心。
- **marian42 mesh-to-sdf**：扫描式带符号距离场（解决卡片零厚度问题，把卡片填成实体）。
- **shulkr.com**：服务端预渲染等距 PNG（其“光影”是服务端烘焙的 MC 逐面着色 + AO + 接触阴影，
  **非客户端 three.js**）；`?view=3d` 才是真 three.js WebGL 查看器。
- **mcblock.top**：客户端 three.js + 版本化 `bundle.zip` 资源包（自包含，游戏级画质，最推荐复用）。
- **blackrobe.github.io**：已按用户要求**完全排除**（缺资源覆盖，部分方块显示不出）。
- **wakaru**（pionxzh/wakaru）：无 sourcemap 的离线反编译主力（还原到可读 ESM，变量仍混淆短名）。
- **ai-code-decompile / JSUnpack**（zhongguagua）：仅 UI；真实 AI 反编译引擎在在线站 `https://www.jsunpack.tech/`。
- **Playwright + chromium（swiftshader）**：无头渲染/录视频（已验证可渲染 player、录 GLB 序列）。
- **prismarine-nbt**：NBT/Litematica 解析。

### 5.4 AI / 视频算法（用户提及、待调研落地）
- **RIFE**（实时视频插帧）：IFNet 输出近似中间流（近似光流）→ 与第一帧一起**后向变形 Backward Warping**。
  结构可作为“帧间运动估计 + 变形”参考（见 §8 用户原话）。
- **Real-CUGAN**：基于 GAN 的超分辨率模型（原理可供参考，把我们的数据抽象成自定义协议/向量流）。
- **Depth-Anything / MiDaS**（单目深度估计）、**SiM3R / video-to-3D**（视频→3D 重建）、**4D-Humans / PHALP**
  （姿态）、**OpenPose / MediaPipe**（2D→VMD）、**Motion Diffusion Model(MDM) / DiffM2**（动作生成/补间）。
- **AI 绑定/蒙皮**：AccuRig、Mixamo、RigNet、LEAP、Blender 自动权重。
- **MMD2depth / MMD2UDP**（Unity 程序，加载 PMX+VMD 逐帧渲染，可改造成“导出逐帧 OBJ”）。

---

## 6. 已完成的研究综合（HANDOFF §14，供第 4 步“时序一致性 pass”支撑）

- **闪烁根因**：并非调色板不稳定（obj2 已用单一全局 PALETTE_COLOURFUL），而是
  (a) ordered 抖动在表面滑过网格时在颜色边界翻转方块；
  (b) 薄（单面）MMD 几何上 shell 采样前后面。
- **解决杠杆**（非手调、有论文/引擎支撑）：
  - 去抖动 + 稳定 颜色→方块 映射（Palette Guidance 全局调色板思路）。
  - **TSR 风格时序一致性 pass**：利用“同一 MMD 网格/顶点/UV 跨帧精确对应”，把上一帧方块分配重投影到当前帧，
    仅身体真变处接受新数据（比光流强，FRESCO 时序一致性损失 + 0fps 稳定取整）。
  - SDF 体素（`distance-voxeliser` 已用 three-mesh-bvh SDF）。

---

## 7. 重启后继续的顺序（已写进 HANDOFF）

1. `DITHER=off` 重烘 60 帧 → 关掉“疮疤”和帧间抖色（基线图中躯干就是抖动噪点）。
2. 重建 frames.json + 截图对比。
3. 参考视频：`ref_video.mp4` 坏的（只有容器头、无 mdat）。改用 **Playwright 录 GLB 序列**（chromium swiftshader 已验证）→ 真正可播放视频。
4. 更深层：按 **UE5 TSR「运动矢量重投影 + 历史累积/拒绝」**，利用“同一 MMD 网格/顶点/UV 跨帧完全一致”的精确对应，
   给 obj2 加**时序一致性 pass**（比光流更强），彻底锁死 n/n+1 帧的方块分配。

---

## 8. 用户原始诉求 / 当前核心问题（原话写入，必须传递给下一个 AI）

> 现在效果是有史以来最好的我看到了 ，帧间mc模型稳定 变化小 连起来就是一段舞蹈 无任何位置剧烈变化。当然皮肤没有披好
> 还是不如第一次那个19帧效果好皮肤。。然后就是接下来主要问题就是其前后帧间的像素差异抖动 ，目前每一帧
> 虽然色彩还原，但是比如大腿部他的前后帧的每个像素像素块都会变化，这就像是一个1秒的动作
> 然后人物身上就像是电视无信号的马赛克雪花效果一样不断有像素切换闪瞎眼，完全不具有人物跳舞的可观赏性同时皮肤也没有贴对。。。我觉得我们可以参考
> 类似于视频压缩的帧间相似性？？我只是比喻扩充你的思路， 还有就是大模型的什么估计之类的？以及ai 速度图 depth
> ，前后帧情感语义分析等等。。。。。。。。。。。或许我们这个与生图模型 视频模型 采用扩散与回归有关系，也就是说时空
> 时间尺度上的相似性向量？毕竟视频生成模型他的图片我理解就是有1x1 扩散到2x2 以此类推分辨率 我只是距离 而且他的生成是美观的
> 而且连续符合常理而且流畅的，，其实还有思路就是本身人物模型 只要我们采用第一帧的方块，
> 这样后续所有动作那他其实后续就是完美的同一个外观外貌的 ，但是问题是他是会变化的也就是说他的表面积，会改变 而且他的结构比如膝盖的关节会变
> 他比如五个方块不可能一直是相同的位置关系结构，还有就是扩张 比如说模型改变表面积不断变化 就是类似于一个肚皮
> 他变肥胖肚皮成大，那么这部分假如取第一帧为始终皮肤，那么肚皮怎么算法生成？使用ai模型？思路好像对
> ，但是不应该皮肤不是简单为始终第一帧而是结合更优秀。主要是视觉上也就是摄像头上采样上如何欺骗摄像头其皮肤时间上一致？这是需要考虑通过论文以及
> 大模型embed等等魔改obj2的
> 毕竟原项目没有考虑作为人类的去位于攝像机处观看其视频的影响，我突然感觉这更加像是一个ai视频算法也就是估计ai不是会对背景忽略
> 精细主体这种注意力机制吗 ，虽然我们是前后的一致性考虑的类似于不一样我只是举例 ，比如你说光流法 还有 RIFE的大致结构如下图所示：
> 输入两张相邻帧的图片到IFNet中，输出近似中间流(approximate intermediate flows)(类似光流法)，然后和第一帧的图片一起进行后向变形(Backward
> Warping)，，，以及REAL CUGAN这种超分辨率模型基于生成对抗网络主要是看他的原理可以参考 ，把我们数据抽象成自定义协议数据流或者说ai那些什么向量
> 以及你说的 研究已就位（Palette Guidance 2501.19331 全局调色板、FRESCO 2403.12962 时序一致性、UE5 TSR、0fps 稳定取整、iq SDF
> 体素），足够支撑第 4 步。
> 。。。。。。。。。。现在问题是比如腿部，帧间抖动需要解决，比如他虽然一秒内24帧 可能大部分都是3种方块 但是一直在抖动，当然了
> 运动本来就是在位移抖动的 ，这是我们需要考虑的obj2 没有考虑到的问题 依旧去搜索论文 和github 上述多种，ai 关键词以及图形学网站等等多种宽泛
> 以及垂直调查 就像时空一致性虽然视频和我们无关 但是也可以抽象成那种问题使用他们的方法 研究已就位（Palette Guidance 2501.19331
> 全局调色板、FRESCO 2403.12962 时序一致性、UE5 TSR、0fps 稳定取整、iq SDF 体素），足够支撑第 4 步。

**问题提炼（供 AI 执行）**：
- **核心症状**：frame 间像素块（尤其大腿等肢体）持续抖动，像电视无信号马赛克雪花，闪瞎眼、不可观赏；同时**皮肤没贴对**
  （不如最早 19 帧那个效果好）。
- **运动位移本身必然抖动**，这是 obj2 从未考虑、需要新算法解决的问题。
- **方向性思路（用户给的）**：
  1. 参考视频压缩帧间相似性、大模型估计、depth/速度图、前后帧语义分析。
  2. 扩散/回归式时空相似性向量（视频生成模型 1x1→2x2 扩散，连续流畅美观）。
  3. “第一帧方块锁定”思路：后续帧复用首帧外观，但身体表面积/关节结构会变（如膝、肚皮扩张），需要算法/AI 生成新增皮肤。
  4. **摄像机采样层面“欺骗摄像头”让皮肤时间一致**：用论文 + 大模型 embed 魔改 obj2（原项目没考虑“人站在摄像机处看视频”的影响）。
  5. 借鉴 RIFE（IFNet 近似中间流 + 后向变形 Backward Warping）与 Real-CUGAN（GAN 超分）原理，把数据抽象成自定义协议/向量流。
  6. 继续**广泛 + 垂直**检索论文/GitHub（ai 关键词、图形学站点），时空一致性虽源自视频但可抽象复用。
- **已就位研究**（支撑第 4 步时序一致性 pass）：Palette Guidance 2501.19331（全局调色板）、
  FRESCO 2403.12962（时序一致性）、UE5 TSR（运动矢量重投影+历史累积/拒绝）、0fps 稳定取整、iq SDF 体素。

---

## 9. 环境注意事项（gotchas）

- CJK 文件名：shell 里务必引号精确传参，勿改名 assets。
- Node 用 `ts-node --transpile-only -r ./tools/ots_hook.js`，从 `/workspace/objtoschematic_tool` 内部运行（相对 require 才能解析）。
- 预览 URL：`本地端口 X → https://<session-prefix>-X.cnb.run/`；始终 `--bind 0.0.0.0`。
- 无系统 ffmpeg；Chromium+playwright 在 `/root/.npm/_npx/705bc6b22212b352/node_modules/playwright`。
- Blender：`/workspace/mc-voxel-video/tools/blender-4.2.3-linux-x64/blender`（用绝对路径）。
- `rm -rf` 会触发高危拦截，改用 `mv` 到 trash 目录而不是直接删。
- `build.mjs` 的 `extractBundle()` 用 `unzip` 从 `ref-viewers/mcblock/bundle.zip` 抽贴图。

---

## 10. 验收标准（给用户的）

- 网页以 30fps 播放 60 帧，每帧显示可辨认的人形舞者，哑光 MC 方块色 + 真实贴图。
- 人物高度 ≥ 100 方块（size 150 已满足 ~149-150 格高）。
- **新增（用户当前诉求）**：帧间皮肤/像素稳定（无马赛克雪花闪烁）、皮肤贴对、舞蹈连贯可观赏。
- mcblock 视觉风格（光影/材质清单面板）待加（仅在做完帧后，且研究 shulkr 真 three.js 代码再实现）。

---

*报告生成于 2026-10-29，整合自 HANDOFF.md / STATUS.md / DESIGN.md / README.md / docs/。*
