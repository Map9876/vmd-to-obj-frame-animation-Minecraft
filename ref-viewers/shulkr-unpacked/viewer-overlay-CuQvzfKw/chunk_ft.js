import { n } from "../dist-C5TDMOul.js";
const ft = 1500;
const pt = 5000;
const mt = 1.35;
const ht = n + 30000;
export function gt(e, t) {
    if (e > ht) {
        return {
            kind: `give-up`
        };
    }
    return {
        kind: `ask`,
        delayMs: Math.min(pt, Math.round(ft * mt ** t))
    };
}
