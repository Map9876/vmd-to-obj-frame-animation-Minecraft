(()=>{
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var r = {
        rotl: function(e, t) {
            return e << t | e >>> 32 - t;
        },
        rotr: function(e, t) {
            return e << 32 - t | e >>> t;
        },
        endian: function(e) {
            if (e.constructor == Number) {
                return 16711935 & r.rotl(e, 8) | 4278255360 & r.rotl(e, 24);
            }
            for(let t = 0; t < e.length; t++){
                e[t] = r.endian(e[t]);
            }
            return e;
        },
        randomBytes: function(e) {
            const t = [];
            for(; e > 0; e--){
                t.push(Math.floor(256 * Math.random()));
            }
            return t;
        },
        bytesToWords: function(e) {
            const t = [];
            for(let r = 0, s = 0; r < e.length; r++, s += 8){
                t[s >>> 5] |= e[r] << 24 - s % 32;
            }
            return t;
        },
        wordsToBytes: function(e) {
            const t = [];
            for(let r = 0; r < 32 * e.length; r += 8){
                t.push(e[r >>> 5] >>> 24 - r % 32 & 255);
            }
            return t;
        },
        bytesToHex: function(e) {
            const t = [];
            for(let r = 0; r < e.length; r++){
                t.push((e[r] >>> 4).toString(16));
                t.push((15 & e[r]).toString(16));
            }
            return t.join("");
        },
        hexToBytes: function(e) {
            const t = [];
            for(let r = 0; r < e.length; r += 2){
                t.push(parseInt(e.substr(r, 2), 16));
            }
            return t;
        },
        bytesToBase64: function(e) {
            const r = [];
            for(let s = 0; s < e.length; s += 3){
                const n = e[s] << 16 | e[s + 1] << 8 | e[s + 2];
                for(let i = 0; i < 4; i++){
                    if (8 * s + 6 * i <= 8 * e.length) {
                        r.push(t.charAt(n >>> 6 * (3 - i) & 63));
                    } else {
                        r.push("=");
                    }
                }
            }
            return r.join("");
        },
        base64ToBytes: function(e) {
            e = e.replace(/[^A-Z0-9+\/]/ig, "");
            const r = [];
            for(let s = 0, n = 0; s < e.length; n = ++s % 4){
                if (n != 0) {
                    r.push((t.indexOf(e.charAt(s - 1)) & 2 ** (-2 * n + 8) - 1) << 2 * n | t.indexOf(e.charAt(s)) >>> 6 - 2 * n);
                }
            }
            return r;
        }
    };
    module.exports = r;
})();
