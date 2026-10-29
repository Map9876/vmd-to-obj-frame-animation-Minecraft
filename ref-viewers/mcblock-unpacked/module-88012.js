export let PO = [
    {
        value: "name",
        label: "更正署名或来源信息"
    },
    {
        value: "home",
        label: "补充作者本人主页"
    },
    {
        value: "confirm",
        label: "确认作者信息"
    },
    {
        value: "usage",
        label: "沟通作品保留范围"
    }
];
export let gd = [
    {
        value: "display",
        label: "网站展示与逐层查看",
        removalLabel: "建筑展示"
    },
    {
        value: "download",
        label: "投影下载",
        removalLabel: "投影下载"
    },
    {
        value: "steps",
        label: "网页步骤教学",
        removalLabel: "网页教学"
    },
    {
        value: "video",
        label: "教学视频",
        removalLabel: "相关视频"
    }
];
export let EP = ()=>({
        role: "player",
        requests: [
            "name"
        ],
        scopes: [],
        authorName: "",
        authorHome: ""
    });
export function Bj(e, t, a, n) {
    let l = cl(n);
    if (!l) {
        return e.trim();
    }
    let o = [
        "author",
        "agent"
    ].includes(t.role) ? t.role : "player";
    let c = o !== "player";
    let d = [
        `相关建筑 ID：${l}`,
        `相关页面：https://mcblock.top/buildings/${l}`,
        `反馈身份（待核查）：${o === "author" ? "作者本人" : o === "agent" ? "受托联系人 / 代理人" : "提供线索的玩家"}`
    ];
    if (a === "correction") {
        let e = PO.filter((e)=>t.requests.includes(e.value) && (c || e.value === "name" || e.value === "home"));
        if (e.length) {
            d.push(`希望处理：${e.map((e)=>e.label).join("、")}`);
        }
    }
    if (c) {
        let e = t.authorName.trim().replace(/[\r\n\x00-\x1f\x7f]/g, " ");
        let a = t.authorHome.trim();
        if (e.length > 100) {
            throw Error("作者名称不得超过100字");
        }
        if (a) {
            try {
                let e = new URL(a);
                if (a.length > 500 || e.protocol !== "https:" || e.username || e.password) {
                    throw Error();
                }
            } catch (e) {
                throw Error("作者主页请填写有效的 https:// 链接");
            }
        }
        if (e) {
            d.push(`希望展示的作者名称：${e}`);
        }
        if (a) {
            d.push(`作者外部主页：${a}`);
        }
    }
    if (a === "removal" || c && t.requests.includes("usage")) {
        let e = gd.filter((e)=>t.scopes.includes(e.value));
        if (e.length) {
            d.push(`${a === "removal" ? "希望撤除" : "希望沟通的保留范围"}：${e.map((e)=>{
                if (a === "removal") {
                    return e.removalLabel;
                }
                return e.label;
            }).join("、")}`);
        }
    }
    d.push("以上为反馈线索和处理意愿，不自动确认作者身份或授予使用许可。");
    let u = `${d.join("\n")}

具体说明：
${e.trim()}`;
    if (u.length > 5000) {
        throw Error("含建筑信息和处理诉求的总内容不得超过5000字，请缩短具体说明");
    }
    return u;
}
export function cl(e) {
    if (typeof e === "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(e)) {
        return e.toLowerCase();
    }
    return null;
}
export function F2(e, t) {
    let targetId = cl(e.id);
    if (!targetId) {
        throw Error("建筑ID无效");
    }
    let s = Array.from(e.name.replace(/[\x00-\x1f\x7f<>]/g, "").trim()).slice(0, 100).join("") || "该建筑";
    let url = `https://mcblock.top/buildings/${targetId}`;
    return {
        category: "content",
        type: "",
        targetType: "BUILDING",
        targetId,
        subject: `${s}的署名 / 来源更正`,
        content: `相关建筑：${s}
建筑 ID：${targetId}
相关页面：${url}

${t === "removal" ? "需要移除的内容（如详情、投影、教学）：\n具体说明：" : "希望更正的署名或来源：\n原始发布链接（如有）：\n具体说明："}`,
        url
    };
}
