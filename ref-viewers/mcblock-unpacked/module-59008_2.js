import { useEffect, useState } from "./module-61426.js";
export function n() {
    let [e, setE] = useState(false);
    useEffect(()=>{
        setE("__TAURI_INTERNALS__" in window);
    }, []);
    return e;
}
