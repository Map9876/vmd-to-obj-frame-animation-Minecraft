import { useEffect, useState } from "./module-61426.js";
function useN() {
    let [e, setE] = useState(false);
    useEffect(()=>{
        setE("__TAURI_INTERNALS__" in window);
    }, []);
    return e;
}
export { useN as n };
