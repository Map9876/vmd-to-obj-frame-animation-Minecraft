let l = (a)=>{
    let t;
    let e = new Set;
    let setState = (a, l)=>{
        let s = typeof a === "function" ? a(t) : a;
        if (!Object.is(s, t)) {
            let a = t;
            t = l ?? (typeof s !== "object" || s === null) ? s : {
                ...t,
                ...s
            };
            e.forEach((e)=>e(t, a));
        }
    };
    let getState = ()=>t;
    let h = {
        setState,
        getState,
        getInitialState: ()=>v,
        subscribe: (a)=>{
            e.add(a);
            return ()=>e.delete(a);
        }
    };
    let v = t = a(setState, getState, h);
    return h;
};
export let y = (a)=>{
    if (a) {
        return l(a);
    }
    return l;
};
