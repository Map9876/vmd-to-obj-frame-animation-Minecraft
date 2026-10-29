let i = "/api/analytics/track";
let a = "mcb_sid";
let o = [];
let r = null;
let l = "";
let s = 0;
let page = "";
let d = false;
export function wg(e) {
    return e === "/admin" || e.startsWith("/admin/");
}
function p() {
    return wg(window.location.pathname);
}
function m() {
    if (r) {
        clearTimeout(r);
        r = null;
    }
    o = [];
    s = 0;
}
function h() {
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
function b() {
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
let v = [
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
function x() {
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
        for (let [t, n] of v){
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
function w(e) {
    if (p()) {
        return void m();
    }
    let sessionId = (()=>{
        if (l) {
            return l;
        }
        let e = sessionStorage.getItem(a);
        if (!e) {
            e = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
            sessionStorage.setItem(a, e);
        }
        l = e;
        return e;
    })();
    if (sessionId) {
        o.push({
            ...e,
            sessionId
        });
        if (o.length >= 50) {
            y();
        } else if (!r) {
            r = setTimeout(y, 10000);
        }
    }
}
function y() {
    if (p()) {
        return void m();
    }
    if (r) {
        clearTimeout(r);
        r = null;
    }
    if (o.length === 0) {
        return;
    }
    let body = JSON.stringify({
        events: o.splice(0)
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
function k(pathname) {
    if (p()) {
        return void m();
    }
    if (pathname === page) {
        return;
    }
    let t = Date.now();
    if (s > 0 && page) {
        let duration = Math.round((t - s) / 1000);
        if (duration > 0 && duration < 3600) {
            w({
                type: "page_leave",
                page,
                duration,
                metadata: {
                    to: pathname
                }
            });
        }
    }
    s = t;
    page = pathname;
    w({
        type: "page_view",
        page: pathname,
        referrer: document.referrer || undefined,
        device: h(),
        browser: b(),
        os: g(),
        source: x()
    });
}
function j() {
    if (!d) {
        d = true;
        if (s > 0) {
            let e = Math.round((Date.now() - s) / 1000);
            w({
                type: "session_end",
                page: window.location.pathname,
                duration: Math.min(e, 3600)
            });
        }
        y();
    }
}
export function MP(target, t) {
    w({
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
    w({
        type: "download",
        page: window.location.pathname,
        metadata: {
            itemType,
            itemId
        }
    });
}
export function Bu() {
    if (!p()) {
        w({
            type: "session_start",
            page: window.location.pathname,
            device: h(),
            browser: b(),
            os: g(),
            source: x(),
            referrer: typeof document !== "undefined" && document.referrer || undefined
        });
    }
    window.addEventListener("pagehide", j);
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
    if (!p()) {
        k(window.location.pathname);
    }
}
