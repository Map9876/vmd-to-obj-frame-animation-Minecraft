export let a3 = 0;
export let F3 = 1;
export let TJ = 2;
export function N8(e, t) {
    e.setAttribute("http.response.status_code", t);
    let r = ((e)=>{
        if (e < 400 && e >= 100) {
            return {
                code: F3
            };
        }
        if (e >= 400 && e < 500) {
            switch(e){
                case 401:
                    return {
                        code: TJ,
                        message: "unauthenticated"
                    };
                case 403:
                    return {
                        code: TJ,
                        message: "permission_denied"
                    };
                case 404:
                    return {
                        code: TJ,
                        message: "not_found"
                    };
                case 409:
                    return {
                        code: TJ,
                        message: "already_exists"
                    };
                case 413:
                    return {
                        code: TJ,
                        message: "failed_precondition"
                    };
                case 429:
                    return {
                        code: TJ,
                        message: "resource_exhausted"
                    };
                case 499:
                    return {
                        code: TJ,
                        message: "cancelled"
                    };
                default:
                    return {
                        code: TJ,
                        message: "invalid_argument"
                    };
            }
        }
        if (e >= 500 && e < 600) {
            switch(e){
                case 501:
                    return {
                        code: TJ,
                        message: "unimplemented"
                    };
                case 503:
                    return {
                        code: TJ,
                        message: "unavailable"
                    };
                case 504:
                    return {
                        code: TJ,
                        message: "deadline_exceeded"
                    };
            }
        }
        return {
            code: TJ,
            message: "internal_error"
        };
    })(t);
    if (r.message !== "unknown_error") {
        e.setStatus(r);
    }
}
