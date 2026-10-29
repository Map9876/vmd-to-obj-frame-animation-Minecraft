const inConstruct = `phrasing`;
const notInConstruct = [
    `autolink`,
    `link`,
    `image`,
    `label`
];
export function io() {
    return {
        unsafe: [
            {
                character: `@`,
                before: `[+\\-.\\w]`,
                after: `[\\-.\\w]`,
                inConstruct,
                notInConstruct
            },
            {
                character: `.`,
                before: `[Ww]`,
                after: `[\\-.\\w]`,
                inConstruct,
                notInConstruct
            },
            {
                character: `:`,
                before: `[ps]`,
                after: `\\/`,
                inConstruct,
                notInConstruct
            }
        ]
    };
}
