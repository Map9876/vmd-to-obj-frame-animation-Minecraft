export function G(e, t, n = {
    path: [],
    schemaPath: []
}) {
    let r;
    let def = e._zod.def;
    let a = t.seen.get(e);
    if (a) {
        a.count++;
        if (n.schemaPath.includes(e)) {
            a.cycle = n.path;
        }
        return a.schema;
    }
    let o = {
        schema: {},
        count: 1,
        cycle: undefined,
        path: n.path
    };
    t.seen.set(e, o);
    let s = e._zod.toJSONSchema?.();
    if (s) {
        o.schema = s;
    } else {
        let r = {
            ...n,
            schemaPath: [
                ...n.schemaPath,
                e
            ],
            path: n.path
        };
        if (e._zod.processJSONSchema) {
            e._zod.processJSONSchema(t, o.schema, r);
        } else {
            let n = o.schema;
            let a = t.processors[def.type];
            if (!a) {
                throw Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
            }
            a(e, t, n, r);
        }
        let a = e._zod.parent;
        if (a) {
            o.ref ||= a;
            G(a, t, r);
            t.seen.get(a).isParent = true;
        }
    }
    let c = t.metadataRegistry.get(e);
    if (c) {
        Object.assign(o.schema, c);
    }
    if (t.io === `input` && K(e)) {
        delete o.schema.examples;
        delete o.schema.default;
    }
    t.io === `input` && `_prefault` in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault));
    delete o.schema._prefault;
    return t.seen.get(e).schema;
}
function K(e, t) {
    let n = t ?? {
        seen: new Set
    };
    if (n.seen.has(e)) {
        return false;
    }
    n.seen.add(e);
    let def = e._zod.def;
    if (def.type === `transform`) {
        return true;
    }
    if (def.type === `array`) {
        return K(def.element, n);
    }
    if (def.type === `set`) {
        return K(def.valueType, n);
    }
    if (def.type === `lazy`) {
        return K(def.getter(), n);
    }
    if (def.type === `promise` || def.type === `optional` || def.type === `nonoptional` || def.type === `nullable` || def.type === `readonly` || def.type === "default" || def.type === `prefault`) {
        return K(def.innerType, n);
    }
    if (def.type === `intersection`) {
        return K(def.left, n) || K(def.right, n);
    }
    if (def.type === `record` || def.type === `map`) {
        return K(def.keyType, n) || K(def.valueType, n);
    }
    if (def.type === `pipe`) {
        if (e._zod.traits.has(`$ZodCodec`)) {
            return true;
        }
        return K(def.in, n) || K(def.out, n);
    }
    if (def.type === `object`) {
        for(let e in def.shape){
            if (K(def.shape[e], n)) {
                return true;
            }
        }
        return false;
    }
    if (def.type === `union`) {
        for (let e of def.options){
            if (K(e, n)) {
                return true;
            }
        }
        return false;
    }
    if (def.type === `tuple`) {
        for (let e of def.items){
            if (K(e, n)) {
                return true;
            }
        }
        return !!(def.rest && K(def.rest, n));
    }
    return false;
}
