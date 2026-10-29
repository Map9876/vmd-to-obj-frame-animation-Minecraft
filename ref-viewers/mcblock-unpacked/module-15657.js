import "./module-28140.js";
import { jsx } from "./module-86897.js";
import "./module-61426.js";
import { useRouter } from "./module-73360.js";
function o(e) {
    function t(t) {
        return jsx(e, {
            router: useRouter(),
            ...t
        });
    }
    t.getInitialProps = e.getInitialProps;
    t.origGetInitialProps = e.origGetInitialProps;
    return t;
}
export { o as default };
if ((typeof o === "function" || typeof o === "object" && o !== null) && o.__esModule === undefined) {
    Object.defineProperty(o, "__esModule", {
        value: true
    });
    o.default = o;
}
