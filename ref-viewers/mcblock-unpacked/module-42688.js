import "./module-86897.js";
let n = [
    "#E95F56",
    "#C55BB8",
    "#6366F1",
    "#3B82F6",
    "#0EA5E9",
    "#14B8A6",
    "#22C55E",
    "#EAB308",
    "#F97316",
    "#8B5CF6"
];
export function V(e) {
    if (!e) {
        return "#4A4566";
    }
    let t = 0;
    for(let r = 0; r < e.length; r++){
        t = 31 * t + e.charCodeAt(r) >>> 0;
    }
    return n[t % n.length];
}
export function A({ name, size = 17 }) {
    return <span className="uc-av" style={{
        width: size,
        height: size,
        background: V(name),
        fontSize: Math.round(0.59 * size)
    }} aria-hidden>{name ? name.charAt(0) : "?"}</span>;
}
