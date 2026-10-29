import { Children, useEffect, useLayoutEffect } from "./module-61426.js";
let o = useLayoutEffect;
let l = useEffect;
function i(e) {
    let { headManager, reduceComponentsToState } = e;
    function i() {
        if (headManager && headManager.mountedInstances) {
            let o = Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(o, e));
        }
    }
    o(()=>{
        headManager?.mountedInstances?.add(e.children);
        return ()=>{
            headManager?.mountedInstances?.delete(e.children);
        };
    });
    o(()=>{
        if (headManager) {
            headManager._pendingUpdate = i;
        }
        return ()=>{
            if (headManager) {
                headManager._pendingUpdate = i;
            }
        };
    });
    l(()=>{
        if (headManager && headManager._pendingUpdate) {
            headManager._pendingUpdate();
            headManager._pendingUpdate = null;
        }
        return ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
        };
    });
    return null;
}
export { i as default };
