const Im = [
    `#5d7d22`,
    `#9a5cb4`,
    `#a8602f`,
    `#4a7ba6`,
    `#7a3344`,
    `#5b8c6e`,
    `#7a6234`,
    `#34766f`
];
export function Lm(e) {
    let t = 0;
    for(let n = 0; n < e.length; n++){
        t = t * 31 + e.charCodeAt(n) | 0;
    }
    return Im[Math.abs(t) % Im.length];
}
