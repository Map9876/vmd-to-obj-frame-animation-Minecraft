import { d, f, g, h, m, p, r, u } from "../schemas-Y3Thg5L-.js";
const Ze = h([
    p(),
    u()
]);
const Qe = d({
    name: p(),
    states: f(p(), Ze).optional(),
    version: u().optional()
});
const $e = d({
    block_entity_data: f(p(), g()).optional()
});
const et = d({
    block_palette: r(Qe),
    block_position_data: f(p(), $e).optional()
});
export const tt = d({
    format_version: u().optional(),
    size: m([
        u(),
        u(),
        u()
    ]),
    structure: d({
        block_indices: m([
            r(u()),
            r(u())
        ]),
        palette: d({
            default: et
        })
    })
});
const nt = new Set([
    `water`,
    `flowing_water`,
    `lava`,
    `flowing_lava`
]);
export function rt(e) {
    return nt.has(e);
}
