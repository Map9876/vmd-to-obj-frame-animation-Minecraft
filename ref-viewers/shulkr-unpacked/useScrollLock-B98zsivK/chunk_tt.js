import { h, p } from "../dist-7IP26fql.js";
export function tt(e) {
    let current = h(nt, e).current;
    current.next = e;
    p(current.effect);
    return current;
}
function nt(e) {
    let t = {
        current: e,
        next: e,
        effect: ()=>{
            t.current = t.next;
        }
    };
    return t;
}
