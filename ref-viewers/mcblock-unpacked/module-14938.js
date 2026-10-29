import "./module-86897.js";
import { useEffect, useState } from "./module-61426.js";
const a = require(44460);
export function s({ threshold = 600 }) {
    let [r, setR] = useState(false);
    useEffect(()=>{
        let e = false;
        let r = ()=>{
            e = false;
            setR(window.scrollY > threshold);
        };
        let n = ()=>{
            if (!e) {
                e = true;
                window.requestAnimationFrame(r);
            }
        };
        r();
        window.addEventListener("scroll", n, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", n);
    }, [
        threshold
    ]);
    if (r) {
        return <a.K type="button" label="返回顶部" size="sm" variant="secondary" className="fixed bottom-[72px] left-3 md:left-auto md:right-6 z-[99]" onClick={()=>{
            let e = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({
                top: 0,
                behavior: e ? "auto" : "smooth"
            });
        }}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden><path d="M12 19V6M5 12l7-7 7 7"/></svg></a.K>;
    }
    return null;
}
