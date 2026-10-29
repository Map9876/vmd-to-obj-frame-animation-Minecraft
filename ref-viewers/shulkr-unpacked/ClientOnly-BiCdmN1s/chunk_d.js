function d(e, t) {
    if (e.parse && !t.parse) {
        return -1;
    }
    if (!e.parse && t.parse) {
        return 1;
    }
    if (e.parse && t.parse && (e.priority || t.priority)) {
        return t.priority - e.priority;
    }
    if (e.prefix && t.prefix && e.prefix !== t.prefix) {
        if (e.prefix.startsWith(t.prefix)) {
            return -1;
        }
        if (t.prefix.startsWith(e.prefix)) {
            return 1;
        }
    }
    if (e.suffix && t.suffix && e.suffix !== t.suffix) {
        if (e.suffix.endsWith(t.suffix)) {
            return -1;
        }
        if (t.suffix.endsWith(e.suffix)) {
            return 1;
        }
    }
    if (e.prefix && !t.prefix) {
        return -1;
    }
    if (!e.prefix && t.prefix) {
        return 1;
    }
    if (e.suffix && !t.suffix) {
        return -1;
    }
    if (!e.suffix && t.suffix) {
        return 1;
    }
    if (e.caseSensitive && !t.caseSensitive) {
        return -1;
    }
    if (!e.caseSensitive && t.caseSensitive) {
        return 1;
    }
    return 0;
}
export function f(e) {
    if (e.pathless) {
        for (let t of e.pathless){
            f(t);
        }
    }
    if (e.static) {
        for (let t of e.static.values()){
            f(t);
        }
    }
    if (e.staticInsensitive) {
        for (let t of e.staticInsensitive.values()){
            f(t);
        }
    }
    if (e.dynamic?.length) {
        e.dynamic.sort(d);
        for (let t of e.dynamic){
            f(t);
        }
    }
    if (e.optional?.length) {
        e.optional.sort(d);
        for (let t of e.optional){
            f(t);
        }
    }
    if (e.wildcard?.length) {
        e.wildcard.sort(d);
        for (let t of e.wildcard){
            f(t);
        }
    }
}
