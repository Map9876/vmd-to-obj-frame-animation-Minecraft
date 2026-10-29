function t(e) {
    return !!e.constructor && typeof e.constructor.isBuffer === "function" && e.constructor.isBuffer(e);
}
export default function(e) {
    let r;
    return e != null && (t(e) || typeof (r = e).readFloatLE === "function" && typeof r.slice === "function" && t(r.slice(0, 0)) || !!e._isBuffer);
};
