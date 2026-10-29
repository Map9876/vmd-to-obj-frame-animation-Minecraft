import { LM } from "./module-13402.js";
import { T } from "./module-14916.js";
export class E {
    x;
    z;
    compression;
    timestamp;
    raw;
    file;
    dirty;
    constructor(e, t, r, s, n){
        this.x = e;
        this.z = t;
        this.compression = r;
        this.timestamp = s;
        this.raw = n;
        this.dirty = false;
    }
    getCompression() {
        switch(this.compression){
            case 1:
                return "gzip";
            case 2:
                return "zlib";
            case 3:
                return "none";
            default:
                throw Error(`Invalid compression mode ${this.compression}`);
        }
    }
    setCompression(e) {
        switch(e){
            case "gzip":
                this.compression = 1;
                break;
            case "zlib":
                this.compression = 2;
                break;
            case "none":
                this.compression = 3;
                break;
            default:
                throw Error(`Invalid compression mode ${e}`);
        }
    }
    getFile() {
        if (this.file === undefined) {
            this.file = T.read(this.raw, {
                compression: this.getCompression()
            });
        }
        return this.file;
    }
    getRoot() {
        return this.getFile().root;
    }
    setRoot(e) {
        if (this.file === undefined) {
            this.file = T.create({
                compression: this.getCompression()
            });
        }
        this.file.root = e;
        this.markDirty();
    }
    markDirty() {
        this.dirty = true;
    }
    getRaw() {
        if (this.file === undefined || this.dirty === false) {
            return this.raw;
        }
        this.file.compression = this.getCompression();
        let e = this.file.write();
        this.raw = e;
        this.dirty = false;
        return e;
    }
    toJson() {
        return {
            x: this.x,
            z: this.z,
            compression: this.compression,
            timestamp: this.timestamp,
            size: this.raw.byteLength
        };
    }
    toRef(e) {
        return new E.Ref(this.x, this.z, this.compression, this.timestamp, this.raw.byteLength, e);
    }
    static create(e, t, r, s) {
        let n = new E(e, t, 0, s ?? 0, r.write());
        n.setCompression(r.compression);
        return n;
    }
    static fromJson(e, t) {
        let r = LM.readObject(e) ?? {};
        let n = LM.readInt(r.x) ?? 0;
        let a = LM.readInt(r.z) ?? 0;
        let o = LM.readNumber(r.compression) ?? 2;
        let u = LM.readInt(r.timestamp) ?? 0;
        let c = LM.readInt(r.size) ?? 0;
        return new E.Ref(n, a, o, u, c, t);
    }
}
(function(e) {
    class t {
        x;
        z;
        compression;
        timestamp;
        size;
        resolver;
        file;
        constructor(e, t, r, s, n, i){
            this.x = e;
            this.z = t;
            this.compression = r;
            this.timestamp = s;
            this.size = n;
            this.resolver = i;
        }
        getFile() {
            if (this.file instanceof T) {
                return this.file;
            }
        }
        getRoot() {
            if (this.file instanceof T) {
                return this.file.root;
            }
        }
        async getFileAsync() {
            if (!this.file) {
                this.file = (async ()=>{
                    let e = await this.resolver(this.x, this.z);
                    this.file = e;
                    return e;
                })();
            }
            return this.file;
        }
        async getRootAsync() {
            return (await this.getFileAsync()).root;
        }
        isResolved() {
            return this.file instanceof T;
        }
    }
    e.Ref = t;
})(E = E || (E = {}));
