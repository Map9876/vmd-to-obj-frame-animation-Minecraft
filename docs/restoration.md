# 参考站源码还原记录（wakaru 反编译）

目标：把 shulkr / mcblock 两个参考站的打包产物，用 pionxzh/wakaru 还原成可读源码（用户要求 100% 还原）。

## 0. 硬限制（务必知悉，不是偷懒）
- 两个站都未发布 sourcemap：shulkr / mcblock 的 chunk 里 sourceMappingURL 出现 0 次，无 .map 文件，直接试探 .map URL 全部 404。因此无法恢复原作者的变量名 / TS 类型 / 原始 JSX。wakaru 还原到的是可读的现代 ESM + 拆模块，变量仍是混淆短名（e/t/n）。这是无 sourcemap 的物理极限。
- 后端无法从站点还原：api.shulkr.com、mcblock.top/api 的服务端代码（解析 litematic、存库、鉴权、出图）不发到浏览器，且两站都不是开源的（只有被排除的 blackrobe 是）。不能得到后端源码。
- zhongguagua/ai-code-decompile 仓库只是 JSUnpack 的前端 UI，真正的 AI 反编译引擎在在线站 https://www.jsunpack.tech/ （需在线使用，不在仓库里）。离线还原主力是 wakaru。

## 1. 工具（克隆到 tools/decompilers/）
- wakaru: https://github.com/pionxzh/wakaru  用 @wakaru/cli 1.15.0（npm i wakaru；npx wakaru input.js -o out.js / --unpack -o dir/）
- ai-code-decompile: https://github.com/zhongguagua/ai-code-decompile  仅 UI；引擎在线站 https://www.jsunpack.tech/

## 2. 完整客户端素材抓取（Playwright 深度爬取，落到 ref-viewers/MIRROR/<host>/<path>）
- shulkr: www.shulkr.com + cdn.shulkr.com，约 269 请求（171 chunk + worker + 等距渲染图 + 页面）
- mcblock: mcblock.top + cdn.mcblock.top + 阿里云 OSS，约 478 请求（Next.js chunks + bundle.zip + 封面图）

## 3. 还原产物
- shulkr: ref-viewers/shulkr-unpacked/ （294 文件），含 viewer-stage / viewer-shell / convert.worker / blockStateParser / editor-assets / blocks / registry 等核心模块，已反压缩为可读 ESM。
- mcblock: ref-viewers/mcblock-unpacked/ （886 文件），wakaru 把单个大 bundle 拆成模块；含 THREE / WebGLRenderer / BufferGeometry 的 three.js 渲染器逻辑。

## 4. 关键完整链接
- shulkr 示例页: https://www.shulkr.com/zh/schematics/zASw919KD2Ov/tree-farm-for-create
- shulkr 服务端预渲染等距图（不是源码）: https://cdn.shulkr.com/cdn-cgi/image/width=960,quality=75,format=auto/renders/x8wC0VrUWICz/iso-ne.png
- mcblock 示例页: https://mcblock.top/buildings/5ee2396d-6639-4b26-a085-f6e37eb399a6
- mcblock 方块资源包 bundle.zip（13MB，5196 张面纹理+图集+模型）: https://mcblock.top/uploads/buildings/blockID/releases/java-26.3-mcblock-v1.3/bundle.zip
- wakaru: https://github.com/pionxzh/wakaru
- JSUnpack: https://github.com/zhongguagua/ai-code-decompile （UI）；引擎在线站 https://www.jsunpack.tech/

## 5. 怎么用
- 读 ref-viewers/*-unpacked/ 理解实现（已可读，变量名是混淆短名）。
- 本地渲染我们 30 帧：复用 mcblock 的 three.js 渲染器 + 它自己的 bundle.zip + 我们的 litematic 数据（prismarine-nbt 解析），加一层 24fps 帧切换即可，全程无我们自己的渲染代码，绕开后端的不可还原。
- AI 辅助猜变量含义：把混淆片段贴到 https://www.jsunpack.tech/ 在线分析。

## 6. sourcemap 决定性验证
- 本地所有抓取产物里 sourceMappingURL 出现次数：shulkr assets 0、shulkr MIRROR 0、mcblock MIRROR 0。
- MIRROR 里 .map 文件数量：0。
- 试探 .map URL：https://www.shulkr.com/assets/index-DmN1rqCo.js.map -> 404；https://mcblock.top/_next/static/chunks/main-app-2f2299daa667bdca.js.map -> 404；https://mcblock.top/_next/static/chunks/webpack-28e6ba17f368ac1d.js.map -> 404。
=> 两站都不发 sourcemap，原作者变量名/TS/JSX 不可还原。

## 7. 你列的工具评估
- reverse-sourcemap：不可用（没有 .map 可反）。
- webpack-bundle-analyzer：可用，做 bundle 组成/体积可视化（定位 three.js / 渲染器模块）。
- ast-explorer（https://astexplorer.net/）：可用，单段看还原后代码的 AST 结构。
- wakaru：已用，离线还原主力，把可恢复部分做到极限。
- AI 辅助命名：只能在线站 https://www.jsunpack.tech/ （引擎不在 ai-code-decompile 仓库）。
