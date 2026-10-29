const sn = {
    white: `#f9fffe`,
    orange: `#f9801d`,
    magenta: `#c74ebd`,
    light_blue: `#3ab3da`,
    yellow: `#fed83d`,
    lime: `#80c71f`,
    pink: `#f38baa`,
    gray: `#474f52`,
    light_gray: `#9d9d97`,
    cyan: `#169c9c`,
    purple: `#8932b8`,
    blue: `#3c44aa`,
    brown: `#835432`,
    green: `#5e7c16`,
    red: `#b02e26`,
    black: `#1d1d21`
};
export function cn(e) {
    return e && sn[e] || sn.black;
}
