export class Q {
    constructor(){
        ((e, t, n)=>((e, t, n)=>{
                if (t in e) {
                    return Object.defineProperty(e, t, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: n
                    });
                }
                return e[t] = n;
            })(e, typeof t !== "symbol" ? `${t}` : t, n))(this, "_listeners");
    }
    addEventListener(e, t) {
        if (this._listeners === undefined) {
            this._listeners = {};
        }
        let _listeners = this._listeners;
        if (_listeners[e] === undefined) {
            _listeners[e] = [];
        }
        if (_listeners[e].indexOf(t) === -1) {
            _listeners[e].push(t);
        }
    }
    hasEventListener(e, t) {
        if (this._listeners === undefined) {
            return false;
        }
        let _listeners = this._listeners;
        return _listeners[e] !== undefined && _listeners[e].indexOf(t) !== -1;
    }
    removeEventListener(e, t) {
        if (this._listeners === undefined) {
            return;
        }
        let n = this._listeners[e];
        if (n !== undefined) {
            let e = n.indexOf(t);
            if (e !== -1) {
                n.splice(e, 1);
            }
        }
    }
    dispatchEvent(e) {
        if (this._listeners === undefined) {
            return;
        }
        let t = this._listeners[e.type];
        if (t !== undefined) {
            e.target = this;
            let n = t.slice(0);
            for(let t = 0, r = n.length; t < r; t++){
                n[t].call(this, e);
            }
            e.target = null;
        }
    }
}
