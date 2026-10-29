import { jsx } from "./module-86897.js";
import { useEffect, useRef, useState } from "./module-61426.js";
import _i from "./module-52619.js";
import { A } from "./module-30313_4.js";
import { A as A_1 } from "./module-99099_4.js";
import { DN } from "./module-75377_3.js";
import { MP } from "./module-98901_5.js";
import { Z3 } from "./module-13160.js";
let r = A("outline", "arrows-horizontal", "ArrowsHorizontal", [
    [
        "path",
        {
            d: "M7 8l-4 4l4 4",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M17 8l4 4l-4 4",
            key: "svg-1"
        }
    ],
    [
        "path",
        {
            d: "M3 12l18 0",
            key: "svg-2"
        }
    ]
]);
function h(e, t) {
    if (e.stepDataUrl && t) {
        return `${t.steps} 步 · ${t.subChapters > 0 ? `${t.subChapters} 子章` : `${t.chapters.length} 章`}`;
    }
    return "步骤整理中";
}
function PComponent({ cards, total, plans }) {
    let i;
    let gRef = useRef(null);
    let bRef = useRef(null);
    let vRef = useRef(null);
    let wRef = useRef(null);
    let xRef = useRef(null);
    let jRef = useRef(null);
    let [y, setY] = useState(0);
    let [k, setK] = useState({});
    let A = cards[y];
    let C = A ? plans[A.id] : null;
    let M = k[y] ?? "loading";
    useEffect(()=>{
        let bRef_current = bRef.current;
        let gRef_current = gRef.current;
        if (!bRef_current || !gRef_current || !cards.length) {
            return;
        }
        let a = true;
        let s = window.matchMedia("(max-width: 1023px)");
        let matches = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let margin = (e, n)=>{
            if (s.matches) {
                return {
                    l: 16,
                    r: 16,
                    t: 12,
                    b: 44
                };
            }
            let a = gRef_current.getBoundingClientRect();
            let i = vRef.current ? vRef.current.getBoundingClientRect().right - a.left : 0.42 * e;
            let r_1 = Math.max(0.04 * e, 0.045 * e);
            let wRef_current = wRef.current;
            let xRef_current = xRef.current;
            let t = wRef_current && wRef_current.offsetParent !== null ? wRef_current.getBoundingClientRect().bottom - a.top + 26 : 0.03 * n;
            let b = xRef_current && xRef_current.offsetParent !== null ? a.bottom - xRef_current.getBoundingClientRect().top + 26 : 0.05 * n;
            return {
                l: Math.max(i + 10, e - r_1 - (n - t - b) * 1.35),
                r: r_1,
                t,
                b
            };
        };
        import("./module-72750.js").then(({ createStage })=>{
            if (!a) {
                return;
            }
            let s = createStage(bRef_current, cards.map((e)=>({
                    modelKey: e.modelKey,
                    stepDataUrl: e.stepDataUrl,
                    startAt: e.startAt,
                    yaw: e.yaw
                })), {
                fill: 0.76,
                margin,
                modelBase: "/step-teaching/models/",
                reduceMotion: matches,
                onLoadState: (e, t)=>{
                    if (a) {
                        setK((n)=>({
                                ...n,
                                [e]: t
                            }));
                    }
                }
            });
            jRef.current = s;
            s.goTo(0);
        }).catch((e)=>{
            console.error("[StepLandingHero] engine import failed:", e);
            if (a) {
                setK((e)=>({
                        ...e,
                        0: "error"
                    }));
            }
        });
        let r = ()=>jRef.current?.resize();
        s.addEventListener("change", r);
        let c = true;
        let o = ()=>jRef.current?.setRunning(c && document.visibilityState === "visible");
        let d = new IntersectionObserver((e)=>{
            c = e.some((e)=>e.isIntersecting);
            o();
        });
        d.observe(gRef_current);
        document.addEventListener("visibilitychange", o);
        return ()=>{
            a = false;
            s.removeEventListener("change", r);
            d.disconnect();
            document.removeEventListener("visibilitychange", o);
            jRef.current?.dispose();
            jRef.current = null;
        };
    }, []);
    useEffect(()=>{
        jRef.current?.goTo(y);
    }, [
        y
    ]);
    useEffect(()=>{
        let e = (e)=>{
            let s = e.target?.closest?.("a.stl-pick");
            if (!(s instanceof HTMLAnchorElement)) {
                return;
            }
            let i = s.pathname.match(/^\/buildings\/(step-teaching\/)?([^/]+)$/);
            MP("step_landing_start", {
                buildingId: i?.[2] ?? null,
                from: "pick",
                ready: !!i?.[1]
            });
        };
        document.addEventListener("click", e, true);
        return ()=>document.removeEventListener("click", e, true);
    }, []);
    let cards_length = cards.length;
    let U = A && (i = A).width && i.height && i.depth ? `${i.width} × ${i.height} × ${i.depth}` : null;
    let href = A ? A.stepDataUrl ? `/buildings/step-teaching/${A.id}` : `/buildings/${A.id}` : "/buildings";
    return <section className="stl-theater" id="theater"><div className="stl-stage" ref={gRef}><div className="stl-scene-ambient" aria-hidden/><canvas className="stl-gl" ref={bRef} aria-label={A ? `${A.name} 的 3D 模型，正在一步一步搭建，可以按住左右拖动旋转` : undefined}/>{cards_length > 0 && M !== "ready" && <div className="stl-loading" role="status">{M === "error" ? "3D 模型没能载入" : "载入 3D 模型"}</div>}{A && <><div className="stl-band stl-band-top" ref={wRef}><div className="stl-binfo" aria-live="polite"><span className="stl-binfo-k">正在演示</span><b>{A.name}</b></div></div><div className="stl-band stl-band-bot" ref={xRef}><div className="stl-binfo"><em><b>{A.blockCount.toLocaleString()}</b> 方块{U && <> · {U} 格</>} · {h(A, C)}</em></div><span className="stl-drag-hint">{jsx(r, {
        size: 14,
        stroke: 2.4,
        "aria-hidden": true
    })}按住左右拖，可以转</span></div></>}</div><div className="stl-col" ref={vRef}><nav className="stl-crumb" aria-label="面包屑"><_i href="/buildings">建筑库</_i><i aria-hidden>/</i><b>步骤教学</b></nav><div className="stl-ey">3D 步骤教学{total > 0 && ` · ${total} 座建筑可体验`}</div><h1 className="stl-h1">按照模型步骤，<br/><span className="stl-h1-accent">一步一步</span>搭</h1><p className="stl-sub">这里先看演示：一座房子怎么按步骤自己搭起来。想自己动手，点进去就是完整的步骤教学。</p><div className="stl-cta-row"><_i className={`stl-btn${A && !A.stepDataUrl ? " is-soon" : ""}`} href={href} onClick={()=>{
        if (A) {
            MP("step_landing_start", {
                buildingId: A.id,
                from: "hero",
                ready: !!A.stepDataUrl
            });
        }
    }}>{A && !A.stepDataUrl ? "先看看这座建筑 →" : "进入这座的步骤教学 →"}</_i><a className="stl-btn stl-btn-ghost" href="#feedback">你觉得如何，告诉我们</a></div><div className="stl-perks"><span>免登录</span><span>全部免费</span><span>进度存在浏览器里</span></div>{cards_length > 0 && <div className="stl-hpicks"><div className="stl-hpicks-lb">{cards_length === 1 ? "当前演示" : "选一座看演示"}</div><div className="stl-cards">{cards.map((e, to)=><button key={e.id} type="button" className={`stl-card${to === y ? " is-on" : ""}`} aria-pressed={to === y} title={`${e.name} · ${e.blockCount.toLocaleString()} 方块`} onClick={()=>{
            if (to !== y) {
                MP("step_landing_switch", {
                    buildingId: e.id,
                    to
                });
            }
            setY(to);
        }}><span className="stl-card-pic" style={{
            "--uc-tint": `hsl(${DN(e.id)} 9% 11%)`
        }}><img src={Z3(e)} alt="" loading="lazy" decoding="async"/><b className="stl-card-no">{String(to + 1).padStart(2, "0")}</b></span><span className="stl-card-cap"><b>{e.short}</b><i className={e.stepDataUrl ? "is-ok" : undefined}>{h(e, plans[e.id])}</i></span></button>)}{total > cards_length ? <a className="stl-card stl-card-more" href="#pick"><span className="stl-card-pic"><svg className="stl-card-directory" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></span><span className="stl-card-cap"><b>更多教学建筑</b><i>查看全部 {total} 座 ↓</i></span></a> : <div className="stl-card stl-card-more" aria-disabled="true"><span className="stl-card-pic"><span className="stl-card-plus" aria-hidden>+</span></span><span className="stl-card-cap"><b>更多教学建筑</b><i>内容正在规划中</i></span></div>}</div></div>}</div><a className="stl-cue" href="#how" aria-label="向下浏览"><A_1 size={20} stroke={2} aria-hidden/></a></section>;
}
export { PComponent as default };
