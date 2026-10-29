import "./module-28140.js";
import "./module-49417.js";
import "./module-86897.js";
import "./module-66001.js";
import l from "./module-12669.js";
import * as u from "./module-61426.js";
import c from "./module-99062.js";
import f from "./module-82073.js";
import { onRecoverableError } from "./module-3789.js";
import { onCaughtError, onUncaughtError } from "./module-65444.js";
import { callServer } from "./module-41209.js";
import { findSourceMapURL } from "./module-85153.js";
import { createMutableActionQueue } from "./module-11807.js";
import G from "./module-17297.js";
import { createInitialRouterState } from "./module-62592.js";
import "./module-46752.js";
import { setAppBuildId } from "./module-3201.js";
let n;
let a;
let c_createFromReadableStream = c.createFromReadableStream;
let E = document;
let R = new TextEncoder;
let S = false;
let P = false;
let formState = null;
function T(e) {
    if (e[0] === 0) {
        n = [];
    } else if (e[0] === 1) {
        if (!n) {
            throw Object.defineProperty(Error("Unexpected server data: missing bootstrap script."), "__NEXT_ERROR_CODE", {
                value: "E18",
                enumerable: false,
                configurable: true
            });
        }
        if (a) {
            a.enqueue(R.encode(e[1]));
        } else {
            n.push(e[1]);
        }
    } else if (e[0] === 2) {
        formState = e[1];
    } else if (e[0] === 3) {
        if (!n) {
            throw Object.defineProperty(Error("Unexpected server data: missing bootstrap script."), "__NEXT_ERROR_CODE", {
                value: "E18",
                enumerable: false,
                configurable: true
            });
        }
        let r = atob(e[1]);
        let o = new Uint8Array(r.length);
        for(let t = 0; t < r.length; t++){
            o[t] = r.charCodeAt(t);
        }
        if (a) {
            a.enqueue(o);
        } else {
            n.push(o);
        }
    }
}
let j = function() {
    if (a && !P) {
        a.close();
        P = true;
        n = undefined;
    }
    S = true;
};
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", j, false);
} else {
    setTimeout(j);
}
let w = self.__next_f = self.__next_f || [];
w.forEach(T);
w.push = T;
let x = c_createFromReadableStream(new ReadableStream({
    start (e) {
        if (n && (n.forEach((t)=>{
            e.enqueue(typeof t === "string" ? R.encode(t) : t);
        }), S && !P)) {
            if (e.desiredSize === null || e.desiredSize < 0) {
                e.error(Object.defineProperty(Error("The connection to the page was unexpectedly closed, possibly due to the stop button being clicked, loss of Wi-Fi, or an unstable internet connection."), "__NEXT_ERROR_CODE", {
                    value: "E117",
                    enumerable: false,
                    configurable: true
                }));
            } else {
                e.close();
            }
            P = true;
            n = undefined;
        }
        a = e;
    }
}), {
    callServer,
    findSourceMapURL
});
function AComponent({ pendingActionQueue }) {
    let r = u.use(x);
    let actionQueue = u.use(pendingActionQueue);
    return <G actionQueue={actionQueue} globalErrorState={r.G} assetPrefix={r.p}/>;
}
let StrictMode = u.default.StrictMode;
function M({ children }) {
    return children;
}
let N = {
    onDefaultTransitionIndicator: function() {
        return ()=>{};
    },
    onRecoverableError,
    onCaughtError,
    onUncaughtError
};
export function hydrate(e) {
    let pendingActionQueue = new Promise((resolve, reject)=>{
        x.then((r)=>{
            setAppBuildId(r.b);
            let navigatedAt = Date.now();
            resolve(createMutableActionQueue(createInitialRouterState({
                navigatedAt,
                initialFlightData: r.f,
                initialCanonicalUrlParts: r.c,
                initialParallelRoutes: new Map,
                location: window.location,
                couldBeIntercepted: r.i,
                postponed: r.s,
                prerendered: r.S
            }), e));
        }, (e)=>reject(e));
    });
    let r = <StrictMode><f.HeadManagerContext.Provider value={{
        appDir: true
    }}><M><AComponent pendingActionQueue={pendingActionQueue}/></M></f.HeadManagerContext.Provider></StrictMode>;
    if (document.documentElement.id === "__next_error__") {
        l.createRoot(E, N).render(r);
    } else {
        u.default.startTransition(()=>{
            l.hydrateRoot(E, r, {
                ...N,
                formState
            });
        });
    }
}
