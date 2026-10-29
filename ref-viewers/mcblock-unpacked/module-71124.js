function r({ config, src, width, quality }) {
    let a = quality || config.qualities?.reduce((e, t)=>{
        if (Math.abs(t - 75) < Math.abs(e - 75)) {
            return t;
        }
        return e;
    }) || 75;
    return `${config.path}?url=${encodeURIComponent(src)}&w=${width}&q=${a}${src.startsWith("/_next/static/media/"), ""}`;
}
r.__next_img_default = true;
let n = r;
export { n as default };
