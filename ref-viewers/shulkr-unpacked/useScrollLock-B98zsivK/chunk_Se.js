const Se = null;
const Ce = new class {
    callbacks = [];
    callbacksCount = 0;
    nextId = 1;
    startId = 1;
    isScheduled = false;
    tick = (e)=>{
        this.isScheduled = false;
        let callbacks = this.callbacks;
        let callbacksCount = this.callbacksCount;
        this.callbacks = [];
        this.callbacksCount = 0;
        this.startId = this.nextId;
        if (callbacksCount > 0) {
            for(let n = 0; n < callbacks.length; n += 1){
                callbacks[n]?.(e);
            }
        }
    };
    request(e) {
        let nextId = this.nextId;
        this.nextId += 1;
        this.callbacks.push(e);
        this.callbacksCount += 1;
        this.isScheduled ||= (requestAnimationFrame(this.tick), true);
        return nextId;
    }
    cancel(e) {
        let t = e - this.startId;
        if (!(t < 0 || t >= this.callbacks.length)) {
            this.callbacks[t] = null;
            --this.callbacksCount;
        }
    }
};
export const q = class e {
    static create() {
        return new e;
    }
    static request(e) {
        return Ce.request(e);
    }
    static cancel(e) {
        return Ce.cancel(e);
    }
    currentId = Se;
    request(e) {
        this.cancel();
        this.currentId = Ce.request(()=>{
            this.currentId = Se;
            e();
        });
    }
    cancel = ()=>{
        if (this.currentId !== Se) {
            Ce.cancel(this.currentId);
            this.currentId = Se;
        }
    };
    disposeEffect = ()=>this.cancel;
};
