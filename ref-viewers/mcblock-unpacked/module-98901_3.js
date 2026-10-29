let o = "/api/analytics/track";
let r = "mcb_sid";
let a = [];
let i = null;
let s = "";
let l = 0;
let page = "";
let d = false;
export function wg(e) {
    return e === "/admin" || e.startsWith("/admin/");
}
function h() {
    return wg(window.location.pathname);
}
function v() {
    if (i) {
        clearTimeout(i);
        i = null;
    }
    a = [];
    l = 0;
}
function m() {
    if (typeof navigator === "undefined") {
        return "desktop";
    }
    let navigator_userAgent = navigator.userAgent;
    if (/iPad|Tablet/i.test(navigator_userAgent)) {
        return "tablet";
    }
    if (/Mobile|Android|iPhone/i.test(navigator_userAgent)) {
        return "mobile";
    }
    return "desktop";
}
function p() {
    if (typeof navigator === "undefined") {
        return "unknown";
    }
    let navigator_userAgent = navigator.userAgent;
    if (navigator_userAgent.includes("Edg/")) {
        return "edge";
    }
    if (navigator_userAgent.includes("Chrome/") && !navigator_userAgent.includes("Edg/")) {
        return "chrome";
    }
    if (navigator_userAgent.includes("Firefox/")) {
        return "firefox";
    }
    if (navigator_userAgent.includes("Safari/") && !navigator_userAgent.includes("Chrome/")) {
        return "safari";
    }
    return "other";
}
function x() {
    if (typeof navigator === "undefined") {
        return "unknown";
    }
    let navigator_userAgent = navigator.userAgent;
    if (navigator_userAgent.includes("Win")) {
        return "windows";
    }
    if (navigator_userAgent.includes("Mac") && !navigator_userAgent.includes("iPhone")) {
        return "macos";
    }
    if (navigator_userAgent.includes("iPhone") || navigator_userAgent.includes("iPad")) {
        return "ios";
    }
    if (navigator_userAgent.includes("Android")) {
        return "android";
    }
    if (navigator_userAgent.includes("Linux")) {
        return "linux";
    }
    return "other";
}
let f = "mcb_src";
let w = [
    [
        /aweme/i,
        "douyin"
    ],
    [
        /MicroMessenger/i,
        "wechat"
    ],
    [
        /\bQQ\/\d/,
        "qq"
    ],
    [
        /xhsdiscover/i,
        "xiaohongshu"
    ],
    [
        /BiliApp/i,
        "bilibili"
    ],
    [
        /Kwai|KsWebView/i,
        "kuaishou"
    ],
    [
        /Weibo/i,
        "weibo"
    ]
];
function g() {
    try {
        let e = sessionStorage.getItem(f);
        if (e) {
            return e;
        }
    } catch (e) {}
    let e = (()=>{
        let e = new URLSearchParams(window.location.search).get("utm_source");
        return (e == null ? undefined : e.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 20)) || null;
    })() || (()=>{
        let navigator_userAgent = navigator.userAgent;
        for (let [t, n] of w){
            if (t.test(navigator_userAgent)) {
                return n;
            }
        }
        return null;
    })() || (()=>{
        let document_referrer = document.referrer;
        if (!document_referrer) {
            return "direct";
        }
        try {
            let t = new URL(document_referrer).hostname;
            if (t.includes("mcblock.top")) {
                return "direct";
            }
            if (t.includes("google") || t.includes("bing") || t.includes("baidu") || t.includes("sogou") || t.includes("so.com")) {
                return "search";
            }
            if (t.includes("weixin") || t.includes("wechat") || t.includes("wx")) {
                return "wechat";
            }
            if (t.includes("qq.com") || t.includes("qzone")) {
                return "qq";
            }
            if (t.includes("douyin")) {
                return "douyin";
            }
            if (t.includes("xiaohongshu")) {
                return "xiaohongshu";
            }
            if (t.includes("bilibili")) {
                return "bilibili";
            }
            if (t.includes("weibo")) {
                return "weibo";
            }
            return "referral";
        } catch (e) {
            return "direct";
        }
    })();
    try {
        sessionStorage.setItem(f, e);
    } catch (e) {}
    return e;
}
function b(e) {
    if (h()) {
        return void v();
    }
    let sessionId = (()=>{
        if (s) {
            return s;
        }
        let e = sessionStorage.getItem(r);
        if (!e) {
            e = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
            sessionStorage.setItem(r, e);
        }
        s = e;
        return e;
    })();
    if (sessionId) {
        a.push({
            ...e,
            sessionId
        });
        if (a.length >= 50) {
            y();
        } else if (!i) {
            i = setTimeout(y, 10000);
        }
    }
}
function y() {
    if (h()) {
        return void v();
    }
    if (i) {
        clearTimeout(i);
        i = null;
    }
    if (a.length === 0) {
        return;
    }
    let body = JSON.stringify({
        events: a.splice(0)
    });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(o, new Blob([
            body
        ], {
            type: "application/json"
        }));
    } else {
        fetch(o, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json"
            },
            keepalive: true
        }).catch(()=>{});
    }
}
function k(pathname) {
    if (h()) {
        return void v();
    }
    if (pathname === page) {
        return;
    }
    let t = Date.now();
    if (l > 0 && page) {
        let duration = Math.round((t - l) / 1000);
        if (duration > 0 && duration < 3600) {
            b({
                type: "page_leave",
                page,
                duration,
                metadata: {
                    to: pathname
                }
            });
        }
    }
    l = t;
    page = pathname;
    b({
        type: "page_view",
        page: pathname,
        referrer: document.referrer || undefined,
        device: m(),
        browser: p(),
        os: x(),
        source: g()
    });
}
function _() {
    if (!d) {
        d = true;
        if (l > 0) {
            let e = Math.round((Date.now() - l) / 1000);
            b({
                type: "session_end",
                page: window.location.pathname,
                duration: Math.min(e, 3600)
            });
        }
        y();
    }
}
export function MP(target, t) {
    b({
        type: "click",
        page: window.location.pathname,
        metadata: {
            target,
            ...t
        }
    });
}
export function PO() {
    y();
}
export function MH(itemType, itemId) {
    b({
        type: "download",
        page: window.location.pathname,
        metadata: {
            itemType,
            itemId
        }
    });
}
export function Bu() {
    if (!h()) {
        b({
            type: "session_start",
            page: window.location.pathname,
            device: m(),
            browser: p(),
            os: x(),
            source: g(),
            referrer: typeof document !== "undefined" && document.referrer || undefined
        });
    }
    window.addEventListener("pagehide", _);
    window.addEventListener("pageshow", ()=>{
        d = false;
    });
    let e = history.pushState.bind(history);
    history.pushState = function(...n) {
        e(...n);
        setTimeout(()=>k(window.location.pathname), 0);
    };
    let t = history.replaceState.bind(history);
    history.replaceState = function(...n) {
        t(...n);
        setTimeout(()=>k(window.location.pathname), 0);
    };
    window.addEventListener("popstate", ()=>{
        k(window.location.pathname);
    });
    if (!h()) {
        k(window.location.pathname);
    }
}
