"use strict";
require.d(exports, {
    h: ()=>function e(t, r, n = 2) {
            if (!r || typeof r !== "object" || n <= 0) {
                return r;
            }
            if (t && Object.keys(r).length === 0) {
                return t;
            }
            let a = {
                ...t
            };
            for(let t in r){
                if (Object.prototype.hasOwnProperty.call(r, t)) {
                    a[t] = e(a[t], r[t], n - 1);
                }
            }
            return a;
        }
});
