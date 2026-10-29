const hasOwnProperty = Object.prototype.hasOwnProperty;
export function Ir(e) {
    for(let t in e){
        if (hasOwnProperty.call(e, t)) {
            return true;
        }
    }
    return false;
}
