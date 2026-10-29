export const uc = `shulkr:module-reload`;
const dc = 5 * 60000;
const fc = 3;
const pc = [
    0,
    1000,
    5000
];
export const mc = `_fresh`;
let hc = false;
function gc() {
    if (hc) {
        return true;
    }
    let e;
    try {
        let t = Date.now();
        let n;
        try {
            n = JSON.parse(sessionStorage.getItem(uc) ?? `[]`);
        } catch  {
            n = [];
        }
        e = (Array.isArray(n) ? n : []).filter((e)=>typeof e == `number` && t - e < dc);
        if (e.length >= fc) {
            return false;
        }
        sessionStorage.setItem(uc, JSON.stringify([
            ...e,
            t
        ]));
    } catch  {
        return false;
    }
    hc = true;
    let e_length = e.length;
    let n = pc[Math.min(e_length, pc.length - 1)];
    window.setTimeout(()=>{
        if (e_length === 0) {
            window.location.reload();
            return;
        }
        let e = new URL(window.location.href);
        e.searchParams.set(mc, String(Date.now()));
        window.location.replace(e.toString());
    }, n);
    return true;
}
export async function _c(e) {
    try {
        return await e();
    } catch (error) {
        if (gc()) {
            return new Promise(()=>{});
        }
        throw error;
    }
}
export let vc = false;
export function yc() {
    if (typeof window > `u` || vc) {
        return;
    }
    vc = true;
    let e = ()=>{
        let e = new URL(window.location.href);
        if (e.searchParams.has(mc)) {
            e.searchParams.delete(mc);
            window.history.replaceState(window.history.state, ``, e.toString());
        }
    };
    if (document.readyState === `complete`) {
        e();
    } else {
        window.addEventListener(`load`, e, {
            once: true
        });
    }
    window.addEventListener(`vite:preloadError`, (e)=>{
        if (gc()) {
            e.preventDefault();
        }
    });
}
