import "./module-28140.js";
import "./module-86897.js";
import { Component } from "./module-61426.js";
import I from "./module-74841_2.js";
let a = {
    400: "Bad Request",
    404: "This page could not be found",
    405: "Method Not Allowed",
    500: "Internal Server Error"
};
function d({ req, res, err }) {
    return {
        statusCode: res && res.statusCode ? res.statusCode : err ? err.statusCode : 404,
        hostname: window.location.hostname
    };
}
let s = {
    error: {
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    desc: {
        lineHeight: "48px"
    },
    h1: {
        display: "inline-block",
        margin: "0 20px 0 0",
        paddingRight: 23,
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: "top"
    },
    h2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "28px"
    },
    wrap: {
        display: "inline-block"
    }
};
class ErrorPage extends Component {
    render() {
        let { statusCode, withDarkMode = true } = this.props;
        let n = this.props.title || a[statusCode] || "An unexpected error has occurred";
        return <div style={s.error}><I><title>{statusCode ? `${statusCode}: ${n}` : "Application error: a client-side exception has occurred"}</title></I><div style={s.desc}><style dangerouslySetInnerHTML={{
            __html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}${withDarkMode ? "@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}" : ""}`
        }}/>{statusCode ? <h1 className="next-error-h1" style={s.h1}>{statusCode}</h1> : null}<div style={s.wrap}><h2 style={s.h2}>{this.props.title || statusCode ? n : <>Application error: a client-side exception has occurred {!!this.props.hostname && <>while loading {this.props.hostname}</>} (see the browser console for more information)</>}.</h2></div></div></div>;
    }
}
export { ErrorPage as default };
ErrorPage.displayName = "ErrorPage";
ErrorPage.getInitialProps = d;
ErrorPage.origGetInitialProps = d;
if ((typeof ErrorPage === "function" || typeof ErrorPage === "object" && ErrorPage !== null) && ErrorPage.__esModule === undefined) {
    Object.defineProperty(ErrorPage, "__esModule", {
        value: true
    });
    ErrorPage.default = ErrorPage;
}
