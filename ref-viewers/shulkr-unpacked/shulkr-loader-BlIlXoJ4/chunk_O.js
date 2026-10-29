const O = new Map;
const k = new Set;
let A = 0;
let j;
function M(e) {
    for (let [t, n] of O){
        if (!k.has(t)) {
            n(e);
        }
    }
    A = O.size ? requestAnimationFrame(M) : 0;
}
export function N(e, t) {
    j ??= new IntersectionObserver((e)=>{
        for (let t of e){
            if (t.isIntersecting) {
                k.delete(t.target);
            } else {
                k.add(t.target);
            }
        }
    });
    O.set(e, t);
    j.observe(e);
    A ||= requestAnimationFrame(M);
    return ()=>{
        O.delete(e);
        k.delete(e);
        j?.unobserve(e);
    };
}
