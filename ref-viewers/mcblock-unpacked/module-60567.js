import { Kg } from "./module-16649.js";
import { O } from "./module-49636.js";
export function Hd(e, t = {}) {
    if (!e) {
        return "<unknown>";
    }
    try {
        let r;
        let o = e;
        let i = [];
        let s = 0;
        let l = 0;
        let u = Array.isArray(t) ? t : t.keyAttrs;
        let c = !Array.isArray(t) && t.maxStringLength || 80;
        while(o && s++ < 5 && (r = ((e, t)=>{
            let r = [];
            if (!e?.tagName) {
                return "";
            }
            if (O.HTMLElement && e instanceof HTMLElement && e.dataset) {
                if (e.dataset.sentryComponent) {
                    return e.dataset.sentryComponent;
                }
                if (e.dataset.sentryElement) {
                    return e.dataset.sentryElement;
                }
            }
            r.push(e.tagName.toLowerCase());
            let o = t?.length ? t.filter((t)=>e.getAttribute(t)).map((t)=>[
                    t,
                    e.getAttribute(t)
                ]) : null;
            if (o?.length) {
                o.forEach((e)=>{
                    r.push(`[${e[0]}="${e[1]}"]`);
                });
            } else {
                if (e.id) {
                    r.push(`#${e.id}`);
                }
                let t = e.className;
                if (t && Kg(t)) {
                    for (let e of t.split(/\s+/)){
                        r.push(`.${e}`);
                    }
                }
            }
            for (let t of [
                "aria-label",
                "type",
                "name",
                "title",
                "alt"
            ]){
                let n = e.getAttribute(t);
                if (n) {
                    r.push(`[${t}="${n}"]`);
                }
            }
            return r.join("");
        })(o, u), r !== "html" && (!(s > 1) || !(l + 3 * i.length + r.length >= c)))){
            i.push(r);
            l += r.length;
            o = o.parentNode;
        }
        return i.reverse().join(" > ");
    } catch  {
        return "<unknown>";
    }
}
export function $N() {
    try {
        return O.document.location.href;
    } catch  {
        return "";
    }
}
export function xE(e, t = 5) {
    if (!O.HTMLElement) {
        return null;
    }
    let r = e;
    for(let e = 0; e < t && r; e++){
        if (r instanceof HTMLElement) {
            if (r.dataset.sentryComponent) {
                return r.dataset.sentryComponent;
            }
            if (r.dataset.sentryElement) {
                return r.dataset.sentryElement;
            }
        }
        r = r.parentNode;
    }
    return null;
}
