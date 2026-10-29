import { T } from "./module-61571.js";
import { Yz } from "./module-43275.js";
import { O } from "./module-49636.js";
export function NJ() {
    return "history" in O && !!O.history;
}
export function a3(e) {
    return e && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString());
}
export function m7() {
    if (typeof EdgeRuntime === "string") {
        return true;
    }
    if (!(()=>{
        if (!("fetch" in O)) {
            return false;
        }
        try {
            new Headers;
            new Request("data:,");
            new Response;
            return true;
        } catch  {
            return false;
        }
    })()) {
        return false;
    }
    if (a3(O.fetch)) {
        return true;
    }
    let e = false;
    let O_document = O.document;
    if (O_document && typeof O_document.createElement === "function") {
        try {
            let r = O_document.createElement("iframe");
            r.hidden = true;
            O_document.head.appendChild(r);
            if (r.contentWindow?.fetch) {
                e = a3(r.contentWindow.fetch);
            }
            O_document.head.removeChild(r);
        } catch (error) {
            if (T) {
                Yz.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", error);
            }
        }
    }
    return e;
}
