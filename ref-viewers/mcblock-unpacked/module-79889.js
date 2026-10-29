import { _ } from "./module-15903.js";
import { _ as __1 } from "./module-17797.js";
const o = __1("_maxConcurrency");
const i = __1("_runningCount");
const s = __1("_queue");
const l = __1("_processNext");
export class PromiseQueue {
    enqueue(e) {
        let t;
        let r;
        let promiseFn = new Promise((resolve, reject)=>{
            t = resolve;
            r = reject;
        });
        let task = async ()=>{
            try {
                _(this, i)[i]++;
                let r = await e();
                t(r);
            } catch (error) {
                r(error);
            } finally{
                _(this, i)[i]--;
                _(this, l)[l]();
            }
        };
        _(this, s)[s].push({
            promiseFn,
            task
        });
        _(this, l)[l]();
        return promiseFn;
    }
    bump(e) {
        let t = _(this, s)[s].findIndex((t)=>t.promiseFn === e);
        if (t > -1) {
            let e = _(this, s)[s].splice(t, 1)[0];
            _(this, s)[s].unshift(e);
            _(this, l)[l](true);
        }
    }
    constructor(e = 5){
        Object.defineProperty(this, l, {
            value
        });
        Object.defineProperty(this, o, {
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, i, {
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, s, {
            writable: true,
            value: undefined
        });
        _(this, o)[o] = e;
        _(this, i)[i] = 0;
        _(this, s)[s] = [];
    }
}
function value(e = false) {
    if ((_(this, i)[i] < _(this, o)[o] || e) && _(this, s)[s].length > 0) {
        _(this, s)[s].shift()?.task();
    }
}
