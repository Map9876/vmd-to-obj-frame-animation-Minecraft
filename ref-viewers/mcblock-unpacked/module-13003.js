import "./module-86897.js";
import { forwardRef, useEffect, useRef, useState } from "./module-61426.js";
import { n } from "./module-59008.js";
import "./module-53039.js";
import "./module-52605.js";
import "./module-51551.js";
export let DiscoveryFilterBar = forwardRef(function({ children, className = "" }, ref) {
    let top = 64 * !n();
    let lRef = useRef(null);
    let [o, setO] = useState(false);
    useEffect(()=>{
        if (!lRef.current) {
            return;
        }
        let e = new IntersectionObserver(([t])=>setO(t.boundingClientRect.top < top), {
            rootMargin: `-${top}px 0px 0px 0px`,
            threshold: [
                0,
                1
            ]
        });
        e.observe(lRef.current);
        return ()=>e.disconnect();
    }, [
        top
    ]);
    return <><div ref={lRef} aria-hidden="true" style={{
        height: 1,
        marginBottom: -1,
        pointerEvents: "none"
    }}/><div ref={ref} className={`ubg-filterz discovery-filter discovery-filter-c ${className}`} data-stuck={o} style={{
        top
    }}><div className="wrap">{children}</div></div></>;
});
