import { useCallback, useRef } from "./module-61426.js";
export function V() {
    let eRef = useRef(null);
    let getToken = useCallback(async (...args)=>{
        let t = args.length > 0 && args[0] !== undefined && args[0];
        if (!t && eRef.current) {
            return eRef.current;
        }
        try {
            let t = await fetch("/api/csrf-token", {
                method: "GET",
                credentials: "include"
            });
            if (!t.ok) {
                return null;
            }
            eRef.current = (await t.json()).csrfToken || null;
            return eRef.current;
        } catch (e) {
            return null;
        }
    }, []);
    let fetchWithCsrf = useCallback(async (e, r)=>{
        let n = async (n)=>{
            let a = await getToken(n);
            let headers = new Headers(r?.headers);
            if (a) {
                headers.set("x-csrf-token", a);
            }
            return fetch(e, {
                ...r,
                headers,
                credentials: "include"
            });
        };
        let a = await n(false);
        if (a.status === 403) {
            try {
                let e = await a.clone().json();
                if (e?.code === "CSRF_VALIDATION_FAILED" || e?.error === "CSRF验证失败") {
                    a = await n(true);
                }
            } catch (e) {}
        }
        return a;
    }, [
        getToken
    ]);
    return {
        getToken,
        fetchWithCsrf
    };
}
