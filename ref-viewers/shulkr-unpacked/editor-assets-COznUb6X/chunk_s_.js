const s_ = {
    301: `ENVMAP_TYPE_CUBE`,
    302: `ENVMAP_TYPE_CUBE`,
    306: `ENVMAP_TYPE_CUBE_UV`
};
export function c_(e) {
    if (e.envMap === false) {
        return `ENVMAP_TYPE_CUBE`;
    }
    return s_[e.envMapMode] || `ENVMAP_TYPE_CUBE`;
}
