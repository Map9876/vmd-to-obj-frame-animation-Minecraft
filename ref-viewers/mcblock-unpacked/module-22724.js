export let lN = 60;
export function Pm(t, a, e) {
    let n = Math.sin(a) * t;
    return [
        n * Math.sin(e),
        Math.cos(a) * t,
        n * Math.cos(e)
    ];
}
export function _7(t, a, e) {
    let r = Number.isFinite(t.aspect) && t.aspect > 0 ? t.radius : Math.max(t.radius, ((t, a, e)=>{
        let n = 2 * Math.tan(e * Math.PI / 180 / 2) * 0.85 * Math.min(1, a);
        if (n > 0 && Number.isFinite(t) && !(t <= 0)) {
            return t / n;
        }
        return 0;
    })(t.diagonal, 16 / 9, lN));
    let [u, h, s] = Pm(r, t.phi, t.theta);
    let [l, o, M] = t.target;
    let c = l + u;
    let f = o + h;
    let p = M + s;
    let m = {
        position: [
            c,
            f,
            p
        ],
        target: [
            l,
            o,
            M
        ],
        fov: lN
    };
    if (!(e > 0) || a.length === 0 || !(r > 0)) {
        return m;
    }
    let b = -u;
    let d = -h;
    let g = -s;
    let y = Math.hypot(b, d, g);
    b /= y;
    d /= y;
    let N = -(g /= y);
    let x = 0;
    let F = b;
    let P = Math.hypot(N, 0, F);
    if (P < 0.000001) {
        N = 1;
        x = 0;
        F = 0;
    } else {
        N /= P;
        F /= P;
    }
    let I = x * g - F * d;
    let _ = F * b - N * g;
    let k = N * d - x * b;
    let v = Number.isFinite(t.aspect) && t.aspect > 0 ? t.aspect : 16 / 9;
    let w = Math.tan(lN * Math.PI / 180 / 2);
    let A = w;
    for (let t of a){
        for(let a = 0; a < 8; a++){
            let n = t.x + (1 & a) - c;
            let i = t.y + (a >> 1 & 1) - f;
            let r = t.z + (a >> 2 & 1) - p;
            let u = n * b + i * d + r * g;
            if (u <= 0.1) {
                continue;
            }
            let h = Math.abs(n * N + i * x + r * F);
            let s = Math.abs(n * I + i * _ + r * k);
            if (!(s > u * w || h > u * w * v)) {
                A = Math.max(A, s / u, h / (u * e));
            }
        }
    }
    m.fov = Math.min(((t, a)=>{
        let e = Math.tan(lN * Math.PI / 180 / 2);
        let i = (t)=>2 * Math.atan(t) * 180 / Math.PI;
        if (t > 0) {
            if (t >= 1) {
                return Math.max(lN, i(e * Math.max(1, a) / t));
            }
            return i(e / t);
        }
        return lN;
    })(e, v), Math.max(lN, 2 * Math.atan(A) * 180 / Math.PI));
    return m;
}
export function J2(t) {
    if (!t || typeof t !== "object") {
        return null;
    }
    let t_target = t.target;
    if (!Array.isArray(t_target) || t_target.length !== 3 || !t_target.every((t)=>typeof t === "number" && Number.isFinite(t))) {
        return null;
    }
    for (let a of [
        "phi",
        "theta",
        "radius",
        "diagonal"
    ]){
        let e = t[a];
        if (typeof e !== "number" || !Number.isFinite(e)) {
            return null;
        }
    }
    if (t.diagonal <= 0) {
        return null;
    }
    let e = {
        target: [
            t_target[0],
            t_target[1],
            t_target[2]
        ],
        phi: t.phi,
        theta: t.theta,
        radius: t.radius,
        diagonal: t.diagonal,
        source: t.source === "manual" ? "manual" : "auto"
    };
    if (typeof t.aspect === "number" && Number.isFinite(t.aspect) && t.aspect > 0) {
        e.aspect = t.aspect;
    }
    if (t.isOrtho === true) {
        e.isOrtho = true;
    }
    return e;
}
