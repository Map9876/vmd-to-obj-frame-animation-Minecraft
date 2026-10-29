import "./module-28140.js";
import "./module-49417.js";
import "./module-86897.js";
import * as i from "./module-61426.js";
import A from "./module-1262_2.js";
import d from "./module-90737_2.js";
import s from "./module-82073.js";
import { isInAmpMode } from "./module-60861_2.js";
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
    if (t.type === i.default.Fragment) {
        return e.concat(i.default.Children.toArray(t.props.children).reduce((acc, item)=>{
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
        let n = new Set;
        let r = {};
        return (o)=>{
            let l = true;
            let i = false;
            if (o.key && typeof o.key !== "number" && o.key.indexOf("$") > 0) {
                i = true;
                let t = o.key.slice(o.key.indexOf("$") + 1);
                if (e.has(t)) {
                    l = false;
                } else {
                    e.add(t);
                }
            }
            switch(o.type){
                case "title":
                case "base":
                    if (t.has(o.type)) {
                        l = false;
                    } else {
                        t.add(o.type);
                    }
                    break;
                case "meta":
                    for(let e = 0, t = p.length; e < t; e++){
                        let t = p[e];
                        if (o.props.hasOwnProperty(t)) {
                            if (t === "charSet") {
                                if (n.has(t)) {
                                    l = false;
                                } else {
                                    n.add(t);
                                }
                            } else {
                                let e = o.props[t];
                                let n = r[t] || new Set;
                                if ((t !== "name" || !i) && n.has(e)) {
                                    l = false;
                                } else {
                                    n.add(e);
                                    r[t] = n;
                                }
                            }
                        }
                    }
            }
            return l;
        };
    })()).reverse().map((e, t)=>{
        let key = e.key || t;
        return i.default.cloneElement(e, {
            key
        });
    });
}
let MComponent = function({ children }) {
    let n = i.useContext(d.AmpStateContext);
    let headManager = i.useContext(s.HeadManagerContext);
    return <A reduceComponentsToState={reduceComponentsToState} headManager={headManager} inAmpMode={isInAmpMode(n)}>{children}</A>;
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
