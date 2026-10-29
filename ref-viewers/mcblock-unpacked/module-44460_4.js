import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
import { cn } from "./module-25016_6.js";
import { $ } from "./module-97003_5.js";
import { sf } from "./module-68401_6.js";
let IconButton = forwardRef(({ label, size = "md", className, title, children, ...rest }, ref)=><$ ref={ref} size={size} controlKind="icon" aria-label={label} title={title ?? label} className={cn(sf[size], className)} {...rest}>{children}</$>);
export { IconButton as K };
IconButton.displayName = "IconButton";
