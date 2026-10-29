import { n, s as s_1, t } from "../jsx-runtime-Db0DjQYK.js";
export const o = t();
export const s = s_1(n(), 1);
export const c = s.createContext({});
export function l(e) {
    let tRef = s.useRef(null);
    if (tRef.current === null) {
        tRef.current = e();
    }
    return tRef.current;
}
export const u = typeof window < `u` ? s.useLayoutEffect : s.useEffect;
export const d = s.createContext(null);
