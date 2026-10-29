export var za = Object.freeze({
    Translate: {
        toString (e) {
            if (!e) {
                return;
            }
            let { x, y } = e;
            return `translate3d(` + (x ? Math.round(x) : 0) + `px, ` + (y ? Math.round(y) : 0) + `px, 0)`;
        }
    },
    Scale: {
        toString (e) {
            if (!e) {
                return;
            }
            let { scaleX, scaleY } = e;
            return `scaleX(` + scaleX + `) scaleY(` + scaleY + `)`;
        }
    },
    Transform: {
        toString (e) {
            if (e) {
                return [
                    za.Translate.toString(e),
                    za.Scale.toString(e)
                ].join(` `);
            }
        }
    },
    Transition: {
        toString ({ property, duration, easing }) {
            return property + ` ` + duration + `ms ` + easing;
        }
    }
});
const Ba = `a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]`;
export function Va(e) {
    if (e.matches(Ba)) {
        return e;
    }
    return e.querySelector(Ba);
}
