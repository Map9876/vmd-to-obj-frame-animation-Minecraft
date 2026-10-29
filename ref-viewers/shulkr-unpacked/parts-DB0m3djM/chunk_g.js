export const g = `26.3`;
const _ = {
    starting: 3000,
    online: 10000,
    stopping: 10000,
    stopped: false,
    failed: false
};
export const v = (e)=>_[e] !== false;
export function y(e) {
    return e != null && v(e.state);
}
export function b(e) {
    if (e) {
        return _[e.state];
    }
    return false;
}
