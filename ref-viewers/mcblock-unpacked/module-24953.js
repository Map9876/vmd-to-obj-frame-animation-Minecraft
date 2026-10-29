import { jsx } from "./module-86897.js";
import { A as icon } from "./module-45201.js";
const l = require(97158);
const a = require(77252);
const i = require(44748);
const o = require(31290);
const c = require(1371);
let u = {
    noData: {
        icon: l.A,
        title: "暂无数据",
        description: "这里还没有内容"
    },
    noResults: {
        icon: a.A,
        title: "没搜到结果",
        description: "换个关键词试试"
    },
    error: {
        icon: i.A,
        title: "加载失败",
        description: "网络不稳定，刷新试试",
        iconBorder: "border-error",
        iconColor: "text-error"
    },
    noAccess: {
        icon,
        title: "需要登录",
        description: "登录后查看此页内容"
    },
    comingSoon: {
        icon: o.A,
        title: "施工中",
        description: "敬请期待，即将上线",
        iconBorder: "border-brand-accent",
        iconColor: "text-brand-accent"
    }
};
export function p({ type = "noData", title, description, icon, iconEmoji, action, onRetry, retryLabel = "重试", className = "", size = "md" }) {
    let b = u[type];
    let x = icon ?? b.icon;
    let p = title ?? b.title;
    let v = description ?? b.description;
    let w = b.iconBorder ?? "border-border-hard";
    let className_1 = b.iconColor ?? "text-text-muted";
    return <div className={`text-center px-4 ${size === "sm" ? "py-8" : size === "lg" ? "py-20" : "py-12"} ${className}`} role={type === "error" ? "alert" : "status"} aria-live={type === "error" ? "assertive" : "polite"}><div className={`${size === "sm" ? "w-12 h-12" : size === "lg" ? "w-24 h-24" : "w-20 h-20"} bg-bg-card border-2 ${w} shadow-inset flex items-center justify-center mx-auto mb-4`} aria-hidden="true">{iconEmoji ? <span className={size === "sm" ? "text-xl" : size === "lg" ? "text-5xl" : "text-3xl"}>{iconEmoji}</span> : jsx(x, {
        size: size === "sm" ? 20 : size === "lg" ? 40 : 32,
        className: className_1
    })}</div><h3 className={`${size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl"} font-bold text-text-primary mb-2`}>{p}</h3>{v && <p className="text-sm text-text-secondary">{v}</p>}{onRetry && <button onClick={onRetry} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-text-on-brand border-2 border-border-hard font-bold text-sm shadow-block hover:shadow-block-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-fast"><c.A size={16}/>{retryLabel}</button>}{action && <div className="mt-4 flex justify-center">{action}</div>}</div>;
}
