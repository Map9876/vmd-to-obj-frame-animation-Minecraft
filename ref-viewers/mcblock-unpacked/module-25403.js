export function getDynamicParam(e, param, r, n, o) {
    let i = e[param];
    if (o && o.has(param)) {
        i = o.get(param);
    } else if (Array.isArray(i)) {
        i = i.map((e)=>encodeURIComponent(e));
    } else if (typeof i === "string") {
        i = encodeURIComponent(i);
    }
    if (!i) {
        let o = r === "oc";
        if (r === "c" || o) {
            if (o) {
                return {
                    param,
                    value: null,
                    type: r,
                    treeSegment: [
                        param,
                        "",
                        r
                    ]
                };
            }
            return {
                param,
                value: i = n.split("/").slice(1).flatMap((t)=>{
                    let n = parseParameter(t);
                    return e[n.key] ?? n.key;
                }),
                type: r,
                treeSegment: [
                    param,
                    i.join("/"),
                    r
                ]
            };
        }
    }
    return {
        param,
        value: i,
        treeSegment: [
            param,
            Array.isArray(i) ? i.join("/") : i,
            r
        ],
        type: r
    };
}
export let PARAMETER_PATTERN = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
export function parseParameter(e) {
    let t = e.match(PARAMETER_PATTERN);
    if (t) {
        return parseMatchedParameter(t[2]);
    }
    return parseMatchedParameter(e);
}
export function parseMatchedParameter(e) {
    let optional = e.startsWith("[") && e.endsWith("]");
    if (optional) {
        e = e.slice(1, -1);
    }
    let repeat = e.startsWith("...");
    if (repeat) {
        e = e.slice(3);
    }
    return {
        key: e,
        repeat,
        optional
    };
}
