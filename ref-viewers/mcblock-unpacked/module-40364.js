export function i(e) {
    if (typeof e === "boolean") {
        return Number(e);
    }
    let t = typeof e === "string" ? parseFloat(e) : e;
    if (!(typeof t !== "number" || isNaN(t)) && !(t < 0) && !(t > 1)) {
        return t;
    }
}
