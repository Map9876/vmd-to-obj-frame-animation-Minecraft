const T = {
    "&": `\\u0026`,
    ">": `\\u003e`,
    "<": `\\u003c`,
    "\u2028": `\\u2028`,
    "\u2029": `\\u2029`
};
const E = /[&><\u2028\u2029]/g;
export function D(e) {
    return e.replace(E, (e)=>T[e]);
}
