export class UnrecognizedActionError extends Error {
    constructor(...e){
        super(...e);
        this.name = "UnrecognizedActionError";
    }
}
export function unstable_isUnrecognizedActionError(e) {
    return !!(e && typeof e === "object" && e instanceof UnrecognizedActionError);
}
