function Jo(e, t) {
    let n = String(e);
    let r = n.indexOf(t);
    let i = r;
    let a = 0;
    let o = 0;
    if (typeof t != `string`) {
        throw TypeError(`Expected substring`);
    }
    while(r !== -1){
        if (r === i) {
            if (++a > o) {
                o = a;
            }
        } else {
            a = 1;
        }
        i = r + t.length;
        r = n.indexOf(t, i);
    }
    return o;
}
function Yo(e, t) {
    return !!(t.options.fences === false && e.value && !e.lang && /[^ \r\n]/.test(e.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function Xo(e) {
    let t = e.options.fence || "`";
    if (t !== "`" && t !== `~`) {
        throw Error(`Cannot serialize code with \`${t}\` for \`options.fence\`, expected \`\` \` \`\` or \`~\``);
    }
    return t;
}
export function Zo(e, t, n, r) {
    let i = Xo(n);
    let a = e.value || ``;
    let o = i === "`" ? `GraveAccent` : `Tilde`;
    if (Yo(e, n)) {
        let e = n.enter(`codeIndented`);
        let t = n.indentLines(a, Qo);
        e();
        return t;
    }
    let s = n.createTracker(r);
    let c = i.repeat(Math.max(Jo(a, i) + 1, 3));
    let l = n.enter(`codeFenced`);
    let before = s.move(c);
    if (e.lang) {
        let t = n.enter(`codeFencedLang${o}`);
        before += s.move(n.safe(e.lang, {
            before,
            after: ` `,
            encode: [
                "`"
            ],
            ...s.current()
        }));
        t();
    }
    if (e.lang && e.meta) {
        let t = n.enter(`codeFencedMeta${o}`);
        before += s.move(` `);
        before += s.move(n.safe(e.meta, {
            before,
            after: `
`,
            encode: [
                "`"
            ],
            ...s.current()
        }));
        t();
    }
    before += s.move(`
`);
    if (a) {
        before += s.move(a + `
`);
    }
    before += s.move(c);
    l();
    return before;
}
function Qo(e, t, n) {
    return (n ? `` : `    `) + e;
}
