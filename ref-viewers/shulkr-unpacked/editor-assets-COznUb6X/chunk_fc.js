export function fc(e, t) {
    return (e % t + t) % t;
}
export function mc(e, t, n) {
    if (e === t) {
        return 0;
    }
    return (n - e) / (t - e);
}
export function hc(e, t, n) {
    return (1 - n) * e + n * t;
}
export function gc(e, t, n, r) {
    return hc(e, t, 1 - Math.exp(-n * r));
}
export function _c(e, t = 1) {
    return t - Math.abs(fc(e, t * 2) - t);
}
export function vc(e, t, n) {
    if (e <= t) {
        return 0;
    }
    if (e >= n) {
        return 1;
    }
    e = (e - t) / (n - t);
    return e * e * (3 - 2 * e);
}
export function yc(e, t, n) {
    if (e <= t) {
        return 0;
    }
    if (e >= n) {
        return 1;
    }
    e = (e - t) / (n - t);
    return e * e * e * (e * (e * 6 - 15) + 10);
}
export function bc(e, t) {
    return e + Math.floor(Math.random() * (t - e + 1));
}
export function xc(e, t) {
    return e + Math.random() * (t - e);
}
export function Sc(e) {
    return e * (0.5 - Math.random());
}
export function Ec(e) {
    return (e & e - 1) == 0 && e !== 0;
}
export function Dc(e) {
    return 2 ** Math.ceil(Math.log(e) / Math.LN2);
}
export function Oc(e) {
    return 2 ** Math.floor(Math.log(e) / Math.LN2);
}
export function Ac(e, t) {
    switch(t.constructor){
        case Float32Array:
            return e;
        case Uint32Array:
            return e / 4294967295;
        case Uint16Array:
            return e / 65535;
        case Uint8Array:
            return e / 255;
        case Int32Array:
            return Math.max(e / 2147483647, -1);
        case Int16Array:
            return Math.max(e / 32767, -1);
        case Int8Array:
            return Math.max(e / 127, -1);
        default:
            throw Error(`Invalid component type.`);
    }
}
export function U(e, t) {
    switch(t.constructor){
        case Float32Array:
            return e;
        case Uint32Array:
            return Math.round(e * 4294967295);
        case Uint16Array:
            return Math.round(e * 65535);
        case Uint8Array:
            return Math.round(e * 255);
        case Int32Array:
            return Math.round(e * 2147483647);
        case Int16Array:
            return Math.round(e * 32767);
        case Int8Array:
            return Math.round(e * 127);
        default:
            throw Error(`Invalid component type.`);
    }
}
export function zc(e) {
    if (e < 0.04045) {
        return e * 0.0773993808;
    }
    return (e * 0.9478672986 + 0.0521327014) ** 2.4;
}
export function Ry(e) {
    if (this.enabled !== false) {
        this._handleKeyDown(e);
    }
}
export function Vy(e) {
    if (this.enabled !== false) {
        e.preventDefault();
    }
}
export function Hy(e) {
    if (e.key === `Control`) {
        this._controlActive = true;
        this.domElement.getRootNode().addEventListener(`keyup`, this._interceptControlUp, {
            passive: true,
            capture: true
        });
    }
}
export function Uy(e) {
    if (e.key === `Control`) {
        this._controlActive = false;
        this.domElement.getRootNode().removeEventListener(`keyup`, this._interceptControlUp, {
            passive: true,
            capture: true
        });
    }
}
export function Tb(e, t, n) {
    return `${e >> 1},${t >> 1},${n >> 1}`;
}
export function jb(e, t, n, r) {
    r.set(0, e.vertical, 0).addScaledVector(t.forward, e.forward).addScaledVector(t.right, e.strafe);
    return r.multiplyScalar(11 * n / Math.max(1, r.length()));
}
const Mb = 1;
const Nb = 2;
const Pb = 40;
const Fb = 800;
const Ib = 120;
const Lb = 50;
const Rb = 240;
const zb = 150;
export class Bb {
    constructor(){
        this.lastEventAt = -Infinity;
        this.lastStepAt = -Infinity;
        this.direction = 1;
        this.travel = 0;
    }
    push(e, t, n) {
        let r = e * (t === Mb ? Pb : t === Nb ? Fb : 1);
        if (r === 0) {
            return 0;
        }
        let i = r < 0 ? 1 : -1;
        let a = i !== this.direction || n - this.lastEventAt >= Ib;
        this.lastEventAt = n;
        this.direction = i;
        let o = Math.abs(r);
        if (a || o >= Lb) {
            this.travel = 0;
        } else {
            this.travel += o;
            if (this.travel < Rb) {
                return 0;
            }
            this.travel = 0;
        }
        if (n - this.lastStepAt < zb) {
            return 0;
        }
        this.lastStepAt = n;
        return i;
    }
}
