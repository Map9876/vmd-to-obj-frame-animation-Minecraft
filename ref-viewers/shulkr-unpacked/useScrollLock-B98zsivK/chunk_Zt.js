import { x } from "../dist-7IP26fql.js";
function Zt(e) {
    if (x(e) !== `input`) {
        return null;
    }
    let t = e;
    if (t.type === `radio` && t.name !== ``) {
        return t;
    }
    return null;
}
export function Qt(e, t) {
    let n = Zt(e);
    if (!n) {
        return true;
    }
    let r = t.find((e)=>{
        let t = Zt(e);
        return t?.name === n.name && t.form === n.form && t.checked;
    });
    if (r) {
        return r === n;
    }
    return t.find((e)=>{
        let t = Zt(e);
        return t?.name === n.name && t.form === n.form;
    }) === n;
}
