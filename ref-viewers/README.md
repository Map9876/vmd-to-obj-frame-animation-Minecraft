# 参考查看器源码目录（本地副本）

把两个游戏级画风的网页端 MC 查看器扒到本地作参考与复用。不往真实 MC 写方块，直接在网页里以 24fps 动画查看我们 30 帧 litematic。

## 目录
- shulkr/        shulkr.com 完整静态镜像（Vite SPA）：index.html + assets/（171 chunk + 4.1MB convert.worker.js）。渲染方式为服务端渲染（cdn.shulkr.com 预渲染等距图），本地离线复用困难。
- mcblock/       mcblock.top Next.js 静态 chunks（_next/static/）。关键资源包 bundle.zip 已下载到此目录：mcblock 客户端 three.js 查看器的完整方块纹理+模型+图集（13MB，5196 张面纹理 + manifest/block-models/states 等）。这是推荐复用的对象（自包含、版本钉死、100% 覆盖标准方块）。
- blackrobe-src/ 从 GitHub 克隆的 blackrobe/litematic-viewer 源码。按用户要求完全排除、不参考（效果差、部分方块显示不出=资源不全）。

## 关键事实（详见 docs/reference-viewers-analysis.md）
- mcblock 运行时资源包地址：https://mcblock.top/uploads/buildings/blockID/releases/java-26.3-mcblock-v1.3/bundle.zip
- 我们的 ~50 种方块（wool/glazed_terracotta/concrete_powder/amethyst/prismarine/diamond emerald copper block/coral/purpur）全在标准集合内，bundle 已覆盖。
- 无需下载整个离线游戏包；复用 bundle.zip 即可（或长期从 bmclapi/Mojang 只拉 block 子集）。

## 线上站
- https://www.shulkr.com/zh/schematics/zASw919KD2Ov/tree-farm-for-create
- https://mcblock.top/buildings/5ee2396d-6639-4b26-a085-f6e37eb399a6
