export function A() {
    return ((e)=>{
        function t(e, t) {
            let r;
            let n;
            let a;
            let i;
            let o;
            for(const l = /([MLQCZ])([^MLQCZ]*)/g; r = l.exec(e);){
                const s = r[2].replace(/^\s*|\s*$/g, "").split(/[,\s]+/).map((e)=>parseFloat(e));
                switch(r[1]){
                    case "M":
                        i = n = s[0];
                        o = a = s[1];
                        break;
                    case "L":
                        if (s[0] !== i || s[1] !== o) {
                            t("L", i, o, i = s[0], o = s[1]);
                        }
                        break;
                    case "Q":
                        t("Q", i, o, i = s[2], o = s[3], s[0], s[1]);
                        break;
                    case "C":
                        t("C", i, o, i = s[4], o = s[5], s[0], s[1], s[2], s[3]);
                        break;
                    case "Z":
                        if (i !== n || o !== a) {
                            t("L", i, o, n, a);
                        }
                }
            }
        }
        function r(e, r, n = 16) {
            const a = {
                x: 0,
                y: 0
            };
            t(e, (e, t, i, o, l, s, f, c, u)=>{
                switch(e){
                    case "L":
                        r(t, i, o, l);
                        break;
                    case "Q":
                        let v = t;
                        let d = i;
                        for(let h = 1; h < n; h++){
                            ((e, t, r, n, a, i, o, l)=>{
                                const s = 1 - o;
                                l.x = s * s * e + 2 * s * o * r + o * o * a;
                                l.y = s * s * t + 2 * s * o * n + o * o * i;
                            })(t, i, s, f, o, l, h / (n - 1), a);
                            r(v, d, a.x, a.y);
                            v = a.x;
                            d = a.y;
                        }
                        break;
                    case "C":
                        let g = t;
                        let p = i;
                        for(let m = 1; m < n; m++){
                            ((e, t, r, n, a, i, o, l, s, f)=>{
                                const c = 1 - s;
                                f.x = c * c * c * e + 3 * c * c * s * r + 3 * c * s * s * a + s * s * s * o;
                                f.y = c * c * c * t + 3 * c * c * s * n + 3 * c * s * s * i + s * s * s * l;
                            })(t, i, s, f, c, u, o, l, m / (n - 1), a);
                            r(g, p, a.x, a.y);
                            g = a.x;
                            p = a.y;
                        }
                }
            });
        }
        const n = "precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}";
        const a = new WeakMap;
        const i = {
            premultipliedAlpha: false,
            preserveDrawingBuffer: true,
            antialias: false,
            depth: false
        };
        function withWebGLContext(e, t) {
            const gl = e.getContext ? e.getContext("webgl", i) : e;
            let n = a.get(gl);
            if (!n) {
                const isWebGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
                let l = {};
                let s = {};
                let f = {};
                let c = -1;
                const u = [];
                function getExtension(e) {
                    let t = l[e];
                    if (!t && !(t = l[e] = gl.getExtension(e))) {
                        throw Error(`${e} not supported`);
                    }
                    return t;
                }
                function d(e, t) {
                    const n = gl.createShader(t);
                    gl.shaderSource(n, e);
                    gl.compileShader(n);
                    return n;
                }
                function handleContextLoss() {
                    l = {};
                    s = {};
                    f = {};
                    c = -1;
                    u.length = 0;
                }
                gl.canvas.addEventListener("webglcontextlost", function(e) {
                    handleContextLoss();
                    e.preventDefault();
                }, false);
                a.set(gl, n = {
                    gl,
                    isWebGL2,
                    getExtension,
                    withProgram: function(e, t, n, a) {
                        if (!s[e]) {
                            const i = {};
                            const l = {};
                            const program = gl.createProgram();
                            gl.attachShader(program, d(t, gl.VERTEX_SHADER));
                            gl.attachShader(program, d(n, gl.FRAGMENT_SHADER));
                            gl.linkProgram(program);
                            s[e] = {
                                program,
                                transaction: function(e) {
                                    gl.useProgram(program);
                                    e({
                                        setUniform: function(e, t) {
                                            const n = [];
                                            for(let a = arguments.length - 2; a-- > 0;){
                                                n[a] = arguments[a + 2];
                                            }
                                            const i = l[t] || (l[t] = gl.getUniformLocation(program, t));
                                            gl[`uniform${e}`](...[
                                                i
                                            ].concat(n));
                                        },
                                        setAttribute: function(e, t, n, a, l) {
                                            let s = i[e];
                                            if (!s) {
                                                s = i[e] = {
                                                    buf: gl.createBuffer(),
                                                    loc: gl.getAttribLocation(program, e),
                                                    data: null
                                                };
                                            }
                                            gl.bindBuffer(gl.ARRAY_BUFFER, s.buf);
                                            gl.vertexAttribPointer(s.loc, t, gl.FLOAT, false, 0, 0);
                                            gl.enableVertexAttribArray(s.loc);
                                            if (isWebGL2) {
                                                gl.vertexAttribDivisor(s.loc, a);
                                            } else {
                                                getExtension("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(s.loc, a);
                                            }
                                            if (l !== s.data) {
                                                gl.bufferData(gl.ARRAY_BUFFER, l, n);
                                                s.data = l;
                                            }
                                        }
                                    });
                                }
                            };
                        }
                        s[e].transaction(a);
                    },
                    withTexture: function(e, t) {
                        c++;
                        try {
                            gl.activeTexture(gl.TEXTURE0 + c);
                            let n = f[e];
                            if (!n) {
                                n = f[e] = gl.createTexture();
                                gl.bindTexture(gl.TEXTURE_2D, n);
                                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                            }
                            gl.bindTexture(gl.TEXTURE_2D, n);
                            t(n, c);
                        } finally{
                            c--;
                        }
                    },
                    withTextureFramebuffer: function(e, t, n) {
                        const a = gl.createFramebuffer();
                        u.push(a);
                        gl.bindFramebuffer(gl.FRAMEBUFFER, a);
                        gl.activeTexture(gl.TEXTURE0 + t);
                        gl.bindTexture(gl.TEXTURE_2D, e);
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, e, 0);
                        try {
                            n(a);
                        } finally{
                            gl.deleteFramebuffer(a);
                            gl.bindFramebuffer(gl.FRAMEBUFFER, u[--u.length - 1] || null);
                        }
                    },
                    handleContextLoss
                });
            }
            t(n);
        }
        function renderImageData(e, t, r, a, i, l, s = 15, f = null) {
            withWebGLContext(e, (e)=>{
                const { gl, withProgram } = e;
                e.withTexture("copy", function(e, u) {
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, i, l, 0, gl.RGBA, gl.UNSIGNED_BYTE, t);
                    withProgram("copy", n, "precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}", function(e) {
                        const e_setUniform = e.setUniform;
                        e.setAttribute("aUV", 2, gl.STATIC_DRAW, 0, new Float32Array([
                            0,
                            0,
                            2,
                            0,
                            0,
                            2
                        ]));
                        e_setUniform("1i", "image", u);
                        gl.bindFramebuffer(gl.FRAMEBUFFER, f || null);
                        gl.disable(gl.BLEND);
                        gl.colorMask(8 & s, 4 & s, 2 & s, 1 & s);
                        gl.viewport(r, a, i, l);
                        gl.scissor(r, a, i, l);
                        gl.drawArrays(gl.TRIANGLES, 0, 3);
                    });
                });
            });
        }
        const s = Object.freeze({
            __proto__: null,
            withWebGLContext,
            renderImageData,
            resizeWebGLCanvasWithoutClearing: function(e, t, r) {
                const { width, height } = e;
                withWebGLContext(e, ({ gl })=>{
                    const s = new Uint8Array(width * height * 4);
                    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, s);
                    e.width = t;
                    e.height = r;
                    renderImageData(gl, s, 0, 0, width, height);
                });
            }
        });
        function f(e, t, n, a, i, o = 1) {
            const l = new Uint8Array(e * t);
            const s = a[2] - a[0];
            const f = a[3] - a[1];
            const c = [];
            r(n, (x1, y1, x2, y2)=>{
                c.push({
                    x1,
                    y1,
                    x2,
                    y2,
                    minX: Math.min(x1, x2),
                    minY: Math.min(y1, y2),
                    maxX: Math.max(x1, x2),
                    maxY: Math.max(y1, y2)
                });
            });
            c.sort((e, t)=>e.maxX - t.maxX);
            for(let u = 0; u < e; u++){
                for(let v = 0; v < t; v++){
                    const d = ((e, t)=>{
                        let r = Infinity;
                        let n = Infinity;
                        for(let a = c.length; a--;){
                            const i = c[a];
                            if (i.maxX + n <= e) {
                                break;
                            }
                            if (e + n > i.minX && t - n < i.maxY && t + n > i.minY) {
                                const o = ((e, t, r, n, a, i)=>{
                                    const o = a - r;
                                    const l = i - n;
                                    const s = o * o + l * l;
                                    const f = s ? Math.max(0, Math.min(1, ((e - r) * o + (t - n) * l) / s)) : 0;
                                    const c = e - (r + f * o);
                                    const u = t - (n + f * l);
                                    return c * c + u * u;
                                })(e, t, i.x1, i.y1, i.x2, i.y2);
                                if (o < r) {
                                    n = Math.sqrt(r = o);
                                }
                            }
                        }
                        if (((e, t)=>{
                            let r = 0;
                            for(let n = c.length; n--;){
                                const a = c[n];
                                if (a.maxX <= e) {
                                    break;
                                }
                                if (a.y1 > t != a.y2 > t && e < (a.x2 - a.x1) * (t - a.y1) / (a.y2 - a.y1) + a.x1) {
                                    r += a.y1 < a.y2 ? 1 : -1;
                                }
                            }
                            return r !== 0;
                        })(e, t)) {
                            n = -n;
                        }
                        return n;
                    })(a[0] + s * (u + 0.5) / e, a[1] + f * (v + 0.5) / t);
                    let h = (1 - Math.abs(d) / i) ** o / 2;
                    if (d < 0) {
                        h = 1 - h;
                    }
                    h = Math.max(0, Math.min(255, Math.round(255 * h)));
                    l[v * e + u] = h;
                }
            }
            return l;
        }
        function c(e, t, r, n, a, i = 1, o, l = 0, s = 0, f = 0) {
            u(e, t, r, n, a, i, o, null, l, s, f);
        }
        function u(e, t, r, n, a, i = 1, o, s, c = 0, u = 0, v = 0) {
            for(var d = f(e, t, r, n, a, i), h = new Uint8Array(4 * d.length), g = 0; g < d.length; g++){
                h[4 * g + v] = d[g];
            }
            renderImageData(o, h, c, u, e, t, 1 << 3 - v, s);
        }
        const v = Object.freeze({
            __proto__: null,
            generate: f,
            generateIntoCanvas: c,
            generateIntoFramebuffer: u
        });
        const d = new Float32Array([
            0,
            0,
            2,
            0,
            0,
            2
        ]);
        let h = null;
        let g = false;
        const p = {};
        const m = new WeakMap;
        function b(e) {
            if (!g && !isSupported(e)) {
                throw Error("WebGL generation not supported");
            }
        }
        function y(e, t, r, n, a, i = 1, l = null) {
            if (!l && !(l = h)) {
                const s = typeof OffscreenCanvas === "function" ? new OffscreenCanvas(1, 1) : typeof document !== "undefined" ? document.createElement("canvas") : null;
                if (!s) {
                    throw Error("OffscreenCanvas or DOM canvas not supported");
                }
                l = h = s.getContext("webgl", {
                    depth: false
                });
            }
            b(l);
            const f = new Uint8Array(e * t * 4);
            withWebGLContext(l, ({ gl, withTexture, withTextureFramebuffer })=>{
                withTexture("readable", function(o, s) {
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, e, t, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                    withTextureFramebuffer(o, s, function(o) {
                        w(e, t, r, n, a, i, gl, o, 0, 0, 0);
                        gl.readPixels(0, 0, e, t, gl.RGBA, gl.UNSIGNED_BYTE, f);
                    });
                });
            });
            const c = new Uint8Array(e * t);
            for(let u = 0, v = 0; u < f.length; u += 4){
                c[v++] = f[u];
            }
            return c;
        }
        function _(e, t, r, n, a, i = 1, o, l = 0, s = 0, f = 0) {
            w(e, t, r, n, a, i, o, null, l, s, f);
        }
        function w(e, t, a, i, l, s = 1, f, c, u = 0, v = 0, h = 0) {
            b(f);
            let g = [];
            r(a, (e, t, r, n)=>{
                g.push(e, t, r, n);
            });
            g = new Float32Array(g);
            withWebGLContext(f, ({ gl, isWebGL2, getExtension, withProgram, withTexture, withTextureFramebuffer, handleContextLoss })=>{
                withTexture("rawDistances", function(r, m) {
                    if (e !== r._lastWidth || t !== r._lastHeight) {
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, r._lastWidth = e, r._lastHeight = t, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                    }
                    withProgram("main", "precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}", "precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}", function({ setAttribute, setUniform }) {
                        const v = !isWebGL2 && getExtension("ANGLE_instanced_arrays");
                        const h = !isWebGL2 && getExtension("EXT_blend_minmax");
                        setAttribute("aUV", 2, gl.STATIC_DRAW, 0, d);
                        setAttribute("aLineSegment", 4, gl.DYNAMIC_DRAW, 1, g);
                        setUniform(...[
                            "4f",
                            "uGlyphBounds"
                        ].concat(i));
                        setUniform("1f", "uMaxDistance", l);
                        setUniform("1f", "uExponent", s);
                        withTextureFramebuffer(r, m, function(r) {
                            gl.enable(gl.BLEND);
                            gl.colorMask(true, true, true, true);
                            gl.viewport(0, 0, e, t);
                            gl.scissor(0, 0, e, t);
                            gl.blendFunc(gl.ONE, gl.ONE);
                            gl.blendEquationSeparate(gl.FUNC_ADD, isWebGL2 ? gl.MAX : h.MAX_EXT);
                            gl.clear(gl.COLOR_BUFFER_BIT);
                            if (isWebGL2) {
                                gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, g.length / 4);
                            } else {
                                v.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 3, g.length / 4);
                            }
                        });
                    });
                    withProgram("post", n, "precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}", function(r) {
                        r.setAttribute("aUV", 2, gl.STATIC_DRAW, 0, d);
                        r.setUniform("1i", "tex", m);
                        gl.bindFramebuffer(gl.FRAMEBUFFER, c);
                        gl.disable(gl.BLEND);
                        gl.colorMask(h === 0, h === 1, h === 2, h === 3);
                        gl.viewport(u, v, e, t);
                        gl.scissor(u, v, e, t);
                        gl.drawArrays(gl.TRIANGLES, 0, 3);
                    });
                });
                if (gl.isContextLost()) {
                    handleContextLoss();
                    throw Error("webgl context lost");
                }
            });
        }
        function isSupported(e) {
            const t = e && e !== h ? e.canvas || e : p;
            let r = m.get(t);
            if (r === undefined) {
                g = true;
                let n = null;
                try {
                    const a = [
                        97,
                        106,
                        97,
                        61,
                        99,
                        137,
                        118,
                        80,
                        80,
                        118,
                        137,
                        99,
                        61,
                        97,
                        106,
                        97
                    ];
                    const i = y(4, 4, "M8,8L16,8L24,24L16,24Z", [
                        0,
                        0,
                        32,
                        32
                    ], 24, 1, e);
                    if (!(r = i && a.length === i.length && i.every((e, t)=>e === a[t]))) {
                        n = "bad trial run results";
                        console.info(a, i);
                    }
                } catch (error) {
                    r = false;
                    n = error.message;
                }
                if (n) {
                    console.warn("WebGL SDF generation not supported:", n);
                }
                g = false;
                m.set(t, r);
            }
            return r;
        }
        const E = Object.freeze({
            __proto__: null,
            generate: y,
            generateIntoCanvas: _,
            generateIntoFramebuffer: w,
            isSupported
        });
        e.forEachPathCommand = t;
        e.generate = function(e, t, r, n, a, i) {
            if (a === undefined) {
                a = Math.max(n[2] - n[0], n[3] - n[1]) / 2;
            }
            if (i === undefined) {
                i = 1;
            }
            try {
                return y.apply(E, arguments);
            } catch (error) {
                console.info("WebGL SDF generation failed, falling back to JS", error);
                return f.apply(v, arguments);
            }
        };
        e.generateIntoCanvas = function(e, t, r, n, a, i, o, l, s, f) {
            if (a === undefined) {
                a = Math.max(n[2] - n[0], n[3] - n[1]) / 2;
            }
            if (i === undefined) {
                i = 1;
            }
            if (l === undefined) {
                l = 0;
            }
            if (s === undefined) {
                s = 0;
            }
            if (f === undefined) {
                f = 0;
            }
            try {
                return _.apply(E, arguments);
            } catch (error) {
                console.info("WebGL SDF generation failed, falling back to JS", error);
                return c.apply(v, arguments);
            }
        };
        e.javascript = v;
        e.pathToLineSegments = r;
        e.webgl = E;
        e.webglUtils = s;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        return e;
    })({});
}
