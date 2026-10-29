export function Ws(e) {
    let t = this.resume();
    if (this.data.inTable) {
        t = t.replace(/\\([\\|])/g, Gs);
    }
    let n = this.stack[this.stack.length - 1];
    n.type;
    n.value = t;
    this.exit(e);
}
function Gs(e, t) {
    if (t === `|`) {
        return t;
    }
    return e;
}
