import { l } from "../dist-C5TDMOul.js";
import { W } from "./chunk_kc.js";
import { B } from "./chunk_$s.js";
import { cl } from "./chunk_Vc.js";
import { Vs } from "./chunk_go.js";
import { Nu, Zd } from "./chunk_Pl.js";
import { X } from "./chunk_Ys.js";
import { H } from "./chunk_ac.js";
import { q } from "./chunk_Rc.js";
export function Rf(e) {
    let t = {};
    for(let n in e){
        t[n] = {};
        for(let r in e[n]){
            let i = e[n][r];
            if (i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion)) {
                if (i.isRenderTargetTexture) {
                    B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`);
                    t[n][r] = null;
                } else {
                    t[n][r] = i.clone();
                }
            } else if (Array.isArray(i)) {
                t[n][r] = i.slice();
            } else {
                t[n][r] = i;
            }
        }
    }
    return t;
}
export function zf(e) {
    let t = {};
    for(let n = 0; n < e.length; n++){
        let r = Rf(e[n]);
        for(let e in r){
            t[e] = r[e];
        }
    }
    return t;
}
function Bf(uniformsGroups) {
    let t = [];
    for(let n = 0; n < uniformsGroups.length; n++){
        t.push(uniformsGroups[n].clone());
    }
    return t;
}
export function Vf(e) {
    let t = e.getRenderTarget();
    if (t === null) {
        return e.outputColorSpace;
    }
    if (t.isXRRenderTarget === true) {
        return t.texture.colorSpace;
    }
    return q.workingColorSpace;
}
export const Hf = {
    clone: Rf,
    merge: zf
};
const Uf = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;
const Wf = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
export class Gf extends Nu {
    constructor(e){
        super();
        this.isShaderMaterial = true;
        this.type = `ShaderMaterial`;
        this.defines = {};
        this.uniforms = {};
        this.uniformsGroups = [];
        this.vertexShader = Uf;
        this.fragmentShader = Wf;
        this.linewidth = 1;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.fog = false;
        this.lights = false;
        this.clipping = false;
        this.forceSinglePass = true;
        this.extensions = {
            clipCullDistance: false,
            multiDraw: false
        };
        this.defaultAttributeValues = {
            color: [
                1,
                1,
                1
            ],
            uv: [
                0,
                0
            ],
            uv1: [
                0,
                0
            ]
        };
        this.index0AttributeName = undefined;
        this.uniformsNeedUpdate = false;
        this.glslVersion = null;
        if (e !== undefined) {
            this.setValues(e);
        }
    }
    copy(e) {
        super.copy(e);
        this.fragmentShader = e.fragmentShader;
        this.vertexShader = e.vertexShader;
        this.uniforms = Rf(e.uniforms);
        this.uniformsGroups = Bf(e.uniformsGroups);
        this.defines = {
            ...e.defines
        };
        this.wireframe = e.wireframe;
        this.wireframeLinewidth = e.wireframeLinewidth;
        this.fog = e.fog;
        this.lights = e.lights;
        this.clipping = e.clipping;
        this.extensions = {
            ...e.extensions
        };
        this.glslVersion = e.glslVersion;
        this.defaultAttributeValues = {
            ...e.defaultAttributeValues
        };
        this.index0AttributeName = e.index0AttributeName;
        this.uniformsNeedUpdate = e.uniformsNeedUpdate;
        return this;
    }
    toJSON(e) {
        let t = super.toJSON(e);
        t.glslVersion = this.glslVersion;
        t.uniforms = {};
        for(let n in this.uniforms){
            let r = this.uniforms[n].value;
            if (r && r.isTexture) {
                t.uniforms[n] = {
                    type: `t`,
                    value: r.toJSON(e).uuid
                };
            } else if (r && r.isColor) {
                t.uniforms[n] = {
                    type: `c`,
                    value: r.getHex()
                };
            } else if (r && r.isVector2) {
                t.uniforms[n] = {
                    type: `v2`,
                    value: r.toArray()
                };
            } else if (r && r.isVector3) {
                t.uniforms[n] = {
                    type: `v3`,
                    value: r.toArray()
                };
            } else if (r && r.isVector4) {
                t.uniforms[n] = {
                    type: `v4`,
                    value: r.toArray()
                };
            } else if (r && r.isMatrix3) {
                t.uniforms[n] = {
                    type: `m3`,
                    value: r.toArray()
                };
            } else if (r && r.isMatrix4) {
                t.uniforms[n] = {
                    type: `m4`,
                    value: r.toArray()
                };
            } else {
                t.uniforms[n] = {
                    value: r
                };
            }
        }
        if (Object.keys(this.defines).length > 0) {
            t.defines = this.defines;
        }
        t.vertexShader = this.vertexShader;
        t.fragmentShader = this.fragmentShader;
        t.lights = this.lights;
        t.clipping = this.clipping;
        let n = {};
        for(let e in this.extensions){
            if (this.extensions[e] === true) {
                n[e] = true;
            }
        }
        if (Object.keys(n).length > 0) {
            t.extensions = n;
        }
        return t;
    }
}
export class Kf extends Gf {
    constructor(e){
        super(e);
        this.isRawShaderMaterial = true;
        this.type = `RawShaderMaterial`;
    }
}
export class qf extends Nu {
    constructor(e){
        super();
        this.isMeshStandardMaterial = true;
        this.type = `MeshStandardMaterial`;
        this.defines = {
            STANDARD: ``
        };
        this.color = new X(16777215);
        this.roughness = 1;
        this.metalness = 0;
        this.map = null;
        this.lightMap = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.emissive = new X(0);
        this.emissiveIntensity = 1;
        this.emissiveMap = null;
        this.bumpMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalMapType = 0;
        this.normalScale = new W(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.roughnessMap = null;
        this.metalnessMap = null;
        this.alphaMap = null;
        this.envMap = null;
        this.envMapRotation = new cl;
        this.envMapIntensity = 1;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = `round`;
        this.wireframeLinejoin = `round`;
        this.flatShading = false;
        this.fog = true;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.defines = {
            STANDARD: ``
        };
        this.color.copy(e.color);
        this.roughness = e.roughness;
        this.metalness = e.metalness;
        this.map = e.map;
        this.lightMap = e.lightMap;
        this.lightMapIntensity = e.lightMapIntensity;
        this.aoMap = e.aoMap;
        this.aoMapIntensity = e.aoMapIntensity;
        this.emissive.copy(e.emissive);
        this.emissiveMap = e.emissiveMap;
        this.emissiveIntensity = e.emissiveIntensity;
        this.bumpMap = e.bumpMap;
        this.bumpScale = e.bumpScale;
        this.normalMap = e.normalMap;
        this.normalMapType = e.normalMapType;
        this.normalScale.copy(e.normalScale);
        this.displacementMap = e.displacementMap;
        this.displacementScale = e.displacementScale;
        this.displacementBias = e.displacementBias;
        this.roughnessMap = e.roughnessMap;
        this.metalnessMap = e.metalnessMap;
        this.alphaMap = e.alphaMap;
        this.envMap = e.envMap;
        this.envMapRotation.copy(e.envMapRotation);
        this.envMapIntensity = e.envMapIntensity;
        this.wireframe = e.wireframe;
        this.wireframeLinewidth = e.wireframeLinewidth;
        this.wireframeLinecap = e.wireframeLinecap;
        this.wireframeLinejoin = e.wireframeLinejoin;
        this.flatShading = e.flatShading;
        this.fog = e.fog;
        return this;
    }
}
export class Jf extends qf {
    constructor(e){
        super();
        this.isMeshPhysicalMaterial = true;
        this.defines = {
            STANDARD: ``,
            PHYSICAL: ``
        };
        this.type = `MeshPhysicalMaterial`;
        this.anisotropyRotation = 0;
        this.anisotropyMap = null;
        this.clearcoatMap = null;
        this.clearcoatRoughness = 0;
        this.clearcoatRoughnessMap = null;
        this.clearcoatNormalScale = new W(1, 1);
        this.clearcoatNormalMap = null;
        this.ior = 1.5;
        Object.defineProperty(this, "reflectivity", {
            get: function() {
                return H(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
            },
            set: function(e) {
                this.ior = (1 + 0.4 * e) / (1 - 0.4 * e);
            }
        });
        this.iridescenceMap = null;
        this.iridescenceIOR = 1.3;
        this.iridescenceThicknessRange = [
            100,
            400
        ];
        this.iridescenceThicknessMap = null;
        this.sheenColor = new X(0);
        this.sheenColorMap = null;
        this.sheenRoughness = 1;
        this.sheenRoughnessMap = null;
        this.transmissionMap = null;
        this.thickness = 0;
        this.thicknessMap = null;
        this.attenuationDistance = Infinity;
        this.attenuationColor = new X(1, 1, 1);
        this.specularIntensity = 1;
        this.specularIntensityMap = null;
        this.specularColor = new X(1, 1, 1);
        this.specularColorMap = null;
        this._anisotropy = 0;
        this._clearcoat = 0;
        this._dispersion = 0;
        this._iridescence = 0;
        this._sheen = 0;
        this._transmission = 0;
        this.setValues(e);
    }
    get anisotropy() {
        return this._anisotropy;
    }
    set anisotropy(e) {
        if (this._anisotropy > 0 != e > 0) {
            this.version++;
        }
        this._anisotropy = e;
    }
    get clearcoat() {
        return this._clearcoat;
    }
    set clearcoat(e) {
        if (this._clearcoat > 0 != e > 0) {
            this.version++;
        }
        this._clearcoat = e;
    }
    get iridescence() {
        return this._iridescence;
    }
    set iridescence(e) {
        if (this._iridescence > 0 != e > 0) {
            this.version++;
        }
        this._iridescence = e;
    }
    get dispersion() {
        return this._dispersion;
    }
    set dispersion(e) {
        if (this._dispersion > 0 != e > 0) {
            this.version++;
        }
        this._dispersion = e;
    }
    get sheen() {
        return this._sheen;
    }
    set sheen(e) {
        if (this._sheen > 0 != e > 0) {
            this.version++;
        }
        this._sheen = e;
    }
    get transmission() {
        return this._transmission;
    }
    set transmission(e) {
        if (this._transmission > 0 != e > 0) {
            this.version++;
        }
        this._transmission = e;
    }
    copy(e) {
        super.copy(e);
        this.defines = {
            STANDARD: ``,
            PHYSICAL: ``
        };
        this.anisotropy = e.anisotropy;
        this.anisotropyRotation = e.anisotropyRotation;
        this.anisotropyMap = e.anisotropyMap;
        this.clearcoat = e.clearcoat;
        this.clearcoatMap = e.clearcoatMap;
        this.clearcoatRoughness = e.clearcoatRoughness;
        this.clearcoatRoughnessMap = e.clearcoatRoughnessMap;
        this.clearcoatNormalMap = e.clearcoatNormalMap;
        this.clearcoatNormalScale.copy(e.clearcoatNormalScale);
        this.dispersion = e.dispersion;
        this.ior = e.ior;
        this.iridescence = e.iridescence;
        this.iridescenceMap = e.iridescenceMap;
        this.iridescenceIOR = e.iridescenceIOR;
        this.iridescenceThicknessRange = [
            ...e.iridescenceThicknessRange
        ];
        this.iridescenceThicknessMap = e.iridescenceThicknessMap;
        this.sheen = e.sheen;
        this.sheenColor.copy(e.sheenColor);
        this.sheenColorMap = e.sheenColorMap;
        this.sheenRoughness = e.sheenRoughness;
        this.sheenRoughnessMap = e.sheenRoughnessMap;
        this.transmission = e.transmission;
        this.transmissionMap = e.transmissionMap;
        this.thickness = e.thickness;
        this.thicknessMap = e.thicknessMap;
        this.attenuationDistance = e.attenuationDistance;
        this.attenuationColor.copy(e.attenuationColor);
        this.specularIntensity = e.specularIntensity;
        this.specularIntensityMap = e.specularIntensityMap;
        this.specularColor.copy(e.specularColor);
        this.specularColorMap = e.specularColorMap;
        return this;
    }
}
export class Yf extends Nu {
    constructor(e){
        super();
        this.isMeshPhongMaterial = true;
        this.type = `MeshPhongMaterial`;
        this.color = new X(16777215);
        this.specular = new X(1118481);
        this.shininess = 30;
        this.map = null;
        this.lightMap = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.emissive = new X(0);
        this.emissiveIntensity = 1;
        this.emissiveMap = null;
        this.bumpMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalMapType = 0;
        this.normalScale = new W(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.specularMap = null;
        this.alphaMap = null;
        this.envMap = null;
        this.envMapRotation = new cl;
        this.combine = 0;
        this.reflectivity = 1;
        this.envMapIntensity = 1;
        this.refractionRatio = 0.98;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = `round`;
        this.wireframeLinejoin = `round`;
        this.flatShading = false;
        this.fog = true;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.color.copy(e.color);
        this.specular.copy(e.specular);
        this.shininess = e.shininess;
        this.map = e.map;
        this.lightMap = e.lightMap;
        this.lightMapIntensity = e.lightMapIntensity;
        this.aoMap = e.aoMap;
        this.aoMapIntensity = e.aoMapIntensity;
        this.emissive.copy(e.emissive);
        this.emissiveMap = e.emissiveMap;
        this.emissiveIntensity = e.emissiveIntensity;
        this.bumpMap = e.bumpMap;
        this.bumpScale = e.bumpScale;
        this.normalMap = e.normalMap;
        this.normalMapType = e.normalMapType;
        this.normalScale.copy(e.normalScale);
        this.displacementMap = e.displacementMap;
        this.displacementScale = e.displacementScale;
        this.displacementBias = e.displacementBias;
        this.specularMap = e.specularMap;
        this.alphaMap = e.alphaMap;
        this.envMap = e.envMap;
        this.envMapRotation.copy(e.envMapRotation);
        this.combine = e.combine;
        this.reflectivity = e.reflectivity;
        this.envMapIntensity = e.envMapIntensity;
        this.refractionRatio = e.refractionRatio;
        this.wireframe = e.wireframe;
        this.wireframeLinewidth = e.wireframeLinewidth;
        this.wireframeLinecap = e.wireframeLinecap;
        this.wireframeLinejoin = e.wireframeLinejoin;
        this.flatShading = e.flatShading;
        this.fog = e.fog;
        return this;
    }
}
export class Xf extends Nu {
    constructor(e){
        super();
        this.isMeshLambertMaterial = true;
        this.type = `MeshLambertMaterial`;
        this.color = new X(16777215);
        this.map = null;
        this.lightMap = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.emissive = new X(0);
        this.emissiveIntensity = 1;
        this.emissiveMap = null;
        this.bumpMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalMapType = 0;
        this.normalScale = new W(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.specularMap = null;
        this.alphaMap = null;
        this.envMap = null;
        this.envMapRotation = new cl;
        this.combine = 0;
        this.reflectivity = 1;
        this.envMapIntensity = 1;
        this.refractionRatio = 0.98;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = `round`;
        this.wireframeLinejoin = `round`;
        this.flatShading = false;
        this.fog = true;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.color.copy(e.color);
        this.map = e.map;
        this.lightMap = e.lightMap;
        this.lightMapIntensity = e.lightMapIntensity;
        this.aoMap = e.aoMap;
        this.aoMapIntensity = e.aoMapIntensity;
        this.emissive.copy(e.emissive);
        this.emissiveMap = e.emissiveMap;
        this.emissiveIntensity = e.emissiveIntensity;
        this.bumpMap = e.bumpMap;
        this.bumpScale = e.bumpScale;
        this.normalMap = e.normalMap;
        this.normalMapType = e.normalMapType;
        this.normalScale.copy(e.normalScale);
        this.displacementMap = e.displacementMap;
        this.displacementScale = e.displacementScale;
        this.displacementBias = e.displacementBias;
        this.specularMap = e.specularMap;
        this.alphaMap = e.alphaMap;
        this.envMap = e.envMap;
        this.envMapRotation.copy(e.envMapRotation);
        this.combine = e.combine;
        this.reflectivity = e.reflectivity;
        this.envMapIntensity = e.envMapIntensity;
        this.refractionRatio = e.refractionRatio;
        this.wireframe = e.wireframe;
        this.wireframeLinewidth = e.wireframeLinewidth;
        this.wireframeLinecap = e.wireframeLinecap;
        this.wireframeLinejoin = e.wireframeLinejoin;
        this.flatShading = e.flatShading;
        this.fog = e.fog;
        return this;
    }
}
export class Zf extends Nu {
    constructor(e){
        super();
        this.isMeshDepthMaterial = true;
        this.type = `MeshDepthMaterial`;
        this.depthPacking = Vs;
        this.map = null;
        this.alphaMap = null;
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.depthPacking = e.depthPacking;
        this.map = e.map;
        this.alphaMap = e.alphaMap;
        this.displacementMap = e.displacementMap;
        this.displacementScale = e.displacementScale;
        this.displacementBias = e.displacementBias;
        this.wireframe = e.wireframe;
        this.wireframeLinewidth = e.wireframeLinewidth;
        return this;
    }
}
export class Qf extends Nu {
    constructor(e){
        super();
        this.isMeshDistanceMaterial = true;
        this.type = `MeshDistanceMaterial`;
        this.map = null;
        this.alphaMap = null;
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.map = e.map;
        this.alphaMap = e.alphaMap;
        this.displacementMap = e.displacementMap;
        this.displacementScale = e.displacementScale;
        this.displacementBias = e.displacementBias;
        return this;
    }
}
export class $f extends Zd {
    constructor(e){
        super();
        this.isLineDashedMaterial = true;
        this.type = `LineDashedMaterial`;
        this.scale = 1;
        this.dashSize = 3;
        this.gapSize = 1;
        this.setValues(e);
    }
    copy(e) {
        super.copy(e);
        this.scale = e.scale;
        this.dashSize = e.dashSize;
        this.gapSize = e.gapSize;
        return this;
    }
}
