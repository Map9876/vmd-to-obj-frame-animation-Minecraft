export function nt(e) {
    return "isRelative" in e;
}
export function kg(e, t) {
    let isRelative = e.indexOf("://") <= 0 && e.indexOf("//") !== 0;
    let n = t ?? (isRelative ? "thismessage:/" : undefined);
    try {
        if ("canParse" in URL && !URL.canParse(e, n)) {
            return;
        }
        let t = new URL(e, n);
        if (isRelative) {
            return {
                isRelative,
                pathname: t.pathname,
                search: t.search,
                hash: t.hash
            };
        }
        return t;
    } catch  {}
}
export function CH(e) {
    if (nt(e)) {
        return e.pathname;
    }
    let t = new URL(e);
    t.search = "";
    t.hash = "";
    if ([
        "80",
        "443"
    ].includes(t.port)) {
        t.port = "";
    }
    if (t.password) {
        t.password = "%filtered%";
    }
    if (t.username) {
        t.username = "%filtered%";
    }
    return t.toString();
}
export function Dl(e) {
    if (!e) {
        return {};
    }
    let t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!t) {
        return {};
    }
    let search = t[6] || "";
    let hash = t[8] || "";
    return {
        host: t[4],
        path: t[5],
        protocol: t[2],
        search,
        hash,
        relative: t[5] + search + hash
    };
}
export function f(e) {
    return e.split(/[?#]/, 1)[0];
}
export function zm(e, t = true) {
    if (e.startsWith("data:")) {
        let r = e.match(/^data:([^;,]+)/);
        let n = r ? r[1] : "text/plain";
        let a = e.includes(";base64,");
        let o = e.indexOf(",");
        let i = "";
        if (t && o !== -1) {
            let t = e.slice(o + 1);
            i = t.length > 10 ? `${t.slice(0, 10)}... [truncated]` : t;
        }
        return `data:${n}${a ? ",base64" : ""}${i ? `,${i}` : ""}`;
    }
    return e;
}
