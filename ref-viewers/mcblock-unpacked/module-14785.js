import { $EB as side, CmU, I9Y, IUQ, NRn, Pq0, Q1f, V9B, bdM, dwI, eaF, gPd, iyt, k6q, kn4, uWO } from "./module-85339.js";
import * as o from "./module-79905.js";
import { A as A_1 } from "./module-4195.js";
import { A as A_2 } from "./module-17509.js";
import { Do, Fh } from "./module-37771.js";
let a;
let n;
let u = o.kl({
    name: "Typr Font Parser",
    dependencies: [
        function() {
            let e;
            let t;
            let Typr;
            if (typeof window === "undefined") {
                self.window = self;
            }
            return (e = {}, (t = {
                parse: function(e) {
                    const t__bin = t._bin;
                    const a = new Uint8Array(e);
                    if (t__bin.readASCII(a, 0, 4) == "ttcf") {
                        let n = 4;
                        t__bin.readUshort(a, n);
                        n += 2;
                        t__bin.readUshort(a, n);
                        n += 2;
                        const i = t__bin.readUint(a, n);
                        n += 4;
                        const o = [];
                        for(let s = 0; s < i; s++){
                            const l = t__bin.readUint(a, n);
                            n += 4;
                            o.push(t._readFont(a, l));
                        }
                        return o;
                    }
                    return [
                        t._readFont(a, 0)
                    ];
                },
                _readFont: function(_data, r) {
                    const t__bin = t._bin;
                    const _offset = r;
                    t__bin.readFixed(_data, r);
                    r += 4;
                    const i = t__bin.readUshort(_data, r);
                    r += 2;
                    t__bin.readUshort(_data, r);
                    r += 2;
                    t__bin.readUshort(_data, r);
                    r += 2;
                    t__bin.readUshort(_data, r);
                    r += 2;
                    const o = [
                        "cmap",
                        "head",
                        "hhea",
                        "maxp",
                        "hmtx",
                        "name",
                        "OS/2",
                        "post",
                        "loca",
                        "glyf",
                        "kern",
                        "CFF ",
                        "GDEF",
                        "GPOS",
                        "GSUB",
                        "SVG "
                    ];
                    const s = {
                        _data,
                        _offset
                    };
                    const l = {};
                    for(var h = 0; h < i; h++){
                        const u = t__bin.readASCII(_data, r, 4);
                        r += 4;
                        t__bin.readUint(_data, r);
                        r += 4;
                        const offset = t__bin.readUint(_data, r);
                        r += 4;
                        const length = t__bin.readUint(_data, r);
                        r += 4;
                        l[u] = {
                            offset,
                            length
                        };
                    }
                    for(h = 0; h < o.length; h++){
                        const c = o[h];
                        if (l[c]) {
                            s[c.trim()] = t[c.trim()].parse(_data, l[c].offset, l[c].length, s);
                        }
                    }
                    return s;
                },
                _tabOffset: function(e, r, a) {
                    const t__bin = t._bin;
                    for(let i = t__bin.readUshort(e, a + 4), o = a + 12, s = 0; s < i; s++){
                        const l = t__bin.readASCII(e, o, 4);
                        o += 4;
                        t__bin.readUint(e, o);
                        o += 4;
                        const h = t__bin.readUint(e, o);
                        o += 4;
                        t__bin.readUint(e, o);
                        o += 4;
                        if (l == r) {
                            return h;
                        }
                    }
                    return 0;
                }
            })._bin = {
                readFixed: function(e, t) {
                    return (e[t] << 8 | e[t + 1]) + (e[t + 2] << 8 | e[t + 3]) / 65540;
                },
                readF2dot14: function(e, r) {
                    return t._bin.readShort(e, r) / 16384;
                },
                readInt: function(e, r) {
                    return t._bin._view(e).getInt32(r);
                },
                readInt8: function(e, r) {
                    return t._bin._view(e).getInt8(r);
                },
                readShort: function(e, r) {
                    return t._bin._view(e).getInt16(r);
                },
                readUshort: function(e, r) {
                    return t._bin._view(e).getUint16(r);
                },
                readUshorts: function(e, r, a) {
                    const n = [];
                    for(let i = 0; i < a; i++){
                        n.push(t._bin.readUshort(e, r + 2 * i));
                    }
                    return n;
                },
                readUint: function(e, r) {
                    return t._bin._view(e).getUint32(r);
                },
                readUint64: function(e, r) {
                    return 4294967296 * t._bin.readUint(e, r) + t._bin.readUint(e, r + 4);
                },
                readASCII: function(e, t, r) {
                    let a = "";
                    for(let n = 0; n < r; n++){
                        a += String.fromCharCode(e[t + n]);
                    }
                    return a;
                },
                readUnicode: function(e, t, r) {
                    let a = "";
                    for(let n = 0; n < r; n++){
                        a += String.fromCharCode(e[t++] << 8 | e[t++]);
                    }
                    return a;
                },
                _tdec: typeof window !== "undefined" && window.TextDecoder ? new window.TextDecoder : null,
                readUTF8: function(e, r, a) {
                    const _tdec = t._bin._tdec;
                    if (_tdec && r == 0 && a == e.length) {
                        return _tdec.decode(e);
                    }
                    return t._bin.readASCII(e, r, a);
                },
                readBytes: function(e, t, r) {
                    const a = [];
                    for(let n = 0; n < r; n++){
                        a.push(e[t + n]);
                    }
                    return a;
                },
                readASCIIArray: function(e, t, r) {
                    const a = [];
                    for(let n = 0; n < r; n++){
                        a.push(String.fromCharCode(e[t + n]));
                    }
                    return a;
                },
                _view: function(e) {
                    return e._dataView || (e._dataView = e.buffer ? new DataView(e.buffer, e.byteOffset, e.byteLength) : new DataView(new Uint8Array(e).buffer));
                }
            }, t._lctf = {}, t._lctf.parse = function(e, r, a, n, i) {
                const t__bin = t._bin;
                const s = {};
                const l = r;
                t__bin.readFixed(e, r);
                r += 4;
                const h = t__bin.readUshort(e, r);
                r += 2;
                const u = t__bin.readUshort(e, r);
                r += 2;
                const f = t__bin.readUshort(e, r);
                r += 2;
                s.scriptList = t._lctf.readScriptList(e, l + h);
                s.featureList = t._lctf.readFeatureList(e, l + u);
                s.lookupList = t._lctf.readLookupList(e, l + f, i);
                return s;
            }, t._lctf.readLookupList = function(e, r, a) {
                const t__bin = t._bin;
                const i = r;
                const o = [];
                const s = t__bin.readUshort(e, r);
                r += 2;
                for(let l = 0; l < s; l++){
                    const h = t__bin.readUshort(e, r);
                    r += 2;
                    const u = t._lctf.readLookupTable(e, i + h, a);
                    o.push(u);
                }
                return o;
            }, t._lctf.readLookupTable = function(e, r, a) {
                const t__bin = t._bin;
                const i = r;
                const o = {
                    tabs: []
                };
                o.ltype = t__bin.readUshort(e, r);
                r += 2;
                o.flag = t__bin.readUshort(e, r);
                r += 2;
                const s = t__bin.readUshort(e, r);
                r += 2;
                const o_ltype = o.ltype;
                for(let h = 0; h < s; h++){
                    const u = t__bin.readUshort(e, r);
                    r += 2;
                    const f = a(e, o_ltype, i + u, o);
                    o.tabs.push(f);
                }
                return o;
            }, t._lctf.numOfOnes = function(e) {
                let t = 0;
                for(let r = 0; r < 32; r++){
                    if ((e >>> r & 1) != 0) {
                        t++;
                    }
                }
                return t;
            }, t._lctf.readClassDef = function(e, r) {
                const t__bin = t._bin;
                const n = [];
                const i = t__bin.readUshort(e, r);
                r += 2;
                if (i == 1) {
                    const o = t__bin.readUshort(e, r);
                    r += 2;
                    const s = t__bin.readUshort(e, r);
                    r += 2;
                    for(var l = 0; l < s; l++){
                        n.push(o + l);
                        n.push(o + l);
                        n.push(t__bin.readUshort(e, r));
                        r += 2;
                    }
                }
                if (i == 2) {
                    const h = t__bin.readUshort(e, r);
                    r += 2;
                    for(l = 0; l < h; l++){
                        n.push(t__bin.readUshort(e, r));
                        r += 2;
                        n.push(t__bin.readUshort(e, r));
                        r += 2;
                        n.push(t__bin.readUshort(e, r));
                        r += 2;
                    }
                }
                return n;
            }, t._lctf.getInterval = function(e, t) {
                for(let r = 0; r < e.length; r += 3){
                    const a = e[r];
                    const n = e[r + 1];
                    e[r + 2];
                    if (a <= t && t <= n) {
                        return r;
                    }
                }
                return -1;
            }, t._lctf.readCoverage = function(e, r) {
                const t__bin = t._bin;
                const n = {};
                n.fmt = t__bin.readUshort(e, r);
                r += 2;
                const i = t__bin.readUshort(e, r);
                r += 2;
                if (n.fmt == 1) {
                    n.tab = t__bin.readUshorts(e, r, i);
                }
                if (n.fmt == 2) {
                    n.tab = t__bin.readUshorts(e, r, 3 * i);
                }
                return n;
            }, t._lctf.coverageIndex = function(e, r) {
                const e_tab = e.tab;
                if (e.fmt == 1) {
                    return e_tab.indexOf(r);
                }
                if (e.fmt == 2) {
                    const n = t._lctf.getInterval(e_tab, r);
                    if (n != -1) {
                        return e_tab[n + 2] + (r - e_tab[n]);
                    }
                }
                return -1;
            }, t._lctf.readFeatureList = function(e, r) {
                const t__bin = t._bin;
                const n = r;
                const i = [];
                const o = t__bin.readUshort(e, r);
                r += 2;
                for(let s = 0; s < o; s++){
                    const l = t__bin.readASCII(e, r, 4);
                    r += 4;
                    const h = t__bin.readUshort(e, r);
                    r += 2;
                    const u = t._lctf.readFeatureTable(e, n + h);
                    u.tag = l.trim();
                    i.push(u);
                }
                return i;
            }, t._lctf.readFeatureTable = function(e, r) {
                const t__bin = t._bin;
                const n = r;
                const i = {};
                const o = t__bin.readUshort(e, r);
                r += 2;
                if (o > 0) {
                    i.featureParams = n + o;
                }
                const s = t__bin.readUshort(e, r);
                r += 2;
                i.tab = [];
                for(let l = 0; l < s; l++){
                    i.tab.push(t__bin.readUshort(e, r + 2 * l));
                }
                return i;
            }, t._lctf.readScriptList = function(e, r) {
                const t__bin = t._bin;
                const n = r;
                const i = {};
                const o = t__bin.readUshort(e, r);
                r += 2;
                for(let s = 0; s < o; s++){
                    const l = t__bin.readASCII(e, r, 4);
                    r += 4;
                    const h = t__bin.readUshort(e, r);
                    r += 2;
                    i[l.trim()] = t._lctf.readScriptTable(e, n + h);
                }
                return i;
            }, t._lctf.readScriptTable = function(e, r) {
                const t__bin = t._bin;
                const n = r;
                const i = {};
                const o = t__bin.readUshort(e, r);
                r += 2;
                if (o > 0) {
                    i.default = t._lctf.readLangSysTable(e, n + o);
                }
                const s = t__bin.readUshort(e, r);
                r += 2;
                for(let l = 0; l < s; l++){
                    const h = t__bin.readASCII(e, r, 4);
                    r += 4;
                    const u = t__bin.readUshort(e, r);
                    r += 2;
                    i[h.trim()] = t._lctf.readLangSysTable(e, n + u);
                }
                return i;
            }, t._lctf.readLangSysTable = function(e, r) {
                const t__bin = t._bin;
                const n = {};
                t__bin.readUshort(e, r);
                r += 2;
                n.reqFeature = t__bin.readUshort(e, r);
                r += 2;
                const i = t__bin.readUshort(e, r);
                r += 2;
                n.features = t__bin.readUshorts(e, r, i);
                return n;
            }, t.CFF = {}, t.CFF.parse = function(e, r, a) {
                const t__bin = t._bin;
                (e = new Uint8Array(e.buffer, r, a))[r = 0];
                e[++r];
                e[++r];
                e[++r];
                r++;
                const i = [];
                r = t.CFF.readIndex(e, r, i);
                const o = [];
                for(var s = 0; s < i.length - 1; s++){
                    o.push(t__bin.readASCII(e, r + i[s], i[s + 1] - i[s]));
                }
                r += i[i.length - 1];
                const l = [];
                r = t.CFF.readIndex(e, r, l);
                const h = [];
                for(s = 0; s < l.length - 1; s++){
                    h.push(t.CFF.readDict(e, r + l[s], r + l[s + 1]));
                }
                r += l[l.length - 1];
                const u = h[0];
                let f = [];
                r = t.CFF.readIndex(e, r, f);
                const d = [];
                for(s = 0; s < f.length - 1; s++){
                    d.push(t__bin.readASCII(e, r + f[s], f[s + 1] - f[s]));
                }
                r += f[f.length - 1];
                t.CFF.readSubrs(e, r, u);
                if (u.CharStrings) {
                    r = u.CharStrings;
                    f = [];
                    r = t.CFF.readIndex(e, r, f);
                    const c = [];
                    for(s = 0; s < f.length - 1; s++){
                        c.push(t__bin.readBytes(e, r + f[s], f[s + 1] - f[s]));
                    }
                    u.CharStrings = c;
                }
                if (u.ROS) {
                    r = u.FDArray;
                    const p = [];
                    r = t.CFF.readIndex(e, r, p);
                    u.FDArray = [];
                    for(s = 0; s < p.length - 1; s++){
                        const v = t.CFF.readDict(e, r + p[s], r + p[s + 1]);
                        t.CFF._readFDict(e, v, d);
                        u.FDArray.push(v);
                    }
                    r += p[p.length - 1];
                    r = u.FDSelect;
                    u.FDSelect = [];
                    const g = e[r];
                    r++;
                    if (g != 3) {
                        throw g;
                    }
                    const y = t__bin.readUshort(e, r);
                    r += 2;
                    for(s = 0; s < y + 1; s++){
                        u.FDSelect.push(t__bin.readUshort(e, r), e[r + 2]);
                        r += 3;
                    }
                }
                if (u.Encoding) {
                    u.Encoding = t.CFF.readEncoding(e, u.Encoding, u.CharStrings.length);
                }
                if (u.charset) {
                    u.charset = t.CFF.readCharset(e, u.charset, u.CharStrings.length);
                }
                t.CFF._readFDict(e, u, d);
                return u;
            }, t.CFF._readFDict = function(e, r, a) {
                let n;
                if (r.Private) {
                    n = r.Private[1];
                    r.Private = t.CFF.readDict(e, n, n + r.Private[0]);
                    if (r.Private.Subrs) {
                        t.CFF.readSubrs(e, n + r.Private.Subrs, r.Private);
                    }
                }
                for(const i in r){
                    if ([
                        "FamilyName",
                        "FontName",
                        "FullName",
                        "Notice",
                        "version",
                        "Copyright"
                    ].indexOf(i) != -1) {
                        r[i] = a[r[i] - 426 + 35];
                    }
                }
            }, t.CFF.readSubrs = function(e, r, a) {
                const t__bin = t._bin;
                const i = [];
                r = t.CFF.readIndex(e, r, i);
                const i_length = i.length;
                a.Bias = i_length < 1240 ? 107 : i_length < 33900 ? 1131 : 32768;
                a.Subrs = [];
                for(let s = 0; s < i.length - 1; s++){
                    a.Subrs.push(t__bin.readBytes(e, r + i[s], i[s + 1] - i[s]));
                }
            }, t.CFF.tableSE = [
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
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31,
                32,
                33,
                34,
                35,
                36,
                37,
                38,
                39,
                40,
                41,
                42,
                43,
                44,
                45,
                46,
                47,
                48,
                49,
                50,
                51,
                52,
                53,
                54,
                55,
                56,
                57,
                58,
                59,
                60,
                61,
                62,
                63,
                64,
                65,
                66,
                67,
                68,
                69,
                70,
                71,
                72,
                73,
                74,
                75,
                76,
                77,
                78,
                79,
                80,
                81,
                82,
                83,
                84,
                85,
                86,
                87,
                88,
                89,
                90,
                91,
                92,
                93,
                94,
                95,
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
                0,
                0,
                96,
                97,
                98,
                99,
                100,
                101,
                102,
                103,
                104,
                105,
                106,
                107,
                108,
                109,
                110,
                0,
                111,
                112,
                113,
                114,
                0,
                115,
                116,
                117,
                118,
                119,
                120,
                121,
                122,
                0,
                123,
                0,
                124,
                125,
                126,
                127,
                128,
                129,
                130,
                131,
                0,
                132,
                133,
                0,
                134,
                135,
                136,
                137,
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
                138,
                0,
                139,
                0,
                0,
                0,
                0,
                140,
                141,
                142,
                143,
                0,
                0,
                0,
                0,
                0,
                144,
                0,
                0,
                0,
                145,
                0,
                0,
                146,
                147,
                148,
                149,
                0,
                0,
                0,
                0
            ], t.CFF.glyphByUnicode = function(e, t) {
                for(let r = 0; r < e.charset.length; r++){
                    if (e.charset[r] == t) {
                        return r;
                    }
                }
                return -1;
            }, t.CFF.glyphBySE = function(e, r) {
                if (r < 0 || r > 255) {
                    return -1;
                }
                return t.CFF.glyphByUnicode(e, t.CFF.tableSE[r]);
            }, t.CFF.readEncoding = function(e, r, a) {
                t._bin;
                const n = [
                    ".notdef"
                ];
                const i = e[r];
                r++;
                if (i != 0) {
                    throw `error: unknown encoding format: ${i}`;
                }
                const o = e[r];
                r++;
                for(let s = 0; s < o; s++){
                    n.push(e[r + s]);
                }
                return n;
            }, t.CFF.readCharset = function(e, r, a) {
                const t__bin = t._bin;
                const i = [
                    ".notdef"
                ];
                const o = e[r];
                r++;
                if (o == 0) {
                    for(var s = 0; s < a; s++){
                        var l = t__bin.readUshort(e, r);
                        r += 2;
                        i.push(l);
                    }
                } else {
                    if (o != 1 && o != 2) {
                        throw `error: format: ${o}`;
                    }
                    while(i.length < a){
                        l = t__bin.readUshort(e, r);
                        r += 2;
                        let h = 0;
                        if (o == 1) {
                            h = e[r];
                            r++;
                        } else {
                            h = t__bin.readUshort(e, r);
                            r += 2;
                        }
                        for(s = 0; s <= h; s++){
                            i.push(l);
                            l++;
                        }
                    }
                }
                return i;
            }, t.CFF.readIndex = function(e, r, a) {
                const t__bin = t._bin;
                const i = t__bin.readUshort(e, r) + 1;
                const o = e[r += 2];
                r++;
                if (o == 1) {
                    for(var s = 0; s < i; s++){
                        a.push(e[r + s]);
                    }
                } else if (o == 2) {
                    for(s = 0; s < i; s++){
                        a.push(t__bin.readUshort(e, r + 2 * s));
                    }
                } else if (o == 3) {
                    for(s = 0; s < i; s++){
                        a.push(16777215 & t__bin.readUint(e, r + 3 * s - 1));
                    }
                } else if (i != 1) {
                    throw `unsupported offset size: ${o}, count: ${i}`;
                }
                return (r += i * o) - 1;
            }, t.CFF.getCharString = function(e, r, a) {
                const t__bin = t._bin;
                const i = e[r];
                const o = e[r + 1];
                e[r + 2];
                e[r + 3];
                e[r + 4];
                let s = 1;
                let l = null;
                let h = null;
                if (i <= 20) {
                    l = i;
                    s = 1;
                }
                if (i == 12) {
                    l = 100 * i + o;
                    s = 2;
                }
                if (i >= 21 && i <= 27) {
                    l = i;
                    s = 1;
                }
                if (i == 28) {
                    h = t__bin.readShort(e, r + 1);
                    s = 3;
                }
                if (i >= 29 && i <= 31) {
                    l = i;
                    s = 1;
                }
                if (i >= 32 && i <= 246) {
                    h = i - 139;
                    s = 1;
                }
                if (i >= 247 && i <= 250) {
                    h = 256 * (i - 247) + o + 108;
                    s = 2;
                }
                if (i >= 251 && i <= 254) {
                    h = -(256 * (i - 251)) - o - 108;
                    s = 2;
                }
                if (i == 255) {
                    h = t__bin.readInt(e, r + 1) / 65535;
                    s = 5;
                }
                a.val = h ?? `o${l}`;
                a.size = s;
            }, t.CFF.readCharString = function(e, r, a) {
                for(var n = r + a, i = t._bin, o = []; r < n;){
                    const s = e[r];
                    const l = e[r + 1];
                    e[r + 2];
                    e[r + 3];
                    e[r + 4];
                    let h = 1;
                    let u = null;
                    let f = null;
                    if (s <= 20) {
                        u = s;
                        h = 1;
                    }
                    if (s == 12) {
                        u = 100 * s + l;
                        h = 2;
                    }
                    if (!(s != 19 && s != 20)) {
                        u = s;
                        h = 2;
                    }
                    if (s >= 21 && s <= 27) {
                        u = s;
                        h = 1;
                    }
                    if (s == 28) {
                        f = i.readShort(e, r + 1);
                        h = 3;
                    }
                    if (s >= 29 && s <= 31) {
                        u = s;
                        h = 1;
                    }
                    if (s >= 32 && s <= 246) {
                        f = s - 139;
                        h = 1;
                    }
                    if (s >= 247 && s <= 250) {
                        f = 256 * (s - 247) + l + 108;
                        h = 2;
                    }
                    if (s >= 251 && s <= 254) {
                        f = -(256 * (s - 251)) - l - 108;
                        h = 2;
                    }
                    if (s == 255) {
                        f = i.readInt(e, r + 1) / 65535;
                        h = 5;
                    }
                    o.push(f ?? `o${u}`);
                    r += h;
                }
                return o;
            }, t.CFF.readDict = function(e, r, a) {
                const t__bin = t._bin;
                const i = {};
                let o = [];
                while(r < a){
                    const s = e[r];
                    const l = e[r + 1];
                    e[r + 2];
                    e[r + 3];
                    e[r + 4];
                    let h = 1;
                    let u = null;
                    let f = null;
                    if (s == 28) {
                        f = t__bin.readShort(e, r + 1);
                        h = 3;
                    }
                    if (s == 29) {
                        f = t__bin.readInt(e, r + 1);
                        h = 5;
                    }
                    if (s >= 32 && s <= 246) {
                        f = s - 139;
                        h = 1;
                    }
                    if (s >= 247 && s <= 250) {
                        f = 256 * (s - 247) + l + 108;
                        h = 2;
                    }
                    if (s >= 251 && s <= 254) {
                        f = -(256 * (s - 251)) - l - 108;
                        h = 2;
                    }
                    if (s == 255) {
                        f = t__bin.readInt(e, r + 1) / 65535;
                        h = 5;
                        throw "unknown number";
                    }
                    if (s == 30) {
                        const d = [];
                        for(h = 1;;){
                            const c = e[r + h];
                            h++;
                            const p = c >> 4;
                            const v = 15 & c;
                            if (p != 15) {
                                d.push(p);
                            }
                            if (v != 15) {
                                d.push(v);
                            }
                            if (v == 15) {
                                break;
                            }
                        }
                        let g = "";
                        const y = [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            ".",
                            "e",
                            "e-",
                            "reserved",
                            "-",
                            "endOfNumber"
                        ];
                        for(let m = 0; m < d.length; m++){
                            g += y[d[m]];
                        }
                        f = parseFloat(g);
                    }
                    if (s <= 21 && (u = [
                        "version",
                        "Notice",
                        "FullName",
                        "FamilyName",
                        "Weight",
                        "FontBBox",
                        "BlueValues",
                        "OtherBlues",
                        "FamilyBlues",
                        "FamilyOtherBlues",
                        "StdHW",
                        "StdVW",
                        "escape",
                        "UniqueID",
                        "XUID",
                        "charset",
                        "Encoding",
                        "CharStrings",
                        "Private",
                        "Subrs",
                        "defaultWidthX",
                        "nominalWidthX"
                    ][s], h = 1, s == 12)) {
                        u = [
                            "Copyright",
                            "isFixedPitch",
                            "ItalicAngle",
                            "UnderlinePosition",
                            "UnderlineThickness",
                            "PaintType",
                            "CharstringType",
                            "FontMatrix",
                            "StrokeWidth",
                            "BlueScale",
                            "BlueShift",
                            "BlueFuzz",
                            "StemSnapH",
                            "StemSnapV",
                            "ForceBold",
                            0,
                            0,
                            "LanguageGroup",
                            "ExpansionFactor",
                            "initialRandomSeed",
                            "SyntheticBase",
                            "PostScript",
                            "BaseFontName",
                            "BaseFontBlend",
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            "ROS",
                            "CIDFontVersion",
                            "CIDFontRevision",
                            "CIDFontType",
                            "CIDCount",
                            "UIDBase",
                            "FDArray",
                            "FDSelect",
                            "FontName"
                        ][l];
                        h = 2;
                    }
                    if (u != null) {
                        i[u] = o.length == 1 ? o[0] : o;
                        o = [];
                    } else {
                        o.push(f);
                    }
                    r += h;
                }
                return i;
            }, t.cmap = {}, t.cmap.parse = function(e, r, a) {
                e = new Uint8Array(e.buffer, r, a);
                r = 0;
                const t__bin = t._bin;
                const i = {};
                t__bin.readUshort(e, r);
                r += 2;
                const o = t__bin.readUshort(e, r);
                r += 2;
                const s = [];
                i.tables = [];
                for(let l = 0; l < o; l++){
                    const h = t__bin.readUshort(e, r);
                    r += 2;
                    const u = t__bin.readUshort(e, r);
                    r += 2;
                    const f = t__bin.readUint(e, r);
                    r += 4;
                    const d = `p${h}e${u}`;
                    let c = s.indexOf(f);
                    if (c == -1) {
                        c = i.tables.length;
                        s.push(f);
                        let p;
                        const v = t__bin.readUshort(e, f);
                        if (v == 0) {
                            p = t.cmap.parse0(e, f);
                        } else if (v == 4) {
                            p = t.cmap.parse4(e, f);
                        } else if (v == 6) {
                            p = t.cmap.parse6(e, f);
                        } else if (v == 12) {
                            p = t.cmap.parse12(e, f);
                        } else {
                            console.debug(`unknown format: ${v}`, h, u, f);
                        }
                        i.tables.push(p);
                    }
                    if (i[d] != null) {
                        throw "multiple tables for one platform+encoding";
                    }
                    i[d] = c;
                }
                return i;
            }, t.cmap.parse0 = function(e, r) {
                const t__bin = t._bin;
                const n = {};
                n.format = t__bin.readUshort(e, r);
                r += 2;
                const i = t__bin.readUshort(e, r);
                r += 2;
                t__bin.readUshort(e, r);
                r += 2;
                n.map = [];
                for(let o = 0; o < i - 6; o++){
                    n.map.push(e[r + o]);
                }
                return n;
            }, t.cmap.parse4 = function(e, r) {
                const t__bin = t._bin;
                const n = r;
                const i = {};
                i.format = t__bin.readUshort(e, r);
                r += 2;
                const o = t__bin.readUshort(e, r);
                r += 2;
                t__bin.readUshort(e, r);
                r += 2;
                const s = t__bin.readUshort(e, r);
                r += 2;
                const l = s / 2;
                i.searchRange = t__bin.readUshort(e, r);
                r += 2;
                i.entrySelector = t__bin.readUshort(e, r);
                r += 2;
                i.rangeShift = t__bin.readUshort(e, r);
                r += 2;
                i.endCount = t__bin.readUshorts(e, r, l);
                r += 2 * l;
                r += 2;
                i.startCount = t__bin.readUshorts(e, r, l);
                r += 2 * l;
                i.idDelta = [];
                for(let h = 0; h < l; h++){
                    i.idDelta.push(t__bin.readShort(e, r));
                    r += 2;
                }
                i.idRangeOffset = t__bin.readUshorts(e, r, l);
                r += 2 * l;
                for(i.glyphIdArray = []; r < n + o;){
                    i.glyphIdArray.push(t__bin.readUshort(e, r));
                    r += 2;
                }
                return i;
            }, t.cmap.parse6 = function(e, r) {
                const t__bin = t._bin;
                const n = {};
                n.format = t__bin.readUshort(e, r);
                r += 2;
                t__bin.readUshort(e, r);
                r += 2;
                t__bin.readUshort(e, r);
                r += 2;
                n.firstCode = t__bin.readUshort(e, r);
                r += 2;
                const i = t__bin.readUshort(e, r);
                r += 2;
                n.glyphIdArray = [];
                for(let o = 0; o < i; o++){
                    n.glyphIdArray.push(t__bin.readUshort(e, r));
                    r += 2;
                }
                return n;
            }, t.cmap.parse12 = function(e, r) {
                const t__bin = t._bin;
                const n = {};
                n.format = t__bin.readUshort(e, r);
                r += 2;
                r += 2;
                t__bin.readUint(e, r);
                r += 4;
                t__bin.readUint(e, r);
                r += 4;
                const i = t__bin.readUint(e, r);
                r += 4;
                n.groups = [];
                for(let o = 0; o < i; o++){
                    const s = r + 12 * o;
                    const l = t__bin.readUint(e, s + 0);
                    const h = t__bin.readUint(e, s + 4);
                    const u = t__bin.readUint(e, s + 8);
                    n.groups.push([
                        l,
                        h,
                        u
                    ]);
                }
                return n;
            }, t.glyf = {}, t.glyf.parse = function(e, t, r, a) {
                const n = [];
                for(let i = 0; i < a.maxp.numGlyphs; i++){
                    n.push(null);
                }
                return n;
            }, t.glyf._parseGlyf = function(e, r) {
                let a;
                const t__bin = t._bin;
                const e__data = e._data;
                let o = t._tabOffset(e__data, "glyf", e._offset) + e.loca[r];
                if (e.loca[r] == e.loca[r + 1]) {
                    return null;
                }
                const s = {};
                s.noc = t__bin.readShort(e__data, o);
                o += 2;
                s.xMin = t__bin.readShort(e__data, o);
                o += 2;
                s.yMin = t__bin.readShort(e__data, o);
                o += 2;
                s.xMax = t__bin.readShort(e__data, o);
                o += 2;
                s.yMax = t__bin.readShort(e__data, o);
                o += 2;
                if (s.xMin >= s.xMax || s.yMin >= s.yMax) {
                    return null;
                }
                if (s.noc > 0) {
                    s.endPts = [];
                    for(var l = 0; l < s.noc; l++){
                        s.endPts.push(t__bin.readUshort(e__data, o));
                        o += 2;
                    }
                    const h = t__bin.readUshort(e__data, o);
                    o += 2;
                    if (e__data.length - o < h) {
                        return null;
                    }
                    s.instructions = t__bin.readBytes(e__data, o, h);
                    o += h;
                    const u = s.endPts[s.noc - 1] + 1;
                    l = 0;
                    for(s.flags = []; l < u; l++){
                        const f = e__data[o];
                        o++;
                        s.flags.push(f);
                        if ((8 & f) != 0) {
                            const d = e__data[o];
                            o++;
                            for(let c = 0; c < d; c++){
                                s.flags.push(f);
                                l++;
                            }
                        }
                    }
                    l = 0;
                    for(s.xs = []; l < u; l++){
                        var p = (2 & s.flags[l]) != 0;
                        var v = (16 & s.flags[l]) != 0;
                        if (p) {
                            s.xs.push(v ? e__data[o] : -e__data[o]);
                            o++;
                        } else if (v) {
                            s.xs.push(0);
                        } else {
                            s.xs.push(t__bin.readShort(e__data, o));
                            o += 2;
                        }
                    }
                    l = 0;
                    for(s.ys = []; l < u; l++){
                        p = (4 & s.flags[l]) != 0;
                        v = (32 & s.flags[l]) != 0;
                        if (p) {
                            s.ys.push(v ? e__data[o] : -e__data[o]);
                            o++;
                        } else if (v) {
                            s.ys.push(0);
                        } else {
                            s.ys.push(t__bin.readShort(e__data, o));
                            o += 2;
                        }
                    }
                    let g = 0;
                    let y = 0;
                    for(l = 0; l < u; l++){
                        g += s.xs[l];
                        y += s.ys[l];
                        s.xs[l] = g;
                        s.ys[l] = y;
                    }
                } else {
                    s.parts = [];
                    do {
                        a = t__bin.readUshort(e__data, o);
                        o += 2;
                        const m = {
                            m: {
                                a: 1,
                                b: 0,
                                c: 0,
                                d: 1,
                                tx: 0,
                                ty: 0
                            },
                            p1: -1,
                            p2: -1
                        };
                        s.parts.push(m);
                        m.glyphIndex = t__bin.readUshort(e__data, o);
                        o += 2;
                        if (1 & a) {
                            var U = t__bin.readShort(e__data, o);
                            o += 2;
                            var S = t__bin.readShort(e__data, o);
                            o += 2;
                        } else {
                            U = t__bin.readInt8(e__data, o);
                            o++;
                            S = t__bin.readInt8(e__data, o);
                            o++;
                        }
                        if (2 & a) {
                            m.m.tx = U;
                            m.m.ty = S;
                        } else {
                            m.p1 = U;
                            m.p2 = S;
                        }
                        if (8 & a) {
                            m.m.a = m.m.d = t__bin.readF2dot14(e__data, o);
                            o += 2;
                        } else if (64 & a) {
                            m.m.a = t__bin.readF2dot14(e__data, o);
                            o += 2;
                            m.m.d = t__bin.readF2dot14(e__data, o);
                            o += 2;
                        } else if (128 & a) {
                            m.m.a = t__bin.readF2dot14(e__data, o);
                            o += 2;
                            m.m.b = t__bin.readF2dot14(e__data, o);
                            o += 2;
                            m.m.c = t__bin.readF2dot14(e__data, o);
                            o += 2;
                            m.m.d = t__bin.readF2dot14(e__data, o);
                            o += 2;
                        }
                    }while (32 & a)
                    if (256 & a) {
                        const b = t__bin.readUshort(e__data, o);
                        o += 2;
                        s.instr = [];
                        for(l = 0; l < b; l++){
                            s.instr.push(e__data[o]);
                            o++;
                        }
                    }
                }
                return s;
            }, t.GDEF = {}, t.GDEF.parse = function(e, r, a, n) {
                const i = r;
                r += 4;
                const o = t._bin.readUshort(e, r);
                return {
                    glyphClassDef: o === 0 ? null : t._lctf.readClassDef(e, i + o)
                };
            }, t.GPOS = {}, t.GPOS.parse = function(e, r, a, n) {
                return t._lctf.parse(e, r, a, n, t.GPOS.subt);
            }, t.GPOS.subt = function(e, r, a, n) {
                const t__bin = t._bin;
                const o = a;
                const s = {};
                s.fmt = t__bin.readUshort(e, a);
                a += 2;
                if (r == 1 || r == 2 || r == 3 || r == 7 || r == 8 && s.fmt <= 2) {
                    const l = t__bin.readUshort(e, a);
                    a += 2;
                    s.coverage = t._lctf.readCoverage(e, l + o);
                }
                if (r == 1 && s.fmt == 1) {
                    var h = t__bin.readUshort(e, a);
                    a += 2;
                    if (h != 0) {
                        s.pos = t.GPOS.readValueRecord(e, a, h);
                    }
                } else if (r == 2 && s.fmt >= 1 && s.fmt <= 2) {
                    h = t__bin.readUshort(e, a);
                    a += 2;
                    const u = t__bin.readUshort(e, a);
                    a += 2;
                    const f = t._lctf.numOfOnes(h);
                    const d = t._lctf.numOfOnes(u);
                    if (s.fmt == 1) {
                        s.pairsets = [];
                        const c = t__bin.readUshort(e, a);
                        a += 2;
                        for(var p = 0; p < c; p++){
                            let v = o + t__bin.readUshort(e, a);
                            a += 2;
                            const g = t__bin.readUshort(e, v);
                            v += 2;
                            const y = [];
                            for(var m = 0; m < g; m++){
                                const gid2 = t__bin.readUshort(e, v);
                                v += 2;
                                if (h != 0) {
                                    val1 = t.GPOS.readValueRecord(e, v, h);
                                    v += 2 * f;
                                }
                                if (u != 0) {
                                    val2 = t.GPOS.readValueRecord(e, v, u);
                                    v += 2 * d;
                                }
                                y.push({
                                    gid2,
                                    val1,
                                    val2
                                });
                            }
                            s.pairsets.push(y);
                        }
                    }
                    if (s.fmt == 2) {
                        const S = t__bin.readUshort(e, a);
                        a += 2;
                        const b = t__bin.readUshort(e, a);
                        a += 2;
                        const x = t__bin.readUshort(e, a);
                        a += 2;
                        const k = t__bin.readUshort(e, a);
                        a += 2;
                        s.classDef1 = t._lctf.readClassDef(e, o + S);
                        s.classDef2 = t._lctf.readClassDef(e, o + b);
                        s.matrix = [];
                        for(p = 0; p < x; p++){
                            const T = [];
                            for(m = 0; m < k; m++){
                                var val1 = null;
                                var val2 = null;
                                if (h != 0) {
                                    val1 = t.GPOS.readValueRecord(e, a, h);
                                    a += 2 * f;
                                }
                                if (u != 0) {
                                    val2 = t.GPOS.readValueRecord(e, a, u);
                                    a += 2 * d;
                                }
                                T.push({
                                    val1,
                                    val2
                                });
                            }
                            s.matrix.push(T);
                        }
                    }
                } else if (r == 4 && s.fmt == 1) {
                    s.markCoverage = t._lctf.readCoverage(e, t__bin.readUshort(e, a) + o);
                    s.baseCoverage = t._lctf.readCoverage(e, t__bin.readUshort(e, a + 2) + o);
                    s.markClassCount = t__bin.readUshort(e, a + 4);
                    s.markArray = t.GPOS.readMarkArray(e, t__bin.readUshort(e, a + 6) + o);
                    s.baseArray = t.GPOS.readBaseArray(e, t__bin.readUshort(e, a + 8) + o, s.markClassCount);
                } else if (r == 6 && s.fmt == 1) {
                    s.mark1Coverage = t._lctf.readCoverage(e, t__bin.readUshort(e, a) + o);
                    s.mark2Coverage = t._lctf.readCoverage(e, t__bin.readUshort(e, a + 2) + o);
                    s.markClassCount = t__bin.readUshort(e, a + 4);
                    s.mark1Array = t.GPOS.readMarkArray(e, t__bin.readUshort(e, a + 6) + o);
                    s.mark2Array = t.GPOS.readBaseArray(e, t__bin.readUshort(e, a + 8) + o, s.markClassCount);
                } else {
                    if (r == 9 && s.fmt == 1) {
                        const C = t__bin.readUshort(e, a);
                        a += 2;
                        const _ = t__bin.readUint(e, a);
                        a += 4;
                        if (n.ltype == 9) {
                            n.ltype = C;
                        } else if (n.ltype != C) {
                            throw "invalid extension substitution";
                        }
                        return t.GPOS.subt(e, n.ltype, o + _);
                    }
                    console.debug("unsupported GPOS table LookupType", r, "format", s.fmt);
                }
                return s;
            }, t.GPOS.readValueRecord = function(e, r, a) {
                const t__bin = t._bin;
                const i = [];
                i.push(1 & a ? t__bin.readShort(e, r) : 0);
                r += 1 & a ? 2 : 0;
                i.push(2 & a ? t__bin.readShort(e, r) : 0);
                r += 2 & a ? 2 : 0;
                i.push(4 & a ? t__bin.readShort(e, r) : 0);
                r += 4 & a ? 2 : 0;
                i.push(8 & a ? t__bin.readShort(e, r) : 0);
                r += 8 & a ? 2 : 0;
                return i;
            }, t.GPOS.readBaseArray = function(e, r, a) {
                const t__bin = t._bin;
                const i = [];
                const o = r;
                const s = t__bin.readUshort(e, r);
                r += 2;
                for(let l = 0; l < s; l++){
                    const h = [];
                    for(let u = 0; u < a; u++){
                        h.push(t.GPOS.readAnchorRecord(e, o + t__bin.readUshort(e, r)));
                        r += 2;
                    }
                    i.push(h);
                }
                return i;
            }, t.GPOS.readMarkArray = function(e, r) {
                const t__bin = t._bin;
                const n = [];
                const i = r;
                const o = t__bin.readUshort(e, r);
                r += 2;
                for(let s = 0; s < o; s++){
                    const l = t.GPOS.readAnchorRecord(e, t__bin.readUshort(e, r + 2) + i);
                    l.markClass = t__bin.readUshort(e, r);
                    n.push(l);
                    r += 4;
                }
                return n;
            }, t.GPOS.readAnchorRecord = function(e, r) {
                const t__bin = t._bin;
                const n = {};
                n.fmt = t__bin.readUshort(e, r);
                n.x = t__bin.readShort(e, r + 2);
                n.y = t__bin.readShort(e, r + 4);
                return n;
            }, t.GSUB = {}, t.GSUB.parse = function(e, r, a, n) {
                return t._lctf.parse(e, r, a, n, t.GSUB.subt);
            }, t.GSUB.subt = function(e, r, a, n) {
                const t__bin = t._bin;
                const o = a;
                const s = {};
                s.fmt = t__bin.readUshort(e, a);
                a += 2;
                if (r != 1 && r != 2 && r != 4 && r != 5 && r != 6) {
                    return null;
                }
                if (r == 1 || r == 2 || r == 4 || r == 5 && s.fmt <= 2 || r == 6 && s.fmt <= 2) {
                    const l = t__bin.readUshort(e, a);
                    a += 2;
                    s.coverage = t._lctf.readCoverage(e, o + l);
                }
                if (r == 1 && s.fmt >= 1 && s.fmt <= 2) {
                    if (s.fmt == 1) {
                        s.delta = t__bin.readShort(e, a);
                        a += 2;
                    } else if (s.fmt == 2) {
                        var h = t__bin.readUshort(e, a);
                        a += 2;
                        s.newg = t__bin.readUshorts(e, a, h);
                        a += 2 * s.newg.length;
                    }
                } else if (r == 2 && s.fmt == 1) {
                    h = t__bin.readUshort(e, a);
                    a += 2;
                    s.seqs = [];
                    for(var u = 0; u < h; u++){
                        const f = t__bin.readUshort(e, a) + o;
                        a += 2;
                        const d = t__bin.readUshort(e, f);
                        s.seqs.push(t__bin.readUshorts(e, f + 2, d));
                    }
                } else if (r == 4) {
                    s.vals = [];
                    h = t__bin.readUshort(e, a);
                    a += 2;
                    for(u = 0; u < h; u++){
                        const c = t__bin.readUshort(e, a);
                        a += 2;
                        s.vals.push(t.GSUB.readLigatureSet(e, o + c));
                    }
                } else if (r == 5 && s.fmt == 2) {
                    if (s.fmt == 2) {
                        const p = t__bin.readUshort(e, a);
                        a += 2;
                        s.cDef = t._lctf.readClassDef(e, o + p);
                        s.scset = [];
                        const v = t__bin.readUshort(e, a);
                        a += 2;
                        for(u = 0; u < v; u++){
                            const g = t__bin.readUshort(e, a);
                            a += 2;
                            s.scset.push(g == 0 ? null : t.GSUB.readSubClassSet(e, o + g));
                        }
                    }
                } else if (r == 6 && s.fmt == 3) {
                    if (s.fmt == 3) {
                        for(u = 0; u < 3; u++){
                            h = t__bin.readUshort(e, a);
                            a += 2;
                            const y = [];
                            for(let m = 0; m < h; m++){
                                y.push(t._lctf.readCoverage(e, o + t__bin.readUshort(e, a + 2 * m)));
                            }
                            a += 2 * h;
                            if (u == 0) {
                                s.backCvg = y;
                            }
                            if (u == 1) {
                                s.inptCvg = y;
                            }
                            if (u == 2) {
                                s.ahedCvg = y;
                            }
                        }
                        h = t__bin.readUshort(e, a);
                        a += 2;
                        s.lookupRec = t.GSUB.readSubstLookupRecords(e, a, h);
                    }
                } else {
                    if (r == 7 && s.fmt == 1) {
                        const U = t__bin.readUshort(e, a);
                        a += 2;
                        const S = t__bin.readUint(e, a);
                        a += 4;
                        if (n.ltype == 9) {
                            n.ltype = U;
                        } else if (n.ltype != U) {
                            throw "invalid extension substitution";
                        }
                        return t.GSUB.subt(e, n.ltype, o + S);
                    }
                    console.debug("unsupported GSUB table LookupType", r, "format", s.fmt);
                }
                return s;
            }, t.GSUB.readSubClassSet = function(e, r) {
                const readUshort = t._bin.readUshort;
                const n = r;
                const i = [];
                const o = readUshort(e, r);
                r += 2;
                for(let s = 0; s < o; s++){
                    const l = readUshort(e, r);
                    r += 2;
                    i.push(t.GSUB.readSubClassRule(e, n + l));
                }
                return i;
            }, t.GSUB.readSubClassRule = function(e, r) {
                const readUshort = t._bin.readUshort;
                const n = {};
                const i = readUshort(e, r);
                const o = readUshort(e, r += 2);
                r += 2;
                n.input = [];
                for(let s = 0; s < i - 1; s++){
                    n.input.push(readUshort(e, r));
                    r += 2;
                }
                n.substLookupRecords = t.GSUB.readSubstLookupRecords(e, r, o);
                return n;
            }, t.GSUB.readSubstLookupRecords = function(e, r, a) {
                const readUshort = t._bin.readUshort;
                const i = [];
                for(let o = 0; o < a; o++){
                    i.push(readUshort(e, r), readUshort(e, r + 2));
                    r += 4;
                }
                return i;
            }, t.GSUB.readChainSubClassSet = function(e, r) {
                const t__bin = t._bin;
                const n = r;
                const i = [];
                const o = t__bin.readUshort(e, r);
                r += 2;
                for(let s = 0; s < o; s++){
                    const l = t__bin.readUshort(e, r);
                    r += 2;
                    i.push(t.GSUB.readChainSubClassRule(e, n + l));
                }
                return i;
            }, t.GSUB.readChainSubClassRule = function(e, r) {
                const t__bin = t._bin;
                const n = {};
                for(let i = [
                    "backtrack",
                    "input",
                    "lookahead"
                ], o = 0; o < i.length; o++){
                    var s = t__bin.readUshort(e, r);
                    r += 2;
                    if (o == 1) {
                        s--;
                    }
                    n[i[o]] = t__bin.readUshorts(e, r, s);
                    r += 2 * n[i[o]].length;
                }
                s = t__bin.readUshort(e, r);
                r += 2;
                n.subst = t__bin.readUshorts(e, r, 2 * s);
                r += 2 * n.subst.length;
                return n;
            }, t.GSUB.readLigatureSet = function(e, r) {
                const t__bin = t._bin;
                const n = r;
                const i = [];
                const o = t__bin.readUshort(e, r);
                r += 2;
                for(let s = 0; s < o; s++){
                    const l = t__bin.readUshort(e, r);
                    r += 2;
                    i.push(t.GSUB.readLigature(e, n + l));
                }
                return i;
            }, t.GSUB.readLigature = function(e, r) {
                const t__bin = t._bin;
                const n = {
                    chain: []
                };
                n.nglyph = t__bin.readUshort(e, r);
                r += 2;
                const i = t__bin.readUshort(e, r);
                r += 2;
                for(let o = 0; o < i - 1; o++){
                    n.chain.push(t__bin.readUshort(e, r));
                    r += 2;
                }
                return n;
            }, t.head = {}, t.head.parse = function(e, r, a) {
                const t__bin = t._bin;
                const i = {};
                t__bin.readFixed(e, r);
                r += 4;
                i.fontRevision = t__bin.readFixed(e, r);
                r += 4;
                t__bin.readUint(e, r);
                r += 4;
                t__bin.readUint(e, r);
                r += 4;
                i.flags = t__bin.readUshort(e, r);
                r += 2;
                i.unitsPerEm = t__bin.readUshort(e, r);
                r += 2;
                i.created = t__bin.readUint64(e, r);
                r += 8;
                i.modified = t__bin.readUint64(e, r);
                r += 8;
                i.xMin = t__bin.readShort(e, r);
                r += 2;
                i.yMin = t__bin.readShort(e, r);
                r += 2;
                i.xMax = t__bin.readShort(e, r);
                r += 2;
                i.yMax = t__bin.readShort(e, r);
                r += 2;
                i.macStyle = t__bin.readUshort(e, r);
                r += 2;
                i.lowestRecPPEM = t__bin.readUshort(e, r);
                r += 2;
                i.fontDirectionHint = t__bin.readShort(e, r);
                r += 2;
                i.indexToLocFormat = t__bin.readShort(e, r);
                r += 2;
                i.glyphDataFormat = t__bin.readShort(e, r);
                r += 2;
                return i;
            }, t.hhea = {}, t.hhea.parse = function(e, r, a) {
                const t__bin = t._bin;
                const i = {};
                t__bin.readFixed(e, r);
                r += 4;
                i.ascender = t__bin.readShort(e, r);
                r += 2;
                i.descender = t__bin.readShort(e, r);
                r += 2;
                i.lineGap = t__bin.readShort(e, r);
                r += 2;
                i.advanceWidthMax = t__bin.readUshort(e, r);
                r += 2;
                i.minLeftSideBearing = t__bin.readShort(e, r);
                r += 2;
                i.minRightSideBearing = t__bin.readShort(e, r);
                r += 2;
                i.xMaxExtent = t__bin.readShort(e, r);
                r += 2;
                i.caretSlopeRise = t__bin.readShort(e, r);
                r += 2;
                i.caretSlopeRun = t__bin.readShort(e, r);
                r += 2;
                i.caretOffset = t__bin.readShort(e, r);
                r += 2;
                r += 8;
                i.metricDataFormat = t__bin.readShort(e, r);
                r += 2;
                i.numberOfHMetrics = t__bin.readUshort(e, r);
                r += 2;
                return i;
            }, t.hmtx = {}, t.hmtx.parse = function(e, r, a, n) {
                const t__bin = t._bin;
                const o = {
                    aWidth: [],
                    lsBearing: []
                };
                let s = 0;
                let l = 0;
                for(let h = 0; h < n.maxp.numGlyphs; h++){
                    if (h < n.hhea.numberOfHMetrics) {
                        s = t__bin.readUshort(e, r);
                        r += 2;
                        l = t__bin.readShort(e, r);
                        r += 2;
                    }
                    o.aWidth.push(s);
                    o.lsBearing.push(l);
                }
                return o;
            }, t.kern = {}, t.kern.parse = function(e, r, a, n) {
                const t__bin = t._bin;
                const o = t__bin.readUshort(e, r);
                r += 2;
                if (o == 1) {
                    return t.kern.parseV1(e, r - 2, a, n);
                }
                const s = t__bin.readUshort(e, r);
                r += 2;
                const l = {
                    glyph1: [],
                    rval: []
                };
                for(let h = 0; h < s; h++){
                    r += 2;
                    a = t__bin.readUshort(e, r);
                    r += 2;
                    const u = t__bin.readUshort(e, r);
                    r += 2;
                    let f = u >>> 8;
                    if ((f &= 15) != 0) {
                        throw `unknown kern table format: ${f}`;
                    }
                    r = t.kern.readFormat0(e, r, l);
                }
                return l;
            }, t.kern.parseV1 = function(e, r, a, n) {
                const t__bin = t._bin;
                t__bin.readFixed(e, r);
                r += 4;
                const o = t__bin.readUint(e, r);
                r += 4;
                const s = {
                    glyph1: [],
                    rval: []
                };
                for(let l = 0; l < o; l++){
                    t__bin.readUint(e, r);
                    r += 4;
                    const h = t__bin.readUshort(e, r);
                    r += 2;
                    t__bin.readUshort(e, r);
                    r += 2;
                    let u = h >>> 8;
                    if ((u &= 15) != 0) {
                        throw `unknown kern table format: ${u}`;
                    }
                    r = t.kern.readFormat0(e, r, s);
                }
                return s;
            }, t.kern.readFormat0 = function(e, r, a) {
                const t__bin = t._bin;
                let i = -1;
                const o = t__bin.readUshort(e, r);
                r += 2;
                t__bin.readUshort(e, r);
                r += 2;
                t__bin.readUshort(e, r);
                r += 2;
                t__bin.readUshort(e, r);
                r += 2;
                for(let s = 0; s < o; s++){
                    const l = t__bin.readUshort(e, r);
                    r += 2;
                    const h = t__bin.readUshort(e, r);
                    r += 2;
                    const u = t__bin.readShort(e, r);
                    r += 2;
                    if (l != i) {
                        a.glyph1.push(l);
                        a.rval.push({
                            glyph2: [],
                            vals: []
                        });
                    }
                    const f = a.rval[a.rval.length - 1];
                    f.glyph2.push(h);
                    f.vals.push(u);
                    i = l;
                }
                return r;
            }, t.loca = {}, t.loca.parse = function(e, r, a, n) {
                const t__bin = t._bin;
                const o = [];
                const indexToLocFormat = n.head.indexToLocFormat;
                const l = n.maxp.numGlyphs + 1;
                if (indexToLocFormat == 0) {
                    for(var h = 0; h < l; h++){
                        o.push(t__bin.readUshort(e, r + (h << 1)) << 1);
                    }
                }
                if (indexToLocFormat == 1) {
                    for(h = 0; h < l; h++){
                        o.push(t__bin.readUint(e, r + (h << 2)));
                    }
                }
                return o;
            }, t.maxp = {}, t.maxp.parse = function(e, r, a) {
                const t__bin = t._bin;
                const i = {};
                const o = t__bin.readUint(e, r);
                r += 4;
                i.numGlyphs = t__bin.readUshort(e, r);
                r += 2;
                if (o == 65536) {
                    i.maxPoints = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxContours = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxCompositePoints = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxCompositeContours = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxZones = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxTwilightPoints = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxStorage = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxFunctionDefs = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxInstructionDefs = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxStackElements = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxSizeOfInstructions = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxComponentElements = t__bin.readUshort(e, r);
                    r += 2;
                    i.maxComponentDepth = t__bin.readUshort(e, r);
                    r += 2;
                }
                return i;
            }, t.name = {}, t.name.parse = function(e, r, a) {
                const t__bin = t._bin;
                const i = {};
                t__bin.readUshort(e, r);
                r += 2;
                const o = t__bin.readUshort(e, r);
                r += 2;
                t__bin.readUshort(e, r);
                let s;
                const l = [
                    "copyright",
                    "fontFamily",
                    "fontSubfamily",
                    "ID",
                    "fullName",
                    "version",
                    "postScriptName",
                    "trademark",
                    "manufacturer",
                    "designer",
                    "description",
                    "urlVendor",
                    "urlDesigner",
                    "licence",
                    "licenceURL",
                    "---",
                    "typoFamilyName",
                    "typoSubfamilyName",
                    "compatibleFull",
                    "sampleText",
                    "postScriptCID",
                    "wwsFamilyName",
                    "wwsSubfamilyName",
                    "lightPalette",
                    "darkPalette"
                ];
                const h = r += 2;
                for(let u = 0; u < o; u++){
                    const f = t__bin.readUshort(e, r);
                    r += 2;
                    const d = t__bin.readUshort(e, r);
                    r += 2;
                    const c = t__bin.readUshort(e, r);
                    r += 2;
                    const p = t__bin.readUshort(e, r);
                    r += 2;
                    const v = t__bin.readUshort(e, r);
                    r += 2;
                    const g = t__bin.readUshort(e, r);
                    r += 2;
                    let y;
                    const m = l[p];
                    const U = h + 12 * o + g;
                    if (f == 0) {
                        y = t__bin.readUnicode(e, U, v / 2);
                    } else if (f == 3 && d == 0) {
                        y = t__bin.readUnicode(e, U, v / 2);
                    } else if (d == 0) {
                        y = t__bin.readASCII(e, U, v);
                    } else if (d == 1) {
                        y = t__bin.readUnicode(e, U, v / 2);
                    } else if (d == 3) {
                        y = t__bin.readUnicode(e, U, v / 2);
                    } else {
                        if (f != 1) {
                            throw `unknown encoding ${d}, platformID: ${f}`;
                        }
                        y = t__bin.readASCII(e, U, v);
                        console.debug(`reading unknown MAC encoding ${d} as ASCII`);
                    }
                    const S = `p${f},${c.toString(16)}`;
                    if (i[S] == null) {
                        i[S] = {};
                    }
                    i[S][m !== undefined ? m : p] = y;
                    i[S]._lang = c;
                }
                for(var b in i){
                    if (i[b].postScriptName != null && i[b]._lang == 1033) {
                        return i[b];
                    }
                }
                for(var b in i){
                    if (i[b].postScriptName != null && i[b]._lang == 0) {
                        return i[b];
                    }
                }
                for(var b in i){
                    if (i[b].postScriptName != null && i[b]._lang == 3084) {
                        return i[b];
                    }
                }
                for(var b in i){
                    if (i[b].postScriptName != null) {
                        return i[b];
                    }
                }
                for(var b in i){
                    s = b;
                    break;
                }
                console.debug(`returning name table with languageID ${i[s]._lang}`);
                return i[s];
            }, t["OS/2"] = {}, t["OS/2"].parse = function(e, r, a) {
                const n = t._bin.readUshort(e, r);
                r += 2;
                const i = {};
                if (n == 0) {
                    t["OS/2"].version0(e, r, i);
                } else if (n == 1) {
                    t["OS/2"].version1(e, r, i);
                } else if (n == 2 || n == 3 || n == 4) {
                    t["OS/2"].version2(e, r, i);
                } else {
                    if (n != 5) {
                        throw `unknown OS/2 table version: ${n}`;
                    }
                    t["OS/2"].version5(e, r, i);
                }
                return i;
            }, t["OS/2"].version0 = function(e, r, a) {
                const t__bin = t._bin;
                a.xAvgCharWidth = t__bin.readShort(e, r);
                r += 2;
                a.usWeightClass = t__bin.readUshort(e, r);
                r += 2;
                a.usWidthClass = t__bin.readUshort(e, r);
                r += 2;
                a.fsType = t__bin.readUshort(e, r);
                r += 2;
                a.ySubscriptXSize = t__bin.readShort(e, r);
                r += 2;
                a.ySubscriptYSize = t__bin.readShort(e, r);
                r += 2;
                a.ySubscriptXOffset = t__bin.readShort(e, r);
                r += 2;
                a.ySubscriptYOffset = t__bin.readShort(e, r);
                r += 2;
                a.ySuperscriptXSize = t__bin.readShort(e, r);
                r += 2;
                a.ySuperscriptYSize = t__bin.readShort(e, r);
                r += 2;
                a.ySuperscriptXOffset = t__bin.readShort(e, r);
                r += 2;
                a.ySuperscriptYOffset = t__bin.readShort(e, r);
                r += 2;
                a.yStrikeoutSize = t__bin.readShort(e, r);
                r += 2;
                a.yStrikeoutPosition = t__bin.readShort(e, r);
                r += 2;
                a.sFamilyClass = t__bin.readShort(e, r);
                r += 2;
                a.panose = t__bin.readBytes(e, r, 10);
                r += 10;
                a.ulUnicodeRange1 = t__bin.readUint(e, r);
                r += 4;
                a.ulUnicodeRange2 = t__bin.readUint(e, r);
                r += 4;
                a.ulUnicodeRange3 = t__bin.readUint(e, r);
                r += 4;
                a.ulUnicodeRange4 = t__bin.readUint(e, r);
                r += 4;
                a.achVendID = [
                    t__bin.readInt8(e, r),
                    t__bin.readInt8(e, r + 1),
                    t__bin.readInt8(e, r + 2),
                    t__bin.readInt8(e, r + 3)
                ];
                r += 4;
                a.fsSelection = t__bin.readUshort(e, r);
                r += 2;
                a.usFirstCharIndex = t__bin.readUshort(e, r);
                r += 2;
                a.usLastCharIndex = t__bin.readUshort(e, r);
                r += 2;
                a.sTypoAscender = t__bin.readShort(e, r);
                r += 2;
                a.sTypoDescender = t__bin.readShort(e, r);
                r += 2;
                a.sTypoLineGap = t__bin.readShort(e, r);
                r += 2;
                a.usWinAscent = t__bin.readUshort(e, r);
                r += 2;
                a.usWinDescent = t__bin.readUshort(e, r);
                return r += 2;
            }, t["OS/2"].version1 = function(e, r, a) {
                const t__bin = t._bin;
                r = t["OS/2"].version0(e, r, a);
                a.ulCodePageRange1 = t__bin.readUint(e, r);
                r += 4;
                a.ulCodePageRange2 = t__bin.readUint(e, r);
                return r += 4;
            }, t["OS/2"].version2 = function(e, r, a) {
                const t__bin = t._bin;
                r = t["OS/2"].version1(e, r, a);
                a.sxHeight = t__bin.readShort(e, r);
                r += 2;
                a.sCapHeight = t__bin.readShort(e, r);
                r += 2;
                a.usDefault = t__bin.readUshort(e, r);
                r += 2;
                a.usBreak = t__bin.readUshort(e, r);
                r += 2;
                a.usMaxContext = t__bin.readUshort(e, r);
                return r += 2;
            }, t["OS/2"].version5 = function(e, r, a) {
                const t__bin = t._bin;
                r = t["OS/2"].version2(e, r, a);
                a.usLowerOpticalPointSize = t__bin.readUshort(e, r);
                r += 2;
                a.usUpperOpticalPointSize = t__bin.readUshort(e, r);
                return r += 2;
            }, t.post = {}, t.post.parse = function(e, r, a) {
                const t__bin = t._bin;
                const i = {};
                i.version = t__bin.readFixed(e, r);
                r += 4;
                i.italicAngle = t__bin.readFixed(e, r);
                r += 4;
                i.underlinePosition = t__bin.readShort(e, r);
                r += 2;
                i.underlineThickness = t__bin.readShort(e, r);
                r += 2;
                return i;
            }, t == null && (t = {}), t.U == null && (t.U = {}), t.U.codeToGlyph = function({ cmap }, t) {
                let a = -1;
                if (cmap.p0e4 != null) {
                    a = cmap.p0e4;
                } else if (cmap.p3e1 != null) {
                    a = cmap.p3e1;
                } else if (cmap.p1e0 != null) {
                    a = cmap.p1e0;
                } else if (cmap.p0e3 != null) {
                    a = cmap.p0e3;
                }
                if (a == -1) {
                    throw "no familiar platform and encoding!";
                }
                const n = cmap.tables[a];
                if (n.format == 0) {
                    if (t >= n.map.length) {
                        return 0;
                    }
                    return n.map[t];
                }
                if (n.format == 4) {
                    let i = -1;
                    for(var o = 0; o < n.endCount.length; o++){
                        if (t <= n.endCount[o]) {
                            i = o;
                            break;
                        }
                    }
                    if (i == -1 || n.startCount[i] > t) {
                        return 0;
                    }
                    return 65535 & (n.idRangeOffset[i] != 0 ? n.glyphIdArray[t - n.startCount[i] + (n.idRangeOffset[i] >> 1) - (n.idRangeOffset.length - i)] : t + n.idDelta[i]);
                }
                if (n.format == 12) {
                    if (t > n.groups[n.groups.length - 1][1]) {
                        return 0;
                    }
                    for(o = 0; o < n.groups.length; o++){
                        const s = n.groups[o];
                        if (s[0] <= t && t <= s[1]) {
                            return s[2] + (t - s[0]);
                        }
                    }
                    return 0;
                }
                throw `unknown cmap table format ${n.format}`;
            }, t.U.glyphToPath = function(e, r) {
                const a = {
                    cmds: [],
                    crds: []
                };
                if (e.SVG && e.SVG.entries[r]) {
                    let n = e.SVG.entries[r];
                    if (n == null) {
                        return a;
                    }
                    if (typeof n === "string") {
                        n = t.SVG.toPath(n);
                        e.SVG.entries[r] = n;
                    }
                    return n;
                }
                if (e.CFF) {
                    const i = {
                        x: 0,
                        y: 0,
                        stack: [],
                        nStems: 0,
                        haveWidth: false,
                        width: e.CFF.Private ? e.CFF.Private.defaultWidthX : 0,
                        open: false
                    };
                    const o = e.CFF;
                    let s = e.CFF.Private;
                    if (o.ROS) {
                        for(var l = 0; o.FDSelect[l + 2] <= r;){
                            l += 2;
                        }
                        s = o.FDArray[o.FDSelect[l + 1]].Private;
                    }
                    t.U._drawCFF(e.CFF.CharStrings[r], i, o, s, a);
                } else {
                    if (e.glyf) {
                        t.U._drawGlyf(r, e, a);
                    }
                }
                return a;
            }, t.U._drawGlyf = function(e, r, a) {
                let n = r.glyf[e];
                if (n == null) {
                    n = r.glyf[e] = t.glyf._parseGlyf(r, e);
                }
                if (n != null) {
                    if (n.noc > -1) {
                        t.U._simpleGlyph(n, a);
                    } else {
                        t.U._compoGlyph(n, r, a);
                    }
                }
            }, t.U._simpleGlyph = function(e, r) {
                for(let a = 0; a < e.noc; a++){
                    const n = a == 0 ? 0 : e.endPts[a - 1] + 1;
                    for(let i = e.endPts[a], o = n; o <= i; o++){
                        const s = o == n ? i : o - 1;
                        const l = o == i ? n : o + 1;
                        const h = 1 & e.flags[o];
                        const u = 1 & e.flags[s];
                        const f = 1 & e.flags[l];
                        const d = e.xs[o];
                        const c = e.ys[o];
                        if (o == n) {
                            if (h) {
                                if (!u) {
                                    t.U.P.moveTo(r, d, c);
                                    continue;
                                }
                                t.U.P.moveTo(r, e.xs[s], e.ys[s]);
                            } else {
                                if (u) {
                                    t.U.P.moveTo(r, e.xs[s], e.ys[s]);
                                } else {
                                    t.U.P.moveTo(r, (e.xs[s] + d) / 2, (e.ys[s] + c) / 2);
                                }
                            }
                        }
                        if (h) {
                            if (u) {
                                t.U.P.lineTo(r, d, c);
                            }
                        } else if (f) {
                            t.U.P.qcurveTo(r, d, c, e.xs[l], e.ys[l]);
                        } else {
                            t.U.P.qcurveTo(r, d, c, (d + e.xs[l]) / 2, (c + e.ys[l]) / 2);
                        }
                    }
                    t.U.P.closePath(r);
                }
            }, t.U._compoGlyph = function(e, r, a) {
                for(let n = 0; n < e.parts.length; n++){
                    const i = {
                        cmds: [],
                        crds: []
                    };
                    const part = e.parts[n];
                    t.U._drawGlyf(part.glyphIndex, r, i);
                    const s = part.m;
                    for(var l = 0; l < i.crds.length; l += 2){
                        const crd = i.crds[l];
                        const u = i.crds[l + 1];
                        a.crds.push(crd * s.a + u * s.b + s.tx);
                        a.crds.push(crd * s.c + u * s.d + s.ty);
                    }
                    for(l = 0; l < i.cmds.length; l++){
                        a.cmds.push(i.cmds[l]);
                    }
                }
            }, t.U._getGlyphClass = function(e, r) {
                const a = t._lctf.getInterval(r, e);
                if (a == -1) {
                    return 0;
                }
                return r[a + 2];
            }, t.U._applySubs = function(e, r, a, n) {
                const i = e.length - r - 1;
                for(let o = 0; o < a.tabs.length; o++){
                    if (a.tabs[o] != null) {
                        let s;
                        const l = a.tabs[o];
                        if (!l.coverage || (s = t._lctf.coverageIndex(l.coverage, e[r])) != -1) {
                            if (a.ltype == 1) {
                                e[r];
                                if (l.fmt == 1) {
                                    e[r] = e[r] + l.delta;
                                } else {
                                    e[r] = l.newg[s];
                                }
                            } else if (a.ltype == 4) {
                                for(var h = l.vals[s], u = 0; u < h.length; u++){
                                    const f = h[u];
                                    const d = f.chain.length;
                                    if (!(d > i)) {
                                        var c = true;
                                        let p = 0;
                                        for(var v = 0; v < d; v++){
                                            while(e[r + p + (1 + v)] == -1){
                                                p++;
                                            }
                                            if (f.chain[v] != e[r + p + (1 + v)]) {
                                                c = false;
                                            }
                                        }
                                        if (c) {
                                            v = 0;
                                            for(e[r] = f.nglyph; v < d + p; v++){
                                                e[r + v + 1] = -1;
                                            }
                                            break;
                                        }
                                    }
                                }
                            } else if (a.ltype == 5 && l.fmt == 2) {
                                var g = t._lctf.getInterval(l.cDef, e[r]);
                                const y = l.cDef[g + 2];
                                for(var m = l.scset[y], U = 0; U < m.length; U++){
                                    const S = m[U];
                                    const b = S.input;
                                    if (!(b.length > i)) {
                                        c = true;
                                        for(v = 0; v < b.length; v++){
                                            const x = t._lctf.getInterval(l.cDef, e[r + 1 + v]);
                                            if (g == -1 && l.cDef[x + 2] != b[v]) {
                                                c = false;
                                                break;
                                            }
                                        }
                                        if (c) {
                                            const k = S.substLookupRecords;
                                            for(u = 0; u < k.length; u += 2){
                                                k[u];
                                                k[u + 1];
                                            }
                                        }
                                    }
                                }
                            } else if (a.ltype == 6 && l.fmt == 3) {
                                if (!t.U._glsCovered(e, l.backCvg, r - l.backCvg.length) || !t.U._glsCovered(e, l.inptCvg, r) || !t.U._glsCovered(e, l.ahedCvg, r + l.inptCvg.length)) {
                                    continue;
                                }
                                const T = l.lookupRec;
                                for(U = 0; U < T.length; U += 2){
                                    g = T[U];
                                    const F = n[T[U + 1]];
                                    t.U._applySubs(e, r + g, F, n);
                                }
                            }
                        }
                    }
                }
            }, t.U._glsCovered = function(e, r, a) {
                for(let n = 0; n < r.length; n++){
                    if (t._lctf.coverageIndex(r[n], e[a + n]) == -1) {
                        return false;
                    }
                }
                return true;
            }, t.U.glyphsToPath = function(e, r, a) {
                const n = {
                    cmds: [],
                    crds: []
                };
                let i = 0;
                for(let o = 0; o < r.length; o++){
                    const s = r[o];
                    if (s != -1) {
                        const l = o < r.length - 1 && r[o + 1] != -1 ? r[o + 1] : 0;
                        for(var h = t.U.glyphToPath(e, s), u = 0; u < h.crds.length; u += 2){
                            n.crds.push(h.crds[u] + i);
                            n.crds.push(h.crds[u + 1]);
                        }
                        if (a) {
                            n.cmds.push(a);
                        }
                        for(u = 0; u < h.cmds.length; u++){
                            n.cmds.push(h.cmds[u]);
                        }
                        if (a) {
                            n.cmds.push("X");
                        }
                        i += e.hmtx.aWidth[s];
                        if (o < r.length - 1) {
                            i += t.U.getPairAdjustment(e, s, l);
                        }
                    }
                }
                return n;
            }, t.U.P = {}, t.U.P.moveTo = function(e, t, r) {
                e.cmds.push("M");
                e.crds.push(t, r);
            }, t.U.P.lineTo = function(e, t, r) {
                e.cmds.push("L");
                e.crds.push(t, r);
            }, t.U.P.curveTo = function(e, t, r, a, n, i, o) {
                e.cmds.push("C");
                e.crds.push(t, r, a, n, i, o);
            }, t.U.P.qcurveTo = function(e, t, r, a, n) {
                e.cmds.push("Q");
                e.crds.push(t, r, a, n);
            }, t.U.P.closePath = function(e) {
                e.cmds.push("Z");
            }, t.U._drawCFF = function(e, r, a, n, i) {
                const r_stack = r.stack;
                let r_nStems = r.nStems;
                let r_haveWidth = r.haveWidth;
                let r_width = r.width;
                let r_open = r.open;
                for(var f = 0, d = r.x, c = r.y, p = 0, v = 0, g = 0, y = 0, m = 0, U = 0, S = 0, b = 0, x = 0, k = 0, T = {
                    val: 0,
                    size: 0
                }; f < e.length;){
                    t.CFF.getCharString(e, f, T);
                    const F = T.val;
                    f += T.size;
                    if (F == "o1" || F == "o18") {
                        if (!(r_stack.length % 2 == 0 || r_haveWidth)) {
                            r_width = r_stack.shift() + n.nominalWidthX;
                        }
                        r_nStems += r_stack.length >> 1;
                        r_stack.length = 0;
                        r_haveWidth = true;
                    } else if (F == "o3" || F == "o23") {
                        if (!(r_stack.length % 2 == 0 || r_haveWidth)) {
                            r_width = r_stack.shift() + n.nominalWidthX;
                        }
                        r_nStems += r_stack.length >> 1;
                        r_stack.length = 0;
                        r_haveWidth = true;
                    } else if (F == "o4") {
                        if (r_stack.length > 1 && !r_haveWidth) {
                            r_width = r_stack.shift() + n.nominalWidthX;
                            r_haveWidth = true;
                        }
                        if (r_open) {
                            t.U.P.closePath(i);
                        }
                        c += r_stack.pop();
                        t.U.P.moveTo(i, d, c);
                        r_open = true;
                    } else if (F == "o5") {
                        while(r_stack.length > 0){
                            d += r_stack.shift();
                            c += r_stack.shift();
                            t.U.P.lineTo(i, d, c);
                        }
                    } else if (F == "o6" || F == "o7") {
                        for(var w = r_stack.length, C = F == "o6", _ = 0; _ < w; _++){
                            const D = r_stack.shift();
                            if (C) {
                                d += D;
                            } else {
                                c += D;
                            }
                            C = !C;
                            t.U.P.lineTo(i, d, c);
                        }
                    } else if (F == "o8" || F == "o24") {
                        w = r_stack.length;
                        for(var A = 0; A + 6 <= w;){
                            p = d + r_stack.shift();
                            v = c + r_stack.shift();
                            g = p + r_stack.shift();
                            y = v + r_stack.shift();
                            d = g + r_stack.shift();
                            c = y + r_stack.shift();
                            t.U.P.curveTo(i, p, v, g, y, d, c);
                            A += 6;
                        }
                        if (F == "o24") {
                            d += r_stack.shift();
                            c += r_stack.shift();
                            t.U.P.lineTo(i, d, c);
                        }
                    } else {
                        if (F == "o11") {
                            break;
                        }
                        if (F == "o1234" || F == "o1235" || F == "o1236" || F == "o1237") {
                            if (F == "o1234") {
                                v = c;
                                g = (p = d + r_stack.shift()) + r_stack.shift();
                                k = y = v + r_stack.shift();
                                U = y;
                                b = c;
                                d = (S = (m = (x = g + r_stack.shift()) + r_stack.shift()) + r_stack.shift()) + r_stack.shift();
                                t.U.P.curveTo(i, p, v, g, y, x, k);
                                t.U.P.curveTo(i, m, U, S, b, d, c);
                            }
                            if (F == "o1235") {
                                p = d + r_stack.shift();
                                v = c + r_stack.shift();
                                g = p + r_stack.shift();
                                y = v + r_stack.shift();
                                x = g + r_stack.shift();
                                k = y + r_stack.shift();
                                m = x + r_stack.shift();
                                U = k + r_stack.shift();
                                S = m + r_stack.shift();
                                b = U + r_stack.shift();
                                d = S + r_stack.shift();
                                c = b + r_stack.shift();
                                r_stack.shift();
                                t.U.P.curveTo(i, p, v, g, y, x, k);
                                t.U.P.curveTo(i, m, U, S, b, d, c);
                            }
                            if (F == "o1236") {
                                p = d + r_stack.shift();
                                v = c + r_stack.shift();
                                g = p + r_stack.shift();
                                k = y = v + r_stack.shift();
                                U = y;
                                S = (m = (x = g + r_stack.shift()) + r_stack.shift()) + r_stack.shift();
                                b = U + r_stack.shift();
                                d = S + r_stack.shift();
                                t.U.P.curveTo(i, p, v, g, y, x, k);
                                t.U.P.curveTo(i, m, U, S, b, d, c);
                            }
                            if (F == "o1237") {
                                p = d + r_stack.shift();
                                v = c + r_stack.shift();
                                g = p + r_stack.shift();
                                y = v + r_stack.shift();
                                x = g + r_stack.shift();
                                k = y + r_stack.shift();
                                m = x + r_stack.shift();
                                U = k + r_stack.shift();
                                if (Math.abs((S = m + r_stack.shift()) - d) > Math.abs((b = U + r_stack.shift()) - c)) {
                                    d = S + r_stack.shift();
                                } else {
                                    c = b + r_stack.shift();
                                }
                                t.U.P.curveTo(i, p, v, g, y, x, k);
                                t.U.P.curveTo(i, m, U, S, b, d, c);
                            }
                        } else if (F == "o14") {
                            if (r_stack.length > 0 && !r_haveWidth) {
                                r_width = r_stack.shift() + a.nominalWidthX;
                                r_haveWidth = true;
                            }
                            if (r_stack.length == 4) {
                                const G = r_stack.shift();
                                const P = r_stack.shift();
                                const O = r_stack.shift();
                                const I = r_stack.shift();
                                const B = t.CFF.glyphBySE(a, O);
                                const R = t.CFF.glyphBySE(a, I);
                                t.U._drawCFF(a.CharStrings[B], r, a, n, i);
                                r.x = G;
                                r.y = P;
                                t.U._drawCFF(a.CharStrings[R], r, a, n, i);
                            }
                            if (r_open) {
                                t.U.P.closePath(i);
                                r_open = false;
                            }
                        } else if (F == "o19" || F == "o20") {
                            if (!(r_stack.length % 2 == 0 || r_haveWidth)) {
                                r_width = r_stack.shift() + n.nominalWidthX;
                            }
                            r_nStems += r_stack.length >> 1;
                            r_stack.length = 0;
                            r_haveWidth = true;
                            f += r_nStems + 7 >> 3;
                        } else if (F == "o21") {
                            if (r_stack.length > 2 && !r_haveWidth) {
                                r_width = r_stack.shift() + n.nominalWidthX;
                                r_haveWidth = true;
                            }
                            c += r_stack.pop();
                            d += r_stack.pop();
                            if (r_open) {
                                t.U.P.closePath(i);
                            }
                            t.U.P.moveTo(i, d, c);
                            r_open = true;
                        } else if (F == "o22") {
                            if (r_stack.length > 1 && !r_haveWidth) {
                                r_width = r_stack.shift() + n.nominalWidthX;
                                r_haveWidth = true;
                            }
                            d += r_stack.pop();
                            if (r_open) {
                                t.U.P.closePath(i);
                            }
                            t.U.P.moveTo(i, d, c);
                            r_open = true;
                        } else if (F == "o25") {
                            while(r_stack.length > 6){
                                d += r_stack.shift();
                                c += r_stack.shift();
                                t.U.P.lineTo(i, d, c);
                            }
                            p = d + r_stack.shift();
                            v = c + r_stack.shift();
                            g = p + r_stack.shift();
                            y = v + r_stack.shift();
                            d = g + r_stack.shift();
                            c = y + r_stack.shift();
                            t.U.P.curveTo(i, p, v, g, y, d, c);
                        } else if (F == "o26") {
                            for(r_stack.length % 2 && (d += r_stack.shift()); r_stack.length > 0;){
                                p = d;
                                v = c + r_stack.shift();
                                d = g = p + r_stack.shift();
                                c = (y = v + r_stack.shift()) + r_stack.shift();
                                t.U.P.curveTo(i, p, v, g, y, d, c);
                            }
                        } else if (F == "o27") {
                            for(r_stack.length % 2 && (c += r_stack.shift()); r_stack.length > 0;){
                                v = c;
                                g = (p = d + r_stack.shift()) + r_stack.shift();
                                y = v + r_stack.shift();
                                d = g + r_stack.shift();
                                c = y;
                                t.U.P.curveTo(i, p, v, g, y, d, c);
                            }
                        } else if (F == "o10" || F == "o29") {
                            const M = F == "o10" ? n : a;
                            if (r_stack.length == 0) {
                                console.debug("error: empty stack");
                            } else {
                                const E = r_stack.pop();
                                const L = M.Subrs[E + M.Bias];
                                r.x = d;
                                r.y = c;
                                r.nStems = r_nStems;
                                r.haveWidth = r_haveWidth;
                                r.width = r_width;
                                r.open = r_open;
                                t.U._drawCFF(L, r, a, n, i);
                                d = r.x;
                                c = r.y;
                                r_nStems = r.nStems;
                                r_haveWidth = r.haveWidth;
                                r_width = r.width;
                                r_open = r.open;
                            }
                        } else if (F == "o30" || F == "o31") {
                            const W = r_stack.length;
                            A = 0;
                            let z = F == "o31";
                            for(A += W - (w = -3 & W); A < w;){
                                if (z) {
                                    v = c;
                                    g = (p = d + r_stack.shift()) + r_stack.shift();
                                    c = (y = v + r_stack.shift()) + r_stack.shift();
                                    if (w - A == 5) {
                                        d = g + r_stack.shift();
                                        A++;
                                    } else {
                                        d = g;
                                    }
                                    z = false;
                                } else {
                                    p = d;
                                    v = c + r_stack.shift();
                                    g = p + r_stack.shift();
                                    y = v + r_stack.shift();
                                    d = g + r_stack.shift();
                                    if (w - A == 5) {
                                        c = y + r_stack.shift();
                                        A++;
                                    } else {
                                        c = y;
                                    }
                                    z = true;
                                }
                                t.U.P.curveTo(i, p, v, g, y, d, c);
                                A += 4;
                            }
                        } else {
                            if (`${F}`.charAt(0) == "o") {
                                console.debug(`Unknown operation: ${F}`, e);
                                throw F;
                            }
                            r_stack.push(F);
                        }
                    }
                }
                r.x = d;
                r.y = c;
                r.nStems = r_nStems;
                r.haveWidth = r_haveWidth;
                r.width = r_width;
                r.open = r_open;
            }, e.Typr = Typr = t, e.default = {
                Typr
            }, Object.defineProperty(e, "__esModule", {
                value: true
            }), e).Typr;
        },
        function() {
            return ((e)=>{
                const n = new Uint8Array([
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
                    0,
                    0,
                    0,
                    0
                ]);
                const i = new Uint8Array([
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
                    13,
                    0,
                    0
                ]);
                const o = new Uint8Array([
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
                const s = (e, t)=>{
                    const n = new Uint16Array(31);
                    for(var i = 0; i < 31; ++i){
                        n[i] = t += 1 << e[i - 1];
                    }
                    const o = new Uint32Array(n[30]);
                    for(i = 1; i < 30; ++i){
                        for(let s = n[i]; s < n[i + 1]; ++s){
                            o[s] = s - n[i] << 5 | i;
                        }
                    }
                    return [
                        n,
                        o
                    ];
                };
                const l = s(n, 2);
                const h = l[0];
                const u = l[1];
                h[28] = 258;
                u[258] = 28;
                const f = s(i, 0)[0];
                const d = new Uint16Array(32768);
                for(var c = 0; c < 32768; ++c){
                    let p = (43690 & c) >>> 1 | (21845 & c) << 1;
                    p = (61680 & (p = (52428 & p) >>> 2 | (13107 & p) << 2)) >>> 4 | (3855 & p) << 4;
                    d[c] = ((65280 & p) >>> 8 | (255 & p) << 8) >>> 1;
                }
                const v = (e, t, a)=>{
                    for(var n = e.length, i = 0, o = new Uint16Array(t); i < n; ++i){
                        ++o[e[i] - 1];
                    }
                    let s;
                    const l = new Uint16Array(t);
                    for(i = 0; i < t; ++i){
                        l[i] = l[i - 1] + o[i - 1] << 1;
                    }
                    if (a) {
                        s = new Uint16Array(1 << t);
                        const h = 15 - t;
                        for(i = 0; i < n; ++i){
                            if (e[i]) {
                                const u = i << 4 | e[i];
                                const f = t - e[i];
                                for(let c = l[e[i] - 1]++ << f, p = c | (1 << f) - 1; c <= p; ++c){
                                    s[d[c] >>> h] = u;
                                }
                            }
                        }
                    } else {
                        s = new Uint16Array(n);
                        for(i = 0; i < n; ++i){
                            if (e[i]) {
                                s[i] = d[l[e[i] - 1]++] >>> 15 - e[i];
                            }
                        }
                    }
                    return s;
                };
                const g = new Uint8Array(288);
                for(c = 0; c < 144; ++c){
                    g[c] = 8;
                }
                for(c = 144; c < 256; ++c){
                    g[c] = 9;
                }
                for(c = 256; c < 280; ++c){
                    g[c] = 7;
                }
                for(c = 280; c < 288; ++c){
                    g[c] = 8;
                }
                const y = new Uint8Array(32);
                for(c = 0; c < 32; ++c){
                    y[c] = 5;
                }
                const m = v(g, 9, 1);
                const U = v(y, 5, 1);
                const S = (e)=>{
                    let t = e[0];
                    for(let r = 1; r < e.length; ++r){
                        if (e[r] > t) {
                            t = e[r];
                        }
                    }
                    return t;
                };
                const b = (e, t, r)=>{
                    const a = t / 8 | 0;
                    return (e[a] | e[a + 1] << 8) >> (7 & t) & r;
                };
                const x = (e, t)=>{
                    const r = t / 8 | 0;
                    return (e[r] | e[r + 1] << 8 | e[r + 2] << 16) >> (7 & t);
                };
                const k = [
                    "unexpected EOF",
                    "invalid block type",
                    "invalid length/literal",
                    "invalid distance",
                    "stream finished",
                    "no stream handler",
                    ,
                    "no callback",
                    "invalid UTF-8 data",
                    "extra field too long",
                    "date not in range 1980-2099",
                    "filename too long",
                    "stream finishing",
                    "invalid zip data"
                ];
                const T = function(e, t, r) {
                    const a = Error(t || k[e]);
                    a.code = e;
                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(a, T);
                    }
                    if (!r) {
                        throw a;
                    }
                    return a;
                };
                const F = (e, s, l)=>{
                    let u;
                    let d;
                    let c;
                    let p;
                    const e_length = e.length;
                    if (!e_length || l && !l.l && e_length < 5) {
                        return s || new Uint8Array(0);
                    }
                    const y = !s || l;
                    const k = !l || l.i;
                    if (!l) {
                        l = {};
                    }
                    if (!s) {
                        s = new Uint8Array(3 * e_length);
                    }
                    let F;
                    const w = (e)=>{
                        const s_length = s.length;
                        if (e > s_length) {
                            const a = new Uint8Array(Math.max(2 * s_length, e));
                            a.set(s);
                            s = a;
                        }
                    };
                    let C = l.f || 0;
                    let _ = l.p || 0;
                    let D = l.b || 0;
                    let A = l.l;
                    let G = l.d;
                    let P = l.m;
                    let O = l.n;
                    const I = 8 * e_length;
                    do {
                        if (!A) {
                            l.f = C = b(e, _, 1);
                            const B = b(e, _ + 1, 3);
                            _ += 3;
                            if (!B) {
                                const R = e[(X = ((F = _) / 8 | 0) + (7 & F && 1) + 4) - 4] | e[X - 3] << 8;
                                const M = X + R;
                                if (M > e_length) {
                                    if (k) {
                                        T(0);
                                    }
                                    break;
                                }
                                if (y) {
                                    w(D + R);
                                }
                                s.set(e.subarray(X, M), D);
                                l.b = D += R;
                                l.p = _ = 8 * M;
                                continue;
                            }
                            if (B == 1) {
                                A = m;
                                G = U;
                                P = 9;
                                O = 5;
                            } else if (B == 2) {
                                const E = b(e, _, 31) + 257;
                                const L = b(e, _ + 10, 15) + 4;
                                const W = E + b(e, _ + 5, 31) + 1;
                                _ += 14;
                                const z = new Uint8Array(W);
                                const V = new Uint8Array(19);
                                for(var j = 0; j < L; ++j){
                                    V[o[j]] = b(e, _ + 3 * j, 7);
                                }
                                _ += 3 * L;
                                const N = S(V);
                                const H = (1 << N) - 1;
                                const q = v(V, N, 1);
                                for(j = 0; j < W;){
                                    var X;
                                    const Y = q[b(e, _, H)];
                                    _ += 15 & Y;
                                    if ((X = Y >>> 4) < 16) {
                                        z[j++] = X;
                                    } else {
                                        var $ = 0;
                                        let Q = 0;
                                        for(X == 16 ? (Q = 3 + b(e, _, 3), _ += 2, $ = z[j - 1]) : X == 17 ? (Q = 3 + b(e, _, 7), _ += 3) : X == 18 && (Q = 11 + b(e, _, 127), _ += 7); Q--;){
                                            z[j++] = $;
                                        }
                                    }
                                }
                                const Z = z.subarray(0, E);
                                var J = z.subarray(E);
                                P = S(Z);
                                O = S(J);
                                A = v(Z, P, 1);
                                G = v(J, O, 1);
                            } else {
                                T(1);
                            }
                            if (_ > I) {
                                if (k) {
                                    T(0);
                                }
                                break;
                            }
                        }
                        if (y) {
                            w(D + 131072);
                        }
                        const K = (1 << P) - 1;
                        const ee = (1 << O) - 1;
                        let et = _;
                        for(;; et = _){
                            const er = ($ = A[x(e, _) & K]) >>> 4;
                            if ((_ += 15 & $) > I) {
                                if (k) {
                                    T(0);
                                }
                                break;
                            }
                            if (!$) {
                                T(2);
                            }
                            if (er < 256) {
                                s[D++] = er;
                            } else {
                                if (er == 256) {
                                    et = _;
                                    A = null;
                                    break;
                                }
                                let ea = er - 254;
                                if (er > 264) {
                                    var en = n[j = er - 257];
                                    ea = b(e, _, (1 << en) - 1) + h[j];
                                    _ += en;
                                }
                                const ei = G[x(e, _) & ee];
                                const eo = ei >>> 4;
                                if (!ei) {
                                    T(3);
                                }
                                _ += 15 & ei;
                                J = f[eo];
                                if (eo > 3) {
                                    en = i[eo];
                                    J += x(e, _) & (1 << en) - 1;
                                    _ += en;
                                }
                                if (_ > I) {
                                    if (k) {
                                        T(0);
                                    }
                                    break;
                                }
                                if (y) {
                                    w(D + 131072);
                                }
                                for(var es = D + ea; D < es; D += 4){
                                    s[D] = s[D - J];
                                    s[D + 1] = s[D + 1 - J];
                                    s[D + 2] = s[D + 2 - J];
                                    s[D + 3] = s[D + 3 - J];
                                }
                                D = es;
                            }
                        }
                        l.l = A;
                        l.p = et;
                        l.b = D;
                        if (A) {
                            C = 1;
                            l.m = P;
                            l.d = G;
                            l.n = O;
                        }
                    }while (!C)
                    if (D == s.length) {
                        return s;
                    }
                    u = s;
                    if ((d = 0) < 0) {
                        d = 0;
                    }
                    if ((c = D) == null || c > u.length) {
                        c = u.length;
                    }
                    (p = new (u instanceof Uint16Array ? Uint16Array : u instanceof Uint32Array ? Uint32Array : Uint8Array)(c - d)).set(u.subarray(d, c));
                    return p;
                };
                const w = new Uint8Array(0);
                const C = typeof TextDecoder !== "undefined" && new TextDecoder;
                try {
                    C.decode(w, {
                        stream: true
                    });
                } catch (e) {}
                e.convert_streams = function(e) {
                    const t = new DataView(e);
                    let r = 0;
                    function a() {
                        const e = t.getUint16(r);
                        r += 2;
                        return e;
                    }
                    function n() {
                        const e = t.getUint32(r);
                        r += 4;
                        return e;
                    }
                    function i(e) {
                        y.setUint16(m, e);
                        m += 2;
                    }
                    function o(e) {
                        y.setUint32(m, e);
                        m += 4;
                    }
                    for(var s = {
                        signature: n(),
                        flavor: n(),
                        length: n(),
                        numTables: a(),
                        reserved: a(),
                        totalSfntSize: n(),
                        majorVersion: a(),
                        minorVersion: a(),
                        metaOffset: n(),
                        metaLength: n(),
                        metaOrigLength: n(),
                        privOffset: n(),
                        privLength: n()
                    }, l = 0; 2 ** l <= s.numTables;){
                        l++;
                    }
                    l--;
                    const h = 16 * 2 ** l;
                    const u = 16 * s.numTables - h;
                    let f = 12;
                    const d = [];
                    for(let c = 0; c < s.numTables; c++){
                        d.push({
                            tag: n(),
                            offset: n(),
                            compLength: n(),
                            origLength: n(),
                            origChecksum: n()
                        });
                        f += 16;
                    }
                    let p;
                    const v = new Uint8Array(12 + 16 * d.length + d.reduce((acc, item)=>acc + item.origLength + 4, 0));
                    const v_buffer = v.buffer;
                    var y = new DataView(v_buffer);
                    var m = 0;
                    o(s.flavor);
                    i(s.numTables);
                    i(h);
                    i(l);
                    i(u);
                    d.forEach((e)=>{
                        o(e.tag);
                        o(e.origChecksum);
                        o(f);
                        o(e.origLength);
                        e.outOffset = f;
                        if ((f += e.origLength) % 4 != 0) {
                            f += 4 - f % 4;
                        }
                    });
                    d.forEach((t)=>{
                        const r = e.slice(t.offset, t.offset + t.compLength);
                        if (t.compLength != t.origLength) {
                            var a = new Uint8Array(t.origLength);
                            F(new Uint8Array(r, 2), a);
                        } else {
                            a = new Uint8Array(r);
                        }
                        v.set(a, t.outOffset);
                        let n = 0;
                        if ((f = t.outOffset + t.origLength) % 4 != 0) {
                            n = 4 - f % 4;
                        }
                        v.set(new Uint8Array(n).buffer, t.outOffset + t.origLength);
                        p = f + n;
                    });
                    return v_buffer.slice(0, p);
                };
                Object.defineProperty(e, "__esModule", {
                    value: true
                });
                return e;
            })({}).convert_streams;
        },
        function(e, t) {
            let r;
            let a = {
                M: 2,
                L: 2,
                Q: 4,
                C: 6,
                Z: 0
            };
            let n = {
                C: "18g,ca,368,1kz",
                D: "17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",
                R: "17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",
                L: "x9u,jff,a,fd,jv",
                T: "4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"
            };
            let i = [
                null,
                "isol",
                "init",
                "fina",
                "medi"
            ];
            function o(t, r) {
                let a = t.GDEF && t.GDEF.glyphClassDef;
                if (a) {
                    return e.U._getGlyphClass(r, a);
                }
                return 0;
            }
            function s(...e) {
                for(let t = 0; t < e.length; t++){
                    if (typeof e[t] === "number") {
                        return e[t];
                    }
                }
            }
            return function(l) {
                let h = new Uint8Array(l, 0, 4);
                let u = e._bin.readASCII(h, 0, 4);
                if (u === "wOFF") {
                    l = t(l);
                } else if (u === "wOF2") {
                    throw Error("woff2 fonts not supported");
                }
                return ((t)=>{
                    let l = Object.create(null);
                    let h = t["OS/2"];
                    let t_hhea = t.hhea;
                    let unitsPerEm = t.head.unitsPerEm;
                    let ascender = s(h && h.sTypoAscender, t_hhea && t_hhea.ascender, unitsPerEm);
                    let c = {
                        unitsPerEm,
                        ascender,
                        descender: s(h && h.sTypoDescender, t_hhea && t_hhea.descender, 0),
                        capHeight: s(h && h.sCapHeight, ascender),
                        xHeight: s(h && h.sxHeight, ascender),
                        lineGap: s(h && h.sTypoLineGap, t_hhea && t_hhea.lineGap),
                        supportsCodePoint: (r)=>e.U.codeToGlyph(t, r) > 0,
                        forEachGlyph (s, h, u, f) {
                            let d = 0;
                            let p = 1 / c.unitsPerEm * h;
                            let v = ((t, a)=>{
                                let o = [];
                                for(let r = 0; r < a.length; r++){
                                    let n = a.codePointAt(r);
                                    if (n > 65535) {
                                        r++;
                                    }
                                    o.push(e.U.codeToGlyph(t, n));
                                }
                                let t_GSUB = t.GSUB;
                                if (t_GSUB) {
                                    let t;
                                    let { lookupList, featureList } = t_GSUB;
                                    let u = /^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/;
                                    let f = [];
                                    featureList.forEach((s)=>{
                                        if (u.test(s.tag)) {
                                            for(let h = 0; h < s.tab.length; h++){
                                                if (f[s.tab[h]]) {
                                                    continue;
                                                }
                                                f[s.tab[h]] = true;
                                                let u = lookupList[s.tab[h]];
                                                let d = /^(isol|init|fina|medi)$/.test(s.tag);
                                                if (d && !t) {
                                                    t = ((e)=>{
                                                        let t = new Uint8Array(e.length);
                                                        let a = 32;
                                                        let i = 1;
                                                        let o = -1;
                                                        for(let s = 0; s < e.length; s++){
                                                            let l = e.codePointAt(s);
                                                            let h = 0 | ((e)=>{
                                                                if (!r) {
                                                                    let e = {
                                                                        R: 2,
                                                                        L: 1,
                                                                        D: 4,
                                                                        C: 16,
                                                                        U: 32,
                                                                        T: 8
                                                                    };
                                                                    for(let t in r = new Map, n){
                                                                        let a = 0;
                                                                        n[t].split(",").forEach((n)=>{
                                                                            let [i, o] = n.split("+");
                                                                            i = parseInt(i, 36);
                                                                            o = o ? parseInt(o, 36) : 0;
                                                                            r.set(a += i, e[t]);
                                                                            for(let n = o; n--;){
                                                                                r.set(++a, e[t]);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                                return r.get(e) || 32;
                                                            })(l);
                                                            let u = 1;
                                                            if (!(8 & h)) {
                                                                if (21 & a) {
                                                                    if (22 & h) {
                                                                        u = 3;
                                                                        if (i === 1 || i === 3) {
                                                                            t[o]++;
                                                                        }
                                                                    } else if (33 & h && (i === 2 || i === 4)) {
                                                                        t[o]--;
                                                                    }
                                                                } else if (34 & a && (i === 2 || i === 4)) {
                                                                    t[o]--;
                                                                }
                                                                i = t[s] = u;
                                                                a = h;
                                                                o = s;
                                                                if (l > 65535) {
                                                                    s++;
                                                                }
                                                            }
                                                        }
                                                        return t;
                                                    })(a);
                                                }
                                                for(let r = 0; r < o.length; r++){
                                                    if (!(t && d && i[t[r]] !== s.tag)) {
                                                        e.U._applySubs(o, r, u, lookupList);
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }
                                return o;
                            })(t, s);
                            let g = 0;
                            let y = ((t, r)=>{
                                let a = new Int16Array(3 * r.length);
                                let n = 0;
                                for(; n < r.length; n++){
                                    let h = r[n];
                                    if (h === -1) {
                                        continue;
                                    }
                                    a[3 * n + 2] = t.hmtx.aWidth[h];
                                    let u = t.GPOS;
                                    if (u) {
                                        let f = u.lookupList;
                                        for (const d of f){
                                            for(let u = 0; u < d.tabs.length; u++){
                                                let tab = d.tabs[u];
                                                if (d.ltype === 1) {
                                                    if (e._lctf.coverageIndex(tab.coverage, h) !== -1 && tab.pos) {
                                                        l(tab.pos, n);
                                                        break;
                                                    }
                                                } else if (d.ltype === 2) {
                                                    let t = null;
                                                    let a = i();
                                                    if (a !== -1) {
                                                        let i = e._lctf.coverageIndex(tab.coverage, r[a]);
                                                        if (i !== -1) {
                                                            if (tab.fmt === 1) {
                                                                let e = tab.pairsets[i];
                                                                for(let r = 0; r < e.length; r++){
                                                                    if (e[r].gid2 === h) {
                                                                        t = e[r];
                                                                    }
                                                                }
                                                            } else if (tab.fmt === 2) {
                                                                let n = e.U._getGlyphClass(r[a], tab.classDef1);
                                                                let i = e.U._getGlyphClass(h, tab.classDef2);
                                                                t = tab.matrix[n][i];
                                                            }
                                                            if (t) {
                                                                if (t.val1) {
                                                                    l(t.val1, a);
                                                                }
                                                                if (t.val2) {
                                                                    l(t.val2, n);
                                                                }
                                                                break;
                                                            }
                                                        }
                                                    }
                                                } else if (d.ltype === 4) {
                                                    let t = e._lctf.coverageIndex(tab.markCoverage, h);
                                                    if (t !== -1) {
                                                        let o = i(s);
                                                        let l = o === -1 ? -1 : e._lctf.coverageIndex(tab.baseCoverage, r[o]);
                                                        if (l !== -1) {
                                                            let e = tab.markArray[t];
                                                            let r = tab.baseArray[l][e.markClass];
                                                            a[3 * n] = r.x - e.x + a[3 * o] - a[3 * o + 2];
                                                            a[3 * n + 1] = r.y - e.y + a[3 * o + 1];
                                                            break;
                                                        }
                                                    }
                                                } else if (d.ltype === 6) {
                                                    let s = e._lctf.coverageIndex(tab.mark1Coverage, h);
                                                    if (s !== -1) {
                                                        let l = i();
                                                        if (l !== -1) {
                                                            let i = r[l];
                                                            if (o(t, i) === 3) {
                                                                let t = e._lctf.coverageIndex(tab.mark2Coverage, i);
                                                                if (t !== -1) {
                                                                    let e = tab.mark1Array[s];
                                                                    let r = tab.mark2Array[t][e.markClass];
                                                                    a[3 * n] = r.x - e.x + a[3 * l] - a[3 * l + 2];
                                                                    a[3 * n + 1] = r.y - e.y + a[3 * l + 1];
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else if (t.kern && !t.cff) {
                                        let e = i();
                                        if (e !== -1) {
                                            let n = t.kern.glyph1.indexOf(r[e]);
                                            if (n !== -1) {
                                                let r = t.kern.rval[n].glyph2.indexOf(h);
                                                if (r !== -1) {
                                                    a[3 * e + 2] += t.kern.rval[n].vals[r];
                                                }
                                            }
                                        }
                                    }
                                }
                                return a;
                                function i(e) {
                                    for(let t = n - 1; t >= 0; t--){
                                        if (r[t] !== -1 && (!e || e(r[t]))) {
                                            return t;
                                        }
                                    }
                                    return -1;
                                }
                                function s(e) {
                                    return o(t, e) === 1;
                                }
                                function l(e, t) {
                                    for(let r = 0; r < 3; r++){
                                        a[3 * t + r] += e[r] || 0;
                                    }
                                }
                            })(t, v);
                            v.forEach((index, n)=>{
                                if (index !== -1) {
                                    let i = l[index];
                                    if (!i) {
                                        let xMin;
                                        let yMin;
                                        let xMax;
                                        let yMax;
                                        let { cmds, crds } = e.U.glyphToPath(t, index);
                                        let path = "";
                                        let c = 0;
                                        for(let e = 0, t = cmds.length; e < t; e++){
                                            let t = a[cmds[e]];
                                            path += cmds[e];
                                            for(let e = 1; e <= t; e++){
                                                path += (e > 1 ? "," : "") + crds[c++];
                                            }
                                        }
                                        if (crds.length) {
                                            yMin = Infinity;
                                            xMin = Infinity;
                                            xMax = yMax = -Infinity;
                                            for(let e = 0, t = crds.length; e < t; e += 2){
                                                let crd = crds[e];
                                                let r = crds[e + 1];
                                                if (crd < xMin) {
                                                    xMin = crd;
                                                }
                                                if (r < yMin) {
                                                    yMin = r;
                                                }
                                                if (crd > xMax) {
                                                    xMax = crd;
                                                }
                                                if (r > yMax) {
                                                    yMax = r;
                                                }
                                            }
                                        } else {
                                            yMax = 0;
                                            yMin = 0;
                                            xMax = 0;
                                            xMin = 0;
                                        }
                                        i = l[index] = {
                                            index,
                                            advanceWidth: t.hmtx.aWidth[index],
                                            xMin,
                                            yMin,
                                            xMax,
                                            yMax,
                                            path
                                        };
                                    }
                                    f.call(null, i, d + y[3 * n] * p, y[3 * n + 1] * p, g);
                                    d += y[3 * n + 2] * p;
                                    if (u) {
                                        d += u * h;
                                    }
                                }
                                g += s.codePointAt(g) > 65535 ? 2 : 1;
                            });
                            return d;
                        }
                    };
                    return c;
                })(e.parse(l)[0]);
            };
        }
    ],
    init: (e, t, r)=>r(e(), t())
});
let f = o.kl({
    name: "FontResolver",
    dependencies: [
        function(e, t) {
            let r = Object.create(null);
            let a = Object.create(null);
            function n(t, n) {
                let i = r[t];
                if (i) {
                    n(i);
                } else if (a[t]) {
                    a[t].push(n);
                } else {
                    a[t] = [
                        n
                    ];
                    let i = (e)=>{
                        console.error(`Failure loading font ${t}`, e);
                    };
                    try {
                        let n = new XMLHttpRequest;
                        n.open("get", t, true);
                        n.responseType = "arraybuffer";
                        n.onload = function() {
                            if (n.status >= 400) {
                                i(Error(n.statusText));
                            } else if (n.status > 0) {
                                try {
                                    let o;
                                    let i = e(n.response);
                                    i.src = t;
                                    o = i;
                                    o.src = t;
                                    r[t] = o;
                                    a[t].forEach((e)=>e(o));
                                    delete a[t];
                                } catch (error) {
                                    i(error);
                                }
                            }
                        };
                        n.onerror = i;
                        n.send();
                    } catch (error) {
                        i(error);
                    }
                }
            }
            return function(e, a, { lang, fonts = [], style = "normal", weight = "normal", unicodeFontsURL } = {}) {
                let u = new Uint8Array(e.length);
                let fonts_1 = [];
                if (!e.length) {
                    v();
                }
                let d = new Map;
                let c = [];
                if (style !== "italic") {
                    style = "normal";
                }
                if (typeof weight !== "number") {
                    weight = weight === "bold" ? 700 : 400;
                }
                if (fonts && !Array.isArray(fonts)) {
                    fonts = [
                        fonts
                    ];
                }
                if ((fonts = fonts.slice().filter((e)=>!e.lang || e.lang.test(lang)).reverse()).length) {
                    let t = 0;
                    (function a(i = 0) {
                        for(let s = i, l = e.length; s < l; s++){
                            let i = e.codePointAt(s);
                            if (t === 1 && fonts_1[u[s - 1]].supportsCodePoint(i) || s > 0 && /\s/.test(e[s])) {
                                u[s] = u[s - 1];
                                if (t === 2) {
                                    c[c.length - 1][1] = s;
                                }
                            } else {
                                for(let e = u[s], l = fonts.length; e <= l; e++){
                                    if (e === l) {
                                        (t === 2 ? c[c.length - 1] : c[c.length] = [
                                            s,
                                            s
                                        ])[1] = s;
                                        t = 2;
                                    } else {
                                        u[s] = e;
                                        let { src, unicodeRange } = fonts[e];
                                        if (!unicodeRange || ((e, unicodeRange_1)=>{
                                            for(let r = 0; r < unicodeRange_1.length; r++){
                                                let [a, n = a] = unicodeRange_1[r];
                                                if (a <= e && e <= n) {
                                                    return true;
                                                }
                                            }
                                            return false;
                                        })(i, unicodeRange)) {
                                            let e = r[src];
                                            if (!e) {
                                                return void n(src, ()=>{
                                                    a(s);
                                                });
                                            }
                                            if (e.supportsCodePoint(i)) {
                                                let r = d.get(e);
                                                if (typeof r !== "number") {
                                                    r = fonts_1.length;
                                                    fonts_1.push(e);
                                                    d.set(e, r);
                                                }
                                                u[s] = r;
                                                t = 1;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            if (i > 65535 && s + 1 < l) {
                                u[s + 1] = u[s];
                                s++;
                                if (t === 2) {
                                    c[c.length - 1][1] = s;
                                }
                            }
                        }
                        p();
                    })();
                } else {
                    c.push([
                        0,
                        e.length - 1
                    ]);
                    p();
                }
                function p() {
                    if (c.length) {
                        let r = c.map((t)=>e.substring(t[0], t[1] + 1)).join("\n");
                        t.getFontsForString(r, {
                            lang: lang || undefined,
                            style,
                            weight,
                            dataUrl: unicodeFontsURL
                        }).then(({ fontUrls, chars })=>{
                            let f_length = fonts_1.length;
                            let a = 0;
                            c.forEach((e)=>{
                                for(let n = 0, i = e[1] - e[0]; n <= i; n++){
                                    u[e[0] + n] = chars[a++] + f_length;
                                }
                                a++;
                            });
                            let i = 0;
                            fontUrls.forEach((t, a)=>{
                                n(t, (t)=>{
                                    fonts_1[a + f_length] = t;
                                    if (++i === fontUrls.length) {
                                        v();
                                    }
                                });
                            });
                        });
                    } else {
                        v();
                    }
                }
                function v() {
                    a({
                        chars: u,
                        fonts: fonts_1
                    });
                }
            };
        },
        u,
        function() {
            return function(e) {
                class t {
                    constructor(){
                        this.buckets = new Map;
                    }
                    add(e) {
                        const t = e >> 5;
                        this.buckets.set(t, (this.buckets.get(t) || 0) | 1 << (31 & e));
                    }
                    has(e) {
                        const t = this.buckets.get(e >> 5);
                        return t !== undefined && (t & 1 << (31 & e)) != 0;
                    }
                    serialize() {
                        const e = [];
                        this.buckets.forEach((t, r)=>{
                            e.push(`${(+r).toString(36)}:${t.toString(36)}`);
                        });
                        return e.join(",");
                    }
                    deserialize(e) {
                        const t = this;
                        this.buckets.clear();
                        e.split(",").forEach((e)=>{
                            const r = e.split(":");
                            t.buckets.set(parseInt(r[0], 36), parseInt(r[1], 36));
                        });
                    }
                }
                function r(e, t) {
                    const r = 255 & e;
                    let a = t.codePointAt(r / 6 | 0);
                    return ((a = (a || 48) - 48) & 1 << r % 6) != 0;
                }
                function a(e, t) {
                    const r = (e, r)=>{
                        for(let a = e; a <= r; a++){
                            t(a);
                        }
                    };
                    e.replace(/U\+/gi, "").replace(/^,+|,+$/g, "").split(/,+/).map((e)=>e.split("-").map((e)=>parseInt(e.trim(), 16))).forEach(([t, a])=>{
                        if (a === undefined) {
                            a = t;
                        }
                        r(t, a);
                    });
                }
                let n;
                let i = {};
                let o = {};
                const s = new WeakMap;
                const l = "https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";
                const h = new Map;
                function u(e, t, r) {
                    if (e[t]) {
                        return t;
                    }
                    if (e[r]) {
                        return r;
                    }
                    return ((e)=>{
                        for(const t in e){
                            return t;
                        }
                    })(e);
                }
                e.CodePointSet = t;
                e.clearCache = function() {
                    i = {};
                    o = {};
                };
                e.getFontsForString = function(e, f = {}) {
                    let f_lang = f.lang;
                    if (f_lang === undefined) {
                        f_lang = /\p{Script=Hangul}/u.test(e) ? "ko" : /\p{Script=Hiragana}|\p{Script=Katakana}/u.test(e) ? "ja" : "en";
                    }
                    let f_category = f.category;
                    if (f_category === undefined) {
                        f_category = "sans-serif";
                    }
                    let f_style = f.style;
                    if (f_style === undefined) {
                        f_style = "normal";
                    }
                    let f_weight = f.weight;
                    if (f_weight === undefined) {
                        f_weight = 400;
                    }
                    let g = (f.dataUrl || l).replace(/\/$/g, "");
                    const y = new Map;
                    const m = new Uint8Array(e.length);
                    const U = {};
                    const S = {};
                    const b = Array(e.length);
                    const x = new Map;
                    let k = false;
                    function T(e) {
                        let t = h.get(e);
                        if (!t) {
                            t = fetch(`${g}/${e}`).then((e)=>{
                                if (!e.ok) {
                                    throw Error(e.statusText);
                                }
                                return e.json().then((e)=>{
                                    if (!Array.isArray(e) || e[0] !== 1) {
                                        throw Error(`Incorrect schema version; need 1, got ${e[0]}`);
                                    }
                                    return e[1];
                                });
                            }).catch((t)=>{
                                if (g !== l) {
                                    if (!k) {
                                        console.error(`unicode-font-resolver: Failed loading from dataUrl "${g}", trying default CDN. ${t.message}`);
                                        k = true;
                                    }
                                    g = l;
                                    h.delete(e);
                                    return T(e);
                                }
                                throw t;
                            });
                            h.set(e, t);
                        }
                        return t;
                    }
                    for(var F = 0; F < e.length; F++){
                        ((t)=>{
                            const r = e.codePointAt(t);
                            const a = ((e)=>{
                                const t = (-256 & e).toString(16);
                                const r = ((-256 & e) + 256 - 1).toString(16);
                                return `codepoint-index/plane${e >> 16}/${t}-${r}.json`;
                            })(r);
                            b[t] = a;
                            if (!(i[a] || x.has(a))) {
                                x.set(a, T(a).then((e)=>{
                                    i[a] = e;
                                }));
                            }
                            if (r > 65535) {
                                F = ++t;
                            }
                        })(F);
                    }
                    return Promise.all(x.values()).then(()=>{
                        x.clear();
                        for(var t = 0; t < e.length; t++){
                            ((a)=>{
                                const n = e.codePointAt(a);
                                let s = null;
                                const l = i[b[a]];
                                let h;
                                for(const u in l){
                                    let f = S[u];
                                    if (f === undefined) {
                                        f = S[u] = new RegExp(u).test(f_lang || "en");
                                    }
                                    if (f) {
                                        h = u;
                                        for(const c in l[u]){
                                            if (r(n, l[u][c])) {
                                                s = c;
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                                if (!s) {
                                    e: for(const p in l){
                                        if (p !== h) {
                                            for(const v in l[p]){
                                                if (r(n, l[p][v])) {
                                                    s = v;
                                                    break e;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (!s) {
                                    console.debug(`No font coverage for U+${n.toString(16)}`);
                                    s = "latin";
                                }
                                b[a] = s;
                                if (!(o[s] || x.has(s))) {
                                    x.set(s, T(`font-meta/${s}.json`).then((e)=>{
                                        o[s] = e;
                                    }));
                                }
                                if (n > 65535) {
                                    t = ++a;
                                }
                            })(t);
                        }
                        return Promise.all(x.values());
                    }).then(()=>{
                        let i = null;
                        for(let l = 0; l < e.length; l++){
                            const h = e.codePointAt(l);
                            if (i && (n || (n = new Set, a("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000", (e)=>{
                                n.add(e);
                            })), n.has(h) || ((e)=>{
                                let r = s.get(e);
                                if (!r) {
                                    r = new t;
                                    a(e.ranges, (e)=>r.add(e));
                                    s.set(e, r);
                                }
                                return r;
                            })(i).has(h))) {
                                m[l] = m[l - 1];
                            } else {
                                let f = U[(i = o[b[l]]).id];
                                if (!f) {
                                    const d = i.typeforms;
                                    const S = u(d, f_category, "sans-serif");
                                    const x = u(d[S], f_style, "normal");
                                    const k = ((e, f_weight_1)=>{
                                        let r = f_weight_1;
                                        if (!e.includes(r)) {
                                            r = Infinity;
                                            for(let a = 0; a < e.length; a++){
                                                if (Math.abs(e[a] - f_weight_1) < Math.abs(r - f_weight_1)) {
                                                    r = e[a];
                                                }
                                            }
                                        }
                                        return r;
                                    })(d[S]?.[x], f_weight);
                                    f = U[i.id] = `${g}/font-files/${i.id}/${S}.${x}.${k}.woff`;
                                }
                                let T = y.get(f);
                                if (T == null) {
                                    T = y.size;
                                    y.set(f, T);
                                }
                                m[l] = T;
                            }
                            if (h > 65535) {
                                m[++l] = m[l - 1];
                            }
                        }
                        return {
                            fontUrls: Array.from(y.keys()),
                            chars: m
                        };
                    });
                };
                Object.defineProperty(e, "__esModule", {
                    value: true
                });
                return e;
            }({});
        }
    ],
    init: (e, t, r)=>e(t, r())
});
let d = ()=>(self.performance || Date).now();
let c = A_1();
let p = [];
let v = 0;
function g() {
    let e = d();
    while(p.length && d() - e < 5){
        p.shift()();
    }
    v = p.length ? setTimeout(g, 0) : 0;
}
let y = {};
let m = 0;
function U(sdfGlyphSize, t, path, sdfViewBox, n, sdfExponent, sdfCanvas, h, u, f) {
    let p = `TroikaTextSDFGenerator_JS_${m++ % 4}`;
    let v = y[p];
    if (!v) {
        v = y[p] = {
            workerModule: o.kl({
                name: p,
                workerId: p,
                dependencies: [
                    A_1,
                    d
                ],
                init (e, t) {
                    let generate = e().javascript.generate;
                    return function(...e) {
                        let a = t();
                        return {
                            textureData: generate(...e),
                            timing: t() - a
                        };
                    };
                },
                getTransferables: (e)=>[
                        e.textureData.buffer
                    ]
            }),
            requests: 0,
            idleTimer: null
        };
    }
    v.requests++;
    clearTimeout(v.idleTimer);
    return v.workerModule(sdfGlyphSize, t, path, sdfViewBox, n, sdfExponent).then(({ textureData, timing })=>{
        let n = d();
        let i = new Uint8Array(4 * textureData.length);
        for(let e = 0; e < textureData.length; e++){
            i[4 * e + f] = textureData[e];
        }
        c.webglUtils.renderImageData(sdfCanvas, i, h, u, sdfGlyphSize, t, 1 << 3 - f);
        timing += d() - n;
        if (--v.requests == 0) {
            v.idleTimer = setTimeout(()=>{
                o.Qw(p);
            }, 2000);
        }
        return {
            timing
        };
    });
}
let resizeWebGLCanvasWithoutClearing = c.webglUtils.resizeWebGLCanvasWithoutClearing;
let b = {
    defaultFontURL: null,
    unicodeFontsURL: null,
    sdfGlyphSize: 64,
    sdfMargin: 1 / 16,
    sdfExponent: 9,
    textureWidth: 2048,
    useWorker: true
};
let x = new Q1f;
function k() {
    return (self.performance || Date).now();
}
let T = Object.create(null);
function F(parameters, t) {
    parameters = ((e, parameters_1)=>{
        for(let r in parameters_1){
            if (parameters_1.hasOwnProperty(r)) {
                e[r] = parameters_1[r];
            }
        }
        return e;
    })({}, parameters);
    let r = k();
    let { defaultFontURL } = b;
    let n = [];
    if (defaultFontURL) {
        n.push({
            label: "default",
            src: _(defaultFontURL)
        });
    }
    if (parameters.font) {
        n.push({
            label: "user",
            src: _(parameters.font)
        });
    }
    parameters.font = n;
    parameters.text = `${parameters.text}`;
    parameters.sdfGlyphSize = parameters.sdfGlyphSize || b.sdfGlyphSize;
    parameters.unicodeFontsURL = parameters.unicodeFontsURL || b.unicodeFontsURL;
    if (parameters.colorRanges != null) {
        let t = {};
        for(let r in parameters.colorRanges){
            if (parameters.colorRanges.hasOwnProperty(r)) {
                let a = parameters.colorRanges[r];
                if (typeof a !== "number") {
                    a = x.set(a).getHex();
                }
                t[r] = a;
            }
        }
        parameters.colorRanges = t;
    }
    Object.freeze(parameters);
    let { textureWidth, sdfExponent } = b;
    let { sdfGlyphSize } = parameters;
    let h = textureWidth / sdfGlyphSize * 4;
    let u = T[sdfGlyphSize];
    if (!u) {
        let sdfCanvas_1 = document.createElement("canvas");
        sdfCanvas_1.width = textureWidth;
        sdfCanvas_1.height = 256 * sdfGlyphSize / h;
        (u = T[sdfGlyphSize] = {
            glyphCount: 0,
            sdfGlyphSize,
            sdfCanvas: sdfCanvas_1,
            sdfTexture: new gPd(sdfCanvas_1, undefined, undefined, undefined, k6q, k6q),
            contextLost: false,
            glyphsByFont: new Map
        }).sdfTexture.generateMipmaps = false;
        ((e)=>{
            let e_sdfCanvas = e.sdfCanvas;
            e_sdfCanvas.addEventListener("webglcontextlost", (t)=>{
                console.log("Context Lost", t);
                t.preventDefault();
                e.contextLost = true;
            });
            e_sdfCanvas.addEventListener("webglcontextrestored", (t)=>{
                console.log("Context Restored", t);
                e.contextLost = false;
                let r = [];
                e.glyphsByFont.forEach((t)=>{
                    t.forEach((t)=>{
                        r.push(w(t, e, true));
                    });
                });
                Promise.all(r).then(()=>{
                    D(e);
                    e.sdfTexture.needsUpdate = true;
                });
            });
        })(u);
    }
    let { sdfTexture, sdfCanvas } = u;
    (b.useWorker ? G : G_onMainThread)(parameters).then((a)=>{
        let { glyphIds, glyphFontIndices, fontData, glyphPositions, fontSize, timings } = a;
        let y = [];
        let glyphBounds = new Float32Array(4 * glyphIds.length);
        let U = 0;
        let x = 0;
        let T = k();
        let F = fontData.map((e)=>{
            let t = u.glyphsByFont.get(e.src);
            if (!t) {
                u.glyphsByFont.set(e.src, t = new Map);
            }
            return t;
        });
        glyphIds.forEach((e, t)=>{
            let r = glyphFontIndices[t];
            let { src, unitsPerEm } = fontData[r];
            let h = F[r].get(e);
            if (!h) {
                let { path, pathBounds } = a.glyphData[src][e];
                let i = Math.max(pathBounds[2] - pathBounds[0], pathBounds[3] - pathBounds[1]) / sdfGlyphSize * (b.sdfMargin * sdfGlyphSize + 0.5);
                let atlasIndex = u.glyphCount++;
                let sdfViewBox_1 = [
                    pathBounds[0] - i,
                    pathBounds[1] - i,
                    pathBounds[2] + i,
                    pathBounds[3] + i
                ];
                F[r].set(e, h = {
                    path,
                    atlasIndex,
                    sdfViewBox: sdfViewBox_1
                });
                y.push(h);
            }
            let { sdfViewBox } = h;
            let d = glyphPositions[x++];
            let g = glyphPositions[x++];
            let S = fontSize / unitsPerEm;
            glyphBounds[U++] = d + sdfViewBox[0] * S;
            glyphBounds[U++] = g + sdfViewBox[1] * S;
            glyphBounds[U++] = d + sdfViewBox[2] * S;
            glyphBounds[U++] = g + sdfViewBox[3] * S;
            glyphIds[t] = h.atlasIndex;
        });
        timings.quads = (timings.quads || 0) + (k() - T);
        let C = k();
        timings.sdf = {};
        let sdfCanvas_height = sdfCanvas.height;
        let A = 2 ** Math.ceil(Math.log2(Math.ceil(u.glyphCount / h) * sdfGlyphSize));
        if (A > sdfCanvas_height) {
            console.info(`Increasing SDF texture size ${sdfCanvas_height}->${A}`);
            resizeWebGLCanvasWithoutClearing(sdfCanvas, textureWidth, A);
            sdfTexture.dispose();
        }
        Promise.all(y.map((t)=>w(t, u, parameters.gpuAccelerateSDF).then(({ timing })=>{
                timings.sdf[t.atlasIndex] = timing;
            }))).then(()=>{
            if (y.length && !u.contextLost) {
                D(u);
                sdfTexture.needsUpdate = true;
            }
            timings.sdfTotal = k() - C;
            timings.total = k() - r;
            t(Object.freeze({
                parameters,
                sdfTexture,
                sdfGlyphSize,
                sdfExponent,
                glyphBounds,
                glyphAtlasIndices: glyphIds,
                glyphColors: a.glyphColors,
                caretPositions: a.caretPositions,
                chunkedBounds: a.chunkedBounds,
                ascender: a.ascender,
                descender: a.descender,
                lineHeight: a.lineHeight,
                capHeight: a.capHeight,
                xHeight: a.xHeight,
                topBaseline: a.topBaseline,
                blockBounds: a.blockBounds,
                visibleBounds: a.visibleBounds,
                timings: a.timings
            }));
        });
    });
    Promise.resolve().then(()=>{
        if (!u.contextLost) {
            if (!sdfCanvas._warm) {
                c.webgl.isSupported(sdfCanvas);
                sdfCanvas._warm = true;
            }
        }
    });
}
function w({ path, atlasIndex, sdfViewBox }, { sdfGlyphSize, sdfCanvas, contextLost }, s) {
    if (contextLost) {
        return Promise.resolve({
            timing: -1
        });
    }
    let { textureWidth, sdfExponent } = b;
    let u = Math.max(sdfViewBox[2] - sdfViewBox[0], sdfViewBox[3] - sdfViewBox[1]);
    let f = Math.floor(atlasIndex / 4);
    let y = f % (textureWidth / sdfGlyphSize) * sdfGlyphSize;
    let m = Math.floor(f / (textureWidth / sdfGlyphSize)) * sdfGlyphSize;
    return ((sdfGlyphSize_1, sdfGlyphSize_2, path_1, sdfViewBox_1, i, sdfExponent_1, sdfCanvas_1, l, h, u, f = true)=>{
        if (f) {
            return ((...e)=>new Promise((resolve, reject)=>{
                    p.push(()=>{
                        let a = d();
                        try {
                            c.webgl.generateIntoCanvas(...e);
                            resolve({
                                timing: d() - a
                            });
                        } catch (error) {
                            reject(error);
                        }
                    });
                    if (!v) {
                        v = setTimeout(g, 0);
                    }
                }))(sdfGlyphSize_1, sdfGlyphSize_2, path_1, sdfViewBox_1, i, sdfExponent_1, sdfCanvas_1, l, h, u).then(null, (f)=>{
                if (!a) {
                    console.warn("WebGL SDF generation failed, falling back to JS", f);
                    a = true;
                }
                return U(sdfGlyphSize_1, sdfGlyphSize_2, path_1, sdfViewBox_1, i, sdfExponent_1, sdfCanvas_1, l, h, u);
            });
        }
        return U(sdfGlyphSize_1, sdfGlyphSize_2, path_1, sdfViewBox_1, i, sdfExponent_1, sdfCanvas_1, l, h, u);
    })(sdfGlyphSize, sdfGlyphSize, path, sdfViewBox, u, sdfExponent, sdfCanvas, y, m, atlasIndex % 4, s);
}
export function PY({ font, characters, sdfGlyphSize }, a) {
    F({
        font,
        sdfGlyphSize,
        text: Array.isArray(characters) ? characters.join("\n") : `${characters}`
    }, a);
}
function _(e) {
    if (!n) {
        n = typeof document === "undefined" ? {} : document.createElement("a");
    }
    n.href = e;
    return n.href;
}
function D(e) {
    if (typeof createImageBitmap !== "function") {
        console.info("Safari<15: applying SDF canvas workaround");
        let { sdfCanvas, sdfTexture } = e;
        let { width, height } = sdfCanvas;
        let i = e.sdfCanvas.getContext("webgl");
        let o = sdfTexture.image.data;
        if (!(o && o.length === width * height * 4)) {
            o = new Uint8Array(width * height * 4);
            sdfTexture.image = {
                width,
                height,
                data: o
            };
            sdfTexture.flipY = false;
            sdfTexture.isDataTexture = true;
        }
        i.readPixels(0, 0, width, height, i.RGBA, i.UNSIGNED_BYTE, o);
    }
}
let A = o.kl({
    name: "Typesetter",
    dependencies: [
        function(e, t) {
            let r = Infinity;
            let a = /[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/;
            let n = `[^\\S\\u00A0]`;
            let i = RegExp(`${n}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);
            function typeset({ text = "", font, lang, sdfGlyphSize = 64, fontSize = 400, fontWeight = 1, fontStyle = "normal", letterSpacing = 0, lineHeight = "normal", maxWidth = r, direction, textAlign = "left", textIndent = 0, whiteSpace = "normal", overflowWrap = "normal", anchorX = 0, anchorY = 0, metricsOnly = false, unicodeFontsURL, preResolvedFonts = null, includeCaretPositions = false, chunkedBoundsSize = 8192, colorRanges = null }, O) {
                let I = h();
                let timings = {
                    fontLoad: 0,
                    typesetting: 0
                };
                if (text.indexOf("\r") > -1) {
                    console.info("Typesetter: got text with \\r chars; normalizing to \\n");
                    text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
                }
                fontSize *= 1;
                letterSpacing *= 1;
                maxWidth *= 1;
                lineHeight = lineHeight || "normal";
                textIndent *= 1;
                (({ text, lang, fonts, style, weight, preResolvedFonts, unicodeFontsURL }, l)=>{
                    let h = ({ chars, fonts })=>{
                        let r;
                        let a;
                        let n = [];
                        for(let i = 0; i < chars.length; i++){
                            if (chars[i] !== a) {
                                a = chars[i];
                                n.push(r = {
                                    start: i,
                                    end: i,
                                    fontObj: fonts[chars[i]]
                                });
                            } else {
                                r.end = i;
                            }
                        }
                        l(n);
                    };
                    if (preResolvedFonts) {
                        h(preResolvedFonts);
                    } else {
                        e(text, h, {
                            lang,
                            fonts,
                            style,
                            weight,
                            unicodeFontsURL
                        });
                    }
                })({
                    text,
                    lang,
                    style: fontStyle,
                    weight: fontWeight,
                    fonts: typeof font === "string" ? [
                        {
                            src: font
                        }
                    ] : font,
                    unicodeFontsURL,
                    preResolvedFonts
                }, (e)=>{
                    timings.fontLoad = h() - I;
                    let f = isFinite(maxWidth);
                    let glyphIds = null;
                    let glyphFontIndices = null;
                    let glyphPositions = null;
                    let glyphData = null;
                    let glyphColors = null;
                    let caretPositions = null;
                    let visibleBounds = null;
                    let chunkedBounds = null;
                    let E = 0;
                    let L = 0;
                    let W = whiteSpace !== "nowrap";
                    let z = new Map;
                    let V = h();
                    let j = textIndent;
                    let N = 0;
                    let H = new u;
                    let q = [
                        H
                    ];
                    e.forEach((e)=>{
                        let t;
                        let r;
                        let { fontObj } = e;
                        let { ascender, descender, unitsPerEm, lineGap, capHeight, xHeight } = fontObj;
                        let S = z.get(fontObj);
                        if (!S) {
                            let fontSizeMult_1 = fontSize / unitsPerEm;
                            let lineHeight_1 = lineHeight === "normal" ? (ascender - descender + lineGap) * fontSizeMult_1 : lineHeight * fontSize;
                            let r = (lineHeight_1 - (ascender - descender) * fontSizeMult_1) / 2;
                            let a = Math.min(lineHeight_1, (ascender - descender) * fontSizeMult_1);
                            let caretTop = (ascender + descender) / 2 * fontSizeMult_1 + a / 2;
                            S = {
                                index: z.size,
                                src: fontObj.src,
                                fontObj,
                                fontSizeMult: fontSizeMult_1,
                                unitsPerEm,
                                ascender: ascender * fontSizeMult_1,
                                descender: descender * fontSizeMult_1,
                                capHeight: capHeight * fontSizeMult_1,
                                xHeight: xHeight * fontSizeMult_1,
                                lineHeight: lineHeight_1,
                                baseline: -r - ascender * fontSizeMult_1,
                                caretTop,
                                caretBottom: caretTop - a
                            };
                            z.set(fontObj, S);
                        }
                        let { fontSizeMult } = S;
                        let k = text.slice(e.start, e.end + 1);
                        fontObj.forEachGlyph(k, fontSize, letterSpacing, (s, l, h, d)=>{
                            let c;
                            l += N;
                            d += e.start;
                            t = l;
                            r = s;
                            let v = text.charAt(d);
                            let g = s.advanceWidth * fontSizeMult;
                            let H_count = H.count;
                            if (!("isEmpty" in s)) {
                                s.isWhitespace = !!v && new RegExp(n).test(v);
                                s.canBreakAfter = !!v && i.test(v);
                                s.isEmpty = s.xMin === s.xMax || s.yMin === s.yMax || a.test(v);
                            }
                            if (!s.isWhitespace && !s.isEmpty) {
                                L++;
                            }
                            if (W && f && !s.isWhitespace && l + g + j > maxWidth && H_count) {
                                if (H.glyphAt(H_count - 1).glyphObj.canBreakAfter) {
                                    c = new u;
                                    j = -l;
                                } else {
                                    for(let e = H_count; e--;){
                                        if (e === 0 && overflowWrap === "break-word") {
                                            c = new u;
                                            j = -l;
                                            break;
                                        } else if (H.glyphAt(e).glyphObj.canBreakAfter) {
                                            let t = (c = H.splitAt(e + 1)).glyphAt(0).x;
                                            j -= t;
                                            for(let e = c.count; e--;){
                                                c.glyphAt(e).x -= t;
                                            }
                                            break;
                                        }
                                    }
                                }
                                if (c) {
                                    H.isSoftWrapped = true;
                                    H = c;
                                    q.push(H);
                                    E = maxWidth;
                                }
                            }
                            let k = H.glyphAt(H.count);
                            k.glyphObj = s;
                            k.x = l + j;
                            k.y = h;
                            k.width = g;
                            k.charIndex = d;
                            k.fontData = S;
                            if (v === "\n") {
                                H = new u;
                                q.push(H);
                                j = -(l + g + letterSpacing * fontSize) + textIndent;
                            }
                        });
                        N = t + r.advanceWidth * fontSizeMult + letterSpacing * fontSize;
                    });
                    let X = 0;
                    q.forEach((e)=>{
                        let t = true;
                        for(let r = e.count; r--;){
                            let a = e.glyphAt(r);
                            if (t && !a.glyphObj.isWhitespace) {
                                e.width = a.x + a.width;
                                if (e.width > E) {
                                    E = e.width;
                                }
                                t = false;
                            }
                            let { lineHeight, capHeight, xHeight, baseline } = a.fontData;
                            if (lineHeight > e.lineHeight) {
                                e.lineHeight = lineHeight;
                            }
                            let l = baseline - e.baseline;
                            if (l < 0) {
                                e.baseline += l;
                                e.cap += l;
                                e.ex += l;
                            }
                            e.cap = Math.max(e.cap, e.baseline + capHeight);
                            e.ex = Math.max(e.ex, e.baseline + xHeight);
                        }
                        e.baseline -= X;
                        e.cap -= X;
                        e.ex -= X;
                        X += e.lineHeight;
                    });
                    let Y = 0;
                    let $ = 0;
                    if (anchorX) {
                        if (typeof anchorX === "number") {
                            Y = -anchorX;
                        } else if (typeof anchorX === "string") {
                            Y = -E * (anchorX === "left" ? 0 : anchorX === "center" ? 0.5 : anchorX === "right" ? 1 : s(anchorX));
                        }
                    }
                    if (anchorY) {
                        if (typeof anchorY === "number") {
                            $ = -anchorY;
                        } else if (typeof anchorY === "string") {
                            $ = anchorY === "top" ? 0 : anchorY === "top-baseline" ? -q[0].baseline : anchorY === "top-cap" ? -q[0].cap : anchorY === "top-ex" ? -q[0].ex : anchorY === "middle" ? X / 2 : anchorY === "bottom" ? X : anchorY === "bottom-baseline" ? -q[q.length - 1].baseline : s(anchorY) * X;
                        }
                    }
                    if (!metricsOnly) {
                        let e;
                        let a;
                        let n = t.getEmbeddingLevels(text, direction);
                        glyphIds = new Uint16Array(L);
                        glyphFontIndices = new Uint8Array(L);
                        glyphPositions = new Float32Array(2 * L);
                        glyphData = {};
                        visibleBounds = [
                            r,
                            r,
                            -r,
                            -r
                        ];
                        chunkedBounds = [];
                        if (includeCaretPositions) {
                            caretPositions = new Float32Array(4 * text.length);
                        }
                        if (colorRanges) {
                            glyphColors = new Uint8Array(3 * L);
                        }
                        let i = 0;
                        let s = -1;
                        let h = -1;
                        q.forEach((u, f)=>{
                            let { count, width } = u;
                            if (count > 0) {
                                let f;
                                let m = 0;
                                for(let e = count; e-- && u.glyphAt(e).glyphObj.isWhitespace;){
                                    m++;
                                }
                                let U = 0;
                                let S = 0;
                                if (textAlign === "center") {
                                    U = (E - width) / 2;
                                } else if (textAlign === "right") {
                                    U = E - width;
                                } else if (textAlign === "justify" && u.isSoftWrapped) {
                                    let e = 0;
                                    for(let t = count - m; t--;){
                                        if (u.glyphAt(t).glyphObj.isWhitespace) {
                                            e++;
                                        }
                                    }
                                    S = (E - width) / e;
                                }
                                if (S || U) {
                                    let e = 0;
                                    for(let t = 0; t < count; t++){
                                        let r = u.glyphAt(t);
                                        let a = r.glyphObj;
                                        r.x += U + e;
                                        if (S !== 0 && a.isWhitespace && t < count - m) {
                                            e += S;
                                            r.width += S;
                                        }
                                    }
                                }
                                let x = t.getReorderSegments(text, n, u.glyphAt(0).charIndex, u.glyphAt(u.count - 1).charIndex);
                                for(let e = 0; e < x.length; e++){
                                    let [t, r] = x[e];
                                    let a = Infinity;
                                    let n = -Infinity;
                                    for(let e = 0; e < count; e++){
                                        if (u.glyphAt(e).charIndex >= t) {
                                            let t = e;
                                            let i = e;
                                            for(; i < count; i++){
                                                let e = u.glyphAt(i);
                                                if (e.charIndex > r) {
                                                    break;
                                                }
                                                if (i < count - m) {
                                                    a = Math.min(a, e.x);
                                                    n = Math.max(n, e.x + e.width);
                                                }
                                            }
                                            for(let e = t; e < i; e++){
                                                let t = u.glyphAt(e);
                                                t.x = n - (t.x + t.width - a);
                                            }
                                            break;
                                        }
                                    }
                                }
                                let k = (e)=>f = e;
                                for(let y = 0; y < count; y++){
                                    let p = u.glyphAt(y);
                                    let m = (f = p.glyphObj).index;
                                    let U = 1 & n.levels[p.charIndex];
                                    if (U) {
                                        let e = t.getMirroredCharacter(text[p.charIndex]);
                                        if (e) {
                                            p.fontData.fontObj.forEachGlyph(e, 0, 0, k);
                                        }
                                    }
                                    if (includeCaretPositions) {
                                        let { charIndex, fontData } = p;
                                        let r = p.x + Y;
                                        let a = p.x + p.width + Y;
                                        caretPositions[4 * charIndex] = U ? a : r;
                                        caretPositions[4 * charIndex + 1] = U ? r : a;
                                        caretPositions[4 * charIndex + 2] = u.baseline + fontData.caretBottom + $;
                                        caretPositions[4 * charIndex + 3] = u.baseline + fontData.caretTop + $;
                                        let n = charIndex - s;
                                        if (n > 1) {
                                            l(caretPositions, s, n);
                                        }
                                        s = charIndex;
                                    }
                                    if (colorRanges) {
                                        let { charIndex } = p;
                                        while(charIndex > h){
                                            h++;
                                            if (colorRanges.hasOwnProperty(h)) {
                                                a = colorRanges[h];
                                            }
                                        }
                                    }
                                    if (!f.isWhitespace && !f.isEmpty) {
                                        let t = i++;
                                        let { fontSizeMult, src, index } = p.fontData;
                                        let l = glyphData[src] || (glyphData[src] = {});
                                        if (!l[m]) {
                                            l[m] = {
                                                path: f.path,
                                                pathBounds: [
                                                    f.xMin,
                                                    f.yMin,
                                                    f.xMax,
                                                    f.yMax
                                                ]
                                            };
                                        }
                                        let h = p.x + Y;
                                        let y = p.y + u.baseline + $;
                                        glyphPositions[2 * t] = h;
                                        glyphPositions[2 * t + 1] = y;
                                        let U = h + f.xMin * fontSizeMult;
                                        let S = y + f.yMin * fontSizeMult;
                                        let b = h + f.xMax * fontSizeMult;
                                        let x = y + f.yMax * fontSizeMult;
                                        if (U < visibleBounds[0]) {
                                            visibleBounds[0] = U;
                                        }
                                        if (S < visibleBounds[1]) {
                                            visibleBounds[1] = S;
                                        }
                                        if (b > visibleBounds[2]) {
                                            visibleBounds[2] = b;
                                        }
                                        if (x > visibleBounds[3]) {
                                            visibleBounds[3] = x;
                                        }
                                        if (t % chunkedBoundsSize == 0) {
                                            e = {
                                                start: t,
                                                end: t,
                                                rect: [
                                                    r,
                                                    r,
                                                    -r,
                                                    -r
                                                ]
                                            };
                                            chunkedBounds.push(e);
                                        }
                                        e.end++;
                                        let k = e.rect;
                                        if (U < k[0]) {
                                            k[0] = U;
                                        }
                                        if (S < k[1]) {
                                            k[1] = S;
                                        }
                                        if (b > k[2]) {
                                            k[2] = b;
                                        }
                                        if (x > k[3]) {
                                            k[3] = x;
                                        }
                                        glyphIds[t] = m;
                                        glyphFontIndices[t] = index;
                                        if (colorRanges) {
                                            let e = 3 * t;
                                            glyphColors[e] = a >> 16 & 255;
                                            glyphColors[e + 1] = a >> 8 & 255;
                                            glyphColors[e + 2] = 255 & a;
                                        }
                                    }
                                }
                            }
                        });
                        if (caretPositions) {
                            let e = text.length - s;
                            if (e > 1) {
                                l(caretPositions, s, e);
                            }
                        }
                    }
                    let fontData = [];
                    z.forEach(({ index, src, unitsPerEm, ascender, descender, lineHeight, capHeight, xHeight })=>{
                        fontData[index] = {
                            src,
                            unitsPerEm,
                            ascender,
                            descender,
                            lineHeight,
                            capHeight,
                            xHeight
                        };
                    });
                    timings.typesetting = h() - V;
                    O({
                        glyphIds,
                        glyphFontIndices,
                        glyphPositions,
                        glyphData,
                        fontData,
                        caretPositions,
                        glyphColors,
                        chunkedBounds,
                        fontSize,
                        topBaseline: $ + q[0].baseline,
                        blockBounds: [
                            Y,
                            $ - X,
                            Y + E,
                            $
                        ],
                        visibleBounds,
                        timings
                    });
                });
            }
            function s(e) {
                let t = e.match(/^([\d.]+)%$/);
                let r = t ? parseFloat(t[1]) : NaN;
                if (isNaN(r)) {
                    return 0;
                }
                return r / 100;
            }
            function l(caretPositions, t, r) {
                let a = caretPositions[4 * t];
                let n = caretPositions[4 * t + 1];
                let i = caretPositions[4 * t + 2];
                let o = caretPositions[4 * t + 3];
                let s = (n - a) / r;
                for(let n = 0; n < r; n++){
                    let r = (t + n) * 4;
                    caretPositions[r] = a + s * n;
                    caretPositions[r + 1] = a + s * (n + 1);
                    caretPositions[r + 2] = i;
                    caretPositions[r + 3] = o;
                }
            }
            function h() {
                return (self.performance || Date).now();
            }
            function u() {
                this.data = [];
            }
            let f = [
                "glyphObj",
                "x",
                "y",
                "width",
                "charIndex",
                "fontData"
            ];
            u.prototype = {
                width: 0,
                lineHeight: 0,
                baseline: 0,
                cap: 0,
                ex: 0,
                isSoftWrapped: false,
                get count () {
                    return Math.ceil(this.data.length / f.length);
                },
                glyphAt (e) {
                    let u_flyweight = u.flyweight;
                    u_flyweight.data = this.data;
                    u_flyweight.index = e;
                    return u_flyweight;
                },
                splitAt (e) {
                    let t = new u;
                    t.data = this.data.splice(e * f.length);
                    return t;
                }
            };
            u.flyweight = f.reduce((acc, item, index, a)=>{
                Object.defineProperty(acc, item, {
                    get () {
                        return this.data[this.index * f.length + index];
                    },
                    set (e) {
                        this.data[this.index * f.length + index] = e;
                    }
                });
                return acc;
            }, {
                data: null,
                index: 0
            });
            return {
                typeset,
                measure: function(e, t) {
                    typeset({
                        ...e,
                        metricsOnly: true
                    }, (e)=>{
                        let [r, a, n, i] = e.blockBounds;
                        t({
                            width: n - r,
                            height: i - a
                        });
                    });
                }
            };
        },
        f,
        A_2
    ],
    init: (e, t, r)=>e(t, r())
});
let G = o.kl({
    name: "Typesetter",
    dependencies: [
        A
    ],
    init: (e)=>function(t) {
            return new Promise((resolve)=>{
                e.typeset(t, resolve);
            });
        },
    getTransferables (e) {
        let t = [];
        for(let r in e){
            if (e[r] && e[r].buffer) {
                t.push(e[r].buffer);
            }
        }
        return t;
    }
});
let G_onMainThread = G.onMainThread;
let O = {};
let I = "aTroikaGlyphIndex";
class B extends CmU {
    constructor(){
        super();
        this.detail = 1;
        this.curveRadius = 0;
        this.groups = [
            {
                start: 0,
                count: Infinity,
                materialIndex: 0
            },
            {
                start: 0,
                count: Infinity,
                materialIndex: 1
            }
        ];
        this.boundingSphere = new iyt;
        this.boundingBox = new NRn;
    }
    computeBoundingSphere() {}
    computeBoundingBox() {}
    set detail(e) {
        if (e !== this._detail) {
            let t;
            let r;
            this._detail = e;
            if (typeof e !== "number" || e < 1) {
                e = 1;
            }
            if (!(r = O[t = e])) {
                r = O[t] = new bdM(1, 1, t, t).translate(0.5, 0.5, 0);
            }
            let a = r;
            [
                "position",
                "normal",
                "uv"
            ].forEach((e)=>{
                this.attributes[e] = a.attributes[e].clone();
            });
            this.setIndex(a.getIndex().clone());
        }
    }
    get detail() {
        return this._detail;
    }
    set curveRadius(e) {
        if (e !== this._curveRadius) {
            this._curveRadius = e;
            this._updateBounds();
        }
    }
    get curveRadius() {
        return this._curveRadius;
    }
    updateGlyphs(e, t, r, a, n) {
        this.updateAttributeData("aTroikaGlyphBounds", e, 4);
        this.updateAttributeData(I, t, 1);
        this.updateAttributeData("aTroikaGlyphColor", n, 3);
        this._blockBounds = r;
        this._chunkedBounds = a;
        this.instanceCount = t.length;
        this._updateBounds();
    }
    _updateBounds() {
        let _blockBounds = this._blockBounds;
        if (_blockBounds) {
            let { curveRadius, boundingBox } = this;
            if (curveRadius) {
                let { PI, floor, min, max, sin, cos } = Math;
                let h = PI / 2;
                let u = 2 * PI;
                let f = Math.abs(curveRadius);
                let d = _blockBounds[0] / f;
                let c = _blockBounds[2] / f;
                let p = floor((d + h) / u) !== floor((c + h) / u) ? -f : min(sin(d) * f, sin(c) * f);
                let v = floor((d - h) / u) !== floor((c - h) / u) ? f : max(sin(d) * f, sin(c) * f);
                let g = floor((d + PI) / u) !== floor((c + PI) / u) ? 2 * f : max(f - cos(d) * f, f - cos(c) * f);
                boundingBox.min.set(p, _blockBounds[1], curveRadius < 0 ? -g : 0);
                boundingBox.max.set(v, _blockBounds[3], curveRadius < 0 ? 0 : g);
            } else {
                boundingBox.min.set(_blockBounds[0], _blockBounds[1], 0);
                boundingBox.max.set(_blockBounds[2], _blockBounds[3], 0);
            }
            boundingBox.getBoundingSphere(this.boundingSphere);
        }
    }
    applyClipRect(e) {
        let count = this.getAttribute(I).count;
        let _chunkedBounds = this._chunkedBounds;
        if (_chunkedBounds) {
            for(let a = _chunkedBounds.length; a--;){
                count = _chunkedBounds[a].end;
                let n = _chunkedBounds[a].rect;
                if (n[1] < e.w && n[3] > e.y && n[0] < e.z && n[2] > e.x) {
                    break;
                }
            }
        }
        this.instanceCount = count;
    }
    updateAttributeData(e, t, r) {
        let a = this.getAttribute(e);
        if (t) {
            if (a && a.array.length === t.length) {
                a.array.set(t);
                a.needsUpdate = true;
            } else {
                this.setAttribute(e, new uWO(t, r));
                delete this._maxInstanceCount;
                this.dispose();
            }
        } else if (a) {
            this.deleteAttribute(e);
        }
    }
}
let vertexDefs = `
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`;
let vertexTransform = `
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`;
let fragmentDefs = `
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`;
let fragmentColorTransform = `
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;
let W = new V9B({
    color: 16777215,
    side,
    transparent: true
});
let z = new kn4;
let V = new Pq0;
let j = new Pq0;
let N = [];
let H = new Pq0;
let q = "+x+y";
function X(material) {
    if (Array.isArray(material)) {
        return material[0];
    }
    return material;
}
let Y = ()=>{
    let e = new eaF(new bdM(1, 1), W);
    Y = ()=>e;
    return e;
};
let $ = ()=>{
    let e = new eaF(new bdM(1, 1, 32, 1), W);
    $ = ()=>e;
    return e;
};
let Q = {
    type: "syncstart"
};
let Z = {
    type: "synccomplete"
};
let J = [
    "font",
    "fontSize",
    "fontStyle",
    "fontWeight",
    "lang",
    "letterSpacing",
    "lineHeight",
    "maxWidth",
    "overflowWrap",
    "text",
    "direction",
    "textAlign",
    "textIndent",
    "whiteSpace",
    "anchorX",
    "anchorY",
    "colorRanges",
    "sdfGlyphSize"
];
let K = J.concat("material", "color", "depthOffset", "clipRect", "curveRadius", "orientation", "glyphGeometryDetail");
export class EY extends eaF {
    constructor(){
        super(new B, null);
        this.text = "";
        this.anchorX = 0;
        this.anchorY = 0;
        this.curveRadius = 0;
        this.direction = "auto";
        this.font = null;
        this.unicodeFontsURL = null;
        this.fontSize = 0.1;
        this.fontWeight = "normal";
        this.fontStyle = "normal";
        this.lang = null;
        this.letterSpacing = 0;
        this.lineHeight = "normal";
        this.maxWidth = Infinity;
        this.overflowWrap = "normal";
        this.textAlign = "left";
        this.textIndent = 0;
        this.whiteSpace = "normal";
        this.material = null;
        this.color = null;
        this.colorRanges = null;
        this.outlineWidth = 0;
        this.outlineColor = 0;
        this.outlineOpacity = 1;
        this.outlineBlur = 0;
        this.outlineOffsetX = 0;
        this.outlineOffsetY = 0;
        this.strokeWidth = 0;
        this.strokeColor = 8421504;
        this.strokeOpacity = 1;
        this.fillOpacity = 1;
        this.depthOffset = 0;
        this.clipRect = null;
        this.orientation = q;
        this.glyphGeometryDetail = 1;
        this.sdfGlyphSize = null;
        this.gpuAccelerateSDF = true;
        this.debugSDF = false;
    }
    sync(e) {
        if (this._needsSync) {
            this._needsSync = false;
            if (this._isSyncing) {
                (this._queuedSyncs || (this._queuedSyncs = [])).push(e);
            } else {
                this._isSyncing = true;
                this.dispatchEvent(Q);
                F({
                    text: this.text,
                    font: this.font,
                    lang: this.lang,
                    fontSize: this.fontSize || 0.1,
                    fontWeight: this.fontWeight || "normal",
                    fontStyle: this.fontStyle || "normal",
                    letterSpacing: this.letterSpacing || 0,
                    lineHeight: this.lineHeight || "normal",
                    maxWidth: this.maxWidth,
                    direction: this.direction || "auto",
                    textAlign: this.textAlign,
                    textIndent: this.textIndent,
                    whiteSpace: this.whiteSpace,
                    overflowWrap: this.overflowWrap,
                    anchorX: this.anchorX,
                    anchorY: this.anchorY,
                    colorRanges: this.colorRanges,
                    includeCaretPositions: true,
                    sdfGlyphSize: this.sdfGlyphSize,
                    gpuAccelerateSDF: this.gpuAccelerateSDF,
                    unicodeFontsURL: this.unicodeFontsURL
                }, (t)=>{
                    this._isSyncing = false;
                    this._textRenderInfo = t;
                    this.geometry.updateGlyphs(t.glyphBounds, t.glyphAtlasIndices, t.blockBounds, t.chunkedBounds, t.glyphColors);
                    let _queuedSyncs = this._queuedSyncs;
                    if (_queuedSyncs) {
                        this._queuedSyncs = null;
                        this._needsSync = true;
                        this.sync(()=>{
                            _queuedSyncs.forEach((e)=>e && e());
                        });
                    }
                    this.dispatchEvent(Z);
                    if (e) {
                        e();
                    }
                });
            }
        }
    }
    onBeforeRender(e, t, r, a, n, i) {
        this.sync();
        if (n.isTroikaTextMaterial) {
            this._prepareForRender(n);
        }
    }
    dispose() {
        this.geometry.dispose();
    }
    get textRenderInfo() {
        return this._textRenderInfo || null;
    }
    createDerivedMaterial(e) {
        let t = Fh(e, {
            chained: true,
            extensions: {
                derivatives: true
            },
            uniforms: {
                uTroikaSDFTexture: {
                    value: null
                },
                uTroikaSDFTextureSize: {
                    value: new I9Y
                },
                uTroikaSDFGlyphSize: {
                    value: 0
                },
                uTroikaSDFExponent: {
                    value: 0
                },
                uTroikaTotalBounds: {
                    value: new IUQ(0, 0, 0, 0)
                },
                uTroikaClipRect: {
                    value: new IUQ(0, 0, 0, 0)
                },
                uTroikaEdgeOffset: {
                    value: 0
                },
                uTroikaFillOpacity: {
                    value: 1
                },
                uTroikaPositionOffset: {
                    value: new I9Y
                },
                uTroikaCurveRadius: {
                    value: 0
                },
                uTroikaBlurRadius: {
                    value: 0
                },
                uTroikaStrokeWidth: {
                    value: 0
                },
                uTroikaStrokeColor: {
                    value: new Q1f
                },
                uTroikaStrokeOpacity: {
                    value: 1
                },
                uTroikaOrient: {
                    value: new dwI
                },
                uTroikaUseGlyphColors: {
                    value: true
                },
                uTroikaSDFDebug: {
                    value: false
                }
            },
            vertexDefs,
            vertexTransform,
            fragmentDefs,
            fragmentColorTransform,
            customRewriter ({ vertexShader, fragmentShader }) {
                let r = /\buniform\s+vec3\s+diffuse\b/;
                if (r.test(fragmentShader)) {
                    fragmentShader = fragmentShader.replace(r, "varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g, "vTroikaGlyphColor");
                    if (!r.test(vertexShader)) {
                        vertexShader = vertexShader.replace(Do, "uniform vec3 diffuse;\n$&\nvTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;\n");
                    }
                }
                return {
                    vertexShader,
                    fragmentShader
                };
            }
        });
        t.transparent = true;
        t.forceSinglePass = true;
        Object.defineProperties(t, {
            isTroikaTextMaterial: {
                value: true
            },
            shadowSide: {
                get () {
                    return this.side;
                },
                set () {}
            }
        });
        return t;
    }
    get material() {
        let _derivedMaterial = this._derivedMaterial;
        let t = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = W.clone());
        if (!(_derivedMaterial && _derivedMaterial.isDerivedFrom(t))) {
            _derivedMaterial = this._derivedMaterial = this.createDerivedMaterial(t);
            t.addEventListener("dispose", function r() {
                t.removeEventListener("dispose", r);
                _derivedMaterial.dispose();
            });
        }
        if (!this.hasOutline()) {
            return _derivedMaterial;
        }
        {
            let t = _derivedMaterial._outlineMtl;
            if (!t) {
                t = _derivedMaterial._outlineMtl = Object.create(_derivedMaterial, {
                    id: {
                        value: _derivedMaterial.id + 0.1
                    }
                });
                t.isTextOutlineMaterial = true;
                t.depthWrite = false;
                t.map = null;
                _derivedMaterial.addEventListener("dispose", function r() {
                    _derivedMaterial.removeEventListener("dispose", r);
                    t.dispose();
                });
            }
            return [
                t,
                _derivedMaterial
            ];
        }
    }
    set material(e) {
        if (e && e.isTroikaTextMaterial) {
            this._derivedMaterial = e;
            this._baseMaterial = e.baseMaterial;
        } else {
            this._baseMaterial = e;
        }
    }
    hasOutline() {
        return !!(this.outlineWidth || this.outlineBlur || this.outlineOffsetX || this.outlineOffsetY);
    }
    get glyphGeometryDetail() {
        return this.geometry.detail;
    }
    set glyphGeometryDetail(e) {
        this.geometry.detail = e;
    }
    get curveRadius() {
        return this.geometry.curveRadius;
    }
    set curveRadius(e) {
        this.geometry.curveRadius = e;
    }
    get customDepthMaterial() {
        return X(this.material).getDepthMaterial();
    }
    set customDepthMaterial(e) {}
    get customDistanceMaterial() {
        return X(this.material).getDistanceMaterial();
    }
    set customDistanceMaterial(e) {}
    _prepareForRender(e) {
        let e_isTextOutlineMaterial = e.isTextOutlineMaterial;
        let e_uniforms = e.uniforms;
        let textRenderInfo = this.textRenderInfo;
        if (textRenderInfo) {
            let e;
            let n;
            let i;
            let { sdfTexture, blockBounds } = textRenderInfo;
            e_uniforms.uTroikaSDFTexture.value = sdfTexture;
            e_uniforms.uTroikaSDFTextureSize.value.set(sdfTexture.image.width, sdfTexture.image.height);
            e_uniforms.uTroikaSDFGlyphSize.value = textRenderInfo.sdfGlyphSize;
            e_uniforms.uTroikaSDFExponent.value = textRenderInfo.sdfExponent;
            e_uniforms.uTroikaTotalBounds.value.fromArray(blockBounds);
            e_uniforms.uTroikaUseGlyphColors.value = !e_isTextOutlineMaterial && !!textRenderInfo.glyphColors;
            let l = 0;
            let h = 0;
            let u = 0;
            let f = 0;
            let d = 0;
            if (e_isTextOutlineMaterial) {
                let { outlineWidth, outlineOffsetX, outlineOffsetY, outlineBlur, outlineOpacity } = this;
                l = this._parsePercent(outlineWidth) || 0;
                h = Math.max(0, this._parsePercent(outlineBlur) || 0);
                e = outlineOpacity;
                f = this._parsePercent(outlineOffsetX) || 0;
                d = this._parsePercent(outlineOffsetY) || 0;
            } else {
                if (u = Math.max(0, this._parsePercent(this.strokeWidth) || 0)) {
                    i = this.strokeColor;
                    e_uniforms.uTroikaStrokeColor.value.set(i ?? 8421504);
                    if ((n = this.strokeOpacity) == null) {
                        n = 1;
                    }
                }
                e = this.fillOpacity;
            }
            e_uniforms.uTroikaEdgeOffset.value = l;
            e_uniforms.uTroikaPositionOffset.value.set(f, d);
            e_uniforms.uTroikaBlurRadius.value = h;
            e_uniforms.uTroikaStrokeWidth.value = u;
            e_uniforms.uTroikaStrokeOpacity.value = n;
            e_uniforms.uTroikaFillOpacity.value = e ?? 1;
            e_uniforms.uTroikaCurveRadius.value = this.curveRadius || 0;
            let c = this.clipRect;
            if (c && Array.isArray(c) && c.length === 4) {
                e_uniforms.uTroikaClipRect.value.fromArray(c);
            } else {
                let e = 100 * (this.fontSize || 0.1);
                e_uniforms.uTroikaClipRect.value.set(blockBounds[0] - e, blockBounds[1] - e, blockBounds[2] + e, blockBounds[3] + e);
            }
            this.geometry.applyClipRect(e_uniforms.uTroikaClipRect.value);
        }
        e_uniforms.uTroikaSDFDebug.value = !!this.debugSDF;
        e.polygonOffset = !!this.depthOffset;
        e.polygonOffsetFactor = e.polygonOffsetUnits = this.depthOffset || 0;
        let n = e_isTextOutlineMaterial ? this.outlineColor || 0 : this.color;
        if (n == null) {
            delete e.color;
        } else {
            let t = e.hasOwnProperty("color") ? e.color : e.color = new Q1f;
            if (n !== t._input || typeof n === "object") {
                t.set(t._input = n);
            }
        }
        let o = this.orientation || q;
        if (o !== e._orientation) {
            let t = e_uniforms.uTroikaOrient.value;
            let a = (o = o.replace(/[^-+xyz]/g, "")) !== q && o.match(/^([-+])([xyz])([-+])([xyz])$/);
            if (a) {
                let [, e, r, n, i] = a;
                V.set(0, 0, 0)[r] = e === "-" ? 1 : -1;
                j.set(0, 0, 0)[i] = n === "-" ? -1 : 1;
                z.lookAt(H, V.cross(j), j);
                t.setFromMatrix4(z);
            } else {
                t.identity();
            }
            e._orientation = o;
        }
    }
    _parsePercent(e) {
        if (typeof e === "string") {
            let t = e.match(/^(-?[\d.]+)%$/);
            let r = t ? parseFloat(t[1]) : NaN;
            e = (isNaN(r) ? 0 : r / 100) * this.fontSize;
        }
        return e;
    }
    localPositionToTextCoords(e, t = new I9Y) {
        t.copy(e);
        let curveRadius = this.curveRadius;
        if (curveRadius) {
            t.x = Math.atan2(e.x, Math.abs(curveRadius) - Math.abs(e.z)) * Math.abs(curveRadius);
        }
        return t;
    }
    worldPositionToTextCoords(e, t = new I9Y) {
        V.copy(e);
        return this.localPositionToTextCoords(this.worldToLocal(V), t);
    }
    raycast(e, t) {
        let { textRenderInfo, curveRadius } = this;
        if (textRenderInfo) {
            let n = textRenderInfo.blockBounds;
            let i = curveRadius ? $() : Y();
            let o = i.geometry;
            let { position, uv } = o.attributes;
            for(let e = 0; e < uv.count; e++){
                let t = n[0] + uv.getX(e) * (n[2] - n[0]);
                let r = n[1] + uv.getY(e) * (n[3] - n[1]);
                let i = 0;
                if (curveRadius) {
                    i = curveRadius - Math.cos(t / curveRadius) * curveRadius;
                    t = Math.sin(t / curveRadius) * curveRadius;
                }
                position.setXYZ(e, t, r, i);
            }
            o.boundingSphere = this.geometry.boundingSphere;
            o.boundingBox = this.geometry.boundingBox;
            i.matrixWorld = this.matrixWorld;
            i.material.side = this.material.side;
            N.length = 0;
            i.raycast(e, N);
            for(let e = 0; e < N.length; e++){
                N[e].object = this;
                t.push(N[e]);
            }
        }
    }
    copy(e) {
        let geometry = this.geometry;
        super.copy(e);
        this.geometry = geometry;
        K.forEach((t)=>{
            this[t] = e[t];
        });
        return this;
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
J.forEach((e)=>{
    let t = `_private_${e}`;
    Object.defineProperty(EY.prototype, e, {
        get () {
            return this[t];
        },
        set (e) {
            if (e !== this[t]) {
                this[t] = e;
                this._needsSync = true;
            }
        }
    });
});
new NRn;
new Q1f;
new WeakMap;
new WeakMap;
