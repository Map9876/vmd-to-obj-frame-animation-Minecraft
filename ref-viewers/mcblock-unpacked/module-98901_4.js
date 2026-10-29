let i = "/api/analytics/track";
let r = "mcb_sid";
let n = [];
let a = null;
let l = "";
let o = 0;
let page = "";
let d = false;
export function wg(e) {
    return e === "/admin" || e.startsWith("/admin/");
}
function h() {
    return wg(window.location.pathname);
}
function p() {
    if (a) {
        clearTimeout(a);
        a = null;
    }
    n = [];
    o = 0;
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
function v() {
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
function g() {
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
let y = [
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
function b() {
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
        for (let [t, s] of y){
            if (t.test(navigator_userAgent)) {
                return s;
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
function x(e) {
    if (h()) {
        return void p();
    }
    let sessionId = (()=>{
        if (l) {
            return l;
        }
        let e = sessionStorage.getItem(r);
        if (!e) {
            e = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
            sessionStorage.setItem(r, e);
        }
        l = e;
        return e;
    })();
    if (sessionId) {
        n.push({
            ...e,
            sessionId
        });
        if (n.length >= 50) {
            w();
        } else if (!a) {
            a = setTimeout(w, 10000);
        }
    }
}
function w() {
    if (h()) {
        return void p();
    }
    if (a) {
        clearTimeout(a);
        a = null;
    }
    if (n.length === 0) {
        return;
    }
    let body = JSON.stringify({
        events: n.splice(0)
    });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(i, new Blob([
            body
        ], {
            type: "application/json"
        }));
    } else {
        fetch(i, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json"
            },
            keepalive: true
        }).catch(()=>{});
    }
}
function j(pathname) {
    if (h()) {
        return void p();
    }
    if (pathname === page) {
        return;
    }
    let t = Date.now();
    if (o > 0 && page) {
        let duration = Math.round((t - o) / 1000);
        if (duration > 0 && duration < 3600) {
            x({
                type: "page_leave",
                page,
                duration,
                metadata: {
                    to: pathname
                }
            });
        }
    }
    o = t;
    page = pathname;
    x({
        type: "page_view",
        page: pathname,
        referrer: document.referrer || undefined,
        device: m(),
        browser: v(),
        os: g(),
        source: b()
    });
}
function k() {
    if (!d) {
        d = true;
        if (o > 0) {
            let e = Math.round((Date.now() - o) / 1000);
            x({
                type: "session_end",
                page: window.location.pathname,
                duration: Math.min(e, 3600)
            });
        }
        w();
    }
}
export function MP(target, t) {
    x({
        type: "click",
        page: window.location.pathname,
        metadata: {
            target,
            ...t
        }
    });
}
export function PO() {
    w();
}
export function MH(itemType, itemId) {
    x({
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
        x({
            type: "session_start",
            page: window.location.pathname,
            device: m(),
            browser: v(),
            os: g(),
            source: b(),
            referrer: typeof document !== "undefined" && document.referrer || undefined
        });
    }
    window.addEventListener("pagehide", k);
    window.addEventListener("pageshow", ()=>{
        d = false;
    });
    let e = history.pushState.bind(history);
    history.pushState = function(...s) {
        e(...s);
        setTimeout(()=>j(window.location.pathname), 0);
    };
    let t = history.replaceState.bind(history);
    history.replaceState = function(...s) {
        t(...s);
        setTimeout(()=>j(window.location.pathname), 0);
    };
    window.addEventListener("popstate", ()=>{
        j(window.location.pathname);
    });
    if (!h()) {
        j(window.location.pathname);
    }
}
