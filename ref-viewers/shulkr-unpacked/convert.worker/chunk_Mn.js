function Mn(e) {
    if (typeof e == `string`) {
        return e;
    }
    return e?.message;
}
export function Nn(e, t, n) {
    let r = e.message ? e.message : Mn(e.inst?._zod.def?.error?.(e)) ?? Mn(t?.error?.(e)) ?? Mn(n.customError?.(e)) ?? Mn(n.localeError?.(e)) ?? `Invalid input`;
    let { inst, continue: _continue, input, ...rest } = e;
    rest.path ??= [];
    rest.message = r;
    if (t?.reportInput) {
        rest.input = input;
    }
    return rest;
}
