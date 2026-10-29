let r;
export function __unsafeCreateTrustedScriptURL(e) {
    return (()=>{
        if (r === undefined) {
            r = window.trustedTypes?.createPolicy("nextjs", {
                createHTML: (e)=>e,
                createScript: (e)=>e,
                createScriptURL: (e)=>e
            }) || null;
        }
        return r;
    })()?.createScriptURL(e) || e;
}
