import "./module-28140.js";
import "./module-49417.js";
import "./module-86897.js";
import i from "./module-47650.js";
import { useContext, useEffect, useRef } from "./module-61426.js";
import l from "./module-82073.js";
import { setAttributesFromProps } from "./module-94681.js";
import { requestIdleCallback } from "./module-4853.js";
let f = new Map;
let d = new Set;
let p = (e)=>{
    let { src, id, onLoad = ()=>{}, onReady = null, dangerouslySetInnerHTML, children = "", strategy = "afterInteractive", onError, stylesheets } = e;
    let h = id || src;
    if (h && d.has(h)) {
        return;
    }
    if (f.has(src)) {
        d.add(h);
        f.get(src).then(onLoad, onError);
        return;
    }
    let _ = ()=>{
        if (onReady) {
            onReady();
        }
        d.add(h);
    };
    let m = document.createElement("script");
    let g = new Promise((resolve, reject)=>{
        m.addEventListener("load", function(t) {
            resolve();
            if (onLoad) {
                onLoad.call(this, t);
            }
            _();
        });
        m.addEventListener("error", function(e) {
            reject(e);
        });
    }).catch((e)=>{
        if (onError) {
            onError(e);
        }
    });
    if (dangerouslySetInnerHTML) {
        m.innerHTML = dangerouslySetInnerHTML.__html || "";
        _();
    } else if (children) {
        m.textContent = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
        _();
    } else if (src) {
        m.src = src;
        f.set(src, g);
    }
    setAttributesFromProps(m, e);
    if (strategy === "worker") {
        m.setAttribute("type", "text/partytown");
    }
    m.setAttribute("data-nscript", strategy);
    if (stylesheets) {
        ((stylesheets_1)=>{
            if (i.preinit) {
                return stylesheets_1.forEach((e)=>{
                    i.preinit(e, {
                        as: "style"
                    });
                });
            }
            {
                let t = document.head;
                stylesheets_1.forEach((e)=>{
                    let r = document.createElement("link");
                    r.type = "text/css";
                    r.rel = "stylesheet";
                    r.href = e;
                    t.appendChild(r);
                });
            }
        })(stylesheets);
    }
    document.body.appendChild(m);
};
export function handleClientScriptLoad(e) {
    let { strategy = "afterInteractive" } = e;
    if (strategy === "lazyOnload") {
        window.addEventListener("load", ()=>{
            requestIdleCallback(()=>p(e));
        });
    } else {
        p(e);
    }
}
export function initScriptLoader(e) {
    e.forEach(handleClientScriptLoad);
    [
        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
        ...document.querySelectorAll('[data-nscript="beforePageRender"]')
    ].forEach((e)=>{
        let t = e.id || e.getAttribute("src");
        d.add(t);
    });
}
function MComponent(e) {
    let { id, src = "", onLoad = ()=>{}, onReady = null, strategy = "afterInteractive", onError, stylesheets, ...rest } = e;
    let { updateScripts, scripts, getIsSsr, appDir, nonce } = useContext(l.HeadManagerContext);
    nonce = rest.nonce || nonce;
    let ERef = useRef(false);
    useEffect(()=>{
        let e = id || src;
        if (!ERef.current) {
            if (onReady && e && d.has(e)) {
                onReady();
            }
            ERef.current = true;
        }
    }, [
        onReady,
        id,
        src
    ]);
    let RRef = useRef(false);
    useEffect(()=>{
        if (!RRef.current) {
            if (strategy === "afterInteractive") {
                p(e);
            } else {
                if (strategy === "lazyOnload") {
                    if (document.readyState === "complete") {
                        requestIdleCallback(()=>p(e));
                    } else {
                        window.addEventListener("load", ()=>{
                            requestIdleCallback(()=>p(e));
                        });
                    }
                }
            }
            RRef.current = true;
        }
    }, [
        e,
        strategy
    ]);
    if (strategy === "beforeInteractive" || strategy === "worker") {
        if (updateScripts) {
            scripts[strategy] = (scripts[strategy] || []).concat([
                {
                    id,
                    src,
                    onLoad,
                    onReady,
                    onError,
                    ...rest,
                    nonce
                }
            ]);
            updateScripts(scripts);
        } else if (getIsSsr && getIsSsr()) {
            d.add(id || src);
        } else if (getIsSsr && !getIsSsr()) {
            p({
                ...e,
                nonce
            });
        }
    }
    if (appDir) {
        if (stylesheets) {
            stylesheets.forEach((e)=>{
                i.preinit(e, {
                    as: "style"
                });
            });
        }
        if (strategy === "beforeInteractive") {
            if (!src) {
                if (rest.dangerouslySetInnerHTML) {
                    rest.children = rest.dangerouslySetInnerHTML.__html;
                    delete rest.dangerouslySetInnerHTML;
                }
                return <script nonce={nonce} dangerouslySetInnerHTML={{
                    __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                        0,
                        {
                            ...rest,
                            id
                        }
                    ])})`
                }}/>;
            } else {
                i.preload(src, rest.integrity ? {
                    as: "script",
                    integrity: rest.integrity,
                    nonce,
                    crossOrigin: rest.crossOrigin
                } : {
                    as: "script",
                    nonce,
                    crossOrigin: rest.crossOrigin
                });
                return <script nonce={nonce} dangerouslySetInnerHTML={{
                    __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                        src,
                        {
                            ...rest,
                            id
                        }
                    ])})`
                }}/>;
            }
        }
        if (strategy === "afterInteractive" && src) {
            i.preload(src, rest.integrity ? {
                as: "script",
                integrity: rest.integrity,
                nonce,
                crossOrigin: rest.crossOrigin
            } : {
                as: "script",
                nonce,
                crossOrigin: rest.crossOrigin
            });
        }
    }
    return null;
}
Object.defineProperty(MComponent, "__nextScript", {
    value: true
});
let g = MComponent;
export { g as default };
if ((typeof g === "function" || typeof g === "object" && g !== null) && g.__esModule === undefined) {
    Object.defineProperty(g, "__esModule", {
        value: true
    });
    Object.assign(g, {
        default: g,
        handleClientScriptLoad,
        initScriptLoader
    });
}
