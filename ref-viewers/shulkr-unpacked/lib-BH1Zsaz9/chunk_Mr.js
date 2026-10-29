import { t } from "../jsx-runtime-Db0DjQYK.js";
const Mr = /[\0\t\n\r]/g;
export function Nr() {
    let e = 1;
    let t = ``;
    let n = true;
    let r;
    return i;
    function i(i, a, o) {
        let s = [];
        let c;
        let l;
        let u;
        let d;
        let f;
        i = t + (typeof i == `string` ? i.toString() : new TextDecoder(a || undefined).decode(i));
        u = 0;
        t = ``;
        for(n &&= (i.charCodeAt(0) === 65279 && u++, undefined); u < i.length;){
            Mr.lastIndex = u;
            c = Mr.exec(i);
            d = c && c.index !== undefined ? c.index : i.length;
            f = i.charCodeAt(d);
            if (!c) {
                t = i.slice(u);
                break;
            }
            if (f === 10 && u === d && r) {
                s.push(-3);
                r = undefined;
            } else {
                r &&= (s.push(-5), undefined);
                if (u < d) {
                    s.push(i.slice(u, d));
                    e += d - u;
                }
                switch(f){
                    case 0:
                        s.push(65533);
                        e++;
                        break;
                    case 9:
                        l = Math.ceil(e / 4) * 4;
                        s.push(-2);
                        while(e++ < l){
                            s.push(-1);
                        }
                        break;
                    case 10:
                        s.push(-4);
                        e = 1;
                        break;
                    default:
                        r = true;
                        e = 1;
                }
            }
            u = d + 1;
        }
        if (o) {
            if (r) {
                s.push(-5);
            }
            if (t) {
                s.push(t);
            }
            s.push(null);
        }
        return s;
    }
}
