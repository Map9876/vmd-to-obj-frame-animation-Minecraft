import { o } from "./react-LvWBhTF7/chunk_a.js";
import { te } from "./react-LvWBhTF7/chunk_ee.js";
import { re } from "./react-LvWBhTF7/chunk_ne.js";
import { Be } from "./react-LvWBhTF7/chunk_ze.js";
import { n, s as s_1, t } from "./jsx-runtime-Db0DjQYK.js";
const r = s_1(n(), 1);
function i(e, t) {
    let cache = t && t.cache ? t.cache : m;
    let serializer = t && t.serializer ? t.serializer : f;
    return (t && t.strategy ? t.strategy : l)(e, {
        cache,
        serializer
    });
}
function s(e, t, n) {
    let r = Array.prototype.slice.call(arguments, 3);
    let i = n(r);
    let a = t.get(i);
    if (a === undefined) {
        a = e.apply(this, r);
        t.set(i, a);
    }
    return a;
}
function c(e, t, n, r, i) {
    return n.bind(t, e, r, i);
}
function l(e, t) {
    let n = e.length === 1 ? o : s;
    return c(e, this, n, t.cache.create(), t.serializer);
}
function variadic(e, t) {
    return c(e, this, s, t.cache.create(), t.serializer);
}
function monadic(e, t) {
    return c(e, this, o, t.cache.create(), t.serializer);
}
var f = function() {
    return JSON.stringify(arguments);
};
class p {
    constructor(){
        this.cache = Object.create(null);
    }
    get(e) {
        return this.cache[e];
    }
    set(e, t) {
        this.cache[e] = t;
    }
}
var m = {
    create: function() {
        return new p;
    }
};
const h = {
    variadic,
    monadic
};
class g extends Error {
    constructor(e, t){
        let n = e;
        if (t) {
            n += `: ` + t;
        }
        super(n);
        this.code = e;
        if (t) {
            this.originalMessage = t;
        }
    }
}
var _ = ((e)=>{
    e.MISSING_MESSAGE = `MISSING_MESSAGE`;
    e.MISSING_FORMAT = `MISSING_FORMAT`;
    e.ENVIRONMENT_FALLBACK = `ENVIRONMENT_FALLBACK`;
    e.INSUFFICIENT_PATH = `INSUFFICIENT_PATH`;
    e.INVALID_MESSAGE = `INVALID_MESSAGE`;
    e.INVALID_KEY = `INVALID_KEY`;
    e.FORMATTING_ERROR = `FORMATTING_ERROR`;
    return e;
})(_ || {});
function v() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
        list: {},
        displayNames: {}
    };
}
function y(e, t) {
    return i(e, {
        cache: (n = t, {
            create: ()=>({
                    get: (e)=>n[e],
                    set (e, t) {
                        n[e] = t;
                    }
                })
        }),
        strategy: h.variadic
    });
    var n;
}
function b(e, t) {
    return y((...t)=>new e(...t), t);
}
export function d(e) {
    return {
        getDateTimeFormat: b(Intl.DateTimeFormat, e.dateTime),
        getNumberFormat: b(Intl.NumberFormat, e.number),
        getPluralRules: b(Intl.PluralRules, e.pluralRules),
        getRelativeTimeFormat: b(Intl.RelativeTimeFormat, e.relativeTime),
        getListFormat: b(Intl.ListFormat, e.list),
        getDisplayNames: b(Intl.DisplayNames, e.displayNames)
    };
}
function ie(e) {
    return e.replace(/^(.*?)-/, ``);
}
const ae = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
const oe = /^(@+)?(\+|#+)?[rs]?$/g;
const se = /(\*)(0+)|(#+)(0+)|(0+)/g;
const S = /^(0+)$/;
function ce(e) {
    let t = {};
    if (e[e.length - 1] === `r`) {
        t.roundingPriority = `morePrecision`;
    } else if (e[e.length - 1] === `s`) {
        t.roundingPriority = `lessPrecision`;
    }
    e.replace(oe, (e, n, r)=>{
        if (typeof r == `string`) {
            if (r === `+`) {
                t.minimumSignificantDigits = n.length;
            } else if (n[0] === `#`) {
                t.maximumSignificantDigits = n.length;
            } else {
                t.minimumSignificantDigits = n.length;
                t.maximumSignificantDigits = n.length + (typeof r == `string` ? r.length : 0);
            }
        } else {
            t.minimumSignificantDigits = n.length;
            t.maximumSignificantDigits = n.length;
        }
        return ``;
    });
    return t;
}
function C(e) {
    switch(e){
        case `sign-auto`:
            return {
                signDisplay: `auto`
            };
        case `sign-accounting`:
        case `()`:
            return {
                currencySign: `accounting`
            };
        case `sign-always`:
        case `+!`:
            return {
                signDisplay: `always`
            };
        case `sign-accounting-always`:
        case `()!`:
            return {
                signDisplay: `always`,
                currencySign: `accounting`
            };
        case `sign-except-zero`:
        case `+?`:
            return {
                signDisplay: `exceptZero`
            };
        case `sign-accounting-except-zero`:
        case `()?`:
            return {
                signDisplay: `exceptZero`,
                currencySign: `accounting`
            };
        case `sign-never`:
        case `+_`:
            return {
                signDisplay: `never`
            };
    }
}
function le(e) {
    let t;
    if (e[0] === `E` && e[1] === `E`) {
        t = {
            notation: `engineering`
        };
        e = e.slice(2);
    } else if (e[0] === `E`) {
        t = {
            notation: `scientific`
        };
        e = e.slice(1);
    }
    if (t) {
        let n = e.slice(0, 2);
        if (n === `+!`) {
            t.signDisplay = `always`;
            e = e.slice(2);
        } else if (n === `+?`) {
            t.signDisplay = `exceptZero`;
            e = e.slice(2);
        }
        if (!S.test(e)) {
            throw Error(`Malformed concise eng/scientific notation`);
        }
        t.minimumIntegerDigits = e.length;
    }
    return t;
}
function w(option) {
    return C(option) || {};
}
function ue(tokens) {
    let t = {};
    for (let n of tokens){
        switch(n.stem){
            case `percent`:
            case `%`:
                t.style = `percent`;
                continue;
            case `%x100`:
                t.style = `percent`;
                t.scale = 100;
                continue;
            case `currency`:
                t.style = `currency`;
                t.currency = n.options[0];
                continue;
            case `group-off`:
            case `,_`:
                t.useGrouping = false;
                continue;
            case `precision-integer`:
            case `.`:
                t.maximumFractionDigits = 0;
                continue;
            case `measure-unit`:
            case `unit`:
                t.style = `unit`;
                t.unit = ie(n.options[0]);
                continue;
            case `compact-short`:
            case `K`:
                t.notation = `compact`;
                t.compactDisplay = `short`;
                continue;
            case `compact-long`:
            case `KK`:
                t.notation = `compact`;
                t.compactDisplay = `long`;
                continue;
            case `scientific`:
                t = {
                    ...t,
                    notation: `scientific`,
                    ...n.options.reduce((acc, option)=>({
                            ...acc,
                            ...w(option)
                        }), {})
                };
                continue;
            case `engineering`:
                t = {
                    ...t,
                    notation: `engineering`,
                    ...n.options.reduce((acc, option)=>({
                            ...acc,
                            ...w(option)
                        }), {})
                };
                continue;
            case `notation-simple`:
                t.notation = `standard`;
                continue;
            case `unit-width-narrow`:
                t.currencyDisplay = `narrowSymbol`;
                t.unitDisplay = `narrow`;
                continue;
            case `unit-width-short`:
                t.currencyDisplay = `code`;
                t.unitDisplay = `short`;
                continue;
            case `unit-width-full-name`:
                t.currencyDisplay = `name`;
                t.unitDisplay = `long`;
                continue;
            case `unit-width-iso-code`:
                t.currencyDisplay = `symbol`;
                continue;
            case `scale`:
                t.scale = parseFloat(n.options[0]);
                continue;
            case `rounding-mode-floor`:
                t.roundingMode = `floor`;
                continue;
            case `rounding-mode-ceiling`:
                t.roundingMode = `ceil`;
                continue;
            case `rounding-mode-down`:
                t.roundingMode = `trunc`;
                continue;
            case `rounding-mode-up`:
                t.roundingMode = `expand`;
                continue;
            case `rounding-mode-half-even`:
                t.roundingMode = `halfEven`;
                continue;
            case `rounding-mode-half-down`:
                t.roundingMode = `halfTrunc`;
                continue;
            case `rounding-mode-half-up`:
                t.roundingMode = `halfExpand`;
                continue;
            case `integer-width`:
                if (n.options.length > 1) {
                    throw RangeError(`integer-width stems only accept a single optional option`);
                }
                n.options[0].replace(se, (e, n, r, i, a, o)=>{
                    if (n) {
                        t.minimumIntegerDigits = r.length;
                    } else if (i && a) {
                        throw Error(`We currently do not support maximum integer digits`);
                    } else if (o) {
                        throw Error(`We currently do not support exact integer digits`);
                    }
                    return ``;
                });
                continue;
        }
        if (S.test(n.stem)) {
            t.minimumIntegerDigits = n.stem.length;
            continue;
        }
        if (ae.test(n.stem)) {
            if (n.options.length > 1) {
                throw RangeError(`Fraction-precision stems only accept a single optional option`);
            }
            n.stem.replace(ae, (e, n, r, i, a, o)=>{
                if (r === `*`) {
                    t.minimumFractionDigits = n.length;
                } else if (i && i[0] === `#`) {
                    t.maximumFractionDigits = i.length;
                } else if (a && o) {
                    t.minimumFractionDigits = a.length;
                    t.maximumFractionDigits = a.length + o.length;
                } else {
                    t.minimumFractionDigits = n.length;
                    t.maximumFractionDigits = n.length;
                }
                return ``;
            });
            let e = n.options[0];
            if (e === `w`) {
                t = {
                    ...t,
                    trailingZeroDisplay: `stripIfInteger`
                };
            } else if (e) {
                t = {
                    ...t,
                    ...ce(e)
                };
            }
            continue;
        }
        if (oe.test(n.stem)) {
            t = {
                ...t,
                ...ce(n.stem)
            };
            continue;
        }
        let e = C(n.stem);
        if (e) {
            t = {
                ...t,
                ...e
            };
        }
        let r = le(n.stem);
        if (r) {
            t = {
                ...t,
                ...r
            };
        }
    }
    return t;
}
const de = ((e)=>{
    e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = `EXPECT_ARGUMENT_CLOSING_BRACE`;
    e[e.EMPTY_ARGUMENT = 2] = `EMPTY_ARGUMENT`;
    e[e.MALFORMED_ARGUMENT = 3] = `MALFORMED_ARGUMENT`;
    e[e.EXPECT_ARGUMENT_TYPE = 4] = `EXPECT_ARGUMENT_TYPE`;
    e[e.INVALID_ARGUMENT_TYPE = 5] = `INVALID_ARGUMENT_TYPE`;
    e[e.EXPECT_ARGUMENT_STYLE = 6] = `EXPECT_ARGUMENT_STYLE`;
    e[e.INVALID_NUMBER_SKELETON = 7] = `INVALID_NUMBER_SKELETON`;
    e[e.INVALID_DATE_TIME_SKELETON = 8] = `INVALID_DATE_TIME_SKELETON`;
    e[e.EXPECT_NUMBER_SKELETON = 9] = `EXPECT_NUMBER_SKELETON`;
    e[e.EXPECT_DATE_TIME_SKELETON = 10] = `EXPECT_DATE_TIME_SKELETON`;
    e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = `UNCLOSED_QUOTE_IN_ARGUMENT_STYLE`;
    e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = `EXPECT_SELECT_ARGUMENT_OPTIONS`;
    e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = `EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE`;
    e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = `INVALID_PLURAL_ARGUMENT_OFFSET_VALUE`;
    e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = `EXPECT_SELECT_ARGUMENT_SELECTOR`;
    e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = `EXPECT_PLURAL_ARGUMENT_SELECTOR`;
    e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = `EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT`;
    e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = `EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT`;
    e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = `INVALID_PLURAL_ARGUMENT_SELECTOR`;
    e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = `DUPLICATE_PLURAL_ARGUMENT_SELECTOR`;
    e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = `DUPLICATE_SELECT_ARGUMENT_SELECTOR`;
    e[e.MISSING_OTHER_CLAUSE = 22] = `MISSING_OTHER_CLAUSE`;
    e[e.INVALID_TAG = 23] = `INVALID_TAG`;
    e[e.INVALID_TAG_NAME = 25] = `INVALID_TAG_NAME`;
    e[e.UNMATCHED_CLOSING_TAG = 26] = `UNMATCHED_CLOSING_TAG`;
    e[e.UNCLOSED_TAG = 27] = `UNCLOSED_TAG`;
    return e;
})({});
function T(e) {
    return e.type === 0;
}
function fe(e) {
    return e.type === 1;
}
function E(e) {
    return e.type === 2;
}
function D(e) {
    return e.type === 3;
}
function O(e) {
    return e.type === 4;
}
function pe(e) {
    return e.type === 5;
}
function me(e) {
    return e.type === 6;
}
function he(e) {
    return e.type === 7;
}
function ge(e) {
    return e.type === 8;
}
function _e(style) {
    return !!(style && typeof style == `object` && style.type === 0);
}
function k(style) {
    return !!(style && typeof style == `object` && style.type === 1);
}
const ve = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
const A = {
    "001": [
        `H`,
        `h`
    ],
    419: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    AC: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    AD: [
        `H`,
        `hB`
    ],
    AE: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    AF: [
        `H`,
        `hb`,
        `hB`,
        `h`
    ],
    AG: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    AI: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    AL: [
        `h`,
        `H`,
        `hB`
    ],
    AM: [
        `H`,
        `hB`
    ],
    AO: [
        `H`,
        `hB`
    ],
    AR: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    AS: [
        `h`,
        `H`
    ],
    AT: [
        `H`,
        `hB`
    ],
    AU: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    AW: [
        `H`,
        `hB`
    ],
    AX: [
        `H`
    ],
    AZ: [
        `H`,
        `hB`,
        `h`
    ],
    BA: [
        `H`,
        `hB`,
        `h`
    ],
    BB: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    BD: [
        `h`,
        `hB`,
        `H`
    ],
    BE: [
        `H`,
        `hB`
    ],
    BF: [
        `H`,
        `hB`
    ],
    BG: [
        `H`,
        `hB`,
        `h`
    ],
    BH: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    BI: [
        `H`,
        `h`
    ],
    BJ: [
        `H`,
        `hB`
    ],
    BL: [
        `H`,
        `hB`
    ],
    BM: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    BN: [
        `hb`,
        `hB`,
        `h`,
        `H`
    ],
    BO: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    BQ: [
        `H`
    ],
    BR: [
        `H`,
        `hB`
    ],
    BS: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    BT: [
        `h`,
        `H`
    ],
    BW: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    BY: [
        `H`,
        `h`
    ],
    BZ: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    CA: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    CC: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    CD: [
        `hB`,
        `H`
    ],
    CF: [
        `H`,
        `h`,
        `hB`
    ],
    CG: [
        `H`,
        `hB`
    ],
    CH: [
        `H`,
        `hB`,
        `h`
    ],
    CI: [
        `H`,
        `hB`
    ],
    CK: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    CL: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    CM: [
        `H`,
        `h`,
        `hB`
    ],
    CN: [
        `H`,
        `hB`,
        `hb`,
        `h`
    ],
    CO: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    CP: [
        `H`
    ],
    CR: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    CU: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    CV: [
        `H`,
        `hB`
    ],
    CW: [
        `H`,
        `hB`
    ],
    CX: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    CY: [
        `h`,
        `H`,
        `hb`,
        `hB`
    ],
    CZ: [
        `H`
    ],
    DE: [
        `H`,
        `hB`
    ],
    DG: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    DJ: [
        `h`,
        `H`
    ],
    DK: [
        `H`
    ],
    DM: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    DO: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    DZ: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    EA: [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    EC: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    EE: [
        `H`,
        `hB`
    ],
    EG: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    EH: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    ER: [
        `h`,
        `H`
    ],
    ES: [
        `H`,
        `hB`,
        `h`,
        `hb`
    ],
    ET: [
        `hB`,
        `hb`,
        `h`,
        `H`
    ],
    FI: [
        `H`
    ],
    FJ: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    FK: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    FM: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    FO: [
        `H`,
        `h`
    ],
    FR: [
        `H`,
        `hB`
    ],
    GA: [
        `H`,
        `hB`
    ],
    GB: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    GD: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    GE: [
        `H`,
        `hB`,
        `h`
    ],
    GF: [
        `H`,
        `hB`
    ],
    GG: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    GH: [
        `h`,
        `H`
    ],
    GI: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    GL: [
        `H`,
        `h`
    ],
    GM: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    GN: [
        `H`,
        `hB`
    ],
    GP: [
        `H`,
        `hB`
    ],
    GQ: [
        `H`,
        `hB`,
        `h`,
        `hb`
    ],
    GR: [
        `h`,
        `H`,
        `hb`,
        `hB`
    ],
    GS: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    GT: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    GU: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    GW: [
        `H`,
        `hB`
    ],
    GY: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    HK: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    HN: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    HR: [
        `H`,
        `hB`
    ],
    HU: [
        `H`,
        `h`
    ],
    IC: [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    ID: [
        `H`
    ],
    IE: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    IL: [
        `H`,
        `hB`
    ],
    IM: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    IN: [
        `h`,
        `H`
    ],
    IO: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    IQ: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    IR: [
        `hB`,
        `H`
    ],
    IS: [
        `H`
    ],
    IT: [
        `H`,
        `hB`
    ],
    JE: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    JM: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    JO: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    JP: [
        `H`,
        `K`,
        `h`
    ],
    KE: [
        `hB`,
        `hb`,
        `H`,
        `h`
    ],
    KG: [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    KH: [
        `hB`,
        `h`,
        `H`,
        `hb`
    ],
    KI: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    KM: [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    KN: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    KP: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    KR: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    KW: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    KY: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    KZ: [
        `H`,
        `hB`
    ],
    LA: [
        `H`,
        `hb`,
        `hB`,
        `h`
    ],
    LB: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    LC: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    LI: [
        `H`,
        `hB`,
        `h`
    ],
    LK: [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    LR: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    LS: [
        `h`,
        `H`
    ],
    LT: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    LU: [
        `H`,
        `h`,
        `hB`
    ],
    LV: [
        `H`,
        `hB`,
        `hb`,
        `h`
    ],
    LY: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    MA: [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    MC: [
        `H`,
        `hB`
    ],
    MD: [
        `H`,
        `hB`
    ],
    ME: [
        `H`,
        `hB`,
        `h`
    ],
    MF: [
        `H`,
        `hB`
    ],
    MG: [
        `H`,
        `h`
    ],
    MH: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    MK: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    ML: [
        `H`
    ],
    MM: [
        `hB`,
        `hb`,
        `H`,
        `h`
    ],
    MN: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    MO: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    MP: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    MQ: [
        `H`,
        `hB`
    ],
    MR: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    MS: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    MT: [
        `H`,
        `h`
    ],
    MU: [
        `H`,
        `h`
    ],
    MV: [
        `H`,
        `h`
    ],
    MW: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    MX: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    MY: [
        `hb`,
        `hB`,
        `h`,
        `H`
    ],
    MZ: [
        `H`,
        `hB`
    ],
    NA: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    NC: [
        `H`,
        `hB`
    ],
    NE: [
        `H`
    ],
    NF: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    NG: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    NI: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    NL: [
        `H`,
        `hB`
    ],
    NO: [
        `H`,
        `h`
    ],
    NP: [
        `H`,
        `h`,
        `hB`
    ],
    NR: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    NU: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    NZ: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    OM: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    PA: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    PE: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    PF: [
        `H`,
        `h`,
        `hB`
    ],
    PG: [
        `h`,
        `H`
    ],
    PH: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    PK: [
        `h`,
        `hB`,
        `H`
    ],
    PL: [
        `H`,
        `h`
    ],
    PM: [
        `H`,
        `hB`
    ],
    PN: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    PR: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    PS: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    PT: [
        `H`,
        `hB`
    ],
    PW: [
        `h`,
        `H`
    ],
    PY: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    QA: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    RE: [
        `H`,
        `hB`
    ],
    RO: [
        `H`,
        `hB`
    ],
    RS: [
        `H`,
        `hB`,
        `h`
    ],
    RU: [
        `H`
    ],
    RW: [
        `H`,
        `h`
    ],
    SA: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    SB: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    SC: [
        `H`,
        `h`,
        `hB`
    ],
    SD: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    SE: [
        `H`
    ],
    SG: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    SH: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    SI: [
        `H`,
        `hB`
    ],
    SJ: [
        `H`
    ],
    SK: [
        `H`
    ],
    SL: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    SM: [
        `H`,
        `h`,
        `hB`
    ],
    SN: [
        `H`,
        `h`,
        `hB`
    ],
    SO: [
        `h`,
        `H`
    ],
    SR: [
        `H`,
        `hB`
    ],
    SS: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    ST: [
        `H`,
        `hB`
    ],
    SV: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    SX: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    SY: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    SZ: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    TA: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    TC: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    TD: [
        `h`,
        `H`,
        `hB`
    ],
    TF: [
        `H`,
        `h`,
        `hB`
    ],
    TG: [
        `H`,
        `hB`
    ],
    TH: [
        `H`,
        `h`
    ],
    TJ: [
        `H`,
        `h`
    ],
    TL: [
        `H`,
        `hB`,
        `hb`,
        `h`
    ],
    TM: [
        `H`,
        `h`
    ],
    TN: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    TO: [
        `h`,
        `H`
    ],
    TR: [
        `H`,
        `hB`
    ],
    TT: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    TW: [
        `hB`,
        `hb`,
        `h`,
        `H`
    ],
    TZ: [
        `hB`,
        `hb`,
        `H`,
        `h`
    ],
    UA: [
        `H`,
        `hB`,
        `h`
    ],
    UG: [
        `hB`,
        `hb`,
        `H`,
        `h`
    ],
    UM: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    US: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    UY: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    UZ: [
        `H`,
        `hB`,
        `h`
    ],
    VA: [
        `H`,
        `h`,
        `hB`
    ],
    VC: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    VE: [
        `h`,
        `H`,
        `hB`,
        `hb`
    ],
    VG: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    VI: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    VN: [
        `H`,
        `h`
    ],
    VU: [
        `h`,
        `H`
    ],
    WF: [
        `H`,
        `hB`
    ],
    WS: [
        `h`,
        `H`
    ],
    XK: [
        `H`,
        `hB`,
        `h`
    ],
    YE: [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    YT: [
        `H`,
        `hB`
    ],
    ZA: [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    ZM: [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    ZW: [
        `H`,
        `h`
    ],
    "af-ZA": [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    "ar-001": [
        `h`,
        `hB`,
        `hb`,
        `H`
    ],
    "ca-ES": [
        `H`,
        `h`,
        `hB`
    ],
    "en-001": [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    "en-HK": [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    "en-IL": [
        `H`,
        `h`,
        `hb`,
        `hB`
    ],
    "en-MY": [
        `h`,
        `hb`,
        `H`,
        `hB`
    ],
    "es-BR": [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    "es-ES": [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    "es-GQ": [
        `H`,
        `h`,
        `hB`,
        `hb`
    ],
    "fr-CA": [
        `H`,
        `h`,
        `hB`
    ],
    "gl-ES": [
        `H`,
        `h`,
        `hB`
    ],
    "gu-IN": [
        `hB`,
        `hb`,
        `h`,
        `H`
    ],
    "hi-IN": [
        `hB`,
        `h`,
        `H`
    ],
    "it-CH": [
        `H`,
        `h`,
        `hB`
    ],
    "it-IT": [
        `H`,
        `h`,
        `hB`
    ],
    "kn-IN": [
        `hB`,
        `h`,
        `H`
    ],
    "ku-SY": [
        `H`,
        `hB`
    ],
    "ml-IN": [
        `hB`,
        `h`,
        `H`
    ],
    "mr-IN": [
        `hB`,
        `hb`,
        `h`,
        `H`
    ],
    "pa-IN": [
        `hB`,
        `hb`,
        `h`,
        `H`
    ],
    "ta-IN": [
        `hB`,
        `h`,
        `hb`,
        `H`
    ],
    "te-IN": [
        `hB`,
        `h`,
        `H`
    ],
    "zu-ZA": [
        `H`,
        `hB`,
        `hb`,
        `h`
    ]
};
function ye(e, locale) {
    let n = ``;
    for(let r = 0; r < e.length; r++){
        let i = e.charAt(r);
        if (i === `j`) {
            let a = 0;
            while(r + 1 < e.length && e.charAt(r + 1) === i){
                a++;
                r++;
            }
            let o = 1 + (a & 1);
            let s = a < 2 ? 1 : 3 + (a >> 1);
            let c = be(locale);
            for((c == `H` || c == `k`) && (s = 0); s-- > 0;){
                n += `a`;
            }
            while(o-- > 0){
                n = c + n;
            }
        } else {
            if (i === `J`) {
                n += `H`;
            } else {
                n += i;
            }
        }
    }
    return n;
}
function be(locale) {
    let e_hourCycle = locale.hourCycle;
    if (e_hourCycle === undefined && locale.hourCycles && locale.hourCycles.length) {
        e_hourCycle = locale.hourCycles[0];
    }
    if (e_hourCycle) {
        switch(e_hourCycle){
            case `h24`:
                return `k`;
            case `h23`:
                return `H`;
            case `h12`:
                return `h`;
            case `h11`:
                return `K`;
            default:
                throw Error(`Invalid hourCycle`);
        }
    }
    let e_language = locale.language;
    let r;
    if (e_language !== `root`) {
        r = locale.maximize().region;
    }
    return (A[r || ``] || A[e_language || ``] || A[`${e_language}-001`] || A[`001`])[0];
}
const xe = RegExp(`^${ve.source}*`);
const Se = RegExp(`${ve.source}*$`);
function j(start, end) {
    return {
        start,
        end
    };
}
const Ce = !!Object.fromEntries;
const we = !!String.prototype.trimStart;
const Te = !!String.prototype.trimEnd;
const M = Ce ? Object.fromEntries : (e)=>{
    let t = {};
    for (let [n, r] of e){
        t[n] = r;
    }
    return t;
};
const Ee = we ? (e)=>e.trimStart() : (e)=>e.replace(xe, ``);
const De = Te ? (e)=>e.trimEnd() : (e)=>e.replace(Se, ``);
const N = RegExp(`([^\\p{White_Space}\\p{Pattern_Syntax}]*)`, `yu`);
function Oe(message, t) {
    N.lastIndex = t;
    return N.exec(message)[1] ?? ``;
}
function ke(message) {
    if (message.length === 0) {
        return null;
    }
    let line = 1;
    let column = 1;
    for(let r = 0; r < message.length;){
        let i = message.charCodeAt(r);
        switch(i){
            case 35:
            case 39:
            case 60:
            case 123:
            case 125:
                return null;
        }
        if (i === 10) {
            line++;
            column = 1;
            r++;
        } else {
            column++;
            if (i >= 55296 && i <= 56319 && r + 1 < message.length) {
                let t = message.charCodeAt(r + 1);
                r += t >= 56320 && t <= 57343 ? 2 : 1;
            } else {
                r++;
            }
        }
    }
    return {
        offset: message.length,
        line,
        column
    };
}
class Ae {
    constructor(e, t = {}){
        this.message = e;
        this.position = {
            offset: 0,
            line: 1,
            column: 1
        };
        this.ignoreTag = !!t.ignoreTag;
        this.locale = t.locale;
        this.requiresOtherClause = !!t.requiresOtherClause;
        this.shouldParseSkeletons = !!t.shouldParseSkeletons;
    }
    parse() {
        if (this.offset() !== 0) {
            throw Error(`parser can only be used once`);
        }
        if (this.message.length > 0) {
            let e = this.message.charCodeAt(0);
            if (e !== 35 && e !== 39 && e !== 60 && e !== 123 && e !== 125) {
                let e = ke(this.message);
                if (e) {
                    let t = this.clonePosition();
                    this.position = e;
                    return {
                        val: [
                            {
                                type: 0,
                                value: this.message,
                                location: j(t, this.clonePosition())
                            }
                        ],
                        err: null
                    };
                }
            }
        }
        return this.parseMessage(0, ``, false);
    }
    parseMessage(e, t, n) {
        let r = [];
        while(!this.isEOF()){
            let i = this.char();
            if (i === 123) {
                let t = this.parseArgument(e, n);
                if (t.err) {
                    return t;
                }
                r.push(t.val);
            } else if (i === 125 && e > 0) {
                break;
            } else if (i === 35 && (t === `plural` || t === `selectordinal`)) {
                let e = this.clonePosition();
                this.bump();
                r.push({
                    type: 7,
                    location: j(e, this.clonePosition())
                });
            } else if (i === 60 && !this.ignoreTag && this.peek() === 47) {
                if (n) {
                    break;
                }
                return this.error(26, j(this.clonePosition(), this.clonePosition()));
            } else if (i === 60 && !this.ignoreTag && P(this.peek() || 0)) {
                let n = this.parseTag(e, t);
                if (n.err) {
                    return n;
                }
                r.push(n.val);
            } else {
                let n = this.parseLiteral(e, t);
                if (n.err) {
                    return n;
                }
                r.push(n.val);
            }
        }
        return {
            val: r,
            err: null
        };
    }
    parseTag(e, t) {
        let n = this.clonePosition();
        this.bump();
        let r = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf(`/>`)) {
            return {
                val: {
                    type: 0,
                    value: `<${r}/>`,
                    location: j(n, this.clonePosition())
                },
                err: null
            };
        }
        if (this.bumpIf(`>`)) {
            let i = this.parseMessage(e + 1, t, true);
            if (i.err) {
                return i;
            }
            let children = i.val;
            let o = this.clonePosition();
            if (this.bumpIf(`</`)) {
                if (this.isEOF() || !P(this.char())) {
                    return this.error(23, j(o, this.clonePosition()));
                }
                let e = this.clonePosition();
                if (r === this.parseTagName()) {
                    this.bumpSpace();
                    if (this.bumpIf(`>`)) {
                        return {
                            val: {
                                type: 8,
                                value: r,
                                children,
                                location: j(n, this.clonePosition())
                            },
                            err: null
                        };
                    }
                    return this.error(23, j(o, this.clonePosition()));
                }
                return this.error(26, j(e, this.clonePosition()));
            } else {
                return this.error(27, j(n, this.clonePosition()));
            }
        } else {
            return this.error(23, j(n, this.clonePosition()));
        }
    }
    parseTagName() {
        let e = this.offset();
        for(this.bump(); !this.isEOF() && Me(this.char());){
            this.bump();
        }
        return this.message.slice(e, this.offset());
    }
    parseLiteral(e, t) {
        let n = this.clonePosition();
        let r = ``;
        while(true){
            let n = this.tryParseQuote(t);
            if (n) {
                r += n;
                continue;
            }
            let i = this.tryParseUnquoted(e, t);
            if (i) {
                r += i;
                continue;
            }
            let a = this.tryParseLeftAngleBracket();
            if (a) {
                r += a;
                continue;
            }
            break;
        }
        let i = j(n, this.clonePosition());
        return {
            val: {
                type: 0,
                value: r,
                location: i
            },
            err: null
        };
    }
    tryParseLeftAngleBracket() {
        if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !je(this.peek() || 0))) {
            this.bump();
            return `<`;
        }
        return null;
    }
    tryParseQuote(e) {
        if (this.isEOF() || this.char() !== 39) {
            return null;
        }
        switch(this.peek()){
            case 39:
                this.bump();
                this.bump();
                return `'`;
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35:
                if (e === `plural` || e === `selectordinal`) {
                    break;
                }
                return null;
            default:
                return null;
        }
        this.bump();
        let t = [
            this.char()
        ];
        for(this.bump(); !this.isEOF();){
            let e = this.char();
            if (e === 39) {
                if (this.peek() === 39) {
                    t.push(39);
                    this.bump();
                } else {
                    this.bump();
                    break;
                }
            } else {
                t.push(e);
            }
            this.bump();
        }
        return String.fromCodePoint(...t);
    }
    tryParseUnquoted(e, t) {
        if (this.isEOF()) {
            return null;
        }
        let n = this.char();
        if (n === 60 || n === 123 || n === 35 && (t === `plural` || t === `selectordinal`) || n === 125 && e > 0) {
            return null;
        }
        this.bump();
        return String.fromCodePoint(n);
    }
    parseArgument(e, t) {
        let n = this.clonePosition();
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(1, j(n, this.clonePosition()));
        }
        if (this.char() === 125) {
            this.bump();
            return this.error(2, j(n, this.clonePosition()));
        }
        let value = this.parseIdentifierIfPossible().value;
        if (!value) {
            return this.error(3, j(n, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(1, j(n, this.clonePosition()));
        }
        switch(this.char()){
            case 125:
                this.bump();
                return {
                    val: {
                        type: 1,
                        value,
                        location: j(n, this.clonePosition())
                    },
                    err: null
                };
            case 44:
                this.bump();
                this.bumpSpace();
                if (this.isEOF()) {
                    return this.error(1, j(n, this.clonePosition()));
                }
                return this.parseArgumentOptions(e, t, value, n);
            default:
                return this.error(3, j(n, this.clonePosition()));
        }
    }
    parseIdentifierIfPossible() {
        let e = this.clonePosition();
        let t = this.offset();
        let n = Oe(this.message, t);
        let r = t + n.length;
        this.bumpTo(r);
        return {
            value: n,
            location: j(e, this.clonePosition())
        };
    }
    parseArgumentOptions(e, t, n, r) {
        let i = this.clonePosition();
        let value = this.parseIdentifierIfPossible().value;
        let o = this.clonePosition();
        switch(value){
            case ``:
                return this.error(4, j(i, o));
            case `number`:
            case `date`:
            case `time`:
                {
                    this.bumpSpace();
                    let e = null;
                    if (this.bumpIf(`,`)) {
                        this.bumpSpace();
                        let t = this.clonePosition();
                        let n = this.parseSimpleArgStyleIfPossible();
                        if (n.err) {
                            return n;
                        }
                        let style = De(n.val);
                        if (style.length === 0) {
                            return this.error(6, j(this.clonePosition(), this.clonePosition()));
                        }
                        e = {
                            style,
                            styleLocation: j(t, this.clonePosition())
                        };
                    }
                    let t = this.tryParseArgumentClose(r);
                    if (t.err) {
                        return t;
                    }
                    let i = j(r, this.clonePosition());
                    if (e && e.style.startsWith(`::`)) {
                        let t = Ee(e.style.slice(2));
                        if (value === `number`) {
                            let r = this.parseNumberSkeletonFromString(t, e.styleLocation);
                            if (r.err) {
                                return r;
                            }
                            return {
                                val: {
                                    type: 2,
                                    value: n,
                                    location: i,
                                    style: r.val
                                },
                                err: null
                            };
                        } else {
                            if (t.length === 0) {
                                return this.error(10, i);
                            }
                            let pattern = t;
                            if (this.locale) {
                                pattern = ye(t, this.locale);
                            }
                            let style = {
                                type: 1,
                                pattern,
                                location: e.styleLocation,
                                parsedOptions: this.shouldParseSkeletons ? te(pattern) : {}
                            };
                            return {
                                val: {
                                    type: value === `date` ? 3 : 4,
                                    value: n,
                                    location: i,
                                    style
                                },
                                err: null
                            };
                        }
                    }
                    return {
                        val: {
                            type: value === `number` ? 2 : value === `date` ? 3 : 4,
                            value: n,
                            location: i,
                            style: e?.style ?? null
                        },
                        err: null
                    };
                }
            case `plural`:
            case `selectordinal`:
            case `select`:
                {
                    let i = this.clonePosition();
                    this.bumpSpace();
                    if (!this.bumpIf(`,`)) {
                        return this.error(12, j(i, {
                            ...i
                        }));
                    }
                    this.bumpSpace();
                    let o = this.parseIdentifierIfPossible();
                    let offset = 0;
                    if (value !== `select` && o.value === `offset`) {
                        if (!this.bumpIf(`:`)) {
                            return this.error(13, j(this.clonePosition(), this.clonePosition()));
                        }
                        this.bumpSpace();
                        let e = this.tryParseDecimalInteger(13, 14);
                        if (e.err) {
                            return e;
                        }
                        this.bumpSpace();
                        o = this.parseIdentifierIfPossible();
                        offset = e.val;
                    }
                    let c = this.tryParsePluralOrSelectOptions(e, value, t, o);
                    if (c.err) {
                        return c;
                    }
                    let l = this.tryParseArgumentClose(r);
                    if (l.err) {
                        return l;
                    }
                    let u = j(r, this.clonePosition());
                    if (value === `select`) {
                        return {
                            val: {
                                type: 5,
                                value: n,
                                options: M(c.val),
                                location: u
                            },
                            err: null
                        };
                    }
                    return {
                        val: {
                            type: 6,
                            value: n,
                            options: M(c.val),
                            offset,
                            pluralType: value === `plural` ? `cardinal` : `ordinal`,
                            location: u
                        },
                        err: null
                    };
                }
            default:
                return this.error(5, j(i, o));
        }
    }
    tryParseArgumentClose(e) {
        if (this.isEOF() || this.char() !== 125) {
            return this.error(1, j(e, this.clonePosition()));
        }
        this.bump();
        return {
            val: true,
            err: null
        };
    }
    parseSimpleArgStyleIfPossible() {
        let e = 0;
        let t = this.clonePosition();
        while(!this.isEOF()){
            switch(this.char()){
                case 39:
                    {
                        this.bump();
                        let e = this.clonePosition();
                        if (!this.bumpUntil(`'`)) {
                            return this.error(11, j(e, this.clonePosition()));
                        }
                        this.bump();
                        break;
                    }
                case 123:
                    e += 1;
                    this.bump();
                    break;
                case 125:
                    if (e > 0) {
                        --e;
                    } else {
                        return {
                            val: this.message.slice(t.offset, this.offset()),
                            err: null
                        };
                    }
                    break;
                default:
                    this.bump();
                    break;
            }
        }
        return {
            val: this.message.slice(t.offset, this.offset()),
            err: null
        };
    }
    parseNumberSkeletonFromString(e, t) {
        let tokens = [];
        try {
            tokens = re(e);
        } catch  {
            return this.error(7, t);
        }
        return {
            val: {
                type: 0,
                tokens,
                location: t,
                parsedOptions: this.shouldParseSkeletons ? ue(tokens) : {}
            },
            err: null
        };
    }
    tryParsePluralOrSelectOptions(e, t, n, r) {
        let i = false;
        let a = [];
        let o = new Set;
        let { value, location } = r;
        while(true){
            if (value.length === 0) {
                let e = this.clonePosition();
                if (t !== `select` && this.bumpIf(`=`)) {
                    let t = this.tryParseDecimalInteger(16, 19);
                    if (t.err) {
                        return t;
                    }
                    location = j(e, this.clonePosition());
                    value = this.message.slice(e.offset, this.offset());
                } else {
                    break;
                }
            }
            if (o.has(value)) {
                return this.error(t === `select` ? 21 : 20, location);
            }
            if (value === `other`) {
                i = true;
            }
            this.bumpSpace();
            let r = this.clonePosition();
            if (!this.bumpIf(`{`)) {
                return this.error(t === `select` ? 17 : 18, j(this.clonePosition(), this.clonePosition()));
            }
            let l = this.parseMessage(e + 1, t, n);
            if (l.err) {
                return l;
            }
            let u = this.tryParseArgumentClose(r);
            if (u.err) {
                return u;
            }
            a.push([
                value,
                {
                    value: l.val,
                    location: j(r, this.clonePosition())
                }
            ]);
            o.add(value);
            this.bumpSpace();
            ({ value, location } = this.parseIdentifierIfPossible());
        }
        if (a.length === 0) {
            return this.error(t === `select` ? 15 : 16, j(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !i) {
            return this.error(22, j(this.clonePosition(), this.clonePosition()));
        }
        return {
            val: a,
            err: null
        };
    }
    tryParseDecimalInteger(e, t) {
        let n = 1;
        let r = this.clonePosition();
        if (!this.bumpIf(`+`)) {
            if (this.bumpIf(`-`)) {
                n = -1;
            }
        }
        let i = false;
        let a = 0;
        while(!this.isEOF()){
            let e = this.char();
            if (e >= 48 && e <= 57) {
                i = true;
                a = a * 10 + (e - 48);
                this.bump();
            } else {
                break;
            }
        }
        let o = j(r, this.clonePosition());
        if (i) {
            a *= n;
            if (Number.isSafeInteger(a)) {
                return {
                    val: a,
                    err: null
                };
            }
            return this.error(t, o);
        }
        return this.error(e, o);
    }
    offset() {
        return this.position.offset;
    }
    isEOF() {
        return this.offset() === this.message.length;
    }
    clonePosition() {
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column
        };
    }
    char() {
        let offset = this.position.offset;
        if (offset >= this.message.length) {
            throw Error(`out of bound`);
        }
        let t = this.message.codePointAt(offset);
        if (t === undefined) {
            throw Error(`Offset ${offset} is at invalid UTF-16 code unit boundary`);
        }
        return t;
    }
    error(kind, t) {
        return {
            val: null,
            err: {
                kind,
                message: this.message,
                location: t
            }
        };
    }
    bump() {
        if (this.isEOF()) {
            return;
        }
        let e = this.char();
        if (e === 10) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
        } else {
            this.position.column += 1;
            this.position.offset += e < 65536 ? 1 : 2;
        }
    }
    bumpIf(e) {
        if (this.message.startsWith(e, this.offset())) {
            for(let t = 0; t < e.length; t++){
                this.bump();
            }
            return true;
        }
        return false;
    }
    bumpUntil(e) {
        let t = this.offset();
        let n = this.message.indexOf(e, t);
        if (n >= 0) {
            this.bumpTo(n);
            return true;
        }
        this.bumpTo(this.message.length);
        return false;
    }
    bumpTo(e) {
        if (this.offset() > e) {
            throw Error(`targetOffset ${e} must be greater than or equal to the current offset ${this.offset()}`);
        }
        for(e = Math.min(e, this.message.length);;){
            let t = this.offset();
            if (t === e) {
                break;
            }
            if (t > e) {
                throw Error(`targetOffset ${e} is at invalid UTF-16 code unit boundary`);
            }
            this.bump();
            if (this.isEOF()) {
                break;
            }
        }
    }
    bumpSpace() {
        while(!this.isEOF() && Ne(this.char())){
            this.bump();
        }
    }
    peek() {
        if (this.isEOF()) {
            return null;
        }
        let e = this.char();
        let t = this.offset();
        return this.message.charCodeAt(t + (e >= 65536 ? 2 : 1)) ?? null;
    }
}
function P(e) {
    return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function je(e) {
    return P(e) || e === 47;
}
function Me(e) {
    return e === 45 || e === 46 || e >= 48 && e <= 57 || e === 95 || e >= 97 && e <= 122 || e >= 65 && e <= 90 || e == 183 || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039;
}
function Ne(e) {
    return e >= 9 && e <= 13 || e === 32 || e === 133 || e >= 8206 && e <= 8207 || e === 8232 || e === 8233;
}
function F(e) {
    e.forEach((e)=>{
        delete e.location;
        if (pe(e) || me(e)) {
            for(let t in e.options){
                delete e.options[t].location;
                F(e.options[t].value);
            }
        } else {
            if (E(e) && _e(e.style) || (D(e) || O(e)) && k(e.style)) {
                delete e.style.location;
            } else if (ge(e)) {
                F(e.children);
            }
        }
    });
}
function Pe(e, t = {}) {
    t = {
        shouldParseSkeletons: true,
        requiresOtherClause: true,
        ...t
    };
    let n = new Ae(e, t).parse();
    if (n.err) {
        let e = SyntaxError(de[n.err.kind]);
        e.location = n.err.location;
        e.originalMessage = n.err.message;
        throw e;
    }
    if (!t?.captureLocation) {
        F(n.val);
    }
    return n.val;
}
class I extends Error {
    constructor(e, t, n){
        super(e);
        this.code = t;
        this.originalMessage = n;
    }
    toString() {
        return `[formatjs Error: ${this.code}] ${this.message}`;
    }
}
class L extends I {
    constructor(e, t, n, r){
        super(`Invalid values for "${e}": "${t}". Options are "${Object.keys(n).join(`", "`)}"`, `INVALID_VALUE`, r);
    }
}
class Fe extends I {
    constructor(e, t, n){
        super(`Value for "${e}" must be of type ${t}`, `INVALID_VALUE`, n);
    }
}
class Ie extends I {
    constructor(e, t){
        super(`The intl string context variable "${e}" was not provided to the string "${t}"`, `MISSING_VALUE`, t);
    }
}
function Le(e) {
    if (e.length < 2) {
        return e;
    }
    return e.reduce((acc, item)=>{
        let n = acc[acc.length - 1];
        if (!n || n.type !== 0 || item.type !== 0) {
            acc.push(item);
        } else {
            n.value += item.value;
        }
        return acc;
    }, []);
}
function Re(e) {
    return typeof e == `function`;
}
function R(e, t, n, r, i, a, o) {
    if (e.length === 1 && T(e[0])) {
        return [
            {
                type: 0,
                value: e[0].value
            }
        ];
    }
    let s = [];
    for (let c of e){
        if (T(c)) {
            s.push({
                type: 0,
                value: c.value
            });
            continue;
        }
        if (he(c)) {
            if (typeof a == `number`) {
                s.push({
                    type: 0,
                    value: n.getNumberFormat(t).format(a)
                });
            }
            continue;
        }
        let { value } = c;
        if (!(i && value in i)) {
            throw new Ie(value, o);
        }
        let l = i[value];
        if (fe(c)) {
            if (!l || typeof l == `string` || typeof l == `number` || typeof l == `bigint`) {
                l = typeof l == `string` || typeof l == `number` || typeof l == `bigint` ? String(l) : ``;
            }
            s.push({
                type: typeof l == `string` ? 0 : 1,
                value: l
            });
            continue;
        }
        if (D(c)) {
            let e = typeof c.style == `string` ? r.date[c.style] : k(c.style) ? c.style.parsedOptions : undefined;
            s.push({
                type: 0,
                value: n.getDateTimeFormat(t, e).format(l)
            });
            continue;
        }
        if (O(c)) {
            let e = typeof c.style == `string` ? r.time[c.style] : k(c.style) ? c.style.parsedOptions : r.time.medium;
            s.push({
                type: 0,
                value: n.getDateTimeFormat(t, e).format(l)
            });
            continue;
        }
        if (E(c)) {
            let e = typeof c.style == `string` ? r.number[c.style] : _e(c.style) ? c.style.parsedOptions : undefined;
            if (e && e.scale) {
                let t = e.scale || 1;
                if (typeof l == `bigint`) {
                    if (!Number.isInteger(t)) {
                        throw TypeError(`Cannot apply fractional scale ${t} to bigint value. Scale must be an integer when formatting bigint.`);
                    }
                    l *= BigInt(t);
                } else {
                    l *= t;
                }
            }
            s.push({
                type: 0,
                value: n.getNumberFormat(t, e).format(l)
            });
            continue;
        }
        if (ge(c)) {
            let { children, value: value_1 } = c;
            let u = i[value_1];
            if (!Re(u)) {
                throw new Fe(value_1, `function`, o);
            }
            let d = u(R(children, t, n, r, i, a).map((e)=>e.value));
            if (!Array.isArray(d)) {
                d = [
                    d
                ];
            }
            s.push(...d.map((e)=>({
                    type: typeof e == `string` ? 0 : 1,
                    value: e
                })));
        }
        if (pe(c)) {
            let e = l;
            let a = (Object.prototype.hasOwnProperty.call(c.options, e) ? c.options[e] : undefined) || c.options.other;
            if (!a) {
                throw new L(c.value, l, Object.keys(c.options), o);
            }
            s.push(...R(a.value, t, n, r, i));
            continue;
        }
        if (me(c)) {
            let e = `=${l}`;
            let a = Object.prototype.hasOwnProperty.call(c.options, e) ? c.options[e] : undefined;
            if (!a) {
                if (!Intl.PluralRules) {
                    throw new I(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, `MISSING_INTL_API`, o);
                }
                let e = typeof l == `bigint` ? Number(l) : l;
                let r = n.getPluralRules(t, {
                    type: c.pluralType
                }).select(e - (c.offset || 0));
                a = (Object.prototype.hasOwnProperty.call(c.options, r) ? c.options[r] : undefined) || c.options.other;
            }
            if (!a) {
                throw new L(c.value, l, Object.keys(c.options), o);
            }
            let u = typeof l == `bigint` ? Number(l) : l;
            s.push(...R(a.value, t, n, r, i, u - (c.offset || 0)));
            continue;
        }
    }
    return Le(s);
}
function z(e) {
    return {
        create () {
            return {
                get (t) {
                    return e[t];
                },
                set (t, n) {
                    e[t] = n;
                }
            };
        }
    };
}
function Ve(e = {
    number: {},
    dateTime: {},
    pluralRules: {}
}) {
    return {
        getNumberFormat: i((...e)=>new Intl.NumberFormat(...e), {
            cache: z(e.number),
            strategy: h.variadic
        }),
        getDateTimeFormat: i((...e)=>new Intl.DateTimeFormat(...e), {
            cache: z(e.dateTime),
            strategy: h.variadic
        }),
        getPluralRules: i((...e)=>new Intl.PluralRules(...e), {
            cache: z(e.pluralRules),
            strategy: h.variadic
        })
    };
}
const B = class e {
    constructor(t, n = e.defaultLocale, r, i){
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {}
        };
        this.format = (e)=>{
            let t = this.formatToParts(e);
            if (t.length === 1) {
                return t[0].value;
            }
            let n = t.reduce((acc, item)=>{
                if (!acc.length || item.type !== 0 || typeof acc[acc.length - 1] != `string`) {
                    acc.push(item.value);
                } else {
                    acc[acc.length - 1] += item.value;
                }
                return acc;
            }, []);
            if (n.length <= 1) {
                return n[0] || ``;
            }
            return n;
        };
        this.formatToParts = (e)=>R(this.ast, this.locales, this.formatters, this.formats, e, undefined, this.message);
        this.resolvedOptions = ()=>({
                locale: this.resolvedLocale?.toString() || Intl.NumberFormat.supportedLocalesOf(this.locales)[0]
            });
        this.getAst = ()=>this.ast;
        this.locales = n;
        this.resolvedLocale = e.resolveLocale(n);
        if (typeof t == `string`) {
            this.message = t;
            if (!e.__parse) {
                throw TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
            }
            let { ...rest } = i || {};
            this.ast = e.__parse(t, {
                ...rest,
                locale: this.resolvedLocale
            });
        } else {
            this.ast = t;
        }
        if (!Array.isArray(this.ast)) {
            throw TypeError(`A message must be provided as a String or AST.`);
        }
        this.formats = Be(e.formats, r);
        this.formatters = i && i.formatters || Ve(this.formatterCache);
    }
    static{
        this.memoizedDefaultLocale = null;
    }
    static get defaultLocale() {
        e.memoizedDefaultLocale ||= new Intl.NumberFormat().resolvedOptions().locale;
        return e.memoizedDefaultLocale;
    }
    static{
        this.resolveLocale = (e)=>{
            if (Intl.Locale === undefined) {
                return;
            }
            let t = Intl.NumberFormat.supportedLocalesOf(e);
            if (t.length > 0) {
                return new Intl.Locale(t[0]);
            }
            return new Intl.Locale(typeof e == `string` ? e : e[0]);
        };
    }
    static{
        this.__parse = Pe;
    }
    static{
        this.formats = {
            number: {
                integer: {
                    maximumFractionDigits: 0
                },
                currency: {
                    style: `currency`
                },
                percent: {
                    style: `percent`
                }
            },
            date: {
                short: {
                    month: `numeric`,
                    day: `numeric`,
                    year: `2-digit`
                },
                medium: {
                    month: `short`,
                    day: `numeric`,
                    year: `numeric`
                },
                long: {
                    month: `long`,
                    day: `numeric`,
                    year: `numeric`
                },
                full: {
                    weekday: `long`,
                    month: `long`,
                    day: `numeric`,
                    year: `numeric`
                }
            },
            time: {
                short: {
                    hour: `numeric`,
                    minute: `numeric`
                },
                medium: {
                    hour: `numeric`,
                    minute: `numeric`,
                    second: `numeric`
                },
                long: {
                    hour: `numeric`,
                    minute: `numeric`,
                    second: `numeric`,
                    timeZoneName: `short`
                },
                full: {
                    hour: `numeric`,
                    minute: `numeric`,
                    second: `numeric`,
                    timeZoneName: `short`
                }
            }
        };
    }
};
function V(...[e, t, n, i]) {
    if (Array.isArray(t)) {
        throw new g(_.INVALID_MESSAGE, undefined);
    }
    if (typeof t == `object`) {
        throw new g(_.INSUFFICIENT_PATH, undefined);
    }
    if (typeof t == `string`) {
        let e = ((e, t)=>{
            if (t || /'[{}<#|']/.test(e)) {
                return undefined;
            }
            return e;
        })(t, n);
        if (e) {
            return e;
        }
    }
    let { cache, formats, formatters, globalFormats, locale, timeZone } = i;
    let d;
    formatters.getMessageFormat ||= ((e, formatters_1)=>y((...e)=>new B(e[0], e[1], e[2], {
                formatters: formatters_1,
                ...e[3]
            }), e.message))(cache, formatters);
    try {
        d = formatters.getMessageFormat(t, locale, ((globalFormats_1, formats_1, timeZone_1)=>{
            let date = B.formats.date;
            let time = B.formats.time;
            let a = {
                ...globalFormats_1?.dateTime,
                ...formats_1?.dateTime
            };
            let o = {
                date: {
                    ...date,
                    ...a
                },
                time: {
                    ...time,
                    ...a
                },
                number: {
                    ...globalFormats_1?.number,
                    ...formats_1?.number
                }
            };
            if (timeZone_1) {
                [
                    `date`,
                    `time`
                ].forEach((e)=>{
                    let t = o[e];
                    for (let [e, r] of Object.entries(t)){
                        t[e] = {
                            timeZone: timeZone_1,
                            ...r
                        };
                    }
                });
            }
            return o;
        })(globalFormats, formats, timeZone), {
            formatters: {
                ...formatters,
                getDateTimeFormat: (e, t)=>formatters.getDateTimeFormat(e, {
                        ...t,
                        timeZone: t?.timeZone ?? timeZone
                    })
            }
        });
    } catch  {
        throw new g(_.INVALID_MESSAGE, undefined);
    }
    let f = d.format(n);
    if (r.isValidElement(f) || Array.isArray(f) || typeof f == `string`) {
        return f;
    }
    return String(f);
}
V.raw = true;
function H(...e) {
    return e.filter(Boolean).join(`.`);
}
function U(e) {
    return H(e.namespace, e.key);
}
function W(e) {
    console.error(e);
}
function G(e, t, n, r) {
    let i = H(r, n);
    if (!t) {
        throw Error(i);
    }
    let a = t;
    n.split(`.`).forEach((t)=>{
        let n = a[t];
        if (t == null || n == null) {
            throw Error(i + ` (${e})`);
        }
        a = n;
    });
    return a;
}
function K(e) {
    let messagesOrError = ((e, t, n)=>{
        try {
            if (!t) {
                throw Error(undefined);
            }
            let r = n ? G(e, t, n) : t;
            if (!r) {
                throw Error(n);
            }
            return r;
        } catch (error) {
            return new g(_.MISSING_MESSAGE, error.message);
        }
    })(e.locale, e.messages, e.namespace);
    return (({ cache, formats, formatters, getMessageFallback = U, locale, messagesOrError, namespace, onError, timeZone })=>{
        let u = messagesOrError instanceof g;
        function d(key, t, n, r) {
            let error = new g(t, n);
            onError(error);
            return r ?? getMessageFallback({
                error,
                key,
                namespace
            });
        }
        function f(f, p, formats_1, h) {
            let v = h;
            let y;
            if (u) {
                if (!v) {
                    onError(messagesOrError);
                    return getMessageFallback({
                        error: messagesOrError,
                        key: f,
                        namespace
                    });
                }
                y = v;
            } else {
                let e = messagesOrError;
                try {
                    y = G(locale, e, f, namespace);
                } catch (error) {
                    if (!v) {
                        return d(f, _.MISSING_MESSAGE, error.message, v);
                    }
                    y = v;
                }
            }
            try {
                return V(H(namespace, f), y, p && ((e)=>{
                    let t = {};
                    Object.keys(e).forEach((n)=>{
                        let i = 0;
                        let a = e[n];
                        let o;
                        o = typeof a == `function` ? (e)=>{
                            let t = a(e);
                            if (r.isValidElement(t)) {
                                return r.cloneElement(t, {
                                    key: n + i++
                                });
                            }
                            return t;
                        } : a;
                        t[n] = o;
                    });
                    return t;
                })(p), {
                    cache,
                    formatters,
                    globalFormats: formats,
                    formats: formats_1,
                    locale,
                    timeZone
                });
            } catch (error) {
                let t;
                let n;
                if (error instanceof g) {
                    t = error.code;
                    n = error.originalMessage;
                } else {
                    t = _.FORMATTING_ERROR;
                    n = error.message;
                }
                return d(f, t, n, v);
            }
        }
        function p(e, t, n, r) {
            let i = f(e, t, n, r);
            if (typeof i == `string`) {
                return i;
            }
            return d(e, _.INVALID_MESSAGE, undefined);
        }
        p.rich = f;
        p.markup = (e, t, n, r)=>f(e, t, n, r);
        p.raw = (e)=>{
            if (u) {
                onError(messagesOrError);
                return getMessageFallback({
                    error: messagesOrError,
                    key: e,
                    namespace
                });
            }
            let t = messagesOrError;
            try {
                return G(locale, t, e, namespace);
            } catch (error) {
                return d(e, _.MISSING_MESSAGE, error.message);
            }
        };
        p.has = (e)=>{
            if (u) {
                return false;
            }
            try {
                G(locale, messagesOrError, e, namespace);
                return true;
            } catch  {
                return false;
            }
        };
        return p;
    })({
        ...e,
        messagesOrError
    });
}
function He(e, t) {
    if (e === t) {
        return undefined;
    }
    return e.slice((t + `.`).length);
}
const q = 3600;
const J = 86400;
const Y = 7 * J;
const X = 2628000;
const Ue = 7884000;
const Z = 365 * J;
const We = {
    second: 1,
    seconds: 1,
    minute: 60,
    minutes: 60,
    hour: q,
    hours: q,
    day: J,
    days: J,
    week: Y,
    weeks: Y,
    month: X,
    months: X,
    quarter: Ue,
    quarters: Ue,
    year: Z,
    years: Z
};
function Ge(e) {
    let { _cache = v(), _formatters = d(_cache), formats, locale, onError = W, timeZone } = e;
    function s(e) {
        if (!e?.timeZone) {
            if (timeZone) {
                e = {
                    ...e,
                    timeZone
                };
            } else {
                onError(new g(_.ENVIRONMENT_FALLBACK, undefined));
            }
        }
        return e;
    }
    function c(e, t, n, r, i) {
        let o;
        try {
            o = ((e, t, n)=>{
                let r;
                if (typeof t == `string`) {
                    r = e?.[t];
                    if (!r) {
                        let e = new g(_.MISSING_FORMAT, undefined);
                        onError(e);
                        throw e;
                    }
                } else {
                    r = t;
                }
                if (n) {
                    r = {
                        ...r,
                        ...n
                    };
                }
                return r;
            })(n, e, t);
        } catch  {
            return i();
        }
        try {
            return r(o);
        } catch (error) {
            onError(new g(_.FORMATTING_ERROR, error.message));
            return i();
        }
    }
    function dateTime(e, t, a) {
        return c(t, a, formats?.dateTime, (t)=>{
            t = s(t);
            return _formatters.getDateTimeFormat(locale, t).format(e);
        }, ()=>String(e));
    }
    function u() {
        if (e.now) {
            return e.now;
        }
        onError(new g(_.ENVIRONMENT_FALLBACK, undefined));
        return new Date;
    }
    return {
        dateTime,
        number: function(e, t, a) {
            return c(t, a, formats?.number, (t)=>_formatters.getNumberFormat(locale, t).format(e), ()=>String(e));
        },
        relativeTime: function(e, t) {
            try {
                let r;
                let a;
                let o = {};
                if (t instanceof Date || typeof t == `number`) {
                    r = new Date(t);
                } else if (t) {
                    r = t.now == null ? u() : new Date(t.now);
                    a = t.unit;
                    o.style = t.style;
                    o.numberingSystem = t.numberingSystem;
                }
                r ||= u();
                let s = (new Date(e).getTime() - r.getTime()) / 1000;
                a ||= ((e)=>{
                    let t = Math.abs(e);
                    if (t < 60) {
                        return `second`;
                    }
                    if (t < q) {
                        return `minute`;
                    }
                    if (t < J) {
                        return `hour`;
                    }
                    if (t < Y) {
                        return `day`;
                    }
                    if (t < X) {
                        return `week`;
                    }
                    if (t < Z) {
                        return `month`;
                    }
                    return `year`;
                })(s);
                o.numeric = a === `second` ? `auto` : `always`;
                let c = ((e, t)=>Math.round(e / We[t]))(s, a);
                return _formatters.getRelativeTimeFormat(locale, o).format(c, a);
            } catch (error) {
                onError(new g(_.FORMATTING_ERROR, error.message));
                return String(e);
            }
        },
        list: function(e, t, a) {
            let o = [];
            let s = new Map;
            let l = 0;
            for (let t of e){
                let e;
                if (typeof t == `object`) {
                    e = String(l);
                    s.set(e, t);
                } else {
                    e = String(t);
                }
                o.push(e);
                l++;
            }
            return c(t, a, formats?.list, (e)=>{
                let t = _formatters.getListFormat(locale, e).formatToParts(o).map((e)=>{
                    if (e.type === `literal`) {
                        return e.value;
                    }
                    return s.get(e.value) || e.value;
                });
                if (s.size > 0) {
                    return t;
                }
                return t.join(``);
            }, ()=>String(e));
        },
        dateTimeRange: function(e, t, a, o) {
            return c(a, o, formats?.dateTime, (r)=>{
                r = s(r);
                return _formatters.getDateTimeFormat(locale, r).formatRange(e, t);
            }, ()=>[
                    dateTime(e),
                    dateTime(t)
                ].join(` – `));
        },
        displayName: function(e, t, a) {
            return c(t, a, formats?.displayName, (t)=>_formatters.getDisplayNames(locale, t).of(e), ()=>e);
        }
    };
}
function Ke({ formats, getMessageFallback, messages, onError, ...rest }) {
    return {
        ...rest,
        formats: formats || undefined,
        messages: messages || undefined,
        onError: onError || W,
        getMessageFallback: getMessageFallback || U
    };
}
const qe = t();
const QContext = r.createContext(undefined);
function JeComponent({ children, formats, getMessageFallback, locale, messages, now, onError, timeZone }) {
    let l = r.useContext(QContext);
    let cache = r.useMemo(()=>l?.cache || v(), [
        locale,
        l?.cache
    ]);
    let formatters = r.useMemo(()=>l?.formatters || d(cache), [
        cache,
        l?.formatters
    ]);
    let f = r.useMemo(()=>({
            ...Ke({
                locale,
                formats: formats === undefined ? l?.formats : formats,
                getMessageFallback: getMessageFallback || l?.getMessageFallback,
                messages: messages === undefined ? l?.messages : messages,
                now: now || l?.now,
                onError: onError || l?.onError,
                timeZone: timeZone || l?.timeZone
            }),
            formatters,
            cache
        }), [
        cache,
        formats,
        formatters,
        getMessageFallback,
        locale,
        messages,
        now,
        onError,
        l,
        timeZone
    ]);
    return <QContext.Provider value={f}>{children}</QContext.Provider>;
}
function useComponent() {
    let e = r.useContext(QContext);
    if (!e) {
        throw Error(undefined);
    }
    return e;
}
let Ye = false;
const Xe = typeof window > `u`;
function Ze(e) {
    return ((e, t, n)=>{
        let { cache, formats, formatters, getMessageFallback, locale, onError, timeZone } = useComponent();
        let messages = e[n];
        let namespace = He(t, n);
        if (!(timeZone || Ye || !Xe)) {
            Ye = true;
            onError(new g(_.ENVIRONMENT_FALLBACK, undefined));
        }
        return r.useMemo(()=>K({
                cache,
                formatters,
                getMessageFallback,
                messages,
                namespace,
                onError,
                formats,
                locale,
                timeZone
            }), [
            cache,
            formatters,
            getMessageFallback,
            messages,
            namespace,
            onError,
            formats,
            locale,
            timeZone
        ]);
    })({
        "!": useComponent().messages
    }, e ? `!.${e}` : `!`, `!`);
}
function Qe() {
    return useComponent().locale;
}
function $e() {
    return useComponent().timeZone;
}
function et() {
    let e = useComponent();
    if (!e.messages) {
        throw Error(undefined);
    }
    return e.messages;
}
function useTt() {
    let { formats, formatters, locale, now, onError, timeZone } = useComponent();
    return r.useMemo(()=>Ge({
            formats,
            locale,
            now,
            onError,
            timeZone,
            _formatters: formatters
        }), [
        formats,
        formatters,
        now,
        locale,
        onError,
        timeZone
    ]);
}
export { JeComponent as a, U as c, v as f, Ze as i, He as l, useTt as n, $e as o, Qe as r, K as s, et as t, W as u };
