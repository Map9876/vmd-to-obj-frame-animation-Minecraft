let i;
let n;
let r;
let s;
let l;
function o(t) {
    let t_length = t.length;
    while(--t_length >= 0){
        t[t_length] = 0;
    }
}
let h = 573;
let d = new Uint8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0
]);
let _ = new Uint8Array([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13
]);
let f = new Uint8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    3,
    7
]);
let u = new Uint8Array([
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
]);
let c = Array(576);
o(c);
let w = Array(60);
o(w);
let b = Array(512);
o(b);
let m = Array(256);
o(m);
let g = Array(29);
o(g);
let p = Array(30);
function k(t, e, a, i, n) {
    this.static_tree = t;
    this.extra_bits = e;
    this.extra_base = a;
    this.elems = i;
    this.max_length = n;
    this.has_stree = t && t.length;
}
function v(t, e) {
    this.dyn_tree = t;
    this.max_code = 0;
    this.stat_desc = e;
}
o(p);
let y = (t)=>{
    if (t < 256) {
        return b[t];
    }
    return b[256 + (t >>> 7)];
};
let x = (t, e)=>{
    t.pending_buf[t.pending++] = 255 & e;
    t.pending_buf[t.pending++] = e >>> 8 & 255;
};
let z = (t, e, a)=>{
    if (t.bi_valid > 16 - a) {
        t.bi_buf |= e << t.bi_valid & 65535;
        x(t, t.bi_buf);
        t.bi_buf = e >> 16 - t.bi_valid;
        t.bi_valid += a - 16;
    } else {
        t.bi_buf |= e << t.bi_valid & 65535;
        t.bi_valid += a;
    }
};
let A = (t, e, a)=>{
    z(t, a[2 * e], a[2 * e + 1]);
};
let E = (t, e)=>{
    let a = 0;
    do {
        a |= 1 & t;
        t >>>= 1;
        a <<= 1;
    }while (--e > 0)
    return a >>> 1;
};
let R = (t, e, a)=>{
    let i;
    let n;
    let r = Array(16);
    let s = 0;
    for(i = 1; i <= 15; i++){
        s = s + a[i - 1] << 1;
        r[i] = s;
    }
    for(n = 0; n <= e; n++){
        let e = t[2 * n + 1];
        if (e !== 0) {
            t[2 * n] = E(r[e]++, e);
        }
    }
};
let U = (t)=>{
    let e;
    for(e = 0; e < 286; e++){
        t.dyn_ltree[2 * e] = 0;
    }
    for(e = 0; e < 30; e++){
        t.dyn_dtree[2 * e] = 0;
    }
    for(e = 0; e < 19; e++){
        t.bl_tree[2 * e] = 0;
    }
    t.dyn_ltree[512] = 1;
    t.opt_len = t.static_len = 0;
    t.sym_next = t.matches = 0;
};
let Z = (t)=>{
    if (t.bi_valid > 8) {
        x(t, t.bi_buf);
    } else if (t.bi_valid > 0) {
        t.pending_buf[t.pending++] = t.bi_buf;
    }
    t.bi_buf = 0;
    t.bi_valid = 0;
};
let S = (t, e, a, depth)=>{
    let n = 2 * e;
    let r = 2 * a;
    return t[n] < t[r] || t[n] === t[r] && depth[e] <= depth[a];
};
let D = (t, e, a)=>{
    let i = t.heap[a];
    let n = a << 1;
    while(n <= t.heap_len && (n < t.heap_len && S(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !S(e, i, t.heap[n], t.depth))){
        t.heap[a] = t.heap[n];
        a = n;
        n <<= 1;
    }
    t.heap[a] = i;
};
let T = (t, e, a)=>{
    let i;
    let n;
    let r;
    let s;
    let l = 0;
    if (t.sym_next !== 0) {
        do {
            i = (255 & t.pending_buf[t.sym_buf + l++]) + ((255 & t.pending_buf[t.sym_buf + l++]) << 8);
            n = t.pending_buf[t.sym_buf + l++];
            if (i === 0) {
                A(t, n, e);
            } else {
                A(t, (r = m[n]) + 256 + 1, e);
                if ((s = d[r]) !== 0) {
                    z(t, n -= g[r], s);
                }
                A(t, r = y(--i), a);
                if ((s = _[r]) !== 0) {
                    z(t, i -= p[r], s);
                }
            }
        }while (l < t.sym_next)
    }
    A(t, 256, e);
};
let B = (t, e)=>{
    let a;
    let i;
    let n;
    let e_dyn_tree = e.dyn_tree;
    let static_tree = e.stat_desc.static_tree;
    let has_stree = e.stat_desc.has_stree;
    let elems = e.stat_desc.elems;
    let d = -1;
    a = 0;
    t.heap_len = 0;
    for(t.heap_max = h; a < elems; a++){
        if (e_dyn_tree[2 * a] !== 0) {
            t.heap[++t.heap_len] = d = a;
            t.depth[a] = 0;
        } else {
            e_dyn_tree[2 * a + 1] = 0;
        }
    }
    while(t.heap_len < 2){
        e_dyn_tree[2 * (n = t.heap[++t.heap_len] = d < 2 ? ++d : 0)] = 1;
        t.depth[n] = 0;
        t.opt_len--;
        if (has_stree) {
            t.static_len -= static_tree[2 * n + 1];
        }
    }
    e.max_code = d;
    for(a = t.heap_len >> 1; a >= 1; a--){
        D(t, e_dyn_tree, a);
    }
    n = elems;
    do {
        a = t.heap[1];
        t.heap[1] = t.heap[t.heap_len--];
        D(t, e_dyn_tree, 1);
        i = t.heap[1];
        t.heap[--t.heap_max] = a;
        t.heap[--t.heap_max] = i;
        e_dyn_tree[2 * n] = e_dyn_tree[2 * a] + e_dyn_tree[2 * i];
        t.depth[n] = (t.depth[a] >= t.depth[i] ? t.depth[a] : t.depth[i]) + 1;
        e_dyn_tree[2 * a + 1] = e_dyn_tree[2 * i + 1] = n;
        t.heap[1] = n++;
        D(t, e_dyn_tree, 1);
    }while (t.heap_len >= 2)
    t.heap[--t.heap_max] = t.heap[1];
    ((t, e)=>{
        let a;
        let i;
        let n;
        let r;
        let s;
        let l;
        let e_dyn_tree = e.dyn_tree;
        let e_max_code = e.max_code;
        let static_tree = e.stat_desc.static_tree;
        let has_stree = e.stat_desc.has_stree;
        let extra_bits = e.stat_desc.extra_bits;
        let extra_base = e.stat_desc.extra_base;
        let max_length = e.stat_desc.max_length;
        let b = 0;
        for(r = 0; r <= 15; r++){
            t.bl_count[r] = 0;
        }
        e_dyn_tree[2 * t.heap[t.heap_max] + 1] = 0;
        for(a = t.heap_max + 1; a < h; a++){
            if ((r = e_dyn_tree[2 * e_dyn_tree[2 * (i = t.heap[a]) + 1] + 1] + 1) > max_length) {
                r = max_length;
                b++;
            }
            e_dyn_tree[2 * i + 1] = r;
            if (!(i > e_max_code)) {
                t.bl_count[r]++;
                s = 0;
                if (i >= extra_base) {
                    s = extra_bits[i - extra_base];
                }
                l = e_dyn_tree[2 * i];
                t.opt_len += l * (r + s);
                if (has_stree) {
                    t.static_len += l * (static_tree[2 * i + 1] + s);
                }
            }
        }
        if (b !== 0) {
            do {
                for(r = max_length - 1; t.bl_count[r] === 0;){
                    r--;
                }
                t.bl_count[r]--;
                t.bl_count[r + 1] += 2;
                t.bl_count[max_length]--;
                b -= 2;
            }while (b > 0)
            for(r = max_length; r !== 0; r--){
                for(i = t.bl_count[r]; i !== 0;){
                    if (!((n = t.heap[--a]) > e_max_code)) {
                        if (e_dyn_tree[2 * n + 1] !== r) {
                            t.opt_len += (r - e_dyn_tree[2 * n + 1]) * e_dyn_tree[2 * n];
                            e_dyn_tree[2 * n + 1] = r;
                        }
                        i--;
                    }
                }
            }
        }
    })(t, e);
    R(e_dyn_tree, d, t.bl_count);
};
let O = (t, e, max_code)=>{
    let i;
    let n;
    let r = -1;
    let s = e[1];
    let l = 0;
    let o = 7;
    let h = 4;
    if (s === 0) {
        o = 138;
        h = 3;
    }
    e[(max_code + 1) * 2 + 1] = 65535;
    for(i = 0; i <= max_code; i++){
        n = s;
        s = e[(i + 1) * 2 + 1];
        if (!(++l < o && n === s)) {
            if (l < h) {
                t.bl_tree[2 * n] += l;
            } else if (n !== 0) {
                if (n !== r) {
                    t.bl_tree[2 * n]++;
                }
                t.bl_tree[32]++;
            } else if (l <= 10) {
                t.bl_tree[34]++;
            } else {
                t.bl_tree[36]++;
            }
            l = 0;
            r = n;
            if (s === 0) {
                o = 138;
                h = 3;
            } else if (n === s) {
                o = 6;
                h = 3;
            } else {
                o = 7;
                h = 4;
            }
        }
    }
};
let C = (t, e, a)=>{
    let i;
    let n;
    let r = -1;
    let s = e[1];
    let l = 0;
    let o = 7;
    let h = 4;
    if (s === 0) {
        o = 138;
        h = 3;
    }
    for(i = 0; i <= a; i++){
        n = s;
        s = e[(i + 1) * 2 + 1];
        if (!(++l < o) || n !== s) {
            if (l < h) {
                do {
                    A(t, n, t.bl_tree);
                }while (--l != 0)
            } else {
                if (n !== 0) {
                    if (n !== r) {
                        A(t, n, t.bl_tree);
                        l--;
                    }
                    A(t, 16, t.bl_tree);
                    z(t, l - 3, 2);
                } else if (l <= 10) {
                    A(t, 17, t.bl_tree);
                    z(t, l - 3, 3);
                } else {
                    A(t, 18, t.bl_tree);
                    z(t, l - 11, 7);
                }
            }
            l = 0;
            r = n;
            if (s === 0) {
                o = 138;
                h = 3;
            } else if (n === s) {
                o = 6;
                h = 3;
            } else {
                o = 7;
                h = 4;
            }
        }
    }
};
let I = false;
let _tr_stored_block_1 = (t, e, a, i)=>{
    z(t, 0 + +!!i, 3);
    Z(t);
    x(t, a);
    x(t, ~a);
    if (a) {
        t.pending_buf.set(t.window.subarray(e, e + a), t.pending);
    }
    t.pending += a;
};
const F = {
    _tr_init: (t)=>{
        if (!I) {
            (()=>{
                let t;
                let e;
                let a;
                let s;
                let l;
                let o = Array(16);
                s = 0;
                for(a = 0; s < 28; s++){
                    t = 0;
                    for(g[s] = a; t < 1 << d[s]; t++){
                        m[a++] = s;
                    }
                }
                m[a - 1] = s;
                l = 0;
                for(s = 0; s < 16; s++){
                    t = 0;
                    for(p[s] = l; t < 1 << _[s]; t++){
                        b[l++] = s;
                    }
                }
                for(l >>= 7; s < 30; s++){
                    t = 0;
                    for(p[s] = l << 7; t < 1 << _[s] - 7; t++){
                        b[256 + l++] = s;
                    }
                }
                for(e = 0; e <= 15; e++){
                    o[e] = 0;
                }
                for(t = 0; t <= 143;){
                    c[2 * t + 1] = 8;
                    t++;
                    o[8]++;
                }
                while(t <= 255){
                    c[2 * t + 1] = 9;
                    t++;
                    o[9]++;
                }
                while(t <= 279){
                    c[2 * t + 1] = 7;
                    t++;
                    o[7]++;
                }
                while(t <= 287){
                    c[2 * t + 1] = 8;
                    t++;
                    o[8]++;
                }
                R(c, 287, o);
                for(t = 0; t < 30; t++){
                    w[2 * t + 1] = 5;
                    w[2 * t] = E(t, 5);
                }
                i = new k(c, d, 257, 286, 15);
                n = new k(w, _, 0, 30, 15);
                r = new k([], f, 0, 19, 7);
            })();
            I = true;
        }
        t.l_desc = new v(t.dyn_ltree, i);
        t.d_desc = new v(t.dyn_dtree, n);
        t.bl_desc = new v(t.bl_tree, r);
        t.bi_buf = 0;
        t.bi_valid = 0;
        U(t);
    },
    _tr_stored_block: _tr_stored_block_1,
    _tr_flush_block: (t, e, a, i)=>{
        let n;
        let r;
        let s = 0;
        if (t.level > 0) {
            if (t.strm.data_type === 2) {
                t.strm.data_type = ((t)=>{
                    let e;
                    let a = 4093624447;
                    for(e = 0; e <= 31; e++, a >>>= 1){
                        if (1 & a && t.dyn_ltree[2 * e] !== 0) {
                            return 0;
                        }
                    }
                    if (t.dyn_ltree[18] !== 0 || t.dyn_ltree[20] !== 0 || t.dyn_ltree[26] !== 0) {
                        return 1;
                    }
                    for(e = 32; e < 256; e++){
                        if (t.dyn_ltree[2 * e] !== 0) {
                            return 1;
                        }
                    }
                    return 0;
                })(t);
            }
            B(t, t.l_desc);
            B(t, t.d_desc);
            s = ((t)=>{
                let e;
                O(t, t.dyn_ltree, t.l_desc.max_code);
                O(t, t.dyn_dtree, t.d_desc.max_code);
                B(t, t.bl_desc);
                for(e = 18; e >= 3 && t.bl_tree[2 * u[e] + 1] === 0; e--);
                t.opt_len += 3 * (e + 1) + 5 + 5 + 4;
                return e;
            })(t);
            n = t.opt_len + 3 + 7 >>> 3;
            if ((r = t.static_len + 3 + 7 >>> 3) <= n) {
                n = r;
            }
        } else {
            n = r = a + 5;
        }
        if (a + 4 <= n && e !== -1) {
            _tr_stored_block_1(t, e, a, i);
        } else if (t.strategy === 4 || r === n) {
            z(t, 2 + +!!i, 3);
            T(t, c, w);
        } else {
            z(t, 4 + +!!i, 3);
            ((t, e, a, i)=>{
                let n;
                z(t, e - 257, 5);
                z(t, a - 1, 5);
                z(t, i - 4, 4);
                for(n = 0; n < i; n++){
                    z(t, t.bl_tree[2 * u[n] + 1], 3);
                }
                C(t, t.dyn_ltree, e - 1);
                C(t, t.dyn_dtree, a - 1);
            })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1);
            T(t, t.dyn_ltree, t.dyn_dtree);
        }
        U(t);
        if (i) {
            Z(t);
        }
    },
    _tr_tally: (t, e, a)=>{
        t.pending_buf[t.sym_buf + t.sym_next++] = e;
        t.pending_buf[t.sym_buf + t.sym_next++] = e >> 8;
        t.pending_buf[t.sym_buf + t.sym_next++] = a;
        if (e === 0) {
            t.dyn_ltree[2 * a]++;
        } else {
            t.matches++;
            e--;
            t.dyn_ltree[(m[a] + 256 + 1) * 2]++;
            t.dyn_dtree[2 * y(e)]++;
        }
        return t.sym_next === t.sym_end;
    },
    _tr_align: (t)=>{
        z(t, 2, 3);
        A(t, 256, c);
        ((t)=>{
            if (t.bi_valid === 16) {
                x(t, t.bi_buf);
                t.bi_buf = 0;
                t.bi_valid = 0;
            } else if (t.bi_valid >= 8) {
                t.pending_buf[t.pending++] = 255 & t.bi_buf;
                t.bi_buf >>= 8;
                t.bi_valid -= 8;
            }
        })(t);
    }
};
const L = (t, e, a, i)=>{
    let n = 65535 & t;
    let r = t >>> 16 & 65535;
    let s = 0;
    while(a !== 0){
        s = a > 2000 ? 2000 : a;
        a -= s;
        do {
            r = r + (n = n + e[i++] | 0) | 0;
        }while (--s)
        n %= 65521;
        r %= 65521;
    }
    return n | r << 16;
};
let H = new Uint32Array((()=>{
    let t;
    let e = [];
    for(var a = 0; a < 256; a++){
        t = a;
        for(var i = 0; i < 8; i++){
            t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
        }
        e[a] = t;
    }
    return e;
})());
const M = (t, e, a, i)=>{
    let n = i + a;
    t ^= -1;
    for(let a = i; a < n; a++){
        t = t >>> 8 ^ H[(t ^ e[a]) & 255];
    }
    return -1 ^ t;
};
const j = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version"
};
const constants = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
};
let { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = F;
let { Z_NO_FLUSH, Z_PARTIAL_FLUSH, Z_FULL_FLUSH, Z_FINISH, Z_BLOCK, Z_OK, Z_STREAM_END, Z_STREAM_ERROR, Z_DATA_ERROR, Z_BUF_ERROR, Z_DEFAULT_COMPRESSION, Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED, Z_DEFAULT_STRATEGY, Z_UNKNOWN, Z_DEFLATED } = constants;
let tu = 573;
let tc = (t, e)=>{
    t.msg = j[e];
    return e;
};
let tw = (t)=>2 * t - 9 * (t > 4);
let tb = (t)=>{
    let t_length = t.length;
    while(--t_length >= 0){
        t[t_length] = 0;
    }
};
let tm = (t)=>{
    let e;
    let a;
    let i;
    let t_w_size = t.w_size;
    i = e = t.hash_size;
    do {
        a = t.head[--i];
        t.head[i] = a >= t_w_size ? a - t_w_size : 0;
    }while (--e)
    e = t_w_size;
    i = t_w_size;
    do {
        a = t.prev[--i];
        t.prev[i] = a >= t_w_size ? a - t_w_size : 0;
    }while (--e)
};
let tg = (t, ins_h, a)=>(ins_h << t.hash_shift ^ a) & t.hash_mask;
let tp = (t)=>{
    let t_state = t.state;
    let e_pending = t_state.pending;
    if (e_pending > t.avail_out) {
        e_pending = t.avail_out;
    }
    if (e_pending !== 0) {
        t.output.set(t_state.pending_buf.subarray(t_state.pending_out, t_state.pending_out + e_pending), t.next_out);
        t.next_out += e_pending;
        t_state.pending_out += e_pending;
        t.total_out += e_pending;
        t.avail_out -= e_pending;
        t_state.pending -= e_pending;
        if (t_state.pending === 0) {
            t_state.pending_out = 0;
        }
    }
};
let tk = (t, e)=>{
    _tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e);
    t.block_start = t.strstart;
    tp(t.strm);
};
let tv = (t, e)=>{
    t.pending_buf[t.pending++] = e;
};
let ty = (t, e)=>{
    t.pending_buf[t.pending++] = e >>> 8 & 255;
    t.pending_buf[t.pending++] = 255 & e;
};
let tx = (strm, e, a, i)=>{
    let t_avail_in = strm.avail_in;
    if (t_avail_in > i) {
        t_avail_in = i;
    }
    if (t_avail_in === 0) {
        return 0;
    }
    strm.avail_in -= t_avail_in;
    e.set(strm.input.subarray(strm.next_in, strm.next_in + t_avail_in), a);
    if (strm.state.wrap === 1) {
        strm.adler = L(strm.adler, e, t_avail_in, a);
    } else if (strm.state.wrap === 2) {
        strm.adler = M(strm.adler, e, t_avail_in, a);
    }
    strm.next_in += t_avail_in;
    strm.total_in += t_avail_in;
    return t_avail_in;
};
let tz = (t, e)=>{
    let a;
    let i;
    let t_max_chain_length = t.max_chain_length;
    let t_strstart = t.strstart;
    let t_prev_length = t.prev_length;
    let t_nice_match = t.nice_match;
    let o = t.strstart > t.w_size - 262 ? t.strstart - (t.w_size - 262) : 0;
    let t_window = t.window;
    let t_w_mask = t.w_mask;
    let t_prev = t.prev;
    let f = t.strstart + 258;
    let u = t_window[t_strstart + t_prev_length - 1];
    let c = t_window[t_strstart + t_prev_length];
    if (t.prev_length >= t.good_match) {
        t_max_chain_length >>= 2;
    }
    if (t_nice_match > t.lookahead) {
        t_nice_match = t.lookahead;
    }
    do {
        if (t_window[(a = e) + t_prev_length] !== c || t_window[a + t_prev_length - 1] !== u || t_window[a] !== t_window[t_strstart] || t_window[++a] !== t_window[t_strstart + 1]) {
            continue;
        }
        t_strstart += 2;
        a++;
        do ;
        while (t_window[++t_strstart] === t_window[++a] && t_window[++t_strstart] === t_window[++a] && t_window[++t_strstart] === t_window[++a] && t_window[++t_strstart] === t_window[++a] && t_window[++t_strstart] === t_window[++a] && t_window[++t_strstart] === t_window[++a] && t_window[++t_strstart] === t_window[++a] && t_window[++t_strstart] === t_window[++a] && t_strstart < f)
        i = 258 - (f - t_strstart);
        t_strstart = f - 258;
        if (i > t_prev_length) {
            t.match_start = e;
            t_prev_length = i;
            if (i >= t_nice_match) {
                break;
            }
            u = t_window[t_strstart + t_prev_length - 1];
            c = t_window[t_strstart + t_prev_length];
        }
    }while ((e = t_prev[e & t_w_mask]) > o && --t_max_chain_length != 0)
    if (t_prev_length <= t.lookahead) {
        return t_prev_length;
    }
    return t.lookahead;
};
let tA = (t)=>{
    let e;
    let a;
    let i;
    let t_w_size = t.w_size;
    do {
        a = t.window_size - t.lookahead - t.strstart;
        if (t.strstart >= t_w_size + (t_w_size - 262)) {
            t.window.set(t.window.subarray(t_w_size, t_w_size + t_w_size - a), 0);
            t.match_start -= t_w_size;
            t.strstart -= t_w_size;
            t.block_start -= t_w_size;
            if (t.insert > t.strstart) {
                t.insert = t.strstart;
            }
            tm(t);
            a += t_w_size;
        }
        if (t.strm.avail_in === 0) {
            break;
        }
        e = tx(t.strm, t.window, t.strstart + t.lookahead, a);
        t.lookahead += e;
        if (t.lookahead + t.insert >= 3) {
            i = t.strstart - t.insert;
            t.ins_h = t.window[i];
            for(t.ins_h = tg(t, t.ins_h, t.window[i + 1]); t.insert && (t.ins_h = tg(t, t.ins_h, t.window[i + 3 - 1]), t.prev[i & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead + t.insert < 3)););
        }
    }while (t.lookahead < 262 && t.strm.avail_in !== 0)
};
let tE = (t, e)=>{
    let a = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5;
    let i;
    let n;
    let r;
    let s = 0;
    let avail_in = t.strm.avail_in;
    do {
        i = 65535;
        r = t.bi_valid + 42 >> 3;
        if (t.strm.avail_out < r || (r = t.strm.avail_out - r, i > (n = t.strstart - t.block_start) + t.strm.avail_in && (i = n + t.strm.avail_in), i > r && (i = r), i < a && (i === 0 && e !== Z_FINISH || e === Z_NO_FLUSH || i !== n + t.strm.avail_in))) {
            break;
        }
        s = +(e === Z_FINISH && i === n + t.strm.avail_in);
        _tr_stored_block(t, 0, 0, s);
        t.pending_buf[t.pending - 4] = i;
        t.pending_buf[t.pending - 3] = i >> 8;
        t.pending_buf[t.pending - 2] = ~i;
        t.pending_buf[t.pending - 1] = ~i >> 8;
        tp(t.strm);
        if (n) {
            if (n > i) {
                n = i;
            }
            t.strm.output.set(t.window.subarray(t.block_start, t.block_start + n), t.strm.next_out);
            t.strm.next_out += n;
            t.strm.avail_out -= n;
            t.strm.total_out += n;
            t.block_start += n;
            i -= n;
        }
        if (i) {
            tx(t.strm, t.strm.output, t.strm.next_out, i);
            t.strm.next_out += i;
            t.strm.avail_out -= i;
            t.strm.total_out += i;
        }
    }while (s === 0)
    if (avail_in -= t.strm.avail_in) {
        if (avail_in >= t.w_size) {
            t.matches = 2;
            t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0);
            t.strstart = t.w_size;
            t.insert = t.strstart;
        } else {
            if (t.window_size - t.strstart <= avail_in) {
                t.strstart -= t.w_size;
                t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0);
                if (t.matches < 2) {
                    t.matches++;
                }
                if (t.insert > t.strstart) {
                    t.insert = t.strstart;
                }
            }
            t.window.set(t.strm.input.subarray(t.strm.next_in - avail_in, t.strm.next_in), t.strstart);
            t.strstart += avail_in;
            t.insert += avail_in > t.w_size - t.insert ? t.w_size - t.insert : avail_in;
        }
        t.block_start = t.strstart;
    }
    if (t.high_water < t.strstart) {
        t.high_water = t.strstart;
    }
    if (s) {
        return 4;
    }
    if (e !== Z_NO_FLUSH && e !== Z_FINISH && t.strm.avail_in === 0 && t.strstart === t.block_start) {
        return 2;
    }
    r = t.window_size - t.strstart;
    if (t.strm.avail_in > r && t.block_start >= t.w_size) {
        t.block_start -= t.w_size;
        t.strstart -= t.w_size;
        t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0);
        if (t.matches < 2) {
            t.matches++;
        }
        r += t.w_size;
        if (t.insert > t.strstart) {
            t.insert = t.strstart;
        }
    }
    if (r > t.strm.avail_in) {
        r = t.strm.avail_in;
    }
    if (r) {
        tx(t.strm, t.window, t.strstart, r);
        t.strstart += r;
        t.insert += r > t.w_size - t.insert ? t.w_size - t.insert : r;
    }
    if (t.high_water < t.strstart) {
        t.high_water = t.strstart;
    }
    r = t.bi_valid + 42 >> 3;
    a = (r = t.pending_buf_size - r > 65535 ? 65535 : t.pending_buf_size - r) > t.w_size ? t.w_size : r;
    if ((n = t.strstart - t.block_start) >= a || (n || e === Z_FINISH) && e !== Z_NO_FLUSH && t.strm.avail_in === 0 && n <= r) {
        i = n > r ? r : n;
        s = +(e === Z_FINISH && t.strm.avail_in === 0 && i === n);
        _tr_stored_block(t, t.block_start, i, s);
        t.block_start += i;
        tp(t.strm);
    }
    if (s) {
        return 3;
    }
    return 1;
};
let tR = (t, e)=>{
    let a;
    let i;
    while(true){
        if (t.lookahead < 262) {
            tA(t);
            if (t.lookahead < 262 && e === Z_NO_FLUSH) {
                return 1;
            }
            if (t.lookahead === 0) {
                break;
            }
        }
        a = 0;
        if (t.lookahead >= 3) {
            t.ins_h = tg(t, t.ins_h, t.window[t.strstart + 3 - 1]);
            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
            t.head[t.ins_h] = t.strstart;
        }
        if (a !== 0 && t.strstart - a <= t.w_size - 262) {
            t.match_length = tz(t, a);
        }
        if (t.match_length >= 3) {
            i = _tr_tally(t, t.strstart - t.match_start, t.match_length - 3);
            t.lookahead -= t.match_length;
            if (t.match_length <= t.max_lazy_match && t.lookahead >= 3) {
                t.match_length--;
                do {
                    t.strstart++;
                    t.ins_h = tg(t, t.ins_h, t.window[t.strstart + 3 - 1]);
                    a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
                    t.head[t.ins_h] = t.strstart;
                }while (--t.match_length != 0)
                t.strstart++;
            } else {
                t.strstart += t.match_length;
                t.match_length = 0;
                t.ins_h = t.window[t.strstart];
                t.ins_h = tg(t, t.ins_h, t.window[t.strstart + 1]);
            }
        } else {
            i = _tr_tally(t, 0, t.window[t.strstart]);
            t.lookahead--;
            t.strstart++;
        }
        if (i && (tk(t, false), t.strm.avail_out === 0)) {
            return 1;
        }
    }
    t.insert = t.strstart < 2 ? t.strstart : 2;
    if (e === Z_FINISH) {
        tk(t, true);
        if (t.strm.avail_out === 0) {
            return 3;
        }
        return 4;
    }
    if (t.sym_next && (tk(t, false), t.strm.avail_out === 0)) {
        return 1;
    }
    return 2;
};
let tU = (t, e)=>{
    let a;
    let i;
    let n;
    while(true){
        if (t.lookahead < 262) {
            tA(t);
            if (t.lookahead < 262 && e === Z_NO_FLUSH) {
                return 1;
            }
            if (t.lookahead === 0) {
                break;
            }
        }
        a = 0;
        if (t.lookahead >= 3) {
            t.ins_h = tg(t, t.ins_h, t.window[t.strstart + 3 - 1]);
            a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
            t.head[t.ins_h] = t.strstart;
        }
        t.prev_length = t.match_length;
        t.prev_match = t.match_start;
        t.match_length = 2;
        if (a !== 0 && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - 262) {
            t.match_length = tz(t, a);
            if (t.match_length <= 5 && (t.strategy === Z_FILTERED || t.match_length === 3 && t.strstart - t.match_start > 4096)) {
                t.match_length = 2;
            }
        }
        if (t.prev_length >= 3 && t.match_length <= t.prev_length) {
            n = t.strstart + t.lookahead - 3;
            i = _tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - 3);
            t.lookahead -= t.prev_length - 1;
            t.prev_length -= 2;
            do {
                if (++t.strstart <= n) {
                    t.ins_h = tg(t, t.ins_h, t.window[t.strstart + 3 - 1]);
                    a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h];
                    t.head[t.ins_h] = t.strstart;
                }
            }while (--t.prev_length != 0)
            t.match_available = 0;
            t.match_length = 2;
            t.strstart++;
            if (i && (tk(t, false), t.strm.avail_out === 0)) {
                return 1;
            }
        } else if (t.match_available) {
            if (i = _tr_tally(t, 0, t.window[t.strstart - 1])) {
                tk(t, false);
            }
            t.strstart++;
            t.lookahead--;
            if (t.strm.avail_out === 0) {
                return 1;
            }
        } else {
            t.match_available = 1;
            t.strstart++;
            t.lookahead--;
        }
    }
    if (t.match_available) {
        i = _tr_tally(t, 0, t.window[t.strstart - 1]);
        t.match_available = 0;
    }
    t.insert = t.strstart < 2 ? t.strstart : 2;
    if (e === Z_FINISH) {
        tk(t, true);
        if (t.strm.avail_out === 0) {
            return 3;
        }
        return 4;
    }
    if (t.sym_next && (tk(t, false), t.strm.avail_out === 0)) {
        return 1;
    }
    return 2;
};
function tZ(t, e, a, i, n) {
    this.good_length = t;
    this.max_lazy = e;
    this.nice_length = a;
    this.max_chain = i;
    this.func = n;
}
let tS = [
    new tZ(0, 0, 0, 0, tE),
    new tZ(4, 4, 8, 4, tR),
    new tZ(4, 5, 16, 8, tR),
    new tZ(4, 6, 32, 32, tR),
    new tZ(4, 4, 16, 16, tU),
    new tZ(8, 16, 32, 32, tU),
    new tZ(8, 16, 128, 128, tU),
    new tZ(8, 32, 128, 256, tU),
    new tZ(32, 128, 258, 1024, tU),
    new tZ(32, 258, 258, 4096, tU)
];
function tD() {
    this.strm = null;
    this.status = 0;
    this.pending_buf = null;
    this.pending_buf_size = 0;
    this.pending_out = 0;
    this.pending = 0;
    this.wrap = 0;
    this.gzhead = null;
    this.gzindex = 0;
    this.method = Z_DEFLATED;
    this.last_flush = -1;
    this.w_size = 0;
    this.w_bits = 0;
    this.w_mask = 0;
    this.window = null;
    this.window_size = 0;
    this.prev = null;
    this.head = null;
    this.ins_h = 0;
    this.hash_size = 0;
    this.hash_bits = 0;
    this.hash_mask = 0;
    this.hash_shift = 0;
    this.block_start = 0;
    this.match_length = 0;
    this.prev_match = 0;
    this.match_available = 0;
    this.strstart = 0;
    this.match_start = 0;
    this.lookahead = 0;
    this.prev_length = 0;
    this.max_chain_length = 0;
    this.max_lazy_match = 0;
    this.level = 0;
    this.strategy = 0;
    this.good_match = 0;
    this.nice_match = 0;
    this.dyn_ltree = new Uint16Array(2 * tu);
    this.dyn_dtree = new Uint16Array(122);
    this.bl_tree = new Uint16Array(78);
    tb(this.dyn_ltree);
    tb(this.dyn_dtree);
    tb(this.bl_tree);
    this.l_desc = null;
    this.d_desc = null;
    this.bl_desc = null;
    this.bl_count = new Uint16Array(16);
    this.heap = new Uint16Array(573);
    tb(this.heap);
    this.heap_len = 0;
    this.heap_max = 0;
    this.depth = new Uint16Array(573);
    tb(this.depth);
    this.sym_buf = 0;
    this.lit_bufsize = 0;
    this.sym_next = 0;
    this.sym_end = 0;
    this.opt_len = 0;
    this.static_len = 0;
    this.matches = 0;
    this.insert = 0;
    this.bi_buf = 0;
    this.bi_valid = 0;
}
let tT = (t)=>{
    if (!t) {
        return 1;
    }
    let t_state = t.state;
    if (t_state && t_state.strm === t && (t_state.status === 42 || t_state.status === 57 || t_state.status === 69 || t_state.status === 73 || t_state.status === 91 || t_state.status === 103 || t_state.status === 113 || t_state.status === 666)) {
        return 0;
    }
    return 1;
};
const tB = {
    deflateInit2: (t, e, a, i, n, r)=>{
        if (!t) {
            return Z_STREAM_ERROR;
        }
        let s = 1;
        if (e === Z_DEFAULT_COMPRESSION) {
            e = 6;
        }
        if (i < 0) {
            s = 0;
            i = -i;
        } else if (i > 15) {
            s = 2;
            i -= 16;
        }
        if (n < 1 || n > 9 || a !== Z_DEFLATED || i < 8 || i > 15 || e < 0 || e > 9 || r < 0 || r > Z_FIXED || i === 8 && s !== 1) {
            return tc(t, Z_STREAM_ERROR);
        }
        if (i === 8) {
            i = 9;
        }
        let l = new tD;
        t.state = l;
        l.strm = t;
        l.status = 42;
        l.wrap = s;
        l.gzhead = null;
        l.w_bits = i;
        l.w_size = 1 << l.w_bits;
        l.w_mask = l.w_size - 1;
        l.hash_bits = n + 7;
        l.hash_size = 1 << l.hash_bits;
        l.hash_mask = l.hash_size - 1;
        l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3);
        l.window = new Uint8Array(2 * l.w_size);
        l.head = new Uint16Array(l.hash_size);
        l.prev = new Uint16Array(l.w_size);
        l.lit_bufsize = 1 << n + 6;
        l.pending_buf_size = 4 * l.lit_bufsize;
        l.pending_buf = new Uint8Array(l.pending_buf_size);
        l.sym_buf = l.lit_bufsize;
        l.sym_end = (l.lit_bufsize - 1) * 3;
        l.level = e;
        l.strategy = r;
        l.method = a;
        return ((t)=>{
            let e = ((t)=>{
                if (tT(t)) {
                    return tc(t, Z_STREAM_ERROR);
                }
                t.total_in = t.total_out = 0;
                t.data_type = Z_UNKNOWN;
                let t_state = t.state;
                t_state.pending = 0;
                t_state.pending_out = 0;
                if (t_state.wrap < 0) {
                    t_state.wrap = -t_state.wrap;
                }
                t_state.status = t_state.wrap === 2 ? 57 : t_state.wrap ? 42 : 113;
                t.adler = +(t_state.wrap !== 2);
                t_state.last_flush = -2;
                _tr_init(t_state);
                return Z_OK;
            })(t);
            if (e === Z_OK) {
                ((t)=>{
                    t.window_size = 2 * t.w_size;
                    tb(t.head);
                    t.max_lazy_match = tS[t.level].max_lazy;
                    t.good_match = tS[t.level].good_length;
                    t.nice_match = tS[t.level].nice_length;
                    t.max_chain_length = tS[t.level].max_chain;
                    t.strstart = 0;
                    t.block_start = 0;
                    t.lookahead = 0;
                    t.insert = 0;
                    t.match_length = t.prev_length = 2;
                    t.match_available = 0;
                    t.ins_h = 0;
                })(t.state);
            }
            return e;
        })(t);
    },
    deflateSetHeader: (t, e)=>{
        if (tT(t) || t.state.wrap !== 2) {
            return Z_STREAM_ERROR;
        }
        t.state.gzhead = e;
        return Z_OK;
    },
    deflate: (t, e)=>{
        if (tT(t) || e > Z_BLOCK || e < 0) {
            if (t) {
                return tc(t, Z_STREAM_ERROR);
            }
            return Z_STREAM_ERROR;
        }
        let t_state = t.state;
        if (!t.output || t.avail_in !== 0 && !t.input || t_state.status === 666 && e !== Z_FINISH) {
            return tc(t, t.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
        }
        let a_last_flush = t_state.last_flush;
        t_state.last_flush = e;
        if (t_state.pending !== 0) {
            tp(t);
            if (t.avail_out === 0) {
                t_state.last_flush = -1;
                return Z_OK;
            }
        } else if (t.avail_in === 0 && tw(e) <= tw(a_last_flush) && e !== Z_FINISH) {
            return tc(t, Z_BUF_ERROR);
        }
        if (t_state.status === 666 && t.avail_in !== 0) {
            return tc(t, Z_BUF_ERROR);
        }
        if (t_state.status === 42 && t_state.wrap === 0) {
            t_state.status = 113;
        }
        if (t_state.status === 42) {
            let e = Z_DEFLATED + (t_state.w_bits - 8 << 4) << 8;
            e |= (t_state.strategy >= Z_HUFFMAN_ONLY || t_state.level < 2 ? 0 : t_state.level < 6 ? 1 : t_state.level === 6 ? 2 : 3) << 6;
            if (t_state.strstart !== 0) {
                e |= 32;
            }
            ty(t_state, e += 31 - e % 31);
            if (t_state.strstart !== 0) {
                ty(t_state, t.adler >>> 16);
                ty(t_state, 65535 & t.adler);
            }
            t.adler = 1;
            t_state.status = 113;
            tp(t);
            if (t_state.pending !== 0) {
                t_state.last_flush = -1;
                return Z_OK;
            }
        }
        if (t_state.status === 57) {
            t.adler = 0;
            tv(t_state, 31);
            tv(t_state, 139);
            tv(t_state, 8);
            if (t_state.gzhead) {
                tv(t_state, +!!t_state.gzhead.text + 2 * !!t_state.gzhead.hcrc + 4 * !!t_state.gzhead.extra + 8 * !!t_state.gzhead.name + 16 * !!t_state.gzhead.comment);
                tv(t_state, 255 & t_state.gzhead.time);
                tv(t_state, t_state.gzhead.time >> 8 & 255);
                tv(t_state, t_state.gzhead.time >> 16 & 255);
                tv(t_state, t_state.gzhead.time >> 24 & 255);
                tv(t_state, t_state.level === 9 ? 2 : 4 * (t_state.strategy >= Z_HUFFMAN_ONLY || t_state.level < 2));
                tv(t_state, 255 & t_state.gzhead.os);
                if (t_state.gzhead.extra && t_state.gzhead.extra.length) {
                    tv(t_state, 255 & t_state.gzhead.extra.length);
                    tv(t_state, t_state.gzhead.extra.length >> 8 & 255);
                }
                if (t_state.gzhead.hcrc) {
                    t.adler = M(t.adler, t_state.pending_buf, t_state.pending, 0);
                }
                t_state.gzindex = 0;
                t_state.status = 69;
            } else {
                tv(t_state, 0);
                tv(t_state, 0);
                tv(t_state, 0);
                tv(t_state, 0);
                tv(t_state, 0);
                tv(t_state, t_state.level === 9 ? 2 : 4 * (t_state.strategy >= Z_HUFFMAN_ONLY || t_state.level < 2));
                tv(t_state, 3);
                t_state.status = 113;
                tp(t);
                if (t_state.pending !== 0) {
                    t_state.last_flush = -1;
                    return Z_OK;
                }
            }
        }
        if (t_state.status === 69) {
            if (t_state.gzhead.extra) {
                let e = t_state.pending;
                let i = (65535 & t_state.gzhead.extra.length) - t_state.gzindex;
                while(t_state.pending + i > t_state.pending_buf_size){
                    let n = t_state.pending_buf_size - t_state.pending;
                    t_state.pending_buf.set(t_state.gzhead.extra.subarray(t_state.gzindex, t_state.gzindex + n), t_state.pending);
                    t_state.pending = t_state.pending_buf_size;
                    if (t_state.gzhead.hcrc && t_state.pending > e) {
                        t.adler = M(t.adler, t_state.pending_buf, t_state.pending - e, e);
                    }
                    t_state.gzindex += n;
                    tp(t);
                    if (t_state.pending !== 0) {
                        t_state.last_flush = -1;
                        return Z_OK;
                    }
                    e = 0;
                    i -= n;
                }
                let n = new Uint8Array(t_state.gzhead.extra);
                t_state.pending_buf.set(n.subarray(t_state.gzindex, t_state.gzindex + i), t_state.pending);
                t_state.pending += i;
                if (t_state.gzhead.hcrc && t_state.pending > e) {
                    t.adler = M(t.adler, t_state.pending_buf, t_state.pending - e, e);
                }
                t_state.gzindex = 0;
            }
            t_state.status = 73;
        }
        if (t_state.status === 73) {
            if (t_state.gzhead.name) {
                let e;
                let i = t_state.pending;
                do {
                    if (t_state.pending === t_state.pending_buf_size) {
                        if (t_state.gzhead.hcrc && t_state.pending > i) {
                            t.adler = M(t.adler, t_state.pending_buf, t_state.pending - i, i);
                        }
                        tp(t);
                        if (t_state.pending !== 0) {
                            t_state.last_flush = -1;
                            return Z_OK;
                        }
                        i = 0;
                    }
                    e = t_state.gzindex < t_state.gzhead.name.length ? 255 & t_state.gzhead.name.charCodeAt(t_state.gzindex++) : 0;
                    tv(t_state, e);
                }while (e !== 0)
                if (t_state.gzhead.hcrc && t_state.pending > i) {
                    t.adler = M(t.adler, t_state.pending_buf, t_state.pending - i, i);
                }
                t_state.gzindex = 0;
            }
            t_state.status = 91;
        }
        if (t_state.status === 91) {
            if (t_state.gzhead.comment) {
                let e;
                let i = t_state.pending;
                do {
                    if (t_state.pending === t_state.pending_buf_size) {
                        if (t_state.gzhead.hcrc && t_state.pending > i) {
                            t.adler = M(t.adler, t_state.pending_buf, t_state.pending - i, i);
                        }
                        tp(t);
                        if (t_state.pending !== 0) {
                            t_state.last_flush = -1;
                            return Z_OK;
                        }
                        i = 0;
                    }
                    e = t_state.gzindex < t_state.gzhead.comment.length ? 255 & t_state.gzhead.comment.charCodeAt(t_state.gzindex++) : 0;
                    tv(t_state, e);
                }while (e !== 0)
                if (t_state.gzhead.hcrc && t_state.pending > i) {
                    t.adler = M(t.adler, t_state.pending_buf, t_state.pending - i, i);
                }
            }
            t_state.status = 103;
        }
        if (t_state.status === 103) {
            if (t_state.gzhead.hcrc) {
                if (t_state.pending + 2 > t_state.pending_buf_size && (tp(t), t_state.pending !== 0)) {
                    t_state.last_flush = -1;
                    return Z_OK;
                }
                tv(t_state, 255 & t.adler);
                tv(t_state, t.adler >> 8 & 255);
                t.adler = 0;
            }
            t_state.status = 113;
            tp(t);
            if (t_state.pending !== 0) {
                t_state.last_flush = -1;
                return Z_OK;
            }
        }
        if (t.avail_in !== 0 || t_state.lookahead !== 0 || e !== Z_NO_FLUSH && t_state.status !== 666) {
            let i = t_state.level === 0 ? tE(t_state, e) : t_state.strategy === Z_HUFFMAN_ONLY ? ((t_state_1, e)=>{
                let a;
                while(true){
                    if (t_state_1.lookahead === 0 && (tA(t_state_1), t_state_1.lookahead === 0)) {
                        if (e === Z_NO_FLUSH) {
                            return 1;
                        }
                        break;
                    }
                    t_state_1.match_length = 0;
                    a = _tr_tally(t_state_1, 0, t_state_1.window[t_state_1.strstart]);
                    t_state_1.lookahead--;
                    t_state_1.strstart++;
                    if (a && (tk(t_state_1, false), t_state_1.strm.avail_out === 0)) {
                        return 1;
                    }
                }
                t_state_1.insert = 0;
                if (e === Z_FINISH) {
                    tk(t_state_1, true);
                    if (t_state_1.strm.avail_out === 0) {
                        return 3;
                    }
                    return 4;
                }
                if (t_state_1.sym_next && (tk(t_state_1, false), t_state_1.strm.avail_out === 0)) {
                    return 1;
                }
                return 2;
            })(t_state, e) : t_state.strategy === Z_RLE ? ((t_state_1, e)=>{
                let a;
                let i;
                let n;
                let r;
                let t_window = t_state_1.window;
                while(true){
                    if (t_state_1.lookahead <= 258) {
                        tA(t_state_1);
                        if (t_state_1.lookahead <= 258 && e === Z_NO_FLUSH) {
                            return 1;
                        }
                        if (t_state_1.lookahead === 0) {
                            break;
                        }
                    }
                    t_state_1.match_length = 0;
                    if (t_state_1.lookahead >= 3 && t_state_1.strstart > 0 && (i = t_window[n = t_state_1.strstart - 1]) === t_window[++n] && i === t_window[++n] && i === t_window[++n]) {
                        r = t_state_1.strstart + 258;
                        do ;
                        while (i === t_window[++n] && i === t_window[++n] && i === t_window[++n] && i === t_window[++n] && i === t_window[++n] && i === t_window[++n] && i === t_window[++n] && i === t_window[++n] && n < r)
                        t_state_1.match_length = 258 - (r - n);
                        if (t_state_1.match_length > t_state_1.lookahead) {
                            t_state_1.match_length = t_state_1.lookahead;
                        }
                    }
                    if (t_state_1.match_length >= 3) {
                        a = _tr_tally(t_state_1, 1, t_state_1.match_length - 3);
                        t_state_1.lookahead -= t_state_1.match_length;
                        t_state_1.strstart += t_state_1.match_length;
                        t_state_1.match_length = 0;
                    } else {
                        a = _tr_tally(t_state_1, 0, t_state_1.window[t_state_1.strstart]);
                        t_state_1.lookahead--;
                        t_state_1.strstart++;
                    }
                    if (a && (tk(t_state_1, false), t_state_1.strm.avail_out === 0)) {
                        return 1;
                    }
                }
                t_state_1.insert = 0;
                if (e === Z_FINISH) {
                    tk(t_state_1, true);
                    if (t_state_1.strm.avail_out === 0) {
                        return 3;
                    }
                    return 4;
                }
                if (t_state_1.sym_next && (tk(t_state_1, false), t_state_1.strm.avail_out === 0)) {
                    return 1;
                }
                return 2;
            })(t_state, e) : tS[t_state.level].func(t_state, e);
            if (i === 3 || i === 4) {
                t_state.status = 666;
            }
            if (i === 1 || i === 3) {
                if (t.avail_out === 0) {
                    t_state.last_flush = -1;
                }
                return Z_OK;
            }
            if (i === 2 && (e === Z_PARTIAL_FLUSH ? _tr_align(t_state) : e !== Z_BLOCK && (_tr_stored_block(t_state, 0, 0, false), e === Z_FULL_FLUSH && (tb(t_state.head), t_state.lookahead === 0 && (t_state.strstart = 0, t_state.block_start = 0, t_state.insert = 0))), tp(t), t.avail_out === 0)) {
                t_state.last_flush = -1;
                return Z_OK;
            }
        }
        if (e !== Z_FINISH) {
            return Z_OK;
        }
        if (t_state.wrap <= 0) {
            return Z_STREAM_END;
        }
        if (t_state.wrap === 2) {
            tv(t_state, 255 & t.adler);
            tv(t_state, t.adler >> 8 & 255);
            tv(t_state, t.adler >> 16 & 255);
            tv(t_state, t.adler >> 24 & 255);
            tv(t_state, 255 & t.total_in);
            tv(t_state, t.total_in >> 8 & 255);
            tv(t_state, t.total_in >> 16 & 255);
            tv(t_state, t.total_in >> 24 & 255);
        } else {
            ty(t_state, t.adler >>> 16);
            ty(t_state, 65535 & t.adler);
        }
        tp(t);
        if (t_state.wrap > 0) {
            t_state.wrap = -t_state.wrap;
        }
        if (t_state.pending !== 0) {
            return Z_OK;
        }
        return Z_STREAM_END;
    },
    deflateEnd: (t)=>{
        if (tT(t)) {
            return Z_STREAM_ERROR;
        }
        let status = t.state.status;
        t.state = null;
        if (status === 113) {
            return tc(t, Z_DATA_ERROR);
        }
        return Z_OK;
    },
    deflateSetDictionary: (t, e)=>{
        let e_length = e.length;
        if (tT(t)) {
            return Z_STREAM_ERROR;
        }
        let t_state = t.state;
        let i_wrap = t_state.wrap;
        if (i_wrap === 2 || i_wrap === 1 && t_state.status !== 42 || t_state.lookahead) {
            return Z_STREAM_ERROR;
        }
        if (i_wrap === 1) {
            t.adler = L(t.adler, e, e_length, 0);
        }
        t_state.wrap = 0;
        if (e_length >= t_state.w_size) {
            if (i_wrap === 0) {
                tb(t_state.head);
                t_state.strstart = 0;
                t_state.block_start = 0;
                t_state.insert = 0;
            }
            let t = new Uint8Array(t_state.w_size);
            t.set(e.subarray(e_length - t_state.w_size, e_length), 0);
            e = t;
            e_length = t_state.w_size;
        }
        let t_avail_in = t.avail_in;
        let t_next_in = t.next_in;
        let t_input = t.input;
        t.avail_in = e_length;
        t.next_in = 0;
        t.input = e;
        tA(t_state);
        while(t_state.lookahead >= 3){
            let t = t_state.strstart;
            let e = t_state.lookahead - 2;
            do {
                t_state.ins_h = tg(t_state, t_state.ins_h, t_state.window[t + 3 - 1]);
                t_state.prev[t & t_state.w_mask] = t_state.head[t_state.ins_h];
                t_state.head[t_state.ins_h] = t;
                t++;
            }while (--e)
            t_state.strstart = t;
            t_state.lookahead = 2;
            tA(t_state);
        }
        t_state.strstart += t_state.lookahead;
        t_state.block_start = t_state.strstart;
        t_state.insert = t_state.lookahead;
        t_state.lookahead = 0;
        t_state.match_length = t_state.prev_length = 2;
        t_state.match_available = 0;
        t.next_in = t_next_in;
        t.input = t_input;
        t.avail_in = t_avail_in;
        t_state.wrap = i_wrap;
        return Z_OK;
    }
};
let tO = (t, e)=>Object.prototype.hasOwnProperty.call(t, e);
const tC = {
    assign: function(t) {
        let e = Array.prototype.slice.call(arguments, 1);
        while(e.length){
            let a = e.shift();
            if (a) {
                if (typeof a !== "object") {
                    throw TypeError(`${a}must be non-object`);
                }
                for(let e in a){
                    if (tO(a, e)) {
                        t[e] = a[e];
                    }
                }
            }
        }
        return t;
    },
    flattenChunks: (t)=>{
        let e = 0;
        for(let a = 0, i = t.length; a < i; a++){
            e += t[a].length;
        }
        let a = new Uint8Array(e);
        for(let e = 0, i = 0, n = t.length; e < n; e++){
            let n = t[e];
            a.set(n, i);
            i += n.length;
        }
        return a;
    }
};
let tI = true;
try {
    String.fromCharCode.apply(null, new Uint8Array(1));
} catch (t) {
    tI = false;
}
let tN = new Uint8Array(256);
for(let t = 0; t < 256; t++){
    tN[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
}
tN[254] = tN[254] = 1;
const tF = {
    string2buf: (t)=>{
        if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
            return new TextEncoder().encode(t);
        }
        let e;
        let a;
        let i;
        let n;
        let r;
        let t_length = t.length;
        let l = 0;
        for(n = 0; n < t_length; n++){
            if ((64512 & (a = t.charCodeAt(n))) == 55296 && n + 1 < t_length && (64512 & (i = t.charCodeAt(n + 1))) == 56320) {
                a = 65536 + (a - 55296 << 10) + (i - 56320);
                n++;
            }
            l += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
        }
        r = 0;
        e = new Uint8Array(l);
        for(n = 0; r < l; n++){
            if ((64512 & (a = t.charCodeAt(n))) == 55296 && n + 1 < t_length && (64512 & (i = t.charCodeAt(n + 1))) == 56320) {
                a = 65536 + (a - 55296 << 10) + (i - 56320);
                n++;
            }
            if (a < 128) {
                e[r++] = a;
            } else {
                if (a < 2048) {
                    e[r++] = 192 | a >>> 6;
                } else {
                    if (a < 65536) {
                        e[r++] = 224 | a >>> 12;
                    } else {
                        e[r++] = 240 | a >>> 18;
                        e[r++] = 128 | a >>> 12 & 63;
                    }
                    e[r++] = 128 | a >>> 6 & 63;
                }
                e[r++] = 128 | 63 & a;
            }
        }
        return e;
    },
    buf2string: (t, e)=>{
        let a;
        let i;
        let n = e || t.length;
        if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
            return new TextDecoder().decode(t.subarray(0, e));
        }
        let r = Array(2 * n);
        i = 0;
        for(a = 0; a < n;){
            let e = t[a++];
            if (e < 128) {
                r[i++] = e;
                continue;
            }
            let s = tN[e];
            if (s > 4) {
                r[i++] = 65533;
                a += s - 1;
                continue;
            }
            for(e &= s === 2 ? 31 : s === 3 ? 15 : 7; s > 1 && a < n;){
                e = e << 6 | 63 & t[a++];
                s--;
            }
            if (s > 1) {
                r[i++] = 65533;
                continue;
            }
            if (e < 65536) {
                r[i++] = e;
            } else {
                e -= 65536;
                r[i++] = 55296 | e >> 10 & 1023;
                r[i++] = 56320 | 1023 & e;
            }
        }
        return ((t, e)=>{
            if (e < 65534 && t.subarray && tI) {
                return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
            }
            let a = "";
            for(let i = 0; i < e; i++){
                a += String.fromCharCode(t[i]);
            }
            return a;
        })(r, i);
    },
    utf8border: (t, e)=>{
        if ((e = e || t.length) > t.length) {
            e = t.length;
        }
        let a = e - 1;
        while(a >= 0 && (192 & t[a]) == 128){
            a--;
        }
        if (a < 0 || a === 0) {
            return e;
        }
        if (a + tN[t[a]] > e) {
            return a;
        }
        return e;
    }
};
const tL = function() {
    this.input = null;
    this.next_in = 0;
    this.avail_in = 0;
    this.total_in = 0;
    this.output = null;
    this.next_out = 0;
    this.avail_out = 0;
    this.total_out = 0;
    this.msg = "";
    this.state = null;
    this.data_type = 2;
    this.adler = 0;
};
let toString = Object.prototype.toString;
let { Z_NO_FLUSH: Z_NO_FLUSH_1, Z_SYNC_FLUSH, Z_FULL_FLUSH: Z_FULL_FLUSH_1, Z_FINISH: Z_FINISH_1, Z_OK: Z_OK_1, Z_STREAM_END: Z_STREAM_END_1, Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION_1, Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY_1, Z_DEFLATED: Z_DEFLATED_1 } = constants;
class tJ {
    constructor(t){
        this.options = tC.assign({
            level: Z_DEFAULT_COMPRESSION_1,
            method: Z_DEFLATED_1,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: Z_DEFAULT_STRATEGY_1
        }, t || {});
        let e = this.options;
        if (e.raw && e.windowBits > 0) {
            e.windowBits = -e.windowBits;
        } else if (e.gzip && e.windowBits > 0 && e.windowBits < 16) {
            e.windowBits += 16;
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new tL;
        this.strm.avail_out = 0;
        let a = tB.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
        if (a !== Z_OK_1) {
            throw Error(j[a]);
        }
        if (e.header) {
            tB.deflateSetHeader(this.strm, e.header);
        }
        if (e.dictionary) {
            let t;
            t = typeof e.dictionary === "string" ? tF.string2buf(e.dictionary) : toString.call(e.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(e.dictionary) : e.dictionary;
            if ((a = tB.deflateSetDictionary(this.strm, t)) !== Z_OK_1) {
                throw Error(j[a]);
            }
            this._dict_set = true;
        }
    }
    push(t, e) {
        let a;
        let i;
        let strm = this.strm;
        let chunkSize = this.options.chunkSize;
        if (this.ended) {
            return false;
        }
        i = e === ~~e ? e : e === true ? Z_FINISH_1 : Z_NO_FLUSH_1;
        if (typeof t === "string") {
            strm.input = tF.string2buf(t);
        } else if (toString.call(t) === "[object ArrayBuffer]") {
            strm.input = new Uint8Array(t);
        } else {
            strm.input = t;
        }
        strm.next_in = 0;
        for(strm.avail_in = strm.input.length;;){
            if (strm.avail_out === 0) {
                strm.output = new Uint8Array(chunkSize);
                strm.next_out = 0;
                strm.avail_out = chunkSize;
            }
            if ((i === Z_SYNC_FLUSH || i === Z_FULL_FLUSH_1) && strm.avail_out <= 6) {
                this.onData(strm.output.subarray(0, strm.next_out));
                strm.avail_out = 0;
                continue;
            }
            if ((a = tB.deflate(strm, i)) === Z_STREAM_END_1) {
                if (strm.next_out > 0) {
                    this.onData(strm.output.subarray(0, strm.next_out));
                }
                a = tB.deflateEnd(this.strm);
                this.onEnd(a);
                this.ended = true;
                return a === Z_OK_1;
            }
            if (strm.avail_out === 0) {
                this.onData(strm.output);
                continue;
            }
            if (i > 0 && strm.next_out > 0) {
                this.onData(strm.output.subarray(0, strm.next_out));
                strm.avail_out = 0;
                continue;
            }
            if (strm.avail_in === 0) {
                break;
            }
        }
        return true;
    }
    onData(t) {
        this.chunks.push(t);
    }
    onEnd(t) {
        if (t === Z_OK_1) {
            this.result = tC.flattenChunks(this.chunks);
        }
        this.chunks = [];
        this.err = t;
        this.msg = this.strm.msg;
    }
}
function deflate_1(t, e) {
    let a = new tJ(e);
    a.push(t, true);
    if (a.err) {
        throw a.msg || j[a.err];
    }
    return a.result;
}
const tV = (t, e)=>{
    let a;
    let i;
    let n;
    let r;
    let s;
    let l;
    let o;
    let h;
    let d;
    let _;
    let f;
    let u;
    let c;
    let w;
    let b;
    let m;
    let g;
    let p;
    let k;
    let v;
    let y;
    let x;
    let z;
    let A;
    let t_state = t.state;
    a = t.next_in;
    z = t.input;
    i = a + (t.avail_in - 5);
    n = t.next_out;
    A = t.output;
    r = n - (e - t.avail_out);
    s = n + (t.avail_out - 257);
    l = t_state.dmax;
    o = t_state.wsize;
    h = t_state.whave;
    d = t_state.wnext;
    _ = t_state.window;
    f = t_state.hold;
    u = t_state.bits;
    c = t_state.lencode;
    w = t_state.distcode;
    b = (1 << t_state.lenbits) - 1;
    m = (1 << t_state.distbits) - 1;
    t: do {
        if (u < 15) {
            f += z[a++] << u;
            u += 8;
            f += z[a++] << u;
            u += 8;
        }
        for(g = c[f & b];;){
            f >>>= p = g >>> 24;
            u -= p;
            if ((p = g >>> 16 & 255) == 0) {
                A[n++] = 65535 & g;
            } else if (16 & p) {
                k = 65535 & g;
                if (p &= 15) {
                    if (u < p) {
                        f += z[a++] << u;
                        u += 8;
                    }
                    k += f & (1 << p) - 1;
                    f >>>= p;
                    u -= p;
                }
                if (u < 15) {
                    f += z[a++] << u;
                    u += 8;
                    f += z[a++] << u;
                    u += 8;
                }
                for(g = w[f & m];;){
                    f >>>= p = g >>> 24;
                    u -= p;
                    if (16 & (p = g >>> 16 & 255)) {
                        v = 65535 & g;
                        if (u < (p &= 15)) {
                            f += z[a++] << u;
                            if ((u += 8) < p) {
                                f += z[a++] << u;
                                u += 8;
                            }
                        }
                        if ((v += f & (1 << p) - 1) > l) {
                            t.msg = "invalid distance too far back";
                            t_state.mode = 16209;
                            break t;
                        }
                        f >>>= p;
                        u -= p;
                        if (v > (p = n - r)) {
                            if ((p = v - p) > h && t_state.sane) {
                                t.msg = "invalid distance too far back";
                                t_state.mode = 16209;
                                break t;
                            }
                            y = 0;
                            x = _;
                            if (d === 0) {
                                y += o - p;
                                if (p < k) {
                                    k -= p;
                                    do {
                                        A[n++] = _[y++];
                                    }while (--p)
                                    y = n - v;
                                    x = A;
                                }
                            } else if (d < p) {
                                y += o + d - p;
                                if ((p -= d) < k) {
                                    k -= p;
                                    do {
                                        A[n++] = _[y++];
                                    }while (--p)
                                    y = 0;
                                    if (d < k) {
                                        k -= p = d;
                                        do {
                                            A[n++] = _[y++];
                                        }while (--p)
                                        y = n - v;
                                        x = A;
                                    }
                                }
                            } else {
                                y += d - p;
                                if (p < k) {
                                    k -= p;
                                    do {
                                        A[n++] = _[y++];
                                    }while (--p)
                                    y = n - v;
                                    x = A;
                                }
                            }
                            while(k > 2){
                                A[n++] = x[y++];
                                A[n++] = x[y++];
                                A[n++] = x[y++];
                                k -= 3;
                            }
                            if (k) {
                                A[n++] = x[y++];
                                if (k > 1) {
                                    A[n++] = x[y++];
                                }
                            }
                        } else {
                            y = n - v;
                            do {
                                A[n++] = A[y++];
                                A[n++] = A[y++];
                                A[n++] = A[y++];
                                k -= 3;
                            }while (k > 2)
                            if (k) {
                                A[n++] = A[y++];
                                if (k > 1) {
                                    A[n++] = A[y++];
                                }
                            }
                        }
                    } else if ((64 & p) == 0) {
                        g = w[(65535 & g) + (f & (1 << p) - 1)];
                        continue;
                    } else {
                        t.msg = "invalid distance code";
                        t_state.mode = 16209;
                        break t;
                    }
                    break;
                }
            } else if ((64 & p) == 0) {
                g = c[(65535 & g) + (f & (1 << p) - 1)];
                continue;
            } else if (32 & p) {
                t_state.mode = 16191;
                break t;
            } else {
                t.msg = "invalid literal/length code";
                t_state.mode = 16209;
                break t;
            }
            break;
        }
    }while (a < i && n < s)
    a -= k = u >> 3;
    u -= k << 3;
    f &= (1 << u) - 1;
    t.next_in = a;
    t.next_out = n;
    t.avail_in = a < i ? 5 + (i - a) : 5 - (a - i);
    t.avail_out = n < s ? 257 + (s - n) : 257 - (n - s);
    t_state.hold = f;
    t_state.bits = u;
};
let t$ = new Uint16Array([
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    15,
    17,
    19,
    23,
    27,
    31,
    35,
    43,
    51,
    59,
    67,
    83,
    99,
    115,
    131,
    163,
    195,
    227,
    258,
    0,
    0
]);
let t1 = new Uint8Array([
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    16,
    72,
    78
]);
let t0 = new Uint16Array([
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    13,
    17,
    25,
    33,
    49,
    65,
    97,
    129,
    193,
    257,
    385,
    513,
    769,
    1025,
    1537,
    2049,
    3073,
    4097,
    6145,
    8193,
    12289,
    16385,
    24577,
    0,
    0
]);
let t2 = new Uint8Array([
    16,
    16,
    16,
    16,
    17,
    17,
    18,
    18,
    19,
    19,
    20,
    20,
    21,
    21,
    22,
    22,
    23,
    23,
    24,
    24,
    25,
    25,
    26,
    26,
    27,
    27,
    28,
    28,
    29,
    29,
    64,
    64
]);
const t5 = (t, lens, a, i, n, r, work, l)=>{
    let o;
    let h;
    let d;
    let _;
    let f;
    let u;
    let c;
    let w;
    let b;
    let l_bits = l.bits;
    let g = 0;
    let p = 0;
    let k = 0;
    let v = 0;
    let y = 0;
    let x = 0;
    let z = 0;
    let A = 0;
    let E = 0;
    let R = 0;
    let U = null;
    let Z = new Uint16Array(16);
    let S = new Uint16Array(16);
    let D = null;
    for(g = 0; g <= 15; g++){
        Z[g] = 0;
    }
    for(p = 0; p < i; p++){
        Z[lens[a + p]]++;
    }
    v = 15;
    for(y = l_bits; v >= 1 && Z[v] === 0; v--);
    if (y > v) {
        y = v;
    }
    if (v === 0) {
        n[r++] = 20971520;
        n[r++] = 20971520;
        l.bits = 1;
        return 0;
    }
    for(k = 1; k < v && Z[k] === 0; k++);
    if (y < k) {
        y = k;
    }
    A = 1;
    for(g = 1; g <= 15; g++){
        A <<= 1;
        if ((A -= Z[g]) < 0) {
            return -1;
        }
    }
    if (A > 0 && (t === 0 || v !== 1)) {
        return -1;
    }
    g = 1;
    for(S[1] = 0; g < 15; g++){
        S[g + 1] = S[g] + Z[g];
    }
    for(p = 0; p < i; p++){
        if (lens[a + p] !== 0) {
            work[S[lens[a + p]]++] = p;
        }
    }
    switch(t){
        case 0:
            D = work;
            U = work;
            u = 20;
            break;
        case 1:
            U = t$;
            D = t1;
            u = 257;
            break;
        default:
            U = t0;
            D = t2;
            u = 0;
    }
    R = 0;
    p = 0;
    g = k;
    f = r;
    x = y;
    z = 0;
    d = -1;
    _ = (E = 1 << y) - 1;
    if (t === 1 && E > 852 || t === 2 && E > 592) {
        return 1;
    }
    while(true){
        c = g - z;
        if (work[p] + 1 < u) {
            w = 0;
            b = work[p];
        } else if (work[p] >= u) {
            w = D[work[p] - u];
            b = U[work[p] - u];
        } else {
            w = 96;
            b = 0;
        }
        o = 1 << g - z;
        k = h = 1 << x;
        do {
            n[f + (R >> z) + (h -= o)] = c << 24 | w << 16 | b;
        }while (h !== 0)
        for(o = 1 << g - 1; R & o;){
            o >>= 1;
        }
        if (o !== 0) {
            R &= o - 1;
            R += o;
        } else {
            R = 0;
        }
        p++;
        if (--Z[g] == 0) {
            if (g === v) {
                break;
            }
            g = lens[a + work[p]];
        }
        if (g > y && (R & _) !== d) {
            if (z === 0) {
                z = y;
            }
            f += k;
            for(A = 1 << (x = g - z); x + z < v && !((A -= Z[x + z]) <= 0);){
                x++;
                A <<= 1;
            }
            E += 1 << x;
            if (t === 1 && E > 852 || t === 2 && E > 592) {
                return 1;
            }
            n[d = R & _] = y << 24 | x << 16 | f - r;
        }
    }
    if (R !== 0) {
        n[f + R] = g - z << 24 | 4194304;
    }
    l.bits = y;
    return 0;
};
let { Z_FINISH: Z_FINISH_2, Z_BLOCK: Z_BLOCK_1, Z_TREES, Z_OK: Z_OK_2, Z_STREAM_END: Z_STREAM_END_2, Z_NEED_DICT, Z_STREAM_ERROR: Z_STREAM_ERROR_1, Z_DATA_ERROR: Z_DATA_ERROR_1, Z_MEM_ERROR, Z_BUF_ERROR: Z_BUF_ERROR_1, Z_DEFLATED: Z_DEFLATED_2 } = constants;
let er = (t)=>(t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24);
function es() {
    this.strm = null;
    this.mode = 0;
    this.last = false;
    this.wrap = 0;
    this.havedict = false;
    this.flags = 0;
    this.dmax = 0;
    this.check = 0;
    this.total = 0;
    this.head = null;
    this.wbits = 0;
    this.wsize = 0;
    this.whave = 0;
    this.wnext = 0;
    this.window = null;
    this.hold = 0;
    this.bits = 0;
    this.length = 0;
    this.offset = 0;
    this.extra = 0;
    this.lencode = null;
    this.distcode = null;
    this.lenbits = 0;
    this.distbits = 0;
    this.ncode = 0;
    this.nlen = 0;
    this.ndist = 0;
    this.have = 0;
    this.next = null;
    this.lens = new Uint16Array(320);
    this.work = new Uint16Array(288);
    this.lendyn = null;
    this.distdyn = null;
    this.sane = 0;
    this.back = 0;
    this.was = 0;
}
let el = (t)=>{
    if (!t) {
        return 1;
    }
    let t_state = t.state;
    return +(!t_state || t_state.strm !== t || t_state.mode < 16180 || t_state.mode > 16211);
};
let inflateReset = (t)=>{
    if (el(t)) {
        return Z_STREAM_ERROR_1;
    }
    let t_state = t.state;
    t_state.wsize = 0;
    t_state.whave = 0;
    t_state.wnext = 0;
    return ((t)=>{
        if (el(t)) {
            return Z_STREAM_ERROR_1;
        }
        let t_state = t.state;
        t.total_in = t.total_out = t_state.total = 0;
        t.msg = "";
        if (t_state.wrap) {
            t.adler = 1 & t_state.wrap;
        }
        t_state.mode = 16180;
        t_state.last = 0;
        t_state.havedict = 0;
        t_state.flags = -1;
        t_state.dmax = 32768;
        t_state.head = null;
        t_state.hold = 0;
        t_state.bits = 0;
        t_state.lencode = t_state.lendyn = new Int32Array(852);
        t_state.distcode = t_state.distdyn = new Int32Array(592);
        t_state.sane = 1;
        t_state.back = -1;
        return Z_OK_2;
    })(t);
};
let eh = true;
let ed = (t)=>{
    if (eh) {
        s = new Int32Array(512);
        l = new Int32Array(32);
        let e = 0;
        while(e < 144){
            t.lens[e++] = 8;
        }
        while(e < 256){
            t.lens[e++] = 9;
        }
        while(e < 280){
            t.lens[e++] = 7;
        }
        while(e < 288){
            t.lens[e++] = 8;
        }
        t5(1, t.lens, 0, 288, s, 0, t.work, {
            bits: 9
        });
        for(e = 0; e < 32;){
            t.lens[e++] = 5;
        }
        t5(2, t.lens, 0, 32, l, 0, t.work, {
            bits: 5
        });
        eh = false;
    }
    t.lencode = s;
    t.lenbits = 9;
    t.distcode = l;
    t.distbits = 5;
};
let e_ = (t, e, a, i)=>{
    let n;
    let t_state = t.state;
    if (t_state.window === null) {
        t_state.wsize = 1 << t_state.wbits;
        t_state.wnext = 0;
        t_state.whave = 0;
        t_state.window = new Uint8Array(t_state.wsize);
    }
    if (i >= t_state.wsize) {
        t_state.window.set(e.subarray(a - t_state.wsize, a), 0);
        t_state.wnext = 0;
        t_state.whave = t_state.wsize;
    } else {
        if ((n = t_state.wsize - t_state.wnext) > i) {
            n = i;
        }
        t_state.window.set(e.subarray(a - i, a - i + n), t_state.wnext);
        if (i -= n) {
            t_state.window.set(e.subarray(a - i, a), 0);
            t_state.wnext = i;
            t_state.whave = t_state.wsize;
        } else {
            t_state.wnext += n;
            if (t_state.wnext === t_state.wsize) {
                t_state.wnext = 0;
            }
            if (t_state.whave < t_state.wsize) {
                t_state.whave += n;
            }
        }
    }
    return 0;
};
const ef = {
    inflateReset,
    inflateInit2: (t, e)=>{
        if (!t) {
            return Z_STREAM_ERROR_1;
        }
        let a = new es;
        t.state = a;
        a.strm = t;
        a.window = null;
        a.mode = 16180;
        let i = ((t, e)=>{
            let a;
            if (el(t)) {
                return Z_STREAM_ERROR_1;
            }
            let t_state = t.state;
            if (e < 0) {
                a = 0;
                e = -e;
            } else {
                a = (e >> 4) + 5;
                if (e < 48) {
                    e &= 15;
                }
            }
            if (e && (e < 8 || e > 15)) {
                return Z_STREAM_ERROR_1;
            }
            if (t_state.window !== null && t_state.wbits !== e) {
                t_state.window = null;
            }
            t_state.wrap = a;
            t_state.wbits = e;
            return inflateReset(t);
        })(t, e);
        if (i !== Z_OK_2) {
            t.state = null;
        }
        return i;
    },
    inflate: (t, e)=>{
        let a;
        let i;
        let n;
        let r;
        let s;
        let l;
        let o;
        let h;
        let d;
        let _;
        let f;
        let u;
        let c;
        let w;
        let b;
        let m;
        let g;
        let p;
        let k;
        let v;
        let y;
        let x;
        let z;
        let A;
        let E = 0;
        let R = new Uint8Array(4);
        let U = new Uint8Array([
            16,
            17,
            18,
            0,
            8,
            7,
            9,
            6,
            10,
            5,
            11,
            4,
            12,
            3,
            13,
            2,
            14,
            1,
            15
        ]);
        if (el(t) || !t.output || !t.input && t.avail_in !== 0) {
            return Z_STREAM_ERROR_1;
        }
        if ((a = t.state).mode === 16191) {
            a.mode = 16192;
        }
        s = t.next_out;
        n = t.output;
        o = t.avail_out;
        r = t.next_in;
        i = t.input;
        l = t.avail_in;
        h = a.hold;
        d = a.bits;
        _ = l;
        f = o;
        x = Z_OK_2;
        e: while(true){
            switch(a.mode){
                case 16180:
                    if (a.wrap === 0) {
                        a.mode = 16192;
                        break;
                    }
                    while(d < 16){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    if (2 & a.wrap && h === 35615) {
                        if (a.wbits === 0) {
                            a.wbits = 15;
                        }
                        a.check = 0;
                        R[0] = 255 & h;
                        R[1] = h >>> 8 & 255;
                        a.check = M(a.check, R, 2, 0);
                        h = 0;
                        d = 0;
                        a.mode = 16181;
                        break;
                    }
                    if (a.head) {
                        a.head.done = false;
                    }
                    if (!(1 & a.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {
                        t.msg = "incorrect header check";
                        a.mode = 16209;
                        break;
                    }
                    if ((15 & h) !== Z_DEFLATED_2) {
                        t.msg = "unknown compression method";
                        a.mode = 16209;
                        break;
                    }
                    h >>>= 4;
                    d -= 4;
                    y = (15 & h) + 8;
                    if (a.wbits === 0) {
                        a.wbits = y;
                    }
                    if (y > 15 || y > a.wbits) {
                        t.msg = "invalid window size";
                        a.mode = 16209;
                        break;
                    }
                    a.dmax = 1 << a.wbits;
                    a.flags = 0;
                    t.adler = a.check = 1;
                    a.mode = 512 & h ? 16189 : 16191;
                    h = 0;
                    d = 0;
                    break;
                case 16181:
                    while(d < 16){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    a.flags = h;
                    if ((255 & a.flags) !== Z_DEFLATED_2) {
                        t.msg = "unknown compression method";
                        a.mode = 16209;
                        break;
                    }
                    if (57344 & a.flags) {
                        t.msg = "unknown header flags set";
                        a.mode = 16209;
                        break;
                    }
                    if (a.head) {
                        a.head.text = h >> 8 & 1;
                    }
                    if (512 & a.flags && 4 & a.wrap) {
                        R[0] = 255 & h;
                        R[1] = h >>> 8 & 255;
                        a.check = M(a.check, R, 2, 0);
                    }
                    h = 0;
                    d = 0;
                    a.mode = 16182;
                case 16182:
                    while(d < 32){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    if (a.head) {
                        a.head.time = h;
                    }
                    if (512 & a.flags && 4 & a.wrap) {
                        R[0] = 255 & h;
                        R[1] = h >>> 8 & 255;
                        R[2] = h >>> 16 & 255;
                        R[3] = h >>> 24 & 255;
                        a.check = M(a.check, R, 4, 0);
                    }
                    h = 0;
                    d = 0;
                    a.mode = 16183;
                case 16183:
                    while(d < 16){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    if (a.head) {
                        a.head.xflags = 255 & h;
                        a.head.os = h >> 8;
                    }
                    if (512 & a.flags && 4 & a.wrap) {
                        R[0] = 255 & h;
                        R[1] = h >>> 8 & 255;
                        a.check = M(a.check, R, 2, 0);
                    }
                    h = 0;
                    d = 0;
                    a.mode = 16184;
                case 16184:
                    if (1024 & a.flags) {
                        while(d < 16){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        a.length = h;
                        if (a.head) {
                            a.head.extra_len = h;
                        }
                        if (512 & a.flags && 4 & a.wrap) {
                            R[0] = 255 & h;
                            R[1] = h >>> 8 & 255;
                            a.check = M(a.check, R, 2, 0);
                        }
                        h = 0;
                        d = 0;
                    } else {
                        if (a.head) {
                            a.head.extra = null;
                        }
                    }
                    a.mode = 16185;
                case 16185:
                    if (1024 & a.flags && ((u = a.length) > l && (u = l), u && (a.head && (y = a.head.extra_len - a.length, a.head.extra || (a.head.extra = new Uint8Array(a.head.extra_len)), a.head.extra.set(i.subarray(r, r + u), y)), 512 & a.flags && 4 & a.wrap && (a.check = M(a.check, i, u, r)), l -= u, r += u, a.length -= u), a.length)) {
                        break e;
                    }
                    a.length = 0;
                    a.mode = 16186;
                case 16186:
                    if (2048 & a.flags) {
                        if (l === 0) {
                            break e;
                        }
                        u = 0;
                        do {
                            y = i[r + u++];
                            if (a.head && y && a.length < 65536) {
                                a.head.name += String.fromCharCode(y);
                            }
                        }while (y && u < l)
                        if (512 & a.flags && 4 & a.wrap) {
                            a.check = M(a.check, i, u, r);
                        }
                        l -= u;
                        r += u;
                        if (y) {
                            break e;
                        }
                    } else {
                        if (a.head) {
                            a.head.name = null;
                        }
                    }
                    a.length = 0;
                    a.mode = 16187;
                case 16187:
                    if (4096 & a.flags) {
                        if (l === 0) {
                            break e;
                        }
                        u = 0;
                        do {
                            y = i[r + u++];
                            if (a.head && y && a.length < 65536) {
                                a.head.comment += String.fromCharCode(y);
                            }
                        }while (y && u < l)
                        if (512 & a.flags && 4 & a.wrap) {
                            a.check = M(a.check, i, u, r);
                        }
                        l -= u;
                        r += u;
                        if (y) {
                            break e;
                        }
                    } else {
                        if (a.head) {
                            a.head.comment = null;
                        }
                    }
                    a.mode = 16188;
                case 16188:
                    if (512 & a.flags) {
                        while(d < 16){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        if (4 & a.wrap && h !== (65535 & a.check)) {
                            t.msg = "header crc mismatch";
                            a.mode = 16209;
                            break;
                        }
                        h = 0;
                        d = 0;
                    }
                    if (a.head) {
                        a.head.hcrc = a.flags >> 9 & 1;
                        a.head.done = true;
                    }
                    t.adler = a.check = 0;
                    a.mode = 16191;
                    break;
                case 16189:
                    while(d < 32){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    t.adler = a.check = er(h);
                    h = 0;
                    d = 0;
                    a.mode = 16190;
                case 16190:
                    if (a.havedict === 0) {
                        t.next_out = s;
                        t.avail_out = o;
                        t.next_in = r;
                        t.avail_in = l;
                        a.hold = h;
                        a.bits = d;
                        return Z_NEED_DICT;
                    }
                    t.adler = a.check = 1;
                    a.mode = 16191;
                case 16191:
                    if (e === Z_BLOCK_1 || e === Z_TREES) {
                        break e;
                    }
                case 16192:
                    if (a.last) {
                        h >>>= 7 & d;
                        d -= 7 & d;
                        a.mode = 16206;
                        break;
                    }
                    while(d < 3){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    a.last = 1 & h;
                    d -= 1;
                    switch(3 & (h >>>= 1)){
                        case 0:
                            a.mode = 16193;
                            break;
                        case 1:
                            ed(a);
                            a.mode = 16199;
                            if (e === Z_TREES) {
                                h >>>= 2;
                                d -= 2;
                                break e;
                            }
                            break;
                        case 2:
                            a.mode = 16196;
                            break;
                        case 3:
                            t.msg = "invalid block type";
                            a.mode = 16209;
                    }
                    h >>>= 2;
                    d -= 2;
                    break;
                case 16193:
                    h >>>= 7 & d;
                    for(d -= 7 & d; d < 32;){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    if ((65535 & h) != (h >>> 16 ^ 65535)) {
                        t.msg = "invalid stored block lengths";
                        a.mode = 16209;
                        break;
                    }
                    a.length = 65535 & h;
                    h = 0;
                    d = 0;
                    a.mode = 16194;
                    if (e === Z_TREES) {
                        break e;
                    }
                case 16194:
                    a.mode = 16195;
                case 16195:
                    if (u = a.length) {
                        if (u > l) {
                            u = l;
                        }
                        if (u > o) {
                            u = o;
                        }
                        if (u === 0) {
                            break e;
                        }
                        n.set(i.subarray(r, r + u), s);
                        l -= u;
                        r += u;
                        o -= u;
                        s += u;
                        a.length -= u;
                        break;
                    }
                    a.mode = 16191;
                    break;
                case 16196:
                    while(d < 14){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    a.nlen = (31 & h) + 257;
                    d -= 5;
                    a.ndist = (31 & (h >>>= 5)) + 1;
                    d -= 5;
                    a.ncode = (15 & (h >>>= 5)) + 4;
                    h >>>= 4;
                    d -= 4;
                    if (a.nlen > 286 || a.ndist > 30) {
                        t.msg = "too many length or distance symbols";
                        a.mode = 16209;
                        break;
                    }
                    a.have = 0;
                    a.mode = 16197;
                case 16197:
                    while(a.have < a.ncode){
                        while(d < 3){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        a.lens[U[a.have++]] = 7 & h;
                        h >>>= 3;
                        d -= 3;
                    }
                    while(a.have < 19){
                        a.lens[U[a.have++]] = 0;
                    }
                    a.lencode = a.lendyn;
                    a.lenbits = 7;
                    z = {
                        bits: a.lenbits
                    };
                    x = t5(0, a.lens, 0, 19, a.lencode, 0, a.work, z);
                    a.lenbits = z.bits;
                    if (x) {
                        t.msg = "invalid code lengths set";
                        a.mode = 16209;
                        break;
                    }
                    a.have = 0;
                    a.mode = 16198;
                case 16198:
                    while(a.have < a.nlen + a.ndist){
                        while(b = (E = a.lencode[h & (1 << a.lenbits) - 1]) >>> 24, m = E >>> 16 & 255, g = 65535 & E, !(b <= d)){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        if (g < 16) {
                            h >>>= b;
                            d -= b;
                            a.lens[a.have++] = g;
                        } else {
                            if (g === 16) {
                                for(A = b + 2; d < A;){
                                    if (l === 0) {
                                        break e;
                                    }
                                    l--;
                                    h += i[r++] << d;
                                    d += 8;
                                }
                                h >>>= b;
                                d -= b;
                                if (a.have === 0) {
                                    t.msg = "invalid bit length repeat";
                                    a.mode = 16209;
                                    break;
                                }
                                y = a.lens[a.have - 1];
                                u = 3 + (3 & h);
                                h >>>= 2;
                                d -= 2;
                            } else if (g === 17) {
                                for(A = b + 3; d < A;){
                                    if (l === 0) {
                                        break e;
                                    }
                                    l--;
                                    h += i[r++] << d;
                                    d += 8;
                                }
                                h >>>= b;
                                d -= b;
                                y = 0;
                                u = 3 + (7 & h);
                                h >>>= 3;
                                d -= 3;
                            } else {
                                for(A = b + 7; d < A;){
                                    if (l === 0) {
                                        break e;
                                    }
                                    l--;
                                    h += i[r++] << d;
                                    d += 8;
                                }
                                h >>>= b;
                                d -= b;
                                y = 0;
                                u = 11 + (127 & h);
                                h >>>= 7;
                                d -= 7;
                            }
                            if (a.have + u > a.nlen + a.ndist) {
                                t.msg = "invalid bit length repeat";
                                a.mode = 16209;
                                break;
                            }
                            while(u--){
                                a.lens[a.have++] = y;
                            }
                        }
                    }
                    if (a.mode === 16209) {
                        break;
                    }
                    if (a.lens[256] === 0) {
                        t.msg = "invalid code -- missing end-of-block";
                        a.mode = 16209;
                        break;
                    }
                    a.lenbits = 9;
                    z = {
                        bits: a.lenbits
                    };
                    x = t5(1, a.lens, 0, a.nlen, a.lencode, 0, a.work, z);
                    a.lenbits = z.bits;
                    if (x) {
                        t.msg = "invalid literal/lengths set";
                        a.mode = 16209;
                        break;
                    }
                    a.distbits = 6;
                    a.distcode = a.distdyn;
                    z = {
                        bits: a.distbits
                    };
                    x = t5(2, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, z);
                    a.distbits = z.bits;
                    if (x) {
                        t.msg = "invalid distances set";
                        a.mode = 16209;
                        break;
                    }
                    a.mode = 16199;
                    if (e === Z_TREES) {
                        break e;
                    }
                case 16199:
                    a.mode = 16200;
                case 16200:
                    if (l >= 6 && o >= 258) {
                        t.next_out = s;
                        t.avail_out = o;
                        t.next_in = r;
                        t.avail_in = l;
                        a.hold = h;
                        a.bits = d;
                        tV(t, f);
                        s = t.next_out;
                        n = t.output;
                        o = t.avail_out;
                        r = t.next_in;
                        i = t.input;
                        l = t.avail_in;
                        h = a.hold;
                        d = a.bits;
                        if (a.mode === 16191) {
                            a.back = -1;
                        }
                        break;
                    }
                    for(a.back = 0; b = (E = a.lencode[h & (1 << a.lenbits) - 1]) >>> 24, m = E >>> 16 & 255, g = 65535 & E, !(b <= d);){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    if (m && (240 & m) == 0) {
                        p = b;
                        k = m;
                        for(v = g; b = (E = a.lencode[v + ((h & (1 << p + k) - 1) >> p)]) >>> 24, m = E >>> 16 & 255, g = 65535 & E, !(p + b <= d);){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        h >>>= p;
                        d -= p;
                        a.back += p;
                    }
                    h >>>= b;
                    d -= b;
                    a.back += b;
                    a.length = g;
                    if (m === 0) {
                        a.mode = 16205;
                        break;
                    }
                    if (32 & m) {
                        a.back = -1;
                        a.mode = 16191;
                        break;
                    }
                    if (64 & m) {
                        t.msg = "invalid literal/length code";
                        a.mode = 16209;
                        break;
                    }
                    a.extra = 15 & m;
                    a.mode = 16201;
                case 16201:
                    if (a.extra) {
                        for(A = a.extra; d < A;){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        a.length += h & (1 << a.extra) - 1;
                        h >>>= a.extra;
                        d -= a.extra;
                        a.back += a.extra;
                    }
                    a.was = a.length;
                    a.mode = 16202;
                case 16202:
                    while(b = (E = a.distcode[h & (1 << a.distbits) - 1]) >>> 24, m = E >>> 16 & 255, g = 65535 & E, !(b <= d)){
                        if (l === 0) {
                            break e;
                        }
                        l--;
                        h += i[r++] << d;
                        d += 8;
                    }
                    if ((240 & m) == 0) {
                        p = b;
                        k = m;
                        for(v = g; b = (E = a.distcode[v + ((h & (1 << p + k) - 1) >> p)]) >>> 24, m = E >>> 16 & 255, g = 65535 & E, !(p + b <= d);){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        h >>>= p;
                        d -= p;
                        a.back += p;
                    }
                    h >>>= b;
                    d -= b;
                    a.back += b;
                    if (64 & m) {
                        t.msg = "invalid distance code";
                        a.mode = 16209;
                        break;
                    }
                    a.offset = g;
                    a.extra = 15 & m;
                    a.mode = 16203;
                case 16203:
                    if (a.extra) {
                        for(A = a.extra; d < A;){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        a.offset += h & (1 << a.extra) - 1;
                        h >>>= a.extra;
                        d -= a.extra;
                        a.back += a.extra;
                    }
                    if (a.offset > a.dmax) {
                        t.msg = "invalid distance too far back";
                        a.mode = 16209;
                        break;
                    }
                    a.mode = 16204;
                case 16204:
                    if (o === 0) {
                        break e;
                    }
                    u = f - o;
                    if (a.offset > u) {
                        if ((u = a.offset - u) > a.whave && a.sane) {
                            t.msg = "invalid distance too far back";
                            a.mode = 16209;
                            break;
                        }
                        if (u > a.wnext) {
                            u -= a.wnext;
                            c = a.wsize - u;
                        } else {
                            c = a.wnext - u;
                        }
                        if (u > a.length) {
                            u = a.length;
                        }
                        w = a.window;
                    } else {
                        w = n;
                        c = s - a.offset;
                        u = a.length;
                    }
                    if (u > o) {
                        u = o;
                    }
                    o -= u;
                    a.length -= u;
                    do {
                        n[s++] = w[c++];
                    }while (--u)
                    if (a.length === 0) {
                        a.mode = 16200;
                    }
                    break;
                case 16205:
                    if (o === 0) {
                        break e;
                    }
                    n[s++] = a.length;
                    o--;
                    a.mode = 16200;
                    break;
                case 16206:
                    if (a.wrap) {
                        while(d < 32){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h |= i[r++] << d;
                            d += 8;
                        }
                        f -= o;
                        t.total_out += f;
                        a.total += f;
                        if (4 & a.wrap && f) {
                            t.adler = a.check = a.flags ? M(a.check, n, f, s - f) : L(a.check, n, f, s - f);
                        }
                        f = o;
                        if (4 & a.wrap && (a.flags ? h : er(h)) !== a.check) {
                            t.msg = "incorrect data check";
                            a.mode = 16209;
                            break;
                        }
                        h = 0;
                        d = 0;
                    }
                    a.mode = 16207;
                case 16207:
                    if (a.wrap && a.flags) {
                        while(d < 32){
                            if (l === 0) {
                                break e;
                            }
                            l--;
                            h += i[r++] << d;
                            d += 8;
                        }
                        if (4 & a.wrap && h !== (0 | a.total)) {
                            t.msg = "incorrect length check";
                            a.mode = 16209;
                            break;
                        }
                        h = 0;
                        d = 0;
                    }
                    a.mode = 16208;
                case 16208:
                    x = Z_STREAM_END_2;
                    break e;
                case 16209:
                    x = Z_DATA_ERROR_1;
                    break e;
                case 16210:
                    return Z_MEM_ERROR;
                default:
                    return Z_STREAM_ERROR_1;
            }
        }
        t.next_out = s;
        t.avail_out = o;
        t.next_in = r;
        t.avail_in = l;
        a.hold = h;
        a.bits = d;
        if (a.wsize || f !== t.avail_out && a.mode < 16209 && (a.mode < 16206 || e !== Z_FINISH_2)) {
            e_(t, t.output, t.next_out, f - t.avail_out);
        }
        _ -= t.avail_in;
        f -= t.avail_out;
        t.total_in += _;
        t.total_out += f;
        a.total += f;
        if (4 & a.wrap && f) {
            t.adler = a.check = a.flags ? M(a.check, n, f, t.next_out - f) : L(a.check, n, f, t.next_out - f);
        }
        t.data_type = a.bits + 64 * !!a.last + 128 * (a.mode === 16191) + 256 * (a.mode === 16199 || a.mode === 16194);
        if ((_ === 0 && f === 0 || e === Z_FINISH_2) && x === Z_OK_2) {
            x = Z_BUF_ERROR_1;
        }
        return x;
    },
    inflateEnd: (t)=>{
        if (el(t)) {
            return Z_STREAM_ERROR_1;
        }
        let t_state = t.state;
        if (t_state.window) {
            t_state.window = null;
        }
        t.state = null;
        return Z_OK_2;
    },
    inflateGetHeader: (t, e)=>{
        if (el(t)) {
            return Z_STREAM_ERROR_1;
        }
        let t_state = t.state;
        if ((2 & t_state.wrap) == 0) {
            return Z_STREAM_ERROR_1;
        }
        t_state.head = e;
        e.done = false;
        return Z_OK_2;
    },
    inflateSetDictionary: (t, e)=>{
        let a;
        let e_length = e.length;
        if (el(t) || (a = t.state).wrap !== 0 && a.mode !== 16190) {
            return Z_STREAM_ERROR_1;
        }
        if (a.mode === 16190 && L(1, e, e_length, 0) !== a.check) {
            return Z_DATA_ERROR_1;
        }
        if (e_(t, e, e_length, e_length)) {
            a.mode = 16210;
            return Z_MEM_ERROR;
        }
        a.havedict = 1;
        return Z_OK_2;
    }
};
const eu = function() {
    this.text = 0;
    this.time = 0;
    this.xflags = 0;
    this.os = 0;
    this.extra = null;
    this.extra_len = 0;
    this.name = "";
    this.comment = "";
    this.hcrc = 0;
    this.done = false;
};
let toString_1 = Object.prototype.toString;
let { Z_NO_FLUSH: Z_NO_FLUSH_2, Z_FINISH: Z_FINISH_3, Z_OK: Z_OK_3, Z_STREAM_END: Z_STREAM_END_3, Z_NEED_DICT: Z_NEED_DICT_1, Z_STREAM_ERROR: Z_STREAM_ERROR_2, Z_DATA_ERROR: Z_DATA_ERROR_2, Z_MEM_ERROR: Z_MEM_ERROR_1 } = constants;
class ex {
    constructor(t){
        this.options = tC.assign({
            chunkSize: 65536,
            windowBits: 15,
            to: ""
        }, t || {});
        let e = this.options;
        if (e.raw && e.windowBits >= 0 && e.windowBits < 16) {
            e.windowBits = -e.windowBits;
            if (e.windowBits === 0) {
                e.windowBits = -15;
            }
        }
        if (e.windowBits >= 0 && e.windowBits < 16 && !(t && t.windowBits)) {
            e.windowBits += 32;
        }
        if (e.windowBits > 15 && e.windowBits < 48 && (15 & e.windowBits) == 0) {
            e.windowBits |= 15;
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new tL;
        this.strm.avail_out = 0;
        let a = ef.inflateInit2(this.strm, e.windowBits);
        if (a !== Z_OK_3 || (this.header = new eu, ef.inflateGetHeader(this.strm, this.header), e.dictionary && (typeof e.dictionary === "string" ? e.dictionary = tF.string2buf(e.dictionary) : toString_1.call(e.dictionary) === "[object ArrayBuffer]" && (e.dictionary = new Uint8Array(e.dictionary)), e.raw) && (a = ef.inflateSetDictionary(this.strm, e.dictionary)) !== Z_OK_3)) {
            throw Error(j[a]);
        }
    }
    push(t, e) {
        let a;
        let i;
        let n;
        let strm = this.strm;
        let chunkSize = this.options.chunkSize;
        let dictionary = this.options.dictionary;
        if (this.ended) {
            return false;
        }
        i = e === ~~e ? e : e === true ? Z_FINISH_3 : Z_NO_FLUSH_2;
        if (toString_1.call(t) === "[object ArrayBuffer]") {
            strm.input = new Uint8Array(t);
        } else {
            strm.input = t;
        }
        strm.next_in = 0;
        for(strm.avail_in = strm.input.length;;){
            if (strm.avail_out === 0) {
                strm.output = new Uint8Array(chunkSize);
                strm.next_out = 0;
                strm.avail_out = chunkSize;
            }
            if ((a = ef.inflate(strm, i)) === Z_NEED_DICT_1 && dictionary) {
                if ((a = ef.inflateSetDictionary(strm, dictionary)) === Z_OK_3) {
                    a = ef.inflate(strm, i);
                } else if (a === Z_DATA_ERROR_2) {
                    a = Z_NEED_DICT_1;
                }
            }
            while(strm.avail_in > 0 && a === Z_STREAM_END_3 && strm.state.wrap > 0 && t[strm.next_in] !== 0){
                ef.inflateReset(strm);
                a = ef.inflate(strm, i);
            }
            switch(a){
                case Z_STREAM_ERROR_2:
                case Z_DATA_ERROR_2:
                case Z_NEED_DICT_1:
                case Z_MEM_ERROR_1:
                    this.onEnd(a);
                    this.ended = true;
                    return false;
            }
            n = strm.avail_out;
            if (strm.next_out && (strm.avail_out === 0 || a === Z_STREAM_END_3)) {
                if (this.options.to === "string") {
                    let t = tF.utf8border(strm.output, strm.next_out);
                    let e = strm.next_out - t;
                    let a = tF.buf2string(strm.output, t);
                    strm.next_out = e;
                    strm.avail_out = chunkSize - e;
                    if (e) {
                        strm.output.set(strm.output.subarray(t, t + e), 0);
                    }
                    this.onData(a);
                } else {
                    this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
                }
            }
            if (a !== Z_OK_3 || n !== 0) {
                if (a === Z_STREAM_END_3) {
                    a = ef.inflateEnd(this.strm);
                    this.onEnd(a);
                    this.ended = true;
                    return true;
                }
                if (strm.avail_in === 0) {
                    break;
                }
            }
        }
        return true;
    }
    onData(t) {
        this.chunks.push(t);
    }
    onEnd(t) {
        if (t === Z_OK_3) {
            if (this.options.to === "string") {
                this.result = this.chunks.join("");
            } else {
                this.result = tC.flattenChunks(this.chunks);
            }
        }
        this.chunks = [];
        this.err = t;
        this.msg = this.strm.msg;
    }
}
function ez(t, e) {
    let a = new ex(e);
    a.push(t);
    if (a.err) {
        throw a.msg || j[a.err];
    }
    return a.result;
}
let { Deflate, deflate, deflateRaw, gzip } = {
    Deflate: tJ,
    deflate: deflate_1,
    deflateRaw: function(t, e) {
        e = e || {};
        e.raw = true;
        return deflate_1(t, e);
    },
    gzip: function(t, e) {
        e = e || {};
        e.gzip = true;
        return deflate_1(t, e);
    },
    constants
};
let { Inflate, inflate, inflateRaw, ungzip } = {
    Inflate: ex,
    inflate: ez,
    inflateRaw: function(t, e) {
        e = e || {};
        e.raw = true;
        return ez(t, e);
    },
    ungzip: ez,
    constants
};
export const Ay = {
    Deflate,
    deflate,
    deflateRaw,
    gzip,
    Inflate,
    inflate,
    inflateRaw,
    ungzip,
    constants
};
