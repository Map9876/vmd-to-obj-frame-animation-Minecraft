import "./module-28140.js";
import { getImgProps } from "./module-75040.js";
import { Image } from "./module-81356.js";
import defaultLoader from "./module-71124.js";
export function getImageProps(e) {
    let { props } = getImgProps(e, {
        defaultLoader,
        imgConf: {
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
        }
    });
    for (let [e, r] of Object.entries(props)){
        if (r === undefined) {
            delete props[e];
        }
    }
    return {
        props
    };
}
let u = Image;
export { u as default };
