import { useState } from "./module-61426.js";
export function useRouterBFCache(tree, stateKey) {
    let [r, setR] = useState(()=>({
            tree,
            stateKey,
            next: null
        }));
    if (r.tree === tree) {
        return r;
    }
    let o = {
        tree,
        stateKey,
        next: null
    };
    let i = 1;
    let s = r;
    let l = o;
    while(s !== null && i < 1){
        if (s.stateKey === stateKey) {
            l.next = s.next;
            break;
        }
        {
            i++;
            let e = {
                tree: s.tree,
                stateKey: s.stateKey,
                next: null
            };
            l.next = e;
            l = e;
        }
        s = s.next;
    }
    setR(o);
    return o;
}
