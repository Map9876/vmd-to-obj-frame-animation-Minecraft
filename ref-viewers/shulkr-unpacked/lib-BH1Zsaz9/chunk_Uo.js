export function Uo(e, t, n, r) {
    let i = n.enter(`blockquote`);
    let a = n.createTracker(r);
    a.move(`> `);
    a.shift(2);
    let o = n.indentLines(n.containerFlow(e, a.current()), Wo);
    i();
    return o;
}
function Wo(e, t, n) {
    return `>` + (n ? `` : ` `) + e;
}
