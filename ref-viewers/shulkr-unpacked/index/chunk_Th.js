import { t } from "../preload-helper-zJ_50EbN.js";
let Th = null;
let Eh = false;
let Dh = null;
export async function Oh(e) {
    if (!(Eh || typeof window > `u`) && (Eh = true, e.posthogKey)) {
        try {
            let { default: _default } = await t(async ()=>{
                let { default: _default } = await import(`./module-hl6rLTMU.js`);
                return {
                    default: _default
                };
            }, []);
            let n = {
                disable_surveys: true,
                api_host: e.posthogHost,
                ui_host: `https://eu.posthog.com`,
                defaults: `2026-01-30`,
                capture_exceptions: true,
                debug: false,
                loaded: (e)=>{
                    e.setPersonProperties(undefined, {
                        first_referrer: document.referrer || `$direct`,
                        first_landing_page: window.location.pathname
                    });
                }
            };
            _default.init(e.posthogKey, n);
            Th = _default;
        } catch  {}
    }
}
export function kh() {
    if (typeof window > `u`) {
        return;
    }
    let href = window.location.href;
    if (href !== Dh) {
        Dh = href;
        window.gtag?.(`event`, `page_view`, {
            page_location: href,
            page_path: window.location.pathname + window.location.search,
            page_title: document.title
        });
    }
}
export function jh(e, t) {
    Th?.capture(e, t);
}
export function Mh() {
    return Th?.get_session_id() || undefined;
}
