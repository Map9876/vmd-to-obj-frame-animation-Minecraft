export const Qa = {
    south: 0,
    west: 90,
    north: 180,
    east: 270,
    up: 0,
    down: 0
};
const ao = [
    `none`,
    `smouldering`,
    `fading`,
    `kindled`,
    `seething`
];
function oo(e) {
    let t = e && typeof e == `object` ? e : null;
    let n = t ? t.HeatLevel ?? t.heatLevel ?? t.blaze : undefined;
    if (typeof n == `string`) {
        return n.toLowerCase();
    }
    if (typeof n == `number` && ao[n]) {
        return ao[n];
    }
    return `fading`;
}
export function so(e) {
    let t = oo(e?.blockEntity);
    if (t === `none`) {
        return [];
    }
    let n = t === `seething`;
    let r = t === `kindled`;
    let i = t === `fading` || r || n;
    let a = [
        {
            model: n ? `create:block/blaze_burner/blaze/super` : i ? `create:block/blaze_burner/blaze/idle` : `create:block/blaze_burner/blaze/inert`
        }
    ];
    if (i) {
        a.push({
            model: n ? `create:block/blaze_burner/superheated_rods_small` : `create:block/blaze_burner/rods_small`
        }, {
            model: n ? `create:block/blaze_burner/superheated_rods_large` : `create:block/blaze_burner/rods_large`
        });
    }
    if (r || n) {
        a.push({
            model: `create:block/blaze_burner/flame`
        });
    }
    return a;
}
