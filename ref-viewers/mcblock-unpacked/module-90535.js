if (!("trimStart" in String.prototype)) {
    String.prototype.trimStart = String.prototype.trimLeft;
}
if (!("trimEnd" in String.prototype)) {
    String.prototype.trimEnd = String.prototype.trimRight;
}
if (!("description" in Symbol.prototype)) {
    Object.defineProperty(Symbol.prototype, "description", {
        configurable: true,
        get: function() {
            const e = /\((.*)\)/.exec(this.toString());
            if (e) {
                return e[1];
            }
        }
    });
}
if (!Array.prototype.flat) {
    Array.prototype.flat = function(e, t) {
        t = this.concat.apply([], this);
        if (e > 1 && t.some(Array.isArray)) {
            return t.flat(e - 1);
        }
        return t;
    };
    Array.prototype.flatMap = function(e, t) {
        return this.map(e, t).flat();
    };
}
if (!Promise.prototype.finally) {
    Promise.prototype.finally = function(e) {
        if (typeof e !== "function") {
            return this.then(e, e);
        }
        const t = this.constructor || Promise;
        return this.then((r)=>t.resolve(e()).then(()=>r), (r)=>t.resolve(e()).then(()=>{
                throw r;
            }));
    };
}
if (!Object.fromEntries) {
    Object.fromEntries = function(e) {
        return Array.from(e).reduce((acc, item)=>{
            acc[item[0]] = item[1];
            return acc;
        }, {});
    };
}
if (!Array.prototype.at) {
    Array.prototype.at = function(e) {
        let t = Math.trunc(e) || 0;
        if (t < 0) {
            t += this.length;
        }
        if (!(t < 0 || t >= this.length)) {
            return this[t];
        }
    };
}
if (!Object.hasOwn) {
    Object.hasOwn = function(e, t) {
        if (e == null) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        return Object.prototype.hasOwnProperty.call(Object(e), t);
    };
}
if (!("canParse" in URL)) {
    URL.canParse = function(e, t) {
        try {
            new URL(e, t);
            return true;
        } catch (e) {
            return false;
        }
    };
}
