import { jsx } from "./module-86897.js";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "./module-61426.js";
import { Y } from "./module-33531.js";
import { sendGAEvent } from "./module-76784.js";
import _o from "./module-52619.js";
import { N } from "./module-26497.js";
import h from "./module-1733.js";
import { c } from "./module-35297.js";
import * as p from "./module-15239.js";
import * as b from "./module-24953_2.js";
import { A as A_1 } from "./module-79350_2.js";
import { O } from "./module-10241.js";
import { A as A_2 } from "./module-54877.js";
import { A as A_3 } from "./module-2186.js";
import * as A from "./module-54846.js";
import * as C from "./module-71442.js";
import { E } from "./module-26260.js";
import * as _ from "./module-43512.js";
import { g as g_1 } from "./module-53301.js";
import { E2, XV } from "./module-17364.js";
import { gG, gU } from "./module-99350.js";
import { A as A_4 } from "./module-22868.js";
import { DN } from "./module-75377_2.js";
import { N9 } from "./module-23397.js";
import { Mh, Wx } from "./module-67261_2.js";
import { A as A_5 } from "./module-44748_4.js";
import { A as A_6 } from "./module-20054.js";
import { A as A_7 } from "./module-81235.js";
import { A as A_8 } from "./module-84682.js";
import { A as A_9 } from "./module-76850.js";
import { A as A_10 } from "./module-91247.js";
import { A as A_11 } from "./module-22238.js";
import { A as A_12 } from "./module-30885_2.js";
import { A as A_13 } from "./module-67305.js";
import { A as A_14 } from "./module-54025.js";
import { A as A_15 } from "./module-14239.js";
import { A as A_16 } from "./module-85526.js";
import { A as A_17 } from "./module-89710_2.js";
import { A as A_18 } from "./module-33186_2.js";
import { A as A_19 } from "./module-4996.js";
import { A as A_20 } from "./module-83818_2.js";
import { A as A_21 } from "./module-47522_2.js";
import { qs } from "./module-12319.js";
import { cl } from "./module-88012.js";
import { bg } from "./module-87875.js";
const i = require(20063);
const d = require(67909);
const v = require(15532);
const g = require(95585);
function FComponent({ images, buildingName }) {
    let [n, setN] = useState(0);
    let [i, setI] = useState(new Set);
    let c = useCallback((e)=>{
        setI((t)=>new Set(t).add(e));
    }, []);
    let d = useCallback(()=>{
        setN((e)=>(e + 1) % images.length);
    }, [
        images.length
    ]);
    let u = useCallback(()=>{
        setN((e)=>(e - 1 + images.length) % images.length);
    }, [
        images.length
    ]);
    if (images.length === 0) {
        return <div className="w-full h-full flex items-center justify-center bg-bg-card"><b.p type="noData" title="暂无预览图" description="该建筑没有投影文件和预览图片" iconEmoji="🧱"/></div>;
    }
    let h = images[n];
    let m = i.has(h);
    return <div className="w-full h-full flex flex-col bg-black"><div className="flex-1 relative">{m ? <div className="w-full h-full flex items-center justify-center"><div className="text-center"><A_1 size={16} className="text-6xl text-white/20 mb-3 block"/><p className="text-white/40 font-bold">图片加载失败</p></div></div> : <p.default src={h} alt={`${buildingName} - 图片${n + 1}`} fill className="object-contain" priority onError={()=>c(h)}/>}{images.length > 1 && <><button onClick={u} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"><v.A size={16}/></button><button onClick={d} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"><g.A size={16}/></button></>}{images.length > 1 && <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full font-bold">{n + 1} / {images.length}</div>}</div>{images.length > 1 && <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide bg-black/20">{images.map((e, t)=><button key={t} onClick={()=>setN(t)} className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all duration-fast ${n === t ? "border-brand-cta opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}>{i.has(e) ? <div className="w-full h-full bg-white/10 flex items-center justify-center"><A_1 size={12} className="text-white/30"/></div> : <p.default src={e} alt={`缩略图 ${t + 1}`} fill className="object-cover" onError={()=>c(e)}/>}</button>)}</div>}</div>;
}
function Y1Component() {
    return <div className="min-h-screen bg-bg-primary"><div className="wrap pt-4 md:pt-7 pb-6 md:pb-16"><div className="h-4 w-28 sk-blk mb-5"/><div className="grid grid-cols-1 lg:grid-cols-[1fr_372px] gap-[22px] items-start"><div className="bg-bg-card border-2 border-border-hard shadow-block overflow-hidden"><div className="relative min-h-[340px] sm:min-h-[360px] lg:min-h-[calc(100vh-12rem)] bg-bg-inset flex items-center justify-center"><div className="absolute top-3 left-3 flex border-2 border-border-hard overflow-hidden"><div className="w-20 h-[38px] bg-bg-card"/><div className="w-20 h-[38px] bg-bg-card border-l-2 border-border-hard"/></div><div className="absolute top-3 right-3 flex flex-col gap-2">{Array.from({
        length: 4
    }).map((e, t)=><div key={t} className="w-[38px] h-[38px] bg-bg-card border-2 border-border-hard"/>)}</div><div className="flex flex-col items-center gap-4"><div className="w-12 h-12 sk-deep border-2 border-border-hard"/><div className="space-y-2 flex flex-col items-center"><div className="h-4 w-28 sk-deep"/><div className="h-3 w-36 sk-deep"/></div></div></div></div><div className="bg-bg-card border-2 border-border-hard shadow-block p-[22px] flex flex-col gap-4"><div className="h-3 w-20 sk-blk"/><div className="h-7 w-48 sk-blk"/><div className="flex items-center gap-2.5 mt-1"><div className="w-[30px] h-[30px] sk-blk border-2 border-border-hard"/><div className="h-4 w-36 sk-blk"/></div><div className="flex gap-2 mt-1"><div className="h-7 w-20 sk-blk border-2 border-border-hard"/><div className="h-7 w-20 sk-blk border-2 border-border-hard"/><div className="h-7 w-24 sk-blk border-2 border-border-hard"/></div><div className="grid grid-cols-2 gap-[2px] border-2 border-border-hard bg-border-hard mt-2">{Array.from({
        length: 4
    }).map((e, t)=><div key={t} className="bg-bg-inset p-[14px]"><div className="h-6 w-12 sk-deep"/><div className="h-3 w-16 sk-deep mt-2"/></div>)}</div><div className="h-12 w-full sk-blk border-2 border-border-hard mt-2"/><div className="grid grid-cols-2 gap-2.5"><div className="h-11 sk-blk border-2 border-border-hard"/><div className="h-11 sk-blk border-2 border-border-hard"/></div><div className="h-11 w-full sk-blk border-2 border-border-hard"/><div className="flex flex-col gap-3 mt-2 pt-4 border-t-2 border-bg-inset">{Array.from({
        length: 4
    }).map((e, t)=><div key={t} className="flex justify-between"><div className="h-3.5 w-20 sk-blk"/><div className="h-3.5 w-24 sk-deep"/></div>)}</div></div></div><div className="mt-10 border-b-2 border-border-hard flex gap-0"><div className="h-12 w-24 sk-blk"/><div className="h-12 w-28 sk-deep"/></div><div className="mt-6 space-y-4"><div className="h-4 w-full sk-blk"/><div className="h-4 w-5/6 sk-blk"/><div className="h-4 w-4/6 sk-deep"/></div></div></div>;
}
let w = "building-viewer-coach-v1";
function SComponent({ ready, coarsePointer, dismissSignal, onVisibleChange }) {
    let [i, setI] = useState(false);
    let [c, setC] = useState(false);
    let uRef = useRef(false);
    let hRef = useRef(onVisibleChange);
    function m() {
        if (!uRef.current) {
            uRef.current = true;
            try {
                localStorage.setItem(w, "1");
            } catch (e) {}
            setC(false);
            hRef.current?.(false);
            setTimeout(()=>setI(false), 300);
        }
    }
    hRef.current = onVisibleChange;
    useEffect(()=>{
        if (!ready || uRef.current) {
            return;
        }
        try {
            if (localStorage.getItem(w)) {
                uRef.current = true;
                return;
            }
        } catch (e) {
            uRef.current = true;
            return;
        }
        let e = setTimeout(()=>{
            setI(true);
            setC(true);
            hRef.current?.(true);
        }, 600);
        return ()=>clearTimeout(e);
    }, [
        ready
    ]);
    useEffect(()=>{
        if (!c) {
            return;
        }
        let e = setTimeout(()=>m(), 6000);
        return ()=>clearTimeout(e);
    }, [
        c
    ]);
    useEffect(()=>{
        if (dismissSignal > 0 && c) {
            m();
        }
    }, [
        dismissSignal
    ]);
    useEffect(()=>{
        if (!ready && c) {
            m();
        }
    }, [
        ready
    ]);
    if (i) {
        return <div className={`bd-coach ${c ? "" : "is-hiding"}`} role="status"><span className="bd-coach-ic" aria-hidden="true"><A_2 size={16}/></span><span className="bd-coach-copy">{coarsePointer ? "单指拖动可以转动它，双指缩放" : "按住左键拖动可以转动它，滚轮缩放"}</span><button type="button" className="bd-coach-x" onClick={m} aria-label="关闭提示"><A_3 size={14}/></button></div>;
    }
    return null;
}
const M = require(97003);
const I = require(44460);
const R = require(44478);
const L = require(51750);
const H = require(55418);
const X = require(64991);
const $ = require(26545);
const et = require(99099);
const ea = require(30313);
let es = ea.A("outline", "stairs-up", "StairsUp", [
    [
        "path",
        {
            d: "M22 6h-5v5h-5v5h-5v5h-5",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M6 10v-7",
            key: "svg-1"
        }
    ],
    [
        "path",
        {
            d: "M3 6l3 -3l3 3",
            key: "svg-2"
        }
    ]
]);
let eo = ea.A("outline", "circle-dot", "CircleDot", [
    [
        "path",
        {
            d: "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
            key: "svg-1"
        }
    ]
]);
let ec = ea.A("outline", "hash", "Hash", [
    [
        "path",
        {
            d: "M5 9l14 0",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M5 15l14 0",
            key: "svg-1"
        }
    ],
    [
        "path",
        {
            d: "M11 4l-4 16",
            key: "svg-2"
        }
    ],
    [
        "path",
        {
            d: "M17 4l-4 16",
            key: "svg-3"
        }
    ]
]);
const ed = require(68595);
let eu = ea.A("outline", "shoe", "Shoe", [
    [
        "path",
        {
            d: "M4 6h5.426a1 1 0 0 1 .863 .496l1.064 1.823a3 3 0 0 0 1.896 1.407l4.677 1.114a4 4 0 0 1 3.074 3.89v2.27a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M14 13l1 -2",
            key: "svg-1"
        }
    ],
    [
        "path",
        {
            d: "M8 18v-1a4 4 0 0 0 -4 -4h-1",
            key: "svg-2"
        }
    ],
    [
        "path",
        {
            d: "M10 12l1.5 -3",
            key: "svg-3"
        }
    ]
]);
let em = ea.A("outline", "flag-check", "FlagCheck", [
    [
        "path",
        {
            d: "M13.767 15.12a4.983 4.983 0 0 1 -1.767 -1.12a5 5 0 0 0 -7 0v-9a5 5 0 0 1 7 0a5 5 0 0 0 7 0v8.5",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M5 21v-7",
            key: "svg-1"
        }
    ],
    [
        "path",
        {
            d: "M15 19l2 2l4 -4",
            key: "svg-2"
        }
    ]
]);
const eb = require(98901);
function EgComponent(e) {
    let o = useId();
    let [d, setD] = useState(0);
    let hRef = useRef([]);
    let mRef = useRef(null);
    let pRef = useRef(false);
    useEffect(()=>{
        if (e.sourceOpenRequest) {
            pRef.current = true;
            setD(1);
        }
    }, [
        e.sourceOpenRequest
    ]);
    useEffect(()=>{
        if (d === 1 && pRef.current && (pRef.current = false, mRef.current)) {
            mRef.current.scrollTop = 0;
            mRef.current.focus({
                preventScroll: true
            });
            mRef.current.scrollIntoView?.({
                block: "nearest"
            });
        }
    }, [
        d,
        e.sourceOpenRequest
    ]);
    let e_source = e.source;
    let x = e_source.status === "verified" || e_source.status === "corrected";
    let v = !!(e.authorName && e.projection?.fileAuthor === e.authorName);
    let g = x ? e_source.status === "corrected" ? "已根据反馈核实并更正署名，原投影文件保持不变。" : e_source.originalUrl ? "已对照原始发布资料核实署名。" : "作者署名已核实，原始发布链接尚待补充。" : v ? "署名来自投影文件，原作者信息尚未核实。" : "当前收录署名尚未完成原始来源核实。";
    let f = [
        e.width,
        e.height,
        e.depth
    ].every((e)=>typeof e === "number" && e > 0) ? `${e.width} × ${e.height} × ${e.depth} 格` : "未能确认";
    let j = cl(e.buildingId);
    let y = (e)=>`${o}-tab-${e}`;
    let k = (e)=>`${o}-panel-${e}`;
    return <section className="bdi-side-card bdi-source-tabs" data-onboarding="material-list-desktop" onKeyDown={(e)=>e.stopPropagation()}><div className="bdi-source-tablist" role="tablist" aria-label="建筑材料与来源">{[
        "材料清单",
        "来源与信息"
    ].map((e, t)=><button key={e} type="button" role="tab" id={y(t)} aria-controls={k(t)} aria-selected={d === t} tabIndex={d === t ? 0 : -1} ref={(e)=>{
            hRef.current[t] = e;
        }} onClick={()=>setD(t)} onKeyDown={(e)=>{
            let a = null;
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                a = 1 - t;
            }
            if (e.key === "Home") {
                a = 0;
            }
            if (e.key === "End") {
                a = 1;
            }
            if (a !== null) {
                e.preventDefault();
                setD(a);
                hRef.current[a]?.focus();
            }
        }}>{e}</button>)}</div><div className="bdi-source-panels"><section className="bdi-source-panel cn4-scroll" role="tabpanel" id={k(0)} aria-labelledby={y(0)} tabIndex={0} hidden={d !== 0}><div className="bdi-section-heading"><span>所需材料</span><button type="button" onClick={e.onOpenMaterials}>共 {e.materials.length} 种</button></div><div className="bdi-material-preview">{e.materials.length === 0 ? <p className="bdi-source-note">材料信息尚未提供，投影加载完成后会自动更新。</p> : e.materials.map((t)=><button key={t.id} type="button" onClick={()=>e.onMaterialClick(t.name.includes(":") ? t.name : `minecraft:${t.name}`)}><span>{t.textureUrl ? <img src={t.textureUrl} alt=""/> : <X.A size={15}/>}</span><b>{t.chineseName || t.name}</b><strong>{t.count.toLocaleString()}</strong></button>)}</div></section><section ref={mRef} className="bdi-source-panel cn4-scroll" role="tabpanel" id={k(1)} aria-labelledby={y(1)} tabIndex={0} hidden={d !== 1}><h2>作品来源</h2><dl className="bdi-source-facts"><dt>署名依据</dt><dd>{g}</dd><dt>原始发布</dt><dd>{e_source.originalUrl ? <a href={e_source.originalUrl} target="_blank" rel="nofollow ugc noopener noreferrer">查看原始发布 ↗</a> : "尚未确认"} <span className={x && e_source.originalUrl ? "is-verified" : ""}>{x && e_source.originalUrl ? "已核实" : "待核实"}</span></dd>{e_source.acquiredUrl && <><dt>文件获取</dt><dd><a href={e_source.acquiredUrl} target="_blank" rel="nofollow ugc noopener noreferrer">查看文件获取来源 ↗</a></dd></>}</dl><p className="bdi-source-note">文件署名可能存在二次转载改名或署名丢失，需要结合原始发布资料核对。</p><p className="bdi-source-note">{e_source.usageNote || "使用范围尚未确认。"} 来源核实不等于所有用途均已获得许可。</p>{e_source.checkedAt && <p className="bdi-source-note">最近核对：{new Date(e_source.checkedAt).toLocaleDateString("zh-CN", {
        timeZone: "Asia/Shanghai"
    })}</p>}<h2 className="bdi-source-subheading">建筑与投影</h2><dl className="bdi-source-facts"><dt>尺寸 W×H×D</dt><dd>{f}</dd><dt>方块总数</dt><dd>{e.totalBlocks.toLocaleString()} 块</dd><dt>层数 / 步骤</dt><dd>{e.layers !== null ? `${e.layers} 层` : "层数未确认"} / {e.steps !== null ? `${e.steps} 步` : "步骤数未提供"}</dd><dt>文件格式</dt><dd>{e.projection?.format ? `.${e.projection.format}` : "未能确认"}</dd><dt>游戏版本</dt><dd>{e.projection?.version ? `Minecraft Java ${e.projection.version}` : "未能确认"}</dd></dl><p className="bdi-source-note">游戏版本来自原文件记录，不代表跨版本兼容。</p>{e.projection?.dataVersion !== null && e.projection?.dataVersion !== undefined && <details><summary>查看文件版本记录</summary><p className="bdi-source-note">DataVersion：{e.projection.dataVersion}{!e.projection.version && "；尚未对应到已确认的正式版本。"}</p></details>}</section></div><div className="bdi-source-footer"><_o href={`/feedback?category=content${j ? `&buildingId=${j}` : ""}`}>署名 / 来源反馈</_o><_o href={j ? `/report?buildingId=${j}&intent=removal` : "/report"}>申请下架</_o></div></section>;
}
const ef = require(42688);
function EjComponent({ title, authorName, authorUrl, source, projection, onShowSource }) {
    let o = !!authorName?.trim();
    let c = source.status === "verified" || source.status === "corrected";
    return <><div className="bdi-title-row"><h1>{title}</h1><span className="bdi-projection-version" title="原投影文件记录的 Minecraft 游戏版本；不代表跨版本兼容。">{projection?.version ? `Java ${projection.version}` : "版本未确认"}</span></div><p className="bdi-source-author"><ef.A name={o ? authorName : null} size={18}/>投影作者 <b style={o ? undefined : {
        color: "var(--color-text-disabled)"
    }}>{o ? authorName : "未知作者"}</b>{!c && <button type="button" className="bdi-author-hint" onClick={onShowSource} onKeyDown={(e)=>e.stopPropagation()} aria-label="署名待确认，查看来源依据">待确认</button>}{authorUrl && <a className="bdi-author-home" href={authorUrl} target="_blank" rel="nofollow ugc noopener noreferrer">主页 →</a>}</p></>;
}
let ek = d.default(()=>import("./module-16910.js").then((e)=>e.ProjectionTeachingViewer), {
    loadableGenerated: {
        webpack: ()=>[
                16910
            ]
    },
    ssr: false,
    loading: ()=><div className="absolute inset-0 z-[5] flex items-center justify-center bg-bg-inset"><div className="flex flex-col items-center gap-4"><L.y size="md"/><div className="flex flex-col items-center gap-1.5"><p className="text-text-primary font-black text-sm">正在加载模型...</p><p className="text-text-disabled font-bold text-xs">方块较多时稍候数秒</p></div></div></div>
});
function eN(totalBlocks) {
    if (totalBlocks >= 10000) {
        return `${(totalBlocks / 10000).toFixed(1)}万`;
    }
    if (totalBlocks >= 1000) {
        return `${(totalBlocks / 1000).toFixed(1)}K`;
    }
    return String(totalBlocks);
}
function ew(tags) {
    if (!tags || typeof tags !== "string") {
        return [];
    }
    let t = tags.trim();
    if (!t) {
        return [];
    }
    let a = [];
    if (t.startsWith("[")) {
        try {
            let e = JSON.parse(t);
            if (Array.isArray(e)) {
                a = e.map((e)=>String(e ?? ""));
            }
        } catch (e) {}
    }
    if (a.length === 0) {
        a = t.split(",");
    }
    return a.map((e)=>e.replace(/^[\s"'\[\]]+|[\s"'\[\]]+$/g, "").trim()).filter(Boolean);
}
function eS(e) {
    let n;
    return {
        id: e.id,
        name: e.name,
        coverImage: e.coverImage,
        difficulty: e.difficulty,
        projectionAuthor: e.projectionAuthor ?? null,
        blockCount: e.blockCount ?? null,
        height: e.height ?? null,
        createdAt: e.createdAt ?? null,
        isFavorited: (n = e.isFavorited) != null && n,
        learnCount: e.learnCount ?? null,
        viewBox: null,
        tintHue: DN(e.id),
        official: Wx(e.tags)
    };
}
function EAComponent({ stepTeaching = null }) {
    let w;
    let eP;
    let ez = i.useParams();
    let eF = i.useRouter();
    let eR = ez.id;
    let [eU, eB] = Y();
    let [eT, setET] = useState({
        count: 0,
        hasGap: false
    });
    let onAutoMeasureChange = useCallback((e)=>{
        setET((t)=>{
            if (t.count === e.count && t.hasGap === e.hasGap) {
                return t;
            }
            return e;
        });
    }, []);
    let [eH, setEH] = useState(null);
    let [eq, setEq] = useState(true);
    let [eV, setEV] = useState(null);
    let [eK, setEK] = useState(null);
    let [e$, setE$] = useState(false);
    let [eZ, setEZ] = useState(false);
    let [dismissSignal, setDismissSignal] = useState(0);
    let [e2, setE2] = useState(false);
    let [e4, setE4] = useState(false);
    let e6 = e2 || e4;
    let [open, setOpen] = useState(false);
    let [resetCameraKey, setResetCameraKey] = useState(0);
    let [tt, setTt] = useState(false);
    let [ts, setTs] = useState(false);
    let [tn, setTn] = useState("view");
    let [ti, setTi] = useState("orbit");
    let [tc, setTc] = useState("isometric");
    let [cameraPresetNonce, setCameraPresetNonce] = useState(0);
    let [focusBlock, setFocusBlock] = useState(null);
    let [tb, setTb] = useState(true);
    let [cameraZoomPercent, setCameraZoomPercent] = useState(100);
    let [cameraPitchDeg, setCameraPitchDeg] = useState(28);
    let [cameraCommandNonce, setCameraCommandNonce] = useState(0);
    let [tN, setTN] = useState(null);
    let [tS, setTS] = useState([]);
    let tC = ts && tn === "measure";
    let [tM, setTM] = useState("about");
    let [tE, setTE] = useState([]);
    let [tP, setTP] = useState(false);
    let [tz, setTz] = useState(0);
    let [tR, setTR] = useState(null);
    let [tB, setTB] = useState(null);
    let [projection, setProjection] = useState(null);
    let [sourceOpenRequest, setSourceOpenRequest] = useState(0);
    let onProjectionInfo = useCallback((e)=>setProjection(e), []);
    let [tG, setTG] = useState(false);
    let [tW, setTW] = useState(false);
    let [tX, setTX] = useState(null);
    let [tY, setTY] = useState(false);
    let [tQ, setTQ] = useState("layer");
    let [t1, setT1] = useState("restart");
    let [t3, setT3] = useState(false);
    let [t5, setT5] = useState(false);
    let t8Ref = useRef(null);
    let t7Ref = useRef(null);
    let t9 = c();
    let { requireLogin, promptLogin } = E();
    let [aa, setAa] = useState(null);
    let ar = useCallback((entity, stepIndex)=>{
        setAa({
            entity,
            stepIndex
        });
        if (t9.state.selectedBlock) {
            t9.actions.handleBlockClick(null);
        }
    }, [
        t9.actions,
        t9.state.selectedBlock
    ]);
    let onPointerMissed = useCallback(()=>setAa(null), []);
    useEffect(()=>{
        if (t9.state.selectedBlock) {
            setAa(null);
        }
    }, [
        t9.state.selectedBlock
    ]);
    useEffect(()=>{
        if (ti === "firstPerson") {
            setAa(null);
        }
    }, [
        ti
    ]);
    let [al, setAl] = useState(0);
    let aoRef = useRef(null);
    let acRef = useRef(false);
    let adRef = useRef(false);
    let auRef = useRef(false);
    let ahRef = useRef(false);
    let amRef = useRef(null);
    let apRef = useRef(null);
    let ab = !!eH?.projectionFileUrl;
    useEffect(()=>{
        if (!tY) {
            return;
        }
        let overflow = document.body.style.overflow;
        let t = (e)=>{
            if (e.key === "Escape") {
                setTY(false);
            }
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", t);
        return ()=>{
            document.body.style.overflow = overflow;
            window.removeEventListener("keydown", t);
        };
    }, [
        tY
    ]);
    useEffect(()=>{
        let materialStats = t9.state.materialStats;
        if (!materialStats || materialStats.length === 0 || !eH) {
            return;
        }
        let t = new Map(eH.materials.map((e)=>[
                e.name.includes(":") ? e.name : `minecraft:${e.name}`,
                e.count
            ]));
        if (t.size === materialStats.length && materialStats.every((e)=>t.get(e.blockId) === e.count)) {
            return;
        }
        let s = [
            "#9C7853",
            "#C5A876",
            "#7F7F7F",
            "#8B4513",
            "#556B2F",
            "#CD853F",
            "#708090",
            "#B22222",
            "#DAA520",
            "#2E8B57",
            "#4682B4",
            "#D2691E"
        ];
        let r = materialStats.map((e, t)=>({
                id: String(t + 1),
                name: e.blockId.replace("minecraft:", ""),
                count: e.count,
                color: s[t % s.length]
            }));
        setEH((e)=>{
            if (e) {
                return {
                    ...e,
                    materials: r
                };
            }
            return e;
        });
        import("./module-95293.js").then(async ({ initBlockTextureMapper, getBlockTexture })=>{
            await initBlockTextureMapper();
            setEH((e)=>{
                if (!e) {
                    return e;
                }
                let t = e.materials.map((e)=>{
                    let t = getBlockTexture(e.name.includes(":") ? e.name : `minecraft:${e.name}`);
                    return {
                        ...e,
                        textureUrl: t.imageFilename !== "Barrier.png" ? t.textureUrl : undefined,
                        chineseName: t.imageFilename !== "Barrier.png" ? t.chineseName : e.name
                    };
                });
                return {
                    ...e,
                    materials: t
                };
            });
        }).catch(()=>{});
    }, [
        t9.state.materialStats,
        eH?.materials.length
    ]);
    let ax = useMemo(()=>{
        if (!eH) {
            return [];
        }
        try {
            let e = eH.images ? JSON.parse(eH.images) : [];
            if (Array.isArray(e)) {
                return e;
            }
            return [];
        } catch (e) {
            return [];
        }
    }, [
        eH
    ]);
    let images = useMemo(()=>{
        if (eH) {
            if (ax.length > 0) {
                return ax;
            }
            if (eH.thumbnailUrl) {
                return [
                    eH.thumbnailUrl
                ];
            }
            return [];
        }
        return [];
    }, [
        eH,
        ax
    ]);
    useEffect(()=>{
        (async ()=>{
            try {
                setEq(true);
                setTB(null);
                setProjection(null);
                setSourceOpenRequest(0);
                setTR(null);
                aoRef.current = null;
                acRef.current = false;
                adRef.current = false;
                auRef.current = false;
                ahRef.current = false;
                let d = await fetch(`/api/buildings/${eR}`);
                let u = await d.json();
                if (!u.success || !u.data) {
                    setEq(false);
                    setEH(null);
                    return;
                }
                let h = u.data;
                let m = [];
                if (h.teachingData) {
                    try {
                        let e = JSON.parse(h.teachingData);
                        if (e.materials && Array.isArray(e.materials)) {
                            m = e.materials;
                        } else if (e.blockSteps && Array.isArray(e.blockSteps)) {
                            let t = new Map;
                            for (let a of e.blockSteps){
                                if (a.materials && Array.isArray(a.materials) && a.materials.length > 0) {
                                    for (let e of a.materials){
                                        if (e.name) {
                                            t.set(e.name, (t.get(e.name) || 0) + (e.count || 1));
                                        }
                                    }
                                } else if (a.blocks && Array.isArray(a.blocks)) {
                                    for (let e of a.blocks){
                                        let a = (e.blockId || e.name || "unknown").replace("minecraft:", "");
                                        t.set(a, (t.get(a) || 0) + 1);
                                    }
                                }
                            }
                            if (t.size > 0) {
                                let e = [
                                    "#9C7853",
                                    "#C5A876",
                                    "#7F7F7F",
                                    "#8B4513",
                                    "#556B2F",
                                    "#CD853F",
                                    "#708090",
                                    "#B22222",
                                    "#DAA520",
                                    "#2E8B57",
                                    "#4682B4",
                                    "#D2691E"
                                ];
                                m = Array.from(t.entries()).sort((e, t)=>t[1] - e[1]).map(([name, count], a)=>({
                                        id: String(a + 1),
                                        name,
                                        count,
                                        color: e[a % e.length]
                                    }));
                            }
                        }
                    } catch (e) {}
                }
                let p = {
                    id: h.id,
                    title: h.name,
                    description: h.description,
                    difficulty: h.difficulty,
                    duration: parseInt(h.estimatedTime) || 45,
                    layers: h.height || 8,
                    blockCount: h.blockCount || 0,
                    favoriteCount: h.favoriteCount || 0,
                    modelPath: h.modelUrl || h.model?.url || "",
                    projectionFileUrl: h.projectionFileUrl || undefined,
                    stepStatus: h.stepStatus || "none",
                    teachingDataRaw: h.teachingData || undefined,
                    tags: ew(h.tags),
                    thumbnailUrl: h.coverImage || undefined,
                    images: h.images || undefined,
                    buildingFiles: h.building_files || [],
                    author: {
                        id: "",
                        name: h.projectionAuthor || "",
                        avatar: "匿",
                        verified: false,
                        studentCount: h.learnCount || 0
                    },
                    materials: m,
                    info: {
                        publishDate: h.createdAt ? new Date(h.createdAt).toLocaleDateString("zh-CN") : "",
                        views: h.views || 0,
                        learners: h.learnCount || 0,
                        completions: h.completedCount || 0,
                        updateDate: h.updatedAt ? new Date(h.updatedAt).toLocaleDateString("zh-CN") : ""
                    },
                    width: h.width ?? null,
                    depth: h.depth ?? null,
                    createdAt: h.createdAt ?? null,
                    updatedAt: h.updatedAt ?? null,
                    authorUrl: h.authorUrl ?? null,
                    rawHeight: h.height ?? null,
                    sourceInfo: h.sourceInfo ?? bg(),
                    projectionIdentity: h.projectionIdentity ?? null
                };
                setEH(p);
                setTz(p.favoriteCount || 0);
                let b = h.userProgress ? {
                    progress: Math.min(100, Math.max(0, Number(h.userProgress.progress) || 0)),
                    currentStep: Math.max(0, Number(h.userProgress.currentStep) || 0),
                    totalSteps: Math.max(0, Number(h.userProgress.totalSteps) || 0),
                    completed: !!h.userProgress.completed
                } : null;
                setTR(b);
                fetch(`/api/buildings/${h.id}/favorite`).then((e)=>e.json()).then((e)=>{
                    if (e.success && e.data) {
                        setTP(!!e.data.favorited);
                        setTz(e.data.count || 0);
                    }
                }).catch(()=>{});
                setAl((e)=>e + 1);
                import("./module-95293.js").then(async ({ initBlockTextureMapper, getBlockTexture })=>{
                    await initBlockTextureMapper();
                    setEH((e)=>{
                        if (!e) {
                            return e;
                        }
                        let t = e.materials.map((e)=>{
                            let t = getBlockTexture(e.name.includes(":") ? e.name : `minecraft:${e.name}`);
                            return {
                                ...e,
                                textureUrl: t.imageFilename !== "Barrier.png" ? t.textureUrl : undefined,
                                chineseName: t.imageFilename !== "Barrier.png" ? t.chineseName : e.name
                            };
                        });
                        return {
                            ...e,
                            materials: t
                        };
                    });
                }).catch(()=>{});
                let x = ew(h.tags)[0];
                if (x) {
                    fetch(`/api/buildings?tag=${encodeURIComponent(x)}&limit=8`).then((e)=>e.json()).then((e)=>{
                        if (e.success && e.data) {
                            setTE(e.data.filter((e)=>e.id !== h.id));
                        }
                    }).catch(()=>{});
                }
                setEq(false);
            } catch (error) {
                console.error("Failed to fetch building:", error);
                setEq(false);
                setEH(null);
            }
        })();
    }, [
        eR
    ]);
    let ag = useCallback((e)=>{
        setTn(e);
        setTs(true);
        if (e === "measure") {
            if (document.pointerLockElement && t8Ref.current?.contains(document.pointerLockElement)) {
                document.exitPointerLock();
            }
            setTi("orbit");
        }
        if (e !== "measure") {
            setTS([]);
        }
    }, []);
    let af = useCallback(()=>{
        setTs(false);
        setTS([]);
    }, []);
    let aj = useCallback((e)=>{
        if (ts && tn === e) {
            af();
        } else {
            ag(e);
        }
    }, [
        af,
        ag,
        ts,
        tn
    ]);
    let onError = useCallback((e)=>{
        setEV(e);
        if (e.includes("投影文件已更新")) {
            setProjection(null);
            setEH((e)=>{
                if (e) {
                    return {
                        ...e,
                        sourceInfo: bg()
                    };
                }
                return e;
            });
        }
    }, []);
    let onTeachingReady = useCallback((e)=>{
        setTB(e.layerCount > 0 ? e.layerCount : null);
    }, []);
    let aN = useCallback(function(...args) {
        let keepalive = args.length > 0 && args[0] !== undefined && args[0];
        if (!acRef.current) {
            return;
        }
        let apRef_current = apRef.current;
        if (apRef_current && !(apRef_current.totalSteps <= 0)) {
            fetch(`/api/buildings/${eR}/progress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...apRef_current,
                    completed: false
                }),
                keepalive
            }).catch(()=>{});
        }
    }, [
        eR
    ]);
    let aw = useCallback(function(...args) {
        let forceRestart = args.length > 0 && args[0] !== undefined && args[0];
        return (({ forceRestart = false, progress, savedIndex = 0, layerCount })=>{
            if (forceRestart || progress?.completed) {
                return 0;
            }
            return Math.max(0, Math.min(Math.max(progress?.currentStep ? progress.currentStep - 1 : 0, savedIndex), Math.max(0, layerCount - 1)));
        })({
            forceRestart,
            progress: tR,
            savedIndex: aoRef.current?.mode === "layer" ? aoRef.current.currentIndex : 0,
            layerCount: t9.state.layerCount
        });
    }, [
        t9.state.layerCount,
        tR
    ]);
    let aS = useCallback(function(e = {}) {
        let t = ()=>{
            let s = Math.max(0, t9.state.layerCount - 1);
            let currentIndex = Math.max(0, Math.min(e.startIndex ?? aw(!!e.forceRestart), s));
            acRef.current = true;
            ahRef.current = false;
            setTG(false);
            setTX(null);
            setT3(false);
            aoRef.current = {
                mode: "layer",
                currentIndex
            };
            t9.actions.setMode("layer", currentIndex);
            if (!adRef.current) {
                adRef.current = true;
                fetch(`/api/buildings/${eR}/learn`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        eventType: "start"
                    })
                }).then((e)=>{
                    if (!e.ok) {
                        adRef.current = false;
                    }
                }).catch(()=>{
                    adRef.current = false;
                });
            }
            e.onStarted?.();
        };
        if (requireLogin({
            action: "逐层学习",
            onSuccess: t
        })) {
            t();
        }
    }, [
        eR,
        requireLogin,
        aw,
        t9.actions,
        t9.state.layerCount
    ]);
    useCallback(function(e = "layer") {
        setTQ(e);
        setT1(t3 && e === "layer" ? "resume" : "restart");
        setTY(true);
    }, [
        t3
    ]);
    let aA = useCallback(()=>{
        if ((eH?.stepStatus || "none") !== "ready") {
            return void setEK("该建筑暂不提供步骤教学");
        }
        let e = ()=>t9.actions.setMode("step", 0);
        if (requireLogin({
            action: "步骤教学",
            onSuccess: e
        })) {
            e();
        }
    }, [
        eH?.stepStatus,
        requireLogin,
        t9.actions
    ]);
    let aC = useCallback((e)=>{
        if (e === "preview") {
            if (amRef.current) {
                clearTimeout(amRef.current);
            }
            aN(true);
            acRef.current = false;
            adRef.current = false;
            sessionStorage.removeItem(`building-learning-active-${eR}`);
            t9.actions.setMode("preview", 0);
            return;
        }
        if (e === "layer") {
            return void aS();
        }
        aA();
    }, [
        eR,
        aN,
        aS,
        aA,
        t9.actions
    ]);
    let aM = useCallback(()=>{
        let matches = window.matchMedia("(max-width: 767px)").matches;
        aS({
            forceRestart: !!tR?.completed,
            onStarted: matches ? ()=>gG(t8Ref.current, ()=>setE4(true)) : undefined
        });
    }, [
        aS,
        tR?.completed
    ]);
    let aI = useCallback(()=>{
        setTY(false);
        if (tQ === "step") {
            return void aA();
        }
        aS({
            forceRestart: t1 === "restart" || !!tR?.completed
        });
    }, [
        tQ,
        t1,
        aS,
        aA,
        tR?.completed
    ]);
    let aE = useCallback(async ()=>{
        let e = !tP;
        setTP(e);
        setTz((t)=>Math.max(0, t + (e ? 1 : -1)));
        try {
            let t = await fetch(`/api/buildings/${eR}/favorite`, {
                method: e ? "POST" : "DELETE"
            });
            if (t.status === 401) {
                setTP(!e);
                setTz((t)=>Math.max(0, t + (e ? -1 : 1)));
                promptLogin({
                    action: "收藏建筑"
                });
                return;
            }
            if (!t.ok) {
                setTP(!e);
                setTz((t)=>Math.max(0, t + (e ? -1 : 1)));
                return;
            }
            let a = await t.json().catch(()=>null);
            if (a?.success && a?.data) {
                setTP(!!a.data.favorited);
                setTz(a.data.count || 0);
            }
        } catch (t) {
            setTP(!e);
            setTz((t)=>Math.max(0, t + (e ? -1 : 1)));
        }
    }, [
        eR,
        tP,
        promptLogin
    ]);
    let a_ = useCallback(()=>{
        if (t9.state.mode !== "preview") {
            aC("preview");
        }
    }, [
        aC,
        t9.state.mode
    ]);
    let aP = useCallback(()=>{
        if (e4) {
            setE4(false);
            a_();
            return;
        }
        gU(t8Ref.current, ()=>setE4(true));
    }, [
        e4,
        a_
    ]);
    useEffect(()=>{
        let e = ()=>{
            let e = !!document.fullscreenElement;
            setE2(e);
            if (e) {
                return void setE4(false);
            }
            a_();
        };
        document.addEventListener("fullscreenchange", e);
        return ()=>document.removeEventListener("fullscreenchange", e);
    }, [
        a_
    ]);
    useEffect(()=>{
        if (!e4) {
            return;
        }
        let overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return ()=>{
            document.body.style.overflow = overflow;
        };
    }, [
        e4
    ]);
    useEffect(()=>{
        let e = window.matchMedia("(pointer: coarse)");
        let t = ()=>setTt(e.matches);
        t();
        if (typeof e.addEventListener === "function") {
            e.addEventListener("change", t);
            return ()=>e.removeEventListener("change", t);
        }
        e.addListener(t);
        return ()=>e.removeListener(t);
    }, []);
    useEffect(()=>{
        if (tt && ti === "firstPerson") {
            setTi("orbit");
        }
    }, [
        tt,
        ti
    ]);
    let aD = useCallback(()=>{
        setResetCameraKey((e)=>e + 1);
        setCameraZoomPercent(100);
        setCameraPitchDeg(28);
    }, []);
    let az = useCallback(()=>{
        aS({
            forceRestart: !!tR?.completed
        });
    }, [
        aS,
        tR?.completed
    ]);
    let aFRef = useRef(null);
    let aR = useCallback((e)=>{
        let aFRef_current = aFRef.current;
        if (!aFRef_current) {
            return;
        }
        let a = t9.state.mode === "step" ? t9.state.stepCount : t9.state.layerCount;
        if (a <= 0) {
            return;
        }
        let s = aFRef_current.getBoundingClientRect();
        if (s.width <= 0) {
            return;
        }
        let r = Math.max(1, Math.min(a, Math.round((e - s.left) / s.width * a)));
        t9.actions.goTo(r - 1);
    }, [
        t9.actions,
        t9.state.layerCount,
        t9.state.mode,
        t9.state.stepCount
    ]);
    let aU = useMemo(()=>{
        let e = Math.max(eH?.width || 0, eH?.layers || 0, eH?.depth || 0);
        if (e <= 0) {
            return 16;
        }
        return Math.round(Math.min(60, Math.max(10, 0.4 * e)));
    }, [
        eH?.width,
        eH?.layers,
        eH?.depth
    ]);
    useEffect(()=>{
        if (tN === null && eH && (eH.width || eH.layers || eH.depth)) {
            setTN(aU);
        }
    }, [
        eH,
        aU,
        tN
    ]);
    useEffect(()=>{
        let e = (e)=>{
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            let t = ti === "firstPerson";
            switch(e.key){
                case "ArrowLeft":
                    if (t) {
                        break;
                    }
                    t9.actions.previous();
                    break;
                case "ArrowRight":
                    if (t) {
                        break;
                    }
                    t9.actions.next();
                    break;
                case " ":
                    e.preventDefault();
                    if (t) {
                        break;
                    }
                    t9.actions.togglePlay();
                    break;
                case "r":
                case "R":
                    if (t) {
                        break;
                    }
                    t9.actions.reset();
                    break;
                case "f":
                case "F":
                    aP();
                    break;
                case "Escape":
                    if (e$) {
                        setE$(false);
                        break;
                    }
                    setE4(false);
                    break;
                case "?":
                    setE$((e)=>!e);
                    break;
                case "Home":
                    if (t) {
                        break;
                    }
                    t9.actions.goTo(0);
                    break;
                case "End":
                    {
                        if (t) {
                            break;
                        }
                        let e = t9.state.mode === "step" ? t9.state.stepCount - 1 : t9.state.layerCount - 1;
                        t9.actions.goTo(e);
                    }
            }
        };
        window.addEventListener("keydown", e);
        return ()=>window.removeEventListener("keydown", e);
    }, [
        t9.actions,
        t9.state.mode,
        t9.state.stepCount,
        t9.state.layerCount,
        aP,
        ti,
        e$
    ]);
    let aB = t9.state.selectedBlock?.blockId || "";
    let shifted = g_1(t7Ref, ts ? ".bd-side-panel" : null, [
        aB,
        aa,
        e6,
        tY
    ]);
    useEffect(()=>{
        if (t9.state.mode === "layer" && t9.state.isReady && eR) {
            var e;
            var t;
            var a;
            let currentStep = t9.state.currentIndex + 1;
            let totalSteps = t9.state.layerCount;
            if (totalSteps <= 0) {
                return;
            }
            e = currentStep;
            let progress = (t = totalSteps) <= 0 ? 0 : Math.min(99, Math.max(0, Math.round(Number.isFinite(a = e / t * 100) ? a : 0)));
            apRef.current = {
                progress,
                currentStep,
                totalSteps
            };
            let l = {
                mode: "layer",
                currentIndex: t9.state.currentIndex,
                timestamp: Date.now()
            };
            aoRef.current = l;
            localStorage.setItem(`building-progress-${eR}`, JSON.stringify(l));
            if (!acRef.current) {
                return;
            }
            setTR((e)=>{
                if (e?.completed) {
                    return e;
                }
                return {
                    progress,
                    currentStep,
                    totalSteps,
                    completed: false
                };
            });
            if (amRef.current) {
                clearTimeout(amRef.current);
            }
            amRef.current = setTimeout(()=>{
                aN();
            }, 2000);
        }
        return ()=>{
            if (amRef.current) {
                clearTimeout(amRef.current);
            }
        };
    }, [
        t9.state.mode,
        t9.state.currentIndex,
        t9.state.isReady,
        t9.state.layerCount,
        eR,
        aN
    ]);
    useEffect(()=>{
        let e = ()=>aN(true);
        window.addEventListener("pagehide", e);
        return ()=>{
            window.removeEventListener("pagehide", e);
            if (amRef.current) {
                clearTimeout(amRef.current);
            }
            aN(true);
        };
    }, [
        aN
    ]);
    useEffect(()=>{
        if (t9.state.isReady && eR) {
            if (tR?.completed) {
                aoRef.current = null;
                setT3(false);
                return;
            }
            if (acRef.current) {
                return void setT3(false);
            }
            try {
                let e = tR?.currentStep ? Math.max(0, tR.currentStep - 1) : 0;
                let t = 0;
                let a = localStorage.getItem(`building-progress-${eR}`);
                if (a) {
                    let e = JSON.parse(a);
                    if (e.mode === "layer" && Date.now() - e.timestamp < 86400000) {
                        t = Math.max(0, Number(e.currentIndex) || 0);
                    }
                }
                let s = Math.min(Math.max(0, t9.state.layerCount - 1), Math.max(e, t));
                aoRef.current = {
                    mode: "layer",
                    currentIndex: s
                };
                setT3((({ isReady, hasActiveSession, completed, resumeIndex })=>isReady && !hasActiveSession && !completed && resumeIndex > 0)({
                    isReady: t9.state.isReady,
                    hasActiveSession: acRef.current,
                    completed: !!tR?.completed,
                    resumeIndex: s
                }));
            } catch (e) {}
        }
    }, [
        t9.state.isReady,
        t9.state.layerCount,
        eR,
        al,
        tR?.completed,
        tR?.currentStep
    ]);
    useEffect(()=>{
        if (!t9.state.isReady || !eH || auRef.current) {
            return;
        }
        let e = ((e)=>{
            let t = new URLSearchParams(e).get("learn");
            if (t === "resume" || t === "restart") {
                return t;
            }
            return null;
        })(window.location.search);
        sessionStorage.removeItem(`building-learning-active-${eR}`);
        if (!e) {
            return;
        }
        auRef.current = true;
        let t = new URL(window.location.href);
        t.searchParams.delete("learn");
        window.history.replaceState(window.history.state, "", `${t.pathname}${t.search}${t.hash}`);
        aS({
            forceRestart: e === "restart"
        });
    }, [
        eH,
        eR,
        aS,
        t9.state.isReady
    ]);
    useEffect(()=>{
        if (!acRef.current || t9.state.mode !== "layer" || !t9.state.isReady) {
            return;
        }
        let layerCount = t9.state.layerCount;
        if (layerCount <= 0) {
            return;
        }
        let t = t9.state.currentIndex >= layerCount - 1;
        if (t && !ahRef.current) {
            ahRef.current = true;
            setTG(false);
            setTX(null);
            let e = setTimeout(()=>setOpen(true), 1000);
            return ()=>clearTimeout(e);
        }
        if (!t) {
            ahRef.current = false;
        }
    }, [
        t9.state.currentIndex,
        t9.state.mode,
        t9.state.isReady,
        t9.state.layerCount
    ]);
    let aL = useCallback(async ()=>{
        let layerCount = t9.state.layerCount;
        if (!(layerCount <= 0) && !tW) {
            setTW(true);
            setTX(null);
            try {
                let t = await fetch(`/api/buildings/${eR}/learn`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        eventType: "complete",
                        currentStep: layerCount,
                        totalSteps: layerCount
                    })
                });
                let a = await t.json().catch(()=>null);
                if (!t.ok || !a?.success) {
                    throw Error(a?.error || "完成记录保存失败");
                }
                try {
                    sendGAEvent("event", "building_learn_complete", {
                        building_id: eR,
                        building_title: eH?.title || undefined
                    });
                } catch (e) {}
                localStorage.removeItem(`building-progress-${eR}`);
                sessionStorage.removeItem(`building-learning-active-${eR}`);
                aoRef.current = null;
                apRef.current = null;
                acRef.current = false;
                adRef.current = false;
                setTR({
                    progress: 100,
                    currentStep: layerCount,
                    totalSteps: layerCount,
                    completed: true
                });
                setEH((e)=>{
                    if (e) {
                        return {
                            ...e,
                            info: {
                                ...e.info,
                                completions: e.info.completions + +!a.deduped
                            }
                        };
                    }
                    return e;
                });
                setTG(true);
            } catch (error) {
                setTX(error instanceof Error ? error.message : "完成记录保存失败");
            } finally{
                setTW(false);
            }
        }
    }, [
        eH?.title,
        eR,
        tW,
        t9.state.layerCount
    ]);
    let aO = useCallback(()=>{
        if (eH?.projectionFileUrl) {
            qs(eH.projectionFileUrl, eH.id, eH.title);
            fetch("/api/studio/usage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sourceType: "building",
                    buildingId: eH.id,
                    fileName: eH.title
                })
            }).catch(()=>{});
            eF.push("/studio/editor");
        }
    }, [
        eH,
        eF
    ]);
    let aH = useCallback(()=>{
        if (!eH?.projectionFileUrl) {
            return;
        }
        let e = ()=>{
            let e = document.createElement("a");
            e.href = `/api/buildings/${eH.id}/download`;
            document.body.appendChild(e);
            e.click();
            document.body.removeChild(e);
        };
        if (requireLogin({
            action: "导出投影",
            onSuccess: e,
            strict: true
        })) {
            e();
        }
    }, [
        eH,
        requireLogin
    ]);
    let aJ = useCallback(()=>{
        let e = t9.state.mode === "step" ? t9.state.stepCount : t9.state.layerCount;
        if (!(e <= 0)) {
            if (t9.state.currentIndex >= e - 1) {
                if (t9.state.mode === "step") {
                    return void t9.actions.setMode("preview", 0);
                }
                return void setOpen(true);
            }
            t9.actions.next();
        }
    }, [
        t9.actions,
        t9.state.currentIndex,
        t9.state.layerCount,
        t9.state.mode,
        t9.state.stepCount
    ]);
    let aq = useMemo(()=>{
        let e = new Set;
        return tE.filter((t)=>!(!t?.id || t.id === eR || e.has(t.id)) && (e.add(t.id), true)).slice(0, 8).map(eS);
    }, [
        eR,
        tE
    ]);
    if (eq) {
        return <Y1Component/>;
    }
    if (!eH) {
        return <div className="min-h-screen flex items-center justify-center bg-bg-primary"><div className="text-center max-w-md mx-auto px-6"><div className="w-24 h-24 bg-bg-card border-2 border-black shadow-block flex items-center justify-center mx-auto mb-6"><A_5 size={36} className="text-warning"/></div><h2 className="text-2xl font-extrabold text-text-primary mb-3">建筑未找到</h2><p className="text-text-muted font-medium mb-8">抱歉，这个建筑不存在或已被删除</p><M.$ onClick={()=>eF.push("/buildings")} size="lg">返回建筑库</M.$></div></div>;
    }
    let aG = R.g(eH.difficulty);
    let totalBlocks = eH.blockCount || eH.materials.reduce((acc, material)=>acc + material.count, 0);
    let firstPersonSpeed = tN ?? aU;
    let length = eH.materials.length;
    let aX = tB ?? (tR?.totalSteps && tR.totalSteps > 0 ? tR.totalSteps : null);
    let a$ = Math.min(t9.state.layerCount, Math.max(1, (aoRef.current?.currentIndex ?? 0) + 1));
    let aY = eH.width && eH.depth ? `${eH.width} x ${eH.layers} x ${eH.depth}` : `高度 ${eH.layers} 格`;
    let aZ = tR?.completed ? "重新学习" : tR?.currentStep && tR.currentStep > 1 ? `继续第 ${Math.min(tR.currentStep, aX || tR.currentStep)} 层` : "开始学习";
    let aQ = !Number.isFinite(eP = eH.duration) || eP <= 0 ? "按学习节奏调整" : eP >= 60 ? `约 ${Math.round(eP / 60)} 小时` : `约 ${eP} 分钟`;
    let a0 = Wx(eH.tags);
    let a1 = Mh(eH.tags);
    let a2 = (a1.length > 0 ? a1 : [
        aG.label,
        "逐层教学",
        "litematic"
    ]).slice(0, 5);
    let a3 = [
        eH.description || `${eH.title} 是一座可通过 3D 逐层教学拆解的 Minecraft 建筑。每一层都可以在查看器中预览结构、核对材料，并导出为 .litematic 投影继续创作。`,
        aX ? `本作共 ${eN(totalBlocks)} 方块、${aX} 层，适合按层核对轮廓、主体与装饰细节。配合 3D 查看器逐层查看，零基础玩家也能按材料和坐标逐步还原。` : `本作共 ${eN(totalBlocks)} 方块，层数会在投影解析完成后显示。配合 3D 查看器逐层查看，零基础玩家也能按材料和坐标逐步还原。`,
        "建议搭配投影编辑器导入投影后施工：可在游戏外预览每一层、统计材料、批量替换方块，再导出为 .litematic 投影到游戏内逐格摆放。"
    ];
    let a4 = !N9(eH.stepStatus) && t9.state.stepCount > 0;
    let a5 = t9.state.mode === "step" ? t9.state.stepMeta[t9.state.currentIndex] : t9.state.layerMeta[t9.state.currentIndex];
    let blocks = (a5?.materials || []).map((e)=>{
        let t = e.blockId.replace("minecraft:", "");
        let a = eH.materials.find((a)=>a.name === t || a.name === e.blockId);
        return {
            blockId: e.blockId,
            count: e.count,
            name: a?.chineseName || t,
            textureUrl: a?.textureUrl
        };
    });
    let entityMaterials = t9.state.mode === "step" && (w = t9.state.stepMeta[t9.state.currentIndex]?.entityMaterials) != null ? w : [];
    let a7 = t9.state.mode === "step" ? t9.state.stepCount : t9.state.layerCount;
    let a9 = t9.state.mode === "step" ? "步" : "层";
    let se = t9.state.mode === "step" ? t9.state.stepMeta[t9.state.currentIndex]?.title || `步骤 ${t9.state.currentIndex + 1}` : `第 ${t9.state.currentIndex + 1} 层`;
    let st = a7 > 0 ? Math.round((t9.state.currentIndex + 1) / a7 * 100) : 0;
    let sa = a7 > 0 && t9.state.currentIndex >= a7 - 1;
    let ss = tG || !!tR?.completed;
    let sr = eU && eT.count > 0 && t9.state.mode !== "preview" ? <em className="tv-measure-legend">图上<strong>一格一道刻度</strong>，数字是这一段有几块{eT.hasGap ? "；虚线框是中间要空着的格子，数字是空几格" : ""}。</em> : null;
    let sn = sa ? t9.state.mode === "step" ? "步骤已看完" : "全部放完了" : `这${a9}放完了`;
    let sl = sa ? t9.state.mode === "step" ? "返回自由查看" : "确认完成学习" : `去第 ${String(t9.state.currentIndex + 2).padStart(3, "0")} ${a9}`;
    let si = tS.length >= 2 ? Math.sqrt((tS[1][0] - tS[0][0]) ** 2 + (tS[1][1] - tS[0][1]) ** 2 + (tS[1][2] - tS[0][2]) ** 2) : null;
    return <div className={`bdi-page min-h-screen bg-bg-primary text-text-primary ${t9.state.mode === "preview" ? "is-preview" : "is-learning"}`}><div className="wrap pt-4 md:pt-7 pb-6 md:pb-16"><nav className="bdi-breadcrumb" aria-label="面包屑"><_o href="/buildings">建筑库</_o><span>/</span><span>{a1[0] || "建筑"}</span><span>/</span><b>{eH.title}</b></nav><div className="bd-detail-hero mb-8"><section ref={t8Ref} data-onboarding="3d-canvas" className={`bd-viewer flex-1 min-w-0 bg-bg-card border-2 border-black shadow-block overflow-hidden flex flex-col w-full${e4 ? " is-pseudo-fullscreen" : ""}`}><div className={`bd-viewer-stage relative flex-1 bg-bg-inset min-h-[340px] sm:min-h-[360px] lg:aspect-auto lg:min-h-[calc(100vh-12rem)] flex items-center justify-center overflow-hidden ${tC ? "bd-measuring" : ""}`} onPointerDown={eZ ? ()=>setDismissSignal((e)=>e + 1) : undefined}>{ab ? jsx(ek, {
        buildingId: eH.id,
        projectionFileUrl: eH.projectionFileUrl,
        teachingData: eH.teachingDataRaw,
        buildingName: eH.title,
        onError,
        onTeachingReady,
        projectionIdentity: eH.projectionIdentity ?? null,
        onProjectionInfo,
        externalState: tC ? {
            state: t9.state,
            actions: {
                ...t9.actions,
                handleBlockClick: (e)=>{
                    if (!e) {
                        return;
                    }
                    let e_position = e.position;
                    setTS((e)=>{
                        if (e.length >= 2) {
                            return e;
                        }
                        return [
                            ...e,
                            e_position
                        ];
                    });
                }
            }
        } : t9,
        hideBuiltinUI: true,
        resetCameraKey,
        highlightedBlockId: t9.state.highlightedBlockId,
        onEntityClick: tC ? undefined : ar,
        onPointerMissed,
        selectedEntity: aa?.entity ?? null,
        measurePoints: tC ? tS : undefined,
        cameraMode: ti,
        onCameraModeChange: setTi,
        cameraZoomPercent,
        cameraPitchDeg,
        cameraCommandNonce,
        cameraPreset: tc,
        cameraPresetNonce,
        focusBlock,
        showGroundGrid: tb,
        hideFloatingTools: true,
        showFirstPersonPreviewButton: !tt,
        firstPersonSpeed,
        onFirstPersonSpeedChange: setTN,
        autoMeasure: eU && !tC,
        onAutoMeasureChange,
        stepOutlineMode: "solid",
        selectionContourMode: "whole-object"
    }) : <FComponent images={images} buildingName={eH.title}/>}{ab && <div className="bdi-tool-rail has-measure"><button type="button" data-onboarding="view-controls" className={ts && tn === "view" ? "is-on" : ""} onClick={()=>aj("view")} aria-pressed={ts && tn === "view"}><H.A size={16}/><span>视图</span></button><button type="button" className={tC ? "is-on" : ""} onClick={()=>aj("measure")} aria-pressed={tC}><A_6 size={16}/><span>测量</span></button><button type="button" data-onboarding="material-list-desktop" className={ts && tn === "materials" ? "is-on" : ""} onClick={()=>aj("materials")} aria-pressed={ts && tn === "materials"}><A_7 size={16}/><span>材料</span></button><i aria-hidden="true"/><button type="button" className="bdi-entity-toggle" onClick={eB} aria-pressed={eU} title={t9.state.mode === "preview" ? "标出整栋的长宽高" : "自动标出这一层各段有几格"}><span>标注</span><b className={eU ? "is-on" : ""}><em/></b></button><button type="button" className="bdi-entity-toggle" onClick={()=>t9.actions.toggleDecorEntities()} aria-pressed={t9.state.showDecorEntities}><span>实体</span><b className={t9.state.showDecorEntities ? "is-on" : ""}><em/></b></button><button type="button" className="bdi-entity-toggle" onClick={()=>t9.actions.toggleCreatures()} aria-pressed={t9.state.showCreatures}><span>生物</span><b className={t9.state.showCreatures ? "is-on" : ""}><em/></b></button><button type="button" className="bdi-entity-toggle" onClick={()=>setTb((e)=>!e)} aria-pressed={tb}><span>网格</span><b className={tb ? "is-on" : ""}><em/></b></button><button type="button" className="bdi-entity-toggle" disabled={t9.state.mode === "preview"} onClick={()=>t9.actions.toggleFocusMode()} aria-pressed={t9.state.focusMode} title="已完成层半透明（学习态可用）"><span>半透明</span><b className={t9.state.focusMode ? "is-on" : ""}><em/></b></button><i aria-hidden="true"/><button type="button" className="bdi-rail-fullscreen" onClick={aP} aria-label={e6 ? "退出全屏" : "全屏"}>{e6 ? <A_8 size={16}/> : <A_9 size={16}/>}<span>{e6 ? "退出" : "全屏"}</span></button><button type="button" onClick={()=>setE$(true)} aria-label="查看帮助"><A_10 size={16}/><span>帮助</span></button></div>}{ab && <button type="button" className="bdi-canvas-fullscreen" onClick={aP} aria-label="全屏预览"><A_9 size={18}/></button>}{ab && <SComponent ready={t9.state.isReady && t9.state.mode === "preview"} coarsePointer={tt} dismissSignal={dismissSignal} onVisibleChange={setEZ}/>}{ab && t9.state.mode === "preview" && t9.state.isReady && ti === "orbit" && !eZ && <div className="bd-viewer-hint bdi-control-hint"><A_2 size={11} className="text-brand-cta"/><span>{tt ? <><kbd>单指</kbd>旋转 · <kbd>双指</kbd>缩放/平移</> : <><kbd>左键</kbd>旋转 · <kbd>右键</kbd>平移 · <kbd>滚轮</kbd>缩放</>}</span></div>}{ab && <aside className={`bd-side-panel ${ts ? "open" : ""}`}><div className="bdi-panel-head"><b>{tn === "view" ? "视图控制" : tn === "materials" ? `全建筑材料 · ${length} 种` : "测量工具"}</b><button type="button" onClick={af} aria-label="关闭工具面板"><A_3 size={14}/></button></div><div className="bd-sp-body"><div className={`bd-sp-pane cn4-scroll ${tn === "view" ? "on" : ""}`}><div className="bdi-panel-section"><span>相机模式</span><div className="bdi-panel-grid two"><button type="button" className={ti === "orbit" ? "is-on" : ""} onClick={()=>setTi("orbit")}>轨道视角</button><button type="button" className={ti === "firstPerson" ? "is-on" : ""} onClick={()=>setTi("firstPerson")}>第一人称</button></div></div><div className="bdi-panel-section"><span>机位</span><div className="bdi-panel-grid two">{[
        [
            "front",
            "正视"
        ],
        [
            "side",
            "侧视"
        ],
        [
            "top",
            "俯视"
        ],
        [
            "isometric",
            "等距"
        ]
    ].map(([t, a])=><button key={t} type="button" className={tc === t ? "is-on" : ""} onClick={()=>{
            setTc(t);
            setCameraPresetNonce((e)=>e + 1);
        }}>{a}</button>)}</div></div><div className="bdi-panel-footer-actions one"><button type="button" onClick={aD}><A_11 size={15}/>重置视角</button></div></div><div className={`bd-sp-pane ${tn === "materials" ? "on" : ""}`}><div className="bd-cm-list cn4-scroll">{eH.materials.length === 0 ? <div className="bd-cm-empty">{ab ? <span className="inline-flex items-center gap-2"><L.y size="sm"/> 加载中...</span> : "暂无材料数据"}</div> : eH.materials.map((e)=>{
        let t = e.name.includes(":") ? e.name : `minecraft:${e.name}`;
        let a = t9.state.highlightedBlockId === t;
        return <button key={e.id} type="button" onClick={()=>t9.actions.highlightMaterial(t)} aria-pressed={a} className={`bd-cm-item ${a ? "on" : ""}`}><span className="bd-cm-sw">{e.textureUrl ? <img src={e.textureUrl} alt={e.name}/> : <X.A size={16}/>}</span><span className="bd-cm-info"><span className="bd-cm-name">{e.chineseName || e.name}</span><span className="bd-cm-id">{e.name}</span></span><span className="bd-cm-n">{e.count.toLocaleString()}<small>块</small></span>{a && <span className="bd-cm-hlflag"><$.A size={16}/>已高亮同类方块</span>}</button>;
    })}</div></div><div className={`bd-sp-pane cn4-scroll ${tn === "measure" ? "on" : ""}`}><div className="bdi-measure-points"><div><span>起点</span><b>{tS[0] ? tS[0].join(",") : "点击模型选择"}</b></div><div><span>终点</span><b>{tS[1] ? tS[1].join(",") : "点击模型选择"}</b></div></div><div className="bdi-measure-distance"><strong>{si == null ? "—" : Number.isInteger(si) ? si : si.toFixed(2)}</strong><b>格</b><span>直线距离</span></div><div className="bdi-panel-footer-actions two"><button type="button" onClick={()=>setTS([])} disabled={tS.length === 0}>清除两点</button><button type="button" onClick={af}>退出测量</button></div><p className="bdi-measure-hint">在模型上点两个方块即可量距</p></div></div>{tn === "materials" && eH.materials.length > 0 && <div className="bd-cm-exports"><button type="button" onClick={()=>E2(eH.materials, eH.title)}>导出 CSV</button><button type="button" onClick={()=>XV(eH.materials, eH.title)}>导出 XLSX</button></div>}</aside>}{e6 && <div className="bdi-fullscreen-top"><div className={`bdi-fullscreen-readout ${t9.state.mode === "preview" ? "is-preview" : ""}`}>{t9.state.mode !== "preview" && <><strong>{String(t9.state.currentIndex + 1).padStart(3, "0")}</strong><span>/{String(a7).padStart(3, "0")}</span><i/></>}<b>{eH.title}</b></div><button type="button" className="bdi-fullscreen-exit" onClick={aP} aria-label="退出全屏"><A_8 size={16}/></button></div>}{ab && e6 && t9.state.mode === "preview" && <button type="button" className="bdi-fullscreen-cta" onClick={az}><A_12 size={20}/>{aZ}</button>}{ab && t9.state.mode !== "preview" && t9.state.isReady && <div className="bdi-canvas-dock">{(()=>{
        let max = t9.state.mode === "step" ? t9.state.stepCount : t9.state.layerCount;
        if (max <= 0) {
            return null;
        }
        let disabled = t9.state.currentIndex <= 0;
        let a = [
            1,
            2,
            4
        ];
        let r = a.findIndex((e)=>e === t9.state.playSpeed);
        let n = a[(r >= 0 ? r + 1 : 1) % a.length];
        let l = `${(t9.state.currentIndex + 1) / max * 100}%`;
        return <div className="bd-scrubber"><I.K type="button" onClick={()=>t9.actions.togglePlay()} label="播放或暂停" size="sm" variant="primary" className="bd-sc-play">{t9.state.isPlaying ? <A_13 size={16}/> : <A_14 size={16}/>}</I.K><M.$ type="button" onClick={()=>t9.actions.setPlaySpeed(n)} size="xs" variant="secondary" className="bd-sc-speed" title="播放速度">{t9.state.playSpeed}x</M.$><div ref={aFRef} className="bd-sc-track" role="slider" tabIndex={0} aria-label={`逐${a9}滑块`} aria-valuemin={1} aria-valuemax={max} aria-valuenow={t9.state.currentIndex + 1} aria-valuetext={`第 ${t9.state.currentIndex + 1} ${a9}，共 ${max} ${a9}`} onPointerDown={(e)=>{
            e.currentTarget.setPointerCapture(e.pointerId);
            aR(e.clientX);
        }} onPointerMove={(e)=>{
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                aR(e.clientX);
            }
        }} onPointerUp={(e)=>{
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.releasePointerCapture(e.pointerId);
            }
        }}><span className="bd-sc-fill" style={{
            width: l
        }}/><span className="bd-sc-thumb" style={{
            left: l
        }}/></div><span className="bd-sc-readout"><span className="bd-sc-desktop-readout">第 <input type="number" min={1} max={max} value={t9.state.currentIndex + 1} onChange={(t)=>{
            let a = Number(t.target.value);
            if (Number.isFinite(a)) {
                t9.actions.goTo(Math.max(0, Math.min(max - 1, Math.floor(a) - 1)));
            }
        }}/> / <span className="bd-sc-tot">{max}</span> {t9.state.mode === "step" ? "步" : "层"}</span><span className="bd-sc-mobile-readout">{String(t9.state.currentIndex + 1).padStart(3, "0")}/{String(max).padStart(3, "0")}</span></span><I.K type="button" onClick={()=>t9.actions.reset()} disabled={disabled} label={`回到第一${a9}`} size="xs" variant="secondary" className="bd-sc-reset"><A_15 size={16}/></I.K></div>;
    })()}<section className={`bdi-fullscreen-learning${t5 ? " is-collapsed" : ""}`} aria-label={`${se}材料`}><div className="bdi-fullscreen-materials"><div className="bdi-level-heading"><span>{A.e(a9, entityMaterials)}</span><b>{blocks.length + entityMaterials.length} 种</b><button type="button" className="bdi-level-fold" onClick={()=>setT5((e)=>!e)} aria-expanded={!t5} aria-label={t5 ? "展开材料清单" : "收起材料清单"}><et.A size={16}/></button></div><div className="bdi-level-list"><A.p blocks={blocks} entityMaterials={entityMaterials}/></div></div><div className="bdi-fullscreen-actions"><button type="button" disabled={t9.state.currentIndex === 0} onClick={()=>t9.actions.previous()} aria-label={`上一${a9}`}><v.A size={18}/></button><button type="button" onClick={aJ}><b>{sn}</b><span>{sl}</span></button></div></section></div>}<N>{tY && <div className="bdi-chooser-shell" role="dialog" aria-modal="true" aria-labelledby="bdi-chooser-title"><h.P.button type="button" aria-label="关闭学习方式选择" className="bdi-chooser-backdrop" initial={{
        opacity: 0
    }} animate={{
        opacity: 1
    }} exit={{
        opacity: 0
    }} onClick={()=>setTY(false)}/><h.P.section className="bdi-chooser" initial={{
        opacity: 0,
        y: 24
    }} animate={{
        opacity: 1,
        y: 0
    }} exit={{
        opacity: 0,
        y: 24
    }}><i aria-hidden="true"/><header><div><h2 id="bdi-chooser-title">选个搭法</h2><p>{eH.title} · {totalBlocks.toLocaleString()} 块</p></div><button type="button" onClick={()=>setTY(false)} aria-label="关闭"><A_3 size={16}/></button></header><div className="bdi-choice-grid"><button type="button" className={tQ === "layer" ? "is-on" : ""} onClick={()=>{
        setTQ("layer");
        setT1(t3 ? "resume" : "restart");
    }}><span className="bdi-choice-dot"/><span><b>逐层学习</b><small>按 Y 轴一层层切，任何建筑都能用</small></span><strong>{String(t9.state.layerCount || aX || 0).padStart(3, "0")}</strong></button><button type="button" disabled={!a4} className={tQ === "step" ? "is-on" : ""} onClick={()=>{
        if (a4) {
            setTQ("step");
            setT1("restart");
        }
    }}><span className="bdi-choice-dot"/><span><b>步骤学习</b><small>{a4 ? "按语义分组，如「二层墙体」" : "这栋建筑还没有步骤数据"}</small></span><strong>{a4 ? String(t9.state.stepCount).padStart(3, "0") : "暂无"}</strong></button></div><div className="bdi-choice-start"><span>从哪开始</span><div><button type="button" disabled={!t3 || tQ === "step"} className={t1 === "resume" ? "is-on" : ""} onClick={()=>setT1("resume")}>接着第 {String(a$).padStart(3, "0")} 层</button><button type="button" className={t1 === "restart" ? "is-on" : ""} onClick={()=>setT1("restart")}>从第 001 层</button></div></div><button type="button" className="bdi-choice-confirm" onClick={aI}>进入学习</button></h.P.section></div>}</N>{ab && t9.state.selectedBlock && !tY && (()=>{
        let e = t9.state.selectedBlock.blockId || "";
        let t = e.replace("minecraft:", "");
        let a = eH.materials.find((e)=>e.name === t);
        return <_.X ref={t7Ref} shifted={shifted} block={t9.state.selectedBlock} displayName={a?.chineseName || t || "未知方块"} textureUrl={a?.textureUrl} onlyThis={t9.state.highlightedBlockId === e} onToggleOnlyThis={()=>t9.actions.highlightMaterial(e)} onFocus={()=>{
            if (t9.state.isPlaying) {
                t9.actions.togglePlay();
            }
            setFocusBlock((e)=>({
                    position: [
                        ...t9.state.selectedBlock.position
                    ],
                    nonce: (e?.nonce ?? 0) + 1
                }));
        }}/>;
    })()}{ab && aa && !tY && <_.z ref={t7Ref} shifted={shifted} entity={aa.entity} stepIndex={aa.stepIndex} stepTitle={aa.stepIndex !== undefined ? t9.state.stepMeta[aa.stepIndex]?.title : undefined} onJump={t9.state.mode === "step" && aa.stepIndex !== undefined ? ()=>t9.actions.goTo(aa.stepIndex) : undefined}/>}{ab && <O isOpen={e$} onClose={()=>setE$(false)} coarsePointer={tt}/>}{eV && <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/80 z-20"><div className="text-center max-w-sm px-6"><A_5 size={36} className="text-red-500 mb-4 block"/><p className="font-bold mb-2">加载失败</p><p className="text-text-muted text-sm mb-4">{eV}</p><M.$ onClick={()=>{
        if (eV.includes("投影文件已更新")) {
            return void window.location.reload();
        }
        setEV(null);
        setEH((e)=>{
            if (e) {
                return {
                    ...e
                };
            }
            return null;
        });
    }} size="sm">{eV.includes("投影文件已更新") ? "重新加载详情" : "重试"}</M.$></div></div>}</div></section><aside className="bd-detail-side">{t9.state.mode === "preview" ? <div className="bdi-preview-stack"><section className="bdi-side-card bdi-identity-card"><div className="bdi-tag-row">{a0 && <span className="is-official">官方原创</span>}{(a1.length > 0 ? a1.slice(0, 2) : [
        "建筑",
        "生存"
    ]).map((e)=><span key={e}>{e}</span>)}<span className="is-difficulty" style={{
        background: aG.bg
    }}>{aG.label}</span></div><EjComponent title={eH.title} authorName={eH.author.name || null} authorUrl={eH.authorUrl ?? null} source={eH.sourceInfo ?? bg()} projection={projection} onShowSource={()=>setSourceOpenRequest((e)=>e + 1)}/></section><section className="bdi-side-card bdi-action-card"><p><i/>已有 <b>{eH.info.completions.toLocaleString()}</b> 人搭完过</p><button type="button" className="bdi-primary-action" onClick={aM} data-onboarding="start-learning" disabled={!ab}><A_12 size={20}/>{aZ}</button>{stepTeaching && <_o href={stepTeaching.href} className="bdi-step-entry" onClick={()=>eb.MP("step_entry_link", {
            from: "building_detail",
            buildingId: eR
        })}>{jsx(es, {
        size: 18
    })}跟着步骤搭<span>{stepTeaching.steps ? `${stepTeaching.steps} 步 · 免登录` : "免登录"}</span></_o>}<div><button type="button" className={tP ? "is-on" : ""} onClick={aE}>{tP ? <A_16 size={16}/> : <A_17 size={16}/>}{tP ? "已收藏" : "收藏"}</button><button type="button" onClick={aO} disabled={!ab}><A_18 size={16}/>投影编辑</button><button type="button" onClick={aH} disabled={!ab}><A_19 size={16}/>导出投影</button></div>{ab && <small role="note" className="block text-[11px] font-medium leading-relaxed text-text-muted">投影下载版本为原投影文件版本</small>}</section><EgComponent buildingId={eH.id} authorName={eH.author.name || null} sourceOpenRequest={sourceOpenRequest} width={eH.width ?? null} height={eH.rawHeight ?? null} depth={eH.depth ?? null} totalBlocks={totalBlocks} layers={aX ?? eH.rawHeight ?? null} steps={a4 ? t9.state.stepCount : stepTeaching?.steps ?? null} source={eH.sourceInfo ?? bg()} projection={projection} materials={eH.materials} onMaterialClick={t9.actions.highlightMaterial} onOpenMaterials={()=>{
        if (!window.matchMedia("(max-width: 767px)").matches) {
            ag("materials");
        }
    }}/></div> : <div className="bdi-learning-stack">{ss && <section className="bdi-complete-card"><strong>搭完了</strong><span>{eH.title} · {String(a7).padStart(3, "0")} {a9}全部完成</span></section>}<section className="bdi-learning-panel" aria-label={`${se}搭建清单`}><div className="bdi-learning-head"><div><span>当前{a9}</span><strong>{String(t9.state.currentIndex + 1).padStart(3, "0")}<small>/{String(a7).padStart(3, "0")}</small></strong></div><button type="button" onClick={()=>aC("preview")}>退出学习</button></div><div className="bdi-learning-progress"><span style={{
        width: `${st}%`
    }}/></div><div className="bdi-learning-progress-copy"><span>{sa ? `最后一${a9}` : `已完成 ${st}%`}</span><b>{sa ? "放完后确认收工" : `剩 ${Math.max(0, a7 - t9.state.currentIndex - 1)} ${a9}`}</b></div>{t9.state.mode === "step" && <div className="bdi-learning-copy"><b>{se}</b><span>{t9.state.stepMeta[t9.state.currentIndex]?.description}</span>{sr}</div>}{t9.state.mode === "layer" && sr && <div className="tv-measure-legend-row">{sr}</div>}<div className="bdi-learning-materials"><div className="bdi-level-heading"><span>{A.e(a9, entityMaterials)}</span><b>{blocks.length + entityMaterials.length} 种</b></div><div className="bdi-level-list"><A.p blocks={blocks} entityMaterials={entityMaterials} empty=<div className="bdi-level-empty">本{a9}材料正在解析</div>/></div><div className="bdi-level-total"><span>本{a9}共</span><b>{a5?.blockCount || 0} 块</b></div></div></section><div className="bdi-learning-actions-wrap">{sa && !ss && <p>这是最后一{a9} · 放完就按下面那颗</p>}<div className="bdi-learning-actions"><button type="button" disabled={t9.state.currentIndex === 0} onClick={()=>t9.actions.previous()}><v.A size={18}/><span>上一{a9}</span></button><button type="button" onClick={aJ}><b>{sn}</b><span>{sl}</span></button></div></div></div>}</aside></div><section className="bd-detail-body"><div data-onboarding="detail-tabs" className="bd-tabs" role="tablist" aria-label="建筑详情"><button type="button" role="tab" aria-selected={tM === "about"} className={tM === "about" ? "on" : ""} onClick={()=>setTM("about")}>{jsx(eo, {
        size: 16
    })}建筑简介</button></div><div className={`bd-tab-panel ${tM === "about" ? "on" : ""}`} role="tabpanel"><div className="bd-about-flat">{a3.map((e, t)=><p key={t}>{e}</p>)}<div className="bd-about-specs"><span>{totalBlocks.toLocaleString()} 方块</span><span>{aX ? `${aX} 层` : "层数解析中"}</span><span>{aY}</span><span>{aQ}</span><span>.litematic</span></div><div className="bd-about-tags">{a2.map((e)=><span key={e} className="bd-pill">{jsx(ec, {
            size: 16
        })}{e}</span>)}</div></div></div></section>{aq.length > 0 && <section className="bd-related"><div className="bd-related-head"><div><p>RELATED BUILDINGS</p><h2>相关推荐</h2></div><_o href="/buildings" className="bd-related-more">查看全部 <ed.A size={16}/></_o></div><div className="bd-related-grid">{aq.map((building)=><A_4 key={building.id} building={building} variant="clean"/>)}</div></section>}</div><N>{eK && <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"><h.P.div initial={{
        opacity: 0
    }} animate={{
        opacity: 1
    }} exit={{
        opacity: 0
    }} onClick={()=>setEK(null)} className="absolute inset-0 bg-bg-primary/80"/><h.P.div initial={{
        opacity: 0,
        scale: 0.9,
        y: 20
    }} animate={{
        opacity: 1,
        scale: 1,
        y: 0
    }} exit={{
        opacity: 0,
        scale: 0.9,
        y: 20
    }} className="relative bg-bg-card border-2 border-black shadow-block max-w-sm w-full p-6 text-center"><div className="w-14 h-14 bg-bg-inset border-2 border-black flex items-center justify-center mx-auto mb-4">{jsx(eu, {
        className: "text-text-muted"
    })}</div><p className="text-sm font-extrabold mb-1">{eK}</p><p className="text-xs text-text-muted mb-4">可以先用逐层学习看懂这座建筑的结构</p><M.$ onClick={()=>setEK(null)} size="sm">我知道了</M.$></h.P.div></div>}</N><C.a open={open} onClose={()=>{
        setOpen(false);
        setTX(null);
    }} title={tG ? "逐层学习完成！" : `已查看全部 ${t9.state.layerCount} 层`} subtitle={tG ? "完成记录已保存到个人中心" : eH.title} icon={tG ? <A_20 size={19}/> : jsx(em, {
        size: 19
    })} iconTone={tG ? "brand" : "warning"} size="sm" className="!max-w-[430px]" footer={tG ? <><C.y variant="ghost" onClick={()=>{
        setOpen(false);
        aS({
            forceRestart: true
        });
    }}><A_15 size={14}/>重新学习</C.y><C.y variant="primary" onClick={()=>eF.push("/buildings")}><X.A size={14}/>返回建筑库</C.y></> : <><C.y variant="ghost" onClick={()=>setOpen(false)} disabled={tW}>继续检查</C.y><C.y variant="primary" onClick={aL} loading={tW} loadingLabel="正在保存完成记录"><A_21 size={14}/>确认已搭建完成</C.y></>}>{tG ? <><p className="text-sm font-bold text-text-secondary">已完成「<b className="text-text-primary">{eH.title}</b>」逐层搭建，可导出投影随时复查。</p><div className="mt-3.5 grid grid-cols-3 gap-0.5 border-2 border-border-hard bg-border-hard">{[
        {
            value: t9.state.layerCount,
            label: "层数"
        },
        {
            value: eN(totalBlocks),
            label: "方块"
        },
        {
            value: length,
            label: "材质"
        }
    ].map((e)=><div key={e.label} className="bg-bg-card px-2 py-2 text-center"><div className="font-pixel text-[19px] leading-[1.15] tabular-nums text-brand-primary">{e.value}</div><div className="mt-0.5 text-[10.5px] font-semibold leading-[1.3] text-text-muted">{e.label}</div></div>)}</div></> : <><p className="text-sm font-bold leading-relaxed text-text-secondary">查看末层<b className="text-text-primary">不会自动记为完成</b>。请在游戏内实际搭建结束后，再回来确认。</p><div className="mt-3 border-2 border-border-hard bg-warning/10 px-3 py-2 text-[11px] font-bold leading-relaxed text-warning">确认后写入学习记录并保存到个人中心，之后仍可随时重新学习。</div>{tX && <p role="alert" className="mt-3 border-2 border-error bg-error/10 px-3 py-2 text-sm font-bold text-error">{tX}</p>}</>}</C.a></div>;
}
export { EAComponent as default };
