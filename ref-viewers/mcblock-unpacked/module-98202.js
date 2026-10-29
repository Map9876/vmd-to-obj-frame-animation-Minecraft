import "./module-86897.js";
import { useEffect } from "./module-61426.js";
import O from "./module-68321.js";
export const GoogleTagManager = function({ gtmId, gtmScriptUrl, dataLayerName = "dataLayer", auth, preview, dataLayer, nonce }) {
    l = dataLayerName;
    let g = new URL(gtmScriptUrl || "https://www.googletagmanager.com/gtm.js");
    if (gtmId) {
        g.searchParams.set("id", gtmId);
    }
    if (dataLayerName !== "dataLayer") {
        g.searchParams.set("l", dataLayerName);
    }
    if (auth) {
        g.searchParams.set("gtm_auth", auth);
    }
    if (preview) {
        g.searchParams.set("gtm_preview", preview);
        g.searchParams.set("gtm_cookies_win", "x");
    }
    useEffect(()=>{
        performance.mark("mark_feature_usage", {
            detail: {
                feature: "next-third-parties-gtm"
            }
        });
    }, []);
    return <><O id="_next-gtm-init" dangerouslySetInnerHTML={{
        __html: `
      (function(w,l){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        ${dataLayer ? `w[l].push(${JSON.stringify(dataLayer)})` : ""}
      })(window,'${dataLayerName}');`
    }} nonce={nonce}/><O id="_next-gtm" data-ntpc="GTM" src={g.href} nonce={nonce}/></>;
};
let l = "dataLayer";
export const sendGTMEvent = (e, t)=>{
    let r = t || l;
    window[r] = window[r] || [];
    window[r].push(e);
};
