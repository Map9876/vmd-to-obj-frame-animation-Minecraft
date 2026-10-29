export function S(e) {
    return !!e && typeof e === "function" && "_streamed" in e && !!e._streamed;
}
