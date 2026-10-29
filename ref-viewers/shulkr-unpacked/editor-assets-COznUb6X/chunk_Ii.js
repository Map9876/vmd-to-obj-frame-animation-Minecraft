import { l } from "../dist-C5TDMOul.js";
import { p } from "../dist-C66QuM2X.js";
import { Fi, Ni } from "./chunk_Ni.js";
import { Q } from "./chunk_Gm.js";
let Ii = null;
export function Li(e) {
    Ii = e;
}
function Ri() {
    return Ii;
}
function zi(e, t) {
    let n = Ii?.files[t];
    if (n) {
        return `${Ni}/${t.replace(/\.msgpack$/, ``)}.${n}.msgpack`;
    }
    return `${Ni}/${e}/${t}`;
}
export async function Bi(e) {
    let t = await fetch(zi(e, `minecraft.msgpack`)).then((e)=>e.arrayBuffer());
    return p(new Uint8Array(t));
}
export async function Ui(e, t) {
    let n = await fetch(zi(e, `${t}.msgpack`));
    if (n.ok) {
        return p(new Uint8Array(await n.arrayBuffer()));
    }
    return null;
}
function Wi(e) {
    return `pack.${e}.msgpack`;
}
export async function Gi(e, t) {
    let n = await fetch(zi(e, Wi(t)));
    if (n.ok) {
        return p(new Uint8Array(await n.arrayBuffer()));
    }
    return null;
}
export async function Ji(e) {
    let t = await fetch(zi(e, `minecraft.registry.msgpack`)).then((e)=>e.arrayBuffer());
    return p(new Uint8Array(t));
}
export function ay(e) {
    return e.replace(`#include <uv_pars_vertex>`, Q.uv_pars_vertex.replace(`varying vec2 vMapUv;`, `centroid varying vec2 vMapUv;`)).replace(`#include <uv_pars_fragment>`, Q.uv_pars_fragment.replace(`varying vec2 vMapUv;`, `centroid varying vec2 vMapUv;`));
}
export class dy {
    constructor(e = Math.min(4, navigator.hardwareConcurrency || 2)){
        this.workers = [];
        this.next = 0;
        this.nextId = 1;
        this.pending = new Map;
        for(let t = 0; t < e; t++){
            let e = new Worker(new URL(`/assets/meshWorker-Bys5YHhR.js`, `` + import.meta.url), {
                type: `module`
            });
            e.postMessage({
                kind: `config`,
                assetBaseUrl: Fi(),
                bundleManifest: Ri()
            });
            e.onmessage = (e)=>{
                let e_data = e.data;
                let n = this.pending.get(e_data.id);
                if (n) {
                    this.pending.delete(e_data.id);
                    n.resolve(e_data);
                }
            };
            e.onerror = (t)=>{
                this.retire(e, t.message || `mesh worker failed to start`);
            };
            e.onmessageerror = ()=>{
                this.retire(e, `mesh worker sent an undeserializable message`);
            };
            this.workers.push(e);
        }
    }
    mesh({ snapshot, version, namespaces, packs, biome = `plains` }) {
        let id = this.nextId++;
        return new Promise((resolve, reject)=>{
            if (this.workers.length === 0) {
                reject(Error(`no mesh workers available`));
                return;
            }
            let worker = this.workers[this.next % this.workers.length];
            this.next = (this.next + 1) % this.workers.length;
            this.pending.set(id, {
                worker,
                resolve,
                reject
            });
            let l = {
                id,
                snapshot,
                version,
                biome,
                namespaces,
                packs
            };
            worker.postMessage(l, [
                snapshot.indices.buffer
            ]);
        });
    }
    retire(e, t) {
        let n = this.workers.indexOf(e);
        if (n !== -1) {
            this.workers.splice(n, 1);
            this.next = 0;
            e.terminate();
            for (let [n, r] of this.pending){
                if (r.worker === e) {
                    this.pending.delete(n);
                    r.reject(Error(t));
                }
            }
        }
    }
    dispose() {
        for (let e of this.workers){
            e.terminate();
        }
        this.workers.length = 0;
        this.pending.clear();
    }
}
