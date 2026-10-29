import { eJ } from "./module-28385.js";
import { zf } from "./module-87624.js";
export function fj(e) {
    let t = zf();
    let r = {
        sid: eJ(),
        init: true,
        timestamp: t,
        started: t,
        duration: 0,
        status: "ok",
        errors: 0,
        ignoreDuration: false,
        toJSON: ()=>{
            var e;
            e = r;
            return {
                sid: `${e.sid}`,
                init: e.init,
                started: new Date(1000 * e.started).toISOString(),
                timestamp: new Date(1000 * e.timestamp).toISOString(),
                status: e.status,
                errors: e.errors,
                did: typeof e.did === "number" || typeof e.did === "string" ? `${e.did}` : undefined,
                duration: e.duration,
                abnormal_mechanism: e.abnormal_mechanism,
                attrs: {
                    release: e.release,
                    environment: e.environment,
                    ip_address: e.ipAddress,
                    user_agent: e.userAgent
                }
            };
        }
    };
    if (e) {
        qO(r, e);
    }
    return r;
}
export function qO(e, t = {}) {
    if (t.user) {
        if (!e.ipAddress && t.user.ip_address) {
            e.ipAddress = t.user.ip_address;
        }
        if (!(e.did || t.did)) {
            e.did = t.user.id || t.user.email || t.user.username;
        }
    }
    e.timestamp = t.timestamp || zf();
    if (t.abnormal_mechanism) {
        e.abnormal_mechanism = t.abnormal_mechanism;
    }
    if (t.ignoreDuration) {
        e.ignoreDuration = t.ignoreDuration;
    }
    if (t.sid) {
        e.sid = t.sid.length === 32 ? t.sid : eJ();
    }
    if (t.init !== undefined) {
        e.init = t.init;
    }
    if (!e.did && t.did) {
        e.did = `${t.did}`;
    }
    if (typeof t.started === "number") {
        e.started = t.started;
    }
    if (e.ignoreDuration) {
        e.duration = undefined;
    } else if (typeof t.duration === "number") {
        e.duration = t.duration;
    } else {
        let t = e.timestamp - e.started;
        e.duration = t >= 0 ? t : 0;
    }
    if (t.release) {
        e.release = t.release;
    }
    if (t.environment) {
        e.environment = t.environment;
    }
    if (!e.ipAddress && t.ipAddress) {
        e.ipAddress = t.ipAddress;
    }
    if (!e.userAgent && t.userAgent) {
        e.userAgent = t.userAgent;
    }
    if (typeof t.errors === "number") {
        e.errors = t.errors;
    }
    if (t.status) {
        e.status = t.status;
    }
}
export function Vu(e, status) {
    let r = {};
    if (status) {
        r = {
            status
        };
    } else if (e.status === "ok") {
        r = {
            status: "exited"
        };
    }
    qO(e, r);
}
