var t = {
    utf8: {
        stringToBytes: function(e) {
            return t.bin.stringToBytes(unescape(encodeURIComponent(e)));
        },
        bytesToString: function(e) {
            return decodeURIComponent(escape(t.bin.bytesToString(e)));
        }
    },
    bin: {
        stringToBytes: function(e) {
            const t = [];
            for(let r = 0; r < e.length; r++){
                t.push(255 & e.charCodeAt(r));
            }
            return t;
        },
        bytesToString: function(e) {
            const t = [];
            for(let r = 0; r < e.length; r++){
                t.push(String.fromCharCode(e[r]));
            }
            return t.join("");
        }
    }
};
export default t;
