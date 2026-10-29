const Nh = `ga-loader`;
export function Fh(e) {
    if (typeof window > `u` || !e || document.getElementById(Nh)) {
        return;
    }
    let t = document.createElement(`script`);
    t.id = Nh;
    t.async = true;
    t.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(e)}`;
    document.head.appendChild(t);
}
