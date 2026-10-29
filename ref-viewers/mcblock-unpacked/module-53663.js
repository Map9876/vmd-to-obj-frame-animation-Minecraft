import { setAttributesFromProps } from "./module-94681.js";
export function appBootstrap(e) {
    let t;
    let r;
    t = self.__next_s;
    r = ()=>{
        e();
    };
    if (t && t.length) {
        t.reduce((acc, [r, a])=>acc.then(()=>new Promise((resolve, reject)=>{
                    let o = document.createElement("script");
                    if (a) {
                        setAttributesFromProps(o, a);
                    }
                    if (r) {
                        o.src = r;
                        o.onload = ()=>resolve();
                        o.onerror = reject;
                    } else if (a) {
                        o.innerHTML = a.children;
                        setTimeout(resolve);
                    }
                    document.head.appendChild(o);
                })), Promise.resolve()).catch((e)=>{
            console.error(e);
        }).then(()=>{
            r();
        });
    } else {
        r();
    }
}
window.next = {
    version: "15.5.9",
    appDir: true
};
