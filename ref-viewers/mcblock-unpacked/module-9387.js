(()=>{
    const t = require("./module-4943.js");
    const utf8 = require("./module-72843.js").default.utf8;
    const n = require("./module-59410.js").default;
    const bin = require("./module-72843.js").default.bin;
    const a = function(e, r) {
        if (e.constructor == String) {
            e = r && r.encoding === "binary" ? bin.stringToBytes(e) : utf8.stringToBytes(e);
        } else if (n(e)) {
            e = Array.prototype.slice.call(e, 0);
        } else if (!(Array.isArray(e) || e.constructor === Uint8Array)) {
            e = e.toString();
        }
        for(var o = t.bytesToWords(e), u = 8 * e.length, c = 1732584193, h = -271733879, l = -1732584194, d = 271733878, f = 0; f < o.length; f++){
            o[f] = (o[f] << 8 | o[f] >>> 24) & 16711935 | (o[f] << 24 | o[f] >>> 8) & 4278255360;
        }
        o[u >>> 5] |= 128 << u % 32;
        o[(u + 64 >>> 9 << 4) + 14] = u;
        const { _ff, _gg, _hh, _ii } = a;
        for(var f = 0; f < o.length; f += 16){
            const w = c;
            const v = h;
            const b = l;
            const y = d;
            c = _ff(c, h, l, d, o[f + 0], 7, -680876936);
            d = _ff(d, c, h, l, o[f + 1], 12, -389564586);
            l = _ff(l, d, c, h, o[f + 2], 17, 606105819);
            h = _ff(h, l, d, c, o[f + 3], 22, -1044525330);
            c = _ff(c, h, l, d, o[f + 4], 7, -176418897);
            d = _ff(d, c, h, l, o[f + 5], 12, 1200080426);
            l = _ff(l, d, c, h, o[f + 6], 17, -1473231341);
            h = _ff(h, l, d, c, o[f + 7], 22, -45705983);
            c = _ff(c, h, l, d, o[f + 8], 7, 1770035416);
            d = _ff(d, c, h, l, o[f + 9], 12, -1958414417);
            l = _ff(l, d, c, h, o[f + 10], 17, -42063);
            h = _ff(h, l, d, c, o[f + 11], 22, -1990404162);
            c = _ff(c, h, l, d, o[f + 12], 7, 1804603682);
            d = _ff(d, c, h, l, o[f + 13], 12, -40341101);
            l = _ff(l, d, c, h, o[f + 14], 17, -1502002290);
            h = _ff(h, l, d, c, o[f + 15], 22, 1236535329);
            c = _gg(c, h, l, d, o[f + 1], 5, -165796510);
            d = _gg(d, c, h, l, o[f + 6], 9, -1069501632);
            l = _gg(l, d, c, h, o[f + 11], 14, 643717713);
            h = _gg(h, l, d, c, o[f + 0], 20, -373897302);
            c = _gg(c, h, l, d, o[f + 5], 5, -701558691);
            d = _gg(d, c, h, l, o[f + 10], 9, 38016083);
            l = _gg(l, d, c, h, o[f + 15], 14, -660478335);
            h = _gg(h, l, d, c, o[f + 4], 20, -405537848);
            c = _gg(c, h, l, d, o[f + 9], 5, 568446438);
            d = _gg(d, c, h, l, o[f + 14], 9, -1019803690);
            l = _gg(l, d, c, h, o[f + 3], 14, -187363961);
            h = _gg(h, l, d, c, o[f + 8], 20, 1163531501);
            c = _gg(c, h, l, d, o[f + 13], 5, -1444681467);
            d = _gg(d, c, h, l, o[f + 2], 9, -51403784);
            l = _gg(l, d, c, h, o[f + 7], 14, 1735328473);
            h = _gg(h, l, d, c, o[f + 12], 20, -1926607734);
            c = _hh(c, h, l, d, o[f + 5], 4, -378558);
            d = _hh(d, c, h, l, o[f + 8], 11, -2022574463);
            l = _hh(l, d, c, h, o[f + 11], 16, 1839030562);
            h = _hh(h, l, d, c, o[f + 14], 23, -35309556);
            c = _hh(c, h, l, d, o[f + 1], 4, -1530992060);
            d = _hh(d, c, h, l, o[f + 4], 11, 1272893353);
            l = _hh(l, d, c, h, o[f + 7], 16, -155497632);
            h = _hh(h, l, d, c, o[f + 10], 23, -1094730640);
            c = _hh(c, h, l, d, o[f + 13], 4, 681279174);
            d = _hh(d, c, h, l, o[f + 0], 11, -358537222);
            l = _hh(l, d, c, h, o[f + 3], 16, -722521979);
            h = _hh(h, l, d, c, o[f + 6], 23, 76029189);
            c = _hh(c, h, l, d, o[f + 9], 4, -640364487);
            d = _hh(d, c, h, l, o[f + 12], 11, -421815835);
            l = _hh(l, d, c, h, o[f + 15], 16, 530742520);
            h = _hh(h, l, d, c, o[f + 2], 23, -995338651);
            c = _ii(c, h, l, d, o[f + 0], 6, -198630844);
            d = _ii(d, c, h, l, o[f + 7], 10, 1126891415);
            l = _ii(l, d, c, h, o[f + 14], 15, -1416354905);
            h = _ii(h, l, d, c, o[f + 5], 21, -57434055);
            c = _ii(c, h, l, d, o[f + 12], 6, 1700485571);
            d = _ii(d, c, h, l, o[f + 3], 10, -1894986606);
            l = _ii(l, d, c, h, o[f + 10], 15, -1051523);
            h = _ii(h, l, d, c, o[f + 1], 21, -2054922799);
            c = _ii(c, h, l, d, o[f + 8], 6, 1873313359);
            d = _ii(d, c, h, l, o[f + 15], 10, -30611744);
            l = _ii(l, d, c, h, o[f + 6], 15, -1560198380);
            h = _ii(h, l, d, c, o[f + 13], 21, 1309151649);
            c = _ii(c, h, l, d, o[f + 4], 6, -145523070);
            d = _ii(d, c, h, l, o[f + 11], 10, -1120210379);
            l = _ii(l, d, c, h, o[f + 2], 15, 718787259);
            h = _ii(h, l, d, c, o[f + 9], 21, -343485551);
            c = c + w >>> 0;
            h = h + v >>> 0;
            l = l + b >>> 0;
            d = d + y >>> 0;
        }
        return t.endian([
            c,
            h,
            l,
            d
        ]);
    };
    a._ff = function(e, t, r, s, n, i, a) {
        const o = e + (t & r | ~t & s) + (n >>> 0) + a;
        return (o << i | o >>> 32 - i) + t;
    };
    a._gg = function(e, t, r, s, n, i, a) {
        const o = e + (t & s | r & ~s) + (n >>> 0) + a;
        return (o << i | o >>> 32 - i) + t;
    };
    a._hh = function(e, t, r, s, n, i, a) {
        const o = e + (t ^ r ^ s) + (n >>> 0) + a;
        return (o << i | o >>> 32 - i) + t;
    };
    a._ii = function(e, t, r, s, n, i, a) {
        const o = e + (r ^ (t | ~s)) + (n >>> 0) + a;
        return (o << i | o >>> 32 - i) + t;
    };
    a._blocksize = 16;
    a._digestsize = 16;
    module.exports = function(e, r) {
        if (e == null) {
            throw Error(`Illegal argument ${e}`);
        }
        const s = t.wordsToBytes(a(e, r));
        if (r && r.asBytes) {
            return s;
        }
        if (r && r.asString) {
            return bin.bytesToString(s);
        }
        return t.bytesToHex(s);
    };
})();
