export default function(e) {
    const t = Object(e);
    const r = [];
    for(var n in t){
        r.unshift(n);
    }
    return function e() {
        while(r.length){
            if ((n = r.pop()) in t) {
                e.value = n;
                e.done = false;
                return e;
            }
        }
        e.done = true;
        return e;
    };
};
