function Wr(e) {
    if (Array.isArray(e)) {
        return e.flatMap((e)=>Wr(e));
    }
    if (typeof e != `string`) {
        return [];
    }
    let t = [];
    let n = 0;
    let r;
    let i;
    let a;
    let o;
    let s;
    let c = ()=>{
        while(n < e.length && /\s/.test(e.charAt(n))){
            n += 1;
        }
        return n < e.length;
    };
    let l = ()=>{
        i = e.charAt(n);
        return i !== `=` && i !== `;` && i !== `,`;
    };
    while(n < e.length){
        r = n;
        for(s = false; c();){
            i = e.charAt(n);
            if (i === `,`) {
                a = n;
                n += 1;
                c();
                for(o = n; n < e.length && l();){
                    n += 1;
                }
                if (n < e.length && e.charAt(n) === `=`) {
                    s = true;
                    n = o;
                    t.push(e.slice(r, a));
                    r = n;
                } else {
                    n = a + 1;
                }
            } else {
                n += 1;
            }
        }
        if (!s || n >= e.length) {
            t.push(e.slice(r));
        }
    }
    return t;
}
function Gr(item) {
    if (item instanceof Headers) {
        return item;
    }
    if (Array.isArray(item) || typeof item == `object`) {
        return new Headers(item);
    }
    return null;
}
export function Kr(...e) {
    return e.reduce((acc, item)=>{
        let n = Gr(item);
        if (!n) {
            return acc;
        }
        for (let [t, r] of n.entries()){
            if (t === `set-cookie`) {
                Wr(r).forEach((t)=>acc.append(`set-cookie`, t));
            } else {
                acc.set(t, r);
            }
        }
        return acc;
    }, new Headers);
}
