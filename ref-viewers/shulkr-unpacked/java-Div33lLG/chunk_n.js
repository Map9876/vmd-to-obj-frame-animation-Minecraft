export function n(e) {
    return typeof e == `object` && !!e && !Array.isArray(e);
}
function r(e) {
    if (typeof e == `number` && Number.isFinite(e)) {
        return e;
    }
}
function i(e) {
    if (typeof e == `bigint`) {
        return e;
    }
    if (typeof e == `number` && Number.isFinite(e)) {
        return BigInt(e);
    }
    if (Array.isArray(e) && e.length === 2 && typeof e[0] == `number` && typeof e[1] == `number`) {
        return BigInt(e[0] >>> 0) << 32n | BigInt(e[1] >>> 0);
    }
}
function a(e) {
    if (typeof e == `boolean`) {
        return e;
    }
    if (typeof e == `number`) {
        return e !== 0;
    }
}
function o(e) {
    if (e == null) {
        return ``;
    }
    if (typeof e == `string`) {
        let t = e.trim();
        if (t === ``) {
            return ``;
        }
        if (t.startsWith(`"`) || t.startsWith(`{`) || t.startsWith(`[`)) {
            try {
                return o(JSON.parse(t));
            } catch  {
                return e;
            }
        }
        return e;
    }
    if (Array.isArray(e)) {
        return e.map(o).join(``);
    }
    if (typeof e == `object`) {
        let t = e;
        let n = typeof t.text == `string` ? t.text : ``;
        if (Array.isArray(t.extra)) {
            n += t.extra.map(o).join(``);
        }
        return n;
    }
    return String(e);
}
export function s(e) {
    let t = e.CustomName ?? e.customName ?? e.custom_name;
    if (!(t == null || t === ``)) {
        return o(t) || undefined;
    }
}
function c(e) {
    let t = n(e.components) ? e.components : null;
    let r = n(e.tag) ? e.tag : null;
    let i = r && n(r.display) ? r.display : null;
    let a = {};
    let s = t?.[`minecraft:custom_name`] ?? t?.custom_name ?? i?.Name;
    if (s !== undefined) {
        let e = o(s);
        if (e) {
            a.customName = e;
        }
    }
    let c = t?.[`minecraft:lore`] ?? t?.lore ?? i?.Lore;
    if (Array.isArray(c)) {
        let e = c.map(o);
        if (e.length > 0) {
            a.lore = e;
        }
    }
    let l = t?.[`minecraft:damage`] ?? t?.damage ?? r?.Damage;
    if (typeof l == `number` && Number.isFinite(l) && l !== 0) {
        a.damage = l;
    }
    let u = t?.[`minecraft:enchantments`] ?? t?.enchantments;
    let d = n(u) ? n(u.levels) ? u.levels : u : undefined;
    if (d) {
        let e = [];
        for (let [id, n] of Object.entries(d)){
            if (typeof n == `number`) {
                e.push({
                    id,
                    level: n
                });
            }
        }
        if (e.length > 0) {
            a.enchantments = e;
        }
    } else if (Array.isArray(r?.Enchantments)) {
        let e = [];
        for (let t of r.Enchantments){
            if (n(t) && typeof t.id == `string` && typeof t.lvl == `number`) {
                e.push({
                    id: t.id,
                    level: t.lvl
                });
            }
        }
        if (e.length > 0) {
            a.enchantments = e;
        }
    }
    if (Object.keys(a).length > 0) {
        return a;
    }
}
export function l(e) {
    let t = e.Items ?? e.items;
    if (!Array.isArray(t)) {
        return;
    }
    let i = [];
    for (let e of t){
        if (!n(e)) {
            continue;
        }
        let id = typeof e.id == `string` ? e.id : undefined;
        if (!id) {
            continue;
        }
        let a = {
            slot: r(e.Slot ?? e.slot) ?? 0,
            id,
            count: r(e.count ?? e.Count) ?? 1
        };
        let o = c(e);
        if (o) {
            a.components = o;
        }
        i.push(a);
    }
    if (i.length > 0) {
        return i;
    }
}
function u(e) {
    if (!n(e)) {
        return;
    }
    let t = Array.isArray(e.messages) ? e.messages : undefined;
    if (t) {
        return {
            lines: [
                o(t[0] ?? ``),
                o(t[1] ?? ``),
                o(t[2] ?? ``),
                o(t[3] ?? ``)
            ],
            color: typeof e.color == `string` ? e.color : `black`,
            glowing: a(e.has_glowing_text ?? e.hasGlowingText) ?? false
        };
    }
}
function d(e) {
    let { Text1, Text2, Text3, Text4 } = e;
    if (!(Text1 === undefined && Text2 === undefined && Text3 === undefined && Text4 === undefined)) {
        return {
            lines: [
                o(Text1 ?? ``),
                o(Text2 ?? ``),
                o(Text3 ?? ``),
                o(Text4 ?? ``)
            ],
            color: typeof e.Color == `string` ? e.Color : `black`,
            glowing: a(e.GlowingText) ?? false
        };
    }
}
export function f(e) {
    let t = u(e.front_text ?? e.frontText);
    let n = u(e.back_text ?? e.backText);
    let r = t ? undefined : d(e);
    if (!t && !r) {
        return;
    }
    let i = {
        front: t ?? r
    };
    if (n) {
        i.back = n;
    }
    let o = a(e.is_waxed ?? e.isWaxed);
    if (o !== undefined) {
        i.waxed = o;
    }
    return i;
}
export function p(e) {
    let table = e.LootTable ?? e.loot_table ?? e.lootTable;
    if (typeof table != `string` || table === ``) {
        return;
    }
    let seed = i(e.LootTableSeed ?? e.loot_table_seed ?? e.lootTableSeed);
    if (seed === undefined) {
        return {
            table
        };
    }
    return {
        table,
        seed
    };
}
