export default function(e, t) {
    let r = e == null ? null : typeof Symbol !== "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (r != null) {
        let n;
        let o;
        let a;
        let u;
        const s = [];
        let i = true;
        let c = false;
        try {
            a = (r = r.call(e)).next;
            if (t === 0) {
                if (Object(r) !== r) {
                    return;
                }
                i = false;
            } else {
                for(; !(i = (n = a.call(r)).done) && (s.push(n.value), s.length !== t); i = true);
            }
        } catch (error) {
            c = true;
            o = error;
        } finally{
            try {
                if (!i && r.return != null && (u = r.return(), Object(u) !== u)) {
                    return;
                }
            } finally{
                if (c) {
                    throw o;
                }
            }
        }
        return s;
    }
};
