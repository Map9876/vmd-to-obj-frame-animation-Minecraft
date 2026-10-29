import { WebGLRenderer } from "./module-87548.js";
import { $EB as side, DXC, G_z, LoY, Pq0, THS, Tap, YJl, Z58, ZyN, cj9, dth, eaF, er$, hxR, mrM, ubm } from "./module-85339.js";
import { DROP_MS, RULE_CUR, RULE_SOLID, inject, tintFor } from "./module-72750.js";
const l = require(11428);
let i = Math.asin(0.6);
export function createEntryStage(canvas, t) {
    let s;
    let u = l.Tg;
    try {
        s = new WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: "low-power"
        });
    } catch (error) {
        t.onError?.(error);
        return {
            setRunning () {},
            dispose () {}
        };
    }
    s.setClearColor(0, 0);
    s.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    let d = new Z58;
    d.add(new dth(16777215, 9408399, 1.75));
    let p = new ZyN(16777215, 1.05);
    p.position.set(5, 10, 6);
    d.add(p);
    let c = new ZyN(16777215, 0.6);
    c.position.set(-6, 4, -3);
    d.add(c);
    let m = new ubm(30, 1, 0.1, 600);
    let h = cj9.degToRad(u.pitch);
    let v = {
        uStep: {
            value: 0
        },
        uCur: {
            value: 0
        },
        uPulse: {
            value: 0.8
        },
        uDrop: {
            value: 0
        }
    };
    let g = new YJl;
    g.rotation.y = u.yaw;
    d.add(g);
    let w = false;
    let M = false;
    let y = false;
    let x = 0;
    let b = 0;
    let S = 0;
    let A = 0;
    let C = 1;
    let P = 1;
    let z = 40;
    let F = 10;
    let _ = 0;
    let E = 0;
    let L = null;
    let R = [];
    let max = 0;
    let idx = 0;
    let k = 0;
    let j = -1;
    let D = null;
    let U = null;
    let Y = null;
    let X = [];
    function O() {
        let e = t.margin(C, P);
        return {
            l: e.l,
            r: C - e.r,
            t: e.t,
            b: P - e.b
        };
    }
    function B() {
        let e = O();
        let t = ((e.l + e.r) / 2 - C / 2 - _) / C;
        let a = ((e.t + e.b) / 2 - P / 2 - E) / P;
        if (Math.abs(t) > 0.001 || Math.abs(a) > 0.001) {
            m.setViewOffset(C, P, -C * t, -P * a, C, P);
        } else {
            m.clearViewOffset();
        }
        m.updateProjectionMatrix();
    }
    function Z() {
        m.position.set(0, z * Math.sin(h), z * Math.cos(h));
        m.lookAt(0, 0, 0);
    }
    function q() {
        if (w) {
            return;
        }
        let a = canvas.getBoundingClientRect();
        C = Math.max(1, a.width);
        P = Math.max(1, a.height);
        s.setSize(C, P, false);
        m.aspect = C / P;
        B();
        if (L) {
            z = (()=>{
                let e = L;
                let a = O();
                let n = Math.max(1, a.r - a.l);
                let o = Math.max(1, a.b - a.t);
                let l = cj9.degToRad(30);
                let i = (()=>{
                    if (t.reduceMotion) {
                        return [
                            u.yaw
                        ];
                    }
                    let e = [];
                    for(let t = 0; t <= 12; t++){
                        e.push(u.yaw + u.sway.amp * (t / 6 - 1));
                    }
                    return e;
                })();
                let s = i.map(Math.cos);
                let f = i.map(Math.sin);
                let d = F / Math.sin(l / 2) * 0.7;
                let p = {
                    l: 0,
                    r: 0,
                    t: 0,
                    b: 0
                };
                let c = new Pq0;
                for(let t = 0; t < 5; t++){
                    m.position.set(0, d * Math.sin(h), d * Math.cos(h));
                    m.lookAt(0, 0, 0);
                    m.updateMatrixWorld(true);
                    c.set(0, 0, 0).project(m);
                    let t = (c.x + 1) / 2 * C;
                    let a = (1 - c.y) / 2 * P;
                    let l_1 = 0;
                    let r_1 = 0;
                    let t_1 = 0;
                    let b_1 = 0;
                    for(let n = 0; n < i.length; n++){
                        let o = s[n];
                        let i = f[n];
                        for(let n = 0; n < e.length; n += 3){
                            let s = e[n];
                            let f = e[n + 2];
                            c.set(s * o + f * i, e[n + 1], f * o - s * i).project(m);
                            let d = (c.x + 1) / 2 * C;
                            let p = (1 - c.y) / 2 * P;
                            if (t - d > l_1) {
                                l_1 = t - d;
                            }
                            if (d - t > r_1) {
                                r_1 = d - t;
                            }
                            if (a - p > t_1) {
                                t_1 = a - p;
                            }
                            if (p - a > b_1) {
                                b_1 = p - a;
                            }
                        }
                    }
                    p = {
                        l: l_1,
                        r: r_1,
                        t: t_1,
                        b: b_1
                    };
                    d *= Math.max((l_1 + r_1) / n, (t_1 + b_1) / o);
                }
                _ = (p.r - p.l) / 2;
                E = (p.b - p.t) / 2;
                return d;
            })();
            B();
        }
        Z();
        if (M && !y) {
            s.render(d, m);
        }
    }
    function I() {
        t.onStep?.({
            idx,
            max,
            chapter: R[idx]?.chapter ?? ""
        });
    }
    function W(e, t) {
        idx = Math.max(0, Math.min(max, e));
        v.uStep.value = idx;
        v.uCur.value = idx;
        k = t;
        I();
    }
    function N(e) {
        x = requestAnimationFrame(N);
        let a = Math.min(0.05, (e - b) / 1000);
        b = e;
        A += a;
        if (!t.reduceMotion) {
            g.rotation.y = u.yaw + u.sway.amp * Math.sin(A * Math.PI * 2 / u.sway.period);
        }
        v.uPulse.value = 0.5 + 0.5 * Math.sin(1000 * A / 160 + i);
        if (j >= 0) {
            let t = Math.min(1, (e - j) / u.rewindMs);
            let a = Math.round(max * (1 - t));
            if (a !== idx) {
                idx = a;
                v.uStep.value = a;
                v.uCur.value = -1;
                I();
            }
            if (t >= 1) {
                j = -1;
                W(1, e);
            }
        } else {
            let t = Math.min(1, (e - k) / DROP_MS);
            v.uDrop.value = 1 - (1 - (1 - t) ** 3);
            if ((e - k) / 1000 >= (()=>{
                if (idx === 0) {
                    return 0.6;
                }
                if (idx === max) {
                    return 2.4;
                }
                let e = R[idx];
                if (e.fast) {
                    return 0.07;
                }
                let t = Math.min(1, 0.34 + 0.03 * (e.count || 1));
                let a = R[idx - 1];
                if (a && a.chapter !== e.chapter) {
                    t += 0.5;
                }
                return t;
            })()) {
                if (idx >= max && u.rewindMs) {
                    j = e;
                    v.uCur.value = -1;
                    v.uDrop.value = 0;
                } else {
                    W(idx >= max ? 1 : idx + 1, e);
                }
            }
        }
        Z();
        s.render(d, m);
    }
    let V = new Tap().loadAsync(u.atlasUrl).then((e)=>{
        e.magFilter = hxR;
        e.minFilter = hxR;
        e.generateMipmaps = false;
        e.colorSpace = er$;
        e.needsUpdate = true;
        D = e;
        return e;
    });
    Promise.all([
        new Promise((resolve, reject)=>{
            try {
                U = new Worker(require.tu(new URL(require.p + require.u(3005), require.b)), {
                    type: undefined
                });
            } catch (error) {
                reject(error);
                return;
            }
            let n = U;
            Y = setTimeout(()=>reject(Error("模型预处理超时")), 45000);
            n.onmessage = (a)=>{
                if (a.data.ok) {
                    resolve(a.data.payload);
                } else {
                    reject(Error(a.data.message));
                }
            };
            n.onerror = (e)=>reject(Error(e.message || "模型 worker 启动失败"));
            let r = {
                objUrl: u.objUrl,
                mtlUrl: u.mtlUrl,
                stepsUrl: u.stepsUrl,
                atlasSize: u.atlasSize,
                fastRoot: u.fastRoot
            };
            n.postMessage(r);
        }).finally(()=>{
            if (Y) {
                clearTimeout(Y);
            }
            Y = null;
            U?.terminate();
            U = null;
        }),
        V
    ]).then(async (e)=>{
        var a;
        let [n, l] = e;
        if (!w) {
            ((e, map)=>{
                let a = new Map;
                for (let l of e.groups){
                    let e = new LoY;
                    e.setAttribute("position", new THS(l.position, 3));
                    e.setAttribute("normal", new THS(l.normal, 3));
                    e.setAttribute("uv", new THS(l.uv, 2));
                    e.setAttribute("aStep", new THS(l.aStep, 1));
                    e.setAttribute("aHide", new THS(l.aHide, 1));
                    X.push(e);
                    let i = a.get(l.name);
                    if (!i) {
                        i = inject(new G_z({
                            map,
                            color: tintFor(l.name, l.kd ?? undefined),
                            alphaTest: 0.5,
                            side
                        }), v, RULE_SOLID);
                        a.set(l.name, i);
                        X.push(i);
                    }
                    g.add(new eaF(e, i));
                }
                let l = new LoY;
                l.setAttribute("position", new THS(e.linePosition, 3));
                l.setAttribute("aStep", new THS(e.lineStep, 1));
                l.setAttribute("aHide", new THS(new Float32Array(e.lineStep.length).fill(1000000), 1));
                let i = inject(new mrM({
                    color: 4767542
                }), v, RULE_CUR);
                X.push(l, i);
                g.add(new DXC(l, i));
                L = e.corners;
                F = Math.hypot(e.size[0], e.size[1], e.size[2]) / 2;
                max = (R = e.steps).length - 1;
            })(n, l);
            q();
            s.initTexture(l);
            await s.compileAsync(d, m);
            if (!w) {
                W(u.startAt, performance.now() - DROP_MS);
                s.render(d, m);
                M = true;
                if ((a = t.onReady) != null) {
                    a.call(t);
                }
                if (y) {
                    S = b = performance.now();
                    x = requestAnimationFrame(N);
                } else {
                    S = performance.now();
                }
            }
        }
    }).catch((e)=>{
        let a;
        if (!(w || (a = t.onError) == null)) {
            a.call(t, e);
        }
    });
    let G = new ResizeObserver(()=>q());
    if (canvas.parentElement) {
        G.observe(canvas.parentElement);
    }
    return {
        setRunning: function(e) {
            if (w || e === y) {
                return;
            }
            y = e;
            let t = performance.now();
            if (M) {
                if (e) {
                    let e = t - S;
                    k += e;
                    if (j >= 0) {
                        j += e;
                    }
                    b = t;
                    x = requestAnimationFrame(N);
                } else {
                    S = t;
                    cancelAnimationFrame(x);
                }
            }
        },
        dispose () {
            if (!w) {
                w = true;
                y = false;
                cancelAnimationFrame(x);
                G.disconnect();
                if (Y) {
                    clearTimeout(Y);
                }
                if (U != null) {
                    U.terminate();
                }
                U = null;
                X.forEach((e)=>e.dispose());
                if (D != null) {
                    D.dispose();
                }
                s.dispose();
                s.forceContextLoss();
            }
        }
    };
}
