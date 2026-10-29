import { n, s } from "../jsx-runtime-Db0DjQYK.js";
import { t } from "../link-C5CNVKC3.js";
import { t as t_2 } from "../createLucideIcon-BB7uFOth.js";
import { Ut, an, rn, tn } from "./chunk___vite__mapDeps.js";
export const kt = t_2(`code-xml`, [
    [
        `path`,
        {
            d: `m18 16 4-4-4-4`,
            key: `1inbqp`
        }
    ],
    [
        `path`,
        {
            d: `m6 8-4 4 4 4`,
            key: `15zrgr`
        }
    ],
    [
        `path`,
        {
            d: `m14.5 4-5 16`,
            key: `e7oirm`
        }
    ]
]);
export const R = s(n(), 1);
function on(e) {
    return e;
}
const sn = tn ? on : JSON.stringify;
function cn({ transformTiming, spinTiming, opacityTiming, animated, respectMotionPreference, trend, plugins, ...rest }) {
    return [
        {
            transformTiming,
            spinTiming,
            opacityTiming,
            animated,
            respectMotionPreference,
            trend,
            plugins
        },
        rest
    ];
}
class Ln extends R.Component {
    updateProperties(e) {
        if (!this.el) {
            return;
        }
        this.el.batched = !this.props.isolate;
        let [t] = cn(this.props);
        Object.entries(t).forEach(([e, t])=>{
            this.el[e] = t ?? rn.defaultProps[e];
        });
        if (e?.onAnimationsStart) {
            this.el.removeEventListener(`animationsstart`, e.onAnimationsStart);
        }
        if (this.props.onAnimationsStart) {
            this.el.addEventListener(`animationsstart`, this.props.onAnimationsStart);
        }
        if (e?.onAnimationsFinish) {
            this.el.removeEventListener(`animationsfinish`, e.onAnimationsFinish);
        }
        if (this.props.onAnimationsFinish) {
            this.el.addEventListener(`animationsfinish`, this.props.onAnimationsFinish);
        }
    }
    componentDidMount() {
        this.updateProperties();
        if (tn && this.el) {
            this.el.digits = this.props.digits;
            this.el.data = this.props.data;
        }
    }
    getSnapshotBeforeUpdate(e) {
        this.updateProperties(e);
        if (e.data !== this.props.data) {
            if (this.props.group) {
                this.props.group.willUpdate();
                return ()=>this.props.group?.didUpdate();
            }
            if (!this.props.isolate) {
                this.el?.willUpdate();
                return ()=>this.el?.didUpdate();
            }
        }
        return null;
    }
    componentDidUpdate(e, t, n) {
        n?.();
    }
    handleRef(e) {
        if (this.props.innerRef) {
            this.props.innerRef.current = e;
        }
        this.el = e;
    }
    render() {
        let [e, { innerRef, className, data, nonce, willChange, isolate, group, digits, onAnimationsStart, onAnimationsFinish, ...rest }] = cn(this.props);
        return <number-flow-react ref={this.handleRef} data-will-change={willChange ? `` : undefined} class={className} nonce={nonce} {...rest} dangerouslySetInnerHTML={{
            __html: ``
        }} suppressHydrationWarning digits={sn(digits)} data={sn(data)}/>;
    }
    constructor(e){
        super(e);
        this.handleRef = this.handleRef.bind(this);
    }
}
export const un = R.forwardRef(function({ value, locales, format, prefix, suffix, ...rest }, o) {
    R.useImperativeHandle(o, ()=>sRef.current, []);
    let sRef = R.useRef(undefined);
    let group = R.useContext(DnContext);
    group?.useRegister(sRef);
    let l = R.useMemo(()=>{
        if (locales) {
            return JSON.stringify(locales);
        }
        return ``;
    }, [
        locales
    ]);
    let u = R.useMemo(()=>{
        if (format) {
            return JSON.stringify(format);
        }
        return ``;
    }, [
        format
    ]);
    let data = R.useMemo(()=>Ut(value, an[`${l}:${u}`] ??= new Intl.NumberFormat(locales, format), prefix, suffix), [
        value,
        l,
        u,
        prefix,
        suffix
    ]);
    return <Ln {...rest} group={group} data={data} innerRef={sRef}/>;
});
var DnContext = R.createContext(undefined);
