import { d, p } from "../schemas-Y3Thg5L-.js";
export const M = p().trim().min(1).max(80);
export const N = d({
    id: p().min(1),
    fileName: p().min(1).max(255)
});
export const P = p().max(10000);
