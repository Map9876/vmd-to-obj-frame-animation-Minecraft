export class InvariantError extends Error {
    constructor(e, t){
        super(`Invariant: ${e.endsWith(".") ? e : `${e}.`} This is a bug in Next.js.`, t);
        this.name = "InvariantError";
    }
}
