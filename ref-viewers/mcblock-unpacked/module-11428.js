import { $J as projectionAuthor } from "./module-98900.js";
export let Tg = {
    fallbackName: "中式小茶馆",
    projectionAuthor,
    stepsUrl: "/step-teaching/chinese-teahouse.json",
    objUrl: "/step-teaching/models/teahouse.obj.txt",
    mtlUrl: "/step-teaching/models/teahouse.mtl.txt",
    atlasUrl: "/step-teaching/models/teahouse-atlas.png",
    atlasSize: 2048,
    startAt: 101,
    yaw: -0.55,
    pitch: 27,
    sway: {
        amp: 0.5,
        period: 16
    },
    rewindMs: 1600,
    fastRoot: "内饰",
    posters: {
        sway: "/step-teaching/img/entry-teahouse-sway.webp",
        still: "/step-teaching/img/entry-teahouse-still.webp",
        mobile: "/step-teaching/img/entry-teahouse-mobile.webp"
    }
};
export let _p = {
    l: 14,
    r: 6,
    t: 2,
    b: 12
};
export function lC(e, t) {
    let c = [
        ...e.steps ?? []
    ].sort((e, t)=>e.stepNumber - t.stepNumber);
    if (!c.length) {
        return null;
    }
    let d = new Map((e.chapters ?? []).map((e)=>[
            e.id,
            e
        ]));
    let u = (chapterId)=>{
        let t = [];
        let s = chapterId ? d.get(chapterId) : undefined;
        for(let e = 0; s && e < 16; e++){
            t.unshift(s.title);
            s = s.parentId ? d.get(s.parentId) : undefined;
        }
        return t;
    };
    let steps = [
        {
            chapter: "",
            root: "",
            count: 0,
            fast: false
        }
    ];
    for (let e of c){
        let s = u(e.chapterId);
        let root = s[0] ?? "";
        let count = e.blockCount ?? e.blocks?.length ?? 0;
        steps.push({
            chapter: s.length > 1 ? `${root} · ${s[s.length - 1]}` : root,
            root,
            count,
            fast: root === t || !count
        });
    }
    let segments = [];
    for(let e = 1; e < steps.length; e++){
        let t = segments[segments.length - 1];
        if (t && t.name === steps[e].root) {
            t.to = e;
        } else {
            segments.push({
                name: steps[e].root,
                from: e,
                to: e
            });
        }
    }
    return {
        name: e.buildingName?.trim() || "",
        steps,
        segments
    };
}
export function W_(e) {
    let s = [
        ...e.steps ?? []
    ].sort((e, t)=>e.stepNumber - t.stepNumber);
    let i = new Map;
    s.forEach((e, t)=>{
        for (let r of e.blocks ?? []){
            i.set(`${r.x},${r.y},${r.z}`, t + 1);
        }
    });
    return i;
}
export function tL(e, t) {
    return Math.max(0, Math.min(1, (t - e.from + 1) / (e.to - e.from + 1)));
}
