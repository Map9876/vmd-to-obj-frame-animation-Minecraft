import "./module-86897.js";
import { Component, createRef } from "./module-61426.js";
export class GracefulDegradeBoundary extends Component {
    static getDerivedStateFromError(e) {
        return {
            hasError: true
        };
    }
    componentDidMount() {
        let current = this.htmlRef.current;
        if (this.state.hasError && current) {
            Object.entries(this.htmlAttributes).forEach(([r, n])=>{
                current.setAttribute(r, n);
            });
        }
    }
    render() {
        let { hasError } = this.state;
        if (!this.rootHtml) {
            this.rootHtml = document.documentElement.innerHTML;
            this.htmlAttributes = ((e)=>{
                let t = {};
                for(let r = 0; r < e.attributes.length; r++){
                    let attribute = e.attributes[r];
                    t[attribute.name] = attribute.value;
                }
                return t;
            })(document.documentElement);
        }
        if (hasError) {
            return <html ref={this.htmlRef} suppressHydrationWarning dangerouslySetInnerHTML={{
                __html: this.rootHtml
            }}/>;
        }
        return this.props.children;
    }
    constructor(e){
        super(e);
        this.state = {
            hasError: false
        };
        this.rootHtml = "";
        this.htmlAttributes = {};
        this.htmlRef = createRef();
    }
}
let i = GracefulDegradeBoundary;
export { i as default };
if ((typeof i === "function" || typeof i === "object" && i !== null) && i.__esModule === undefined) {
    Object.defineProperty(i, "__esModule", {
        value: true
    });
    Object.assign(i, {
        GracefulDegradeBoundary,
        default: i
    });
}
