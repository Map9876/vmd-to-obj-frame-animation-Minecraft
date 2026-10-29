export const S = /^[A-Za-z0-9_-]{11}$/;
export function pe(e) {
    let t = e.trim();
    if (t.length === 0) {
        return null;
    }
    if (S.test(t)) {
        return t;
    }
    let n;
    try {
        n = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : `https://${t}`);
    } catch  {
        return null;
    }
    let r = n.hostname.toLowerCase().replace(/^(www|m|music)\./, ``);
    let i = (()=>{
        if (r === `youtu.be`) {
            return n.pathname.split(`/`)[1] ?? ``;
        }
        if (r !== `youtube.com` && r !== `youtube-nocookie.com`) {
            return ``;
        }
        let [, e, t] = n.pathname.split(`/`);
        if (e === `watch`) {
            return n.searchParams.get(`v`) ?? ``;
        }
        if (e === `shorts` || e === `embed` || e === `live` || e === `v`) {
            return t ?? ``;
        }
        return ``;
    })();
    if (S.test(i)) {
        return i;
    }
    return null;
}
