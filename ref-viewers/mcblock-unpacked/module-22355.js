import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "./module-61426.js";
import { useSession } from "./module-36489.js";
import "./module-61276.js";
import "./module-40621.js";
let counts = {
    SYSTEM: 0,
    SOCIAL: 0,
    total: 0
};
let OContext = createContext(null);
let i = {
    unreadCount: 0,
    counts,
    isLoading: false,
    isConnected: false,
    refresh: async ()=>{}
};
export function qO({ children }) {
    let value = (()=>{
        let { data } = useSession();
        let [n, setN] = useState(counts);
        let [i, setI] = useState(false);
        let [c, setC] = useState(false);
        let uRef = useRef(0);
        let x = data?.user?.id;
        let refresh = useCallback(async ()=>{
            if (x) {
                try {
                    let e = await fetch("/api/notifications/unread-count", {
                        cache: "no-store"
                    });
                    let t = await e.json();
                    if (t.success) {
                        setN(t.data || {
                            ...counts,
                            total: t.count || 0
                        });
                    }
                } catch (error) {
                    console.error("获取未读数量失败:", error);
                }
            }
        }, [
            x
        ]);
        useEffect(()=>{
            if (!x) {
                setN(counts);
                setC(false);
                return;
            }
            setC(true);
            setI(true);
            refresh().finally(()=>setI(false));
            let e = ()=>{
                if (!(document.hidden || Date.now() - uRef.current < 500)) {
                    uRef.current = Date.now();
                    refresh();
                }
            };
            let t = window.setInterval(()=>{
                if (!document.hidden) {
                    refresh();
                }
            }, 60000);
            document.addEventListener("visibilitychange", e);
            window.addEventListener("focus", e);
            return ()=>{
                window.clearInterval(t);
                document.removeEventListener("visibilitychange", e);
                window.removeEventListener("focus", e);
            };
        }, [
            x,
            refresh
        ]);
        return useMemo(()=>({
                unreadCount: n.total,
                counts: n,
                isLoading: i,
                isConnected: c,
                refresh
            }), [
            n,
            i,
            c,
            refresh
        ]);
    })();
    return <OContext.Provider value={value}>{children}</OContext.Provider>;
}
export function U4() {
    let e = useContext(OContext);
    return e || i;
}
