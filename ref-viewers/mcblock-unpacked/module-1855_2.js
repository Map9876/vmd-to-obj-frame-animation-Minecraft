import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
import { $ } from "./module-97003_6.js";
import * as o from "./module-69381_3.js";
let FilterChip = forwardRef(({ selected = false, count, size = "sm", children, ...rest }, ref)=><$ ref={ref} size={size} variant={selected ? "primary" : "secondary"} controlKind="filter" aria-pressed={selected} data-selected={selected ? "true" : "false"} {...rest}>{children}{typeof count === "number" && <o.x tone={selected ? "neutral" : "brand"}>{count}</o.x>}</$>);
export { FilterChip as $ };
FilterChip.displayName = "FilterChip";
