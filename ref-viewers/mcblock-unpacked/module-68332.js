import "./module-86897.js";
import { useEffect } from "./module-61426.js";
import L from "./module-68321.js";
let n;
export const GoogleAnalytics = function({ gaId, debugMode, dataLayerName = "dataLayer", nonce }) {
    if (n === undefined) {
        n = dataLayerName;
    }
    useEffect(()=>{
        performance.mark("mark_feature_usage", {
            detail: {
                feature: "next-third-parties-ga"
            }
        });
    }, []);
    return <><L id="_next-ga-init" dangerouslySetInnerHTML={{
        __html: `
          window['${dataLayerName}'] = window['${dataLayerName}'] || [];
          function gtag(){window['${dataLayerName}'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}' ${debugMode ? ",{ 'debug_mode': true }" : ""});`
    }} nonce={nonce}/><L id="_next-ga" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} nonce={nonce}/></>;
};
export const sendGAEvent = function() {
    for(let e = arguments.length, t = Array(e), r = 0; r < e; r++){
        t[r] = arguments[r];
    }
    if (n === undefined) {
        return void console.warn("@next/third-parties: GA has not been initialized");
    }
    if (window[n]) {
        window[n].push(arguments);
    } else {
        console.warn(`@next/third-parties: GA dataLayer ${n} does not exist`);
    }
};
