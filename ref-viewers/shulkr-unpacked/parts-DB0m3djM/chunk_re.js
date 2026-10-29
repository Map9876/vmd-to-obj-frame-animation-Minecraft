function re(e, t) {
    if (e.state !== `online` || !e.onlineAt) {
        return null;
    }
    return Math.max(1, Math.floor((t - Date.parse(e.onlineAt)) / 60000));
}
const ie = {
    bar: `uptime.bar`,
    phone: `uptime.phone`,
    chip: `uptime.chip`,
    panel: `panel.live`
};
export function S(e, t, n) {
    let minutes = re(e, n);
    if (minutes == null) {
        return null;
    }
    return {
        key: ie[t],
        minutes
    };
}
