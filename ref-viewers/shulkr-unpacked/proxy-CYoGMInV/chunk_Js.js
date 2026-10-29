function Js(e, t) {
    if (typeof e == `function`) {
        return e(t);
    }
    if (e != null) {
        e.current = t;
    }
}
export function Ys(...e) {
    return (t)=>{
        let n = false;
        let r = e.map((e)=>{
            let r = Js(e, t);
            if (!n && typeof r == `function`) {
                n = true;
            }
            return r;
        });
        if (n) {
            return ()=>{
                for(let t = 0; t < r.length; t++){
                    let n = r[t];
                    if (typeof n == `function`) {
                        n();
                    } else {
                        Js(e[t], null);
                    }
                }
            };
        }
    };
}
