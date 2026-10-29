export function extractInfoFromServerReferenceId(e) {
    let t = parseInt(e.slice(0, 2), 16);
    let r = t >> 1 & 63;
    let usedArgs = Array(6);
    for(let e = 0; e < 6; e++){
        let t = r >> 5 - e & 1;
        usedArgs[e] = t === 1;
    }
    return {
        type: (t >> 7 & 1) == 1 ? "use-cache" : "server-action",
        usedArgs,
        hasRestArgs: (1 & t) == 1
    };
}
export function omitUnusedArgs(e, t) {
    let r = Array(e.length);
    for(let n = 0; n < e.length; n++){
        if (n < 6 && t.usedArgs[n] || n >= 6 && t.hasRestArgs) {
            r[n] = e[n];
        }
    }
    return r;
}
