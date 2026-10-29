import "./module-28140.js";
import "./module-49417.js";
import "./module-86897.js";
import * as a from "./module-61426.js";
import L from "./module-1262.js";
import u from "./module-90737.js";
import s from "./module-82073.js";
import { isInAmpMode } from "./module-60861.js";
import "./module-94781.js";
export function defaultHead(e = false) {
    let t = [
        <meta key="charset" charSet="utf-8"/>
    ];
    if (!e) {
        t.push(<meta key="viewport" name="viewport" content="width=device-width"/>);
    }
    return t;
}
function f(e, t) {
    if (typeof t === "string" || typeof t === "number") {
        return e;
    }
    if (t.type === a.default.Fragment) {
        return e.concat(a.default.Children.toArray(t.props.children).reduce((acc, item)=>{
            if (typeof item === "string" || typeof item === "number") {
                return acc;
            }
            return acc.concat(item);
        }, []));
    }
    return e.concat(t);
}
let p = [
    "name",
    "httpEquiv",
    "charSet",
    "itemProp"
];
function reduceComponentsToState(e, { inAmpMode }) {
    return e.reduce(f, []).reverse().concat(defaultHead(inAmpMode).reverse()).filter((()=>{
        let e = new Set;
        let t = new Set;
        let r = new Set;
        let n = {};
        return (i)=>{
            let o = true;
            let a = false;
            if (i.key && typeof i.key !== "number" && i.key.indexOf("$") > 0) {
                a = true;
                let t = i.key.slice(i.key.indexOf("$") + 1);
                if (e.has(t)) {
                    o = false;
                } else {
                    e.add(t);
                }
            }
            switch(i.type){
                case "title":
                case "base":
                    if (t.has(i.type)) {
                        o = false;
                    } else {
                        t.add(i.type);
                    }
                    break;
                case "meta":
                    for(let e = 0, t = p.length; e < t; e++){
                        let t = p[e];
                        if (i.props.hasOwnProperty(t)) {
                            if (t === "charSet") {
                                if (r.has(t)) {
                                    o = false;
                                } else {
                                    r.add(t);
                                }
                            } else {
                                let e = i.props[t];
                                let r = n[t] || new Set;
                                if ((t !== "name" || !a) && r.has(e)) {
                                    o = false;
                                } else {
                                    r.add(e);
                                    n[t] = r;
                                }
                            }
                        }
                    }
            }
            return o;
        };
    })()).reverse().map((e, t)=>{
        let key = e.key || t;
        return a.default.cloneElement(e, {
            key
        });
    });
}
let MComponent = function({ children }) {
    let r = a.useContext(u.AmpStateContext);
    let headManager = a.useContext(s.HeadManagerContext);
    return <L reduceComponentsToState={reduceComponentsToState} headManager={headManager} inAmpMode={isInAmpMode(r)}>{children}</L>;
};
export { MComponent as default };
if ((typeof MComponent === "function" || typeof MComponent === "object" && MComponent !== null) && MComponent.__esModule === undefined) {
    Object.defineProperty(MComponent, "__esModule", {
        value: true
    });
    Object.assign(MComponent, {
        default: MComponent,
        defaultHead
    });
}
