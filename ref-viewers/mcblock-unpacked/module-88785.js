"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
((exports_1, t)=>{
    for(const r in t){
        Object.defineProperty(exports_1, r, {
            enumerable: true,
            get: t[r]
        });
    }
})(exports, {
    ErrorBoundary: function() {
        return FComponent;
    },
    ErrorBoundaryHandler: function() {
        return C;
    }
});
let n = require("./module-28140.js");
let a = require("./module-86897.js");
let o = n._(require("./module-61426.js"));
let i = require("./module-51486.js");
let s = require("./module-5829.js");
require("./module-61489.js");
let l = require("./module-15860.js");
let u = require("./module-93913.js").isBot(window.navigator.userAgent);
class C extends o.default.Component {
    static getDerivedStateFromError(error) {
        if (s.isNextRouterError(error)) {
            throw error;
        }
        return {
            error
        };
    }
    static getDerivedStateFromProps(e, t) {
        let { error } = t;
        if (e.pathname !== t.previousPathname && t.error) {
            return {
                error: null,
                previousPathname: e.pathname
            };
        }
        return {
            error: t.error,
            previousPathname: e.pathname
        };
    }
    render() {
        if (this.state.error && !u) {
            return <><l.HandleISRError error={this.state.error}/>{this.props.errorStyles}{this.props.errorScripts}{a.jsx(this.props.errorComponent, {
                error: this.state.error,
                reset: this.reset
            })}</>;
        }
        return this.props.children;
    }
    constructor(e){
        super(e);
        this.reset = ()=>{
            this.setState({
                error: null
            });
        };
        this.state = {
            error: null,
            previousPathname: this.props.pathname
        };
    }
}
function FComponent({ errorComponent, errorStyles, errorScripts, children }) {
    let pathname = i.useUntrackedPathname();
    if (errorComponent) {
        return <C pathname={pathname} errorComponent={errorComponent} errorStyles={errorStyles} errorScripts={errorScripts}>{children}</C>;
    }
    return <>{children}</>;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && exports.default.__esModule === undefined) {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
