import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
const l = require(25016);
let n = {
    sm: "px-cn-3 py-cn-2 text-sm",
    md: "px-cn-4 py-cn-3 text-base",
    lg: "px-cn-6 py-cn-4 text-md"
};
let Input = forwardRef(({ inputSize = "md", className, type = "text", ...rest }, ref)=><input ref={ref} type={type} className={l.cn("w-full rounded border-2 border-border-hard bg-bg-card text-text-primary placeholder:text-text-muted transition-colors duration-fast focus:outline-none focus:border-brand-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-card", n[inputSize], className)} {...rest}/>);
export { Input as p };
Input.displayName = "Input";
