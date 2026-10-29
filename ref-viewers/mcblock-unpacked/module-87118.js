import { r as r_1 } from "./module-13402.js";
import { QU } from "./module-23273.js";
import { z } from "./module-4215.js";
import { E } from "./module-84224.js";
import { G } from "./module-19696.js";
import { N } from "./module-78969.js";
import { Q } from "./module-51190.js";
import { P } from "./module-18023.js";
import { J } from "./module-73165.js";
import { l } from "./module-96667.js";
import { U } from "./module-59276.js";
import { p } from "./module-7853.js";
import { G as G_1 } from "./module-40436.js";
import { t as t_1 } from "./module-22749.js";
let s;
export { s };
((e)=>{
    let t = RegExp("^[-+]?(?:[0-9]+[.]|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?$", "i");
    let r = RegExp("^[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?d$", "i");
    let s = RegExp("^[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?f$", "i");
    let w = RegExp("^[-+]?(?:0|[1-9][0-9]*)b$", "i");
    let v = RegExp("^[-+]?(?:0|[1-9][0-9]*)l$", "i");
    let b = RegExp("^[-+]?(?:0|[1-9][0-9]*)s$", "i");
    let y = RegExp("^[-+]?(?:0|[1-9][0-9]*)$", "i");
    function _(e) {
        e.skipWhitespace();
        if (!e.canRead()) {
            throw e.createError("Expected value");
        }
        let I = e.peek();
        if (I === "{") {
            const L = e;
            L.expect("{", true);
            let t = new Map;
            for(L.skipWhitespace(); L.canRead() && L.peek() !== "}";){
                let e = L.cursor;
                L.skipWhitespace();
                if (!L.canRead()) {
                    throw L.createError("Expected key");
                }
                let r = L.readString();
                if (r.length === 0) {
                    L.cursor = e;
                    throw L.createError("Expected key");
                }
                L.expect(":", true);
                let s = _(L);
                t.set(r, s);
                if (!S(L)) {
                    break;
                }
                if (!L.canRead()) {
                    throw L.createError("Expected key");
                }
            }
            L.expect("}", true);
            return new G(t);
        }
        if (I === "[") {
            if (!e.canRead(3) || r_1.isQuotedStringStart(e.peek(1)) || e.peek(2) !== ";") {
                return ((e)=>{
                    e.expect("[", true);
                    e.skipWhitespace();
                    if (!e.canRead()) {
                        throw e.createError("Expected value");
                    }
                    let t = [];
                    let t_1_End = t_1.End;
                    while(e.peek() !== "]"){
                        let s = e.cursor;
                        let n = _(e);
                        let i = n.getId();
                        if (t_1_End === t_1.End) {
                            t_1_End = i;
                        } else if (i !== t_1_End) {
                            e.cursor = s;
                            throw e.createError(`Can't insert ${t_1[i]} into list of ${t_1[t_1_End]}`);
                        }
                        t.push(n);
                        if (!S(e)) {
                            break;
                        }
                        if (!e.canRead()) {
                            throw e.createError("Expected value");
                        }
                    }
                    e.expect("]", true);
                    return new J(t, t_1_End);
                })(e);
            } else {
                e.expect("[", true);
                let t = e.cursor;
                let r = e.read();
                e.skip();
                e.skipWhitespace();
                if (e.canRead()) {
                    if (r === "B") {
                        return M(e, E, t_1.ByteArray, t_1.Byte);
                    }
                    if (r === "L") {
                        return M(e, U, t_1.LongArray, t_1.Long);
                    }
                    if (r === "I") {
                        return M(e, P, t_1.IntArray, t_1.Int);
                    }
                    e.cursor = t;
                    throw e.createError(`Invalid array type '${r}'`);
                }
                throw e.createError("Expected value");
            }
        }
        {
            e.skipWhitespace();
            let o = e.cursor;
            if (r_1.isQuotedStringStart(e.peek())) {
                return new G_1(e.readQuotedString());
            }
            {
                let n = e.readUnquotedString();
                if (n.length === 0) {
                    e.cursor = o;
                    throw e.createError("Expected value");
                }
                try {
                    if (s.test(n)) {
                        let e = Number(n.substring(0, n.length - 1));
                        return new N(e);
                    }
                    if (w.test(n)) {
                        let e = Number(n.substring(0, n.length - 1));
                        return new z(Math.floor(e));
                    }
                    if (v.test(n)) {
                        let e = BigInt(n.substring(0, n.length - 1));
                        return new l(e);
                    } else if (b.test(n)) {
                        let e = Number(n.substring(0, n.length - 1));
                        return new p(Math.floor(e));
                    } else if (y.test(n)) {
                        let e = Number(n);
                        return new Q(Math.floor(e));
                    } else if (r.test(n)) {
                        let e = Number(n.substring(0, n.length - 1));
                        return new QU(e);
                    } else if (t.test(n)) {
                        let e = Number(n);
                        return new QU(e);
                    } else if (n.toLowerCase() === "true") {
                        return z.ONE;
                    } else if (n.toLowerCase() === "false") {
                        return z.ZERO;
                    }
                } catch (e) {}
                if (n.length === 0) {
                    return G_1.EMPTY;
                }
                return new G_1(n);
            }
        }
    }
    function M(e, t, r, s) {
        let n = [];
        while(e.peek() !== "]"){
            let t = _(e);
            if (t.getId() !== s) {
                throw e.createError(`Can't insert ${t_1[t.getId()]} into ${t_1[r]}`);
            }
            n.push(t.isLong() ? t.getAsPair() : t.getAsNumber());
            if (!S(e)) {
                break;
            }
            if (!e.canRead()) {
                throw e.createError("Expected value");
            }
        }
        e.expect("]");
        return new t(n);
    }
    function S(e) {
        e.skipWhitespace();
        return !!e.canRead() && e.peek() === "," && (e.skip(), e.skipWhitespace(), true);
    }
    e.readTag = _;
})(s = s || (s = {}));
