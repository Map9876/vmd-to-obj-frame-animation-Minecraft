import * as s from "./module-61426.js";
import { ConcurrentRoot, ContinuousEventPriority, DefaultEventPriority, DiscreteEventPriority } from "./module-1975.js";
import { FV, GWd, I9Y, OUM, Pq0, Q1f, QP0 as percentage, RyA, Wk7 as soft, Z58, Zr2, bTm, er$, ppV, qUd, tBo, ubm, y_p, zD7, zgK } from "./module-85339.js";
import { WebGLRenderer } from "./module-87548.js";
import * as f from "./module-83654.js";
import { DY, IU, uv } from "./module-23689.js";
import g from "./module-77719.js";
import { unstable_IdlePriority, unstable_scheduleCallback } from "./module-66451.js";
import { jsx } from "./module-86897.js";
import { Nz, u5, y3 } from "./module-54735.js";
let r;
let o;
let i;
let a;
let l;
const c = s;
const h = require(90490);
let { useSyncExternalStoreWithSelector } = f;
let v = (e, t)=>{
    let n = h.y(e);
    let r = (e, r = t)=>((e, t = (e)=>e, n)=>{
            let r = useSyncExternalStoreWithSelector(e.subscribe, e.getState, e.getInitialState, t, n);
            s.useDebugValue(r);
            return r;
        })(n, e, r);
    Object.assign(r, n);
    return r;
};
function P({ root }) {
    while(root.getState().previousRoot){
        root = root.getState().previousRoot;
    }
    return root;
}
c.act;
let C = (e)=>e && e.hasOwnProperty("current");
export { C as i };
let O = (e)=>e != null && (typeof e === "string" || typeof e === "number" || e.isColor);
export let b = ((e, t)=>typeof window !== "undefined" && (((e = window.document) == null ? undefined : e.createElement) || ((t = window.navigator) == null ? undefined : t.product) === "ReactNative"))() ? s.useLayoutEffect : s.useEffect;
function useM(e) {
    let tRef = s.useRef(e);
    b(()=>void (tRef.current = e), [
        e
    ]);
    return tRef;
}
export { useM as a };
export function u() {
    let e = u5();
    let t = y3();
    return s.useMemo(()=>({ children })=>{
            let r = Nz(e, true, (e)=>e.type === s.StrictMode) ? s.StrictMode : s.Fragment;
            return jsx(r, {
                children: jsx(t, {
                    children
                })
            });
        }, [
        e,
        t
    ]);
}
function S({ set }) {
    b(()=>{
        set(new Promise(()=>null));
        return ()=>set(false);
    }, [
        set
    ]);
    return null;
}
export { S as B };
export let E = ((e)=>{
    e = class extends s.Component {
        constructor(...e){
            super(...e);
            this.state = {
                error: false
            };
        }
        componentDidCatch(e) {
            this.props.set(e);
        }
        render() {
            if (this.state.error) {
                return null;
            }
            return this.props.children;
        }
    };
    e.getDerivedStateFromError = ()=>({
            error: true
        });
    return e;
})();
function A(e) {
    let n = typeof window !== "undefined" ? window.devicePixelRatio ?? 2 : 1;
    if (Array.isArray(e)) {
        return Math.min(Math.max(e[0], n), e[1]);
    }
    return e;
}
function _(e) {
    return e.__r3f?.root.getState();
}
let I = {
    obj: (e)=>e === Object(e) && !I.arr(e) && typeof e !== "function",
    fun: (e)=>typeof e === "function",
    str: (e)=>typeof e === "string",
    num: (e)=>typeof e === "number",
    boo: (e)=>typeof e === "boolean",
    und: (e)=>e === undefined,
    nul: (e)=>e === null,
    arr: (e)=>Array.isArray(e),
    equ (e, t, { arrays = "shallow", objects = "reference", strict = true } = {}) {
        let i;
        if (typeof e != typeof t || !!e != !!t) {
            return false;
        }
        if (I.str(e) || I.num(e) || I.boo(e)) {
            return e === t;
        }
        let a = I.obj(e);
        if (a && objects === "reference") {
            return e === t;
        }
        let l = I.arr(e);
        if (l && arrays === "reference") {
            return e === t;
        }
        if ((l || a) && e === t) {
            return true;
        }
        for(i in e){
            if (!(i in t)) {
                return false;
            }
        }
        if (a && arrays === "shallow" && objects === "shallow") {
            for(i in strict ? t : e){
                if (!I.equ(e[i], t[i], {
                    strict,
                    objects: "reference"
                })) {
                    return false;
                }
            }
        } else {
            for(i in strict ? t : e){
                if (e[i] !== t[i]) {
                    return false;
                }
            }
        }
        if (I.und(i)) {
            if (l && e.length === 0 && t.length === 0 || a && Object.keys(e).length === 0 && Object.keys(t).length === 0) {
                return true;
            }
            if (e !== t) {
                return false;
            }
        }
        return true;
    }
};
let L = [
    "children",
    "key",
    "ref"
];
function R(object, root, type, r) {
    let o = object?.__r3f;
    if (!o) {
        o = {
            root,
            type,
            parent: null,
            children: [],
            props: ((e)=>{
                let t = {};
                for(let n in e){
                    if (!L.includes(n)) {
                        t[n] = e[n];
                    }
                }
                return t;
            })(r),
            object,
            eventCount: 0,
            handlers: {},
            isHidden: false
        };
        if (object) {
            object.__r3f = o;
        }
    }
    return o;
}
function z(root, t) {
    if (!t.includes("-") || t in root) {
        return {
            root,
            key: t,
            target: root[t]
        };
    }
    let n = root;
    let r = t.split("-");
    for (let o of r){
        if (typeof n !== "object" || n === null) {
            if (n !== undefined) {
                return {
                    root: n,
                    key: r.slice(r.indexOf(o)).join("-"),
                    target: undefined
                };
            }
            return {
                root,
                key: t,
                target: undefined
            };
        }
        t = o;
        root = n;
        n = n[t];
    }
    return {
        root,
        key: t,
        target: n
    };
}
let D = /-\d+$/;
function N(e, t) {
    if (I.str(t.props.attach)) {
        if (D.test(t.props.attach)) {
            let n = t.props.attach.replace(D, "");
            let { root: root_1, key: key_1 } = z(e.object, n);
            if (!Array.isArray(root_1[key_1])) {
                root_1[key_1] = [];
            }
        }
        let { root, key } = z(e.object, t.props.attach);
        t.previousAttach = root[key];
        root[key] = t.object;
    } else {
        if (I.fun(t.props.attach)) {
            t.previousAttach = t.props.attach(e.object, t.object);
        }
    }
}
function H(e, t) {
    if (I.str(t.props.attach)) {
        let { root, key } = z(e.object, t.props.attach);
        let o = t.previousAttach;
        if (o === undefined) {
            delete root[key];
        } else {
            root[key] = o;
        }
    } else {
        t.previousAttach?.(e.object, t.object);
    }
    delete t.previousAttach;
}
let Y = [
    ...L,
    "args",
    "dispose",
    "attach",
    "object",
    "onUpdate",
    "dispose"
];
let F = new Map;
let q = [
    "map",
    "emissiveMap",
    "sheenColorMap",
    "specularColorMap",
    "envMap"
];
let U = /^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;
function V(e, t) {
    let e___r3f = e.__r3f;
    let i = e___r3f && P(e___r3f).getState();
    let a = e___r3f?.eventCount;
    for(let n in t){
        let a = t[n];
        if (Y.includes(n)) {
            continue;
        }
        if (e___r3f && U.test(n)) {
            if (typeof a === "function") {
                e___r3f.handlers[n] = a;
            } else {
                delete e___r3f.handlers[n];
            }
            e___r3f.eventCount = Object.keys(e___r3f.handlers).length;
            continue;
        }
        if (a === undefined) {
            continue;
        }
        let { root, key, target } = z(e, n);
        if (target === undefined && (typeof root !== "object" || root === null)) {
            throw Error(`R3F: Cannot set "${n}". Ensure it is an object before setting "${key}".`);
        }
        if (target instanceof zgK && a instanceof zgK) {
            target.mask = a.mask;
        } else if (target instanceof Q1f && O(a)) {
            target.set(a);
        } else if (target !== null && typeof target === "object" && typeof target.set === "function" && typeof target.copy === "function" && a?.constructor && target.constructor === a.constructor) {
            target.copy(a);
        } else if (target !== null && typeof target === "object" && typeof target.set === "function" && Array.isArray(a)) {
            if (typeof target.fromArray === "function") {
                target.fromArray(a);
            } else {
                target.set(...a);
            }
        } else if (target !== null && typeof target === "object" && typeof target.set === "function" && typeof a === "number") {
            if (typeof target.setScalar === "function") {
                target.setScalar(a);
            } else {
                target.set(a);
            }
        } else {
            root[key] = a;
            if (i && !i.linear && q.includes(key) && root[key]?.isTexture && root[key].format === GWd && root[key].type === OUM) {
                root[key].colorSpace = er$;
            }
        }
    }
    if (e___r3f?.parent && i?.internal && e___r3f.object?.isObject3D && a !== e___r3f.eventCount) {
        let e = e___r3f.object;
        let t = i.internal.interaction.indexOf(e);
        if (t > -1) {
            i.internal.interaction.splice(t, 1);
        }
        if (e___r3f.eventCount && e.raycast !== null) {
            i.internal.interaction.push(e);
        }
    }
    if (e___r3f && e___r3f.props.attach === undefined) {
        if (e___r3f.object.isBufferGeometry) {
            e___r3f.props.attach = "geometry";
        } else if (e___r3f.object.isMaterial) {
            e___r3f.props.attach = "material";
        }
    }
    if (e___r3f) {
        B(e___r3f);
    }
    return e;
}
function B(e) {
    let t;
    if (!e.parent) {
        return;
    }
    e.props.onUpdate?.(e.object);
    let n = (t = e.root) == null || t.getState == null ? undefined : t.getState();
    if (n && n.internal.frames === 0) {
        n.invalidate();
    }
}
let X = (e)=>e?.isObject3D;
function Z(e) {
    return `${(e.eventObject || e.object).uuid}/${e.index}${e.instanceId}`;
}
function W(capturedMap, t, n, r) {
    let o = n.get(t);
    if (o) {
        n.delete(t);
        if (n.size === 0) {
            capturedMap.delete(r);
            o.target.releasePointerCapture(r);
        }
    }
}
let K = (e)=>!!(e != null && e.render);
let $Context = s.createContext(null);
function useG() {
    let e = s.useContext($Context);
    if (!e) {
        throw Error("R3F: Hooks can only be used within the Canvas component!");
    }
    return e;
}
function Q(e = (e)=>e, t) {
    return useG()(e, t);
}
export { Q as C };
function J(e, t = 0) {
    let n = useG();
    let subscribe = n.getState().internal.subscribe;
    let o = useM(e);
    b(()=>subscribe(o, t, n), [
        t,
        subscribe,
        n
    ]);
    return null;
}
export { J as D };
let ee = new WeakMap;
function et(e, t) {
    return function(n, ...r) {
        let i;
        if (typeof n === "function" && n?.prototype?.constructor === n) {
            if (!(i = ee.get(n))) {
                i = new n;
                ee.set(n, i);
            }
        } else {
            i = n;
        }
        if (e) {
            e(i);
        }
        return Promise.all(r.map((e)=>new Promise((resolve, reject)=>i.load(e, (e)=>{
                    if (X(e?.scene)) {
                        Object.assign(e, ((e)=>{
                            let t = {
                                nodes: {},
                                materials: {},
                                meshes: {}
                            };
                            if (e) {
                                e.traverse((e)=>{
                                    if (e.name) {
                                        t.nodes[e.name] = e;
                                    }
                                    if (e.material && !t.materials[e.material.name]) {
                                        t.materials[e.material.name] = e.material;
                                    }
                                    if (e.isMesh && !t.meshes[e.name]) {
                                        t.meshes[e.name] = e;
                                    }
                                });
                            }
                            return t;
                        })(e.scene));
                    }
                    resolve(e);
                }, t, (t)=>reject(Error(`Could not load ${e}: ${t?.message}`))))));
    };
}
function en(e, t, n, r) {
    let o = Array.isArray(t) ? t : [
        t
    ];
    let i = DY(et(n, r), [
        e,
        ...o
    ], {
        equal: I.equ
    });
    if (Array.isArray(t)) {
        return i;
    }
    return i[0];
}
en.preload = function(e, t, n) {
    let r = Array.isArray(t) ? t : [
        t
    ];
    return uv(et(n), [
        e,
        ...r
    ]);
};
en.clear = function(e, t) {
    let n = Array.isArray(t) ? t : [
        t
    ];
    return IU([
        e,
        ...n
    ]);
};
let er = {};
let eo = /^three(?=[A-Z])/;
let ei = (e)=>`${e[0].toUpperCase()}${e.slice(1)}`;
let ea = 0;
function el(e) {
    if (typeof e === "function") {
        let t = `${ea++}`;
        er[t] = e;
        return t;
    }
    Object.assign(er, e);
}
export { el as e };
function es(e, t) {
    let n = ei(e);
    let r = er[n];
    if (e !== "primitive" && !r) {
        throw Error(`R3F: ${n} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
    }
    if (e === "primitive" && !t.object) {
        throw Error("R3F: Primitives without 'object' are invalid!");
    }
    if (t.args !== undefined && !Array.isArray(t.args)) {
        throw Error("R3F: The args prop must be an array!");
    }
}
function unhideInstance(e) {
    if (e.isHidden) {
        let t;
        if (e.props.attach && (t = e.parent) != null && t.object) {
            N(e.parent, e);
        } else if (X(e.object) && e.props.visible !== false) {
            e.object.visible = true;
        }
        e.isHidden = false;
        B(e);
    }
}
function eu(e, t, n) {
    let r = t.root.getState();
    if (e.parent || e.object === r.scene) {
        if (!t.object) {
            let e = er[ei(t.type)];
            t.object = t.props.object ?? new e(...t.props.args ?? []);
            t.object.__r3f = t;
        }
        V(t.object, t.props);
        if (t.props.attach) {
            N(e, t);
        } else if (X(t.object) && X(e.object)) {
            let r = e.object.children.indexOf(n?.object);
            if (n && r !== -1) {
                let n = e.object.children.indexOf(t.object);
                if (n !== -1) {
                    e.object.children.splice(n, 1);
                    e.object.children.splice(n < r ? r - 1 : r, 0, t.object);
                } else {
                    t.object.parent = e.object;
                    e.object.children.splice(r, 0, t.object);
                    t.object.dispatchEvent({
                        type: "added"
                    });
                    e.object.dispatchEvent({
                        type: "childadded",
                        child: t.object
                    });
                }
            } else {
                e.object.add(t.object);
            }
        }
        for (let e of t.children){
            eu(t, e);
        }
        B(t);
    }
}
function ep(e, t) {
    if (t) {
        t.parent = e;
        e.children.push(t);
        eu(e, t);
    }
}
function insertBefore(e, t, n) {
    if (!t || !n) {
        return;
    }
    t.parent = e;
    let r = e.children.indexOf(n);
    if (r !== -1) {
        e.children.splice(r, 0, t);
    } else {
        e.children.push(t);
    }
    eu(e, t, n);
}
function ef(object) {
    if (typeof object.dispose === "function") {
        let t = ()=>{
            try {
                object.dispose();
            } catch  {}
        };
        if (typeof IS_REACT_ACT_ENVIRONMENT !== "undefined") {
            t();
        } else {
            unstable_scheduleCallback(unstable_IdlePriority, t);
        }
    }
}
function removeChild(e, t, n) {
    if (!t) {
        return;
    }
    t.parent = null;
    let r = e.children.indexOf(t);
    if (r !== -1) {
        e.children.splice(r, 1);
    }
    if (t.props.attach) {
        H(e, t);
    } else if (X(t.object) && X(e.object)) {
        e.object.remove(t.object);
        ((e, t)=>{
            let { internal } = e.getState();
            internal.interaction = internal.interaction.filter((e)=>e !== t);
            internal.initialHits = internal.initialHits.filter((e)=>e !== t);
            internal.hovered.forEach((e, r)=>{
                if (e.eventObject === t || e.object === t) {
                    internal.hovered.delete(r);
                }
            });
            internal.capturedMap.forEach((e, r)=>{
                W(internal.capturedMap, t, e, r);
            });
        })(P(t), t.object);
    }
    let o = t.props.dispose !== null && n !== false;
    for(let e = t.children.length - 1; e >= 0; e--){
        let n = t.children[e];
        removeChild(t, n, o);
    }
    t.children.length = 0;
    delete t.object.__r3f;
    if (o && t.type !== "primitive" && t.object.type !== "Scene") {
        ef(t.object);
    }
    if (n === undefined) {
        B(t);
    }
}
let em = [];
let ev = ()=>{};
let eb = {};
let eg = 0;
let ey = ((e)=>{
    let t = g(e);
    t.injectIntoDevTools();
    return t;
})({
    isPrimaryRenderer: false,
    warnsIfNotActing: false,
    supportsMutation: true,
    supportsPersistence: false,
    supportsHydration: false,
    createInstance: function(e, t, n) {
        let r;
        es(e = ei(e) in er ? e : e.replace(eo, ""), t);
        if (e === "primitive" && (r = t.object) != null && r.__r3f) {
            delete t.object.__r3f;
        }
        return R(t.object, n, e, t);
    },
    removeChild,
    appendChild: ep,
    appendInitialChild: ep,
    insertBefore,
    appendChildToContainer (e, t) {
        let __r3f = e.getState().scene.__r3f;
        if (t && __r3f) {
            ep(__r3f, t);
        }
    },
    removeChildFromContainer (e, t) {
        let __r3f = e.getState().scene.__r3f;
        if (t && __r3f) {
            removeChild(__r3f, t);
        }
    },
    insertInContainerBefore (e, t, n) {
        let __r3f = e.getState().scene.__r3f;
        if (t && n && __r3f) {
            insertBefore(__r3f, t, n);
        }
    },
    getRootHostContext: ()=>eb,
    getChildHostContext: ()=>eb,
    commitUpdate (e, t, n, r, o) {
        let l;
        es(t, r);
        let s = false;
        if (e.type === "primitive" && n.object !== r.object || r.args?.length !== n.args?.length) {
            s = true;
        } else if ((l = r.args) != null && l.some((e, t)=>e !== n.args?.[t])) {
            s = true;
        }
        if (s) {
            em.push([
                e,
                {
                    ...r
                },
                o
            ]);
        } else {
            let t = ((e, t)=>{
                let n = {};
                for(let r in t){
                    if (!Y.includes(r) && !I.equ(t[r], e.props[r])) {
                        for(let e in n[r] = t[r], t){
                            if (e.startsWith(`${r}-`)) {
                                n[e] = t[e];
                            }
                        }
                    }
                }
                for(let r in e.props){
                    if (Y.includes(r) || t.hasOwnProperty(r)) {
                        continue;
                    }
                    let { root, key } = z(e.object, r);
                    if (root.constructor && root.constructor.length === 0) {
                        let e = ((root_1)=>{
                            let t = F.get(root_1.constructor);
                            try {
                                if (!t) {
                                    t = new root_1.constructor;
                                    F.set(root_1.constructor, t);
                                }
                            } catch (e) {}
                            return t;
                        })(root);
                        if (!I.und(e)) {
                            n[key] = e[key];
                        }
                    } else {
                        n[key] = 0;
                    }
                }
                return n;
            })(e, r);
            if (Object.keys(t).length) {
                Object.assign(e.props, t);
                V(e.object, t);
            }
        }
        if (o.sibling === null || (4 & o.flags) == 0) {
            (()=>{
                for (let [e] of em){
                    let t = e.parent;
                    if (t) {
                        for (let n of (e.props.attach ? H(t, e) : X(e.object) && X(t.object) && t.object.remove(e.object), e.children)){
                            if (n.props.attach) {
                                H(e, n);
                            } else if (X(n.object) && X(e.object)) {
                                e.object.remove(n.object);
                            }
                        }
                    }
                    if (e.isHidden) {
                        unhideInstance(e);
                    }
                    if (e.object.__r3f) {
                        delete e.object.__r3f;
                    }
                    if (e.type !== "primitive") {
                        ef(e.object);
                    }
                }
                for (let [r, o, i] of em){
                    r.props = o;
                    let a = r.parent;
                    if (a) {
                        let o = er[ei(r.type)];
                        r.object = r.props.object ?? new o(...r.props.args ?? []);
                        r.object.__r3f = r;
                        const n = r.object;
                        for (let e of [
                            i,
                            i.alternate
                        ]){
                            if (e !== null) {
                                if (typeof e.ref === "function") {
                                    e.refCleanup?.();
                                    let t = e.ref(n);
                                    if (typeof t === "function") {
                                        e.refCleanup = t;
                                    }
                                } else {
                                    if (e.ref) {
                                        e.ref.current = n;
                                    }
                                }
                            }
                        }
                        for (let e of (V(r.object, r.props), r.props.attach ? N(a, r) : X(r.object) && X(a.object) && a.object.add(r.object), r.children)){
                            if (e.props.attach) {
                                N(r, e);
                            } else if (X(e.object) && X(r.object)) {
                                r.object.add(e.object);
                            }
                        }
                        B(r);
                    }
                }
                em.length = 0;
            })();
        }
    },
    finalizeInitialChildren: ()=>false,
    commitMount () {},
    getPublicInstance: (e)=>e?.object,
    prepareForCommit: ()=>null,
    preparePortalMount: (e)=>R(e.getState().scene, e, "", {}),
    resetAfterCommit: ()=>{},
    shouldSetTextContent: ()=>false,
    clearContainer: ()=>false,
    hideInstance: function(e) {
        if (!e.isHidden) {
            let t;
            if (e.props.attach && (t = e.parent) != null && t.object) {
                H(e.parent, e);
            } else if (X(e.object)) {
                e.object.visible = false;
            }
            e.isHidden = true;
            B(e);
        }
    },
    unhideInstance,
    createTextInstance: ev,
    hideTextInstance: ev,
    unhideTextInstance: ev,
    scheduleTimeout: typeof setTimeout === "function" ? setTimeout : undefined,
    cancelTimeout: typeof clearTimeout === "function" ? clearTimeout : undefined,
    noTimeout: -1,
    getInstanceFromNode: ()=>null,
    beforeActiveInstanceBlur () {},
    afterActiveInstanceBlur () {},
    detachDeletedInstance () {},
    prepareScopeUpdate () {},
    getInstanceFromScope: ()=>null,
    shouldAttemptEagerTransition: ()=>false,
    trackSchedulerEvent: ()=>{},
    resolveEventType: ()=>null,
    resolveEventTimeStamp: ()=>-1.1,
    requestPostPaintCallback () {},
    maySuspendCommit: ()=>false,
    preloadInstance: ()=>true,
    startSuspendingCommit () {},
    suspendInstance () {},
    waitForCommitToBeReady: ()=>null,
    NotPendingTransition: null,
    HostTransitionContext: s.createContext(null),
    setCurrentUpdatePriority (e) {
        eg = e;
    },
    getCurrentUpdatePriority: ()=>eg,
    resolveUpdatePriority () {
        if (eg !== 0) {
            return eg;
        }
        switch(typeof window !== "undefined" && window.event?.type){
            case "click":
            case "contextmenu":
            case "dblclick":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
                return DiscreteEventPriority;
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerenter":
            case "pointerleave":
            case "wheel":
                return ContinuousEventPriority;
            default:
                return DefaultEventPriority;
        }
    },
    resetFormInstance () {},
    rendererPackageName: "@react-three/fiber",
    rendererVersion: "9.4.2"
});
let ew = new Map;
let ej = {
    objects: "shallow",
    strict: false
};
function eE(e) {
    let onCreated_1;
    let n;
    let r = ew.get(e);
    let o = r?.fiber;
    let i = r?.store;
    if (r) {
        console.warn("R3F.createRoot should only be called once!");
    }
    let a = typeof reportError === "function" ? reportError : console.error;
    let store = i || ((e, t)=>{
        let n;
        let r;
        let o = (n = (set, get)=>{
            let o;
            let i = new Pq0;
            let a = new Pq0;
            let l = new Pq0;
            function getCurrentViewport(e = get().camera, t = a, { width, height, top, left } = get().size) {
                let aspect = width / height;
                if (t.isVector3) {
                    l.copy(t);
                } else {
                    l.set(...t);
                }
                let distance = e.getWorldPosition(i).distanceTo(l);
                if (e && e.isOrthographicCamera) {
                    return {
                        width: width / e.zoom,
                        height: height / e.zoom,
                        top,
                        left,
                        factor: 1,
                        distance,
                        aspect
                    };
                }
                {
                    let height_1 = 2 * Math.tan(e.fov * Math.PI / 180 / 2) * distance;
                    let width_1 = width / height * height_1;
                    return {
                        width: width_1,
                        height: height_1,
                        top,
                        left,
                        factor: width / width_1,
                        distance,
                        aspect
                    };
                }
            }
            let u = (current)=>set((t)=>({
                        performance: {
                            ...t.performance,
                            current
                        }
                    }));
            let d = new I9Y;
            return {
                set,
                get,
                gl: null,
                camera: null,
                raycaster: null,
                events: {
                    priority: 1,
                    enabled: true,
                    connected: false
                },
                scene: null,
                xr: null,
                invalidate: (t = 1)=>e(get(), t),
                advance: (e, n)=>t(e, n, get()),
                legacy: false,
                linear: false,
                flat: false,
                controls: null,
                clock: new zD7,
                pointer: d,
                mouse: d,
                frameloop: "always",
                onPointerMissed: undefined,
                performance: {
                    current: 1,
                    min: 0.5,
                    max: 1,
                    debounce: 200,
                    regress: ()=>{
                        let e = get();
                        if (o) {
                            clearTimeout(o);
                        }
                        if (e.performance.current !== e.performance.min) {
                            u(e.performance.min);
                        }
                        o = setTimeout(()=>u(get().performance.max), e.performance.debounce);
                    }
                },
                size: {
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0
                },
                viewport: {
                    initialDpr: 0,
                    dpr: 0,
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
                    aspect: 0,
                    distance: 0,
                    factor: 0,
                    getCurrentViewport
                },
                setEvents: (e)=>set((t)=>({
                            ...t,
                            events: {
                                ...t.events,
                                ...e
                            }
                        })),
                setSize: (width, height, top = 0, left = 0)=>{
                    let camera = get().camera;
                    let size = {
                        width,
                        height,
                        top,
                        left
                    };
                    set((e)=>({
                            size,
                            viewport: {
                                ...e.viewport,
                                ...getCurrentViewport(camera, a, size)
                            }
                        }));
                },
                setDpr: (e)=>set((t)=>{
                        let dpr_1 = A(e);
                        return {
                            viewport: {
                                ...t.viewport,
                                dpr: dpr_1,
                                initialDpr: t.viewport.initialDpr || dpr_1
                            }
                        };
                    }),
                setFrameloop: (frameloop = "always")=>{
                    let clock = get().clock;
                    clock.stop();
                    clock.elapsedTime = 0;
                    if (frameloop !== "never") {
                        clock.start();
                        clock.elapsedTime = 0;
                    }
                    set(()=>({
                            frameloop
                        }));
                },
                previousRoot: undefined,
                internal: {
                    interaction: [],
                    hovered: new Map,
                    subscribers: [],
                    initialClick: [
                        0,
                        0
                    ],
                    initialHits: [],
                    capturedMap: new Map,
                    lastEvent: s.createRef(),
                    active: false,
                    frames: 0,
                    priority: 0,
                    subscribe: (ref, priority, store)=>{
                        let internal = get().internal;
                        internal.priority = internal.priority + +(priority > 0);
                        internal.subscribers.push({
                            ref,
                            priority,
                            store
                        });
                        internal.subscribers = internal.subscribers.sort((e, t)=>e.priority - t.priority);
                        return ()=>{
                            let internal = get().internal;
                            if (internal != null && internal.subscribers) {
                                internal.priority = internal.priority - (priority > 0);
                                internal.subscribers = internal.subscribers.filter((t)=>t.ref !== ref);
                            }
                        };
                    }
                }
            };
        }) ? v(n, r) : v;
        let i = o.getState();
        let i_size = i.size;
        let dpr = i.viewport.dpr;
        let i_camera = i.camera;
        o.subscribe(()=>{
            let { camera, size, viewport, gl, set } = o.getState();
            if (size.width !== i_size.width || size.height !== i_size.height || viewport.dpr !== dpr) {
                i_size = size;
                dpr = viewport.dpr;
                ((camera_1, size_1)=>{
                    if (!camera_1.manual) {
                        if (camera_1 && camera_1.isOrthographicCamera) {
                            camera_1.left = -(size_1.width / 2);
                            camera_1.right = size_1.width / 2;
                            camera_1.top = size_1.height / 2;
                            camera_1.bottom = -(size_1.height / 2);
                        } else {
                            camera_1.aspect = size_1.width / size_1.height;
                        }
                        camera_1.updateProjectionMatrix();
                    }
                })(camera, size);
                if (viewport.dpr > 0) {
                    gl.setPixelRatio(viewport.dpr);
                }
                let o = typeof HTMLCanvasElement !== "undefined" && gl.domElement instanceof HTMLCanvasElement;
                gl.setSize(size.width, size.height, o);
            }
            if (camera !== i_camera) {
                i_camera = camera;
                set((t)=>({
                        viewport: {
                            ...t.viewport,
                            ...t.viewport.getCurrentViewport(camera)
                        }
                    }));
            }
        });
        o.subscribe((t)=>e(t));
        return o;
    })(eL, eR);
    let fiber = o || ey.createContainer(store, ConcurrentRoot, null, false, null, "", a, a, a, null);
    if (!r) {
        ew.set(e, {
            fiber,
            store
        });
    }
    let f = false;
    let h = null;
    return {
        async configure (r = {}) {
            let a;
            h = new Promise((resolve)=>a = resolve);
            let { gl, size, scene, events, onCreated, shadows = false, linear = false, flat = false, legacy = false, orthographic = false, frameloop = "always", dpr = [
                1,
                2
            ], performance, raycaster, camera, onPointerMissed } = r;
            let T = store.getState();
            let gl_1 = T.gl;
            if (!T.gl) {
                let t = {
                    canvas: e,
                    powerPreference: "high-performance",
                    antialias: true,
                    alpha: true
                };
                let n = typeof gl === "function" ? await gl(t) : gl;
                gl_1 = K(n) ? n : new WebGLRenderer({
                    ...t,
                    ...gl
                });
                T.set({
                    gl: gl_1
                });
            }
            let T_raycaster = T.raycaster;
            if (!T_raycaster) {
                T.set({
                    raycaster: T_raycaster = new tBo
                });
            }
            let { params, ...rest } = raycaster || {};
            if (!I.equ(rest, T_raycaster, ej)) {
                V(T_raycaster, {
                    ...rest
                });
            }
            if (!I.equ(params, T_raycaster.params, ej)) {
                V(T_raycaster, {
                    params: {
                        ...T_raycaster.params,
                        ...params
                    }
                });
            }
            if (!T.camera || T.camera === n && !I.equ(n, camera, ej)) {
                n = camera;
                let e = camera?.isCamera;
                let camera_1 = e ? camera : orthographic ? new qUd(0, 0, 0, 0, 0.1, 1000) : new ubm(75, 0, 0.1, 1000);
                if (!e) {
                    camera_1.position.z = 5;
                    if (camera) {
                        V(camera_1, camera);
                        if (!camera_1.manual && ("aspect" in camera || "left" in camera || "right" in camera || "bottom" in camera || "top" in camera)) {
                            camera_1.manual = true;
                            camera_1.updateProjectionMatrix();
                        }
                    }
                    if (!(T.camera || camera != null && camera.rotation)) {
                        camera_1.lookAt(0, 0, 0);
                    }
                }
                T.set({
                    camera: camera_1
                });
                T_raycaster.camera = camera_1;
            }
            if (!T.scene) {
                let scene_1;
                if (scene != null && scene.isScene) {
                    R(scene_1 = scene, store, "", {});
                } else {
                    R(scene_1 = new Z58, store, "", {});
                    if (scene) {
                        V(scene_1, scene);
                    }
                }
                T.set({
                    scene: scene_1
                });
            }
            if (events && !T.events.handlers) {
                T.set({
                    events: events(store)
                });
            }
            let z = ((e, size_1)=>{
                if (!size_1 && typeof HTMLCanvasElement !== "undefined" && e instanceof HTMLCanvasElement && e.parentElement) {
                    let { width, height, top, left } = e.parentElement.getBoundingClientRect();
                    return {
                        width,
                        height,
                        top,
                        left
                    };
                }
                if (!size_1 && typeof OffscreenCanvas !== "undefined" && e instanceof OffscreenCanvas) {
                    return {
                        width: e.width,
                        height: e.height,
                        top: 0,
                        left: 0
                    };
                }
                return {
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
                    ...size_1
                };
            })(e, size);
            if (!I.equ(z, T.size, ej)) {
                T.setSize(z.width, z.height, z.top, z.left);
            }
            if (dpr && T.viewport.dpr !== A(dpr)) {
                T.setDpr(dpr);
            }
            if (T.frameloop !== frameloop) {
                T.setFrameloop(frameloop);
            }
            if (!T.onPointerMissed) {
                T.set({
                    onPointerMissed
                });
            }
            if (performance && !I.equ(performance, T.performance, ej)) {
                T.set((e)=>({
                        performance: {
                            ...e.performance,
                            ...performance
                        }
                    }));
            }
            if (!T.xr) {
                let e = (e, t)=>{
                    let n = store.getState();
                    if (n.frameloop !== "never") {
                        eR(e, true, n, t);
                    }
                };
                let t = ()=>{
                    let t = store.getState();
                    t.gl.xr.enabled = t.gl.xr.isPresenting;
                    t.gl.xr.setAnimationLoop(t.gl.xr.isPresenting ? e : null);
                    if (!t.gl.xr.isPresenting) {
                        eL(t);
                    }
                };
                let xr = {
                    connect () {
                        let e = store.getState().gl;
                        e.xr.addEventListener("sessionstart", t);
                        e.xr.addEventListener("sessionend", t);
                    },
                    disconnect () {
                        let e = store.getState().gl;
                        e.xr.removeEventListener("sessionstart", t);
                        e.xr.removeEventListener("sessionend", t);
                    }
                };
                if (typeof gl_1.xr?.addEventListener === "function") {
                    xr.connect();
                }
                T.set({
                    xr
                });
            }
            if (gl_1.shadowMap) {
                let e = gl_1.shadowMap.enabled;
                let t = gl_1.shadowMap.type;
                gl_1.shadowMap.enabled = !!shadows;
                if (I.boo(shadows)) {
                    gl_1.shadowMap.type = soft;
                } else if (I.str(shadows)) {
                    let e = {
                        basic: bTm,
                        percentage,
                        soft,
                        variance: RyA
                    };
                    gl_1.shadowMap.type = e[shadows] ?? soft;
                } else {
                    if (I.obj(shadows)) {
                        Object.assign(gl_1.shadowMap, shadows);
                    }
                }
                if (e !== gl_1.shadowMap.enabled || t !== gl_1.shadowMap.type) {
                    gl_1.shadowMap.needsUpdate = true;
                }
            }
            ppV.enabled = !legacy;
            if (!f) {
                gl_1.outputColorSpace = linear ? Zr2 : er$;
                gl_1.toneMapping = flat ? y_p : FV;
            }
            if (T.legacy !== legacy) {
                T.set(()=>({
                        legacy
                    }));
            }
            if (T.linear !== linear) {
                T.set(()=>({
                        linear
                    }));
            }
            if (T.flat !== flat) {
                T.set(()=>({
                        flat
                    }));
            }
            if (!(!gl || I.fun(gl) || K(gl) || I.equ(gl, gl_1, ej))) {
                V(gl_1, gl);
            }
            onCreated_1 = onCreated;
            f = true;
            a();
            return this;
        },
        render (n) {
            if (!(f || h)) {
                this.configure();
            }
            h.then(()=>{
                ey.updateContainer(<EPComponent store={store} onCreated={onCreated_1} rootElement={e}>{n}</EPComponent>, fiber, null, ()=>undefined);
            });
            return store;
        },
        unmount () {
            eC(e);
        }
    };
}
export { eE as c };
function EPComponent({ store, children, onCreated, rootElement }) {
    b(()=>{
        let t = store.getState();
        t.set((e)=>({
                internal: {
                    ...e.internal,
                    active: true
                }
            }));
        if (onCreated) {
            onCreated(t);
        }
        if (!(store.getState().events.connected || t.events.connect == null)) {
            t.events.connect(rootElement);
        }
    }, []);
    return <$Context.Provider value={store}>{children}</$Context.Provider>;
}
function eC(e, t) {
    let n = ew.get(e);
    let r = n?.fiber;
    if (r) {
        let o = n == null ? undefined : n.store.getState();
        if (o) {
            o.internal.active = false;
        }
        ey.updateContainer(null, r, null, ()=>{
            if (o) {
                setTimeout(()=>{
                    try {
                        o.events.disconnect?.();
                        if (!((n = o.gl) == null || (r = n.renderLists) == null || r.dispose == null)) {
                            r.dispose();
                        }
                        if (!((i = o.gl) == null || i.forceContextLoss == null)) {
                            i.forceContextLoss();
                        }
                        if ((a = o.gl) != null && a.xr) {
                            o.xr.disconnect();
                        }
                        var n;
                        var r;
                        var i;
                        var a;
                        var l = o.scene;
                        for(let e in l.type !== "Scene" && (l.dispose == null || l.dispose()), l){
                            let t = l[e];
                            if (t?.type !== "Scene") {
                                if (!(t == null || t.dispose == null)) {
                                    t.dispose();
                                }
                            }
                        }
                        ew.delete(e);
                        if (t) {
                            t(e);
                        }
                    } catch (e) {}
                }, 500);
            }
        });
    }
}
export { eC as d };
let eO = new Set;
let ex = new Set;
let eM = new Set;
function eT(e, t) {
    if (e.size) {
        for (let { callback } of e.values()){
            callback(t);
        }
    }
}
function eS(e, t) {
    switch(e){
        case "before":
            return eT(eO, t);
        case "after":
            return eT(ex, t);
        case "tail":
            return eT(eM, t);
    }
}
function ek(e, t, n) {
    let i = t.clock.getDelta();
    if (t.frameloop === "never" && typeof e === "number") {
        i = e - t.clock.elapsedTime;
        t.clock.oldTime = t.clock.elapsedTime;
        t.clock.elapsedTime = e;
    }
    r = t.internal.subscribers;
    for(let e = 0; e < r.length; e++){
        (o = r[e]).ref.current(o.store.getState(), i, n);
    }
    if (!t.internal.priority && t.gl.render) {
        t.gl.render(t.scene, t.camera);
    }
    t.internal.frames = Math.max(0, t.internal.frames - 1);
    if (t.frameloop === "always") {
        return 1;
    }
    return t.internal.frames;
}
let eA = false;
let e_ = false;
function eI(e) {
    for (let n of (a = requestAnimationFrame(eI), eA = true, i = 0, eS("before", e), e_ = true, ew.values())){
        let t;
        if ((l = n.store.getState()).internal.active && (l.frameloop === "always" || l.internal.frames > 0) && !((t = l.gl.xr) != null && t.isPresenting)) {
            i += ek(e, l);
        }
    }
    e_ = false;
    eS("after", e);
    if (i === 0) {
        eS("tail", e);
        eA = false;
        return cancelAnimationFrame(a);
    }
}
function eL(e, t = 1) {
    let n;
    if (!e) {
        return ew.forEach((e)=>eL(e.store.getState(), t));
    }
    if (((n = e.gl.xr) == null || !n.isPresenting) && e.internal.active && e.frameloop !== "never") {
        if (t > 1) {
            e.internal.frames = Math.min(60, e.internal.frames + t);
        } else if (e_) {
            e.internal.frames = 2;
        } else {
            e.internal.frames = 1;
        }
        if (!eA) {
            eA = true;
            requestAnimationFrame(eI);
        }
    }
}
function eR(e, t = true, n, r) {
    if (t) {
        eS("before", e);
    }
    if (n) {
        ek(e, n, r);
    } else {
        for (let t of ew.values()){
            ek(e, t.store.getState());
        }
    }
    if (t) {
        eS("after", e);
    }
}
let ez = {
    onClick: [
        "click",
        false
    ],
    onContextMenu: [
        "contextmenu",
        false
    ],
    onDoubleClick: [
        "dblclick",
        false
    ],
    onWheel: [
        "wheel",
        true
    ],
    onPointerDown: [
        "pointerdown",
        true
    ],
    onPointerUp: [
        "pointerup",
        true
    ],
    onPointerLeave: [
        "pointerleave",
        true
    ],
    onPointerMove: [
        "pointermove",
        true
    ],
    onPointerCancel: [
        "pointercancel",
        true
    ],
    onLostPointerCapture: [
        "lostpointercapture",
        true
    ]
};
function eD(e) {
    let { handlePointer } = ((e)=>{
        function t(e) {
            return e.filter((e)=>[
                    "Move",
                    "Over",
                    "Enter",
                    "Out",
                    "Leave"
                ].some((t)=>e.__r3f?.handlers[`onPointer${t}`]));
        }
        function n(t) {
            let { internal } = e.getState();
            for (let e of internal.hovered.values()){
                if (!t.length || !t.find((t)=>t.object === e.object && t.index === e.index && t.instanceId === e.instanceId)) {
                    let r = e.eventObject.__r3f;
                    internal.hovered.delete(Z(e));
                    if (r != null && r.eventCount) {
                        let n = r.handlers;
                        let o = {
                            ...e,
                            intersections: t
                        };
                        n.onPointerOut?.(o);
                        n.onPointerLeave?.(o);
                    }
                }
            }
        }
        function r(e, t) {
            for(let n = 0; n < t.length; n++){
                let r = t[n].__r3f;
                if (!(r == null || r.handlers.onPointerMissed == null)) {
                    r.handlers.onPointerMissed(e);
                }
            }
        }
        return {
            handlePointer: function(o) {
                switch(o){
                    case "onPointerLeave":
                    case "onPointerCancel":
                        return ()=>n([]);
                    case "onLostPointerCapture":
                        return (t)=>{
                            let { internal } = e.getState();
                            if ("pointerId" in t && internal.capturedMap.has(t.pointerId)) {
                                requestAnimationFrame(()=>{
                                    if (internal.capturedMap.has(t.pointerId)) {
                                        internal.capturedMap.delete(t.pointerId);
                                        n([]);
                                    }
                                });
                            }
                        };
                }
                return function(i) {
                    let { onPointerMissed, internal } = e.getState();
                    internal.lastEvent.current = i;
                    let s = o === "onPointerMove";
                    let c = o === "onClick" || o === "onContextMenu" || o === "onDoubleClick";
                    let u = ((t, n)=>{
                        let r = e.getState();
                        let o = new Set;
                        let i = [];
                        let a = n ? n(r.internal.interaction) : r.internal.interaction;
                        for(let e = 0; e < a.length; e++){
                            let t = _(a[e]);
                            if (t) {
                                t.raycaster.camera = undefined;
                            }
                        }
                        if (!(r.previousRoot || r.events.compute == null)) {
                            r.events.compute(t, r);
                        }
                        let l = a.flatMap((e)=>{
                            let n = _(e);
                            if (!n || !n.events.enabled || n.raycaster.camera === null) {
                                return [];
                            }
                            if (n.raycaster.camera === undefined) {
                                n.events.compute?.(t, n, n.previousRoot?.getState());
                                if (n.raycaster.camera === undefined) {
                                    n.raycaster.camera = null;
                                }
                            }
                            if (n.raycaster.camera) {
                                return n.raycaster.intersectObject(e, true);
                            }
                            return [];
                        }).sort((e, t)=>{
                            let n = _(e.object);
                            let r = _(t.object);
                            return n && r && r.events.priority - n.events.priority || e.distance - t.distance;
                        }).filter((e)=>{
                            let t = Z(e);
                            return !o.has(t) && (o.add(t), true);
                        });
                        for (let e of (r.events.filter && (l = r.events.filter(l, r)), l)){
                            let eventObject = e.object;
                            while(eventObject){
                                let s;
                                if ((s = eventObject.__r3f) != null && s.eventCount) {
                                    i.push({
                                        ...e,
                                        eventObject
                                    });
                                }
                                eventObject = eventObject.parent;
                            }
                        }
                        if ("pointerId" in t && r.internal.capturedMap.has(t.pointerId)) {
                            for (let e of r.internal.capturedMap.get(t.pointerId).values()){
                                if (!o.has(Z(e.intersection))) {
                                    i.push(e.intersection);
                                }
                            }
                        }
                        return i;
                    })(i, s ? t : undefined);
                    let d = c ? ((t)=>{
                        let { internal } = e.getState();
                        let r = t.offsetX - internal.initialClick[0];
                        let o = t.offsetY - internal.initialClick[1];
                        return Math.round(Math.sqrt(r * r + o * o));
                    })(i) : 0;
                    if (o === "onPointerDown") {
                        internal.initialClick = [
                            i.offsetX,
                            i.offsetY
                        ];
                        internal.initialHits = u.map((e)=>e.eventObject);
                    }
                    if (c && !u.length && d <= 2) {
                        r(i, internal.interaction);
                        if (onPointerMissed) {
                            onPointerMissed(i);
                        }
                    }
                    if (s) {
                        n(u);
                    }
                    ((e, nativeEvent, delta, o)=>{
                        if (e.length) {
                            let i = {
                                stopped: false
                            };
                            for (let intersection of e){
                                let l = _(intersection.object);
                                if (!l) {
                                    intersection.object.traverseAncestors((e)=>{
                                        let t = _(e);
                                        if (t) {
                                            l = t;
                                            return false;
                                        }
                                    });
                                }
                                if (l) {
                                    let { raycaster, pointer, camera, internal } = l;
                                    let unprojectedPoint = new Pq0(pointer.x, pointer.y, 0).unproject(camera);
                                    let hasPointerCapture = (e)=>{
                                        var t;
                                        return (t = internal.capturedMap.get(e)?.has(intersection.eventObject)) != null && t;
                                    };
                                    let setPointerCapture = (e)=>{
                                        let n = {
                                            intersection,
                                            target: nativeEvent.target
                                        };
                                        if (internal.capturedMap.has(e)) {
                                            internal.capturedMap.get(e).set(intersection.eventObject, n);
                                        } else {
                                            internal.capturedMap.set(e, new Map([
                                                [
                                                    intersection.eventObject,
                                                    n
                                                ]
                                            ]));
                                        }
                                        nativeEvent.target.setPointerCapture(e);
                                    };
                                    let releasePointerCapture = (e)=>{
                                        let t = internal.capturedMap.get(e);
                                        if (t) {
                                            W(internal.capturedMap, intersection.eventObject, t, e);
                                        }
                                    };
                                    let b = {};
                                    for(let e in nativeEvent){
                                        let n = nativeEvent[e];
                                        if (typeof n !== "function") {
                                            b[e] = n;
                                        }
                                    }
                                    let g = {
                                        ...intersection,
                                        ...b,
                                        pointer,
                                        intersections: e,
                                        stopped: i.stopped,
                                        delta,
                                        unprojectedPoint,
                                        ray: raycaster.ray,
                                        camera,
                                        stopPropagation () {
                                            let r = "pointerId" in nativeEvent && internal.capturedMap.get(nativeEvent.pointerId);
                                            if (!r || r.has(intersection.eventObject)) {
                                                g.stopped = i.stopped = true;
                                                if (internal.hovered.size && Array.from(internal.hovered.values()).find((e)=>e.eventObject === intersection.eventObject)) {
                                                    n([
                                                        ...e.slice(0, e.indexOf(intersection)),
                                                        intersection
                                                    ]);
                                                }
                                            }
                                        },
                                        target: {
                                            hasPointerCapture,
                                            setPointerCapture,
                                            releasePointerCapture
                                        },
                                        currentTarget: {
                                            hasPointerCapture,
                                            setPointerCapture,
                                            releasePointerCapture
                                        },
                                        nativeEvent
                                    };
                                    o(g);
                                    if (i.stopped === true) {
                                        break;
                                    }
                                }
                            }
                        }
                    })(u, i, d, (e)=>{
                        let e_eventObject = e.eventObject;
                        let t___r3f = e_eventObject.__r3f;
                        if (!(t___r3f != null && t___r3f.eventCount)) {
                            return;
                        }
                        let n_handlers = t___r3f.handlers;
                        if (s) {
                            if (n_handlers.onPointerOver || n_handlers.onPointerEnter || n_handlers.onPointerOut || n_handlers.onPointerLeave) {
                                let t = Z(e);
                                let n = internal.hovered.get(t);
                                if (n) {
                                    if (n.stopped) {
                                        e.stopPropagation();
                                    }
                                } else {
                                    internal.hovered.set(t, e);
                                    if (n_handlers.onPointerOver != null) {
                                        n_handlers.onPointerOver(e);
                                    }
                                    if (n_handlers.onPointerEnter != null) {
                                        n_handlers.onPointerEnter(e);
                                    }
                                }
                            }
                            n_handlers.onPointerMove?.(e);
                        } else {
                            let n = n_handlers[o];
                            if (n) {
                                if (!c || internal.initialHits.includes(e_eventObject)) {
                                    r(i, internal.interaction.filter((e)=>!internal.initialHits.includes(e)));
                                    n(e);
                                }
                            } else if (c && internal.initialHits.includes(e_eventObject)) {
                                r(i, internal.interaction.filter((e)=>!internal.initialHits.includes(e)));
                            }
                        }
                    });
                };
            }
        };
    })(e);
    return {
        priority: 1,
        enabled: true,
        compute (e, t, n) {
            t.pointer.set(e.offsetX / t.size.width * 2 - 1, -(2 * (e.offsetY / t.size.height)) + 1);
            t.raycaster.setFromCamera(t.pointer, t.camera);
        },
        connected: undefined,
        handlers: Object.keys(ez).reduce((acc, key)=>({
                ...acc,
                [key]: handlePointer(key)
            }), {}),
        update: ()=>{
            let { events, internal } = e.getState();
            if (internal.lastEvent?.current && events.handlers) {
                events.handlers.onPointerMove(internal.lastEvent.current);
            }
        },
        connect: (connected)=>{
            let { set, events } = e.getState();
            events.disconnect?.();
            set((e)=>({
                    events: {
                        ...e.events,
                        connected
                    }
                }));
            if (events.handlers) {
                for(let e in events.handlers){
                    let n = events.handlers[e];
                    let [o, passive] = ez[e];
                    connected.addEventListener(o, n, {
                        passive
                    });
                }
            }
        },
        disconnect: ()=>{
            let { set, events } = e.getState();
            if (events.connected) {
                if (events.handlers) {
                    for(let e in events.handlers){
                        let t = events.handlers[e];
                        let [r] = ez[e];
                        events.connected.removeEventListener(r, t);
                    }
                }
                set((e)=>({
                        events: {
                            ...e.events,
                            connected: undefined
                        }
                    }));
            }
        }
    };
}
export { eD as f };
