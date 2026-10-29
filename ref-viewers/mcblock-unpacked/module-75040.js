import "./module-94781.js";
import { getImageBlurSvg } from "./module-14105.js";
import { imageConfigDefault } from "./module-20821.js";
let o = [
    "-moz-initial",
    "fill",
    "none",
    "scale-down",
    undefined
];
function a(e) {
    return e.default !== undefined;
}
function l(e) {
    if (e === undefined) {
        return e;
    }
    if (typeof e === "number") {
        if (Number.isFinite(e)) {
            return e;
        }
        return NaN;
    }
    if (typeof e === "string" && /^[0-9]+$/.test(e)) {
        return parseInt(e, 10);
    }
    return NaN;
}
export function getImgProps({ src, sizes, unoptimized = false, priority = false, loading, className, quality, width, height, fill = false, style, overrideSrc, onLoad, onLoadingComplete, placeholder = "empty", blurDataURL, fetchPriority, decoding = "async", layout, objectFit, objectPosition, lazyBoundary, lazyRoot, ...rest }, { imgConf, showAltText, blurComplete, defaultLoader }) {
    let u;
    let config;
    let blurWidth;
    let blurHeight;
    let U = imgConf || imageConfigDefault;
    if ("allSizes" in U) {
        config = U;
    } else {
        let allSizes = [
            ...U.deviceSizes,
            ...U.imageSizes
        ].sort((e, t)=>e - t);
        let deviceSizes = U.deviceSizes.sort((e, t)=>e - t);
        let qualities = U.qualities?.sort((e, t)=>e - t);
        config = {
            ...U,
            allSizes,
            deviceSizes,
            qualities
        };
    }
    if (defaultLoader === undefined) {
        throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"), "__NEXT_ERROR_CODE", {
            value: "E163",
            enumerable: false,
            configurable: true
        });
    }
    let loader = rest.loader || defaultLoader;
    delete rest.loader;
    delete rest.srcSet;
    let G = "__next_img_default" in loader;
    if (G) {
        if (config.loader === "custom") {
            throw Object.defineProperty(Error(`Image with src "${src}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
                value: "E252",
                enumerable: false,
                configurable: true
            });
        }
    } else {
        let e = loader;
        loader = ({ config, ...rest })=>e(rest);
    }
    if (layout) {
        if (layout === "fill") {
            fill = true;
        }
        let e = {
            intrinsic: {
                maxWidth: "100%",
                height: "auto"
            },
            responsive: {
                width: "100%",
                height: "auto"
            }
        }[layout];
        if (e) {
            style = {
                ...style,
                ...e
            };
        }
        let t = {
            responsive: "100vw",
            fill: "100vw"
        }[layout];
        if (t && !sizes) {
            sizes = t;
        }
    }
    let q = "";
    let W = l(width);
    let V = l(height);
    if ((u = src) && typeof u === "object" && (a(u) || u.src !== undefined)) {
        let e = a(src) ? src.default : src;
        if (!e.src) {
            throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(e)}`), "__NEXT_ERROR_CODE", {
                value: "E460",
                enumerable: false,
                configurable: true
            });
        }
        if (!e.height || !e.width) {
            throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(e)}`), "__NEXT_ERROR_CODE", {
                value: "E48",
                enumerable: false,
                configurable: true
            });
        }
        blurWidth = e.blurWidth;
        blurHeight = e.blurHeight;
        blurDataURL = blurDataURL || e.blurDataURL;
        q = e.src;
        if (!fill) {
            if (W || V) {
                if (W && !V) {
                    let t = W / e.width;
                    V = Math.round(e.height * t);
                } else if (!W && V) {
                    let t = V / e.height;
                    W = Math.round(e.width * t);
                }
            } else {
                W = e.width;
                V = e.height;
            }
        }
    }
    let H = !priority && (loading === "lazy" || loading === undefined);
    if (!(src = typeof src === "string" ? src : q) || src.startsWith("data:") || src.startsWith("blob:")) {
        unoptimized = true;
        H = false;
    }
    if (config.unoptimized) {
        unoptimized = true;
    }
    if (G && !config.dangerouslyAllowSVG && src.split("?", 1)[0].endsWith(".svg")) {
        unoptimized = true;
    }
    let quality_1 = l(quality);
    let $ = Object.assign(fill ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit,
        objectPosition
    } : {}, showAltText ? {} : {
        color: "transparent"
    }, style);
    let backgroundImage = blurComplete || placeholder === "empty" ? null : placeholder === "blur" ? `url("data:image/svg+xml;charset=utf-8,${getImageBlurSvg({
        widthInt: W,
        heightInt: V,
        blurWidth,
        blurHeight,
        blurDataURL: blurDataURL || "",
        objectFit: $.objectFit
    })}")` : `url("${placeholder}")`;
    let backgroundSize = o.includes($.objectFit) ? $.objectFit === "fill" ? "100% 100%" : "cover" : $.objectFit;
    let K = backgroundImage ? {
        backgroundSize,
        backgroundPosition: $.objectPosition || "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundImage
    } : {};
    let Q = (({ config, src, unoptimized, width, quality, sizes, loader })=>{
        if (unoptimized) {
            return {
                src,
                srcSet: undefined,
                sizes: undefined
            };
        }
        let { widths, kind } = (({ deviceSizes, allSizes }, width_1, sizes_1)=>{
            if (sizes_1) {
                let e = /(^|\s)(1?\d?\d)vw/g;
                let t = [];
                for(let n; n = e.exec(sizes_1);){
                    t.push(parseInt(n[2]));
                }
                if (t.length) {
                    let e = 0.01 * Math.min(...t);
                    return {
                        widths: allSizes.filter((t)=>t >= deviceSizes[0] * e),
                        kind: "w"
                    };
                }
                return {
                    widths: allSizes,
                    kind: "w"
                };
            }
            if (typeof width_1 !== "number") {
                return {
                    widths: deviceSizes,
                    kind: "w"
                };
            }
            return {
                widths: [
                    ...new Set([
                        width_1,
                        2 * width_1
                    ].map((e)=>allSizes.find((t)=>t >= e) || allSizes[allSizes.length - 1]))
                ],
                kind: "x"
            };
        })(config, width, sizes);
        let d = widths.length - 1;
        return {
            sizes: sizes || kind !== "w" ? sizes : "100vw",
            srcSet: widths.map((width_1, n)=>`${loader({
                    config,
                    src,
                    quality,
                    width: width_1
                })} ${kind === "w" ? width_1 : n + 1}${kind}`).join(", "),
            src: loader({
                config,
                src,
                quality,
                width: widths[d]
            })
        };
    })({
        config,
        src,
        unoptimized,
        width: W,
        quality: quality_1,
        sizes,
        loader
    });
    return {
        props: {
            ...rest,
            loading: H ? "lazy" : loading,
            fetchPriority,
            width: W,
            height: V,
            decoding,
            className,
            style: {
                ...$,
                ...K
            },
            sizes: Q.sizes,
            srcSet: Q.srcSet,
            src: overrideSrc || Q.src
        },
        meta: {
            unoptimized,
            priority,
            placeholder,
            fill
        }
    };
}
