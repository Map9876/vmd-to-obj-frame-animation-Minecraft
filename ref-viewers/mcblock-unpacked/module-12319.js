let s;
let r = new Set;
function n() {
    if (typeof indexedDB === "undefined") {
        return Promise.reject(Error("当前浏览器无法使用投影临时存储，请启用网站存储权限后重试。"));
    }
    if (!s) {
        s = new Promise((resolve, reject)=>{
            let a = indexedDB.open("mcblock-studio-sessions", 1);
            a.onupgradeneeded = ()=>{
                a.result.createObjectStore("sessions", {
                    keyPath: "id"
                });
                a.result.createObjectStore("metadata", {
                    keyPath: "id"
                }).createIndex("updatedAt", "updatedAt");
            };
            a.onerror = ()=>reject(a.error);
            a.onblocked = ()=>reject(Error("投影临时存储正在更新，请关闭其他编辑器页面后重试。"));
            a.onsuccess = ()=>{
                let a_result = a.result;
                a_result.onversionchange = ()=>{
                    a_result.close();
                    s = undefined;
                };
                resolve(a_result);
            };
        }).catch((e)=>{
            s = undefined;
            throw e;
        });
    }
    return s;
}
async function l(e) {
    if (r.has(e)) {
        return null;
    }
    let t = await n();
    return new Promise((resolve, reject)=>{
        let n = t.transaction("sessions", "readonly");
        let l = n.objectStore("sessions").get(e);
        n.oncomplete = ()=>resolve(r.has(e) ? null : l.result ?? null);
        n.onabort = ()=>reject(n.error ?? Error("无法读取投影草稿"));
    });
}
async function i(e) {
    if (r.has(e)) {
        return null;
    }
    let t = await n();
    return new Promise((resolve, reject)=>{
        let r = t.transaction("metadata", "readonly");
        let n = r.objectStore("metadata").get(e);
        r.oncomplete = ()=>resolve(n.result ?? null);
        r.onabort = ()=>reject(r.error ?? Error("无法读取投影草稿摘要"));
    });
}
async function o(e) {
    if (r.has(e.id)) {
        return false;
    }
    let t = await n();
    return !r.has(e.id) && new Promise((resolve, reject)=>{
        let n = t.transaction([
            "sessions",
            "metadata"
        ], "readwrite");
        n.oncomplete = ()=>resolve(!r.has(e.id));
        n.onabort = ()=>reject(n.error ?? Error("投影草稿保存未完成"));
        try {
            n.objectStore("sessions").put(e);
            n.objectStore("metadata").put({
                id: e.id,
                name: e.snapshot.buildingName || e.snapshot.voxelModel.name,
                updatedAt: e.snapshot.updatedAt
            });
        } catch (error) {
            n.onabort = ()=>reject(error);
            try {
                n.abort();
            } catch (e) {}
            reject(error);
        }
    });
}
async function c(e) {
    r.add(e);
    let t = await n();
    await new Promise((resolve, reject)=>{
        let r = t.transaction([
            "sessions",
            "metadata"
        ], "readwrite");
        r.objectStore("sessions").delete(e);
        r.objectStore("metadata").delete(e);
        r.oncomplete = ()=>resolve();
        r.onabort = ()=>reject(r.error);
    });
}
async function d(e, t) {
    let a = await n();
    await new Promise((resolve, reject)=>{
        let n = a.transaction([
            "sessions",
            "metadata"
        ], "readwrite");
        let l = n.objectStore("metadata").index("updatedAt").openCursor(IDBKeyRange.upperBound(e, true));
        l.onsuccess = ()=>{
            let l_result = l.result;
            if (!l_result) {
                return;
            }
            let e_primaryKey = l_result.primaryKey;
            if (e_primaryKey !== t) {
                l_result.delete();
                n.objectStore("sessions").delete(e_primaryKey);
            }
            l_result.continue();
        };
        n.oncomplete = ()=>resolve();
        n.onabort = ()=>reject(n.error);
    });
}
let u = "studio_edit_session_v2";
export let JB = 43200000;
export let f3 = "studio_pending_source_v2";
let p = [
    "studio_edit_session_v1",
    "studio_voxel_model",
    "studio_original_file",
    "studio_export_replacements",
    "studio_export_material_stats",
    "studio_export_has_structural_edits",
    "studio_editor_state_remote"
];
let b = [
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
function v() {
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
function g(e, t) {
    let a = e?.voxelModel;
    return e?.version === 1 && Number.isFinite(e.updatedAt) && t - e.updatedAt <= JB && t >= e.updatedAt - 60000 && [
        "replacements",
        "materialStats",
        "undoStack",
        "redoStack"
    ].every((t)=>Array.isArray(e[t])) && [
        ...e.undoStack,
        ...e.redoStack
    ].every(j) && e.replacements.every(f) && e.materialStats.every((e)=>e && typeof e.blockId === "string" && Number.isFinite(e.count)) && Number.isInteger(e.savedHistoryDepth) && (e.savedHistoryMarker === null || Number.isFinite(e.savedHistoryMarker)) && [
        "isModified",
        "hasStructuralEdits",
        "hasUntrackedStructuralEdits"
    ].every((t)=>typeof e[t] === "boolean") && typeof a?.name === "string" && Array.isArray(a.size) && a.size.length === 3 && Array.isArray(a.blocks) && (a.format === "schem" || a.format === "litematic");
}
function f(e) {
    return !!e && typeof e.fromBlockId === "string" && typeof e.toBlockId === "string" && Array.isArray(e.positions);
}
function j(e) {
    if (!e || !Number.isFinite(e.timestamp)) {
        return false;
    }
    if (!e.operation) {
        return !!e.replacement && f(e.replacement);
    }
    let e_operation = e.operation;
    switch(e_operation.type){
        case "replace":
            return f(e_operation.replacement);
        case "replace-batch":
            return Array.isArray(e_operation.replacements) && e_operation.replacements.every(f);
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
export async function rJ(e, t, s = ()=>true) {
    let a;
    let r = Array.from(crypto.getRandomValues(new Uint8Array(16)), (e)=>e.toString(16).padStart(2, "0")).join("");
    let n = {
        ...e,
        materialStats: x(e.materialStats),
        version: 1,
        updatedAt: Date.now()
    };
    try {
        a = v() ?? undefined;
    } catch (e) {}
    await d(Date.now() - JB, a).catch(()=>{});
    await o({
        id: r,
        version: 2,
        snapshot: n,
        originalFileData: t
    });
    if (!s()) {
        await c(r);
        return null;
    }
    try {
        sessionStorage.setItem(u, JSON.stringify({
            version: 2,
            id: r
        }));
    } catch (error) {
        await c(r);
        throw error;
    }
    for (let e of [
        ...p,
        ...b,
        f3
    ]){
        sessionStorage.removeItem(e);
    }
    d(Date.now() - JB, r).catch(()=>{});
    return r;
}
function N(e, t) {
    let a = sessionStorage.getItem(e);
    if (a) {
        return JSON.parse(a);
    }
    return t;
}
async function w(updatedAt, t) {
    let i = N("studio_edit_session_v1", null);
    let o = i?.voxelModel ?? N("studio_voxel_model", null);
    if (!o) {
        return null;
    }
    let c = N("studio_editor_state_remote", {});
    let d = sessionStorage.getItem("studio_export_has_structural_edits") === "true" || c.hasStructuralEdits === true;
    let u = i ?? {
        ...fb(o, {
            replacements: c.replacements ?? N("studio_export_replacements", []),
            materialStats: N("studio_export_material_stats", []),
            isModified: d,
            hasStructuralEdits: d,
            hasUntrackedStructuralEdits: d || c.hasUntrackedStructuralEdits === true,
            workId: sessionStorage.getItem("studio_work_id") ?? undefined,
            buildingId: sessionStorage.getItem("studio_building_id") ?? undefined,
            buildingName: sessionStorage.getItem("studio_building_name") ?? undefined
        }),
        version: 1,
        updatedAt
    };
    if (!g(u, updatedAt)) {
        throw Error("旧版投影草稿已损坏或失效，原临时数据仍保留，请重新导入原文件。");
    }
    let h = sessionStorage.getItem("studio_original_file");
    let m = h ? Uint8Array.from(atob(h), (e)=>e.charCodeAt(0)).buffer : null;
    let p = await rJ(u, m, t);
    if (p) {
        return {
            ...u,
            sessionId: p,
            originalFileData: m
        };
    }
    return null;
}
export async function Dn(e = Date.now(), t = ()=>true) {
    let a = v();
    if (!a) {
        return w(e, t);
    }
    let s = await l(a);
    if (t() && v() === a && s && s.version === 2 && g(s.snapshot, e)) {
        return {
            ...s.snapshot,
            sessionId: a,
            originalFileData: s.originalFileData
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
    let n = await rJ(rest, originalFileData, e);
    if (n) {
        return {
            ...t,
            sessionId: n
        };
    }
    return null;
}
let C = new Map;
async function M(e, t) {
    t.running = true;
    let a = true;
    while(t.pending){
        let s = t.pending;
        t.pending = undefined;
        try {
            let t = s.original === undefined ? await l(e) : await i(e);
            if (!t || !s.isCurrent()) {
                a = false;
                continue;
            }
            let r = s.original === undefined ? t.originalFileData : s.original;
            a = await o({
                id: e,
                version: 2,
                snapshot: {
                    ...s.snapshot,
                    materialStats: x(s.snapshot.materialStats),
                    version: 1,
                    updatedAt: Date.now()
                },
                originalFileData: r
            });
        } catch (e) {
            a = false;
        }
    }
    for (let s of (t.running = false, C.delete(e), t.waiters)){
        s(a);
    }
}
export function AI(e, t, original, isCurrent = ()=>true) {
    let r = t ?? v();
    if (!r) {
        return Promise.resolve(false);
    }
    let n = C.get(r);
    if (!n) {
        n = {
            running: false,
            waiters: []
        };
        C.set(r, n);
    }
    n.pending = {
        snapshot: e,
        original,
        isCurrent
    };
    let l = new Promise((resolve)=>n.waiters.push(resolve));
    if (!n.running) {
        M(r, n);
    }
    return l;
}
export async function of() {
    let t = v();
    if (t) {
        return i(t);
    }
    let a = N("studio_edit_session_v1", null);
    if (a) {
        return {
            name: a.buildingName || a.voxelModel?.name || "未命名",
            updatedAt: a.updatedAt
        };
    }
    return null;
}
export async function Gq(e) {
    let t = e ?? v();
    if (!e || v() === e) {
        for (let e of [
            u,
            f3,
            ...p,
            ...b
        ]){
            sessionStorage.removeItem(e);
        }
    }
    if (t) {
        await c(t);
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
let D = 0;
export function pU() {
    let e = ++D;
    return ()=>e === D;
}
