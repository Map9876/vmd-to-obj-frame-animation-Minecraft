import * as n from "./module-61426.js";
export let ServerInsertedHTMLContext = n.default.createContext(null);
export function useServerInsertedHTML(e) {
    let t = n.useContext(ServerInsertedHTMLContext);
    if (t) {
        t(e);
    }
}
