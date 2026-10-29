const mi = 9;
const hi = 32;
function gi(e) {
    let t = String(e);
    let n = /\r?\n|\r/g;
    let r = n.exec(t);
    let i = 0;
    let a = [];
    while(r){
        a.push(_i(t.slice(i, r.index), i > 0, true), r[0]);
        i = r.index + r[0].length;
        r = n.exec(t);
    }
    a.push(_i(t.slice(i), i > 0, false));
    return a.join(``);
}
function _i(e, t, n) {
    let r = 0;
    let e_length = e.length;
    if (t) {
        let t = e.codePointAt(r);
        while(t === mi || t === hi){
            r++;
            t = e.codePointAt(r);
        }
    }
    if (n) {
        let t = e.codePointAt(e_length - 1);
        while(t === mi || t === hi){
            e_length--;
            t = e.codePointAt(e_length - 1);
        }
    }
    if (e_length > r) {
        return e.slice(r, e_length);
    }
    return ``;
}
export function vi(e, t) {
    let n = {
        type: `text`,
        value: gi(String(t.value))
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
