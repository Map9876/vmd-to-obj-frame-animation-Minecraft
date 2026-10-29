import { IUQ, LoY, Q1f, Z58, eaF, hxR, i7d, kn4, nWS } from "./module-85339.js";
let a = new IUQ;
let o = new IUQ;
let s = new kn4;
let l = new kn4;
let r = new Q1f;
class u {
    setGeometry(e) {
        this.mesh.geometry = e;
    }
    get texture() {
        return this.target?.texture ?? null;
    }
    get width() {
        return this.target?.width ?? 1;
    }
    get height() {
        return this.target?.height ?? 1;
    }
    render(e, t, n, u, c) {
        e.getCurrentViewport(a);
        let m = a.z;
        let viewportHeight = a.w;
        if (m <= 0 || viewportHeight <= 0) {
            return null;
        }
        s.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse).multiply(n);
        let d = Infinity;
        let p = Infinity;
        let h = -Infinity;
        let v = -Infinity;
        let g = 0;
        for(let e = 0; e < 8; e++){
            o.set(1 & e ? u.max.x : u.min.x, 2 & e ? u.max.y : u.min.y, 4 & e ? u.max.z : u.min.z, 1).applyMatrix4(s);
            if (o.w <= 0.000001) {
                g++;
                continue;
            }
            let t = o.x / o.w;
            let n = o.y / o.w;
            if (t < d) {
                d = t;
            }
            if (t > h) {
                h = t;
            }
            if (n < p) {
                p = n;
            }
            if (n > v) {
                v = n;
            }
        }
        if (g === 8) {
            return null;
        }
        if (g > 0) {
            d = -1;
            p = -1;
            h = 1;
            v = 1;
        }
        let k = Math.ceil(c) + 2;
        let b = Math.max(0, Math.floor((0.5 * d + 0.5) * m) - k);
        let x = Math.max(0, Math.floor((0.5 * p + 0.5) * viewportHeight) - k);
        let y = Math.min(m, Math.ceil((0.5 * h + 0.5) * m) + k);
        let M = Math.min(viewportHeight, Math.ceil((0.5 * v + 0.5) * viewportHeight) + k);
        let w = y - b;
        let h_1 = M - x;
        if (w <= 0 || h_1 <= 0) {
            return null;
        }
        let target = this.target;
        if (!target || target.width < w || target.height < h_1) {
            let e = Math.min(m, 64 * Math.ceil(Math.max(w, target?.width ?? 0) / 64));
            let t = Math.min(viewportHeight, 64 * Math.ceil(Math.max(h_1, target?.height ?? 0) / 64));
            if (target) {
                target.setSize(e, t);
            } else {
                target = new nWS(e, t, {
                    depthBuffer: true,
                    stencilBuffer: false,
                    generateMipmaps: false,
                    minFilter: hxR,
                    magFilter: hxR,
                    samples: this.samples
                });
                this.target = target;
            }
        }
        let A = b / m * 2 - 1;
        let E = y / m * 2 - 1;
        let D = x / viewportHeight * 2 - 1;
        let O = M / viewportHeight * 2 - 1;
        let S = 2 / (E - A);
        let F = 2 / (O - D);
        l.set(S, 0, 0, -((A + E) / 2) * S, 0, F, 0, -((D + O) / 2) * F, 0, 0, 1, 0, 0, 0, 0, 1);
        this.camera.projectionMatrix.multiplyMatrices(l, t.projectionMatrix);
        this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert();
        this.camera.matrixWorld.copy(t.matrixWorld);
        this.camera.matrixWorldInverse.copy(t.matrixWorldInverse);
        this.mesh.matrixWorld.copy(n);
        let N = e.getRenderTarget();
        let R = e.getActiveCubeFace();
        let _ = e.getActiveMipmapLevel();
        let e_autoClear = e.autoClear;
        let G = e.getClearAlpha();
        let autoUpdate = e.shadowMap.autoUpdate;
        e.getClearColor(r);
        target.viewport.set(0, 0, w, h_1);
        target.scissor.set(0, 0, w, h_1);
        target.scissorTest = true;
        e.shadowMap.autoUpdate = false;
        e.autoClear = false;
        e.setRenderTarget(target);
        e.setClearColor(0, 0);
        e.state.buffers.depth.setMask(true);
        e.clear(true, true, false);
        e.render(this.scene, this.camera);
        e.setRenderTarget(N, R, _);
        e.setClearColor(r, G);
        e.autoClear = e_autoClear;
        e.shadowMap.autoUpdate = autoUpdate;
        return {
            x: a.x + b,
            y: a.y + x,
            w,
            h: h_1,
            ndc: [
                A,
                D,
                E,
                O
            ],
            viewportHeight,
            pixelRatio: e.getPixelRatio()
        };
    }
    dispose() {
        this.target?.dispose();
        this.target = null;
        this.ownedGeometry.dispose();
    }
    constructor(e, t = 0){
        this.samples = t;
        this.target = null;
        this.mesh = new eaF(new LoY, e);
        this.ownedGeometry = this.mesh.geometry;
        this.mesh.matrixAutoUpdate = false;
        this.mesh.frustumCulled = false;
        this.mesh.raycast = ()=>{};
        if (!e) {
            this.mesh.visible = false;
        }
        this.scene = new Z58;
        this.scene.matrixWorldAutoUpdate = false;
        this.scene.add(this.mesh);
        this.camera = new i7d;
        this.camera.matrixAutoUpdate = false;
        this.camera.matrixWorldAutoUpdate = false;
    }
}
export { u as r };
export let b = "\nuniform vec4 uNdcRect;\n\nvoid main() {\n  vec2 t = position.xy * 0.5 + 0.5;\n  gl_Position = vec4(mix(uNdcRect.xy, uNdcRect.zw, t), 0.0, 1.0);\n}\n";
