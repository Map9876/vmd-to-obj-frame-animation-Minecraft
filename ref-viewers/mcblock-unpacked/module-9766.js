import "./module-28140.js";
import "./module-49417.js";
import "./module-86897.js";
import { ACTION_SERVER_PATCH } from "./module-86871.js";
import * as s from "./module-61426.js";
import l from "./module-47650.js";
import { GlobalLayoutRouterContext, LayoutRouterContext, TemplateContext } from "./module-46752.js";
import { fetchServerResponse } from "./module-32753.js";
import { unresolvedThenable } from "./module-48359.js";
import d from "./module-88785.js";
import { matchSegment } from "./module-7460.js";
import { disableSmoothScrollDuringRouteTransition } from "./module-84170.js";
import { RedirectBoundary } from "./module-10531.js";
import { HTTPAccessFallbackBoundary } from "./module-63886.js";
import { createRouterCacheKey } from "./module-69190.js";
import y from "./module-48915.js";
import { dispatchAppRouterAction } from "./module-76248.js";
import { useRouterBFCache } from "./module-39684.js";
import "./module-74061.js";
let l___DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
let R = [
    "bottom",
    "height",
    "left",
    "right",
    "top",
    "width",
    "x",
    "y"
];
function S(e, t) {
    let r = e.getBoundingClientRect();
    return r.top >= 0 && r.top <= t;
}
class P extends s.default.Component {
    componentDidMount() {
        this.handlePotentialScroll();
    }
    componentDidUpdate() {
        if (this.props.focusAndScrollRef.apply) {
            this.handlePotentialScroll();
        }
    }
    render() {
        return this.props.children;
    }
    constructor(...e){
        super(...e);
        this.handlePotentialScroll = ()=>{
            let { focusAndScrollRef, segmentPath } = this.props;
            if (focusAndScrollRef.apply) {
                if (focusAndScrollRef.segmentPaths.length !== 0 && !focusAndScrollRef.segmentPaths.some((e)=>segmentPath.every((t, r)=>matchSegment(t, e[r])))) {
                    return;
                }
                let r = null;
                let n = focusAndScrollRef.hashFragment;
                if (n) {
                    r = ((e)=>{
                        if (e === "top") {
                            return document.body;
                        }
                        return document.getElementById(e) ?? document.getElementsByName(e)[0];
                    })(n);
                }
                if (!r) {
                    r = l___DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.findDOMNode(this);
                }
                if (!(r instanceof Element)) {
                    return;
                }
                while(!(r instanceof HTMLElement) || ((e)=>{
                    if ([
                        "sticky",
                        "fixed"
                    ].includes(getComputedStyle(e).position)) {
                        return true;
                    }
                    let t = e.getBoundingClientRect();
                    return R.every((e)=>t[e] === 0);
                })(r)){
                    if (r.nextElementSibling === null) {
                        return;
                    }
                    r = r.nextElementSibling;
                }
                focusAndScrollRef.apply = false;
                focusAndScrollRef.hashFragment = null;
                focusAndScrollRef.segmentPaths = [];
                disableSmoothScrollDuringRouteTransition(()=>{
                    if (n) {
                        return void r.scrollIntoView();
                    }
                    let document_documentElement = document.documentElement;
                    let e_clientHeight = document_documentElement.clientHeight;
                    if (!S(r, e_clientHeight)) {
                        document_documentElement.scrollTop = 0;
                        if (!S(r, e_clientHeight)) {
                            r.scrollIntoView();
                        }
                    }
                }, {
                    dontForceLayout: true,
                    onlyHashChange: focusAndScrollRef.onlyHashChange
                });
                focusAndScrollRef.onlyHashChange = false;
                r.focus();
            }
        };
    }
}
function OComponent({ segmentPath, children }) {
    let n = s.useContext(GlobalLayoutRouterContext);
    if (!n) {
        throw Object.defineProperty(Error("invariant global layout router not mounted"), "__NEXT_ERROR_CODE", {
            value: "E473",
            enumerable: false,
            configurable: true
        });
    }
    return <P segmentPath={segmentPath} focusAndScrollRef={n.focusAndScrollRef}>{children}</P>;
}
function TComponent({ tree, segmentPath, cacheNode, url }) {
    let l = s.useContext(GlobalLayoutRouterContext);
    if (!l) {
        throw Object.defineProperty(Error("invariant global layout router not mounted"), "__NEXT_ERROR_CODE", {
            value: "E473",
            enumerable: false,
            configurable: true
        });
    }
    let { tree: tree_1 } = l;
    let h = cacheNode.prefetchRsc !== null ? cacheNode.prefetchRsc : cacheNode.rsc;
    let _ = s.useDeferredValue(cacheNode.rsc, h);
    let m = typeof _ === "object" && _ !== null && typeof _.then === "function" ? s.use(_) : _;
    if (!m) {
        let e = cacheNode.lazyData;
        if (e === null) {
            let flightRouterState = function e(t, tree_1_1) {
                if (t) {
                    let [n, a] = t;
                    let o = t.length === 2;
                    if (matchSegment(tree_1_1[0], n) && tree_1_1[1].hasOwnProperty(a)) {
                        if (o) {
                            let t = e(undefined, tree_1_1[1][a]);
                            return [
                                tree_1_1[0],
                                {
                                    ...tree_1_1[1],
                                    [a]: [
                                        t[0],
                                        t[1],
                                        t[2],
                                        "refetch"
                                    ]
                                }
                            ];
                        }
                        return [
                            tree_1_1[0],
                            {
                                ...tree_1_1[1],
                                [a]: e(t.slice(2), tree_1_1[1][a])
                            }
                        ];
                    }
                }
                return tree_1_1;
            }([
                "",
                ...segmentPath
            ], tree_1);
            let o = y.hasInterceptionRouteInCurrentTree(tree_1);
            let navigatedAt = Date.now();
            cacheNode.lazyData = e = fetchServerResponse(new URL(url, location.origin), {
                flightRouterState,
                nextUrl: o ? l.nextUrl : null
            }).then((serverResponse)=>{
                s.startTransition(()=>{
                    dispatchAppRouterAction({
                        type: ACTION_SERVER_PATCH,
                        previousTree: tree_1,
                        serverResponse,
                        navigatedAt
                    });
                });
                return serverResponse;
            });
            s.use(e);
        }
        s.use(unresolvedThenable);
    }
    return <LayoutRouterContext.Provider value={{
        parentTree: tree,
        parentCacheNode: cacheNode,
        parentSegmentPath: segmentPath,
        url
    }}>{m}</LayoutRouterContext.Provider>;
}
function JComponent({ loading, children }) {
    let t;
    if (t = typeof loading === "object" && loading !== null && typeof loading.then === "function" ? s.use(loading) : loading) {
        let e = t[0];
        let r = t[1];
        let a = t[2];
        return <s.Suspense fallback=<>{r}{a}{e}</>>{children}</s.Suspense>;
    }
    return <>{children}</>;
}
function WComponent({ parallelRouterKey, error, errorStyles, errorScripts, templateStyles, templateScripts, template, notFound, forbidden, unauthorized, segmentViewBoundaries }) {
    let v = s.useContext(LayoutRouterContext);
    if (!v) {
        throw Object.defineProperty(Error("invariant expected layout router to be mounted"), "__NEXT_ERROR_CODE", {
            value: "E56",
            enumerable: false,
            configurable: true
        });
    }
    let { parentTree, parentCacheNode, parentSegmentPath, url } = v;
    let parentCacheNode_parallelRoutes = parentCacheNode.parallelRoutes;
    let x = parentCacheNode_parallelRoutes.get(parallelRouterKey);
    if (!x) {
        x = new Map;
        parentCacheNode_parallelRoutes.set(parallelRouterKey, x);
    }
    let A = parentTree[0];
    let segmentPath = parentSegmentPath === null ? [
        parallelRouterKey
    ] : parentSegmentPath.concat([
        A,
        parallelRouterKey
    ]);
    let M = parentTree[1][parallelRouterKey];
    let N = M[0];
    let k = createRouterCacheKey(N, true);
    let I = useRouterBFCache(M, k);
    let D = [];
    do {
        let tree = I.tree;
        let key = I.stateKey;
        let s = tree[0];
        let y = createRouterCacheKey(s);
        let cacheNode = x.get(y);
        if (cacheNode === undefined) {
            let e = {
                lazyData: null,
                rsc: null,
                prefetchRsc: null,
                head: null,
                prefetchHead: null,
                parallelRoutes: new Map,
                loading: null,
                navigatedAt: -1
            };
            cacheNode = e;
            x.set(y, e);
        }
        let loading = parentCacheNode.loading;
        let E = <TemplateContext.Provider key={key} value=<OComponent segmentPath={segmentPath}><d.ErrorBoundary errorComponent={error} errorStyles={errorStyles} errorScripts={errorScripts}><JComponent loading={loading}><HTTPAccessFallbackBoundary notFound={notFound} forbidden={forbidden} unauthorized={unauthorized}><RedirectBoundary><TComponent url={url} tree={tree} cacheNode={cacheNode} segmentPath={segmentPath}/></RedirectBoundary></HTTPAccessFallbackBoundary></JComponent></d.ErrorBoundary></OComponent>>{templateStyles}{templateScripts}{template}</TemplateContext.Provider>;
        D.push(E);
        I = I.next;
    }while (I !== null)
    return D;
}
export { WComponent as default };
if ((typeof WComponent === "function" || typeof WComponent === "object" && WComponent !== null) && WComponent.__esModule === undefined) {
    Object.defineProperty(WComponent, "__esModule", {
        value: true
    });
    WComponent.default = WComponent;
}
