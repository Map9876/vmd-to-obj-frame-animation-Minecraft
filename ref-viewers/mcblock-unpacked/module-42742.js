export function isAPIRoute(e) {
    return e === "/api" || !!e?.startsWith("/api/");
}
