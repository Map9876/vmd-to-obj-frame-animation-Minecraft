import * as n from "./module-61426.js";
import { isThenable } from "./module-54089.js";
let o = null;
export function dispatchAppRouterAction(e) {
    if (o === null) {
        throw Object.defineProperty(Error("Internal Next.js error: Router action dispatched before initialization."), "__NEXT_ERROR_CODE", {
            value: "E668",
            enumerable: false,
            configurable: true
        });
    }
    o(e);
}
export function useActionQueue(e) {
    let [t, setT] = n.default.useState(e.state);
    o = (t)=>e.dispatch(t, setT);
    if (isThenable(t)) {
        return n.use(t);
    }
    return t;
}
