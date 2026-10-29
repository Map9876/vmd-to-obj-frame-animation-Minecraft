export let reportGlobalError = typeof reportError === "function" ? reportError : (e)=>{
    globalThis.console.error(e);
};
