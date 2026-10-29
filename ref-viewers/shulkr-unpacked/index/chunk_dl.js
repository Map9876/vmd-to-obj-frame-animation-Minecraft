const dl = {
    subscription: true,
    purchase: true,
    admin: false,
    promo: false
};
export function fl(e) {
    if (dl[e.source]) {
        return e.endsAt;
    }
    return null;
}
