function r() {
    let e = Object.create(null);
    return {
        on (t, r) {
            (e[t] || (e[t] = [])).push(r);
        },
        off (t, r) {
            if (e[t]) {
                e[t].splice(e[t].indexOf(r) >>> 0, 1);
            }
        },
        emit (t, ...n) {
            (e[t] || []).slice().map((e)=>{
                e(...n);
            });
        }
    };
}
export { r as default };
