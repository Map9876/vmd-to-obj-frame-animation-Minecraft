function Fe(stateKey) {
    let t = stateKey.indexOf(`[`);
    let id = t === -1 ? stateKey : stateKey.slice(0, t);
    let r = id.indexOf(`:`);
    let namespace = r === -1 ? `minecraft` : id.slice(0, r);
    let name = r === -1 ? id : id.slice(r + 1);
    if (t === -1) {
        return {
            id,
            namespace,
            name,
            stateKey
        };
    }
    let properties = {};
    for (let n of stateKey.slice(t + 1, -1).split(`,`)){
        let e = n.indexOf(`=`);
        if (e > 0) {
            properties[n.slice(0, e)] = n.slice(e + 1);
        }
    }
    return {
        id,
        namespace,
        name,
        stateKey,
        properties
    };
}
export function Ie(e) {
    let t = e.varint();
    let n = [
        null
    ];
    for(let r = 0; r < t; r++){
        n.push(Fe(e.string()));
    }
    return n;
}
