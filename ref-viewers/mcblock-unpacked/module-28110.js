import "./module-98301.js";
import { encodeURIPath } from "./module-77278.js";
{
    let e = require.u;
    require.u = function(...r) {
        return encodeURIPath(e(...r));
    };
}