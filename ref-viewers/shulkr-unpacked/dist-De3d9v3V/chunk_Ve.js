import { a } from "../jsx-runtime-Db0DjQYK.js";
import { d, f, g, h as h_1, p, r, u } from "../schemas-Y3Thg5L-.js";
import { g as g_1, h } from "../dist-C66QuM2X.js";
import { ot } from "../index-DmN1rqCo.js";
import { a as a_1, i as i_1, l, n as n_1, s } from "../blockStateParser-3kR-Ucao.js";
import { s as s_2 } from "../sourceMetadata-Docz5Msb.js";
import { t as t_1 } from "../nbt-8n4RmvS_.js";
import { t as t_2 } from "../java-Div33lLG.js";
const Palette = f(p(), u());
const He = d({
    Version: u().optional(),
    DataVersion: u().optional(),
    Width: u(),
    Height: u(),
    Length: u(),
    Offset: r(u()).optional()
});
const Ue = h_1([
    He.extend({
        Palette,
        PaletteMax: u().optional(),
        BlockData: r(u()),
        BlockEntities: r(f(p(), g())).optional(),
        TileEntities: r(f(p(), g())).optional()
    }),
    He.extend({
        Blocks: d({
            Palette,
            Data: r(u()),
            BlockEntities: r(f(p(), g())).optional()
        }).optional(),
        BlockEntities: r(f(p(), g())).optional()
    })
]);
export const We = a({
    parseSchemFile: ()=>Ke
});
function Ge(e, t) {
    let n = Array(t);
    let r = 0;
    for(let i = 0; i < t; i++){
        let t = 0;
        let a = 0;
        while(true){
            let n = e[r++];
            t |= (n & 127) << a;
            if (!(n & 128)) {
                break;
            }
            a += 7;
        }
        n[i] = t;
    }
    return n;
}
export async function Ke(e, mcVersion = `1.21.7`) {
    let n = await t_1(e, `big`);
    let r = n.Schematic ?? n;
    let i = Ue.parse(r);
    let sourceMeta = s_2(r);
    let o = i.Version ?? 2;
    let { Width, Height, Length } = i;
    ot(Width, Height, Length);
    let u = Width * Height * Length;
    let d;
    let f;
    let p;
    if (o >= 3 && `Blocks` in i && i.Blocks) {
        d = i.Blocks.Palette;
        f = i.Blocks.Data;
        p = i.Blocks.BlockEntities ?? i.BlockEntities;
    } else if (`Palette` in i && `BlockData` in i) {
        d = i.Palette;
        f = i.BlockData;
        p = i.BlockEntities ?? i.TileEntities;
    } else {
        throw Error(`Invalid .schem file: missing Palette or BlockData`);
    }
    let g = n_1(p);
    let _ = new Map;
    for (let [e, t] of Object.entries(d)){
        _.set(t, e);
    }
    let v = Ge(f, u);
    let blocks = new Map;
    for(let y_1 = 0; y_1 < Height; y_1++){
        for(let z = 0; z < Length; z++){
            for(let x_1 = 0; x_1 < Width; x_1++){
                let r = v[(y_1 * Length + z) * Width + x_1];
                let rawState = _.get(r);
                if (!rawState) {
                    continue;
                }
                let { name, properties } = s(rawState);
                let { namespace, name: name_1, id } = g_1(name);
                if (a_1(name_1)) {
                    continue;
                }
                let p = Object.keys(properties).length > 0;
                let rawBlockEntity = g.get(l(x_1, y_1, z));
                let x = {
                    namespace,
                    name: name_1,
                    id,
                    pos: {
                        x: x_1,
                        y: y_1,
                        z
                    },
                    stateKey: h(id, p ? properties : undefined),
                    debug: {
                        rawState,
                        ...rawBlockEntity ? {
                            rawBlockEntity
                        } : {}
                    }
                };
                if (p) {
                    x.properties = properties;
                }
                if (rawBlockEntity) {
                    let { blockEntity, residual } = t_2(o >= 3 && typeof rawBlockEntity == `object` && rawBlockEntity && `Data` in rawBlockEntity && typeof rawBlockEntity.Data == `object` ? rawBlockEntity.Data : rawBlockEntity, name_1);
                    if (blockEntity) {
                        x.blockEntity = blockEntity;
                    }
                    if (residual && x.debug) {
                        x.debug.residualBlockEntity = residual;
                    }
                }
                blocks.set(l(x_1, y_1, z), x);
            }
        }
    }
    return {
        blocks,
        mcVersion,
        sourceFormat: `schem`,
        bounds: i_1(blocks.values()),
        sourceMeta
    };
}
