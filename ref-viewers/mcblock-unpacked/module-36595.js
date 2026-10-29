import { D } from "./module-40623.js";
export class h extends D {
    items;
    constructor(e){
        super();
        this.items = e;
    }
    getItems() {
        return this.items.slice(0);
    }
    getAsTuple(e, t) {
        return [
            ...Array(e)
        ].map((e, r)=>t(this.items[r]));
    }
    get(e) {
        if (!((e = Math.floor(e)) < 0) && !(e >= this.items.length)) {
            return this.items[e];
        }
    }
    get length() {
        return this.items.length;
    }
    map(e) {
        return this.items.map(e);
    }
    filter(e) {
        return this.items.filter(e);
    }
    forEach(e) {
        this.items.forEach(e);
    }
    set(e, t) {
        this.items[e] = t;
    }
    add(e) {
        this.items.push(e);
    }
    insert(e, t) {
        this.items.splice(e, 0, t);
    }
    delete(e) {
        this.items.splice(e, 1);
    }
    clear() {
        this.items = [];
    }
}
