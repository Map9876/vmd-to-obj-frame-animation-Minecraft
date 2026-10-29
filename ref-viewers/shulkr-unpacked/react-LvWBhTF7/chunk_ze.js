function ze(e, t) {
    if (t) {
        return {
            ...e,
            ...t,
            ...Object.keys(e).reduce((acc, key)=>{
                acc[key] = {
                    ...e[key],
                    ...t[key]
                };
                return acc;
            }, {})
        };
    }
    return e;
}
export function Be(e, t) {
    if (t) {
        return Object.keys(e).reduce((acc, key)=>{
            acc[key] = ze(e[key], t[key]);
            return acc;
        }, {
            ...e
        });
    }
    return e;
}
