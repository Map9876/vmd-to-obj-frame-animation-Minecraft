function le() {
    if (typeof navigator > `u`) {
        return {
            userAgent: ``,
            platform: ``,
            maxTouchPoints: 0
        };
    }
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform ?? ``,
        maxTouchPoints: navigator.maxTouchPoints ?? 0
    };
}
const { userAgent, platform, maxTouchPoints } = le();
export const U = userAgent.toLowerCase();
export const W = platform.toLowerCase();
export const G = /^i(os$|p)/.test(W) || W === `macintel` && maxTouchPoints > 1;
const fe = `android`;
export const pe = W === fe || U.includes(fe);
export const me = !G && W.startsWith(`mac`);
