let r = {
    SYSTEM: "SYSTEM",
    SOCIAL: "SOCIAL"
};
Object.values(r);
let s = new Set([
    "system",
    "announcement",
    "benefit",
    "系统",
    "系统通知",
    "公告"
]);
let a = new Set([
    "SOCIAL",
    "social",
    "like",
    "comment",
    "follow",
    "favorite",
    "互动",
    "社交",
    "评论",
    "点赞",
    "关注"
]);
let o = {};
for (let e of s){
    o[e] = r.SYSTEM;
}
for (let e of a){
    o[e] = r.SOCIAL;
}
export function c3(e) {
    if (e && e in o) {
        return o[e];
    }
    return r.SYSTEM;
}
r.SOCIAL;
r.SOCIAL;
r.SOCIAL;
r.SOCIAL;
r.SOCIAL;
r.SYSTEM;
r.SYSTEM;
r.SYSTEM;
