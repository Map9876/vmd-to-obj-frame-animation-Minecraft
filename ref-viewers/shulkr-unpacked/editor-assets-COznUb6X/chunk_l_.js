const l_ = {
    302: `ENVMAP_MODE_REFRACTION`
};
export function u_(e) {
    if (e.envMap === false) {
        return `ENVMAP_MODE_REFLECTION`;
    }
    return l_[e.envMapMode] || `ENVMAP_MODE_REFLECTION`;
}
