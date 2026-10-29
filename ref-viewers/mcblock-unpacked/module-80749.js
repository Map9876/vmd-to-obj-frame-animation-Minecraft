function r(e, t = "") {
    return (e === "/" ? "/index" : /^\/index(\/|$)/.test(e) ? `/index${e}` : e) + t;
}
export { r as default };
