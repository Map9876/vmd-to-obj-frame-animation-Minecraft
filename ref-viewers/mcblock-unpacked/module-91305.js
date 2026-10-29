export let L;
((e)=>{
    function t(e) {
        if (typeof e !== "object" || e === null || Array.isArray(e)) {
            return undefined;
        }
        return e;
    }
    e.readNumber = function(e) {
        if (typeof e === "number") {
            return e;
        }
    };
    e.readInt = function(e) {
        if (typeof e === "number") {
            return Math.floor(e);
        }
    };
    e.readString = function(e) {
        if (typeof e === "string") {
            return e;
        }
    };
    e.readBoolean = function(e) {
        if (typeof e === "boolean") {
            return e;
        }
    };
    e.readObject = t;
    e.readArray = function(e, t) {
        if (Array.isArray(e)) {
            if (t) {
                return e.map((e)=>t(e));
            }
            return e;
        }
    };
    e.readPair = function(e, t) {
        if (Array.isArray(e)) {
            return [
                0,
                1
            ].map((r)=>t(e[r]));
        }
    };
    e.readMap = function(e, r) {
        return Object.fromEntries(Object.entries(t(e) ?? {}).map(([e, t])=>[
                e,
                r(t)
            ]));
    };
    e.compose = function(e, t, r) {
        let s = t(e);
        if (s) {
            return r(s);
        }
    };
    e.readEnum = function(e, t) {
        if (typeof e !== "string") {
            return t[0];
        }
        if (t.includes(e)) {
            return e;
        }
        return t[0];
    };
})(L = L || (L = {}));
