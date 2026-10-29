import { S as S_1 } from "./module-24708.js";
import { S as S_2 } from "./module-39051.js";
let o = "mcblock_renderer_config";
let a = Object.freeze({
    config: S_1,
    error: null,
    loading: false,
    schemaVersion: 1,
    revision: 0,
    publishedAt: null,
    canRestore: false
});
function s(error, r) {
    return `${r}：${error instanceof Error ? error.message : String(error)}`;
}
export let J0 = ((c = {})=>{
    let d = c.browser ?? window;
    let f = c.fetch ?? (typeof fetch === "function" ? (e)=>fetch(e) : undefined);
    let m = c.now ?? Date.now;
    let h = c.focusThrottleMs ?? 30000;
    let p = new Set;
    let u = a;
    let g = false;
    let b = false;
    let y = null;
    let v = -Infinity;
    let S = (e)=>{
        u = Object.freeze(e);
        p.forEach((e)=>e());
    };
    let x = (e, r, i)=>{
        try {
            let s = ((e)=>{
                if (!e || typeof e !== "object" || e.success !== true) {
                    throw Error("接口未返回成功结果");
                }
                let revision = e.revision === undefined ? 0 : e.revision;
                if (!Number.isSafeInteger(revision) || revision < 0) {
                    throw Error("revision 无效");
                }
                let schemaVersion = e.schemaVersion === undefined ? 1 : e.schemaVersion;
                if (schemaVersion !== 1) {
                    throw Error(`不支持 schemaVersion=${schemaVersion}`);
                }
                return {
                    success: true,
                    data: e.data === null ? null : S_2(e.data),
                    schemaVersion,
                    revision,
                    publishedAt: typeof e.publishedAt === "string" ? e.publishedAt : null,
                    canRestore: e.canRestore === true
                };
            })(e);
            if (i !== undefined && u.revision > i && s.revision < u.revision || s.revision < u.revision) {
                return;
            }
            let config = s.data ?? S_1;
            S({
                config,
                error: null,
                loading: false,
                schemaVersion: 1,
                revision: s.revision,
                publishedAt: s.publishedAt,
                canRestore: s.canRestore
            });
            if (r) {
                ((e, data)=>{
                    if (d) {
                        try {
                            let i = {
                                data,
                                ts: m(),
                                schemaVersion: 1,
                                revision: e.revision,
                                publishedAt: e.publishedAt,
                                canRestore: e.canRestore
                            };
                            d.localStorage.setItem(o, JSON.stringify(i));
                        } catch (e) {}
                    }
                })(s, config);
            }
        } catch (error) {
            S({
                ...u,
                error: s(error, "渲染配置无效"),
                loading: false
            });
        }
    };
    let w = (e)=>{
        if (e) {
            try {
                let r = ((e)=>{
                    let r = JSON.parse(e);
                    if (!r || typeof r !== "object" || Array.isArray(r)) {
                        throw Error("缓存格式无效");
                    }
                    if (r.schemaVersion !== undefined && r.schemaVersion !== 1) {
                        throw Error(`不支持缓存 schemaVersion=${String(r.schemaVersion)}`);
                    }
                    return {
                        data: S_2(r.data),
                        ts: typeof r.ts === "number" && Number.isFinite(r.ts) ? r.ts : 0,
                        schemaVersion: 1,
                        revision: typeof r.revision === "number" && Number.isSafeInteger(r.revision) && r.revision >= 0 ? r.revision : 0,
                        publishedAt: typeof r.publishedAt === "string" ? r.publishedAt : null,
                        canRestore: r.canRestore === true
                    };
                })(e);
                if (r.revision < u.revision) {
                    return;
                }
                S({
                    config: r.data,
                    error: null,
                    loading: u.loading,
                    schemaVersion: 1,
                    revision: r.revision,
                    publishedAt: r.publishedAt,
                    canRestore: r.canRestore
                });
                if (d != null) {
                    d.localStorage.setItem(o, JSON.stringify(r));
                }
            } catch (error) {
                S({
                    ...u,
                    error: s(error, "渲染配置缓存损坏")
                });
            }
        }
    };
    let revalidate = ()=>{
        if (y) {
            return y;
        }
        if (!f) {
            return Promise.resolve();
        }
        let u_revision = u.revision;
        v = m();
        S({
            ...u,
            loading: true
        });
        return y = (async ()=>{
            try {
                let r = await f("/api/settings/renderer-config");
                if (!r.ok) {
                    throw Error("请求失败");
                }
                x(await r.json(), true, u_revision);
            } catch (error) {
                S({
                    ...u,
                    error: s(error, "渲染配置刷新失败"),
                    loading: false
                });
            } finally{
                y = null;
                if (u.loading) {
                    S({
                        ...u,
                        loading: false
                    });
                }
            }
        })();
    };
    let A = ()=>{
        if (m() - v >= h) {
            revalidate();
        }
    };
    let E = (e)=>{
        if (e.key === o) {
            if (e.newValue) {
                w(e.newValue);
            } else {
                revalidate();
            }
        }
    };
    return {
        getSnapshot: ()=>u,
        getServerSnapshot: ()=>a,
        subscribe (e) {
            p.add(e);
            let r = !g;
            if (r) {
                g = true;
                if (d) {
                    try {
                        w(d.localStorage.getItem(o));
                    } catch (error) {
                        S({
                            ...u,
                            error: s(error, "渲染配置缓存不可读")
                        });
                    }
                }
                revalidate();
            }
            if (d && !b) {
                d.addEventListener("focus", A);
                d.addEventListener("storage", E);
                b = true;
            }
            if (!r) {
                revalidate();
            }
            return ()=>{
                p.delete(e);
                if (p.size === 0 && d && b) {
                    d.removeEventListener("focus", A);
                    d.removeEventListener("storage", E);
                    b = false;
                }
            };
        },
        revalidate,
        acceptPublishedRendererConfig (e) {
            x(e, true);
        }
    };
})();
export function G8(e) {
    J0.acceptPublishedRendererConfig(e);
}
