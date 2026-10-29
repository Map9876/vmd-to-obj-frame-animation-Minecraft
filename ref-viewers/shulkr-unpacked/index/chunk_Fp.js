export const Fp = `shulkr_locale`;
export function Ip(e) {
    let t = window.location.protocol === `https:` ? `; secure` : ``;
    document.cookie = `${Fp}=${e}; path=/; max-age=31536000; samesite=lax${t}`;
}
