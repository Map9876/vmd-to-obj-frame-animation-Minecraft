import { fN, vt } from "./module-85250.js";
import { q } from "./module-86222.js";
let i = `
  attribute vec4 vertPos;
  attribute vec2 texCoord;
  attribute vec4 texLimit;
  attribute vec3 vertColor;
  attribute vec3 normal;

  uniform mat4 mView;
  uniform mat4 mProj;

  varying highp vec2 vTexCoord;
  varying highp vec4 vTexLimit;
  varying highp vec3 vTintColor;
  varying highp float vLighting;

  void main(void) {
    gl_Position = mProj * mView * vertPos;
    vTexCoord = texCoord;
	vTexLimit = texLimit;
    vTintColor = vertColor;
    vLighting = normal.y * 0.2 + abs(normal.z) * 0.1 + 0.8;
  }
`;
let a = `
  precision highp float;
  varying highp vec2 vTexCoord;
  varying highp vec4 vTexLimit;
  varying highp vec3 vTintColor;
  varying highp float vLighting;

  uniform sampler2D sampler;
  uniform highp float pixelSize;

  void main(void) {
		vec4 texColor = texture2D(sampler, clamp(vTexCoord,
			vTexLimit.xy + vec2(0.5, 0.5) * pixelSize,
			vTexLimit.zw - vec2(0.5, 0.5) * pixelSize
		));
		if(texColor.a < 0.01) discard;
		gl_FragColor = vec4(texColor.xyz * vTintColor * vLighting, texColor.a);
  }
`;
export class A {
    gl;
    shaderProgram;
    projMatrix;
    activeShader;
    pixelSize = 0;
    constructor(e){
        this.gl = e;
        this.shaderProgram = new q(e, i, a).getProgram();
        this.activeShader = this.shaderProgram;
        this.projMatrix = this.getPerspective();
        this.initialize();
    }
    setViewport(e, t, r, s) {
        this.gl.viewport(e, t, r, s);
        this.projMatrix = this.getPerspective();
    }
    getPerspective() {
        let e = 70 * Math.PI / 180;
        let t = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        let r = vt();
        fN(r, e, t, 0.1, 500);
        return r;
    }
    initialize() {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.cullFace(this.gl.BACK);
    }
    setShader(e) {
        this.gl.useProgram(e);
        this.activeShader = e;
    }
    setVertexAttr(e, t, r) {
        if (r === undefined) {
            throw Error(`Expected buffer for ${e}`);
        }
        let s = this.gl.getAttribLocation(this.activeShader, e);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, r);
        this.gl.vertexAttribPointer(s, t, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(s);
    }
    setUniform(e, t) {
        let r = this.gl.getUniformLocation(this.activeShader, e);
        this.gl.uniformMatrix4fv(r, false, t);
    }
    setTexture(e, t) {
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, e);
        this.pixelSize = t ?? 0;
    }
    createAtlasTexture(e) {
        let t = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, t);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, e);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        return t;
    }
    prepareDraw(e) {
        this.setUniform("mView", e);
        this.setUniform("mProj", this.projMatrix);
        let t = this.gl.getUniformLocation(this.activeShader, "pixelSize");
        this.gl.uniform1f(t, this.pixelSize);
    }
    drawMesh(e, t) {
        if (e.quadVertices() > 0) {
            if (t.pos) {
                this.setVertexAttr("vertPos", 3, e.posBuffer);
            }
            if (t.color) {
                this.setVertexAttr("vertColor", 3, e.colorBuffer);
            }
            if (t.texture) {
                this.setVertexAttr("texCoord", 2, e.textureBuffer);
                this.setVertexAttr("texLimit", 4, e.textureLimitBuffer);
            }
            if (t.normal) {
                this.setVertexAttr("normal", 3, e.normalBuffer);
            }
            if (t.blockPos) {
                this.setVertexAttr("blockPos", 3, e.blockPosBuffer);
            }
            if (!e.indexBuffer) {
                throw Error("Expected index buffer");
            }
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, e.indexBuffer);
            this.gl.drawElements(this.gl.TRIANGLES, e.quadIndices(), this.gl.UNSIGNED_SHORT, 0);
        }
        if (e.lineVertices() > 0) {
            if (t.pos) {
                this.setVertexAttr("vertPos", 3, e.linePosBuffer);
            }
            if (t.color) {
                this.setVertexAttr("vertColor", 3, e.lineColorBuffer);
            }
            this.gl.drawArrays(this.gl.LINES, 0, e.lineVertices());
        }
    }
}
