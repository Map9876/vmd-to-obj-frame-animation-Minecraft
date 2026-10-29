let i = [
    "launch",
    "update",
    "fix",
    "notice",
    "event",
    "maintenance"
];
export let ed = {
    version: 2,
    frequency: "ack",
    trigger: "delay",
    scope: "browse"
};
export function O9(e) {
    return !(!e || typeof e !== "object" || Array.isArray(e)) && e.version === 2 && [
        "ack",
        "daily",
        "visit"
    ].includes(e.frequency) && [
        "delay",
        "second"
    ].includes(e.trigger) && [
        "browse",
        "home",
        "buildings"
    ].includes(e.scope);
}
export function L3(e) {
    let body = e.content?.trim() || "";
    let summary = e.summary?.trim() || body.split(/\n\s*\n/)[0] || "";
    if (O9(e.displayConfig)) {
        return {
            title: e.title || "",
            body,
            summary
        };
    }
    return {
        title: e.popupTitle || e.title || "",
        body: e.popupText || e.summary || body,
        summary
    };
}
let l = [
    "/buildings/step-teaching",
    "/studio/editor",
    "/tools",
    "/reset-password",
    "/admin"
];
let s = new Set([
    "/login",
    "/register",
    "/forgot-password",
    "/verify-success",
    "/buildings/submit",
    "/support"
]);
function c(e) {
    if (!e) {
        return null;
    }
    let t = e instanceof Date ? e : new Date(e);
    if (Number.isNaN(t.getTime())) {
        return null;
    }
    return t;
}
function d(e) {
    return Array.from(e ?? "").length;
}
function u(e) {
    if (!e.startsWith("/") || e.startsWith("//") || /[\\\u0000-\u001F\u007F]/.test(e)) {
        return false;
    }
    try {
        let t = decodeURIComponent(e.split(/[?#]/, 1)[0]);
        return !t.startsWith("//") && !/[\\\u0000-\u001F\u007F]/.test(t);
    } catch (e) {
        return false;
    }
}
function p(e) {
    let t = e.split(/[?#]/, 1)[0] || "/";
    if (t.length > 1) {
        return t.replace(/\/+$/, "");
    }
    return t;
}
function m(e, t) {
    return e === t || e.startsWith(`${t}/`);
}
export function ZL(e, s = new Date, p = s, m = {}) {
    if (e.displayConfig != null) {
        return ((e, t, n, a)=>{
            let p = {};
            let m = !a.draft;
            if (!O9(e.displayConfig)) {
                p.displayConfig = "请选择有效的提醒频次、触发时机和展示范围";
            }
            if (!i.includes(e.type)) {
                p.type = "请选择公告类型";
            }
            if (e.title.trim()) {
                if (d(e.title) > 120) {
                    p.title = "标题最多 120 个字";
                }
            } else {
                p.title = "请填写标题";
            }
            if (!m || e.content?.trim()) {
                if (d(e.content) > 20000) {
                    p.content = "正文最多 20000 个字";
                }
            } else {
                p.content = "请填写公告正文";
            }
            if (d(e.summary) > 500) {
                p.summary = "自定义摘要最多 500 个字";
            }
            let h = [
                e.inInbox,
                e.inPopup,
                e.inBanner,
                e.inChangelog
            ];
            if (h.some((e)=>typeof e !== "boolean")) {
                p.channels = "展示位置格式有误";
            } else if (m && !h.some(Boolean)) {
                p.channels = "至少选择一个出现位置";
            }
            if (e.inChangelog && e.type !== "update" && e.type !== "fix") {
                p.inChangelog = "只有新功能和修复能进入更新日志";
            }
            if (m && e.type === "launch" && !e.buildingId) {
                p.buildingId = "上新公告必须选择建筑";
            }
            let b = e.link?.trim() || "";
            let g = e.popupButton?.trim() || "";
            for (let [i, o, r, l] of (b && !u(b) && (p.link = "只能填写站内路径"), m && b && !g && (p.popupButton = "请填写附加按钮文字"), m && g && !b && (p.link = "请填写附加按钮的站内路径"), d(g) > 24 && (p.popupButton = "按钮文字最多 24 个字"), d(e.popupFact) > 80 && (p.popupFact = "眉标补充最多 80 个字"), e.popupImage && !u(e.popupImage) && (p.popupImage = "请选择站内图片"), [
                [
                    e.inPopup,
                    e.popupUntil,
                    "popupUntil",
                    a.keepPopupUntil
                ],
                [
                    e.inBanner,
                    e.bannerUntil,
                    "bannerUntil",
                    a.keepBannerUntil
                ]
            ])){
                if (!i || !m || !o || l) {
                    continue;
                }
                let e = c(o);
                if (!e || e.getTime() <= n.getTime()) {
                    p[r] = n.getTime() === t.getTime() ? "提醒截止时间必须晚于现在" : "提醒截止时间必须晚于定时发布时间";
                }
            }
            return p;
        })(e, s, p, m);
    }
    let h = {};
    let e_type = e.type;
    let g = !m.draft;
    if (!i.includes(e_type)) {
        h.type = "请选择公告类型";
    }
    if (e.title.trim()) {
        if (d(e.title) > 24) {
            h.title = "标题最多 24 个字";
        }
    } else {
        h.title = "请填写标题";
    }
    if (g && !e.summary.trim()) {
        h.summary = "请填写摘要";
    } else if (d(e.summary) > 80) {
        h.summary = "摘要最多 80 个字";
    }
    let f = e.link?.trim() ?? "";
    if (f && !u(f)) {
        h.link = "只能填写站内路径";
    }
    if (g && e_type === "launch" && !e.buildingId) {
        h.buildingId = "上新公告必须选择建筑";
    }
    if (!(!g || e.inInbox || e.inPopup || e.inBanner || e.inChangelog)) {
        h.channels = "至少选择一个出现位置";
    }
    if (e.inChangelog && e_type !== "update" && e_type !== "fix") {
        h.inChangelog = "只有新功能和修复能进入更新日志";
    }
    if (e.inPopup) {
        if (d(e.popupFact) > 10) {
            h.popupFact = "眉标补充最多 10 个字";
        }
        if (!g || e.popupTitle?.trim()) {
            if (d(e.popupTitle) > 11) {
                h.popupTitle = "弹窗标题最多 11 个字";
            }
        } else {
            h.popupTitle = "请填写弹窗标题";
        }
        if (!g || e.popupText?.trim()) {
            if (d(e.popupText) > 60) {
                h.popupText = "弹窗正文最多 60 个字";
            }
        } else {
            h.popupText = "请填写弹窗正文";
        }
        if (d(e.popupButton) > 5) {
            h.popupButton = "弹窗按钮最多 5 个字";
        }
        let t = c(e.popupUntil);
        if (g && !m.keepPopupUntil) {
            if (t) {
                if (t.getTime() <= p.getTime()) {
                    h.popupUntil = p.getTime() === s.getTime() ? "弹窗截止时间必须晚于现在" : "弹窗截止时间必须晚于定时发布时间";
                } else if (t.getTime() > ((e)=>{
                    let t = new Date(e.getTime() + 28800000).toISOString().slice(0, 10);
                    return new Date(`${t}T23:59:59.999+08:00`).getTime() + 2592000000;
                })(p)) {
                    h.popupUntil = "弹窗最多显示 30 天";
                }
            } else {
                h.popupUntil = "请选择弹窗显示截止时间";
            }
        }
    }
    if (e.inBanner) {
        if (!g || e.bannerBold?.trim()) {
            if (d(e.bannerBold) > 12) {
                h.bannerBold = "横幅粗体文案最多 12 个字";
            }
        } else {
            h.bannerBold = "请填写横幅粗体文案";
        }
        if (d(e.bannerText) > 24) {
            h.bannerText = `横幅后句最多 ${24} 个字`;
        }
        if (d(e.bannerButton) > 4) {
            h.bannerButton = "横幅按钮最多 4 个字";
        }
        let t = c(e.bannerUntil);
        if (g && !m.keepBannerUntil && e.bannerUntil && (!t || t.getTime() <= p.getTime())) {
            h.bannerUntil = p.getTime() === s.getTime() ? "横幅截止时间必须晚于现在" : "横幅截止时间必须晚于定时发布时间";
        }
    }
    return h;
}
export function X_(e) {
    let t = O9(e.displayConfig) ? e.displayConfig : null;
    if (e.displayConfig != null && !t || !e.storageAvailable || e.pageCount < (t?.trigger === "delay" ? 1 : 2) || e.seen || e.sessionDone || e.hasOpenModal) {
        return false;
    }
    let n = p(e.pathname);
    return !(t?.scope === "home" && n !== "/" || t?.scope === "buildings" && !m(n, "/buildings") || s.has(n) || l.some((e)=>m(n, e))) && (!e.targetPath || p(e.targetPath) !== n);
}
