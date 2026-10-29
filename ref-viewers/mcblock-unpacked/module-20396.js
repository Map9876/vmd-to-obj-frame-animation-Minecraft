import { computeCacheBustingSearchParam } from "./module-13485.js";
import { NEXT_ROUTER_PREFETCH_HEADER, NEXT_ROUTER_SEGMENT_PREFETCH_HEADER, NEXT_ROUTER_STATE_TREE_HEADER, NEXT_RSC_UNION_QUERY, NEXT_URL } from "./module-52486.js";
export let setCacheBustingSearchParam = (e, t)=>{
    setCacheBustingSearchParamWithHash(e, computeCacheBustingSearchParam(t[NEXT_ROUTER_PREFETCH_HEADER], t[NEXT_ROUTER_SEGMENT_PREFETCH_HEADER], t[NEXT_ROUTER_STATE_TREE_HEADER], t[NEXT_URL]));
};
export let setCacheBustingSearchParamWithHash = (e, t)=>{
    let e_search = e.search;
    let n = (e_search.startsWith("?") ? e_search.slice(1) : e_search).split("&").filter((e)=>e && !e.startsWith(`${NEXT_RSC_UNION_QUERY}=`));
    if (t.length > 0) {
        n.push(`${NEXT_RSC_UNION_QUERY}=${t}`);
    } else {
        n.push(`${NEXT_RSC_UNION_QUERY}`);
    }
    e.search = n.length ? `?${n.join("&")}` : "";
};
