let n;
Object.defineProperty(exports, "P", {
    enumerable: true,
    get () {
        return rp;
    }
});
const s = require("./module-61426.js");
let r = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY"
];
let o = new Set(r);
let a = (t)=>180 * t / Math.PI;
let l = (t)=>u(a(Math.atan2(t[1], t[0])));
let h = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (t)=>(Math.abs(t[0]) + Math.abs(t[3])) / 2,
    rotate: l,
    rotateZ: l,
    skewX: (t)=>a(Math.atan(t[1])),
    skewY: (t)=>a(Math.atan(t[2])),
    skew: (t)=>(Math.abs(t[1]) + Math.abs(t[2])) / 2
};
let u = (t)=>{
    if ((t %= 360) < 0) {
        t += 360;
    }
    return t;
};
let scaleX = (t)=>Math.sqrt(t[0] * t[0] + t[1] * t[1]);
let scaleY = (t)=>Math.sqrt(t[4] * t[4] + t[5] * t[5]);
let p = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (t)=>(scaleX(t) + scaleY(t)) / 2,
    rotateX: (t)=>u(a(Math.atan2(t[6], t[5]))),
    rotateY: (t)=>u(a(Math.atan2(-t[2], t[0]))),
    rotateZ: l,
    rotate: l,
    skewX: (t)=>a(Math.atan(t[4])),
    skewY: (t)=>a(Math.atan(t[1])),
    skew: (t)=>(Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function m(t) {
    return +!!t.includes("scale");
}
function f(transform, e) {
    let i;
    let n;
    if (!transform || transform === "none") {
        return m(e);
    }
    let s = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    if (s) {
        i = p;
        n = s;
    } else {
        let e = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        i = h;
        n = e;
    }
    if (!n) {
        return m(e);
    }
    let r = i[e];
    let o = n[1].split(",").map(v);
    if (typeof r === "function") {
        return r(o);
    }
    return o[r];
}
function v(t) {
    return parseFloat(t.trim());
}
let g = (t)=>(e)=>typeof e === "string" && e.startsWith(t);
let y = g("--");
let x = g("var(--");
let T = (t)=>!!x(t) && w.test(t.split("/*")[0].trim());
let w = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function P({ top, left, right, bottom }) {
    return {
        x: {
            min: left,
            max: right
        },
        y: {
            min: top,
            max: bottom
        }
    };
}
let b = (t, e, i)=>t + (e - t) * i;
function S(t) {
    return t === undefined || t === 1;
}
function A({ scale, scaleX, scaleY }) {
    return !S(scale) || !S(scaleX) || !S(scaleY);
}
function M(latestValues) {
    return A(latestValues) || V(latestValues) || latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.skewX || latestValues.skewY;
}
function V(latestValues) {
    let e;
    let i;
    return (e = latestValues.x) && e !== "0%" || (i = latestValues.y) && i !== "0%";
}
function E(t, e, i, n, s) {
    if (s !== undefined) {
        t = n + s * (t - n);
    }
    return n + i * (t - n) + e;
}
function C(t, e = 0, i = 1, n, s) {
    t.min = E(t.min, e, i, n, s);
    t.max = E(t.max, e, i, n, s);
}
function D(t, { x, y }) {
    C(t.x, x.translate, x.scale, x.originPoint);
    C(t.y, y.translate, y.scale, y.originPoint);
}
function k(t, e) {
    t.min = t.min + e;
    t.max = t.max + e;
}
function R(t, e, i, scale, s = 0.5) {
    let r = b(t.min, t.max, s);
    C(t, e, i, r, scale);
}
function L(t, e) {
    R(t.x, e.x, e.scaleX, e.scale, e.originX);
    R(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function j(t, e) {
    return P(((t, e)=>{
        if (!e) {
            return t;
        }
        let i = e({
            x: t.left,
            y: t.top
        });
        let n = e({
            x: t.right,
            y: t.bottom
        });
        return {
            top: i.y,
            left: i.x,
            bottom: n.y,
            right: n.x
        };
    })(t.getBoundingClientRect(), e));
}
let F = (t)=>!!(t && t.getVelocity);
let B = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...r
]);
let O = (t, e, i)=>{
    if (i > e) {
        return e;
    }
    if (i < t) {
        return t;
    }
    return i;
};
let I = {
    test: (t)=>typeof t === "number",
    parse: parseFloat,
    transform: (t)=>t
};
let U = {
    ...I,
    transform: (t)=>O(0, 1, t)
};
let N = {
    ...I,
    default: 1
};
let W = (t)=>({
        test: (e)=>typeof e === "string" && e.endsWith(t) && e.split(" ").length === 1,
        parse: parseFloat,
        transform: (e)=>`${e}${t}`
    });
let Y = W("deg");
let z = W("%");
let H = W("px");
let X = W("vh");
let K = W("vw");
let $ = {
    ...z,
    parse: (t)=>z.parse(t) / 100,
    transform: (t)=>z.transform(100 * t)
};
let q = (t)=>(e)=>e.test(t);
let G = [
    I,
    H,
    z,
    Y,
    K,
    X,
    {
        test: (t)=>t === "auto",
        parse: (t)=>t
    }
];
let _ = (t)=>G.find(q(t));
let Z = ()=>{};
let Q = ()=>{};
let J = (t)=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
let tt = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
let te = (t)=>t === I || t === H;
let ti = new Set([
    "x",
    "y",
    "z"
]);
let tn = r.filter((t)=>!ti.has(t));
let ts = {
    width: ({ x }, { paddingLeft = "0", paddingRight = "0" })=>x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
    height: ({ y }, { paddingTop = "0", paddingBottom = "0" })=>y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
    top: (t, { top })=>parseFloat(top),
    left: (t, { left })=>parseFloat(left),
    bottom: ({ y }, { top })=>parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left })=>parseFloat(left) + (x.max - x.min),
    x: (t, { transform })=>f(transform, "x"),
    y: (t, { transform })=>f(transform, "y")
};
ts.translateX = ts.x;
ts.translateY = ts.y;
let linear = (t)=>t;
let to = {};
let ta = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender"
];
let tl = {
    value: null,
    addProjectionMetrics: null
};
function th(t, e) {
    let i = false;
    let n = true;
    let state_1 = {
        delta: 0,
        timestamp: 0,
        isProcessing: false
    };
    let r = ()=>i = true;
    let steps_1 = ta.reduce((acc, item)=>{
        acc[item] = ((t, e)=>{
            let i = new Set;
            let n = new Set;
            let s = false;
            let r = false;
            let o = new WeakSet;
            let a = {
                delta: 0,
                timestamp: 0,
                isProcessing: false
            };
            let l = 0;
            function h(e) {
                if (o.has(e)) {
                    u.schedule(e);
                    t();
                }
                l++;
                e(a);
            }
            let u = {
                schedule: (t, e = false, r = false)=>{
                    let a = r && s ? i : n;
                    if (e) {
                        o.add(t);
                    }
                    if (!a.has(t)) {
                        a.add(t);
                    }
                    return t;
                },
                cancel: (t)=>{
                    n.delete(t);
                    o.delete(t);
                },
                process: (t)=>{
                    a = t;
                    if (s) {
                        r = true;
                        return;
                    }
                    s = true;
                    [i, n] = [
                        n,
                        i
                    ];
                    i.forEach(h);
                    if (e && tl.value) {
                        tl.value.frameloop[e].push(l);
                    }
                    l = 0;
                    i.clear();
                    s = false;
                    if (r) {
                        r = false;
                        u.process(t);
                    }
                }
            };
            return u;
        })(r, e ? item : undefined);
        return acc;
    }, {});
    let { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps_1;
    let f = ()=>{
        let r = to.useManualTiming ? state_1.timestamp : performance.now();
        i = false;
        if (!to.useManualTiming) {
            state_1.delta = n ? 1000 / 60 : Math.max(Math.min(r - state_1.timestamp, 40), 1);
        }
        state_1.timestamp = r;
        state_1.isProcessing = true;
        setup.process(state_1);
        read.process(state_1);
        resolveKeyframes.process(state_1);
        preUpdate.process(state_1);
        update.process(state_1);
        preRender.process(state_1);
        render.process(state_1);
        postRender.process(state_1);
        state_1.isProcessing = false;
        if (i && e) {
            n = false;
            t(f);
        }
    };
    return {
        schedule: ta.reduce((acc, item)=>{
            let a = steps_1[item];
            acc[item] = (e, r = false, o = false)=>{
                if (!i) {
                    i = true;
                    n = true;
                    if (!state_1.isProcessing) {
                        t(f);
                    }
                }
                return a.schedule(e, r, o);
            };
            return acc;
        }, {}),
        cancel: (t)=>{
            for(let e = 0; e < ta.length; e++){
                steps_1[ta[e]].cancel(t);
            }
        },
        state: state_1,
        steps: steps_1
    };
}
let { schedule, cancel, state, steps } = th(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : linear, true);
let tm = new Set;
let tf = false;
let tv = false;
let tg = false;
function ty() {
    if (tv) {
        let t = Array.from(tm).filter((t)=>t.needsMeasurement);
        let e = new Set(t.map((t)=>t.element));
        let i = new Map;
        e.forEach((t)=>{
            let e = ((t)=>{
                let e = [];
                tn.forEach((i)=>{
                    let n = t.getValue(i);
                    if (n !== undefined) {
                        e.push([
                            i,
                            n.get()
                        ]);
                        n.set(+!!i.startsWith("scale"));
                    }
                });
                return e;
            })(t);
            if (e.length) {
                i.set(t, e);
                t.render();
            }
        });
        t.forEach((t)=>t.measureInitialState());
        e.forEach((t)=>{
            t.render();
            let e = i.get(t);
            if (e) {
                e.forEach(([e, i])=>{
                    t.getValue(e)?.set(i);
                });
            }
        });
        t.forEach((t)=>t.measureEndState());
        t.forEach((t)=>{
            if (t.suspendedScrollY !== undefined) {
                window.scrollTo(0, t.suspendedScrollY);
            }
        });
    }
    tv = false;
    tf = false;
    tm.forEach((t)=>t.complete(tg));
    tm.clear();
}
function tx() {
    tm.forEach((t)=>{
        t.readKeyframes();
        if (t.needsMeasurement) {
            tv = true;
        }
    });
}
class tT {
    constructor(t, e, i, n, s, r = false){
        this.state = "pending";
        this.isAsync = false;
        this.needsMeasurement = false;
        this.unresolvedKeyframes = [
            ...t
        ];
        this.onComplete = e;
        this.name = i;
        this.motionValue = n;
        this.element = s;
        this.isAsync = r;
    }
    scheduleResolve() {
        this.state = "scheduled";
        if (this.isAsync) {
            tm.add(this);
            if (!tf) {
                tf = true;
                schedule.read(tx);
                schedule.resolveKeyframes(ty);
            }
        } else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        let { unresolvedKeyframes, name, element, motionValue } = this;
        if (unresolvedKeyframes[0] === null) {
            let s = motionValue?.get();
            let r = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (s !== undefined) {
                unresolvedKeyframes[0] = s;
            } else if (element && name) {
                let n = element.readValue(name, r);
                if (n != null) {
                    unresolvedKeyframes[0] = n;
                }
            }
            if (unresolvedKeyframes[0] === undefined) {
                unresolvedKeyframes[0] = r;
            }
            if (motionValue && s === undefined) {
                motionValue.set(unresolvedKeyframes[0]);
            }
        }
        for(let e = 1; e < unresolvedKeyframes.length; e++){
            unresolvedKeyframes[e] ?? (unresolvedKeyframes[e] = unresolvedKeyframes[e - 1]);
        }
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(t = false) {
        this.state = "complete";
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t);
        tm.delete(this);
    }
    cancel() {
        if (this.state === "scheduled") {
            tm.delete(this);
            this.state = "pending";
        }
    }
    resume() {
        if (this.state === "pending") {
            this.scheduleResolve();
        }
    }
}
let tw = (t)=>/^0[^.\s]+$/u.test(t);
let tP = (t)=>Math.round(100000 * t) / 100000;
let tb = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
let tS = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
let tA = (t, e)=>(i)=>!!(typeof i === "string" && tS.test(i) && i.startsWith(t) || e && i != null && Object.prototype.hasOwnProperty.call(i, e));
let tM = (t, e, i)=>(n)=>{
        if (typeof n !== "string") {
            return n;
        }
        let [s, r, o, a] = n.match(tb);
        return {
            [t]: parseFloat(s),
            [e]: parseFloat(r),
            [i]: parseFloat(o),
            alpha: a !== undefined ? parseFloat(a) : 1
        };
    };
let tV = {
    ...I,
    transform: (t)=>Math.round(O(0, 255, t))
};
let tE = {
    test: tA("rgb", "red"),
    parse: tM("red", "green", "blue"),
    transform: ({ red, green, blue, alpha = 1 })=>`rgba(${tV.transform(red)}, ${tV.transform(green)}, ${tV.transform(blue)}, ${tP(U.transform(alpha))})`
};
let tC = {
    test: tA("#"),
    parse: function(t) {
        let e = "";
        let i = "";
        let n = "";
        let s = "";
        if (t.length > 5) {
            e = t.substring(1, 3);
            i = t.substring(3, 5);
            n = t.substring(5, 7);
            s = t.substring(7, 9);
        } else {
            e = t.substring(1, 2);
            i = t.substring(2, 3);
            n = t.substring(3, 4);
            s = t.substring(4, 5);
            e += e;
            i += i;
            n += n;
            s += s;
        }
        return {
            red: parseInt(e, 16),
            green: parseInt(i, 16),
            blue: parseInt(n, 16),
            alpha: s ? parseInt(s, 16) / 255 : 1
        };
    },
    transform: tE.transform
};
let tD = {
    test: tA("hsl", "hue"),
    parse: tM("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha = 1 })=>`hsla(${Math.round(hue)}, ${z.transform(tP(saturation))}, ${z.transform(tP(lightness))}, ${tP(U.transform(alpha))})`
};
let tk = {
    test: (t)=>tE.test(t) || tC.test(t) || tD.test(t),
    parse: (t)=>{
        if (tE.test(t)) {
            return tE.parse(t);
        }
        if (tD.test(t)) {
            return tD.parse(t);
        }
        return tC.parse(t);
    },
    transform: (t)=>{
        if (typeof t === "string") {
            return t;
        }
        if (t.hasOwnProperty("red")) {
            return tE.transform(t);
        }
        return tD.transform(t);
    },
    getAnimatableNone: (t)=>{
        let e = tk.parse(t);
        e.alpha = 0;
        return tk.transform(e);
    }
};
let tR = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
let tL = "number";
let tj = "color";
let tF = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function tB(t) {
    let e = t.toString();
    let values = [];
    let indexes = {
        color: [],
        number: [],
        var: []
    };
    let types = [];
    let r = 0;
    let split = e.replace(tF, (t)=>{
        if (tk.test(t)) {
            indexes.color.push(r);
            types.push(tj);
            values.push(tk.parse(t));
        } else if (t.startsWith("var(")) {
            indexes.var.push(r);
            types.push("var");
            values.push(t);
        } else {
            indexes.number.push(r);
            types.push(tL);
            values.push(parseFloat(t));
        }
        ++r;
        return "${}";
    }).split("${}");
    return {
        values,
        split,
        indexes,
        types
    };
}
function parse(t) {
    return tB(t).values;
}
function createTransformer(t) {
    let { split, types } = tB(t);
    let split_length = split.length;
    return (t)=>{
        let s = "";
        for(let r = 0; r < split_length; r++){
            s += split[r];
            if (t[r] !== undefined) {
                let e = types[r];
                if (e === tL) {
                    s += tP(t[r]);
                } else if (e === tj) {
                    s += tk.transform(t[r]);
                } else {
                    s += t[r];
                }
            }
        }
        return s;
    };
}
let tU = (t)=>{
    if (typeof t === "number") {
        return 0;
    }
    if (tk.test(t)) {
        return tk.getAnimatableNone(t);
    }
    return t;
};
let tN = {
    test: function(t) {
        return isNaN(t) && typeof t === "string" && (t.match(tb)?.length || 0) + (t.match(tR)?.length || 0) > 0;
    },
    parse,
    createTransformer,
    getAnimatableNone: function(t) {
        let e = parse(t);
        return createTransformer(t)(e.map(tU));
    }
};
let tW = new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity"
]);
function tY(t) {
    let [e, i] = t.slice(0, -1).split("(");
    if (e === "drop-shadow") {
        return t;
    }
    let [n] = i.match(tb) || [];
    if (!n) {
        return t;
    }
    let s = i.replace(n, "");
    let r = +!!tW.has(e);
    if (n !== i) {
        r *= 100;
    }
    return `${e}(${r}${s})`;
}
let tz = /\b([a-z-]*)\(.*?\)/gu;
let tH = {
    ...tN,
    getAnimatableNone: (t)=>{
        let e = t.match(tz);
        if (e) {
            return e.map(tY).join(" ");
        }
        return t;
    }
};
let tX = {
    ...I,
    transform: Math.round
};
let tK = {
    borderWidth: H,
    borderTopWidth: H,
    borderRightWidth: H,
    borderBottomWidth: H,
    borderLeftWidth: H,
    borderRadius: H,
    radius: H,
    borderTopLeftRadius: H,
    borderTopRightRadius: H,
    borderBottomRightRadius: H,
    borderBottomLeftRadius: H,
    width: H,
    maxWidth: H,
    height: H,
    maxHeight: H,
    top: H,
    right: H,
    bottom: H,
    left: H,
    padding: H,
    paddingTop: H,
    paddingRight: H,
    paddingBottom: H,
    paddingLeft: H,
    margin: H,
    marginTop: H,
    marginRight: H,
    marginBottom: H,
    marginLeft: H,
    backgroundPositionX: H,
    backgroundPositionY: H,
    rotate: Y,
    rotateX: Y,
    rotateY: Y,
    rotateZ: Y,
    scale: N,
    scaleX: N,
    scaleY: N,
    scaleZ: N,
    skew: Y,
    skewX: Y,
    skewY: Y,
    distance: H,
    translateX: H,
    translateY: H,
    translateZ: H,
    x: H,
    y: H,
    z: H,
    perspective: H,
    transformPerspective: H,
    opacity: U,
    originX: $,
    originY: $,
    originZ: H,
    zIndex: tX,
    fillOpacity: U,
    strokeOpacity: U,
    numOctaves: tX
};
let t$ = {
    ...tK,
    color: tk,
    backgroundColor: tk,
    outlineColor: tk,
    fill: tk,
    stroke: tk,
    borderColor: tk,
    borderTopColor: tk,
    borderRightColor: tk,
    borderBottomColor: tk,
    borderLeftColor: tk,
    filter: tH,
    WebkitFilter: tH
};
let tq = (t)=>t$[t];
function tG(t, e) {
    let i = tq(t);
    if (i !== tH) {
        i = tN;
    }
    if (i.getAnimatableNone) {
        return i.getAnimatableNone(e);
    }
}
let t_ = new Set([
    "auto",
    "none",
    "0"
]);
class tZ extends tT {
    constructor(t, e, i, n, s){
        super(t, e, i, n, s, true);
    }
    readKeyframes() {
        let { unresolvedKeyframes, element, name } = this;
        if (!element || !element.current) {
            return;
        }
        super.readKeyframes();
        for(let i = 0; i < unresolvedKeyframes.length; i++){
            let n = unresolvedKeyframes[i];
            if (typeof n === "string" && T(n = n.trim())) {
                let s = function t(e, i, n = 1) {
                    Q(n <= 4, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
                    let [s, r] = ((t)=>{
                        let e = tt.exec(t);
                        if (!e) {
                            return [
                                , 
                            ];
                        }
                        let [, i, n, s] = e;
                        return [
                            `--${i ?? n}`,
                            s
                        ];
                    })(e);
                    if (!s) {
                        return;
                    }
                    let o = window.getComputedStyle(i).getPropertyValue(s);
                    if (o) {
                        let t = o.trim();
                        if (J(t)) {
                            return parseFloat(t);
                        }
                        return t;
                    }
                    if (T(r)) {
                        return t(r, i, n + 1);
                    }
                    return r;
                }(n, element.current);
                if (s !== undefined) {
                    unresolvedKeyframes[i] = s;
                }
                if (i === unresolvedKeyframes.length - 1) {
                    this.finalKeyframe = n;
                }
            }
        }
        this.resolveNoneKeyframes();
        if (!B.has(name) || unresolvedKeyframes.length !== 2) {
            return;
        }
        let [n, s] = unresolvedKeyframes;
        let r = _(n);
        let o = _(s);
        if (r !== o) {
            if (te(r) && te(o)) {
                for(let e = 0; e < unresolvedKeyframes.length; e++){
                    let unresolvedKeyframe = unresolvedKeyframes[e];
                    if (typeof unresolvedKeyframe === "string") {
                        unresolvedKeyframes[e] = parseFloat(unresolvedKeyframe);
                    }
                }
            } else {
                if (ts[name]) {
                    this.needsMeasurement = true;
                }
            }
        }
    }
    resolveNoneKeyframes() {
        let { unresolvedKeyframes, name } = this;
        let i = [];
        for(let e = 0; e < unresolvedKeyframes.length; e++){
            let n;
            if (unresolvedKeyframes[e] === null || (typeof (n = unresolvedKeyframes[e]) === "number" ? n === 0 : n === null || n === "none" || n === "0" || tw(n))) {
                i.push(e);
            }
        }
        if (i.length) {
            ((unresolvedKeyframes_1, e, name_1)=>{
                let n;
                let s = 0;
                while(s < unresolvedKeyframes_1.length && !n){
                    let e = unresolvedKeyframes_1[s];
                    if (typeof e === "string" && !t_.has(e) && tB(e).values.length) {
                        n = unresolvedKeyframes_1[s];
                    }
                    s++;
                }
                if (n && name_1) {
                    for (let s of e){
                        unresolvedKeyframes_1[s] = tG(name_1, n);
                    }
                }
            })(unresolvedKeyframes, i, name);
        }
    }
    measureInitialState() {
        let { element, unresolvedKeyframes, name } = this;
        if (!element || !element.current) {
            return;
        }
        if (name === "height") {
            this.suspendedScrollY = window.pageYOffset;
        }
        this.measuredOrigin = ts[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        unresolvedKeyframes[0] = this.measuredOrigin;
        let n = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (n !== undefined) {
            element.getValue(name, n).jump(n, false);
        }
    }
    measureEndState() {
        let { element, name, unresolvedKeyframes } = this;
        if (!element || !element.current) {
            return;
        }
        let n = element.getValue(name);
        if (n) {
            n.jump(this.measuredOrigin, false);
        }
        let s = unresolvedKeyframes.length - 1;
        let r = unresolvedKeyframes[s];
        unresolvedKeyframes[s] = ts[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        if (r !== null && this.finalKeyframe === undefined) {
            this.finalKeyframe = r;
        }
        if (this.removedTransforms?.length) {
            this.removedTransforms.forEach(([e, i])=>{
                element.getValue(e).set(i);
            });
        }
        this.resolveNoneKeyframes();
    }
}
function tQ(t, e) {
    if (t.indexOf(e) === -1) {
        t.push(e);
    }
}
function tJ(t, e) {
    let i = t.indexOf(e);
    if (i > -1) {
        t.splice(i, 1);
    }
}
class t0 {
    constructor(){
        this.subscriptions = [];
    }
    add(t) {
        tQ(this.subscriptions, t);
        return ()=>tJ(this.subscriptions, t);
    }
    notify(t, e, i) {
        let length = this.subscriptions.length;
        if (length) {
            if (length === 1) {
                this.subscriptions[0](t, e, i);
            } else {
                for(let s = 0; s < length; s++){
                    let n = this.subscriptions[s];
                    if (n) {
                        n(t, e, i);
                    }
                }
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}
function t1() {
    n = undefined;
}
let t2 = {
    now: ()=>{
        if (n === undefined) {
            t2.set(state.isProcessing || to.useManualTiming ? state.timestamp : performance.now());
        }
        return n;
    },
    set: (t)=>{
        n = t;
        queueMicrotask(t1);
    }
};
let t3 = {
    current: undefined
};
class t5 {
    constructor(t, e = {}){
        this.canTrackVelocity = null;
        this.events = {};
        this.updateAndNotify = (t)=>{
            let e = t2.now();
            if (this.updatedAt !== e) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(t);
            if (this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) {
                for (let t of this.dependents){
                    t.dirty();
                }
            }
        };
        this.hasAnimated = false;
        this.setCurrent(t);
        this.owner = e.owner;
    }
    setCurrent(t) {
        this.current = t;
        this.updatedAt = t2.now();
        if (this.canTrackVelocity === null && t !== undefined) {
            this.canTrackVelocity = !isNaN(parseFloat(this.current));
        }
    }
    setPrevFrameValue(t = this.current) {
        this.prevFrameValue = t;
        this.prevUpdatedAt = this.updatedAt;
    }
    onChange(t) {
        return this.on("change", t);
    }
    on(t, e) {
        if (!this.events[t]) {
            this.events[t] = new t0;
        }
        let i = this.events[t].add(e);
        if (t === "change") {
            return ()=>{
                i();
                schedule.read(()=>{
                    if (!this.events.change.getSize()) {
                        this.stop();
                    }
                });
            };
        }
        return i;
    }
    clearListeners() {
        for(let t in this.events){
            this.events[t].clear();
        }
    }
    attach(t, e) {
        this.passiveEffect = t;
        this.stopPassiveEffect = e;
    }
    set(t) {
        if (this.passiveEffect) {
            this.passiveEffect(t, this.updateAndNotify);
        } else {
            this.updateAndNotify(t);
        }
    }
    setWithVelocity(t, e, i) {
        this.set(e);
        this.prev = undefined;
        this.prevFrameValue = t;
        this.prevUpdatedAt = this.updatedAt - i;
    }
    jump(t, e = true) {
        this.updateAndNotify(t);
        this.prev = t;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        if (e) {
            this.stop();
        }
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
    dirty() {
        this.events.change?.notify(this.current);
    }
    addDependent(t) {
        if (!this.dependents) {
            this.dependents = new Set;
        }
        this.dependents.add(t);
    }
    removeDependent(t) {
        if (this.dependents) {
            this.dependents.delete(t);
        }
    }
    get() {
        if (t3.current) {
            t3.current.push(this);
        }
        return this.current;
    }
    getPrevious() {
        return this.prev;
    }
    getVelocity() {
        let t;
        let e = t2.now();
        if (!this.canTrackVelocity || this.prevFrameValue === undefined || e - this.updatedAt > 30) {
            return 0;
        }
        let i = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
        t = parseFloat(this.current) - parseFloat(this.prevFrameValue);
        if (i) {
            return 1000 / i * t;
        }
        return 0;
    }
    start(t) {
        this.stop();
        return new Promise((resolve)=>{
            this.hasAnimated = true;
            this.animation = t(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(()=>{
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    destroy() {
        this.dependents?.clear();
        this.events.destroy?.notify();
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function t4(t, e) {
    return new t5(t, e);
}
let t9 = [
    ...G,
    tk,
    tN
];
let { schedule: schedule_1 } = th(queueMicrotask, false);
let t7 = {
    animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag"
    ],
    exit: [
        "exit"
    ],
    drag: [
        "drag",
        "dragControls"
    ],
    focus: [
        "whileFocus"
    ],
    hover: [
        "whileHover",
        "onHoverStart",
        "onHoverEnd"
    ],
    tap: [
        "whileTap",
        "onTap",
        "onTapStart",
        "onTapCancel"
    ],
    pan: [
        "onPan",
        "onPanStart",
        "onPanSessionStart",
        "onPanEnd"
    ],
    inView: [
        "whileInView",
        "onViewportEnter",
        "onViewportLeave"
    ],
    layout: [
        "layout",
        "layoutId"
    ]
};
let t8 = {};
for(let t in t7){
    t8[t] = {
        isEnabled: (e)=>t7[t].some((t)=>!!e[t])
    };
}
let et = ()=>({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    });
let ee = ()=>({
        x: et(),
        y: et()
    });
let ei = ()=>({
        min: 0,
        max: 0
    });
let en = ()=>({
        x: ei(),
        y: ei()
    });
const es = require("./module-33577.js");
let er = {
    current: null
};
let eo = {
    current: false
};
let ea = new WeakMap;
function el(t) {
    return t !== null && typeof t === "object" && typeof t.start === "function";
}
function eh(t) {
    return typeof t === "string" || Array.isArray(t);
}
let eu = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit"
];
let ed = [
    "initial",
    ...eu
];
function ec(t) {
    return el(t.animate) || ed.some((e)=>eh(t[e]));
}
function ep(t) {
    return !!(ec(t) || t.variants);
}
function em(t) {
    let e = [
        {},
        {}
    ];
    if (t != null) {
        t.values.forEach((t, i)=>{
            e[0][i] = t.get();
            e[1][i] = t.getVelocity();
        });
    }
    return e;
}
function ef(t, e, i, n) {
    if (typeof e === "function") {
        let [s, r] = em(n);
        e = e(i !== undefined ? i : t.custom, s, r);
    }
    if (typeof e === "string") {
        e = t.variants && t.variants[e];
    }
    if (typeof e === "function") {
        let [s, r] = em(n);
        e = e(i !== undefined ? i : t.custom, s, r);
    }
    return e;
}
let ev = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete"
];
class eg {
    scrapeMotionValuesFromProps(t, e, i) {
        return {};
    }
    mount(t) {
        this.current = t;
        ea.set(t, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(t);
        }
        if (this.parent && this.isVariantNode && !this.isControllingVariants) {
            this.removeFromVariantTree = this.parent.addVariantChild(this);
        }
        this.values.forEach((t, e)=>this.bindToMotionValue(e, t));
        if (!eo.current) {
            (()=>{
                eo.current = true;
                if (es.B) {
                    if (window.matchMedia) {
                        let t = window.matchMedia("(prefers-reduced-motion)");
                        let e = ()=>er.current = t.matches;
                        t.addEventListener("change", e);
                        e();
                    } else {
                        er.current = false;
                    }
                }
            })();
        }
        this.shouldReduceMotion = this.reducedMotionConfig !== "never" && (this.reducedMotionConfig === "always" || er.current);
        this.parent?.addChild(this);
        this.update(this.props, this.presenceContext);
    }
    unmount() {
        let t;
        for(let e in this.projection && this.projection.unmount(), cancel(this.notifyUpdate), cancel(this.render), this.valueSubscriptions.forEach((t)=>t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this), this.events){
            this.events[e].clear();
        }
        for(let t in this.features){
            let e = this.features[t];
            if (e) {
                e.unmount();
                e.isMounted = false;
            }
        }
        this.current = null;
    }
    addChild(t) {
        this.children.add(t);
        if (this.enteringChildren == null) {
            this.enteringChildren = new Set;
        }
        this.enteringChildren.add(t);
    }
    removeChild(t) {
        this.children.delete(t);
        if (this.enteringChildren) {
            this.enteringChildren.delete(t);
        }
    }
    bindToMotionValue(t, e) {
        let i;
        if (this.valueSubscriptions.has(t)) {
            this.valueSubscriptions.get(t)();
        }
        let n = o.has(t);
        if (n && this.onBindTransform) {
            this.onBindTransform();
        }
        let s = e.on("change", (e)=>{
            this.latestValues[t] = e;
            if (this.props.onUpdate) {
                schedule.preRender(this.notifyUpdate);
            }
            if (n && this.projection) {
                this.projection.isTransformDirty = true;
            }
            this.scheduleRender();
        });
        if (window.MotionCheckAppearSync) {
            i = window.MotionCheckAppearSync(this, t, e);
        }
        this.valueSubscriptions.set(t, ()=>{
            s();
            if (i) {
                i();
            }
            if (e.owner) {
                e.stop();
            }
        });
    }
    sortNodePosition(t) {
        if (this.current && this.sortInstanceNodePosition && this.type === t.type) {
            return this.sortInstanceNodePosition(this.current, t.current);
        }
        return 0;
    }
    updateFeatures() {
        let t = "animation";
        for(t in t8){
            let e = t8[t];
            if (!e) {
                continue;
            }
            let { isEnabled, Feature } = e;
            if (!this.features[t] && Feature && isEnabled(this.props)) {
                this.features[t] = new Feature(this);
            }
            if (this.features[t]) {
                let e = this.features[t];
                if (e.isMounted) {
                    e.update();
                } else {
                    e.mount();
                    e.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    measureViewportBox() {
        if (this.current) {
            return this.measureInstanceViewportBox(this.current, this.props);
        }
        return en();
    }
    getStaticValue(t) {
        return this.latestValues[t];
    }
    setStaticValue(t, e) {
        this.latestValues[t] = e;
    }
    update(t, e) {
        if (t.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = t;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = e;
        for (const i of ev){
            if (this.propEventSubscriptions[i]) {
                this.propEventSubscriptions[i]();
                delete this.propEventSubscriptions[i];
            }
            let n = t[`on${i}`];
            if (n) {
                this.propEventSubscriptions[i] = this.on(i, n);
            }
        }
        this.prevMotionValues = ((owner, e, i)=>{
            for(let n in e){
                let s = e[n];
                let r = i[n];
                if (F(s)) {
                    owner.addValue(n, s);
                } else if (F(r)) {
                    owner.addValue(n, t4(s, {
                        owner
                    }));
                } else if (r !== s) {
                    if (owner.hasValue(n)) {
                        let e = owner.getValue(n);
                        if (e.liveStyle === true) {
                            e.jump(s);
                        } else if (!e.hasAnimated) {
                            e.set(s);
                        }
                    } else {
                        let e = owner.getStaticValue(n);
                        owner.addValue(n, t4(e !== undefined ? e : s, {
                            owner
                        }));
                    }
                }
            }
            for(let n in i){
                if (e[n] === undefined) {
                    owner.removeValue(n);
                }
            }
            return e;
        })(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
    }
    getProps() {
        return this.props;
    }
    getVariant(t) {
        if (this.props.variants) {
            return this.props.variants[t];
        }
    }
    getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        if (this.isVariantNode) {
            return this;
        }
        if (this.parent) {
            return this.parent.getClosestVariantNode();
        }
    }
    addVariantChild(t) {
        let e = this.getClosestVariantNode();
        if (e) {
            if (e.variantChildren) {
                e.variantChildren.add(t);
            }
            return ()=>e.variantChildren.delete(t);
        }
    }
    addValue(t, e) {
        let i = this.values.get(t);
        if (e !== i) {
            if (i) {
                this.removeValue(t);
            }
            this.bindToMotionValue(t, e);
            this.values.set(t, e);
            this.latestValues[t] = e.get();
        }
    }
    removeValue(t) {
        this.values.delete(t);
        let e = this.valueSubscriptions.get(t);
        if (e) {
            e();
            this.valueSubscriptions.delete(t);
        }
        delete this.latestValues[t];
        this.removeValueFromRenderState(t, this.renderState);
    }
    hasValue(t) {
        return this.values.has(t);
    }
    getValue(t, e) {
        if (this.props.values && this.props.values[t]) {
            return this.props.values[t];
        }
        let i = this.values.get(t);
        if (i === undefined && e !== undefined) {
            i = t4(e === null ? undefined : e, {
                owner: this
            });
            this.addValue(t, i);
        }
        return i;
    }
    readValue(t, e) {
        let n = this.latestValues[t] === undefined && this.current ? this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options) : this.latestValues[t];
        if (n != null) {
            if (typeof n === "string" && (J(n) || tw(n))) {
                n = parseFloat(n);
            } else {
                let i;
                i = n;
                if (!t9.find(q(i)) && tN.test(e)) {
                    n = tG(t, e);
                }
            }
            this.setBaseTarget(t, F(n) ? n.get() : n);
        }
        if (F(n)) {
            return n.get();
        }
        return n;
    }
    setBaseTarget(t, e) {
        this.baseTarget[t] = e;
    }
    getBaseTarget(t) {
        let e;
        let { initial } = this.props;
        if (typeof initial === "string" || typeof initial === "object") {
            let s = ef(this.props, initial, this.presenceContext?.custom);
            if (s) {
                e = s[t];
            }
        }
        if (initial && e !== undefined) {
            return e;
        }
        let s = this.getBaseTargetFromProps(this.props, t);
        if (s === undefined || F(s)) {
            if (this.initialValues[t] !== undefined && e === undefined) {
                return undefined;
            }
            return this.baseTarget[t];
        }
        return s;
    }
    on(t, e) {
        if (!this.events[t]) {
            this.events[t] = new t0;
        }
        return this.events[t].add(e);
    }
    notify(t, ...i) {
        if (this.events[t]) {
            this.events[t].notify(...i);
        }
    }
    scheduleRenderMicrotask() {
        schedule_1.render(this.render);
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, o = {}){
        this.current = null;
        this.children = new Set;
        this.isVariantNode = false;
        this.isControllingVariants = false;
        this.shouldReduceMotion = null;
        this.values = new Map;
        this.KeyframeResolver = tT;
        this.features = {};
        this.valueSubscriptions = new Map;
        this.prevMotionValues = {};
        this.events = {};
        this.propEventSubscriptions = {};
        this.notifyUpdate = ()=>this.notify("Update", this.latestValues);
        this.render = ()=>{
            if (this.current) {
                this.triggerBuild();
                this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
            }
        };
        this.renderScheduledAt = 0;
        this.scheduleRender = ()=>{
            let t = t2.now();
            if (this.renderScheduledAt < t) {
                this.renderScheduledAt = t;
                schedule.render(this.render, false, true);
            }
        };
        let { latestValues, renderState } = visualState;
        this.latestValues = latestValues;
        this.baseTarget = {
            ...latestValues
        };
        this.initialValues = props.initial ? {
            ...latestValues
        } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.options = o;
        this.blockInitialAnimation = !!blockInitialAnimation;
        this.isControllingVariants = ec(props);
        this.isVariantNode = ep(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set;
        }
        this.manuallyAnimateOnMount = !!(parent && parent.current);
        let { willChange, ...rest } = this.scrapeMotionValuesFromProps(props, {}, this);
        for(let t in rest){
            let e = rest[t];
            if (latestValues[t] !== undefined && F(e)) {
                e.set(latestValues[t]);
            }
        }
    }
}
class ey extends eg {
    sortInstanceNodePosition(t, e) {
        if (2 & t.compareDocumentPosition(e)) {
            return 1;
        }
        return -1;
    }
    getBaseTargetFromProps(t, e) {
        if (t.style) {
            return t.style[e];
        }
    }
    removeValueFromRenderState(t, { vars, style }) {
        delete vars[t];
        delete style[t];
    }
    handleChildMotionValue() {
        if (this.childSubscription) {
            this.childSubscription();
            delete this.childSubscription;
        }
        let { children } = this.props;
        if (F(children)) {
            this.childSubscription = children.on("change", (t)=>{
                if (this.current) {
                    this.current.textContent = `${t}`;
                }
            });
        }
    }
    constructor(){
        super(...arguments);
        this.KeyframeResolver = tZ;
    }
}
let ex = (t, e)=>{
    if (e && typeof t === "number") {
        return e.transform(t);
    }
    return t;
};
let eT = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
};
let r_length = r.length;
function eP(t, e, transformTemplate) {
    let { style, vars, transformOrigin } = t;
    let l = false;
    let h = false;
    for(let t in e){
        let i = e[t];
        if (o.has(t)) {
            l = true;
            continue;
        }
        if (y(t)) {
            vars[t] = i;
            continue;
        }
        {
            let e = ex(i, tK[t]);
            if (t.startsWith("origin")) {
                h = true;
                transformOrigin[t] = e;
            } else {
                style[t] = e;
            }
        }
    }
    if (!e.transform) {
        if (l || transformTemplate) {
            style.transform = ((t, e, i)=>{
                let n = "";
                let s = true;
                for(let o = 0; o < r_length; o++){
                    let a = r[o];
                    let l = t[a];
                    if (l === undefined) {
                        continue;
                    }
                    let h = true;
                    if (!(h = typeof l === "number" ? l === +!!a.startsWith("scale") : parseFloat(l) === 0) || i) {
                        let t = ex(l, tK[a]);
                        if (!h) {
                            s = false;
                            let e = eT[a] || a;
                            n += `${e}(${t}) `;
                        }
                        if (i) {
                            e[a] = t;
                        }
                    }
                }
                n = n.trim();
                if (i) {
                    n = i(e, s ? "" : n);
                } else if (s) {
                    n = "none";
                }
                return n;
            })(e, t.transform, transformTemplate);
        } else if (style.transform) {
            style.transform = "none";
        }
    }
    if (h) {
        let { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}
function eb(t, { style, vars }, i, n) {
    let s;
    let t_style = t.style;
    for(s in style){
        t_style[s] = style[s];
    }
    n?.applyProjectionStyles(t_style, i);
    for(s in vars){
        t_style.setProperty(s, vars[s]);
    }
}
function eS(t, e) {
    if (e.max === e.min) {
        return 0;
    }
    return t / (e.max - e.min) * 100;
}
let eA = {
    correct: (t, e)=>{
        if (!e.target) {
            return t;
        }
        if (typeof t === "string") {
            if (!H.test(t)) {
                return t;
            } else {
                t = parseFloat(t);
            }
        }
        let i = eS(t, e.target.x);
        let n = eS(t, e.target.y);
        return `${i}% ${n}%`;
    }
};
let eM = {
    borderRadius: {
        ...eA,
        applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius"
        ]
    },
    borderTopLeftRadius: eA,
    borderTopRightRadius: eA,
    borderBottomLeftRadius: eA,
    borderBottomRightRadius: eA,
    boxShadow: {
        correct: (t, { treeScale, projectionDelta })=>{
            let s = tN.parse(t);
            if (s.length > 5) {
                return t;
            }
            let r = tN.createTransformer(t);
            let o = +(typeof s[0] !== "number");
            let a = projectionDelta.x.scale * treeScale.x;
            let l = projectionDelta.y.scale * treeScale.y;
            s[0 + o] /= a;
            s[1 + o] /= l;
            let h = b(a, l, 0.5);
            if (typeof s[2 + o] === "number") {
                s[2 + o] /= h;
            }
            if (typeof s[3 + o] === "number") {
                s[3 + o] /= h;
            }
            return r(s);
        }
    }
};
function eV(t, { layout, layoutId }) {
    return o.has(t) || t.startsWith("origin") || (layout || layoutId !== undefined) && (!!eM[t] || t === "opacity");
}
function eE(t, e, i) {
    let { style } = t;
    let s = {};
    for(let o in style){
        if (F(style[o]) || e.style && F(e.style[o]) || eV(o, t) || i?.getValue(o)?.liveStyle !== undefined) {
            s[o] = style[o];
        }
    }
    return s;
}
class eC extends ey {
    readValueFromInstance(t, e) {
        if (o.has(e)) {
            if (this.projection?.isProjecting) {
                return m(e);
            }
            return ((t, e)=>{
                let { transform = "none" } = getComputedStyle(t);
                return f(transform, e);
            })(t, e);
        }
        {
            let i = window.getComputedStyle(t);
            let n = (y(e) ? i.getPropertyValue(e) : i[e]) || 0;
            if (typeof n === "string") {
                return n.trim();
            }
            return n;
        }
    }
    measureInstanceViewportBox(t, { transformPagePoint }) {
        return j(t, transformPagePoint);
    }
    build(t, e, i) {
        eP(t, e, i.transformTemplate);
    }
    scrapeMotionValuesFromProps(t, e, i) {
        return eE(t, e, i);
    }
    constructor(){
        super(...arguments);
        this.type = "html";
        this.renderInstance = eb;
    }
}
let eD = (t)=>t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
let ek = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
};
let eR = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
function eL(t, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, ...rest }, i, transformTemplate, s) {
    eP(t, rest, transformTemplate);
    if (i) {
        if (t.style.viewBox) {
            t.attrs.viewBox = t.style.viewBox;
        }
        return;
    }
    t.attrs = t.style;
    t.style = {};
    let { attrs, style } = t;
    if (attrs.transform) {
        style.transform = attrs.transform;
        delete attrs.transform;
    }
    if (style.transform || attrs.transformOrigin) {
        style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
        delete attrs.transformOrigin;
    }
    if (style.transform) {
        style.transformBox = s?.transformBox ?? "fill-box";
        delete attrs.transformBox;
    }
    if (attrX !== undefined) {
        attrs.x = attrX;
    }
    if (attrY !== undefined) {
        attrs.y = attrY;
    }
    if (attrScale !== undefined) {
        attrs.scale = attrScale;
    }
    if (pathLength !== undefined) {
        (function(attrs_1, pathLength_1, i = 1, n = 0) {
            let s = !(arguments.length > 4) || arguments[4] === undefined || arguments[4];
            attrs_1.pathLength = 1;
            let r = s ? ek : eR;
            attrs_1[r.offset] = H.transform(-n);
            let o = H.transform(pathLength_1);
            let a = H.transform(i);
            attrs_1[r.array] = `${o} ${a}`;
        })(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}
let ej = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust"
]);
let eF = (t)=>typeof t === "string" && t.toLowerCase() === "svg";
function eB(t, e, i) {
    let n = eE(t, e, i);
    for(let i in t){
        if (F(t[i]) || F(e[i])) {
            n[r.indexOf(i) !== -1 ? `attr${i.charAt(0).toUpperCase()}${i.substring(1)}` : i] = t[i];
        }
    }
    return n;
}
class eO extends ey {
    getBaseTargetFromProps(t, e) {
        return t[e];
    }
    readValueFromInstance(t, e) {
        if (o.has(e)) {
            let t = tq(e);
            return t && t.default || 0;
        }
        e = ej.has(e) ? e : eD(e);
        return t.getAttribute(e);
    }
    scrapeMotionValuesFromProps(t, e, i) {
        return eB(t, e, i);
    }
    build(t, e, i) {
        eL(t, e, this.isSVGTag, i.transformTemplate, i.style);
    }
    renderInstance(t, e, i, n) {
        for(let i in eb(t, e, undefined, n), e.attrs){
            t.setAttribute(ej.has(i) ? i : eD(i), e.attrs[i]);
        }
    }
    mount(t) {
        this.isSVGTag = eF(t.tagName);
        super.mount(t);
    }
    constructor(){
        super(...arguments);
        this.type = "svg";
        this.isSVGTag = false;
        this.measureInstanceViewportBox = en;
    }
}
let eI = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view"
];
function eU(t) {
    if (typeof t !== "string" || t.includes("-")) ;
    else if (eI.indexOf(t) > -1 || /[A-Z]/u.test(t)) {
        return true;
    }
    return false;
}
const eN = require("./module-86897.js");
const eW = require("./module-60296.js");
let EYContext = s.createContext({
    strict: false
});
const ez = require("./module-53127.js");
let EHContext = s.createContext({});
function eX(t) {
    if (Array.isArray(t)) {
        return t.join(" ");
    }
    return t;
}
let eK = ()=>({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {}
    });
function e$(t, e, i) {
    for(let n in e){
        if (!(F(e[n]) || eV(n, i))) {
            t[n] = e[n];
        }
    }
}
let eq = ()=>({
        ...eK(),
        attrs: {}
    });
let eG = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "ignoreStrict",
    "viewport"
]);
function e_(t) {
    return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || eG.has(t);
}
let eZ = (t)=>!e_(t);
try {
    ((t)=>{
        if (typeof t === "function") {
            eZ = (e)=>{
                if (e.startsWith("on")) {
                    return !e_(e);
                }
                return t(e);
            };
        }
    })(require("@emotion/is-prop-valid").default);
} catch (t) {}
const eQ = require("./module-59686.js");
const eJ = require("./module-94416.js");
function e0(t) {
    if (F(t)) {
        return t.get();
    }
    return t;
}
let e1 = (t)=>(e, i)=>{
        let n = s.useContext(EHContext);
        let r = s.useContext(eQ.t);
        let o = ()=>(({ scrapeMotionValuesFromProps, createRenderState }, e, i, n)=>({
                    latestValues: ((t, e, i, scrapeMotionValuesFromProps_1)=>{
                        let s = {};
                        let r = scrapeMotionValuesFromProps_1(t, {});
                        for(let t in r){
                            s[t] = e0(r[t]);
                        }
                        let { initial, animate } = t;
                        let l = ec(t);
                        let h = ep(t);
                        if (e && h && !l && t.inherit !== false) {
                            if (initial === undefined) {
                                initial = e.initial;
                            }
                            if (animate === undefined) {
                                animate = e.animate;
                            }
                        }
                        let u = !!i && i.initial === false;
                        let d = (u = u || initial === false) ? animate : initial;
                        if (d && typeof d !== "boolean" && !el(d)) {
                            let e = Array.isArray(d) ? d : [
                                d
                            ];
                            for(let i = 0; i < e.length; i++){
                                let n = ef(t, e[i]);
                                if (n) {
                                    let { transitionEnd, transition, ...rest } = n;
                                    for(let t in rest){
                                        let e = rest[t];
                                        if (Array.isArray(e)) {
                                            let t = u ? e.length - 1 : 0;
                                            e = e[t];
                                        }
                                        if (e !== null) {
                                            s[t] = e;
                                        }
                                    }
                                    for(let e in transitionEnd){
                                        s[e] = transitionEnd[e];
                                    }
                                }
                            }
                        }
                        return s;
                    })(e, i, n, scrapeMotionValuesFromProps),
                    renderState: createRenderState()
                }))(t, e, n, r);
        if (i) {
            return o();
        }
        return eJ.M(o);
    };
let e2 = e1({
    scrapeMotionValuesFromProps: eE,
    createRenderState: eK
});
let e3 = e1({
    scrapeMotionValuesFromProps: eB,
    createRenderState: eq
});
let SYMBOL_MOTION_COMPONENT_SYMBOL = Symbol.for("motionComponentSymbol");
function e4(t) {
    return t && typeof t === "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
let e9 = `data-${eD("framerAppearId")}`;
let E6Context = s.createContext({});
const e7 = require("./module-86553.js");
function e8(t, { forwardMotionProps = false } = {}, r, o) {
    if (r) {
        ((t)=>{
            for(let e in t){
                t8[e] = {
                    ...t8[e],
                    ...t[e]
                };
            }
        })(r);
    }
    let a = eU(t) ? e3 : e2;
    function LComponent(e, i) {
        let r;
        let l;
        let h = {
            ...s.useContext(ez.Q),
            ...e,
            layoutId: (({ layoutId })=>{
                let i = s.useContext(eW.L).id;
                if (i && layoutId !== undefined) {
                    return `${i}-${layoutId}`;
                }
                return layoutId;
            })(e)
        };
        let { isStatic } = h;
        let d = ((t)=>{
            let { initial, animate } = ((t, e)=>{
                if (ec(t)) {
                    let { initial, animate } = t;
                    return {
                        initial: initial === false || eh(initial) ? initial : undefined,
                        animate: eh(animate) ? animate : undefined
                    };
                }
                if (t.inherit !== false) {
                    return e;
                }
                return {};
            })(t, s.useContext(EHContext));
            return s.useMemo(()=>({
                    initial,
                    animate
                }), [
                eX(initial),
                eX(animate)
            ]);
        })(e);
        let c = a(e, isStatic);
        if (!isStatic && es.B) {
            s.useContext(EYContext).strict;
            let e = ((t)=>{
                let { drag, layout } = t8;
                if (!drag && !layout) {
                    return {};
                }
                let n = {
                    ...drag,
                    ...layout
                };
                return {
                    MeasureLayout: drag?.isEnabled(t) || layout?.isEnabled(t) ? n.MeasureLayout : undefined,
                    ProjectionNode: n.ProjectionNode
                };
            })(h);
            l = e.MeasureLayout;
            d.visualElement = ((t, visualState, props, n, r)=>{
                let { visualElement } = s.useContext(EHContext);
                let d = s.useContext(EYContext);
                let presenceContext = s.useContext(eQ.t);
                let reducedMotion = s.useContext(ez.Q).reducedMotion;
                let mRef = s.useRef(null);
                n = n || d.renderer;
                if (!mRef.current && n) {
                    mRef.current = n(t, {
                        visualState,
                        parent: visualElement,
                        props,
                        presenceContext,
                        blockInitialAnimation: !!presenceContext && presenceContext.initial === false,
                        reducedMotionConfig: reducedMotion
                    });
                }
                let mRef_current = mRef.current;
                let v = s.useContext(E6Context);
                if (mRef_current && !mRef_current.projection && r && (mRef_current.type === "html" || mRef_current.type === "svg")) {
                    ((visualElement_1, props_1, i, initialPromotionConfig)=>{
                        let { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot, layoutCrossfade } = props_1;
                        visualElement_1.projection = new i(visualElement_1.latestValues, props_1["data-framer-portal-id"] ? undefined : function t(e) {
                            if (e) {
                                if (e.options.allowProjection !== false) {
                                    return e.projection;
                                }
                                return t(e.parent);
                            }
                        }(visualElement_1.parent));
                        visualElement_1.projection.setOptions({
                            layoutId,
                            layout,
                            alwaysMeasureLayout: !!drag || dragConstraints && e4(dragConstraints),
                            visualElement: visualElement_1,
                            animationType: typeof layout === "string" ? layout : "both",
                            initialPromotionConfig,
                            crossfade: layoutCrossfade,
                            layoutScroll,
                            layoutRoot
                        });
                    })(mRef.current, props, r, v);
                }
                let gRef = s.useRef(false);
                s.useInsertionEffect(()=>{
                    if (mRef_current && gRef.current) {
                        mRef_current.update(props, presenceContext);
                    }
                });
                let y = props[e9];
                let xRef = s.useRef(!!y && !window.MotionHandoffIsComplete?.(y) && window.MotionHasOptimisedAnimation?.(y));
                e7.E(()=>{
                    if (mRef_current) {
                        gRef.current = true;
                        window.MotionIsMounted = true;
                        mRef_current.updateFeatures();
                        mRef_current.scheduleRenderMicrotask();
                        if (xRef.current && mRef_current.animationState) {
                            mRef_current.animationState.animateChanges();
                        }
                    }
                });
                s.useEffect(()=>{
                    if (mRef_current) {
                        if (!xRef.current && mRef_current.animationState) {
                            mRef_current.animationState.animateChanges();
                        }
                        if (xRef.current) {
                            queueMicrotask(()=>{
                                window.MotionHandoffMarkAsComplete?.(y);
                            });
                            xRef.current = false;
                        }
                        mRef_current.enteringChildren = undefined;
                    }
                });
                return mRef_current;
            })(t, c, h, o, e.ProjectionNode);
        }
        return <EHContext.Provider value={d}>{l && d.visualElement ? eN.jsx(l, {
            visualElement: d.visualElement,
            ...h
        }) : null}{function(T, e, ref, { latestValues }, isStatic_1) {
            let a = arguments.length > 5 && arguments[5] !== undefined && arguments[5];
            let l = (eU(T) ? function(t, e, i, n) {
                let r = s.useMemo(()=>{
                    let i = eq();
                    eL(i, e, eF(n), t.transformTemplate, t.style);
                    return {
                        ...i.attrs,
                        style: {
                            ...i.style
                        }
                    };
                }, [
                    e
                ]);
                if (t.style) {
                    let e = {};
                    e$(e, t.style, t);
                    r.style = {
                        ...e,
                        ...r.style
                    };
                }
                return r;
            } : function(t, e) {
                let i = {};
                let n = ((t, e)=>{
                    let i = t.style || {};
                    let n = {};
                    e$(n, i, t);
                    Object.assign(n, (({ transformTemplate }, e)=>s.useMemo(()=>{
                            let t = eK();
                            eP(t, e, transformTemplate);
                            return {
                                ...t.vars,
                                ...t.style
                            };
                        }, [
                            e
                        ]))(t, e));
                    return n;
                })(t, e);
                if (t.drag && t.dragListener !== false) {
                    i.draggable = false;
                    n.userSelect = n.WebkitUserSelect = n.WebkitTouchCallout = "none";
                    n.touchAction = t.drag === true ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`;
                }
                if (t.tabIndex === undefined && (t.onTap || t.onTapStart || t.whileTap)) {
                    i.tabIndex = 0;
                }
                i.style = n;
                return i;
            })(e, latestValues, isStatic_1, T);
            let h = ((t, e, i)=>{
                let n = {};
                for(let s in t){
                    if ((s !== "values" || typeof t.values !== "object") && (eZ(s) || i === true && e_(s) || !e && !e_(s) || t.draggable && s.startsWith("onDrag"))) {
                        n[s] = t[s];
                    }
                }
                return n;
            })(e, typeof T === "string", a);
            let u = T !== s.Fragment ? {
                ...h,
                ...l,
                ref
            } : {};
            let { children } = e;
            let children_1 = s.useMemo(()=>{
                if (F(children)) {
                    return children.get();
                }
                return children;
            }, [
                children
            ]);
            return <T {...u} children={children_1}/>;
        }(t, e, (r = d.visualElement, s.useCallback((t)=>{
            if (t && c.onMount) {
                c.onMount(t);
            }
            if (r) {
                if (t) {
                    r.mount(t);
                } else {
                    r.unmount();
                }
            }
            if (i) {
                if (typeof i === "function") {
                    i(t);
                } else if (e4(i)) {
                    i.current = t;
                }
            }
        }, [
            r
        ])), c, isStatic, forwardMotionProps)}</EHContext.Provider>;
    }
    LComponent.displayName = `motion.${typeof t === "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
    let h = s.forwardRef(LComponent);
    h[SYMBOL_MOTION_COMPONENT_SYMBOL] = t;
    return h;
}
function it(t, e, i) {
    let n = t.getProps();
    return ef(n, e, i !== undefined ? i : n.custom, t);
}
function ie(t, e) {
    return t?.[e] ?? t?.default ?? t;
}
let ii = (t)=>Array.isArray(t);
function is(t, e) {
    let i = t.getValue("willChange");
    if (F(i) && i.add) {
        return i.add(e);
    }
    if (!i && to.WillChange) {
        let i = new to.WillChange("auto");
        t.addValue("willChange", i);
        i.add(e);
    }
}
function ir(t) {
    t.duration = 0;
    t.type = "keyframes";
}
let io = (t, e)=>(i)=>e(t(i));
let ia = (...t)=>t.reduce(io);
let il = (t)=>1000 * t;
let ih = {
    layout: 0,
    mainThread: 0,
    waapi: 0
};
function iu(t, e, i) {
    if (i < 0) {
        i += 1;
    }
    if (i > 1) {
        i -= 1;
    }
    if (i < 1 / 6) {
        return t + (e - t) * 6 * i;
    }
    if (i < 0.5) {
        return e;
    }
    if (i < 2 / 3) {
        return t + (e - t) * (2 / 3 - i) * 6;
    }
    return t;
}
function id(t, e) {
    return (i)=>{
        if (i > 0) {
            return e;
        }
        return t;
    };
}
let ic = (t, e, i)=>{
    let n = t * t;
    let s = i * (e * e - n) + n;
    if (s < 0) {
        return 0;
    }
    return Math.sqrt(s);
};
let ip = [
    tC,
    tE,
    tD
];
function im(t) {
    let e = ip.find((e)=>e.test(t));
    Z(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
    if (!e) {
        return false;
    }
    let i = e.parse(t);
    if (e === tD) {
        i = (({ hue, saturation, lightness, alpha })=>{
            hue /= 360;
            lightness /= 100;
            let s = 0;
            let r = 0;
            let o = 0;
            if (saturation /= 100) {
                let n = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
                let a = 2 * lightness - n;
                s = iu(a, n, hue + 1 / 3);
                r = iu(a, n, hue);
                o = iu(a, n, hue - 1 / 3);
            } else {
                o = lightness;
                r = lightness;
                s = lightness;
            }
            return {
                red: Math.round(255 * s),
                green: Math.round(255 * r),
                blue: Math.round(255 * o),
                alpha
            };
        })(i);
    }
    return i;
}
let iv = (t, e)=>{
    let i = im(t);
    let n = im(e);
    if (!i || !n) {
        return id(t, e);
    }
    let s = {
        ...i
    };
    return (t)=>{
        s.red = ic(i.red, n.red, t);
        s.green = ic(i.green, n.green, t);
        s.blue = ic(i.blue, n.blue, t);
        s.alpha = b(i.alpha, n.alpha, t);
        return tE.transform(s);
    };
};
let ig = new Set([
    "none",
    "hidden"
]);
function iy(t, e) {
    return (i)=>b(t, e, i);
}
function ix(t) {
    if (typeof t === "number") {
        return iy;
    }
    if (typeof t === "string") {
        if (T(t)) {
            return id;
        }
        if (tk.test(t)) {
            return iv;
        }
        return iP;
    }
    if (Array.isArray(t)) {
        return iT;
    }
    if (typeof t === "object") {
        if (tk.test(t)) {
            return iv;
        }
        return iw;
    }
    return id;
}
function iT(t, e) {
    let i = [
        ...t
    ];
    let i_length = i.length;
    let s = t.map((t, i)=>ix(t)(t, e[i]));
    return (t)=>{
        for(let e = 0; e < i_length; e++){
            i[e] = s[e](t);
        }
        return i;
    };
}
function iw(t, e) {
    let i = {
        ...t,
        ...e
    };
    let n = {};
    for(let s in i){
        if (t[s] !== undefined && e[s] !== undefined) {
            n[s] = ix(t[s])(t[s], e[s]);
        }
    }
    return (t)=>{
        for(let e in n){
            i[e] = n[e](t);
        }
        return i;
    };
}
let iP = (t, e)=>{
    let i = tN.createTransformer(e);
    let n = tB(t);
    let s = tB(e);
    if (n.indexes.var.length === s.indexes.var.length && n.indexes.color.length === s.indexes.color.length && n.indexes.number.length >= s.indexes.number.length) {
        if (ig.has(t) && !s.values.length || ig.has(e) && !n.values.length) {
            return ((t, e)=>{
                if (ig.has(t)) {
                    return (i)=>{
                        if (i <= 0) {
                            return t;
                        }
                        return e;
                    };
                }
                return (i)=>{
                    if (i >= 1) {
                        return e;
                    }
                    return t;
                };
            })(t, e);
        }
        return ia(iT(((t, e)=>{
            let i = [];
            let n = {
                color: 0,
                var: 0,
                number: 0
            };
            for(let s = 0; s < e.values.length; s++){
                let r = e.types[s];
                let o = t.indexes[r][n[r]];
                let a = t.values[o] ?? 0;
                i[s] = a;
                n[r]++;
            }
            return i;
        })(n, s), s.values), i);
    }
    Z(true, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
    return id(t, e);
};
function ib(t, e, i) {
    if (typeof t === "number" && typeof e === "number" && typeof i === "number") {
        return b(t, e, i);
    }
    return ix(t)(t, e);
}
let iS = (t)=>{
    let e = ({ timestamp })=>t(timestamp);
    return {
        start: (t = true)=>schedule.update(e, t),
        stop: ()=>cancel(e),
        now: ()=>{
            if (state.isProcessing) {
                return state.timestamp;
            }
            return t2.now();
        }
    };
};
let iA = (t, e, i = 10)=>{
    let n = "";
    let s = Math.max(Math.round(e / i), 2);
    for(let e = 0; e < s; e++){
        n += `${Math.round(10000 * t(e / (s - 1))) / 10000}, `;
    }
    return `linear(${n.substring(0, n.length - 2)})`;
};
function iM(t) {
    let e = 0;
    let i = t.next(e);
    while(!i.done && e < 20000){
        e += 50;
        i = t.next(e);
    }
    if (e >= 20000) {
        return Infinity;
    }
    return e;
}
function iV(t, e, i) {
    let n;
    let s;
    let r = Math.max(e - 5, 0);
    n = i - t(r);
    if (s = e - r) {
        return 1000 / s * n;
    }
    return 0;
}
let iE = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: {
        granular: 0.01,
        default: 2
    },
    restDelta: {
        granular: 0.005,
        default: 0.5
    },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1
};
function iC(t, e) {
    return t * Math.sqrt(1 - e * e);
}
let iD = [
    "duration",
    "bounce"
];
let ik = [
    "stiffness",
    "damping",
    "mass"
];
function iR(t, e) {
    return e.some((e)=>t[e] !== undefined);
}
function spring(visualDuration = iE.visualDuration, bounce = iE.bounce) {
    let i;
    let n = typeof visualDuration !== "object" ? {
        visualDuration,
        keyframes: [
            0,
            1
        ],
        bounce
    } : visualDuration;
    let { restSpeed, restDelta } = n;
    let o = n.keyframes[0];
    let a = n.keyframes[n.keyframes.length - 1];
    let l = {
        done: false,
        value: o
    };
    let { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = ((t)=>{
        let e = {
            velocity: iE.velocity,
            stiffness: iE.stiffness,
            damping: iE.damping,
            mass: iE.mass,
            isResolvedFromDuration: false,
            ...t
        };
        if (!iR(t, ik) && iR(t, iD)) {
            if (t.visualDuration) {
                let i = 2 * Math.PI / (1.2 * t.visualDuration);
                let n = i * i;
                let damping_1 = 2 * O(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(n);
                e = {
                    ...e,
                    mass: iE.mass,
                    stiffness: n,
                    damping: damping_1
                };
            } else {
                let i = (({ duration = iE.duration, bounce = iE.bounce, velocity = iE.velocity, mass = iE.mass })=>{
                    let s;
                    let r;
                    Z(duration <= il(iE.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
                    let o = 1 - bounce;
                    o = O(iE.minDamping, iE.maxDamping, o);
                    duration = O(iE.minDuration, iE.maxDuration, duration / 1000);
                    if (o < 1) {
                        s = (e)=>{
                            let n = e * o;
                            let s = n * duration;
                            return 0.001 - (n - velocity) / iC(e, o) * Math.exp(-s);
                        };
                        r = (e)=>{
                            let n = e * o * duration;
                            let r = o ** 2 * e ** 2 * duration;
                            let a = Math.exp(-n);
                            let l = iC(e ** 2, o);
                            return (n * velocity + velocity - r) * a * (-s(e) + 0.001 > 0 ? -1 : 1) / l;
                        };
                    } else {
                        s = (e)=>-0.001 + Math.exp(-e * duration) * ((e - velocity) * duration + 1);
                        r = (e)=>duration * duration * (velocity - e) * Math.exp(-e * duration);
                    }
                    let a = ((t, e, i)=>{
                        let n = i;
                        for(let i = 1; i < 12; i++){
                            n -= t(n) / e(n);
                        }
                        return n;
                    })(s, r, 5 / duration);
                    duration = il(duration);
                    if (isNaN(a)) {
                        return {
                            stiffness: iE.stiffness,
                            damping: iE.damping,
                            duration
                        };
                    }
                    {
                        let e = a ** 2 * mass;
                        return {
                            stiffness: e,
                            damping: 2 * o * Math.sqrt(mass * e),
                            duration
                        };
                    }
                })(t);
                e = {
                    ...e,
                    ...i,
                    mass: iE.mass
                };
                e.isResolvedFromDuration = true;
            }
        }
        return e;
    })({
        ...n,
        velocity: -((n.velocity || 0) / 1000)
    });
    let f = velocity || 0;
    let v = damping / (2 * Math.sqrt(stiffness * mass));
    let g = a - o;
    let y = Math.sqrt(stiffness / mass) / 1000;
    let x = Math.abs(g) < 5;
    if (!restSpeed) {
        restSpeed = x ? iE.restSpeed.granular : iE.restSpeed.default;
    }
    if (!restDelta) {
        restDelta = x ? iE.restDelta.granular : iE.restDelta.default;
    }
    if (v < 1) {
        let t = iC(y, v);
        i = (e)=>a - Math.exp(-v * y * e) * ((f + v * y * g) / t * Math.sin(t * e) + g * Math.cos(t * e));
    } else if (v === 1) {
        i = (t)=>a - Math.exp(-y * t) * (g + (f + y * g) * t);
    } else {
        let t = y * Math.sqrt(v * v - 1);
        i = (e)=>{
            let i = Math.exp(-v * y * e);
            let n = Math.min(t * e, 300);
            return a - i * ((f + v * y * g) * Math.sinh(n) + t * g * Math.cosh(n)) / t;
        };
    }
    let T = {
        calculatedDuration: isResolvedFromDuration && duration || null,
        next: (t)=>{
            let e = i(t);
            if (isResolvedFromDuration) {
                l.done = t >= duration;
            } else {
                let n = t === 0 ? f : 0;
                if (v < 1) {
                    n = t === 0 ? il(f) : iV(i, t, e);
                }
                let o = Math.abs(a - e) <= restDelta;
                l.done = Math.abs(n) <= restSpeed && o;
            }
            l.value = l.done ? a : e;
            return l;
        },
        toString: ()=>{
            let t = Math.min(iM(T), 20000);
            let e = iA((e)=>T.next(t * e).value, t, 30);
            return `${t}ms ${e}`;
        },
        toTransition: ()=>{}
    };
    return T;
}
function ij({ keyframes, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
    let d;
    let c;
    let p = keyframes[0];
    let m = {
        done: false,
        value: p
    };
    let f = power * velocity;
    let v = p + f;
    let g = modifyTarget === undefined ? v : modifyTarget(v);
    if (g !== v) {
        f = g - p;
    }
    let y = (t)=>-f * Math.exp(-t / timeConstant);
    let x = (t)=>g + y(t);
    let T = (t)=>{
        let e = y(t);
        let i = x(t);
        m.done = Math.abs(e) <= restDelta;
        m.value = m.done ? g : i;
    };
    let w = (t)=>{
        let e;
        e = m.value;
        if (min !== undefined && e < min || max !== undefined && e > max) {
            var i;
            d = t;
            c = spring({
                keyframes: [
                    m.value,
                    (i = m.value, min === undefined ? max : max === undefined || Math.abs(min - i) < Math.abs(max - i) ? min : max)
                ],
                velocity: iV(x, t, m.value),
                damping: bounceDamping,
                stiffness: bounceStiffness,
                restDelta,
                restSpeed
            });
        }
    };
    w(0);
    return {
        calculatedDuration: null,
        next: (t)=>{
            let e = false;
            if (!(c || d !== undefined)) {
                e = true;
                T(t);
                w(t);
            }
            if (d !== undefined && t >= d) {
                return c.next(t - d);
            }
            if (!e) {
                T(t);
            }
            return m;
        }
    };
}
spring.applyToOptions = (t)=>{
    let e = ((t, e = 100, spring_1)=>{
        let n = spring_1({
            ...t,
            keyframes: [
                0,
                e
            ]
        });
        let s = Math.min(iM(n), 20000);
        return {
            type: "keyframes",
            ease: (t)=>n.next(s * t).value / e,
            duration: s / 1000
        };
    })(t, 100, spring);
    t.ease = e.ease;
    t.duration = il(e.duration);
    t.type = "keyframes";
    return t;
};
let iF = (t, e, i)=>(((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
function iB(t, e, i, n) {
    if (t === e && i === n) {
        return linear;
    }
    return (s)=>{
        if (s === 0 || s === 1) {
            return s;
        }
        return iF(((t, n, s)=>{
            let e = 0;
            let i = 1;
            let r;
            let o;
            let a = 0;
            do {
                if ((r = iF(o = e + (i - e) / 2, n, s) - t) > 0) {
                    i = o;
                } else {
                    e = o;
                }
            }while (Math.abs(r) > 1e-7 && ++a < 12)
            return o;
        })(s, t, i), e, n);
    };
}
let easeIn = iB(0.42, 0, 1, 1);
let easeOut = iB(0, 0, 0.58, 1);
let easeInOut = iB(0.42, 0, 0.58, 1);
let iN = (t)=>(e)=>{
        if (e <= 0.5) {
            return t(2 * e) / 2;
        }
        return (2 - t(2 * (1 - e))) / 2;
    };
let iW = (t)=>(e)=>1 - t(1 - e);
let backOut = iB(0.33, 1.53, 0.69, 0.99);
let backIn = iW(backOut);
let backInOut = iN(backIn);
let anticipate = (t)=>{
    if ((t *= 2) < 1) {
        return 0.5 * backIn(t);
    }
    return 0.5 * (2 - 2 ** (-10 * (t - 1)));
};
let circIn = (t)=>1 - Math.sin(Math.acos(t));
let circOut = iW(circIn);
let circInOut = iN(circIn);
let iG = (t)=>Array.isArray(t) && typeof t[0] === "number";
let i_ = {
    linear,
    easeIn,
    easeInOut,
    easeOut,
    circIn,
    circInOut,
    circOut,
    backIn,
    backInOut,
    backOut,
    anticipate
};
let iZ = (t)=>{
    if (iG(t)) {
        Q(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
        let [e, i, n, s] = t;
        return iB(e, i, n, s);
    }
    if (typeof t === "string") {
        Q(i_[t] !== undefined, `Invalid easing type '${t}'`, "invalid-easing-type");
        return i_[t];
    }
    return t;
};
let iQ = (t, e, i)=>{
    let n = e - t;
    if (n === 0) {
        return 1;
    }
    return (i - t) / n;
};
function iJ({ duration = 300, keyframes, times, ease = "easeInOut" }) {
    let s;
    let r = Array.isArray(ease) && typeof ease[0] !== "number" ? ease.map(iZ) : iZ(ease);
    let o = {
        done: false,
        value: keyframes[0]
    };
    let a = ((t, keyframes_1, { clamp = true, ease, mixer } = {})=>{
        let t_length = t.length;
        Q(t_length === keyframes_1.length, "Both input and output ranges must be the same length", "range-length");
        if (t_length === 1) {
            return ()=>keyframes_1[0];
        }
        if (t_length === 2 && keyframes_1[0] === keyframes_1[1]) {
            return ()=>keyframes_1[1];
        }
        let o = t[0] === t[1];
        if (t[0] > t[t_length - 1]) {
            t = [
                ...t
            ].reverse();
            keyframes_1 = [
                ...keyframes_1
            ].reverse();
        }
        let a = ((keyframes_1_1, ease_1, mixer_1)=>{
            let n = [];
            let s = mixer_1 || to.mix || ib;
            let r = keyframes_1_1.length - 1;
            for(let i = 0; i < r; i++){
                let r = s(keyframes_1_1[i], keyframes_1_1[i + 1]);
                if (ease_1) {
                    r = ia(Array.isArray(ease_1) ? ease_1[i] || linear : ease_1, r);
                }
                n.push(r);
            }
            return n;
        })(keyframes_1, ease, mixer);
        let a_length = a.length;
        let h = (i)=>{
            if (o && i < t[0]) {
                return keyframes_1[0];
            }
            let n = 0;
            if (a_length > 1) {
                for(; n < t.length - 2 && !(i < t[n + 1]); n++);
            }
            let s = iQ(t[n], t[n + 1], i);
            return a[n](s);
        };
        if (clamp) {
            return (e)=>h(O(t[0], t[t_length - 1], e));
        }
        return h;
    })((s = times && times.length === keyframes.length ? times : ((keyframes_1)=>{
        let e = [
            0
        ];
        ((t, e)=>{
            let i = t[t.length - 1];
            for(let n = 1; n <= e; n++){
                let s = iQ(0, e, n);
                t.push(b(i, 1, s));
            }
        })(e, keyframes_1.length - 1);
        return e;
    })(keyframes), s.map((e)=>e * duration)), keyframes, {
        ease: Array.isArray(r) ? r : keyframes.map(()=>r || easeInOut).splice(0, keyframes.length - 1)
    });
    return {
        calculatedDuration: duration,
        next: (e)=>{
            o.value = a(e);
            o.done = e >= duration;
            return o;
        }
    };
}
let i0 = (t)=>t !== null;
function i1(keyframes, { repeat, repeatType = "loop" }, finalKeyframe, s = 1) {
    let r = keyframes.filter(i0);
    let o = s < 0 || repeat && repeatType !== "loop" && repeat % 2 == 1 ? 0 : r.length - 1;
    if (o && finalKeyframe !== undefined) {
        return finalKeyframe;
    }
    return r[o];
}
let i2 = {
    decay: ij,
    inertia: ij,
    tween: iJ,
    keyframes: iJ,
    spring
};
function i3(t) {
    if (typeof t.type === "string") {
        t.type = i2[t.type];
    }
}
class i5 {
    constructor(){
        this.updateFinished();
    }
    get finished() {
        return this._finished;
    }
    updateFinished() {
        this._finished = new Promise((resolve)=>{
            this.resolve = resolve;
        });
    }
    notifyFinished() {
        this.resolve();
    }
    then(t, e) {
        return this.finished.then(t, e);
    }
}
let i4 = (t)=>t / 100;
class i9 extends i5 {
    constructor(t){
        super();
        this.state = "idle";
        this.startTime = null;
        this.isStopped = false;
        this.currentTime = 0;
        this.holdTime = null;
        this.playbackSpeed = 1;
        this.stop = ()=>{
            let { motionValue } = this.options;
            if (motionValue && motionValue.updatedAt !== t2.now()) {
                this.tick(t2.now());
            }
            this.isStopped = true;
            if (this.state !== "idle") {
                this.teardown();
                this.options.onStop?.();
            }
        };
        ih.mainThread++;
        this.options = t;
        this.initAnimation();
        this.play();
        if (t.autoplay === false) {
            this.pause();
        }
    }
    initAnimation() {
        let { options } = this;
        i3(options);
        let { type = iJ, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
        let { keyframes } = options;
        let a = type || iJ;
        if (a !== iJ && typeof keyframes[0] !== "number") {
            this.mixKeyframes = ia(i4, ib(keyframes[0], keyframes[1]));
            keyframes = [
                0,
                100
            ];
        }
        let l = a({
            ...options,
            keyframes
        });
        if (repeatType === "mirror") {
            this.mirroredGenerator = a({
                ...options,
                keyframes: [
                    ...keyframes
                ].reverse(),
                velocity: -velocity
            });
        }
        if (l.calculatedDuration === null) {
            l.calculatedDuration = iM(l);
        }
        let { calculatedDuration } = l;
        this.calculatedDuration = calculatedDuration;
        this.resolvedDuration = calculatedDuration + repeatDelay;
        this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
        this.generator = l;
    }
    updateTime(t) {
        let e = Math.round(t - this.startTime) * this.playbackSpeed;
        if (this.holdTime !== null) {
            this.currentTime = this.holdTime;
        } else {
            this.currentTime = e;
        }
    }
    tick(t, e = false) {
        let { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
        if (this.startTime === null) {
            return generator.next(0);
        }
        let { delay = 0, keyframes, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
        if (this.speed > 0) {
            this.startTime = Math.min(this.startTime, t);
        } else if (this.speed < 0) {
            this.startTime = Math.min(t - totalDuration / this.speed, this.startTime);
        }
        if (e) {
            this.currentTime = t;
        } else {
            this.updateTime(t);
        }
        let v = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
        let g = this.playbackSpeed >= 0 ? v < 0 : v > totalDuration;
        this.currentTime = Math.max(v, 0);
        if (this.state === "finished" && this.holdTime === null) {
            this.currentTime = totalDuration;
        }
        let currentTime = this.currentTime;
        let x = generator;
        if (repeat) {
            let t = Math.min(this.currentTime, totalDuration) / resolvedDuration;
            let e = Math.floor(t);
            let i = t % 1;
            if (!i && t >= 1) {
                i = 1;
            }
            if (i === 1) {
                e--;
            }
            if ((e = Math.min(e, repeat + 1)) % 2) {
                if (repeatType === "reverse") {
                    i = 1 - i;
                    if (repeatDelay) {
                        i -= repeatDelay / resolvedDuration;
                    }
                } else if (repeatType === "mirror") {
                    x = mirroredGenerator;
                }
            }
            currentTime = O(0, 1, i) * resolvedDuration;
        }
        let T = g ? {
            done: false,
            value: keyframes[0]
        } : x.next(currentTime);
        if (mixKeyframes) {
            T.value = mixKeyframes(T.value);
        }
        let { done } = T;
        if (!(g || calculatedDuration === null)) {
            done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
        }
        let P = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
        if (P && type !== ij) {
            T.value = i1(keyframes, this.options, finalKeyframe, this.speed);
        }
        if (onUpdate) {
            onUpdate(T.value);
        }
        if (P) {
            this.finish();
        }
        return T;
    }
    then(t, e) {
        return this.finished.then(t, e);
    }
    get duration() {
        return this.calculatedDuration / 1000;
    }
    get iterationDuration() {
        let { delay = 0 } = this.options || {};
        return this.duration + delay / 1000;
    }
    get time() {
        return this.currentTime / 1000;
    }
    set time(t) {
        t = il(t);
        this.currentTime = t;
        if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
            this.holdTime = t;
        } else if (this.driver) {
            this.startTime = this.driver.now() - t / this.playbackSpeed;
        }
        this.driver?.start(false);
    }
    get speed() {
        return this.playbackSpeed;
    }
    set speed(t) {
        this.updateTime(t2.now());
        let e = this.playbackSpeed !== t;
        this.playbackSpeed = t;
        if (e) {
            this.time = this.currentTime / 1000;
        }
    }
    play() {
        if (this.isStopped) {
            return;
        }
        let { driver = iS, startTime } = this.options;
        if (!this.driver) {
            this.driver = driver((t)=>this.tick(t));
        }
        this.options.onPlay?.();
        let i = this.driver.now();
        if (this.state === "finished") {
            this.updateFinished();
            this.startTime = i;
        } else if (this.holdTime !== null) {
            this.startTime = i - this.holdTime;
        } else if (!this.startTime) {
            this.startTime = startTime ?? i;
        }
        if (this.state === "finished" && this.speed < 0) {
            this.startTime += this.calculatedDuration;
        }
        this.holdTime = null;
        this.state = "running";
        this.driver.start();
    }
    pause() {
        this.state = "paused";
        this.updateTime(t2.now());
        this.holdTime = this.currentTime;
    }
    complete() {
        if (this.state !== "running") {
            this.play();
        }
        this.state = "finished";
        this.holdTime = null;
    }
    finish() {
        this.notifyFinished();
        this.teardown();
        this.state = "finished";
        this.options.onComplete?.();
    }
    cancel() {
        this.holdTime = null;
        this.startTime = 0;
        this.tick(0);
        this.teardown();
        this.options.onCancel?.();
    }
    teardown() {
        this.state = "idle";
        this.stopDriver();
        this.startTime = this.holdTime = null;
        ih.mainThread--;
    }
    stopDriver() {
        if (this.driver) {
            this.driver.stop();
            this.driver = undefined;
        }
    }
    sample(t) {
        this.startTime = 0;
        return this.tick(t, true);
    }
    attachTimeline(t) {
        if (this.options.allowFlatten) {
            this.options.type = "keyframes";
            this.options.ease = "linear";
            this.initAnimation();
        }
        this.driver?.stop();
        return t.observe(this);
    }
}
function i6(t) {
    let e;
    return ()=>{
        if (e === undefined) {
            e = t();
        }
        return e;
    };
}
let i7 = i6(()=>window.ScrollTimeline !== undefined);
let i8 = {};
let nt = ((t)=>{
    const e = "linearEasing";
    let i = i6(t);
    return ()=>i8[e] ?? i();
})(()=>{
    try {
        document.createElement("div").animate({
            opacity: 0
        }, {
            easing: "linear(0, 1)"
        });
    } catch (t) {
        return false;
    }
    return true;
});
let ne = ([t, e, i, n])=>`cubic-bezier(${t}, ${e}, ${i}, ${n})`;
let ni = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: ne([
        0,
        0.65,
        0.55,
        1
    ]),
    circOut: ne([
        0.55,
        0,
        1,
        0.45
    ]),
    backIn: ne([
        0.31,
        0.01,
        0.66,
        -0.59
    ]),
    backOut: ne([
        0.33,
        1.53,
        0.69,
        0.99
    ])
};
function nn(type) {
    return typeof type === "function" && "applyToOptions" in type;
}
class ns extends i5 {
    constructor(t){
        super();
        this.finishedTime = null;
        this.isStopped = false;
        if (!t) {
            return;
        }
        let { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = t;
        this.isPseudoElement = !!pseudoElement;
        this.allowFlatten = allowFlatten;
        this.options = t;
        Q(typeof t.type !== "string", 'Mini animate() doesn\'t support "type" as a string.', "mini-spring");
        let l = (({ type, ...rest })=>{
            if (nn(type) && nt()) {
                return type.applyToOptions(rest);
            }
            rest.duration ??= 300;
            rest.ease ??= "easeOut";
            return rest;
        })(t);
        this.animation = ((element_1, name_1, keyframes_1, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeOut", times } = {}, pseudoElement_1)=>{
            let u = {
                [name_1]: keyframes_1
            };
            if (times) {
                u.offset = times;
            }
            let d = function t(ease_1, duration_1) {
                if (ease_1) {
                    if (typeof ease_1 === "function") {
                        if (nt()) {
                            return iA(ease_1, duration_1);
                        }
                        return "ease-out";
                    }
                    if (iG(ease_1)) {
                        return ne(ease_1);
                    }
                    if (Array.isArray(ease_1)) {
                        return ease_1.map((e)=>t(e, duration_1) || ni.easeOut);
                    }
                    return ni[ease_1];
                }
            }(ease, duration);
            if (Array.isArray(d)) {
                u.easing = d;
            }
            if (tl.value) {
                ih.waapi++;
            }
            let c = {
                delay,
                duration,
                easing: Array.isArray(d) ? "linear" : d,
                fill: "both",
                iterations: repeat + 1,
                direction: repeatType === "reverse" ? "alternate" : "normal"
            };
            if (pseudoElement_1) {
                c.pseudoElement = pseudoElement_1;
            }
            let p = element_1.animate(u, c);
            if (tl.value) {
                p.finished.finally(()=>{
                    ih.waapi--;
                });
            }
            return p;
        })(element, name, keyframes, l, pseudoElement);
        if (l.autoplay === false) {
            this.animation.pause();
        }
        this.animation.onfinish = ()=>{
            this.finishedTime = this.time;
            if (!pseudoElement) {
                let t = i1(keyframes, this.options, finalKeyframe, this.speed);
                if (this.updateMotionValue) {
                    this.updateMotionValue(t);
                } else {
                    ((element_1, name_1, i)=>{
                        if (name_1.startsWith("--")) {
                            element_1.style.setProperty(name_1, i);
                        } else {
                            element_1.style[name_1] = i;
                        }
                    })(element, name, t);
                }
                this.animation.cancel();
            }
            onComplete?.();
            this.notifyFinished();
        };
    }
    play() {
        if (!this.isStopped) {
            this.animation.play();
            if (this.state === "finished") {
                this.updateFinished();
            }
        }
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.finish?.();
    }
    cancel() {
        try {
            this.animation.cancel();
        } catch (t) {}
    }
    stop() {
        if (this.isStopped) {
            return;
        }
        this.isStopped = true;
        let { state } = this;
        if (state !== "idle" && state !== "finished") {
            if (this.updateMotionValue) {
                this.updateMotionValue();
            } else {
                this.commitStyles();
            }
            if (!this.isPseudoElement) {
                this.cancel();
            }
        }
    }
    commitStyles() {
        if (!this.isPseudoElement) {
            this.animation.commitStyles?.();
        }
    }
    get duration() {
        return Number(this.animation.effect?.getComputedTiming?.().duration || 0) / 1000;
    }
    get iterationDuration() {
        let { delay = 0 } = this.options || {};
        return this.duration + delay / 1000;
    }
    get time() {
        return (Number(this.animation.currentTime) || 0) / 1000;
    }
    set time(t) {
        this.finishedTime = null;
        this.animation.currentTime = il(t);
    }
    get speed() {
        return this.animation.playbackRate;
    }
    set speed(t) {
        if (t < 0) {
            this.finishedTime = null;
        }
        this.animation.playbackRate = t;
    }
    get state() {
        if (this.finishedTime !== null) {
            return "finished";
        }
        return this.animation.playState;
    }
    get startTime() {
        return Number(this.animation.startTime);
    }
    set startTime(t) {
        this.animation.startTime = t;
    }
    attachTimeline({ timeline, observe }) {
        if (this.allowFlatten) {
            this.animation.effect?.updateTiming({
                easing: "linear"
            });
        }
        this.animation.onfinish = null;
        if (timeline && i7()) {
            this.animation.timeline = timeline;
            return linear;
        }
        return observe(this);
    }
}
let nr = {
    anticipate,
    backInOut,
    circInOut
};
class no extends ns {
    constructor(t){
        ((t)=>{
            if (typeof t.ease === "string" && t.ease in nr) {
                t.ease = nr[t.ease];
            }
        })(t);
        i3(t);
        super(t);
        if (t.startTime) {
            this.startTime = t.startTime;
        }
        this.options = t;
    }
    updateMotionValue(t) {
        let { motionValue, onUpdate, onComplete, element, ...rest } = this.options;
        if (!motionValue) {
            return;
        }
        if (t !== undefined) {
            return void motionValue.set(t);
        }
        let o = new i9({
            ...rest,
            autoplay: false
        });
        let a = il(this.finishedTime ?? this.time);
        motionValue.setWithVelocity(o.sample(a - 10).value, o.sample(a).value, 10);
        o.stop();
    }
}
let na = (t, name)=>name !== "zIndex" && !!(typeof t === "number" || Array.isArray(t) || typeof t === "string" && (tN.test(t) || t === "0") && !t.startsWith("url("));
let nl = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform"
]);
let nh = i6(()=>Object.hasOwnProperty.call(Element.prototype, "animate"));
class nu extends i5 {
    constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes, name, motionValue, element, ...rest }){
        super();
        this.stop = ()=>{
            if (this._animation) {
                this._animation.stop();
                this.stopTimeline?.();
            }
            this.keyframeResolver?.cancel();
        };
        this.createdAt = t2.now();
        let d = {
            autoplay,
            delay,
            type,
            repeat,
            repeatDelay,
            repeatType,
            name,
            motionValue,
            element,
            ...rest
        };
        let c = element?.KeyframeResolver || tT;
        this.keyframeResolver = new c(keyframes, (t, e, i)=>this.onKeyframesResolved(t, e, d, !i), name, motionValue, element);
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes, finalKeyframe, i, n) {
        this.keyframeResolver = undefined;
        let { name, type, velocity, delay, isHandoff, onUpdate } = i;
        this.resolvedAt = t2.now();
        if (!((keyframes_1, name_1, type_1, velocity_1)=>{
            let s = keyframes_1[0];
            if (s === null) {
                return false;
            }
            if (name_1 === "display" || name_1 === "visibility") {
                return true;
            }
            let r = keyframes_1[keyframes_1.length - 1];
            let o = na(s, name_1);
            let a = na(r, name_1);
            Z(o === a, `You are trying to animate ${name_1} from "${s}" to "${r}". "${o ? r : s}" is not an animatable value.`, "value-not-animatable");
            return !!o && !!a && (((keyframes_1_1)=>{
                let e = keyframes_1_1[0];
                if (keyframes_1_1.length === 1) {
                    return true;
                }
                for(let i = 0; i < keyframes_1_1.length; i++){
                    if (keyframes_1_1[i] !== e) {
                        return true;
                    }
                }
            })(keyframes_1) || (type_1 === "spring" || nn(type_1)) && velocity_1);
        })(keyframes, name, type, velocity)) {
            if (to.instantAnimations || !delay) {
                onUpdate?.(i1(keyframes, i, finalKeyframe));
            }
            keyframes[0] = keyframes[keyframes.length - 1];
            ir(i);
            i.repeat = 0;
        }
        let u = {
            startTime: n ? this.resolvedAt && this.resolvedAt - this.createdAt > 40 ? this.resolvedAt : this.createdAt : undefined,
            finalKeyframe,
            ...i,
            keyframes
        };
        let d = !isHandoff && (({ motionValue, name, repeatDelay, repeatType, damping, type })=>{
            if (!(motionValue?.owner?.current instanceof HTMLElement)) {
                return false;
            }
            let { onUpdate, transformTemplate } = motionValue.owner.getProps();
            return nh() && name && nl.has(name) && (name !== "transform" || !transformTemplate) && !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
        })(u) ? new no({
            ...u,
            element: u.motionValue.owner.current
        }) : new i9(u);
        d.finished.then(()=>this.notifyFinished()).catch(linear);
        if (this.pendingTimeline) {
            this.stopTimeline = d.attachTimeline(this.pendingTimeline);
            this.pendingTimeline = undefined;
        }
        this._animation = d;
    }
    get finished() {
        if (this._animation) {
            return this.animation.finished;
        }
        return this._finished;
    }
    then(t, e) {
        return this.finished.finally(t).then(()=>{});
    }
    get animation() {
        if (!this._animation) {
            this.keyframeResolver?.resume();
            tg = true;
            tx();
            ty();
            tg = false;
        }
        return this._animation;
    }
    get duration() {
        return this.animation.duration;
    }
    get iterationDuration() {
        return this.animation.iterationDuration;
    }
    get time() {
        return this.animation.time;
    }
    set time(t) {
        this.animation.time = t;
    }
    get speed() {
        return this.animation.speed;
    }
    get state() {
        return this.animation.state;
    }
    set speed(t) {
        this.animation.speed = t;
    }
    get startTime() {
        return this.animation.startTime;
    }
    attachTimeline(t) {
        if (this._animation) {
            this.stopTimeline = this.animation.attachTimeline(t);
        } else {
            this.pendingTimeline = t;
        }
        return ()=>this.stop();
    }
    play() {
        this.animation.play();
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.complete();
    }
    cancel() {
        if (this._animation) {
            this.animation.cancel();
        }
        this.keyframeResolver?.cancel();
    }
}
let nd = (t)=>t !== null;
let nc = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
};
let np = {
    type: "keyframes",
    duration: 0.8
};
let nm = {
    type: "keyframes",
    ease: [
        0.25,
        0.1,
        0.35,
        1
    ],
    duration: 0.3
};
let nf = function(t, motionValue, i, n = {}, s, r) {
    return (a)=>{
        let l = ie(n, t) || {};
        let h = l.delay || n.delay || 0;
        let { elapsed = 0 } = n;
        elapsed -= il(h);
        let d = {
            keyframes: Array.isArray(i) ? i : [
                null,
                i
            ],
            ease: "easeOut",
            velocity: motionValue.getVelocity(),
            ...l,
            delay: -elapsed,
            onUpdate: (t)=>{
                motionValue.set(t);
                if (l.onUpdate) {
                    l.onUpdate(t);
                }
            },
            onComplete: ()=>{
                a();
                if (l.onComplete) {
                    l.onComplete();
                }
            },
            name: t,
            motionValue,
            element: r ? undefined : s
        };
        if (!(({ when, delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...rest })=>!!Object.keys(rest).length)(l)) {
            Object.assign(d, ((t, { keyframes })=>{
                if (keyframes.length > 2) {
                    return np;
                }
                if (o.has(t)) {
                    if (t.startsWith("scale")) {
                        return {
                            type: "spring",
                            stiffness: 550,
                            damping: keyframes[1] === 0 ? 2 * Math.sqrt(550) : 30,
                            restSpeed: 10
                        };
                    }
                    return nc;
                }
                return nm;
            })(t, d));
        }
        if (d.duration) {
            d.duration = il(d.duration);
        }
        if (d.repeatDelay) {
            d.repeatDelay = il(d.repeatDelay);
        }
        if (d.from !== undefined) {
            d.keyframes[0] = d.from;
        }
        let c = false;
        if (!(d.type !== false && (d.duration !== 0 || d.repeatDelay))) {
            ir(d);
            if (d.delay === 0) {
                c = true;
            }
        }
        if (to.instantAnimations || to.skipAnimations) {
            c = true;
            ir(d);
            d.delay = 0;
        }
        d.allowFlatten = !l.type && !l.ease;
        if (c && !r && motionValue.get() !== undefined) {
            let t = ((t, { repeat, repeatType = "loop" }, i)=>{
                let r = t.filter(nd);
                let o = repeat && repeatType !== "loop" && repeat % 2 == 1 ? 0 : r.length - 1;
                return r[o];
            })(d.keyframes, l);
            if (t !== undefined) {
                return void schedule.update(()=>{
                    d.onUpdate(t);
                    d.onComplete();
                });
            }
        }
        if (l.isSync) {
            return new i9(d);
        }
        return new nu(d);
    };
};
function nv(t, { transition = t.getDefaultTransition(), transitionEnd, ...rest }, { delay = 0, transitionOverride, type } = {}) {
    if (transitionOverride) {
        transition = transitionOverride;
    }
    let l = [];
    let h = type && t.animationState && t.animationState.getState()[type];
    for(let e in rest){
        let n = t.getValue(e, t.latestValues[e] ?? null);
        let s = rest[e];
        if (s === undefined || h && (({ protectedKeys, needsAnimating }, e)=>{
            let s = protectedKeys.hasOwnProperty(e) && needsAnimating[e] !== true;
            needsAnimating[e] = false;
            return s;
        })(h, e)) {
            continue;
        }
        let o = {
            delay,
            ...ie(transition || {}, e)
        };
        let d = n.get();
        if (d !== undefined && !n.isAnimating && !Array.isArray(s) && s === d && !o.velocity) {
            continue;
        }
        let c = false;
        if (window.MotionHandoffAnimation) {
            let i = t.props[e9];
            if (i) {
                let t = window.MotionHandoffAnimation(i, e, schedule);
                if (t !== null) {
                    o.startTime = t;
                    c = true;
                }
            }
        }
        is(t, e);
        n.start(nf(e, n, s, t.shouldReduceMotion && B.has(e) ? {
            type: false
        } : o, t, c));
        let p = n.animation;
        if (p) {
            l.push(p);
        }
    }
    if (transitionEnd) {
        Promise.all(l).then(()=>{
            schedule.update(()=>{
                if (transitionEnd) {
                    ((t, transitionEnd_1)=>{
                        let { transitionEnd = {}, transition = {}, ...rest } = it(t, transitionEnd_1) || {};
                        for(let e in rest = {
                            ...rest,
                            ...transitionEnd
                        }){
                            let r;
                            let i = ii(r = rest[e]) ? r[r.length - 1] || 0 : r;
                            if (t.hasValue(e)) {
                                t.getValue(e).set(i);
                            } else {
                                t.addValue(e, t4(i));
                            }
                        }
                    })(t, transitionEnd);
                }
            });
        });
    }
    return l;
}
function ng(t, e, i, n = 0, s = 1) {
    let r = Array.from(t).sort((t, e)=>t.sortNodePosition(e)).indexOf(e);
    let t_size = t.size;
    let a = (t_size - 1) * n;
    if (typeof i === "function") {
        return i(r, t_size);
    }
    if (s === 1) {
        return r * n;
    }
    return a - r * n;
}
function ny(t, e, n = {}) {
    let s = it(t, e, n.type === "exit" ? t.presenceContext?.custom : undefined);
    let { transition = t.getDefaultTransition() || {} } = s || {};
    if (n.transitionOverride) {
        transition = n.transitionOverride;
    }
    let o = s ? ()=>Promise.all(nv(t, s, n)) : ()=>Promise.resolve();
    let a = t.variantChildren && t.variantChildren.size ? function(i = 0) {
        let { delayChildren = 0, staggerChildren, staggerDirection } = transition;
        return ((t, e, i = 0, n = 0, s = 0, r = 1, o)=>{
            let a = [];
            for (let l of t.variantChildren){
                l.notify("AnimationStart", e);
                a.push(ny(l, e, {
                    ...o,
                    delay: i + (typeof n === "function" ? 0 : n) + ng(t.variantChildren, l, n, s, r)
                }).then(()=>l.notify("AnimationComplete", e)));
            }
            return Promise.all(a);
        })(t, e, i, delayChildren, staggerChildren, staggerDirection, n);
    } : ()=>Promise.resolve();
    let { when } = transition;
    if (!when) {
        return Promise.all([
            o(),
            a(n.delay)
        ]);
    }
    {
        let [t, e] = when === "beforeChildren" ? [
            o,
            a
        ] : [
            a,
            o
        ];
        return t().then(()=>e());
    }
}
function nx(t, e) {
    if (!Array.isArray(e)) {
        return false;
    }
    let e_length = e.length;
    if (e_length !== t.length) {
        return false;
    }
    for(let n = 0; n < e_length; n++){
        if (e[n] !== t[n]) {
            return false;
        }
    }
    return true;
}
let ed_length = ed.length;
let nw = [
    ...eu
].reverse();
let eu_length = eu.length;
function nb(...args) {
    let isActive = args.length > 0 && args[0] !== undefined && args[0];
    return {
        isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    };
}
function nS() {
    return {
        animate: nb(true),
        whileInView: nb(),
        whileHover: nb(),
        whileTap: nb(),
        whileDrag: nb(),
        whileFocus: nb(),
        exit: nb()
    };
}
class nA {
    update() {}
    constructor(t){
        this.isMounted = false;
        this.node = t;
    }
}
class nM extends nA {
    updateAnimationControlsSubscription() {
        let { animate } = this.node.getProps();
        if (el(animate)) {
            this.unmountControls = animate.subscribe(this.node);
        }
    }
    mount() {
        this.updateAnimationControlsSubscription();
    }
    update() {
        let { animate } = this.node.getProps();
        let { animate: animate_1 } = this.node.prevProps || {};
        if (animate !== animate_1) {
            this.updateAnimationControlsSubscription();
        }
    }
    unmount() {
        this.node.animationState.reset();
        this.unmountControls?.();
    }
    constructor(t){
        super(t);
        if (!t.animationState) {
            t.animationState = ((t)=>{
                let e = (e)=>Promise.all(e.map(({ animation, options })=>((t, animation_1, n = {})=>{
                            let i;
                            t.notify("AnimationStart", animation_1);
                            if (Array.isArray(animation_1)) {
                                i = Promise.all(animation_1.map((e)=>ny(t, e, n)));
                            } else if (typeof animation_1 === "string") {
                                i = ny(t, animation_1, n);
                            } else {
                                let s = typeof animation_1 === "function" ? it(t, animation_1, n.custom) : animation_1;
                                i = Promise.all(nv(t, s, n));
                            }
                            return i.then(()=>{
                                t.notify("AnimationComplete", animation_1);
                            });
                        })(t, animation, options)));
                let i = nS();
                let n = true;
                let s = (e)=>(i, n)=>{
                        let r = it(t, n, e === "exit" ? t.presenceContext?.custom : undefined);
                        if (r) {
                            let { transition, transitionEnd, ...rest } = r;
                            i = {
                                ...i,
                                ...rest,
                                ...transitionEnd
                            };
                        }
                        return i;
                    };
                function animateChanges(r) {
                    let { props } = t;
                    let a = function t(e) {
                        if (!e) {
                            return;
                        }
                        if (!e.isControllingVariants) {
                            let i = e.parent && t(e.parent) || {};
                            if (e.props.initial !== undefined) {
                                i.initial = e.props.initial;
                            }
                            return i;
                        }
                        let i = {};
                        for(let t = 0; t < ed_length; t++){
                            let n = ed[t];
                            let s = e.props[n];
                            if (eh(s) || s === false) {
                                i[n] = s;
                            }
                        }
                        return i;
                    }(t.parent) || {};
                    let l = [];
                    let h = new Set;
                    let u = {};
                    let d = Infinity;
                    for(let e = 0; e < eu_length; e++){
                        let c;
                        let p;
                        let m = nw[e];
                        let f = i[m];
                        let v = props[m] !== undefined ? props[m] : a[m];
                        let g = eh(v);
                        let y = m === r ? f.isActive : null;
                        if (y === false) {
                            d = e;
                        }
                        let x = v === a[m] && v !== props[m] && g;
                        if (x && n && t.manuallyAnimateOnMount) {
                            x = false;
                        }
                        f.protectedKeys = {
                            ...u
                        };
                        if (!f.isActive && y === null || !v && !f.prevProp || el(v) || typeof v === "boolean") {
                            continue;
                        }
                        c = f.prevProp;
                        let T = typeof (p = v) === "string" ? p !== c : !!Array.isArray(p) && !nx(p, c);
                        let w = T || m === r && f.isActive && !x && g || e > d && g;
                        let P = false;
                        let b = Array.isArray(v) ? v : [
                            v
                        ];
                        let S = b.reduce(s(m), {});
                        if (y === false) {
                            S = {};
                        }
                        let { prevResolvedValues = {} } = f;
                        let M = {
                            ...prevResolvedValues,
                            ...S
                        };
                        let V = (e)=>{
                            w = true;
                            if (h.has(e)) {
                                P = true;
                                h.delete(e);
                            }
                            f.needsAnimating[e] = true;
                            let i = t.getValue(e);
                            if (i) {
                                i.liveStyle = false;
                            }
                        };
                        for(let t in M){
                            let e = S[t];
                            let i = prevResolvedValues[t];
                            if (!u.hasOwnProperty(t)) {
                                if (ii(e) && ii(i) ? nx(e, i) : e === i) {
                                    if (e !== undefined && h.has(t)) {
                                        V(t);
                                    } else {
                                        f.protectedKeys[t] = true;
                                    }
                                } else if (e != null) {
                                    V(t);
                                } else {
                                    h.add(t);
                                }
                            }
                        }
                        f.prevProp = v;
                        f.prevResolvedValues = S;
                        if (f.isActive) {
                            u = {
                                ...u,
                                ...S
                            };
                        }
                        if (n && t.blockInitialAnimation) {
                            w = false;
                        }
                        let E = x && T;
                        let C = !E || P;
                        if (w && C) {
                            l.push(...b.map((e)=>{
                                let options = {
                                    type: m
                                };
                                if (typeof e === "string" && n && !E && t.manuallyAnimateOnMount && t.parent) {
                                    let { parent } = t;
                                    let s = it(parent, e);
                                    if (parent.enteringChildren && s) {
                                        let { delayChildren } = s.transition || {};
                                        options.delay = ng(parent.enteringChildren, t, delayChildren);
                                    }
                                }
                                return {
                                    animation: e,
                                    options
                                };
                            }));
                        }
                    }
                    if (h.size) {
                        let e = {};
                        if (typeof props.initial !== "boolean") {
                            let i = it(t, Array.isArray(props.initial) ? props.initial[0] : props.initial);
                            if (i && i.transition) {
                                e.transition = i.transition;
                            }
                        }
                        h.forEach((i)=>{
                            let n = t.getBaseTarget(i);
                            let s = t.getValue(i);
                            if (s) {
                                s.liveStyle = true;
                            }
                            e[i] = n ?? null;
                        });
                        l.push({
                            animation: e
                        });
                    }
                    let m = !!l.length;
                    if (n && (props.initial === false || props.initial === props.animate) && !t.manuallyAnimateOnMount) {
                        m = false;
                    }
                    n = false;
                    if (m) {
                        return e(l);
                    }
                    return Promise.resolve();
                }
                return {
                    animateChanges,
                    setActive: function(e, n) {
                        if (i[e].isActive === n) {
                            return Promise.resolve();
                        }
                        t.variantChildren?.forEach((t)=>t.animationState?.setActive(e, n));
                        i[e].isActive = n;
                        let o = animateChanges(e);
                        for(let t in i){
                            i[t].protectedKeys = {};
                        }
                        return o;
                    },
                    setAnimateFunction: function(i) {
                        e = i(t);
                    },
                    getState: ()=>i,
                    reset: ()=>{
                        i = nS();
                    }
                };
            })(t);
        }
    }
}
let nV = 0;
class nE extends nA {
    update() {
        if (!this.node.presenceContext) {
            return;
        }
        let { isPresent, onExitComplete } = this.node.presenceContext;
        let { isPresent: isPresent_1 } = this.node.prevPresenceContext || {};
        if (!this.node.animationState || isPresent === isPresent_1) {
            return;
        }
        let n = this.node.animationState.setActive("exit", !isPresent);
        if (onExitComplete && !isPresent) {
            n.then(()=>{
                onExitComplete(this.id);
            });
        }
    }
    mount() {
        let { register, onExitComplete } = this.node.presenceContext || {};
        if (onExitComplete) {
            onExitComplete(this.id);
        }
        if (register) {
            this.unmount = register(this.id);
        }
    }
    unmount() {}
    constructor(){
        super(...arguments);
        this.id = nV++;
    }
}
let nC = {
    x: false,
    y: false
};
function nD(t, e, i, n = {
    passive: true
}) {
    t.addEventListener(e, i, n);
    return ()=>t.removeEventListener(e, i);
}
let nk = (t)=>{
    if (t.pointerType === "mouse") {
        return typeof t.button !== "number" || t.button <= 0;
    }
    return t.isPrimary !== false;
};
function nR(t) {
    return {
        point: {
            x: t.pageX,
            y: t.pageY
        }
    };
}
function nL(t, e, i, n) {
    return nD(t, e, (t)=>nk(t) && i(t, nR(t)), n);
}
function nj(t) {
    return t.max - t.min;
}
function nF(t, e, i, n = 0.5) {
    t.origin = n;
    t.originPoint = b(e.min, e.max, t.origin);
    t.scale = nj(i) / nj(e);
    t.translate = b(i.min, i.max, t.origin) - t.originPoint;
    if (t.scale >= 0.9999 && t.scale <= 1.0001 || isNaN(t.scale)) {
        t.scale = 1;
    }
    if (t.translate >= -0.01 && t.translate <= 0.01 || isNaN(t.translate)) {
        t.translate = 0;
    }
}
function nB(t, e, i, n) {
    nF(t.x, e.x, i.x, n ? n.originX : undefined);
    nF(t.y, e.y, i.y, n ? n.originY : undefined);
}
function nO(t, e, i) {
    t.min = i.min + e.min;
    t.max = t.min + nj(e);
}
function nI(t, e, i) {
    t.min = e.min - i.min;
    t.max = t.min + nj(e);
}
function nU(t, e, i) {
    nI(t.x, e.x, i.x);
    nI(t.y, e.y, i.y);
}
function nN(t) {
    return [
        t("x"),
        t("y")
    ];
}
let nW = ({ current })=>{
    if (current) {
        return current.ownerDocument.defaultView;
    }
    return null;
};
let nY = (t, e)=>Math.abs(t - e);
class nz {
    updateHandlers(t) {
        this.handlers = t;
    }
    end() {
        if (this.removeListeners) {
            this.removeListeners();
        }
        cancel(this.updatePoint);
    }
    constructor(t, e, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3 } = {}){
        this.startEvent = null;
        this.lastMoveEvent = null;
        this.lastMoveEventInfo = null;
        this.handlers = {};
        this.contextWindow = window;
        this.updatePoint = ()=>{
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) {
                return;
            }
            let t = nK(this.lastMoveEventInfo, this.history);
            let e = this.startEvent !== null;
            let i = ((t, e)=>Math.sqrt(nY(t.x, e.x) ** 2 + nY(t.y, e.y) ** 2))(t.offset, {
                x: 0,
                y: 0
            }) >= this.distanceThreshold;
            if (!e && !i) {
                return;
            }
            let { point } = t;
            let { timestamp } = state;
            this.history.push({
                ...point,
                timestamp
            });
            let { onStart, onMove } = this.handlers;
            if (!e) {
                if (onStart) {
                    onStart(this.lastMoveEvent, t);
                }
                this.startEvent = this.lastMoveEvent;
            }
            if (onMove) {
                onMove(this.lastMoveEvent, t);
            }
        };
        this.handlePointerMove = (t, e)=>{
            this.lastMoveEvent = t;
            this.lastMoveEventInfo = nH(e, this.transformPagePoint);
            schedule.update(this.updatePoint, true);
        };
        this.handlePointerUp = (t, e)=>{
            this.end();
            let { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
            if (this.dragSnapToOrigin && resumeAnimation) {
                resumeAnimation();
            }
            if (!(this.lastMoveEvent && this.lastMoveEventInfo)) {
                return;
            }
            let r = nK(t.type === "pointercancel" ? this.lastMoveEventInfo : nH(e, this.transformPagePoint), this.history);
            if (this.startEvent && onEnd) {
                onEnd(t, r);
            }
            if (onSessionEnd) {
                onSessionEnd(t, r);
            }
        };
        if (!nk(t)) {
            return;
        }
        this.dragSnapToOrigin = dragSnapToOrigin;
        this.handlers = e;
        this.transformPagePoint = transformPagePoint;
        this.distanceThreshold = distanceThreshold;
        this.contextWindow = contextWindow || window;
        let o = nH(nR(t), this.transformPagePoint);
        let { point } = o;
        let { timestamp } = state;
        this.history = [
            {
                ...point,
                timestamp
            }
        ];
        let { onSessionStart } = e;
        if (onSessionStart) {
            onSessionStart(t, nK(o, this.history));
        }
        this.removeListeners = ia(nL(this.contextWindow, "pointermove", this.handlePointerMove), nL(this.contextWindow, "pointerup", this.handlePointerUp), nL(this.contextWindow, "pointercancel", this.handlePointerUp));
    }
}
function nH(t, transformPagePoint) {
    if (transformPagePoint) {
        return {
            point: transformPagePoint(t.point)
        };
    }
    return t;
}
function nX(point, e) {
    return {
        x: point.x - e.x,
        y: point.y - e.y
    };
}
function nK({ point }, history) {
    return {
        point,
        delta: nX(point, n$(history)),
        offset: nX(point, history[0]),
        velocity: ((history_1)=>{
            const e = 0.1;
            if (history_1.length < 2) {
                return {
                    x: 0,
                    y: 0
                };
            }
            let i = history_1.length - 1;
            let n = null;
            let s = n$(history_1);
            while(i >= 0 && (n = history_1[i], !(s.timestamp - n.timestamp > il(0.1)))){
                i--;
            }
            if (!n) {
                return {
                    x: 0,
                    y: 0
                };
            }
            let r = (s.timestamp - n.timestamp) / 1000;
            if (r === 0) {
                return {
                    x: 0,
                    y: 0
                };
            }
            let o = {
                x: (s.x - n.x) / r,
                y: (s.y - n.y) / r
            };
            if (o.x === Infinity) {
                o.x = 0;
            }
            if (o.y === Infinity) {
                o.y = 0;
            }
            return o;
        })(history)
    };
}
function n$(history) {
    return history[history.length - 1];
}
function nq(t, e, i) {
    return {
        min: e !== undefined ? t.min + e : undefined,
        max: i !== undefined ? t.max + i - (t.max - t.min) : undefined
    };
}
function nG(t, e) {
    let min = e.min - t.min;
    let max = e.max - t.max;
    if (e.max - e.min < t.max - t.min) {
        [min, max] = [
            max,
            min
        ];
    }
    return {
        min,
        max
    };
}
function n_(t, e, i) {
    return {
        min: nZ(t, e),
        max: nZ(t, i)
    };
}
function nZ(t, e) {
    if (typeof t === "number") {
        return t;
    }
    return t[e] || 0;
}
let nQ = new WeakMap;
class nJ {
    start(t, { snapToCursor = false, distanceThreshold } = {}) {
        let { presenceContext } = this.visualElement;
        if (presenceContext && presenceContext.isPresent === false) {
            return;
        }
        let onSessionStart = (t)=>{
            let { dragSnapToOrigin } = this.getProps();
            if (dragSnapToOrigin) {
                this.pauseAnimation();
            } else {
                this.stopAnimation();
            }
            if (snapToCursor) {
                this.snapToCursor(nR(t).point);
            }
        };
        let onStart = (t, e)=>{
            let { drag, dragPropagation, onDragStart } = this.getProps();
            if (drag && !dragPropagation && (this.openDragLock && this.openDragLock(), this.openDragLock = ((drag_1)=>{
                if (drag_1 === "x" || drag_1 === "y") {
                    if (nC[drag_1]) {
                        return null;
                    } else {
                        nC[drag_1] = true;
                        return ()=>{
                            nC[drag_1] = false;
                        };
                    }
                }
                if (nC.x || nC.y) {
                    return null;
                }
                nC.x = nC.y = true;
                return ()=>{
                    nC.x = nC.y = false;
                };
            })(drag), !this.openDragLock)) {
                return;
            }
            this.latestPointerEvent = t;
            this.latestPanInfo = e;
            this.isDragging = true;
            this.currentDirection = null;
            this.resolveConstraints();
            if (this.visualElement.projection) {
                this.visualElement.projection.isAnimationBlocked = true;
                this.visualElement.projection.target = undefined;
            }
            nN((t)=>{
                let e = this.getAxisMotionValue(t).get() || 0;
                if (z.test(e)) {
                    let { projection } = this.visualElement;
                    if (projection && projection.layout) {
                        let n = projection.layout.layoutBox[t];
                        if (n) {
                            e = nj(n) * (parseFloat(e) / 100);
                        }
                    }
                }
                this.originPoint[t] = e;
            });
            if (onDragStart) {
                schedule.postRender(()=>onDragStart(t, e));
            }
            is(this.visualElement, "transform");
            let { animationState } = this.visualElement;
            if (animationState) {
                animationState.setActive("whileDrag", true);
            }
        };
        let onMove = (t, e)=>{
            this.latestPointerEvent = t;
            this.latestPanInfo = e;
            let { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
            if (!dragPropagation && !this.openDragLock) {
                return;
            }
            let { offset } = e;
            if (dragDirectionLock && this.currentDirection === null) {
                this.currentDirection = ((offset_1, e = 10)=>{
                    let i = null;
                    if (Math.abs(offset_1.y) > e) {
                        i = "y";
                    } else if (Math.abs(offset_1.x) > e) {
                        i = "x";
                    }
                    return i;
                })(offset);
                if (this.currentDirection !== null && onDirectionLock) {
                    onDirectionLock(this.currentDirection);
                }
                return;
            }
            this.updateAxis("x", e.point, offset);
            this.updateAxis("y", e.point, offset);
            this.visualElement.render();
            if (onDrag) {
                onDrag(t, e);
            }
        };
        let onSessionEnd = (t, e)=>{
            this.latestPointerEvent = t;
            this.latestPanInfo = e;
            this.stop(t, e);
            this.latestPointerEvent = null;
            this.latestPanInfo = null;
        };
        let resumeAnimation = ()=>nN((t)=>this.getAnimationState(t) === "paused" && this.getAxisMotionValue(t).animation?.play());
        let { dragSnapToOrigin } = this.getProps();
        this.panSession = new nz(t, {
            onSessionStart,
            onStart,
            onMove,
            onSessionEnd,
            resumeAnimation
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin,
            distanceThreshold,
            contextWindow: nW(this.visualElement)
        });
    }
    stop(t, e) {
        let i = t || this.latestPointerEvent;
        let n = e || this.latestPanInfo;
        let isDragging = this.isDragging;
        this.cancel();
        if (!isDragging || !n || !i) {
            return;
        }
        let { velocity } = n;
        this.startAnimation(velocity);
        let { onDragEnd } = this.getProps();
        if (onDragEnd) {
            schedule.postRender(()=>onDragEnd(i, n));
        }
    }
    cancel() {
        this.isDragging = false;
        let { projection, animationState } = this.visualElement;
        if (projection) {
            projection.isAnimationBlocked = false;
        }
        if (this.panSession) {
            this.panSession.end();
        }
        this.panSession = undefined;
        let { dragPropagation } = this.getProps();
        if (!dragPropagation && this.openDragLock) {
            this.openDragLock();
            this.openDragLock = null;
        }
        if (animationState) {
            animationState.setActive("whileDrag", false);
        }
    }
    updateAxis(t, e, i) {
        let { drag } = this.getProps();
        if (!i || !n0(t, drag, this.currentDirection)) {
            return;
        }
        let s = this.getAxisMotionValue(t);
        let r = this.originPoint[t] + i[t];
        if (this.constraints && this.constraints[t]) {
            r = ((t, { min, max }, i)=>{
                if (min !== undefined && t < min) {
                    t = i ? b(min, t, i.min) : Math.max(t, min);
                } else if (max !== undefined && t > max) {
                    t = i ? b(max, t, i.max) : Math.min(t, max);
                }
                return t;
            })(r, this.constraints[t], this.elastic[t]);
        }
        s.set(r);
    }
    resolveConstraints() {
        let { dragConstraints, dragElastic } = this.getProps();
        let n = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
        let constraints = this.constraints;
        if (dragConstraints && e4(dragConstraints)) {
            if (!this.constraints) {
                this.constraints = this.resolveRefConstraints();
            }
        } else if (dragConstraints && n) {
            this.constraints = ((t, { top, left, bottom, right })=>({
                    x: nq(t.x, left, right),
                    y: nq(t.y, top, bottom)
                }))(n.layoutBox, dragConstraints);
        } else {
            this.constraints = false;
        }
        this.elastic = ((t = 0.35)=>{
            if (t === false) {
                t = 0;
            } else if (t === true) {
                t = 0.35;
            }
            return {
                x: n_(t, "left", "right"),
                y: n_(t, "top", "bottom")
            };
        })(dragElastic);
        if (constraints !== this.constraints && n && this.constraints && !this.hasMutatedConstraints) {
            nN((t)=>{
                if (this.constraints !== false && this.getAxisMotionValue(t)) {
                    this.constraints[t] = ((t, e)=>{
                        let i = {};
                        if (e.min !== undefined) {
                            i.min = e.min - t.min;
                        }
                        if (e.max !== undefined) {
                            i.max = e.max - t.min;
                        }
                        return i;
                    })(n.layoutBox[t], this.constraints[t]);
                }
            });
        }
    }
    resolveRefConstraints() {
        let t;
        let { dragConstraints, onMeasureDragConstraints } = this.getProps();
        if (!dragConstraints || !e4(dragConstraints)) {
            return false;
        }
        let dragConstraints_current = dragConstraints.current;
        Q(dragConstraints_current !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
        let { projection } = this.visualElement;
        if (!projection || !projection.layout) {
            return false;
        }
        let r = ((dragConstraints_current_1, e, i)=>{
            let n = j(dragConstraints_current_1, i);
            let { scroll } = e;
            if (scroll) {
                k(n.x, scroll.offset.x);
                k(n.y, scroll.offset.y);
            }
            return n;
        })(dragConstraints_current, projection.root, this.visualElement.getTransformPagePoint());
        t = projection.layout.layoutBox;
        let o = {
            x: nG(t.x, r.x),
            y: nG(t.y, r.y)
        };
        if (onMeasureDragConstraints) {
            let t = onMeasureDragConstraints((({ x, y })=>({
                    top: y.min,
                    right: x.max,
                    bottom: y.max,
                    left: x.min
                }))(o));
            this.hasMutatedConstraints = !!t;
            if (t) {
                o = P(t);
            }
        }
        return o;
    }
    startAnimation(t) {
        let { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
        let a = this.constraints || {};
        return Promise.all(nN((o)=>{
            if (!n0(o, drag, this.currentDirection)) {
                return;
            }
            let l = a && a[o] || {};
            if (dragSnapToOrigin) {
                l = {
                    min: 0,
                    max: 0
                };
            }
            let h = {
                type: "inertia",
                velocity: dragMomentum ? t[o] : 0,
                bounceStiffness: dragElastic ? 200 : 1000000,
                bounceDamping: dragElastic ? 40 : 10000000,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...dragTransition,
                ...l
            };
            return this.startAxisValueAnimation(o, h);
        })).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(t, e) {
        let i = this.getAxisMotionValue(t);
        is(this.visualElement, t);
        return i.start(nf(t, i, 0, e, this.visualElement, false));
    }
    stopAnimation() {
        nN((t)=>this.getAxisMotionValue(t).stop());
    }
    pauseAnimation() {
        nN((t)=>this.getAxisMotionValue(t).animation?.pause());
    }
    getAnimationState(t) {
        return this.getAxisMotionValue(t).animation?.state;
    }
    getAxisMotionValue(t) {
        let e = `_drag${t.toUpperCase()}`;
        let i = this.visualElement.getProps();
        return i[e] || this.visualElement.getValue(t, (i.initial ? i.initial[t] : undefined) || 0);
    }
    snapToCursor(t) {
        nN((e)=>{
            let { drag } = this.getProps();
            if (!n0(e, drag, this.currentDirection)) {
                return;
            }
            let { projection } = this.visualElement;
            let s = this.getAxisMotionValue(e);
            if (projection && projection.layout) {
                let { min, max } = projection.layout.layoutBox[e];
                s.set(t[e] - b(min, max, 0.5));
            }
        });
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current) {
            return;
        }
        let { drag, dragConstraints } = this.getProps();
        let { projection } = this.visualElement;
        if (!e4(dragConstraints) || !projection || !this.constraints) {
            return;
        }
        this.stopAnimation();
        let n = {
            x: 0,
            y: 0
        };
        nN((t)=>{
            let e = this.getAxisMotionValue(t);
            if (e && this.constraints !== false) {
                let i = e.get();
                n[t] = ((t, e)=>{
                    let i = 0.5;
                    let n = nj(t);
                    let s = nj(e);
                    if (s > n) {
                        i = iQ(e.min, e.max - n, t.min);
                    } else if (n > s) {
                        i = iQ(t.min, t.max - s, e.min);
                    }
                    return O(0, 1, i);
                })({
                    min: i,
                    max: i
                }, this.constraints[t]);
            }
        });
        let { transformTemplate } = this.visualElement.getProps();
        this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        if (projection.root) {
            projection.root.updateScroll();
        }
        projection.updateLayout();
        this.resolveConstraints();
        nN((e)=>{
            if (!n0(e, drag, null)) {
                return;
            }
            let i = this.getAxisMotionValue(e);
            let { min, max } = this.constraints[e];
            i.set(b(min, max, n[e]));
        });
    }
    addListeners() {
        if (!this.visualElement.current) {
            return;
        }
        nQ.set(this.visualElement, this);
        let t = nL(this.visualElement.current, "pointerdown", (t)=>{
            let { drag, dragListener = true } = this.getProps();
            if (drag && dragListener) {
                this.start(t);
            }
        });
        let e = ()=>{
            let { dragConstraints } = this.getProps();
            if (e4(dragConstraints) && dragConstraints.current) {
                this.constraints = this.resolveRefConstraints();
            }
        };
        let { projection } = this.visualElement;
        let n = projection.addEventListener("measure", e);
        if (projection && !projection.layout) {
            if (projection.root) {
                projection.root.updateScroll();
            }
            projection.updateLayout();
        }
        schedule.read(e);
        let s = nD(window, "resize", ()=>this.scalePositionWithinConstraints());
        let r = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged })=>{
            if (this.isDragging && hasLayoutChanged) {
                nN((t)=>{
                    let i = this.getAxisMotionValue(t);
                    if (i) {
                        this.originPoint[t] += delta[t].translate;
                        i.set(i.get() + delta[t].translate);
                    }
                });
                this.visualElement.render();
            }
        });
        return ()=>{
            s();
            t();
            n();
            if (r) {
                r();
            }
        };
    }
    getProps() {
        let t = this.visualElement.getProps();
        let { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = 0.35, dragMomentum = true } = t;
        return {
            ...t,
            drag,
            dragDirectionLock,
            dragPropagation,
            dragConstraints,
            dragElastic,
            dragMomentum
        };
    }
    constructor(t){
        this.openDragLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = {
            x: 0,
            y: 0
        };
        this.constraints = false;
        this.hasMutatedConstraints = false;
        this.elastic = en();
        this.latestPointerEvent = null;
        this.latestPanInfo = null;
        this.visualElement = t;
    }
}
function n0(t, drag, i) {
    return (drag === true || drag === t) && (i === null || i === t);
}
class n1 extends nA {
    mount() {
        let { dragControls } = this.node.getProps();
        if (dragControls) {
            this.removeGroupControls = dragControls.subscribe(this.controls);
        }
        this.removeListeners = this.controls.addListeners() || linear;
    }
    unmount() {
        this.removeGroupControls();
        this.removeListeners();
    }
    constructor(t){
        super(t);
        this.removeGroupControls = linear;
        this.removeListeners = linear;
        this.controls = new nJ(t);
    }
}
let n2 = (t)=>(e, i)=>{
        if (t) {
            schedule.postRender(()=>t(e, i));
        }
    };
class n3 extends nA {
    onPointerDown(t) {
        this.session = new nz(t, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: nW(this.node)
        });
    }
    createPanHandlers() {
        let { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
        return {
            onSessionStart: n2(onPanSessionStart),
            onStart: n2(onPanStart),
            onMove: onPan,
            onEnd: (t, e)=>{
                delete this.session;
                if (onPanEnd) {
                    schedule.postRender(()=>onPanEnd(t, e));
                }
            }
        };
    }
    mount() {
        this.removePointerDownListener = nL(this.node.current, "pointerdown", (t)=>this.onPointerDown(t));
    }
    update() {
        if (this.session) {
            this.session.updateHandlers(this.createPanHandlers());
        }
    }
    unmount() {
        this.removePointerDownListener();
        if (this.session) {
            this.session.end();
        }
    }
    constructor(){
        super(...arguments);
        this.removePointerDownListener = linear;
    }
}
const n5 = require("./module-75601.js");
let n4 = {
    hasAnimatedSinceResize: true,
    hasEverUpdated: false
};
let n9 = false;
class N6 extends s.Component {
    componentDidMount() {
        let { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
        let { projection } = visualElement;
        if (projection) {
            if (layoutGroup.group) {
                layoutGroup.group.add(projection);
            }
            if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
                switchLayoutGroup.register(projection);
            }
            if (n9) {
                projection.root.didUpdate();
            }
            projection.addEventListener("animationComplete", ()=>{
                this.safeToRemove();
            });
            projection.setOptions({
                ...projection.options,
                onExitComplete: ()=>this.safeToRemove()
            });
        }
        n4.hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(t) {
        let { layoutDependency, visualElement, drag, isPresent } = this.props;
        let { projection } = visualElement;
        if (projection) {
            projection.isPresent = isPresent;
            n9 = true;
            if (drag || t.layoutDependency !== layoutDependency || layoutDependency === undefined || t.isPresent !== isPresent) {
                projection.willUpdate();
            } else {
                this.safeToRemove();
            }
            if (t.isPresent !== isPresent) {
                if (isPresent) {
                    projection.promote();
                } else if (!projection.relegate()) {
                    schedule.postRender(()=>{
                        let t = projection.getStack();
                        if (!(t && t.members.length)) {
                            this.safeToRemove();
                        }
                    });
                }
            }
        }
        return null;
    }
    componentDidUpdate() {
        let { projection } = this.props.visualElement;
        if (projection) {
            projection.root.didUpdate();
            schedule_1.postRender(()=>{
                if (!projection.currentAnimation && projection.isLead()) {
                    this.safeToRemove();
                }
            });
        }
    }
    componentWillUnmount() {
        let { visualElement, layoutGroup, switchLayoutGroup } = this.props;
        let { projection } = visualElement;
        n9 = true;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup && layoutGroup.group) {
                layoutGroup.group.remove(projection);
            }
            if (switchLayoutGroup && switchLayoutGroup.deregister) {
                switchLayoutGroup.deregister(projection);
            }
        }
    }
    safeToRemove() {
        let { safeToRemove } = this.props;
        if (safeToRemove) {
            safeToRemove();
        }
    }
    render() {
        return null;
    }
}
function N7Component(t) {
    let [isPresent, safeToRemove] = n5.xQ();
    let layoutGroup = s.useContext(eW.L);
    return <N6 {...t} layoutGroup={layoutGroup} switchLayoutGroup={s.useContext(E6Context)} isPresent={isPresent} safeToRemove={safeToRemove}/>;
}
const n8 = require("./module-73142.js");
function st(t) {
    return n8.G(t) && "ownerSVGElement" in t;
}
let se = (t, e)=>t.depth - e.depth;
class si {
    add(t) {
        tQ(this.children, t);
        this.isDirty = true;
    }
    remove(t) {
        tJ(this.children, t);
        this.isDirty = true;
    }
    forEach(t) {
        if (this.isDirty) {
            this.children.sort(se);
        }
        this.isDirty = false;
        this.children.forEach(t);
    }
    constructor(){
        this.children = [];
        this.isDirty = false;
    }
}
let sn = [
    "TopLeft",
    "TopRight",
    "BottomLeft",
    "BottomRight"
];
let sn_length = sn.length;
let sr = (t)=>{
    if (typeof t === "string") {
        return parseFloat(t);
    }
    return t;
};
let so = (t)=>typeof t === "number" || H.test(t);
function sa(t, e) {
    if (t[e] !== undefined) {
        return t[e];
    }
    return t.borderRadius;
}
let sl = su(0, 0.5, circOut);
let sh = su(0.5, 0.95, linear);
function su(t, e, i) {
    return (n)=>{
        if (n < t) {
            return 0;
        }
        if (n > e) {
            return 1;
        }
        return i(iQ(t, e, n));
    };
}
function sd(t, e) {
    t.min = e.min;
    t.max = e.max;
}
function sc(t, e) {
    sd(t.x, e.x);
    sd(t.y, e.y);
}
function sp(t, e) {
    t.translate = e.translate;
    t.scale = e.scale;
    t.originPoint = e.originPoint;
    t.origin = e.origin;
}
function sm(t, e, i, n, s) {
    t -= e;
    t = n + 1 / i * (t - n);
    if (s !== undefined) {
        t = n + 1 / s * (t - n);
    }
    return t;
}
function sf(t, latestValues, [r, o, a], n, s) {
    ((t, e = 0, i = 1, n = 0.5, s, r = t, o = t)=>{
        if (z.test(e)) {
            e = parseFloat(e);
            e = b(o.min, o.max, e / 100) - o.min;
        }
        if (typeof e !== "number") {
            return;
        }
        let a = b(r.min, r.max, n);
        if (t === r) {
            a -= e;
        }
        t.min = sm(t.min, e, i, a, s);
        t.max = sm(t.max, e, i, a, s);
    })(t, latestValues[r], latestValues[o], latestValues[a], latestValues.scale, n, s);
}
let sv = [
    "x",
    "scaleX",
    "originX"
];
let sg = [
    "y",
    "scaleY",
    "originY"
];
function sy(t, latestValues, i, n) {
    sf(t.x, latestValues, sv, i ? i.x : undefined, n ? n.x : undefined);
    sf(t.y, latestValues, sg, i ? i.y : undefined, n ? n.y : undefined);
}
function sx(t) {
    return t.translate === 0 && t.scale === 1;
}
function sT(t) {
    return sx(t.x) && sx(t.y);
}
function sw(t, e) {
    return t.min === e.min && t.max === e.max;
}
function sP(t, e) {
    return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function sb(t, e) {
    return sP(t.x, e.x) && sP(t.y, e.y);
}
function sS(t) {
    return nj(t.x) / nj(t.y);
}
function sA(t, e) {
    return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
class sM {
    add(t) {
        tQ(this.members, t);
        t.scheduleRender();
    }
    remove(t) {
        tJ(this.members, t);
        if (t === this.prevLead) {
            this.prevLead = undefined;
        }
        if (t === this.lead) {
            let t = this.members[this.members.length - 1];
            if (t) {
                this.promote(t);
            }
        }
    }
    relegate(t) {
        let e;
        let i = this.members.findIndex((e)=>t === e);
        if (i === 0) {
            return false;
        }
        for(let t = i; t >= 0; t--){
            let i = this.members[t];
            if (i.isPresent !== false) {
                e = i;
                break;
            }
        }
        return !!e && (this.promote(e), true);
    }
    promote(t, e) {
        let lead = this.lead;
        if (t !== lead && (this.prevLead = lead, this.lead = t, t.show(), lead)) {
            if (lead.instance) {
                lead.scheduleRender();
            }
            t.scheduleRender();
            t.resumeFrom = lead;
            if (e) {
                t.resumeFrom.preserveOpacity = true;
            }
            if (lead.snapshot) {
                t.snapshot = lead.snapshot;
                t.snapshot.latestValues = lead.animationValues || lead.latestValues;
            }
            if (t.root && t.root.isUpdating) {
                t.isLayoutDirty = true;
            }
            let { crossfade } = t.options;
            if (crossfade === false) {
                lead.hide();
            }
        }
    }
    exitAnimationComplete() {
        this.members.forEach(({ options, resumingFrom })=>{
            if (options.onExitComplete) {
                options.onExitComplete();
            }
            if (resumingFrom && resumingFrom.options.onExitComplete) {
                resumingFrom.options.onExitComplete();
            }
        });
    }
    scheduleRender() {
        this.members.forEach((t)=>{
            if (t.instance) {
                t.scheduleRender(false);
            }
        });
    }
    removeLeadSnapshot() {
        if (this.lead && this.lead.snapshot) {
            this.lead.snapshot = undefined;
        }
    }
    constructor(){
        this.members = [];
    }
}
let sV = {
    nodes: 0,
    calculatedTargetDeltas: 0,
    calculatedProjections: 0
};
let sE = [
    "",
    "X",
    "Y",
    "Z"
];
let sC = 0;
function sD(t, visualElement, i, animationValues) {
    let { latestValues } = visualElement;
    if (latestValues[t]) {
        i[t] = latestValues[t];
        visualElement.setStaticValue(t, 0);
        if (animationValues) {
            animationValues[t] = 0;
        }
    }
}
function sk({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
    return class {
        addEventListener(t, e) {
            if (!this.eventHandlers.has(t)) {
                this.eventHandlers.set(t, new t0);
            }
            return this.eventHandlers.get(t).add(e);
        }
        notifyListeners(t, ...i) {
            let s = this.eventHandlers.get(t);
            if (s) {
                s.notify(...i);
            }
        }
        hasListeners(t) {
            return this.eventHandlers.has(t);
        }
        mount(t) {
            if (this.instance) {
                return;
            }
            this.isSVG = st(t) && !(st(t) && t.tagName === "svg");
            this.instance = t;
            let { layoutId, layout, visualElement } = this.options;
            if (visualElement && !visualElement.current) {
                visualElement.mount(t);
            }
            this.root.nodes.add(this);
            if (this.parent) {
                this.parent.children.add(this);
            }
            if (this.root.hasTreeAnimated && (layout || layoutId)) {
                this.isLayoutDirty = true;
            }
            if (attachResizeListener) {
                let i;
                let n = 0;
                let s = ()=>this.root.updateBlockedByResize = false;
                schedule.read(()=>{
                    n = window.innerWidth;
                });
                attachResizeListener(t, ()=>{
                    let window_innerWidth = window.innerWidth;
                    if (window_innerWidth !== n) {
                        n = window_innerWidth;
                        this.root.updateBlockedByResize = true;
                        if (i) {
                            i();
                        }
                        i = ((t)=>{
                            const e = 250;
                            let i = t2.now();
                            let n = ({ timestamp })=>{
                                let r = timestamp - i;
                                if (r >= 250) {
                                    cancel(n);
                                    t(r - 250);
                                }
                            };
                            schedule.setup(n, true);
                            return ()=>cancel(n);
                        })(s);
                        if (n4.hasAnimatedSinceResize) {
                            n4.hasAnimatedSinceResize = false;
                            this.nodes.forEach(sN);
                        }
                    }
                });
            }
            if (layoutId) {
                this.root.registerSharedNode(layoutId, this);
            }
            if (this.options.animate !== false && visualElement && (layoutId || layout)) {
                this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout })=>{
                    if (this.isTreeAnimationBlocked()) {
                        this.target = undefined;
                        this.relativeTarget = undefined;
                        return;
                    }
                    let o = this.options.transition || visualElement.getDefaultTransition() || sq;
                    let { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
                    let h = !this.targetLayout || !sb(this.targetLayout, layout);
                    let u = !hasLayoutChanged && hasRelativeLayoutChanged;
                    if (this.options.layoutRoot || this.resumeFrom || u || hasLayoutChanged && (h || !this.currentAnimation)) {
                        if (this.resumeFrom) {
                            this.resumingFrom = this.resumeFrom;
                            this.resumingFrom.resumingFrom = undefined;
                        }
                        let t = {
                            ...ie(o, "layout"),
                            onPlay: onLayoutAnimationStart,
                            onComplete: onLayoutAnimationComplete
                        };
                        if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
                            t.delay = 0;
                            t.type = false;
                        }
                        this.startAnimation(t);
                        this.setAnimationOrigin(delta, u);
                    } else {
                        if (!hasLayoutChanged) {
                            sN(this);
                        }
                        if (this.isLead() && this.options.onExitComplete) {
                            this.options.onExitComplete();
                        }
                    }
                    this.targetLayout = layout;
                });
            }
        }
        unmount() {
            if (this.options.layoutId) {
                this.willUpdate();
            }
            this.root.nodes.remove(this);
            let t = this.getStack();
            if (t) {
                t.remove(this);
            }
            if (this.parent) {
                this.parent.children.delete(this);
            }
            this.instance = undefined;
            this.eventHandlers.clear();
            cancel(this.updateProjection);
        }
        blockUpdate() {
            this.updateManuallyBlocked = true;
        }
        unblockUpdate() {
            this.updateManuallyBlocked = false;
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
        }
        startUpdate() {
            if (!this.isUpdateBlocked()) {
                this.isUpdating = true;
                if (this.nodes) {
                    this.nodes.forEach(sz);
                }
                this.animationId++;
            }
        }
        getTransformTemplate() {
            let { visualElement } = this.options;
            return visualElement && visualElement.getProps().transformTemplate;
        }
        willUpdate(...args) {
            let t = !(args.length > 0) || args[0] === undefined || args[0];
            this.root.hasTreeAnimated = true;
            if (this.root.isUpdateBlocked()) {
                if (this.options.onExitComplete) {
                    this.options.onExitComplete();
                }
                return;
            }
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
                (function t(e) {
                    e.hasCheckedOptimisedAppear = true;
                    if (e.root === e) {
                        return;
                    }
                    let { visualElement } = e.options;
                    if (!visualElement) {
                        return;
                    }
                    let n = visualElement.props[e9];
                    if (window.MotionHasOptimisedAnimation(n, "transform")) {
                        let { layout, layoutId } = e.options;
                        window.MotionCancelOptimisedAnimation(n, "transform", schedule, !(layout || layoutId));
                    }
                    let { parent } = e;
                    if (parent && !parent.hasCheckedOptimisedAppear) {
                        t(parent);
                    }
                })(this);
            }
            if (!this.root.isUpdating) {
                this.root.startUpdate();
            }
            if (this.isLayoutDirty) {
                return;
            }
            this.isLayoutDirty = true;
            for(let t = 0; t < this.path.length; t++){
                let e = this.path[t];
                e.shouldResetTransform = true;
                e.updateScroll("snapshot");
                if (e.options.layoutRoot) {
                    e.willUpdate(false);
                }
            }
            let { layoutId, layout } = this.options;
            if (layoutId === undefined && !layout) {
                return;
            }
            let n = this.getTransformTemplate();
            this.prevTransformTemplateValue = n ? n(this.latestValues, "") : undefined;
            this.updateSnapshot();
            if (t) {
                this.notifyListeners("willUpdate");
            }
        }
        update() {
            this.updateScheduled = false;
            if (this.isUpdateBlocked()) {
                this.unblockUpdate();
                this.clearAllSnapshots();
                this.nodes.forEach(sO);
                return;
            }
            if (this.animationId <= this.animationCommitId) {
                return void this.nodes.forEach(sI);
            }
            this.animationCommitId = this.animationId;
            if (this.isUpdating) {
                this.isUpdating = false;
                this.nodes.forEach(sU);
                this.nodes.forEach(sR);
                this.nodes.forEach(sL);
            } else {
                this.nodes.forEach(sI);
            }
            this.clearAllSnapshots();
            let t = t2.now();
            state.delta = O(0, 1000 / 60, t - state.timestamp);
            state.timestamp = t;
            state.isProcessing = true;
            steps.update.process(state);
            steps.preRender.process(state);
            steps.render.process(state);
            state.isProcessing = false;
        }
        didUpdate() {
            if (!this.updateScheduled) {
                this.updateScheduled = true;
                schedule_1.read(this.scheduleUpdate);
            }
        }
        clearAllSnapshots() {
            this.nodes.forEach(sB);
            this.sharedNodes.forEach(sH);
        }
        scheduleUpdateProjection() {
            if (!this.projectionUpdateScheduled) {
                this.projectionUpdateScheduled = true;
                schedule.preRender(this.updateProjection, false, true);
            }
        }
        scheduleCheckAfterUnmount() {
            schedule.postRender(()=>{
                if (this.isLayoutDirty) {
                    this.root.didUpdate();
                } else {
                    this.root.checkUpdateFailed();
                }
            });
        }
        updateSnapshot() {
            if (!this.snapshot && this.instance) {
                this.snapshot = this.measure();
                if (!(!this.snapshot || nj(this.snapshot.measuredBox.x) || nj(this.snapshot.measuredBox.y))) {
                    this.snapshot = undefined;
                }
            }
        }
        updateLayout() {
            if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) {
                return;
            }
            if (this.resumeFrom && !this.resumeFrom.instance) {
                for(let t = 0; t < this.path.length; t++){
                    this.path[t].updateScroll();
                }
            }
            let layout = this.layout;
            this.layout = this.measure(false);
            this.layoutVersion++;
            this.layoutCorrected = en();
            this.isLayoutDirty = false;
            this.projectionDelta = undefined;
            this.notifyListeners("measure", this.layout.layoutBox);
            let { visualElement } = this.options;
            if (visualElement) {
                visualElement.notify("LayoutMeasure", this.layout.layoutBox, layout ? layout.layoutBox : undefined);
            }
        }
        updateScroll(phase = "measure") {
            let e = !!(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
                e = false;
            }
            if (e && this.instance) {
                let isRoot = checkIsScrollRoot(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase,
                    isRoot,
                    offset: measureScroll(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : isRoot
                };
            }
        }
        resetTransform() {
            if (!resetTransform) {
                return;
            }
            let t = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
            let e = this.projectionDelta && !sT(this.projectionDelta);
            let i = this.getTransformTemplate();
            let n = i ? i(this.latestValues, "") : undefined;
            let s = n !== this.prevTransformTemplateValue;
            if (t && this.instance && (e || M(this.latestValues) || s)) {
                resetTransform(this.instance, n);
                this.shouldResetTransform = false;
                this.scheduleRender();
            }
        }
        measure(...args) {
            let t;
            let e = !(args.length > 0) || args[0] === undefined || args[0];
            let measuredBox = this.measurePageBox();
            let layoutBox = this.removeElementScroll(measuredBox);
            if (e) {
                layoutBox = this.removeTransform(layoutBox);
            }
            sZ((t = layoutBox).x);
            sZ(t.y);
            return {
                animationId: this.root.animationId,
                measuredBox,
                layoutBox,
                latestValues: {},
                source: this.id
            };
        }
        measurePageBox() {
            let { visualElement } = this.options;
            if (!visualElement) {
                return en();
            }
            let i = visualElement.measureViewportBox();
            if (!(this.scroll?.wasRoot || this.path.some(sJ))) {
                let { scroll } = this.root;
                if (scroll) {
                    k(i.x, scroll.offset.x);
                    k(i.y, scroll.offset.y);
                }
            }
            return i;
        }
        removeElementScroll(t) {
            let i = en();
            sc(i, t);
            if (this.scroll?.wasRoot) {
                return i;
            }
            for(let e = 0; e < this.path.length; e++){
                let n = this.path[e];
                let { scroll, options } = n;
                if (n !== this.root && scroll && options.layoutScroll) {
                    if (scroll.wasRoot) {
                        sc(i, t);
                    }
                    k(i.x, scroll.offset.x);
                    k(i.y, scroll.offset.y);
                }
            }
            return i;
        }
        applyTransform(t) {
            let e = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
            let i = en();
            sc(i, t);
            for(let t = 0; t < this.path.length; t++){
                let n = this.path[t];
                if (!e && n.options.layoutScroll && n.scroll && n !== n.root) {
                    L(i, {
                        x: -n.scroll.offset.x,
                        y: -n.scroll.offset.y
                    });
                }
                if (M(n.latestValues)) {
                    L(i, n.latestValues);
                }
            }
            if (M(this.latestValues)) {
                L(i, this.latestValues);
            }
            return i;
        }
        removeTransform(t) {
            let e = en();
            sc(e, t);
            for(let t = 0; t < this.path.length; t++){
                let i = this.path[t];
                if (!i.instance || !M(i.latestValues)) {
                    continue;
                }
                if (A(i.latestValues)) {
                    i.updateSnapshot();
                }
                let n = en();
                sc(n, i.measurePageBox());
                sy(e, i.latestValues, i.snapshot ? i.snapshot.layoutBox : undefined, n);
            }
            if (M(this.latestValues)) {
                sy(e, this.latestValues);
            }
            return e;
        }
        setTargetDelta(t) {
            this.targetDelta = t;
            this.root.scheduleUpdateProjection();
            this.isProjectionDirty = true;
        }
        setOptions(t) {
            this.options = {
                ...this.options,
                ...t,
                crossfade: t.crossfade === undefined || t.crossfade
            };
        }
        clearMeasurements() {
            this.scroll = undefined;
            this.layout = undefined;
            this.snapshot = undefined;
            this.prevTransformTemplateValue = undefined;
            this.targetDelta = undefined;
            this.target = undefined;
            this.isLayoutDirty = false;
        }
        forceRelativeParentToResolveTarget() {
            if (this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== state.timestamp) {
                this.relativeParent.resolveTargetDelta(true);
            }
        }
        resolveTargetDelta(...args) {
            let e;
            let i;
            let n;
            let s = args.length > 0 && args[0] !== undefined && args[0];
            let r = this.getLead();
            if (!this.isProjectionDirty) {
                this.isProjectionDirty = r.isProjectionDirty;
            }
            if (!this.isTransformDirty) {
                this.isTransformDirty = r.isTransformDirty;
            }
            if (!this.isSharedProjectionDirty) {
                this.isSharedProjectionDirty = r.isSharedProjectionDirty;
            }
            let o = !!this.resumingFrom || this !== r;
            if (!(s || o && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) {
                return;
            }
            let { layout, layoutId } = this.options;
            if (!this.layout || !(layout || layoutId)) {
                return;
            }
            this.resolvedRelativeTargetAt = state.timestamp;
            let h = this.getClosestProjectingParent();
            if (h && this.linkedParentVersion !== h.layoutVersion && !h.options.layoutRoot) {
                this.removeRelativeTarget();
            }
            if (!(this.targetDelta || this.relativeTarget)) {
                if (h && h.layout) {
                    this.createRelativeTarget(h, this.layout.layoutBox, h.layout.layoutBox);
                } else {
                    this.removeRelativeTarget();
                }
            }
            if (this.relativeTarget || this.targetDelta) {
                if (this.target || (this.target = en(), this.targetWithTransforms = en()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
                    this.forceRelativeParentToResolveTarget();
                    e = this.target;
                    i = this.relativeTarget;
                    n = this.relativeParent.target;
                    nO(e.x, i.x, n.x);
                    nO(e.y, i.y, n.y);
                } else if (this.targetDelta) {
                    if (this.resumingFrom) {
                        this.target = this.applyTransform(this.layout.layoutBox);
                    } else {
                        sc(this.target, this.layout.layoutBox);
                    }
                    D(this.target, this.targetDelta);
                } else {
                    sc(this.target, this.layout.layoutBox);
                }
                if (this.attemptToResolveRelativeTarget) {
                    this.attemptToResolveRelativeTarget = false;
                    if (h && !!h.resumingFrom == !!this.resumingFrom && !h.options.layoutScroll && h.target && this.animationProgress !== 1) {
                        this.createRelativeTarget(h, this.target, h.target);
                    } else {
                        this.relativeParent = this.relativeTarget = undefined;
                    }
                }
                if (tl.value) {
                    sV.calculatedTargetDeltas++;
                }
            }
        }
        getClosestProjectingParent() {
            if (!(!this.parent || A(this.parent.latestValues) || V(this.parent.latestValues))) {
                if (this.parent.isProjecting()) {
                    return this.parent;
                } else {
                    return this.parent.getClosestProjectingParent();
                }
            }
        }
        isProjecting() {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
        }
        createRelativeTarget(t, e, i) {
            this.relativeParent = t;
            this.linkedParentVersion = t.layoutVersion;
            this.forceRelativeParentToResolveTarget();
            this.relativeTarget = en();
            this.relativeTargetOrigin = en();
            nU(this.relativeTargetOrigin, e, i);
            sc(this.relativeTarget, this.relativeTargetOrigin);
        }
        removeRelativeTarget() {
            this.relativeParent = this.relativeTarget = undefined;
        }
        calcProjection() {
            let e = this.getLead();
            let i = !!this.resumingFrom || this !== e;
            let n = true;
            if (this.isProjectionDirty || this.parent?.isProjectionDirty) {
                n = false;
            }
            if (i && (this.isSharedProjectionDirty || this.isTransformDirty)) {
                n = false;
            }
            if (this.resolvedRelativeTargetAt === state.timestamp) {
                n = false;
            }
            if (n) {
                return;
            }
            let { layout, layoutId } = this.options;
            this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
            if (!this.isTreeAnimating) {
                this.targetDelta = this.relativeTarget = undefined;
            }
            if (!this.layout || !(layout || layoutId)) {
                return;
            }
            sc(this.layoutCorrected, this.layout.layoutBox);
            let o = this.treeScale.x;
            let a = this.treeScale.y;
            (function(t, e, i) {
                let n;
                let s;
                let r = arguments.length > 3 && arguments[3] !== undefined && arguments[3];
                let i_length = i.length;
                if (i_length) {
                    e.x = e.y = 1;
                    for(let a = 0; a < i_length; a++){
                        s = (n = i[a]).projectionDelta;
                        let { visualElement } = n.options;
                        if (!visualElement || !visualElement.props.style || visualElement.props.style.display !== "contents") {
                            if (r && n.options.layoutScroll && n.scroll && n !== n.root) {
                                L(t, {
                                    x: -n.scroll.offset.x,
                                    y: -n.scroll.offset.y
                                });
                            }
                            if (s) {
                                e.x *= s.x.scale;
                                e.y *= s.y.scale;
                                D(t, s);
                            }
                            if (r && M(n.latestValues)) {
                                L(t, n.latestValues);
                            }
                        }
                    }
                    if (e.x < 1.0000000000001 && e.x > 0.999999999999) {
                        e.x = 1;
                    }
                    if (e.y < 1.0000000000001 && e.y > 0.999999999999) {
                        e.y = 1;
                    }
                }
            })(this.layoutCorrected, this.treeScale, this.path, i);
            if (e.layout && !e.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
                e.target = e.layout.layoutBox;
                e.targetWithTransforms = en();
            }
            let { target } = e;
            if (!target) {
                if (this.prevProjectionDelta) {
                    this.createProjectionDeltas();
                    this.scheduleRender();
                }
                return;
            }
            if (this.projectionDelta && this.prevProjectionDelta) {
                sp(this.prevProjectionDelta.x, this.projectionDelta.x);
                sp(this.prevProjectionDelta.y, this.projectionDelta.y);
            } else {
                this.createProjectionDeltas();
            }
            nB(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
            if (!(this.treeScale.x === o && this.treeScale.y === a && sA(this.projectionDelta.x, this.prevProjectionDelta.x) && sA(this.projectionDelta.y, this.prevProjectionDelta.y))) {
                this.hasProjected = true;
                this.scheduleRender();
                this.notifyListeners("projectionUpdate", target);
            }
            if (tl.value) {
                sV.calculatedProjections++;
            }
        }
        hide() {
            this.isVisible = false;
        }
        show() {
            this.isVisible = true;
        }
        scheduleRender(...args) {
            let e = !(args.length > 0) || args[0] === undefined || args[0];
            this.options.visualElement?.scheduleRender();
            if (e) {
                let t = this.getStack();
                if (t) {
                    t.scheduleRender();
                }
            }
            if (this.resumingFrom && !this.resumingFrom.instance) {
                this.resumingFrom = undefined;
            }
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = ee();
            this.projectionDelta = ee();
            this.projectionDeltaWithTransform = ee();
        }
        setAnimationOrigin(t) {
            let e;
            let i = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
            let snapshot = this.snapshot;
            let s = snapshot ? snapshot.latestValues : {};
            let r = {
                ...this.latestValues
            };
            let o = ee();
            if (!(this.relativeParent && this.relativeParent.options.layoutRoot)) {
                this.relativeTarget = this.relativeTargetOrigin = undefined;
            }
            this.attemptToResolveRelativeTarget = !i;
            let a = en();
            let l = (snapshot ? snapshot.source : undefined) !== (this.layout ? this.layout.source : undefined);
            let h = this.getStack();
            let u = !h || h.members.length <= 1;
            let d = !!(l && !u && this.options.crossfade === true && !this.path.some(s$));
            this.animationProgress = 0;
            this.mixTargetDelta = (i)=>{
                let n = i / 1000;
                sX(o.x, t.x, n);
                sX(o.y, t.y, n);
                this.setTargetDelta(o);
                if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
                    var h;
                    var c;
                    var p;
                    var m;
                    var f;
                    var v;
                    nU(a, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
                    p = this.relativeTarget;
                    m = this.relativeTargetOrigin;
                    f = a;
                    v = n;
                    sK(p.x, m.x, f.x, v);
                    sK(p.y, m.y, f.y, v);
                    if (e && (h = this.relativeTarget, c = e, sw(h.x, c.x) && sw(h.y, c.y))) {
                        this.isProjectionDirty = false;
                    }
                    if (!e) {
                        e = en();
                    }
                    sc(e, this.relativeTarget);
                }
                if (l) {
                    this.animationValues = r;
                    ((t, e, i, n, s, r)=>{
                        if (s) {
                            t.opacity = b(0, i.opacity ?? 1, sl(n));
                            t.opacityExit = b(e.opacity ?? 1, 0, sh(n));
                        } else if (r) {
                            t.opacity = b(e.opacity ?? 1, i.opacity ?? 1, n);
                        }
                        for(let s = 0; s < sn_length; s++){
                            let r = `border${sn[s]}Radius`;
                            let o = sa(e, r);
                            let a = sa(i, r);
                            if (o !== undefined || a !== undefined) {
                                if (!o) {
                                    o = 0;
                                }
                                if (!a) {
                                    a = 0;
                                }
                                if (o === 0 || a === 0 || so(o) === so(a)) {
                                    t[r] = Math.max(b(sr(o), sr(a), n), 0);
                                    if (z.test(a) || z.test(o)) {
                                        t[r] += "%";
                                    }
                                } else {
                                    t[r] = a;
                                }
                            }
                        }
                        if (e.rotate || i.rotate) {
                            t.rotate = b(e.rotate || 0, i.rotate || 0, n);
                        }
                    })(r, s, this.latestValues, n, d, u);
                }
                this.root.scheduleUpdateProjection();
                this.scheduleRender();
                this.animationProgress = n;
            };
            this.mixTargetDelta(1000 * !!this.options.layoutRoot);
        }
        startAnimation(t) {
            this.notifyListeners("animationStart");
            this.currentAnimation?.stop();
            this.resumingFrom?.currentAnimation?.stop();
            if (this.pendingAnimation) {
                cancel(this.pendingAnimation);
                this.pendingAnimation = undefined;
            }
            this.pendingAnimation = schedule.update(()=>{
                n4.hasAnimatedSinceResize = true;
                ih.layout++;
                if (!this.motionValue) {
                    this.motionValue = t4(0);
                }
                this.currentAnimation = ((t, e, i)=>{
                    let n = F(t) ? t : t4(t);
                    n.start(nf("", n, e, i));
                    return n.animation;
                })(this.motionValue, [
                    0,
                    1000
                ], {
                    ...t,
                    velocity: 0,
                    isSync: true,
                    onUpdate: (e)=>{
                        this.mixTargetDelta(e);
                        if (t.onUpdate) {
                            t.onUpdate(e);
                        }
                    },
                    onStop: ()=>{
                        ih.layout--;
                    },
                    onComplete: ()=>{
                        ih.layout--;
                        if (t.onComplete) {
                            t.onComplete();
                        }
                        this.completeAnimation();
                    }
                });
                if (this.resumingFrom) {
                    this.resumingFrom.currentAnimation = this.currentAnimation;
                }
                this.pendingAnimation = undefined;
            });
        }
        completeAnimation() {
            if (this.resumingFrom) {
                this.resumingFrom.currentAnimation = undefined;
                this.resumingFrom.preserveOpacity = undefined;
            }
            let t = this.getStack();
            if (t) {
                t.exitAnimationComplete();
            }
            this.resumingFrom = this.currentAnimation = this.animationValues = undefined;
            this.notifyListeners("animationComplete");
        }
        finishAnimation() {
            if (this.currentAnimation) {
                if (this.mixTargetDelta) {
                    this.mixTargetDelta(1000);
                }
                this.currentAnimation.stop();
            }
            this.completeAnimation();
        }
        applyTransformsToTarget() {
            let t = this.getLead();
            let { targetWithTransforms, target, layout, latestValues } = t;
            if (targetWithTransforms && target && layout) {
                if (this !== t && this.layout && layout && sQ(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
                    target = this.target || en();
                    let e = nj(this.layout.layoutBox.x);
                    target.x.min = t.target.x.min;
                    target.x.max = target.x.min + e;
                    let n = nj(this.layout.layoutBox.y);
                    target.y.min = t.target.y.min;
                    target.y.max = target.y.min + n;
                }
                sc(targetWithTransforms, target);
                L(targetWithTransforms, latestValues);
                nB(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
            }
        }
        registerSharedNode(t, e) {
            if (!this.sharedNodes.has(t)) {
                this.sharedNodes.set(t, new sM);
            }
            this.sharedNodes.get(t).add(e);
            let initialPromotionConfig = e.options.initialPromotionConfig;
            e.promote({
                transition: initialPromotionConfig ? initialPromotionConfig.transition : undefined,
                preserveFollowOpacity: initialPromotionConfig && initialPromotionConfig.shouldPreserveFollowOpacity ? initialPromotionConfig.shouldPreserveFollowOpacity(e) : undefined
            });
        }
        isLead() {
            let t = this.getStack();
            return !t || t.lead === this;
        }
        getLead() {
            let { layoutId } = this.options;
            return layoutId && this.getStack()?.lead || this;
        }
        getPrevLead() {
            let { layoutId } = this.options;
            if (layoutId) {
                return this.getStack()?.prevLead;
            }
        }
        getStack() {
            let { layoutId } = this.options;
            if (layoutId) {
                return this.root.sharedNodes.get(layoutId);
            }
        }
        promote({ needsReset, transition, preserveFollowOpacity } = {}) {
            let n = this.getStack();
            if (n) {
                n.promote(this, preserveFollowOpacity);
            }
            if (needsReset) {
                this.projectionDelta = undefined;
                this.needsReset = true;
            }
            if (transition) {
                this.setOptions({
                    transition
                });
            }
        }
        relegate() {
            let t = this.getStack();
            return !!t && t.relegate(this);
        }
        resetSkewAndRotation() {
            let { visualElement } = this.options;
            if (!visualElement) {
                return;
            }
            let e = false;
            let { latestValues } = visualElement;
            if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
                e = true;
            }
            if (!e) {
                return;
            }
            let n = {};
            if (latestValues.z) {
                sD("z", visualElement, n, this.animationValues);
            }
            for(let e = 0; e < sE.length; e++){
                sD(`rotate${sE[e]}`, visualElement, n, this.animationValues);
                sD(`skew${sE[e]}`, visualElement, n, this.animationValues);
            }
            for(let e in visualElement.render(), n){
                visualElement.setStaticValue(e, n[e]);
                if (this.animationValues) {
                    this.animationValues[e] = n[e];
                }
            }
            visualElement.scheduleRender();
        }
        applyProjectionStyles(t, e) {
            if (!this.instance || this.isSVG) {
                return;
            }
            if (!this.isVisible) {
                t.visibility = "hidden";
                return;
            }
            let i = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = false;
                t.visibility = "";
                t.opacity = "";
                t.pointerEvents = e0(e?.pointerEvents) || "";
                t.transform = i ? i(this.latestValues, "") : "none";
                return;
            }
            let n = this.getLead();
            if (!this.projectionDelta || !this.layout || !n.target) {
                if (this.options.layoutId) {
                    t.opacity = this.latestValues.opacity !== undefined ? this.latestValues.opacity : 1;
                    t.pointerEvents = e0(e?.pointerEvents) || "";
                }
                if (this.hasProjected && !M(this.latestValues)) {
                    t.transform = i ? i({}, "") : "none";
                    this.hasProjected = false;
                }
                return;
            }
            t.visibility = "";
            let s = n.animationValues || n.latestValues;
            this.applyTransformsToTarget();
            let r = ((t, e, i)=>{
                let n = "";
                let s = t.x.translate / e.x;
                let r = t.y.translate / e.y;
                let o = i?.z || 0;
                if (s || r || o) {
                    n = `translate3d(${s}px, ${r}px, ${o}px) `;
                }
                if (e.x !== 1 || e.y !== 1) {
                    n += `scale(${1 / e.x}, ${1 / e.y}) `;
                }
                if (i) {
                    let { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = i;
                    if (transformPerspective) {
                        n = `perspective(${transformPerspective}px) ${n}`;
                    }
                    if (rotate) {
                        n += `rotate(${rotate}deg) `;
                    }
                    if (rotateX) {
                        n += `rotateX(${rotateX}deg) `;
                    }
                    if (rotateY) {
                        n += `rotateY(${rotateY}deg) `;
                    }
                    if (skewX) {
                        n += `skewX(${skewX}deg) `;
                    }
                    if (skewY) {
                        n += `skewY(${skewY}deg) `;
                    }
                }
                let a = t.x.scale * e.x;
                let l = t.y.scale * e.y;
                if (a !== 1 || l !== 1) {
                    n += `scale(${a}, ${l})`;
                }
                return n || "none";
            })(this.projectionDeltaWithTransform, this.treeScale, s);
            if (i) {
                r = i(s, r);
            }
            t.transform = r;
            let { x, y } = this.projectionDelta;
            t.transformOrigin = `${100 * x.origin}% ${100 * y.origin}% 0`;
            if (n.animationValues) {
                t.opacity = n === this ? s.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : s.opacityExit;
            } else {
                t.opacity = n === this ? s.opacity !== undefined ? s.opacity : "" : s.opacityExit !== undefined ? s.opacityExit : 0;
            }
            for(let e in eM){
                if (s[e] === undefined) {
                    continue;
                }
                let { correct, applyTo, isCSSVariable } = eM[e];
                let l = r === "none" ? s[e] : correct(s[e], n);
                if (applyTo) {
                    let e = applyTo.length;
                    for(let i = 0; i < e; i++){
                        t[applyTo[i]] = l;
                    }
                } else {
                    if (isCSSVariable) {
                        this.options.visualElement.renderState.vars[e] = l;
                    } else {
                        t[e] = l;
                    }
                }
            }
            if (this.options.layoutId) {
                t.pointerEvents = n === this ? e0(e?.pointerEvents) || "" : "none";
            }
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = undefined;
        }
        resetTree() {
            this.root.nodes.forEach((t)=>t.currentAnimation?.stop());
            this.root.nodes.forEach(sO);
            this.root.sharedNodes.clear();
        }
        constructor(t = {}, e = defaultParent?.()){
            this.id = sC++;
            this.animationId = 0;
            this.animationCommitId = 0;
            this.children = new Set;
            this.options = {};
            this.isTreeAnimating = false;
            this.isAnimationBlocked = false;
            this.isLayoutDirty = false;
            this.isProjectionDirty = false;
            this.isSharedProjectionDirty = false;
            this.isTransformDirty = false;
            this.updateManuallyBlocked = false;
            this.updateBlockedByResize = false;
            this.isUpdating = false;
            this.isSVG = false;
            this.needsReset = false;
            this.shouldResetTransform = false;
            this.hasCheckedOptimisedAppear = false;
            this.treeScale = {
                x: 1,
                y: 1
            };
            this.eventHandlers = new Map;
            this.hasTreeAnimated = false;
            this.layoutVersion = 0;
            this.updateScheduled = false;
            this.scheduleUpdate = ()=>this.update();
            this.projectionUpdateScheduled = false;
            this.checkUpdateFailed = ()=>{
                if (this.isUpdating) {
                    this.isUpdating = false;
                    this.clearAllSnapshots();
                }
            };
            this.updateProjection = ()=>{
                this.projectionUpdateScheduled = false;
                if (tl.value) {
                    sV.nodes = sV.calculatedTargetDeltas = sV.calculatedProjections = 0;
                }
                this.nodes.forEach(sj);
                this.nodes.forEach(sW);
                this.nodes.forEach(sY);
                this.nodes.forEach(sF);
                if (tl.addProjectionMetrics) {
                    tl.addProjectionMetrics(sV);
                }
            };
            this.resolvedRelativeTargetAt = 0;
            this.linkedParentVersion = 0;
            this.hasProjected = false;
            this.isVisible = true;
            this.animationProgress = 0;
            this.sharedNodes = new Map;
            this.latestValues = t;
            this.root = e ? e.root || e : this;
            this.path = e ? [
                ...e.path,
                e
            ] : [];
            this.parent = e;
            this.depth = e ? e.depth + 1 : 0;
            for(let t = 0; t < this.path.length; t++){
                this.path[t].shouldResetTransform = true;
            }
            if (this.root === this) {
                this.nodes = new si;
            }
        }
    };
}
function sR(t) {
    t.updateLayout();
}
function sL(t) {
    let snapshot_1 = t.resumeFrom?.snapshot || t.snapshot;
    if (t.isLead() && t.layout && snapshot_1 && t.hasListeners("didUpdate")) {
        let { layoutBox, measuredBox } = t.layout;
        let { animationType } = t.options;
        let r = snapshot_1.source !== t.layout.source;
        if (animationType === "size") {
            nN((t)=>{
                let n = r ? snapshot_1.measuredBox[t] : snapshot_1.layoutBox[t];
                let s = nj(n);
                n.min = layoutBox[t].min;
                n.max = n.min + s;
            });
        } else if (sQ(animationType, snapshot_1.layoutBox, layoutBox)) {
            nN((n)=>{
                let s = r ? snapshot_1.measuredBox[n] : snapshot_1.layoutBox[n];
                let o = nj(layoutBox[n]);
                s.max = s.min + o;
                if (t.relativeTarget && !t.currentAnimation) {
                    t.isProjectionDirty = true;
                    t.relativeTarget[n].max = t.relativeTarget[n].min + o;
                }
            });
        }
        let layoutDelta = ee();
        nB(layoutDelta, layoutBox, snapshot_1.layoutBox);
        let delta = ee();
        if (r) {
            nB(delta, t.applyTransform(measuredBox, true), snapshot_1.measuredBox);
        } else {
            nB(delta, layoutBox, snapshot_1.layoutBox);
        }
        let hasLayoutChanged = !sT(layoutDelta);
        let hasRelativeLayoutChanged = false;
        if (!t.resumeFrom) {
            let n = t.getClosestProjectingParent();
            if (n && !n.resumeFrom) {
                let { snapshot, layout } = n;
                if (snapshot && layout) {
                    let o = en();
                    nU(o, snapshot_1.layoutBox, snapshot.layoutBox);
                    let a = en();
                    nU(a, layoutBox, layout.layoutBox);
                    if (!sb(o, a)) {
                        hasRelativeLayoutChanged = true;
                    }
                    if (n.options.layoutRoot) {
                        t.relativeTarget = a;
                        t.relativeTargetOrigin = o;
                        t.relativeParent = n;
                    }
                }
            }
        }
        t.notifyListeners("didUpdate", {
            layout: layoutBox,
            snapshot: snapshot_1,
            delta,
            layoutDelta,
            hasLayoutChanged,
            hasRelativeLayoutChanged
        });
    } else if (t.isLead()) {
        let { onExitComplete } = t.options;
        if (onExitComplete) {
            onExitComplete();
        }
    }
    t.options.transition = undefined;
}
function sj(t) {
    if (tl.value) {
        sV.nodes++;
    }
    if (t.parent) {
        if (!t.isProjecting()) {
            t.isProjectionDirty = t.parent.isProjectionDirty;
        }
        if (!t.isSharedProjectionDirty) {
            t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty);
        }
        if (!t.isTransformDirty) {
            t.isTransformDirty = t.parent.isTransformDirty;
        }
    }
}
function sF(t) {
    t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = false;
}
function sB(t) {
    t.clearSnapshot();
}
function sO(t) {
    t.clearMeasurements();
}
function sI(t) {
    t.isLayoutDirty = false;
}
function sU(t) {
    let { visualElement } = t.options;
    if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
        visualElement.notify("BeforeLayoutMeasure");
    }
    t.resetTransform();
}
function sN(t) {
    t.finishAnimation();
    t.targetDelta = t.relativeTarget = t.target = undefined;
    t.isProjectionDirty = true;
}
function sW(t) {
    t.resolveTargetDelta();
}
function sY(t) {
    t.calcProjection();
}
function sz(t) {
    t.resetSkewAndRotation();
}
function sH(t) {
    t.removeLeadSnapshot();
}
function sX(t, e, i) {
    t.translate = b(e.translate, 0, i);
    t.scale = b(e.scale, 1, i);
    t.origin = e.origin;
    t.originPoint = e.originPoint;
}
function sK(t, e, i, n) {
    t.min = b(e.min, i.min, n);
    t.max = b(e.max, i.max, n);
}
function s$(t) {
    return t.animationValues && t.animationValues.opacityExit !== undefined;
}
let sq = {
    duration: 0.45,
    ease: [
        0.4,
        0,
        0.1,
        1
    ]
};
let sG = (t)=>typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t);
let s_ = sG("applewebkit/") && !sG("chrome/") ? Math.round : linear;
function sZ(t) {
    t.min = s_(t.min);
    t.max = s_(t.max);
}
function sQ(animationType, layoutBox, i) {
    return animationType === "position" || animationType === "preserve-aspect" && !(Math.abs(sS(layoutBox) - sS(i)) <= 0.2);
}
function sJ(t) {
    return t !== t.root && t.scroll?.wasRoot;
}
let s0 = sk({
    attachResizeListener: (t, e)=>nD(t, "resize", e),
    measureScroll: ()=>({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop
        }),
    checkIsScrollRoot: ()=>true
});
let s1 = {
    current: undefined
};
let ProjectionNode = sk({
    measureScroll: (t)=>({
            x: t.scrollLeft,
            y: t.scrollTop
        }),
    defaultParent: ()=>{
        if (!s1.current) {
            let t = new s0({});
            t.mount(window);
            t.setOptions({
                layoutScroll: true
            });
            s1.current = t;
        }
        return s1.current;
    },
    resetTransform: (t, e)=>{
        t.style.transform = e !== undefined ? e : "none";
    },
    checkIsScrollRoot: (t)=>window.getComputedStyle(t).position === "fixed"
});
function s3(t, e) {
    let i = ((t, e, i)=>{
        if (t instanceof EventTarget) {
            return [
                t
            ];
        }
        if (typeof t === "string") {
            let e = document;
            let i = undefined ?? e.querySelectorAll(t);
            if (i) {
                return Array.from(i);
            }
            return [];
        }
        return Array.from(t);
    })(t);
    let n = new AbortController;
    return [
        i,
        {
            passive: true,
            ...e,
            signal: n.signal
        },
        ()=>n.abort()
    ];
}
function s5(t) {
    return !(t.pointerType === "touch" || nC.x || nC.y);
}
function s4(node, e, i) {
    let { props } = node;
    if (node.animationState && props.whileHover) {
        node.animationState.setActive("whileHover", i === "Start");
    }
    let s = props[`onHover${i}`];
    if (s) {
        schedule.postRender(()=>s(e, nR(e)));
    }
}
class s9 extends nA {
    mount() {
        let { current } = this.node;
        if (current) {
            this.unmount = ((current_1, e, i = {})=>{
                let [n, s, r] = s3(current_1, i);
                let o = (t)=>{
                    if (!s5(t)) {
                        return;
                    }
                    let { target } = t;
                    let n = e(target, t);
                    if (typeof n !== "function" || !target) {
                        return;
                    }
                    let r = (t)=>{
                        if (s5(t)) {
                            n(t);
                            target.removeEventListener("pointerleave", r);
                        }
                    };
                    target.addEventListener("pointerleave", r, s);
                };
                n.forEach((t)=>{
                    t.addEventListener("pointerenter", o, s);
                });
                return r;
            })(current, (t, e)=>{
                s4(this.node, e, "Start");
                return (t)=>s4(this.node, t, "End");
            });
        }
    }
    unmount() {}
}
class s6 extends nA {
    onFocus() {
        let t = false;
        try {
            t = this.node.current.matches(":focus-visible");
        } catch (e) {
            t = true;
        }
        if (t && this.node.animationState) {
            this.node.animationState.setActive("whileFocus", true);
            this.isActive = true;
        }
    }
    onBlur() {
        if (this.isActive && this.node.animationState) {
            this.node.animationState.setActive("whileFocus", false);
            this.isActive = false;
        }
    }
    mount() {
        this.unmount = ia(nD(this.node.current, "focus", ()=>this.onFocus()), nD(this.node.current, "blur", ()=>this.onBlur()));
    }
    unmount() {}
    constructor(){
        super(...arguments);
        this.isActive = false;
    }
}
const s7 = require("./module-81402.js");
let s8 = (t, e)=>!!e && (t === e || s8(t, e.parentElement));
let rt = new Set([
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "A"
]);
let re = new WeakSet;
function ri(t) {
    return (e)=>{
        if (e.key === "Enter") {
            t(e);
        }
    };
}
function rn(t, e) {
    t.dispatchEvent(new PointerEvent(`pointer${e}`, {
        isPrimary: true,
        bubbles: true
    }));
}
function rs(t) {
    return nk(t) && !(nC.x || nC.y);
}
function rr(node, e, i) {
    let { props } = node;
    if (node.current instanceof HTMLButtonElement && node.current.disabled) {
        return;
    }
    if (node.animationState && props.whileTap) {
        node.animationState.setActive("whileTap", i === "Start");
    }
    let s = props[`onTap${i === "End" ? "" : i}`];
    if (s) {
        schedule.postRender(()=>s(e, nR(e)));
    }
}
class ro extends nA {
    mount() {
        let { current } = this.node;
        if (current) {
            this.unmount = ((current_1, e, i = {})=>{
                let [n, s, r] = s3(current_1, i);
                let o = (t)=>{
                    let t_currentTarget = t.currentTarget;
                    if (!rs(t)) {
                        return;
                    }
                    re.add(t_currentTarget);
                    let r = e(t_currentTarget, t);
                    let o = (t, success)=>{
                        window.removeEventListener("pointerup", a);
                        window.removeEventListener("pointercancel", l);
                        if (re.has(t_currentTarget)) {
                            re.delete(t_currentTarget);
                        }
                        if (rs(t) && typeof r === "function") {
                            r(t, {
                                success
                            });
                        }
                    };
                    let a = (t)=>{
                        o(t, t_currentTarget === window || t_currentTarget === document || i.useGlobalTarget || s8(t_currentTarget, t.target));
                    };
                    let l = (t)=>{
                        o(t, false);
                    };
                    window.addEventListener("pointerup", a, s);
                    window.addEventListener("pointercancel", l, s);
                };
                n.forEach((t)=>{
                    (i.useGlobalTarget ? window : t).addEventListener("pointerdown", o, s);
                    if (s7.s(t)) {
                        t.addEventListener("focus", (t)=>((t, e)=>{
                                let t_currentTarget = t.currentTarget;
                                if (!t_currentTarget) {
                                    return;
                                }
                                let n = ri(()=>{
                                    if (re.has(t_currentTarget)) {
                                        return;
                                    }
                                    rn(t_currentTarget, "down");
                                    let t = ri(()=>{
                                        rn(t_currentTarget, "up");
                                    });
                                    t_currentTarget.addEventListener("keyup", t, e);
                                    t_currentTarget.addEventListener("blur", ()=>rn(t_currentTarget, "cancel"), e);
                                });
                                t_currentTarget.addEventListener("keydown", n, e);
                                t_currentTarget.addEventListener("blur", ()=>t_currentTarget.removeEventListener("keydown", n), e);
                            })(t, s));
                        if (!(rt.has(t.tagName) || t.tabIndex !== -1 || t.hasAttribute("tabindex"))) {
                            t.tabIndex = 0;
                        }
                    }
                });
                return r;
            })(current, (t, e)=>{
                rr(this.node, e, "Start");
                return (t, { success })=>rr(this.node, t, success ? "End" : "Cancel");
            }, {
                useGlobalTarget: this.node.props.globalTapTarget
            });
        }
    }
    unmount() {}
}
let ra = new WeakMap;
let rl = new WeakMap;
let rh = (t)=>{
    let e = ra.get(t.target);
    if (e) {
        e(t);
    }
};
let ru = (t)=>{
    t.forEach(rh);
};
let rd = {
    some: 0,
    all: 1
};
class rc extends nA {
    startObserver() {
        this.unmount();
        let { viewport = {} } = this.node.getProps();
        let { root, margin, amount = "some", once } = viewport;
        let r = {
            root: root ? root.current : undefined,
            rootMargin: margin,
            threshold: typeof amount === "number" ? amount : rd[amount]
        };
        let o = (t)=>{
            let { isIntersecting } = t;
            if (this.isInView === isIntersecting || (this.isInView = isIntersecting, once && !isIntersecting && this.hasEnteredView)) {
                return;
            }
            if (isIntersecting) {
                this.hasEnteredView = true;
            }
            if (this.node.animationState) {
                this.node.animationState.setActive("whileInView", isIntersecting);
            }
            let { onViewportEnter, onViewportLeave } = this.node.getProps();
            let r = isIntersecting ? onViewportEnter : onViewportLeave;
            if (r) {
                r(t);
            }
        };
        const current = this.node.current;
        let l = (({ root, ...rest })=>{
            let n = root || document;
            if (!rl.has(n)) {
                rl.set(n, {});
            }
            let s = rl.get(n);
            let r = JSON.stringify(rest);
            if (!s[r]) {
                s[r] = new IntersectionObserver(ru, {
                    root,
                    ...rest
                });
            }
            return s[r];
        })(r);
        ra.set(current, o);
        l.observe(current);
        return ()=>{
            ra.delete(current);
            l.unobserve(current);
        };
    }
    mount() {
        this.startObserver();
    }
    update() {
        if (typeof IntersectionObserver === "undefined") {
            return;
        }
        let { props, prevProps } = this.node;
        if ([
            "amount",
            "margin",
            "root"
        ].some((({ viewport = {} }, { viewport: viewport_1 = {} } = {})=>(t)=>viewport[t] !== viewport_1[t])(props, prevProps))) {
            this.startObserver();
        }
    }
    unmount() {}
    constructor(){
        super(...arguments);
        this.hasEnteredView = false;
        this.isInView = false;
    }
}
let rp = ((t, e)=>{
    if (typeof Proxy === "undefined") {
        return e8;
    }
    let i = new Map;
    let n = (i, n)=>e8(i, n, t, e);
    return new Proxy((t, e)=>n(t, e), {
        get: (s, r)=>{
            if (r === "create") {
                return n;
            }
            if (!i.has(r)) {
                i.set(r, e8(r, undefined, t, e));
            }
            return i.get(r);
        }
    });
})({
    animation: {
        Feature: nM
    },
    exit: {
        Feature: nE
    },
    inView: {
        Feature: rc
    },
    tap: {
        Feature: ro
    },
    focus: {
        Feature: s6
    },
    hover: {
        Feature: s9
    },
    pan: {
        Feature: n3
    },
    drag: {
        Feature: n1,
        ProjectionNode,
        MeasureLayout: N7Component
    },
    layout: {
        ProjectionNode,
        MeasureLayout: N7Component
    }
}, (t, e)=>{
    if (eU(t)) {
        return new eO(e);
    }
    return new eC(e, {
        allowProjection: t !== s.Fragment
    });
});
