import { rn } from "../useScrollLock-B98zsivK.js";
export function wu(e, t) {
    if (t != null && !rn(t)) {
        return 0;
    }
    if (typeof e == `function`) {
        return e();
    }
    return e;
}
export function Tu(e, t, n) {
    let r = wu(e, n);
    if (typeof r == `number`) {
        return r;
    }
    return r?.[t];
}
