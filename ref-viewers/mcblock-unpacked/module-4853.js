export let requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(e) {
    let t = Date.now();
    return self.setTimeout(function() {
        e({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - t));
            }
        });
    }, 1);
};
export let cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(e) {
    return clearTimeout(e);
};
