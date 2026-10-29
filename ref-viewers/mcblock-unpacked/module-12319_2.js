let a;
let n = new Set;
function s() {
    if (typeof indexedDB === "undefined") {
        return Promise.reject(Error("当前浏览器无法使用投影临时存储，请启用网站存储权限后重试。"));
    }
    if (!a) {
        a = new Promise((resolve, reject)=>{
            let r = indexedDB.open("mcblock-studio-sessions", 1);
            r.onupgradeneeded = ()=>{
                r.result.createObjectStore("sessions", {
                    keyPath: "id"
                });
                r.result.createObjectStore("metadata", {
                    keyPath: "id"
                }).createIndex("updatedAt", "updatedAt");
            };
            r.onerror = ()=>reject(r.error);
            r.onblocked = ()=>reject(Error("投影临时存储正在更新，请关闭其他编辑器页面后重试。"));
            r.onsuccess = ()=>{
                let r_result = r.result;
                r_result.onversionchange = ()=>{
                    r_result.close();
                    a = undefined;
                };
                resolve(r_result);
            };
        }).catch((e)=>{
            a = undefined;
            throw e;
        });
    }
    return a;
}
async function o(e) {
    if (n.has(e)) {
        return null;
    }
    let t = await s();
    return new Promise((resolve, reject)=>{
        let s = t.transaction("sessions", "readonly");
        let o = s.objectStore("sessions").get(e);
        s.oncomplete = ()=>resolve(n.has(e) ? null : o.result ?? null);
        s.onabort = ()=>reject(s.error ?? Error("无法读取投影草稿"));
    });
}
async function i(e) {
    if (n.has(e)) {
        return null;
    }
    let t = await s();
    return new Promise((resolve, reject)=>{
        let n = t.transaction("metadata", "readonly");
        let s = n.objectStore("metadata").get(e);
        n.oncomplete = ()=>resolve(s.result ?? null);
        n.onabort = ()=>reject(n.error ?? Error("无法读取投影草稿摘要"));
    });
}
async function l(e) {
    if (n.has(e.id)) {
        return false;
    }
    let t = await s();
    return !n.has(e.id) && new Promise((resolve, reject)=>{
        let s = t.transaction([
            "sessions",
            "metadata"
        ], "readwrite");
        s.oncomplete = ()=>resolve(!n.has(e.id));
        s.onabort = ()=>reject(s.error ?? Error("投影草稿保存未完成"));
        try {
            s.objectStore("sessions").put(e);
            s.objectStore("metadata").put({
                id: e.id,
                name: e.snapshot.buildingName || e.snapshot.voxelModel.name,
                updatedAt: e.snapshot.updatedAt
            });
        } catch (error) {
            s.onabort = ()=>reject(error);
            try {
                s.abort();
            } catch (e) {}
            reject(error);
        }
    });
}
async function d(e) {
    n.add(e);
    let t = await s();
    await new Promise((resolve, reject)=>{
        let n = t.transaction([
            "sessions",
            "metadata"
        ], "readwrite");
        n.objectStore("sessions").delete(e);
        n.objectStore("metadata").delete(e);
        n.oncomplete = ()=>resolve();
        n.onabort = ()=>reject(n.error);
    });
}
async function c(e, t) {
    let r = await s();
    await new Promise((resolve, reject)=>{
        let s = r.transaction([
            "sessions",
            "metadata"
        ], "readwrite");
        let o = s.objectStore("metadata").index("updatedAt").openCursor(IDBKeyRange.upperBound(e, true));
        o.onsuccess = ()=>{
            let o_result = o.result;
            if (!o_result) {
                return;
            }
            let e_primaryKey = o_result.primaryKey;
            if (e_primaryKey !== t) {
                o_result.delete();
                s.objectStore("sessions").delete(e_primaryKey);
            }
            o_result.continue();
        };
        s.oncomplete = ()=>resolve();
        s.onabort = ()=>reject(s.error);
    });
}
let u = "studio_edit_session_v2";
export let JB = 43200000;
export let f3 = "studio_pending_source_v2";
let h = [
    "studio_edit_session_v1",
    "studio_voxel_model",
    "studio_original_file",
    "studio_export_replacements",
    "studio_export_material_stats",
    "studio_export_has_structural_edits",
    "studio_editor_state_remote"
];
let m = [
    "studio_source_type",
    "studio_projection_url",
    "studio_building",
    "studio_building_id",
    "studio_building_name",
    "studio_work_id"
];
function x(materialStats) {
    return materialStats.map((e)=>{
        if (e.textureUrl?.startsWith("blob:")) {
            return {
                ...e,
                textureUrl: ""
            };
        }
        return e;
    });
}
function g() {
    let e = sessionStorage.getItem(u);
    if (!e) {
        return null;
    }
    let t = JSON.parse(e);
    if (t.version !== 2 || typeof t.id !== "string") {
        throw Error("投影草稿引用无效，请重新打开原投影文件。");
    }
    return t.id;
}
function f(e, t) {
    let r = e?.voxelModel;
    return e?.version === 1 && Number.isFinite(e.updatedAt) && t - e.updatedAt <= JB && t >= e.updatedAt - 60000 && [
        "replacements",
        "materialStats",
        "undoStack",
        "redoStack"
    ].every((t)=>Array.isArray(e[t])) && [
        ...e.undoStack,
        ...e.redoStack
    ].every(y) && e.replacements.every(v) && e.materialStats.every((e)=>e && typeof e.blockId === "string" && Number.isFinite(e.count)) && Number.isInteger(e.savedHistoryDepth) && (e.savedHistoryMarker === null || Number.isFinite(e.savedHistoryMarker)) && [
        "isModified",
        "hasStructuralEdits",
        "hasUntrackedStructuralEdits"
    ].every((t)=>typeof e[t] === "boolean") && typeof r?.name === "string" && Array.isArray(r.size) && r.size.length === 3 && Array.isArray(r.blocks) && (r.format === "schem" || r.format === "litematic");
}
function v(e) {
    return !!e && typeof e.fromBlockId === "string" && typeof e.toBlockId === "string" && Array.isArray(e.positions);
}
function y(e) {
    if (!e || !Number.isFinite(e.timestamp)) {
        return false;
    }
    if (!e.operation) {
        return !!e.replacement && v(e.replacement);
    }
    let e_operation = e.operation;
    switch(e_operation.type){
        case "replace":
            return v(e_operation.replacement);
        case "replace-batch":
            return Array.isArray(e_operation.replacements) && e_operation.replacements.every(v);
        case "delete":
            return Array.isArray(e_operation.deletedBlocks);
        case "delete-entities":
            return Array.isArray(e_operation.entities);
        case "place":
            return Array.isArray(e_operation.blocks);
        case "move":
            return Array.isArray(e_operation.moves) && Array.isArray(e_operation.blocks);
        case "transform":
            return !!e_operation.before && !!e_operation.after && Array.isArray(e_operation.before.blocks) && Array.isArray(e_operation.after.blocks) && Array.isArray(e_operation.before.size) && Array.isArray(e_operation.after.size);
        case "paste":
            return !!e_operation.fragment && Array.isArray(e_operation.blocks) && Array.isArray(e_operation.entities) && Array.isArray(e_operation.origin) && Array.isArray(e_operation.entityKeys) && Array.isArray(e_operation.entityUuids);
        default:
            return false;
    }
}
export function fb(voxelModel, t = {}) {
    return {
        voxelModel,
        replacements: [],
        materialStats: [],
        undoStack: [],
        redoStack: [],
        savedHistoryDepth: 0,
        savedHistoryMarker: null,
        isModified: false,
        hasStructuralEdits: false,
        hasUntrackedStructuralEdits: false,
        ...t
    };
}
export async function rJ(e, t, a = ()=>true) {
    let r;
    let n = Array.from(crypto.getRandomValues(new Uint8Array(16)), (e)=>e.toString(16).padStart(2, "0")).join("");
    let s = {
        ...e,
        materialStats: x(e.materialStats),
        version: 1,
        updatedAt: Date.now()
    };
    try {
        r = g() ?? undefined;
    } catch (e) {}
    await c(Date.now() - JB, r).catch(()=>{});
    await l({
        id: n,
        version: 2,
        snapshot: s,
        originalFileData: t
    });
    if (!a()) {
        await d(n);
        return null;
    }
    try {
        sessionStorage.setItem(u, JSON.stringify({
            version: 2,
            id: n
        }));
    } catch (error) {
        await d(n);
        throw error;
    }
    for (let e of [
        ...h,
        ...m,
        f3
    ]){
        sessionStorage.removeItem(e);
    }
    c(Date.now() - JB, n).catch(()=>{});
    return n;
}
function k(e, t) {
    let r = sessionStorage.getItem(e);
    if (r) {
        return JSON.parse(r);
    }
    return t;
}
async function j(updatedAt, t) {
    let i = k("studio_edit_session_v1", null);
    let l = i?.voxelModel ?? k("studio_voxel_model", null);
    if (!l) {
        return null;
    }
    let d = k("studio_editor_state_remote", {});
    let c = sessionStorage.getItem("studio_export_has_structural_edits") === "true" || d.hasStructuralEdits === true;
    let u = i ?? {
        ...fb(l, {
            replacements: d.replacements ?? k("studio_export_replacements", []),
            materialStats: k("studio_export_material_stats", []),
            isModified: c,
            hasStructuralEdits: c,
            hasUntrackedStructuralEdits: c || d.hasUntrackedStructuralEdits === true,
            workId: sessionStorage.getItem("studio_work_id") ?? undefined,
            buildingId: sessionStorage.getItem("studio_building_id") ?? undefined,
            buildingName: sessionStorage.getItem("studio_building_name") ?? undefined
        }),
        version: 1,
        updatedAt
    };
    if (!f(u, updatedAt)) {
        throw Error("旧版投影草稿已损坏或失效，原临时数据仍保留，请重新导入原文件。");
    }
    let b = sessionStorage.getItem("studio_original_file");
    let p = b ? Uint8Array.from(atob(b), (e)=>e.charCodeAt(0)).buffer : null;
    let h = await rJ(u, p, t);
    if (h) {
        return {
            ...u,
            sessionId: h,
            originalFileData: p
        };
    }
    return null;
}
export async function Dn(e = Date.now(), t = ()=>true) {
    let r = g();
    if (!r) {
        return j(e, t);
    }
    let a = await o(r);
    if (t() && g() === r && a && a.version === 2 && f(a.snapshot, e)) {
        return {
            ...a.snapshot,
            sessionId: r,
            originalFileData: a.originalFileData
        };
    }
    return null;
}
export async function bX(e = ()=>true) {
    let t = await Dn(Date.now(), e);
    if (!t || !e()) {
        return null;
    }
    let { sessionId, originalFileData, ...rest } = t;
    let s = await rJ(rest, originalFileData, e);
    if (s) {
        return {
            ...t,
            sessionId: s
        };
    }
    return null;
}
let S = new Map;
async function C(e, t) {
    t.running = true;
    let r = true;
    while(t.pending){
        let a = t.pending;
        t.pending = undefined;
        try {
            let t = a.original === undefined ? await o(e) : await i(e);
            if (!t || !a.isCurrent()) {
                r = false;
                continue;
            }
            let n = a.original === undefined ? t.originalFileData : a.original;
            r = await l({
                id: e,
                version: 2,
                snapshot: {
                    ...a.snapshot,
                    materialStats: x(a.snapshot.materialStats),
                    version: 1,
                    updatedAt: Date.now()
                },
                originalFileData: n
            });
        } catch (e) {
            r = false;
        }
    }
    for (let a of (t.running = false, S.delete(e), t.waiters)){
        a(r);
    }
}
export function AI(e, t, original, isCurrent = ()=>true) {
    let n = t ?? g();
    if (!n) {
        return Promise.resolve(false);
    }
    let s = S.get(n);
    if (!s) {
        s = {
            running: false,
            waiters: []
        };
        S.set(n, s);
    }
    s.pending = {
        snapshot: e,
        original,
        isCurrent
    };
    let o = new Promise((resolve)=>s.waiters.push(resolve));
    if (!s.running) {
        C(n, s);
    }
    return o;
}
export async function of() {
    let t = g();
    if (t) {
        return i(t);
    }
    let r = k("studio_edit_session_v1", null);
    if (r) {
        return {
            name: r.buildingName || r.voxelModel?.name || "未命名",
            updatedAt: r.updatedAt
        };
    }
    return null;
}
export async function Gq(e) {
    let t = e ?? g();
    if (!e || g() === e) {
        for (let e of [
            u,
            f3,
            ...h,
            ...m
        ]){
            sessionStorage.removeItem(e);
        }
    }
    if (t) {
        await d(t);
    }
}
export function qs(url, buildingId, buildingName) {
    pU();
    sessionStorage.setItem(f3, JSON.stringify({
        url,
        buildingId,
        buildingName
    }));
}
let P = 0;
export function pU() {
    let e = ++P;
    return ()=>e === P;
}
