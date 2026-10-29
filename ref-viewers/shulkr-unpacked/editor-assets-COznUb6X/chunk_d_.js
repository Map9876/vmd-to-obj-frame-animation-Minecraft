const d_ = {
    0: `ENVMAP_BLENDING_MULTIPLY`,
    1: `ENVMAP_BLENDING_MIX`,
    2: `ENVMAP_BLENDING_ADD`
};
export function f_(e) {
    if (e.envMap === false) {
        return `ENVMAP_BLENDING_NONE`;
    }
    return d_[e.combine] || `ENVMAP_BLENDING_NONE`;
}
export function y_() {
    let e = new WeakMap;
    function has(t) {
        return e.has(t);
    }
    function get(t) {
        let n = e.get(t);
        if (n === undefined) {
            n = {};
            e.set(t, n);
        }
        return n;
    }
    function remove(t) {
        e.delete(t);
    }
    function update(t, n, r) {
        e.get(t)[n] = r;
    }
    function dispose() {
        e = new WeakMap;
    }
    return {
        has,
        get,
        remove,
        update,
        dispose
    };
}
