function pe(issues, t) {
    let n = new Map;
    for (let r of issues){
        let e = r.path ?? [];
        let i = t;
        let a = ``;
        for(let t = 0; t < e.length; t++){
            let n = e[t];
            if (n === undefined) {
                continue;
            }
            let r = typeof n == `object` ? n.key : n;
            let o = Number(r);
            if (Array.isArray(i) && !Number.isNaN(o)) {
                a += `[${o}]`;
            } else {
                a += (t > 0 ? `.` : ``) + String(r);
            }
            i = typeof i == `object` && i ? i[r] : undefined;
        }
        n.set(a, (n.get(a) ?? []).concat(r));
    }
    return Object.fromEntries(n);
}
const me = (issues, t)=>{
    let n = pe(issues, t);
    return {
        form: n,
        fields: n
    };
};
export const U = {
    validate ({ value, validationSource }, n) {
        let r = n[`~standard`].validate(value);
        if (r instanceof Promise) {
            throw Error(`async function passed to sync validator`);
        }
        if (r.issues) {
            if (validationSource === `field`) {
                return r.issues;
            }
            return me(r.issues, value);
        }
    },
    async validateAsync ({ value, validationSource }, n) {
        let r = await n[`~standard`].validate(value);
        if (r.issues) {
            if (validationSource === `field`) {
                return r.issues;
            }
            return me(r.issues, value);
        }
    }
};
export const he = (e)=>!!e && `~standard` in e;
export const W = {
    isValidating: false,
    isTouched: false,
    isBlurred: false,
    isDirty: false,
    isPristine: true,
    isValid: true,
    isDefaultValue: true,
    errors: [],
    errorMap: {},
    errorSourceMap: {},
    _arrayVersion: 0,
    _pendingValidationsCount: 0
};
