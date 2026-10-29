import { p } from "../useStore-DX_rDZVw.js";
import { a } from "../redirect-Coy-z-9D.js";
export class sr {
    constructor(e, t){
        this.stream = e;
        this.hint = t?.hint ?? `binary`;
    }
}
const globalThis_Buffer = globalThis.Buffer;
const cr = !!globalThis_Buffer && typeof globalThis_Buffer.from == `function`;
export function lr(e) {
    if (e.length === 0) {
        return ``;
    }
    if (cr) {
        return globalThis_Buffer.from(e).toString(`base64`);
    }
    let t = 32768;
    let n = [];
    for(let r = 0; r < e.length; r += t){
        let i = e.subarray(r, r + t);
        n.push(String.fromCharCode.apply(null, i));
    }
    return btoa(n.join(``));
}
function ur(e) {
    if (e.length === 0) {
        return new Uint8Array;
    }
    if (cr) {
        let t = globalThis_Buffer.from(e, `base64`);
        return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    }
    let t = atob(e);
    let n = new Uint8Array(t.length);
    for(let e = 0; e < t.length; e++){
        n[e] = t.charCodeAt(e);
    }
    return n;
}
export const K = Object.create(null);
export const q = Object.create(null);
export const dr = (e)=>new ReadableStream({
        start (t) {
            e.on({
                next (e) {
                    try {
                        t.enqueue(ur(e));
                    } catch  {}
                },
                throw (e) {
                    t.error(e);
                },
                return () {
                    try {
                        t.close();
                    } catch  {}
                }
            });
        }
    });
const fr = new TextEncoder;
export const pr = (e)=>new ReadableStream({
        start (t) {
            e.on({
                next (e) {
                    try {
                        if (typeof e == `string`) {
                            t.enqueue(fr.encode(e));
                        } else {
                            t.enqueue(ur(e.$b64));
                        }
                    } catch  {}
                },
                throw (e) {
                    t.error(e);
                },
                return () {
                    try {
                        t.close();
                    } catch  {}
                }
            });
        }
    });
export const mr = `(s=>new ReadableStream({start(c){s.on({next(b){try{const d=atob(b),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}catch(_){}},throw(e){c.error(e)},return(){try{c.close()}catch(_){}}})}}))`;
export const hr = `(s=>{const e=new TextEncoder();return new ReadableStream({start(c){s.on({next(v){try{if(typeof v==='string'){c.enqueue(e.encode(v))}else{const d=atob(v.$b64),a=new Uint8Array(d.length);for(let i=0;i<d.length;i++)a[i]=d.charCodeAt(i);c.enqueue(a)}}catch(_){}},throw(x){c.error(x)},return(){try{c.close()}catch(_){}}})}})})`;
