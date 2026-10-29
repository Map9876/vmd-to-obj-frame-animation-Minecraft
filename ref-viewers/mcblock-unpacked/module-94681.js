let r = {
    acceptCharset: "accept-charset",
    className: "class",
    htmlFor: "for",
    httpEquiv: "http-equiv",
    noModule: "noModule"
};
let n = [
    "onLoad",
    "onReady",
    "dangerouslySetInnerHTML",
    "children",
    "onError",
    "strategy",
    "stylesheets"
];
function a(e) {
    return [
        "async",
        "defer",
        "noModule"
    ].includes(e);
}
export function setAttributesFromProps(e, t) {
    for (let [o, i] of Object.entries(t)){
        if (!t.hasOwnProperty(o) || n.includes(o) || i === undefined) {
            continue;
        }
        let s = r[o] || o.toLowerCase();
        if (e.tagName === "SCRIPT" && a(s)) {
            e[s] = !!i;
        } else {
            e.setAttribute(s, String(i));
        }
        if (i === false || e.tagName === "SCRIPT" && a(s) && (!i || i === "false")) {
            e.setAttribute(s, "");
            e.removeAttribute(s);
        }
    }
}
