export const bp = {
    enabled: false,
    files: {},
    add: function(e, t) {
        if (this.enabled !== false) {
            if (!xp(e)) {
                this.files[e] = t;
            }
        }
    },
    get: function(e) {
        if (this.enabled !== false && !xp(e)) {
            return this.files[e];
        }
    },
    remove: function(e) {
        delete this.files[e];
    },
    clear: function() {
        this.files = {};
    }
};
function xp(e) {
    try {
        let t = e.slice(e.indexOf(`:`) + 1);
        return new URL(t).protocol === `blob:`;
    } catch  {
        return false;
    }
}
export function Lh(e, t) {
    if (e.length !== t.length) {
        return false;
    }
    for(let n = 0, r = e.length; n < r; n++){
        if (e[n] !== t[n]) {
            return false;
        }
    }
    return true;
}
