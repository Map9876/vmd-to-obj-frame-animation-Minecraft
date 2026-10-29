let l = "https://fancycg.oss-cn-beijing.aliyuncs.com/static";
export function d(t) {
    if (l) {
        return `${l}${t}`;
    }
    return t;
}
