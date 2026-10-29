import { Children, useEffect, useLayoutEffect } from "./module-61426.js";
let i = useLayoutEffect;
let o = useEffect;
function a(e) {
    let { headManager, reduceComponentsToState } = e;
    function a() {
        if (headManager && headManager.mountedInstances) {
            let i = Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(i, e));
        }
    }
    i(()=>{
        headManager?.mountedInstances?.add(e.children);
        return ()=>{
            headManager?.mountedInstances?.delete(e.children);
        };
    });
    i(()=>{
        if (headManager) {
            headManager._pendingUpdate = a;
        }
        return ()=>{
            if (headManager) {
                headManager._pendingUpdate = a;
            }
        };
    });
    o(()=>{
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
export { a as default };
