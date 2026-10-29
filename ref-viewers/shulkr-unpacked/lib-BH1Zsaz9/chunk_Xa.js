function Xa(e) {
    if (typeof e != `string`) {
        throw TypeError(`Expected a string`);
    }
    return e.replace(/[|\\{}()[\]^$+*?.]/g, `\\$&`).replace(/-/g, `\\x2d`);
}
export function Qa(e) {
    let t = [];
    if (!Array.isArray(e)) {
        throw TypeError(`Expected find and replace tuple or list of tuples`);
    }
    let n = !e[0] || Array.isArray(e[0]) ? e : [
        e
    ];
    let r = -1;
    while(++r < n.length){
        let e = n[r];
        t.push([
            $a(e[0]),
            eo(e[1])
        ]);
    }
    return t;
}
function $a(e) {
    if (typeof e == `string`) {
        return new RegExp(Xa(e), `g`);
    }
    return e;
}
function eo(e) {
    if (typeof e == `function`) {
        return e;
    }
    return function() {
        return e;
    };
}
