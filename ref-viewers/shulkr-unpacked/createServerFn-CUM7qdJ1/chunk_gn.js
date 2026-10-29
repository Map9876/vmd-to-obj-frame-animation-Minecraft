const gn = 1000;
function _n(mode, t) {
    let refs = t.refs || new Map;
    if (!(`types` in refs)) {
        Object.assign(refs, {
            types: new Map
        });
    }
    return {
        mode,
        plugins: t.plugins,
        refs,
        features: t.features ?? 127 ^ (t.disabledFeatures || 0),
        depthLimit: t.depthLimit || gn
    };
}
export function vn(e) {
    return {
        mode: 2,
        base: _n(2, e),
        child: undefined
    };
}
