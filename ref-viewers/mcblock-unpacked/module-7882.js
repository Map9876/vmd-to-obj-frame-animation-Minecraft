import { e as e_1 } from "./module-70144.js";
import { g } from "./module-41845.js";
import { Ud, uU, wK } from "./module-46.js";
let o = [
    ".litematic",
    ".schem"
];
export async function parseProjectionFile(e) {
    if (e.size > Ud) {
        throw Error(`投影原文件 (${uU(e.size)}) 超过 ${wK}MB 的文件大小限制。请拆分投影后重试。`);
    }
    let t = u(e.name);
    if (!o.includes(t)) {
        throw Error(`不支持的文件格式: ${t}
支持: ${o.join(", ")}`);
    }
    return parseProjectionBuffer(await e.arrayBuffer(), e.name);
}
export async function parseProjectionBuffer(e, t) {
    let n = u(t);
    if (!o.includes(n)) {
        throw Error(`不支持的文件格式: ${n}
支持: ${o.join(", ")}`);
    }
    switch(n){
        case ".litematic":
            return e_1(e, t);
        case ".schem":
            return g(e, t);
        default:
            throw Error(`不支持的文件格式: ${n}`);
    }
}
function u(e) {
    let t = e.split(/[?#]/, 1)[0].trim().toLowerCase();
    if (!t) {
        return "";
    }
    if (t.startsWith(".") && !t.slice(1).includes(".")) {
        return t;
    }
    if (!t.includes(".") && /^[a-z0-9]+$/.test(t)) {
        return `.${t}`;
    }
    let n = t.lastIndexOf(".");
    if (n === -1) {
        return "";
    }
    return t.substring(n);
}
export function up(e) {
    let t = u(e);
    return o.includes(t);
}
