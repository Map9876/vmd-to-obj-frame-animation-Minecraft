import { t } from "../jsx-runtime-Db0DjQYK.js";
import { t as t_1 } from "../utils-B6KiDbIe.js";
import { Bt, Ut, Vt } from "../index-DmN1rqCo.js";
import { t as N } from "../kbd-DcmZ5JzD.js";
export const Ge = (e, t)=>{
    if (t <= 1) {
        return e;
    }
    return Math.ceil(e / t);
};
export const V = t();
export function H({ label, hint, active, disabled, onClick, side = `top`, className, children }) {
    return <Bt><Ut render=<button type={`button`} onClick={onClick} disabled={disabled} aria-label={label} aria-pressed={active} className={t_1(`grid size-8 place-items-center border border-transparent transition disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4`, active ? `border-primary bg-primary text-primary-foreground` : `text-foreground-secondary hover:border-border hover:bg-muted/70 hover:text-foreground`, className)}>{children}</button>/><Vt side={side}>{label}{hint && <N>{hint}</N>}</Vt></Bt>;
}
