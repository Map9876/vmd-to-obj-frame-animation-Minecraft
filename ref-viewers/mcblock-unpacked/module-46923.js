import "./module-88945.js";
import { Children, forwardRef, useEffect, useLayoutEffect, useMemo, useState } from "./module-61426.js";
import { EY, PY } from "./module-14785.js";
import { C } from "./module-59040.js";
import { DY } from "./module-23689.js";
export let E = forwardRef(({ sdfGlyphSize = 64, anchorX = "center", anchorY = "middle", font, fontSize = 1, children, characters, onSync, ...rest }, ref)=>{
    let g = C(({ invalidate })=>invalidate);
    let [p] = useState(()=>new EY);
    let [m, text] = useMemo(()=>{
        let e = [];
        let t = "";
        Children.forEach(children, (r)=>{
            if (typeof r === "string" || typeof r === "number") {
                t += r;
            } else {
                e.push(r);
            }
        });
        return [
            e,
            t
        ];
    }, [
        children
    ]);
    DY(()=>new Promise((resolve)=>PY({
                font,
                characters
            }, resolve)), [
        "troika-text",
        font,
        characters
    ]);
    useLayoutEffect(()=>void p.sync(()=>{
            g();
            if (onSync) {
                onSync(p);
            }
        }));
    useEffect(()=>()=>p.dispose(), [
        p
    ]);
    return <primitive object={p} ref={ref} font={font} text={text} anchorX={anchorX} anchorY={anchorY} fontSize={fontSize} sdfGlyphSize={sdfGlyphSize} {...rest}>{m}</primitive>;
});
