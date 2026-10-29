import { T } from "./module-61571.js";
import { Yz, pq } from "./module-43275.js";
let o = /^o(\d+)\./;
let i = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;
export function SB({ host, path, pass, port, projectId, protocol, publicKey }, t = false) {
    return `${protocol}://${publicKey}${t && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path ? `${path}/` : path}${projectId}`;
}
export function hH(e) {
    let t = i.exec(e);
    if (!t) {
        return void pq(()=>{
            console.error(`Invalid Sentry Dsn: ${e}`);
        });
    }
    let [protocol, publicKey, pass = "", host = "", port = "", c = ""] = t.slice(1);
    let path = "";
    let projectId = c;
    let p = projectId.split("/");
    if (p.length > 1) {
        path = p.slice(0, -1).join("/");
        projectId = p.pop();
    }
    if (projectId) {
        let e = projectId.match(/^\d+/);
        if (e) {
            projectId = e[0];
        }
    }
    return u({
        host,
        pass,
        path,
        projectId,
        port,
        protocol,
        publicKey
    });
}
function u(e) {
    return {
        protocol: e.protocol,
        publicKey: e.publicKey || "",
        pass: e.pass || "",
        host: e.host,
        port: e.port || "",
        path: e.path || "",
        projectId: e.projectId
    };
}
export function ul(e) {
    let t;
    let r = e.getOptions();
    let { host } = e.getDsn() || {};
    if (r.orgId) {
        t = String(r.orgId);
    } else if (host) {
        t = ((host_1)=>{
            let t = host_1.match(o);
            return t?.[1];
        })(host);
    }
    return t;
}
export function AD(e) {
    let t = typeof e === "string" ? hH(e) : u(e);
    if (t && ((e)=>{
        if (!T) {
            return true;
        }
        let { port, projectId, protocol } = e;
        return ![
            "protocol",
            "publicKey",
            "host",
            "projectId"
        ].find((t)=>!e[t] && (Yz.error(`Invalid Sentry Dsn: ${t} missing`), true)) && (projectId.match(/^\d+$/) ? protocol !== "http" && protocol !== "https" ? (Yz.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`), false) : !(port && isNaN(parseInt(port, 10))) || (Yz.error(`Invalid Sentry Dsn: Invalid port ${port}`), false) : (Yz.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`), false));
    })(t)) {
        return t;
    }
}
