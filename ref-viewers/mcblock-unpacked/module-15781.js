function r(e, t, n = false) {
    if (t) {
        return Object.keys(e).filter((e)=>{
            if (n) {
                return !t.includes(e);
            }
            return t.includes(e);
        }).reduce((acc, key)=>{
            acc[key] = e[key];
            return acc;
        }, {});
    }
    return {};
}
export function formatUrl(e, t, r, n) {
    let a = n && Object.keys(n).length > 0 ? new URL(Object.values(n)[0], e) : new URL(e);
    if (t && r) {
        t.forEach((e)=>{
            if (r[e]) {
                a.searchParams.set(e, r[e]);
            }
        });
    }
    return a.toString();
}
export function createHtml(e, t, r, a, o) {
    if (!t) {
        return `<${e}></${e}>`;
    }
    let s = t.src?.url ? {
        ...t,
        src: formatUrl(t.src.url, t.src.params, a, o)
    } : t;
    let u = Object.keys({
        ...s,
        ...r
    }).reduce((acc, key)=>{
        let n = r?.[key];
        let a = s[key];
        let o = n ?? a;
        let l = o === true ? key : `${key}="${o}"`;
        if (o) {
            return acc + ` ${l}`;
        }
        return acc;
    }, "");
    return `<${e}${u}></${e}>`;
}
export const formatData = function(e, t) {
    let d = r(t, e.scripts?.reduce((e, t)=>[
            ...e,
            ...Array.isArray(t.params) ? t.params : []
        ], []));
    let c = r(t, e.html?.attributes.src?.params);
    let g = r(t, [
        e.html?.attributes.src?.slugParam
    ]);
    let f = r(t, [
        ...Object.keys(d),
        ...Object.keys(c),
        ...Object.keys(g)
    ], true);
    return {
        ...e,
        html: e.html ? createHtml(e.html.element, e.html.attributes, f, c, g) : null,
        scripts: e.scripts ? e.scripts.map((e)=>({
                ...e,
                url: formatUrl(e.url, e.params, d)
            })) : null
    };
};
