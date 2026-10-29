"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5535],{38381:(e,t,r)=>{r.d(t,{s0:()=>P,Rc:()=>S,Jp:()=>M,iS:()=>_,bt:()=>j,fE:()=>z});var n=r(95155),o=r(12115),i=r(85339),l=r(59040),a=r(13303);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}new i.I9Y,new i.I9Y;function c(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}var f=function e(t,r,n){var o=this;c(this,e),s(this,"dot2",function(e,t){return o.x*e+o.y*t}),s(this,"dot3",function(e,t,r){return o.x*e+o.y*t+o.z*r}),this.x=t,this.y=r,this.z=n},u=[new f(1,1,0),new f(-1,1,0),new f(1,-1,0),new f(-1,-1,0),new f(1,0,1),new f(-1,0,1),new f(1,0,-1),new f(-1,0,-1),new f(0,1,1),new f(0,-1,1),new f(0,1,-1),new f(0,-1,-1)],d=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],m=Array(512),p=Array(512);!function(e){e>0&&e<1&&(e*=65536),(e=Math.floor(e))<256&&(e|=e<<8);for(var t,r=0;r<256;r++)t=1&r?d[r]^255&e:d[r]^e>>8&255,m[r]=m[r+256]=t,p[r]=p[r+256]=u[t%12]}(0);function h(e){var t=function(e){if("number"==typeof e)e=Math.abs(e);else if("string"==typeof e){var t=e;e=0;for(var r=0;r<t.length;r++)e=(e+(r+1)*(t.charCodeAt(r)%96))%0x7fffffff}return 0===e&&(e=311),e}(e);return function(){var e=48271*t%0x7fffffff;return t=e,e/0x7fffffff}}new function e(t){var r=this;c(this,e),s(this,"seed",0),s(this,"init",function(e){r.seed=e,r.value=h(e)}),s(this,"value",h(this.seed)),this.init(t)}(Math.random());i.LoY;r(81948);let g=(0,o.createContext)(null),v=(0,o.createContext)(null),w=e=>(2&e.getAttributes())==2,P=(0,o.memo)((0,o.forwardRef)(({children:e,camera:t,scene:r,resolutionScale:s,enabled:c=!0,renderPriority:f=1,autoClear:u=!0,depthBuffer:d,enableNormalPass:m,stencilBuffer:p,multisampling:h=8,frameBufferType:g=i.ix0},P)=>{let{gl:x,scene:b,camera:y,size:C}=(0,l.C)(),S=r||b,_=t||y,[M,E,j]=(0,o.useMemo)(()=>{let e=new a.s0(x,{depthBuffer:d,stencilBuffer:p,multisampling:h,frameBufferType:g});e.addPass(new a.AH(S,_));let t=null,r=null;return m&&((r=new a.Xe(S,_)).enabled=!1,e.addPass(r),void 0!==s&&((t=new a.SP({normalBuffer:r.texture,resolutionScale:s})).enabled=!1,e.addPass(t))),[e,r,t]},[_,x,d,p,h,g,S,m,s]);(0,o.useEffect)(()=>M?.setSize(C.width,C.height),[M,C]),(0,l.D)((e,t)=>{if(c){let e=x.autoClear;x.autoClear=u,p&&!u&&x.clearStencil(),M.render(t),x.autoClear=e}},c?f:0);let z=(0,o.useRef)(null);(0,o.useLayoutEffect)(()=>{let e=[],t=z.current.__r3f;if(t&&M){let r=t.children;for(let t=0;t<r.length;t++){let n=r[t].object;if(n instanceof a.Mj){let o=[n];if(!w(n)){let e=null;for(;(e=r[t+1]?.object)instanceof a.Mj&&!w(e);)o.push(e),t++}let i=new a.Vu(_,...o);e.push(i)}else n instanceof a.oF&&e.push(n)}for(let t of e)M?.addPass(t);E&&(E.enabled=!0),j&&(j.enabled=!0)}return()=>{for(let t of e)M?.removePass(t);E&&(E.enabled=!1),j&&(j.enabled=!1)}},[M,e,_,E,j]),(0,o.useEffect)(()=>{let e=x.toneMapping;return x.toneMapping=i.y_p,()=>{x.toneMapping=e}},[x]);let k=(0,o.useMemo)(()=>({composer:M,normalPass:E,downSamplingPass:j,resolutionScale:s,camera:_,scene:S}),[M,E,j,s,_,S]);return(0,o.useImperativeHandle)(P,()=>M,[M]),(0,n.jsx)(v.Provider,{value:k,children:(0,n.jsx)("group",{ref:z,children:e})})})),x=e=>"object"==typeof e&&null!=e&&"current"in e?e.current:e,b=0,y=new WeakMap,C=(e,t)=>function({blendFunction:r=t?.blendFunction,opacity:i=t?.opacity,...a}){let s=y.get(e);if(!s){let t=`@react-three/postprocessing/${e.name}-${b++}`;(0,l.e)({[t]:e}),y.set(e,s=t)}let c=(0,l.C)(e=>e.camera),f=o.useMemo(()=>[...t?.args??[],...a.args??[{...t,...a}]],[JSON.stringify(a)]);return(0,n.jsx)(s,{camera:c,"blendMode-blendFunction":r,"blendMode-opacity-value":i,...a,args:f})};a.Mj,a.bv,a.i;let S=(0,o.forwardRef)(function({selection:e=[],selectionLayer:t=10,blendFunction:r,patternTexture:i,edgeStrength:s,pulseSpeed:c,visibleEdgeColor:f,hiddenEdgeColor:u,width:d,height:m,kernelSize:p,blur:h,xRay:w,...P},b){let y=(0,l.C)(e=>e.invalidate),{scene:C,camera:S}=(0,o.useContext)(v),_=(0,o.useMemo)(()=>new a.st(C,S,{blendFunction:r,patternTexture:i,edgeStrength:s,pulseSpeed:c,visibleEdgeColor:f,hiddenEdgeColor:u,width:d,height:m,kernelSize:p,blur:h,xRay:w,...P}),[r,h,S,s,m,u,p,i,c,C,f,d,w]),M=(0,o.useContext)(g);return(0,o.useEffect)(()=>{if(!M&&e)return _.selection.set(Array.isArray(e)?e.map(x):[x(e)]),y(),()=>{_.selection.clear(),y()}},[_,e,M,y]),(0,o.useEffect)(()=>{_.selectionLayer=t,y()},[_,y,t]),(0,o.useRef)(void 0),(0,o.useEffect)(()=>{if(M&&M.enabled&&M.selected?.length)return _.selection.set(M.selected),y(),()=>{_.selection.clear(),y()}},[M,_.selection,y]),(0,o.useEffect)(()=>()=>{_.dispose()},[_]),(0,n.jsx)("primitive",{ref:b,object:_})}),_=(a.hH,(0,o.forwardRef)(function({selection:e=[],selectionLayer:t=10,lights:r=[],inverted:i=!1,ignoreBackground:s=!1,luminanceThreshold:c,luminanceSmoothing:f,intensity:u,width:d,height:m,kernelSize:p,mipmapBlur:h,...w},P){0===r.length&&console.warn("SelectiveBloom requires lights to work.");let b=(0,l.C)(e=>e.invalidate),{scene:y,camera:C}=(0,o.useContext)(v),S=(0,o.useMemo)(()=>{let e=new a.d4(y,C,{blendFunction:0,luminanceThreshold:c,luminanceSmoothing:f,intensity:u,width:d,height:m,kernelSize:p,mipmapBlur:h,...w});return e.inverted=i,e.ignoreBackground=s,e},[y,C,c,f,u,d,m,p,h,i,s,w]),_=(0,o.useContext)(g);return(0,o.useEffect)(()=>{if(!_&&e)return S.selection.set(Array.isArray(e)?e.map(x):[x(e)]),b(),()=>{S.selection.clear(),b()}},[S,e,_,b]),(0,o.useEffect)(()=>{S.selection.layer=t,b()},[S,b,t]),(0,o.useEffect)(()=>{if(r&&r.length>0)return r.forEach(e=>{let t;return t=x(e),t.layers.enable(S.selection.layer)}),b(),()=>{r.forEach(e=>{let t;return t=x(e),t.layers.disable(S.selection.layer)}),b()}},[S,b,r,t]),(0,o.useEffect)(()=>{if(_&&_.enabled&&_.selected?.length)return S.selection.set(_.selected),b(),()=>{S.selection.clear(),b()}},[_,S.selection,b]),(0,n.jsx)("primitive",{ref:P,object:S,dispose:null})})),M=C(a.eF);var E=(e=>(e[e.Linear=0]="Linear",e[e.Radial=1]="Radial",e[e.MirroredLinear=2]="MirroredLinear",e))(E||{});a.Mj;let j=C(a.i4),z=C(a.K1),k=(a.To,{fragmentShader:`

    // original shader by Evan Wallace

    #define MAX_ITERATIONS 100

    uniform float blur;
    uniform float taper;
    uniform vec2 start;
    uniform vec2 end;
    uniform vec2 direction;
    uniform int samples;

    float random(vec3 scale, float seed) {
        /* use the fragment position for a different seed per-pixel */
        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = vec4(0.0);
        float total = 0.0;
        vec2 startPixel = vec2(start.x * resolution.x, start.y * resolution.y);
        vec2 endPixel = vec2(end.x * resolution.x, end.y * resolution.y);
        float f_samples = float(samples);
        float half_samples = f_samples / 2.0;

        // use screen diagonal to normalize blur radii
        float maxScreenDistance = distance(vec2(0.0), resolution); // diagonal distance
        float gradientRadius = taper * (maxScreenDistance);
        float blurRadius = blur * (maxScreenDistance / 16.0);

        /* randomize the lookup values to hide the fixed number of samples */
        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);
        vec2 normal = normalize(vec2(startPixel.y - endPixel.y, endPixel.x - startPixel.x));
        float radius = smoothstep(0.0, 1.0, abs(dot(uv * resolution - startPixel, normal)) / gradientRadius) * blurRadius;

        #pragma unroll_loop_start
        for (int i = 0; i <= MAX_ITERATIONS; i++) {
            if (i >= samples) { break; } // return early if over sample count
            float f_i = float(i);
            float s_i = -half_samples + f_i;
            float percent = (s_i + offset - 0.5) / half_samples;
            float weight = 1.0 - abs(percent);
            vec4 sample_i = texture2D(inputBuffer, uv + normalize(direction) / resolution * percent * radius);
            /* switch to pre-multiplied alpha to correctly blur transparent images */
            sample_i.rgb *= sample_i.a;
            color += sample_i * weight;
            total += weight;
        }
        #pragma unroll_loop_end

        outputColor = color / total;

        /* switch back from pre-multiplied alpha */
        outputColor.rgb /= outputColor.a + 0.00001;
    }
    `});a.Mj;a.Mj;a.Mj},53279:(e,t,r)=>{r.d(t,{x:()=>c});var n=r(88945),o=r(12115),i=r(85339),l=r(59040);let a=parseInt(i.sPf.replace(/\D+/g,"")),s=function(e,t,r,n){var o;return(o=class extends i.BKk{constructor(n){for(let o in super({vertexShader:t,fragmentShader:r,...n}),e)this.uniforms[o]=new i.nc$(e[o]),Object.defineProperty(this,o,{get(){return this.uniforms[o].value},set(e){this.uniforms[o].value=e}});this.uniforms=i.LlO.clone(this.uniforms)}}).key=i.cj9.generateUUID(),o}({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new i.Q1f,sectionColor:new i.Q1f,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new i.Pq0,worldPlanePosition:new i.Pq0},`
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
  `,`
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
      #include <${a>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),c=o.forwardRef(({args:e,cellColor:t="#000000",sectionColor:r="#2080ff",cellSize:a=.5,sectionSize:c=1,followCamera:f=!1,infiniteGrid:u=!1,fadeDistance:d=100,fadeStrength:m=1,fadeFrom:p=1,cellThickness:h=.5,sectionThickness:g=1,side:v=i.hsX,...w},P)=>{(0,l.e)({GridMaterial:s});let x=o.useRef(null);o.useImperativeHandle(P,()=>x.current,[]);let b=new i.Zcv,y=new i.Pq0(0,1,0),C=new i.Pq0(0,0,0);return(0,l.D)(e=>{b.setFromNormalAndCoplanarPoint(y,C).applyMatrix4(x.current.matrixWorld);let t=x.current.material,r=t.uniforms.worldCamProjPosition,n=t.uniforms.worldPlanePosition;b.projectPoint(e.camera.position,r.value),n.value.set(0,0,0).applyMatrix4(x.current.matrixWorld)}),o.createElement("mesh",(0,n.A)({ref:x,frustumCulled:!1},w),o.createElement("gridMaterial",(0,n.A)({transparent:!0,"extensions-derivatives":!0,side:v},{cellSize:a,sectionSize:c,cellColor:t,sectionColor:r,cellThickness:h,sectionThickness:g},{fadeDistance:d,fadeStrength:m,fadeFrom:p,infiniteGrid:u,followCamera:f})),o.createElement("planeGeometry",{args:e}))})},63617:(e,t,r)=>{r.d(t,{o:()=>o});var n=r(85339);class o{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}new n.qUd(-1,1,1,-1,0,1);class i extends n.LoY{constructor(){super(),this.setAttribute("position",new n.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new n.qtW([0,2,0,0,2,0],2))}}new i}}]);