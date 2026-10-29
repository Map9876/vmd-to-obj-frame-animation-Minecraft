import "./module-49417.js";
import "./module-86897.js";
import * as o from "./module-61426.js";
import { useRouter } from "./module-47260.js";
import { getRedirectTypeFromError, getURLFromRedirectError } from "./module-86542.js";
import { RedirectType, isRedirectError } from "./module-86437.js";
function UComponent({ redirect, reset, redirectType }) {
    let a = useRouter();
    o.useEffect(()=>{
        o.default.startTransition(()=>{
            if (redirectType === RedirectType.push) {
                a.push(redirect, {});
            } else {
                a.replace(redirect, {});
            }
            reset();
        });
    }, [
        redirect,
        redirectType,
        reset,
        a
    ]);
    return null;
}
export class RedirectErrorBoundary extends o.default.Component {
    static getDerivedStateFromError(e) {
        if (isRedirectError(e)) {
            return {
                redirect: getURLFromRedirectError(e),
                redirectType: getRedirectTypeFromError(e)
            };
        }
        throw e;
    }
    render() {
        let { redirect, redirectType } = this.state;
        if (redirect !== null && redirectType !== null) {
            return <UComponent redirect={redirect} redirectType={redirectType} reset={()=>this.setState({
                    redirect: null
                })}/>;
        }
        return this.props.children;
    }
    constructor(e){
        super(e);
        this.state = {
            redirect: null,
            redirectType: null
        };
    }
}
export function RedirectBoundary({ children }) {
    let router = useRouter();
    return <RedirectErrorBoundary router={router}>{children}</RedirectErrorBoundary>;
}
