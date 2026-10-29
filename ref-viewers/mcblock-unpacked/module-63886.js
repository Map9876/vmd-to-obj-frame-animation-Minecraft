import "./module-49417.js";
import "./module-86897.js";
import * as o from "./module-61426.js";
import { useUntrackedPathname } from "./module-51486.js";
import { HTTPAccessErrorStatus, getAccessFallbackHTTPStatus, isHTTPAccessFallbackError } from "./module-37099.js";
import "./module-94781.js";
import { MissingSlotContext } from "./module-46752.js";
class U extends o.default.Component {
    componentDidCatch() {}
    static getDerivedStateFromError(e) {
        if (isHTTPAccessFallbackError(e)) {
            return {
                triggeredStatus: getAccessFallbackHTTPStatus(e)
            };
        }
        throw e;
    }
    static getDerivedStateFromProps(e, t) {
        if (e.pathname !== t.previousPathname && t.triggeredStatus) {
            return {
                triggeredStatus: undefined,
                previousPathname: e.pathname
            };
        }
        return {
            triggeredStatus: t.triggeredStatus,
            previousPathname: e.pathname
        };
    }
    render() {
        let { notFound, forbidden, unauthorized, children } = this.props;
        let { triggeredStatus } = this.state;
        let i = {
            [HTTPAccessErrorStatus.NOT_FOUND]: notFound,
            [HTTPAccessErrorStatus.FORBIDDEN]: forbidden,
            [HTTPAccessErrorStatus.UNAUTHORIZED]: unauthorized
        };
        if (triggeredStatus) {
            let l = triggeredStatus === HTTPAccessErrorStatus.NOT_FOUND && notFound;
            let u = triggeredStatus === HTTPAccessErrorStatus.FORBIDDEN && forbidden;
            let c = triggeredStatus === HTTPAccessErrorStatus.UNAUTHORIZED && unauthorized;
            if (l || u || c) {
                return <><meta name="robots" content="noindex"/>{i[triggeredStatus]}</>;
            }
            return children;
        }
        return children;
    }
    constructor(e){
        super(e);
        this.state = {
            triggeredStatus: undefined,
            previousPathname: e.pathname
        };
    }
}
export function HTTPAccessFallbackBoundary({ notFound, forbidden, unauthorized, children }) {
    let pathname = useUntrackedPathname();
    let missingSlots = o.useContext(MissingSlotContext);
    if (notFound || forbidden || unauthorized) {
        return <U pathname={pathname} notFound={notFound} forbidden={forbidden} unauthorized={unauthorized} missingSlots={missingSlots}>{children}</U>;
    }
    return <>{children}</>;
}
