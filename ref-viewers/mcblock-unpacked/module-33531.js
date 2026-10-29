import { useCallback, useEffect, useState } from "./module-61426.js";
let r = "mcb.autoMeasure";
export function Y() {
    let [e, setE] = useState(true);
    useEffect(()=>{
        try {
            if (localStorage.getItem(r) === "0") {
                setE(false);
            }
        } catch (e) {}
    }, []);
    return [
        e,
        useCallback(()=>{
            setE((e)=>{
                let t = !e;
                try {
                    localStorage.setItem(r, t ? "1" : "0");
                } catch (e) {}
                return t;
            });
        }, [])
    ];
}
