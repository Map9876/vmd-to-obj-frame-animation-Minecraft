import "./module-86897.js";
import { forwardRef, useEffect, useRef, useState } from "./module-61426.js";
import { n } from "./module-59008_2.js";
import "./module-53039_2.js";
import "./module-52605_2.js";
import "./module-51551_2.js";
export let DiscoveryFilterBar = forwardRef(function({ children, className = "" }, ref) {
    let top = 64 * !n();
    let oRef = useRef(null);
    let [c, setC] = useState(false);
    useEffect(()=>{
        if (!oRef.current) {
            return;
        }
        let e = new IntersectionObserver(([t])=>setC(t.boundingClientRect.top < top), {
            rootMargin: `-${top}px 0px 0px 0px`,
            threshold: [
                0,
                1
            ]
        });
        e.observe(oRef.current);
        return ()=>e.disconnect();
    }, [
        top
    ]);
    return <><div ref={oRef} aria-hidden="true" style={{
        height: 1,
        marginBottom: -1,
        pointerEvents: "none"
    }}/><div ref={ref} className={`ubg-filterz discovery-filter discovery-filter-c ${className}`} data-stuck={c} style={{
        top
    }}><div className="wrap">{children}</div></div></>;
});
