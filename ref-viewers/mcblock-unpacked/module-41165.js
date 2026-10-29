import "./module-86897.js";
import { useCallback, useMemo, useRef } from "./module-61426.js";
import _n from "./module-52619.js";
import { d } from "./module-16010_5.js";
import { MP } from "./module-98901_6.js";
import { A as A_1 } from "./module-22868.js";
import { ButtonLink } from "./module-33159_4.js";
import { hR } from "./module-75377_4.js";
import { A as A_2 } from "./module-64991_7.js";
import { A as A_3 } from "./module-33186_3.js";
import { A as A_4 } from "./module-79350_3.js";
import { A as A_5 } from "./module-35440_2.js";
import { A as A_6 } from "./module-92982.js";
import { A as A_7 } from "./module-73610_3.js";
import { A as A_8 } from "./module-1730.js";
import { A as A_9 } from "./module-99099_5.js";
import { A as A_10 } from "./module-15532_2.js";
import { A as A_11 } from "./module-95585_3.js";
const h = require(44460);
let icon = require(30313).A("outline", "lock-open", "LockOpen", [
    [
        "path",
        {
            d: "M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -6",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
            key: "svg-1"
        }
    ],
    [
        "path",
        {
            d: "M8 11v-5a4 4 0 0 1 8 0",
            key: "svg-2"
        }
    ]
]);
const b = require(68595);
let A = [
    {
        img: "/images/icons/Cube_4.png",
        s: 86,
        depth: 1.4,
        d: "6s",
        delay: "-1s",
        pos: {
            left: "7%",
            top: "14%"
        }
    },
    {
        img: "/images/icons/Cube_6.png",
        s: 66,
        depth: 1,
        d: "5s",
        delay: "-2.5s",
        pos: {
            left: "12%",
            top: "53%"
        }
    },
    {
        img: "/images/icons/Cube_2.png",
        s: 60,
        depth: 0.9,
        d: "4.5s",
        delay: "-0.5s",
        pos: {
            left: "17%",
            bottom: "13%"
        }
    },
    {
        img: "/images/icons/Cube_7.png",
        s: 46,
        depth: 0.6,
        d: "5.5s",
        delay: "-3s",
        pos: {
            left: "22%",
            top: "17%"
        }
    },
    {
        img: "/images/icons/Cube_1.png",
        s: 90,
        depth: 1.5,
        d: "6.5s",
        delay: "-1.8s",
        pos: {
            right: "8%",
            top: "14%"
        }
    },
    {
        img: "/images/icons/Cube_5.png",
        s: 64,
        depth: 1,
        d: "5s",
        delay: "-0.8s",
        pos: {
            right: "13%",
            top: "51%"
        }
    },
    {
        img: "/images/icons/Cube_3.png",
        s: 74,
        depth: 1.2,
        d: "5.8s",
        delay: "-2.2s",
        pos: {
            right: "17%",
            bottom: "15%"
        }
    },
    {
        img: "/images/icons/Cube_2.png",
        s: 44,
        depth: 0.6,
        d: "4.8s",
        delay: "-1.2s",
        pos: {
            right: "29%",
            top: "11%"
        }
    }
];
let N = [
    {
        no: "01",
        href: "/buildings",
        art: "/images/features/buildings.webp",
        icon: A_2,
        title: "建筑库",
        desc: "每座建筑都有 3D 逐层教学，标注方块位置与数量，零基础也能跟着搭出一整座。",
        cta: "探索建筑库"
    },
    {
        no: "02",
        href: "/studio",
        art: "/images/features/studio.webp",
        icon: A_3,
        title: "投影编辑",
        desc: "投影编辑器支持在浏览器里查看投影、替换材质、整理选区，并导出投影辅助还原。",
        cta: "打开编辑器"
    },
    {
        no: "03",
        href: "/wallpapers",
        art: "/images/features/wallpapers.webp",
        icon: A_4,
        title: "壁纸站",
        desc: "高清 2K 分辨率，手机与桌面全设备适配，动态壁纸一键设为桌面。",
        cta: "浏览壁纸"
    },
    {
        no: "04",
        href: "/blender",
        art: "/images/features/blender.webp",
        icon: A_5,
        title: "Mine2Blend",
        desc: "Blender 一键导入投影（含 .litematic / .schem），自动映射材质、保留分层出图。",
        cta: "了解 Mine2Blend"
    }
];
let C = [
    {
        icon,
        title: "全部免费",
        desc: "建筑库、投影编辑器、壁纸站与 Mine2Blend 四个公开板块，不设付费门槛。"
    },
    {
        icon: A_6,
        title: "一键导出投影",
        desc: "编辑完直接导出 .litematic / .schem，进游戏照着搭。"
    },
    {
        icon: A_7,
        title: "逐层教学",
        desc: "每座建筑拆解到层，新手也能跟着一层层还原。"
    },
    {
        icon: A_8,
        title: "Blender 一键导入",
        desc: "Mine2Blend 把投影搬进渲染管线，出渲染大片。"
    }
];
function B(e) {
    if (e >= 10) {
        return `${10 * Math.floor(e / 10)}+`;
    }
    return `${e}`;
}
function SComponent({ featured, stats }) {
    let nRef = useRef(null);
    let onMouseMove = useCallback((e)=>{
        let nRef_current = nRef.current;
        if (!nRef_current) {
            return;
        }
        let s = nRef_current.getBoundingClientRect();
        let a = (e.clientX - s.left) / s.width - 0.5;
        let i = (e.clientY - s.top) / s.height - 0.5;
        nRef_current.style.setProperty("--mx", `${(e.clientX - s.left).toFixed(1)}px`);
        nRef_current.style.setProperty("--my", `${(e.clientY - s.top).toFixed(1)}px`);
        let l = nRef_current.querySelector(".hero-bg");
        if (l) {
            l.style.transform = `translate(${(-(20 * a)).toFixed(1)}px, ${(-(16 * i)).toFixed(1)}px)`;
        }
        nRef_current.querySelectorAll(".hero-cube").forEach((e)=>{
            let t = parseFloat(e.dataset.depth || "1") || 1;
            e.style.transform = `translate(${(-a * t * 46).toFixed(1)}px, ${(-i * t * 34).toFixed(1)}px)`;
            let s = e.querySelector("img");
            if (s) {
                s.style.setProperty("--sx", `${(5 + a * t * 13).toFixed(1)}px`);
                s.style.setProperty("--sy", `${(8 + i * t * 10).toFixed(1)}px`);
            }
        });
    }, []);
    let onMouseLeave = useCallback(()=>{
        let nRef_current = nRef.current;
        if (!nRef_current) {
            return;
        }
        let t = nRef_current.querySelector(".hero-bg");
        if (t) {
            t.style.transform = "";
        }
        nRef_current.querySelectorAll(".hero-cube").forEach((e)=>{
            e.style.transform = "";
            let t = e.querySelector("img");
            if (t) {
                t.style.removeProperty("--sx");
                t.style.removeProperty("--sy");
            }
        });
    }, []);
    let f = useMemo(()=>hR(featured), [
        featured
    ]);
    let xRef = useRef(null);
    let j = useCallback((e)=>{
        let xRef_current = xRef.current;
        if (!xRef_current) {
            return;
        }
        let s = xRef_current.querySelector(".uc-card");
        let a = s ? s.offsetWidth + 18 : 300;
        xRef_current.scrollBy({
            left: e * a,
            behavior: "smooth"
        });
    }, []);
    return <div className="mcb-home"><section className="hero" ref={nRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}><div className="hero-bg"/><div className="hero-spot"/><div className="hero-blocks">{A.map((e, key)=><span key={key} className="hero-cube" data-depth={e.depth} style={{
            "--s": `${e.s}px`,
            ...e.pos
        }}><img src={d(e.img)} alt="" loading="lazy" decoding="async" style={{
            "--d": e.d,
            animationDelay: e.delay
        }}/></span>)}</div><div className="hero-center"><_n className="eyebrow-chip" href="/buildings/step-teaching" onClick={()=>MP("step_entry_link", {
            from: "home_hero"
        })}><span className="sq"/>新上线 · 3D 步骤教学<b.A aria-hidden/></_n><h1>你的 <span className="accent">Minecraft</span> 建筑<br/>从这里开始</h1><p className="hero-sub">免费 3D 逐层建筑教学，零基础也能跟着搭出一整座建筑；投影编辑器支持换材质、看投影、导出辅助方案，高清壁纸一键下载，Mine2Blend 可把投影带入 Blender 创作流程。</p><div className="hero-cta"><ButtonLink size="xl" variant="primary" href="/buildings"><A_2/>探索建筑库</ButtonLink><ButtonLink size="xl" variant="secondary" href="/wallpapers"><A_4/>浏览高清壁纸</ButtonLink><ButtonLink size="xl" variant="secondary" href="/studio"><A_3/>打开编辑器</ButtonLink></div></div><ButtonLink className="hero-scroll !overflow-visible" size="icon" variant="secondary" href="#explore" aria-label="向下浏览"><A_9/></ButtonLink></section><section className="caps wrap" id="explore"><div className="caps-intro"><div className="eyebrow">四大板块 · 创作流程</div><h2 className="section-title">四大板块，串起 Minecraft 建筑创作流程</h2><p>从建筑库发现作品，用投影编辑器调整投影，在壁纸站获取视觉素材，并通过 Mine2Blend 把投影带入 Blender 创作。</p></div><div className="caps-grid">{N.map((e)=><_n key={e.no} className="cap has-art" href={e.href}><span className="cap-no">{e.no}</span><img className="cap-art" src={d(e.art)} alt="" loading="lazy" decoding="async"/><div className="cap-ico"><e.icon size={16}/></div><h3>{e.title}</h3><p>{e.desc}</p><span className="cap-go">{e.cta} <b.A size={16}/></span></_n>)}</div></section>{f.length > 0 && <section className="gallery wrap" id="featured-buildings"><div className="gallery-head"><div><div className="eyebrow">展墙 · Featured</div><h2 className="section-title" style={{
        marginTop: "10px"
    }}>精选建筑</h2><p style={{
        color: "var(--text-muted)",
        fontSize: "15px",
        marginTop: "8px"
    }}>从建筑库挑出的灵感与学习佳作</p></div><div className="gallery-actions"><div className="gallery-nav"><h.K className="gallery-arrow" size="md" variant="secondary" onClick={()=>j(-1)} label="向左滚动"><A_10/></h.K><h.K className="gallery-arrow" size="md" variant="secondary" onClick={()=>j(1)} label="向右滚动"><A_11/></h.K></div><_n className="more" href="/buildings">查看全部建筑 <b.A size={16}/></_n></div></div><div className="gallery-track" ref={xRef}>{f.map((building, t)=><div key={building.id} className="gallery-card"><span className="gallery-rank" aria-hidden="true">精选 {String(t + 1).padStart(2, "0")}</span><A_1 building={building} variant="immersive"/></div>)}</div></section>}<section className="highlights wrap"><div className="caps-intro" style={{
        textAlign: "left",
        marginBottom: "26px"
    }}><div className="eyebrow">为什么选 MCBlock</div><h2 className="section-title" style={{
        marginTop: "10px"
    }}>平台亮点</h2></div><div className="hl-grid">{C.map((e)=><div key={e.title} className="hl"><div className="hl-ico"><e.icon size={16}/></div><h4>{e.title}</h4><p>{e.desc}</p></div>)}</div></section><section className="wrap zone" id="start-creating"><div className="cta-band"><div className="cta-tx"><div className="cta-kicker">发现 · 学习 · 创作</div><h2>MC 建筑，不止于你的存档</h2><p>免费教学、投影编辑器、壁纸站与 Mine2Blend，从今天开始把脑中的建筑搭出来。</p><div className="hero-cta"><ButtonLink size="xl" variant="primary" href="/buildings"><A_2/>探索建筑库</ButtonLink><ButtonLink size="xl" variant="secondary" href="/wallpapers"><A_4/>浏览高清壁纸</ButtonLink></div><div className="cta-stats"><span className="cta-stat"><b>{B(stats.buildings)}</b> 座建筑</span><span className="cta-stat"><b>{B(stats.wallpapers)}</b> 张壁纸</span><span className="cta-stat"><b>{B(stats.downloads)}</b> 次下载</span></div></div><div className="cta-pic"><img src={d("/images/cta-bg-forest.webp")} alt="" loading="lazy" decoding="async"/><span className="cta-credit">建筑库 · 实景渲染</span></div></div></section></div>;
}
export { SComponent as default };
