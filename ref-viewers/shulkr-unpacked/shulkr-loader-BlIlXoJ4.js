import { N } from "./shulkr-loader-BlIlXoJ4/chunk_O.js";
import { n, s, t } from "./jsx-runtime-Db0DjQYK.js";
import { t as t_2 } from "./utils-B6KiDbIe.js";
import { Cr, Sr, br, xr } from "./index-DmN1rqCo.js";
const c = s(n(), 1);
const l = t();
const u = /M(\d+) (\d+)h(\d+)v1h-\d+z/g;
const d = `#f1dcfa`;
const f = 0.02;
const backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(Cr())}")`;
function m(e) {
    let t = e;
    return ()=>{
        t = t * 16807 % 2147483647;
        return t / 2147483647;
    };
}
const h = m(7);
const g = (e)=>(h() * 2 - 1) * e;
const _ = Sr.flatMap((e)=>[
        ...xr[e].matchAll(u)
    ].flatMap(([, t, n, r])=>Array.from({
            length: Number(r)
        }, (r, i)=>({
                r: Number(n),
                c: Number(t) + i,
                col: br[e]
            })))).sort((e, t)=>e.r - t.r || e.c - t.c).map(({ r, c, col })=>({
        r,
        c,
        col,
        d: r + c,
        x: g(12),
        y: g(12),
        a: g(Math.PI),
        j: h() * 260
    }));
const v = (e)=>e - Math.floor(e);
const y = (e)=>Math.max(0, Math.min(1, e));
const b = (e, t, n)=>y((e - t) / (n - t));
const x = (e)=>1 - (1 - e) ** 3;
const S = (e)=>{
    let t = e - 1;
    return t * t * (3.2 * t + 2.2) + 1;
};
const C = {
    build: ({ cell, t })=>{
        for (let n of _){
            let r = v((t - n.d * 28) / 1900);
            let scale = r < 0.22 ? S(b(r, 0, 0.22)) : r < 0.62 ? 1 : 1 - x(b(r, 0.62, 0.82));
            cell(n, {
                scale,
                alpha: Math.min(1, scale * 1.5)
            });
        }
    },
    shimmer: ({ cell, t })=>{
        for (let n of _){
            let r = v((t - n.d * 32) / 1600);
            cell(n, {
                glow: r < 0.18 ? r / 0.18 * 0.75 : r < 0.4 ? (1 - b(r, 0.18, 0.4)) * 0.75 : 0
            });
        }
    },
    layers: ({ cell, t })=>{
        for (let n of _){
            let r = v((t - (14 - n.r) * 70) / 2200);
            let i = x(b(r, 0, 0.16));
            cell(n, {
                alpha: r < 0.58 ? i : 1 - b(r, 0.58, 0.72),
                dy: (i - 1) * 4
            });
        }
    },
    roll: ({ ctx, cell, t: t_1 })=>{
        let r = v(t_1 / 2400) * 4;
        let i = Math.floor(r);
        let a = r - i;
        let o = a < 0.24 ? -6 * x(a / 0.24) : a < 0.76 ? -6 + 96 * (1 - (1 - b(a, 0.24, 0.76)) ** 2.2) : 90;
        let s = (i * 90 + o) * Math.PI / 180;
        ctx.save();
        ctx.translate(8, 7.6);
        ctx.rotate(s);
        ctx.scale(0.78, 0.78);
        ctx.translate(-8, -8);
        for (let e of _){
            cell(e);
        }
        ctx.restore();
        let c = Math.abs(Math.sin(s * 2));
        let l = 9 - c * 2.5;
        ctx.globalAlpha = 0.25 - c * 0.1;
        ctx.fillStyle = `#000`;
        ctx.fillRect(8 - l / 2, 15, l, 0.7);
    },
    scatter: ({ cell, t })=>{
        for (let n of _){
            let r = v((t - n.j) / 2400);
            if (r < 0.34) {
                let t = 1 - x(b(r, 0, 0.34));
                cell(n, {
                    alpha: 1 - t,
                    dx: n.x * t,
                    dy: n.y * t,
                    rot: n.a * t
                });
            } else if (r < 0.66) {
                cell(n);
            } else {
                let t = b(r, 0.66, 1) ** 2;
                cell(n, {
                    alpha: 1 - t,
                    dx: -n.x * t,
                    dy: -n.y * t,
                    rot: -n.a * t
                });
            }
        }
    },
    progress: ({ cell, state })=>{
        state.drawnValue += (state.value - state.drawnValue) * 0.18;
        let n = 2 + state.drawnValue / 100 * 27;
        for (let r of _){
            let i = y(n - r.d + 1);
            let a = state.drawnValue < 99.5 && i > 0 && r.d > n - 1.5;
            cell(r, {
                scale: 0.62 + 0.38 * i,
                alpha: 0.14 + 0.86 * i,
                glow: a ? 0.6 : 0
            });
        }
    }
};
function w(ctx) {
    return (t, { scale = 1, alpha = 1, dx = 0, dy = 0, rot = 0, glow = 0 } = {})=>{
        if (alpha <= 0.01 || scale <= 0.01) {
            return;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = t.col;
        let c = t.c + 0.5 + dx;
        let l = t.r + 0.5 + dy;
        let u = scale / 2 + f;
        if (rot) {
            ctx.save();
            ctx.translate(c, l);
            ctx.rotate(rot);
            ctx.fillRect(-u, -u, u * 2, u * 2);
            ctx.restore();
            return;
        }
        ctx.fillRect(c - u, l - u, u * 2, u * 2);
        if (glow) {
            ctx.globalAlpha = alpha * glow;
            ctx.fillStyle = d;
            ctx.fillRect(c - u, l - u, u * 2, u * 2);
        }
    };
}
let T;
function E() {
    T ??= matchMedia(`(prefers-reduced-motion: reduce)`);
    return T.matches;
}
function D(ctx, state, n) {
    let width = ctx.canvas.width;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.setTransform(width / 16, 0, 0, width / 16, 0, 0);
    let cell = w(ctx);
    if (state.variant !== `progress` && E()) {
        let alpha = 0.75 + 0.25 * Math.cos(n / 255);
        for (let t of _){
            cell(t, {
                alpha
            });
        }
    } else {
        C[state.variant]({
            ctx,
            cell,
            t: n * state.speed,
            state
        });
    }
    ctx.globalAlpha = 1;
}
function PComponent(e) {
    let { size = 48, className, label } = e;
    let variant = e.variant ?? `build`;
    let speed = e.variant === `progress` ? 1 : e.speed ?? 1;
    let s = e.variant === `progress` ? Math.max(0, Math.min(100, e.value)) : 0;
    let uRef = c.useRef(null);
    let dRef = c.useRef({
        variant,
        speed,
        value: s,
        drawnValue: 0
    });
    c.useEffect(()=>{
        Object.assign(dRef.current, {
            variant,
            speed,
            value: s
        });
    }, [
        variant,
        speed,
        s
    ]);
    c.useEffect(()=>{
        let uRef_current = uRef.current;
        let n = uRef_current?.getContext(`2d`);
        if (!uRef_current || !n) {
            return;
        }
        let r = Math.round(size * Math.min(2, window.devicePixelRatio || 1));
        uRef_current.width = r;
        uRef_current.height = r;
        let i = (e)=>D(n, dRef.current, e);
        let a = N(uRef_current, i);
        i(performance.now());
        uRef_current.style.backgroundImage = `none`;
        return a;
    }, [
        size
    ]);
    let f = label === undefined ? {
        "aria-hidden": true
    } : variant === `progress` ? {
        role: `progressbar`,
        "aria-label": label,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": Math.round(s)
    } : {
        role: `status`,
        "aria-label": label
    };
    return <canvas ref={uRef} className={t_2(`inline-block align-middle`, className)} style={{
        width: size,
        height: size,
        backgroundImage,
        backgroundSize: `100% 100%`
    }} {...f}/>;
}
export { PComponent as t };
