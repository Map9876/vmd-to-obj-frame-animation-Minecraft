import { uO } from "./module-28857.js";
let a = JSON.parse('{"D":[{"version":"1.21.9","commit":"e85a17c2e574c2103b0f28da9c02219a81b53297","dataVersion":4554,"sha256":"d365936ff7ed70388394f3cd4a4bf3d7ffa0414b48ba3d8e194e55f9e313d8a1","defaultRotation":"0"},{"version":"1.21.10","commit":"cb195b930dd0f9c61b6858107aaa164e19e1d323","dataVersion":4556,"sha256":"d365936ff7ed70388394f3cd4a4bf3d7ffa0414b48ba3d8e194e55f9e313d8a1","defaultRotation":"0"},{"version":"1.21.11","commit":"c976eb3b2cfcb9f205171527dec46b266afa3ac9","dataVersion":4671,"sha256":"d365936ff7ed70388394f3cd4a4bf3d7ffa0414b48ba3d8e194e55f9e313d8a1","defaultRotation":"0"},{"version":"26.1","commit":"e7068326fb23dcdff9fff17c7eabcd59f46e7460","dataVersion":4786,"sha256":"226acb5f23d8d467271d853cc762e4533511417c5ef46bc90ad9b4029b123b80","defaultRotation":"8"},{"version":"26.1.1","commit":"9ffdce1f63287433ff96f27a11d5d58599d2e0b3","dataVersion":4788,"sha256":"226acb5f23d8d467271d853cc762e4533511417c5ef46bc90ad9b4029b123b80","defaultRotation":"8"},{"version":"26.1.2","commit":"805b8ac25af336a444125f325c33b768af0c8bb3","dataVersion":4790,"sha256":"226acb5f23d8d467271d853cc762e4533511417c5ef46bc90ad9b4029b123b80","defaultRotation":"8"},{"version":"26.2","commit":"711a353b47d84e6cb592a1b72f682e5f44759284","dataVersion":4903,"sha256":"0b1470910281d2f7ac36544672fc04befcd600c9dab1574d0636727ae6531726","defaultRotation":"8"},{"version":"26.3","commit":"d96c75fec200c4580dd75e033a76341521165461","dataVersion":5023,"sha256":"4d4f4e55cddefd0d28aa28d5b92c19b29a8fe5cc6418196e73d819f4406e9ba9","defaultRotation":"8"}],"A":[{"dataVersion":4554,"defaults":{}},{"dataVersion":4556,"defaults":{}},{"dataVersion":4671,"defaults":{}},{"dataVersion":4786,"defaults":{"minecraft:acacia_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:acacia_sign":{"rotation":"8","waterlogged":"false"},"minecraft:bamboo_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:bamboo_sign":{"rotation":"8","waterlogged":"false"},"minecraft:birch_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:birch_sign":{"rotation":"8","waterlogged":"false"},"minecraft:black_banner":{"rotation":"8"},"minecraft:blue_banner":{"rotation":"8"},"minecraft:brown_banner":{"rotation":"8"},"minecraft:cherry_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:cherry_sign":{"rotation":"8","waterlogged":"false"},"minecraft:crimson_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:crimson_sign":{"rotation":"8","waterlogged":"false"},"minecraft:cyan_banner":{"rotation":"8"},"minecraft:dark_oak_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:dark_oak_sign":{"rotation":"8","waterlogged":"false"},"minecraft:gray_banner":{"rotation":"8"},"minecraft:green_banner":{"rotation":"8"},"minecraft:jungle_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:jungle_sign":{"rotation":"8","waterlogged":"false"},"minecraft:light_blue_banner":{"rotation":"8"},"minecraft:light_gray_banner":{"rotation":"8"},"minecraft:lime_banner":{"rotation":"8"},"minecraft:magenta_banner":{"rotation":"8"},"minecraft:mangrove_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:mangrove_sign":{"rotation":"8","waterlogged":"false"},"minecraft:oak_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:oak_sign":{"rotation":"8","waterlogged":"false"},"minecraft:orange_banner":{"rotation":"8"},"minecraft:pale_oak_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:pale_oak_sign":{"rotation":"8","waterlogged":"false"},"minecraft:pink_banner":{"rotation":"8"},"minecraft:purple_banner":{"rotation":"8"},"minecraft:red_banner":{"rotation":"8"},"minecraft:spruce_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:spruce_sign":{"rotation":"8","waterlogged":"false"},"minecraft:warped_hanging_sign":{"attached":"false","rotation":"8","waterlogged":"false"},"minecraft:warped_sign":{"rotation":"8","waterlogged":"false"},"minecraft:white_banner":{"rotation":"8"},"minecraft:yellow_banner":{"rotation":"8"}}},{"dataVersion":4788,"defaults":{}},{"dataVersion":4790,"defaults":{}},{"dataVersion":4903,"defaults":{}},{"dataVersion":5023,"defaults":{}}]}');
let l = new WeakMap;
export function g(e, t) {
    let sourceDataVersion = t.sourceMeta?.dataVersion;
    if (e.sourceDataVersion === sourceDataVersion) {
        return e;
    }
    let r = l.get(e);
    if (!r) {
        r = new Map;
        l.set(e, r);
    }
    let o = r.get(sourceDataVersion);
    if (!o) {
        o = {
            ...e,
            sourceDataVersion
        };
        r.set(sourceDataVersion, o);
    }
    return o;
}
export function n(e, t, n) {
    let i = n.legacyDefaultBlockProperties?.get(e) ?? n.defaultBlockProperties.get(e);
    let n_sourceDataVersion = n.sourceDataVersion;
    if (n_sourceDataVersion !== undefined && a.D.some((e)=>e.dataVersion === n_sourceDataVersion)) {
        for (let t of a.A.filter((e)=>e.dataVersion <= n_sourceDataVersion)){
            let n = t.defaults[e];
            if (n) {
                i = n;
            }
        }
    }
    return uO(t, i);
}
