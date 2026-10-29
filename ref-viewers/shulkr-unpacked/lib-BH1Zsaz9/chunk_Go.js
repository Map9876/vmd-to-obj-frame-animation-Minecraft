function Go(stack, t) {
    return Ko(stack, t.inConstruct, true) && !Ko(stack, t.notInConstruct, false);
}
function Ko(stack, t, n) {
    if (typeof t == `string`) {
        t = [
            t
        ];
    }
    if (!t || t.length === 0) {
        return n;
    }
    let r = -1;
    while(++r < t.length){
        if (stack.includes(t[r])) {
            return true;
        }
    }
    return false;
}
export function qo(e, t, n, r) {
    let i = -1;
    while(++i < n.unsafe.length){
        if (n.unsafe[i].character === `
` && Go(n.stack, n.unsafe[i])) {
            if (/[ \t]/.test(r.before)) {
                return ``;
            }
            return ` `;
        }
    }
    return `\\
`;
}
