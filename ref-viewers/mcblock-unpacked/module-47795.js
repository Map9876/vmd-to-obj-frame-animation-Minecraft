import { Tl, v3, vt } from "./module-85250.js";
import { gw } from "./module-45723.js";
import { e as e_1 } from "./module-31206.js";
import { A } from "./module-89268.js";
export class L extends A {
    item;
    resources;
    mesh;
    atlasTexture;
    constructor(e, t, r, s = {}){
        super(e);
        this.item = t;
        this.resources = r;
        this.updateMesh(s);
        this.atlasTexture = this.createAtlasTexture(this.resources.getTextureAtlas());
    }
    setItem(e, t = {}) {
        this.item = e;
        this.updateMesh(t);
    }
    updateMesh(e = {}) {
        this.mesh = L.getItemMesh(this.item, this.resources, e);
        this.mesh.computeNormals();
        this.mesh.rebuild(this.gl, {
            pos: true,
            color: true,
            texture: true,
            normal: true
        });
    }
    static getItemMesh(e, t, r) {
        let s = e.getComponent("item_model", t)?.getAsString();
        if (s === undefined) {
            return new e_1;
        }
        let a = t.getItemModel(gw.parse(s));
        if (!a) {
            throw Error(`Item model ${s} does not exist (defined by item ${e.toString()})`);
        }
        return a.getMesh(e, t, r);
    }
    getPerspective() {
        let e = vt();
        v3(e, 0, 16, 0, 16, 0.1, 500);
        return e;
    }
    drawItem() {
        let e = vt();
        Tl(e, e, [
            0,
            0,
            -32
        ]);
        this.setShader(this.shaderProgram);
        this.setTexture(this.atlasTexture, this.resources.getPixelSize?.());
        this.prepareDraw(e);
        this.drawMesh(this.mesh, {
            pos: true,
            color: true,
            texture: true,
            normal: true
        });
    }
}
