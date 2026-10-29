import "./module-86897.js";
import { C, k } from "./module-2053.js";
const r = require(64991);
export function e(e, t) {
    if (t && t.length > 0) {
        return `本${e}材料`;
    }
    return `本${e}要放的方块`;
}
function SComponent(e) {
    return <div key={e.blockId}><span className="bdi-level-texture">{e.textureUrl ? <img src={e.textureUrl} alt=""/> : <r.A size={16}/>}</span><span className="bdi-level-name">{e.name}</span><strong>×{e.count}</strong></div>;
}
function c(e) {
    let n = C(e.itemId);
    return {
        blockId: e.itemId,
        name: n.name ?? e.itemId.replace("minecraft:", ""),
        count: e.count,
        textureUrl: n.textureUrl
    };
}
export function p({ blocks, entityMaterials, empty }) {
    let i = !!entityMaterials && entityMaterials.length > 0;
    k(i);
    if (!entityMaterials || !i) {
        return <>{blocks.length > 0 ? blocks.map(SComponent) : empty}</>;
    }
    let o = entityMaterials.filter((e)=>e.role === "entity").map(c);
    let d = entityMaterials.filter((e)=>e.role === "carried").map(c);
    return <>{blocks.length > 0 && <p className="bdi-level-group">方块</p>}{blocks.map(SComponent)}{o.length > 0 && <p className="bdi-level-group">装饰实体</p>}{o.map(SComponent)}{d.length > 0 && <p className="bdi-level-group">要放进去的东西</p>}{d.map(SComponent)}</>;
}
