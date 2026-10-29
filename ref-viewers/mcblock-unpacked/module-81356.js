import "./module-28140.js";
import "./module-49417.js";
import { jsx } from "./module-86897.js";
import { forwardRef, use, useCallback, useContext, useEffect, useMemo, useRef, useState } from "./module-61426.js";
import l from "./module-47650.js";
import U from "./module-74841.js";
import { getImgProps } from "./module-75040.js";
import { imageConfigDefault } from "./module-20821.js";
import { ImageConfigContext } from "./module-33455.js";
import "./module-94781.js";
import f from "./module-79862.js";
import defaultLoader from "./module-71124.js";
import { useMergedRef } from "./module-83011.js";
let m = {
    deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
    ],
    imageSizes: [
        16,
        32,
        48,
        64,
        96,
        128,
        256,
        384
    ],
    path: "/_next/image",
    loader: "default",
    dangerouslyAllowSVG: false,
    unoptimized: false
};
function h(e, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, o, a) {
    let l = e?.src;
    if (e && e["data-loaded-src"] !== l) {
        e["data-loaded-src"] = l;
        ("decode" in e ? e.decode() : Promise.resolve()).catch(()=>{}).then(()=>{
            if (e.parentElement && e.isConnected) {
                if (placeholder !== "empty") {
                    setBlurComplete(true);
                }
                if (onLoadRef?.current) {
                    let nativeEvent = new Event("load");
                    Object.defineProperty(nativeEvent, "target", {
                        writable: false,
                        value: e
                    });
                    let n = false;
                    let i = false;
                    onLoadRef.current({
                        ...nativeEvent,
                        nativeEvent,
                        currentTarget: e,
                        target: e,
                        isDefaultPrevented: ()=>n,
                        isPropagationStopped: ()=>i,
                        persist: ()=>{},
                        preventDefault: ()=>{
                            n = true;
                            nativeEvent.preventDefault();
                        },
                        stopPropagation: ()=>{
                            i = true;
                            nativeEvent.stopPropagation();
                        }
                    });
                }
                if (onLoadingCompleteRef?.current) {
                    onLoadingCompleteRef.current(e);
                }
            }
        });
    }
}
function b(fetchPriority) {
    if (use) {
        return {
            fetchPriority
        };
    }
    return {
        fetchpriority: fetchPriority
    };
}
let v = forwardRef(({ src, srcSet, sizes, height, width, decoding, className, style, fetchPriority, placeholder, loading, unoptimized, fill, onLoadRef, onLoadingCompleteRef, setBlurComplete, setShowAltText, sizesInput, onLoad, onError, ...rest }, t)=>{
    let E = useCallback((e)=>{
        if (e) {
            if (onError) {
                e.src = e.src;
            }
            if (e.complete) {
                h(e, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
            }
        }
    }, [
        src,
        placeholder,
        onLoadRef,
        onLoadingCompleteRef,
        setBlurComplete,
        onError,
        unoptimized,
        sizesInput
    ]);
    let z = useMergedRef(t, E);
    return <img {...rest} {...b(fetchPriority)} loading={loading} width={width} height={height} decoding={decoding} data-nimg={fill ? "fill" : "1"} className={className} style={style} sizes={sizes} srcSet={srcSet} src={src} ref={z} onLoad={(e)=>{
        h(e.currentTarget, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
    }} onError={(e)=>{
        setShowAltText(true);
        if (placeholder !== "empty") {
            setBlurComplete(true);
        }
        if (onError) {
            onError(e);
        }
    }}/>;
});
function YComponent({ isAppRouter, imgAttributes }) {
    let n = {
        as: "image",
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: imgAttributes.crossOrigin,
        referrerPolicy: imgAttributes.referrerPolicy,
        ...b(imgAttributes.fetchPriority)
    };
    if (isAppRouter && l.preload) {
        l.preload(imgAttributes.src, n);
        return null;
    }
    return <U><link key={`__nimg-${imgAttributes.src}${imgAttributes.srcSet}${imgAttributes.sizes}`} rel="preload" href={imgAttributes.srcSet ? undefined : imgAttributes.src} {...n}/></U>;
}
export let Image = forwardRef((e, t)=>{
    let r = useContext(f.RouterContext);
    let n = useContext(ImageConfigContext);
    let imgConf = useMemo(()=>{
        let t = m || n || imageConfigDefault;
        let allSizes = [
            ...t.deviceSizes,
            ...t.imageSizes
        ].sort((e, t)=>e - t);
        let deviceSizes = t.deviceSizes.sort((e, t)=>e - t);
        let qualities = t.qualities?.sort((e, t)=>e - t);
        return {
            ...t,
            allSizes,
            deviceSizes,
            qualities
        };
    }, [
        n
    ]);
    let { onLoad, onLoadingComplete } = e;
    let gRef = useRef(onLoad);
    useEffect(()=>{
        gRef.current = onLoad;
    }, [
        onLoad
    ]);
    let hRef = useRef(onLoadingComplete);
    useEffect(()=>{
        hRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    let [blurComplete, setBlurComplete] = useState(false);
    let [showAltText, setShowAltText] = useState(false);
    let { props, meta } = getImgProps(e, {
        defaultLoader,
        imgConf,
        blurComplete,
        showAltText
    });
    return <>{jsx(v, {
        ...props,
        unoptimized: meta.unoptimized,
        placeholder: meta.placeholder,
        fill: meta.fill,
        onLoadRef: gRef,
        onLoadingCompleteRef: hRef,
        setBlurComplete,
        setShowAltText,
        sizesInput: e.sizes,
        ref: t
    })}{meta.priority ? <YComponent isAppRouter={!r} imgAttributes={props}/> : null}</>;
});
