import "./module-86897.js";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "./module-61426.js";
import _l from "./module-52619.js";
import { E as E_1 } from "./module-26260.js";
import { K } from "./module-44460_2.js";
import { A as A_1 } from "./module-42688.js";
import { g as g_1 } from "./module-44478.js";
import { ZV } from "./module-432.js";
import { QE, rY } from "./module-72258.js";
import m from "./module-47650.js";
function VComponent({ verified, hasAuthor }) {
    let [l, setL] = useState(false);
    let [s, setS] = useState({
        left: 8,
        top: 8
    });
    let id = useId();
    let dRef = useRef(null);
    let uRef = useRef(null);
    let h = hasAuthor ? verified ? "此处投影署名已按当前作品来源资料核对，不代表身份认证或使用授权。" : "此处名称来自投影文件的作者署名，尚未核实是否为原作者；不代表身份认证或使用授权。" : "当前投影文件没有可展示的作者署名，因此显示“未知作者”，不使用上传者代替。";
    useLayoutEffect(()=>{
        if (!hasAuthor || !l || !dRef.current || !uRef.current) {
            return;
        }
        let e = dRef.current.getBoundingClientRect();
        let t = uRef.current.getBoundingClientRect();
        setS({
            left: Math.max(8, Math.min(e.left, window.innerWidth - t.width - 8)),
            top: Math.max(8, e.top >= t.height + 16 ? e.top - t.height - 8 : Math.min(e.bottom + 8, window.innerHeight - t.height - 8))
        });
    }, [
        l,
        hasAuthor
    ]);
    useEffect(()=>{
        if (!hasAuthor) {
            return void setL(false);
        }
        if (!l) {
            return;
        }
        let e = (e)=>{
            if (!dRef.current?.contains(e.target)) {
                setL(false);
            }
        };
        let t = (e)=>{
            if (e.key === "Escape") {
                setL(false);
            }
        };
        let a = ()=>setL(false);
        document.addEventListener("pointerdown", e);
        document.addEventListener("keydown", t);
        window.addEventListener("resize", a);
        window.addEventListener("scroll", a, true);
        return ()=>{
            document.removeEventListener("pointerdown", e);
            document.removeEventListener("keydown", t);
            window.removeEventListener("resize", a);
            window.removeEventListener("scroll", a, true);
        };
    }, [
        l,
        hasAuthor
    ]);
    if (hasAuthor) {
        return <span ref={dRef} className="discovery-status-wrap" onMouseEnter={()=>setL(true)} onMouseLeave={()=>setL(false)} onBlur={(e)=>{
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setL(false);
            }
        }}><button type="button" className={`discovery-author-status${verified ? " discovery-author-status--verified" : ""}`} aria-expanded={l} aria-describedby={l ? id : undefined} onFocus={()=>setL(true)} onClick={(e)=>{
            if (e.detail === 0) {
                setL((e)=>!e);
            } else {
                setL(true);
            }
        }}>{verified ? "已核实" : "未核实"}</button>{l && m.createPortal(<span ref={uRef} id={id} role="tooltip" className="discovery-author-tooltip" data-discovery-tooltip style={s}>{h}</span>, document.body)}</span>;
    }
    return null;
}
class x {
    setIdentity(e) {
        if (e !== this.identity) {
            this.identity = e;
            this.epoch++;
        }
    }
    capture() {
        return this.epoch;
    }
    current(e) {
        return e === this.epoch;
    }
    invalidate() {
        this.epoch++;
    }
    constructor(){
        this.epoch = 0;
    }
}
function g(createdAt) {
    return !!createdAt && Date.now() - new Date(createdAt).getTime() < 1209600000;
}
let f = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.8-10-9.3C.6 8.3 2.6 4.5 6.4 4.5c2.2 0 3.7 1.2 4.6 2.6.9-1.4 2.4-2.6 4.6-2.6 3.8 0 5.8 3.8 4.4 7.2C19.5 16.2 12 21 12 21z"/></svg>;
function PComponent({ b: b_1 }) {
    let [r, setR] = useState(false);
    let o = {};
    if (b_1.viewBox) {
        o.objectViewBox = b_1.viewBox;
    }
    return <>{b_1.coverImage && <img src={b_1.coverImage} alt={b_1.name} loading="lazy" decoding="async" className={`uc-img-fade${r ? " uc-in" : ""}`} style={o} ref={(e)=>{
        if (e && e.complete && e.naturalWidth > 0) {
            setR(true);
        }
    }} onLoad={()=>setR(true)}/>}{(b_1.official || g(b_1.createdAt)) && <div className="uc-badges">{b_1.official && <span className="uc-officialtag">官方原创</span>}{g(b_1.createdAt) && <span className="uc-newtag">NEW</span>}</div>}{typeof b_1.height === "number" && b_1.height > 0 && <span className="uc-lay">建筑高度 <b>{b_1.height}</b> 格</span>}</>;
}
function B1Component({ b: b_1, className }) {
    return <div className={className}><A_1 name={b_1.projectionAuthor}/><span style={b_1.projectionAuthor ? undefined : {
        color: "var(--color-text-disabled)"
    }}>{b_1.projectionAuthor || "未知作者"}</span>{typeof b_1.blockCount === "number" && b_1.blockCount > 0 && <> · <b>{ZV(b_1.blockCount)}</b> 方块</>}{typeof b_1.learnCount === "number" && b_1.learnCount > 0 && <span className="uc-lc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><b>{ZV(b_1.learnCount)}</b> 在学</span>}</div>;
}
export function A({ building, variant = "clean", onFavoriteToggle, discovery }) {
    let k = g_1(building.difficulty);
    let { on, toggle, busy } = ((building_1, onFavoriteToggle_1, r)=>{
        let { promptLogin } = E_1();
        let [l, setL] = useState(!!building_1.isFavorited);
        let [i, setI] = useState(false);
        let dRef = useRef(new x);
        dRef.current.setIdentity(r);
        useEffect(()=>()=>{
                dRef.current.invalidate();
            }, []);
        useEffect(()=>{
            setL(!!building_1.isFavorited);
        }, [
            building_1.isFavorited
        ]);
        let toggle_1 = useCallback(async (r)=>{
            r.preventDefault();
            r.stopPropagation();
            if (i) {
                return;
            }
            setI(true);
            let n = dRef.current.capture();
            let s = !l;
            setL(s);
            try {
                let r = await fetch(`/api/buildings/${building_1.id}/favorite`, {
                    method: s ? "POST" : "DELETE"
                });
                if (!dRef.current.current(n)) {
                    return;
                }
                if (r.status === 401) {
                    setL(!s);
                    promptLogin({
                        action: "收藏建筑"
                    });
                    return;
                }
                if (!r.ok) {
                    return void setL(!s);
                }
                let l = await r.json().catch(()=>null);
                if (!dRef.current.current(n)) {
                    return;
                }
                let i = l?.success && typeof l?.data?.favorited === "boolean" ? l.data.favorited : s;
                setL(i);
                onFavoriteToggle_1?.(building_1.id, i);
            } catch (e) {
                if (dRef.current.current(n)) {
                    setL(!s);
                }
            } finally{
                if (dRef.current.current(n)) {
                    setI(false);
                }
            }
        }, [
            promptLogin,
            l,
            i,
            building_1.id,
            onFavoriteToggle_1
        ]);
        return {
            on: l,
            toggle: toggle_1,
            busy: i
        };
    })(building, onFavoriteToggle, discovery?.identity);
    let E = building.tintHue ?? (discovery ? Array.from(building.id).reduce((acc, item)=>31 * acc + item.charCodeAt(0) >>> 0, 0) % 360 : null);
    let _ = E != null ? {
        "--uc-tint": `hsl(${E} 9% 11%)`
    } : undefined;
    let href = `/buildings/${building.id}`;
    if (discovery) {
        let { item, filters, onOpen } = discovery;
        let s = ((item_1, filters_1)=>{
            let i = item_1.styles.find((e)=>filters_1.styles.includes(e)) ?? item_1.styles[0];
            let c = item_1.teaching.available && Number.isSafeInteger(item_1.teaching.steps) && (item_1.teaching.steps ?? 0) > 0 && item_1.teaching.href === `/buildings/step-teaching/${item_1.id}`;
            return {
                author: item_1.projectionAuthor?.trim() || "未知作者",
                typeLabel: QE[item_1.primaryType ?? ""] ?? null,
                styleLabel: rY[i] ?? null,
                teachingHref: c ? item_1.teaching.href : null
            };
        })(item, filters);
        let verified = !!item.projectionAuthor?.trim() && (item.sourceStatus === "verified" || item.sourceStatus === "corrected");
        let x = `MC ${item.projectionVersion?.trim() || "未知"}`;
        return <article className="uc-card uc-card--discovery" data-building-id={item.id} style={_}><_l href={href} className="discovery-card-hit" onClick={()=>onOpen(item.id)} aria-label={`查看建筑：${item.name}`}/><div className="discovery-card-main"><div className="uc-pic"><PComponent b={{
            ...building,
            height: null,
            createdAt: null
        }}/><div className="discovery-cover-badges">{item.official && <span className="discovery-cover-label discovery-cover-label--official">官方原创</span>}{item.featured && <span className="discovery-cover-label discovery-cover-label--featured">精选建筑</span>}{s.teachingHref && <_l className="discovery-step-link" href={s.teachingHref} onClick={()=>onOpen(item.id)}>步骤教学 →</_l>}</div>{item.interior === "present" && <span className="discovery-interior"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6M4 9v10h16V9M4 15h16M7 19v3m10-3v3"/></svg>含内饰</span>}<span className="discovery-version discovery-version--cover">{x}</span></div><div className="uc-body"><div className="uc-trow"><h3 className="uc-ttl" title={item.name}>{item.name}</h3><span className="uc-diff"><span className="uc-dot" style={{
            background: item.difficulty ? k.bg : "var(--color-text-disabled)"
        }}/>{item.difficulty ? k.label : "难度待确认"}</span></div><div className="discovery-card-meta"><div className="discovery-author-row"><div className={`uc-auth discovery-author${item.projectionAuthor?.trim() ? "" : " discovery-unknown"}`}><A_1 name={item.projectionAuthor?.trim()}/><span title={s.author}>{s.author}</span></div><VComponent verified={verified} hasAuthor={!!item.projectionAuthor?.trim()}/></div><span className="discovery-version discovery-version--meta">{x}</span></div></div></div><K label={on ? "取消收藏" : "收藏"} size="xs" variant="secondary" className={`uc-fav${on ? " uc-on" : ""}`} onClick={toggle} disabled={busy} aria-pressed={on}>{f}</K></article>;
    }
    if (variant === "immersive") {
        return <_l href={href} className="uc-card uc-card--immersive" style={_}><div className="uc-pic"><PComponent b={building}/></div><div className="uc-imm-bar"><div className="uc-trow"><div className="uc-ttl">{building.name}<span className="uc-arr">→</span></div><span className="uc-diff"><span className="uc-dot" style={{
            background: k.bg
        }}/>{k.label}</span></div><B1Component b={building} className="uc-imm-more"/></div></_l>;
    }
    return <article className="uc-card" style={_}><_l href={href} className="uc-card-link"><div className="uc-pic"><PComponent b={building}/></div><div className="uc-body"><div className="uc-trow"><div className="uc-ttl">{building.name}<span className="uc-arr">→</span></div><span className="uc-diff"><span className="uc-dot" style={{
        background: k.bg
    }}/>{k.label}</span></div><B1Component b={building} className="uc-auth"/></div></_l><K label={on ? "取消收藏" : "收藏"} size="xs" variant="secondary" className={`uc-fav${on ? " uc-on" : ""}`} onClick={toggle} disabled={busy} aria-pressed={on}>{f}</K></article>;
}
