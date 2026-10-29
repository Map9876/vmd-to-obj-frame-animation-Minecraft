import { n, s, t } from "../jsx-runtime-Db0DjQYK.js";
import { c, n as n_2, t as t_2 } from "../current-Bq9r6xhE.js";
import { t as t_3 } from "../preload-helper-zJ_50EbN.js";
import { Lr } from "../index-DmN1rqCo.js";
const __vite__mapDeps = (i, m = __vite__mapDeps, d = m.f || (m.f = [
    "assets/build-mode-intro-DvwhJR6S.js",
    "assets/jsx-runtime-Db0DjQYK.js",
    "assets/index-DmN1rqCo.js",
    "assets/preload-helper-zJ_50EbN.js",
    "assets/eligibility-C9acEVc6.js",
    "assets/session-BGIR8kU0.js",
    "assets/browser-I-D20JeN.js",
    "assets/public--pAhXrd8.js",
    "assets/keys-CMeqocw_.js",
    "assets/ClientOnly-BiCdmN1s.js",
    "assets/useStore-DX_rDZVw.js",
    "assets/cache-BfojtyIM.js",
    "assets/current-Bq9r6xhE.js",
    "assets/route-messages-9yrojIBL.js",
    "assets/react-LvWBhTF7.js",
    "assets/createServerFn-CUM7qdJ1.js",
    "assets/redirect-Coy-z-9D.js",
    "assets/routing-Gv_vGkrc.js",
    "assets/translator-pPqc4oNS.js",
    "assets/queries-DlYwNVUA.js",
    "assets/catalog.fn-Cn2xplr-.js",
    "assets/schematics.fn-ef_wVIH4.js",
    "assets/urls-CrsGixfG.js",
    "assets/meta-C9WvV8WX.js",
    "assets/route-BDnB4cU9.js",
    "assets/link-C5CNVKC3.js",
    "assets/useNavigate-5hivG_iR.js",
    "assets/useSearch-DY9YFgkc.js",
    "assets/root-DLTE-HSj.js",
    "assets/utils-B6KiDbIe.js",
    "assets/DialogTitle-C5xtVamj.js",
    "assets/useScrollLock-B98zsivK.js",
    "assets/dist-7IP26fql.js",
    "assets/createBaseUIEventDetails-Df69IYx-.js",
    "assets/owner-Bmp_Sgwo.js",
    "assets/useSuspenseQuery-BRxKcF3h.js",
    "assets/lib-BH1Zsaz9.js",
    "assets/createLucideIcon-BB7uFOth.js",
    "assets/box-DpWO1Dds.js",
    "assets/sparkles-CxMPHlBM.js",
    "assets/coerce-DKh1SG0-.js",
    "assets/schemas-Y3Thg5L-.js",
    "assets/dist-C5TDMOul.js",
    "assets/dist-C66QuM2X.js",
    "assets/demo-media-DQv-_HFj.js",
    "assets/play-DPEFnGPk.js",
    "assets/feature-intro-CBRc6gNj.js",
    "assets/dialog-ClhsnmFs.js",
    "assets/DialogDescription-CTeYCIgA.js",
    "assets/list-ordered-Bbh-CjM0.js",
    "assets/start-dialog-DtjqlZw5.js",
    "assets/parts-DB0m3djM.js",
    "assets/copy-Cb6l5SEl.js",
    "assets/cdn-image-1M_j1Bpf.js",
    "assets/test-server-intro-BGTHiItS.js",
    "assets/stored-viewer-Dyi77YTr.js",
    "assets/editor-assets-COznUb6X.js",
    "assets/blockStateParser-3kR-Ucao.js",
    "assets/fetch-build-DtPVkGSn.js"
]))=>i.map((i)=>d[i]);
const At = (()=>{
    try {
        document.createElement(`div`).animate({
            opacity: 0
        }, {
            easing: `linear(0, 1)`
        });
    } catch  {
        return false;
    }
    return true;
})();
const jt = typeof CSS < `u` && CSS.supports && CSS.supports(`line-height`, `mod(1,1)`);
const Mt = typeof matchMedia < `u` ? matchMedia(`(prefers-reduced-motion: reduce)`) : null;
const B = `--_number-flow-d-opacity`;
const V = `--_number-flow-d-width`;
const H = `--_number-flow-dx`;
const Nt = `--_number-flow-d`;
const Pt = (()=>{
    try {
        CSS.registerProperty({
            name: B,
            syntax: `<number>`,
            inherits: false,
            initialValue: `0`
        });
        CSS.registerProperty({
            name: H,
            syntax: `<length>`,
            inherits: true,
            initialValue: `0px`
        });
        CSS.registerProperty({
            name: V,
            syntax: `<number>`,
            inherits: false,
            initialValue: `0`
        });
        CSS.registerProperty({
            name: Nt,
            syntax: `<number>`,
            inherits: true,
            initialValue: `0`
        });
        return true;
    } catch  {
        return false;
    }
})();
const U = `round(nearest, calc(var(--number-flow-mask-height, 0.25em) / 2), 1px)`;
const W = `calc(${U} * 2)`;
const G = `var(--number-flow-mask-width, 0.5em)`;
const K = `calc(${G} / var(--scale-x))`;
const q = `#000 0, transparent 71%`;
const Ft = String.raw`:host{display:inline-block;direction:ltr;white-space:nowrap;isolation:isolate;line-height:1}.number,.number__inner{display:inline-block;transform-origin:left top}:host([data-will-change]) :is(.number,.number__inner,.section,.digit,.digit__num,.symbol){will-change:transform}.number{--scale-x:calc(1 + var(${V}) / var(--width));transform:translateX(var(${H})) scaleX(var(--scale-x));margin:0 calc(-1 * ${G});position:relative;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 ${K},#000 calc(100% - ${K}),transparent ),linear-gradient(to bottom,transparent 0,#000 ${W},#000 calc(100% - ${W}),transparent 100% ),radial-gradient(at bottom right,${q}),radial-gradient(at bottom left,${q}),radial-gradient(at top left,${q}),radial-gradient(at top right,${q});-webkit-mask-size:100% calc(100% - ${W} * 2),calc(100% - ${K} * 2) 100%,${K} ${W},${K} ${W},${K} ${W},${K} ${W};-webkit-mask-position:center,center,top left,top right,bottom right,bottom left;-webkit-mask-repeat:no-repeat}.number__inner{padding:${U} ${G};transform:scaleX(calc(1 / var(--scale-x))) translateX(calc(-1 * var(${H})))}:host > :not(.number){z-index:5}.section,.symbol{display:inline-block;position:relative;isolation:isolate}.section::after{content:'\200b';display:inline-block}.section--justify-left{transform-origin:center left}.section--justify-right{transform-origin:center right}.section > [inert],.symbol > [inert]{margin:0 !important;position:absolute !important;z-index:-1}.digit{display:inline-block;position:relative;--c:var(--current) + var(${Nt})}.digit__num,.number .section::after{padding:${U} 0}.digit__num{display:inline-block;--offset-raw:mod(var(--length) + var(--n) - mod(var(--c),var(--length)),var(--length));--offset:calc( var(--offset-raw) - var(--length) * round(down,var(--offset-raw) / (var(--length) / 2),1) );--y:clamp(-100%,var(--offset) * 100%,100%);transform:translateY(var(--y))}.digit__num[inert]{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(var(--y))}.digit:not(.is-spinning) .digit__num[inert]{display:none}.symbol__value{display:inline-block;mix-blend-mode:plus-lighter;white-space:pre}.section--justify-left .symbol > [inert]{left:0}.section--justify-right .symbol > [inert]{right:0}.animate-presence{opacity:calc(1 + var(${B}))}`;
const It = typeof HTMLElement < `u` ? HTMLElement : class {
};
const Lt = String.raw`:host{display:inline-block;direction:ltr;white-space:nowrap;line-height:1}span{display:inline-block}:host([data-will-change]) span{will-change:transform}.number,.digit{padding:${U} 0}.symbol{white-space:pre}`;
const Rt = (e = ``)=>String.raw`:where(number-flow${e}){line-height:1}number-flow${e} > span{font-kerning:none;display:inline-block;padding:${W} 0}`;
const J = (e, t, n)=>{
    let r = document.createElement(e);
    let [i, a] = Array.isArray(t) ? [
        undefined,
        t
    ] : [
        t,
        n
    ];
    if (i) {
        Object.assign(r, i);
    }
    a?.forEach((e)=>r.appendChild(e));
    return r;
};
const zt = (e, justify)=>{
    if (justify === `left`) {
        return e.offsetLeft;
    }
    return ((e.offsetParent instanceof HTMLElement ? e.offsetParent : null)?.offsetWidth ?? 0) - e.offsetWidth - e.offsetLeft;
};
const Bt = (e)=>e.offsetWidth > 0 && e.offsetHeight > 0;
export const Vt = (e, t)=>{
    if (typeof HTMLElement < `u` && typeof customElements < `u` && !customElements.get(e)) {
        customElements.define(e, t);
    }
};
function Ht(e, t, { reverse = false } = {}) {
    let e_length = e.length;
    for(let i = reverse ? e_length - 1 : 0; reverse ? i >= 0 : i < e_length; reverse ? i-- : i++){
        t(e[i], i);
    }
}
export function Ut(e, t, n, r) {
    let i = t.formatToParts(e);
    if (n) {
        i.unshift({
            type: `prefix`,
            value: n
        });
    }
    if (r) {
        i.push({
            type: `suffix`,
            value: r
        });
    }
    let pre = [];
    let o = [];
    let fraction = [];
    let post = [];
    let l = {};
    let u = (e)=>`${e}:${l[e] = (l[e] ?? -1) + 1}`;
    let valueAsString = ``;
    let f = false;
    let p = false;
    for (let e of i){
        valueAsString += e.value;
        let t = e.type === `minusSign` || e.type === `plusSign` ? `sign` : e.type;
        if (t === `integer`) {
            f = true;
            o.push(...e.value.split(``).map((e)=>({
                    type: t,
                    value: parseInt(e)
                })));
        } else if (t === `group`) {
            o.push({
                type: t,
                value: e.value
            });
        } else if (t === `decimal`) {
            p = true;
            fraction.push({
                type: t,
                value: e.value,
                key: u(t)
            });
        } else if (t === `fraction`) {
            fraction.push(...e.value.split(``).map((e)=>({
                    type: t,
                    value: parseInt(e),
                    key: u(t),
                    pos: -1 - l[t]
                })));
        } else {
            (f || p ? post : pre).push({
                type: t,
                value: e.value,
                key: u(t)
            });
        }
    }
    let integer = [];
    for(let e = o.length - 1; e >= 0; e--){
        let t = o[e];
        integer.unshift(t.type === `integer` ? {
            ...t,
            key: u(t.type),
            pos: l[t.type]
        } : {
            ...t,
            key: u(t.type)
        });
    }
    return {
        pre,
        integer,
        fraction,
        post,
        valueAsString,
        value: typeof e == `string` ? parseFloat(e) : e
    };
}
const Wt = jt && At && Pt;
export class Gt extends It {
    constructor(){
        super();
        this.created = false;
        this.batched = false;
        this._preUpdated = false;
        let { animated, ...rest } = this.constructor.defaultProps;
        this._animated = this.computedAnimated = animated;
        Object.assign(this, rest);
    }
    get animated() {
        return this._animated;
    }
    set animated(e) {
        let t;
        if (this.animated !== e) {
            this._animated = e;
            if ((t = this.shadowRoot) != null) {
                t.getAnimations().forEach((e)=>e.finish());
            }
        }
    }
    set data(e) {
        let t;
        if (e == null || e === this._data) {
            return;
        }
        let { pre, integer, fraction, post, value } = e;
        if (this.created) {
            let c = this._data;
            this._data = e;
            this.computedTrend = typeof this.trend == `function` ? this.trend(c.value, value) : this.trend;
            this.computedAnimated = Wt && this._animated && (!this.respectMotionPreference || !((t = Mt) != null && t.matches)) && Bt(this) && this.ownerDocument.visibilityState === `visible`;
            this.plugins?.forEach((t)=>t.onUpdate?.(e, c, this));
            if (!this.batched) {
                this.willUpdate();
            }
            this._pre.update(pre);
            this._num.update({
                integer,
                fraction
            });
            this._post.update(post);
            if (!this.batched) {
                this.didUpdate();
            }
        } else {
            this._data = e;
            this.attachShadow({
                mode: `open`
            });
            try {
                this._internals ??= this.attachInternals();
                this._internals.role = `img`;
            } catch  {}
            let t = document.createElement(`style`);
            if (this.nonce) {
                t.nonce = this.nonce;
            }
            t.textContent = Ft;
            this.shadowRoot.appendChild(t);
            this._pre = new Yt(this, pre, {
                justify: `right`,
                part: `left`
            });
            this.shadowRoot.appendChild(this._pre.el);
            this._num = new Kt(this, integer, fraction);
            this.shadowRoot.appendChild(this._num.el);
            this._post = new Yt(this, post, {
                justify: `left`,
                part: `right`
            });
            this.shadowRoot.appendChild(this._post.el);
            this.created = true;
        }
        try {
            this._internals.ariaLabel = e.valueAsString;
        } catch  {}
    }
    willUpdate() {
        let e;
        this._preUpdated = Wt && this._animated && (!this.respectMotionPreference || !((e = Mt) != null && e.matches)) && this.ownerDocument.visibilityState === `visible`;
        if (this._preUpdated) {
            this._pre.willUpdate();
            this._num.willUpdate();
            this._post.willUpdate();
        }
    }
    didUpdate() {
        if (!this.computedAnimated || !this._preUpdated) {
            return;
        }
        if (this._abortAnimationsFinish) {
            this._abortAnimationsFinish.abort();
        } else {
            this.dispatchEvent(new Event(`animationsstart`));
        }
        this._pre.didUpdate();
        this._num.didUpdate();
        this._post.didUpdate();
        let e = new AbortController;
        Promise.all(this.shadowRoot.getAnimations().map((e)=>e.finished)).then(()=>{
            if (!e.signal.aborted) {
                this.dispatchEvent(new Event(`animationsfinish`));
                this._abortAnimationsFinish = undefined;
            }
        });
        this._abortAnimationsFinish = e;
    }
}
var Kt = class {
    constructor(e, t, n, { className, ...rest } = {}){
        this.flow = e;
        this._integer = new Jt(e, t, {
            justify: `right`,
            part: `integer`
        });
        this._fraction = new Jt(e, n, {
            justify: `left`,
            part: `fraction`
        });
        this._inner = J(`span`, {
            className: `number__inner`
        }, [
            this._integer.el,
            this._fraction.el
        ]);
        this.el = J(`span`, {
            ...rest,
            part: `number`,
            className: `number ${className ?? ``}`
        }, [
            this._inner
        ]);
    }
    willUpdate() {
        this._prevWidth = this.el.offsetWidth;
        this._prevLeft = this.el.getBoundingClientRect().left;
        this._integer.willUpdate();
        this._fraction.willUpdate();
    }
    update({ integer, fraction }) {
        this._integer.update(integer);
        this._fraction.update(fraction);
    }
    didUpdate() {
        let e = this.el.getBoundingClientRect();
        this._integer.didUpdate();
        this._fraction.didUpdate();
        let t = this._prevLeft - e.left;
        let offsetWidth = this.el.offsetWidth;
        let r = this._prevWidth - offsetWidth;
        this.el.style.setProperty(`--width`, String(offsetWidth));
        this.el.animate({
            [H]: [
                `${t}px`,
                `0px`
            ],
            [V]: [
                r,
                0
            ]
        }, {
            ...this.flow.transformTiming,
            composite: `accumulate`
        });
    }
};
class qt {
    constructor(e, t, { justify, className, ...rest }, a){
        this.flow = e;
        this.children = new Map;
        this.onCharRemove = (e)=>()=>{
                this.children.delete(e);
            };
        this.justify = justify;
        let o = t.map((e)=>this.addChar(e).el);
        this.el = J(`span`, {
            ...rest,
            className: `section section--justify-${justify} ${className ?? ``}`
        }, a ? a(o) : o);
    }
    addChar(e, { startDigitsAtZero = false, ...rest } = {}) {
        let r = e.type === `integer` || e.type === `fraction` ? new Qt(this, e.type, startDigitsAtZero ? 0 : e.value, e.pos, {
            ...rest,
            onRemove: this.onCharRemove(e.key)
        }) : new $t(this, e.type, e.value, {
            ...rest,
            onRemove: this.onCharRemove(e.key)
        });
        this.children.set(e.key, r);
        return r;
    }
    unpop(e) {
        e.el.removeAttribute(`inert`);
        e.el.style.top = ``;
        e.el.style[this.justify] = ``;
    }
    pop(e) {
        e.forEach((e)=>{
            e.el.style.top = `${e.el.offsetTop}px`;
            e.el.style[this.justify] = `${zt(e.el, this.justify)}px`;
        });
        e.forEach((e)=>{
            e.el.setAttribute(`inert`, ``);
            e.present = false;
        });
    }
    addNewAndUpdateExisting(e) {
        let t = new Map;
        let n = new Map;
        let reverse = this.justify === `left`;
        let i = reverse ? `prepend` : `append`;
        Ht(e, (e)=>{
            let r;
            if (this.children.has(e.key)) {
                r = this.children.get(e.key);
                n.set(e, r);
                this.unpop(r);
                r.present = true;
            } else {
                r = this.addChar(e, {
                    startDigitsAtZero: true,
                    animateIn: true
                });
                t.set(e, r);
            }
            this.el[i](r.el);
        }, {
            reverse
        });
        if (this.flow.computedAnimated) {
            let e = this.el.getBoundingClientRect();
            t.forEach((t)=>{
                t.willUpdate(e);
            });
        }
        t.forEach((e, t)=>{
            e.update(t.value);
        });
        n.forEach((e, t)=>{
            e.update(t.value);
        });
    }
    willUpdate() {
        let e = this.el.getBoundingClientRect();
        this._prevOffset = e[this.justify];
        this.children.forEach((t)=>t.willUpdate(e));
    }
    didUpdate() {
        let e = this.el.getBoundingClientRect();
        this.children.forEach((t)=>t.didUpdate(e));
        let t = e[this.justify];
        let n = this._prevOffset - t;
        if (n && this.children.size) {
            this.el.animate({
                transform: [
                    `translateX(${n}px)`,
                    `none`
                ]
            }, {
                ...this.flow.transformTiming,
                composite: `accumulate`
            });
        }
    }
}
var Jt = class extends qt {
    update(e) {
        let t = new Map;
        this.children.forEach((n, r)=>{
            if (!e.find((e)=>e.key === r)) {
                t.set(r, n);
            }
            this.unpop(n);
        });
        this.addNewAndUpdateExisting(e);
        t.forEach((e)=>{
            if (e instanceof Qt) {
                e.update(0);
            }
        });
        this.pop(t);
    }
};
var Yt = class extends qt {
    update(e) {
        let t = new Map;
        this.children.forEach((n, r)=>{
            if (!e.find((e)=>e.key === r)) {
                t.set(r, n);
            }
        });
        this.pop(t);
        this.addNewAndUpdateExisting(e);
    }
};
class Xt {
    constructor(e, t, { onRemove, animateIn = false } = {}){
        this.flow = e;
        this.el = t;
        this._present = true;
        this._remove = ()=>{
            this.el.remove();
            this._onRemove?.();
        };
        this.el.classList.add(`animate-presence`);
        if (this.flow.computedAnimated && animateIn) {
            this.el.animate({
                "--_number-flow-d-opacity": [
                    -0.9999,
                    0
                ]
            }, {
                ...this.flow.opacityTiming,
                composite: `accumulate`
            });
        }
        this._onRemove = onRemove;
    }
    get present() {
        return this._present;
    }
    set present(e) {
        if (this._present !== e) {
            this._present = e;
            if (e) {
                this.el.removeAttribute(`inert`);
            } else {
                this.el.setAttribute(`inert`, ``);
            }
            if (!this.flow.computedAnimated) {
                if (!e) {
                    this._remove();
                }
                return;
            }
            this.el.style.setProperty(`--_number-flow-d-opacity`, e ? `0` : `-.999`);
            this.el.animate({
                [B]: e ? [
                    -0.9999,
                    0
                ] : [
                    0.999,
                    0
                ]
            }, {
                ...this.flow.opacityTiming,
                composite: `accumulate`
            });
            if (e) {
                this.flow.removeEventListener(`animationsfinish`, this._remove);
            } else {
                this.flow.addEventListener(`animationsfinish`, this._remove, {
                    once: true
                });
            }
        }
    }
}
class Zt extends Xt {
    constructor(e, t, n, r){
        super(e.flow, n, r);
        this.section = e;
        this.value = t;
        this.el = n;
    }
}
var Qt = class extends Zt {
    constructor(e, t, n, r, i){
        let length = (e.flow.digits?.[r]?.max ?? 9) + 1;
        let o = Array.from({
            length
        }).map((e, t)=>{
            let r = J(`span`, {
                className: `digit__num`
            }, [
                document.createTextNode(String(t))
            ]);
            if (t !== n) {
                r.setAttribute(`inert`, ``);
            }
            r.style.setProperty(`--n`, String(t));
            return r;
        });
        let s = J(`span`, {
            part: `digit ${t}-digit`,
            className: `digit`
        }, o);
        s.style.setProperty(`--current`, String(n));
        s.style.setProperty(`--length`, String(length));
        super(e, n, s, i);
        this.pos = r;
        this._onAnimationsFinish = ()=>{
            this.el.classList.remove(`is-spinning`);
        };
        this._numbers = o;
        this.length = length;
    }
    willUpdate(e) {
        let t = this.el.getBoundingClientRect();
        this._prevValue = this.value;
        let n = t[this.section.justify] - e[this.section.justify];
        let r = t.width / 2;
        this._prevCenter = this.section.justify === `left` ? n + r : n - r;
    }
    update(e) {
        this.el.style.setProperty(`--current`, String(e));
        this._numbers.forEach((t, n)=>{
            if (n === e) {
                return t.removeAttribute(`inert`);
            }
            return t.setAttribute(`inert`, ``);
        });
        this.value = e;
    }
    didUpdate(e) {
        let t = this.el.getBoundingClientRect();
        let n = t[this.section.justify] - e[this.section.justify];
        let r = t.width / 2;
        let i = this.section.justify === `left` ? n + r : n - r;
        let a = this._prevCenter - i;
        if (a) {
            this.el.animate({
                transform: [
                    `translateX(${a}px)`,
                    `none`
                ]
            }, {
                ...this.flow.transformTiming,
                composite: `accumulate`
            });
        }
        let o = this.getDelta();
        if (o) {
            this.el.classList.add(`is-spinning`);
            this.el.animate({
                "--_number-flow-d": [
                    -o,
                    0
                ]
            }, {
                ...this.flow.spinTiming ?? this.flow.transformTiming,
                composite: `accumulate`
            });
            this.flow.addEventListener(`animationsfinish`, this._onAnimationsFinish, {
                once: true
            });
        }
    }
    getDelta() {
        if (this.flow.plugins) {
            for (let e of this.flow.plugins){
                let t = e.getDelta?.(this.value, this._prevValue, this);
                if (t != null) {
                    return t;
                }
            }
        }
        let e = this.value - this._prevValue;
        let t = this.flow.computedTrend || Math.sign(e);
        if (t < 0 && this.value > this._prevValue) {
            return this.value - this.length - this._prevValue;
        }
        if (t > 0 && this.value < this._prevValue) {
            return this.length - this._prevValue + this.value;
        }
        return e;
    }
};
var $t = class extends Zt {
    constructor(e, t, n, r){
        let i = J(`span`, {
            className: `symbol__value`,
            textContent: n
        });
        super(e, n, J(`span`, {
            part: `symbol ${t}`,
            className: `symbol`
        }, [
            i
        ]), r);
        this.type = t;
        this._children = new Map;
        this._onChildRemove = (e)=>()=>{
                this._children.delete(e);
            };
        this._children.set(n, new Xt(this.flow, i, {
            onRemove: this._onChildRemove(n)
        }));
    }
    willUpdate(e) {
        if (this.type === `decimal`) {
            return;
        }
        let t = this.el.getBoundingClientRect();
        this._prevOffset = t[this.section.justify] - e[this.section.justify];
    }
    update(e) {
        if (this.value !== e) {
            let t = this._children.get(this.value);
            if (t) {
                t.present = false;
            }
            let n = this._children.get(e);
            if (n) {
                n.present = true;
            } else {
                let t = J(`span`, {
                    className: `symbol__value`,
                    textContent: e
                });
                this.el.appendChild(t);
                this._children.set(e, new Xt(this.flow, t, {
                    animateIn: true,
                    onRemove: this._onChildRemove(e)
                }));
            }
        }
        this.value = e;
    }
    didUpdate(e) {
        if (this.type === `decimal`) {
            return;
        }
        let t = this.el.getBoundingClientRect()[this.section.justify] - e[this.section.justify];
        let n = this._prevOffset - t;
        if (n) {
            this.el.animate({
                transform: [
                    `translateX(${n}px)`,
                    `none`
                ]
            }, {
                ...this.flow.transformTiming,
                composite: `accumulate`
            });
        }
    }
};
export const en = (e)=>[
        Lt,
        Rt(e),
        Ft
    ];
export const tn = parseInt(`19.2.4`.match(/^(\d+)\./)?.[1]) >= 19;
export const nn = [
    `data`,
    `digits`
];
export class rn extends Gt {
    attributeChangedCallback(e, t, n) {
        this[e] = JSON.parse(n);
    }
}
export const an = {};
export const Y = t();
export const Nn = {
    theme: `auto`,
    width: `responsive`,
    height: 450,
    attribution: true
};
export const Pn = `16 / 10`;
export const Fn = [
    360,
    450,
    560,
    720
];
export function X(e) {
    return e.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`).replace(/"/g, `&quot;`).replace(/'/g, `&#39;`);
}
export function Z(e) {
    return new URL(c(`/schematics/${e.id}/${e.slug}`, e.locale), e.siteUrl).toString();
}
export function Q(e, t) {
    let n = new URL(c(`/embed/${e.id}`, e.locale), e.siteUrl);
    if (e.fileId) {
        n.searchParams.set(`file`, e.fileId);
    }
    if (t.theme !== `auto`) {
        n.searchParams.set(`theme`, t.theme);
    }
    return n.toString();
}
export function Rn(e) {
    return `${e.title} - Minecraft schematic on Shulkr`;
}
export const Yn = ()=>t_3(()=>import(`./build-mode-intro-DvwhJR6S.js`), __vite__mapDeps([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49
    ]));
export const Xn = Lr(()=>Yn().then((e)=>({
            default: e.BuildModeIntro
        })));
export const tr = ()=>t_3(()=>import(`./start-dialog-DtjqlZw5.js`), __vite__mapDeps([
        50,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        51,
        52,
        47,
        48,
        53
    ]));
export const nr = ()=>t_3(()=>import(`./test-server-intro-BGTHiItS.js`), __vite__mapDeps([
        54,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        46,
        47,
        48,
        51,
        52
    ]));
export const rr = Lr(()=>tr().then((e)=>({
            default: e.StartDialog
        })));
export const ir = Lr(()=>nr().then((e)=>({
            default: e.TestServerIntro
        })));
export const ar = `schematic_page`;
export const fr = Lr(()=>t_3(()=>import(`./stored-viewer-Dyi77YTr.js`).then((e)=>e.n).then((e)=>({
                default: e.StoredViewer
            })), __vite__mapDeps([
        55,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        56,
        57,
        58
    ])));
export const pr = `linear-gradient(180deg, var(--sky-tint) 0%, color-mix(in srgb, var(--sky-tint) 55%, var(--card)) 42%, color-mix(in srgb, var(--sky-tint) 22%, var(--card)) 100%)`;
export const mr = `aspect-square w-[72px] shrink-0`;
