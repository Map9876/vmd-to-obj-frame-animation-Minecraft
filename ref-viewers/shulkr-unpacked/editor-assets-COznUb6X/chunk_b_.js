import { mu } from "./chunk_Pl.js";
function b_(e, t) {
    if (e.groupOrder === t.groupOrder) {
        if (e.renderOrder === t.renderOrder) {
            if (e.material.id === t.material.id) {
                if (e.materialVariant === t.materialVariant) {
                    if (e.z === t.z) {
                        return e.id - t.id;
                    }
                    return e.z - t.z;
                }
                return e.materialVariant - t.materialVariant;
            }
            return e.material.id - t.material.id;
        }
        return e.renderOrder - t.renderOrder;
    }
    return e.groupOrder - t.groupOrder;
}
function x_(e, t) {
    if (e.groupOrder === t.groupOrder) {
        if (e.renderOrder === t.renderOrder) {
            if (e.z === t.z) {
                return e.id - t.id;
            }
            return t.z - e.z;
        }
        return e.renderOrder - t.renderOrder;
    }
    return e.groupOrder - t.groupOrder;
}
function S_() {
    let e = [];
    let t = 0;
    let opaque = [];
    let transmissive = [];
    let transparent = [];
    function init() {
        t = 0;
        opaque.length = 0;
        transmissive.length = 0;
        transparent.length = 0;
    }
    function o(object) {
        let t = 0;
        if (object.isInstancedMesh) {
            t += 2;
        }
        if (object.isSkinnedMesh) {
            t += 1;
        }
        return t;
    }
    function s(object, geometry, material, groupOrder, z, group) {
        let l = e[t];
        if (l === undefined) {
            l = {
                id: object.id,
                object,
                geometry,
                material,
                materialVariant: o(object),
                groupOrder,
                renderOrder: object.renderOrder,
                z,
                group
            };
            e[t] = l;
        } else {
            l.id = object.id;
            l.object = object;
            l.geometry = geometry;
            l.material = material;
            l.materialVariant = o(object);
            l.groupOrder = groupOrder;
            l.renderOrder = object.renderOrder;
            l.z = z;
            l.group = group;
        }
        t++;
        return l;
    }
    function push(e, t, a, o, c, l) {
        let u = s(e, t, a, o, c, l);
        if (a.transmission > 0) {
            transmissive.push(u);
        } else if (a.transparent === true) {
            transparent.push(u);
        } else {
            opaque.push(u);
        }
    }
    function unshift(e, t, a, o, c, l) {
        let u = s(e, t, a, o, c, l);
        if (a.transmission > 0) {
            transmissive.unshift(u);
        } else if (a.transparent === true) {
            transparent.unshift(u);
        } else {
            opaque.unshift(u);
        }
    }
    function sort(e, t) {
        if (opaque.length > 1) {
            opaque.sort(e || b_);
        }
        if (transmissive.length > 1) {
            transmissive.sort(t || x_);
        }
        if (transparent.length > 1) {
            transparent.sort(t || x_);
        }
    }
    function finish() {
        for(let n = t, r = e.length; n < r; n++){
            let t = e[n];
            if (t.id === null) {
                break;
            }
            t.id = null;
            t.object = null;
            t.geometry = null;
            t.material = null;
            t.group = null;
        }
    }
    return {
        opaque,
        transmissive,
        transparent,
        init,
        push,
        unshift,
        finish,
        sort
    };
}
export function C_() {
    let e = new WeakMap;
    function get(t, n) {
        let r = e.get(t);
        let i;
        if (r === undefined) {
            i = new S_;
            e.set(t, [
                i
            ]);
        } else if (n >= r.length) {
            i = new S_;
            r.push(i);
        } else {
            i = r[n];
        }
        return i;
    }
    function dispose() {
        e = new WeakMap;
    }
    return {
        get,
        dispose
    };
}
export function uv(e, t) {
    e.setAttribute(`position`, new mu(t.positions, 3, true));
    e.setAttribute(`normal`, new mu(t.normals, 3, true));
    e.setAttribute(`uv`, new mu(t.uvs, 2, true));
    e.setAttribute(`color`, new mu(t.colors, 3, true));
}
