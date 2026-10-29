export function La(e) {
    return typeof e == `string` || Ra(e);
}
function Ra(e) {
    return !!(e && typeof e == `object` && `byteLength` in e && `byteOffset` in e);
}
