const ne = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
export function re(e) {
    if (e.length === 0) {
        throw Error(`Number skeleton cannot be empty`);
    }
    let t = e.split(ne).filter((e)=>e.length > 0);
    let n = [];
    for (let e of t){
        let t = e.split(`/`);
        if (t.length === 0) {
            throw Error(`Invalid number skeleton`);
        }
        let [stem, ...i] = t;
        for (let e of i){
            if (e.length === 0) {
                throw Error(`Invalid number skeleton`);
            }
        }
        n.push({
            stem,
            options: i
        });
    }
    return n;
}
