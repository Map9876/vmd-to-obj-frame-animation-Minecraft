function C(e) {
    if (typeof e == `string`) {
        return e;
    }
    return e?.message;
}
export function w(e, t, n) {
    let r = e.message ? e.message : C(e.inst?._zod.def?.error?.(e)) ?? C(t?.error?.(e)) ?? C(n.customError?.(e)) ?? C(n.localeError?.(e)) ?? `Invalid input`;
    let { inst, continue: _continue, input, ...rest } = e;
    rest.path ??= [];
    rest.message = r;
    if (t?.reportInput) {
        rest.input = input;
    }
    return rest;
}
