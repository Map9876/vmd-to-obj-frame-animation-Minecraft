import { $o, Ao, As, Bo, Cs, Ds, Es, Fo, Ho, Io, Jo, Ko, Lo, Mo, Ms, No, Oo, Os, Po, Qo, Ss, Ts, Uo, Vo, Xo, Yo, Zo, _s, as, bs, cs, ds, es, fs, gs, hs, is, jo, js, ko, ks, ls, ms, ns, os, ps, qo, rs, ss, ts, us, vs, ws, xs, ys, zo } from "./chunk_go.js";
export function at(e, t, n) {
    return [
        1,
        0,
        0,
        e,
        0,
        1,
        0,
        t,
        0,
        0,
        1,
        n,
        0,
        0,
        0,
        1
    ];
}
export function ct(e) {
    return [
        (e >> 16 & 255) / 255,
        (e >> 8 & 255) / 255,
        (e & 255) / 255
    ];
}
export function ic(e, t, n) {
    return new Promise((resolve, reject)=>{
        function a() {
            switch(e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)){
                case e.WAIT_FAILED:
                    reject();
                    break;
                case e.TIMEOUT_EXPIRED:
                    setTimeout(a, n);
                    break;
                default:
                    resolve();
            }
        }
        setTimeout(a, n);
    });
}
export function Lm(e, t, n, r) {
    let i = Rm(r);
    switch(n){
        case Vo:
            return e * t;
        case Ko:
            return e * t / i.components * i.byteLength;
        case qo:
            return e * t / i.components * i.byteLength;
        case Jo:
            return e * t * 2 / i.components * i.byteLength;
        case Yo:
            return e * t * 2 / i.components * i.byteLength;
        case Ho:
            return e * t * 3 / i.components * i.byteLength;
        case Uo:
            return e * t * 4 / i.components * i.byteLength;
        case Xo:
            return e * t * 4 / i.components * i.byteLength;
        case Zo:
        case Qo:
            return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
        case $o:
        case es:
            return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
        case ns:
        case is:
            return Math.max(e, 16) * Math.max(t, 8) / 4;
        case ts:
        case rs:
            return Math.max(e, 8) * Math.max(t, 8) / 2;
        case as:
        case os:
        case cs:
        case ls:
            return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
        case ss:
        case us:
        case ds:
            return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
        case fs:
            return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
        case ps:
            return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
        case ms:
            return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
        case hs:
            return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
        case gs:
            return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
        case _s:
            return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
        case vs:
            return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
        case ys:
            return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
        case bs:
            return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
        case xs:
            return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
        case Ss:
            return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
        case Cs:
            return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
        case ws:
            return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
        case Ts:
            return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
        case Es:
        case Ds:
        case Os:
            return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
        case ks:
        case As:
            return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
        case js:
        case Ms:
            return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    }
    throw Error(`Unable to determine texture byte length for ${n} format.`);
}
function Rm(e) {
    switch(e){
        case Oo:
        case ko:
            return {
                byteLength: 1,
                components: 1
            };
        case jo:
        case Ao:
        case Fo:
            return {
                byteLength: 2,
                components: 1
            };
        case Io:
        case Lo:
            return {
                byteLength: 2,
                components: 4
            };
        case No:
        case Mo:
        case Po:
            return {
                byteLength: 4,
                components: 1
            };
        case zo:
        case Bo:
            return {
                byteLength: 4,
                components: 3
            };
    }
    throw Error(`Unknown texture type ${e}.`);
}
export function zm() {
    let e = null;
    let t = false;
    let n = null;
    let r = null;
    function i(t, a) {
        n(t, a);
        r = e.requestAnimationFrame(i);
    }
    return {
        start: function() {
            if (t !== true && n !== null) {
                r = e.requestAnimationFrame(i);
                t = true;
            }
        },
        stop: function() {
            e.cancelAnimationFrame(r);
            t = false;
        },
        setAnimationLoop: function(e) {
            n = e;
        },
        setContext: function(t) {
            e = t;
        }
    };
}
export function Bm(e) {
    let t = new WeakMap;
    function n(t, n) {
        let t_array = t.array;
        let t_usage = t.usage;
        let r_byteLength = t_array.byteLength;
        let buffer = e.createBuffer();
        e.bindBuffer(n, buffer);
        e.bufferData(n, t_array, t_usage);
        t.onUploadCallback();
        let s;
        if (t_array instanceof Float32Array) {
            s = e.FLOAT;
        } else if (typeof Float16Array < `u` && t_array instanceof Float16Array) {
            s = e.HALF_FLOAT;
        } else if (t_array instanceof Uint16Array) {
            s = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;
        } else if (t_array instanceof Int16Array) {
            s = e.SHORT;
        } else if (t_array instanceof Uint32Array) {
            s = e.UNSIGNED_INT;
        } else if (t_array instanceof Int32Array) {
            s = e.INT;
        } else if (t_array instanceof Int8Array) {
            s = e.BYTE;
        } else if (t_array instanceof Uint8Array) {
            s = e.UNSIGNED_BYTE;
        } else if (t_array instanceof Uint8ClampedArray) {
            s = e.UNSIGNED_BYTE;
        } else {
            throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: ` + t_array);
        }
        return {
            buffer,
            type: s,
            bytesPerElement: t_array.BYTES_PER_ELEMENT,
            version: t.version,
            size: r_byteLength
        };
    }
    function r(buffer, n, r) {
        let n_array = n.array;
        let n_updateRanges = n.updateRanges;
        e.bindBuffer(r, buffer);
        if (n_updateRanges.length === 0) {
            e.bufferSubData(r, 0, n_array);
        } else {
            n_updateRanges.sort((e, t)=>e.start - t.start);
            let t = 0;
            for(let e = 1; e < n_updateRanges.length; e++){
                let n = n_updateRanges[t];
                let updateRange = n_updateRanges[e];
                if (updateRange.start <= n.start + n.count + 1) {
                    n.count = Math.max(n.count, updateRange.start + updateRange.count - n.start);
                } else {
                    ++t;
                    n_updateRanges[t] = updateRange;
                }
            }
            n_updateRanges.length = t + 1;
            for(let t = 0, n = n_updateRanges.length; t < n; t++){
                let updateRange = n_updateRanges[t];
                e.bufferSubData(r, updateRange.start * n_array.BYTES_PER_ELEMENT, n_array, updateRange.start, updateRange.count);
            }
            n.clearUpdateRanges();
        }
        n.onUploadCallback();
    }
    function get(e) {
        if (e.isInterleavedBufferAttribute) {
            e = e.data;
        }
        return t.get(e);
    }
    function remove(n) {
        if (n.isInterleavedBufferAttribute) {
            n = n.data;
        }
        let r = t.get(n);
        if (r) {
            e.deleteBuffer(r.buffer);
            t.delete(n);
        }
    }
    function update(e, i) {
        if (e.isInterleavedBufferAttribute) {
            e = e.data;
        }
        if (e.isGLBufferAttribute) {
            let n = t.get(e);
            if (!n || n.version < e.version) {
                t.set(e, {
                    buffer: e.buffer,
                    type: e.type,
                    bytesPerElement: e.elementSize,
                    version: e.version
                });
            }
            return;
        }
        let a = t.get(e);
        if (a === undefined) {
            t.set(e, n(e, i));
        } else if (a.version < e.version) {
            if (a.size !== e.array.byteLength) {
                throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);
            }
            r(a.buffer, e, i);
            a.version = e.version;
        }
    }
    return {
        get,
        remove,
        update
    };
}
