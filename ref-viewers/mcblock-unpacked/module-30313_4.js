import { forwardRef } from "./module-61426.js";
const s = {
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
export let A = (e, t, n, i)=>{
    let l = forwardRef(({ color = "currentColor", size = 24, stroke = 2, title: title_1, className, children, ...rest }, ref)=><svg ref={ref} {...s[e]} width={size} height={size} className={[
            "tabler-icon",
            `tabler-icon-${t}`,
            className
        ].join(" ")} {...e === "filled" ? {
            fill: color
        } : {
            strokeWidth: stroke,
            stroke: color
        }} {...rest}>{[
            title_1 && <title key="svg-title">{title_1}</title>,
            ...i.map(([T, n])=><T {...n}/>),
            ...Array.isArray(children) ? children : [
                children
            ]
        ]}</svg>);
    l.displayName = `${n}`;
    return l;
};
