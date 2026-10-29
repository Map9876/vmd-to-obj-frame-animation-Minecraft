import { a as a_1 } from "../dist-7IP26fql.js";
let vn = 0;
export function yn(e, { preventScroll = false, sync = false, shouldFocus } = {}) {
    cancelAnimationFrame(vn);
    function a() {
        if (!(shouldFocus && !shouldFocus())) {
            e?.focus({
                preventScroll
            });
        }
    }
    if (sync) {
        a();
        return a_1;
    }
    let o = requestAnimationFrame(a);
    vn = o;
    return ()=>{
        if (vn === o) {
            cancelAnimationFrame(o);
            vn = 0;
        }
    };
}
