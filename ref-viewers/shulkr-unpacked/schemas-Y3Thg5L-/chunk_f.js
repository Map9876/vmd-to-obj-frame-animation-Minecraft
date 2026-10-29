const f = Symbol(`evaluating`);
export function p(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== f) {
                if (r === undefined) {
                    r = f;
                    r = n();
                }
                return r;
            }
        },
        set (value) {
            Object.defineProperty(e, t, {
                value
            });
        },
        configurable: true
    });
}
