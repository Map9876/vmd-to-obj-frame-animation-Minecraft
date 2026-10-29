const fr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
export function pr(e) {
    let t = fr.exec(e);
    if (!t) {
        return [
            , 
        ];
    }
    let [, n, r, i] = t;
    return [
        `--${n ?? r}`,
        i
    ];
}
