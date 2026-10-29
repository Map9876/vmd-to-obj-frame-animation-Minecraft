import { V, he, me as Me, pe as Pe, z } from "./viewer-overlay-CuQvzfKw/chunk_pe.js";
import { H, U, we } from "./viewer-overlay-CuQvzfKw/chunk_be.js";
import { Be } from "./viewer-overlay-CuQvzfKw/chunk_Le.js";
import { nt, tt } from "./viewer-overlay-CuQvzfKw/chunk_tt.js";
import { gt } from "./viewer-overlay-CuQvzfKw/chunk_ft.js";
import { Mt } from "./viewer-overlay-CuQvzfKw/chunk_jt.js";
import { n, s, t } from "./jsx-runtime-Db0DjQYK.js";
import { f } from "./current-Bq9r6xhE.js";
import { r } from "./route-BDnB4cU9.js";
import { c as c_1, o } from "./session-BGIR8kU0.js";
import { i as i_1 } from "./react-LvWBhTF7.js";
import { r as r_2 } from "./browser-I-D20JeN.js";
import { n as n_2 } from "./dist-C5TDMOul.js";
import "./dist-C66QuM2X.js";
import { t as t_2 } from "./utils-B6KiDbIe.js";
import { t as t_3 } from "./createLucideIcon-BB7uFOth.js";
import { t as F1 } from "./chevron-left-CJQcpBdr.js";
import { t as P1 } from "./hammer-CE-GXFeU.js";
import { t as M1 } from "./play-DPEFnGPk.js";
import { Bt, Lt, Ut, Vt, ar as Y1, er as B, fr as X1, nr as S, or as C, pr as W1, rr as T } from "./index-DmN1rqCo.js";
import { zt } from "./editor-assets-COznUb6X.js";
import { i as D, r as O, s as K, t as A } from "./dialog-ClhsnmFs.js";
import { t as J1 } from "./user-name-Doik7BrP.js";
import { r as r_3 } from "./demo-media-DQv-_HFj.js";
import { BuildModeIntro, t as P } from "./build-mode-intro-DvwhJR6S.js";
import { n as n_3, t as t_4 } from "./use-block-info-CeYLX_FI.js";
import { t as t_5 } from "./fetch-build-DtPVkGSn.js";
import { t as Te1 } from "./viewer-top-bar-CK-Im0g5.js";
import { a as Ne, c as Re, i as Ie, n as Ae, o as Oe, r as Se, s as Ce, t as Le } from "./alert-dialog-fUpDABvL.js";
import { ViewerStage, i as De, n as n_4, r as r_4, t as R } from "./viewer-stage-DxKzntTB.js";
function ye(shape) {
    let length = [
        shape.w,
        shape.h,
        shape.d
    ].filter((e)=>e > 1).length;
    switch(length){
        case 0:
            return `single`;
        case 1:
            return `line`;
        case 2:
            return `rect`;
        default:
            return `box`;
    }
}
function W(instructions) {
    return instructions.phases.flatMap((e)=>[
            ...e.steps
        ]);
}
function Te(e) {
    let t = e.properties ?? {};
    let e_name = e.name;
    let r = t.powered === `true`;
    let i = [];
    if (t.waterlogged === `true`) {
        i.push({
            id: `waterlogged`
        });
    }
    if (t.open === `true` && !r) {
        i.push({
            id: `opens`
        });
    }
    let ticks = Number(t.delay);
    if (e_name.endsWith(`repeater`) && Number.isFinite(ticks) && ticks > 1) {
        i.push({
            id: `repeaterDelay`,
            clicks: ticks - 1,
            ticks
        });
    }
    let clicks = Number(t.note);
    if (e_name === `note_block` && Number.isFinite(clicks) && clicks > 0) {
        i.push({
            id: `noteBlock`,
            clicks
        });
    }
    if (t.lit === `true` && e_name.includes(`candle`)) {
        i.push({
            id: `lightIt`
        });
    } else if (t.lit === `false` && e_name.includes(`campfire`)) {
        i.push({
            id: `putItOut`
        });
    }
    let level = Number(t.level);
    if (e_name.endsWith(`cauldron`) && Number.isFinite(level) && level > 0) {
        i.push({
            id: `fillCauldron`,
            level
        });
    }
    if (e_name === `composter` && Number.isFinite(level) && level > 0) {
        i.push({
            id: `fillComposter`,
            level
        });
    }
    return i;
}
function Ee(step) {
    let t = step.issues ?? [];
    let n = [];
    if (t.includes(`no-support`)) {
        n.push({
            id: `noSupport`
        });
    }
    if (t.includes(`no-click`)) {
        n.push({
            id: `noClick`
        });
    }
    return n;
}
const J = 2147483647;
function Ve(plan) {
    let { dims } = plan.instructions;
    let n = new Int32Array(dims.dx * dims.dy * dims.dz).fill(J);
    let r = 0;
    for (let t of plan.instructions.phases){
        for (let e of t.steps){
            if (H(e)) {
                for (let t of e.cells){
                    n[t] = r;
                }
            }
            r++;
        }
    }
    for (let t of plan.extras.cells){
        n[t.cell] = t.step;
    }
    return n;
}
function He(plan) {
    let { dims, origin } = plan.instructions;
    let r = Ve(plan);
    return (e, i, a)=>{
        let o = e - origin.x;
        let s = i - origin.y;
        let c = a - origin.z;
        if (o < 0 || s < 0 || c < 0 || o >= dims.dx || s >= dims.dy || c >= dims.dz) {
            return J;
        }
        return r[(s * dims.dz + c) * dims.dx + o] ?? 2147483647;
    };
}
function Ue(e, pRef_current, n) {
    let { dims, origin } = e.instructions;
    let a = W(e.instructions);
    let o = Math.max(0, Math.min(pRef_current, n));
    let s = Math.min(a.length, Math.max(pRef_current, n));
    let c = [];
    for(let e = o; e < s; e++){
        let t = a[e];
        for (let e of t && H(t) ? t.cells : []){
            let { x, y, z } = V(dims, e);
            c.push({
                pos: {
                    x: x + origin.x,
                    y: y + origin.y,
                    z: z + origin.z
                }
            });
        }
    }
    return c;
}
const Y = t();
function WeComponent({ phase, messageKey, message, retryable, onRetry, onExit }) {
    let o = i_1(`Build`);
    let c = phase === `failed`;
    if (r_3(c ? 0 : Ge)) {
        return <A open onOpenChange={(e)=>!e && onExit()}><O showCloseButton={false} className={`max-w-sm`}><div className={`flex flex-col items-center gap-3 py-2 text-center`}>{c ? <T className={`size-6 text-amber-500`} strokeWidth={1.5} aria-hidden/> : <Y1 className={`size-6 animate-spin text-muted-foreground`} strokeWidth={1.5} aria-hidden/>}<K className={`text-sm font-medium`}>{o(c ? `gate.failedTitle` : `gate.waitingTitle`)}</K><D className={`text-[13px]`}>{c ? messageKey ? o(messageKey) : message : o(`gate.waitingBody`)}</D><div className={`mt-1 flex items-center gap-2`}>{c && retryable ? <B size={`sm`} onClick={onRetry}>{o(`gate.retry`)}</B> : null}<B size={`sm`} variant={c ? `outline` : `secondary`} onClick={onExit}>{o(`gate.leave`)}</B></div></div></O></A>;
    }
    return null;
}
var Ge = 400;
function KeComponent({ step, load, atRestock, materials }) {
    let i = i_1(`Build`);
    let [a, setA] = z.useState(false);
    let c = a || atRestock;
    return <div className={`pointer-events-auto flex w-full flex-col gap-2 lg:hidden`}>{step}{load && <><button type={`button`} onClick={()=>setA(!c)} className={`flex items-center gap-2 border border-input bg-card/95 px-3 py-1.5 text-[13px] text-foreground-secondary backdrop-blur-md`}><P className={`size-3.5 shrink-0`}/><span>{i(atRestock ? `load.take` : `load.carrying`)}{materials > 0 && <span className={`text-muted-foreground`}>{` `}{`· `}{i(`load.materials`, {
        count: materials
    })}</span>}</span>{c ? <De className={`ml-auto size-3.5 shrink-0`}/> : <W1 className={`ml-auto size-3.5 shrink-0`}/>}</button>{c && load}</>}</div>;
}
function XComponent({ id, info, count, className }) {
    return <span className={t_2(`flex min-w-0 items-center gap-1.5`, className)}>{info?.iconUrl ? <img src={info.iconUrl} alt={``} loading={`lazy`} className={`size-5 shrink-0 [image-rendering:pixelated]`}/> : <span className={`size-4 shrink-0 bg-muted`}/>}{count !== undefined && <span className={`shrink-0 font-semibold tabular-nums`}>{count}{`x`}</span>}<span className={`truncate`}>{info?.label ?? t_4(id)}</span></span>;
}
function Qe1Component({ plan, load }) {
    let n = i_1(`Build`);
    let palette = plan.instructions.palette;
    let i = (state)=>palette[state]?.id ?? ``;
    let a = n_3(z.useMemo(()=>load.items.map((e)=>palette[e.state]?.id ?? ``), [
        load.items,
        palette
    ]));
    return <div className={`flex min-h-0 flex-1 flex-col gap-2 border border-input bg-card p-3`}><div className={`flex items-baseline justify-between`}><span className={`font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground`}>{load.atRestock ? n(`load.take`) : n(`load.carrying`)}</span><span className={`font-mono text-[11px] text-muted-foreground`}>{load.stepsLeft === 0 ? n(`load.lastOfLoad`) : n(`load.stepsLeft`, {
        count: load.stepsLeft
    })}</span></div><ul className={`-mr-3 flex max-h-[38vh] min-h-0 flex-col gap-1.5 overflow-y-auto overscroll-contain pr-3 lg:max-h-none lg:flex-1`}>{load.items.map((e)=>{
        let id = i(e.state);
        let n = a(id)?.stackSize ?? 64;
        let r = e.total === 0 ? 0 : e.left / e.total * 100;
        let o = n_4(e.total, n);
        let s = o > 1 && o <= 24 ? o : 0;
        return <li key={e.state} className={`flex flex-col gap-1`}><div className={`flex h-8 items-center gap-2 text-[13px]`}><XComponent id={id} info={a(id)} className={e.left === 0 ? `text-muted-foreground` : `text-foreground-secondary`}/><span className={`ml-auto flex shrink-0 flex-col items-end justify-center leading-tight`}><span className={t_2(`font-mono text-[12px] tabular-nums`, e.left === 0 ? `text-muted-foreground` : `text-foreground`)}>{r_4(e.left, n) || e.left}</span>{r_4(e.left, n) && <span className={`font-mono text-[9.5px] tabular-nums text-muted-foreground`}>{e.left}</span>}</span></div><div className={`relative h-1 bg-input`}><div className={`h-full bg-primary`} style={{
            width: `${r}%`
        }}/>{s > 0 && Array.from({
            length: s - 1
        }, (e, t)=>`${(t + 1) / s * 100}%`).map((e)=><span key={e} className={`absolute top-0 h-full w-px bg-card`} style={{
                left: e
            }}/>)}</div></li>;
    })}</ul></div>;
}
function JeComponent({ open, onKeep, onTake }) {
    let r = i_1(`Build`);
    return <Le open={open} onOpenChange={(e)=>!e && onKeep()}><Ie><Ce><Re>{r(`newer.title`)}</Re><Ne>{r(`newer.body`)}</Ne></Ce><Oe><Se onClick={onKeep}>{r(`newer.keep`)}</Se><Ae onClick={onTake}>{r(`newer.take`)}</Ae></Oe></Ie></Le>;
}
function YeComponent({ cursor, totalSteps, count, label, blockId }) {
    let a = i_1(`Build`);
    let o = n_3(z.useMemo(()=>{
        if (blockId) {
            return [
                blockId
            ];
        }
        return [];
    }, [
        blockId
    ]));
    return <div className={`pointer-events-auto hidden select-none items-center gap-2.5 border border-input bg-card/95 px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md lg:inline-flex`}><span className={`font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground`}>{a(`step`, {
        current: Math.min(cursor + 1, totalSteps),
        total: totalSteps
    })}</span>{blockId ? <XComponent id={blockId} info={o(blockId)} count={count ?? undefined} className={`text-[13px] text-foreground`}/> : <span className={`text-[13px] text-foreground`}>{label ?? a(`done.title`)}</span>}</div>;
}
function Xe(e) {
    return e.instructions.phases.flatMap((e)=>[
            ...e.steps
        ]);
}
function Ze(e, palette, index) {
    let r = e[index];
    if (r) {
        if (r.kind === `restock`) {
            return {
                kind: `restock`,
                index,
                step: r
            };
        }
        if (H(r)) {
            return {
                kind: `place`,
                index,
                step: r,
                size: {
                    w: r.shape.w,
                    h: r.shape.h,
                    d: r.shape.d
                },
                form: ye(r.shape),
                material: we(r, palette) ?? {
                    item: `minecraft:air`,
                    count: 0,
                    state: 0
                }
            };
        }
        return {
            kind: `clear`,
            index,
            step: r,
            size: {
                w: r.max.x - r.min.x + 1,
                h: r.max.y - r.min.y + 1,
                d: r.max.z - r.min.z + 1
            }
        };
    }
    return null;
}
function Qe(e) {
    let { dims, origin } = e.instructions;
    return {
        min: {
            ...origin
        },
        max: {
            x: origin.x + dims.dx - 1,
            y: origin.y + dims.dy - 1,
            z: origin.z + dims.dz - 1
        }
    };
}
function $e(steps, t) {
    if (steps[t]?.kind !== `place`) {
        return false;
    }
    for(let n = 0; n < t; n++){
        if (steps[n]?.kind === `place`) {
            return false;
        }
    }
    return true;
}
function et(plan, steps, index) {
    let r = steps[index];
    if (!r || !$e(steps, index)) {
        return null;
    }
    let i = tt(plan, r);
    if (!i) {
        return null;
    }
    let a = Qe(plan);
    return {
        east: i.min.x - a.min.x,
        south: i.min.z - a.min.z
    };
}
function rt(e, t) {
    return {
        x: Math.min(e.max.x, Math.max(e.min.x, t.x)),
        y: Math.min(e.max.y, Math.max(e.min.y, t.y)),
        z: Math.min(e.max.z, Math.max(e.min.z, t.z))
    };
}
function it(step, palette) {
    if (!step) {
        return {
            count: null,
            label: null,
            blockId: null
        };
    }
    switch(step.kind){
        case `place`:
            return {
                count: step.material.count,
                label: null,
                blockId: palette[step.step.state]?.id ?? null
            };
        case `clear`:
            return {
                count: null,
                label: `clear the site`,
                blockId: null
            };
        case `restock`:
            return {
                count: null,
                label: `fill your inventory`,
                blockId: null
            };
    }
}
function At1Component({ plan, steps, step, counter, missingBlocks, newerAvailable }) {
    let o = i_1(`Build`);
    let c = (state)=>palette[state]?.id ?? ``;
    let palette = plan.instructions.palette;
    let u = n_3(z.useMemo(()=>{
        if (step?.kind === `place`) {
            return [
                palette[step.step.state]?.id ?? ``
            ];
        }
        return [];
    }, [
        step,
        palette
    ]));
    if (!step) {
        return <div className={`flex shrink-0 flex-col gap-2 border border-input bg-card p-3`}><div className={`flex items-baseline gap-2`}><p className={`text-sm text-foreground`}>{o(`done.title`)}</p>{counter && <span className={`ml-auto shrink-0`}>{counter}</span>}</div><p className={`text-[13px] text-foreground-secondary`}>{o(`done.body`)}</p></div>;
    }
    if (step.kind === `clear`) {
        return <div className={`flex shrink-0 flex-col gap-3 border border-input bg-card p-3`}><div><div className={`flex items-baseline gap-2`}><span className={`text-sm text-foreground`}>{o(`clear.title`)}</span>{counter && <span className={`ml-auto shrink-0`}>{counter}</span>}</div><p className={`mt-0.5 text-[13px] text-foreground-secondary`}>{o(`clear.size`, {
            width: step.size.w,
            depth: step.size.d,
            height: step.size.h
        })}</p></div><p className={`text-[13px] text-foreground-secondary`}>{o(`clear.body`)}</p></div>;
    }
    if (step.kind === `restock`) {
        let materials = step.step.items.length;
        return <div className={`flex shrink-0 flex-col gap-2 border border-input bg-card p-3`}><div className={`flex items-baseline gap-2`}><span className={`text-sm text-foreground`}>{o(`restock.title`)}</span>{counter && <span className={`ml-auto shrink-0`}>{counter}</span>}</div><p className={`text-[13px] text-foreground-secondary`}>{o(`restock.size`, {
            materials,
            slots: step.step.slots,
            capacity: 27
        })}</p></div>;
    }
    let d = plan.instructions.palette[step.step.state];
    let f = et(plan, steps, step.index);
    let p = ot(step.form, step.step.shape);
    let m = [
        ...Ee(step.step),
        ...d ? Te(d) : []
    ];
    return <div className={`flex shrink-0 flex-col gap-3 border border-input bg-card p-3`}><div><div className={`flex items-baseline gap-2`}><XComponent id={c(step.step.state)} info={u(c(step.step.state))} count={step.material.count} className={`text-sm text-foreground`}/>{counter && <span className={`ml-auto shrink-0`}>{counter}</span>}</div>{p && <p className={`mt-0.5 text-[13px] text-foreground-secondary`}>{o(p.key, p.args)}</p>}</div>{f && <p className={`text-[13px] text-foreground`}>{o(`start`, {
        east: f.east,
        south: f.south
    })}</p>}{m.length > 0 && <ul className={`flex flex-col gap-1.5`}>{m.map((e)=><li key={e.id} className={`flex items-start gap-1.5 text-[13px] text-foreground`}><C className={`mt-[2px] size-3 shrink-0 text-foreground-secondary`}/><span>{o(`note.${e.id}`, e)}</span></li>)}</ul>}{missingBlocks > 0 && <p className={`flex items-start gap-1.5 text-[13px] text-amber-500`}><T className={`mt-[2px] size-3 shrink-0`}/>{o(`missing`, {
        count: missingBlocks
    })}</p>}{newerAvailable && <p className={`text-[11px] text-muted-foreground`}>{o(`newer.passive`)}{` `}{o(`newer.restarts`)}</p>}</div>;
}
function ot(form, shape) {
    let dims = [
        shape.w,
        shape.h,
        shape.d
    ].filter((e)=>e > 1).join(`x`);
    switch(form){
        case `single`:
            return null;
        case `line`:
            return {
                key: `shape.line`,
                args: {
                    dims
                }
            };
        case `rect`:
            return {
                key: `shape.rect`,
                args: {
                    dims
                }
            };
        default:
            return {
                key: `shape.box`,
                args: {
                    width: shape.w,
                    height: shape.h,
                    depth: shape.d
                }
            };
    }
}
function st(e, t, n) {
    return r_2(`/schematics/${e}/files/${t}/plan`, {
        method: `POST`,
        headers: {
            "content-type": `application/json`
        },
        body: JSON.stringify({
            mode: n
        })
    });
}
function ct(planId) {
    return r_2(`/plans/${planId}`);
}
function lt(e, stepIndex) {
    return r_2(`/plans/${e}/progress`, {
        method: `PUT`,
        headers: {
            "content-type": `application/json`
        },
        body: JSON.stringify({
            stepIndex
        }),
        keepalive: true
    });
}
function ut(e, t, n) {
    return r_2(`/schematics/${e}/files/${t}/plan/upgrade`, {
        method: `POST`,
        headers: {
            "content-type": `application/json`
        },
        body: JSON.stringify({
            mode: n
        })
    });
}
async function dt(e) {
    let t = await fetch(e);
    if (!t.ok) {
        throw Error(`Could not download the guide (${t.status}).`);
    }
    return new Uint8Array(await t.arrayBuffer());
}
const _t = 1500;
class vt {
    send;
    windowMs;
    pending = null;
    timer;
    constructor(e, t = _t){
        this.send = e;
        this.windowMs = t;
    }
    record(e) {
        this.pending = e;
        if (this.timer === undefined) {
            this.timer = setTimeout(()=>{
                this.timer = undefined;
                this.write();
            }, this.windowMs);
        }
    }
    flush() {
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
        this.write();
    }
    stop() {
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
        }
        this.timer = undefined;
        this.pending = null;
    }
    write() {
        let pending = this.pending;
        this.pending = null;
        if (pending !== null) {
            this.send(pending);
        }
    }
}
const yt = 2000;
const bt = 200;
const Z = [
    1,
    4,
    16,
    64
];
const xt = 200;
const St = (e, t)=>Math.max(xt, (yt + e * bt) / t);
const Ct = (e)=>{
    if (!e) {
        return 1;
    }
    if (H(e)) {
        return e.cells.length;
    }
    if (e.kind === `restock`) {
        return 0;
    }
    let t = e.max.x - e.min.x + 1;
    let n = e.max.y - e.min.y + 1;
    let r = e.max.z - e.min.z + 1;
    return Math.round(t * n * r / 4);
};
const Q = (e)=>{
    console.warn(`[Client] build mode: request failed`, e);
    return {
        messageKey: `gate.stuck`,
        retryable: true
    };
};
const messageKey = `gate.stuck`;
function useTt(schematicId, fileId, n, r, blueprint) {
    let [a, setA] = z.useState(null);
    let [s, setS] = z.useState(null);
    let [l, setL] = z.useState(0);
    let [d, setD] = z.useState(null);
    let pRef = z.useRef(0);
    z.useEffect(()=>{
        pRef.current = l;
    }, [
        l
    ]);
    let [m, setM] = z.useState(0);
    let gRef = z.useRef(null);
    let _RefRef = z.useRef(null);
    z.useEffect(()=>{
        if (!r) {
            return;
        }
        let i = `${schematicId}/${fileId}/${n}/${m}`;
        if (_RefRef.current !== i) {
            _RefRef.current = i;
            gRef.current = null;
            setA(null);
            setS(null);
            setD(null);
            st(schematicId, fileId, n).then(setA).catch((e)=>setD(Q(e)));
        }
    }, [
        r,
        schematicId,
        fileId,
        n,
        m
    ]);
    let vRef = z.useRef(null);
    let yRef = z.useRef(0);
    z.useEffect(()=>{
        if (!a || a.status !== `pending`) {
            vRef.current = null;
            yRef.current = 0;
            return;
        }
        if (vRef.current?.planId !== a.planId) {
            vRef.current = {
                planId: a.planId,
                since: Date.now()
            };
            yRef.current = 0;
        }
        let e = gt(Date.now() - vRef.current.since, yRef.current);
        if (e.kind === `give-up`) {
            setD({
                messageKey,
                retryable: true
            });
            return;
        }
        yRef.current += 1;
        let t = true;
        let n = setTimeout(()=>{
            ct(a.planId).then((e)=>{
                if (t) {
                    setA(e);
                }
            }).catch(()=>{
                if (t) {
                    setA({
                        ...a
                    });
                }
            });
        }, e.delayMs);
        return ()=>{
            t = false;
            clearTimeout(n);
        };
    }, [
        a
    ]);
    z.useEffect(()=>{
        let e = a?.downloadUrl;
        let t = a?.digest;
        if (!(!e || !t || gRef.current === t)) {
            gRef.current = t;
            dt(e).then((e)=>{
                setS(Be(e));
                setL(a?.stepIndex ?? 0);
            }).catch((e)=>setD(Q(e)));
        }
    }, [
        a?.downloadUrl,
        a?.digest,
        a?.stepIndex
    ]);
    let b = z.useMemo(()=>{
        if (s) {
            return Xe(s);
        }
        return [];
    }, [
        s
    ]);
    let marks = z.useMemo(()=>{
        let e = [];
        let t = (e)=>{
            let t = b[e];
            if (t && H(t)) {
                return t.state;
            }
            return null;
        };
        for(let n = 1; n < b.length; n++){
            if (t(n) !== t(n - 1)) {
                e.push(n);
            }
        }
        return e;
    }, [
        b
    ]);
    let step = z.useMemo(()=>{
        if (s) {
            return Ze(b, s.instructions.palette, l);
        }
        return null;
    }, [
        s,
        b,
        l
    ]);
    let C = a?.planId;
    let [crossed, setCrossed] = z.useState([]);
    let ERef = z.useRef(null);
    z.useEffect(()=>{
        if (!C) {
            return;
        }
        let e = new vt((e)=>{
            lt(C, e).catch((e)=>{
                if (e instanceof Error && /not following/i.test(e.message)) {
                    setM((e)=>e + 1);
                    return;
                }
            });
        });
        ERef.current = e;
        let t = ()=>e.flush();
        let n = ()=>{
            if (document.visibilityState === `hidden`) {
                e.flush();
            }
        };
        document.addEventListener(`visibilitychange`, n);
        window.addEventListener(`pagehide`, t);
        return ()=>{
            document.removeEventListener(`visibilitychange`, n);
            window.removeEventListener(`pagehide`, t);
            e.flush();
            ERef.current = null;
        };
    }, [
        C
    ]);
    let takeNewer = z.useCallback(()=>{
        ERef.current?.stop();
        gRef.current = null;
        setS(null);
        setL(0);
        ut(schematicId, fileId, n).then(setA).catch((e)=>setD(Q(e)));
    }, [
        schematicId,
        fileId,
        n
    ]);
    let O = z.useCallback((e)=>{
        let pRef_current = pRef.current;
        let n = Math.max(0, Math.min(Math.round(e), b.length));
        if (n !== pRef_current) {
            setCrossed(s ? Ue(s, pRef_current, n) : []);
            setL(n);
            ERef.current?.record(n);
        }
    }, [
        b.length,
        s
    ]);
    let k = z.useCallback(()=>O(pRef.current + 1), [
        O
    ]);
    let A = z.useCallback(()=>O(pRef.current - 1), [
        O
    ]);
    let [j, setJ] = z.useState(false);
    let [N, setN] = z.useState(4);
    z.useEffect(()=>{
        if (!j || b.length === 0) {
            return;
        }
        let e;
        let t = (n)=>{
            if (n >= b.length) {
                setJ(false);
                return;
            }
            e = setTimeout(()=>{
                O(n + 1);
                t(n + 1);
            }, St(Ct(b[n]), N));
        };
        t(pRef.current);
        return ()=>clearTimeout(e);
    }, [
        j,
        O,
        b,
        N
    ]);
    let F = z.useCallback((e)=>{
        setJ(false);
        e();
    }, []);
    return {
        state: d ? {
            phase: `failed`,
            ...d
        } : a?.status === `failed` ? {
            phase: `failed`,
            message: a.error ?? `This build could not be planned.`,
            retryable: false
        } : a ? a.status === `pending` ? {
            phase: `compiling`
        } : !s || !blueprint ? {
            phase: `downloading`
        } : {
            phase: `ready`,
            plan: s,
            step,
            cursor: l,
            totalSteps: b.length,
            steps: b,
            blueprint,
            crossed,
            marks,
            playing: j,
            speed: N
        } : {
            phase: `opening`
        },
        newerAvailable: a?.newerAvailable === true,
        next: ()=>F(k),
        back: ()=>F(A),
        seek: (e)=>F(()=>O(e)),
        setPlaying: setJ,
        setSpeed: setN,
        takeNewer,
        retry: ()=>{
            setD(null);
            setM((e)=>e + 1);
        }
    };
}
function EtComponent({ cursor, totalSteps, marks, playing, onPlay, speed, onSpeed, focused, onFocus, onSeek, onNext, onBack, className }) {
    let b = i_1(`Build`);
    let S = cursor >= totalSteps;
    let percent = totalSteps === 0 ? 100 : cursor / totalSteps * 100;
    return <div className={t_2(`pointer-events-auto flex w-full max-w-[36rem] items-center gap-[3px] border border-input bg-card/95 p-[5px] shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md select-none`, className)}><R label={b(playing ? `transport.pause` : `transport.play`)} active={playing} disabled={S} onClick={()=>onPlay(!playing)}>{playing ? <Pe/> : <M1/>}</R><R label={b(`transport.speed`, {
        speed
    })} onClick={()=>onSpeed(Z[(Z.indexOf(speed) + 1) % Z.length])} className={`font-mono text-[11px] tabular-nums`}><span>{speed}{`x`}</span></R><R label={b(focused ? `transport.focusOn` : `transport.focusOff`)} active={focused} onClick={()=>onFocus(!focused)}><Me/></R><span className={`mx-1 h-5 w-px shrink-0 self-center bg-input`}/><R label={b(`transport.back`)} disabled={cursor === 0} onClick={onBack}><F1/></R><DtComponent cursor={cursor} totalSteps={totalSteps} marks={marks} percent={percent} onSeek={onSeek}/><Bt><Ut render=<button type={`button`} onClick={onNext} disabled={S} className={`inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap border border-border bg-muted/50 px-2.5 font-mono text-[12.5px] font-semibold text-foreground-secondary transition hover:border-input hover:text-foreground disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4`}>{b(`transport.next`)}<X1/></button>/><Vt side={`top`}>{b(S ? `transport.finished` : `transport.nextHint`)}</Vt></Bt></div>;
}
function DtComponent({ cursor, totalSteps, marks, percent, onSeek }) {
    let a = i_1(`Build`);
    let o = marks.length > 0 && marks.length <= 120 && totalSteps > 0;
    return <div className={`relative flex min-w-0 flex-1 items-center px-1`}><div className={`pointer-events-none absolute inset-x-1 h-1.5`}><div className={`size-full bg-input`}/><div className={`absolute inset-y-0 left-0 bg-primary`} style={{
        width: `${percent}%`
    }}/>{o && marks.map((e)=><span key={e} className={`absolute top-0 h-full w-px bg-foreground/45`} style={{
            left: `${e / totalSteps * 100}%`
        }}/>)}</div><input type={`range`} min={0} max={totalSteps} step={1} value={cursor} onChange={(e)=>onSeek(e.currentTarget.valueAsNumber)} aria-label={a(`transport.scrubber`)} aria-valuetext={a(`transport.scrubberValue`, {
        current: Math.min(cursor + 1, totalSteps),
        total: totalSteps
    })} className={`relative h-5 w-full cursor-pointer appearance-none bg-transparent outline-none
          [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-card [&::-moz-range-thumb]:bg-primary
          [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-card [&::-webkit-slider-thumb]:bg-primary`}/></div>;
}
function Ot(e, t, n) {
    let r = Math.min(t, e.length);
    let i = -1;
    for(let t = r; t >= 0; t--){
        if (e[t]?.kind === `restock`) {
            i = t;
            break;
        }
    }
    let a = i >= 0 ? e[i] : undefined;
    if (!a || a.kind !== `restock`) {
        return null;
    }
    let o = (state)=>n[state]?.id ?? String(state);
    let s = new Map;
    for (let e of a.items){
        s.set(o(e.state), e.count);
    }
    for(let t = i + 1; t <= r && t < e.length; t++){
        let n = e[t];
        if (!n || !H(n)) {
            continue;
        }
        let r = o(n.state);
        s.set(r, (s.get(r) ?? 0) - n.cells.length);
    }
    let stepsLeft = 0;
    for(let t = r + 1; t < e.length && e[t]?.kind !== `restock`; t++){
        stepsLeft++;
    }
    return {
        atRestock: i === r,
        items: a.items.map((e)=>({
                state: e.state,
                total: e.count,
                left: Math.max(0, s.get(o(e.state)) ?? 0)
            })),
        stepsLeft,
        slotsLeft: 0
    };
}
function kt(e, t, n) {
    let r = Ot(e, t, n);
    if (r) {
        return {
            ...r,
            slotsLeft: r.items.reduce((acc, item)=>acc + U(n[item.state]?.name ?? ``, item.left), 0)
        };
    }
    return null;
}
function At(e, t) {
    let { dims, origin } = e.instructions;
    let i = [];
    let a = (e, n, r)=>{
        let i = t.blocks.get(`${e}-${n}-${r}`);
        if (i) {
            return zt(i);
        }
        return null;
    };
    let missing = 0;
    let s = 0;
    let c = new Map;
    for (let t of W(e.instructions)){
        let e = [];
        for (let i of H(t) ? t.order : []){
            let t = V(dims, i);
            let s = t.x + origin.x;
            let c = t.y + origin.y;
            let l = t.z + origin.z;
            let u = a(s, c, l);
            if (u) {
                e.push({
                    x: s,
                    y: c,
                    z: l,
                    state: u
                });
            } else {
                missing++;
            }
        }
        c.set(s, e);
        s++;
    }
    let l = Math.max(0, s - 1);
    for (let t of e.extras.cells){
        let e = V(dims, t.cell);
        let i = e.x + origin.x;
        let s = e.y + origin.y;
        let u = e.z + origin.z;
        let d = a(i, s, u);
        if (!d) {
            missing++;
            continue;
        }
        c.get(Math.min(t.step, l))?.push({
            x: i,
            y: s,
            z: u,
            state: d
        });
    }
    for(let e = 0; e < s; e++){
        i.push(c.get(e) ?? []);
    }
    return {
        steps: i,
        missing
    };
}
function NtComponent(schematicId, fileId, n, blueprint, i, onExit) {
    let o = useTt(schematicId, fileId, n ?? `survival`, n !== null, blueprint);
    let { state } = o;
    let c = n !== null && state.phase === `ready` ? state : null;
    let [l, setL] = z.useState(false);
    let d = o.newerAvailable && !l && c !== null;
    let [f, setF] = z.useState(true);
    z.useEffect(()=>{
        if (i) {
            i.setOnFocusBroken(()=>setF(false));
            return ()=>i.setOnFocusBroken(null);
        }
    }, [
        i
    ]);
    let m = c?.plan;
    let h = c?.blueprint;
    let g = z.useMemo(()=>{
        if (m && h) {
            return At(m, h);
        }
        return null;
    }, [
        m,
        h
    ]);
    let _ = g?.steps ?? null;
    let v = c?.steps;
    let y = c?.cursor;
    let b = m?.instructions.palette;
    let x = z.useMemo(()=>{
        if (v && b && y !== undefined) {
            return kt(v, y, b);
        }
        return null;
    }, [
        v,
        y,
        b
    ]);
    let S = z.useMemo(()=>{
        if (c?.plan) {
            return He(c.plan);
        }
        return null;
    }, [
        c?.plan
    ]);
    let C = c ? Math.min(c.cursor + 1, _?.length ?? 0) : null;
    let wRef = z.useRef(null);
    z.useEffect(()=>{
        wRef.current ??= new Mt;
        wRef.current.apply(i, _, C);
        if (!i) {
            return;
        }
        i.setRevealPlan(S);
        let e = c?.plan;
        let t = c?.step;
        let n = t && e ? tt(e, t.step) : null;
        i.setStepBox(n, t?.kind === `clear`);
        let r = t?.kind === `place` ? t.step.anchor : undefined;
        let at = r && e ? nt(e, r.cell) : null;
        i.setStepLeader(at && n ? {
            from: rt(n, at),
            at
        } : null);
        let o = !!(c && e && n && $e(c.steps, c.cursor));
        i.setSiteLeader(o && e && n ? {
            step: n,
            site: Qe(e)
        } : null);
        i.setFocusPoint(f && n ? {
            x: (n.min.x + n.max.x + 1) / 2,
            y: (n.min.y + n.max.y + 1) / 2,
            z: (n.min.z + n.max.z + 1) / 2
        } : null);
        i.setReveal(c ? {
            done: c.cursor,
            now: c.cursor + 1
        } : null);
    });
    let { setPlaying } = o;
    let onMode = z.useCallback((e)=>{
        if (e === `explore`) {
            setPlaying(false);
        }
    }, [
        setPlaying
    ]);
    if (!n) {
        return;
    }
    if (state.phase === `failed`) {
        return {
            panel: null,
            transport: null,
            sheet: null,
            gate: <WeComponent phase={`failed`} messageKey={state.messageKey} message={state.message} retryable={state.retryable} onRetry={o.retry} onExit={onExit}/>,
            onMode
        };
    }
    if (!c) {
        return {
            panel: null,
            transport: null,
            sheet: null,
            gate: <WeComponent phase={`waiting`} onRetry={o.retry} onExit={onExit}/>,
            onMode
        };
    }
    let DComponent = (counter)=><At1Component plan={c.plan} steps={c.steps} step={c.step} counter={counter} missingBlocks={g?.missing ?? 0} newerAvailable={o.newerAvailable}/>;
    let O = DComponent();
    let k = x ? <Qe1Component plan={c.plan} load={x}/> : null;
    return {
        sheet: <KeComponent step={DComponent(<span className={`font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground`}>{Math.min(c.cursor + 1, c.totalSteps)}{`/`}{c.totalSteps}</span>)} load={k} atRestock={x?.atRestock ?? false} materials={x?.items.length ?? 0}/>,
        panel: <div className={`flex min-h-0 flex-1 flex-col gap-3`}><JeComponent open={d} onKeep={()=>setL(true)} onTake={()=>{
            setL(true);
            o.takeNewer();
        }}/>{O}{k}</div>,
        gate: null,
        transport: <><YeComponent cursor={c.cursor} totalSteps={c.totalSteps} {...it(c.step, c.plan.instructions.palette)}/><EtComponent cursor={c.cursor} totalSteps={c.totalSteps} marks={c.marks} playing={c.playing} onPlay={o.setPlaying} speed={c.speed} onSpeed={o.setSpeed} focused={f} onFocus={setF} onSeek={o.seek} onNext={o.next} onBack={o.back}/></>,
        onMode
    };
}
function usePt(schematicId, fileId, n = true) {
    let [blueprint, setBlueprint] = z.useState(null);
    let [failed, setFailed] = z.useState(false);
    z.useEffect(()=>{
        if (!n) {
            return;
        }
        let r = new AbortController;
        setFailed(false);
        t_5(schematicId, fileId, r.signal).then(setBlueprint).catch(()=>{
            if (!r.signal.aborted) {
                setFailed(true);
            }
        });
        return ()=>r.abort();
    }, [
        schematicId,
        fileId,
        n
    ]);
    return {
        blueprint,
        failed
    };
}
function useFt(e, { exclude } = {}) {
    let [n, setN] = z.useState(null);
    z.useEffect(()=>{
        if (!e || n) {
            return;
        }
        let t = false;
        r_2(`/schematics?sort=trending`).then((e)=>{
            if (!t) {
                setN(e);
            }
        }).catch(()=>{});
        return ()=>{
            t = true;
        };
    }, [
        e,
        n
    ]);
    if (n) {
        return {
            items: n.items.filter((e)=>e.id !== exclude),
            total: n.total
        };
    }
    return null;
}
const $ = r(`/$locale/schematics/$id/{-$slug}`);
export function ViewerOverlay({ schematicId, fileId, title, author }) {
    let i = i_1(`Viewer`);
    let c = $.useNavigate();
    let l = $.useSearch();
    let u = l.view === `3d`;
    let d = u ? l.build ?? null : null;
    let fRef = z.useRef(u);
    let onClick = z.useCallback(()=>{
        if (fRef.current) {
            fRef.current = false;
            c({
                to: `.`,
                search: (e)=>({
                        ...e,
                        view: undefined,
                        build: undefined
                    }),
                replace: true
            });
        } else {
            window.history.back();
        }
    }, [
        c
    ]);
    let h = z.useCallback((build)=>{
        c({
            to: `.`,
            search: (t)=>({
                    ...t,
                    build
                }),
            replace: true
        });
    }, [
        c
    ]);
    z.useEffect(()=>{
        if (!u) {
            return;
        }
        let e = (e)=>{
            if (e.key === `Escape`) {
                onClick();
            }
        };
        window.addEventListener(`keydown`, e);
        let overflow = document.body.style.overflow;
        document.body.style.overflow = `hidden`;
        return ()=>{
            window.removeEventListener(`keydown`, e);
            document.body.style.overflow = overflow;
        };
    }, [
        u,
        onClick
    ]);
    let { blueprint, failed } = usePt(schematicId, fileId, u);
    let y = useFt(u, {
        exclude: schematicId
    });
    let [x, setX] = z.useState(null);
    let w = i_1(`Build`);
    let { granted, known } = c_1(`build_mode`);
    let [O, setO] = z.useState(false);
    let A = o();
    let M = granted ? d : null;
    z.useEffect(()=>{
        if (!(!d || !known || granted || A)) {
            Lt(`build_mode_requested`, {
                surface: `url`,
                entitled: false
            });
            setO(true);
            c({
                to: `.`,
                search: (e)=>({
                        ...e,
                        build: undefined
                    }),
                replace: true
            });
        }
    }, [
        d,
        known,
        granted,
        A,
        c
    ]);
    let build = NtComponent(schematicId, fileId, M, blueprint, x, ()=>h(undefined));
    if (!u) {
        return null;
    }
    let F = <B variant={`outline`} size={`sm`} onClick={onClick}><S/>{` `}{i(`close`)}</B>;
    let I = <B variant={M ? `secondary` : `default`} size={`sm`} disabled={A} onClick={()=>{
        if (M) {
            return h(undefined);
        }
        Lt(`build_mode_requested`, {
            surface: `viewer`,
            entitled: granted
        });
        if (granted) {
            return h(`survival`);
        }
        setO(true);
    }}><P1 className={`size-4`}/>{w(A ? `activating` : M ? `exit` : `enter`)}</B>;
    return he.createPortal(<div className={`fixed inset-0 z-50 bg-background`}><BuildModeIntro open={O} onOpenChange={setO} surface={`viewer`}/>{failed ? <div className={`grid size-full place-items-center text-muted-foreground`}><div className={`absolute right-3 top-3`}>{F}</div><span className={`flex items-center gap-2 text-[13px]`}><T className={`size-4`} aria-hidden/>{` `}{i(`failed`)}</span></div> : <ViewerStage blueprint={blueprint} loading={blueprint ? undefined : {
        phase: `reading`
    }} className={`size-full`} title={title} fileName={title} onController={setX} onMode={build?.onMode} badge={author ? <Te1>{i.rich(`byAuthor`, {
        author: ()=><J1 name={author.name} badge={author.badge}/>
    })}</Te1> : undefined} actions=<div className={`flex items-center gap-2`}>{I}{F}</div> feedbackSubject={{
        kind: `work`,
        schematicId,
        fileId
    }} build={build} discovery={M ? undefined : {
        items: y?.items ?? [],
        total: y?.total,
        title: i(`trending`)
    }}/>}</div>, document.body);
}
