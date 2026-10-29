export default function(e, t) {
    if (t == null || t > e.length) {
        t = e.length;
    }
    for(var r = 0, n = Array(t); r < t; r++){
        n[r] = e[r];
    }
    return n;
};
