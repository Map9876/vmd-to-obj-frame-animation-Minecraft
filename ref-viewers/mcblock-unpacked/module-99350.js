function l(e) {
    if (e && typeof e.catch === "function") {
        e.catch(()=>{});
    }
}
export function gG(e, t) {
    if (!e) {
        return;
    }
    let n = e.requestFullscreen || e.webkitRequestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen;
    if (typeof n !== "function") {
        t?.(Error("fullscreen API unavailable"));
        return;
    }
    try {
        let r = n.call(e);
        if (r && typeof r.catch === "function") {
            r.catch((e)=>t?.(e));
        }
        l(r);
    } catch (error) {
        t?.(error);
    }
}
export function gU(e, t) {
    if (e) {
        if ((()=>{
            if (typeof document === "undefined") {
                return null;
            }
            let e = document;
            return document.fullscreenElement || e.webkitFullscreenElement || null;
        })()) {
            (()=>{
                if (typeof document === "undefined") {
                    return;
                }
                let e = document;
                let t = document.exitFullscreen || e.webkitExitFullscreen || e.mozCancelFullScreen || e.msExitFullscreen;
                if (typeof t === "function") {
                    try {
                        l(t.call(document));
                    } catch (e) {}
                }
            })();
        } else {
            gG(e, t);
        }
    }
}
