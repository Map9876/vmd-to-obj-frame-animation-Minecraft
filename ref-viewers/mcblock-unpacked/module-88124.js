import { useEffect, useState } from "./module-61426.js";
import { Mz, nt } from "./module-64775.js";
const t = require(49745);
export function B(e) {
    let o = e?.[t.LN];
    let i = e?.[t.iy];
    let s = o ? `${o}|${i ?? ""}` : "";
    let [a, setA] = useState(null);
    useEffect(()=>{
        if (!o) {
            return;
        }
        let e = Mz(i);
        let r = true;
        let t = nt(o, (o)=>{
            if (r) {
                setA({
                    key: s,
                    texture: o.state === "ready" && o.texture ? o.texture : e.texture
                });
            }
        });
        setA({
            key: s,
            texture: t.state === "ready" && t.texture ? t.texture : e.texture
        });
        return ()=>{
            r = false;
            t.release();
            e.release();
        };
    }, [
        o,
        i,
        s
    ]);
    if (o) {
        if (a?.key === s) {
            return a.texture;
        }
        return null;
    }
}
