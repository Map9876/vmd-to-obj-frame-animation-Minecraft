import { FV as ACESFilmic, Mjd, Q1f, cRK, jUj, kyO, y_p } from "./module-85339.js";
import { R } from "./module-11046.js";
let i = {
    None: y_p,
    ACESFilmic,
    Reinhard: Mjd,
    Linear: kyO
};
let a = {
    toneMapping: true,
    background: true,
    fog: true,
    shadows: true
};
export function $m(e, t, n, o = {}) {
    let u = o.capabilities ?? a;
    if (u.toneMapping) {
        R(e, i[n.renderer.toneMapping], n.renderer.toneMappingExposure);
    }
    if (u.background) {
        if (o.transparent) {
            t.background = null;
            e.setClearColor(0, 0);
        } else if (t.background instanceof Q1f) {
            t.background.set(n.background);
        } else {
            t.background = new Q1f(n.background);
        }
    }
    if (u.fog) {
        ((e, { fog })=>{
            if (!fog.enabled) {
                e.fog = null;
                return;
            }
            if (fog.type === "linear") {
                if (e.fog instanceof jUj) {
                    e.fog.color.set(fog.color);
                    e.fog.near = fog.near;
                    return e.fog.far = fog.far;
                }
                return e.fog = new jUj(fog.color, fog.near, fog.far);
            }
            if (e.fog instanceof cRK) {
                e.fog.color.set(fog.color);
                e.fog.density = fog.density;
            } else {
                e.fog = new cRK(fog.color, fog.density);
            }
        })(t, n);
    }
    if (u.shadows && e.shadowMap.enabled !== n.renderer.shadows) {
        e.shadowMap.enabled = n.renderer.shadows;
        e.shadowMap.needsUpdate = true;
    }
}
export function ZG(e, t, n) {
    if (!n.dpr) {
        return null;
    }
    let r = Math.min(e[0], e[1]);
    return Math.min(Math.max(t, r), Math.max(e[0], e[1]), Math.max(0.1, n.maxDpr));
}
export function ml(e, t) {
    let n = Math.min(Math.max(1, Math.floor(t.mapSize)), Math.max(1, Math.floor(t.maxTextureSize)));
    if (e.shadow.mapSize.x !== n || e.shadow.mapSize.y !== n) {
        e.shadow.mapSize.set(n, n);
        if (e.shadow.map) {
            e.shadow.map.dispose();
            e.shadow.map = null;
        }
    }
    let camera = e.shadow.camera;
    camera.left = -t.bounds;
    camera.right = t.bounds;
    camera.top = t.bounds;
    camera.bottom = -t.bounds;
    camera.updateProjectionMatrix();
    e.shadow.needsUpdate = true;
}
