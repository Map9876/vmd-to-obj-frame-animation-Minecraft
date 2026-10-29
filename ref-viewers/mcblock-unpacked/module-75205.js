import "./module-86897.js";
import { useCallback, useEffect, useRef, useState } from "./module-61426.js";
import * as o from "./module-71442.js";
import { A as A_1 } from "./module-64991_8.js";
import { A as A_2 } from "./module-77252_3.js";
import { A as A_3 } from "./module-15532_3.js";
import { A as A_4 } from "./module-95585_4.js";
import * as u from "./module-51750_5.js";
import { fb, pU, qs, rJ } from "./module-12319_2.js";
import { g as g_1 } from "./module-44478_2.js";
import { $ } from "./module-97003_6.js";
import { $ as $_1 } from "./module-1855_2.js";
import { parseProjectionFile, up } from "./module-7882.js";
import { A as A_5 } from "./module-29080_2.js";
import { A as A_6 } from "./module-45966.js";
const s = require(20063);
let x = [
    {
        value: "all",
        label: "全部"
    },
    {
        value: "beginner",
        label: "新手"
    },
    {
        value: "intermediate",
        label: "进阶"
    },
    {
        value: "advanced",
        label: "高级"
    },
    {
        value: "expert",
        label: "大师"
    }
];
let g = [
    {
        value: "latest",
        label: "最新"
    },
    {
        value: "layers",
        label: "层数↓"
    },
    {
        value: "popular",
        label: "热门"
    }
];
function F1Component({ open, onClose }) {
    let [f, setF] = useState([]);
    let [y, setY] = useState(false);
    let [_, set_] = useState("");
    let [j, setJ] = useState(1);
    let [A, setA] = useState(1);
    let [C, setC] = useState("all");
    let [z, setZ] = useState("latest");
    let E = s.useRouter();
    let P = useCallback(async (e, t, r, sort)=>{
        setY(true);
        try {
            let s = new URLSearchParams({
                page: String(t),
                limit: "12",
                hasProjection: "true",
                sort
            });
            if (e) {
                s.set("search", e);
            }
            if (r && r !== "all") {
                s.set("difficulty", r);
            }
            let o = await fetch(`/api/buildings?${s}`);
            let i = await o.json();
            if (i.success) {
                setF(i.data);
                setA(i.pagination?.totalPages || 1);
            }
        } catch (error) {
            console.error("获取建筑列表失败:", error);
        } finally{
            setY(false);
        }
    }, []);
    useEffect(()=>{
        if (open) {
            P(_, j, C, z);
        }
    }, [
        open,
        _,
        j,
        C,
        z,
        P
    ]);
    let F = useCallback((e)=>{
        if (e.hasProjection) {
            qs("", e.id, e.name);
            fetch("/api/studio/usage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sourceType: "building",
                    buildingId: e.id,
                    fileName: e.name
                })
            }).catch(()=>{});
            onClose();
            E.push("/studio/editor");
        }
    }, [
        onClose,
        E
    ]);
    let onChange = useCallback((e)=>{
        set_(e.target.value);
        setJ(1);
    }, []);
    let D = useCallback((e)=>{
        setC(e);
        setJ(1);
    }, []);
    let B = useCallback((e)=>{
        setZ(e);
        setJ(1);
    }, []);
    return <o.a open={open} onClose={onClose} title="从建筑库导入" subtitle="选择一个建筑投影加载到编辑器" icon=<A_1 size={20}/> size="xl" bodyClassName="!p-3.5 !max-h-none"><div className="flex h-11 items-center gap-2.5 border-2 border-border-hard bg-bg-elevated px-3 sm:h-9 mb-3"><A_2 size={15} className="flex-none text-text-muted"/><input type="text" value={_} onChange={onChange} placeholder="搜索建筑名称..." className="h-full flex-1 min-w-0 bg-transparent border-none outline-none text-text-primary text-sm font-bold placeholder:text-text-muted"/></div><div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3"><div className="flex items-center gap-1.5"><span className="text-[11px] font-extrabold text-text-muted uppercase tracking-wide shrink-0">难度</span><div className="flex flex-wrap gap-1">{x.map((e)=><$_1 key={e.value} size="sm" selected={C === e.value} onClick={()=>D(e.value)}>{e.label}</$_1>)}</div></div><div className="flex items-center gap-1.5"><span className="text-[11px] font-extrabold text-text-muted uppercase tracking-wide shrink-0">排序</span><div className="flex flex-wrap gap-1">{g.map((e)=><$_1 key={e.value} size="sm" selected={z === e.value} onClick={()=>B(e.value)}>{e.label}</$_1>)}</div></div></div>{y ? <div className="flex items-center justify-center min-h-[200px] sm:min-h-[380px]"><u.y size="md"/></div> : f.length === 0 ? <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[380px]"><A_1 size={28} className="text-text-muted/40 mb-2"/><p className="text-text-muted text-xs font-bold">没有找到建筑</p></div> : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[360px] sm:max-h-[420px] overflow-y-auto cn4-scroll pr-0.5 content-start">{f.map((e)=>{
        let t = g_1(e.difficulty);
        return <button key={e.id} type="button" onClick={()=>F(e)} disabled={!e.hasProjection} className={`bg-bg-elevated border-2 border-border-hard shadow-block-xs overflow-hidden text-left transition-all duration-150 group ${e.hasProjection ? "hover:shadow-block-sm hover:-translate-x-px hover:-translate-y-px hover:border-brand-primary active:translate-x-0.5 active:translate-y-0.5 active:shadow-none" : "opacity-40 cursor-not-allowed"}`}><div className="aspect-[3/2] bg-bg-primary border-b-2 border-border-hard shadow-[inset_2px_2px_0_rgba(0,0,0,.35)] overflow-hidden relative">{e.coverImage ? <img src={e.coverImage} alt={e.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"/> : <div className="w-full h-full flex items-center justify-center"><A_1 size={20} className="text-text-muted/30"/></div>}{e.height && <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 border-2 border-border-hard text-[10px] font-extrabold text-text-secondary font-mono leading-tight">{e.height}层</span>}</div><div className="p-1.5 px-2"><p className="text-xs font-extrabold text-text-primary truncate">{e.name}</p><div className="flex items-center gap-1.5 mt-0.5">{e.difficulty && <span className="inline-flex items-center gap-1 text-[10px] font-bold text-text-secondary"><span className="w-1.5 h-1.5 border-2 border-border-hard" style={{
            background: t.bg
        }}/>{t.label}</span>}{e.projectionAuthor && <span className="text-[10px] font-semibold text-text-muted ml-auto truncate max-w-[60px]">{e.projectionAuthor}</span>}</div></div></button>;
    })}</div>}{A > 1 && <div className="flex items-center justify-center gap-2.5 pt-2.5 mt-3 border-t-2 border-border-hard"><$ size="sm" variant="secondary" onClick={()=>setJ((e)=>Math.max(1, e - 1))} disabled={j <= 1}><A_3 size={14}/>上一页</$><span className="text-xs font-extrabold text-text-muted tabular-nums font-mono">{j} / {A}</span><$ size="sm" variant="secondary" onClick={()=>setJ((e)=>Math.min(A, e + 1))} disabled={j >= A}>下一页<A_4 size={14}/></$></div>}</o.a>;
}
function Component() {
    let [open, setOpen] = useState(false);
    let { isDragging, parsing, error, pendingFile, fileInputRef, handleDrop, handleDragOver, handleDragLeave, handleInputChange, openFilePicker } = (()=>{
        let [isDragging_1, setIsDragging] = useState(false);
        let [r, setR] = useState(false);
        let [error_1, setError] = useState(null);
        let [pendingFile_1, setPendingFile] = useState(null);
        let cRef = useRef(null);
        let u = s.useRouter();
        let pRef = useRef(0);
        useEffect(()=>()=>{
                pRef.current++;
            }, []);
        let handleFile = useCallback(async (e)=>{
            let t = ++pRef.current;
            let r = pU();
            let n = ()=>t === pRef.current && r();
            setError(null);
            setPendingFile({
                name: e.name,
                sizeMB: (e.size / 1024 / 1024).toFixed(1)
            });
            if (!up(e.name)) {
                return void setError("不支持的文件格式。支持 .litematic、.schem");
            }
            setR(true);
            try {
                let t = await e.arrayBuffer();
                let r = await parseProjectionFile(e);
                try {
                    if (!await rJ(fb(r), t, n) || !n()) {
                        return;
                    }
                } catch (err) {
                    throw Error(err instanceof Error && err.name === "QuotaExceededError" ? "浏览器可用存储空间不足，无法保留这份投影。请释放空间后重试。" : "无法保存投影临时数据，请检查浏览器的网站存储权限后重试。");
                }
                fetch("/api/studio/usage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sourceType: "projection",
                        fileName: r.name,
                        blockCount: r.totalBlockCount,
                        blockTypes: r.blockTypeCount
                    })
                }).catch(()=>{});
                u.push("/studio/editor");
            } catch (err) {
                if (n()) {
                    setError(err instanceof Error ? err.message : "文件解析失败，请检查文件格式");
                }
            } finally{
                if (t === pRef.current) {
                    setR(false);
                }
            }
        }, [
            u
        ]);
        let handleDrop_1 = useCallback((e)=>{
            e.preventDefault();
            setIsDragging(false);
            let r = e.dataTransfer.files[0];
            if (r) {
                handleFile(r);
            }
        }, [
            handleFile
        ]);
        let handleDragOver_1 = useCallback((e)=>{
            e.preventDefault();
            setIsDragging(true);
        }, []);
        let handleDragLeave_1 = useCallback((e)=>{
            e.preventDefault();
            setIsDragging(false);
        }, []);
        let openFilePicker_1 = useCallback(()=>{
            var e;
            if (!(r || (e = cRef.current) == null)) {
                e.click();
            }
        }, [
            r
        ]);
        let handleInputChange_1 = useCallback((e)=>{
            let r = e.target.files?.[0];
            if (r) {
                handleFile(r);
            }
            if (cRef.current) {
                cRef.current.value = "";
            }
        }, [
            handleFile
        ]);
        return {
            isDragging: isDragging_1,
            parsing: r,
            error: error_1,
            pendingFile: pendingFile_1,
            fileInputRef: cRef,
            handleFile,
            handleDrop: handleDrop_1,
            handleDragOver: handleDragOver_1,
            handleDragLeave: handleDragLeave_1,
            handleInputChange: handleInputChange_1,
            openFilePicker: openFilePicker_1
        };
    })();
    return <>{error && <div className="flex items-center gap-2.5 px-3 py-2.5 bg-bg-card border-2 border-border-hard border-l-[6px] border-l-error shadow-block-sm"><A_5 size={18} className="shrink-0 text-error"/><span className="min-w-0 flex-1 text-[13px] font-bold text-text-primary">{pendingFile ? `${pendingFile.name} 打开失败 —— ` : ""}{error}</span><$ size="sm" variant="secondary" onClick={openFilePicker} className="shrink-0">重新选择</$></div>}<div onClick={(e)=>{
        if (!e.target.closest("[data-no-drop-click]")) {
            openFilePicker();
        }
    }} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className={`sld-bar${isDragging ? " is-drag" : ""}`}><input ref={fileInputRef} type="file" accept=".litematic,.schem" onChange={handleInputChange} className="hidden"/><span className="sld-bar-ico">{parsing ? <u.y size="md"/> : <A_6 className="w-[42px] h-[42px]"/>}</span><div className="sld-bar-mid">{parsing ? <><div className="sld-bar-t">解析中…</div><div className="sld-bar-note">{pendingFile ? `${pendingFile.name} · ${pendingFile.sizeMB} MB　·　` : ""}在本机解析，文件不上传</div></> : <><div className="sld-bar-t">{isDragging ? "松手即可打开" : "拖拽投影到这里"}</div><div className="sld-bar-t2">或 <span className="pick">点击选择文件</span></div><div className="sld-bar-meta">{[
        ".litematic",
        ".schem"
    ].map((e)=><span key={e} className="sld-fmt">{e}</span>)}</div><div className="sld-bar-note">在本机解析，文件不上传<br/>原文件大小不能代表模型规模；能否打开取决于解析后的数据量、浏览器临时存储和设备内存。</div></>}</div><div data-no-drop-click className="sld-bar-acts"><$ size="md" variant="primary" disabled={parsing} onClick={(e)=>{
        e.stopPropagation();
        setOpen(true);
    }}><A_1 size={15}/>从建筑库导入</$></div></div><F1Component open={open} onClose={()=>setOpen(false)}/></>;
}
export { Component as default };
