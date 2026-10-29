export function fi(e, t, n, r) {
    if (!e || !t || !t.scrollTo) {
        return;
    }
    let e_scrollLeft = e.scrollLeft;
    let e_scrollTop = e.scrollTop;
    let o = e.clientWidth < e.scrollWidth;
    let s = e.clientHeight < e.scrollHeight;
    if (o && r !== `vertical`) {
        let r = pi(e, t, `left`);
        let a = mi(e);
        let o = mi(t);
        if (n === `ltr`) {
            if (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight) {
                e_scrollLeft = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight;
            } else if (r - o.scrollMarginLeft < e.scrollLeft + a.scrollPaddingLeft) {
                e_scrollLeft = r - o.scrollMarginLeft - a.scrollPaddingLeft;
            }
        }
        if (n === `rtl`) {
            if (r - o.scrollMarginRight < e.scrollLeft + a.scrollPaddingLeft) {
                e_scrollLeft = r - o.scrollMarginLeft - a.scrollPaddingLeft;
            } else if (r + t.offsetWidth + o.scrollMarginRight > e.scrollLeft + e.clientWidth - a.scrollPaddingRight) {
                e_scrollLeft = r + t.offsetWidth + o.scrollMarginRight - e.clientWidth + a.scrollPaddingRight;
            }
        }
    }
    if (s && r !== `horizontal`) {
        let n = pi(e, t, `top`);
        let r = mi(e);
        let i = mi(t);
        if (n - i.scrollMarginTop < e.scrollTop + r.scrollPaddingTop) {
            e_scrollTop = n - i.scrollMarginTop - r.scrollPaddingTop;
        } else if (n + t.offsetHeight + i.scrollMarginBottom > e.scrollTop + e.clientHeight - r.scrollPaddingBottom) {
            e_scrollTop = n + t.offsetHeight + i.scrollMarginBottom - e.clientHeight + r.scrollPaddingBottom;
        }
    }
    e.scrollTo({
        left: e_scrollLeft,
        top: e_scrollTop,
        behavior: `auto`
    });
}
function pi(e, t, n) {
    let r = n === `left` ? `offsetLeft` : `offsetTop`;
    let i = 0;
    while(t.offsetParent && (i += t[r], t.offsetParent !== e)){
        t = t.offsetParent;
    }
    return i;
}
function mi(e) {
    let t = getComputedStyle(e);
    return {
        scrollMarginTop: parseFloat(t.scrollMarginTop) || 0,
        scrollMarginRight: parseFloat(t.scrollMarginRight) || 0,
        scrollMarginBottom: parseFloat(t.scrollMarginBottom) || 0,
        scrollMarginLeft: parseFloat(t.scrollMarginLeft) || 0,
        scrollPaddingTop: parseFloat(t.scrollPaddingTop) || 0,
        scrollPaddingRight: parseFloat(t.scrollPaddingRight) || 0,
        scrollPaddingBottom: parseFloat(t.scrollPaddingBottom) || 0,
        scrollPaddingLeft: parseFloat(t.scrollPaddingLeft) || 0
    };
}
