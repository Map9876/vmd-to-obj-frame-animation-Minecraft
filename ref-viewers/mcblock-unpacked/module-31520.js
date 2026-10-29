function t(e, resolve, reject, n, o, a, u) {
    try {
        var s = e[a](u);
        var i = s.value;
    } catch (error) {
        return void reject(error);
    }
    if (s.done) {
        resolve(i);
    } else {
        Promise.resolve(i).then(n, o);
    }
}
export default function(e) {
    return function() {
        const r = this;
        const n = arguments;
        return new Promise((resolve, reject)=>{
            const u = e.apply(r, n);
            function s(e) {
                t(u, resolve, reject, s, i, "next", e);
            }
            function i(e) {
                t(u, resolve, reject, s, i, "throw", e);
            }
            s(undefined);
        });
    };
};
