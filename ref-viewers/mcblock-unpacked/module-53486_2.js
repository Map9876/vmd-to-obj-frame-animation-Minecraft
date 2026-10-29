import { jsx } from "./module-86897.js";
import { createContext, useCallback, useContext, useRef, useState } from "./module-61426.js";
import { A } from "./module-2186.js";
import { A as A_1 } from "./module-61456_2.js";
import { A as A_2 } from "./module-67812_3.js";
import { A as A_3 } from "./module-44748_5.js";
import * as d from "./module-71442.js";
let CContext = createContext(null);
function UComponent({ object }) {
    return <div className="mt-4 flex items-center gap-3 border-2 border-border-hard bg-bg-inset p-3 shadow-block-xs">{object.thumbnail && <div className="h-[58px] w-[76px] shrink-0 overflow-hidden border-2 border-border-hard bg-bg-deep">{typeof object.thumbnail === "string" ? <img src={object.thumbnail} alt="" className="h-full w-full object-cover"/> : object.thumbnail}</div>}<div className="min-w-0"><div className="truncate text-sm font-black text-text-primary">{object.name}</div>{object.meta && <div className="mt-1 font-pixel text-xs text-text-muted">{object.meta}</div>}</div></div>;
}
function BComponent({ request, onSettle }) {
    let { title, subtitle, body, confirmText = "确认执行", cancelText = "取消" } = request.options;
    return <d.a open onClose={()=>onSettle(false)} size="md" maskClosable={false} closable={false} bodyClassName="!max-h-[88vh] !p-0" className="!max-w-[460px] !bg-bg-card"><div className="flex items-center gap-2.5 border-b-2 border-border-hard px-4 py-3.5"><span className="h-[15px] w-[3px] shrink-0 border-2 border-border-hard bg-warning"/><div className="min-w-0 flex-1"><h3 className="text-base font-black text-text-primary">{title}</h3>{subtitle && <div className="mt-0.5 text-[11px] font-bold leading-relaxed text-text-muted">{subtitle}</div>}</div><button type="button" onClick={()=>onSettle(false)} className="grid h-7 w-7 shrink-0 place-items-center text-text-muted transition-colors hover:text-error" aria-label="关闭"><A size={16}/></button></div><div className="px-[18px] py-4 text-sm font-bold leading-relaxed text-text-secondary">{body}</div><div className="flex items-center justify-end gap-2 border-t-2 border-border-hard px-4 py-3.5">{cancelText !== null && <button type="button" onClick={()=>onSettle(false)} className="h-9 border-2 border-border-hard bg-bg-inset px-4 text-sm font-black text-text-secondary transition-colors hover:text-text-primary">{cancelText}</button>}<button type="button" onClick={()=>onSettle(true)} className="inline-flex h-9 items-center gap-1.5 border-2 border-border-hard bg-error px-4 text-sm font-black text-white shadow-block-sm transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-block"><A_1 size={13}/>{confirmText}</button></div></d.a>;
}
export function a({ children }) {
    let pRef = useRef(0);
    let [h, setH] = useState([]);
    let request = h[0];
    let value = useCallback((options)=>new Promise((resolve)=>{
            pRef.current += 1;
            setH((r)=>[
                    ...r,
                    {
                        id: pRef.current,
                        options,
                        resolve
                    }
                ]);
        }), []);
    let onSettle = useCallback((e)=>{
        if (request) {
            request.resolve(e);
            setH((e)=>{
                if (e[0]?.id === request.id) {
                    return e.slice(1);
                }
                return e;
            });
        }
    }, [
        request
    ]);
    let iconTone = request?.options.tone ?? "info";
    let y = iconTone === "info" ? A_2 : A_3;
    return <CContext.Provider value={value}>{children}{request && request.options.skin === "editor" ? <BComponent key={request.id} request={request} onSettle={onSettle}/> : request ? <d.a key={request.id} open onClose={()=>onSettle(false)} title={request.options.title} subtitle={request.options.subtitle} icon={jsx(y, {
        size: 20
    })} iconTone={iconTone} size="md" maskClosable={iconTone !== "danger"} closable={iconTone !== "danger"} footer=<>{request.options.cancelText !== null && <d.y variant="ghost" onClick={()=>onSettle(false)}>{request.options.cancelText ?? "取消"}</d.y>}<d.y variant={iconTone === "danger" ? "danger" : iconTone === "warning" ? "warning" : "primary"} onClick={()=>onSettle(true)}>{request.options.confirmText ?? "确认"}</d.y></>>{request.options.object && <UComponent object={request.options.object}/>}{request.options.body && <div className={`${request.options.object ? "mt-4" : ""} text-sm font-bold leading-relaxed text-text-secondary`}>{request.options.body}</div>}</d.a> : null}</CContext.Provider>;
}
export function S() {
    let e = useContext(CContext);
    if (!e) {
        throw Error("useConfirm 必须在 ConfirmProvider 内使用");
    }
    return e;
}
