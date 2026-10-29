import { jsx } from "./module-86897.js";
import { A as icon } from "./module-97158_2.js";
import { A as A_1 } from "./module-77252_2.js";
import { A as A_2 } from "./module-44748_4.js";
import { A as A_3 } from "./module-45201.js";
import { A as A_4 } from "./module-31290_2.js";
import { A as A_5 } from "./module-1371_3.js";
let d = {
    noData: {
        icon,
        title: "暂无数据",
        description: "这里还没有内容"
    },
    noResults: {
        icon: A_1,
        title: "没搜到结果",
        description: "换个关键词试试"
    },
    error: {
        icon: A_2,
        title: "加载失败",
        description: "网络不稳定，刷新试试",
        iconBorder: "border-error",
        iconColor: "text-error"
    },
    noAccess: {
        icon: A_3,
        title: "需要登录",
        description: "登录后查看此页内容"
    },
    comingSoon: {
        icon: A_4,
        title: "施工中",
        description: "敬请期待，即将上线",
        iconBorder: "border-brand-accent",
        iconColor: "text-brand-accent"
    }
};
export function p({ type = "noData", title, description, icon, iconEmoji, action, onRetry, retryLabel = "重试", className = "", size = "md" }) {
    let x = d[type];
    let v = icon ?? x.icon;
    let g = title ?? x.title;
    let f = description ?? x.description;
    let j = x.iconBorder ?? "border-border-hard";
    let className_1 = x.iconColor ?? "text-text-muted";
    return <div className={`text-center px-4 ${size === "sm" ? "py-8" : size === "lg" ? "py-20" : "py-12"} ${className}`} role={type === "error" ? "alert" : "status"} aria-live={type === "error" ? "assertive" : "polite"}><div className={`${size === "sm" ? "w-12 h-12" : size === "lg" ? "w-24 h-24" : "w-20 h-20"} bg-bg-card border-2 ${j} shadow-inset flex items-center justify-center mx-auto mb-4`} aria-hidden="true">{iconEmoji ? <span className={size === "sm" ? "text-xl" : size === "lg" ? "text-5xl" : "text-3xl"}>{iconEmoji}</span> : jsx(v, {
        size: size === "sm" ? 20 : size === "lg" ? 40 : 32,
        className: className_1
    })}</div><h3 className={`${size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl"} font-bold text-text-primary mb-2`}>{g}</h3>{f && <p className="text-sm text-text-secondary">{f}</p>}{onRetry && <button onClick={onRetry} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-text-on-brand border-2 border-border-hard font-bold text-sm shadow-block hover:shadow-block-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-fast"><A_5 size={16}/>{retryLabel}</button>}{action && <div className="mt-4 flex justify-center">{action}</div>}</div>;
}
