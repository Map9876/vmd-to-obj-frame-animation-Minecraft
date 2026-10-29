import { a } from "../jsx-runtime-Db0DjQYK.js";
import { d, f, g, h as h_1, i, m, p, r, u } from "../schemas-Y3Thg5L-.js";
import { g as g_1, h } from "../dist-C66QuM2X.js";
import { ot } from "../index-DmN1rqCo.js";
import { a as a_2, i as i_2, l as l_1, n as n_1, r as r_2 } from "../blockStateParser-3kR-Ucao.js";
import { t } from "../dataVersions.generated-BxN2PDux.js";
import { r as r_3 } from "../sourceMetadata-Docz5Msb.js";
import { t as t_2 } from "../nbt-8n4RmvS_.js";
import { t as t_3 } from "../java-Div33lLG.js";
export const N = `26.3`;
export const Ae = (()=>{
    let e = t[N];
    if (e === undefined) {
        throw Error(`EXPORT_RELEASE "${N}" is not in the generated DataVersion table. Regenerate it (node scripts/generate-data-versions.mjs) or correct the release.`);
    }
    return e;
})();
export const je = 5005;
export const Me = `Shulkr`;
const Ne = d({
    x: u(),
    y: u(),
    z: u()
});
const Pe = d({
    Position: Ne,
    Size: Ne,
    BlockStatePalette: r(d({
        Name: p(),
        Properties: f(p(), p()).optional()
    })),
    BlockStates: h_1([
        r(m([
            u(),
            u()
        ])),
        r(i())
    ]),
    TileEntities: r(f(p(), g())).optional(),
    BlockEntities: r(f(p(), g())).optional()
});
const Fe = d({
    Regions: f(p(), Pe)
});
export const Ie = a({
    parseLitematicFile: ()=>Be
});
function Le(rawState, x, y, z, rawBlockEntity) {
    let { namespace, name, id } = g_1(rawState.Name);
    let c = {};
    if (rawState.Properties) {
        for (let [t, n] of Object.entries(rawState.Properties)){
            c[t] = r_2(n);
        }
    }
    let l = Object.keys(c).length > 0;
    let u = {
        namespace,
        name,
        id,
        pos: {
            x,
            y,
            z
        },
        stateKey: h(id, l ? c : undefined),
        debug: {
            rawState,
            ...rawBlockEntity ? {
                rawBlockEntity
            } : {}
        }
    };
    if (l) {
        u.properties = c;
    }
    if (rawBlockEntity) {
        let { blockEntity, residual } = t_3(rawBlockEntity, name);
        if (blockEntity) {
            u.blockEntity = blockEntity;
        }
        if (residual && u.debug) {
            u.debug.residualBlockEntity = residual;
        }
    }
    return u;
}
function Re(e, t, n) {
    let r = ze(e);
    let i = Array(n);
    let a = (1n << BigInt(t)) - 1n;
    for(let e = 0; e < n; e++){
        let n = e * t;
        let o = Math.floor(n / 64);
        let s = n % 64;
        if (s + t <= 64) {
            i[e] = Number(r[o] >> BigInt(s) & a);
        } else {
            let n = 64 - s;
            let a = (1n << BigInt(n)) - 1n;
            let c = r[o] >> BigInt(s) & a;
            let l = t - n;
            let u = (1n << BigInt(l)) - 1n;
            let d = r[o + 1] & u;
            i[e] = Number(c | d << BigInt(n));
        }
    }
    return i;
}
function ze(e) {
    if (e.length === 0) {
        return [];
    }
    if (typeof e[0] == `bigint`) {
        return e;
    }
    return e.map(([e, t])=>BigInt(e >>> 0) << 32n | BigInt(t >>> 0));
}
export async function Be(e, mcVersion = `1.21.7`) {
    let n = await t_2(e, `big`);
    let { Regions } = Fe.parse(n);
    let sourceMeta = r_3(n);
    let a = new Map;
    let o = 0;
    for (let e of Object.values(Regions)){
        let t = e.BlockStatePalette;
        if (t.length === 0) {
            continue;
        }
        let n = e.BlockStates;
        if (n.length === 0) {
            continue;
        }
        let r = Math.abs(e.Size.x);
        let i = Math.abs(e.Size.y);
        let s = Math.abs(e.Size.z);
        ot(r, i, s);
        let c = r * i * s;
        o += c;
        ot(o, 1, 1);
        let l = Math.max(2, Math.ceil(Math.log2(t.length)));
        let u = Math.ceil(c * l / 64);
        if (n.length < u) {
            throw Error(`This .litematic is corrupt: region declares ${c.toLocaleString(`en-US`)} blocks but carries data for fewer.`);
        }
        let d = Re(n, l, c);
        let f = e.Position;
        let p = e.Size;
        let h = p.x < 0 ? f.x + p.x + 1 : f.x;
        let g = p.y < 0 ? f.y + p.y + 1 : f.y;
        let _ = p.z < 0 ? f.z + p.z + 1 : f.z;
        let v = n_1(e.BlockEntities ?? e.TileEntities, {
            x: h,
            y: g,
            z: _
        });
        for(let e = 0; e < i; e++){
            for(let n = 0; n < s; n++){
                for(let i = 0; i < r; i++){
                    let o = t[d[(e * s + n) * r + i]];
                    if (!o || a_2(g_1(o.Name).name)) {
                        continue;
                    }
                    let c = h + i;
                    let l = g + e;
                    let u = _ + n;
                    let f = l_1(c, l, u);
                    a.set(f, Le(o, c, l, u, v.get(f)));
                }
            }
        }
    }
    if (a.size > 0) {
        let bounds = i_2(a.values());
        let { x, y, z } = bounds.min;
        if (x !== 0 || y !== 0 || z !== 0) {
            let e = new Map;
            for (let t of a.values()){
                let i = t.pos.x - x;
                let a = t.pos.y - y;
                let s = t.pos.z - z;
                e.set(l_1(i, a, s), {
                    ...t,
                    pos: {
                        x: i,
                        y: a,
                        z: s
                    }
                });
            }
            return {
                blocks: e,
                mcVersion,
                sourceFormat: `litematic`,
                bounds: i_2(e.values()),
                sourceMeta
            };
        }
        return {
            blocks: a,
            mcVersion,
            sourceFormat: `litematic`,
            bounds,
            sourceMeta
        };
    }
    return {
        blocks: a,
        mcVersion,
        sourceFormat: `litematic`,
        bounds: i_2(a.values()),
        sourceMeta
    };
}
