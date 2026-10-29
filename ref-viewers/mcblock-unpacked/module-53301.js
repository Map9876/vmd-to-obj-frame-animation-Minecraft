import { useEffect, useState } from "./module-61426.js";
export function g(e, t, n) {
    let [r, setR] = useState(false);
    useEffect(()=>{
        let e_current = e.current;
        let l = e_current?.parentElement;
        let r = t ? l?.querySelector(t) : null;
        if (!e_current || !l || !r) {
            return void setR(false);
        }
        let i = ()=>{
            let l_clientWidth = l.clientWidth;
            if (!r.offsetWidth || r.offsetParent !== l || r.offsetWidth >= l_clientWidth - 8) {
                return void setR(false);
            }
            setR((l_clientWidth + e_current.offsetWidth) / 2 + 12 > r.offsetLeft);
        };
        i();
        let s = new ResizeObserver(i);
        s.observe(l);
        s.observe(e_current);
        s.observe(r);
        return ()=>s.disconnect();
    }, [
        e,
        t,
        ...n
    ]);
    return r;
}
