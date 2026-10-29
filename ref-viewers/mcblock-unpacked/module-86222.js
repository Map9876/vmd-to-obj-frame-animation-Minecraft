export class q {
    gl;
    program;
    constructor(e, t, r){
        this.gl = e;
        this.program = this.initShaderProgram(t, r);
    }
    getProgram() {
        return this.program;
    }
    initShaderProgram(e, t) {
        let r = this.loadShader(this.gl.VERTEX_SHADER, e);
        let s = this.loadShader(this.gl.FRAGMENT_SHADER, t);
        let n = this.gl.createProgram();
        this.gl.attachShader(n, r);
        this.gl.attachShader(n, s);
        this.gl.linkProgram(n);
        if (!this.gl.getProgramParameter(n, this.gl.LINK_STATUS)) {
            throw Error(`Unable to link shader program: ${this.gl.getProgramInfoLog(n)}`);
        }
        return n;
    }
    loadShader(e, t) {
        let r = this.gl.createShader(e);
        this.gl.shaderSource(r, t);
        this.gl.compileShader(r);
        if (!this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS)) {
            let t = Error(`Compiling ${e === this.gl.VERTEX_SHADER ? "vertex" : "fragment"} shader: ${this.gl.getShaderInfoLog(r)}`);
            this.gl.deleteShader(r);
            throw t;
        }
        return r;
    }
}
