const Sr = new Set([
    `when`,
    `delay`,
    `delayChildren`,
    `staggerChildren`,
    `staggerDirection`,
    `repeat`,
    `repeatType`,
    `repeatDelay`,
    `from`,
    `elapsed`
]);
export function Cr(e) {
    for(let t in e){
        if (!Sr.has(t)) {
            return true;
        }
    }
    return false;
}
