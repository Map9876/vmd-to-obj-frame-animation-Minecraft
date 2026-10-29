function we(e) {
    switch(e){
        case `\\\\`:
            return `\\`;
        case `\\"`:
            return `"`;
        case `\\n`:
            return `
`;
        case `\\r`:
            return `\r`;
        case `\\b`:
            return `\b`;
        case `\\t`:
            return `	`;
        case `\\f`:
            return `\f`;
        case `\\x3C`:
            return `<`;
        case `\\u2028`:
            return `\u2028`;
        case `\\u2029`:
            return `\u2029`;
        default:
            return e;
    }
}
export function b(e) {
    return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, we);
}
