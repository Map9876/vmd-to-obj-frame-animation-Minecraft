import { g } from "./module-44478.js";
const n = require(99729);
const l = require(73610);
const o = require(83818);
const s = require(46735);
let i = {
    beginner: {
        color: "bg-brand-primary text-text-on-brand border-2 border-border-hard",
        icon: n.A,
        bgColor: "bg-brand-primary"
    },
    intermediate: {
        color: "bg-warning text-text-on-brand border-2 border-border-hard",
        icon: l.A,
        bgColor: "bg-warning"
    },
    advanced: {
        color: "bg-error text-white border-2 border-border-hard",
        icon: o.A,
        bgColor: "bg-error"
    },
    expert: {
        color: "bg-difficulty-expert text-white border-2 border-border-hard",
        icon: s.A,
        bgColor: "bg-difficulty-expert"
    }
};
function c(e) {
    let t = g(e);
    let r = i[t.key];
    return {
        label: t.label,
        ...r
    };
}
export function ZV(e) {
    if (e >= 10000) {
        return `${(e / 10000).toFixed(1)}万`;
    }
    if (e >= 1000) {
        return `${(e / 1000).toFixed(1)}K`;
    }
    return e.toString();
}
c("easy");
c("beginner");
c("medium");
c("intermediate");
c("hard");
c("advanced");
c("expert");
