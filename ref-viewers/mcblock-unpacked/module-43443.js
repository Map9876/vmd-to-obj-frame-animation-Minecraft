import { useEffect, useRef, useState } from "./module-61426.js";
import a from "./module-47650.js";
let o = "next-route-announcer";
export function AppRouterAnnouncer({ tree }) {
    let [r, setR] = useState(null);
    useEffect(()=>{
        setR((()=>{
            let t = document.getElementsByName(o)[0];
            if (t?.shadowRoot?.childNodes[0]) {
                return t.shadowRoot.childNodes[0];
            }
            {
                let e = document.createElement(o);
                e.style.cssText = "position:absolute";
                let t = document.createElement("div");
                t.ariaLive = "assertive";
                t.id = "__next-route-announcer__";
                t.role = "alert";
                t.style.cssText = "position:absolute;border:0;height:1px;margin:-1px;padding:0;width:1px;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;word-wrap:normal";
                e.attachShadow({
                    mode: "open"
                }).appendChild(t);
                document.body.appendChild(e);
                return t;
            }
        })());
        return ()=>{
            let e = document.getElementsByTagName(o)[0];
            if (e?.isConnected) {
                document.body.removeChild(e);
            }
        };
    }, []);
    let [s, setS] = useState("");
    let uRef = useRef(undefined);
    useEffect(()=>{
        let e = "";
        if (document.title) {
            e = document.title;
        } else {
            let t = document.querySelector("h1");
            if (t) {
                e = t.innerText || t.textContent || "";
            }
        }
        if (uRef.current !== undefined && uRef.current !== e) {
            setS(e);
        }
        uRef.current = e;
    }, [
        tree
    ]);
    if (r) {
        return a.createPortal(s, r);
    }
    return null;
}
