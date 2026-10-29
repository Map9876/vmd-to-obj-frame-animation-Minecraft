function qn(when, t) {
    let n = when.match(/[A-Za-z_][\w.]*|[!&|()]/g) ?? [];
    let r = 0;
    let i = ()=>n[r];
    let a = ()=>n[r++];
    let o = (e)=>{
        let n = e.split(`.`);
        if (n.length === 2) {
            return t[n[0]]?.[n[1]] === true;
        }
        if (n.length === 3) {
            return t[n[0]]?.[n[1]] === n[2];
        }
        return false;
    };
    let s = ()=>{
        if (i() === `!`) {
            a();
            return !s();
        }
        if (i() === `(`) {
            a();
            let e = l();
            if (i() === `)`) {
                a();
            }
            return e;
        }
        let e = a();
        if (e === undefined) {
            return false;
        }
        return o(e);
    };
    let c = ()=>{
        let e = s();
        while(i() === `&`){
            a();
            let t = s();
            e &&= t;
        }
        return e;
    };
    let l = ()=>{
        let e = c();
        while(i() === `|`){
            a();
            let t = c();
            e ||= t;
        }
        return e;
    };
    return l();
}
export function Jn(e, t) {
    for (let n of e){
        if (!n.when || qn(n.when, t)) {
            return n;
        }
    }
    return null;
}
