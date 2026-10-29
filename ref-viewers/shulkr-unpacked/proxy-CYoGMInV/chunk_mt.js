function mt(e, t, n) {
    if (n < 0) {
        n += 1;
    }
    if (n > 1) {
        --n;
    }
    if (n < 1 / 6) {
        return e + (t - e) * 6 * n;
    }
    if (n < 1 / 2) {
        return t;
    }
    if (n < 2 / 3) {
        return e + (t - e) * (2 / 3 - n) * 6;
    }
    return e;
}
export function ht({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let i = 0;
    let a = 0;
    let o = 0;
    if (!saturation) {
        o = lightness;
        a = lightness;
        i = lightness;
    } else {
        let r = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        let s = 2 * lightness - r;
        i = mt(s, r, hue + 1 / 3);
        a = mt(s, r, hue);
        o = mt(s, r, hue - 1 / 3);
    }
    return {
        red: Math.round(i * 255),
        green: Math.round(a * 255),
        blue: Math.round(o * 255),
        alpha
    };
}
