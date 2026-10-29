import n from "./module-9961.js";
import o from "./module-62575.js";
export default (function e(t, r) {
    let a;
    if (!this.next) {
        o(e.prototype);
        o(e.prototype, typeof Symbol === "function" && Symbol.asyncIterator || "@asyncIterator", function() {
            return this;
        });
    }
    o(this, "_invoke", function(e, o, u) {
        function s() {
            return new r(function(o, a) {
                (function e(o, a, u, s) {
                    try {
                        const i = t[o](a);
                        const c = i.value;
                        if (c instanceof n) {
                            return r.resolve(c.v).then((t)=>{
                                e("next", t, u, s);
                            }, (t)=>{
                                e("throw", t, u, s);
                            });
                        }
                        return r.resolve(c).then((e)=>{
                            i.value = e;
                            u(i);
                        }, (t)=>e("throw", t, u, s));
                    } catch (error) {
                        s(error);
                    }
                })(e, u, o, a);
            });
        }
        return a = a ? a.then(s, s) : s();
    }, true);
});
