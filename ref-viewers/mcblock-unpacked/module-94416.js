import { useRef } from "./module-61426.js";
export function M(t) {
    let eRef = useRef(null);
    if (eRef.current === null) {
        eRef.current = t();
    }
    return eRef.current;
}
