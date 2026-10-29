export let matchSegment = (e, t)=>{
    if (typeof e === "string") {
        return typeof t === "string" && e === t;
    }
    return typeof t !== "string" && e[0] === t[0] && e[1] === t[1];
};
