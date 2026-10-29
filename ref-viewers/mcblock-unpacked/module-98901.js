let l = "/api/analytics/track";
let r = "mcb_sid";
let a = [];
let i = null;
let s = "";
let c = 0;
let page = "";
let d = false;
export function wg(e) {
    return e === "/admin" || e.startsWith("/admin/");
}
function m() {
    return wg(window.location.pathname);
}
function p() {
    if (i) {
        clearTimeout(i);
        i = null;
    }
    a = [];
    c = 0;
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
function f() {
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
function b() {
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
let x = "mcb_src";
let g = [
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
function y() {
    try {
        let e = sessionStorage.getItem(x);
        if (e) {
            return e;
        }
    } catch (e) {}
    let e = (()=>{
        let e = new URLSearchParams(window.location.search).get("utm_source");
        return (e == null ? undefined : e.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 20)) || null;
    })() || (()=>{
        let navigator_userAgent = navigator.userAgent;
        for (let [t, n] of g){
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
        sessionStorage.setItem(x, e);
    } catch (e) {}
    return e;
}
function j(e) {
    if (m()) {
        return void p();
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
            v();
        } else if (!i) {
            i = setTimeout(v, 10000);
        }
    }
}
function v() {
    if (m()) {
        return void p();
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
        navigator.sendBeacon(l, new Blob([
            body
        ], {
            type: "application/json"
        }));
    } else {
        fetch(l, {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json"
            },
            keepalive: true
        }).catch(()=>{});
    }
}
function w(pathname) {
    if (m()) {
        return void p();
    }
    if (pathname === page) {
        return;
    }
    let t = Date.now();
    if (c > 0 && page) {
        let duration = Math.round((t - c) / 1000);
        if (duration > 0 && duration < 3600) {
            j({
                type: "page_leave",
                page,
                duration,
                metadata: {
                    to: pathname
                }
            });
        }
    }
    c = t;
    page = pathname;
    j({
        type: "page_view",
        page: pathname,
        referrer: document.referrer || undefined,
        device: h(),
        browser: f(),
        os: b(),
        source: y()
    });
}
function k() {
    if (!d) {
        d = true;
        if (c > 0) {
            let e = Math.round((Date.now() - c) / 1000);
            j({
                type: "session_end",
                page: window.location.pathname,
                duration: Math.min(e, 3600)
            });
        }
        v();
    }
}
export function MP(target, t) {
    j({
        type: "click",
        page: window.location.pathname,
        metadata: {
            target,
            ...t
        }
    });
}
export function PO() {
    v();
}
export function MH(itemType, itemId) {
    j({
        type: "download",
        page: window.location.pathname,
        metadata: {
            itemType,
            itemId
        }
    });
}
export function Bu() {
    if (!m()) {
        j({
            type: "session_start",
            page: window.location.pathname,
            device: h(),
            browser: f(),
            os: b(),
            source: y(),
            referrer: typeof document !== "undefined" && document.referrer || undefined
        });
    }
    window.addEventListener("pagehide", k);
    window.addEventListener("pageshow", ()=>{
        d = false;
    });
    let e = history.pushState.bind(history);
    history.pushState = function(...n) {
        e(...n);
        setTimeout(()=>w(window.location.pathname), 0);
    };
    let t = history.replaceState.bind(history);
    history.replaceState = function(...n) {
        t(...n);
        setTimeout(()=>w(window.location.pathname), 0);
    };
    window.addEventListener("popstate", ()=>{
        w(window.location.pathname);
    });
    if (!m()) {
        w(window.location.pathname);
    }
}
