import { Qg } from "./module-16649.js";
export function XW(e) {
    return new i((t)=>{
        t(e);
    });
}
export function xg(e) {
    return new i((t, r)=>{
        r(e);
    });
}
class i {
    constructor(e){
        this._state = 0;
        this._handlers = [];
        this._runExecutor(e);
    }
    then(e, t) {
        return new i((r, n)=>{
            this._handlers.push([
                false,
                (t)=>{
                    if (e) {
                        try {
                            r(e(t));
                        } catch (error) {
                            n(error);
                        }
                    } else {
                        r(t);
                    }
                },
                (e)=>{
                    if (t) {
                        try {
                            r(t(e));
                        } catch (error) {
                            n(error);
                        }
                    } else {
                        n(e);
                    }
                }
            ]);
            this._executeHandlers();
        });
    }
    catch(e) {
        return this.then((e)=>e, e);
    }
    finally(e) {
        return new i((t, r)=>{
            let n;
            let a;
            return this.then((t)=>{
                a = false;
                n = t;
                if (e) {
                    e();
                }
            }, (t)=>{
                a = true;
                n = t;
                if (e) {
                    e();
                }
            }).then(()=>{
                if (a) {
                    return void r(n);
                }
                t(n);
            });
        });
    }
    _executeHandlers() {
        if (this._state === 0) {
            return;
        }
        let e = this._handlers.slice();
        this._handlers = [];
        e.forEach((e)=>{
            if (!e[0]) {
                if (this._state === 1) {
                    e[1](this._value);
                }
                if (this._state === 2) {
                    e[2](this._value);
                }
                e[0] = true;
            }
        });
    }
    _runExecutor(e) {
        let t = (e, t)=>{
            if (this._state === 0) {
                if (Qg(t)) {
                    return void t.then(r, a);
                }
                this._state = e;
                this._value = t;
                this._executeHandlers();
            }
        };
        let r = (e)=>{
            t(1, e);
        };
        let a = (e)=>{
            t(2, e);
        };
        try {
            e(r, a);
        } catch (error) {
            a(error);
        }
    }
}
