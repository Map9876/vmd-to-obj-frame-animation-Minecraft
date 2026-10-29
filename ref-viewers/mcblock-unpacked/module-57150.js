import "./module-86897.js";
import { HandleISRError } from "./module-15860.js";
let o = {
    error: {
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "28px",
        margin: "0 8px"
    }
};
let IComponent = function({ error }) {
    let r = error?.digest;
    return <html id="__next_error__"><head/><body><HandleISRError error={error}/><div style={o.error}><div><h2 style={o.text}>Application error: a {r ? "server" : "client"}-side exception has occurred while loading {window.location.hostname} (see the {r ? "server logs" : "browser console"} for more information).</h2>{r ? <p style={o.text}>{`Digest: ${r}`}</p> : null}</div></div></body></html>;
};
export { IComponent as default };
if ((typeof IComponent === "function" || typeof IComponent === "object" && IComponent !== null) && IComponent.__esModule === undefined) {
    Object.defineProperty(IComponent, "__esModule", {
        value: true
    });
    IComponent.default = IComponent;
}
