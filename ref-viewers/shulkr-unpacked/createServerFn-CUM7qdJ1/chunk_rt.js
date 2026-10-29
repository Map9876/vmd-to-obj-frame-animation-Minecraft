import { p } from "../useStore-DX_rDZVw.js";
import { a } from "../redirect-Coy-z-9D.js";
const { toString } = Object.prototype;
const it = {
    parsing: 1,
    serialization: 2,
    deserialization: 3
};
function at(e) {
    return `Seroval Error (step: ${it[e]})`;
}
const ot = (e, t)=>at(e);
class st extends Error {
    constructor(e, t){
        super(ot(e, t));
        this.cause = t;
    }
}
export class ct extends st {
    constructor(e){
        super(`parsing`, e);
    }
}
export class lt extends st {
    constructor(e){
        super(`deserialization`, e);
    }
}
