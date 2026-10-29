import { LoY, qUd, qtW } from "./module-85339.js";
class o {
    constructor(){
        this.isPass = true;
        this.enabled = true;
        this.needsSwap = true;
        this.clear = false;
        this.renderToScreen = false;
    }
    setSize() {}
    render() {
        console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
    dispose() {}
}
export { o };
new qUd(-1, 1, 1, -1, 0, 1);
class i extends LoY {
    constructor(){
        super();
        this.setAttribute("position", new qtW([
            -1,
            3,
            0,
            -1,
            -1,
            0,
            3,
            -1,
            0
        ], 3));
        this.setAttribute("uv", new qtW([
            0,
            2,
            0,
            0,
            2,
            0
        ], 2));
    }
}
new i;
