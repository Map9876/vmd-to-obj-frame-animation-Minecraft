import { jsx } from "./module-86897.js";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "./module-61426.js";
import { A as A_1 } from "./module-27884.js";
import { A as A_2 } from "./module-2199.js";
import { A as A_3 } from "./module-10735.js";
import { A as A_4 } from "./module-11564.js";
import { A as A_5 } from "./module-40977.js";
import { A as A_6 } from "./module-84193.js";
import { A as A_7 } from "./module-40920.js";
import { A as A_8 } from "./module-20337.js";
import { A as A_9 } from "./module-10287.js";
import { A as A_10 } from "./module-57518.js";
import { A as A_11 } from "./module-55959.js";
import { A as A_12 } from "./module-51792.js";
import { A as A_13 } from "./module-76184.js";
import { A as A_14 } from "./module-22868.js";
import { hR } from "./module-75377.js";
import * as Y from "./module-14938.js";
import * as K from "./module-24953.js";
import { $ as $_1 } from "./module-1855.js";
const x = require(99729);
const j = require(44478);
let y = {
    中世纪: "中世纪风",
    欧式: "欧陆风情",
    中式: "国风古建",
    日式: "和风庭院",
    现代: "现代别墅",
    幻想: "魔幻奇境",
    红石: "红石科技",
    工业: "蒸汽工业",
    自然: "自然野趣",
    生存: "生存实用",
    装饰: "装饰点缀",
    雕塑: "雕塑造像",
    载具: "载具机械",
    植物: "植物绿化",
    科幻: "科幻未来"
};
let k = [
    "中世纪",
    "现代",
    "日式",
    "中式",
    "欧式",
    "幻想",
    "工业",
    "自然",
    "生存",
    "装饰",
    "雕塑",
    "载具",
    "植物",
    "科幻"
];
function N(e) {
    return y[e] ?? e;
}
let C = new Map;
function S(e, t, pageSize) {
    return JSON.stringify({
        ...e,
        page: t,
        pageSize
    });
}
let A = new Map;
let R = new Map;
function M(e) {
    R.get(e)?.forEach((e)=>{
        try {
            e();
        } catch (e) {}
    });
}
function z(e, t) {
    let r = A.get(e);
    if (!r) {
        return;
    }
    let n = typeof t === "function" ? t(r) : t;
    A.set(e, {
        ...r,
        ...n,
        ts: Date.now()
    });
    M(e);
}
let E = "mcblock_buildings_progress";
let B = 0;
window.addEventListener("popstate", ()=>{
    B = Date.now();
});
let F = false;
function I(e) {
    return JSON.stringify([
        e.difficulty || "all",
        e.sort || "latest",
        e.search || "",
        e.tag || "all"
    ]);
}
function P(e, t, r) {
    let n = new URLSearchParams;
    if (e.difficulty && e.difficulty !== "all") {
        n.set("difficulty", e.difficulty);
    }
    if (e.sort && e.sort !== "latest") {
        n.set("sort", e.sort);
    }
    if (e.search) {
        n.set("search", e.search);
    }
    if (e.tag && e.tag !== "all") {
        n.set("tag", e.tag);
    }
    n.set("page", String(t));
    n.set("limit", String(r));
    return n.toString();
}
function L(e) {
    window.history.replaceState(window.history.state, "", e);
}
function D(e, t) {
    let r = new URLSearchParams;
    if (e.difficulty && e.difficulty !== "all") {
        r.set("difficulty", e.difficulty);
    }
    if (e.sort && e.sort !== "latest") {
        r.set("sort", e.sort);
    }
    if (e.search) {
        r.set("search", e.search);
    }
    if (e.tag && e.tag !== "all") {
        r.set("tag", e.tag);
    }
    if (t > 1) {
        r.set("page", String(t));
    }
    let n = r.toString();
    if (n) {
        return `?${n}`;
    }
    return "";
}
function T(pagination, limit, r) {
    let n = pagination || {
        page: r,
        total: 0,
        totalPages: 1,
        limit
    };
    return {
        page: n.page,
        total: n.total,
        totalPages: n.totalPages,
        pageSize: n.limit || n.pageSize || limit
    };
}
function $(e) {
    let minPageSize = e.minPageSize ?? 20;
    let maxPageSize = e.maxPageSize ?? 30;
    let preferredRows = e.preferredRows ?? 7;
    return {
        defaultPageSize: e.defaultPageSize ?? 30,
        minPageSize,
        maxPageSize,
        minRows: e.minRows ?? 7,
        maxRows: e.maxRows ?? 8,
        preferredRows
    };
}
function O({ clientWidth }, t) {
    if (clientWidth <= 0) {
        return 0;
    }
    let n = Number.parseFloat(t.columnGap || t.gap || "0") || 0;
    if (window.matchMedia("(max-width: 767px)").matches) {
        return 2;
    }
    return Math.max(1, Math.floor((clientWidth + n) / ((window.matchMedia("(max-width: 1279px)").matches ? 300 : 340) + n)));
}
function W(e) {
    let t = window.getComputedStyle(e);
    if (t.display !== "grid") {
        return 1;
    }
    let gridTemplateColumns = window.getComputedStyle(e).gridTemplateColumns;
    if (!gridTemplateColumns || gridTemplateColumns === "none") {
        return O(e, t);
    }
    let n = gridTemplateColumns.match(/^repeat\(\s*(\d+)\s*,/i);
    if (n) {
        return Number.parseInt(n[1], 10);
    }
    let l = gridTemplateColumns.trim().split(/\s+/).filter(Boolean).filter((e)=>e !== "/" && e !== "none");
    if (l.length > 0 && !l.some((e)=>e.includes("auto-fill") || e.includes("auto-fit"))) {
        return l.length;
    }
    return O(e, t);
}
const _ = require(97003);
const J = require(44460);
const V = require(24048);
let H = {
    difficulty: "all",
    sort: "latest",
    search: "",
    tag: "all"
};
let G = [
    {
        value: "all",
        label: "全部",
        match: []
    },
    {
        value: "beginner",
        label: "新手",
        match: [
            "beginner",
            "easy"
        ]
    },
    {
        value: "intermediate",
        label: "进阶",
        match: [
            "intermediate",
            "medium"
        ]
    },
    {
        value: "advanced",
        label: "高级",
        match: [
            "advanced",
            "hard"
        ]
    },
    {
        value: "expert",
        label: "大师",
        match: [
            "expert"
        ]
    }
];
let U = [
    {
        value: "popular",
        label: "最热门"
    },
    {
        value: "latest",
        label: "最新上架"
    },
    {
        value: "layers",
        label: "建筑高度"
    }
];
let Q = {
    中世纪: A_1,
    现代: A_2,
    日式: A_3,
    中式: A_4,
    欧式: A_5,
    幻想: A_6,
    工业: A_7,
    自然: A_8,
    生存: A_9,
    装饰: A_10,
    雕塑: A_11,
    载具: A_12,
    植物: x.A,
    科幻: A_13
};
let X = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>;
function ZComponent({ initialBuildings, initialPagination, difficultyStats = [], basePath = "/buildings", sectionTitle = "全部免费建筑", scrollTargetRef, initialFilters, externalTag, onTagChange, afterFilterSlot, styleTagCounts, showStyleChips = true }) {
    let y = styleTagCounts ?? k.map((tag)=>({
            tag,
            count: 0
        }));
    let O = externalTag !== undefined;
    let ZRef = useRef(null);
    let eeRef = useRef(null);
    let etRef = useRef(null);
    let erRef = useRef(null);
    let enRef = useRef(null);
    let elRef = useRef(null);
    let eaRef = useRef(null);
    let eiRef = useRef(true);
    let initialFilters_1 = initialFilters ?? H;
    let [eo, setEo] = useState(initialFilters_1.search ?? "");
    let [eu, setEu] = useState(false);
    let [eh, setEh] = useState(false);
    let [ef, setEf] = useState("grid");
    let pageSize = ((ZRef_1, t = {})=>{
        let r = $(t);
        let [n, setN] = useState(r.defaultPageSize);
        useEffect(()=>{
            let e_current = ZRef_1.current;
            if (!e_current || typeof ResizeObserver === "undefined") {
                return;
            }
            let n = 0;
            let l = ()=>{
                if (n) {
                    window.cancelAnimationFrame(n);
                }
                n = window.requestAnimationFrame(()=>{
                    let e = W(e_current);
                    if (e <= 0) {
                        return;
                    }
                    let n = ((e, t = {})=>{
                        let { minPageSize, maxPageSize, minRows, maxRows, preferredRows } = $(t);
                        let s = Math.max(1, Math.floor(e) || 1);
                        let o = null;
                        for(let e = minPageSize; e <= maxPageSize; e += 1){
                            if (e % s != 0) {
                                continue;
                            }
                            if (o === null) {
                                o = e;
                                continue;
                            }
                            let t = e / s;
                            let r = o / s;
                            let n = t >= minRows && t <= maxRows;
                            let c = r >= minRows && r <= maxRows;
                            let u = Math.abs(t - preferredRows);
                            let d = Math.abs(r - preferredRows);
                            if (n && !c || n === c && u < d || n === c && u === d && e > o) {
                                o = e;
                            }
                        }
                        return o ?? Math.min(maxPageSize, Math.max(minPageSize, 28));
                    })(e, r);
                    setN((e)=>{
                        if (e === n) {
                            return e;
                        }
                        return n;
                    });
                });
            };
            l();
            let i = new ResizeObserver(l);
            i.observe(e_current);
            return ()=>{
                if (n) {
                    window.cancelAnimationFrame(n);
                }
                i.disconnect();
            };
        }, [
            ZRef_1,
            r.defaultPageSize,
            r.maxPageSize,
            r.maxRows,
            r.minPageSize,
            r.minRows,
            r.preferredRows
        ]);
        return n;
    })(ZRef, {
        defaultPageSize: 30,
        preferredRows: 7
    });
    let ex = ((ZRef_1, t = 1)=>{
        let [r, setR] = useState(t);
        useEffect(()=>{
            let e_current = ZRef_1.current;
            if (!e_current || typeof ResizeObserver === "undefined") {
                return;
            }
            let r = 0;
            let l = ()=>{
                if (r) {
                    window.cancelAnimationFrame(r);
                }
                r = window.requestAnimationFrame(()=>{
                    let e = W(e_current);
                    if (!(e <= 0)) {
                        setR((t)=>{
                            if (t === e) {
                                return t;
                            }
                            return e;
                        });
                    }
                });
            };
            l();
            let a = new ResizeObserver(l);
            a.observe(e_current);
            return ()=>{
                if (r) {
                    window.cancelAnimationFrame(r);
                }
                a.disconnect();
            };
        }, [
            t,
            ZRef_1
        ]);
        return r;
    })(ZRef, 1);
    let { buildings, pagination, filters, isLoading, isLoadingMore, hasMore, error, isRestoring, restoreAnchor, clearRestoreAnchor, saveProgress, updateFilter, updateFilters, loadMore, search } = (({ initialBuildings, initialPagination, initialFilters, pageSize, basePath = "/buildings/all", scrollTargetRef })=>{
        let o = Math.min(30, Math.max(20, pageSize || initialPagination.pageSize || 30));
        let c = `${basePath}|${I(initialFilters)}`;
        let uRef = useRef(false);
        let dRef = useRef(false);
        if (!uRef.current) {
            uRef.current = true;
            let e = A.get(c);
            let l = !!e && e.buildings.length > initialBuildings.length && Date.now() - e.ts < 600000;
            dRef.current = l;
            if (!l) {
                ((e, t)=>{
                    if (!A.has(e) && A.size >= 3) {
                        let e = A.keys().next().value;
                        if (!(e === undefined || R.get(e)?.size)) {
                            A.delete(e);
                        }
                    }
                    A.delete(e);
                    A.set(e, t);
                    M(e);
                })(c, {
                    buildings: initialBuildings,
                    pagination: initialPagination,
                    filters: initialFilters,
                    isRestoring: false,
                    restoreAnchor: null,
                    restored: false,
                    ts: Date.now()
                });
            }
        }
        let hRef = useRef(null);
        if (hRef.current === null) {
            hRef.current = {
                buildings: initialBuildings,
                pagination: initialPagination,
                filters: initialFilters,
                isRestoring: false,
                restoreAnchor: null,
                restored: false,
                ts: Date.now()
            };
        }
        let { buildings, pagination, filters, isRestoring, restoreAnchor } = useSyncExternalStore(useCallback((e)=>{
            let t;
            if (!(t = R.get(c))) {
                t = new Set;
                R.set(c, t);
            }
            t.add(e);
            return ()=>{
                t.delete(e);
            };
        }, [
            c
        ]), useCallback(()=>A.get(c) ?? hRef.current, [
            c
        ]), useCallback(()=>hRef.current, []));
        let [p, setP] = useState(false);
        let [w, setW] = useState(false);
        let [error_1, setError] = useState(null);
        let NRef = useRef(p);
        let $RefRef = useRef(w);
        useEffect(()=>{
            NRef.current = p;
        }, [
            p
        ]);
        useEffect(()=>{
            $RefRef.current = w;
        }, [
            w
        ]);
        let O = useCallback(()=>A.get(c) ?? hRef.current, [
            c
        ]);
        let W = useCallback(async (e, t, r)=>{
            let n = S(e, t, r);
            let l = C.get(n);
            if (l && Date.now() - l.timestamp < 60000) {
                return l.data;
            }
            let a = await fetch(`/api/buildings?${P(e, t, r)}`);
            if (!a.ok) {
                throw Error("加载失败");
            }
            let i = await a.json();
            if (!i.success) {
                throw Error(i.error || "加载失败");
            }
            let s = {
                buildings: i.data || [],
                pagination: T(i.pagination, r, t)
            };
            C.set(n, {
                data: s,
                timestamp: Date.now()
            });
            return s;
        }, []);
        let YRef = useRef(false);
        useEffect(()=>{
            if (YRef.current) {
                return;
            }
            YRef.current = true;
            let filters = O().filters;
            let n = dRef.current || B > 0 && Date.now() - B < 5000 || (()=>{
                if (F) {
                    return false;
                }
                F = true;
                try {
                    let [e] = performance.getEntriesByType("navigation");
                    return e?.type === "back_forward";
                } catch (e) {
                    return false;
                }
            })() ? ((basePath_1, t)=>{
                try {
                    let r = window.sessionStorage.getItem(E);
                    if (!r) {
                        return null;
                    }
                    let n = JSON.parse(r);
                    if (n.basePath !== basePath_1 || n.filtersKey !== t || !n.ts || Date.now() - n.ts > 600000 || !n.loadedCount || n.loadedCount < 0) {
                        return null;
                    }
                    return n;
                } catch (e) {
                    return null;
                }
            })(basePath, I(filters)) : null;
            if (dRef.current) {
                return void z(c, {
                    restored: true,
                    ...n ? {
                        restoreAnchor: {
                            anchorId: n.anchorId,
                            scrollY: n.scrollY,
                            columns: n.columns
                        }
                    } : {}
                });
            }
            let l = initialPagination.page || 1;
            let a = Math.max(1, Math.ceil(Math.min(Math.max(n?.loadedCount ?? 0, l * o), 300) / o));
            if (a > 1) {
                z(c, {
                    isRestoring: true
                });
                Promise.all(Array.from({
                    length: a
                }, (e, r)=>W(filters, r + 1, o))).then((e)=>{
                    let t = new Set;
                    let buildings_1 = [];
                    for (let n of e){
                        for (let e of n.buildings){
                            if (!t.has(e.id)) {
                                t.add(e.id);
                                buildings_1.push(e);
                            }
                        }
                    }
                    if (buildings_1.length !== 0) {
                        z(c, {
                            buildings: buildings_1,
                            pagination: {
                                ...e[e.length - 1].pagination,
                                page: a
                            },
                            restoreAnchor: n ? {
                                anchorId: n.anchorId,
                                scrollY: n.scrollY,
                                columns: n.columns
                            } : null,
                            restored: true
                        });
                    }
                }).catch(()=>{}).finally(()=>{
                    z(c, {
                        isRestoring: false
                    });
                });
                return;
            }
            fetch(`/api/buildings?${P(filters, l, o)}`).then((e)=>e.json()).then((e)=>{
                if (e.success && e.data) {
                    z(c, {
                        buildings: e.data,
                        ...e.pagination ? {
                            pagination: T(e.pagination, o, l)
                        } : {}
                    });
                }
            }).catch(()=>{});
        }, [
            o
        ]);
        let K = useCallback(async (e, t)=>{
            let r = S(e, t, o);
            let n = C.get(r);
            if (n && Date.now() - n.timestamp < 60000) {
                return void z(c, {
                    buildings: n.data.buildings,
                    pagination: n.data.pagination
                });
            }
            setP(true);
            setError(null);
            try {
                let r = await W(e, t, o);
                z(c, {
                    buildings: r.buildings,
                    pagination: r.pagination
                });
                L(`${basePath}${D(e, t)}`);
            } catch (err) {
                setError(err.message || "加载失败");
            } finally{
                setP(false);
            }
        }, [
            basePath,
            c,
            o,
            W
        ]);
        let _RefRef = useRef(o);
        useEffect(()=>{
            if (!YRef.current) {
                return;
            }
            let e = O();
            if (!e.isRestoring && _RefRef.current !== o) {
                _RefRef.current = o;
                if (!e.restored) {
                    K(e.filters, 1);
                }
            }
        }, [
            K,
            o,
            O
        ]);
        let updateFilter_1 = useCallback((e, t)=>{
            let r = {
                ...O().filters,
                [e]: t
            };
            z(c, {
                filters: r
            });
            K(r, 1);
        }, [
            c,
            O,
            K
        ]);
        let updateFilters_1 = useCallback((e)=>{
            let t = {
                ...O().filters,
                ...e
            };
            z(c, {
                filters: t
            });
            K(t, 1);
        }, [
            c,
            O,
            K
        ]);
        let goToPage = useCallback((e)=>{
            K(O().filters, e);
            if (scrollTargetRef?.current) {
                scrollTargetRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }, [
            O,
            K,
            scrollTargetRef
        ]);
        let loadMore_1 = useCallback(async ()=>{
            let e = O();
            let t = e.pagination.page + 1;
            if (!(t > e.pagination.totalPages) && !NRef.current && !$RefRef.current && !e.isRestoring) {
                setW(true);
                setError(null);
                try {
                    let r = await W(e.filters, t, e.pagination.pageSize || o);
                    z(c, (e)=>{
                        let t = new Set(e.buildings.map((e)=>e.id));
                        return {
                            buildings: [
                                ...e.buildings,
                                ...r.buildings.filter((e)=>!t.has(e.id))
                            ],
                            pagination: r.pagination,
                            restored: true
                        };
                    });
                    L(`${basePath}${D(e.filters, r.pagination.page)}`);
                } catch (err) {
                    setError(err.message || "加载失败");
                } finally{
                    setW(false);
                }
            }
        }, [
            basePath,
            c,
            o,
            O,
            W
        ]);
        let G = useCallback((e)=>{
            let t = {
                ...O().filters,
                search: e
            };
            z(c, {
                filters: t
            });
            K(t, 1);
        }, [
            c,
            O,
            K
        ]);
        let saveProgress_1 = useCallback((anchorId, scrollY, columns)=>{
            let n = O();
            if (!(n.buildings.length <= 0)) {
                var l = {
                    basePath,
                    filtersKey: I(n.filters),
                    loadedCount: n.buildings.length,
                    anchorId,
                    scrollY,
                    columns,
                    ts: Date.now()
                };
                try {
                    window.sessionStorage.setItem(E, JSON.stringify(l));
                } catch (e) {}
            }
        }, [
            basePath,
            O
        ]);
        let clearRestoreAnchor_1 = useCallback(()=>{
            z(c, {
                restoreAnchor: null
            });
        }, [
            c
        ]);
        return {
            buildings,
            pagination,
            filters,
            isLoading: p,
            isLoadingMore: w,
            hasMore: pagination.page < pagination.totalPages,
            error: error_1,
            isRestoring,
            restoreAnchor,
            clearRestoreAnchor: clearRestoreAnchor_1,
            saveProgress: saveProgress_1,
            updateFilter: updateFilter_1,
            updateFilters: updateFilters_1,
            goToPage,
            loadMore: loadMore_1,
            search: G
        };
    })({
        initialBuildings,
        initialPagination,
        initialFilters: initialFilters_1,
        pageSize,
        basePath,
        scrollTargetRef: scrollTargetRef ?? eeRef
    });
    let eF = useMemo(()=>{
        let e = new Map;
        let count_1 = 0;
        for (let r of difficultyStats){
            e.set(r.difficulty, r.count);
            count_1 += r.count;
        }
        return G.map((r)=>{
            if (r.value === "all") {
                return {
                    ...r,
                    count: count_1
                };
            }
            let count = r.match.reduce((acc, item)=>acc + (e.get(item) || 0), 0);
            return {
                ...r,
                count
            };
        });
    }, [
        difficultyStats
    ]);
    useEffect(()=>{
        if (eiRef.current) {
            eiRef.current = false;
            return;
        }
        if (eaRef.current) {
            clearTimeout(eaRef.current);
        }
        eaRef.current = setTimeout(()=>search(eo.trim()), 400);
        return ()=>{
            if (eaRef.current) {
                clearTimeout(eaRef.current);
            }
        };
    }, [
        eo
    ]);
    useEffect(()=>{
        if (externalTag !== undefined && externalTag !== filters.tag) {
            updateFilter("tag", externalTag);
        }
    }, [
        externalTag
    ]);
    useEffect(()=>{
        let etRef_current = etRef.current;
        let erRef_current = erRef.current;
        if (!etRef_current || !erRef_current) {
            return;
        }
        let r = new IntersectionObserver(([r])=>{
            etRef_current.classList.toggle("ubg-stuck", !r.isIntersecting);
        }, {
            threshold: 0,
            rootMargin: "-65px 0px 0px 0px"
        });
        r.observe(erRef_current);
        return ()=>r.disconnect();
    }, []);
    useEffect(()=>{
        if (!eu) {
            return;
        }
        let e = (e)=>{
            if (enRef.current && !enRef.current.contains(e.target)) {
                setEu(false);
            }
        };
        document.addEventListener("click", e);
        return ()=>document.removeEventListener("click", e);
    }, [
        eu
    ]);
    useEffect(()=>{
        if (!eh) {
            return;
        }
        let e = (e)=>{
            if (elRef.current && !elRef.current.contains(e.target)) {
                setEh(false);
            }
        };
        document.addEventListener("click", e);
        return ()=>document.removeEventListener("click", e);
    }, [
        eh
    ]);
    let onClick = useCallback(()=>{
        setEo("");
        search("");
    }, [
        search
    ]);
    let onSubmit = useCallback((e)=>{
        e.preventDefault();
        if (eaRef.current) {
            clearTimeout(eaRef.current);
        }
        search(eo.trim());
    }, [
        search,
        eo
    ]);
    let eL = useCallback((e)=>{
        updateFilter("sort", e);
        setEu(false);
    }, [
        updateFilter
    ]);
    let eD = U.find((e)=>e.value === filters.sort)?.label || "最新上架";
    let eT = filters.tag || "all";
    let e$ = useMemo(()=>hR(buildings), [
        buildings
    ]);
    let eO = ef === "list" ? 1 : Math.max(1, ex);
    let eW = useMemo(()=>{
        if (eO <= 1 || e$.length <= eO) {
            return e$;
        }
        let e = Math.floor(e$.length / eO) * eO;
        if (e <= 0 || e === e$.length) {
            return e$;
        }
        if (hasMore) {
            return e$.slice(0, e);
        }
        return e$;
    }, [
        eO,
        hasMore,
        e$
    ]);
    let eY = filters.difficulty === "all" ? sectionTitle : G.find((e)=>e.value === filters.difficulty)?.label ?? sectionTitle;
    let eKRef = useRef(eO);
    let e_Ref = useRef(eW);
    useEffect(()=>{
        eKRef.current = eO;
    }, [
        eO
    ]);
    useEffect(()=>{
        e_Ref.current = eW;
    }, [
        eW
    ]);
    useEffect(()=>{
        if (isLoading || isRestoring) {
            return;
        }
        let e = null;
        let t = ()=>{
            e = null;
            let ZRef_current = ZRef.current;
            let e_Ref_current = e_Ref.current;
            if (!ZRef_current || ZRef_current.children.length === 0 || e_Ref_current.length === 0) {
                return;
            }
            let offsetHeight = ZRef_current.children[0].offsetHeight;
            if (offsetHeight <= 0) {
                return;
            }
            let i = Math.max(1, eKRef.current);
            let s = Number.parseFloat(window.getComputedStyle(ZRef_current).rowGap || "0") || 0;
            let o = ZRef_current.getBoundingClientRect().top + window.scrollY;
            let c = Math.max(0, Math.min(Math.max(0, Math.floor((window.scrollY + window.innerHeight - o) / (offsetHeight + s))) * i + i - 1, e_Ref_current.length - 1));
            saveProgress(e_Ref_current[c]?.id ?? null, window.scrollY, i);
        };
        let r = ()=>{
            if (!e) {
                e = setTimeout(t, 200);
            }
        };
        window.addEventListener("scroll", r, {
            passive: true
        });
        return ()=>{
            window.removeEventListener("scroll", r);
            if (e) {
                clearTimeout(e);
            }
        };
    }, [
        isLoading,
        isRestoring,
        saveProgress
    ]);
    useEffect(()=>{
        if (!restoreAnchor || isRestoring) {
            return;
        }
        let e = false;
        let t = 0;
        let r = ()=>{
            e = true;
        };
        window.addEventListener("touchstart", r, {
            passive: true
        });
        window.addEventListener("wheel", r, {
            passive: true
        });
        let n = ()=>{
            window.removeEventListener("touchstart", r);
            window.removeEventListener("wheel", r);
        };
        let l = ()=>{
            n();
            clearRestoreAnchor();
        };
        let a = ()=>{
            if (e) {
                return l();
            }
            let ZRef_current = ZRef.current;
            if (ZRef_current && ZRef_current.children.length > 0) {
                let e = e_Ref.current;
                let t = restoreAnchor.anchorId ? e.findIndex((e)=>e.id === restoreAnchor.anchorId) : -1;
                let n = t >= 0 ? ZRef_current.children[t] : undefined;
                if (restoreAnchor.columns !== Math.max(1, eKRef.current) && n) {
                    n.scrollIntoView({
                        block: "end"
                    });
                } else {
                    window.scrollTo(0, restoreAnchor.scrollY);
                }
                return l();
            }
            if (t++ < 60) {
                window.requestAnimationFrame(a);
            } else {
                l();
            }
        };
        window.requestAnimationFrame(a);
        return n;
    }, [
        restoreAnchor,
        isRestoring,
        clearRestoreAnchor
    ]);
    return <><div ref={eeRef}/><div ref={erRef} style={{
        height: 1,
        marginBottom: -1,
        pointerEvents: "none"
    }}/><div ref={etRef} className="ubg-filterz"><div className="wrap"><V.I className="ubg-tabs" value={filters.difficulty} onValueChange={(e)=>updateFilter("difficulty", e)} size="md" disabled={isLoading} label="按难度筛选">{eF.map((e)=>{
        let t = filters.difficulty === e.value;
        let background = e.value !== "all" ? j.g(e.value).bg : undefined;
        return <V.d key={e.value} value={e.value} className="ubg-tab-item">{background && <span className="ubg-cdot" style={{
            background
        }}/>}{e.label}{t && <span className="ubg-ct">{e.count}</span>}</V.d>;
    })}</V.I><form onSubmit={onSubmit} className="ubg-box">{X}<input type="search" value={eo} onChange={(e)=>setEo(e.target.value)} placeholder="搜索建筑名称、作者或风格…" aria-label="搜索建筑"/>{eo && <J.K label="清除搜索" size="xs" variant="ghost" className="ubg-clear" onClick={onClick}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M6 6l12 12M18 6 6 18"/></svg></J.K>}</form><div className="ubg-tools"><div className="ubg-views" aria-label="视图切换"><J.K label="网格视图" size="md" variant={ef === "grid" ? "primary" : "secondary"} className={`ubg-view${ef === "grid" ? " ubg-on" : ""}`} onClick={()=>setEf("grid")} aria-pressed={ef === "grid"}><svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg></J.K><J.K label="列表视图" size="md" variant={ef === "list" ? "primary" : "secondary"} className={`ubg-view${ef === "list" ? " ubg-on" : ""}`} onClick={()=>setEf("list")} aria-pressed={ef === "list"}><svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="4" width="18" height="3"/><rect x="3" y="10.5" width="18" height="3"/><rect x="3" y="17" width="18" height="3"/></svg></J.K></div><div ref={enRef} className={`ubg-sort${eu ? " ubg-open" : ""}`}><_.$ variant="secondary" size="md" className="ubg-sortbtn" onClick={()=>setEu((e)=>!e)} disabled={isLoading} aria-haspopup="menu" aria-expanded={eu}><span className="ubg-sortlab">排序</span><b>{eD}</b><span className="ubg-cv" aria-hidden>▾</span></_.$><div className="ubg-sort-menu" role="menu">{U.map((e)=><_.$ key={e.value} variant="ghost" size="sm" className={`ubg-sort-option${filters.sort === e.value ? " ubg-active" : ""}`} onClick={()=>eL(e.value)} role="menuitemradio" aria-checked={filters.sort === e.value}>{e.label}</_.$>)}</div></div></div>{showStyleChips && !O && y.length > 0 && <div ref={elRef} className={`ubg-tagsel${eh ? " ubg-open" : ""}`}><_.$ variant="secondary" size="md" className="ubg-tagselbtn" onClick={()=>setEh((e)=>!e)} disabled={isLoading} aria-haspopup="menu" aria-expanded={eh}><span className="ubg-sortlab">风格</span><b>{eT === "all" ? "全部" : N(eT)}</b><span className="ubg-cv" aria-hidden>▾</span></_.$><div className="ubg-tagsel-menu" role="menu"><_.$ variant="ghost" size="sm" className={`ubg-sort-option${eT === "all" ? " ubg-active" : ""}`} onClick={()=>{
        updateFilter("tag", "all");
        setEh(false);
    }} role="menuitemradio" aria-checked={eT === "all"}>全部风格</_.$>{y.map(({ tag, count })=>{
        let l = Q[tag];
        return <_.$ key={tag} variant="ghost" size="sm" className={`ubg-sort-option${eT === tag ? " ubg-active" : ""}`} onClick={()=>{
            updateFilter("tag", tag);
            setEh(false);
        }} role="menuitemradio" aria-checked={eT === tag}>{l && jsx(l, {
            size: 15,
            stroke: 2,
            className: "ubg-tagico",
            "aria-hidden": true
        })}{N(tag)}<span className="ubg-ct">{count}</span></_.$>;
    })}</div></div>}{showStyleChips && !O && y.length > 0 && <div className="ubg-row"><div className="ubg-items"><$_1 selected={eT === "all"} onClick={()=>updateFilter("tag", "all")} disabled={isLoading}>全部</$_1>{y.map(({ tag, count })=>{
        let l = Q[tag];
        return <$_1 key={tag} selected={eT === tag} onClick={()=>updateFilter("tag", tag)} disabled={isLoading}>{l && jsx(l, {
            size: 15,
            stroke: 2,
            className: "ubg-tagico",
            "aria-hidden": true
        })}{N(tag)}{eT === tag && count > 0 && <span className="ubg-ct">{count}</span>}</$_1>;
    })}</div></div>}</div></div>{afterFilterSlot}<main className="ubg-gridz"><div className="wrap pb-[var(--sp-6)]"><div className="ubg-secttl"><span className="ubg-bar"/><h2>{eY}</h2><span className="ubg-cnt">共 {pagination.total} 个作品</span></div>{error && <div className="text-center py-8"><span className="ubg-error"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>{error}</span></div>}{isLoading || isRestoring ? <div ref={ZRef} className={`ubg-grid${ef === "list" ? " ubg-list" : ""}`}>{Array.from({
        length: Math.min(pageSize, 12)
    }, (e, key)=><div key={key} className="ubg-sk"><div className="ubg-sk-pic"/><div className="ubg-sk-bd"><div className="ubg-sk-ln"/><div className="ubg-sk-ln ubg-sk-sm"/></div></div>)}</div> : eW.length === 0 ? <K.p type="noResults" title="暂无符合条件的建筑教程" description="试试更换关键词或筛选条件" action=<_.$ variant="secondary" size="md" onClick={()=>{
        setEo("");
        updateFilters({
            difficulty: "all",
            tag: "all",
            search: ""
        });
    }}>清除筛选条件</_.$>/> : <div ref={ZRef} className={`ubg-grid${ef === "list" ? " ubg-list" : ""}`}>{eW.map((building)=><A_14 key={building.id} building={building} variant="clean"/>)}</div>}{!isLoading && !isRestoring && eW.length > 0 && <div className="ubg-more-wrap"><p className="ubg-more-count" aria-live="polite">{hasMore ? <>已展示 <b>{eW.length}</b> / 共 <b>{pagination.total}</b> 座</> : <>已展示全部 <b>{pagination.total}</b> 座建筑</>}</p>{hasMore && <_.$ variant="secondary" size="lg" onClick={loadMore} loading={isLoadingMore} loadingLabel="正在加载更多建筑" aria-label="加载更多建筑">加载更多<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg></_.$>}</div>}</div></main><Y.s/></>;
}
export { ZComponent as A };
