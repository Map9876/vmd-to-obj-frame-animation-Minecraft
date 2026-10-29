本文件记录对两个「网页端 Minecraft 方块画风查看器」的完整扒取、Playwright 运行时分析与复刻方案。
目标：在网页里以 24fps 动画查看我们 30 帧 litematic 序列，要求游戏原画风 + 光影，
且**不往真实 MC 里写方块**、**尽量复用现成前端、不自己从零写渲染器**。

================================================================
## 0. 已下载的源码目录（mc-voxel-video/ref-viewers/）
================================================================
- shulkr/             : shulkr.com 的完整静态镜像（Vite SPA，index.html + assets/ 下 171 个 chunk +
                      4.1MB 的 convert.worker.js）。可作离线参考与静态分析。
- mcblock/            : mcblock.top 的 Next.js 静态 chunks（_next/static/）+ 已下载的关键资源包
                      bundle.zip（见第 4 节）。
- blackrobe-src/      : 从 GitHub 克隆的 blackrobe/litematic-viewer 源码。**按用户要求完全排除、不参考**
                      （仅保留作为「反面教材」，见第 5 节根因）。

Playwright 抓包产物在 mc-voxel-video/analysis/：
  net_shulkr.json / net_mcblock.json（全部网络请求）
  net_shulkr3d.json（强制 ?view=3d 后的图片/纹理请求）
  shulkr.png / mcblock.png / shulkr_3d.png（截图）

================================================================
## 1. shulkr.com  —— 服务端渲染托管站（不易本地复用）
================================================================
技术栈：TanStack Start（React/SSR）+ Vite，多 chunk；客户端用 convert.worker.js 解析
litematic / blockstates（其中 minecraft 注册表字符串出现 19469 次，4.1MB 主要是方块数据）。

渲染方式（关键）：**服务端渲染**。即使访问 ?view=3d，浏览器网络里也只有：
  https://cdn.shulkr.com/cdn-cgi/image/width=.../renders/<id>/iso-ne.png 等
即服务端用真实 MC 资源预渲染好的等距图（走 Cloudflare 图片 CDN 做缩放/格式转换）。
客户端**不拉取任何方块纹理**，也没有本地图集。

数据接口：
  https://api.shulkr.com/schematics/<id>/view      （返回方块数据）
  https://api.shulkr.com/schematics/<id>/stats|comments

结论：shulkr 本质是「litematic 托管/分享站」，渲染在它后端。
- 适合：上传文件 → 看成品等距图。
- 不适合：本地离线逐帧 24fps 动画（缺本地渲染器与纹理，强依赖其后端+渲染服务）。

================================================================
## 2. mcblock.top  —— 客户端 three.js + 版本化资源包（★推荐复用）
================================================================
技术栈：Next.js（SSR 壳）+ **客户端 three.js WebGL 查看器**。
Playwright 实测：页面含 <canvas> 767×676，WebGL 可用，three 打包未暴露全局。

渲染方式（关键）：**客户端 three.js + 运行时拉取的版本化资源包**。
运行时从以下地址下载 13MB 资源包：
  https://mcblock.top/uploads/buildings/blockID/releases/java-26.3-mcblock-v1.3/bundle.zip

数据接口：
  https://mcblock.top/api/buildings/<id>            （返回该建筑的方块数据 JSON）
  https://mcblock.top/api/buildings                 （POST 上传/创建）
  https://mcblock.top/api/settings/renderer-config （渲染配置）

----------------------------------------------------------------
### bundle.zip 解剖（= mcblock 游戏级画质的全部来源）
----------------------------------------------------------------
13MB，内含：
- block-textures/*.png × 5196       全部方块「面」纹理（16×16），覆盖标准 1.20.x 所有方块。
- manifest.json (965KB)             图集描述：atlas 尺寸 2048×4096；
                                     compatibleTextures[] 把每个纹理 id 映射到图集内 rect
                                     （sourceTexture + sourceRect），即已把所有 PNG 打包成单张图集。
- mcmeta/block-models.json (1.07MB)      方块几何模型
- mcmeta/block-states.json (153KB)       方块状态
- mcmeta/block-definitions.json (106KB)  方块定义
- mcmeta/render-patches.json (502KB)     渲染补丁
- mcmeta/atlas-uv.json (129KB)           图集 UV
- mcmeta/animation-metadata.json         动画纹理元数据
- mcmeta/block-default-properties.json / legacy-default-properties.json
- block-face-textures.json (103KB)        block state → 面纹理 映射
- minecraft_blocks_database.json (735KB) 方块数据库

=> 这是一个**自包含、按版本钉死、完整的 MC 方块 几何+纹理+状态** 包。
mcblock 客户端加载它 + 建筑的方块数据，用 three.js 拼出游戏级画质。

结论：mcblock 查看器完全自包含（纹理内置于 bundle.zip），是三者中最适合本地复用的。
我们只需：抽出它的 three.js 渲染器 + 复用这份 bundle.zip + 喂入我们的 litematic 帧数据。

================================================================
## 3. blackrobe.github.io（已排除，仅记录根因）
================================================================
开源 GitHub Pages 项目（已克隆到 blackrobe-src/）。
用户明确：「效果不好，完全不要参考」。
其「部分方块显示不出」的根因：**资源覆盖不全**（缺少部分方块纹理/模型）。
这恰好反证了「必须用完整资源包」——而 mcblock 的 bundle.zip 是完整的。

================================================================
## 4. 贴图从哪来？是否需要下载整个离线游戏包？（回答用户提问）
================================================================
结论先行：**不需要下载整个离线游戏完整包。**

- shulkr：纹理在它服务端，前端不管理。
- mcblock：用一份 13MB、版本钉死的 bundle.zip 提供**全部**方块纹理+模型+图集，
  覆盖标准 1.20.x 所有方块。我们的 ~50 种方块（wool / glazed_terracotta /
  concrete_powder / amethyst / prismarine / diamond·emerald·copper block / coral / purpur …）
  全在标准集合内，必然被覆盖。
- 因此：**直接复用 mcblock 的 bundle.zip 即可，零额外下载、100% 覆盖**。

备选/长期方案（若想自主或跟随新版本）：
  从 bmclapi（国内镜像）或 Mojang 官方只拉取
  assets/minecraft/textures/block（+ models/block）子集，无需整包游戏。
  bmclapi 地址举例：https://bmclapi2.bangbang93.com （提供版本 JSON 与 assets 镜像）。
  但短期用 mcblock 现成 bundle 已足够。

blackrobe 的显示缺失 = 没用完整资源包 → 用 mcblock bundle 可彻底规避。

================================================================
## 5. 复刻/落地路径（把 30 帧当 24fps 动画在网页播放）
================================================================
1. 取 mcblock 的客户端 three.js 查看器代码（mcblock 前端 _next chunk 中含渲染器）+
   已下载的 bundle.zip（ref-viewers/mcblock/bundle.zip）。
2. 用我们已有的 prismarine-nbt 解析 30 个 litematic（或合并后的单文件），
   得到每帧的「方块列表」（block state + 坐标）。解析逻辑可复用 mcblock 的前端解析或自写（NBT 已验证）。
3. 写一层**极薄**加载层（不是从零写渲染器）：把每帧方块数据喂给 mcblock 渲染器的
   「加载结构」接口，按 24fps 切换当前帧 → 网页里播放舞蹈动画。
4. 轨道相机/光影：mcblock 渲染器自带光照与 AO，接近游戏画风；可在其之上加自动旋转/运镜。
5. 可选：把 bundle.zip 换成 bmclapi 官方资源以跟随新 MC 版本。

================================================================
## 6. 下一步
================================================================
- 从 mcblock 前端 chunk 中定位 three.js 查看器组件与其 loadStructure / 渲染入口（导出接口）。
- 编写本地播放页：复用该渲染器 + bundle.zip + 我们的帧数据，实现 24fps 帧切换。
- 验证 30 帧（约 715,890 方块总量）在浏览器里的播放流畅度与显存占用。
