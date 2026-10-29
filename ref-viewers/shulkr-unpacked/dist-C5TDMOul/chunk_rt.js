import { _ } from "../dist-C66QuM2X.js";
import { k } from "./chunk_ye.js";
const rt = _.map((e)=>`.${k[e].extension}`);
function it(fileName) {
    let t = fileName.toLowerCase();
    return rt.some((e)=>t.endsWith(e));
}
function at(e) {
    try {
        let t = (typeof e == `string` ? new URL(e) : e).pathname.split(`/`).filter(Boolean).pop();
        if (!t) {
            return `schematic`;
        }
        try {
            return decodeURIComponent(t);
        } catch  {
            return t;
        }
    } catch  {
        return `schematic`;
    }
}
export function ot(e) {
    let t = e.trim();
    if (!t) {
        return {
            ok: false,
            error: `Please enter a URL.`
        };
    }
    if (t.length > 4096) {
        return {
            ok: false,
            error: `URL is too long.`
        };
    }
    let n;
    try {
        n = new URL(t);
    } catch  {
        return {
            ok: false,
            error: `Invalid URL — enter a full URL starting with https://`
        };
    }
    if (n.protocol !== `http:` && n.protocol !== `https:`) {
        return {
            ok: false,
            error: `Only HTTP and HTTPS URLs are supported.`
        };
    }
    if (n.username || n.password) {
        return {
            ok: false,
            error: `URLs with embedded credentials are not supported.`
        };
    }
    let fileName = at(n);
    if (it(fileName)) {
        return {
            ok: true,
            url: n.toString(),
            fileName
        };
    }
    return {
        ok: false,
        error: `The URL must point to a .schem, .litematic, .nbt, or .mcstructure file.`
    };
}
