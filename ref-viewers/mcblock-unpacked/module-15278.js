import "./module-86897.js";
import { Suspense, use } from "./module-61426.js";
function O({ promise }) {
    let { error, digest } = use(promise);
    if (error) {
        if (digest) {
            error.digest = digest;
        }
        throw error;
    }
    return null;
}
export function AsyncMetadataOutlet({ promise }) {
    return <Suspense fallback={null}><O promise={promise}/></Suspense>;
}
