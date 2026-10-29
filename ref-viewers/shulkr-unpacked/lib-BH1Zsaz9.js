import { ot } from "./lib-BH1Zsaz9/chunk_at.js";
import { L, R } from "./lib-BH1Zsaz9/chunk_L.js";
import { ct } from "./lib-BH1Zsaz9/chunk_st.js";
import { rn } from "./lib-BH1Zsaz9/chunk_tn.js";
import { Nr } from "./lib-BH1Zsaz9/chunk_Mr.js";
import { vi } from "./lib-BH1Zsaz9/chunk_mi.js";
import { Bi } from "./lib-BH1Zsaz9/chunk_Bi.js";
import { ga } from "./lib-BH1Zsaz9/chunk_ga.js";
import { La } from "./lib-BH1Zsaz9/chunk_La.js";
import { Qa } from "./lib-BH1Zsaz9/chunk_Xa.js";
import { io } from "./lib-BH1Zsaz9/chunk_to.js";
import { No } from "./lib-BH1Zsaz9/chunk_No.js";
import { Bo } from "./lib-BH1Zsaz9/chunk_zo.js";
import { Uo } from "./lib-BH1Zsaz9/chunk_Uo.js";
import { qo as hardBreak } from "./lib-BH1Zsaz9/chunk_Go.js";
import { Zo } from "./lib-BH1Zsaz9/chunk_Jo.js";
import { $o, es as definition } from "./lib-BH1Zsaz9/chunk_$o.js";
import { Ws as codeText } from "./lib-BH1Zsaz9/chunk_Ws.js";
import { qs } from "./lib-BH1Zsaz9/chunk_qs.js";
import { jc } from "./lib-BH1Zsaz9/chunk_jc.js";
import { a as a_1, n, r, s as s_1, t } from "./jsx-runtime-Db0DjQYK.js";
function a(e, t) {
    let n = t || {};
    return (e[e.length - 1] === `` ? [
        ...e,
        ``
    ] : e).join((n.padRight ? ` ` : ``) + `,` + (n.padLeft === false ? `` : ` `)).trim();
}
const o = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
const s = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
const c = {};
function l(e, t) {
    return ((t || c).jsx ? s : o).test(e);
}
const u = /[ \t\n\f\r]/g;
function d(e) {
    if (typeof e == `object`) {
        if (e.type === `text`) {
            return f(e.value);
        }
        return false;
    }
    return f(e);
}
function f(e) {
    return e.replace(u, ``) === ``;
}
class p {
    constructor(e, t, n){
        this.normal = t;
        this.property = e;
        if (n) {
            this.space = n;
        }
    }
}
p.prototype.normal = {};
p.prototype.property = {};
p.prototype.space = undefined;
function m(e, t) {
    let n = {};
    let r = {};
    for (let t of e){
        Object.assign(n, t.property);
        Object.assign(r, t.normal);
    }
    return new p(n, r, t);
}
function h(e) {
    return e.toLowerCase();
}
class g {
    constructor(e, t){
        this.attribute = t;
        this.property = e;
    }
}
g.prototype.attribute = ``;
g.prototype.booleanish = false;
g.prototype.boolean = false;
g.prototype.commaOrSpaceSeparated = false;
g.prototype.commaSeparated = false;
g.prototype.defined = false;
g.prototype.mustUseProperty = false;
g.prototype.number = false;
g.prototype.overloadedBoolean = false;
g.prototype.property = ``;
g.prototype.spaceSeparated = false;
g.prototype.space = undefined;
const _ = a_1({
    boolean: ()=>y,
    booleanish: ()=>b,
    commaOrSpaceSeparated: ()=>T,
    commaSeparated: ()=>w,
    number: ()=>S,
    overloadedBoolean: ()=>x,
    spaceSeparated: ()=>C
});
let v = 0;
var y = E();
var b = E();
var x = E();
var S = E();
var C = E();
var w = E();
var T = E();
function E() {
    return 2 ** ++v;
}
const D = Object.keys(_);
class O extends g {
    constructor(e, t, n, r){
        let i = -1;
        super(e, t);
        k(this, `space`, r);
        if (typeof n == `number`) {
            while(++i < D.length){
                let e = D[i];
                k(this, D[i], (n & _[e]) === _[e]);
            }
        }
    }
}
O.prototype.defined = true;
function k(e, t, n) {
    if (n) {
        e[t] = n;
    }
}
function A(e) {
    let t = {};
    let n = {};
    for (let [r, i] of Object.entries(e.properties)){
        let a = new O(r, e.transform(e.attributes || {}, r), i, e.space);
        if (e.mustUseProperty && e.mustUseProperty.includes(r)) {
            a.mustUseProperty = true;
        }
        t[r] = a;
        n[h(r)] = r;
        n[h(a.attribute)] = r;
    }
    return new p(t, n, e.space);
}
const ee = A({
    properties: {
        ariaActiveDescendant: null,
        ariaAtomic: b,
        ariaAutoComplete: null,
        ariaBusy: b,
        ariaChecked: b,
        ariaColCount: S,
        ariaColIndex: S,
        ariaColSpan: S,
        ariaControls: C,
        ariaCurrent: null,
        ariaDescribedBy: C,
        ariaDetails: null,
        ariaDisabled: b,
        ariaDropEffect: C,
        ariaErrorMessage: null,
        ariaExpanded: b,
        ariaFlowTo: C,
        ariaGrabbed: b,
        ariaHasPopup: null,
        ariaHidden: b,
        ariaInvalid: null,
        ariaKeyShortcuts: null,
        ariaLabel: null,
        ariaLabelledBy: C,
        ariaLevel: S,
        ariaLive: null,
        ariaModal: b,
        ariaMultiLine: b,
        ariaMultiSelectable: b,
        ariaOrientation: null,
        ariaOwns: C,
        ariaPlaceholder: null,
        ariaPosInSet: S,
        ariaPressed: b,
        ariaReadOnly: b,
        ariaRelevant: null,
        ariaRequired: b,
        ariaRoleDescription: C,
        ariaRowCount: S,
        ariaRowIndex: S,
        ariaRowSpan: S,
        ariaSelected: b,
        ariaSetSize: S,
        ariaSort: null,
        ariaValueMax: S,
        ariaValueMin: S,
        ariaValueNow: S,
        ariaValueText: null,
        role: null
    },
    transform (e, t) {
        if (t === `role`) {
            return t;
        }
        return `aria-` + t.slice(4).toLowerCase();
    }
});
function transform_1(e, t) {
    if (t in e) {
        return e[t];
    }
    return t;
}
function transform(e, t) {
    return transform_1(e, t.toLowerCase());
}
const te = A({
    attributes: {
        acceptcharset: `accept-charset`,
        classname: `class`,
        htmlfor: `for`,
        httpequiv: `http-equiv`
    },
    mustUseProperty: [
        `checked`,
        `multiple`,
        `muted`,
        `selected`
    ],
    properties: {
        abbr: null,
        accept: w,
        acceptCharset: C,
        accessKey: C,
        action: null,
        allow: null,
        allowFullScreen: y,
        allowPaymentRequest: y,
        allowUserMedia: y,
        alt: null,
        as: null,
        async: y,
        autoCapitalize: null,
        autoComplete: C,
        autoFocus: y,
        autoPlay: y,
        blocking: C,
        capture: null,
        charSet: null,
        checked: y,
        cite: null,
        className: C,
        cols: S,
        colSpan: null,
        content: null,
        contentEditable: b,
        controls: y,
        controlsList: C,
        coords: S | w,
        crossOrigin: null,
        data: null,
        dateTime: null,
        decoding: null,
        default: y,
        defer: y,
        dir: null,
        dirName: null,
        disabled: y,
        download: x,
        draggable: b,
        encType: null,
        enterKeyHint: null,
        fetchPriority: null,
        form: null,
        formAction: null,
        formEncType: null,
        formMethod: null,
        formNoValidate: y,
        formTarget: null,
        headers: C,
        height: S,
        hidden: x,
        high: S,
        href: null,
        hrefLang: null,
        htmlFor: C,
        httpEquiv: C,
        id: null,
        imageSizes: null,
        imageSrcSet: null,
        inert: y,
        inputMode: null,
        integrity: null,
        is: null,
        isMap: y,
        itemId: null,
        itemProp: C,
        itemRef: C,
        itemScope: y,
        itemType: C,
        kind: null,
        label: null,
        lang: null,
        language: null,
        list: null,
        loading: null,
        loop: y,
        low: S,
        manifest: null,
        max: null,
        maxLength: S,
        media: null,
        method: null,
        min: null,
        minLength: S,
        multiple: y,
        muted: y,
        name: null,
        nonce: null,
        noModule: y,
        noValidate: y,
        onAbort: null,
        onAfterPrint: null,
        onAuxClick: null,
        onBeforeMatch: null,
        onBeforePrint: null,
        onBeforeToggle: null,
        onBeforeUnload: null,
        onBlur: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onContextLost: null,
        onContextMenu: null,
        onContextRestored: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFormData: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLanguageChange: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadEnd: null,
        onLoadStart: null,
        onMessage: null,
        onMessageError: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRejectionHandled: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onScrollEnd: null,
        onSecurityPolicyViolation: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onSlotChange: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnhandledRejection: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onWheel: null,
        open: y,
        optimum: S,
        pattern: null,
        ping: C,
        placeholder: null,
        playsInline: y,
        popover: null,
        popoverTarget: null,
        popoverTargetAction: null,
        poster: null,
        preload: null,
        readOnly: y,
        referrerPolicy: null,
        rel: C,
        required: y,
        reversed: y,
        rows: S,
        rowSpan: S,
        sandbox: C,
        scope: null,
        scoped: y,
        seamless: y,
        selected: y,
        shadowRootClonable: y,
        shadowRootDelegatesFocus: y,
        shadowRootMode: null,
        shape: null,
        size: S,
        sizes: null,
        slot: null,
        span: S,
        spellCheck: b,
        src: null,
        srcDoc: null,
        srcLang: null,
        srcSet: null,
        start: S,
        step: null,
        style: null,
        tabIndex: S,
        target: null,
        title: null,
        translate: null,
        type: null,
        typeMustMatch: y,
        useMap: null,
        value: b,
        width: S,
        wrap: null,
        writingSuggestions: null,
        align: null,
        aLink: null,
        archive: C,
        axis: null,
        background: null,
        bgColor: null,
        border: S,
        borderColor: null,
        bottomMargin: S,
        cellPadding: null,
        cellSpacing: null,
        char: null,
        charOff: null,
        classId: null,
        clear: null,
        code: null,
        codeBase: null,
        codeType: null,
        color: null,
        compact: y,
        declare: y,
        event: null,
        face: null,
        frame: null,
        frameBorder: null,
        hSpace: S,
        leftMargin: S,
        link: null,
        longDesc: null,
        lowSrc: null,
        marginHeight: S,
        marginWidth: S,
        noResize: y,
        noHref: y,
        noShade: y,
        noWrap: y,
        object: null,
        profile: null,
        prompt: null,
        rev: null,
        rightMargin: S,
        rules: null,
        scheme: null,
        scrolling: b,
        standby: null,
        summary: null,
        text: null,
        topMargin: S,
        valueType: null,
        version: null,
        vAlign: null,
        vLink: null,
        vSpace: S,
        allowTransparency: null,
        autoCorrect: null,
        autoSave: null,
        disablePictureInPicture: y,
        disableRemotePlayback: y,
        prefix: null,
        property: null,
        results: S,
        security: null,
        unselectable: null
    },
    space: `html`,
    transform
});
const ne = A({
    attributes: {
        accentHeight: `accent-height`,
        alignmentBaseline: `alignment-baseline`,
        arabicForm: `arabic-form`,
        baselineShift: `baseline-shift`,
        capHeight: `cap-height`,
        className: `class`,
        clipPath: `clip-path`,
        clipRule: `clip-rule`,
        colorInterpolation: `color-interpolation`,
        colorInterpolationFilters: `color-interpolation-filters`,
        colorProfile: `color-profile`,
        colorRendering: `color-rendering`,
        crossOrigin: `crossorigin`,
        dataType: `datatype`,
        dominantBaseline: `dominant-baseline`,
        enableBackground: `enable-background`,
        fillOpacity: `fill-opacity`,
        fillRule: `fill-rule`,
        floodColor: `flood-color`,
        floodOpacity: `flood-opacity`,
        fontFamily: `font-family`,
        fontSize: `font-size`,
        fontSizeAdjust: `font-size-adjust`,
        fontStretch: `font-stretch`,
        fontStyle: `font-style`,
        fontVariant: `font-variant`,
        fontWeight: `font-weight`,
        glyphName: `glyph-name`,
        glyphOrientationHorizontal: `glyph-orientation-horizontal`,
        glyphOrientationVertical: `glyph-orientation-vertical`,
        hrefLang: `hreflang`,
        horizAdvX: `horiz-adv-x`,
        horizOriginX: `horiz-origin-x`,
        horizOriginY: `horiz-origin-y`,
        imageRendering: `image-rendering`,
        letterSpacing: `letter-spacing`,
        lightingColor: `lighting-color`,
        markerEnd: `marker-end`,
        markerMid: `marker-mid`,
        markerStart: `marker-start`,
        navDown: `nav-down`,
        navDownLeft: `nav-down-left`,
        navDownRight: `nav-down-right`,
        navLeft: `nav-left`,
        navNext: `nav-next`,
        navPrev: `nav-prev`,
        navRight: `nav-right`,
        navUp: `nav-up`,
        navUpLeft: `nav-up-left`,
        navUpRight: `nav-up-right`,
        onAbort: `onabort`,
        onActivate: `onactivate`,
        onAfterPrint: `onafterprint`,
        onBeforePrint: `onbeforeprint`,
        onBegin: `onbegin`,
        onCancel: `oncancel`,
        onCanPlay: `oncanplay`,
        onCanPlayThrough: `oncanplaythrough`,
        onChange: `onchange`,
        onClick: `onclick`,
        onClose: `onclose`,
        onCopy: `oncopy`,
        onCueChange: `oncuechange`,
        onCut: `oncut`,
        onDblClick: `ondblclick`,
        onDrag: `ondrag`,
        onDragEnd: `ondragend`,
        onDragEnter: `ondragenter`,
        onDragExit: `ondragexit`,
        onDragLeave: `ondragleave`,
        onDragOver: `ondragover`,
        onDragStart: `ondragstart`,
        onDrop: `ondrop`,
        onDurationChange: `ondurationchange`,
        onEmptied: `onemptied`,
        onEnd: `onend`,
        onEnded: `onended`,
        onError: `onerror`,
        onFocus: `onfocus`,
        onFocusIn: `onfocusin`,
        onFocusOut: `onfocusout`,
        onHashChange: `onhashchange`,
        onInput: `oninput`,
        onInvalid: `oninvalid`,
        onKeyDown: `onkeydown`,
        onKeyPress: `onkeypress`,
        onKeyUp: `onkeyup`,
        onLoad: `onload`,
        onLoadedData: `onloadeddata`,
        onLoadedMetadata: `onloadedmetadata`,
        onLoadStart: `onloadstart`,
        onMessage: `onmessage`,
        onMouseDown: `onmousedown`,
        onMouseEnter: `onmouseenter`,
        onMouseLeave: `onmouseleave`,
        onMouseMove: `onmousemove`,
        onMouseOut: `onmouseout`,
        onMouseOver: `onmouseover`,
        onMouseUp: `onmouseup`,
        onMouseWheel: `onmousewheel`,
        onOffline: `onoffline`,
        onOnline: `ononline`,
        onPageHide: `onpagehide`,
        onPageShow: `onpageshow`,
        onPaste: `onpaste`,
        onPause: `onpause`,
        onPlay: `onplay`,
        onPlaying: `onplaying`,
        onPopState: `onpopstate`,
        onProgress: `onprogress`,
        onRateChange: `onratechange`,
        onRepeat: `onrepeat`,
        onReset: `onreset`,
        onResize: `onresize`,
        onScroll: `onscroll`,
        onSeeked: `onseeked`,
        onSeeking: `onseeking`,
        onSelect: `onselect`,
        onShow: `onshow`,
        onStalled: `onstalled`,
        onStorage: `onstorage`,
        onSubmit: `onsubmit`,
        onSuspend: `onsuspend`,
        onTimeUpdate: `ontimeupdate`,
        onToggle: `ontoggle`,
        onUnload: `onunload`,
        onVolumeChange: `onvolumechange`,
        onWaiting: `onwaiting`,
        onZoom: `onzoom`,
        overlinePosition: `overline-position`,
        overlineThickness: `overline-thickness`,
        paintOrder: `paint-order`,
        panose1: `panose-1`,
        pointerEvents: `pointer-events`,
        referrerPolicy: `referrerpolicy`,
        renderingIntent: `rendering-intent`,
        shapeRendering: `shape-rendering`,
        stopColor: `stop-color`,
        stopOpacity: `stop-opacity`,
        strikethroughPosition: `strikethrough-position`,
        strikethroughThickness: `strikethrough-thickness`,
        strokeDashArray: `stroke-dasharray`,
        strokeDashOffset: `stroke-dashoffset`,
        strokeLineCap: `stroke-linecap`,
        strokeLineJoin: `stroke-linejoin`,
        strokeMiterLimit: `stroke-miterlimit`,
        strokeOpacity: `stroke-opacity`,
        strokeWidth: `stroke-width`,
        tabIndex: `tabindex`,
        textAnchor: `text-anchor`,
        textDecoration: `text-decoration`,
        textRendering: `text-rendering`,
        transformOrigin: `transform-origin`,
        typeOf: `typeof`,
        underlinePosition: `underline-position`,
        underlineThickness: `underline-thickness`,
        unicodeBidi: `unicode-bidi`,
        unicodeRange: `unicode-range`,
        unitsPerEm: `units-per-em`,
        vAlphabetic: `v-alphabetic`,
        vHanging: `v-hanging`,
        vIdeographic: `v-ideographic`,
        vMathematical: `v-mathematical`,
        vectorEffect: `vector-effect`,
        vertAdvY: `vert-adv-y`,
        vertOriginX: `vert-origin-x`,
        vertOriginY: `vert-origin-y`,
        wordSpacing: `word-spacing`,
        writingMode: `writing-mode`,
        xHeight: `x-height`,
        playbackOrder: `playbackorder`,
        timelineBegin: `timelinebegin`
    },
    properties: {
        about: T,
        accentHeight: S,
        accumulate: null,
        additive: null,
        alignmentBaseline: null,
        alphabetic: S,
        amplitude: S,
        arabicForm: null,
        ascent: S,
        attributeName: null,
        attributeType: null,
        azimuth: S,
        bandwidth: null,
        baselineShift: null,
        baseFrequency: null,
        baseProfile: null,
        bbox: null,
        begin: null,
        bias: S,
        by: null,
        calcMode: null,
        capHeight: S,
        className: C,
        clip: null,
        clipPath: null,
        clipPathUnits: null,
        clipRule: null,
        color: null,
        colorInterpolation: null,
        colorInterpolationFilters: null,
        colorProfile: null,
        colorRendering: null,
        content: null,
        contentScriptType: null,
        contentStyleType: null,
        crossOrigin: null,
        cursor: null,
        cx: null,
        cy: null,
        d: null,
        dataType: null,
        defaultAction: null,
        descent: S,
        diffuseConstant: S,
        direction: null,
        display: null,
        dur: null,
        divisor: S,
        dominantBaseline: null,
        download: y,
        dx: null,
        dy: null,
        edgeMode: null,
        editable: null,
        elevation: S,
        enableBackground: null,
        end: null,
        event: null,
        exponent: S,
        externalResourcesRequired: null,
        fill: null,
        fillOpacity: S,
        fillRule: null,
        filter: null,
        filterRes: null,
        filterUnits: null,
        floodColor: null,
        floodOpacity: null,
        focusable: null,
        focusHighlight: null,
        fontFamily: null,
        fontSize: null,
        fontSizeAdjust: null,
        fontStretch: null,
        fontStyle: null,
        fontVariant: null,
        fontWeight: null,
        format: null,
        fr: null,
        from: null,
        fx: null,
        fy: null,
        g1: w,
        g2: w,
        glyphName: w,
        glyphOrientationHorizontal: null,
        glyphOrientationVertical: null,
        glyphRef: null,
        gradientTransform: null,
        gradientUnits: null,
        handler: null,
        hanging: S,
        hatchContentUnits: null,
        hatchUnits: null,
        height: null,
        href: null,
        hrefLang: null,
        horizAdvX: S,
        horizOriginX: S,
        horizOriginY: S,
        id: null,
        ideographic: S,
        imageRendering: null,
        initialVisibility: null,
        in: null,
        in2: null,
        intercept: S,
        k: S,
        k1: S,
        k2: S,
        k3: S,
        k4: S,
        kernelMatrix: T,
        kernelUnitLength: null,
        keyPoints: null,
        keySplines: null,
        keyTimes: null,
        kerning: null,
        lang: null,
        lengthAdjust: null,
        letterSpacing: null,
        lightingColor: null,
        limitingConeAngle: S,
        local: null,
        markerEnd: null,
        markerMid: null,
        markerStart: null,
        markerHeight: null,
        markerUnits: null,
        markerWidth: null,
        mask: null,
        maskContentUnits: null,
        maskUnits: null,
        mathematical: null,
        max: null,
        media: null,
        mediaCharacterEncoding: null,
        mediaContentEncodings: null,
        mediaSize: S,
        mediaTime: null,
        method: null,
        min: null,
        mode: null,
        name: null,
        navDown: null,
        navDownLeft: null,
        navDownRight: null,
        navLeft: null,
        navNext: null,
        navPrev: null,
        navRight: null,
        navUp: null,
        navUpLeft: null,
        navUpRight: null,
        numOctaves: null,
        observer: null,
        offset: null,
        onAbort: null,
        onActivate: null,
        onAfterPrint: null,
        onBeforePrint: null,
        onBegin: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnd: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFocusIn: null,
        onFocusOut: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadStart: null,
        onMessage: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onMouseWheel: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRepeat: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onShow: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onZoom: null,
        opacity: null,
        operator: null,
        order: null,
        orient: null,
        orientation: null,
        origin: null,
        overflow: null,
        overlay: null,
        overlinePosition: S,
        overlineThickness: S,
        paintOrder: null,
        panose1: null,
        path: null,
        pathLength: S,
        patternContentUnits: null,
        patternTransform: null,
        patternUnits: null,
        phase: null,
        ping: C,
        pitch: null,
        playbackOrder: null,
        pointerEvents: null,
        points: null,
        pointsAtX: S,
        pointsAtY: S,
        pointsAtZ: S,
        preserveAlpha: null,
        preserveAspectRatio: null,
        primitiveUnits: null,
        propagate: null,
        property: T,
        r: null,
        radius: null,
        referrerPolicy: null,
        refX: null,
        refY: null,
        rel: T,
        rev: T,
        renderingIntent: null,
        repeatCount: null,
        repeatDur: null,
        requiredExtensions: T,
        requiredFeatures: T,
        requiredFonts: T,
        requiredFormats: T,
        resource: null,
        restart: null,
        result: null,
        rotate: null,
        rx: null,
        ry: null,
        scale: null,
        seed: null,
        shapeRendering: null,
        side: null,
        slope: null,
        snapshotTime: null,
        specularConstant: S,
        specularExponent: S,
        spreadMethod: null,
        spacing: null,
        startOffset: null,
        stdDeviation: null,
        stemh: null,
        stemv: null,
        stitchTiles: null,
        stopColor: null,
        stopOpacity: null,
        strikethroughPosition: S,
        strikethroughThickness: S,
        string: null,
        stroke: null,
        strokeDashArray: T,
        strokeDashOffset: null,
        strokeLineCap: null,
        strokeLineJoin: null,
        strokeMiterLimit: S,
        strokeOpacity: S,
        strokeWidth: null,
        style: null,
        surfaceScale: S,
        syncBehavior: null,
        syncBehaviorDefault: null,
        syncMaster: null,
        syncTolerance: null,
        syncToleranceDefault: null,
        systemLanguage: T,
        tabIndex: S,
        tableValues: null,
        target: null,
        targetX: S,
        targetY: S,
        textAnchor: null,
        textDecoration: null,
        textRendering: null,
        textLength: null,
        timelineBegin: null,
        title: null,
        transformBehavior: null,
        type: null,
        typeOf: T,
        to: null,
        transform: null,
        transformOrigin: null,
        u1: null,
        u2: null,
        underlinePosition: S,
        underlineThickness: S,
        unicode: null,
        unicodeBidi: null,
        unicodeRange: null,
        unitsPerEm: S,
        values: null,
        vAlphabetic: S,
        vMathematical: S,
        vectorEffect: null,
        vHanging: S,
        vIdeographic: S,
        version: null,
        vertAdvY: S,
        vertOriginX: S,
        vertOriginY: S,
        viewBox: null,
        viewTarget: null,
        visibility: null,
        width: null,
        widths: null,
        wordSpacing: null,
        writingMode: null,
        x: null,
        x1: null,
        x2: null,
        xChannelSelector: null,
        xHeight: S,
        y: null,
        y1: null,
        y2: null,
        yChannelSelector: null,
        z: null,
        zoomAndPan: null
    },
    space: `svg`,
    transform: transform_1
});
const N = A({
    properties: {
        xLinkActuate: null,
        xLinkArcRole: null,
        xLinkHref: null,
        xLinkRole: null,
        xLinkShow: null,
        xLinkTitle: null,
        xLinkType: null
    },
    space: `xlink`,
    transform (e, t) {
        return `xlink:` + t.slice(5).toLowerCase();
    }
});
const P = A({
    attributes: {
        xmlnsxlink: `xmlns:xlink`
    },
    properties: {
        xmlnsXLink: null,
        xmlns: null
    },
    space: `xmlns`,
    transform
});
const F = A({
    properties: {
        xmlBase: null,
        xmlLang: null,
        xmlSpace: null
    },
    space: `xml`,
    transform (e, t) {
        return `xml:` + t.slice(3).toLowerCase();
    }
});
const re = {
    classId: `classID`,
    dataType: `datatype`,
    itemId: `itemID`,
    strokeDashArray: `strokeDasharray`,
    strokeDashOffset: `strokeDashoffset`,
    strokeLineCap: `strokeLinecap`,
    strokeLineJoin: `strokeLinejoin`,
    strokeMiterLimit: `strokeMiterlimit`,
    typeOf: `typeof`,
    xLinkActuate: `xlinkActuate`,
    xLinkArcRole: `xlinkArcrole`,
    xLinkHref: `xlinkHref`,
    xLinkRole: `xlinkRole`,
    xLinkShow: `xlinkShow`,
    xLinkTitle: `xlinkTitle`,
    xLinkType: `xlinkType`,
    xmlnsXLink: `xmlnsXlink`
};
const ie = /[A-Z]/g;
const ae = /-[a-z]/g;
const oe = /^data[-\w.:]+$/i;
function se(schema, t) {
    let n = h(t);
    let r = t;
    let i = g;
    if (n in schema.normal) {
        return schema.property[schema.normal[n]];
    }
    if (n.length > 4 && n.slice(0, 4) === `data` && oe.test(t)) {
        if (t.charAt(4) === `-`) {
            let e = t.slice(5).replace(ae, le);
            r = `data` + e.charAt(0).toUpperCase() + e.slice(1);
        } else {
            let e = t.slice(4);
            if (!ae.test(e)) {
                let n = e.replace(ie, ce);
                if (n.charAt(0) !== `-`) {
                    n = `-` + n;
                }
                t = `data` + n;
            }
        }
        i = O;
    }
    return new i(r, t);
}
function ce(e) {
    return `-` + e.toLowerCase();
}
function le(e) {
    return e.charAt(1).toUpperCase();
}
const ue = m([
    ee,
    te,
    N,
    P,
    F
], `html`);
const de = m([
    ee,
    ne,
    N,
    P,
    F
], `svg`);
function fe(e) {
    return e.join(` `).trim();
}
const pe = r((e, t)=>{
    var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
    var r = /\n/g;
    var i = /^\s*/;
    var a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
    var o = /^:\s*/;
    var s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
    var c = /^[;\s]*/;
    var l = /^\s+|\s+$/g;
    var u = `
`;
    var d = `/`;
    var f = `*`;
    var p = ``;
    var m = `comment`;
    var h = `declaration`;
    function g(e, t) {
        if (typeof e != `string`) {
            throw TypeError(`First argument must be a string`);
        }
        if (!e) {
            return [];
        }
        t ||= {};
        let line = 1;
        let column = 1;
        function v(e) {
            const t = e.match(r);
            if (t) {
                line += t.length;
            }
            const n = e.lastIndexOf(u);
            column = ~n ? e.length - n : column + e.length;
        }
        function y() {
            const e = {
                line,
                column
            };
            return function(t) {
                t.position = new b(e);
                C();
                return t;
            };
        }
        function b(e) {
            this.start = e;
            this.end = {
                line,
                column
            };
            this.source = t.source;
        }
        b.prototype.content = e;
        function x(n) {
            const r = Error(t.source + `:` + line + `:` + column + `: ` + n);
            r.reason = n;
            r.filename = t.source;
            r.line = line;
            r.column = column;
            r.source = e;
            if (!t.silent) {
                throw r;
            }
        }
        function S(t) {
            const n = t.exec(e);
            if (n) {
                const r = n[0];
                v(r);
                e = e.slice(r.length);
                return n;
            }
        }
        function C() {
            S(i);
        }
        function w(e) {
            let t;
            for(e ||= []; t = T();){
                if (t !== false) {
                    e.push(t);
                }
            }
            return e;
        }
        function T() {
            const t = y();
            if (!(d != e.charAt(0) || f != e.charAt(1))) {
                for(var n = 2; p != e.charAt(n) && (f != e.charAt(n) || d != e.charAt(n + 1));){
                    ++n;
                }
                n += 2;
                if (p === e.charAt(n - 1)) {
                    return x(`End of comment missing`);
                }
                const comment = e.slice(2, n - 2);
                column += 2;
                v(comment);
                e = e.slice(n);
                column += 2;
                return t({
                    type: m,
                    comment
                });
            }
        }
        function E() {
            const e = y();
            const t = S(a);
            if (t) {
                T();
                if (!S(o)) {
                    return x(`property missing ':'`);
                }
                const r = S(s);
                const i = e({
                    type: h,
                    property: _(t[0].replace(n, p)),
                    value: r ? _(r[0].replace(n, p)) : p
                });
                S(c);
                return i;
            }
        }
        function D() {
            const e = [];
            w(e);
            let t;
            while(t = E()){
                if (t !== false) {
                    e.push(t);
                    w(e);
                }
            }
            return e;
        }
        C();
        return D();
    }
    function _(e) {
        if (e) {
            return e.replace(l, p);
        }
        return p;
    }
    t.exports = g;
});
const me = r((e)=>{
    var t = e && e.__importDefault || ((e)=>{
        if (e && e.__esModule) {
            return e;
        }
        return {
            default: e
        };
    });
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.default = r;
    var n = t(pe());
    function r(e, t) {
        let r = null;
        if (!e || typeof e != `string`) {
            return r;
        }
        let i = n.default(e);
        let a = typeof t == `function`;
        i.forEach((e)=>{
            if (e.type !== `declaration`) {
                return;
            }
            let { property, value } = e;
            if (a) {
                t(property, value, e);
            } else if (value) {
                r ||= {};
                r[property] = value;
            }
        });
        return r;
    }
});
const he = r((e)=>{
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.camelCase = undefined;
    var t = /^--[a-zA-Z0-9_-]+$/;
    var n = /-([a-z])/g;
    var r = /^[^-]+$/;
    var i = /^-(webkit|moz|ms|o|khtml)-/;
    var a = /^-(ms)-/;
    var o = (e)=>!e || r.test(e) || t.test(e);
    var s = function(e, t) {
        return t.toUpperCase();
    };
    var c = function(e, t) {
        return `${t}-`;
    };
    e.camelCase = function(e, t = {}) {
        if (o(e)) {
            return e;
        }
        e = e.toLowerCase();
        e = t.reactCompat ? e.replace(a, c) : e.replace(i, c);
        return e.replace(n, s);
    };
});
const ge = r((e, t)=>{
    var n = (e && e.__importDefault || function(e) {
        if (e && e.__esModule) {
            return e;
        }
        return {
            default: e
        };
    })(me());
    var r = he();
    function i(e, t) {
        const i = {};
        if (!(!e || typeof e != `string`)) {
            n.default(e, function(e, n) {
                if (e && n) {
                    i[r.camelCase(e, t)] = n;
                }
            });
        }
        return i;
    }
    i.default = i;
    t.exports = i;
});
const _e = ye(`end`);
const ve = ye(`start`);
function ye(e) {
    return t;
    function t(t) {
        let n = t && t.position && t.position[e] || {};
        if (typeof n.line == `number` && n.line > 0 && typeof n.column == `number` && n.column > 0) {
            return {
                line: n.line,
                column: n.column,
                offset: typeof n.offset == `number` && n.offset > -1 ? n.offset : undefined
            };
        }
    }
}
function be(e) {
    let t = ve(e);
    let n = _e(e);
    if (t && n) {
        return {
            start: t,
            end: n
        };
    }
}
function xe(e) {
    if (!e || typeof e != `object`) {
        return ``;
    }
    if (`position` in e || `type` in e) {
        return Ce(e.position);
    }
    if (`start` in e || `end` in e) {
        return Ce(e);
    }
    if (`line` in e || `column` in e) {
        return Se(e);
    }
    return ``;
}
function Se(e) {
    return we(e && e.line) + `:` + we(e && e.column);
}
function Ce(e) {
    return Se(e && e.start) + `-` + Se(e && e.end);
}
function we(e) {
    if (e && typeof e == `number`) {
        return e;
    }
    return 1;
}
class I extends Error {
    constructor(e, place, n){
        super();
        if (typeof place == `string`) {
            n = place;
            place = undefined;
        }
        let r = ``;
        let i = {};
        let a = false;
        if (place) {
            i = `line` in place && `column` in place || `start` in place && `end` in place ? {
                place
            } : `type` in place ? {
                ancestors: [
                    place
                ],
                place: place.position
            } : {
                ...place
            };
        }
        if (typeof e == `string`) {
            r = e;
        } else if (!i.cause && e) {
            a = true;
            r = e.message;
            i.cause = e;
        }
        if (!i.ruleId && !i.source && typeof n == `string`) {
            let e = n.indexOf(`:`);
            if (e === -1) {
                i.ruleId = n;
            } else {
                i.source = n.slice(0, e);
                i.ruleId = n.slice(e + 1);
            }
        }
        if (!i.place && i.ancestors && i.ancestors) {
            let e = i.ancestors[i.ancestors.length - 1];
            if (e) {
                i.place = e.position;
            }
        }
        let o = i.place && `start` in i.place ? i.place.start : i.place;
        this.ancestors = i.ancestors || undefined;
        this.cause = i.cause || undefined;
        this.column = o ? o.column : undefined;
        this.fatal = undefined;
        this.file = ``;
        this.message = r;
        this.line = o ? o.line : undefined;
        this.name = xe(i.place) || `1:1`;
        this.place = i.place || undefined;
        this.reason = this.message;
        this.ruleId = i.ruleId || undefined;
        this.source = i.source || undefined;
        this.stack = a && i.cause && typeof i.cause.stack == `string` ? i.cause.stack : ``;
        this.actual = undefined;
        this.expected = undefined;
        this.note = undefined;
        this.url = undefined;
    }
}
I.prototype.file = ``;
I.prototype.name = ``;
I.prototype.reason = ``;
I.prototype.message = ``;
I.prototype.stack = ``;
I.prototype.column = undefined;
I.prototype.line = undefined;
I.prototype.ancestors = undefined;
I.prototype.cause = undefined;
I.prototype.fatal = undefined;
I.prototype.place = undefined;
I.prototype.ruleId = undefined;
I.prototype.source = undefined;
const Te = s_1(ge(), 1);
const hasOwnProperty = {}.hasOwnProperty;
const De = new Map;
const Oe = /[A-Z]/g;
const ke = new Set([
    `table`,
    `tbody`,
    `thead`,
    `tfoot`,
    `tr`
]);
const Ae = new Set([
    `td`,
    `th`
]);
function je(e, t) {
    if (!t || t.Fragment === undefined) {
        throw TypeError("Expected `Fragment` in options");
    }
    let filePath = t.filePath || undefined;
    let create;
    if (t.development) {
        if (typeof t.jsxDEV != `function`) {
            throw TypeError("Expected `jsxDEV` in options when `development: true`");
        }
        create = He(filePath, t.jsxDEV);
    } else {
        if (typeof t.jsx != `function`) {
            throw TypeError("Expected `jsx` in production options");
        }
        if (typeof t.jsxs != `function`) {
            throw TypeError("Expected `jsxs` in production options");
        }
        create = Ve(filePath, t.jsx, t.jsxs);
    }
    let i = {
        Fragment: t.Fragment,
        ancestors: [],
        components: t.components || {},
        create,
        elementAttributeNameCase: t.elementAttributeNameCase || `react`,
        evaluater: t.createEvaluater ? t.createEvaluater() : undefined,
        filePath,
        ignoreInvalidStyle: t.ignoreInvalidStyle || false,
        passKeys: t.passKeys !== false,
        passNode: t.passNode || false,
        schema: t.space === `svg` ? de : ue,
        stylePropertyNameCase: t.stylePropertyNameCase || `dom`,
        tableCellAlignToStyle: t.tableCellAlignToStyle !== false
    };
    let a = Me(i, e, undefined);
    if (a && typeof a != `string`) {
        return a;
    }
    return i.create(e, i.Fragment, {
        children: a || undefined
    }, undefined);
}
function Me(e, t, n) {
    if (t.type === `element`) {
        return Ne(e, t, n);
    }
    if (t.type === `mdxFlowExpression` || t.type === `mdxTextExpression`) {
        return Pe(e, t);
    }
    if (t.type === `mdxJsxFlowElement` || t.type === `mdxJsxTextElement`) {
        return Ie(e, t, n);
    }
    if (t.type === `mdxjsEsm`) {
        return Fe(e, t);
    }
    if (t.type === `root`) {
        return Le(e, t, n);
    }
    if (t.type === `text`) {
        return Re(e, t);
    }
}
function Ne(e, t, n) {
    let e_schema = e.schema;
    let i = e_schema;
    if (t.tagName.toLowerCase() === `svg` && e_schema.space === `html`) {
        i = de;
        e.schema = i;
    }
    e.ancestors.push(t);
    let a = Je(e, t.tagName, false);
    let o = Ue(e, t);
    let s = Ge(e, t);
    if (ke.has(t.tagName)) {
        s = s.filter((e)=>{
            if (typeof e == `string`) {
                return !d(e);
            }
            return true;
        });
    }
    ze(e, o, a, t);
    Be(o, s);
    e.ancestors.pop();
    e.schema = e_schema;
    return e.create(t, a, o, n);
}
function Pe(e, t) {
    if (t.data && t.data.estree && e.evaluater) {
        let n = t.data.estree.body[0];
        n.type;
        return e.evaluater.evaluateExpression(n.expression);
    }
    Ye(e, t.position);
}
function Fe(e, t) {
    if (t.data && t.data.estree && e.evaluater) {
        return e.evaluater.evaluateProgram(t.data.estree);
    }
    Ye(e, t.position);
}
function Ie(e, t, n) {
    let e_schema = e.schema;
    let i = e_schema;
    if (t.name === `svg` && e_schema.space === `html`) {
        i = de;
        e.schema = i;
    }
    e.ancestors.push(t);
    let a = t.name === null ? e.Fragment : Je(e, t.name, true);
    let o = We(e, t);
    let s = Ge(e, t);
    ze(e, o, a, t);
    Be(o, s);
    e.ancestors.pop();
    e.schema = e_schema;
    return e.create(t, a, o, n);
}
function Le(e, t, n) {
    let r = {};
    Be(r, Ge(e, t));
    return e.create(t, e.Fragment, r, n);
}
function Re(e, t) {
    return t.value;
}
function ze(e, t, n, r) {
    if (typeof n != `string` && n !== e.Fragment && e.passNode) {
        t.node = r;
    }
}
function Be(e, t) {
    if (t.length > 0) {
        let n = t.length > 1 ? t : t[0];
        if (n) {
            e.children = n;
        }
    }
}
function Ve(e, jsx, jsxs) {
    return r;
    function r(e, r, i, a) {
        let o = Array.isArray(i.children) ? jsxs : jsx;
        if (a) {
            return o(r, i, a);
        }
        return o(r, i);
    }
}
function He(fileName, jsxDEV) {
    return n;
    function n(n, r, i, a) {
        let o = Array.isArray(i.children);
        let s = ve(n);
        return jsxDEV(r, i, a, o, {
            columnNumber: s ? s.column - 1 : undefined,
            fileName,
            lineNumber: s ? s.line : undefined
        }, undefined);
    }
}
function Ue(e, t) {
    let n = {};
    let r;
    let i;
    for(i in t.properties){
        if (i !== `children` && hasOwnProperty.call(t.properties, i)) {
            let a = Ke(e, i, t.properties[i]);
            if (a) {
                let [i, o] = a;
                if (e.tableCellAlignToStyle && i === `align` && typeof o == `string` && Ae.has(t.tagName)) {
                    r = o;
                } else {
                    n[i] = o;
                }
            }
        }
    }
    if (r) {
        let t = n.style ||= {};
        t[e.stylePropertyNameCase === `css` ? `text-align` : `textAlign`] = r;
    }
    return n;
}
function We(e, t) {
    let n = {};
    for (let r of t.attributes){
        if (r.type === `mdxJsxExpressionAttribute`) {
            if (r.data && r.data.estree && e.evaluater) {
                let t = r.data.estree.body[0];
                t.type;
                let i = t.expression;
                i.type;
                let a = i.properties[0];
                a.type;
                Object.assign(n, e.evaluater.evaluateExpression(a.argument));
            } else {
                Ye(e, t.position);
            }
        } else {
            let i = r.name;
            let a;
            if (r.value && typeof r.value == `object`) {
                if (r.value.data && r.value.data.estree && e.evaluater) {
                    let t = r.value.data.estree.body[0];
                    t.type;
                    a = e.evaluater.evaluateExpression(t.expression);
                } else {
                    Ye(e, t.position);
                }
            } else {
                a = r.value === null ? true : r.value;
            }
            n[i] = a;
        }
    }
    return n;
}
function Ge(e, t) {
    let n = [];
    let r = -1;
    let i = e.passKeys ? new Map : De;
    while(++r < t.children.length){
        let a = t.children[r];
        let o;
        if (e.passKeys) {
            let e = a.type === `element` ? a.tagName : a.type === `mdxJsxFlowElement` || a.type === `mdxJsxTextElement` ? a.name : undefined;
            if (e) {
                let t = i.get(e) || 0;
                o = e + `-` + t;
                i.set(e, t + 1);
            }
        }
        let s = Me(e, a, o);
        if (s !== undefined) {
            n.push(s);
        }
    }
    return n;
}
function Ke(e, t, n) {
    let r = se(e.schema, t);
    if (!(n == null || typeof n == `number` && Number.isNaN(n))) {
        if (Array.isArray(n)) {
            n = r.commaSeparated ? a(n) : fe(n);
        }
        if (r.property === `style`) {
            let t = typeof n == `object` ? n : qe(e, String(n));
            if (e.stylePropertyNameCase === `css`) {
                t = Xe(t);
            }
            return [
                `style`,
                t
            ];
        }
        return [
            e.elementAttributeNameCase === `react` && r.space ? re[r.property] || r.property : r.attribute,
            n
        ];
    }
}
function qe(e, t) {
    try {
        return Te.default(t, {
            reactCompat: true
        });
    } catch (error) {
        if (e.ignoreInvalidStyle) {
            return {};
        }
        let cause = error;
        let r = new I("Cannot parse `style` attribute", {
            ancestors: e.ancestors,
            cause,
            ruleId: `style`,
            source: `hast-util-to-jsx-runtime`
        });
        r.file = e.filePath || undefined;
        r.url = `https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-parse-style-attribute`;
        throw r;
    }
}
function Je(e, t, n) {
    let r;
    if (!n) {
        r = {
            type: `Literal`,
            value: t
        };
    } else if (t.includes(`.`)) {
        let e = t.split(`.`);
        let n = -1;
        let object;
        while(++n < e.length){
            let property = l(e[n]) ? {
                type: `Identifier`,
                name: e[n]
            } : {
                type: `Literal`,
                value: e[n]
            };
            object = object ? {
                type: `MemberExpression`,
                object,
                property,
                computed: !!(n && property.type === `Literal`),
                optional: false
            } : property;
        }
        r = object;
    } else {
        r = l(t) && !/^[a-z]/.test(t) ? {
            type: `Identifier`,
            name: t
        } : {
            type: `Literal`,
            value: t
        };
    }
    if (r.type === `Literal`) {
        let t = r.value;
        if (hasOwnProperty.call(e.components, t)) {
            return e.components[t];
        }
        return t;
    }
    if (e.evaluater) {
        return e.evaluater.evaluateExpression(r);
    }
    Ye(e);
}
function Ye(e, place) {
    let n = new I("Cannot handle MDX estrees without `createEvaluater`", {
        ancestors: e.ancestors,
        place,
        ruleId: `mdx-estree`,
        source: `hast-util-to-jsx-runtime`
    });
    n.file = e.filePath || undefined;
    n.url = `https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-handle-mdx-estrees-without-createevaluater`;
    throw n;
}
function Xe(e) {
    let t = {};
    let n;
    for(n in e){
        if (hasOwnProperty.call(e, n)) {
            t[Ze(n)] = e[n];
        }
    }
    return t;
}
function Ze(e) {
    let t = e.replace(Oe, Qe);
    if (t.slice(0, 3) === `ms-`) {
        t = `-` + t;
    }
    return t;
}
function Qe(e) {
    return `-` + e.toLowerCase();
}
const $e = {
    action: [
        `form`
    ],
    cite: [
        `blockquote`,
        `del`,
        `ins`,
        `q`
    ],
    data: [
        `object`
    ],
    formAction: [
        `button`,
        `input`
    ],
    href: [
        `a`,
        `area`,
        `base`,
        `link`
    ],
    icon: [
        `menuitem`
    ],
    itemId: null,
    manifest: [
        `html`
    ],
    ping: [
        `a`,
        `area`
    ],
    poster: [
        `video`
    ],
    src: [
        `audio`,
        `embed`,
        `iframe`,
        `img`,
        `input`,
        `script`,
        `source`,
        `track`,
        `video`
    ]
};
const et = {};
function tt(e, t) {
    let n = t || et;
    return nt(e, typeof n.includeImageAlt == `boolean` ? n.includeImageAlt : true, typeof n.includeHtml == `boolean` ? n.includeHtml : true);
}
function nt(e, t, n) {
    if (it(e)) {
        if (`value` in e) {
            if (e.type === `html` && !n) {
                return ``;
            }
            return e.value;
        }
        if (t && `alt` in e && e.alt) {
            return e.alt;
        }
        if (`children` in e) {
            return rt(e.children, t, n);
        }
    }
    if (Array.isArray(e)) {
        return rt(e, t, n);
    }
    return ``;
}
function rt(e, t, n) {
    let r = [];
    let i = -1;
    while(++i < e.length){
        r[i] = nt(e[i], t, n);
    }
    return r.join(``);
}
function it(e) {
    return !!(e && typeof e == `object`);
}
function dt(e, t) {
    let n = Number.parseInt(e, t);
    if (n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111) {
        return `�`;
    }
    return String.fromCodePoint(n);
}
function z(e) {
    return e.replace(/[\t\n\r ]+/g, ` `).replace(/^ | $/g, ``).toLowerCase().toUpperCase();
}
const B = K(/[A-Za-z]/);
const V = K(/[\dA-Za-z]/);
const ft = K(/[#-'*+\--9=?A-Z^-~]/);
function pt(e) {
    return e !== null && (e < 32 || e === 127);
}
const mt = K(/\d/);
const ht = K(/[\dA-Fa-f]/);
const gt = K(/[!-/:-@[-`{-~]/);
function H(e) {
    return e !== null && e < -2;
}
function U(e) {
    return e !== null && (e < 0 || e === 32);
}
function W(e) {
    return e === -2 || e === -1 || e === 32;
}
const _t = K(/\p{P}|\p{S}/u);
const G = K(/\s/);
function K(e) {
    return t;
    function t(t) {
        return t !== null && t > -1 && e.test(String.fromCharCode(t));
    }
}
function vt(e) {
    let t = [];
    let n = -1;
    let r = 0;
    let i = 0;
    while(++n < e.length){
        let a = e.charCodeAt(n);
        let o = ``;
        if (a === 37 && V(e.charCodeAt(n + 1)) && V(e.charCodeAt(n + 2))) {
            i = 2;
        } else if (a < 128) {
            if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a))) {
                o = String.fromCharCode(a);
            }
        } else if (a > 55295 && a < 57344) {
            let t = e.charCodeAt(n + 1);
            if (a < 56320 && t > 56319 && t < 57344) {
                o = String.fromCharCode(a, t);
                i = 1;
            } else {
                o = `�`;
            }
        } else {
            o = String.fromCharCode(a);
        }
        o &&= (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, ``);
        i &&= (n += i, 0);
    }
    return t.join(``) + e.slice(r);
}
function q(e, t, n, r) {
    let i = r ? r - 1 : Infinity;
    let a = 0;
    return o;
    function o(r) {
        if (W(r)) {
            e.enter(n);
            return s(r);
        }
        return t(r);
    }
    function s(r) {
        if (W(r) && a++ < i) {
            e.consume(r);
            return s;
        }
        e.exit(n);
        return t(r);
    }
}
const yt = {
    tokenize: bt
};
function bt(e) {
    let t = e.attempt(this.parser.constructs.contentInitial, r, i);
    let n;
    return t;
    function r(n) {
        if (n === null) {
            e.consume(n);
            return;
        }
        e.enter(`lineEnding`);
        e.consume(n);
        e.exit(`lineEnding`);
        return q(e, t, `linePrefix`);
    }
    function i(t) {
        e.enter(`paragraph`);
        return a(t);
    }
    function a(t) {
        let r = e.enter(`chunkText`, {
            contentType: `text`,
            previous: n
        });
        if (n) {
            n.next = r;
        }
        n = r;
        return o(t);
    }
    function o(t) {
        if (t === null) {
            e.exit(`chunkText`);
            e.exit(`paragraph`);
            e.consume(t);
            return;
        }
        if (H(t)) {
            e.consume(t);
            e.exit(`chunkText`);
            return a;
        }
        e.consume(t);
        return o;
    }
}
const xt = {
    tokenize: Ct
};
var St = {
    tokenize: wt
};
function Ct(e) {
    let t = this;
    let n = [];
    let r = 0;
    let _tokenizer;
    let a;
    let o;
    return s;
    function s(i) {
        if (r < n.length) {
            let a = n[r];
            t.containerState = a[1];
            return e.attempt(a[0].continuation, c, l)(i);
        }
        return l(i);
    }
    function c(e) {
        r++;
        if (t.containerState._closeFlow) {
            t.containerState._closeFlow = undefined;
            if (_tokenizer) {
                v();
            }
            let n = t.events.length;
            let a = n;
            let o;
            while(a--){
                if (t.events[a][0] === `exit` && t.events[a][1].type === `chunkFlow`) {
                    o = t.events[a][1].end;
                    break;
                }
            }
            _(r);
            let s = n;
            while(s < t.events.length){
                t.events[s][1].end = {
                    ...o
                };
                s++;
            }
            L(t.events, a + 1, 0, t.events.slice(n));
            t.events.length = s;
            return l(e);
        }
        return s(e);
    }
    function l(a) {
        if (r === n.length) {
            if (!_tokenizer) {
                return f(a);
            }
            if (_tokenizer.currentConstruct && _tokenizer.currentConstruct.concrete) {
                return m(a);
            }
            t.interrupt = !!(_tokenizer.currentConstruct && !_tokenizer._gfmTableDynamicInterruptHack);
        }
        t.containerState = {};
        return e.check(St, u, d)(a);
    }
    function u(e) {
        if (_tokenizer) {
            v();
        }
        _(r);
        return f(e);
    }
    function d(e) {
        t.parser.lazy[t.now().line] = r !== n.length;
        o = t.now().offset;
        return m(e);
    }
    function f(n) {
        t.containerState = {};
        return e.attempt(St, p, m)(n);
    }
    function p(e) {
        r++;
        n.push([
            t.currentConstruct,
            t.containerState
        ]);
        return f(e);
    }
    function m(n) {
        if (n === null) {
            if (_tokenizer) {
                v();
            }
            _(0);
            e.consume(n);
            return;
        }
        _tokenizer ||= t.parser.flow(t.now());
        e.enter(`chunkFlow`, {
            _tokenizer,
            contentType: `flow`,
            previous: a
        });
        return h(n);
    }
    function h(n) {
        if (n === null) {
            g(e.exit(`chunkFlow`), true);
            _(0);
            e.consume(n);
            return;
        }
        if (H(n)) {
            e.consume(n);
            g(e.exit(`chunkFlow`));
            r = 0;
            t.interrupt = undefined;
            return s;
        }
        e.consume(n);
        return h;
    }
    function g(e, n) {
        let s = t.sliceStream(e);
        if (n) {
            s.push(null);
        }
        e.previous = a;
        if (a) {
            a.next = e;
        }
        a = e;
        _tokenizer.defineSkip(e.start);
        _tokenizer.write(s);
        if (t.parser.lazy[e.start.line]) {
            let e = _tokenizer.events.length;
            while(e--){
                if (_tokenizer.events[e][1].start.offset < o && (!_tokenizer.events[e][1].end || _tokenizer.events[e][1].end.offset > o)) {
                    return;
                }
            }
            let n = t.events.length;
            let a = n;
            let s;
            let c;
            while(a--){
                if (t.events[a][0] === `exit` && t.events[a][1].type === `chunkFlow`) {
                    if (s) {
                        c = t.events[a][1].end;
                        break;
                    }
                    s = true;
                }
            }
            _(r);
            for(e = n; e < t.events.length;){
                t.events[e][1].end = {
                    ...c
                };
                e++;
            }
            L(t.events, a + 1, 0, t.events.slice(n));
            t.events.length = e;
        }
    }
    function _(r) {
        let n_length = n.length;
        while(n_length-- > r){
            let r = n[n_length];
            t.containerState = r[1];
            r[0].exit.call(t, e);
        }
        n.length = r;
    }
    function v() {
        _tokenizer.write([
            null
        ]);
        a = undefined;
        _tokenizer = undefined;
        t.containerState._closeFlow = undefined;
    }
}
function wt(e, t, n) {
    return q(e, e.attempt(this.parser.constructs.document, t, n), `linePrefix`, this.parser.constructs.disable.null.includes(`codeIndented`) ? undefined : 4);
}
function Tt(e) {
    if (e === null || U(e) || G(e)) {
        return 1;
    }
    if (_t(e)) {
        return 2;
    }
}
function Et(e, t, n) {
    let r = [];
    let i = -1;
    while(++i < e.length){
        let a = e[i].resolveAll;
        if (a && !r.includes(a)) {
            t = a(t, n);
            r.push(a);
        }
    }
    return t;
}
const Dt = {
    name: `attention`,
    resolveAll: Ot,
    tokenize: kt
};
function Ot(e, t) {
    let n = -1;
    let r;
    let i;
    let a;
    let o;
    let s;
    let c;
    let l;
    let u;
    while(++n < e.length){
        if (e[n][0] === `enter` && e[n][1].type === `attentionSequence` && e[n][1]._close) {
            for(r = n; r--;){
                if (e[r][0] === `exit` && e[r][1].type === `attentionSequence` && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
                    if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) {
                        continue;
                    }
                    c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
                    let d = {
                        ...e[r][1].end
                    };
                    let f = {
                        ...e[n][1].start
                    };
                    At(d, -c);
                    At(f, c);
                    o = {
                        type: c > 1 ? `strongSequence` : `emphasisSequence`,
                        start: d,
                        end: {
                            ...e[r][1].end
                        }
                    };
                    s = {
                        type: c > 1 ? `strongSequence` : `emphasisSequence`,
                        start: {
                            ...e[n][1].start
                        },
                        end: f
                    };
                    a = {
                        type: c > 1 ? `strongText` : `emphasisText`,
                        start: {
                            ...e[r][1].end
                        },
                        end: {
                            ...e[n][1].start
                        }
                    };
                    i = {
                        type: c > 1 ? `strong` : `emphasis`,
                        start: {
                            ...o.start
                        },
                        end: {
                            ...s.end
                        }
                    };
                    e[r][1].end = {
                        ...o.start
                    };
                    e[n][1].start = {
                        ...s.end
                    };
                    l = [];
                    if (e[r][1].end.offset - e[r][1].start.offset) {
                        l = R(l, [
                            [
                                `enter`,
                                e[r][1],
                                t
                            ],
                            [
                                `exit`,
                                e[r][1],
                                t
                            ]
                        ]);
                    }
                    l = R(l, [
                        [
                            `enter`,
                            i,
                            t
                        ],
                        [
                            `enter`,
                            o,
                            t
                        ],
                        [
                            `exit`,
                            o,
                            t
                        ],
                        [
                            `enter`,
                            a,
                            t
                        ]
                    ]);
                    l = R(l, Et(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t));
                    l = R(l, [
                        [
                            `exit`,
                            a,
                            t
                        ],
                        [
                            `enter`,
                            s,
                            t
                        ],
                        [
                            `exit`,
                            s,
                            t
                        ],
                        [
                            `exit`,
                            i,
                            t
                        ]
                    ]);
                    if (e[n][1].end.offset - e[n][1].start.offset) {
                        u = 2;
                        l = R(l, [
                            [
                                `enter`,
                                e[n][1],
                                t
                            ],
                            [
                                `exit`,
                                e[n][1],
                                t
                            ]
                        ]);
                    } else {
                        u = 0;
                    }
                    L(e, r - 1, n - r + 3, l);
                    n = r + l.length - u - 2;
                    break;
                }
            }
        }
    }
    for(n = -1; ++n < e.length;){
        if (e[n][1].type === `attentionSequence`) {
            e[n][1].type = `data`;
        }
    }
    return e;
}
function kt(e, t) {
    let _null = this.parser.constructs.attentionMarkers.null;
    let previous = this.previous;
    let i = Tt(previous);
    let a;
    return o;
    function o(t) {
        a = t;
        e.enter(`attentionSequence`);
        return s(t);
    }
    function s(o) {
        if (o === a) {
            e.consume(o);
            return s;
        }
        let c = e.exit(`attentionSequence`);
        let l = Tt(o);
        let u = !l || l === 2 && i || _null.includes(o);
        let d = !i || i === 2 && l || _null.includes(previous);
        c._open = !!(a === 42 ? u : u && (i || !d));
        c._close = !!(a === 42 ? d : d && (l || !u));
        return t(o);
    }
}
function At(e, t) {
    e.column += t;
    e.offset += t;
    e._bufferIndex += t;
}
const jt = {
    name: `autolink`,
    tokenize: Mt
};
function Mt(e, t, n) {
    let r = 0;
    return i;
    function i(t) {
        e.enter(`autolink`);
        e.enter(`autolinkMarker`);
        e.consume(t);
        e.exit(`autolinkMarker`);
        e.enter(`autolinkProtocol`);
        return a;
    }
    function a(t) {
        if (B(t)) {
            e.consume(t);
            return o;
        }
        if (t === 64) {
            return n(t);
        }
        return l(t);
    }
    function o(e) {
        if (e === 43 || e === 45 || e === 46 || V(e)) {
            r = 1;
            return s(e);
        }
        return l(e);
    }
    function s(t) {
        if (t === 58) {
            e.consume(t);
            r = 0;
            return c;
        }
        if ((t === 43 || t === 45 || t === 46 || V(t)) && r++ < 32) {
            e.consume(t);
            return s;
        }
        r = 0;
        return l(t);
    }
    function c(r) {
        if (r === 62) {
            e.exit(`autolinkProtocol`);
            e.enter(`autolinkMarker`);
            e.consume(r);
            e.exit(`autolinkMarker`);
            e.exit(`autolink`);
            return t;
        }
        if (r === null || r === 32 || r === 60 || pt(r)) {
            return n(r);
        }
        e.consume(r);
        return c;
    }
    function l(t) {
        if (t === 64) {
            e.consume(t);
            return u;
        }
        if (ft(t)) {
            e.consume(t);
            return l;
        }
        return n(t);
    }
    function u(e) {
        if (V(e)) {
            return d(e);
        }
        return n(e);
    }
    function d(n) {
        switch(n){
            case 46:
                e.consume(n);
                r = 0;
                return u;
            case 62:
                e.exit(`autolinkProtocol`).type = `autolinkEmail`;
                e.enter(`autolinkMarker`);
                e.consume(n);
                e.exit(`autolinkMarker`);
                e.exit(`autolink`);
                return t;
            default:
                return f(n);
        }
    }
    function f(t) {
        if ((t === 45 || V(t)) && r++ < 63) {
            let n = t === 45 ? f : d;
            e.consume(t);
            return n;
        }
        return n(t);
    }
}
const Nt = {
    partial: true,
    tokenize: Pt
};
function Pt(e, t, n) {
    return r;
    function r(t) {
        if (W(t)) {
            return q(e, i, `linePrefix`)(t);
        }
        return i(t);
    }
    function i(e) {
        if (e === null || H(e)) {
            return t(e);
        }
        return n(e);
    }
}
var Ft = {
    continuation: {
        tokenize: Lt
    },
    exit: Rt,
    name: `blockQuote`,
    tokenize: It
};
function It(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        if (t === 62) {
            let n = r.containerState;
            n.open ||= (e.enter(`blockQuote`, {
                _container: true
            }), true);
            e.enter(`blockQuotePrefix`);
            e.enter(`blockQuoteMarker`);
            e.consume(t);
            e.exit(`blockQuoteMarker`);
            return a;
        }
        return n(t);
    }
    function a(n) {
        if (W(n)) {
            e.enter(`blockQuotePrefixWhitespace`);
            e.consume(n);
            e.exit(`blockQuotePrefixWhitespace`);
            e.exit(`blockQuotePrefix`);
            return t;
        }
        e.exit(`blockQuotePrefix`);
        return t(n);
    }
}
function Lt(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        if (W(t)) {
            return q(e, a, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? undefined : 4)(t);
        }
        return a(t);
    }
    function a(r) {
        return e.attempt(Ft, t, n)(r);
    }
}
function Rt(e) {
    e.exit(`blockQuote`);
}
const zt = {
    name: `characterEscape`,
    tokenize: Bt
};
function Bt(e, t, n) {
    return r;
    function r(t) {
        e.enter(`characterEscape`);
        e.enter(`escapeMarker`);
        e.consume(t);
        e.exit(`escapeMarker`);
        return i;
    }
    function i(r) {
        if (gt(r)) {
            e.enter(`characterEscapeValue`);
            e.consume(r);
            e.exit(`characterEscapeValue`);
            e.exit(`characterEscape`);
            return t;
        }
        return n(r);
    }
}
const Vt = {
    name: `characterReference`,
    tokenize: Ht
};
function Ht(e, t, n) {
    let r = this;
    let i = 0;
    let a;
    let o;
    return s;
    function s(t) {
        e.enter(`characterReference`);
        e.enter(`characterReferenceMarker`);
        e.consume(t);
        e.exit(`characterReferenceMarker`);
        return c;
    }
    function c(t) {
        if (t === 35) {
            e.enter(`characterReferenceMarkerNumeric`);
            e.consume(t);
            e.exit(`characterReferenceMarkerNumeric`);
            return l;
        }
        e.enter(`characterReferenceValue`);
        a = 31;
        o = V;
        return u(t);
    }
    function l(t) {
        if (t === 88 || t === 120) {
            e.enter(`characterReferenceMarkerHexadecimal`);
            e.consume(t);
            e.exit(`characterReferenceMarkerHexadecimal`);
            e.enter(`characterReferenceValue`);
            a = 6;
            o = ht;
            return u;
        }
        e.enter(`characterReferenceValue`);
        a = 7;
        o = mt;
        return u(t);
    }
    function u(s) {
        if (s === 59 && i) {
            let i = e.exit(`characterReferenceValue`);
            if (o === V && !ot(r.sliceSerialize(i))) {
                return n(s);
            }
            e.enter(`characterReferenceMarker`);
            e.consume(s);
            e.exit(`characterReferenceMarker`);
            e.exit(`characterReference`);
            return t;
        }
        if (o(s) && i++ < a) {
            e.consume(s);
            return u;
        }
        return n(s);
    }
}
const Ut = {
    partial: true,
    tokenize: Kt
};
const Wt = {
    concrete: true,
    name: `codeFenced`,
    tokenize: Gt
};
function Gt(e, t, n) {
    let r = this;
    let i = {
        partial: true,
        tokenize: x
    };
    let a = 0;
    let o = 0;
    let s;
    return c;
    function c(e) {
        return l(e);
    }
    function l(t) {
        let n = r.events[r.events.length - 1];
        a = n && n[1].type === `linePrefix` ? n[2].sliceSerialize(n[1], true).length : 0;
        s = t;
        e.enter(`codeFenced`);
        e.enter(`codeFencedFence`);
        e.enter(`codeFencedFenceSequence`);
        return u(t);
    }
    function u(t) {
        if (t === s) {
            o++;
            e.consume(t);
            return u;
        }
        if (o < 3) {
            return n(t);
        }
        e.exit(`codeFencedFenceSequence`);
        if (W(t)) {
            return q(e, d, `whitespace`)(t);
        }
        return d(t);
    }
    function d(n) {
        if (n === null || H(n)) {
            e.exit(`codeFencedFence`);
            if (r.interrupt) {
                return t(n);
            }
            return e.check(Ut, h, b)(n);
        }
        e.enter(`codeFencedFenceInfo`);
        e.enter(`chunkString`, {
            contentType: `string`
        });
        return f(n);
    }
    function f(t) {
        if (t === null || H(t)) {
            e.exit(`chunkString`);
            e.exit(`codeFencedFenceInfo`);
            return d(t);
        }
        if (W(t)) {
            e.exit(`chunkString`);
            e.exit(`codeFencedFenceInfo`);
            return q(e, p, `whitespace`)(t);
        }
        if (t === 96 && t === s) {
            return n(t);
        }
        e.consume(t);
        return f;
    }
    function p(t) {
        if (t === null || H(t)) {
            return d(t);
        }
        e.enter(`codeFencedFenceMeta`);
        e.enter(`chunkString`, {
            contentType: `string`
        });
        return m(t);
    }
    function m(t) {
        if (t === null || H(t)) {
            e.exit(`chunkString`);
            e.exit(`codeFencedFenceMeta`);
            return d(t);
        }
        if (t === 96 && t === s) {
            return n(t);
        }
        e.consume(t);
        return m;
    }
    function h(t) {
        return e.attempt(i, b, g)(t);
    }
    function g(t) {
        e.enter(`lineEnding`);
        e.consume(t);
        e.exit(`lineEnding`);
        return _;
    }
    function _(t) {
        if (a > 0 && W(t)) {
            return q(e, v, `linePrefix`, a + 1)(t);
        }
        return v(t);
    }
    function v(t) {
        if (t === null || H(t)) {
            return e.check(Ut, h, b)(t);
        }
        e.enter(`codeFlowValue`);
        return y(t);
    }
    function y(t) {
        if (t === null || H(t)) {
            e.exit(`codeFlowValue`);
            return v(t);
        }
        e.consume(t);
        return y;
    }
    function b(n) {
        e.exit(`codeFenced`);
        return t(n);
    }
    function x(e, t, n) {
        let i = 0;
        return a;
        function a(t) {
            e.enter(`lineEnding`);
            e.consume(t);
            e.exit(`lineEnding`);
            return c;
        }
        function c(t) {
            e.enter(`codeFencedFence`);
            if (W(t)) {
                return q(e, l, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? undefined : 4)(t);
            }
            return l(t);
        }
        function l(t) {
            if (t === s) {
                e.enter(`codeFencedFenceSequence`);
                return u(t);
            }
            return n(t);
        }
        function u(t) {
            if (t === s) {
                i++;
                e.consume(t);
                return u;
            }
            if (i >= o) {
                e.exit(`codeFencedFenceSequence`);
                if (W(t)) {
                    return q(e, d, `whitespace`)(t);
                }
                return d(t);
            }
            return n(t);
        }
        function d(r) {
            if (r === null || H(r)) {
                e.exit(`codeFencedFence`);
                return t(r);
            }
            return n(r);
        }
    }
}
function Kt(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        if (t === null) {
            return n(t);
        }
        e.enter(`lineEnding`);
        e.consume(t);
        e.exit(`lineEnding`);
        return a;
    }
    function a(e) {
        if (r.parser.lazy[r.now().line]) {
            return n(e);
        }
        return t(e);
    }
}
const qt = {
    name: `codeIndented`,
    tokenize: Yt
};
var Jt = {
    partial: true,
    tokenize: Xt
};
function Yt(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        e.enter(`codeIndented`);
        return q(e, a, `linePrefix`, 5)(t);
    }
    function a(e) {
        let t = r.events[r.events.length - 1];
        if (t && t[1].type === `linePrefix` && t[2].sliceSerialize(t[1], true).length >= 4) {
            return o(e);
        }
        return n(e);
    }
    function o(t) {
        if (t === null) {
            return c(t);
        }
        if (H(t)) {
            return e.attempt(Jt, o, c)(t);
        }
        e.enter(`codeFlowValue`);
        return s(t);
    }
    function s(t) {
        if (t === null || H(t)) {
            e.exit(`codeFlowValue`);
            return o(t);
        }
        e.consume(t);
        return s;
    }
    function c(n) {
        e.exit(`codeIndented`);
        return t(n);
    }
}
function Xt(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        if (r.parser.lazy[r.now().line]) {
            return n(t);
        }
        if (H(t)) {
            e.enter(`lineEnding`);
            e.consume(t);
            e.exit(`lineEnding`);
            return i;
        }
        return q(e, a, `linePrefix`, 5)(t);
    }
    function a(e) {
        let a = r.events[r.events.length - 1];
        if (a && a[1].type === `linePrefix` && a[2].sliceSerialize(a[1], true).length >= 4) {
            return t(e);
        }
        if (H(e)) {
            return i(e);
        }
        return n(e);
    }
}
const Zt = {
    name: `codeText`,
    previous,
    resolve: Qt,
    tokenize: en
};
function Qt(e) {
    let t = e.length - 4;
    let n = 3;
    let r;
    let i;
    if ((e[n][1].type === `lineEnding` || e[n][1].type === `space`) && (e[t][1].type === `lineEnding` || e[t][1].type === `space`)) {
        for(r = n; ++r < t;){
            if (e[r][1].type === `codeTextData`) {
                e[n][1].type = `codeTextPadding`;
                e[t][1].type = `codeTextPadding`;
                n += 2;
                t -= 2;
                break;
            }
        }
    }
    r = n - 1;
    t++;
    while(++r <= t){
        if (i === undefined) {
            if (r !== t && e[r][1].type !== `lineEnding`) {
                i = r;
            }
        } else if (r === t || e[r][1].type === `lineEnding`) {
            e[i][1].type = `codeTextData`;
            if (r !== i + 2) {
                e[i][1].end = e[r - 1][1].end;
                e.splice(i + 2, r - i - 2);
                t -= r - i - 2;
                r = i + 2;
            }
            i = undefined;
        }
    }
    return e;
}
function previous(e) {
    return e !== 96 || this.events[this.events.length - 1][1].type === `characterEscape`;
}
function en(e, t, n) {
    let r = 0;
    let i;
    let a;
    return o;
    function o(t) {
        e.enter(`codeText`);
        e.enter(`codeTextSequence`);
        return s(t);
    }
    function s(t) {
        if (t === 96) {
            e.consume(t);
            r++;
            return s;
        }
        e.exit(`codeTextSequence`);
        return c(t);
    }
    function c(t) {
        if (t === null) {
            return n(t);
        }
        if (t === 32) {
            e.enter(`space`);
            e.consume(t);
            e.exit(`space`);
            return c;
        }
        if (t === 96) {
            a = e.enter(`codeTextSequence`);
            i = 0;
            return u(t);
        }
        if (H(t)) {
            e.enter(`lineEnding`);
            e.consume(t);
            e.exit(`lineEnding`);
            return c;
        }
        e.enter(`codeTextData`);
        return l(t);
    }
    function l(t) {
        if (t === null || t === 32 || t === 96 || H(t)) {
            e.exit(`codeTextData`);
            return c(t);
        }
        e.consume(t);
        return l;
    }
    function u(n) {
        if (n === 96) {
            e.consume(n);
            i++;
            return u;
        }
        if (i === r) {
            e.exit(`codeTextSequence`);
            e.exit(`codeText`);
            return t(n);
        }
        a.type = `codeTextData`;
        return l(n);
    }
}
const on = {
    resolve: cn,
    tokenize: ln
};
var sn = {
    partial: true,
    tokenize: un
};
function cn(e) {
    rn(e);
    return e;
}
function ln(e, t) {
    let n;
    return r;
    function r(t) {
        e.enter(`content`);
        n = e.enter(`chunkContent`, {
            contentType: `content`
        });
        return i(t);
    }
    function i(t) {
        if (t === null) {
            return a(t);
        }
        if (H(t)) {
            return e.check(sn, o, a)(t);
        }
        e.consume(t);
        return i;
    }
    function a(n) {
        e.exit(`chunkContent`);
        e.exit(`content`);
        return t(n);
    }
    function o(t) {
        e.consume(t);
        e.exit(`chunkContent`);
        n.next = e.enter(`chunkContent`, {
            contentType: `content`,
            previous: n
        });
        n = n.next;
        return i;
    }
}
function un(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        e.exit(`chunkContent`);
        e.enter(`lineEnding`);
        e.consume(t);
        e.exit(`lineEnding`);
        return q(e, a, `linePrefix`);
    }
    function a(i) {
        if (i === null || H(i)) {
            return n(i);
        }
        let a = r.events[r.events.length - 1];
        if (!r.parser.constructs.disable.null.includes(`codeIndented`) && a && a[1].type === `linePrefix` && a[2].sliceSerialize(a[1], true).length >= 4) {
            return t(i);
        }
        return e.interrupt(r.parser.constructs.flow, n, t)(i);
    }
}
function dn(e, t, n, r, i, a, o, s, c) {
    let l = c || Infinity;
    let u = 0;
    return d;
    function d(t) {
        if (t === 60) {
            e.enter(r);
            e.enter(i);
            e.enter(a);
            e.consume(t);
            e.exit(a);
            return f;
        }
        if (t === null || t === 32 || t === 41 || pt(t)) {
            return n(t);
        }
        e.enter(r);
        e.enter(o);
        e.enter(s);
        e.enter(`chunkString`, {
            contentType: `string`
        });
        return h(t);
    }
    function f(n) {
        if (n === 62) {
            e.enter(a);
            e.consume(n);
            e.exit(a);
            e.exit(i);
            e.exit(r);
            return t;
        }
        e.enter(s);
        e.enter(`chunkString`, {
            contentType: `string`
        });
        return p(n);
    }
    function p(t) {
        if (t === 62) {
            e.exit(`chunkString`);
            e.exit(s);
            return f(t);
        }
        if (t === null || t === 60 || H(t)) {
            return n(t);
        }
        e.consume(t);
        if (t === 92) {
            return m;
        }
        return p;
    }
    function m(t) {
        if (t === 60 || t === 62 || t === 92) {
            e.consume(t);
            return p;
        }
        return p(t);
    }
    function h(i) {
        if (!u && (i === null || i === 41 || U(i))) {
            e.exit(`chunkString`);
            e.exit(s);
            e.exit(o);
            e.exit(r);
            return t(i);
        }
        if (u < l && i === 40) {
            e.consume(i);
            u++;
            return h;
        }
        if (i === 41) {
            e.consume(i);
            u--;
            return h;
        }
        if (i === null || i === 32 || i === 40 || pt(i)) {
            return n(i);
        }
        e.consume(i);
        if (i === 92) {
            return g;
        }
        return h;
    }
    function g(t) {
        if (t === 40 || t === 41 || t === 92) {
            e.consume(t);
            return h;
        }
        return h(t);
    }
}
function fn(e, t, n, r, i, a) {
    let o = this;
    let s = 0;
    let c;
    return l;
    function l(t) {
        e.enter(r);
        e.enter(i);
        e.consume(t);
        e.exit(i);
        e.enter(a);
        return u;
    }
    function u(l) {
        if (s > 999 || l === null || l === 91 || l === 93 && !c || l === 94 && !s && `_hiddenFootnoteSupport` in o.parser.constructs) {
            return n(l);
        }
        if (l === 93) {
            e.exit(a);
            e.enter(i);
            e.consume(l);
            e.exit(i);
            e.exit(r);
            return t;
        }
        if (H(l)) {
            e.enter(`lineEnding`);
            e.consume(l);
            e.exit(`lineEnding`);
            return u;
        }
        e.enter(`chunkString`, {
            contentType: `string`
        });
        return d(l);
    }
    function d(t) {
        if (t === null || t === 91 || t === 93 || H(t) || s++ > 999) {
            e.exit(`chunkString`);
            return u(t);
        }
        e.consume(t);
        c ||= !W(t);
        if (t === 92) {
            return f;
        }
        return d;
    }
    function f(t) {
        if (t === 91 || t === 92 || t === 93) {
            e.consume(t);
            s++;
            return d;
        }
        return d(t);
    }
}
function pn(e, t, n, r, i, a) {
    let o;
    return s;
    function s(t) {
        if (t === 34 || t === 39 || t === 40) {
            e.enter(r);
            e.enter(i);
            e.consume(t);
            e.exit(i);
            o = t === 40 ? 41 : t;
            return c;
        }
        return n(t);
    }
    function c(n) {
        if (n === o) {
            e.enter(i);
            e.consume(n);
            e.exit(i);
            e.exit(r);
            return t;
        }
        e.enter(a);
        return l(n);
    }
    function l(t) {
        if (t === o) {
            e.exit(a);
            return c(o);
        }
        if (t === null) {
            return n(t);
        }
        if (H(t)) {
            e.enter(`lineEnding`);
            e.consume(t);
            e.exit(`lineEnding`);
            return q(e, l, `linePrefix`);
        }
        e.enter(`chunkString`, {
            contentType: `string`
        });
        return u(t);
    }
    function u(t) {
        if (t === o || t === null || H(t)) {
            e.exit(`chunkString`);
            return l(t);
        }
        e.consume(t);
        if (t === 92) {
            return d;
        }
        return u;
    }
    function d(t) {
        if (t === o || t === 92) {
            e.consume(t);
            return u;
        }
        return u(t);
    }
}
function mn(e, t) {
    let n;
    return r;
    function r(i) {
        if (H(i)) {
            e.enter(`lineEnding`);
            e.consume(i);
            e.exit(`lineEnding`);
            n = true;
            return r;
        }
        if (W(i)) {
            return q(e, r, n ? `linePrefix` : `lineSuffix`)(i);
        }
        return t(i);
    }
}
const hn = {
    name: `definition`,
    tokenize: _n
};
var gn = {
    partial: true,
    tokenize: vn
};
function _n(e, t, n) {
    let r = this;
    let i;
    return a;
    function a(t) {
        e.enter(`definition`);
        return o(t);
    }
    function o(t) {
        return fn.call(r, e, s, n, `definitionLabel`, `definitionLabelMarker`, `definitionLabelString`)(t);
    }
    function s(t) {
        i = z(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1));
        if (t === 58) {
            e.enter(`definitionMarker`);
            e.consume(t);
            e.exit(`definitionMarker`);
            return c;
        }
        return n(t);
    }
    function c(t) {
        if (U(t)) {
            return mn(e, l)(t);
        }
        return l(t);
    }
    function l(t) {
        return dn(e, u, n, `definitionDestination`, `definitionDestinationLiteral`, `definitionDestinationLiteralMarker`, `definitionDestinationRaw`, `definitionDestinationString`)(t);
    }
    function u(t) {
        return e.attempt(gn, d, d)(t);
    }
    function d(t) {
        if (W(t)) {
            return q(e, f, `whitespace`)(t);
        }
        return f(t);
    }
    function f(a) {
        if (a === null || H(a)) {
            e.exit(`definition`);
            r.parser.defined.push(i);
            return t(a);
        }
        return n(a);
    }
}
function vn(e, t, n) {
    return r;
    function r(t) {
        if (U(t)) {
            return mn(e, i)(t);
        }
        return n(t);
    }
    function i(t) {
        return pn(e, a, n, `definitionTitle`, `definitionTitleMarker`, `definitionTitleString`)(t);
    }
    function a(t) {
        if (W(t)) {
            return q(e, o, `whitespace`)(t);
        }
        return o(t);
    }
    function o(e) {
        if (e === null || H(e)) {
            return t(e);
        }
        return n(e);
    }
}
const yn = {
    name: `hardBreakEscape`,
    tokenize: bn
};
function bn(e, t, n) {
    return r;
    function r(t) {
        e.enter(`hardBreakEscape`);
        e.consume(t);
        return i;
    }
    function i(r) {
        if (H(r)) {
            e.exit(`hardBreakEscape`);
            return t(r);
        }
        return n(r);
    }
}
const xn = {
    name: `headingAtx`,
    resolve: Sn,
    tokenize: Cn
};
function Sn(e, t) {
    let n = e.length - 2;
    let r = 3;
    let i;
    let a;
    if (e[r][1].type === `whitespace`) {
        r += 2;
    }
    if (n - 2 > r && e[n][1].type === `whitespace`) {
        n -= 2;
    }
    if (e[n][1].type === `atxHeadingSequence` && (r === n - 1 || n - 4 > r && e[n - 2][1].type === `whitespace`)) {
        n -= r + 1 === n ? 2 : 4;
    }
    if (n > r) {
        i = {
            type: `atxHeadingText`,
            start: e[r][1].start,
            end: e[n][1].end
        };
        a = {
            type: `chunkText`,
            start: e[r][1].start,
            end: e[n][1].end,
            contentType: `text`
        };
        L(e, r, n - r + 1, [
            [
                `enter`,
                i,
                t
            ],
            [
                `enter`,
                a,
                t
            ],
            [
                `exit`,
                a,
                t
            ],
            [
                `exit`,
                i,
                t
            ]
        ]);
    }
    return e;
}
function Cn(e, t, n) {
    let r = 0;
    return i;
    function i(t) {
        e.enter(`atxHeading`);
        return a(t);
    }
    function a(t) {
        e.enter(`atxHeadingSequence`);
        return o(t);
    }
    function o(t) {
        if (t === 35 && r++ < 6) {
            e.consume(t);
            return o;
        }
        if (t === null || U(t)) {
            e.exit(`atxHeadingSequence`);
            return s(t);
        }
        return n(t);
    }
    function s(n) {
        if (n === 35) {
            e.enter(`atxHeadingSequence`);
            return c(n);
        }
        if (n === null || H(n)) {
            e.exit(`atxHeading`);
            return t(n);
        }
        if (W(n)) {
            return q(e, s, `whitespace`)(n);
        }
        e.enter(`atxHeadingText`);
        return l(n);
    }
    function c(t) {
        if (t === 35) {
            e.consume(t);
            return c;
        }
        e.exit(`atxHeadingSequence`);
        return s(t);
    }
    function l(t) {
        if (t === null || t === 35 || U(t)) {
            e.exit(`atxHeadingText`);
            return s(t);
        }
        e.consume(t);
        return l;
    }
}
const wn = `address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`);
const Tn = [
    `pre`,
    `script`,
    `style`,
    `textarea`
];
const En = {
    concrete: true,
    name: `htmlFlow`,
    resolveTo: kn,
    tokenize: An
};
var Dn = {
    partial: true,
    tokenize: Mn
};
var On = {
    partial: true,
    tokenize: jn
};
function kn(e) {
    let e_length = e.length;
    while(e_length-- && !(e[e_length][0] === `enter` && e[e_length][1].type === `htmlFlow`));
    if (e_length > 1 && e[e_length - 2][1].type === `linePrefix`) {
        e[e_length][1].start = e[e_length - 2][1].start;
        e[e_length + 1][1].start = e[e_length - 2][1].start;
        e.splice(e_length - 2, 2);
    }
    return e;
}
function An(e, t, n) {
    let r = this;
    let i;
    let a;
    let o;
    let s;
    let c;
    return l;
    function l(e) {
        return u(e);
    }
    function u(t) {
        e.enter(`htmlFlow`);
        e.enter(`htmlFlowData`);
        e.consume(t);
        return d;
    }
    function d(s) {
        if (s === 33) {
            e.consume(s);
            return f;
        }
        if (s === 47) {
            e.consume(s);
            a = true;
            return h;
        }
        if (s === 63) {
            e.consume(s);
            i = 3;
            if (r.interrupt) {
                return t;
            }
            return N;
        }
        if (B(s)) {
            e.consume(s);
            o = String.fromCharCode(s);
            return g;
        }
        return n(s);
    }
    function f(a) {
        if (a === 45) {
            e.consume(a);
            i = 2;
            return p;
        }
        if (a === 91) {
            e.consume(a);
            i = 5;
            s = 0;
            return m;
        }
        if (B(a)) {
            e.consume(a);
            i = 4;
            if (r.interrupt) {
                return t;
            }
            return N;
        }
        return n(a);
    }
    function p(i) {
        if (i === 45) {
            e.consume(i);
            if (r.interrupt) {
                return t;
            }
            return N;
        }
        return n(i);
    }
    function m(i) {
        if (i === `CDATA[`.charCodeAt(s++)) {
            e.consume(i);
            if (s === 6) {
                if (r.interrupt) {
                    return t;
                }
                return O;
            }
            return m;
        }
        return n(i);
    }
    function h(t) {
        if (B(t)) {
            e.consume(t);
            o = String.fromCharCode(t);
            return g;
        }
        return n(t);
    }
    function g(s) {
        if (s === null || s === 47 || s === 62 || U(s)) {
            let c = s === 47;
            let l = o.toLowerCase();
            if (!c && !a && Tn.includes(l)) {
                i = 1;
                if (r.interrupt) {
                    return t(s);
                }
                return O(s);
            }
            if (wn.includes(o.toLowerCase())) {
                i = 6;
                if (c) {
                    return e.consume(s), _;
                }
                if (r.interrupt) {
                    return t(s);
                }
                return O(s);
            }
            i = 7;
            if (r.interrupt && !r.parser.lazy[r.now().line]) {
                return n(s);
            }
            if (a) {
                return v(s);
            }
            return y(s);
        }
        if (s === 45 || V(s)) {
            e.consume(s);
            o += String.fromCharCode(s);
            return g;
        }
        return n(s);
    }
    function _(i) {
        if (i === 62) {
            e.consume(i);
            if (r.interrupt) {
                return t;
            }
            return O;
        }
        return n(i);
    }
    function v(t) {
        if (W(t)) {
            e.consume(t);
            return v;
        }
        return E(t);
    }
    function y(t) {
        if (t === 47) {
            e.consume(t);
            return E;
        }
        if (t === 58 || t === 95 || B(t)) {
            e.consume(t);
            return b;
        }
        if (W(t)) {
            e.consume(t);
            return y;
        }
        return E(t);
    }
    function b(t) {
        if (t === 45 || t === 46 || t === 58 || t === 95 || V(t)) {
            e.consume(t);
            return b;
        }
        return x(t);
    }
    function x(t) {
        if (t === 61) {
            e.consume(t);
            return S;
        }
        if (W(t)) {
            e.consume(t);
            return x;
        }
        return y(t);
    }
    function S(t) {
        if (t === null || t === 60 || t === 61 || t === 62 || t === 96) {
            return n(t);
        }
        if (t === 34 || t === 39) {
            e.consume(t);
            c = t;
            return C;
        }
        if (W(t)) {
            e.consume(t);
            return S;
        }
        return w(t);
    }
    function C(t) {
        if (t === c) {
            e.consume(t);
            c = null;
            return T;
        }
        if (t === null || H(t)) {
            return n(t);
        }
        e.consume(t);
        return C;
    }
    function w(t) {
        if (t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || U(t)) {
            return x(t);
        }
        e.consume(t);
        return w;
    }
    function T(e) {
        if (e === 47 || e === 62 || W(e)) {
            return y(e);
        }
        return n(e);
    }
    function E(t) {
        if (t === 62) {
            e.consume(t);
            return D;
        }
        return n(t);
    }
    function D(t) {
        if (t === null || H(t)) {
            return O(t);
        }
        if (W(t)) {
            e.consume(t);
            return D;
        }
        return n(t);
    }
    function O(t) {
        if (t === 45 && i === 2) {
            e.consume(t);
            return j;
        }
        if (t === 60 && i === 1) {
            e.consume(t);
            return M;
        }
        if (t === 62 && i === 4) {
            e.consume(t);
            return P;
        }
        if (t === 63 && i === 3) {
            e.consume(t);
            return N;
        }
        if (t === 93 && i === 5) {
            e.consume(t);
            return ne;
        }
        if (H(t) && (i === 6 || i === 7)) {
            e.exit(`htmlFlowData`);
            return e.check(Dn, F, k)(t);
        }
        if (t === null || H(t)) {
            e.exit(`htmlFlowData`);
            return k(t);
        }
        e.consume(t);
        return O;
    }
    function k(t) {
        return e.check(On, A, F)(t);
    }
    function A(t) {
        e.enter(`lineEnding`);
        e.consume(t);
        e.exit(`lineEnding`);
        return ee;
    }
    function ee(t) {
        if (t === null || H(t)) {
            return k(t);
        }
        e.enter(`htmlFlowData`);
        return O(t);
    }
    function j(t) {
        if (t === 45) {
            e.consume(t);
            return N;
        }
        return O(t);
    }
    function M(t) {
        if (t === 47) {
            e.consume(t);
            o = ``;
            return te;
        }
        return O(t);
    }
    function te(t) {
        if (t === 62) {
            let n = o.toLowerCase();
            if (Tn.includes(n)) {
                e.consume(t);
                return P;
            }
            return O(t);
        }
        if (B(t) && o.length < 8) {
            e.consume(t);
            o += String.fromCharCode(t);
            return te;
        }
        return O(t);
    }
    function ne(t) {
        if (t === 93) {
            e.consume(t);
            return N;
        }
        return O(t);
    }
    function N(t) {
        if (t === 62) {
            e.consume(t);
            return P;
        }
        if (t === 45 && i === 2) {
            e.consume(t);
            return N;
        }
        return O(t);
    }
    function P(t) {
        if (t === null || H(t)) {
            e.exit(`htmlFlowData`);
            return F(t);
        }
        e.consume(t);
        return P;
    }
    function F(n) {
        e.exit(`htmlFlow`);
        return t(n);
    }
}
function jn(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        if (H(t)) {
            e.enter(`lineEnding`);
            e.consume(t);
            e.exit(`lineEnding`);
            return a;
        }
        return n(t);
    }
    function a(e) {
        if (r.parser.lazy[r.now().line]) {
            return n(e);
        }
        return t(e);
    }
}
function Mn(e, t, n) {
    return r;
    function r(r) {
        e.enter(`lineEnding`);
        e.consume(r);
        e.exit(`lineEnding`);
        return e.attempt(Nt, t, n);
    }
}
const Nn = {
    name: `htmlText`,
    tokenize: Pn
};
function Pn(e, t, n) {
    let r = this;
    let i;
    let a;
    let o;
    return s;
    function s(t) {
        e.enter(`htmlText`);
        e.enter(`htmlTextData`);
        e.consume(t);
        return c;
    }
    function c(t) {
        if (t === 33) {
            e.consume(t);
            return l;
        }
        if (t === 47) {
            e.consume(t);
            return x;
        }
        if (t === 63) {
            e.consume(t);
            return y;
        }
        if (B(t)) {
            e.consume(t);
            return w;
        }
        return n(t);
    }
    function l(t) {
        if (t === 45) {
            e.consume(t);
            return u;
        }
        if (t === 91) {
            e.consume(t);
            a = 0;
            return m;
        }
        if (B(t)) {
            e.consume(t);
            return v;
        }
        return n(t);
    }
    function u(t) {
        if (t === 45) {
            e.consume(t);
            return p;
        }
        return n(t);
    }
    function d(t) {
        if (t === null) {
            return n(t);
        }
        if (t === 45) {
            e.consume(t);
            return f;
        }
        if (H(t)) {
            o = d;
            return M(t);
        }
        e.consume(t);
        return d;
    }
    function f(t) {
        if (t === 45) {
            e.consume(t);
            return p;
        }
        return d(t);
    }
    function p(e) {
        switch(e){
            case 62:
                return j(e);
            case 45:
                return f(e);
            default:
                return d(e);
        }
    }
    function m(t) {
        if (t === `CDATA[`.charCodeAt(a++)) {
            e.consume(t);
            if (a === 6) {
                return h;
            }
            return m;
        }
        return n(t);
    }
    function h(t) {
        if (t === null) {
            return n(t);
        }
        if (t === 93) {
            e.consume(t);
            return g;
        }
        if (H(t)) {
            o = h;
            return M(t);
        }
        e.consume(t);
        return h;
    }
    function g(t) {
        if (t === 93) {
            e.consume(t);
            return _;
        }
        return h(t);
    }
    function _(t) {
        switch(t){
            case 62:
                return j(t);
            case 93:
                e.consume(t);
                return _;
            default:
                return h(t);
        }
    }
    function v(t) {
        if (t === null || t === 62) {
            return j(t);
        }
        if (H(t)) {
            o = v;
            return M(t);
        }
        e.consume(t);
        return v;
    }
    function y(t) {
        if (t === null) {
            return n(t);
        }
        if (t === 63) {
            e.consume(t);
            return b;
        }
        if (H(t)) {
            o = y;
            return M(t);
        }
        e.consume(t);
        return y;
    }
    function b(e) {
        if (e === 62) {
            return j(e);
        }
        return y(e);
    }
    function x(t) {
        if (B(t)) {
            e.consume(t);
            return S;
        }
        return n(t);
    }
    function S(t) {
        if (t === 45 || V(t)) {
            e.consume(t);
            return S;
        }
        return C(t);
    }
    function C(t) {
        if (H(t)) {
            o = C;
            return M(t);
        }
        if (W(t)) {
            e.consume(t);
            return C;
        }
        return j(t);
    }
    function w(t) {
        if (t === 45 || V(t)) {
            e.consume(t);
            return w;
        }
        if (t === 47 || t === 62 || U(t)) {
            return T(t);
        }
        return n(t);
    }
    function T(t) {
        if (t === 47) {
            e.consume(t);
            return j;
        }
        if (t === 58 || t === 95 || B(t)) {
            e.consume(t);
            return E;
        }
        if (H(t)) {
            o = T;
            return M(t);
        }
        if (W(t)) {
            e.consume(t);
            return T;
        }
        return j(t);
    }
    function E(t) {
        if (t === 45 || t === 46 || t === 58 || t === 95 || V(t)) {
            e.consume(t);
            return E;
        }
        return D(t);
    }
    function D(t) {
        if (t === 61) {
            e.consume(t);
            return O;
        }
        if (H(t)) {
            o = D;
            return M(t);
        }
        if (W(t)) {
            e.consume(t);
            return D;
        }
        return T(t);
    }
    function O(t) {
        if (t === null || t === 60 || t === 61 || t === 62 || t === 96) {
            return n(t);
        }
        if (t === 34 || t === 39) {
            e.consume(t);
            i = t;
            return k;
        }
        if (H(t)) {
            o = O;
            return M(t);
        }
        if (W(t)) {
            e.consume(t);
            return O;
        }
        e.consume(t);
        return A;
    }
    function k(t) {
        if (t === i) {
            e.consume(t);
            i = undefined;
            return ee;
        }
        if (t === null) {
            return n(t);
        }
        if (H(t)) {
            o = k;
            return M(t);
        }
        e.consume(t);
        return k;
    }
    function A(t) {
        if (t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96) {
            return n(t);
        }
        if (t === 47 || t === 62 || U(t)) {
            return T(t);
        }
        e.consume(t);
        return A;
    }
    function ee(e) {
        if (e === 47 || e === 62 || U(e)) {
            return T(e);
        }
        return n(e);
    }
    function j(r) {
        if (r === 62) {
            e.consume(r);
            e.exit(`htmlTextData`);
            e.exit(`htmlText`);
            return t;
        }
        return n(r);
    }
    function M(t) {
        e.exit(`htmlTextData`);
        e.enter(`lineEnding`);
        e.consume(t);
        e.exit(`lineEnding`);
        return te;
    }
    function te(t) {
        if (W(t)) {
            return q(e, ne, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? undefined : 4)(t);
        }
        return ne(t);
    }
    function ne(t) {
        e.enter(`htmlTextData`);
        return o(t);
    }
}
const Fn = {
    name: `labelEnd`,
    resolveAll: zn,
    resolveTo: Bn,
    tokenize: Vn
};
var In = {
    tokenize: Hn
};
var Ln = {
    tokenize: Un
};
var Rn = {
    tokenize: Wn
};
function zn(e) {
    let t = -1;
    let n = [];
    while(++t < e.length){
        let r = e[t][1];
        n.push(e[t]);
        if (r.type === `labelImage` || r.type === `labelLink` || r.type === `labelEnd`) {
            let e = r.type === `labelImage` ? 4 : 2;
            r.type = `data`;
            t += e;
        }
    }
    if (e.length !== n.length) {
        L(e, 0, e.length, n);
    }
    return e;
}
function Bn(e, t) {
    let e_length = e.length;
    let r = 0;
    let i;
    let a;
    let o;
    let s;
    while(e_length--){
        i = e[e_length][1];
        if (a) {
            if (i.type === `link` || i.type === `labelLink` && i._inactive) {
                break;
            }
            if (e[e_length][0] === `enter` && i.type === `labelLink`) {
                i._inactive = true;
            }
        } else if (o) {
            if (e[e_length][0] === `enter` && (i.type === `labelImage` || i.type === `labelLink`) && !i._balanced && (a = e_length, i.type !== `labelLink`)) {
                r = 2;
                break;
            }
        } else {
            if (i.type === `labelEnd`) {
                o = e_length;
            }
        }
    }
    let c = {
        type: e[a][1].type === `labelLink` ? `link` : `image`,
        start: {
            ...e[a][1].start
        },
        end: {
            ...e[e.length - 1][1].end
        }
    };
    let l = {
        type: `label`,
        start: {
            ...e[a][1].start
        },
        end: {
            ...e[o][1].end
        }
    };
    let u = {
        type: `labelText`,
        start: {
            ...e[a + r + 2][1].end
        },
        end: {
            ...e[o - 2][1].start
        }
    };
    s = [
        [
            `enter`,
            c,
            t
        ],
        [
            `enter`,
            l,
            t
        ]
    ];
    s = R(s, e.slice(a + 1, a + r + 3));
    s = R(s, [
        [
            `enter`,
            u,
            t
        ]
    ]);
    s = R(s, Et(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t));
    s = R(s, [
        [
            `exit`,
            u,
            t
        ],
        e[o - 2],
        e[o - 1],
        [
            `exit`,
            l,
            t
        ]
    ]);
    s = R(s, e.slice(o + 1));
    s = R(s, [
        [
            `exit`,
            c,
            t
        ]
    ]);
    L(e, a, e.length, s);
    return e;
}
function Vn(e, t, n) {
    let r = this;
    let length = r.events.length;
    let a;
    let o;
    while(length--){
        if ((r.events[length][1].type === `labelImage` || r.events[length][1].type === `labelLink`) && !r.events[length][1]._balanced) {
            a = r.events[length][1];
            break;
        }
    }
    return s;
    function s(t) {
        if (a) {
            if (a._inactive) {
                return d(t);
            }
            o = r.parser.defined.includes(z(r.sliceSerialize({
                start: a.end,
                end: r.now()
            })));
            e.enter(`labelEnd`);
            e.enter(`labelMarker`);
            e.consume(t);
            e.exit(`labelMarker`);
            e.exit(`labelEnd`);
            return c;
        }
        return n(t);
    }
    function c(t) {
        if (t === 40) {
            return e.attempt(In, u, o ? u : d)(t);
        }
        if (t === 91) {
            return e.attempt(Ln, u, o ? l : d)(t);
        }
        if (o) {
            return u(t);
        }
        return d(t);
    }
    function l(t) {
        return e.attempt(Rn, u, d)(t);
    }
    function u(e) {
        return t(e);
    }
    function d(e) {
        a._balanced = true;
        return n(e);
    }
}
function Hn(e, t, n) {
    return r;
    function r(t) {
        e.enter(`resource`);
        e.enter(`resourceMarker`);
        e.consume(t);
        e.exit(`resourceMarker`);
        return i;
    }
    function i(t) {
        if (U(t)) {
            return mn(e, a)(t);
        }
        return a(t);
    }
    function a(t) {
        if (t === 41) {
            return u(t);
        }
        return dn(e, o, s, `resourceDestination`, `resourceDestinationLiteral`, `resourceDestinationLiteralMarker`, `resourceDestinationRaw`, `resourceDestinationString`, 32)(t);
    }
    function o(t) {
        if (U(t)) {
            return mn(e, c)(t);
        }
        return u(t);
    }
    function s(e) {
        return n(e);
    }
    function c(t) {
        if (t === 34 || t === 39 || t === 40) {
            return pn(e, l, n, `resourceTitle`, `resourceTitleMarker`, `resourceTitleString`)(t);
        }
        return u(t);
    }
    function l(t) {
        if (U(t)) {
            return mn(e, u)(t);
        }
        return u(t);
    }
    function u(r) {
        if (r === 41) {
            e.enter(`resourceMarker`);
            e.consume(r);
            e.exit(`resourceMarker`);
            e.exit(`resource`);
            return t;
        }
        return n(r);
    }
}
function Un(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        return fn.call(r, e, a, o, `reference`, `referenceMarker`, `referenceString`)(t);
    }
    function a(e) {
        if (r.parser.defined.includes(z(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)))) {
            return t(e);
        }
        return n(e);
    }
    function o(e) {
        return n(e);
    }
}
function Wn(e, t, n) {
    return r;
    function r(t) {
        e.enter(`reference`);
        e.enter(`referenceMarker`);
        e.consume(t);
        e.exit(`referenceMarker`);
        return i;
    }
    function i(r) {
        if (r === 93) {
            e.enter(`referenceMarker`);
            e.consume(r);
            e.exit(`referenceMarker`);
            e.exit(`reference`);
            return t;
        }
        return n(r);
    }
}
const Gn = {
    name: `labelStartImage`,
    resolveAll: Fn.resolveAll,
    tokenize: Kn
};
function Kn(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        e.enter(`labelImage`);
        e.enter(`labelImageMarker`);
        e.consume(t);
        e.exit(`labelImageMarker`);
        return a;
    }
    function a(t) {
        if (t === 91) {
            e.enter(`labelMarker`);
            e.consume(t);
            e.exit(`labelMarker`);
            e.exit(`labelImage`);
            return o;
        }
        return n(t);
    }
    function o(e) {
        if (e === 94 && `_hiddenFootnoteSupport` in r.parser.constructs) {
            return n(e);
        }
        return t(e);
    }
}
const qn = {
    name: `labelStartLink`,
    resolveAll: Fn.resolveAll,
    tokenize: Jn
};
function Jn(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        e.enter(`labelLink`);
        e.enter(`labelMarker`);
        e.consume(t);
        e.exit(`labelMarker`);
        e.exit(`labelLink`);
        return a;
    }
    function a(e) {
        if (e === 94 && `_hiddenFootnoteSupport` in r.parser.constructs) {
            return n(e);
        }
        return t(e);
    }
}
const Yn = {
    name: `lineEnding`,
    tokenize: Xn
};
function Xn(e, t) {
    return n;
    function n(n) {
        e.enter(`lineEnding`);
        e.consume(n);
        e.exit(`lineEnding`);
        return q(e, t, `linePrefix`);
    }
}
const Zn = {
    name: `thematicBreak`,
    tokenize: Qn
};
function Qn(e, t, n) {
    let r = 0;
    let i;
    return a;
    function a(t) {
        e.enter(`thematicBreak`);
        return o(t);
    }
    function o(e) {
        i = e;
        return s(e);
    }
    function s(a) {
        if (a === i) {
            e.enter(`thematicBreakSequence`);
            return c(a);
        }
        if (r >= 3 && (a === null || H(a))) {
            e.exit(`thematicBreak`);
            return t(a);
        }
        return n(a);
    }
    function c(t) {
        if (t === i) {
            e.consume(t);
            r++;
            return c;
        }
        e.exit(`thematicBreakSequence`);
        if (W(t)) {
            return q(e, s, `whitespace`)(t);
        }
        return s(t);
    }
}
var J = {
    continuation: {
        tokenize: nr
    },
    exit: ir,
    name: `list`,
    tokenize: tr
};
var $n = {
    partial: true,
    tokenize: ar
};
var er = {
    partial: true,
    tokenize: rr
};
function tr(e, t, n) {
    let r = this;
    let i = r.events[r.events.length - 1];
    let a = i && i[1].type === `linePrefix` ? i[2].sliceSerialize(i[1], true).length : 0;
    let o = 0;
    return s;
    function s(t) {
        let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? `listUnordered` : `listOrdered`);
        if (i === `listUnordered` ? !r.containerState.marker || t === r.containerState.marker : mt(t)) {
            if (!r.containerState.type) {
                r.containerState.type = i;
                e.enter(i, {
                    _container: true
                });
            }
            if (i === `listUnordered`) {
                e.enter(`listItemPrefix`);
                if (t === 42 || t === 45) {
                    return e.check(Zn, n, l)(t);
                }
                return l(t);
            }
            if (!r.interrupt || t === 49) {
                e.enter(`listItemPrefix`);
                e.enter(`listItemValue`);
                return c(t);
            }
        }
        return n(t);
    }
    function c(t) {
        if (mt(t) && ++o < 10) {
            e.consume(t);
            return c;
        }
        if ((!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46)) {
            e.exit(`listItemValue`);
            return l(t);
        }
        return n(t);
    }
    function l(t) {
        e.enter(`listItemMarker`);
        e.consume(t);
        e.exit(`listItemMarker`);
        r.containerState.marker = r.containerState.marker || t;
        return e.check(Nt, r.interrupt ? n : u, e.attempt($n, f, d));
    }
    function u(e) {
        r.containerState.initialBlankLine = true;
        a++;
        return f(e);
    }
    function d(t) {
        if (W(t)) {
            e.enter(`listItemPrefixWhitespace`);
            e.consume(t);
            e.exit(`listItemPrefixWhitespace`);
            return f;
        }
        return n(t);
    }
    function f(n) {
        r.containerState.size = a + r.sliceSerialize(e.exit(`listItemPrefix`), true).length;
        return t(n);
    }
}
function nr(e, t, n) {
    let r = this;
    r.containerState._closeFlow = undefined;
    return e.check(Nt, i, a);
    function i(n) {
        r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine;
        return q(e, t, `listItemIndent`, r.containerState.size + 1)(n);
    }
    function a(n) {
        if (r.containerState.furtherBlankLines || !W(n)) {
            r.containerState.furtherBlankLines = undefined;
            r.containerState.initialBlankLine = undefined;
            return o(n);
        }
        r.containerState.furtherBlankLines = undefined;
        r.containerState.initialBlankLine = undefined;
        return e.attempt(er, t, o)(n);
    }
    function o(i) {
        r.containerState._closeFlow = true;
        r.interrupt = undefined;
        return q(e, e.attempt(J, t, n), `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? undefined : 4)(i);
    }
}
function rr(e, t, n) {
    let r = this;
    return q(e, i, `listItemIndent`, r.containerState.size + 1);
    function i(e) {
        let i = r.events[r.events.length - 1];
        if (i && i[1].type === `listItemIndent` && i[2].sliceSerialize(i[1], true).length === r.containerState.size) {
            return t(e);
        }
        return n(e);
    }
}
function ir(e) {
    e.exit(this.containerState.type);
}
function ar(e, t, n) {
    let r = this;
    return q(e, i, `listItemPrefixWhitespace`, r.parser.constructs.disable.null.includes(`codeIndented`) ? undefined : 5);
    function i(e) {
        let i = r.events[r.events.length - 1];
        if (!W(e) && i && i[1].type === `listItemPrefixWhitespace`) {
            return t(e);
        }
        return n(e);
    }
}
const or = {
    name: `setextUnderline`,
    resolveTo: sr,
    tokenize: cr
};
function sr(e, t) {
    let e_length = e.length;
    let r;
    let i;
    let a;
    while(e_length--){
        if (e[e_length][0] === `enter`) {
            if (e[e_length][1].type === `content`) {
                r = e_length;
                break;
            }
            if (e[e_length][1].type === `paragraph`) {
                i = e_length;
            }
        } else {
            if (e[e_length][1].type === `content`) {
                e.splice(e_length, 1);
            }
            if (!a && e[e_length][1].type === `definition`) {
                a = e_length;
            }
        }
    }
    let o = {
        type: `setextHeading`,
        start: {
            ...e[r][1].start
        },
        end: {
            ...e[e.length - 1][1].end
        }
    };
    e[i][1].type = `setextHeadingText`;
    if (a) {
        e.splice(i, 0, [
            `enter`,
            o,
            t
        ]);
        e.splice(a + 1, 0, [
            `exit`,
            e[r][1],
            t
        ]);
        e[r][1].end = {
            ...e[a][1].end
        };
    } else {
        e[r][1] = o;
    }
    e.push([
        `exit`,
        o,
        t
    ]);
    return e;
}
function cr(e, t, n) {
    let r = this;
    let i;
    return a;
    function a(t) {
        let length = r.events.length;
        let s;
        while(length--){
            if (r.events[length][1].type !== `lineEnding` && r.events[length][1].type !== `linePrefix` && r.events[length][1].type !== `content`) {
                s = r.events[length][1].type === `paragraph`;
                break;
            }
        }
        if (!r.parser.lazy[r.now().line] && (r.interrupt || s)) {
            e.enter(`setextHeadingLine`);
            i = t;
            return o(t);
        }
        return n(t);
    }
    function o(t) {
        e.enter(`setextHeadingLineSequence`);
        return s(t);
    }
    function s(t) {
        if (t === i) {
            e.consume(t);
            return s;
        }
        e.exit(`setextHeadingLineSequence`);
        if (W(t)) {
            return q(e, c, `lineSuffix`)(t);
        }
        return c(t);
    }
    function c(r) {
        if (r === null || H(r)) {
            e.exit(`setextHeadingLine`);
            return t(r);
        }
        return n(r);
    }
}
const lr = {
    tokenize: ur
};
function ur(e) {
    let t = this;
    let n = e.attempt(Nt, r, e.attempt(this.parser.constructs.flowInitial, i, q(e, e.attempt(this.parser.constructs.flow, i, e.attempt(on, i)), `linePrefix`)));
    return n;
    function r(r) {
        if (r === null) {
            e.consume(r);
            return;
        }
        e.enter(`lineEndingBlank`);
        e.consume(r);
        e.exit(`lineEndingBlank`);
        t.currentConstruct = undefined;
        return n;
    }
    function i(r) {
        if (r === null) {
            e.consume(r);
            return;
        }
        e.enter(`lineEnding`);
        e.consume(r);
        e.exit(`lineEnding`);
        t.currentConstruct = undefined;
        return n;
    }
}
const dr = {
    resolveAll: hr()
};
const fr = mr(`string`);
const pr = mr(`text`);
function mr(e) {
    return {
        resolveAll: hr(e === `text` ? gr : undefined),
        tokenize: t
    };
    function t(t) {
        let n = this;
        let r = this.parser.constructs[e];
        let i = t.attempt(r, a, o);
        return a;
        function a(e) {
            if (c(e)) {
                return i(e);
            }
            return o(e);
        }
        function o(e) {
            if (e === null) {
                t.consume(e);
                return;
            }
            t.enter(`data`);
            t.consume(e);
            return s;
        }
        function s(e) {
            if (c(e)) {
                t.exit(`data`);
                return i(e);
            }
            t.consume(e);
            return s;
        }
        function c(e) {
            if (e === null) {
                return true;
            }
            let t = r[e];
            let i = -1;
            if (t) {
                while(++i < t.length){
                    let e = t[i];
                    if (!e.previous || e.previous.call(n, n.previous)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
function hr(e) {
    return t;
    function t(t, n) {
        let r = -1;
        let i;
        while(++r <= t.length){
            if (i === undefined) {
                if (t[r] && t[r][1].type === `data`) {
                    i = r;
                    r++;
                }
            } else if (!t[r] || t[r][1].type !== `data`) {
                if (r !== i + 2) {
                    t[i][1].end = t[r - 1][1].end;
                    t.splice(i + 2, r - i - 2);
                    r = i + 2;
                }
                i = undefined;
            }
        }
        if (e) {
            return e(t, n);
        }
        return t;
    }
}
function gr(e, t) {
    let n = 0;
    while(++n <= e.length){
        if ((n === e.length || e[n][1].type === `lineEnding`) && e[n - 1][1].type === `data`) {
            let r = e[n - 1][1];
            let i = t.sliceStream(r);
            let a = i.length;
            let o = -1;
            let s = 0;
            let c;
            while(a--){
                let e = i[a];
                if (typeof e == `string`) {
                    for(o = e.length; e.charCodeAt(o - 1) === 32;){
                        s++;
                        o--;
                    }
                    if (o) {
                        break;
                    }
                    o = -1;
                } else if (e === -2) {
                    c = true;
                    s++;
                } else if (e !== -1) {
                    a++;
                    break;
                }
            }
            if (t._contentTypeTextTrailing && n === e.length) {
                s = 0;
            }
            if (s) {
                let i = {
                    type: n === e.length || c || s < 2 ? `lineSuffix` : `hardBreakTrailing`,
                    start: {
                        _bufferIndex: a ? o : r.start._bufferIndex + o,
                        _index: r.start._index + a,
                        line: r.end.line,
                        column: r.end.column - s,
                        offset: r.end.offset - s
                    },
                    end: {
                        ...r.end
                    }
                };
                r.end = {
                    ...i.start
                };
                if (r.start.offset === r.end.offset) {
                    Object.assign(r, i);
                } else {
                    e.splice(n, 0, [
                        `enter`,
                        i,
                        t
                    ], [
                        `exit`,
                        i,
                        t
                    ]);
                    n += 2;
                }
            }
            n++;
        }
    }
    return e;
}
const _r = a_1({
    attentionMarkers: ()=>Tr,
    contentInitial: ()=>yr,
    disable: ()=>Er,
    document: ()=>vr,
    flow: ()=>xr,
    flowInitial: ()=>br,
    insideSpan: ()=>wr,
    string: ()=>Sr,
    text: ()=>Cr
});
var vr = {
    42: J,
    43: J,
    45: J,
    48: J,
    49: J,
    50: J,
    51: J,
    52: J,
    53: J,
    54: J,
    55: J,
    56: J,
    57: J,
    62: Ft
};
var yr = {
    91: hn
};
var br = {
    [-2]: qt,
    [-1]: qt,
    32: qt
};
var xr = {
    35: xn,
    42: Zn,
    45: [
        or,
        Zn
    ],
    60: En,
    61: or,
    95: Zn,
    96: Wt,
    126: Wt
};
var Sr = {
    38: Vt,
    92: zt
};
var Cr = {
    [-5]: Yn,
    [-4]: Yn,
    [-3]: Yn,
    33: Gn,
    38: Vt,
    42: Dt,
    60: [
        jt,
        Nn
    ],
    91: qn,
    92: [
        yn,
        zt
    ],
    93: Fn,
    95: Dt,
    96: Zt
};
var wr = {
    null: [
        Dt,
        dr
    ]
};
var Tr = {
    null: [
        42,
        95
    ]
};
var Er = {
    null: []
};
function Dr(parser, t, n) {
    let r = {
        _bufferIndex: -1,
        _index: 0,
        line: n && n.line || 1,
        column: n && n.column || 1,
        offset: n && n.offset || 0
    };
    let i = {};
    let a = [];
    let o = [];
    let s = [];
    let c = {
        attempt: C(x),
        check: C(S),
        consume,
        enter,
        exit: b,
        interrupt: C(S, {
            interrupt: true
        })
    };
    let l = {
        code: null,
        containerState: {},
        defineSkip,
        events: [],
        now,
        parser,
        previous: null,
        sliceSerialize,
        sliceStream,
        write
    };
    let u = t.tokenize.call(l, c);
    if (t.resolveAll) {
        a.push(t);
    }
    return l;
    function write(e) {
        o = R(o, e);
        g();
        if (o[o.length - 1] === null) {
            w(t, 0);
            l.events = Et(a, l.events, l);
            return l.events;
        }
        return [];
    }
    function sliceSerialize(e, t) {
        return kr(sliceStream(e), t);
    }
    function sliceStream(e) {
        return Or(o, e);
    }
    function now() {
        let { _bufferIndex, _index, line, column, offset } = r;
        return {
            _bufferIndex,
            _index,
            line,
            column,
            offset
        };
    }
    function defineSkip(e) {
        i[e.line] = e.column;
        E();
    }
    function g() {
        let e;
        while(r._index < o.length){
            let t = o[r._index];
            if (typeof t == `string`) {
                e = r._index;
                if (r._bufferIndex < 0) {
                    r._bufferIndex = 0;
                }
                while(r._index === e && r._bufferIndex < t.length){
                    _(t.charCodeAt(r._bufferIndex));
                }
            } else {
                _(t);
            }
        }
    }
    function _(e) {
        u = u(e);
    }
    function consume(e) {
        if (H(e)) {
            r.line++;
            r.column = 1;
            r.offset += e === -3 ? 2 : 1;
            E();
        } else if (e !== -1) {
            r.column++;
            r.offset++;
        }
        if (r._bufferIndex < 0) {
            r._index++;
        } else {
            r._bufferIndex++;
            if (r._bufferIndex === o[r._index].length) {
                r._bufferIndex = -1;
                r._index++;
            }
        }
        l.previous = e;
    }
    function enter(e, t) {
        let n = t || {};
        n.type = e;
        n.start = now();
        l.events.push([
            `enter`,
            n,
            l
        ]);
        s.push(n);
        return n;
    }
    function b(e) {
        let t = s.pop();
        t.end = now();
        l.events.push([
            `exit`,
            t,
            l
        ]);
        return t;
    }
    function x(e, t) {
        w(e, t.from);
    }
    function S(e, t) {
        t.restore();
    }
    function C(e, t) {
        return n;
        function n(n, r, i) {
            let a;
            let o;
            let s;
            let u;
            if (Array.isArray(n)) {
                return f(n);
            }
            if (`tokenize` in n) {
                return f([
                    n
                ]);
            }
            return d(n);
            function d(e) {
                return t;
                function t(t) {
                    let n = t !== null && e[t];
                    let r = t !== null && e.null;
                    return f([
                        ...Array.isArray(n) ? n : n ? [
                            n
                        ] : [],
                        ...Array.isArray(r) ? r : r ? [
                            r
                        ] : []
                    ])(t);
                }
            }
            function f(e) {
                a = e;
                o = 0;
                if (e.length === 0) {
                    return i;
                }
                return p(e[o]);
            }
            function p(e) {
                return n;
                function n(n) {
                    u = T();
                    s = e;
                    if (!e.partial) {
                        l.currentConstruct = e;
                    }
                    if (e.name && l.parser.constructs.disable.null.includes(e.name)) {
                        return h(n);
                    }
                    return e.tokenize.call(t ? Object.assign(Object.create(l), t) : l, c, m, h)(n);
                }
            }
            function m(t) {
                e(s, u);
                return r;
            }
            function h(e) {
                u.restore();
                if (++o < a.length) {
                    return p(a[o]);
                }
                return i;
            }
        }
    }
    function w(e, t) {
        if (e.resolveAll && !a.includes(e)) {
            a.push(e);
        }
        if (e.resolve) {
            L(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l));
        }
        if (e.resolveTo) {
            l.events = e.resolveTo(l.events, l);
        }
    }
    function T() {
        let e = now();
        let l_previous = l.previous;
        let l_currentConstruct = l.currentConstruct;
        let length = l.events.length;
        let a = Array.from(s);
        return {
            from: length,
            restore
        };
        function restore() {
            r = e;
            l.previous = l_previous;
            l.currentConstruct = l_currentConstruct;
            l.events.length = length;
            s = a;
            E();
        }
    }
    function E() {
        if (r.line in i && r.column < 2) {
            r.column = i[r.line];
            r.offset += i[r.line] - 1;
        }
    }
}
function Or(e, t) {
    let _index = t.start._index;
    let _bufferIndex = t.start._bufferIndex;
    let _index_1 = t.end._index;
    let _bufferIndex_1 = t.end._bufferIndex;
    let o;
    if (_index === _index_1) {
        o = [
            e[_index].slice(_bufferIndex, _bufferIndex_1)
        ];
    } else {
        o = e.slice(_index, _index_1);
        if (_bufferIndex > -1) {
            let e = o[0];
            if (typeof e == `string`) {
                o[0] = e.slice(_bufferIndex);
            } else {
                o.shift();
            }
        }
        if (_bufferIndex_1 > 0) {
            o.push(e[_index_1].slice(0, _bufferIndex_1));
        }
    }
    return o;
}
function kr(e, t) {
    let n = -1;
    let r = [];
    let i;
    while(++n < e.length){
        let a = e[n];
        let o;
        if (typeof a == `string`) {
            o = a;
        } else {
            switch(a){
                case -5:
                    o = `\r`;
                    break;
                case -4:
                    o = `
`;
                    break;
                case -3:
                    o = `\r
`;
                    break;
                case -2:
                    o = t ? ` ` : `	`;
                    break;
                case -1:
                    if (!t && i) {
                        continue;
                    }
                    o = ` `;
                    break;
                default:
                    o = String.fromCharCode(a);
            }
        }
        i = a === -2;
        r.push(o);
    }
    return r.join(``);
}
function Ar(e) {
    let t = {
        constructs: ct([
            _r,
            ...(e || {}).extensions || []
        ]),
        content: n(yt),
        defined: [],
        document: n(xt),
        flow: n(lr),
        lazy: {},
        string: n(fr),
        text: n(pr)
    };
    return t;
    function n(e) {
        return n;
        function n(n) {
            return Dr(t, e, n);
        }
    }
}
function jr(e) {
    while(!rn(e));
    return e;
}
const Pr = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Fr(e) {
    return e.replace(Pr, Ir);
}
function Ir(e, t, n) {
    if (t) {
        return t;
    }
    if (n.charCodeAt(0) === 35) {
        let e = n.charCodeAt(1);
        let t = e === 120 || e === 88;
        return dt(n.slice(t ? 2 : 1), t ? 16 : 10);
    }
    return ot(n) || e;
}
const hasOwnProperty_1 = {}.hasOwnProperty;
function Rr(e, t, n) {
    if (t && typeof t == `object`) {
        n = t;
        t = undefined;
    }
    return zr(n)(jr(Ar(n).document().write(Nr()(e, t, true))));
}
function zr(e) {
    let config = {
        transforms: [],
        canContainEols: [
            `emphasis`,
            `fragment`,
            `heading`,
            `paragraph`,
            `strong`
        ],
        enter: {
            autolink: a(ye),
            autolinkProtocol: T,
            autolinkEmail: T,
            atxHeading: a(he),
            blockQuote: a(ue),
            characterEscape: T,
            characterReference: T,
            codeFenced: a(de),
            codeFencedFenceInfo: o,
            codeFencedFenceMeta: o,
            codeIndented: a(de, o),
            codeText: a(fe, o),
            codeTextData: T,
            data: T,
            codeFlowValue: T,
            definition: a(pe),
            definitionDestinationString: o,
            definitionLabelString: o,
            definitionTitleString: o,
            emphasis: a(me),
            hardBreakEscape: a(ge),
            hardBreakTrailing: a(ge),
            htmlFlow: a(_e, o),
            htmlFlowData: T,
            htmlText: a(_e, o),
            htmlTextData: T,
            image: a(ve),
            label: o,
            link: a(ye),
            listItem: a(Se),
            listItemValue,
            listOrdered: a(be, d),
            listUnordered: a(be),
            paragraph: a(Ce),
            reference,
            referenceString: o,
            resourceDestinationString: o,
            resourceTitleString: o,
            setextHeading: a(he),
            strong: a(we),
            thematicBreak: a(Te)
        },
        exit: {
            atxHeading: c(),
            atxHeadingSequence,
            autolink: c(),
            autolinkEmail,
            autolinkProtocol,
            blockQuote: c(),
            characterEscapeValue: E,
            characterReferenceMarkerHexadecimal: ae,
            characterReferenceMarkerNumeric: ae,
            characterReferenceValue,
            characterReference,
            codeFenced: c(g),
            codeFencedFence,
            codeFencedFenceInfo,
            codeFencedFenceMeta,
            codeFlowValue: E,
            codeIndented: c(_),
            codeText: c(ee),
            codeTextData: E,
            data: E,
            definition: c(),
            definitionDestinationString,
            definitionLabelString,
            definitionTitleString,
            emphasis: c(),
            hardBreakEscape: c(O),
            hardBreakTrailing: c(O),
            htmlFlow: c(k),
            htmlFlowData: E,
            htmlText: c(A),
            htmlTextData: E,
            image: c(M),
            label,
            labelText,
            lineEnding,
            link: c(j),
            listItem: c(),
            listOrdered: c(),
            listUnordered: c(),
            paragraph: c(),
            referenceString,
            resourceDestinationString,
            resourceTitleString,
            resource,
            setextHeading: c(w),
            setextHeadingLineSequence,
            setextHeadingText,
            strong: c(),
            thematicBreak: c()
        }
    };
    Br(config, (e || {}).mdastExtensions || []);
    let data = {};
    return r;
    function r(e) {
        let r = {
            type: `root`,
            children: []
        };
        let a = {
            stack: [
                r
            ],
            tokenStack: [],
            config,
            enter,
            exit: l,
            buffer: o,
            resume,
            data
        };
        let c = [];
        let d = -1;
        while(++d < e.length){
            if (e[d][1].type === `listOrdered` || e[d][1].type === `listUnordered`) {
                if (e[d][0] === `enter`) {
                    c.push(d);
                } else {
                    d = i(e, c.pop(), d);
                }
            }
        }
        for(d = -1; ++d < e.length;){
            let n = config[e[d][0]];
            if (hasOwnProperty_1.call(n, e[d][1].type)) {
                n[e[d][1].type].call({
                    sliceSerialize: e[d][2].sliceSerialize,
                    ...a
                }, e[d][1]);
            }
        }
        if (a.tokenStack.length > 0) {
            let e = a.tokenStack[a.tokenStack.length - 1];
            (e[1] || Hr).call(a, undefined, e[0]);
        }
        r.position = {
            start: Y(e.length > 0 ? e[0][1].start : {
                line: 1,
                column: 1,
                offset: 0
            }),
            end: Y(e.length > 0 ? e[e.length - 2][1].end : {
                line: 1,
                column: 1,
                offset: 0
            })
        };
        for(d = -1; ++d < config.transforms.length;){
            r = config.transforms[d](r) || r;
        }
        return r;
    }
    function i(e, t, n) {
        let r = t - 1;
        let i = -1;
        let a = false;
        let o;
        let s;
        let c;
        let l;
        while(++r <= n){
            let t = e[r];
            switch(t[1].type){
                case `listUnordered`:
                case `listOrdered`:
                case `blockQuote`:
                    if (t[0] === `enter`) {
                        i++;
                    } else {
                        i--;
                    }
                    l = undefined;
                    break;
                case `lineEndingBlank`:
                    if (t[0] === `enter`) {
                        if (o && !l && !i && !c) {
                            c = r;
                        }
                        l = undefined;
                    }
                    break;
                case `linePrefix`:
                case `listItemValue`:
                case `listItemMarker`:
                case `listItemPrefix`:
                case `listItemPrefixWhitespace`:
                    break;
                default:
                    l = undefined;
            }
            if (!i && t[0] === `enter` && t[1].type === `listItemPrefix` || i === -1 && t[0] === `exit` && (t[1].type === `listUnordered` || t[1].type === `listOrdered`)) {
                if (o) {
                    let i = r;
                    for(s = undefined; i--;){
                        let t = e[i];
                        if (t[1].type === `lineEnding` || t[1].type === `lineEndingBlank`) {
                            if (t[0] === `exit`) {
                                continue;
                            }
                            if (s) {
                                e[s][1].type = `lineEndingBlank`;
                                a = true;
                            }
                            t[1].type = `lineEnding`;
                            s = i;
                        } else if (!(t[1].type === `linePrefix` || t[1].type === `blockQuotePrefix` || t[1].type === `blockQuotePrefixWhitespace` || t[1].type === `blockQuoteMarker` || t[1].type === `listItemIndent`)) {
                            break;
                        }
                    }
                    if (c && (!s || c < s)) {
                        o._spread = true;
                    }
                    o.end = {
                        ...s ? e[s][1].start : t[1].end
                    };
                    e.splice(s || r, 0, [
                        `exit`,
                        o,
                        t[2]
                    ]);
                    r++;
                    n++;
                }
                if (t[1].type === `listItemPrefix`) {
                    let i = {
                        type: `listItem`,
                        _spread: false,
                        start: {
                            ...t[1].start
                        },
                        end: undefined
                    };
                    o = i;
                    e.splice(r, 0, [
                        `enter`,
                        i,
                        t[2]
                    ]);
                    r++;
                    n++;
                    c = undefined;
                    l = true;
                }
            }
        }
        e[t][1]._spread = a;
        return n;
    }
    function a(e, t) {
        return n;
        function n(n) {
            enter.call(this, e(n), n);
            if (t) {
                t.call(this, n);
            }
        }
    }
    function o() {
        this.stack.push({
            type: `fragment`,
            children: []
        });
    }
    function enter(e, t, n) {
        this.stack[this.stack.length - 1].children.push(e);
        this.stack.push(e);
        this.tokenStack.push([
            t,
            n || undefined
        ]);
        e.position = {
            start: Y(t.start),
            end: undefined
        };
    }
    function c(e) {
        return t;
        function t(t) {
            if (e) {
                e.call(this, t);
            }
            l.call(this, t);
        }
    }
    function l(e, t) {
        let n = this.stack.pop();
        let r = this.tokenStack.pop();
        if (r) {
            if (r[0].type !== e.type) {
                if (t) {
                    t.call(this, e, r[0]);
                } else {
                    (r[1] || Hr).call(this, e, r[0]);
                }
            }
        } else {
            throw Error(`Cannot close \`${e.type}\` (${xe({
                start: e.start,
                end: e.end
            })}${`): it’s not open`}`);
        }
        n.position.end = Y(e.end);
    }
    function resume() {
        return tt(this.stack.pop());
    }
    function d() {
        this.data.expectingFirstListItemValue = true;
    }
    function listItemValue(e) {
        if (this.data.expectingFirstListItemValue) {
            let t = this.stack[this.stack.length - 2];
            t.start = Number.parseInt(this.sliceSerialize(e), 10);
            this.data.expectingFirstListItemValue = undefined;
        }
    }
    function codeFencedFenceInfo() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.lang = e;
    }
    function codeFencedFenceMeta() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.meta = e;
    }
    function codeFencedFence() {
        if (!this.data.flowCodeInside) {
            this.buffer();
            this.data.flowCodeInside = true;
        }
    }
    function g() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ``);
        this.data.flowCodeInside = undefined;
    }
    function _() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.value = e.replace(/(\r?\n|\r)$/g, ``);
    }
    function definitionLabelString(e) {
        let t = this.resume();
        let n = this.stack[this.stack.length - 1];
        n.label = t;
        n.identifier = z(this.sliceSerialize(e)).toLowerCase();
    }
    function definitionTitleString() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.title = e;
    }
    function definitionDestinationString() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.url = e;
    }
    function atxHeadingSequence(e) {
        let t = this.stack[this.stack.length - 1];
        t.depth ||= this.sliceSerialize(e).length;
    }
    function setextHeadingText() {
        this.data.setextHeadingSlurpLineEnding = true;
    }
    function setextHeadingLineSequence(e) {
        let t = this.stack[this.stack.length - 1];
        t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
    }
    function w() {
        this.data.setextHeadingSlurpLineEnding = undefined;
    }
    function T(e) {
        let children = this.stack[this.stack.length - 1].children;
        let n = children[children.length - 1];
        if (!n || n.type !== `text`) {
            n = I();
            n.position = {
                start: Y(e.start),
                end: undefined
            };
            children.push(n);
        }
        this.stack.push(n);
    }
    function E(e) {
        let t = this.stack.pop();
        t.value += this.sliceSerialize(e);
        t.position.end = Y(e.end);
    }
    function lineEnding(e) {
        let n = this.stack[this.stack.length - 1];
        if (this.data.atHardBreak) {
            let t = n.children[n.children.length - 1];
            t.position.end = Y(e.end);
            this.data.atHardBreak = undefined;
            return;
        }
        if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(n.type)) {
            T.call(this, e);
            E.call(this, e);
        }
    }
    function O() {
        this.data.atHardBreak = true;
    }
    function k() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.value = e;
    }
    function A() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.value = e;
    }
    function ee() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.value = e;
    }
    function j() {
        let e = this.stack[this.stack.length - 1];
        if (this.data.inReference) {
            let t = this.data.referenceType || `shortcut`;
            e.type += `Reference`;
            e.referenceType = t;
            delete e.url;
            delete e.title;
        } else {
            delete e.identifier;
            delete e.label;
        }
        this.data.referenceType = undefined;
    }
    function M() {
        let e = this.stack[this.stack.length - 1];
        if (this.data.inReference) {
            let t = this.data.referenceType || `shortcut`;
            e.type += `Reference`;
            e.referenceType = t;
            delete e.url;
            delete e.title;
        } else {
            delete e.identifier;
            delete e.label;
        }
        this.data.referenceType = undefined;
    }
    function labelText(e) {
        let t = this.sliceSerialize(e);
        let n = this.stack[this.stack.length - 2];
        n.label = Fr(t);
        n.identifier = z(t).toLowerCase();
    }
    function label() {
        let e = this.stack[this.stack.length - 1];
        let t = this.resume();
        let n = this.stack[this.stack.length - 1];
        this.data.inReference = true;
        if (n.type === `link`) {
            n.children = e.children;
        } else {
            n.alt = t;
        }
    }
    function resourceDestinationString() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.url = e;
    }
    function resourceTitleString() {
        let e = this.resume();
        let t = this.stack[this.stack.length - 1];
        t.title = e;
    }
    function resource() {
        this.data.inReference = undefined;
    }
    function reference() {
        this.data.referenceType = `collapsed`;
    }
    function referenceString(e) {
        let t = this.resume();
        let n = this.stack[this.stack.length - 1];
        n.label = t;
        n.identifier = z(this.sliceSerialize(e)).toLowerCase();
        this.data.referenceType = `full`;
    }
    function ae(e) {
        this.data.characterReferenceType = e.type;
    }
    function characterReferenceValue(e) {
        let t = this.sliceSerialize(e);
        let characterReferenceType = this.data.characterReferenceType;
        let r;
        if (characterReferenceType) {
            r = dt(t, characterReferenceType === `characterReferenceMarkerNumeric` ? 10 : 16);
            this.data.characterReferenceType = undefined;
        } else {
            r = ot(t);
        }
        let i = this.stack[this.stack.length - 1];
        i.value += r;
    }
    function characterReference(e) {
        let t = this.stack.pop();
        t.position.end = Y(e.end);
    }
    function autolinkProtocol(e) {
        E.call(this, e);
        let t = this.stack[this.stack.length - 1];
        t.url = this.sliceSerialize(e);
    }
    function autolinkEmail(e) {
        E.call(this, e);
        let t = this.stack[this.stack.length - 1];
        t.url = `mailto:` + this.sliceSerialize(e);
    }
    function ue() {
        return {
            type: `blockquote`,
            children: []
        };
    }
    function de() {
        return {
            type: `code`,
            lang: null,
            meta: null,
            value: ``
        };
    }
    function fe() {
        return {
            type: `inlineCode`,
            value: ``
        };
    }
    function pe() {
        return {
            type: `definition`,
            identifier: ``,
            label: null,
            title: null,
            url: ``
        };
    }
    function me() {
        return {
            type: `emphasis`,
            children: []
        };
    }
    function he() {
        return {
            type: `heading`,
            depth: 0,
            children: []
        };
    }
    function ge() {
        return {
            type: `break`
        };
    }
    function _e() {
        return {
            type: `html`,
            value: ``
        };
    }
    function ve() {
        return {
            type: `image`,
            title: null,
            url: ``,
            alt: null
        };
    }
    function ye() {
        return {
            type: `link`,
            title: null,
            url: ``,
            children: []
        };
    }
    function be(e) {
        return {
            type: `list`,
            ordered: e.type === `listOrdered`,
            start: null,
            spread: e._spread,
            children: []
        };
    }
    function Se(e) {
        return {
            type: `listItem`,
            spread: e._spread,
            checked: null,
            children: []
        };
    }
    function Ce() {
        return {
            type: `paragraph`,
            children: []
        };
    }
    function we() {
        return {
            type: `strong`,
            children: []
        };
    }
    function I() {
        return {
            type: `text`,
            value: ``
        };
    }
    function Te() {
        return {
            type: `thematicBreak`
        };
    }
}
function Y(e) {
    return {
        line: e.line,
        column: e.column,
        offset: e.offset
    };
}
function Br(e, t) {
    let n = -1;
    while(++n < t.length){
        let r = t[n];
        if (Array.isArray(r)) {
            Br(e, r);
        } else {
            Vr(e, r);
        }
    }
}
function Vr(e, t) {
    let n;
    for(n in t){
        if (hasOwnProperty_1.call(t, n)) {
            switch(n){
                case `canContainEols`:
                    {
                        let r = t[n];
                        if (r) {
                            e[n].push(...r);
                        }
                        break;
                    }
                case `transforms`:
                    {
                        let r = t[n];
                        if (r) {
                            e[n].push(...r);
                        }
                        break;
                    }
                case `enter`:
                case `exit`:
                    {
                        let r = t[n];
                        if (r) {
                            Object.assign(e[n], r);
                        }
                        break;
                    }
            }
        }
    }
}
function Hr(e, t) {
    throw Error(e ? `Cannot close \`${e.type}\` (${xe({
        start: e.start,
        end: e.end
    })}): a different token (\`${t.type}\`, ${xe({
        start: t.start,
        end: t.end
    })}${`) is open`}` : `Cannot close document, a token (\`${t.type}\`, ${xe({
        start: t.start,
        end: t.end
    })}${`) is still open`}`);
}
function Ur(e) {
    let t = this;
    t.parser = n;
    function n(n) {
        return Rr(n, {
            ...t.data(`settings`),
            ...e,
            extensions: t.data(`micromarkExtensions`) || [],
            mdastExtensions: t.data(`fromMarkdownExtensions`) || []
        });
    }
}
function Wr(e, t) {
    let n = {
        type: `element`,
        tagName: `blockquote`,
        properties: {},
        children: e.wrap(e.all(t), true)
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
function Gr(e, t) {
    let n = {
        type: `element`,
        tagName: `br`,
        properties: {},
        children: []
    };
    e.patch(t, n);
    return [
        e.applyData(t, n),
        {
            type: `text`,
            value: `
`
        }
    ];
}
function Kr(e, t) {
    let n = t.value ? t.value + `
` : ``;
    let r = {};
    let i = t.lang ? t.lang.split(/\s+/) : [];
    if (i.length > 0) {
        r.className = [
            `language-` + i[0]
        ];
    }
    let a = {
        type: `element`,
        tagName: `code`,
        properties: r,
        children: [
            {
                type: `text`,
                value: n
            }
        ]
    };
    if (t.meta) {
        a.data = {
            meta: t.meta
        };
    }
    e.patch(t, a);
    a = e.applyData(t, a);
    a = {
        type: `element`,
        tagName: `pre`,
        properties: {},
        children: [
            a
        ]
    };
    e.patch(t, a);
    return a;
}
function qr(e, t) {
    let n = {
        type: `element`,
        tagName: `del`,
        properties: {},
        children: e.all(t)
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
function emphasis(e, t) {
    let n = {
        type: `element`,
        tagName: `em`,
        properties: {},
        children: e.all(t)
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
function footnoteReference(e, t) {
    let n = typeof e.options.clobberPrefix == `string` ? e.options.clobberPrefix : `user-content-`;
    let r = String(t.identifier).toUpperCase();
    let i = vt(r.toLowerCase());
    let a = e.footnoteOrder.indexOf(r);
    let o;
    let s = e.footnoteCounts.get(r);
    if (s === undefined) {
        s = 0;
        e.footnoteOrder.push(r);
        o = e.footnoteOrder.length;
    } else {
        o = a + 1;
    }
    s += 1;
    e.footnoteCounts.set(r, s);
    let c = {
        type: `element`,
        tagName: `a`,
        properties: {
            href: `#` + n + `fn-` + i,
            id: n + `fnref-` + i + (s > 1 ? `-` + s : ``),
            dataFootnoteRef: true,
            ariaDescribedBy: [
                `footnote-label`
            ]
        },
        children: [
            {
                type: `text`,
                value: String(o)
            }
        ]
    };
    e.patch(t, c);
    let l = {
        type: `element`,
        tagName: `sup`,
        properties: {},
        children: [
            c
        ]
    };
    e.patch(t, l);
    return e.applyData(t, l);
}
function Xr(e, t) {
    let n = {
        type: `element`,
        tagName: `h` + t.depth,
        properties: {},
        children: e.all(t)
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
function html(e, t) {
    if (e.options.allowDangerousHtml) {
        let n = {
            type: `raw`,
            value: t.value
        };
        e.patch(t, n);
        return e.applyData(t, n);
    }
}
function Qr(e, t) {
    let t_referenceType = t.referenceType;
    let r = `]`;
    if (t_referenceType === `collapsed`) {
        r += `[]`;
    } else if (t_referenceType === `full`) {
        r += `[` + (t.label || t.identifier) + `]`;
    }
    if (t.type === `imageReference`) {
        return [
            {
                type: `text`,
                value: `![` + t.alt + r
            }
        ];
    }
    let i = e.all(t);
    let a = i[0];
    if (a && a.type === `text`) {
        a.value = `[` + a.value;
    } else {
        i.unshift({
            type: `text`,
            value: `[`
        });
    }
    let o = i[i.length - 1];
    if (o && o.type === `text`) {
        o.value += r;
    } else {
        i.push({
            type: `text`,
            value: r
        });
    }
    return i;
}
function imageReference(e, t) {
    let n = String(t.identifier).toUpperCase();
    let r = e.definitionById.get(n);
    if (!r) {
        return Qr(e, t);
    }
    let i = {
        src: vt(r.url || ``),
        alt: t.alt
    };
    if (r.title !== null && r.title !== undefined) {
        i.title = r.title;
    }
    let a = {
        type: `element`,
        tagName: `img`,
        properties: i,
        children: []
    };
    e.patch(t, a);
    return e.applyData(t, a);
}
function image(e, t) {
    let n = {
        src: vt(t.url)
    };
    if (t.alt !== null && t.alt !== undefined) {
        n.alt = t.alt;
    }
    if (t.title !== null && t.title !== undefined) {
        n.title = t.title;
    }
    let r = {
        type: `element`,
        tagName: `img`,
        properties: n,
        children: []
    };
    e.patch(t, r);
    return e.applyData(t, r);
}
function ti(e, t) {
    let n = {
        type: `text`,
        value: t.value.replace(/\r?\n|\r/g, ` `)
    };
    e.patch(t, n);
    let r = {
        type: `element`,
        tagName: `code`,
        properties: {},
        children: [
            n
        ]
    };
    e.patch(t, r);
    return e.applyData(t, r);
}
function linkReference(e, t) {
    let n = String(t.identifier).toUpperCase();
    let r = e.definitionById.get(n);
    if (!r) {
        return Qr(e, t);
    }
    let i = {
        href: vt(r.url || ``)
    };
    if (r.title !== null && r.title !== undefined) {
        i.title = r.title;
    }
    let a = {
        type: `element`,
        tagName: `a`,
        properties: i,
        children: e.all(t)
    };
    e.patch(t, a);
    return e.applyData(t, a);
}
function link(e, t) {
    let n = {
        href: vt(t.url)
    };
    if (t.title !== null && t.title !== undefined) {
        n.title = t.title;
    }
    let r = {
        type: `element`,
        tagName: `a`,
        properties: n,
        children: e.all(t)
    };
    e.patch(t, r);
    return e.applyData(t, r);
}
function ii(e, t, n) {
    let r = e.all(t);
    let i = n ? ai(n) : oi(t);
    let a = {};
    let o = [];
    if (typeof t.checked == `boolean`) {
        let e = r[0];
        let n;
        if (e && e.type === `element` && e.tagName === `p`) {
            n = e;
        } else {
            n = {
                type: `element`,
                tagName: `p`,
                properties: {},
                children: []
            };
            r.unshift(n);
        }
        if (n.children.length > 0) {
            n.children.unshift({
                type: `text`,
                value: ` `
            });
        }
        n.children.unshift({
            type: `element`,
            tagName: `input`,
            properties: {
                type: `checkbox`,
                checked: t.checked,
                disabled: true
            },
            children: []
        });
        a.className = [
            `task-list-item`
        ];
    }
    let s = -1;
    while(++s < r.length){
        let e = r[s];
        if (i || s !== 0 || e.type !== `element` || e.tagName !== `p`) {
            o.push({
                type: `text`,
                value: `
`
            });
        }
        if (e.type === `element` && e.tagName === `p` && !i) {
            o.push(...e.children);
        } else {
            o.push(e);
        }
    }
    let c = r[r.length - 1];
    if (c && (i || c.type !== `element` || c.tagName !== `p`)) {
        o.push({
            type: `text`,
            value: `
`
        });
    }
    let l = {
        type: `element`,
        tagName: `li`,
        properties: a,
        children: o
    };
    e.patch(t, l);
    return e.applyData(t, l);
}
function ai(e) {
    let t = false;
    if (e.type === `list`) {
        t = e.spread || false;
        let n = e.children;
        let r = -1;
        while(!t && ++r < n.length){
            t = oi(n[r]);
        }
    }
    return t;
}
function oi(e) {
    return e.spread ?? e.children.length > 1;
}
function si(e, t) {
    let n = {};
    let r = e.all(t);
    let i = -1;
    for(typeof t.start == `number` && t.start !== 1 && (n.start = t.start); ++i < r.length;){
        let e = r[i];
        if (e.type === `element` && e.tagName === `li` && e.properties && Array.isArray(e.properties.className) && e.properties.className.includes(`task-list-item`)) {
            n.className = [
                `contains-task-list`
            ];
            break;
        }
    }
    let a = {
        type: `element`,
        tagName: t.ordered ? `ol` : `ul`,
        properties: n,
        children: e.wrap(r, true)
    };
    e.patch(t, a);
    return e.applyData(t, a);
}
function ci(e, t) {
    let n = {
        type: `element`,
        tagName: `p`,
        properties: {},
        children: e.all(t)
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
function li(e, t) {
    let n = {
        type: `root`,
        children: e.wrap(e.all(t))
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
function strong(e, t) {
    let n = {
        type: `element`,
        tagName: `strong`,
        properties: {},
        children: e.all(t)
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
function di(e, t) {
    let n = e.all(t);
    let r = n.shift();
    let i = [];
    if (r) {
        let n = {
            type: `element`,
            tagName: `thead`,
            properties: {},
            children: e.wrap([
                r
            ], true)
        };
        e.patch(t.children[0], n);
        i.push(n);
    }
    if (n.length > 0) {
        let r = {
            type: `element`,
            tagName: `tbody`,
            properties: {},
            children: e.wrap(n, true)
        };
        let a = ve(t.children[1]);
        let o = _e(t.children[t.children.length - 1]);
        if (a && o) {
            r.position = {
                start: a,
                end: o
            };
        }
        i.push(r);
    }
    let a = {
        type: `element`,
        tagName: `table`,
        properties: {},
        children: e.wrap(i, true)
    };
    e.patch(t, a);
    return e.applyData(t, a);
}
function fi(e, t, n) {
    let r = n ? n.children : undefined;
    let i = (r ? r.indexOf(t) : 1) === 0 ? `th` : `td`;
    let a = n && n.type === `table` ? n.align : undefined;
    let o = a ? a.length : t.children.length;
    let s = -1;
    let c = [];
    while(++s < o){
        let n = t.children[s];
        let r = {};
        let o = a ? a[s] : undefined;
        if (o) {
            r.align = o;
        }
        let l = {
            type: `element`,
            tagName: i,
            properties: r,
            children: []
        };
        if (n) {
            l.children = e.all(n);
            e.patch(n, l);
            l = e.applyData(n, l);
        }
        c.push(l);
    }
    let l = {
        type: `element`,
        tagName: `tr`,
        properties: {},
        children: e.wrap(c, true)
    };
    e.patch(t, l);
    return e.applyData(t, l);
}
function tableCell(e, t) {
    let n = {
        type: `element`,
        tagName: `td`,
        properties: {},
        children: e.all(t)
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
function yi(e, t) {
    let n = {
        type: `element`,
        tagName: `hr`,
        properties: {},
        children: []
    };
    e.patch(t, n);
    return e.applyData(t, n);
}
const bi = {
    blockquote: Wr,
    break: Gr,
    code: Kr,
    delete: qr,
    emphasis,
    footnoteReference,
    heading: Xr,
    html,
    imageReference,
    image,
    inlineCode: ti,
    linkReference,
    link,
    listItem: ii,
    list: si,
    paragraph: ci,
    root: li,
    strong,
    table: di,
    tableCell,
    tableRow: fi,
    text: vi,
    thematicBreak: yi,
    toml: xi,
    yaml: xi,
    definition: xi,
    footnoteDefinition: xi
};
function xi() {}
const Si = typeof self == `object` ? self : globalThis;
const Ci = (e, t)=>{
    let n = (t, n)=>{
        e.set(n, t);
        return t;
    };
    let r = (i)=>{
        if (e.has(i)) {
            return e.get(i);
        }
        let [a, o] = t[i];
        switch(a){
            case 0:
            case -1:
                return n(o, i);
            case 1:
                {
                    let e = n([], i);
                    for (let t of o){
                        e.push(r(t));
                    }
                    return e;
                }
            case 2:
                {
                    let e = n({}, i);
                    for (let [t, n] of o){
                        e[r(t)] = r(n);
                    }
                    return e;
                }
            case 3:
                return n(new Date(o), i);
            case 4:
                {
                    let { source, flags } = o;
                    return n(new RegExp(source, flags), i);
                }
            case 5:
                {
                    let e = n(new Map, i);
                    for (let [t, n] of o){
                        e.set(r(t), r(n));
                    }
                    return e;
                }
            case 6:
                {
                    let e = n(new Set, i);
                    for (let t of o){
                        e.add(r(t));
                    }
                    return e;
                }
            case 7:
                {
                    let { name, message } = o;
                    return n(new Si[name](message), i);
                }
            case 8:
                return n(BigInt(o), i);
            case `BigInt`:
                return n(Object(BigInt(o)), i);
            case `ArrayBuffer`:
                return n(new Uint8Array(o).buffer, o);
            case `DataView`:
                {
                    let { buffer } = new Uint8Array(o);
                    return n(new DataView(buffer), o);
                }
        }
        return n(new Si[a](o), i);
    };
    return r;
};
const wi = (e)=>Ci(new Map, e)(0);
const Ti = ``;
const { toString } = {};
const { keys } = Object;
const Oi = (e)=>{
    let t = typeof e;
    if (t !== `object` || !e) {
        return [
            0,
            t
        ];
    }
    let n = toString.call(e).slice(8, -1);
    switch(n){
        case `Array`:
            return [
                1,
                Ti
            ];
        case `Object`:
            return [
                2,
                Ti
            ];
        case `Date`:
            return [
                3,
                Ti
            ];
        case `RegExp`:
            return [
                4,
                Ti
            ];
        case `Map`:
            return [
                5,
                Ti
            ];
        case `Set`:
            return [
                6,
                Ti
            ];
        case `DataView`:
            return [
                1,
                n
            ];
    }
    if (n.includes(`Array`)) {
        return [
            1,
            n
        ];
    }
    if (n.includes(`Error`)) {
        return [
            7,
            n
        ];
    }
    return [
        2,
        n
    ];
};
const ki = ([e, t])=>e === 0 && (t === `function` || t === `symbol`);
const Ai = (e, t, n, r)=>{
    let i = (e, t)=>{
        let i = r.push(e) - 1;
        n.set(t, i);
        return i;
    };
    let a = (r)=>{
        if (n.has(r)) {
            return n.get(r);
        }
        let [o, s] = Oi(r);
        switch(o){
            case 0:
                {
                    let t = r;
                    switch(s){
                        case `bigint`:
                            o = 8;
                            t = r.toString();
                            break;
                        case `function`:
                        case `symbol`:
                            if (e) {
                                throw TypeError(`unable to serialize ` + s);
                            }
                            t = null;
                            break;
                        case `undefined`:
                            return i([
                                -1
                            ], r);
                    }
                    return i([
                        o,
                        t
                    ], r);
                }
            case 1:
                {
                    if (s) {
                        let e = r;
                        if (s === `DataView`) {
                            e = new Uint8Array(r.buffer);
                        } else if (s === `ArrayBuffer`) {
                            e = new Uint8Array(r);
                        }
                        return i([
                            s,
                            [
                                ...e
                            ]
                        ], r);
                    }
                    let e = [];
                    let t = i([
                        o,
                        e
                    ], r);
                    for (let t of r){
                        e.push(a(t));
                    }
                    return t;
                }
            case 2:
                {
                    if (s) {
                        switch(s){
                            case `BigInt`:
                                return i([
                                    s,
                                    r.toString()
                                ], r);
                            case `Boolean`:
                            case `Number`:
                            case `String`:
                                return i([
                                    s,
                                    r.valueOf()
                                ], r);
                        }
                    }
                    if (t && `toJSON` in r) {
                        return a(r.toJSON());
                    }
                    let n = [];
                    let c = i([
                        o,
                        n
                    ], r);
                    for (let t of keys(r)){
                        if (e || !ki(Oi(r[t]))) {
                            n.push([
                                a(t),
                                a(r[t])
                            ]);
                        }
                    }
                    return c;
                }
            case 3:
                return i([
                    o,
                    r.toISOString()
                ], r);
            case 4:
                {
                    let { source, flags } = r;
                    return i([
                        o,
                        {
                            source,
                            flags
                        }
                    ], r);
                }
            case 5:
                {
                    let t = [];
                    let n = i([
                        o,
                        t
                    ], r);
                    for (let [n, i] of r){
                        if (e || !(ki(Oi(n)) || ki(Oi(i)))) {
                            t.push([
                                a(n),
                                a(i)
                            ]);
                        }
                    }
                    return n;
                }
            case 6:
                {
                    let t = [];
                    let n = i([
                        o,
                        t
                    ], r);
                    for (let n of r){
                        if (e || !ki(Oi(n))) {
                            t.push(a(n));
                        }
                    }
                    return n;
                }
        }
        let { message } = r;
        return i([
            o,
            {
                name: s,
                message
            }
        ], r);
    };
    return a;
};
const ji = (e, { json, lossy } = {})=>{
    let r = [];
    Ai(!(json || lossy), !!json, new Map, r)(e);
    return r;
};
const Mi = typeof structuredClone == `function` ? (e, t)=>{
    if (t && (`json` in t || `lossy` in t)) {
        return wi(ji(e, t));
    }
    return structuredClone(e);
} : (e, t)=>wi(ji(e, t));
function Ni(e, t) {
    let n = [
        {
            type: `text`,
            value: `↩`
        }
    ];
    if (t > 1) {
        n.push({
            type: `element`,
            tagName: `sup`,
            properties: {},
            children: [
                {
                    type: `text`,
                    value: String(t)
                }
            ]
        });
    }
    return n;
}
function Pi(e, t) {
    return `Back to reference ` + (e + 1) + (t > 1 ? `-` + t : ``);
}
function Fi(e) {
    let t = typeof e.options.clobberPrefix == `string` ? e.options.clobberPrefix : `user-content-`;
    let n = e.options.footnoteBackContent || Ni;
    let r = e.options.footnoteBackLabel || Pi;
    let i = e.options.footnoteLabel || `Footnotes`;
    let a = e.options.footnoteLabelTagName || `h2`;
    let o = e.options.footnoteLabelProperties || {
        className: [
            `sr-only`
        ]
    };
    let s = [];
    let c = -1;
    while(++c < e.footnoteOrder.length){
        let i = e.footnoteById.get(e.footnoteOrder[c]);
        if (!i) {
            continue;
        }
        let a = e.all(i);
        let o = String(i.identifier).toUpperCase();
        let l = vt(o.toLowerCase());
        let u = 0;
        let d = [];
        let f = e.footnoteCounts.get(o);
        while(f !== undefined && ++u <= f){
            if (d.length > 0) {
                d.push({
                    type: `text`,
                    value: ` `
                });
            }
            let e = typeof n == `string` ? n : n(c, u);
            if (typeof e == `string`) {
                e = {
                    type: `text`,
                    value: e
                };
            }
            d.push({
                type: `element`,
                tagName: `a`,
                properties: {
                    href: `#` + t + `fnref-` + l + (u > 1 ? `-` + u : ``),
                    dataFootnoteBackref: ``,
                    ariaLabel: typeof r == `string` ? r : r(c, u),
                    className: [
                        `data-footnote-backref`
                    ]
                },
                children: Array.isArray(e) ? e : [
                    e
                ]
            });
        }
        let p = a[a.length - 1];
        if (p && p.type === `element` && p.tagName === `p`) {
            let e = p.children[p.children.length - 1];
            if (e && e.type === `text`) {
                e.value += ` `;
            } else {
                p.children.push({
                    type: `text`,
                    value: ` `
                });
            }
            p.children.push(...d);
        } else {
            a.push(...d);
        }
        let m = {
            type: `element`,
            tagName: `li`,
            properties: {
                id: t + `fn-` + l
            },
            children: e.wrap(a, true)
        };
        e.patch(i, m);
        s.push(m);
    }
    if (s.length !== 0) {
        return {
            type: `element`,
            tagName: `section`,
            properties: {
                dataFootnotes: true,
                className: [
                    `footnotes`
                ]
            },
            children: [
                {
                    type: `element`,
                    tagName: a,
                    properties: {
                        ...Mi(o),
                        id: `footnote-label`
                    },
                    children: [
                        {
                            type: `text`,
                            value: i
                        }
                    ]
                },
                {
                    type: `text`,
                    value: `
`
                },
                {
                    type: `element`,
                    tagName: `ol`,
                    properties: {},
                    children: e.wrap(s, true)
                },
                {
                    type: `text`,
                    value: `
`
                }
            ]
        };
    }
}
var Ii = (e)=>{
    if (e == null) {
        return Vi;
    }
    if (typeof e == `function`) {
        return Bi(e);
    }
    if (typeof e == `object`) {
        if (Array.isArray(e)) {
            return Li(e);
        }
        return Ri(e);
    }
    if (typeof e == `string`) {
        return zi(e);
    }
    throw Error(`Expected function, string, or object as test`);
};
function Li(e) {
    let t = [];
    let n = -1;
    while(++n < e.length){
        t[n] = Ii(e[n]);
    }
    return Bi(r);
    function r(...e) {
        let n = -1;
        while(++n < t.length){
            if (t[n].apply(this, e)) {
                return true;
            }
        }
        return false;
    }
}
function Ri(e) {
    let t = e;
    return Bi(n);
    function n(n) {
        let r = n;
        let i;
        for(i in e){
            if (r[i] !== t[i]) {
                return false;
            }
        }
        return true;
    }
}
function zi(e) {
    return Bi(t);
    function t(t) {
        return t && t.type === e;
    }
}
function Vi() {
    return true;
}
function Ui(e) {
    return e;
}
const Wi = [];
function Gi(e, t, n, r) {
    let i;
    if (typeof t == `function` && typeof n != `function`) {
        r = n;
        n = t;
    } else {
        i = t;
    }
    let a = Ii(i);
    let o = r ? -1 : 1;
    s(e, undefined, [])();
    function s(e, i, c) {
        let l = e && typeof e == `object` ? e : {};
        if (typeof l.type == `string`) {
            let t = typeof l.tagName == `string` ? l.tagName : typeof l.name == `string` ? l.name : undefined;
            Object.defineProperty(u, "name", {
                value: `node (` + Ui(e.type + (t ? `<` + t + `>` : ``)) + `)`
            });
        }
        return u;
        function u() {
            let l = Wi;
            let u;
            let d;
            let f;
            if ((!t || a(e, i, c[c.length - 1] || undefined)) && (l = Ki(n(e, c)), l[0] === false)) {
                return l;
            }
            if (`children` in e && e.children) {
                let t = e;
                if (t.children && l[0] !== `skip`) {
                    d = (r ? t.children.length : -1) + o;
                    for(f = c.concat(t); d > -1 && d < t.children.length;){
                        let e = t.children[d];
                        u = s(e, d, f)();
                        if (u[0] === false) {
                            return u;
                        }
                        d = typeof u[1] == `number` ? u[1] : d + o;
                    }
                }
            }
            return l;
        }
    }
}
function Ki(e) {
    if (Array.isArray(e)) {
        return e;
    }
    if (typeof e == `number`) {
        return [
            true,
            e
        ];
    }
    if (e == null) {
        return Wi;
    }
    return [
        e
    ];
}
function qi(e, t, n, r) {
    let i;
    let a;
    let o;
    if (typeof t == `function` && typeof n != `function`) {
        a = undefined;
        o = t;
        i = n;
    } else {
        a = t;
        o = n;
        i = r;
    }
    Gi(e, a, s, i);
    function s(e, t) {
        let n = t[t.length - 1];
        let r = n ? n.children.indexOf(e) : undefined;
        return o(e, r, n);
    }
}
const hasOwnProperty_2 = {}.hasOwnProperty;
const Yi = {};
function Xi(e, t) {
    let options = t || Yi;
    let definitionById = new Map;
    let footnoteById = new Map;
    let a = {
        all,
        applyData,
        definitionById,
        footnoteById,
        footnoteCounts: new Map,
        footnoteOrder: [],
        handlers: {
            ...bi,
            ...options.handlers
        },
        one,
        options,
        patch,
        wrap
    };
    qi(e, function(e) {
        if (e.type === `definition` || e.type === `footnoteDefinition`) {
            let t = e.type === `definition` ? definitionById : footnoteById;
            let n = String(e.identifier).toUpperCase();
            if (!t.has(n)) {
                t.set(n, e);
            }
        }
    });
    return a;
    function one(e, t) {
        let e_type = e.type;
        let r = a.handlers[e_type];
        if (hasOwnProperty_2.call(a.handlers, e_type) && r) {
            return r(a, e, t);
        }
        if (a.options.passThrough && a.options.passThrough.includes(e_type)) {
            if (`children` in e) {
                let { children, ...rest } = e;
                let r = Mi(rest);
                r.children = a.all(e);
                return r;
            }
            return Mi(e);
        }
        return (a.options.unknownHandler || $i)(a, e, t);
    }
    function all(e) {
        let t = [];
        if (`children` in e) {
            let n = e.children;
            let r = -1;
            while(++r < n.length){
                let i = a.one(n[r], e);
                if (i) {
                    if (r && n[r - 1].type === `break` && (!Array.isArray(i) && i.type === `text` && (i.value = ta(i.value)), !Array.isArray(i) && i.type === `element`)) {
                        let e = i.children[0];
                        if (e && e.type === `text`) {
                            e.value = ta(e.value);
                        }
                    }
                    if (Array.isArray(i)) {
                        t.push(...i);
                    } else {
                        t.push(i);
                    }
                }
            }
        }
        return t;
    }
}
function patch(e, t) {
    if (e.position) {
        t.position = be(e);
    }
}
function applyData(e, t) {
    let n = t;
    if (e && e.data) {
        let t = e.data.hName;
        let r = e.data.hChildren;
        let i = e.data.hProperties;
        if (typeof t == `string`) {
            if (n.type === `element`) {
                n.tagName = t;
            } else {
                n = {
                    type: `element`,
                    tagName: t,
                    properties: {},
                    children: `children` in n ? n.children : [
                        n
                    ]
                };
            }
        }
        if (n.type === `element` && i) {
            Object.assign(n.properties, Mi(i));
        }
        if (`children` in n && n.children && r != null) {
            n.children = r;
        }
    }
    return n;
}
function $i(e, t) {
    let n = t.data || {};
    let r = `value` in t && !(hasOwnProperty_2.call(n, `hProperties`) || hasOwnProperty_2.call(n, `hChildren`)) ? {
        type: `text`,
        value: t.value
    } : {
        type: `element`,
        tagName: `div`,
        properties: {},
        children: e.all(t)
    };
    e.patch(t, r);
    return e.applyData(t, r);
}
function wrap(e, t) {
    let n = [];
    let r = -1;
    for(t && n.push({
        type: `text`,
        value: `
`
    }); ++r < e.length;){
        if (r) {
            n.push({
                type: `text`,
                value: `
`
            });
        }
        n.push(e[r]);
    }
    if (t && e.length > 0) {
        n.push({
            type: `text`,
            value: `
`
        });
    }
    return n;
}
function ta(e) {
    let t = 0;
    let n = e.charCodeAt(t);
    while(n === 9 || n === 32){
        t++;
        n = e.charCodeAt(t);
    }
    return e.slice(t);
}
function na(e, t) {
    let n = Xi(e, t);
    let r = n.one(e, undefined);
    let i = Fi(n);
    let a = Array.isArray(r) ? {
        type: `root`,
        children: r
    } : r || {
        type: `root`,
        children: []
    };
    if (i) {
        `children` in a;
        a.children.push({
            type: `text`,
            value: `
`
        }, i);
    }
    return a;
}
function ra(e, t) {
    if (e && `run` in e) {
        return async (n, file)=>{
            let i = na(n, {
                file,
                ...t
            });
            await e.run(i, file);
        };
    }
    return function(n, file) {
        return na(n, {
            file,
            ...e || t
        });
    };
}
function ia(e) {
    if (e) {
        throw e;
    }
}
const aa = s_1(r((e, t)=>{
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var toString = Object.prototype.toString;
    var Object_defineProperty = Object.defineProperty;
    var Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var o = (e)=>{
        if (typeof Array.isArray == `function`) {
            return Array.isArray(e);
        }
        return toString.call(e) === `[object Array]`;
    };
    var s = (e)=>{
        if (!e || toString.call(e) !== `[object Object]`) {
            return false;
        }
        const t = hasOwnProperty.call(e, `constructor`);
        const i = e.constructor && e.constructor.prototype && hasOwnProperty.call(e.constructor.prototype, `isPrototypeOf`);
        if (e.constructor && !t && !i) {
            return false;
        }
        for(var a in e);
        return a === undefined || hasOwnProperty.call(e, a);
    };
    var c = (e, t)=>{
        if (Object_defineProperty && t.name === `__proto__`) {
            Object_defineProperty(e, t.name, {
                enumerable: true,
                configurable: true,
                value: t.newValue,
                writable: true
            });
        } else {
            e[t.name] = t.newValue;
        }
    };
    var l = (e, t)=>{
        if (t === `__proto__`) {
            if (!hasOwnProperty.call(e, t)) {
                return;
            }
            if (Object_getOwnPropertyDescriptor) {
                return Object_getOwnPropertyDescriptor(e, t).value;
            }
        }
        return e[t];
    };
    t.exports = function e(d) {
        let t;
        let n;
        let r;
        let newValue;
        let a;
        let u;
        let f = 1;
        const arguments_length = arguments.length;
        let m = false;
        if (typeof d == `boolean`) {
            m = d;
            d = arguments[1] || {};
            f = 2;
        }
        if (d == null || typeof d != `object` && typeof d != `function`) {
            d = {};
        }
        for(; f < arguments_length; ++f){
            t = arguments[f];
            if (t != null) {
                for(n in t){
                    r = l(d, n);
                    newValue = l(t, n);
                    if (d !== newValue) {
                        if (m && newValue && (s(newValue) || (a = o(newValue)))) {
                            if (a) {
                                a = false;
                                u = r && o(r) ? r : [];
                            } else {
                                u = r && s(r) ? r : {};
                            }
                            c(d, {
                                name: n,
                                newValue: e(m, u, newValue)
                            });
                        } else if (newValue !== undefined) {
                            c(d, {
                                name: n,
                                newValue
                            });
                        }
                    }
                }
            }
        }
        return d;
    };
})(), 1);
function oa(e) {
    if (typeof e != `object` || !e) {
        return false;
    }
    let t = Object.getPrototypeOf(e);
    return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function sa() {
    let e = [];
    let t = {
        run,
        use
    };
    return t;
    function run(...t) {
        let n = -1;
        let r = t.pop();
        if (typeof r != `function`) {
            throw TypeError(`Expected function as last argument, not ` + r);
        }
        i(null, ...t);
        function i(a, ...o) {
            let s = e[++n];
            let c = -1;
            if (a) {
                r(a);
                return;
            }
            while(++c < t.length){
                if (o[c] === null || o[c] === undefined) {
                    o[c] = t[c];
                }
            }
            t = o;
            if (s) {
                ca(s, i)(...o);
            } else {
                r(null, ...o);
            }
        }
    }
    function use(n) {
        if (typeof n != `function`) {
            throw TypeError(`Expected \`middelware\` to be a function, not ${n}`);
        }
        e.push(n);
        return t;
    }
}
function ca(e, t) {
    let n;
    return r;
    function r(...t) {
        let r = e.length > t.length;
        let o;
        if (r) {
            t.push(i);
        }
        try {
            o = e.apply(this, t);
        } catch (error) {
            let t = error;
            if (r && n) {
                throw t;
            }
            return i(t);
        }
        if (!r) {
            if (o && o.then && typeof o.then == `function`) {
                o.then(a, i);
            } else if (o instanceof Error) {
                i(o);
            } else {
                a(o);
            }
        }
    }
    function i(e, ...r) {
        if (!n) {
            n = true;
            t(e, ...r);
        }
    }
    function a(e) {
        i(null, e);
    }
}
const X = {
    basename,
    dirname,
    extname,
    join,
    sep: `/`
};
function basename(e, t) {
    if (t !== undefined && typeof t != `string`) {
        throw TypeError(`"ext" argument must be a string`);
    }
    ha(e);
    let n = 0;
    let r = -1;
    let e_length = e.length;
    let a;
    if (t === undefined || t.length === 0 || t.length > e.length) {
        while(e_length--){
            if (e.codePointAt(e_length) === 47) {
                if (a) {
                    n = e_length + 1;
                    break;
                }
            } else {
                if (r < 0) {
                    a = true;
                    r = e_length + 1;
                }
            }
        }
        if (r < 0) {
            return ``;
        }
        return e.slice(n, r);
    }
    if (t === e) {
        return ``;
    }
    let o = -1;
    let s = t.length - 1;
    while(e_length--){
        if (e.codePointAt(e_length) === 47) {
            if (a) {
                n = e_length + 1;
                break;
            }
        } else {
            if (o < 0) {
                a = true;
                o = e_length + 1;
            }
            if (s > -1) {
                if (e.codePointAt(e_length) === t.codePointAt(s--)) {
                    if (s < 0) {
                        r = e_length;
                    }
                } else {
                    s = -1;
                    r = o;
                }
            }
        }
    }
    if (n === r) {
        r = o;
    } else if (r < 0) {
        r = e.length;
    }
    return e.slice(n, r);
}
function dirname(e) {
    ha(e);
    if (e.length === 0) {
        return `.`;
    }
    let t = -1;
    let e_length = e.length;
    let r;
    while(--e_length){
        if (e.codePointAt(e_length) === 47) {
            if (r) {
                t = e_length;
                break;
            }
        } else {
            r ||= true;
        }
    }
    if (t < 0) {
        if (e.codePointAt(0) === 47) {
            return `/`;
        }
        return `.`;
    }
    if (t === 1 && e.codePointAt(0) === 47) {
        return `//`;
    }
    return e.slice(0, t);
}
function extname(e) {
    ha(e);
    let e_length = e.length;
    let n = -1;
    let r = 0;
    let i = -1;
    let a = 0;
    let o;
    while(e_length--){
        let s = e.codePointAt(e_length);
        if (s === 47) {
            if (o) {
                r = e_length + 1;
                break;
            }
            continue;
        }
        if (n < 0) {
            o = true;
            n = e_length + 1;
        }
        if (s === 46) {
            if (i < 0) {
                i = e_length;
            } else if (a !== 1) {
                a = 1;
            }
        } else if (i > -1) {
            a = -1;
        }
    }
    if (i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1) {
        return ``;
    }
    return e.slice(i, n);
}
function join(...e) {
    let t = -1;
    let n;
    while(++t < e.length){
        ha(e[t]);
        if (e[t]) {
            n = n === undefined ? e[t] : n + `/` + e[t];
        }
    }
    if (n === undefined) {
        return `.`;
    }
    return pa(n);
}
function pa(e) {
    ha(e);
    let t = e.codePointAt(0) === 47;
    let n = ma(e, !t);
    if (n.length === 0 && !t) {
        n = `.`;
    }
    if (n.length > 0 && e.codePointAt(e.length - 1) === 47) {
        n += `/`;
    }
    if (t) {
        return `/` + n;
    }
    return n;
}
function ma(e, t) {
    let n = ``;
    let r = 0;
    let i = -1;
    let a = 0;
    let o = -1;
    let s;
    let c;
    while(++o <= e.length){
        if (o < e.length) {
            s = e.codePointAt(o);
        } else if (s === 47) {
            break;
        } else {
            s = 47;
        }
        if (s === 47) {
            if (!(i === o - 1 || a === 1)) {
                if (i !== o - 1 && a === 2) {
                    if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
                        if (n.length > 2) {
                            c = n.lastIndexOf(`/`);
                            if (c !== n.length - 1) {
                                if (c < 0) {
                                    n = ``;
                                    r = 0;
                                } else {
                                    n = n.slice(0, c);
                                    r = n.length - 1 - n.lastIndexOf(`/`);
                                }
                                i = o;
                                a = 0;
                                continue;
                            }
                        } else if (n.length > 0) {
                            n = ``;
                            r = 0;
                            i = o;
                            a = 0;
                            continue;
                        }
                    }
                    if (t) {
                        n = n.length > 0 ? n + `/..` : `..`;
                        r = 2;
                    }
                } else {
                    if (n.length > 0) {
                        n += `/` + e.slice(i + 1, o);
                    } else {
                        n = e.slice(i + 1, o);
                    }
                    r = o - i - 1;
                }
            }
            i = o;
            a = 0;
        } else {
            if (s === 46 && a > -1) {
                a++;
            } else {
                a = -1;
            }
        }
    }
    return n;
}
function ha(e) {
    if (typeof e != `string`) {
        throw TypeError(`Path must be a string. Received ` + JSON.stringify(e));
    }
}
function va(e) {
    return !!(typeof e == `object` && e && `href` in e && e.href && `protocol` in e && e.protocol && e.auth === undefined);
}
function ya(e) {
    if (typeof e == `string`) {
        e = new URL(e);
    } else if (!va(e)) {
        let t = TypeError(`The "path" argument must be of type string or an instance of URL. Received \`${e}\``);
        t.code = `ERR_INVALID_ARG_TYPE`;
        throw t;
    }
    if (e.protocol !== `file:`) {
        let e = TypeError(`The URL must be of scheme file`);
        e.code = `ERR_INVALID_URL_SCHEME`;
        throw e;
    }
    return ba(e);
}
function ba(e) {
    if (e.hostname !== ``) {
        let e = TypeError(`File URL host must be "localhost" or empty on darwin`);
        e.code = `ERR_INVALID_FILE_URL_HOST`;
        throw e;
    }
    let e_pathname = e.pathname;
    let n = -1;
    while(++n < e_pathname.length){
        if (e_pathname.codePointAt(n) === 37 && e_pathname.codePointAt(n + 1) === 50) {
            let e = e_pathname.codePointAt(n + 2);
            if (e === 70 || e === 102) {
                let e = TypeError(`File URL path must not include encoded / characters`);
                e.code = `ERR_INVALID_FILE_URL_PATH`;
                throw e;
            }
        }
    }
    return decodeURIComponent(e_pathname);
}
const xa = [
    `history`,
    `path`,
    `basename`,
    `stem`,
    `extname`,
    `dirname`
];
class Sa {
    constructor(e){
        let t;
        t = e ? va(e) ? {
            path: e
        } : typeof e == `string` || Ea(e) ? {
            value: e
        } : e : {};
        this.cwd = `cwd` in t ? `` : ga.cwd();
        this.data = {};
        this.history = [];
        this.messages = [];
        this.value;
        this.map;
        this.result;
        this.stored;
        let n = -1;
        while(++n < xa.length){
            let e = xa[n];
            if (e in t && t[e] !== undefined && t[e] !== null) {
                this[e] = e === `history` ? [
                    ...t[e]
                ] : t[e];
            }
        }
        let r;
        for(r in t){
            if (!xa.includes(r)) {
                this[r] = t[r];
            }
        }
    }
    get basename() {
        if (typeof this.path == `string`) {
            return X.basename(this.path);
        }
    }
    set basename(e) {
        wa(e, `basename`);
        Ca(e, `basename`);
        this.path = X.join(this.dirname || ``, e);
    }
    get dirname() {
        if (typeof this.path == `string`) {
            return X.dirname(this.path);
        }
    }
    set dirname(e) {
        Ta(this.basename, `dirname`);
        this.path = X.join(e || ``, this.basename);
    }
    get extname() {
        if (typeof this.path == `string`) {
            return X.extname(this.path);
        }
    }
    set extname(e) {
        Ca(e, `extname`);
        Ta(this.dirname, `extname`);
        if (e) {
            if (e.codePointAt(0) !== 46) {
                throw Error("`extname` must start with `.`");
            }
            if (e.includes(`.`, 1)) {
                throw Error("`extname` cannot contain multiple dots");
            }
        }
        this.path = X.join(this.dirname, this.stem + (e || ``));
    }
    get path() {
        return this.history[this.history.length - 1];
    }
    set path(e) {
        if (va(e)) {
            e = ya(e);
        }
        wa(e, `path`);
        if (this.path !== e) {
            this.history.push(e);
        }
    }
    get stem() {
        if (typeof this.path == `string`) {
            return X.basename(this.path, this.extname);
        }
    }
    set stem(e) {
        wa(e, `stem`);
        Ca(e, `stem`);
        this.path = X.join(this.dirname || ``, e + (this.extname || ``));
    }
    fail(e, t, n) {
        let r = this.message(e, t, n);
        r.fatal = true;
        throw r;
    }
    info(e, t, n) {
        let r = this.message(e, t, n);
        r.fatal = undefined;
        return r;
    }
    message(e, t, n) {
        let r = new I(e, t, n);
        if (this.path) {
            r.name = this.path + `:` + r.name;
            r.file = this.path;
        }
        r.fatal = false;
        this.messages.push(r);
        return r;
    }
    toString(e) {
        if (this.value === undefined) {
            return ``;
        }
        if (typeof this.value == `string`) {
            return this.value;
        }
        return new TextDecoder(e || undefined).decode(this.value);
    }
}
function Ca(e, t) {
    if (e && e.includes(X.sep)) {
        throw Error(`\`${t}\` cannot be a path: did not expect \`${X.sep}\``);
    }
}
function wa(e, t) {
    if (!e) {
        throw Error(`\`${t}\` cannot be empty`);
    }
}
function Ta(e, t) {
    if (!e) {
        throw Error(`Setting \`${t}\` requires \`path\` to be set too`);
    }
}
function Ea(e) {
    return !!(e && typeof e == `object` && `byteLength` in e && `byteOffset` in e);
}
const Da = function(e) {
    let prototype = this.constructor.prototype;
    let n = prototype[e];
    let r = function() {
        return n.apply(r, arguments);
    };
    Object.setPrototypeOf(r, prototype);
    return r;
};
const hasOwnProperty_3 = {}.hasOwnProperty;
const ka = new class e extends Da {
    constructor(){
        super(`copy`);
        this.Compiler = undefined;
        this.Parser = undefined;
        this.attachers = [];
        this.compiler = undefined;
        this.freezeIndex = -1;
        this.frozen = undefined;
        this.namespace = {};
        this.parser = undefined;
        this.transformers = sa();
    }
    copy() {
        let t = new e;
        let n = -1;
        while(++n < this.attachers.length){
            let e = this.attachers[n];
            t.use(...e);
        }
        t.data(aa.default(true, {}, this.namespace));
        return t;
    }
    data(e, t) {
        if (typeof e == `string`) {
            if (arguments.length === 2) {
                Ma(`data`, this.frozen);
                this.namespace[e] = t;
                return this;
            }
            return hasOwnProperty_3.call(this.namespace, e) && this.namespace[e] || undefined;
        }
        if (e) {
            Ma(`data`, this.frozen);
            this.namespace = e;
            return this;
        }
        return this.namespace;
    }
    freeze() {
        if (this.frozen) {
            return this;
        }
        let e = this;
        while(++this.freezeIndex < this.attachers.length){
            let [t, ...n] = this.attachers[this.freezeIndex];
            if (n[0] === false) {
                continue;
            }
            if (n[0] === true) {
                n[0] = undefined;
            }
            let r = t.call(e, ...n);
            if (typeof r == `function`) {
                this.transformers.use(r);
            }
        }
        this.frozen = true;
        this.freezeIndex = Infinity;
        return this;
    }
    parse(e) {
        this.freeze();
        let t = Fa(e);
        let n = this.parser || this.Parser;
        Aa(`parse`, n);
        return n(String(t), t);
    }
    process(e, t) {
        let n = this;
        this.freeze();
        Aa(`process`, this.parser || this.Parser);
        ja(`process`, this.compiler || this.Compiler);
        if (t) {
            return r(undefined, t);
        }
        return new Promise(r);
        function r(r, i) {
            let a = Fa(e);
            let o = n.parse(a);
            n.run(o, a, function(e, t, r) {
                if (e || !t || !r) {
                    return s(e);
                }
                let i = t;
                let a = n.stringify(i, r);
                if (La(a)) {
                    r.value = a;
                } else {
                    r.result = a;
                }
                s(e, r);
            });
            function s(e, n) {
                if (e || !n) {
                    i(e);
                } else if (r) {
                    r(n);
                } else {
                    t(undefined, n);
                }
            }
        }
    }
    processSync(e) {
        let t = false;
        let n;
        this.freeze();
        Aa(`processSync`, this.parser || this.Parser);
        ja(`processSync`, this.compiler || this.Compiler);
        this.process(e, r);
        Pa(`processSync`, `process`, t);
        return n;
        function r(e, r) {
            t = true;
            ia(e);
            n = r;
        }
    }
    run(e, t, n) {
        Na(e);
        this.freeze();
        let transformers = this.transformers;
        if (!n && typeof t == `function`) {
            n = t;
            t = undefined;
        }
        if (n) {
            return i(undefined, n);
        }
        return new Promise(i);
        function i(i, a) {
            let o = Fa(t);
            transformers.run(e, o, s);
            function s(t, r, o) {
                let s = r || e;
                if (t) {
                    a(t);
                } else if (i) {
                    i(s);
                } else {
                    n(undefined, s, o);
                }
            }
        }
    }
    runSync(e, t) {
        let n = false;
        let r;
        this.run(e, t, i);
        Pa(`runSync`, `run`, n);
        return r;
        function i(e, t) {
            ia(e);
            r = t;
            n = true;
        }
    }
    stringify(e, t) {
        this.freeze();
        let n = Fa(t);
        let r = this.compiler || this.Compiler;
        ja(`stringify`, r);
        Na(e);
        return r(e, n);
    }
    use(e, ...t) {
        let attachers = this.attachers;
        let namespace = this.namespace;
        Ma(`use`, this.frozen);
        if (e != null) {
            if (typeof e == `function`) {
                s(e, t);
            } else if (typeof e == `object`) {
                if (Array.isArray(e)) {
                    o(e);
                } else {
                    a(e);
                }
            } else {
                throw TypeError(`Expected usable value, not \`${e}\``);
            }
        }
        return this;
        function i(e) {
            if (typeof e == `function`) {
                s(e, []);
            } else if (typeof e == `object`) {
                if (Array.isArray(e)) {
                    let [t, ...n] = e;
                    s(t, n);
                } else {
                    a(e);
                }
            } else {
                throw TypeError(`Expected usable value, not \`${e}\``);
            }
        }
        function a(e) {
            if (!(`plugins` in e) && !(`settings` in e)) {
                throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
            }
            o(e.plugins);
            if (e.settings) {
                namespace.settings = aa.default(true, namespace.settings, e.settings);
            }
        }
        function o(e) {
            let t = -1;
            if (e != null) {
                if (Array.isArray(e)) {
                    while(++t < e.length){
                        let n = e[t];
                        i(n);
                    }
                } else {
                    throw TypeError(`Expected a list of plugins, not \`${e}\``);
                }
            }
        }
        function s(e, t) {
            let r = -1;
            let i = -1;
            while(++r < attachers.length){
                if (attachers[r][0] === e) {
                    i = r;
                    break;
                }
            }
            if (i === -1) {
                attachers.push([
                    e,
                    ...t
                ]);
            } else if (t.length > 0) {
                let [r, ...a] = t;
                let o = attachers[i][1];
                if (oa(o) && oa(r)) {
                    r = aa.default(true, o, r);
                }
                attachers[i] = [
                    e,
                    r,
                    ...a
                ];
            }
        }
    }
}().freeze();
function Aa(e, t) {
    if (typeof t != `function`) {
        throw TypeError(`Cannot \`${e}\` without \`parser\``);
    }
}
function ja(e, t) {
    if (typeof t != `function`) {
        throw TypeError(`Cannot \`${e}\` without \`compiler\``);
    }
}
function Ma(e, frozen) {
    if (frozen) {
        throw Error(`Cannot call \`${e}\` on a frozen processor.
Create a new processor first, by calling it: use \`processor()\` instead of \`processor\`.`);
    }
}
function Na(e) {
    if (!oa(e) || typeof e.type != `string`) {
        throw TypeError(`Expected node, got \`${e}\``);
    }
}
function Pa(e, t, n) {
    if (!n) {
        throw Error(`\`${e}\` finished async. Use \`${t}\` instead`);
    }
}
function Fa(e) {
    if (Ia(e)) {
        return e;
    }
    return new Sa(e);
}
function Ia(e) {
    return !!(e && typeof e == `object` && `message` in e && `messages` in e);
}
const za = t();
n();
const Ba = [];
const Va = {
    allowDangerousHtml: true
};
const Ha = /^(https?|ircs?|mailto|xmpp)$/i;
const Ua = [
    {
        from: `astPlugins`,
        id: `remove-buggy-html-in-markdown-parser`
    },
    {
        from: `allowDangerousHtml`,
        id: `remove-buggy-html-in-markdown-parser`
    },
    {
        from: `allowNode`,
        id: `replace-allownode-allowedtypes-and-disallowedtypes`,
        to: `allowElement`
    },
    {
        from: `allowedTypes`,
        id: `replace-allownode-allowedtypes-and-disallowedtypes`,
        to: `allowedElements`
    },
    {
        from: `className`,
        id: `remove-classname`
    },
    {
        from: `disallowedTypes`,
        id: `replace-allownode-allowedtypes-and-disallowedtypes`,
        to: `disallowedElements`
    },
    {
        from: `escapeHtml`,
        id: `remove-buggy-html-in-markdown-parser`
    },
    {
        from: `includeElementIndex`,
        id: `#remove-includeelementindex`
    },
    {
        from: `includeNodeIndex`,
        id: `change-includenodeindex-to-includeelementindex`
    },
    {
        from: `linkTarget`,
        id: `remove-linktarget`
    },
    {
        from: `plugins`,
        id: `change-plugins-to-remarkplugins`,
        to: `remarkPlugins`
    },
    {
        from: `rawSourcePos`,
        id: `#remove-rawsourcepos`
    },
    {
        from: `renderers`,
        id: `change-renderers-to-components`,
        to: `components`
    },
    {
        from: `source`,
        id: `change-source-to-children`,
        to: `children`
    },
    {
        from: `sourcePos`,
        id: `#remove-sourcepos`
    },
    {
        from: `transformImageUri`,
        id: `#add-urltransform`,
        to: `urlTransform`
    },
    {
        from: `transformLinkUri`,
        id: `#add-urltransform`,
        to: `urlTransform`
    }
];
function Wa(e) {
    let t = Ga(e);
    let n = Ka(e);
    return qa(t.runSync(t.parse(n), n), e);
}
function Ga(e) {
    let t = e.rehypePlugins || Ba;
    let n = e.remarkPlugins || Ba;
    let r = e.remarkRehypeOptions ? {
        ...e.remarkRehypeOptions,
        ...Va
    } : Va;
    return ka().use(Ur).use(n).use(ra, r).use(t);
}
function Ka(e) {
    let t = e.children || ``;
    let n = new Sa;
    if (typeof t == `string`) {
        n.value = t;
    } else {
        `` + t;
    }
    return n;
}
function qa(e, t) {
    let t_allowedElements = t.allowedElements;
    let t_allowElement = t.allowElement;
    let t_components = t.components;
    let t_disallowedElements = t.disallowedElements;
    let t_skipHtml = t.skipHtml;
    let t_unwrapDisallowed = t.unwrapDisallowed;
    let c = t.urlTransform || Ja;
    for (let e of Ua){
        Object.hasOwn(t, e.from) && `` + e.from + (e.to ? `use \`${e.to}\` instead` : `remove it`) + e.id;
    }
    qi(e, l);
    return je(e, {
        Fragment: za.Fragment,
        components: t_components,
        ignoreInvalidStyle: true,
        jsx: za.jsx,
        jsxs: za.jsxs,
        passKeys: true,
        passNode: true
    });
    function l(e, t, i) {
        if (e.type === `raw` && i && typeof t == `number`) {
            if (t_skipHtml) {
                i.children.splice(t, 1);
            } else {
                i.children[t] = {
                    type: `text`,
                    value: e.value
                };
            }
            return t;
        }
        if (e.type === `element`) {
            let t;
            for(t in $e){
                if (Object.hasOwn($e, t) && Object.hasOwn(e.properties, t)) {
                    let n = e.properties[t];
                    let r = $e[t];
                    if (r === null || r.includes(e.tagName)) {
                        e.properties[t] = c(String(n || ``), t, e);
                    }
                }
            }
        }
        if (e.type === `element`) {
            let o = t_allowedElements ? !t_allowedElements.includes(e.tagName) : t_disallowedElements ? t_disallowedElements.includes(e.tagName) : false;
            if (!o && t_allowElement && typeof t == `number`) {
                o = !t_allowElement(e, t, i);
            }
            if (o && i && typeof t == `number`) {
                if (t_unwrapDisallowed && e.children) {
                    i.children.splice(t, 1, ...e.children);
                } else {
                    i.children.splice(t, 1);
                }
                return t;
            }
        }
    }
}
function Ja(e) {
    let t = e.indexOf(`:`);
    let n = e.indexOf(`?`);
    let r = e.indexOf(`#`);
    let i = e.indexOf(`/`);
    if (t === -1 || i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || Ha.test(e.slice(0, t))) {
        return e;
    }
    return ``;
}
function Ya(e, t) {
    let n = String(e);
    if (typeof t != `string`) {
        throw TypeError(`Expected character`);
    }
    let r = 0;
    let i = n.indexOf(t);
    while(i !== -1){
        r++;
        i = n.indexOf(t, i + t.length);
    }
    return r;
}
function Za(e, t, n) {
    let r = Ii((n || {}).ignore || []);
    let i = Qa(t);
    let a = -1;
    while(++a < i.length){
        Gi(e, `text`, o);
    }
    function o(e, t) {
        let n = -1;
        let i;
        while(++n < t.length){
            let e = t[n];
            let a = i ? i.children : undefined;
            if (r(e, a ? a.indexOf(e) : undefined, i)) {
                return;
            }
            i = e;
        }
        if (i) {
            return s(e, t);
        }
    }
    function s(e, t) {
        let n = t[t.length - 1];
        let r = i[a][0];
        let o = i[a][1];
        let s = 0;
        let c = n.children.indexOf(e);
        let l = false;
        let u = [];
        r.lastIndex = 0;
        let d = r.exec(e.value);
        while(d){
            let n = d.index;
            let i = {
                index: d.index,
                input: d.input,
                stack: [
                    ...t,
                    e
                ]
            };
            let a = o(...d, i);
            if (typeof a == `string`) {
                a = a.length > 0 ? {
                    type: `text`,
                    value: a
                } : undefined;
            }
            if (a === false) {
                r.lastIndex = n + 1;
            } else {
                if (s !== n) {
                    u.push({
                        type: `text`,
                        value: e.value.slice(s, n)
                    });
                }
                if (Array.isArray(a)) {
                    u.push(...a);
                } else if (a) {
                    u.push(a);
                }
                s = n + d[0].length;
                l = true;
            }
            if (!r.global) {
                break;
            }
            d = r.exec(e.value);
        }
        if (l) {
            if (s < e.value.length) {
                u.push({
                    type: `text`,
                    value: e.value.slice(s)
                });
            }
            n.children.splice(c, 1, ...u);
        } else {
            u = [
                e
            ];
        }
        return c + u.length;
    }
}
function ro() {
    return {
        transforms: [
            fo
        ],
        enter: {
            literalAutolink: ao,
            literalAutolinkEmail: oo,
            literalAutolinkHttp: oo,
            literalAutolinkWww: oo
        },
        exit: {
            literalAutolink: uo,
            literalAutolinkEmail,
            literalAutolinkHttp,
            literalAutolinkWww
        }
    };
}
function ao(e) {
    this.enter({
        type: `link`,
        title: null,
        url: ``,
        children: []
    }, e);
}
function oo(e) {
    this.config.enter.autolinkProtocol.call(this, e);
}
function literalAutolinkHttp(e) {
    this.config.exit.autolinkProtocol.call(this, e);
}
function literalAutolinkWww(e) {
    this.config.exit.data.call(this, e);
    let t = this.stack[this.stack.length - 1];
    t.type;
    t.url = `http://` + this.sliceSerialize(e);
}
function literalAutolinkEmail(e) {
    this.config.exit.autolinkEmail.call(this, e);
}
function uo(e) {
    this.exit(e);
}
function fo(e) {
    Za(e, [
        [
            /(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,
            po
        ],
        [
            /(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,
            mo
        ]
    ], {
        ignore: [
            `link`,
            `linkReference`
        ]
    });
}
function po(e, t, n, r, i) {
    let a = ``;
    if (!_o(i) || (/^w/i.test(t) && (n = t + n, t = ``, a = `http://`), !ho(n))) {
        return false;
    }
    let o = go(n + r);
    if (!o[0]) {
        return false;
    }
    let s = {
        type: `link`,
        title: null,
        url: a + t + o[0],
        children: [
            {
                type: `text`,
                value: t + o[0]
            }
        ]
    };
    if (o[1]) {
        return [
            s,
            {
                type: `text`,
                value: o[1]
            }
        ];
    }
    return s;
}
function mo(e, t, n, r) {
    if (!_o(r, true) || /[-\d_]$/.test(n)) {
        return false;
    }
    return {
        type: `link`,
        title: null,
        url: `mailto:` + t + `@` + n,
        children: [
            {
                type: `text`,
                value: t + `@` + n
            }
        ]
    };
}
function ho(e) {
    let t = e.split(`.`);
    return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function go(e) {
    let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
    if (!t) {
        return [
            e,
            undefined
        ];
    }
    e = e.slice(0, t.index);
    let n = t[0];
    let r = n.indexOf(`)`);
    let i = Ya(e, `(`);
    let a = Ya(e, `)`);
    while(r !== -1 && i > a){
        e += n.slice(0, r + 1);
        n = n.slice(r + 1);
        r = n.indexOf(`)`);
        a++;
    }
    return [
        e,
        n
    ];
}
function _o(e, t) {
    let n = e.input.charCodeAt(e.index - 1);
    return (e.index === 0 || G(n) || _t(n)) && (!t || n !== 47);
}
footnoteReference_1.peek = Eo;
function vo() {
    this.buffer();
}
function yo(e) {
    this.enter({
        type: `footnoteReference`,
        identifier: ``,
        label: ``
    }, e);
}
function bo() {
    this.buffer();
}
function xo(e) {
    this.enter({
        type: `footnoteDefinition`,
        identifier: ``,
        label: ``,
        children: []
    }, e);
}
function So(e) {
    let t = this.resume();
    let n = this.stack[this.stack.length - 1];
    n.type;
    n.identifier = z(this.sliceSerialize(e)).toLowerCase();
    n.label = t;
}
function Co(e) {
    this.exit(e);
}
function wo(e) {
    let t = this.resume();
    let n = this.stack[this.stack.length - 1];
    n.type;
    n.identifier = z(this.sliceSerialize(e)).toLowerCase();
    n.label = t;
}
function To(e) {
    this.exit(e);
}
function Eo() {
    return `[`;
}
function footnoteReference_1(e, t, n, r) {
    let i = n.createTracker(r);
    let a = i.move(`[^`);
    let o = n.enter(`footnoteReference`);
    let s = n.enter(`reference`);
    a += i.move(n.safe(n.associationId(e), {
        after: `]`,
        before: a
    }));
    s();
    o();
    a += i.move(`]`);
    return a;
}
function Oo() {
    return {
        enter: {
            gfmFootnoteCallString: vo,
            gfmFootnoteCall: yo,
            gfmFootnoteDefinitionLabelString: bo,
            gfmFootnoteDefinition: xo
        },
        exit: {
            gfmFootnoteCallString: So,
            gfmFootnoteCall: Co,
            gfmFootnoteDefinitionLabelString: wo,
            gfmFootnoteDefinition: To
        }
    };
}
function ko(e) {
    let t = false;
    if (e && e.firstLineBlank) {
        t = true;
    }
    return {
        handlers: {
            footnoteDefinition,
            footnoteReference: footnoteReference_1
        },
        unsafe: [
            {
                character: `[`,
                inConstruct: [
                    `label`,
                    `phrasing`,
                    `reference`
                ]
            }
        ]
    };
    function footnoteDefinition(e, n, r, i) {
        let a = r.createTracker(i);
        let o = a.move(`[^`);
        let s = r.enter(`footnoteDefinition`);
        let c = r.enter(`label`);
        o += a.move(r.safe(r.associationId(e), {
            before: o,
            after: `]`
        }));
        c();
        o += a.move(`]:`);
        if (e.children && e.children.length > 0) {
            a.shift(4);
            o += a.move((t ? `
` : ` `) + r.indentLines(r.containerFlow(e, a.current()), t ? jo : Ao));
        }
        s();
        return o;
    }
}
function Ao(e, t, n) {
    if (t === 0) {
        return e;
    }
    return jo(e, t, n);
}
function jo(e, t, n) {
    return (n ? `` : `    `) + e;
}
const notInConstruct = [
    `autolink`,
    `destinationLiteral`,
    `destinationRaw`,
    `reference`,
    `titleQuote`,
    `titleApostrophe`
];
Lo.peek = Ro;
function Po() {
    return {
        unsafe: [
            {
                character: `~`,
                inConstruct: `phrasing`,
                notInConstruct
            }
        ],
        handlers: {
            delete: Lo
        }
    };
}
function Lo(e, t, n, r) {
    let i = n.createTracker(r);
    let a = n.enter(`strikethrough`);
    let o = i.move(`~~`);
    o += n.containerPhrasing(e, {
        ...i.current(),
        before: o,
        after: `~`
    });
    o += i.move(`~~`);
    a();
    return o;
}
function Ro() {
    return `~`;
}
function ts(e) {
    let t = e.options.emphasis || `*`;
    if (t !== `*` && t !== `_`) {
        throw Error(`Cannot serialize emphasis with \`${t}\` for \`options.emphasis\`, expected \`*\`, or \`_\``);
    }
    return t;
}
function ns(e) {
    return `&#x` + e.toString(16).toUpperCase() + `;`;
}
function rs(e, t, n) {
    let r = Tt(e);
    let i = Tt(t);
    if (r === undefined) {
        if (i === undefined) {
            if (n === `_`) {
                return {
                    inside: true,
                    outside: true
                };
            }
            return {
                inside: false,
                outside: false
            };
        }
        if (i === 1) {
            return {
                inside: true,
                outside: true
            };
        }
        return {
            inside: false,
            outside: true
        };
    }
    if (r === 1) {
        if (i === undefined) {
            return {
                inside: false,
                outside: false
            };
        }
        if (i === 1) {
            return {
                inside: true,
                outside: true
            };
        }
        return {
            inside: false,
            outside: false
        };
    }
    if (i === undefined) {
        return {
            inside: false,
            outside: false
        };
    }
    if (i === 1) {
        return {
            inside: true,
            outside: false
        };
    }
    return {
        inside: false,
        outside: false
    };
}
emphasis_1.peek = as;
function emphasis_1(e, t, n, r) {
    let i = ts(n);
    let a = n.enter(`emphasis`);
    let o = n.createTracker(r);
    let s = o.move(i);
    let c = o.move(n.containerPhrasing(e, {
        after: i,
        before: s,
        ...o.current()
    }));
    let l = c.charCodeAt(0);
    let u = rs(r.before.charCodeAt(r.before.length - 1), l, i);
    if (u.inside) {
        c = ns(l) + c.slice(1);
    }
    let d = c.charCodeAt(c.length - 1);
    let f = rs(r.after.charCodeAt(0), d, i);
    if (f.inside) {
        c = c.slice(0, -1) + ns(d);
    }
    let p = o.move(i);
    a();
    n.attentionEncodeSurroundingInfo = {
        after: f.outside,
        before: u.outside
    };
    return s + c + p;
}
function as(e, t, n) {
    return n.options.emphasis || `*`;
}
function os(e, t) {
    let n = false;
    qi(e, function(e) {
        if (`value` in e && /\r?\n|\r/.test(e.value) || e.type === `break`) {
            n = true;
            return false;
        }
    });
    return !!((!e.depth || e.depth < 3) && tt(e) && (t.options.setext || n));
}
function ss(e, t, n, r) {
    let i = Math.max(Math.min(6, e.depth || 1), 1);
    let a = n.createTracker(r);
    if (os(e, n)) {
        let t = n.enter(`headingSetext`);
        let r = n.enter(`phrasing`);
        let o = n.containerPhrasing(e, {
            ...a.current(),
            before: `
`,
            after: `
`
        });
        r();
        t();
        return o + `
` + (i === 1 ? `=` : `-`).repeat(o.length - (Math.max(o.lastIndexOf(`\r`), o.lastIndexOf(`
`)) + 1));
    }
    let o = `#`.repeat(i);
    let s = n.enter(`headingAtx`);
    let c = n.enter(`phrasing`);
    a.move(o + ` `);
    let l = n.containerPhrasing(e, {
        before: `# `,
        after: `
`,
        ...a.current()
    });
    if (/^[\t ]/.test(l)) {
        l = ns(l.charCodeAt(0)) + l.slice(1);
    }
    l = l ? o + ` ` + l : o;
    if (n.options.closeAtx) {
        l += ` ` + o;
    }
    c();
    s();
    return l;
}
html_1.peek = ls;
function html_1(e) {
    return e.value || ``;
}
function ls() {
    return `<`;
}
image_1.peek = ds;
function image_1(e, t, n, r) {
    let i = $o(n);
    let a = i === `"` ? `Quote` : `Apostrophe`;
    let o = n.enter(`image`);
    let s = n.enter(`label`);
    let c = n.createTracker(r);
    let l = c.move(`![`);
    l += c.move(n.safe(e.alt, {
        before: l,
        after: `]`,
        ...c.current()
    }));
    l += c.move(`](`);
    s();
    if (!e.url && e.title || /[\0- \u007F]/.test(e.url)) {
        s = n.enter(`destinationLiteral`);
        l += c.move(`<`);
        l += c.move(n.safe(e.url, {
            before: l,
            after: `>`,
            ...c.current()
        }));
        l += c.move(`>`);
    } else {
        s = n.enter(`destinationRaw`);
        l += c.move(n.safe(e.url, {
            before: l,
            after: e.title ? ` ` : `)`,
            ...c.current()
        }));
    }
    s();
    if (e.title) {
        s = n.enter(`title${a}`);
        l += c.move(` ` + i);
        l += c.move(n.safe(e.title, {
            before: l,
            after: i,
            ...c.current()
        }));
        l += c.move(i);
        s();
    }
    l += c.move(`)`);
    o();
    return l;
}
function ds() {
    return `!`;
}
imageReference_1.peek = ps;
function imageReference_1(e, t, n, r) {
    let e_referenceType = e.referenceType;
    let a = n.enter(`imageReference`);
    let o = n.enter(`label`);
    let s = n.createTracker(r);
    let c = s.move(`![`);
    let l = n.safe(e.alt, {
        before: c,
        after: `]`,
        ...s.current()
    });
    c += s.move(l + `][`);
    o();
    let n_stack = n.stack;
    n.stack = [];
    o = n.enter(`reference`);
    let d = n.safe(n.associationId(e), {
        before: c,
        after: `]`,
        ...s.current()
    });
    o();
    n.stack = n_stack;
    a();
    if (e_referenceType === `full` || !l || l !== d) {
        c += s.move(d + `]`);
    } else if (e_referenceType === `shortcut`) {
        c = c.slice(0, -1);
    } else {
        c += s.move(`]`);
    }
    return c;
}
function ps() {
    return `!`;
}
ms.peek = hs;
function ms(e, t, n) {
    let r = e.value || ``;
    let i = "`";
    let a = -1;
    while(RegExp(`(^|[^\`])${i}([^\`]|\$)`).test(r)){
        i += "`";
    }
    for(/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = ` ` + r + ` `); ++a < n.unsafe.length;){
        let e = n.unsafe[a];
        let t = n.compilePattern(e);
        let i;
        if (e.atBreak) {
            while(i = t.exec(r)){
                let e = i.index;
                if (r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13) {
                    e--;
                }
                r = r.slice(0, e) + ` ` + r.slice(i.index + 1);
            }
        }
    }
    return i + r + i;
}
function hs() {
    return "`";
}
function gs(e, t) {
    let n = tt(e);
    return !!(!t.options.resourceLink && e.url && !e.title && e.children && e.children.length === 1 && e.children[0].type === `text` && (n === e.url || `mailto:` + n === e.url) && /^[a-z][a-z+.-]+:/i.test(e.url) && !/[\0- <>\u007F]/.test(e.url));
}
link_1.peek = vs;
function link_1(e, t, n, r) {
    let i = $o(n);
    let a = i === `"` ? `Quote` : `Apostrophe`;
    let o = n.createTracker(r);
    let s;
    let c;
    if (gs(e, n)) {
        let t = n.stack;
        n.stack = [];
        s = n.enter(`autolink`);
        let r = o.move(`<`);
        r += o.move(n.containerPhrasing(e, {
            before: r,
            after: `>`,
            ...o.current()
        }));
        r += o.move(`>`);
        s();
        n.stack = t;
        return r;
    }
    s = n.enter(`link`);
    c = n.enter(`label`);
    let l = o.move(`[`);
    l += o.move(n.containerPhrasing(e, {
        before: l,
        after: `](`,
        ...o.current()
    }));
    l += o.move(`](`);
    c();
    if (!e.url && e.title || /[\0- \u007F]/.test(e.url)) {
        c = n.enter(`destinationLiteral`);
        l += o.move(`<`);
        l += o.move(n.safe(e.url, {
            before: l,
            after: `>`,
            ...o.current()
        }));
        l += o.move(`>`);
    } else {
        c = n.enter(`destinationRaw`);
        l += o.move(n.safe(e.url, {
            before: l,
            after: e.title ? ` ` : `)`,
            ...o.current()
        }));
    }
    c();
    if (e.title) {
        c = n.enter(`title${a}`);
        l += o.move(` ` + i);
        l += o.move(n.safe(e.title, {
            before: l,
            after: i,
            ...o.current()
        }));
        l += o.move(i);
        c();
    }
    l += o.move(`)`);
    s();
    return l;
}
function vs(e, t, n) {
    if (gs(e, n)) {
        return `<`;
    }
    return `[`;
}
linkReference_1.peek = bs;
function linkReference_1(e, t, n, r) {
    let e_referenceType = e.referenceType;
    let a = n.enter(`linkReference`);
    let o = n.enter(`label`);
    let s = n.createTracker(r);
    let c = s.move(`[`);
    let l = n.containerPhrasing(e, {
        before: c,
        after: `]`,
        ...s.current()
    });
    c += s.move(l + `][`);
    o();
    let n_stack = n.stack;
    n.stack = [];
    o = n.enter(`reference`);
    let d = n.safe(n.associationId(e), {
        before: c,
        after: `]`,
        ...s.current()
    });
    o();
    n.stack = n_stack;
    a();
    if (e_referenceType === `full` || !l || l !== d) {
        c += s.move(d + `]`);
    } else if (e_referenceType === `shortcut`) {
        c = c.slice(0, -1);
    } else {
        c += s.move(`]`);
    }
    return c;
}
function bs() {
    return `[`;
}
function xs(e) {
    let t = e.options.bullet || `*`;
    if (t !== `*` && t !== `+` && t !== `-`) {
        throw Error(`Cannot serialize items with \`${t}\` for \`options.bullet\`, expected \`*\`, \`+\`, or \`-\``);
    }
    return t;
}
function Ss(e) {
    let t = xs(e);
    let bulletOther = e.options.bulletOther;
    if (!bulletOther) {
        if (t === `*`) {
            return `-`;
        }
        return `*`;
    }
    if (bulletOther !== `*` && bulletOther !== `+` && bulletOther !== `-`) {
        throw Error(`Cannot serialize items with \`${bulletOther}\` for \`options.bulletOther\`, expected \`*\`, \`+\`, or \`-\``);
    }
    if (bulletOther === t) {
        throw Error(`Expected \`bullet\` (\`${t}\`) and \`bulletOther\` (\`${bulletOther}\`) to be different`);
    }
    return bulletOther;
}
function Cs(e) {
    let t = e.options.bulletOrdered || `.`;
    if (t !== `.` && t !== `)`) {
        throw Error(`Cannot serialize items with \`${t}\` for \`options.bulletOrdered\`, expected \`.\` or \`)\``);
    }
    return t;
}
function ws(e) {
    let t = e.options.rule || `*`;
    if (t !== `*` && t !== `-` && t !== `_`) {
        throw Error(`Cannot serialize rules with \`${t}\` for \`options.rule\`, expected \`*\`, \`-\`, or \`_\``);
    }
    return t;
}
function Ts(e, t, n, r) {
    let i = n.enter(`list`);
    let n_bulletCurrent = n.bulletCurrent;
    let o = e.ordered ? Cs(n) : xs(n);
    let s = e.ordered ? o === `.` ? `)` : `.` : Ss(n);
    let c = t && n.bulletLastUsed ? o === n.bulletLastUsed : false;
    if (!e.ordered) {
        let t = e.children ? e.children[0] : undefined;
        if ((o === `*` || o === `-`) && t && (!t.children || !t.children[0]) && n.stack[n.stack.length - 1] === `list` && n.stack[n.stack.length - 2] === `listItem` && n.stack[n.stack.length - 3] === `list` && n.stack[n.stack.length - 4] === `listItem` && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0) {
            c = true;
        }
        if (ws(n) === o && t) {
            let t = -1;
            while(++t < e.children.length){
                let n = e.children[t];
                if (n && n.type === `listItem` && n.children && n.children[0] && n.children[0].type === `thematicBreak`) {
                    c = true;
                    break;
                }
            }
        }
    }
    if (c) {
        o = s;
    }
    n.bulletCurrent = o;
    let l = n.containerFlow(e, r);
    n.bulletLastUsed = o;
    n.bulletCurrent = n_bulletCurrent;
    i();
    return l;
}
function Es(e) {
    let t = e.options.listItemIndent || `one`;
    if (t !== `tab` && t !== `one` && t !== `mixed`) {
        throw Error(`Cannot serialize items with \`${t}\` for \`options.listItemIndent\`, expected \`tab\`, \`one\`, or \`mixed\``);
    }
    return t;
}
function Ds(e, t, n, r) {
    let i = Es(n);
    let a = n.bulletCurrent || xs(n);
    if (t && t.type === `list` && t.ordered) {
        a = (typeof t.start == `number` && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === false ? 0 : t.children.indexOf(e)) + a;
    }
    let o = a.length + 1;
    if (i === `tab` || i === `mixed` && (t && t.type === `list` && t.spread || e.spread)) {
        o = Math.ceil(o / 4) * 4;
    }
    let s = n.createTracker(r);
    s.move(a + ` `.repeat(o - a.length));
    s.shift(o);
    let c = n.enter(`listItem`);
    let l = n.indentLines(n.containerFlow(e, s.current()), u);
    c();
    return l;
    function u(e, t, n) {
        if (t) {
            return (n ? `` : ` `.repeat(o)) + e;
        }
        return (n ? a : a + ` `.repeat(o - a.length)) + e;
    }
}
function Os(e, t, n, r) {
    let i = n.enter(`paragraph`);
    let a = n.enter(`phrasing`);
    let o = n.containerPhrasing(e, r);
    a();
    i();
    return o;
}
const ks = Ii([
    `break`,
    `delete`,
    `emphasis`,
    `footnote`,
    `footnoteReference`,
    `image`,
    `imageReference`,
    `inlineCode`,
    `inlineMath`,
    `link`,
    `linkReference`,
    `mdxJsxTextElement`,
    `mdxTextExpression`,
    `strong`,
    `text`,
    `textDirective`
]);
function As(e, t, n, r) {
    return (e.children.some((e)=>ks(e)) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
function js(e) {
    let t = e.options.strong || `*`;
    if (t !== `*` && t !== `_`) {
        throw Error(`Cannot serialize strong with \`${t}\` for \`options.strong\`, expected \`*\`, or \`_\``);
    }
    return t;
}
strong_1.peek = Ns;
function strong_1(e, t, n, r) {
    let i = js(n);
    let a = n.enter(`strong`);
    let o = n.createTracker(r);
    let s = o.move(i + i);
    let c = o.move(n.containerPhrasing(e, {
        after: i,
        before: s,
        ...o.current()
    }));
    let l = c.charCodeAt(0);
    let u = rs(r.before.charCodeAt(r.before.length - 1), l, i);
    if (u.inside) {
        c = ns(l) + c.slice(1);
    }
    let d = c.charCodeAt(c.length - 1);
    let f = rs(r.after.charCodeAt(0), d, i);
    if (f.inside) {
        c = c.slice(0, -1) + ns(d);
    }
    let p = o.move(i + i);
    a();
    n.attentionEncodeSurroundingInfo = {
        after: f.outside,
        before: u.outside
    };
    return s + c + p;
}
function Ns(e, t, n) {
    return n.options.strong || `*`;
}
function Ps(e, t, n, r) {
    return n.safe(e.value, r);
}
function Fs(e) {
    let t = e.options.ruleRepetition || 3;
    if (t < 3) {
        throw Error(`Cannot serialize rules with repetition \`${t}\` for \`options.ruleRepetition\`, expected \`3\` or more`);
    }
    return t;
}
function Is(e, t, n) {
    let r = (ws(n) + (n.options.ruleSpaces ? ` ` : ``)).repeat(Fs(n));
    if (n.options.ruleSpaces) {
        return r.slice(0, -1);
    }
    return r;
}
const Ls = {
    blockquote: Uo,
    break: hardBreak,
    code: Zo,
    definition,
    emphasis: emphasis_1,
    hardBreak,
    heading: ss,
    html: html_1,
    image: image_1,
    imageReference: imageReference_1,
    inlineCode: ms,
    link: link_1,
    linkReference: linkReference_1,
    list: Ts,
    listItem: Ds,
    paragraph: Os,
    root: As,
    strong: strong_1,
    text: Ps,
    thematicBreak: Is
};
function Rs() {
    return {
        enter: {
            table: zs,
            tableData: Us,
            tableHeader: Us,
            tableRow: Vs
        },
        exit: {
            codeText,
            table: Bs,
            tableData: Hs,
            tableHeader: Hs,
            tableRow: Hs
        }
    };
}
function zs(e) {
    let e__align = e._align;
    this.enter({
        type: `table`,
        align: e__align.map((e)=>{
            if (e === `none`) {
                return null;
            }
            return e;
        }),
        children: []
    }, e);
    this.data.inTable = true;
}
function Bs(e) {
    this.exit(e);
    this.data.inTable = undefined;
}
function Vs(e) {
    this.enter({
        type: `tableRow`,
        children: []
    }, e);
}
function Hs(e) {
    this.exit(e);
}
function Us(e) {
    this.enter({
        type: `tableCell`,
        children: []
    }, e);
}
function Ks(e) {
    let t = e || {};
    let t_tableCellPadding = t.tableCellPadding;
    let t_tablePipeAlign = t.tablePipeAlign;
    let t_stringLength = t.stringLength;
    let a = t_tableCellPadding ? ` ` : `|`;
    return {
        unsafe: [
            {
                character: `\r`,
                inConstruct: `tableCell`
            },
            {
                character: `
`,
                inConstruct: `tableCell`
            },
            {
                atBreak: true,
                character: `|`,
                after: `[	 :-]`
            },
            {
                character: `|`,
                inConstruct: `tableCell`
            },
            {
                atBreak: true,
                character: `:`,
                after: `-`
            },
            {
                atBreak: true,
                character: `-`,
                after: `[:|-]`
            }
        ],
        handlers: {
            inlineCode: f,
            table: o,
            tableCell: tableCell_1,
            tableRow: s
        }
    };
    function o(e, t, n, r) {
        return l(u(e, n, r), e.align);
    }
    function s(e, t, n, r) {
        let i = l([
            d(e, n, r)
        ]);
        return i.slice(0, i.indexOf(`
`));
    }
    function tableCell_1(e, t, n, r) {
        let i = n.enter(`tableCell`);
        let o = n.enter(`phrasing`);
        let s = n.containerPhrasing(e, {
            ...r,
            before: a,
            after: a
        });
        o();
        i();
        return s;
    }
    function l(e, align) {
        return Bo(e, {
            align,
            alignDelimiters: t_tablePipeAlign,
            padding: t_tableCellPadding,
            stringLength: t_stringLength
        });
    }
    function u({ children }, t, n) {
        let i = -1;
        let a = [];
        let o = t.enter(`table`);
        while(++i < children.length){
            a[i] = d(children[i], t, n);
        }
        o();
        return a;
    }
    function d(e, t, n) {
        let e_children = e.children;
        let i = -1;
        let a = [];
        let o = t.enter(`tableRow`);
        while(++i < e_children.length){
            a[i] = tableCell_1(e_children[i], e, t, n);
        }
        o();
        return a;
    }
    function f(e, t, n) {
        let r = Ls.inlineCode(e, t, n);
        if (n.stack.includes(`tableCell`)) {
            r = r.replace(/\|/g, `\\$&`);
        }
        return r;
    }
}
function Js() {
    return {
        unsafe: [
            {
                atBreak: true,
                character: `-`,
                after: `[:|-]`
            }
        ],
        handlers: {
            listItem: Zs
        }
    };
}
function Zs(e, t, n, r) {
    let i = e.children[0];
    let a = typeof e.checked == `boolean` && i && i.type === `paragraph`;
    let o = `[` + (e.checked ? `x` : ` `) + `] `;
    let s = n.createTracker(r);
    if (a) {
        s.move(o);
    }
    let c = Ls.listItem(e, t, n, {
        ...r,
        ...s.current()
    });
    if (a) {
        c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l);
    }
    return c;
    function l(e) {
        return e + o;
    }
}
function Qs() {
    return [
        ro(),
        Oo(),
        No(),
        Rs(),
        qs()
    ];
}
function $s(e) {
    return {
        extensions: [
            io(),
            ko(e),
            Po(),
            Ks(e),
            Js()
        ]
    };
}
const ec = {
    tokenize: dc,
    partial: true
};
const tc = {
    tokenize: fc,
    partial: true
};
const nc = {
    tokenize: pc,
    partial: true
};
var rc = {
    tokenize: mc,
    partial: true
};
const ic = {
    tokenize: hc,
    partial: true
};
const ac = {
    name: `wwwAutolink`,
    tokenize: lc,
    previous: gc
};
const oc = {
    name: `protocolAutolink`,
    tokenize: uc,
    previous: _c
};
const Z = {
    name: `emailAutolink`,
    tokenize: cc,
    previous: vc
};
const Q = {};
function sc() {
    return {
        text: Q
    };
}
for(let $ = 48; $ < 123;){
    Q[$] = Z;
    $++;
    if ($ === 58) {
        $ = 65;
    } else if ($ === 91) {
        $ = 97;
    }
}
Q[43] = Z;
Q[45] = Z;
Q[46] = Z;
Q[95] = Z;
Q[72] = [
    Z,
    oc
];
Q[104] = [
    Z,
    oc
];
Q[87] = [
    Z,
    ac
];
Q[119] = [
    Z,
    ac
];
function cc(e, t, n) {
    let r = this;
    let i;
    let a;
    return o;
    function o(t) {
        if (!yc(t) || !vc.call(r, r.previous) || bc(r.events)) {
            return n(t);
        }
        e.enter(`literalAutolink`);
        e.enter(`literalAutolinkEmail`);
        return s(t);
    }
    function s(t) {
        if (yc(t)) {
            e.consume(t);
            return s;
        }
        if (t === 64) {
            e.consume(t);
            return c;
        }
        return n(t);
    }
    function c(t) {
        if (t === 46) {
            return e.check(ic, u, l)(t);
        }
        if (t === 45 || t === 95 || V(t)) {
            a = true;
            e.consume(t);
            return c;
        }
        return u(t);
    }
    function l(t) {
        e.consume(t);
        i = true;
        return c;
    }
    function u(o) {
        if (a && i && B(r.previous)) {
            e.exit(`literalAutolinkEmail`);
            e.exit(`literalAutolink`);
            return t(o);
        }
        return n(o);
    }
}
function lc(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        if (t !== 87 && t !== 119 || !gc.call(r, r.previous) || bc(r.events)) {
            return n(t);
        }
        e.enter(`literalAutolink`);
        e.enter(`literalAutolinkWww`);
        return e.check(ec, e.attempt(tc, e.attempt(nc, a), n), n)(t);
    }
    function a(n) {
        e.exit(`literalAutolinkWww`);
        e.exit(`literalAutolink`);
        return t(n);
    }
}
function uc(e, t, n) {
    let r = this;
    let i = ``;
    let a = false;
    return o;
    function o(t) {
        if ((t === 72 || t === 104) && _c.call(r, r.previous) && !bc(r.events)) {
            e.enter(`literalAutolink`);
            e.enter(`literalAutolinkHttp`);
            i += String.fromCodePoint(t);
            e.consume(t);
            return s;
        }
        return n(t);
    }
    function s(t) {
        if (B(t) && i.length < 5) {
            i += String.fromCodePoint(t);
            e.consume(t);
            return s;
        }
        if (t === 58) {
            let n = i.toLowerCase();
            if (n === `http` || n === `https`) {
                e.consume(t);
                return c;
            }
        }
        return n(t);
    }
    function c(t) {
        if (t === 47) {
            e.consume(t);
            if (a) {
                return l;
            }
            return a = true, c;
        }
        return n(t);
    }
    function l(t) {
        if (t === null || pt(t) || U(t) || G(t) || _t(t)) {
            return n(t);
        }
        return e.attempt(tc, e.attempt(nc, u), n)(t);
    }
    function u(n) {
        e.exit(`literalAutolinkHttp`);
        e.exit(`literalAutolink`);
        return t(n);
    }
}
function dc(e, t, n) {
    let r = 0;
    return i;
    function i(t) {
        if ((t === 87 || t === 119) && r < 3) {
            r++;
            e.consume(t);
            return i;
        }
        if (t === 46 && r === 3) {
            e.consume(t);
            return a;
        }
        return n(t);
    }
    function a(e) {
        if (e === null) {
            return n(e);
        }
        return t(e);
    }
}
function fc(e, t, n) {
    let r;
    let i;
    let a;
    return o;
    function o(t) {
        if (t === 46 || t === 95) {
            return e.check(rc, c, s)(t);
        }
        if (t === null || U(t) || G(t) || t !== 45 && _t(t)) {
            return c(t);
        }
        a = true;
        e.consume(t);
        return o;
    }
    function s(t) {
        if (t === 95) {
            r = true;
        } else {
            i = r;
            r = undefined;
        }
        e.consume(t);
        return o;
    }
    function c(e) {
        if (i || r || !a) {
            return n(e);
        }
        return t(e);
    }
}
function pc(e, t) {
    let n = 0;
    let r = 0;
    return i;
    function i(o) {
        if (o === 40) {
            n++;
            e.consume(o);
            return i;
        }
        if (o === 41 && r < n) {
            return a(o);
        }
        if (o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126) {
            return e.check(rc, t, a)(o);
        }
        if (o === null || U(o) || G(o)) {
            return t(o);
        }
        e.consume(o);
        return i;
    }
    function a(t) {
        if (t === 41) {
            r++;
        }
        e.consume(t);
        return i;
    }
}
function mc(e, t, n) {
    return r;
    function r(o) {
        if (o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126) {
            e.consume(o);
            return r;
        }
        if (o === 38) {
            e.consume(o);
            return a;
        }
        if (o === 93) {
            e.consume(o);
            return i;
        }
        if (o === 60 || o === null || U(o) || G(o)) {
            return t(o);
        }
        return n(o);
    }
    function i(e) {
        if (e === null || e === 40 || e === 91 || U(e) || G(e)) {
            return t(e);
        }
        return r(e);
    }
    function a(e) {
        if (B(e)) {
            return o(e);
        }
        return n(e);
    }
    function o(t) {
        if (t === 59) {
            e.consume(t);
            return r;
        }
        if (B(t)) {
            e.consume(t);
            return o;
        }
        return n(t);
    }
}
function hc(e, t, n) {
    return r;
    function r(t) {
        e.consume(t);
        return i;
    }
    function i(e) {
        if (V(e)) {
            return n(e);
        }
        return t(e);
    }
}
function gc(e) {
    return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || U(e);
}
function _c(e) {
    return !B(e);
}
function vc(e) {
    return !(e === 47 || yc(e));
}
function yc(e) {
    return e === 43 || e === 45 || e === 46 || e === 95 || V(e);
}
function bc(events) {
    let e_length = events.length;
    let n = false;
    while(e_length--){
        let r = events[e_length][1];
        if ((r.type === `labelLink` || r.type === `labelImage`) && !r._balanced) {
            n = true;
            break;
        }
        if (r._gfmAutolinkLiteralWalkedInto) {
            n = false;
            break;
        }
    }
    if (events.length > 0 && !n) {
        events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
    }
    return n;
}
const xc = {
    tokenize: kc,
    partial: true
};
function Sc() {
    return {
        document: {
            91: {
                name: `gfmFootnoteDefinition`,
                tokenize: Ec,
                continuation: {
                    tokenize: Dc
                },
                exit: Oc
            }
        },
        text: {
            91: {
                name: `gfmFootnoteCall`,
                tokenize: Tc
            },
            93: {
                name: `gfmPotentialFootnoteCall`,
                add: `after`,
                tokenize: Cc,
                resolveTo: wc
            }
        }
    };
}
function Cc(e, t, n) {
    let r = this;
    let length = r.events.length;
    let a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
    let o;
    while(length--){
        let e = r.events[length][1];
        if (e.type === `labelImage`) {
            o = e;
            break;
        }
        if (e.type === `gfmFootnoteCall` || e.type === `labelLink` || e.type === `label` || e.type === `image` || e.type === `link`) {
            break;
        }
    }
    return s;
    function s(i) {
        if (!o || !o._balanced) {
            return n(i);
        }
        let s = z(r.sliceSerialize({
            start: o.end,
            end: r.now()
        }));
        if (s.codePointAt(0) !== 94 || !a.includes(s.slice(1))) {
            return n(i);
        }
        e.enter(`gfmFootnoteCallLabelMarker`);
        e.consume(i);
        e.exit(`gfmFootnoteCallLabelMarker`);
        return t(i);
    }
}
function wc(e, t) {
    let e_length = e.length;
    while(e_length--){
        if (e[e_length][1].type === `labelImage` && e[e_length][0] === `enter`) {
            e[e_length][1];
            break;
        }
    }
    e[e_length + 1][1].type = `data`;
    e[e_length + 3][1].type = `gfmFootnoteCallLabelMarker`;
    let r = {
        type: `gfmFootnoteCall`,
        start: {
            ...e[e_length + 3][1].start
        },
        end: {
            ...e[e.length - 1][1].end
        }
    };
    let i = {
        type: `gfmFootnoteCallMarker`,
        start: {
            ...e[e_length + 3][1].end
        },
        end: {
            ...e[e_length + 3][1].end
        }
    };
    i.end.column++;
    i.end.offset++;
    i.end._bufferIndex++;
    let a = {
        type: `gfmFootnoteCallString`,
        start: {
            ...i.end
        },
        end: {
            ...e[e.length - 1][1].start
        }
    };
    let o = {
        type: `chunkString`,
        contentType: `string`,
        start: {
            ...a.start
        },
        end: {
            ...a.end
        }
    };
    let s = [
        e[e_length + 1],
        e[e_length + 2],
        [
            `enter`,
            r,
            t
        ],
        e[e_length + 3],
        e[e_length + 4],
        [
            `enter`,
            i,
            t
        ],
        [
            `exit`,
            i,
            t
        ],
        [
            `enter`,
            a,
            t
        ],
        [
            `enter`,
            o,
            t
        ],
        [
            `exit`,
            o,
            t
        ],
        [
            `exit`,
            a,
            t
        ],
        e[e.length - 2],
        e[e.length - 1],
        [
            `exit`,
            r,
            t
        ]
    ];
    e.splice(e_length, e.length - e_length + 1, ...s);
    return e;
}
function Tc(e, t, n) {
    let r = this;
    let i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
    let a = 0;
    let o;
    return s;
    function s(t) {
        e.enter(`gfmFootnoteCall`);
        e.enter(`gfmFootnoteCallLabelMarker`);
        e.consume(t);
        e.exit(`gfmFootnoteCallLabelMarker`);
        return c;
    }
    function c(t) {
        if (t === 94) {
            e.enter(`gfmFootnoteCallMarker`);
            e.consume(t);
            e.exit(`gfmFootnoteCallMarker`);
            e.enter(`gfmFootnoteCallString`);
            e.enter(`chunkString`).contentType = `string`;
            return l;
        }
        return n(t);
    }
    function l(s) {
        if (a > 999 || s === 93 && !o || s === null || s === 91 || U(s)) {
            return n(s);
        }
        if (s === 93) {
            e.exit(`chunkString`);
            let a = e.exit(`gfmFootnoteCallString`);
            if (i.includes(z(r.sliceSerialize(a)))) {
                e.enter(`gfmFootnoteCallLabelMarker`);
                e.consume(s);
                e.exit(`gfmFootnoteCallLabelMarker`);
                e.exit(`gfmFootnoteCall`);
                return t;
            }
            return n(s);
        }
        if (!U(s)) {
            o = true;
        }
        a++;
        e.consume(s);
        if (s === 92) {
            return u;
        }
        return l;
    }
    function u(t) {
        if (t === 91 || t === 92 || t === 93) {
            e.consume(t);
            a++;
            return l;
        }
        return l(t);
    }
}
function Ec(e, t, n) {
    let r = this;
    let i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
    let a;
    let o = 0;
    let s;
    return c;
    function c(t) {
        e.enter(`gfmFootnoteDefinition`)._container = true;
        e.enter(`gfmFootnoteDefinitionLabel`);
        e.enter(`gfmFootnoteDefinitionLabelMarker`);
        e.consume(t);
        e.exit(`gfmFootnoteDefinitionLabelMarker`);
        return l;
    }
    function l(t) {
        if (t === 94) {
            e.enter(`gfmFootnoteDefinitionMarker`);
            e.consume(t);
            e.exit(`gfmFootnoteDefinitionMarker`);
            e.enter(`gfmFootnoteDefinitionLabelString`);
            e.enter(`chunkString`).contentType = `string`;
            return u;
        }
        return n(t);
    }
    function u(t) {
        if (o > 999 || t === 93 && !s || t === null || t === 91 || U(t)) {
            return n(t);
        }
        if (t === 93) {
            e.exit(`chunkString`);
            let n = e.exit(`gfmFootnoteDefinitionLabelString`);
            a = z(r.sliceSerialize(n));
            e.enter(`gfmFootnoteDefinitionLabelMarker`);
            e.consume(t);
            e.exit(`gfmFootnoteDefinitionLabelMarker`);
            e.exit(`gfmFootnoteDefinitionLabel`);
            return f;
        }
        if (!U(t)) {
            s = true;
        }
        o++;
        e.consume(t);
        if (t === 92) {
            return d;
        }
        return u;
    }
    function d(t) {
        if (t === 91 || t === 92 || t === 93) {
            e.consume(t);
            o++;
            return u;
        }
        return u(t);
    }
    function f(t) {
        if (t === 58) {
            e.enter(`definitionMarker`);
            e.consume(t);
            e.exit(`definitionMarker`);
            if (!i.includes(a)) {
                i.push(a);
            }
            return q(e, p, `gfmFootnoteDefinitionWhitespace`);
        }
        return n(t);
    }
    function p(e) {
        return t(e);
    }
}
function Dc(e, t, n) {
    return e.check(Nt, t, e.attempt(xc, t, n));
}
function Oc(e) {
    e.exit(`gfmFootnoteDefinition`);
}
function kc(e, t, n) {
    let r = this;
    return q(e, i, `gfmFootnoteDefinitionIndent`, 5);
    function i(e) {
        let i = r.events[r.events.length - 1];
        if (i && i[1].type === `gfmFootnoteDefinitionIndent` && i[2].sliceSerialize(i[1], true).length === 4) {
            return t(e);
        }
        return n(e);
    }
}
function Ac(e) {
    let singleTilde = (e || {}).singleTilde;
    let n = {
        name: `strikethrough`,
        tokenize: i,
        resolveAll: r
    };
    singleTilde ??= true;
    return {
        text: {
            126: n
        },
        insideSpan: {
            null: [
                n
            ]
        },
        attentionMarkers: {
            null: [
                126
            ]
        }
    };
    function r(e, t) {
        let n = -1;
        while(++n < e.length){
            if (e[n][0] === `enter` && e[n][1].type === `strikethroughSequenceTemporary` && e[n][1]._close) {
                let r = n;
                while(r--){
                    if (e[r][0] === `exit` && e[r][1].type === `strikethroughSequenceTemporary` && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
                        e[n][1].type = `strikethroughSequence`;
                        e[r][1].type = `strikethroughSequence`;
                        let i = {
                            type: `strikethrough`,
                            start: {
                                ...e[r][1].start
                            },
                            end: {
                                ...e[n][1].end
                            }
                        };
                        let a = {
                            type: `strikethroughText`,
                            start: {
                                ...e[r][1].end
                            },
                            end: {
                                ...e[n][1].start
                            }
                        };
                        let o = [
                            [
                                `enter`,
                                i,
                                t
                            ],
                            [
                                `enter`,
                                e[r][1],
                                t
                            ],
                            [
                                `exit`,
                                e[r][1],
                                t
                            ],
                            [
                                `enter`,
                                a,
                                t
                            ]
                        ];
                        let s = t.parser.constructs.insideSpan.null;
                        if (s) {
                            L(o, o.length, 0, Et(s, e.slice(r + 1, n), t));
                        }
                        L(o, o.length, 0, [
                            [
                                `exit`,
                                a,
                                t
                            ],
                            [
                                `enter`,
                                e[n][1],
                                t
                            ],
                            [
                                `exit`,
                                e[n][1],
                                t
                            ],
                            [
                                `exit`,
                                i,
                                t
                            ]
                        ]);
                        L(e, r - 1, n - r + 3, o);
                        n = r + o.length - 2;
                        break;
                    }
                }
            }
        }
        for(n = -1; ++n < e.length;){
            if (e[n][1].type === `strikethroughSequenceTemporary`) {
                e[n][1].type = `data`;
            }
        }
        return e;
    }
    function i(e, n, r) {
        let previous = this.previous;
        let events = this.events;
        let o = 0;
        return s;
        function s(t) {
            if (previous === 126 && events[events.length - 1][1].type !== `characterEscape`) {
                return r(t);
            }
            e.enter(`strikethroughSequenceTemporary`);
            return c(t);
        }
        function c(a) {
            let s = Tt(previous);
            if (a === 126) {
                if (o > 1) {
                    return r(a);
                }
                e.consume(a);
                o++;
                return c;
            }
            if (o < 2 && !singleTilde) {
                return r(a);
            }
            let l = e.exit(`strikethroughSequenceTemporary`);
            let u = Tt(a);
            l._open = !u || u === 2 && !!s;
            l._close = !s || s === 2 && !!u;
            return n(a);
        }
    }
}
function Nc(events, t) {
    let n = false;
    let r = [];
    while(t < events.length){
        let i = events[t];
        if (n) {
            if (i[0] === `enter`) {
                if (i[1].type === `tableContent`) {
                    r.push(events[t + 1][1].type === `tableDelimiterMarker` ? `left` : `none`);
                }
            } else if (i[1].type === `tableContent`) {
                if (events[t - 1][1].type === `tableDelimiterMarker`) {
                    let e = r.length - 1;
                    r[e] = r[e] === `left` ? `center` : `right`;
                }
            } else if (i[1].type === `tableDelimiterRow`) {
                break;
            }
        } else {
            if (i[0] === `enter` && i[1].type === `tableDelimiterRow`) {
                n = true;
            }
        }
        t += 1;
    }
    return r;
}
function Pc() {
    return {
        flow: {
            null: {
                name: `table`,
                tokenize: Fc,
                resolveAll: Ic
            }
        }
    };
}
function Fc(e, t, n) {
    let r = this;
    let i = 0;
    let a = 0;
    let o;
    return s;
    function s(e) {
        let t = r.events.length - 1;
        while(t > -1){
            let e = r.events[t][1].type;
            if (e === `lineEnding` || e === `linePrefix`) {
                t--;
            } else {
                break;
            }
        }
        let i = t > -1 ? r.events[t][1].type : null;
        let a = i === `tableHead` || i === `tableRow` ? S : c;
        if (a === S && r.parser.lazy[r.now().line]) {
            return n(e);
        }
        return a(e);
    }
    function c(t) {
        e.enter(`tableHead`);
        e.enter(`tableRow`);
        return l(t);
    }
    function l(e) {
        if (e === 124) {
            return u(e);
        }
        o = true;
        a += 1;
        return u(e);
    }
    function u(t) {
        if (t === null) {
            return n(t);
        }
        if (H(t)) {
            if (a > 1) {
                a = 0;
                r.interrupt = true;
                e.exit(`tableRow`);
                e.enter(`lineEnding`);
                e.consume(t);
                e.exit(`lineEnding`);
                return p;
            }
            return n(t);
        }
        if (W(t)) {
            return q(e, u, `whitespace`)(t);
        }
        a += 1;
        if (o) {
            o = false;
            i += 1;
        }
        if (t === 124) {
            return e.enter(`tableCellDivider`), e.consume(t), e.exit(`tableCellDivider`), o = true, u;
        }
        return e.enter(`data`), d(t);
    }
    function d(t) {
        if (t === null || t === 124 || U(t)) {
            e.exit(`data`);
            return u(t);
        }
        e.consume(t);
        if (t === 92) {
            return f;
        }
        return d;
    }
    function f(t) {
        if (t === 92 || t === 124) {
            e.consume(t);
            return d;
        }
        return d(t);
    }
    function p(t) {
        r.interrupt = false;
        if (r.parser.lazy[r.now().line]) {
            return n(t);
        }
        e.enter(`tableDelimiterRow`);
        o = false;
        if (W(t)) {
            return q(e, m, `linePrefix`, r.parser.constructs.disable.null.includes(`codeIndented`) ? undefined : 4)(t);
        }
        return m(t);
    }
    function m(t) {
        if (t === 45 || t === 58) {
            return g(t);
        }
        if (t === 124) {
            o = true;
            e.enter(`tableCellDivider`);
            e.consume(t);
            e.exit(`tableCellDivider`);
            return h;
        }
        return x(t);
    }
    function h(t) {
        if (W(t)) {
            return q(e, g, `whitespace`)(t);
        }
        return g(t);
    }
    function g(t) {
        if (t === 58) {
            a += 1;
            o = true;
            e.enter(`tableDelimiterMarker`);
            e.consume(t);
            e.exit(`tableDelimiterMarker`);
            return _;
        }
        if (t === 45) {
            a += 1;
            return _(t);
        }
        if (t === null || H(t)) {
            return b(t);
        }
        return x(t);
    }
    function _(t) {
        if (t === 45) {
            e.enter(`tableDelimiterFiller`);
            return v(t);
        }
        return x(t);
    }
    function v(t) {
        switch(t){
            case 45:
                e.consume(t);
                return v;
            case 58:
                o = true;
                e.exit(`tableDelimiterFiller`);
                e.enter(`tableDelimiterMarker`);
                e.consume(t);
                e.exit(`tableDelimiterMarker`);
                return y;
            default:
                e.exit(`tableDelimiterFiller`);
                return y(t);
        }
    }
    function y(t) {
        if (W(t)) {
            return q(e, b, `whitespace`)(t);
        }
        return b(t);
    }
    function b(n) {
        if (n === 124) {
            return m(n);
        }
        if (n === null || H(n)) {
            if (!o || i !== a) {
                return x(n);
            }
            e.exit(`tableDelimiterRow`);
            e.exit(`tableHead`);
            return t(n);
        }
        return x(n);
    }
    function x(e) {
        return n(e);
    }
    function S(t) {
        e.enter(`tableRow`);
        return C(t);
    }
    function C(n) {
        if (n === 124) {
            e.enter(`tableCellDivider`);
            e.consume(n);
            e.exit(`tableCellDivider`);
            return C;
        }
        if (n === null || H(n)) {
            e.exit(`tableRow`);
            return t(n);
        }
        if (W(n)) {
            return q(e, C, `whitespace`)(n);
        }
        e.enter(`data`);
        return w(n);
    }
    function w(t) {
        if (t === null || t === 124 || U(t)) {
            e.exit(`data`);
            return C(t);
        }
        e.consume(t);
        if (t === 92) {
            return T;
        }
        return w;
    }
    function T(t) {
        if (t === 92 || t === 124) {
            e.consume(t);
            return w;
        }
        return w(t);
    }
}
function Ic(e, t) {
    let n = -1;
    let r = true;
    let i = 0;
    let a = [
        0,
        0,
        0,
        0
    ];
    let o = [
        0,
        0,
        0,
        0
    ];
    let s = false;
    let c = 0;
    let l;
    let u;
    let d;
    let f = new jc;
    while(++n < e.length){
        let p = e[n];
        let m = p[1];
        if (p[0] === `enter`) {
            if (m.type === `tableHead`) {
                s = false;
                if (c !== 0) {
                    Rc(f, t, c, l, u);
                    u = undefined;
                    c = 0;
                }
                l = {
                    type: `table`,
                    start: {
                        ...m.start
                    },
                    end: {
                        ...m.end
                    }
                };
                f.add(n, 0, [
                    [
                        `enter`,
                        l,
                        t
                    ]
                ]);
            } else if (m.type === `tableRow` || m.type === `tableDelimiterRow`) {
                r = true;
                d = undefined;
                a = [
                    0,
                    0,
                    0,
                    0
                ];
                o = [
                    0,
                    n + 1,
                    0,
                    0
                ];
                if (s) {
                    s = false;
                    u = {
                        type: `tableBody`,
                        start: {
                            ...m.start
                        },
                        end: {
                            ...m.end
                        }
                    };
                    f.add(n, 0, [
                        [
                            `enter`,
                            u,
                            t
                        ]
                    ]);
                }
                i = m.type === `tableDelimiterRow` ? 2 : u ? 3 : 1;
            } else if (i && (m.type === `data` || m.type === `tableDelimiterMarker` || m.type === `tableDelimiterFiller`)) {
                r = false;
                if (o[2] === 0) {
                    if (a[1] !== 0) {
                        o[0] = o[1];
                        d = Lc(f, t, a, i, undefined, d);
                        a = [
                            0,
                            0,
                            0,
                            0
                        ];
                    }
                    o[2] = n;
                }
            } else if (m.type === `tableCellDivider`) {
                if (r) {
                    r = false;
                } else {
                    if (a[1] !== 0) {
                        o[0] = o[1];
                        d = Lc(f, t, a, i, undefined, d);
                    }
                    a = o;
                    o = [
                        a[1],
                        n,
                        0,
                        0
                    ];
                }
            }
        } else if (m.type === `tableHead`) {
            s = true;
            c = n;
        } else if (m.type === `tableRow` || m.type === `tableDelimiterRow`) {
            c = n;
            if (a[1] === 0) {
                if (o[1] !== 0) {
                    d = Lc(f, t, o, i, n, d);
                }
            } else {
                o[0] = o[1];
                d = Lc(f, t, a, i, n, d);
            }
            i = 0;
        } else if (i && (m.type === `data` || m.type === `tableDelimiterMarker` || m.type === `tableDelimiterFiller`)) {
            o[3] = n;
        }
    }
    if (c !== 0) {
        Rc(f, t, c, l, u);
    }
    f.consume(t.events);
    for(n = -1; ++n < t.events.length;){
        let e = t.events[n];
        if (e[0] === `enter` && e[1].type === `table`) {
            e[1]._align = Nc(t.events, n);
        }
    }
    return e;
}
function Lc(e, t, n, r, i, a) {
    let o = r === 1 ? `tableHeader` : r === 2 ? `tableDelimiter` : `tableData`;
    if (n[0] !== 0) {
        a.end = {
            ...zc(t.events, n[0])
        };
        e.add(n[0], 0, [
            [
                `exit`,
                a,
                t
            ]
        ]);
    }
    let s = zc(t.events, n[1]);
    a = {
        type: o,
        start: {
            ...s
        },
        end: {
            ...s
        }
    };
    e.add(n[1], 0, [
        [
            `enter`,
            a,
            t
        ]
    ]);
    if (n[2] !== 0) {
        let i = zc(t.events, n[2]);
        let a = zc(t.events, n[3]);
        let o = {
            type: `tableContent`,
            start: {
                ...i
            },
            end: {
                ...a
            }
        };
        e.add(n[2], 0, [
            [
                `enter`,
                o,
                t
            ]
        ]);
        if (r !== 2) {
            let r = t.events[n[2]];
            let i = t.events[n[3]];
            r[1].end = {
                ...i[1].end
            };
            r[1].type = `chunkText`;
            r[1].contentType = `text`;
            if (n[3] > n[2] + 1) {
                let t = n[2] + 1;
                let r = n[3] - n[2] - 1;
                e.add(t, r, []);
            }
        }
        e.add(n[3] + 1, 0, [
            [
                `exit`,
                o,
                t
            ]
        ]);
    }
    if (i !== undefined) {
        a.end = {
            ...zc(t.events, i)
        };
        e.add(i, 0, [
            [
                `exit`,
                a,
                t
            ]
        ]);
        a = undefined;
    }
    return a;
}
function Rc(e, t, n, r, i) {
    let a = [];
    let o = zc(t.events, n);
    if (i) {
        i.end = {
            ...o
        };
        a.push([
            `exit`,
            i,
            t
        ]);
    }
    r.end = {
        ...o
    };
    a.push([
        `exit`,
        r,
        t
    ]);
    e.add(n + 1, 0, a);
}
function zc(events, t) {
    let n = events[t];
    let r = n[0] === `enter` ? `start` : `end`;
    return n[1][r];
}
const Bc = {
    name: `tasklistCheck`,
    tokenize: Hc
};
function Vc() {
    return {
        text: {
            91: Bc
        }
    };
}
function Hc(e, t, n) {
    let r = this;
    return i;
    function i(t) {
        if (r.previous !== null || !r._gfmTasklistFirstContentOfListItem) {
            return n(t);
        }
        e.enter(`taskListCheck`);
        e.enter(`taskListCheckMarker`);
        e.consume(t);
        e.exit(`taskListCheckMarker`);
        return a;
    }
    function a(t) {
        if (U(t)) {
            e.enter(`taskListCheckValueUnchecked`);
            e.consume(t);
            e.exit(`taskListCheckValueUnchecked`);
            return o;
        }
        if (t === 88 || t === 120) {
            e.enter(`taskListCheckValueChecked`);
            e.consume(t);
            e.exit(`taskListCheckValueChecked`);
            return o;
        }
        return n(t);
    }
    function o(t) {
        if (t === 93) {
            e.enter(`taskListCheckMarker`);
            e.consume(t);
            e.exit(`taskListCheckMarker`);
            e.exit(`taskListCheck`);
            return s;
        }
        return n(t);
    }
    function s(r) {
        if (H(r)) {
            return t(r);
        }
        if (W(r)) {
            return e.check({
                tokenize: Uc
            }, t, n)(r);
        }
        return n(r);
    }
}
function Uc(e, t, n) {
    return q(e, r, `whitespace`);
    function r(e) {
        if (e === null) {
            return n(e);
        }
        return t(e);
    }
}
function Wc(e) {
    return ct([
        sc(),
        Sc(),
        Ac(e),
        Pc(),
        Vc()
    ]);
}
const Gc = {};
function Kc(e) {
    let t = this;
    let n = e || Gc;
    let r = t.data();
    let i = r.micromarkExtensions ||= [];
    let a = r.fromMarkdownExtensions ||= [];
    let o = r.toMarkdownExtensions ||= [];
    i.push(Wc(n));
    a.push(Qs());
    o.push($s(n));
}
export { Wa as n, Kc as t };
