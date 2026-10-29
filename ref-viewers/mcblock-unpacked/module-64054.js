let l = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
});
class a {
    disable() {
        throw l;
    }
    getStore() {}
    run() {
        throw l;
    }
    exit() {
        throw l;
    }
    enterWith() {
        throw l;
    }
    static bind(e) {
        return e;
    }
}
let n = typeof globalThis !== "undefined" && globalThis.AsyncLocalStorage;
export function createAsyncLocalStorage() {
    if (n) {
        return new n;
    }
    return new a;
}
export function bindSnapshot(e) {
    if (n) {
        return n.bind(e);
    }
    return a.bind(e);
}
export function createSnapshot() {
    if (n) {
        return n.snapshot();
    }
    return function(e, ...t) {
        return e(...t);
    };
}
