import { useCallback, useEffect, useRef, useState } from "./module-61426.js";
export function c() {
    let [e, setE] = useState({
        mode: "preview",
        currentIndex: 0,
        stepCount: 0,
        layerCount: 0,
        totalBlocks: 0,
        selectedBlock: null,
        materialStats: [],
        stepMeta: [],
        layerMeta: [],
        isReady: false,
        isPlaying: false,
        playSpeed: 1,
        completedLayers: new Set,
        highlightedBlockId: null,
        focusMode: false,
        explodedSpacing: 0,
        showDecorEntities: true,
        showCreatures: false,
        decorEntityCount: 0,
        creatureEntityCount: 0,
        entityCount: 0
    });
    let nRef = useRef(null);
    useEffect(()=>{
        if (e.isPlaying && e.mode !== "preview") {
            nRef.current = setInterval(()=>{
                setE((e)=>{
                    let t = e.mode === "step" ? e.stepCount - 1 : e.layerCount - 1;
                    if (e.currentIndex >= t) {
                        return {
                            ...e,
                            isPlaying: false
                        };
                    }
                    let n = e.currentIndex + 1;
                    let l = new Set(e.completedLayers);
                    l.add(n);
                    return {
                        ...e,
                        currentIndex: n,
                        completedLayers: l,
                        selectedBlock: null
                    };
                });
            }, 1500 / e.playSpeed);
            return ()=>{
                if (nRef.current) {
                    clearInterval(nRef.current);
                }
            };
        }
        if (nRef.current) {
            clearInterval(nRef.current);
            nRef.current = null;
        }
    }, [
        e.isPlaying,
        e.playSpeed,
        e.mode
    ]);
    let setMode = useCallback((e, n)=>{
        setE((t)=>{
            let l = 0;
            if (n !== undefined) {
                l = Math.max(0, Math.min(n, e === "layer" ? Math.max(0, t.layerCount - 1) : Math.max(0, t.stepCount - 1)));
            }
            return {
                ...t,
                mode: e,
                currentIndex: l,
                selectedBlock: null,
                completedLayers: new Set,
                highlightedBlockId: null,
                isPlaying: false,
                focusMode: e !== "preview" && t.focusMode
            };
        });
    }, []);
    let next = useCallback(()=>{
        setE((e)=>{
            let t = e.mode === "step" ? e.stepCount - 1 : e.layerCount - 1;
            if (e.currentIndex >= t) {
                return e;
            }
            let n = new Set(e.completedLayers);
            n.add(e.currentIndex + 1);
            return {
                ...e,
                currentIndex: e.currentIndex + 1,
                completedLayers: n,
                selectedBlock: null
            };
        });
    }, []);
    let previous = useCallback(()=>{
        setE((e)=>{
            if (e.currentIndex <= 0) {
                return e;
            }
            let t = new Set(e.completedLayers);
            t.add(e.currentIndex - 1);
            return {
                ...e,
                currentIndex: e.currentIndex - 1,
                completedLayers: t,
                selectedBlock: null
            };
        });
    }, []);
    let goTo = useCallback((e)=>{
        setE((t)=>{
            let n = Math.max(0, Math.min(e, t.mode === "step" ? t.stepCount - 1 : t.layerCount - 1));
            let l = new Set(t.completedLayers);
            l.add(n);
            return {
                ...t,
                currentIndex: n,
                completedLayers: l,
                selectedBlock: null
            };
        });
    }, []);
    let reset = useCallback(()=>{
        setE((e)=>({
                ...e,
                currentIndex: 0,
                selectedBlock: null
            }));
    }, []);
    let showAll = useCallback(()=>{
        setE((e)=>({
                ...e,
                mode: "preview",
                selectedBlock: null
            }));
    }, []);
    let handleBlockClick = useCallback((selectedBlock)=>{
        setE((t)=>({
                ...t,
                selectedBlock,
                highlightedBlockId: selectedBlock ? t.highlightedBlockId : null
            }));
    }, []);
    let handleReady = useCallback((e)=>{
        setE((t)=>{
            let t_currentIndex = t.currentIndex;
            if (t.mode === "layer" && e.layerCount > 0) {
                t_currentIndex = Math.min(t_currentIndex, e.layerCount - 1);
            } else if (t.mode === "step" && e.stepCount > 0) {
                t_currentIndex = Math.min(t_currentIndex, e.stepCount - 1);
            }
            return {
                ...t,
                stepCount: e.stepCount,
                layerCount: e.layerCount,
                totalBlocks: e.totalBlocks,
                materialStats: e.materialStats,
                stepMeta: e.stepMeta,
                layerMeta: e.layerMeta,
                entityCount: e.entityCount ?? 0,
                decorEntityCount: e.decorEntityCount ?? 0,
                creatureEntityCount: e.creatureEntityCount ?? 0,
                isReady: true,
                currentIndex: t_currentIndex
            };
        });
    }, []);
    let togglePlay = useCallback(()=>{
        setE((e)=>{
            if (e.mode === "preview") {
                return e;
            }
            let t = e.mode === "step" ? e.stepCount - 1 : e.layerCount - 1;
            if (!e.isPlaying && e.currentIndex >= t) {
                return {
                    ...e,
                    isPlaying: true,
                    currentIndex: 0,
                    completedLayers: new Set
                };
            }
            return {
                ...e,
                isPlaying: !e.isPlaying
            };
        });
    }, []);
    let setPlaySpeed = useCallback((playSpeed)=>{
        setE((t)=>({
                ...t,
                playSpeed
            }));
    }, []);
    let highlightMaterial = useCallback((e)=>{
        setE((t)=>({
                ...t,
                highlightedBlockId: t.highlightedBlockId === e ? null : e
            }));
    }, []);
    let toggleFocusMode = useCallback(()=>{
        setE((e)=>{
            if (e.mode === "preview") {
                return e;
            }
            return {
                ...e,
                focusMode: !e.focusMode
            };
        });
    }, []);
    let setExplodeSpacing = useCallback((e)=>{
        setE((t)=>({
                ...t,
                explodedSpacing: Math.max(0, Math.min(3, e))
            }));
    }, []);
    let toggleExplode = useCallback(()=>{
        setE((e)=>({
                ...e,
                explodedSpacing: e.explodedSpacing > 0 ? 0 : 1
            }));
    }, []);
    return {
        state: e,
        actions: {
            setMode,
            next,
            previous,
            goTo,
            reset,
            showAll,
            handleBlockClick,
            handleReady,
            togglePlay,
            setPlaySpeed,
            highlightMaterial,
            toggleFocusMode,
            setExplodeSpacing,
            toggleExplode,
            toggleDecorEntities: useCallback(()=>{
                setE((e)=>({
                        ...e,
                        showDecorEntities: !e.showDecorEntities
                    }));
            }, []),
            toggleCreatures: useCallback(()=>{
                setE((e)=>({
                        ...e,
                        showCreatures: !e.showCreatures
                    }));
            }, [])
        }
    };
}
export function n(e, t) {
    let n = e.mode === "preview" ? "layer" : e.mode;
    return {
        mode: n,
        currentIndex: e.mode === "preview" ? n === "layer" ? e.layerCount - 1 : e.stepCount - 1 : e.currentIndex,
        totalCount: n === "layer" ? e.layerCount : e.stepCount,
        onPrevious: t.previous,
        onNext: t.next,
        onReset: t.reset
    };
}
