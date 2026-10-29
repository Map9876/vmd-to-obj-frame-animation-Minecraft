import "./module-86897.js";
import { GoogleAnalytics } from "./module-76784.js";
const s = require(20063);
const l = require(98901);
export function ConditionalGoogleAnalytics({ gaId }) {
    let r = s.usePathname();
    if (!gaId || l.wg(r)) {
        return null;
    }
    return <GoogleAnalytics gaId={gaId}/>;
}
