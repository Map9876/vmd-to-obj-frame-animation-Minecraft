import "./module-86897.js";
import { useCallback, useEffect } from "./module-61426.js";
import { N } from "./module-26497.js";
import l from "./module-1733.js";
import i from "./module-47650.js";
import { A } from "./module-2186.js";
import * as d from "./module-51750_4.js";
const c = require(44460);
let x = {
    xs: {
        width: "w-[240px]",
        height: "h-[200px]"
    },
    sm: {
        width: "w-[280px]",
        height: "h-[240px]"
    },
    md: {
        width: "w-[320px]",
        height: "h-[280px]"
    },
    lg: {
        width: "w-[400px]",
        height: "h-[350px]"
    },
    xl: {
        width: "w-[480px]",
        height: "h-[420px]"
    },
    fullscreen: {
        width: "w-full",
        height: "h-full"
    }
};
let m = {
    right: {
        initial: {
            x: "100%"
        },
        animate: {
            x: 0
        },
        exit: {
            x: "100%"
        }
    },
    left: {
        initial: {
            x: "-100%"
        },
        animate: {
            x: 0
        },
        exit: {
            x: "-100%"
        }
    },
    top: {
        initial: {
            y: "-100%"
        },
        animate: {
            y: 0
        },
        exit: {
            y: "-100%"
        }
    },
    bottom: {
        initial: {
            y: "100%"
        },
        animate: {
            y: 0
        },
        exit: {
            y: "100%"
        }
    }
};
let u = {
    right: "right-0 top-0 bottom-0",
    left: "left-0 top-0 bottom-0",
    top: "left-0 right-0 top-0",
    bottom: "left-0 right-0 bottom-[52px]"
};
export function _({ id, open, onClose, title, subtitle, icon, children, position = "right", size = "md", variant = "default", color = "green", footer, showOverlay = true, closeOnOverlayClick = true, closeOnEsc = true, showCloseButton = true, loading = false, className = "", bodyClassName = "", avoidBottomNavigation = true, portalTarget }) {
    let P = useCallback((e)=>{
        if (e.key === "Escape" && closeOnEsc && !loading) {
            onClose();
        }
    }, [
        onClose,
        closeOnEsc,
        loading
    ]);
    useEffect(()=>{
        if (open) {
            document.addEventListener("keydown", P);
            document.body.style.overflow = "hidden";
            return ()=>{
                document.removeEventListener("keydown", P);
                document.body.style.overflow = "";
            };
        }
    }, [
        open,
        P
    ]);
    let I = position === "left" || position === "right" ? x[size].width : x[size].height;
    let M = {
        green: "border-brand-primary",
        orange: "border-warning",
        blue: "border-info"
    };
    let D = `
    fixed bg-bg-card flex flex-col z-[1001] shadow-block
    ${position === "bottom" && !avoidBottomNavigation ? "left-0 right-0 bottom-0" : u[position]}
    ${I}
    ${variant === "rounded" ? "rounded-none m-cn-4" : ""}
    ${variant === "bordered" && position === "right" ? `border-l-[3px] ${M[color]}` : ""}
    ${variant === "bordered" && position === "left" ? `border-r-[3px] ${M[color]}` : ""}
    ${variant === "bordered" && position === "top" ? `border-b-[3px] ${M[color]}` : ""}
    ${variant === "bordered" && position === "bottom" ? `border-t-[3px] ${M[color]}` : ""}
    ${position === "bottom" && variant !== "bordered" ? "border-t-2 border-border-hard" : ""}
    ${loading ? "pointer-events-none" : ""}
    ${className}
  `.trim();
    let F = `
    flex items-center justify-between px-6 py-4 flex-shrink-0
    ${variant === "minimal" ? "" : "border-b-2 border-border-soft"}
    ${({
        green: "bg-brand-primary/5",
        orange: "bg-warning/5",
        blue: "bg-info/5"
    })[color]}
  `.trim();
    let W = `
    px-6 py-4 flex-shrink-0 flex gap-2 justify-end
    ${variant === "minimal" ? "" : "border-t-2 border-border-soft"}
  `.trim();
    let T = m[position];
    return i.createPortal(<N>{open && <>{showOverlay && <l.P.div className={`fixed inset-0 z-[1000] ${position === "bottom" ? "bg-black/60" : "bg-black/50"}`} initial={{
        opacity: 0
    }} animate={{
        opacity: 1
    }} exit={{
        opacity: 0
    }} transition={{
        duration: 0.2
    }} onClick={()=>{
        if (closeOnOverlayClick && !loading) {
            onClose();
        }
    }}/>}<l.P.div id={id} className={D} initial={T.initial} animate={T.animate} exit={T.exit} transition={position === "bottom" ? {
        duration: 0.2,
        ease: "easeOut"
    } : {
        type: "spring",
        damping: 30,
        stiffness: 300
    }} role="dialog" aria-modal="true" aria-labelledby={title ? "drawer-title" : undefined}>{(title || showCloseButton) && <div className={F}><div className="flex items-center gap-3">{icon && <div className={`w-8 h-8 flex items-center justify-center rounded-none ${{
        green: "bg-brand-primary/10 text-brand-primary",
        orange: "bg-warning/10 text-warning",
        blue: "bg-info/10 text-info"
    }[color]}`}>{icon}</div>}<div>{title && <div id="drawer-title" className="text-base font-bold text-text-primary">{title}</div>}{subtitle && <div className="text-[13px] text-text-muted mt-0.5">{subtitle}</div>}</div></div>{showCloseButton && <c.K onClick={onClose} disabled={loading} label="关闭" size="xs" variant="secondary" className="bg-bg-card text-text-secondary hover:bg-bg-elevated hover:text-text-primary"><A size={20}/></c.K>}</div>}<div className={`flex-1 px-6 py-4 text-text-secondary text-sm leading-relaxed overflow-y-auto cn4-scroll ${bodyClassName}`}>{loading ? <div className="absolute inset-0 bg-bg-elevated/80 flex items-center justify-center"><d.y size="md"/></div> : children}</div>{footer && <div className={W}>{footer}</div>}</l.P.div></>}</N>, portalTarget ?? document.body);
}
