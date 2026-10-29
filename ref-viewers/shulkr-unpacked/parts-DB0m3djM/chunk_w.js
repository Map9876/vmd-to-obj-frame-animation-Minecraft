const w = `shulkr:test-server-warned`;
export function T(e) {
    let t = null;
    try {
        t = e().getItem(w);
    } catch  {}
    return {
        has: (e)=>e === t,
        add (n) {
            t = n;
            try {
                e().setItem(w, n);
            } catch  {}
        }
    };
}
