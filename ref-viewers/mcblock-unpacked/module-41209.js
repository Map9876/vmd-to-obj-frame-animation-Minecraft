import { startTransition } from "./module-61426.js";
import { ACTION_SERVER_ACTION } from "./module-86871.js";
import { dispatchAppRouterAction } from "./module-76248.js";
export async function callServer(actionId, actionArgs) {
    return new Promise((resolve, reject)=>{
        startTransition(()=>{
            dispatchAppRouterAction({
                type: ACTION_SERVER_ACTION,
                actionId,
                actionArgs,
                resolve,
                reject
            });
        });
    });
}
