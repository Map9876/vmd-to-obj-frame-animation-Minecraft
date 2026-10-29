import "./module-86897.js";
import { useEffect, useMemo, useState, useSyncExternalStore } from "./module-61426.js";
import { C2 } from "./module-12734.js";
import { Yo, dL, f3, fJ } from "./module-64775.js";
const a = require(49745);
const i = require(97003);
let c = ()=>0;
export function v({ model }) {
    let n = useMemo(()=>((model_1)=>{
            let u = new Set;
            let p = (e)=>{
                if (e?.textureHash && C2.test(e.textureHash)) {
                    u.add(e.textureHash);
                }
            };
            for (let n of model_1.blocks){
                if (a.CZ(n.blockId)) {
                    p(n.renderData?.skull);
                }
            }
            for (let t of model_1.entities ?? []){
                for (let e of Object.values(t.armorStand?.equipmentSkulls ?? {})){
                    p(e);
                }
                p(t.itemFrame?.item?.skull);
                p(t.itemDisplay?.item?.skull);
            }
            return [
                ...u
            ];
        })(model), [
        model
    ]);
    useSyncExternalStore(f3, dL, c);
    let { failedHashes, retryAt, retrying } = Yo(n);
    let [f, setF] = useState(()=>Date.now());
    let m = Math.max(0, Math.ceil((retryAt - f) / 1000));
    useEffect(()=>{
        setF(Date.now());
        if (retryAt <= Date.now()) {
            return;
        }
        let e = setInterval(()=>{
            setF(Date.now());
            if (Date.now() >= retryAt) {
                clearInterval(e);
            }
        }, 250);
        return ()=>clearInterval(e);
    }, [
        retryAt
    ]);
    if (failedHashes.length || retrying) {
        return <div data-testid="skull-skin-notice" className="absolute left-20 right-16 top-20 z-20 max-w-sm border-2 border-border-hard bg-bg-card px-3 py-2 text-xs text-text-primary shadow-block pointer-events-auto"><p role="status" aria-live="polite" className="mb-2 leading-relaxed">{retrying ? "正在重新加载头颅皮肤…" : `${failedHashes.length} 种头颅皮肤未加载，暂用默认外观。`}</p><i.$ size="sm" variant="secondary" disabled={retrying > 0 || m > 0} onClick={()=>fJ(failedHashes)}>{retrying ? "正在重试…" : m > 0 ? `重新加载（${m}秒）` : "重新加载皮肤"}</i.$></div>;
    }
    return null;
}
