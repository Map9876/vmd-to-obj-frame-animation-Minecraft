const SYMBOL_REACT_TRANSITIONAL_ELEMENT = Symbol.for("react.transitional.element");
export function jsx(type, t, props) {
    let a = null;
    if (props !== undefined) {
        a = `${props}`;
    }
    if (t.key !== undefined) {
        a = `${t.key}`;
    }
    if ("key" in t) {
        props = {};
        for(const o in t){
            if (o !== "key") {
                props[o] = t[o];
            }
        }
    } else {
        props = t;
    }
    return {
        $$typeof: SYMBOL_REACT_TRANSITIONAL_ELEMENT,
        type,
        key: a,
        ref: (t = props.ref) !== undefined ? t : null,
        props
    };
}
export const Fragment = Symbol.for("react.fragment");
export { jsx as jsxs };
