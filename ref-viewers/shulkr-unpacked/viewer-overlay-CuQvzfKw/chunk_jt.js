function jt(e, t, n, r) {
    let t_length = t.length;
    let a = Math.min(Math.max(0, Math.min(n, r)), t_length);
    let o = Math.min(Math.max(0, Math.max(n, r)), t_length);
    if (o <= a) {
        return;
    }
    let s = [];
    let c = r > n;
    for(let n = a; n < o; n++){
        for (let r of t[n] ?? []){
            e.writeBlock(r.x, r.y, r.z, c ? r.state : null);
            s.push({
                x: r.x,
                y: r.y,
                z: r.z
            });
        }
    }
    e.worldChanged(s);
}
export class Mt {
    scene = null;
    placements = null;
    placed = null;
    apply(e, t, n) {
        if (e !== this.scene) {
            this.scene = e;
            this.placements = null;
            this.placed = null;
        }
        if (!e || (this.placements && this.placements !== t && (this.placed !== null && jt(e, this.placements, this.placed, this.placements.length), this.placed = null), this.placements = t, !t)) {
            return;
        }
        let r = n ?? t.length;
        let i = this.placed ?? t.length;
        if (r !== i) {
            jt(e, t, i, r);
        }
        this.placed = r;
    }
}
