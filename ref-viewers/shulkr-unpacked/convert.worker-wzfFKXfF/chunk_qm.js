export function qm(e) {
    let t = Number(e & 4294967295n) | 0;
    return [
        Number(e >> 32n & 4294967295n) | 0,
        t
    ];
}
export function Jm(e) {
    return qm(BigInt(e));
}
