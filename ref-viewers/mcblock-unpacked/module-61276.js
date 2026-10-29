import { jsx } from "./module-86897.js";
import { v } from "./module-71138.js";
import { N } from "./module-26497.js";
import r from "./module-1733.js";
import { A } from "./module-2186.js";
const l = require(10254);
const s = require(29080);
const c = require(44748);
const d = require(67812);
let p = v((e)=>({
        toasts: [],
        add: function(type, message, a = 3000) {
            let o = arguments.length > 3 && arguments[3] !== undefined && arguments[3];
            let duration = typeof a === "number" ? a : a.duration ?? 3000;
            let id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            let s = {
                id,
                type,
                message,
                duration,
                closable: typeof a === "number" ? o : a.closable,
                action: typeof a === "number" ? undefined : a.action
            };
            e((e)=>({
                    toasts: [
                        ...e.toasts,
                        s
                    ].slice(-5)
                }));
            if (duration > 0) {
                setTimeout(()=>{
                    e((e)=>({
                            toasts: e.toasts.filter((e)=>e.id !== id)
                        }));
                }, duration);
            }
        },
        remove: (t)=>e((e)=>({
                    toasts: e.toasts.filter((e)=>e.id !== t)
                })),
        clear: ()=>e({
                toasts: []
            })
    }));
export let toast = {
    success: (e, t, n)=>p.getState().add("success", e, t, n),
    error: (e, t, n)=>p.getState().add("error", e, t, n),
    warning: (e, t, n)=>p.getState().add("warning", e, t, n),
    info: (e, t, n)=>p.getState().add("info", e, t, n)
};
let h = {
    success: l.A,
    error: s.A,
    warning: c.A,
    info: d.A
};
let b = {
    success: "bg-success",
    error: "bg-error",
    warning: "bg-warning",
    info: "bg-info"
};
function GComponent() {
    let { toasts, remove } = p();
    return <div className="fixed top-20 right-5 z-[12000] flex flex-col gap-3 pointer-events-none"><N>{toasts.map((e)=>{
        let n = h[e.type];
        return <r.P.div key={e.id} className={`
                flex items-center gap-3 px-5 py-3 shadow-block border-2 border-border-hard text-white
                min-w-[280px] max-w-[420px] pointer-events-auto
                ${b[e.type]}
              `} initial={{
            opacity: 0,
            x: 100,
            scale: 0.95
        }} animate={{
            opacity: 1,
            x: 0,
            scale: 1
        }} exit={{
            opacity: 0,
            x: 100,
            scale: 0.95
        }} transition={{
            type: "spring",
            damping: 20,
            stiffness: 300
        }} role="alert" aria-live="polite">{jsx(n, {
            className: "w-5 h-5 flex-shrink-0"
        })}<span className="flex-1 text-[15px] font-medium leading-snug">{e.message}</span>{e.action && <button onClick={()=>{
            e.action?.onClick();
            remove(e.id);
        }} className="px-2 py-1 border-2 border-border-hard font-bold">{e.action.label}</button>}{e.closable && <button onClick={()=>remove(e.id)} className="p-1 hover:bg-white/10 transition-colors flex-shrink-0" aria-label="关闭"><A size={16}/></button>}</r.P.div>;
    })}</N></div>;
}
export { GComponent as N };
