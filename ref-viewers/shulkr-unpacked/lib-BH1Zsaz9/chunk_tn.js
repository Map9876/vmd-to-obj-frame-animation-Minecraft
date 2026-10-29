import { a } from "../jsx-runtime-Db0DjQYK.js";
import { L } from "./chunk_L.js";
class tn {
    constructor(e){
        this.left = e ? [
            ...e
        ] : [];
        this.right = [];
    }
    get(e) {
        if (e < 0 || e >= this.left.length + this.right.length) {
            throw RangeError(`Cannot access index \`${e}\` in a splice buffer of size \`${this.left.length + this.right.length}\``);
        }
        if (e < this.left.length) {
            return this.left[e];
        }
        return this.right[this.right.length - e + this.left.length - 1];
    }
    get length() {
        return this.left.length + this.right.length;
    }
    shift() {
        this.setCursor(0);
        return this.right.pop();
    }
    slice(e, t) {
        let n = t ?? Infinity;
        if (n < this.left.length) {
            return this.left.slice(e, n);
        }
        if (e > this.left.length) {
            return this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse();
        }
        return this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
    }
    splice(e, t, n) {
        let r = t || 0;
        this.setCursor(Math.trunc(e));
        let i = this.right.splice(this.right.length - r, Infinity);
        if (n) {
            nn(this.left, n);
        }
        return i.reverse();
    }
    pop() {
        this.setCursor(Infinity);
        return this.left.pop();
    }
    push(e) {
        this.setCursor(Infinity);
        this.left.push(e);
    }
    pushMany(e) {
        this.setCursor(Infinity);
        nn(this.left, e);
    }
    unshift(e) {
        this.setCursor(0);
        this.right.push(e);
    }
    unshiftMany(e) {
        this.setCursor(0);
        nn(this.right, e.reverse());
    }
    setCursor(e) {
        if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) {
            if (e < this.left.length) {
                let t = this.left.splice(e, Infinity);
                nn(this.right, t.reverse());
            } else {
                let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
                nn(this.left, t.reverse());
            }
        }
    }
}
function nn(e, t) {
    let n = 0;
    if (t.length < 10000) {
        e.push(...t);
    } else {
        while(n < t.length){
            e.push(...t.slice(n, n + 10000));
            n += 10000;
        }
    }
}
export function rn(e) {
    let t = {};
    let n = -1;
    let r;
    let i;
    let a;
    let o;
    let s;
    let c;
    let l;
    let u = new tn(e);
    while(++n < u.length){
        while(n in t){
            n = t[n];
        }
        r = u.get(n);
        if (n && r[1].type === `chunkFlow` && u.get(n - 1)[1].type === `listItemPrefix` && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === `lineEndingBlank` && (a += 2), a < c.length && c[a][1].type === `content`)) {
            while(++a < c.length && c[a][1].type !== `content`){
                if (c[a][1].type === `chunkText`) {
                    c[a][1]._isInFirstContentOfListItem = true;
                    a++;
                }
            }
        }
        if (r[0] === `enter`) {
            if (r[1].contentType) {
                Object.assign(t, an(u, n));
                n = t[n];
                l = true;
            }
        } else if (r[1]._container) {
            a = n;
            for(i = undefined; a--;){
                o = u.get(a);
                if (o[1].type === `lineEnding` || o[1].type === `lineEndingBlank`) {
                    if (o[0] === `enter`) {
                        if (i) {
                            u.get(i)[1].type = `lineEndingBlank`;
                        }
                        o[1].type = `lineEnding`;
                        i = a;
                    }
                } else if (!(o[1].type === `linePrefix` || o[1].type === `listItemIndent`)) {
                    break;
                }
            }
            if (i) {
                r[1].end = {
                    ...u.get(i)[1].start
                };
                s = u.slice(i, n);
                s.unshift(r);
                u.splice(i, n - i + 1, s);
            }
        }
    }
    L(e, 0, Infinity, u.slice(0));
    return !l;
}
function an(e, t) {
    let n = e.get(t)[1];
    let r = e.get(t)[2];
    let i = t - 1;
    let a = [];
    let n__tokenizer = n._tokenizer;
    if (!n__tokenizer) {
        n__tokenizer = r.parser[n.contentType](n.start);
        if (n._contentTypeTextTrailing) {
            n__tokenizer._contentTypeTextTrailing = true;
        }
    }
    let o_events = n__tokenizer.events;
    let c = [];
    let l = {};
    let u;
    let d;
    let f = -1;
    let p = n;
    let m = 0;
    let h = 0;
    let g = [
        h
    ];
    while(p){
        while(e.get(++i)[1] !== p);
        a.push(i);
        if (!p._tokenizer) {
            u = r.sliceStream(p);
            if (!p.next) {
                u.push(null);
            }
            if (d) {
                n__tokenizer.defineSkip(p.start);
            }
            if (p._isInFirstContentOfListItem) {
                n__tokenizer._gfmTasklistFirstContentOfListItem = true;
            }
            n__tokenizer.write(u);
            if (p._isInFirstContentOfListItem) {
                n__tokenizer._gfmTasklistFirstContentOfListItem = undefined;
            }
        }
        d = p;
        p = p.next;
    }
    for(p = n; ++f < o_events.length;){
        if (o_events[f][0] === `exit` && o_events[f - 1][0] === `enter` && o_events[f][1].type === o_events[f - 1][1].type && o_events[f][1].start.line !== o_events[f][1].end.line) {
            h = f + 1;
            g.push(h);
            p._tokenizer = undefined;
            p.previous = undefined;
            p = p.next;
        }
    }
    n__tokenizer.events = [];
    if (p) {
        p._tokenizer = undefined;
        p.previous = undefined;
    } else {
        g.pop();
    }
    for(f = g.length; f--;){
        let t = o_events.slice(g[f], g[f + 1]);
        let n = a.pop();
        c.push([
            n,
            n + t.length - 1
        ]);
        e.splice(n, 2, t);
    }
    c.reverse();
    for(f = -1; ++f < c.length;){
        l[m + c[f][0]] = m + c[f][1];
        m += c[f][1] - c[f][0] - 1;
    }
    return l;
}
