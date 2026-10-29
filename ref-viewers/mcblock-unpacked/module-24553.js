let r = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
export class BailoutToCSRError extends Error {
    constructor(e){
        super(`Bail out to client-side rendering: ${e}`);
        this.reason = e;
        this.digest = r;
    }
}
export function isBailoutToCSRError(e) {
    return typeof e === "object" && e !== null && "digest" in e && e.digest === r;
}
