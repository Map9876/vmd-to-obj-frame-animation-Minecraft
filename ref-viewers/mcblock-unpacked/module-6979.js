import "./module-86897.js";
import { useEffect, useState } from "./module-61426.js";
import _o from "./module-52619.js";
import { A } from "./module-2186.js";
import { MP } from "./module-98901_2.js";
import { q } from "./module-98542.js";
import { D } from "./module-98658.js";
const l = require(20063);
const s = require(68595);
let m = "mcb-annc-step-teaching-2026-09";
let h = "data-annc-off";
let b = [
    "/buildings/step-teaching"
];
function GComponent({ initialBanner = null, enableDynamic = false, preview = false, previewBanner }) {
    let path = l.usePathname() || "/";
    let [v, setV] = useState(initialBanner);
    useEffect(()=>{
        if (!enableDynamic || preview) {
            return;
        }
        let e = true;
        let t = ()=>q().then((t)=>{
                if (!e || !t) {
                    return;
                }
                let i = t.banner?.until && new Date(t.banner.until).getTime() <= Date.now() ? null : t.banner;
                if (i) {
                    try {
                        if ((i.sessionOnly ? sessionStorage : localStorage).getItem(i.dismissKey || m) === "1") {
                            document.documentElement.setAttribute(h, "");
                        } else {
                            document.documentElement.removeAttribute(h);
                        }
                    } catch (e) {
                        document.documentElement.removeAttribute(h);
                    }
                } else {
                    document.documentElement.removeAttribute(h);
                }
                setV(i);
            });
        t();
        let i = setInterval(t, 60000);
        return ()=>{
            e = false;
            clearInterval(i);
        };
    }, [
        enableDynamic,
        preview
    ]);
    let w = preview ? previewBanner ?? null : enableDynamic ? v : null;
    let y = enableDynamic || preview;
    let k = y && w?.dismissKey || m;
    useEffect(()=>{
        if (enableDynamic && !preview && w) {
            try {
                if ((w.sessionOnly ? sessionStorage : localStorage).getItem(k) === "1") {
                    document.documentElement.setAttribute(h, "");
                } else {
                    document.documentElement.removeAttribute(h);
                }
            } catch (e) {
                document.documentElement.removeAttribute(h);
            }
        }
    }, [
        w,
        k,
        enableDynamic,
        preview
    ]);
    useEffect(()=>{
        let e;
        if (!enableDynamic || preview || !w?.until) {
            return;
        }
        let t = ()=>{
            let n = new Date(w.until).getTime() - Date.now();
            if (n <= 0) {
                setV((e)=>{
                    if (e?.id === w.id) {
                        return null;
                    }
                    return e;
                });
            } else {
                e = setTimeout(t, Math.min(n, 2147483647));
            }
        };
        t();
        return ()=>clearTimeout(e);
    }, [
        w,
        enableDynamic,
        preview
    ]);
    let j = !!enableDynamic && !preview && w != null && !!w.link && (()=>{
        let e = w.link.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
        return path === e || path.startsWith(`${e}/`);
    })();
    if (y) {
        if (!w || j) {
            return null;
        }
    } else if (b.some((e)=>path === e || path.startsWith(`${e}/`))) {
        return null;
    }
    let href = y ? w?.link : "/buildings/step-teaching";
    let T = y ? w?.bold : "新上线：3D 步骤教学";
    let C = y ? w?.text : "对着模型一步一步搭 Minecraft 建筑";
    let _ = y ? w?.button : "去看看";
    return <div className={`mcb-annc${preview ? " mcb-annc-preview" : ""}${w?.sessionOnly ? " mcb-annc-unified" : ""}`} role="region" aria-label={y && w ? D[w.type] : "新功能"}>{href && preview ? <div className="mcb-annc-link"><b className="mcb-annc-title">{T}</b><span className="mcb-annc-t">{C}</span><span className="mcb-annc-go">{_}<s.A aria-hidden/></span></div> : href ? <_o className="mcb-annc-link" href={href} onClick={()=>{
        if (!preview) {
            if (!enableDynamic) {
                return void MP("step_entry_link", {
                    from: "site_banner",
                    path
                });
            }
            if (w) {
                MP("site_banner_go", {
                    id: w.id
                });
                if (href?.startsWith("/buildings/step-teaching")) {
                    MP("step_entry_link", {
                        from: "site_banner"
                    });
                }
            }
        }
    }}><b className="mcb-annc-title">{T}</b><span className="mcb-annc-t">{C}</span><span className="mcb-annc-go">{_}<s.A aria-hidden/></span></_o> : <div className="mcb-annc-link"><b className="mcb-annc-title">{T}</b><span className="mcb-annc-t">{C}</span>{_ && <span className="mcb-annc-go">{_}</span>}</div>}<button type="button" className="mcb-annc-x" aria-label="关闭" onClick={()=>{
        if (!preview) {
            try {
                (w?.sessionOnly ? sessionStorage : localStorage).setItem(k, "1");
            } catch (e) {}
            document.documentElement.setAttribute(h, "");
            MP("site_banner_close", {
                path
            });
        }
    }} disabled={preview}><A aria-hidden/></button></div>;
}
export { GComponent as A };
(function(e = m) {
    let t = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
    `try{if(${t ? "sessionStorage" : "localStorage"}.getItem(${JSON.stringify(e)})==='1')document.documentElement.setAttribute(${JSON.stringify(h)},'')}catch(e){}`;
})(m);
