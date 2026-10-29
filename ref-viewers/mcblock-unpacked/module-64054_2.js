let r = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
});
class n {
    disable() {
        throw r;
    }
    getStore() {}
    run() {
        throw r;
    }
    exit() {
        throw r;
    }
    enterWith() {
        throw r;
    }
    static bind(e) {
        return e;
    }
}
let a = typeof globalThis !== "undefined" && globalThis.AsyncLocalStorage;
export function createAsyncLocalStorage() {
    if (a) {
        return new a;
    }
    return new n;
}
export function bindSnapshot(e) {
    if (a) {
        return a.bind(e);
    }
    return n.bind(e);
}
export function createSnapshot() {
    if (a) {
        return a.snapshot();
    }
    return function(e, ...t) {
        return e(...t);
    };
}
