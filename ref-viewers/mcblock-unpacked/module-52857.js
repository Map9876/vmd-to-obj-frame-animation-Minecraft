import { useCallback, useEffect, useRef, useState } from "./module-61426.js";
import { getSession } from "./module-36489.js";
export function v(t) {
    let [e, setE] = useState(null);
    let rRef = useRef(null);
    let openOAuth = useCallback((t, e)=>{
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = e;
            return;
        }
        let l = Math.max(0, Math.round(window.screenX + (window.outerWidth - 520) / 2));
        let o = Math.max(0, Math.round(window.screenY + (window.outerHeight - 640) / 2));
        let s = window.open(e, "mcblock_oauth", `width=${520},height=${640},left=${l},top=${o},toolbar=no,menubar=no,location=no,status=no`);
        if (!s) {
            window.location.href = e;
            return;
        }
        s.focus();
        rRef.current = s;
        setE(t);
    }, []);
    let cancelOAuth = useCallback(()=>{
        try {
            rRef.current?.close();
        } catch (t) {}
        rRef.current = null;
        setE(null);
    }, []);
    useEffect(()=>{
        if (!e) {
            return;
        }
        let l = false;
        let s = window.setInterval(async ()=>{
            if (!l) {
                if (rRef.current?.closed) {
                    l = true;
                    window.clearInterval(s);
                    rRef.current = null;
                    setE(null);
                    return;
                }
                try {
                    let e = await getSession();
                    if (e?.user && !l) {
                        l = true;
                        window.clearInterval(s);
                        try {
                            rRef.current?.close();
                        } catch (t) {}
                        window.location.href = t || "/";
                    }
                } catch (t) {}
            }
        }, 1500);
        return ()=>window.clearInterval(s);
    }, [
        t,
        e
    ]);
    return {
        waiting: e,
        openOAuth,
        cancelOAuth
    };
}
