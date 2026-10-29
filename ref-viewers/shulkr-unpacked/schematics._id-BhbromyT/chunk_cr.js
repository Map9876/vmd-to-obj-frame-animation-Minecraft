import { G } from "../useScrollLock-B98zsivK.js";
import { rr } from "./chunk_rr.js";
export function cr(e) {
    return e != null && e.length > 0 && typeof e[0] == `object` && e[0] != null && `items` in e[0];
}
function lr(items) {
    if (!Array.isArray(items)) {
        return items != null && `null` in items;
    }
    let t = items;
    if (cr(t)) {
        for (let e of t){
            for (let t of e.items){
                if (t && t.value == null && t.label != null) {
                    return true;
                }
            }
        }
        return false;
    }
    for (let e of t){
        if (e && e.value == null && e.label != null) {
            return true;
        }
    }
    return false;
}
export const Q = {
    id: G((e)=>e.id),
    labelId: G((e)=>e.labelId),
    items: G((e)=>e.items),
    selectedValue: G((e)=>e.selectedValue),
    hasSelectionChips: G((e)=>{
        let e_selectedValue = e.selectedValue;
        return Array.isArray(e_selectedValue) && e_selectedValue.length > 0;
    }),
    hasSelectedValue: G(({ selectedValue, selectionMode })=>{
        if (selectedValue == null) {
            return false;
        }
        if (selectionMode === `multiple` && Array.isArray(selectedValue)) {
            return selectedValue.length > 0;
        }
        return true;
    }),
    hasNullItemLabel: G((e, t)=>{
        if (t) {
            return lr(e.items);
        }
        return false;
    }),
    open: G((e)=>e.open),
    mounted: G((e)=>e.mounted),
    forceMounted: G((e)=>e.forceMounted),
    inline: G((e)=>e.inline),
    activeIndex: G((e)=>e.activeIndex),
    selectedIndex: G((e)=>e.selectedIndex),
    isActive: G((e, t)=>e.activeIndex === t),
    isSelected: G((e, t)=>{
        let e_isItemEqualToValue = e.isItemEqualToValue;
        let e_selectedValue = e.selectedValue;
        if (Array.isArray(e_selectedValue)) {
            return e_selectedValue.some((e)=>rr(t, e, e_isItemEqualToValue));
        }
        return rr(t, e_selectedValue, e_isItemEqualToValue);
    }),
    transitionStatus: G((e)=>e.transitionStatus),
    popupProps: G((e)=>e.popupProps),
    inputProps: G((e)=>e.inputProps),
    triggerProps: G((e)=>e.triggerProps),
    itemProps: G((e)=>e.itemProps),
    positionerElement: G((e)=>e.positionerElement),
    listElement: G((e)=>e.listElement),
    popupId: G((e)=>e.popupId),
    triggerElement: G((e)=>e.triggerElement),
    inputElement: G((e)=>e.inputElement),
    inputGroupElement: G((e)=>e.inputGroupElement),
    popupSide: G((e)=>e.popupSide),
    openMethod: G((e)=>e.openMethod),
    inputInsidePopup: G((e)=>e.inputInsidePopup),
    inputOwnsFormValue: G((e)=>e.inputOwnsFormValue),
    selectionMode: G((e)=>e.selectionMode),
    name: G((e)=>e.name),
    form: G((e)=>e.form),
    disabled: G((e)=>e.disabled),
    readOnly: G((e)=>e.readOnly),
    required: G((e)=>e.required),
    grid: G((e)=>e.grid),
    virtualized: G((e)=>e.virtualized),
    itemToStringLabel: G((e)=>e.itemToStringLabel),
    isItemEqualToValue: G((e)=>e.isItemEqualToValue),
    modal: G((e)=>e.modal),
    autoHighlight: G((e)=>e.autoHighlight),
    submitOnItemClick: G((e)=>e.submitOnItemClick)
};
