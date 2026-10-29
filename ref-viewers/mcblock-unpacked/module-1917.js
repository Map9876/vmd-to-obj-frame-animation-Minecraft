import "./module-86897.js";
import { sendGAEvent } from "./module-76784.js";
import { MH } from "./module-98901_3.js";
export function TrackedDownloadLink({ href, version, className, children }) {
    return <a className={className} href={href} download rel="noopener" onClick={()=>{
        MH("mine2blend", version);
        try {
            sendGAEvent("event", "mine2blend_download", {
                version
            });
        } catch (e) {}
    }}>{children}</a>;
}
