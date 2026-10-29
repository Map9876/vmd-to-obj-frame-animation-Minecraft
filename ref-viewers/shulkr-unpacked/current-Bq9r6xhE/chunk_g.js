const g = {
    en: {
        name: `English`,
        dir: `ltr`
    },
    fr: {
        name: `Français`,
        dir: `ltr`
    },
    ru: {
        name: `Русский`,
        dir: `ltr`
    },
    es: {
        name: `Español`,
        dir: `ltr`
    },
    pt: {
        name: `Português`,
        dir: `ltr`
    },
    zh: {
        name: `中文`,
        dir: `ltr`
    },
    de: {
        name: `Deutsch`,
        dir: `ltr`
    }
};
export const _ = Object.keys(g);
export function v(e) {
    return Object.hasOwn(g, e);
}
export function y(e) {
    return g[e].name;
}
export function b(e) {
    return g[e].dir;
}
