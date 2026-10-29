let r = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
export function describeStringPropertyAccess(e, t) {
    if (r.test(t)) {
        return `\`${e}.${t}\``;
    }
    return `\`${e}[${JSON.stringify(t)}]\``;
}
export function describeHasCheckingStringProperty(e, t) {
    let r = JSON.stringify(t);
    return `\`Reflect.has(${e}, ${r})\`, \`${r} in ${e}\`, or similar`;
}
export let wellKnownProperties = new Set([
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toString",
    "valueOf",
    "toLocaleString",
    "then",
    "catch",
    "finally",
    "status",
    "displayName",
    "_debugInfo",
    "toJSON",
    "$$typeof",
    "__esModule"
]);
