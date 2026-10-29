import { a } from "../jsx-runtime-Db0DjQYK.js";
class bt extends Error {
    constructor(e){
        super(e);
        this.name = `AssertionError`;
    }
}
export function W(e, t) {
    if (!e) {
        throw new bt(t ?? `Assertion failed`);
    }
}
