import "./module-86897.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "./module-61426.js";
import _s from "./module-52619.js";
import { useSession } from "./module-36489.js";
import { sendGAEvent } from "./module-76784.js";
import { E as E_1 } from "./module-26260.js";
import { ym } from "./module-52398.js";
import { A1, ew } from "./module-69605.js";
import { A as A_1 } from "./module-29080_2.js";
import { A as A_2 } from "./module-64991_8.js";
import { A as A_3 } from "./module-3235.js";
import { A as A_4 } from "./module-98015.js";
import { A as A_5 } from "./module-61456_2.js";
import * as v from "./module-51750_5.js";
import { fb, pU, qs, rJ } from "./module-12319_2.js";
import { S } from "./module-53486_2.js";
import { E as E_2 } from "./module-25828_2.js";
import { $ } from "./module-97003_6.js";
import { K as K_1 } from "./module-44460_5.js";
const i = require(20063);
const h = require(68595);
function N(updatedAt) {
    let t = Date.now();
    let r = Math.floor((t - new Date(updatedAt).getTime()) / 60000);
    if (r < 1) {
        return "刚刚";
    }
    if (r < 60) {
        return `${r} 分钟前`;
    }
    let a = Math.floor(r / 60);
    if (a < 24) {
        return `${a}h 前`;
    }
    let n = Math.floor(a / 24);
    if (n < 7) {
        return `${n} 天前`;
    }
    return new Date(updatedAt).toLocaleDateString("zh-CN");
}
function A(blockCount) {
    if (!blockCount || blockCount <= 0) {
        return "—";
    }
    if (blockCount >= 1000) {
        return `${(blockCount / 1000).toFixed(1)}k`;
    }
    return String(blockCount);
}
let className = "sld-bcard flex flex-col min-w-0 bg-bg-card border-2 border-border-hard shadow-block-sm transition-all duration-150 hover:border-brand-primary hover:-translate-x-px hover:-translate-y-px hover:shadow-block";
function CComponent() {
    let eRef = useRef(0);
    useEffect(()=>()=>{
            eRef.current++;
        }, []);
    let [t, setT] = useState([]);
    let [C, setC] = useState(true);
    let [z, setZ] = useState([]);
    let [E, setE] = useState(false);
    let [F, setF] = useState(null);
    let [D, setD] = useState(null);
    let [O, setO] = useState(null);
    let [U, setU] = useState(null);
    let [L, setL] = useState(null);
    let [q, setQ] = useState("");
    let K = i.useRouter();
    let H = i.useSearchParams();
    let { status } = useSession();
    let { promptLogin } = E_1();
    let Z = S();
    useEffect(()=>{
        (async ()=>{
            setC(true);
            try {
                let e = await fetch("/api/studio/works");
                let t = await e.json();
                if (t.success && t.data) {
                    setT(t.data);
                }
            } catch (e) {} finally{
                setC(false);
            }
        })();
    }, []);
    useEffect(()=>{
        let e = false;
        (async ()=>{
            try {
                let t = await fetch("/api/buildings?hasProjection=true&limit=7&sort=most-learned");
                let r = await t.json();
                if (!e && r.success && Array.isArray(r.data)) {
                    setZ(r.data);
                }
            } catch (e) {}
        })();
        return ()=>{
            e = true;
        };
    }, []);
    useEffect(()=>{
        let t = H.get("importBuildingId");
        if (!t) {
            return;
        }
        let r = false;
        let a = pU();
        (async ()=>{
            setE(true);
            setD(null);
            try {
                let n = await fetch(`/api/buildings/${t}`);
                let s = await n.json();
                if (!s.success || !s.data) {
                    throw Error(s.error || "建筑不存在");
                }
                if (r || !a()) {
                    return;
                }
                let o = s.data;
                setF(o.name);
                if (!o.projectionFileUrl) {
                    throw Error("该建筑没有投影文件，无法在投影编辑器中打开");
                }
                eRef.current++;
                qs(o.projectionFileUrl, o.id, o.name);
                fetch("/api/studio/usage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sourceType: "building",
                        buildingId: o.id,
                        fileName: o.name
                    })
                }).catch(()=>{});
                K.replace("/studio/editor");
            } catch (error) {
                if (r || !a()) {
                    return;
                }
                setD(error?.message || "导入失败");
                setE(false);
            }
        })();
        return ()=>{
            r = true;
        };
    }, [
        H,
        K
    ]);
    let G = useCallback((t)=>{
        if (t.hasProjection !== false) {
            setE(true);
            setD(null);
            setF(t.name);
            eRef.current++;
            qs("", t.id, t.name);
            fetch("/api/studio/usage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sourceType: "building",
                    buildingId: t.id,
                    fileName: t.name
                })
            }).catch(()=>{});
            K.push("/studio/editor");
        }
    }, [
        K
    ]);
    let Q = async (e)=>{
        if (await Z({
            title: "删除投影编辑作品？",
            subtitle: "作品数据将永久清除，无法恢复",
            body: "删除后，这份作品及其编辑记录会从作品列表中移除。",
            tone: "danger",
            confirmText: "永久删除",
            object: {
                name: e.name,
                meta: `${e.blockCount.toLocaleString()} 方块 · ${e.blockTypes} 种 · ${N(e.updatedAt)}`,
                thumbnail: e.thumbnailUrl
            }
        })) {
            try {
                let t = await fetch(`/api/studio/works/${e.id}`, {
                    method: "DELETE"
                });
                if ((await t.json()).success) {
                    setT((t)=>t.filter((t)=>t.id !== e.id));
                }
            } catch (e) {
                console.error("删除作品失败");
            }
        }
    };
    let Y = async (e, t)=>{
        let r = A1(t);
        if (r) {
            try {
                let t = await fetch(`/api/studio/works/${e}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: r
                    })
                });
                if ((await t.json()).success) {
                    setT((t)=>t.map((t)=>{
                            if (t.id === e) {
                                return {
                                    ...t,
                                    name: r
                                };
                            }
                            return t;
                        }));
                }
            } catch (e) {
                console.error("重命名失败");
            }
            setL(null);
        }
    };
    let ee = useCallback(async (t, a = "edit")=>{
        if (a === "export") {
            setO(null);
            setU(t.id);
            try {
                let n;
                let e = await fetch(`/api/studio/works/${t.id}/export`);
                if (e.status === 401) {
                    return void promptLogin({
                        action: "导出投影",
                        onSuccess: ()=>ee(t, "export")
                    });
                }
                if (!e.ok) {
                    let t = "导出失败，请重试";
                    try {
                        let r = await e.json();
                        if (typeof r?.error === "string") {
                            t = r.error;
                        }
                    } catch (e) {}
                    throw Error(t);
                }
                let r = await e.blob();
                let a = e.headers.get("X-File-Name");
                let o = `${(n = t.name || "mcblock-work", (A1(n) || "mcblock-work").replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "-").slice(0, 80))}.${t.sourceFormat || "litematic"}`;
                let i = a ? decodeURIComponent(a) : o;
                let l = URL.createObjectURL(r);
                let c = document.createElement("a");
                c.href = l;
                c.download = i;
                document.body.appendChild(c);
                c.click();
                document.body.removeChild(c);
                URL.revokeObjectURL(l);
                try {
                    sendGAEvent("event", "studio_export", {
                        work_id: t.id,
                        work_name: t.name || undefined,
                        format: t.sourceFormat || "litematic"
                    });
                } catch (e) {}
                setT((e)=>e.map((e)=>{
                        if (e.id === t.id) {
                            return {
                                ...e,
                                status: "exported"
                            };
                        }
                        return e;
                    }));
            } catch (error) {
                setO(error instanceof Error ? error.message : "导出失败，请重试");
            } finally{
                setU(null);
            }
            return;
        }
        let o = ++eRef.current;
        let i = pU();
        let l = ()=>o === eRef.current && i();
        setO(null);
        try {
            let e = await fetch(`/api/studio/works/${t.id}`);
            let a = await e.json();
            if (!l()) {
                return;
            }
            if (!a.success || !a.data) {
                throw Error(a.error || "加载作品失败");
            }
            let n = a.data;
            if (n.originalData) {
                let currentTool;
                let a = atob(n.originalData);
                let s = new Uint8Array(a.length);
                for(let e = 0; e < a.length; e++){
                    s[e] = a.charCodeAt(e);
                }
                let { parseProjectionFile } = await import("./module-7882.js");
                let i = ew(n.name, t.name || "mcblock-work");
                let d = n.sourceFormat || t.sourceFormat || "litematic";
                let c = new File([
                    s
                ], `${i}.${d}`);
                let p = await parseProjectionFile(c);
                p.name = i;
                let replacements = ((e)=>{
                    if (!e) {
                        return [];
                    }
                    try {
                        let t = JSON.parse(e);
                        if (Array.isArray(t)) {
                            return t;
                        }
                        if (t && Array.isArray(t.replacements)) {
                            return t.replacements;
                        }
                    } catch (e) {}
                    return [];
                })(n.replacements);
                for (let e of replacements){
                    ym(p.blocks, e);
                }
                let m = new Set(p.blocks.map((e)=>e.blockId));
                p.blockTypeCount = m.size;
                try {
                    let t = typeof n.editorState === "string" ? JSON.parse(n.editorState) : n.editorState;
                    if (typeof t?.currentTool === "string") {
                        currentTool = t.currentTool;
                    }
                } catch (e) {}
                if (!await rJ(fb(p, {
                    replacements,
                    workId: t.id,
                    buildingId: n.sourceBuildingId || undefined,
                    currentTool
                }), s.buffer, l) || !l()) {
                    return;
                }
                K.push("/studio/editor");
            } else {
                throw Error("这份作品缺少原始投影文件，无法打开");
            }
        } catch (error) {
            console.error("加载作品失败:", error);
            if (l()) {
                setO(error instanceof Error ? error.message : "加载作品失败");
            }
        }
    }, [
        K,
        promptLogin
    ]);
    useEffect(()=>{
        let id = H.get("work");
        if (id) {
            ee({
                id
            });
        }
    }, [
        H,
        ee
    ]);
    let et = useMemo(()=>[
            ...t
        ].sort((e, t)=>new Date(t.updatedAt).getTime() - new Date(e.updatedAt).getTime()), [
        t
    ]);
    let er = et.slice(0, 7);
    let ea = et.length > 0;
    let en = status === "authenticated";
    return <>{O && <div className="flex items-center justify-between gap-3 px-3 py-2.5 bg-bg-card border-2 border-border-hard border-l-[6px] border-l-error shadow-block-sm"><span className="min-w-0 flex-1 text-[13px] font-bold text-text-primary"><A_1 size={16} className="inline mr-2 text-error"/>{O}</span><$ size="sm" variant="secondary" onClick={()=>setO(null)} className="shrink-0">关闭</$></div>}<section className="mt-[clamp(44px,5vw,88px)]"><div className="flex items-center gap-2.5 mb-3"><span className="w-[3px] h-4 shrink-0 bg-brand-primary border-2 border-border-hard"/><h2 className="text-sm font-black text-text-primary">{ea ? "最近作品" : "从建筑库直接打开"}</h2><span className="hidden min-[900px]:inline text-xs font-bold text-text-disabled">{ea ? `${et.length} 个` : "不用自己找文件，点一份就能进编辑器"}</span><span className="flex-1 h-0.5 bg-bg-elevated"/><_s href={ea ? "/profile?tab=studio" : "/buildings"} className="shrink-0 inline-flex items-center gap-1 text-[13px] font-extrabold text-text-secondary hover:text-brand-primary transition-colors">{ea ? "查看全部" : "浏览建筑库"}<h.A size={14}/></_s></div>{E && <div className="flex items-center gap-3 mb-3 px-3 py-2.5 bg-bg-card border-2 border-border-hard border-l-[6px] border-l-brand-primary shadow-block-sm"><v.y size="xs"/><span className="min-w-0 flex-1 text-[13px] font-bold text-text-primary">正在从建筑库导入 <b className="font-black">{F}</b>…</span><span className="hidden min-[641px]:inline text-xs font-bold text-text-disabled">导入后直接进编辑器</span></div>}{D && <div className="flex items-center gap-3 flex-wrap mb-3 px-3 py-2.5 bg-bg-card border-2 border-border-hard border-l-[6px] border-l-error shadow-block-sm"><A_1 size={18} className="shrink-0 text-error"/><span className="min-w-0 flex-1 text-[13px] font-bold text-text-primary">导入失败 —— {F ? <b className="font-black">{F}</b> : "该建筑"} 的投影文件暂时取不到</span><$ size="sm" variant="secondary" className="shrink-0" onClick={()=>{
        setD(null);
        setF(null);
        K.replace("/studio");
    }}>重试</$></div>}<div className="sld-bgrid">{ea ? er.map((e)=>{
        var t;
        var r;
        var n;
        t = e.status;
        let s = t === "exported" ? {
            text: "已导出",
            tone: "success"
        } : t === "saved" || t === "published" ? {
            text: "已保存",
            tone: "info"
        } : {
            text: "草稿",
            tone: "warning"
        };
        r = e.status;
        let o = r === "exported" ? "bg-brand-primary" : r === "saved" || r === "published" ? "bg-info" : "bg-warning";
        return <div key={e.id} className={className}><button type="button" onClick={()=>ee(e)} className="relative aspect-[4/3] bg-[#191919] border-b-2 border-border-hard overflow-hidden cursor-pointer"><span className={`absolute left-0 top-0 bottom-0 w-1 z-[3] ${o}`}/>{e.thumbnailUrl ? <img src={e.thumbnailUrl} alt={e.name} className="absolute inset-[6%_8%] w-auto h-auto max-w-[84%] max-h-[88%] m-auto object-contain [filter:drop-shadow(4px_5px_0_rgba(0,0,0,0.3))]"/> : <A_2 size={34} className={`absolute inset-0 m-auto ${(n = e.status) === "exported" ? "text-[rgba(68,178,68,0.55)]" : n === "saved" || n === "published" ? "text-[rgba(91,155,213,0.6)]" : "text-[rgba(251,191,36,0.5)]"} drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]`}/>}<E_2 tone={s.tone} variant="solid" size="sm" className="absolute left-2 top-1.5 z-[3] !h-[18px] !gap-1 !px-[5px] !text-[9px] !font-black !bg-bg-primary !text-text-primary !border-border-hard"><span className={`w-1.5 h-1.5 border border-border-hard ${o}`}/>{s.text}</E_2><span className="absolute top-1.5 right-2 z-[3] px-[5px] py-[2px] text-[9px] font-pixel bg-bg-primary border-2 border-border-hard text-text-secondary">.{e.sourceFormat}</span></button><div className="px-[9px] pt-[7px] pb-1.5 min-w-0">{L === e.id ? <input autoFocus value={q} onChange={(e)=>setQ(e.target.value)} onKeyDown={(t)=>{
            if (t.key === "Enter") {
                Y(e.id, q);
            }
            if (t.key === "Escape") {
                setL(null);
            }
        }} onBlur={()=>Y(e.id, q)} className="w-full text-xs font-black text-text-primary bg-bg-card border-2 border-brand-primary px-1.5 py-0.5 focus:outline-none" maxLength={50}/> : <button type="button" onClick={()=>ee(e)} className="block w-full text-left text-xs font-black text-text-primary truncate cursor-pointer">{e.name}</button>}<div className="mt-px text-[10px] font-semibold text-text-disabled truncate"><span className="font-pixel text-[11px] text-text-secondary">{A(e.blockCount)}</span> 块 · {N(e.updatedAt)}</div></div><div className="grid grid-cols-3 gap-0.5 px-1.5 pb-1.5"><K_1 label="重命名" size="xs" variant="secondary" className="!w-full" onClick={(t)=>{
            t.stopPropagation();
            setL(e.id);
            setQ(e.name);
        }}><A_3 size={13}/></K_1><K_1 label="导出" size="xs" variant="secondary" className="!w-full" disabled={U === e.id} onClick={(t)=>{
            t.stopPropagation();
            ee(e, "export");
        }}>{U === e.id ? <v.y size="xs"/> : <A_4 size={13}/>}</K_1><K_1 label="删除作品" size="xs" variant="danger" className="!w-full" onClick={(t)=>{
            t.stopPropagation();
            Q(e);
        }}><A_5 size={13}/></K_1></div></div>;
    }) : z.map((e)=><div key={e.id} className={className}><button type="button" onClick={()=>G(e)} disabled={E} className="relative aspect-[4/3] bg-[#191919] border-b-2 border-border-hard overflow-hidden cursor-pointer">{e.coverImage ? <img src={e.coverImage} alt={e.name} className="absolute inset-[6%] w-auto h-auto max-w-[88%] max-h-[88%] m-auto object-contain"/> : <A_2 size={34} className="absolute inset-0 m-auto text-text-disabled/40"/>}<span className="absolute top-1.5 right-2 z-[3] px-[5px] py-[2px] text-[9px] font-pixel bg-bg-primary border-2 border-border-hard text-text-secondary">.litematic</span>{E && F === e.name && <span className="absolute inset-0 z-[4] bg-bg-primary/55 shadow-[inset_0_0_0_3px_var(--color-brand-primary)]"/>}</button><button type="button" onClick={()=>G(e)} disabled={E} className="px-[9px] pt-[7px] pb-1.5 min-w-0 text-left cursor-pointer"><div className="text-xs font-black text-text-primary truncate">{e.name}</div><div className="mt-px text-[10px] font-semibold text-text-disabled truncate"><span className="font-pixel text-[11px] text-text-secondary">{A(e.blockCount)}</span> 块 · {e.projectionAuthor || "未知作者"}</div></button></div>)}{(ea ? et.length > er.length : z.length > 0) && <_s href={ea ? "/profile?tab=studio" : "/buildings"} className="flex flex-col items-center justify-center gap-1.5 min-w-0 p-3 bg-bg-card border-2 border-border-hard shadow-block-sm text-xs font-extrabold text-text-disabled text-center transition-all duration-150 hover:border-brand-primary hover:text-brand-primary hover:-translate-x-px hover:-translate-y-px hover:shadow-block"><h.A size={20}/><span>{ea ? `还有 ${et.length - er.length} 个作品` : "浏览建筑库"}</span><span className="text-[10px] text-text-disabled">{ea ? "个人中心 →" : "按版本 / 尺寸筛选 →"}</span></_s>}</div>{!en && <div className="mt-2.5 text-xs font-bold text-text-disabled">浏览和编辑不用登录；导出投影需要登录，登录后会接着把刚才那次导出做完。作品存进账号后，换台设备还能接着改。</div>}{en && !C && !ea && <div className="mt-2.5 text-xs font-bold text-text-disabled">还没有保存过作品。在编辑器里点「保存」，作品会出现在这里。上面这些是建筑库里可以直接打开的投影。</div>}</section></>;
}
export { CComponent as default };
