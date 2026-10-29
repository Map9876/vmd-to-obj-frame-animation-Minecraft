export class jc {
    constructor(){
        this.map = [];
    }
    add(e, t, n) {
        Mc(this, e, t, n);
    }
    consume(e) {
        this.map.sort((e, t)=>e[0] - t[0]);
        if (this.map.length === 0) {
            return;
        }
        let length = this.map.length;
        let n = [];
        while(length > 0){
            --length;
            n.push(e.slice(this.map[length][0] + this.map[length][1]), this.map[length][2]);
            e.length = this.map[length][0];
        }
        n.push(e.slice());
        e.length = 0;
        let r = n.pop();
        while(r){
            for (let t of r){
                e.push(t);
            }
            r = n.pop();
        }
        this.map.length = 0;
    }
}
function Mc(e, t, n, r) {
    let i = 0;
    if (!(n === 0 && r.length === 0)) {
        while(i < e.map.length){
            if (e.map[i][0] === t) {
                e.map[i][1] += n;
                e.map[i][2].push(...r);
                return;
            }
            i += 1;
        }
        e.map.push([
            t,
            n,
            r
        ]);
    }
}
