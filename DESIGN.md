核对完了，先说 ObjToSchematic 的实情（免得基于错误假设设计）：它是 TypeScript/Node 工具（现在主推网站
  objtoschematic.com，仓库是 1.0 遗留桌面版），内部四步 _import() → _voxelise() → _assign() → _export()，输出 .schematic /
  .litematica / .schem / .nbt。所以它是"网格 → 体素 → 选块 → NBT"的标准体素化器，而且代码就在 app_context.ts
  里、可改可脚本化——这点对你很重要，因为它能被你自己的管线直接调用/魔改，不必手动点网页。

  结论：完全可行，难点不在体素化，在两个地方

  1. 怎么拿到"每一帧的 3D 模型"（你的"动作序列拆成模型序列"）
  2. MC 里怎么高密度播放不卡死

  中间那段（体素化→MC 格式）ObjToSchematic 已经解决了。

  整体架构（关键设计：中立中间格式）

  [源] 角色模型(原神glTF/MMD/PMX) + 动作(UE5 mocap / VMD / glTF动画 / 2D视频+深度)
     │
     ▼ 采样器：按目标FPS把骨架动画烘焙成"逐帧静态网格 OBJ"（高密度帧）
     │
     ▼ 体素化：每帧OBJ → 体素网格（3D数组，每个格子一个block id）
     │   └─ 直接复用 ObjToSchematic 的 _voxelise + _assign
     │
     ▼ ★中立格式：一串"逐帧体素网格"(3D uint数组 + block调色板)
     │     这是整个系统的核心，引擎无关
     │
     ├─→ MC：Fabric/Forge mod 按tick把当前帧体素写进固定区域 → 播放"体素视频"
     ├─→ Blender：体素→mesh，用于雕刻/预览
     ├─→ Unity：VoxelMesh 渲染，做预演/剪辑
     └─→ UE5：StaticMesh/Voxel插件 + Sequencer 播放（UE5 这一端播放质量最高）

  这个中立体素帧格式就是让你"适配 Unity/Blender/UE"变得平凡的关键——所有引擎只写各自的 exporter 读同一份数据。

  两条输入路径（决定难度）

  - 路径 A（稳，推荐先搞）：你已经有带骨骼的模型 + 动作文件。原神模型(glTF) + 舞蹈动作(UE5 mocap/VMD/glTF动画) → 在
  UE5/Blender/Unity 里采样每帧的 posed mesh → OBJ。这一步是骨骼动画的标配，质量高、零歧义。
    - 强协同：我们刚逆向的 MMD2depth/MMD2UDP 本身就是"加载 PMX + VMD → 逐帧渲染"的 Unity 程序。可以把它改造成"导出每帧 posed
  OBJ"而不是渲深度图——你的"动作序列→模型序列"生产者已经 80% 被别人写好了。
  - 路径 B（你提的"深度估计"那条，难）：只有 2D 视频 → 逐帧单目 3D 重建。用 Depth-Anything/MiDaS 出深度图，再做人/物 3D
  重建（如 SiM3R、video-to-3D），得到每帧近似 2.5D 高度场或粗糙网格。"高密度帧"= 高采样 FPS。这条是最弱的一环，建议先用路径 A
  跑通整条链路，再接 B。

  MC 播放（最关键，给你具体方案）

  - 朴素做法（每帧存一个 structure）行不通：几千上万帧 MC 装不下、加载会崩。
  - 正确做法：写一个 Fabric/Forge mod，内存里持有一份"当前帧体素缓冲"（比如 64×128×64 的固定区域），每个 game tick 把该区域的
  block state 设成当前帧的体素，按目标 FPS 推进帧号。本质是一个 Minecraft 体素视频播放器。
  - 前后端：前端=客户端
  mod（播放+渲染），后端=服务端组件流式下发帧数据（这样多人能一起看，也解决"高密度帧"不能全量预载的问题——帧间 delta
  编码是关键：相邻帧体素差异极小，只存变化格子，几十万帧也能压住）。
  - ReplayMod：播放器跑起来后用 ReplayMod 录制，就能产出可回放的"mc 视频"，跟你说的"融合 replay mods"对上。

  UE5 / 原神模型怎么接

  - UE5 作为采样器：UE5 加载骨骼动画 → 用 Sequencer/导出逐帧 posed mesh(OBJ) → 喂给 ObjToSchematic 体素化。UE5 motion
  就是这里的动作源之一。
  - 原神模型：公开 glTF/PMX 角色模型能下到，但对外分发时注意版权/ToS（自己本地玩和发布是两回事，一句提醒）。
  - UE5 作为播放端：如果追求"视频"质感，UE5 这端用 Sequencer 播体素帧其实比 MC 更顺——MC 是你要的"展示载体/梗"，UE5
  是生产+高质量回放。两者不冲突。

  诚实的边界

  - MC 有建筑高度/体积上限 → 体素分辨率要收敛（人一般 64³ 够看）。
  - 肤色/材质保真靠 block 调色板（ObjToSchematic 的 _assign 按颜色选块，羊毛/混凝土类上色）。
  - 路径 B（2D→3D）是真短板，先用 A 验证闭环。
  - 高密度帧（30–60fps）× 几分钟舞蹈 = 上万帧，播放 mod 必须流式 + delta，不能全载。

  下一步我可以搭什么

  我的建议是先打通最短闭环：一个 Python 原型，输入一个 glTF/OBJ + 动画 → 采样 N 帧 OBJ → 调 ObjToSchematic 体素化 →
  产出"中立体素帧序列" + 每帧 .litematic，外加一个能播这个序列的 Fabric mod 骨架。之后再接 UE5/原神模型与深度估计。

  你定方向，回一句即可：
  - (1) 先搭"采样→体素→中立格式"Python 原型（最快见东西）
  - (2) 先写 MC 播放 mod（Fabric + delta 帧缓冲）骨架
  - (3) 先验证"改造 MMD2depth 导出逐帧 OBJ"这条复用路径
  - (4) 先只做架构设计文档/格式规范，不写代码

  我倾向 (1) 起步，因为它产出那份中立格式、后续所有端都围着它转。

落地形态（采纳你的烘焙法）

  1. 前端：模型(原神glTF/MMD) + 动作(UE5 mocap/VMD) → 采样逐帧 OBJ → ObjToSchematic 体素化 →
  中立体素帧序列（这部分和我们之前逆向 MMD2depth 的复用、ObjToSchematic 的 _voxelise/_assign 直接对接，不变）。
  2. 铺世界：把每帧体素模型按网格放到 MC 世界不同位置（一次性静态摆放，不卡）。
  3. 抓帧：一个自动相机沿网格逐帧瞬移 + 截图（或你原话的多相机并行），固定分辨率。
  4. 合成：截图序列 → ffmpeg 压成 mp4 = 一段 MC 风格的 3D 视频。
  5. 可选：想要"真在游戏里给人漫游看"，再用 ReplayMod 录一段。

---

## 补充决策与上下文（用户 2026-10-28 追加）

### 1. 第 5 步 ReplayMod 录制为「必需」而非可选
原因：需要对生成的视频 / 世界视频模型做子弹时间摄影、延时摄影，以及「镜头平滑移动时动作慢放、镜头环绕运镜」——
即模特（角色）可以被放慢速度，同时镜头做环绕 / 轨道运动。因此除「离线烘焙 + 截图合成 mp4」外，仍需 ReplayMod 录一段可漫游 / 运镜的版本。

### 2. 起始素材（用户指定，直接开工）
- 动作文件：/workspace/copy/daybyday动作配布byXII-Ram_by_XII-Ram_329b6312deb631b2136c6481d624b13f.zip
  （命名「动作配布」+ 作者 XII-Ram，疑为 MMD 舞蹈 VMD 动作配布）
- 人物模型：/workspace/copy/【明日方舟：终末地】提弗洛斯_by_茶叶味香皂_c516269d2bf99b69e002c9f99cbcbc91.zip
  （作者 茶叶味香皂，疑为 MMD PMX 角色模型，角色为《明日方舟：终末地》提弗洛斯）
- 待确认：两者骨骼 / 精度（scale）是否一致；VMD 与 PMX 的标准 MMD 骨名是否可直接套用。

### 3. 待解问题：精度不一致 / UE5 与 MMD 怎么适配 / 是否有 AI 模型可精细化绑定(rig)与 k 帧(keyframe)
- MMD→MMD（PMX + VMD）：只要模型遵循标准 MMD 骨名，VMD 通常可直接套用；scale 差异用 MMD / 导入器归一化或在采样阶段统一体素网格尺寸解决。
- UE5 / 其它骨架适配：用 UE5 IK Retargeter、Blender「MMD Tools」+ 手动骨映射、或 Mixamo 做跨骨架重定向。
- AI 精细化绑定（rigging / skinning）：AccuRig、Mixamo、RigNet、LEAP、Blender 自动权重；MMD 模型本身已绑定，主要需求在跨格式。
- AI k 帧 / 动作生成与插值：Motion Diffusion Model(MDM)、视频→VMD（OpenPose / MediaPipe / 4D-Humans / PHALP 提姿态再重定向到 MMD）、motion in-betweening（AI 补间 / DiffM2）等。
