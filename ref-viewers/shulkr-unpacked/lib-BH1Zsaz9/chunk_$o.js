export function $o(e) {
    let t = e.options.quote || `"`;
    if (t !== `"` && t !== `'`) {
        throw Error(`Cannot serialize title with \`${t}\` for \`options.quote\`, expected \`"\`, or \`'\``);
    }
    return t;
}
export function es(e, t, n, r) {
    let after = $o(n);
    let a = after === `"` ? `Quote` : `Apostrophe`;
    let o = n.enter(`definition`);
    let s = n.enter(`label`);
    let c = n.createTracker(r);
    let before = c.move(`[`);
    before += c.move(n.safe(n.associationId(e), {
        before,
        after: `]`,
        ...c.current()
    }));
    before += c.move(`]: `);
    s();
    if (!e.url || /[\0- \u007F]/.test(e.url)) {
        s = n.enter(`destinationLiteral`);
        before += c.move(`<`);
        before += c.move(n.safe(e.url, {
            before,
            after: `>`,
            ...c.current()
        }));
        before += c.move(`>`);
    } else {
        s = n.enter(`destinationRaw`);
        before += c.move(n.safe(e.url, {
            before,
            after: e.title ? ` ` : `
`,
            ...c.current()
        }));
    }
    s();
    if (e.title) {
        s = n.enter(`title${a}`);
        before += c.move(` ` + after);
        before += c.move(n.safe(e.title, {
            before,
            after,
            ...c.current()
        }));
        before += c.move(after);
        s();
    }
    o();
    return before;
}
