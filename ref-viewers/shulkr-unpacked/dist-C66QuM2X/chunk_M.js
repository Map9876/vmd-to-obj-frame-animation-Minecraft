function M(e) {
    return e instanceof ArrayBuffer || typeof SharedArrayBuffer < `u` && e instanceof SharedArrayBuffer;
}
export function N(e) {
    if (e instanceof Uint8Array) {
        return e;
    }
    if (ArrayBuffer.isView(e)) {
        return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
    }
    if (M(e)) {
        return new Uint8Array(e);
    }
    return Uint8Array.from(e);
}
