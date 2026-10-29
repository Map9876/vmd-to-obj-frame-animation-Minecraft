let z;
for(var L = 256, R = []; L--;){
    R[L] = (L + 256).toString(16).substring(1);
}
export function de() {
    let e = 0;
    let t;
    let n = ``;
    if (!z || L + 16 > 256) {
        z = Array(256);
        for(e = 256; e--;){
            z[e] = 256 * Math.random() | 0;
        }
        e = 0;
        L = 0;
    }
    for(; e < 16; e++){
        t = z[L + e];
        switch(e){
            case 6:
                n += R[t & 15 | 64];
                break;
            case 8:
                n += R[t & 63 | 128];
                break;
            default:
                n += R[t];
        }
        if (e & 1 && e > 1 && e < 11) {
            n += `-`;
        }
    }
    L++;
    return n;
}
