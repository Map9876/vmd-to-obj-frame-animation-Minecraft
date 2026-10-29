import { jsx } from "./module-86897.js";
import _r from "./module-52619.js";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "./module-61426.js";
import { MP } from "./module-98901_4.js";
import { Tg, _p, tL } from "./module-11428.js";
import { A as A_1 } from "./module-7063.js";
import { A as A_2 } from "./module-73768_2.js";
import { A as A_3 } from "./module-41871.js";
import { A as A_4 } from "./module-30338.js";
import { A as A_5 } from "./module-34028.js";
import { A as A_6 } from "./module-99099_3.js";
import { A as A_7 } from "./module-2186.js";
import { A as A_8 } from "./module-55418_2.js";
import { A as A_9 } from "./module-10080.js";
import { A as A_10 } from "./module-38582_2.js";
import { A as A_11 } from "./module-29476.js";
import { A as A_12 } from "./module-22868.js";
import * as O from "./module-14938.js";
import { useSession } from "./module-36489.js";
import { Dl, Gv, Ke, P3, QE, bb, hv, mX, rY } from "./module-72258.js";
import { DiscoveryFilterBar } from "./module-13003_2.js";
import { tk } from "./module-91707.js";
import "./module-53039_2.js";
import "./module-52605_2.js";
import "./module-51551_2.js";
import { ZV } from "./module-432.js";
let media = "(max-width: 560px)";
function D1Component({ demo }) {
    let rRef = useRef(null);
    let dRef = useRef(null);
    let [u, setU] = useState(false);
    let [p, setP] = useState(()=>({
            idx: demo?.startAt ?? 0,
            chapter: demo?.startLabel ?? ""
        }));
    useEffect(()=>{
        let dRef_current = dRef.current;
        let rRef_current = rRef.current;
        if (!demo || !dRef_current || !rRef_current) {
            return;
        }
        let n = window.matchMedia(media);
        let a = window.matchMedia("(hover: none) and (pointer: coarse)");
        let navigator_connection = navigator.connection;
        if (n.matches || a.matches || navigator_connection?.saveData || typeof Worker === "undefined") {
            return;
        }
        let u = true;
        let p = true;
        let v = null;
        let g = ()=>v?.setRunning(u && p && !n.matches && document.visibilityState === "visible");
        let f = ()=>{
            if (u) {
                import("./module-915.js").then(({ createEntryStage })=>{
                    if (u) {
                        v = createEntryStage(dRef_current, {
                            reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
                            margin: ()=>_p,
                            onStep: (e)=>{
                                if (u) {
                                    setP({
                                        idx: e.idx,
                                        chapter: e.chapter
                                    });
                                }
                            },
                            onReady: ()=>{
                                if (u) {
                                    setU(true);
                                }
                            },
                            onError: (e)=>console.error("[StepTeachingEntry] 3D 没能载入，停在静态首帧：", e)
                        });
                        g();
                    }
                }).catch((e)=>console.error("[StepTeachingEntry] engine import failed:", e));
            }
        };
        let y = 0;
        let b = 0;
        let x = ()=>{
            if (typeof window.requestIdleCallback === "function") {
                y = window.requestIdleCallback(f, {
                    timeout: 2500
                });
            } else {
                b = window.setTimeout(f, 1200);
            }
        };
        if (document.readyState === "complete") {
            x();
        } else {
            window.addEventListener("load", x, {
                once: true
            });
        }
        let w = new IntersectionObserver((e)=>{
            p = e.some((e)=>e.isIntersecting);
            g();
        });
        w.observe(rRef_current);
        document.addEventListener("visibilitychange", g);
        n.addEventListener("change", g);
        return ()=>{
            u = false;
            window.removeEventListener("load", x);
            if (y && typeof window.cancelIdleCallback === "function") {
                window.cancelIdleCallback(y);
            }
            if (b) {
                window.clearTimeout(b);
            }
            w.disconnect();
            document.removeEventListener("visibilitychange", g);
            n.removeEventListener("change", g);
            v?.dispose();
            v = null;
        };
    }, [
        demo
    ]);
    return <div className="stb-slot" ref={rRef} data-live={u ? "" : undefined}><_r href="/buildings/step-teaching" className="stb-link" aria-label="体验 3D 步骤教学" onClick={()=>MP("step_entry_card", {
            from: "buildings_hero",
            step: p.idx,
            live: u
        })}><span className="stb-stage" aria-hidden><picture><source media={media} srcSet={Tg.posters.mobile}/><source media="(prefers-reduced-motion: reduce)" srcSet={Tg.posters.still}/><img className="stb-poster" src={Tg.posters.sway} alt="" decoding="async"/></picture><canvas className="stb-gl" ref={dRef}/></span>{demo && <span className="stb-stat" aria-hidden><span className="stb-row"><span className="stb-k">正在演示 <b>{demo.name}</b></span><span className="stb-num"><em>{p.chapter}</em><b>{String(Math.max(0, p.idx)).padStart(3, "0")}</b><i>/ {demo.total} 步</i></span></span><span className="stb-bar">{demo.segments.map((e)=><span key={e.from} className="stb-seg" style={{
            flexGrow: e.to - e.from + 1
        }} title={e.name}><span className="stb-fill" style={{
            width: `${(100 * tL(e, p.idx)).toFixed(2)}%`
        }}/></span>)}</span></span>}<span className="stb-card"><span className="stb-bd"><span className="stb-ey">3D 步骤教学</span><span className="stb-h"><span>对着 3D 模型，</span><span>一步一步搭</span></span><span className="stb-d">只亮这一步要放的方块，看不清就转个角度。</span><span className="stb-acts"><span className="stb-btn">体验 3D 步骤教学 →</span><span className="stb-pk">官方原创 · 投影作者：{Tg.projectionAuthor}</span></span></span></span></_r></div>;
}
const v = require(30313);
let g = v.A("outline", "versions", "Versions", [
    [
        "path",
        {
            d: "M10 7a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -10",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M7 7l0 10",
            key: "svg-1"
        }
    ],
    [
        "path",
        {
            d: "M4 8l0 8",
            key: "svg-2"
        }
    ]
]);
const f = require(64991);
let b = v.A("outline", "arrows-sort", "ArrowsSort", [
    [
        "path",
        {
            d: "M3 9l4 -4l4 4m-4 -4v14",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M21 15l-4 4l-4 -4m4 4v-14",
            key: "svg-1"
        }
    ]
]);
const w = require(77252);
let N = v.A("outline", "armchair", "Armchair", [
    [
        "path",
        {
            d: "M5 11a2 2 0 0 1 2 2v2h10v-2a2 2 0 1 1 4 0v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2",
            key: "svg-0"
        }
    ],
    [
        "path",
        {
            d: "M5 11v-5a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v5",
            key: "svg-1"
        }
    ],
    [
        "path",
        {
            d: "M6 19v2",
            key: "svg-2"
        }
    ],
    [
        "path",
        {
            d: "M18 19v2",
            key: "svg-3"
        }
    ]
]);
const E = require(97003);
const A = require(44460);
const T = require(24048);
async function q(e, signal) {
    let i = await fetch(`/api/buildings/discovery?${e.toString()}`, {
        signal,
        cache: "no-store",
        credentials: "same-origin"
    });
    let r = await i.json();
    if (!i.ok || !r.success) {
        throw new P3(r.error ?? "建筑列表加载失败", i.status, r.code);
    }
    return r.data;
}
class _ {
    emit(e) {
        this.state = {
            ...this.state,
            ...e
        };
        this.listeners.forEach((e)=>e());
    }
    begin() {
        this.abort?.abort();
        this.abort = new AbortController;
        let seq = ++this.sequence;
        this.emit({
            busy: true,
            error: ""
        });
        return {
            seq,
            signal: this.abort.signal
        };
    }
    cancel() {
        this.sequence++;
        this.abort?.abort();
        this.emit({
            busy: false
        });
    }
    setIdentity(e) {
        let t;
        if (this.identity !== e) {
            this.identity = e;
            this.identityEpoch++;
            this.sequence++;
            if ((t = this.abort) != null) {
                t.abort();
            }
            this.emit({
                busy: false,
                data: {
                    ...this.state.data,
                    items: this.state.data.items.map((e)=>({
                            ...e,
                            isFavorited: false
                        }))
                }
            });
        }
    }
    favoriteToken() {
        return {
            identity: this.identity,
            epoch: this.identityEpoch
        };
    }
    favorite(e, isFavorited, s = this.favoriteToken()) {
        if (s.identity === this.identity && s.epoch === this.identityEpoch) {
            this.emit({
                data: {
                    ...this.state.data,
                    items: this.state.data.items.map((s)=>{
                        if (s.id === e) {
                            return {
                                ...s,
                                isFavorited
                            };
                        }
                        return s;
                    })
                }
            });
        }
    }
    async changeFilters(e) {
        let filters = hv(e);
        this.restoreCount = 0;
        this.emit({
            data: {
                ...this.state.data,
                filters,
                items: [],
                total: 0,
                snapshot: null,
                bootstrap: null,
                nextCursor: null
            },
            stale: false,
            notice: ""
        });
        await this.refresh(40);
    }
    async refresh(e = 40) {
        let t = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
        e = Math.max(1, Number.isSafeInteger(e) ? e : 40, this.restoreCount);
        let data = this.state.data;
        let { seq, signal } = this.begin();
        try {
            let n;
            let a = new URLSearchParams(bb(data.filters).slice(1));
            if (t && data.snapshot && data.snapshot.expiresAt > Date.now()) {
                a.set("snapshot", data.snapshot.id);
            } else if (!this.state.stale && data.bootstrap && data.bootstrap.asOf + 900000 > Date.now()) {
                a.set("asOf", String(data.bootstrap.asOf));
                a.set("version", data.bootstrap.version);
            }
            let l = [];
            let o = new Map;
            while(true){
                a.set("limit", String(Math.min(40, e - l.length)));
                n = await this.fetcher(a, signal);
                if (seq !== this.sequence) {
                    return;
                }
                let t = new Set(l.map((e)=>e.id));
                l.push(...n.items.filter((e)=>!t.has(e.id)));
                o.set(l.length, n.nextCursor);
                if (l.length >= e || n.nextCursor === null || !n.snapshot) {
                    break;
                }
                a.delete("asOf");
                a.delete("version");
                a.set("snapshot", n.snapshot.id);
                a.set("cursor", String(n.nextCursor));
            }
            let c = data.bootstrap && JSON.stringify(data.bootstrap.ids) !== JSON.stringify(l.slice(0, 40).map((e)=>e.id));
            this.checkpoints = o;
            this.restoreCount = 0;
            this.emit({
                data: {
                    ...n,
                    items: l
                },
                stale: false,
                notice: c ? "建筑列表已更新" : "",
                error: ""
            });
        } catch (error) {
            if (seq !== this.sequence || signal.aborted) {
                return;
            }
            error instanceof P3;
            let e = error.status;
            this.emit({
                error: error.message || "建筑列表加载失败",
                stale: e === 410 || e === 409,
                notice: e === 410 || e === 409 ? "浏览位置已保留，请刷新列表" : this.state.notice
            });
        } finally{
            if (seq === this.sequence) {
                this.emit({
                    busy: false
                });
            }
        }
    }
    async loadMore() {
        if (this.state.busy || this.state.data.nextCursor === null) {
            return;
        }
        let data = this.state.data;
        if (!data.snapshot || data.snapshot.expiresAt <= Date.now()) {
            return void this.emit({
                stale: true,
                notice: "浏览位置已保留，请刷新列表"
            });
        }
        let { seq, signal } = this.begin();
        try {
            let i = new URLSearchParams(bb(data.filters).slice(1));
            i.set("snapshot", data.snapshot.id);
            i.set("cursor", String(data.nextCursor));
            i.set("limit", String(40));
            let r = await this.fetcher(i, signal);
            if (seq !== this.sequence) {
                return;
            }
            let n = new Set(data.items.map((e)=>e.id));
            let a = [
                ...data.items,
                ...r.items.filter((e)=>!n.has(e.id))
            ];
            this.checkpoints.set(a.length, r.nextCursor);
            this.emit({
                data: {
                    ...r,
                    items: a
                }
            });
        } catch (error) {
            if (seq !== this.sequence || signal.aborted) {
                return;
            }
            this.emit({
                error: error.message || "加载失败",
                stale: error.status === 410 || error.status === 409
            });
        } finally{
            if (seq === this.sequence) {
                this.emit({
                    busy: false
                });
            }
        }
    }
    persisted() {
        let e = this.state.data.items.length > 300 ? Math.max(0, ...[
            ...this.checkpoints.keys()
        ].filter((e)=>e <= 300)) : this.state.data.items.length;
        return {
            loadedCount: Math.max(this.restoreCount, this.state.data.items.length),
            data: {
                ...this.state.data,
                items: this.state.data.items.slice(0, e).map((e)=>({
                        ...e,
                        isFavorited: false
                    })),
                nextCursor: this.checkpoints.has(e) ? this.checkpoints.get(e) : this.state.data.nextCursor
            }
        };
    }
    restore(e, t) {
        try {
            if (!e?.data || !Array.isArray(e.data.items) || e.data.items.length > 300 || e.data.items.some((e)=>!e || typeof e.id !== "string") || bb(hv(e.data.filters)) !== bb(t)) {
                return false;
            }
            this.restoreCount = typeof e.loadedCount === "number" && Number.isSafeInteger(e.loadedCount) && e.loadedCount >= e.data.items.length && e.loadedCount <= e.data.total ? e.loadedCount : e.data.items.length;
            if (e.data.snapshot && e.data.snapshot.id === this.state.data.snapshot?.id && this.state.data.items.length > e.data.items.length) {
                return true;
            }
            this.checkpoints = new Map([
                [
                    e.data.items.length,
                    e.data.nextCursor
                ]
            ]);
            this.emit({
                data: {
                    ...e.data,
                    filters: hv(e.data.filters),
                    items: e.data.items.map((e)=>({
                            ...e,
                            isFavorited: false
                        }))
                },
                stale: !!e.data.snapshot && e.data.snapshot.expiresAt <= Date.now()
            });
            return true;
        } catch (e) {
            return false;
        }
    }
    constructor(e, t = q){
        this.fetcher = t;
        this.listeners = new Set;
        this.sequence = 0;
        this.abort = null;
        this.checkpoints = new Map;
        this.restoreCount = 0;
        this.identity = "unresolved";
        this.identityEpoch = 0;
        this.getSnapshot = ()=>this.state;
        this.subscribe = (e)=>{
            this.listeners.add(e);
            return ()=>{
                this.listeners.delete(e);
            };
        };
        this.state = {
            data: e,
            busy: false,
            error: "",
            notice: "",
            stale: false
        };
        if (e.snapshot) {
            this.checkpoints.set(e.items.length, e.nextCursor);
        }
    }
}
let I = new Map;
let D = "mcblock.discovery.browse.v1";
function BComponent({ view = "grid" }) {
    return <div role="status" aria-label="正在加载建筑"><span className="sr-only">正在加载建筑…</span><div className={`ubg-grid${view === "list" ? " ubg-list" : ""}`} aria-hidden="true">{Array.from({
        length: 10
    }, (e, key)=><div key={key} className="uc-card uc-card--discovery discovery-card-skeleton"><div className="discovery-card-main"><div className="uc-pic sk-blk"/><div className="uc-body"><div className="uc-trow"><span className="discovery-skeleton-title sk-deep"/></div><div className="discovery-card-meta"><span className="discovery-skeleton-line sk-blk"/></div></div></div></div>)}</div></div>;
}
let U = {
    建筑类型: <A_2 size={16}/>,
    建筑风格: <A_3 size={16}/>,
    建造难度: <A_4 size={16}/>,
    投影版本: jsx(g, {
        size: 16
    })
};
let $ = {
    all: <f.A size={16}/>,
    featured: <A_5 size={16}/>
};
function WComponent({ label, title = label, compactLabel, selected = false, children }) {
    let cRef = useRef(null);
    let d = U[title] ?? (title.startsWith("排序") ? jsx(b, {
        size: 16
    }) : null);
    return <details ref={cRef} className={`discovery-popover${selected ? " discovery-popover--selected" : ""}`} onToggle={()=>{
        let cRef_current = cRef.current;
        if (cRef_current?.open) {
            let s = cRef_current.querySelector(".discovery-popover-body");
            if (!s) {
                return;
            }
            s.style.left = "";
            s.style.right = "";
            s.style.maxHeight = "";
            let i = cRef_current.getBoundingClientRect();
            let r = s.getBoundingClientRect();
            let n = Number.parseFloat(getComputedStyle(cRef_current.closest(".discovery-filter") ?? cRef_current).top) || 0;
            let a = window.innerHeight - i.bottom - 8;
            let l = i.top - n - 8;
            let o = a < r.height && l > a;
            cRef_current.classList.toggle("discovery-up", o);
            s.style.maxHeight = `${Math.max(80, o ? l : a)}px`;
            s.style.right = "auto";
            s.style.left = `${Math.max(16, Math.min(i.left, window.innerWidth - r.width - 16)) - i.left}px`;
        }
    }}><summary title={label} aria-label={title === "投影版本" ? title : label}>{d && <span className="discovery-filter-icon" aria-hidden="true">{d}</span>}<span className="discovery-popover-label">{label}</span>{compactLabel && <span className="discovery-popover-compact-label">{compactLabel}</span>}<A_6 size={14}/></summary><div className="discovery-popover-body"><div className="discovery-panel-heading"><span className="discovery-panel-title">{d && <span className="discovery-filter-icon" aria-hidden="true">{d}</span>}{title}</span><small>{title.startsWith("排序") ? "选择排序方式" : title === "建筑类型" ? "选择一项" : "可组合选择"}</small></div>{children}</div></details>;
}
function JComponent({ initial, initialError = "" }) {
    let oRef = useRef(null);
    let [c, setC] = useState(false);
    let [u, setU] = useState(initialError);
    let { state, controller, identity, favoriteToken, apply, save, view, setView } = function(initial_1) {
        let i = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
        let [r, setR] = useState(()=>((initial_1_1)=>{
                try {
                    initial_1_1 = ((e, t)=>{
                        let filters = Dl(t).filters;
                        if (!Array.isArray(e.filters.versions)) {
                            e = {
                                ...e,
                                filters: hv(e.filters)
                            };
                        }
                        if (bb(filters) === bb(e.filters)) {
                            return e;
                        }
                        return {
                            ...e,
                            filters,
                            items: [],
                            total: 0,
                            facets: {},
                            bootstrap: null,
                            snapshot: null,
                            nextCursor: null
                        };
                    })(initial_1_1, window.location.search);
                } catch (e) {}
                let t = bb(initial_1_1.filters);
                let s = I.get(t);
                if (s) {
                    return s;
                }
                let i = new _(initial_1_1);
                I.set(t, i);
                if (I.size > 10) {
                    I.delete(I.keys().next().value);
                }
                return i;
            })(initial_1));
        let [l, setL] = useState("grid");
        let c = useMemo(()=>({
                data: initial_1,
                busy: false,
                error: "",
                notice: "",
                stale: false
            }), [
            initial_1
        ]);
        let d = useSyncExternalStore(r.subscribe, r.getSnapshot, ()=>c);
        let { data, status } = useSession();
        let identity_1 = data?.user?.id ?? "guest";
        let mRef = useRef(new Set);
        let vRef = useRef(null);
        let gRef = useRef(null);
        let fRef = useRef([]);
        let y = useCallback(()=>{
            fRef.current.forEach(cancelAnimationFrame);
            fRef.current = [];
        }, []);
        let b = useCallback(()=>{
            gRef.current = null;
            y();
        }, [
            y
        ]);
        let save_1 = useCallback(function(e = null) {
            b();
            if (e) {
                vRef.current = e;
            }
            let anchor = e ?? vRef.current;
            try {
                let e = anchor ? document.querySelector(`[data-building-id="${CSS.escape(anchor)}"]`) : null;
                let i = document.querySelector(".discovery-results .ubg-grid");
                sessionStorage.setItem(D, JSON.stringify({
                    ...r.persisted(),
                    view: l,
                    anchor,
                    ids: r.getSnapshot().data.items.map((e)=>e.id),
                    columns: i ? getComputedStyle(i).gridTemplateColumns.split(" ").length : 1,
                    anchorTop: e?.getBoundingClientRect().top ?? null,
                    scrollY: window.scrollY
                }));
            } catch (e) {}
        }, [
            r,
            l,
            b
        ]);
        useEffect(()=>{
            let e = (e)=>{
                if ([
                    "ArrowUp",
                    "ArrowDown",
                    "PageUp",
                    "PageDown",
                    "Home",
                    "End",
                    " "
                ].includes(e.key)) {
                    b();
                }
            };
            window.addEventListener("wheel", b, {
                passive: true
            });
            window.addEventListener("touchstart", b, {
                passive: true
            });
            window.addEventListener("pointerdown", b, {
                passive: true
            });
            window.addEventListener("keydown", e);
            return ()=>{
                y();
                window.removeEventListener("wheel", b);
                window.removeEventListener("touchstart", b);
                window.removeEventListener("pointerdown", b);
                window.removeEventListener("keydown", e);
            };
        }, [
            b,
            y
        ]);
        useEffect(()=>{
            if (status === "loading" || i) {
                return;
            }
            let e = true;
            let t = !mRef.current.has(r);
            mRef.current.add(r);
            r.setIdentity(identity_1);
            if (t && !r.getSnapshot().busy) {
                try {
                    let e = JSON.parse(sessionStorage.getItem(D) ?? "null");
                    if (e && r.restore(e, r.getSnapshot().data.filters)) {
                        setL(e.view === "list" ? "list" : "grid");
                        gRef.current = e;
                    }
                } catch (e) {}
            }
            if (r.getSnapshot().busy) {
                return;
            }
            let n = Math.max(40, r.getSnapshot().data.items.length);
            try {
                let { legacyPage } = Dl(window.location.search);
                n = Math.max(n, legacyPage > 1 ? Math.min(300, 30 * legacyPage) : 40);
            } catch (e) {}
            r.refresh(n, true).then(()=>{
                let gRef_current = gRef.current;
                if (e && gRef_current) {
                    gRef.current = null;
                    fRef.current.push(requestAnimationFrame(()=>{
                        fRef.current.push(requestAnimationFrame(()=>{
                            if (!e) {
                                return;
                            }
                            let s = ((gRef_current_1, t)=>{
                                if (!gRef_current_1.anchor) {
                                    return null;
                                }
                                let i = new Set(t);
                                if (i.has(gRef_current_1.anchor)) {
                                    return gRef_current_1.anchor;
                                }
                                let r = gRef_current_1.ids ?? [];
                                let n = r.indexOf(gRef_current_1.anchor);
                                if (n < 0) {
                                    return null;
                                }
                                for (let e of r.slice(n + 1)){
                                    if (i.has(e)) {
                                        return e;
                                    }
                                }
                                for (let e of r.slice(0, n).reverse()){
                                    if (i.has(e)) {
                                        return e;
                                    }
                                }
                                return null;
                            })(gRef_current, r.getSnapshot().data.items.map((e)=>e.id));
                            let i = s ? document.querySelector(`[data-building-id="${CSS.escape(s)}"]`) : null;
                            if (i && typeof gRef_current.anchorTop === "number") {
                                window.scrollBy(0, i.getBoundingClientRect().top - gRef_current.anchorTop);
                            } else if (typeof gRef_current.scrollY === "number") {
                                window.scrollTo(0, gRef_current.scrollY);
                            }
                            fRef.current = [];
                        }));
                    }));
                }
            });
            return ()=>{
                e = false;
                y();
                r.cancel();
            };
        }, [
            r,
            identity_1,
            status,
            i,
            y
        ]);
        useEffect(()=>{
            let e = ()=>{
                if (!(i || document.visibilityState !== "visible" || r.getSnapshot().busy || r.getSnapshot().stale)) {
                    r.refresh(Math.max(40, r.getSnapshot().data.items.length), true);
                }
            };
            let t = ()=>save_1();
            window.addEventListener("focus", e);
            document.addEventListener("visibilitychange", e);
            window.addEventListener("pagehide", t);
            return ()=>{
                window.removeEventListener("focus", e);
                document.removeEventListener("visibilitychange", e);
                window.removeEventListener("pagehide", t);
            };
        }, [
            r,
            save_1,
            i
        ]);
        let apply_1 = useCallback((t)=>{
            let s = hv(t);
            let i = bb(s);
            r.cancel();
            let a = new _({
                ...initial_1,
                filters: s,
                items: [],
                total: 0,
                snapshot: null,
                bootstrap: null,
                nextCursor: null
            });
            a.setIdentity(identity_1);
            mRef.current.add(a);
            I.set(i, a);
            vRef.current = null;
            b();
            setR(a);
            ((e, t)=>{
                let s = {
                    ...e.state && typeof e.state === "object" ? e.state : {}
                };
                delete s.__NA;
                delete s._N;
                e.replaceState(s, "", t);
            })(window.history, `/buildings${i}`);
            a.changeFilters(s);
        }, [
            r,
            initial_1,
            identity_1,
            b
        ]);
        useEffect(()=>{
            let e = ()=>{
                try {
                    apply_1(Dl(window.location.search).filters);
                } catch (e) {}
            };
            window.addEventListener("popstate", e);
            return ()=>window.removeEventListener("popstate", e);
        }, [
            apply_1
        ]);
        let data_1 = r.identity === identity_1 ? d.data : {
            ...d.data,
            items: d.data.items.map((e)=>({
                    ...e,
                    isFavorited: false
                }))
        };
        return {
            state: {
                ...d,
                data: data_1
            },
            controller: r,
            identity: identity_1,
            favoriteToken: r.favoriteToken(),
            apply: apply_1,
            save: save_1,
            view: l,
            setView: setL
        };
    }(initial, !!u);
    let U = hv(state.data.filters);
    let items = state.data.items;
    let V = tk(state.data.facets.versions ?? {}, U.versions);
    let [Y, setY] = useState(U.search);
    let [H, setH] = useState(U);
    let [Q, setQ] = useState(false);
    let [Z, setZ] = useState(null);
    let [et, setEt] = useState("");
    let [ei, setEi] = useState("");
    let enRef = useRef(null);
    let eaRef = useRef(null);
    let elRef = useRef(null);
    let eo = function(e) {
        let t = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
        try {
            if (elRef.current) {
                clearTimeout(elRef.current);
            }
            let s = hv(t ? e : {
                ...U,
                search: Y,
                ...e
            });
            setU("");
            setEi("");
            setY(s.search);
            apply(s);
        } catch (error) {
            setEi(error.message);
        }
    };
    useEffect(()=>{
        let oRef_current = oRef.current;
        if (!oRef_current) {
            return;
        }
        let t = ()=>setC(oRef_current.getBoundingClientRect().width <= 767.98);
        t();
        let s = new ResizeObserver(t);
        s.observe(oRef_current);
        return ()=>s.disconnect();
    }, []);
    useEffect(()=>{
        setY(U.search);
    }, [
        U.search
    ]);
    useEffect(()=>{
        if (Y.trim() !== U.search) {
            elRef.current = setTimeout(()=>eo({
                    search: Y
                }), 400);
            return ()=>{
                if (elRef.current) {
                    clearTimeout(elRef.current);
                }
            };
        }
    }, [
        Y,
        U.search
    ]);
    useEffect(()=>{
        let e = (e)=>{
            if (e.key === "Escape") {
                document.querySelectorAll(".discovery-popover[open]").forEach((e)=>{
                    e.open = false;
                    e.querySelector("summary")?.focus();
                });
            }
        };
        let t = (e)=>document.querySelectorAll(".discovery-popover[open]").forEach((t)=>{
                if (!t.contains(e.target)) {
                    t.open = false;
                }
            });
        let s = ()=>document.querySelectorAll(".discovery-popover[open]").forEach((e)=>{
                e.open = false;
            });
        window.addEventListener("keydown", e);
        window.addEventListener("pointerdown", t);
        window.addEventListener("resize", s);
        return ()=>{
            window.removeEventListener("keydown", e);
            window.removeEventListener("pointerdown", t);
            window.removeEventListener("resize", s);
        };
    }, []);
    useEffect(()=>{
        if (!Q) {
            return;
        }
        let e = new AbortController;
        setZ(null);
        setEt("");
        let t = setTimeout(async ()=>{
            try {
                let s = new URLSearchParams(bb(H).slice(1));
                s.set("preview", "1");
                let i = await fetch(`/api/buildings/discovery?${s}`, {
                    signal: e.signal,
                    cache: "no-store"
                });
                let r = await i.json();
                if (!i.ok || !r.success) {
                    throw Error(r.error ?? "筛选结果暂不可用");
                }
                if (!e.signal.aborted) {
                    setZ(r.data);
                }
            } catch (error) {
                if (!e.signal.aborted) {
                    setEt(error.message);
                }
            }
        }, 250);
        return ()=>{
            e.abort();
            clearTimeout(t);
        };
    }, [
        Q,
        H
    ]);
    useEffect(()=>{
        if (!Q) {
            return;
        }
        let overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return ()=>{
            document.body.style.overflow = overflow;
        };
    }, [
        Q
    ]);
    let ec = (e)=>{
        try {
            let t = hv({
                ...H,
                ...e
            });
            setH(t);
            setEi("");
        } catch (error) {
            setEi(error.message);
        }
    };
    let EdComponent = function(e, t, s, r) {
        let l = arguments.length > 4 && arguments[4] !== undefined && arguments[4];
        let o = (l ? Z?.facets : state.data.facets)?.[t] ?? {};
        return <div className="discovery-options">{t === "primaryType" && <label><input type="radio" name={l ? "draft-type" : "type"} checked={!s.primaryType} onChange={()=>r({
                primaryType: null
            })}/><span>全部类型</span></label>}{Object.entries(e).filter(([r])=>t !== "styles" || l && !Z || (o[r] ?? 0) > 0 || s.styles.includes(r)).map(([a, c])=><label key={a}><input type={t === "primaryType" ? "radio" : "checkbox"} name={t === "primaryType" ? l ? "draft-type" : "type" : undefined} checked={t === "primaryType" ? s.primaryType === a : s[t].includes(a)} onChange={()=>{
                if (t === "primaryType") {
                    return r({
                        primaryType: a
                    });
                }
                return r({
                    [t]: s[t].includes(a) ? s[t].filter((e)=>e !== a) : [
                        ...s[t],
                        a
                    ]
                });
            }}/><span>{c}</span><small>{o[a] ?? "…"}</small></label>)}</div>;
    };
    let onClick = ()=>{
        enRef.current?.close();
        setQ(false);
        setH(structuredClone(U));
        eaRef.current?.focus();
    };
    let eh = [];
    for (let [e, t] of (U.search && eh.push({
        label: `搜索：${U.search}`,
        remove: ()=>eo({
                search: ""
            })
    }), U.primaryType && eh.push({
        label: QE[U.primaryType],
        remove: ()=>eo({
                primaryType: null
            })
    }), [
        [
            "styles",
            rY
        ],
        [
            "difficulties",
            Ke
        ],
        [
            "features",
            Gv
        ]
    ])){
        for (let s of U[e]){
            eh.push({
                label: t[s],
                remove: ()=>eo({
                        [e]: U[e].filter((e)=>e !== s)
                    })
            });
        }
    }
    for (let e of U.versions){
        eh.push({
            label: `投影版本：${V[e]}`,
            remove: ()=>eo({
                    versions: U.versions.filter((t)=>t !== e)
                })
        });
    }
    for (let [e, t] of (U.interiorOnly && eh.push({
        label: "含内饰",
        remove: ()=>eo({
                interiorOnly: false
            })
    }), U.teachingOnly && eh.push({
        label: "步骤教学",
        remove: ()=>eo({
                teachingOnly: false
            })
    }), [
        [
            "minBlocks",
            "最少方块"
        ],
        [
            "maxBlocks",
            "最多方块"
        ],
        [
            "maxWidth",
            "最大宽度"
        ],
        [
            "maxDepth",
            "最大深度"
        ]
    ])){
        if (U[e] !== null) {
            eh.push({
                label: `${t} ${U[e]}`,
                remove: ()=>eo({
                        [e]: null
                    })
            });
        }
    }
    for (let [e, t] of [
        [
            "legacyCategory",
            "旧分类"
        ],
        [
            "legacyTag",
            "标签"
        ],
        [
            "authorId",
            "上传者筛选"
        ]
    ]){
        if (U[e]) {
            eh.push({
                label: `${t}：${U[e]}`,
                remove: ()=>eo({
                        [e]: null
                    })
            });
        }
    }
    let ep = u || state.error;
    let em = ei || state.notice;
    return <><DiscoveryFilterBar ref={oRef}><div className="discovery-toolbar"><div className="discovery-toolbar-main"><T.I value={U.scope} onValueChange={(scope)=>eo({
            scope
        })} size="md" label="浏览范围" className="discovery-scope">{[
        [
            "all",
            "全部建筑",
            "全部"
        ],
        [
            "featured",
            "只看精选",
            "精选"
        ]
    ].map(([t, s, r])=><T.d key={t} value={t} aria-label={s}><span className="discovery-filter-icon" aria-hidden="true">{$[t]}</span><span className="discovery-scope-label">{s}</span><span className="discovery-scope-short">{r}</span></T.d>)}</T.I><form className="ubg-box" onSubmit={(e)=>{
        e.preventDefault();
        eo({
            search: Y
        });
    }}><w.A/><input aria-label="搜索建筑" type="search" placeholder="搜索建筑名称、投影作者…" value={Y} onChange={(e)=>setY(e.target.value)}/>{Y && <A.K label="清除搜索" size="xs" variant="ghost" onClick={()=>eo({
            search: ""
        })}><A_7 size={14}/></A.K>}</form></div><div className="discovery-toolbar-actions"><E.$ variant="primary" size="lg" className="discovery-filter-trigger" aria-label="筛选条件" ref={eaRef} onClick={()=>{
        setH({
            ...structuredClone(U),
            search: Y
        });
        setQ(true);
        enRef.current?.showModal();
    }}><A_8/><span>筛选</span>{eh.length > 0 && <b>{eh.length}</b>}</E.$><div className="discovery-desktop-shortcuts" aria-label="桌面常用筛选"><WComponent title="投影版本" selected={U.versions.length > 0} label={U.versions.length ? V[U.versions[0]] + (U.versions.length > 1 ? ` +${U.versions.length - 1}` : "") : "版本"}><p className="discovery-version-help">按投影记录的 Minecraft 版本分组</p>{EdComponent(V, "versions", U, eo)}</WComponent><E.$ size="lg" variant={U.interiorOnly ? "primary" : "secondary"} className="discovery-quick-capability" aria-label="含内饰" aria-pressed={U.interiorOnly} onClick={()=>eo({
            interiorOnly: !U.interiorOnly
        })}><N/><span>含内饰</span></E.$><E.$ size="lg" variant={U.teachingOnly ? "primary" : "secondary"} className="discovery-quick-capability" aria-label="步骤教学" aria-pressed={U.teachingOnly} onClick={()=>eo({
            teachingOnly: !U.teachingOnly
        })}><A_9/><span>步骤教学</span></E.$></div><div className="discovery-sort"><WComponent label={`排序 ${mX[U.sort]}`} compactLabel={mX[U.sort]}><div className="discovery-options">{Object.entries(mX).filter(([t])=>[
            "recommended",
            "latest",
            "popular",
            "blocks",
            "area"
        ].includes(t) || U.sort === t).map(([t, s])=><button key={t} aria-pressed={U.sort === t} onClick={(e)=>{
            eo({
                sort: t
            });
            let s = e.currentTarget.closest("details");
            if (s) {
                s.open = false;
            }
        }}>{s}</button>)}</div></WComponent></div><div className="ubg-views" role="group" aria-label="结果视图"><A.K label="网格视图" size="md" variant={view === "grid" ? "primary" : "secondary"} aria-pressed={view === "grid"} onClick={()=>setView("grid")}><A_10/></A.K><A.K label="列表视图" size="md" variant={view === "list" ? "primary" : "secondary"} aria-pressed={view === "list"} onClick={()=>setView("list")}><A_11/></A.K></div></div></div></DiscoveryFilterBar><section className="ubg-gridz discovery-results" aria-busy={state.busy}><div className="wrap"><div className="ubg-secttl"><span className="ubg-bar"/><h2>{U.scope === "featured" ? "精选建筑" : "发现建筑"}</h2>{!ep && <span className="ubg-cnt" data-testid="result-count">共 {state.data.total} 座</span>}</div>{eh.length > 0 && <div className="discovery-selected" aria-label="已选条件"><span className="discovery-selected-label">已选 {eh.length}</span>{eh.map((e, t)=><button key={e.label + t} title={`移除：${e.label}`} aria-label={`移除筛选：${e.label}`} onClick={e.remove}><span>{e.label}</span><A_7 size={12}/></button>)}<button className="discovery-clear" onClick={()=>eo({
            scope: U.scope,
            sort: U.sort
        }, true)}>清空筛选</button></div>}{U.search && <p className="discovery-order-note">先按搜索相关性，再按{mX[U.sort]}排序</p>}{em && <p className="discovery-notice" role="status">{em}</p>}{ep && <div className="discovery-notice" role="alert">{ep} <E.$ size="sm" onClick={()=>{
        if (u) {
            return eo({}, true);
        }
        controller.refresh(Math.max(40, items.length));
    }}>{u ? "重置条件" : "重试"}</E.$></div>}{state.stale && <E.$ onClick={()=>void controller.refresh(Math.max(40, items.length))}>刷新列表</E.$>}{items.length ? <div className={`ubg-grid${view === "list" ? " ubg-list" : ""}`} data-testid="building-grid">{items.map((e)=><A_12 key={identity + e.id} building={e} discovery={{
            item: e,
            filters: U,
            onOpen: save,
            identity
        }} onFavoriteToggle={(e, t)=>controller.favorite(e, t, favoriteToken)}/>)}</div> : state.busy ? <BComponent view={view}/> : !ep && <div className="discovery-empty"><h3>没有符合这些条件的建筑</h3><p>移除部分条件，或清空筛选继续浏览。</p><E.$ onClick={()=>eo({
            scope: U.scope,
            sort: U.sort
        }, true)}>清空筛选</E.$></div>}{items.length > 0 && <div className="ubg-more-wrap"><p className="ubg-more-count">已展示 <b>{items.length}</b> / 共 <b>{state.data.total}</b> 座</p>{state.data.nextCursor !== null && !state.stale && <E.$ size="lg" disabled={state.busy} onClick={()=>void controller.loadMore()}>{state.busy ? "正在加载…" : "加载更多"}<A_6 size={18}/></E.$>}</div>}</div></section><dialog ref={enRef} className="discovery-dialog discovery-filter-dialog" data-compact={c} aria-labelledby="discovery-filter-title" onCancel={(e)=>{
        e.preventDefault();
        onClick();
    }} onClick={(e)=>{
        if (e.target !== e.currentTarget) {
            return;
        }
        let t = e.currentTarget.getBoundingClientRect();
        if (e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) {
            onClick();
        }
    }}><div className="discovery-dialog-layout"><header><div><h2 id="discovery-filter-title">筛选建筑</h2><p>组合条件，找到想搭建的作品</p></div><button aria-label="关闭筛选" onClick={onClick}><A_7/></button></header><div className="discovery-dialog-scroll"><fieldset><legend>建筑类型</legend>{EdComponent(QE, "primaryType", H, ec, true)}</fieldset><fieldset><legend>建筑风格 · 可多选</legend>{EdComponent(rY, "styles", H, ec, true)}</fieldset><fieldset><legend>建造难度 · 可多选</legend>{EdComponent(Ke, "difficulties", H, ec, true)}</fieldset><fieldset className="discovery-combined-facet"><legend>投影版本 · 可多选</legend><p className="discovery-version-help">按投影记录的 Minecraft 版本分组</p>{EdComponent(tk(Z?.facets.versions ?? state.data.facets.versions ?? {}, H.versions), "versions", H, ec, true)}</fieldset><fieldset className="discovery-combined-facet"><legend>建筑能力</legend><div className="discovery-options"><label><input type="checkbox" checked={H.interiorOnly} onChange={(e)=>ec({
            interiorOnly: e.target.checked
        })}/><N size={16}/><span>含内饰</span></label><label><input type="checkbox" checked={H.teachingOnly} onChange={(e)=>ec({
            teachingOnly: e.target.checked
        })}/><A_9 size={16}/><span>步骤教学</span></label></div></fieldset>{(et || ei) && <p role="alert">{et || ei}</p>}</div><footer><E.$ variant="secondary" size="lg" onClick={()=>setH(hv({
            search: U.search,
            scope: U.scope,
            sort: U.sort
        }))}>重置</E.$><E.$ variant="primary" size="lg" onClick={()=>{
        eo(H, true);
        onClick();
    }}>{Z ? `查看 ${Z.total} 个结果` : "查看结果"}</E.$></footer></div></dialog><O.s/></>;
}
function YComponent({ initialStats }) {
    let [s, setS] = useState(initialStats);
    useEffect(()=>{
        let e = false;
        let t = null;
        async function s() {
            if (e || document.visibilityState === "hidden" || t) {
                return;
            }
            let s = new AbortController;
            t = s;
            let i = window.setTimeout(()=>s.abort(), 10000);
            try {
                let t = await fetch("/api/buildings/stats", {
                    cache: "no-store",
                    signal: s.signal
                });
                if (!t.ok) {
                    return;
                }
                let i = await t.json();
                if (e || s.signal.aborted || i?.success !== true) {
                    return;
                }
                let n = i.data;
                if (!n || ![
                    n.totalCount,
                    n.authorCount,
                    n.learnTotal
                ].every((e)=>Number.isSafeInteger(e) && e >= 0)) {
                    return;
                }
                setS({
                    totalCount: n.totalCount,
                    authorCount: n.authorCount,
                    learnTotal: n.learnTotal
                });
            } catch (e) {} finally{
                window.clearTimeout(i);
                if (t === s) {
                    t = null;
                }
            }
        }
        s();
        let i = window.setInterval(()=>{
            s();
        }, 60000);
        let n = ()=>{
            s();
        };
        window.addEventListener("focus", n);
        document.addEventListener("visibilitychange", n);
        return ()=>{
            e = true;
            t?.abort();
            window.clearInterval(i);
            window.removeEventListener("focus", n);
            document.removeEventListener("visibilitychange", n);
        };
    }, []);
    return <div className="ubh-strow"><span className="ubh-stat"><b>{s.totalCount}</b> 座建筑</span>{s.authorCount > 0 && <span className="ubh-stat"><b>{s.authorCount}</b> 位作者</span>}{s.learnTotal > 0 && <span className="ubh-stat"><b>{ZV(s.learnTotal)}</b> 次学习</span>}<span className="ubh-stat"><b>100%</b> 免费</span></div>;
}
function KComponent({ initialBuildings, initialPagination, totalCount, difficultyStats = [], learnTotal = 0, authorCount = 0, styleTagCounts, stepEntry, discovery, discoveryError }) {
    return <div className={`min-h-screen bg-bg-primary text-text-primary${discovery ? " discovery-page-v2" : ""}`}><header className="ubh-header"><div className="ubh-bg"><img src="/images/buildings/hero-bg.jpg" alt=""/></div><div className="wrap ubh-wrap"><div className="ubh-hero ubh-hero--stb"><div className="ubh-lft"><div className="ubh-ey">Building Library · 全部免费</div><h1 className="ubh-h1">建筑库</h1><p className="ubh-sub">{discovery ? "用 3D 模型逐层查看建筑结构，部分作品提供按步骤教学。" : "每座建筑都有 3D 逐层教学，标注方块位置与数量，零基础也能跟着搭出一整座。"}</p>{discovery && <p className="discovery-source-guide ubh-source-guide">建筑库包含站外收录与投稿收录。作品署名不代表作者本人提交，来源依据见详情。</p>}<YComponent initialStats={{
        totalCount,
        authorCount,
        learnTotal
    }}/><div className="sbm-under"><_r href="/buildings/submit" className={`sbm-btn sbm-btn--brand${discovery ? " discovery-submit-breathe" : ""}`}>投稿你的建筑 →</_r><span className="sbm-pk">人工审核 · 保留作品作者署名</span></div></div><D1Component demo={stepEntry.demo}/></div></div></header>{!discovery && discoveryError && <div className="wrap py-4 text-text-secondary" role="status">{discoveryError}</div>}{discovery ? <JComponent initial={discovery} initialError={discoveryError}/> : <A_1 initialBuildings={initialBuildings} initialPagination={initialPagination} difficultyStats={difficultyStats} basePath="/buildings" styleTagCounts={styleTagCounts}/>}</div>;
}
export { KComponent as default };
