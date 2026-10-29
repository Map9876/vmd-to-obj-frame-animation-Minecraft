function Ca(e) {
    return e === undefined || e === 1;
}
export function wa({ scale, scaleX, scaleY }) {
    return !Ca(scale) || !Ca(scaleX) || !Ca(scaleY);
}
