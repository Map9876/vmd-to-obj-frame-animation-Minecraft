let n = (e)=>{
    let t;
    let i = new Set;
    let setState = (e, n)=>{
        let r = typeof e === "function" ? e(t) : e;
        if (!Object.is(r, t)) {
            let e = t;
            t = n ?? (typeof r !== "object" || r === null) ? r : {
                ...t,
                ...r
            };
            i.forEach((i)=>i(t, e));
        }
    };
    let getState = ()=>t;
    let o = {
        setState,
        getState,
        getInitialState: ()=>s,
        subscribe: (e)=>{
            i.add(e);
            return ()=>i.delete(e);
        }
    };
    let s = t = e(setState, getState, o);
    return o;
};
export let y = (e)=>{
    if (e) {
        return n(e);
    }
    return n;
};
