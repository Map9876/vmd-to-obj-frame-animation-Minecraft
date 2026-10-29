import { Tg } from "./module-11428_2.js";
export function Z3(e) {
    if (e.cardImg) {
        return e.cardImg;
    }
    if (e.modelKey) {
        return `/step-teaching/img/card-${e.modelKey}.webp`;
    }
    return null;
}
let i = [
    {
        id: "c821a91e-b55b-4b11-b6ee-15fd411e941e",
        badge: "官方原创",
        badgeTone: "brand",
        desc: "从台基、立柱和梁架搭起，再完成屋面、内饰与外部装饰。",
        note: "官方原创 · 带内饰",
        stepDataUrl: Tg.stepsUrl,
        fallbackName: "中式小茶馆",
        modelKey: "teahouse",
        short: "中式小茶馆",
        cardImg: "/step-teaching/img/card-teahouse.webp",
        popupImg: "/step-teaching/img/card-teahouse.webp",
        startAt: Tg.startAt,
        yaw: Tg.yaw
    },
    {
        id: "0d11c83d-1ded-46c0-9e0d-29fcc18c1f56",
        desc: "从园林底座一路搭到屋顶的大月饼，看一整座店铺怎么拆成一步一步。",
        note: "带内饰和庭院",
        stepDataUrl: "/step-teaching/rabbit-mooncake-shop.json",
        fallbackName: "兔月饼铺",
        cardImg: "/step-teaching/img/card-rabbit-front.webp",
        popupImg: "/step-teaching/img/card-rabbit-front.webp"
    },
    {
        id: "552a8eb3-9c8a-472a-a8f6-c203e1d909d3",
        badge: "适合第一次动手",
        badgeTone: "dim",
        desc: "体量不大，内饰完整。可以先熟悉步骤切换、材料清单和 3D 视角。",
        note: "带完整内饰",
        stepDataUrl: "/step-teaching/acacia-house.json",
        fallbackName: "金合欢深色橡木小屋·全内饰",
        popupImg: "/step-teaching/img/diorama-acacia.webp"
    },
    {
        id: "bcf80d92-2c11-4b18-828d-ff528fa0cf5c",
        badge: "高桩＋码头",
        badgeTone: "dim",
        desc: "先用一排高桩把小屋撑起来，再一层层铺出茅草屋顶，最后接上钓鱼码头。",
        note: "带码头和内饰",
        stepDataUrl: "/step-teaching/fishing-hut.json",
        fallbackName: "垂钓小屋",
        popupImg: "/step-teaching/img/diorama-fishing.webp"
    },
    {
        id: "83ccad52-c477-44ec-8189-7557f9d506c5",
        desc: "樱花木多坡屋顶配白桦木檐边，屋里有卧室、书房和附魔角，适合练屋顶收边和小空间摆设。",
        note: "带卧室、书房和附魔角",
        stepDataUrl: "/step-teaching/sakura-villa.json",
        fallbackName: "樱花度假小山庄·全内饰",
        popupImg: "/step-teaching/img/diorama-sakura.webp"
    },
    {
        id: "21a999a1-8e8f-4627-b258-dc0113b9828f",
        desc: "灰白主楼与深色塔楼错落相接，从地基搭到屋内陈设和庭院围墙。",
        note: "带内饰和庭院",
        stepDataUrl: "/step-teaching/concrete-villa.json",
        fallbackName: "混凝土小别墅",
        popupImg: "/step-teaching/img/diorama-concrete.webp"
    },
    {
        id: "b7234c33-92ed-49d0-85a7-72e4afc7ffc5",
        desc: "从草皮地基搭起木石塔身，再做挑檐坡顶、瞭望口与屋内陈设。",
        note: "小体量，适合练坡屋顶",
        stepDataUrl: "/step-teaching/small-watchtower.json",
        fallbackName: "哨塔·小"
    },
    {
        id: "07a42784-5b4c-4958-9e9f-884891168ba5",
        desc: "从草地小岛与木柱搭起，两级收出红白蘑菇伞盖，再布置屋内和门前花草。",
        note: "小体量，适合练蘑菇屋顶",
        stepDataUrl: "/step-teaching/red-mushroom-house.json",
        fallbackName: "红蘑菇小屋"
    },
    {
        id: "22930990-b9d4-4443-a7a4-be0cf4ab49e8",
        desc: "粉色木墙配深红双坡屋顶，屋里有厨房和卧室，门前用粉色围栏圈出一小块农田。",
        note: "带农田和内饰",
        stepDataUrl: "/step-teaching/cherry-farmhouse.json",
        fallbackName: "樱花木小型住宅·农场版"
    },
    {
        id: "81963b20-0242-4ce8-9ab5-8e684e7a61b4",
        desc: "用橡木和云杉木搭出桶身，补上室内家具、营火屋檐和外摆桌椅。",
        note: "带内饰和外摆桌椅",
        stepDataUrl: "/step-teaching/barrel-cabin.json",
        fallbackName: "酒桶小木屋"
    }
];
export function $N(e) {
    return i.find((t)=>t.id === e && !!t.stepDataUrl);
}
export let kh = [
    {
        value: "easier",
        label: "比视频或图文更容易跟"
    },
    {
        value: "same",
        label: "体验差不多"
    },
    {
        value: "harder",
        label: "反而更难跟"
    }
];
