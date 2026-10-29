export let wK = 50;
export let Ud = 52428800;
export let qq = 25;
export function uU(e) {
    if (!Number.isFinite(e) || e <= 0) {
        return "0MB";
    }
    return `${(e / 1024 / 1024).toFixed(1)}MB`;
}
export function CR(e) {
    if (!e || e <= 26214400) {
        return null;
    }
    return `当前投影原文件约 ${uU(e)}，账号保存上限约 ${qq}MB；请先导出投影文件保存在本地，或压缩/拆分后再保存到账户。`;
}
