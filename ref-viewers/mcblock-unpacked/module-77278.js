export function encodeURIPath(e) {
    return e.split("/").map((e)=>encodeURIComponent(e)).join("/");
}
