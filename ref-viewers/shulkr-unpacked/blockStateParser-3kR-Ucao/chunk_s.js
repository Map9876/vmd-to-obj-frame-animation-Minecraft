export function s(e) {
    if (e === `true`) {
        return true;
    }
    if (e === `false`) {
        return false;
    }
    let t = Number(e);
    if (!Number.isNaN(t) && e !== ``) {
        return t;
    }
    return e;
}
export function c(e) {
    let t = e.indexOf(`[`);
    if (t === -1) {
        return {
            name: e,
            properties: {}
        };
    }
    let name = e.slice(0, t);
    let r = e.slice(t + 1, e.length - 1);
    let properties = {};
    for (let e of r.split(`,`)){
        let t = e.indexOf(`=`);
        if (t !== -1) {
            properties[e.slice(0, t)] = s(e.slice(t + 1));
        }
    }
    return {
        name,
        properties
    };
}
