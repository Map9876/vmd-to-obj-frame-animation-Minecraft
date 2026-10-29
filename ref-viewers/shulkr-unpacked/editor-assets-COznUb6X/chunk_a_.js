const a_ = {
    1: `SHADOWMAP_TYPE_PCF`,
    3: `SHADOWMAP_TYPE_VSM`
};
export function o_(e) {
    return a_[e.shadowMapType] || `SHADOWMAP_TYPE_BASIC`;
}
