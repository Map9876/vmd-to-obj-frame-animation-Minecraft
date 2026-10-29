export default function(e) {
    let r = new URL("http://localhost:3000/api/auth");
    if (e && !e.startsWith("http")) {
        e = `https://${e}`;
    }
    let n = new URL(e ?? r);
    let path = (n.pathname === "/" ? r.pathname : n.pathname).replace(/\/$/, "");
    let base = `${n.origin}${path}`;
    return {
        origin: n.origin,
        host: n.host,
        path,
        base,
        toString: ()=>base
    };
};
