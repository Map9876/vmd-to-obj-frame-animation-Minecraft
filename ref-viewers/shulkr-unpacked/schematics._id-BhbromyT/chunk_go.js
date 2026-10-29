function go(e) {
    return function(t) {
        return [
            ...arguments
        ].slice(1).reduce((acc, item)=>({
                ...acc,
                top: acc.top + e * item.y,
                bottom: acc.bottom + e * item.y,
                left: acc.left + e * item.x,
                right: acc.right + e * item.x
            }), {
            ...t
        });
    };
}
export const _o = go(1);
