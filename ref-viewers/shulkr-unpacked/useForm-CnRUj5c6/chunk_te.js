import { n, s } from "../jsx-runtime-Db0DjQYK.js";
class te {
    constructor(e, t){
        this.fn = e;
        this.options = t;
        this.lastExecutionTime = 0;
        this.isPending = false;
        this.maybeExecute = (...e)=>{
            let t = Date.now() - this.lastExecutionTime;
            if (this.options.leading && t >= this.options.wait) {
                this.execute(...e);
            } else {
                this.lastArgs = e;
                if (!this.timeoutId && this.options.trailing) {
                    let e = this.options.wait - t;
                    this.isPending = true;
                    this.timeoutId = setTimeout(()=>{
                        if (this.lastArgs !== undefined) {
                            this.execute(...this.lastArgs);
                        }
                    }, e);
                }
            }
        };
        this.execute = (...e)=>{
            this.fn(...e);
            this.options.onExecute?.(e, this);
            this.lastExecutionTime = Date.now();
            this.clearTimeout();
            this.lastArgs = undefined;
            this.isPending = false;
        };
        this.flush = ()=>{
            if (this.isPending && this.lastArgs) {
                this.execute(...this.lastArgs);
            }
        };
        this.cancel = ()=>{
            this.clearTimeout();
            this.lastArgs = undefined;
            this.isPending = false;
        };
        this.clearTimeout = ()=>{
            this.timeoutId &&= (clearTimeout(this.timeoutId), undefined);
        };
        if (this.options.leading === undefined && this.options.trailing === undefined) {
            this.options.leading = true;
            this.options.trailing = true;
        }
    }
}
export function ne(e, t) {
    return new te(e, t).maybeExecute;
}
