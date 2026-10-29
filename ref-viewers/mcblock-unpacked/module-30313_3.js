import { forwardRef } from "./module-61426.js";
const a = {
    outline: {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
    },
    filled: {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        stroke: "none"
    }
};
export let A = (t, e, s, i)=>{
    let o = forwardRef(({ color = "currentColor", size = 24, stroke = 2, title: title_1, className, children, ...rest }, ref)=><svg ref={ref} {...a[t]} width={size} height={size} className={[
            "tabler-icon",
            `tabler-icon-${e}`,
            className
        ].join(" ")} {...t === "filled" ? {
            fill: color
        } : {
            strokeWidth: stroke,
            stroke: color
        }} {...rest}>{[
            title_1 && <title key="svg-title">{title_1}</title>,
            ...i.map(([E, s])=><E {...s}/>),
            ...Array.isArray(children) ? children : [
                children
            ]
        ]}</svg>);
    o.displayName = `${s}`;
    return o;
};
