export const ac = {
    0: 1,
    2: 6,
    4: 7,
    3: 5,
    1: 0,
    6: 2,
    7: 4,
    5: 3
};
export class oc {
    addEventListener(e, t) {
        if (this._listeners === undefined) {
            this._listeners = {};
        }
        let _listeners = this._listeners;
        if (_listeners[e] === undefined) {
            _listeners[e] = [];
        }
        if (_listeners[e].indexOf(t) === -1) {
            _listeners[e].push(t);
        }
    }
    hasEventListener(e, t) {
        let _listeners = this._listeners;
        if (_listeners === undefined) {
            return false;
        }
        return _listeners[e] !== undefined && _listeners[e].indexOf(t) !== -1;
    }
    removeEventListener(e, t) {
        let _listeners = this._listeners;
        if (_listeners === undefined) {
            return;
        }
        let r = _listeners[e];
        if (r !== undefined) {
            let e = r.indexOf(t);
            if (e !== -1) {
                r.splice(e, 1);
            }
        }
    }
    dispatchEvent(e) {
        let _listeners = this._listeners;
        if (_listeners === undefined) {
            return;
        }
        let n = _listeners[e.type];
        if (n !== undefined) {
            e.target = this;
            let t = n.slice(0);
            for(let n = 0, r = t.length; n < r; n++){
                t[n].call(this, e);
            }
            e.target = null;
        }
    }
}
const sc = `00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`);
let cc = 1234567;
export const lc = Math.PI / 180;
export const uc = 180 / Math.PI;
export function dc() {
    let e = Math.random() * 4294967295 | 0;
    let t = Math.random() * 4294967295 | 0;
    let n = Math.random() * 4294967295 | 0;
    let r = Math.random() * 4294967295 | 0;
    return (sc[e & 255] + sc[e >> 8 & 255] + sc[e >> 16 & 255] + sc[e >> 24 & 255] + `-` + sc[t & 255] + sc[t >> 8 & 255] + `-` + sc[t >> 16 & 15 | 64] + sc[t >> 24 & 255] + `-` + sc[n & 63 | 128] + sc[n >> 8 & 255] + `-` + sc[n >> 16 & 255] + sc[n >> 24 & 255] + sc[r & 255] + sc[r >> 8 & 255] + sc[r >> 16 & 255] + sc[r >> 24 & 255]).toLowerCase();
}
export function H(e, t, n) {
    return Math.max(t, Math.min(n, e));
}
export function pc(e, t, n, r, i) {
    return r + (e - t) * (i - r) / (n - t);
}
export function Cc(e) {
    if (e !== undefined) {
        cc = e;
    }
    let t = cc += 1831565813;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
export function wc(e) {
    return e * lc;
}
export function Tc(e) {
    return e * uc;
}
