const b = /[\x00-\x1f\x7f"<>`{}]/g;
function x(e) {
    return e.replace(b, (e)=>`%` + e.charCodeAt(0).toString(16).toUpperCase().padStart(2, `0`));
}
export function S(e) {
    let t;
    try {
        t = decodeURI(e);
    } catch  {
        t = e.replaceAll(/%[0-9A-F]{2}/gi, (e)=>{
            try {
                return decodeURI(e);
            } catch  {
                return e;
            }
        });
    }
    return x(t);
}
