import "./module-88945.js";
import { forwardRef, useImperativeHandle, useRef } from "./module-61426.js";
import { BKk, LlO, Pq0, Q1f, Zcv, cj9, hsX, nc$, sPf } from "./module-85339.js";
import { D, e } from "./module-59040.js";
let a = parseInt(sPf.replace(/\D+/g, ""));
let GridMaterial = function(e, vertexShader, fragmentShader, n) {
    let o;
    o = class extends BKk {
        constructor(n){
            for(let o in super({
                vertexShader,
                fragmentShader,
                ...n
            }), e){
                this.uniforms[o] = new nc$(e[o]);
                Object.defineProperty(this, o, {
                    get () {
                        return this.uniforms[o].value;
                    },
                    set (e) {
                        this.uniforms[o].value = e;
                    }
                });
            }
            this.uniforms = LlO.clone(this.uniforms);
        }
    };
    o.key = cj9.generateUUID();
    return o;
}({
    cellSize: 0.5,
    sectionSize: 1,
    fadeDistance: 100,
    fadeStrength: 1,
    fadeFrom: 1,
    cellThickness: 0.5,
    sectionThickness: 1,
    cellColor: new Q1f,
    sectionColor: new Q1f,
    infiniteGrid: false,
    followCamera: false,
    worldCamProjPosition: new Pq0,
    worldPlanePosition: new Pq0
}, `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `, `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${a >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
    }
  `);
export let x = forwardRef(({ args, cellColor = "#000000", sectionColor = "#2080ff", cellSize = 0.5, sectionSize = 1, followCamera = false, infiniteGrid = false, fadeDistance = 100, fadeStrength = 1, fadeFrom = 1, cellThickness = 0.5, sectionThickness = 1, side = hsX, ...rest }, P)=>{
    e({
        GridMaterial
    });
    let xRef = useRef(null);
    useImperativeHandle(P, ()=>xRef.current, []);
    let b = new Zcv;
    let y = new Pq0(0, 1, 0);
    let C = new Pq0(0, 0, 0);
    D((e)=>{
        b.setFromNormalAndCoplanarPoint(y, C).applyMatrix4(xRef.current.matrixWorld);
        let material = xRef.current.material;
        let worldCamProjPosition = material.uniforms.worldCamProjPosition;
        let worldPlanePosition = material.uniforms.worldPlanePosition;
        b.projectPoint(e.camera.position, worldCamProjPosition.value);
        worldPlanePosition.value.set(0, 0, 0).applyMatrix4(xRef.current.matrixWorld);
    });
    return <mesh ref={xRef} frustumCulled={false} {...rest}><gridMaterial transparent extensions-derivatives side={side} cellSize={cellSize} sectionSize={sectionSize} cellColor={cellColor} sectionColor={sectionColor} cellThickness={cellThickness} sectionThickness={sectionThickness} fadeDistance={fadeDistance} fadeStrength={fadeStrength} fadeFrom={fadeFrom} infiniteGrid={infiniteGrid} followCamera={followCamera}/><planeGeometry args={args}/></mesh>;
});
