import { METADATA_BOUNDARY_NAME, OUTLET_BOUNDARY_NAME, ROOT_LAYOUT_BOUNDARY_NAME, VIEWPORT_BOUNDARY_NAME } from "./module-68440.js";
let a = {
    [METADATA_BOUNDARY_NAME]: function({ children }) {
        return children;
    },
    [VIEWPORT_BOUNDARY_NAME]: function({ children }) {
        return children;
    },
    [OUTLET_BOUNDARY_NAME]: function({ children }) {
        return children;
    },
    [ROOT_LAYOUT_BOUNDARY_NAME]: function({ children }) {
        return children;
    }
};
export let MetadataBoundary = a[METADATA_BOUNDARY_NAME.slice(0)];
export let ViewportBoundary = a[VIEWPORT_BOUNDARY_NAME.slice(0)];
export let OutletBoundary = a[OUTLET_BOUNDARY_NAME.slice(0)];
export let RootLayoutBoundary = a[ROOT_LAYOUT_BOUNDARY_NAME.slice(0)];
