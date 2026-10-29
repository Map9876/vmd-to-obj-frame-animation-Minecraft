let t = (nextPart = new Map, validators = null, classGroupId)=>({
        nextPart,
        validators,
        classGroupId
    });
let l = [];
let a = (e, r, o)=>{
    if (e.length - r == 0) {
        return o.classGroupId;
    }
    let t = e[r];
    let l = o.nextPart.get(t);
    if (l) {
        let o = a(e, r + 1, l);
        if (o) {
            return o;
        }
    }
    let o_validators = o.validators;
    if (o_validators === null) {
        return;
    }
    let s = r === 0 ? e.join("-") : e.slice(r).join("-");
    let n_length = o_validators.length;
    for(let e = 0; e < n_length; e++){
        let r = o_validators[e];
        if (r.validator(s)) {
            return r.classGroupId;
        }
    }
};
let n = (classGroups, theme)=>{
    let o = t();
    for(let t in classGroups){
        s(classGroups[t], o, t, theme);
    }
    return o;
};
let s = (e, r, o, t)=>{
    let e_length = e.length;
    for(let a = 0; a < e_length; a++){
        i(e[a], r, o, t);
    }
};
let i = (e, r, o, t)=>{
    if (typeof e === "string") {
        return void d(e, r, o);
    }
    if (typeof e === "function") {
        return void c(e, r, o, t);
    }
    m(e, r, o, t);
};
let d = (e, r, o)=>{
    (e === "" ? r : p(r, e)).classGroupId = o;
};
let c = (validator, r, classGroupId, t)=>{
    if (u(validator)) {
        return void s(validator(t), r, classGroupId, t);
    }
    if (r.validators === null) {
        r.validators = [];
    }
    r.validators.push({
        classGroupId,
        validator
    });
};
let m = (e, r, o, t)=>{
    let l = Object.entries(e);
    let l_length = l.length;
    for(let e = 0; e < l_length; e++){
        let [a, n] = l[e];
        s(n, p(r, a), o, t);
    }
};
let p = (e, r)=>{
    let o = e;
    let l = r.split("-");
    let l_length = l.length;
    for(let e = 0; e < l_length; e++){
        let r = l[e];
        let a = o.nextPart.get(r);
        if (!a) {
            a = t();
            o.nextPart.set(r, a);
        }
        o = a;
    }
    return o;
};
let u = (validator)=>"isThemeGetter" in validator && validator.isThemeGetter === true;
let b = [];
let f = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal)=>({
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition,
        isExternal
    });
let g = /\s+/;
let h = (e)=>{
    let r;
    if (typeof e === "string") {
        return e;
    }
    let o = "";
    for(let t = 0; t < e.length; t++){
        if (e[t] && (r = h(e[t]))) {
            if (o) {
                o += " ";
            }
            o += r;
        }
    }
    return o;
};
let k = [];
let w = (e)=>{
    let r = (r)=>r[e] || k;
    r.isThemeGetter = true;
    return r;
};
let x = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
let v = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
let y = /^\d+\/\d+$/;
let z = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
let j = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
let C = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
let G = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
let N = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
let W = (e)=>y.test(e);
let $ = (e)=>!!e && !Number.isNaN(Number(e));
let I = (e)=>!!e && Number.isInteger(Number(e));
let O = (e)=>e.endsWith("%") && $(e.slice(0, -1));
let A = (e)=>z.test(e);
let E = ()=>true;
let M = (e)=>j.test(e) && !C.test(e);
let S = ()=>false;
let _ = (e)=>G.test(e);
let P = (e)=>N.test(e);
let T = (e)=>!B(e) && !H(e);
let q = (e)=>Z(e, et, S);
let B = (e)=>x.test(e);
let L = (e)=>Z(e, el, M);
let Q = (e)=>Z(e, ea, $);
let R = (e)=>Z(e, er, S);
let D = (e)=>Z(e, eo, P);
let F = (e)=>Z(e, es, _);
let H = (e)=>v.test(e);
let J = (e)=>ee(e, el);
let K = (e)=>ee(e, en);
let U = (e)=>ee(e, er);
let V = (e)=>ee(e, et);
let X = (e)=>ee(e, eo);
let Y = (e)=>ee(e, es, true);
let Z = (e, r, o)=>{
    let t = x.exec(e);
    return !!t && (t[1] ? r(t[1]) : o(t[2]));
};
let ee = (e, r, o = false)=>{
    let t = v.exec(e);
    return !!t && (t[1] ? r(t[1]) : o);
};
let er = (e)=>e === "position" || e === "percentage";
let eo = (e)=>e === "image" || e === "url";
let et = (e)=>e === "length" || e === "size" || e === "bg-size";
let el = (e)=>e === "length";
let ea = (e)=>e === "number";
let en = (e)=>e === "family-name";
let es = (e)=>e === "shadow";
Symbol.toStringTag;
export let QP = ((e, ...r)=>{
    let o;
    let t;
    let s;
    let i;
    let d = (e)=>{
        let r = t(e);
        if (r) {
            return r;
        }
        let l = ((e, { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers })=>{
            let n = [];
            let s = e.trim().split(g);
            let i = "";
            for(let e = s.length - 1; e >= 0; e -= 1){
                let r = s[e];
                let { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(r);
                if (isExternal) {
                    i = r + (i.length > 0 ? ` ${i}` : i);
                    continue;
                }
                let b = !!maybePostfixModifierPosition;
                let f = getClassGroupId(b ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
                if (!f) {
                    if (!b || !(f = getClassGroupId(baseClassName))) {
                        i = r + (i.length > 0 ? ` ${i}` : i);
                        continue;
                    }
                    b = false;
                }
                let g = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
                let h = hasImportantModifier ? `${g}!` : g;
                let k = h + f;
                if (n.indexOf(k) > -1) {
                    continue;
                }
                n.push(k);
                let w = getConflictingClassGroupIds(f, b);
                for (const r of w){
                    n.push(h + r);
                }
                i = r + (i.length > 0 ? ` ${i}` : i);
            }
            return i;
        })(e, o);
        s(e, l);
        return l;
    };
    i = (c)=>{
        t = (o = ((e)=>({
                cache: ((e)=>{
                    if (e < 1) {
                        return {
                            get: ()=>undefined,
                            set: ()=>{}
                        };
                    }
                    let r = 0;
                    let o = Object.create(null);
                    let t = Object.create(null);
                    let l = (l, a)=>{
                        o[l] = a;
                        if (++r > e) {
                            r = 0;
                            t = o;
                            o = Object.create(null);
                        }
                    };
                    return {
                        get (e) {
                            let r = o[e];
                            if (r !== undefined) {
                                return r;
                            }
                            if ((r = t[e]) !== undefined) {
                                l(e, r);
                                return r;
                            }
                        },
                        set (e, r) {
                            if (e in o) {
                                o[e] = r;
                            } else {
                                l(e, r);
                            }
                        }
                    };
                })(e.cacheSize),
                parseClassName: (({ prefix, experimentalParseClassName })=>{
                    let t = (e)=>{
                        let r;
                        let o = [];
                        let t = 0;
                        let l = 0;
                        let a = 0;
                        let e_length = e.length;
                        for(let s = 0; s < e_length; s++){
                            let n = e[s];
                            if (t === 0 && l === 0) {
                                if (n === ":") {
                                    o.push(e.slice(a, s));
                                    a = s + 1;
                                    continue;
                                }
                                if (n === "/") {
                                    r = s;
                                    continue;
                                }
                            }
                            switch(n){
                                case "[":
                                    t++;
                                    break;
                                case "]":
                                    t--;
                                    break;
                                case "(":
                                    l++;
                                    break;
                                default:
                                    if (n === ")") {
                                        l--;
                                    }
                            }
                        }
                        let s = o.length === 0 ? e : e.slice(a);
                        let i = s;
                        let d = false;
                        if (s.endsWith("!")) {
                            i = s.slice(0, -1);
                            d = true;
                        } else if (s.startsWith("!")) {
                            i = s.slice(1);
                            d = true;
                        }
                        return f(o, d, i, r && r > a ? r - a : undefined);
                    };
                    if (prefix) {
                        let e = `${prefix}:`;
                        let o = t;
                        t = (r)=>{
                            if (r.startsWith(e)) {
                                return o(r.slice(e.length));
                            }
                            return f(b, false, r, undefined, true);
                        };
                    }
                    if (experimentalParseClassName) {
                        let parseClassName = t;
                        t = (className)=>experimentalParseClassName({
                                className,
                                parseClassName
                            });
                    }
                    return t;
                })(e),
                sortModifiers: ((e)=>{
                    let r = new Map;
                    e.orderSensitiveModifiers.forEach((e, o)=>{
                        r.set(e, 1000000 + o);
                    });
                    return (e)=>{
                        let o = [];
                        let t = [];
                        for (const a of e){
                            let n = a[0] === "[";
                            let s = r.has(a);
                            if (n || s) {
                                if (t.length > 0) {
                                    t.sort();
                                    o.push(...t);
                                    t = [];
                                }
                                o.push(a);
                            } else {
                                t.push(a);
                            }
                        }
                        if (t.length > 0) {
                            t.sort();
                            o.push(...t);
                        }
                        return o;
                    };
                })(e),
                ...((e)=>{
                    let r = (({ theme, classGroups })=>n(classGroups, theme))(e);
                    let { conflictingClassGroups, conflictingClassGroupModifiers } = e;
                    return {
                        getClassGroupId: (e)=>{
                            if (e.startsWith("[") && e.endsWith("]")) {
                                return ((e)=>{
                                    if (e.slice(1, -1).indexOf(":") === -1) {
                                        return undefined;
                                    }
                                    return (()=>{
                                        let r = e.slice(1, -1);
                                        let o = r.indexOf(":");
                                        let t = r.slice(0, o);
                                        if (t) {
                                            return `arbitrary..${t}`;
                                        }
                                    })();
                                })(e);
                            }
                            let o = e.split("-");
                            let t = +(o[0] === "" && o.length > 1);
                            return a(o, t, r);
                        },
                        getConflictingClassGroupIds: (e, r)=>{
                            if (r) {
                                let r = conflictingClassGroupModifiers[e];
                                let a = conflictingClassGroups[e];
                                if (r) {
                                    if (a) {
                                        return ((e, r)=>{
                                            let o = Array(e.length + r.length);
                                            for(let r = 0; r < e.length; r++){
                                                o[r] = e[r];
                                            }
                                            for(let t = 0; t < r.length; t++){
                                                o[e.length + t] = r[t];
                                            }
                                            return o;
                                        })(a, r);
                                    }
                                    return r;
                                }
                                return a || l;
                            }
                            return conflictingClassGroups[e] || l;
                        }
                    };
                })(e)
            }))(r.reduce((acc, item)=>item(acc), e()))).cache.get;
        s = o.cache.set;
        i = d;
        return d(c);
    };
    return (...e)=>i(((...e)=>{
            let r;
            let o;
            let t = 0;
            let l = "";
            while(t < e.length){
                if ((r = e[t++]) && (o = h(r))) {
                    if (l) {
                        l += " ";
                    }
                    l += o;
                }
            }
            return l;
        })(...e));
})(()=>{
    let e = w("color");
    let r = w("font");
    let o = w("text");
    let t = w("font-weight");
    let l = w("tracking");
    let a = w("leading");
    let n = w("breakpoint");
    let s = w("container");
    let i = w("spacing");
    let d = w("radius");
    let c = w("shadow");
    let m = w("inset-shadow");
    let p = w("text-shadow");
    let u = w("drop-shadow");
    let b = w("blur");
    let f = w("perspective");
    let g = w("aspect");
    let h = w("ease");
    let k = w("animate");
    let x = ()=>[
            "auto",
            "avoid",
            "all",
            "avoid-page",
            "page",
            "left",
            "right",
            "column"
        ];
    let v = ()=>[
            "center",
            "top",
            "bottom",
            "left",
            "right",
            "top-left",
            "left-top",
            "top-right",
            "right-top",
            "bottom-right",
            "right-bottom",
            "bottom-left",
            "left-bottom"
        ];
    let y = ()=>[
            ...v(),
            H,
            B
        ];
    let z = ()=>[
            "auto",
            "hidden",
            "clip",
            "visible",
            "scroll"
        ];
    let j = ()=>[
            "auto",
            "contain",
            "none"
        ];
    let C = ()=>[
            H,
            B,
            i
        ];
    let G = ()=>[
            W,
            "full",
            "auto",
            ...C()
        ];
    let N = ()=>[
            I,
            "none",
            "subgrid",
            H,
            B
        ];
    let M = ()=>[
            "auto",
            {
                span: [
                    "full",
                    I,
                    H,
                    B
                ]
            },
            I,
            H,
            B
        ];
    let S = ()=>[
            I,
            "auto",
            H,
            B
        ];
    let _ = ()=>[
            "auto",
            "min",
            "max",
            "fr",
            H,
            B
        ];
    let P = ()=>[
            "start",
            "end",
            "center",
            "between",
            "around",
            "evenly",
            "stretch",
            "baseline",
            "center-safe",
            "end-safe"
        ];
    let Z = ()=>[
            "start",
            "end",
            "center",
            "stretch",
            "center-safe",
            "end-safe"
        ];
    let ee = ()=>[
            "auto",
            ...C()
        ];
    let er = ()=>[
            W,
            "auto",
            "full",
            "dvw",
            "dvh",
            "lvw",
            "lvh",
            "svw",
            "svh",
            "min",
            "max",
            "fit",
            ...C()
        ];
    let eo = ()=>[
            e,
            H,
            B
        ];
    let et = ()=>[
            ...v(),
            U,
            R,
            {
                position: [
                    H,
                    B
                ]
            }
        ];
    let el = ()=>[
            "no-repeat",
            {
                repeat: [
                    "",
                    "x",
                    "y",
                    "space",
                    "round"
                ]
            }
        ];
    let ea = ()=>[
            "auto",
            "cover",
            "contain",
            V,
            q,
            {
                size: [
                    H,
                    B
                ]
            }
        ];
    let en = ()=>[
            O,
            J,
            L
        ];
    let es = ()=>[
            "",
            "none",
            "full",
            d,
            H,
            B
        ];
    let ei = ()=>[
            "",
            $,
            J,
            L
        ];
    let ed = ()=>[
            "solid",
            "dashed",
            "dotted",
            "double"
        ];
    let ec = ()=>[
            "normal",
            "multiply",
            "screen",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "hue",
            "saturation",
            "color",
            "luminosity"
        ];
    let em = ()=>[
            $,
            O,
            U,
            R
        ];
    let ep = ()=>[
            "",
            "none",
            b,
            H,
            B
        ];
    let eu = ()=>[
            "none",
            $,
            H,
            B
        ];
    let eb = ()=>[
            "none",
            $,
            H,
            B
        ];
    let ef = ()=>[
            $,
            H,
            B
        ];
    let eg = ()=>[
            W,
            "full",
            ...C()
        ];
    return {
        cacheSize: 500,
        theme: {
            animate: [
                "spin",
                "ping",
                "pulse",
                "bounce"
            ],
            aspect: [
                "video"
            ],
            blur: [
                A
            ],
            breakpoint: [
                A
            ],
            color: [
                E
            ],
            container: [
                A
            ],
            "drop-shadow": [
                A
            ],
            ease: [
                "in",
                "out",
                "in-out"
            ],
            font: [
                T
            ],
            "font-weight": [
                "thin",
                "extralight",
                "light",
                "normal",
                "medium",
                "semibold",
                "bold",
                "extrabold",
                "black"
            ],
            "inset-shadow": [
                A
            ],
            leading: [
                "none",
                "tight",
                "snug",
                "normal",
                "relaxed",
                "loose"
            ],
            perspective: [
                "dramatic",
                "near",
                "normal",
                "midrange",
                "distant",
                "none"
            ],
            radius: [
                A
            ],
            shadow: [
                A
            ],
            spacing: [
                "px",
                $
            ],
            text: [
                A
            ],
            "text-shadow": [
                A
            ],
            tracking: [
                "tighter",
                "tight",
                "normal",
                "wide",
                "wider",
                "widest"
            ]
        },
        classGroups: {
            aspect: [
                {
                    aspect: [
                        "auto",
                        "square",
                        W,
                        B,
                        H,
                        g
                    ]
                }
            ],
            container: [
                "container"
            ],
            columns: [
                {
                    columns: [
                        $,
                        B,
                        H,
                        s
                    ]
                }
            ],
            "break-after": [
                {
                    "break-after": x()
                }
            ],
            "break-before": [
                {
                    "break-before": x()
                }
            ],
            "break-inside": [
                {
                    "break-inside": [
                        "auto",
                        "avoid",
                        "avoid-page",
                        "avoid-column"
                    ]
                }
            ],
            "box-decoration": [
                {
                    "box-decoration": [
                        "slice",
                        "clone"
                    ]
                }
            ],
            box: [
                {
                    box: [
                        "border",
                        "content"
                    ]
                }
            ],
            display: [
                "block",
                "inline-block",
                "inline",
                "flex",
                "inline-flex",
                "table",
                "inline-table",
                "table-caption",
                "table-cell",
                "table-column",
                "table-column-group",
                "table-footer-group",
                "table-header-group",
                "table-row-group",
                "table-row",
                "flow-root",
                "grid",
                "inline-grid",
                "contents",
                "list-item",
                "hidden"
            ],
            sr: [
                "sr-only",
                "not-sr-only"
            ],
            float: [
                {
                    float: [
                        "right",
                        "left",
                        "none",
                        "start",
                        "end"
                    ]
                }
            ],
            clear: [
                {
                    clear: [
                        "left",
                        "right",
                        "both",
                        "none",
                        "start",
                        "end"
                    ]
                }
            ],
            isolation: [
                "isolate",
                "isolation-auto"
            ],
            "object-fit": [
                {
                    object: [
                        "contain",
                        "cover",
                        "fill",
                        "none",
                        "scale-down"
                    ]
                }
            ],
            "object-position": [
                {
                    object: y()
                }
            ],
            overflow: [
                {
                    overflow: z()
                }
            ],
            "overflow-x": [
                {
                    "overflow-x": z()
                }
            ],
            "overflow-y": [
                {
                    "overflow-y": z()
                }
            ],
            overscroll: [
                {
                    overscroll: j()
                }
            ],
            "overscroll-x": [
                {
                    "overscroll-x": j()
                }
            ],
            "overscroll-y": [
                {
                    "overscroll-y": j()
                }
            ],
            position: [
                "static",
                "fixed",
                "absolute",
                "relative",
                "sticky"
            ],
            inset: [
                {
                    inset: G()
                }
            ],
            "inset-x": [
                {
                    "inset-x": G()
                }
            ],
            "inset-y": [
                {
                    "inset-y": G()
                }
            ],
            start: [
                {
                    start: G()
                }
            ],
            end: [
                {
                    end: G()
                }
            ],
            top: [
                {
                    top: G()
                }
            ],
            right: [
                {
                    right: G()
                }
            ],
            bottom: [
                {
                    bottom: G()
                }
            ],
            left: [
                {
                    left: G()
                }
            ],
            visibility: [
                "visible",
                "invisible",
                "collapse"
            ],
            z: [
                {
                    z: [
                        I,
                        "auto",
                        H,
                        B
                    ]
                }
            ],
            basis: [
                {
                    basis: [
                        W,
                        "full",
                        "auto",
                        s,
                        ...C()
                    ]
                }
            ],
            "flex-direction": [
                {
                    flex: [
                        "row",
                        "row-reverse",
                        "col",
                        "col-reverse"
                    ]
                }
            ],
            "flex-wrap": [
                {
                    flex: [
                        "nowrap",
                        "wrap",
                        "wrap-reverse"
                    ]
                }
            ],
            flex: [
                {
                    flex: [
                        $,
                        W,
                        "auto",
                        "initial",
                        "none",
                        B
                    ]
                }
            ],
            grow: [
                {
                    grow: [
                        "",
                        $,
                        H,
                        B
                    ]
                }
            ],
            shrink: [
                {
                    shrink: [
                        "",
                        $,
                        H,
                        B
                    ]
                }
            ],
            order: [
                {
                    order: [
                        I,
                        "first",
                        "last",
                        "none",
                        H,
                        B
                    ]
                }
            ],
            "grid-cols": [
                {
                    "grid-cols": N()
                }
            ],
            "col-start-end": [
                {
                    col: M()
                }
            ],
            "col-start": [
                {
                    "col-start": S()
                }
            ],
            "col-end": [
                {
                    "col-end": S()
                }
            ],
            "grid-rows": [
                {
                    "grid-rows": N()
                }
            ],
            "row-start-end": [
                {
                    row: M()
                }
            ],
            "row-start": [
                {
                    "row-start": S()
                }
            ],
            "row-end": [
                {
                    "row-end": S()
                }
            ],
            "grid-flow": [
                {
                    "grid-flow": [
                        "row",
                        "col",
                        "dense",
                        "row-dense",
                        "col-dense"
                    ]
                }
            ],
            "auto-cols": [
                {
                    "auto-cols": _()
                }
            ],
            "auto-rows": [
                {
                    "auto-rows": _()
                }
            ],
            gap: [
                {
                    gap: C()
                }
            ],
            "gap-x": [
                {
                    "gap-x": C()
                }
            ],
            "gap-y": [
                {
                    "gap-y": C()
                }
            ],
            "justify-content": [
                {
                    justify: [
                        ...P(),
                        "normal"
                    ]
                }
            ],
            "justify-items": [
                {
                    "justify-items": [
                        ...Z(),
                        "normal"
                    ]
                }
            ],
            "justify-self": [
                {
                    "justify-self": [
                        "auto",
                        ...Z()
                    ]
                }
            ],
            "align-content": [
                {
                    content: [
                        "normal",
                        ...P()
                    ]
                }
            ],
            "align-items": [
                {
                    items: [
                        ...Z(),
                        {
                            baseline: [
                                "",
                                "last"
                            ]
                        }
                    ]
                }
            ],
            "align-self": [
                {
                    self: [
                        "auto",
                        ...Z(),
                        {
                            baseline: [
                                "",
                                "last"
                            ]
                        }
                    ]
                }
            ],
            "place-content": [
                {
                    "place-content": P()
                }
            ],
            "place-items": [
                {
                    "place-items": [
                        ...Z(),
                        "baseline"
                    ]
                }
            ],
            "place-self": [
                {
                    "place-self": [
                        "auto",
                        ...Z()
                    ]
                }
            ],
            p: [
                {
                    p: C()
                }
            ],
            px: [
                {
                    px: C()
                }
            ],
            py: [
                {
                    py: C()
                }
            ],
            ps: [
                {
                    ps: C()
                }
            ],
            pe: [
                {
                    pe: C()
                }
            ],
            pt: [
                {
                    pt: C()
                }
            ],
            pr: [
                {
                    pr: C()
                }
            ],
            pb: [
                {
                    pb: C()
                }
            ],
            pl: [
                {
                    pl: C()
                }
            ],
            m: [
                {
                    m: ee()
                }
            ],
            mx: [
                {
                    mx: ee()
                }
            ],
            my: [
                {
                    my: ee()
                }
            ],
            ms: [
                {
                    ms: ee()
                }
            ],
            me: [
                {
                    me: ee()
                }
            ],
            mt: [
                {
                    mt: ee()
                }
            ],
            mr: [
                {
                    mr: ee()
                }
            ],
            mb: [
                {
                    mb: ee()
                }
            ],
            ml: [
                {
                    ml: ee()
                }
            ],
            "space-x": [
                {
                    "space-x": C()
                }
            ],
            "space-x-reverse": [
                "space-x-reverse"
            ],
            "space-y": [
                {
                    "space-y": C()
                }
            ],
            "space-y-reverse": [
                "space-y-reverse"
            ],
            size: [
                {
                    size: er()
                }
            ],
            w: [
                {
                    w: [
                        s,
                        "screen",
                        ...er()
                    ]
                }
            ],
            "min-w": [
                {
                    "min-w": [
                        s,
                        "screen",
                        "none",
                        ...er()
                    ]
                }
            ],
            "max-w": [
                {
                    "max-w": [
                        s,
                        "screen",
                        "none",
                        "prose",
                        {
                            screen: [
                                n
                            ]
                        },
                        ...er()
                    ]
                }
            ],
            h: [
                {
                    h: [
                        "screen",
                        "lh",
                        ...er()
                    ]
                }
            ],
            "min-h": [
                {
                    "min-h": [
                        "screen",
                        "lh",
                        "none",
                        ...er()
                    ]
                }
            ],
            "max-h": [
                {
                    "max-h": [
                        "screen",
                        "lh",
                        ...er()
                    ]
                }
            ],
            "font-size": [
                {
                    text: [
                        "base",
                        o,
                        J,
                        L
                    ]
                }
            ],
            "font-smoothing": [
                "antialiased",
                "subpixel-antialiased"
            ],
            "font-style": [
                "italic",
                "not-italic"
            ],
            "font-weight": [
                {
                    font: [
                        t,
                        H,
                        Q
                    ]
                }
            ],
            "font-stretch": [
                {
                    "font-stretch": [
                        "ultra-condensed",
                        "extra-condensed",
                        "condensed",
                        "semi-condensed",
                        "normal",
                        "semi-expanded",
                        "expanded",
                        "extra-expanded",
                        "ultra-expanded",
                        O,
                        B
                    ]
                }
            ],
            "font-family": [
                {
                    font: [
                        K,
                        B,
                        r
                    ]
                }
            ],
            "fvn-normal": [
                "normal-nums"
            ],
            "fvn-ordinal": [
                "ordinal"
            ],
            "fvn-slashed-zero": [
                "slashed-zero"
            ],
            "fvn-figure": [
                "lining-nums",
                "oldstyle-nums"
            ],
            "fvn-spacing": [
                "proportional-nums",
                "tabular-nums"
            ],
            "fvn-fraction": [
                "diagonal-fractions",
                "stacked-fractions"
            ],
            tracking: [
                {
                    tracking: [
                        l,
                        H,
                        B
                    ]
                }
            ],
            "line-clamp": [
                {
                    "line-clamp": [
                        $,
                        "none",
                        H,
                        Q
                    ]
                }
            ],
            leading: [
                {
                    leading: [
                        a,
                        ...C()
                    ]
                }
            ],
            "list-image": [
                {
                    "list-image": [
                        "none",
                        H,
                        B
                    ]
                }
            ],
            "list-style-position": [
                {
                    list: [
                        "inside",
                        "outside"
                    ]
                }
            ],
            "list-style-type": [
                {
                    list: [
                        "disc",
                        "decimal",
                        "none",
                        H,
                        B
                    ]
                }
            ],
            "text-alignment": [
                {
                    text: [
                        "left",
                        "center",
                        "right",
                        "justify",
                        "start",
                        "end"
                    ]
                }
            ],
            "placeholder-color": [
                {
                    placeholder: eo()
                }
            ],
            "text-color": [
                {
                    text: eo()
                }
            ],
            "text-decoration": [
                "underline",
                "overline",
                "line-through",
                "no-underline"
            ],
            "text-decoration-style": [
                {
                    decoration: [
                        ...ed(),
                        "wavy"
                    ]
                }
            ],
            "text-decoration-thickness": [
                {
                    decoration: [
                        $,
                        "from-font",
                        "auto",
                        H,
                        L
                    ]
                }
            ],
            "text-decoration-color": [
                {
                    decoration: eo()
                }
            ],
            "underline-offset": [
                {
                    "underline-offset": [
                        $,
                        "auto",
                        H,
                        B
                    ]
                }
            ],
            "text-transform": [
                "uppercase",
                "lowercase",
                "capitalize",
                "normal-case"
            ],
            "text-overflow": [
                "truncate",
                "text-ellipsis",
                "text-clip"
            ],
            "text-wrap": [
                {
                    text: [
                        "wrap",
                        "nowrap",
                        "balance",
                        "pretty"
                    ]
                }
            ],
            indent: [
                {
                    indent: C()
                }
            ],
            "vertical-align": [
                {
                    align: [
                        "baseline",
                        "top",
                        "middle",
                        "bottom",
                        "text-top",
                        "text-bottom",
                        "sub",
                        "super",
                        H,
                        B
                    ]
                }
            ],
            whitespace: [
                {
                    whitespace: [
                        "normal",
                        "nowrap",
                        "pre",
                        "pre-line",
                        "pre-wrap",
                        "break-spaces"
                    ]
                }
            ],
            break: [
                {
                    break: [
                        "normal",
                        "words",
                        "all",
                        "keep"
                    ]
                }
            ],
            wrap: [
                {
                    wrap: [
                        "break-word",
                        "anywhere",
                        "normal"
                    ]
                }
            ],
            hyphens: [
                {
                    hyphens: [
                        "none",
                        "manual",
                        "auto"
                    ]
                }
            ],
            content: [
                {
                    content: [
                        "none",
                        H,
                        B
                    ]
                }
            ],
            "bg-attachment": [
                {
                    bg: [
                        "fixed",
                        "local",
                        "scroll"
                    ]
                }
            ],
            "bg-clip": [
                {
                    "bg-clip": [
                        "border",
                        "padding",
                        "content",
                        "text"
                    ]
                }
            ],
            "bg-origin": [
                {
                    "bg-origin": [
                        "border",
                        "padding",
                        "content"
                    ]
                }
            ],
            "bg-position": [
                {
                    bg: et()
                }
            ],
            "bg-repeat": [
                {
                    bg: el()
                }
            ],
            "bg-size": [
                {
                    bg: ea()
                }
            ],
            "bg-image": [
                {
                    bg: [
                        "none",
                        {
                            linear: [
                                {
                                    to: [
                                        "t",
                                        "tr",
                                        "r",
                                        "br",
                                        "b",
                                        "bl",
                                        "l",
                                        "tl"
                                    ]
                                },
                                I,
                                H,
                                B
                            ],
                            radial: [
                                "",
                                H,
                                B
                            ],
                            conic: [
                                I,
                                H,
                                B
                            ]
                        },
                        X,
                        D
                    ]
                }
            ],
            "bg-color": [
                {
                    bg: eo()
                }
            ],
            "gradient-from-pos": [
                {
                    from: en()
                }
            ],
            "gradient-via-pos": [
                {
                    via: en()
                }
            ],
            "gradient-to-pos": [
                {
                    to: en()
                }
            ],
            "gradient-from": [
                {
                    from: eo()
                }
            ],
            "gradient-via": [
                {
                    via: eo()
                }
            ],
            "gradient-to": [
                {
                    to: eo()
                }
            ],
            rounded: [
                {
                    rounded: es()
                }
            ],
            "rounded-s": [
                {
                    "rounded-s": es()
                }
            ],
            "rounded-e": [
                {
                    "rounded-e": es()
                }
            ],
            "rounded-t": [
                {
                    "rounded-t": es()
                }
            ],
            "rounded-r": [
                {
                    "rounded-r": es()
                }
            ],
            "rounded-b": [
                {
                    "rounded-b": es()
                }
            ],
            "rounded-l": [
                {
                    "rounded-l": es()
                }
            ],
            "rounded-ss": [
                {
                    "rounded-ss": es()
                }
            ],
            "rounded-se": [
                {
                    "rounded-se": es()
                }
            ],
            "rounded-ee": [
                {
                    "rounded-ee": es()
                }
            ],
            "rounded-es": [
                {
                    "rounded-es": es()
                }
            ],
            "rounded-tl": [
                {
                    "rounded-tl": es()
                }
            ],
            "rounded-tr": [
                {
                    "rounded-tr": es()
                }
            ],
            "rounded-br": [
                {
                    "rounded-br": es()
                }
            ],
            "rounded-bl": [
                {
                    "rounded-bl": es()
                }
            ],
            "border-w": [
                {
                    border: ei()
                }
            ],
            "border-w-x": [
                {
                    "border-x": ei()
                }
            ],
            "border-w-y": [
                {
                    "border-y": ei()
                }
            ],
            "border-w-s": [
                {
                    "border-s": ei()
                }
            ],
            "border-w-e": [
                {
                    "border-e": ei()
                }
            ],
            "border-w-t": [
                {
                    "border-t": ei()
                }
            ],
            "border-w-r": [
                {
                    "border-r": ei()
                }
            ],
            "border-w-b": [
                {
                    "border-b": ei()
                }
            ],
            "border-w-l": [
                {
                    "border-l": ei()
                }
            ],
            "divide-x": [
                {
                    "divide-x": ei()
                }
            ],
            "divide-x-reverse": [
                "divide-x-reverse"
            ],
            "divide-y": [
                {
                    "divide-y": ei()
                }
            ],
            "divide-y-reverse": [
                "divide-y-reverse"
            ],
            "border-style": [
                {
                    border: [
                        ...ed(),
                        "hidden",
                        "none"
                    ]
                }
            ],
            "divide-style": [
                {
                    divide: [
                        ...ed(),
                        "hidden",
                        "none"
                    ]
                }
            ],
            "border-color": [
                {
                    border: eo()
                }
            ],
            "border-color-x": [
                {
                    "border-x": eo()
                }
            ],
            "border-color-y": [
                {
                    "border-y": eo()
                }
            ],
            "border-color-s": [
                {
                    "border-s": eo()
                }
            ],
            "border-color-e": [
                {
                    "border-e": eo()
                }
            ],
            "border-color-t": [
                {
                    "border-t": eo()
                }
            ],
            "border-color-r": [
                {
                    "border-r": eo()
                }
            ],
            "border-color-b": [
                {
                    "border-b": eo()
                }
            ],
            "border-color-l": [
                {
                    "border-l": eo()
                }
            ],
            "divide-color": [
                {
                    divide: eo()
                }
            ],
            "outline-style": [
                {
                    outline: [
                        ...ed(),
                        "none",
                        "hidden"
                    ]
                }
            ],
            "outline-offset": [
                {
                    "outline-offset": [
                        $,
                        H,
                        B
                    ]
                }
            ],
            "outline-w": [
                {
                    outline: [
                        "",
                        $,
                        J,
                        L
                    ]
                }
            ],
            "outline-color": [
                {
                    outline: eo()
                }
            ],
            shadow: [
                {
                    shadow: [
                        "",
                        "none",
                        c,
                        Y,
                        F
                    ]
                }
            ],
            "shadow-color": [
                {
                    shadow: eo()
                }
            ],
            "inset-shadow": [
                {
                    "inset-shadow": [
                        "none",
                        m,
                        Y,
                        F
                    ]
                }
            ],
            "inset-shadow-color": [
                {
                    "inset-shadow": eo()
                }
            ],
            "ring-w": [
                {
                    ring: ei()
                }
            ],
            "ring-w-inset": [
                "ring-inset"
            ],
            "ring-color": [
                {
                    ring: eo()
                }
            ],
            "ring-offset-w": [
                {
                    "ring-offset": [
                        $,
                        L
                    ]
                }
            ],
            "ring-offset-color": [
                {
                    "ring-offset": eo()
                }
            ],
            "inset-ring-w": [
                {
                    "inset-ring": ei()
                }
            ],
            "inset-ring-color": [
                {
                    "inset-ring": eo()
                }
            ],
            "text-shadow": [
                {
                    "text-shadow": [
                        "none",
                        p,
                        Y,
                        F
                    ]
                }
            ],
            "text-shadow-color": [
                {
                    "text-shadow": eo()
                }
            ],
            opacity: [
                {
                    opacity: [
                        $,
                        H,
                        B
                    ]
                }
            ],
            "mix-blend": [
                {
                    "mix-blend": [
                        ...ec(),
                        "plus-darker",
                        "plus-lighter"
                    ]
                }
            ],
            "bg-blend": [
                {
                    "bg-blend": ec()
                }
            ],
            "mask-clip": [
                {
                    "mask-clip": [
                        "border",
                        "padding",
                        "content",
                        "fill",
                        "stroke",
                        "view"
                    ]
                },
                "mask-no-clip"
            ],
            "mask-composite": [
                {
                    mask: [
                        "add",
                        "subtract",
                        "intersect",
                        "exclude"
                    ]
                }
            ],
            "mask-image-linear-pos": [
                {
                    "mask-linear": [
                        $
                    ]
                }
            ],
            "mask-image-linear-from-pos": [
                {
                    "mask-linear-from": em()
                }
            ],
            "mask-image-linear-to-pos": [
                {
                    "mask-linear-to": em()
                }
            ],
            "mask-image-linear-from-color": [
                {
                    "mask-linear-from": eo()
                }
            ],
            "mask-image-linear-to-color": [
                {
                    "mask-linear-to": eo()
                }
            ],
            "mask-image-t-from-pos": [
                {
                    "mask-t-from": em()
                }
            ],
            "mask-image-t-to-pos": [
                {
                    "mask-t-to": em()
                }
            ],
            "mask-image-t-from-color": [
                {
                    "mask-t-from": eo()
                }
            ],
            "mask-image-t-to-color": [
                {
                    "mask-t-to": eo()
                }
            ],
            "mask-image-r-from-pos": [
                {
                    "mask-r-from": em()
                }
            ],
            "mask-image-r-to-pos": [
                {
                    "mask-r-to": em()
                }
            ],
            "mask-image-r-from-color": [
                {
                    "mask-r-from": eo()
                }
            ],
            "mask-image-r-to-color": [
                {
                    "mask-r-to": eo()
                }
            ],
            "mask-image-b-from-pos": [
                {
                    "mask-b-from": em()
                }
            ],
            "mask-image-b-to-pos": [
                {
                    "mask-b-to": em()
                }
            ],
            "mask-image-b-from-color": [
                {
                    "mask-b-from": eo()
                }
            ],
            "mask-image-b-to-color": [
                {
                    "mask-b-to": eo()
                }
            ],
            "mask-image-l-from-pos": [
                {
                    "mask-l-from": em()
                }
            ],
            "mask-image-l-to-pos": [
                {
                    "mask-l-to": em()
                }
            ],
            "mask-image-l-from-color": [
                {
                    "mask-l-from": eo()
                }
            ],
            "mask-image-l-to-color": [
                {
                    "mask-l-to": eo()
                }
            ],
            "mask-image-x-from-pos": [
                {
                    "mask-x-from": em()
                }
            ],
            "mask-image-x-to-pos": [
                {
                    "mask-x-to": em()
                }
            ],
            "mask-image-x-from-color": [
                {
                    "mask-x-from": eo()
                }
            ],
            "mask-image-x-to-color": [
                {
                    "mask-x-to": eo()
                }
            ],
            "mask-image-y-from-pos": [
                {
                    "mask-y-from": em()
                }
            ],
            "mask-image-y-to-pos": [
                {
                    "mask-y-to": em()
                }
            ],
            "mask-image-y-from-color": [
                {
                    "mask-y-from": eo()
                }
            ],
            "mask-image-y-to-color": [
                {
                    "mask-y-to": eo()
                }
            ],
            "mask-image-radial": [
                {
                    "mask-radial": [
                        H,
                        B
                    ]
                }
            ],
            "mask-image-radial-from-pos": [
                {
                    "mask-radial-from": em()
                }
            ],
            "mask-image-radial-to-pos": [
                {
                    "mask-radial-to": em()
                }
            ],
            "mask-image-radial-from-color": [
                {
                    "mask-radial-from": eo()
                }
            ],
            "mask-image-radial-to-color": [
                {
                    "mask-radial-to": eo()
                }
            ],
            "mask-image-radial-shape": [
                {
                    "mask-radial": [
                        "circle",
                        "ellipse"
                    ]
                }
            ],
            "mask-image-radial-size": [
                {
                    "mask-radial": [
                        {
                            closest: [
                                "side",
                                "corner"
                            ],
                            farthest: [
                                "side",
                                "corner"
                            ]
                        }
                    ]
                }
            ],
            "mask-image-radial-pos": [
                {
                    "mask-radial-at": v()
                }
            ],
            "mask-image-conic-pos": [
                {
                    "mask-conic": [
                        $
                    ]
                }
            ],
            "mask-image-conic-from-pos": [
                {
                    "mask-conic-from": em()
                }
            ],
            "mask-image-conic-to-pos": [
                {
                    "mask-conic-to": em()
                }
            ],
            "mask-image-conic-from-color": [
                {
                    "mask-conic-from": eo()
                }
            ],
            "mask-image-conic-to-color": [
                {
                    "mask-conic-to": eo()
                }
            ],
            "mask-mode": [
                {
                    mask: [
                        "alpha",
                        "luminance",
                        "match"
                    ]
                }
            ],
            "mask-origin": [
                {
                    "mask-origin": [
                        "border",
                        "padding",
                        "content",
                        "fill",
                        "stroke",
                        "view"
                    ]
                }
            ],
            "mask-position": [
                {
                    mask: et()
                }
            ],
            "mask-repeat": [
                {
                    mask: el()
                }
            ],
            "mask-size": [
                {
                    mask: ea()
                }
            ],
            "mask-type": [
                {
                    "mask-type": [
                        "alpha",
                        "luminance"
                    ]
                }
            ],
            "mask-image": [
                {
                    mask: [
                        "none",
                        H,
                        B
                    ]
                }
            ],
            filter: [
                {
                    filter: [
                        "",
                        "none",
                        H,
                        B
                    ]
                }
            ],
            blur: [
                {
                    blur: ep()
                }
            ],
            brightness: [
                {
                    brightness: [
                        $,
                        H,
                        B
                    ]
                }
            ],
            contrast: [
                {
                    contrast: [
                        $,
                        H,
                        B
                    ]
                }
            ],
            "drop-shadow": [
                {
                    "drop-shadow": [
                        "",
                        "none",
                        u,
                        Y,
                        F
                    ]
                }
            ],
            "drop-shadow-color": [
                {
                    "drop-shadow": eo()
                }
            ],
            grayscale: [
                {
                    grayscale: [
                        "",
                        $,
                        H,
                        B
                    ]
                }
            ],
            "hue-rotate": [
                {
                    "hue-rotate": [
                        $,
                        H,
                        B
                    ]
                }
            ],
            invert: [
                {
                    invert: [
                        "",
                        $,
                        H,
                        B
                    ]
                }
            ],
            saturate: [
                {
                    saturate: [
                        $,
                        H,
                        B
                    ]
                }
            ],
            sepia: [
                {
                    sepia: [
                        "",
                        $,
                        H,
                        B
                    ]
                }
            ],
            "backdrop-filter": [
                {
                    "backdrop-filter": [
                        "",
                        "none",
                        H,
                        B
                    ]
                }
            ],
            "backdrop-blur": [
                {
                    "backdrop-blur": ep()
                }
            ],
            "backdrop-brightness": [
                {
                    "backdrop-brightness": [
                        $,
                        H,
                        B
                    ]
                }
            ],
            "backdrop-contrast": [
                {
                    "backdrop-contrast": [
                        $,
                        H,
                        B
                    ]
                }
            ],
            "backdrop-grayscale": [
                {
                    "backdrop-grayscale": [
                        "",
                        $,
                        H,
                        B
                    ]
                }
            ],
            "backdrop-hue-rotate": [
                {
                    "backdrop-hue-rotate": [
                        $,
                        H,
                        B
                    ]
                }
            ],
            "backdrop-invert": [
                {
                    "backdrop-invert": [
                        "",
                        $,
                        H,
                        B
                    ]
                }
            ],
            "backdrop-opacity": [
                {
                    "backdrop-opacity": [
                        $,
                        H,
                        B
                    ]
                }
            ],
            "backdrop-saturate": [
                {
                    "backdrop-saturate": [
                        $,
                        H,
                        B
                    ]
                }
            ],
            "backdrop-sepia": [
                {
                    "backdrop-sepia": [
                        "",
                        $,
                        H,
                        B
                    ]
                }
            ],
            "border-collapse": [
                {
                    border: [
                        "collapse",
                        "separate"
                    ]
                }
            ],
            "border-spacing": [
                {
                    "border-spacing": C()
                }
            ],
            "border-spacing-x": [
                {
                    "border-spacing-x": C()
                }
            ],
            "border-spacing-y": [
                {
                    "border-spacing-y": C()
                }
            ],
            "table-layout": [
                {
                    table: [
                        "auto",
                        "fixed"
                    ]
                }
            ],
            caption: [
                {
                    caption: [
                        "top",
                        "bottom"
                    ]
                }
            ],
            transition: [
                {
                    transition: [
                        "",
                        "all",
                        "colors",
                        "opacity",
                        "shadow",
                        "transform",
                        "none",
                        H,
                        B
                    ]
                }
            ],
            "transition-behavior": [
                {
                    transition: [
                        "normal",
                        "discrete"
                    ]
                }
            ],
            duration: [
                {
                    duration: [
                        $,
                        "initial",
                        H,
                        B
                    ]
                }
            ],
            ease: [
                {
                    ease: [
                        "linear",
                        "initial",
                        h,
                        H,
                        B
                    ]
                }
            ],
            delay: [
                {
                    delay: [
                        $,
                        H,
                        B
                    ]
                }
            ],
            animate: [
                {
                    animate: [
                        "none",
                        k,
                        H,
                        B
                    ]
                }
            ],
            backface: [
                {
                    backface: [
                        "hidden",
                        "visible"
                    ]
                }
            ],
            perspective: [
                {
                    perspective: [
                        f,
                        H,
                        B
                    ]
                }
            ],
            "perspective-origin": [
                {
                    "perspective-origin": y()
                }
            ],
            rotate: [
                {
                    rotate: eu()
                }
            ],
            "rotate-x": [
                {
                    "rotate-x": eu()
                }
            ],
            "rotate-y": [
                {
                    "rotate-y": eu()
                }
            ],
            "rotate-z": [
                {
                    "rotate-z": eu()
                }
            ],
            scale: [
                {
                    scale: eb()
                }
            ],
            "scale-x": [
                {
                    "scale-x": eb()
                }
            ],
            "scale-y": [
                {
                    "scale-y": eb()
                }
            ],
            "scale-z": [
                {
                    "scale-z": eb()
                }
            ],
            "scale-3d": [
                "scale-3d"
            ],
            skew: [
                {
                    skew: ef()
                }
            ],
            "skew-x": [
                {
                    "skew-x": ef()
                }
            ],
            "skew-y": [
                {
                    "skew-y": ef()
                }
            ],
            transform: [
                {
                    transform: [
                        H,
                        B,
                        "",
                        "none",
                        "gpu",
                        "cpu"
                    ]
                }
            ],
            "transform-origin": [
                {
                    origin: y()
                }
            ],
            "transform-style": [
                {
                    transform: [
                        "3d",
                        "flat"
                    ]
                }
            ],
            translate: [
                {
                    translate: eg()
                }
            ],
            "translate-x": [
                {
                    "translate-x": eg()
                }
            ],
            "translate-y": [
                {
                    "translate-y": eg()
                }
            ],
            "translate-z": [
                {
                    "translate-z": eg()
                }
            ],
            "translate-none": [
                "translate-none"
            ],
            accent: [
                {
                    accent: eo()
                }
            ],
            appearance: [
                {
                    appearance: [
                        "none",
                        "auto"
                    ]
                }
            ],
            "caret-color": [
                {
                    caret: eo()
                }
            ],
            "color-scheme": [
                {
                    scheme: [
                        "normal",
                        "dark",
                        "light",
                        "light-dark",
                        "only-dark",
                        "only-light"
                    ]
                }
            ],
            cursor: [
                {
                    cursor: [
                        "auto",
                        "default",
                        "pointer",
                        "wait",
                        "text",
                        "move",
                        "help",
                        "not-allowed",
                        "none",
                        "context-menu",
                        "progress",
                        "cell",
                        "crosshair",
                        "vertical-text",
                        "alias",
                        "copy",
                        "no-drop",
                        "grab",
                        "grabbing",
                        "all-scroll",
                        "col-resize",
                        "row-resize",
                        "n-resize",
                        "e-resize",
                        "s-resize",
                        "w-resize",
                        "ne-resize",
                        "nw-resize",
                        "se-resize",
                        "sw-resize",
                        "ew-resize",
                        "ns-resize",
                        "nesw-resize",
                        "nwse-resize",
                        "zoom-in",
                        "zoom-out",
                        H,
                        B
                    ]
                }
            ],
            "field-sizing": [
                {
                    "field-sizing": [
                        "fixed",
                        "content"
                    ]
                }
            ],
            "pointer-events": [
                {
                    "pointer-events": [
                        "auto",
                        "none"
                    ]
                }
            ],
            resize: [
                {
                    resize: [
                        "none",
                        "",
                        "y",
                        "x"
                    ]
                }
            ],
            "scroll-behavior": [
                {
                    scroll: [
                        "auto",
                        "smooth"
                    ]
                }
            ],
            "scroll-m": [
                {
                    "scroll-m": C()
                }
            ],
            "scroll-mx": [
                {
                    "scroll-mx": C()
                }
            ],
            "scroll-my": [
                {
                    "scroll-my": C()
                }
            ],
            "scroll-ms": [
                {
                    "scroll-ms": C()
                }
            ],
            "scroll-me": [
                {
                    "scroll-me": C()
                }
            ],
            "scroll-mt": [
                {
                    "scroll-mt": C()
                }
            ],
            "scroll-mr": [
                {
                    "scroll-mr": C()
                }
            ],
            "scroll-mb": [
                {
                    "scroll-mb": C()
                }
            ],
            "scroll-ml": [
                {
                    "scroll-ml": C()
                }
            ],
            "scroll-p": [
                {
                    "scroll-p": C()
                }
            ],
            "scroll-px": [
                {
                    "scroll-px": C()
                }
            ],
            "scroll-py": [
                {
                    "scroll-py": C()
                }
            ],
            "scroll-ps": [
                {
                    "scroll-ps": C()
                }
            ],
            "scroll-pe": [
                {
                    "scroll-pe": C()
                }
            ],
            "scroll-pt": [
                {
                    "scroll-pt": C()
                }
            ],
            "scroll-pr": [
                {
                    "scroll-pr": C()
                }
            ],
            "scroll-pb": [
                {
                    "scroll-pb": C()
                }
            ],
            "scroll-pl": [
                {
                    "scroll-pl": C()
                }
            ],
            "snap-align": [
                {
                    snap: [
                        "start",
                        "end",
                        "center",
                        "align-none"
                    ]
                }
            ],
            "snap-stop": [
                {
                    snap: [
                        "normal",
                        "always"
                    ]
                }
            ],
            "snap-type": [
                {
                    snap: [
                        "none",
                        "x",
                        "y",
                        "both"
                    ]
                }
            ],
            "snap-strictness": [
                {
                    snap: [
                        "mandatory",
                        "proximity"
                    ]
                }
            ],
            touch: [
                {
                    touch: [
                        "auto",
                        "none",
                        "manipulation"
                    ]
                }
            ],
            "touch-x": [
                {
                    "touch-pan": [
                        "x",
                        "left",
                        "right"
                    ]
                }
            ],
            "touch-y": [
                {
                    "touch-pan": [
                        "y",
                        "up",
                        "down"
                    ]
                }
            ],
            "touch-pz": [
                "touch-pinch-zoom"
            ],
            select: [
                {
                    select: [
                        "none",
                        "text",
                        "all",
                        "auto"
                    ]
                }
            ],
            "will-change": [
                {
                    "will-change": [
                        "auto",
                        "scroll",
                        "contents",
                        "transform",
                        H,
                        B
                    ]
                }
            ],
            fill: [
                {
                    fill: [
                        "none",
                        ...eo()
                    ]
                }
            ],
            "stroke-w": [
                {
                    stroke: [
                        $,
                        J,
                        L,
                        Q
                    ]
                }
            ],
            stroke: [
                {
                    stroke: [
                        "none",
                        ...eo()
                    ]
                }
            ],
            "forced-color-adjust": [
                {
                    "forced-color-adjust": [
                        "auto",
                        "none"
                    ]
                }
            ]
        },
        conflictingClassGroups: {
            overflow: [
                "overflow-x",
                "overflow-y"
            ],
            overscroll: [
                "overscroll-x",
                "overscroll-y"
            ],
            inset: [
                "inset-x",
                "inset-y",
                "start",
                "end",
                "top",
                "right",
                "bottom",
                "left"
            ],
            "inset-x": [
                "right",
                "left"
            ],
            "inset-y": [
                "top",
                "bottom"
            ],
            flex: [
                "basis",
                "grow",
                "shrink"
            ],
            gap: [
                "gap-x",
                "gap-y"
            ],
            p: [
                "px",
                "py",
                "ps",
                "pe",
                "pt",
                "pr",
                "pb",
                "pl"
            ],
            px: [
                "pr",
                "pl"
            ],
            py: [
                "pt",
                "pb"
            ],
            m: [
                "mx",
                "my",
                "ms",
                "me",
                "mt",
                "mr",
                "mb",
                "ml"
            ],
            mx: [
                "mr",
                "ml"
            ],
            my: [
                "mt",
                "mb"
            ],
            size: [
                "w",
                "h"
            ],
            "font-size": [
                "leading"
            ],
            "fvn-normal": [
                "fvn-ordinal",
                "fvn-slashed-zero",
                "fvn-figure",
                "fvn-spacing",
                "fvn-fraction"
            ],
            "fvn-ordinal": [
                "fvn-normal"
            ],
            "fvn-slashed-zero": [
                "fvn-normal"
            ],
            "fvn-figure": [
                "fvn-normal"
            ],
            "fvn-spacing": [
                "fvn-normal"
            ],
            "fvn-fraction": [
                "fvn-normal"
            ],
            "line-clamp": [
                "display",
                "overflow"
            ],
            rounded: [
                "rounded-s",
                "rounded-e",
                "rounded-t",
                "rounded-r",
                "rounded-b",
                "rounded-l",
                "rounded-ss",
                "rounded-se",
                "rounded-ee",
                "rounded-es",
                "rounded-tl",
                "rounded-tr",
                "rounded-br",
                "rounded-bl"
            ],
            "rounded-s": [
                "rounded-ss",
                "rounded-es"
            ],
            "rounded-e": [
                "rounded-se",
                "rounded-ee"
            ],
            "rounded-t": [
                "rounded-tl",
                "rounded-tr"
            ],
            "rounded-r": [
                "rounded-tr",
                "rounded-br"
            ],
            "rounded-b": [
                "rounded-br",
                "rounded-bl"
            ],
            "rounded-l": [
                "rounded-tl",
                "rounded-bl"
            ],
            "border-spacing": [
                "border-spacing-x",
                "border-spacing-y"
            ],
            "border-w": [
                "border-w-x",
                "border-w-y",
                "border-w-s",
                "border-w-e",
                "border-w-t",
                "border-w-r",
                "border-w-b",
                "border-w-l"
            ],
            "border-w-x": [
                "border-w-r",
                "border-w-l"
            ],
            "border-w-y": [
                "border-w-t",
                "border-w-b"
            ],
            "border-color": [
                "border-color-x",
                "border-color-y",
                "border-color-s",
                "border-color-e",
                "border-color-t",
                "border-color-r",
                "border-color-b",
                "border-color-l"
            ],
            "border-color-x": [
                "border-color-r",
                "border-color-l"
            ],
            "border-color-y": [
                "border-color-t",
                "border-color-b"
            ],
            translate: [
                "translate-x",
                "translate-y",
                "translate-none"
            ],
            "translate-none": [
                "translate",
                "translate-x",
                "translate-y",
                "translate-z"
            ],
            "scroll-m": [
                "scroll-mx",
                "scroll-my",
                "scroll-ms",
                "scroll-me",
                "scroll-mt",
                "scroll-mr",
                "scroll-mb",
                "scroll-ml"
            ],
            "scroll-mx": [
                "scroll-mr",
                "scroll-ml"
            ],
            "scroll-my": [
                "scroll-mt",
                "scroll-mb"
            ],
            "scroll-p": [
                "scroll-px",
                "scroll-py",
                "scroll-ps",
                "scroll-pe",
                "scroll-pt",
                "scroll-pr",
                "scroll-pb",
                "scroll-pl"
            ],
            "scroll-px": [
                "scroll-pr",
                "scroll-pl"
            ],
            "scroll-py": [
                "scroll-pt",
                "scroll-pb"
            ],
            touch: [
                "touch-x",
                "touch-y",
                "touch-pz"
            ],
            "touch-x": [
                "touch"
            ],
            "touch-y": [
                "touch"
            ],
            "touch-pz": [
                "touch"
            ]
        },
        conflictingClassGroupModifiers: {
            "font-size": [
                "leading"
            ]
        },
        orderSensitiveModifiers: [
            "*",
            "**",
            "after",
            "backdrop",
            "before",
            "details-content",
            "file",
            "first-letter",
            "first-line",
            "marker",
            "placeholder",
            "selection"
        ]
    };
});
