import "./module-86897.js";
import { useCallback, useEffect } from "./module-61426.js";
import { N as N_1 } from "./module-26497.js";
import s from "./module-1733.js";
import { A } from "./module-2186.js";
const i = require(97003);
const d = require(44460);
let c = {
    sm: "max-w-[400px]",
    md: "max-w-[500px]",
    lg: "max-w-[700px]",
    xl: "max-w-[900px]",
    fullscreen: "max-w-full w-full h-full max-h-full rounded-none"
};
export function a({ open, onClose, title, icon, iconTone = "brand", subtitle, children, size = "md", footer, closable = true, maskClosable = true, centered = true, className = "", bodyClassName = "" }) {
    let j = useCallback((e)=>{
        if (e.key === "Escape" && closable) {
            onClose();
        }
    }, [
        onClose,
        closable
    ]);
    useEffect(()=>{
        if (open) {
            document.addEventListener("keydown", j);
            document.body.style.overflow = "hidden";
            return ()=>{
                document.removeEventListener("keydown", j);
                document.body.style.overflow = "";
            };
        }
    }, [
        open,
        j
    ]);
    let N = !!(icon || subtitle);
    return <N_1>{open && <s.P.div className="fixed inset-0 bg-black/70 z-[11000] flex" initial={{
        opacity: 0
    }} animate={{
        opacity: 1
    }} exit={{
        opacity: 0
    }} transition={{
        duration: 0.2
    }} onClick={()=>{
        if (maskClosable) {
            onClose();
        }
    }} style={{
        alignItems: centered ? "center" : "flex-start",
        justifyContent: "center"
    }}><s.P.div className={`
              bg-bg-card rounded-none border-2 border-border-hard w-full shadow-block overflow-hidden
              ${size !== "fullscreen" ? "max-h-[90vh] mx-4" : ""}
              ${c[size]}
              ${className}
            `} initial={{
        scale: 0.95,
        y: 20
    }} animate={{
        scale: 1,
        y: 0
    }} exit={{
        scale: 0.95,
        y: 20
    }} transition={{
        duration: 0.2
    }} onClick={(e)=>e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby={title ? "modal-title" : undefined}>{title && <div className={`flex items-center justify-between ${N ? "gap-3 border-b-2 border-border-hard bg-bg-card px-5 py-[18px]" : "border-b border-border-soft px-6 py-4"}`}><div className="flex min-w-0 items-center gap-3">{icon && <div className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center border-2 border-border-hard shadow-block-xs ${{
        brand: "bg-brand-primary text-text-on-brand",
        success: "bg-success text-text-on-brand",
        warning: "bg-warning text-text-on-brand",
        danger: "bg-error text-white",
        info: "bg-info text-white",
        wechat: "bg-[rgb(7,193,96)] text-white",
        qq: "bg-[rgb(18,183,245)] text-white"
    }[iconTone]}`}>{icon}</div>}<div className="min-w-0"><h3 id="modal-title" className={`${N ? "text-lg font-black" : "text-xl font-bold"} text-text-primary`}>{title}</h3>{subtitle && <div className="mt-0.5 text-xs font-bold leading-relaxed text-text-muted">{subtitle}</div>}</div></div>{closable && <d.K onClick={onClose} label="关闭" size="xs" variant="secondary" className="shrink-0 bg-bg-elevated text-text-secondary hover:bg-error hover:text-text-primary"><A size={20}/></d.K>}</div>}<div className={`
                px-6 py-4 text-text-secondary leading-relaxed overflow-y-auto cn4-scroll
                ${size !== "fullscreen" ? "max-h-[60vh]" : ""}
                ${bodyClassName}
              `}>{children}</div>{footer && <div className="cn4-modal-footer px-6 py-4 border-t border-border-soft flex justify-end gap-2">{footer}</div>}</s.P.div></s.P.div>}</N_1>;
}
export function y({ variant = "ghost", size = "lg", ...rest }) {
    return <i.$ variant={variant} size={size} data-compat-layer="ModalButton" {...rest}/>;
}
