export const rl = ({ current })=>{
    if (current) {
        return current.ownerDocument.defaultView;
    }
    return null;
};
const il = (e, t)=>Math.abs(e - t);
export function al(e, t) {
    let n = il(e.x, t.x);
    let r = il(e.y, t.y);
    return Math.sqrt(n ** 2 + r ** 2);
}
