export let x4 = [
    "none",
    "planning",
    "ready",
    "unsuitable"
];
export let Qt = {
    none: "无步骤",
    planning: "规划中",
    ready: "已就绪",
    unsuitable: "不适合"
};
let n = [
    "none",
    "planning",
    "unsuitable"
];
export function N9(e) {
    return e == null || n.includes(e);
}
