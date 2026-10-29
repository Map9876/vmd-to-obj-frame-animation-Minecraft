import { T } from "./module-61571.js";
import { Yz } from "./module-43275.js";
import { qQ } from "./module-85236.js";
let i = {};
let s = {};
export function s5(e, t) {
    i[e] = i[e] || [];
    i[e].push(t);
}
export function AS(e, t) {
    if (!s[e]) {
        s[e] = true;
        try {
            t();
        } catch (error) {
            if (T) {
                Yz.error(`Error while instrumenting ${e}`, error);
            }
        }
    }
}
export function aj(e, t) {
    let r = e && i[e];
    if (r) {
        for (let i of r){
            try {
                i(t);
            } catch (error) {
                if (T) {
                    Yz.error(`Error while triggering instrumentation handler.
Type: ${e}
Name: ${qQ(i)}
Error:`, error);
                }
            }
        }
    }
}
