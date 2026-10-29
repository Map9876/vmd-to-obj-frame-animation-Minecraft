import { useEffect, useState } from "./module-61426.js";
import { getBlockTexture, initBlockTextureMapper, isBlockTextureMapperReady } from "./module-95293.js";
const a = require(87829);
export function C(e) {
    let t = getBlockTexture(e);
    if (t.imageFilename !== "Barrier.png") {
        return {
            name: t.chineseName,
            textureUrl: t.textureUrl
        };
    }
    let n = a.QC(e);
    if (n) {
        return {
            name: n
        };
    }
    return {};
}
export function k(e) {
    let [t, setT] = useState(isBlockTextureMapperReady);
    useEffect(()=>{
        if (!e || t) {
            return;
        }
        let l = true;
        initBlockTextureMapper().then(()=>{
            if (l) {
                setT(true);
            }
        });
        return ()=>{
            l = false;
        };
    }, [
        e,
        t
    ]);
    return t;
}
