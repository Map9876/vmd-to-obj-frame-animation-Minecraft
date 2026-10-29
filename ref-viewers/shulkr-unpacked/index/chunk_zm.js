const zm = /^\/(?!\/)[\w\-/.]*$/;
export function Bm() {
    if (typeof window > `u`) {
        return;
    }
    let e = window.location.pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, ``);
    if (zm.test(e)) {
        return e;
    }
}
