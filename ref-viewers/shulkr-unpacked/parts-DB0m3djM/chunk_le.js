import { n, s } from "../jsx-runtime-Db0DjQYK.js";
export const U = s(n(), 1);
let W = {
    panelOpen: false,
    accountOpen: false,
    chips: 0,
    dialogSession: null
};
const G = new Set;
function K(e) {
    W = {
        ...W,
        ...e
    };
    for (let e of G){
        e();
    }
}
function le(e) {
    G.add(e);
    return ()=>G.delete(e);
}
const ue = W;
export function de() {
    return U.useSyncExternalStore(le, ()=>W, ()=>ue);
}
export const fe = {
    setPanelOpen: (panelOpen)=>K({
            panelOpen
        }),
    setAccountOpen: (accountOpen)=>K({
            accountOpen,
            panelOpen: false
        }),
    setDialogSession: (dialogSession)=>K({
            dialogSession
        }),
    dialogSession: ()=>W.dialogSession
};
export function pe() {
    U.useEffect(()=>{
        K({
            chips: W.chips + 1
        });
        return ()=>K({
                chips: W.chips - 1
            });
    }, []);
}
