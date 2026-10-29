export const ua = {
    current: null
};
export const da = {
    current: false
};
const fa = typeof window < `u`;
export function pa() {
    da.current = true;
    if (fa) {
        if (window.matchMedia) {
            let e = window.matchMedia(`(prefers-reduced-motion)`);
            let t = ()=>ua.current = e.matches;
            e.addEventListener(`change`, t);
            t();
        } else {
            ua.current = false;
        }
    }
}
