import "./module-86897.js";
import { forwardRef } from "./module-61426.js";
import * as i from "./module-69381.js";
const a = require(97003);
let FilterChip = forwardRef(({ selected = false, count, size = "sm", children, ...rest }, ref)=><a.$ ref={ref} size={size} variant={selected ? "primary" : "secondary"} controlKind="filter" aria-pressed={selected} data-selected={selected ? "true" : "false"} {...rest}>{children}{typeof count === "number" && <i.x tone={selected ? "neutral" : "brand"}>{count}</i.x>}</a.$>);
export { FilterChip as $ };
FilterChip.displayName = "FilterChip";
