import { i as i_1, n as n_1 } from "../dataVersions.generated-BxN2PDux.js";
const n = 120;
const r = 80;
const i = 80;
const a = 2000;
const o = 64;
const s = 64;
const c = /^[a-z0-9_.-]+$/;
const l = Date.UTC(2009, 4, 17);
const u = 1440 * 60 * 1000;
const d = n_1 + 10000;
const f = /\u00A7[\s\S]/g;
const p = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g;
const m = /[\u0000-\u001F\u007F-\u009F]/g;
const h = /[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;
const g = /[\u200B-\u200D\uFEFF]/g;
export function _(e, t, n = false) {
    if (typeof e != `string` || e.length === 0) {
        return null;
    }
    let r = e.length > t * 4 ? e.slice(0, t * 4) : e;
    r = r.normalize(`NFC`);
    r = r.replace(f, ``);
    r = r.replace(n ? p : m, ``);
    r = r.replace(h, ``).replace(g, ``);
    r = n ? r.replace(/[^\S\n]+/g, ` `).replace(/\n{3,}/g, `

`) : r.replace(/\s+/g, ` `);
    r = r.trim();
    if (r.length === 0) {
        return null;
    }
    let i = [
        ...r
    ];
    if (i.length > t) {
        return i.slice(0, t).join(``).trim();
    }
    return r;
}
function v(e) {
    let t;
    if (typeof e == `bigint`) {
        t = Number(e);
    } else if (typeof e == `number`) {
        t = e;
    } else if (Array.isArray(e) && e.length === 2 && typeof e[0] == `number` && typeof e[1] == `number`) {
        t = Number(BigInt(e[0] | 0) << 32n | BigInt(e[1] >>> 0));
    } else {
        return null;
    }
    if (Number.isFinite(t)) {
        return t;
    }
    return null;
}
function y(e) {
    let t = v(e);
    if (t === null || t < l || t > Date.now() + u) {
        return null;
    }
    let n = new Date(t);
    if (Number.isNaN(n.getTime())) {
        return null;
    }
    return n.toISOString();
}
function b(versionRaw) {
    if (typeof versionRaw != `number` || !Number.isInteger(versionRaw) || versionRaw < 169 || versionRaw > d) {
        return null;
    }
    return {
        edition: `java`,
        raw: versionRaw,
        resolved: i_1[versionRaw] ?? null
    };
}
function x(versionRaw) {
    if (typeof versionRaw != `number` || !Number.isInteger(versionRaw) || versionRaw <= 0) {
        return null;
    }
    let t = versionRaw >>> 24 & 255;
    let n = versionRaw >>> 16 & 255;
    let r = versionRaw >>> 8 & 255;
    if (t !== 1 || n > 99 || r > 99) {
        return {
            edition: `bedrock`,
            raw: versionRaw,
            resolved: null
        };
    }
    return {
        edition: `bedrock`,
        raw: versionRaw,
        resolved: `${t}.${n}.${r}`
    };
}
function S(declaredMods) {
    if (!Array.isArray(declaredMods)) {
        return [];
    }
    let t = [];
    let n = new Set;
    for (let r of declaredMods){
        if (t.length >= o) {
            break;
        }
        if (typeof r != `string`) {
            continue;
        }
        let e = r.trim().toLowerCase();
        if (!(e.length === 0 || e.length > s || !c.test(e) || n.has(e))) {
            n.add(e);
            t.push(e);
        }
    }
    return t;
}
export function w(e) {
    return {
        name: _(e.name, n),
        author: _(e.author, r),
        description: _(e.description, a, true),
        software: _(e.software, i),
        savedAt: y(e.savedAt),
        modifiedAt: y(e.modifiedAt),
        declaredMods: S(e.declaredMods),
        version: e.edition === `bedrock` ? x(e.versionRaw) : b(e.versionRaw)
    };
}
