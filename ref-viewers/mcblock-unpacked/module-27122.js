import { KU, o5, rm } from "./module-2257.js";
import { Vu, fj, qO } from "./module-24617.js";
import { li } from "./module-71350.js";
import { Om } from "./module-3055.js";
import { O } from "./module-49636.js";
export function Cp(e, t) {
    return o5().captureException(e, li(t));
}
export function r(e, t) {
    return o5().captureEvent(e, t);
}
export function o(e, t) {
    rm().setContext(e, t);
}
export function Ol() {
    let e = KU();
    return e?.getOptions().enabled !== false && !!e?.getTransport();
}
export function SA(e) {
    rm().addEventProcessor(e);
}
export function J0(e) {
    let t = rm();
    let { user } = Om(t, o5());
    let { userAgent } = O.navigator || {};
    let l = fj({
        user,
        ...userAgent && {
            userAgent
        },
        ...e
    });
    let u = t.getSession();
    if (u?.status === "ok") {
        qO(u, {
            status: "exited"
        });
    }
    h();
    t.setSession(l);
    return l;
}
function h() {
    let e = rm();
    let t = o5().getSession() || e.getSession();
    if (t) {
        Vu(t);
    }
    _();
    e.setSession();
}
function _() {
    let e = rm();
    let t = KU();
    let r = e.getSession();
    if (r && t) {
        t.captureSession(r);
    }
}
export function J5(e = false) {
    if (e) {
        return void h();
    }
    _();
}
