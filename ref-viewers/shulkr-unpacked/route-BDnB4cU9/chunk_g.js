import { n, s, t } from "../jsx-runtime-Db0DjQYK.js";
import { l, u } from "../current-Bq9r6xhE.js";
import { o, p } from "../useStore-DX_rDZVw.js";
import { d, f, s as s_2 } from "../ClientOnly-BiCdmN1s.js";
import { r, s as s_3 } from "../redirect-Coy-z-9D.js";
import { t as t_2 } from "../root-DLTE-HSj.js";
import { t as P } from "../link-C5CNVKC3.js";
import { t as t_3 } from "../useSearch-DY9YFgkc.js";
import { t as t_4 } from "../useNavigate-5hivG_iR.js";
class g {
    get to() {
        return this._to;
    }
    get id() {
        return this._id;
    }
    get path() {
        return this._path;
    }
    get fullPath() {
        return this._fullPath;
    }
    constructor(e){
        this.init = (e)=>{
            this.originalIndex = e.originalIndex;
            let options = this.options;
            let n = !options?.path && !options?.id;
            this.parentRoute = this.options.getParentRoute?.();
            if (n) {
                this._path = t_2;
            } else if (!this.parentRoute) {
                p();
            }
            let r = n ? t_2 : options?.path;
            if (r && r !== `/`) {
                r = d(r);
            }
            let i = options?.id || r;
            let a = n ? t_2 : s_2([
                this.parentRoute.id === `__root__` ? `` : this.parentRoute.id,
                i
            ]);
            if (r === `__root__`) {
                r = `/`;
            }
            if (a !== `__root__`) {
                a = s_2([
                    `/`,
                    a
                ]);
            }
            let u = a === `__root__` ? `/` : s_2([
                this.parentRoute.fullPath,
                r
            ]);
            this._path = r;
            this._id = a;
            this._fullPath = u;
            this._to = f(u);
        };
        this.addChildren = (e)=>this._addFileChildren(e);
        this._addFileChildren = (e)=>{
            if (Array.isArray(e)) {
                this.children = e;
            }
            if (typeof e == `object` && e) {
                this.children = Object.values(e);
            }
            return this;
        };
        this._addFileTypes = ()=>this;
        this.updateLoader = (e)=>{
            Object.assign(this.options, e);
            return this;
        };
        this.update = (e)=>{
            Object.assign(this.options, e);
            return this;
        };
        this.lazy = (e)=>{
            this.lazyFn = e;
            return this;
        };
        this.redirect = (e)=>r({
                from: this.fullPath,
                ...e
            });
        this.options = e || {};
        this.isRoot = !e?.getParentRoute;
        if (e?.id && e?.path) {
            throw Error(`Route cannot have both an 'id' and a 'path' option.`);
        }
    }
}
class _ {
    constructor({ id }){
        this.notFound = (e)=>s_3({
                routeId: this.id,
                ...e
            });
        this.redirect = (e)=>r({
                from: this.id,
                ...e
            });
        this.id = id;
    }
}
class v extends g {
    constructor(e){
        super(e);
    }
}
export function y(e) {
    return u({
        from: e.from,
        strict: e.strict,
        structuralSharing: e.structuralSharing,
        select: (t)=>{
            if (e.select) {
                return e.select(t.loaderData);
            }
            return t.loaderData;
        }
    });
}
function b({ select, ...rest }) {
    return u({
        ...rest,
        select: (e)=>{
            if (select) {
                return select(e.loaderDeps);
            }
            return e.loaderDeps;
        }
    });
}
function x(e) {
    return u({
        ...e,
        select: (t)=>{
            if (e.select) {
                return e.select(t.context);
            }
            return t.context;
        }
    });
}
const S = s(n(), 1);
const C = t();
export function w(id) {
    return new T({
        id
    });
}
var T = class extends _ {
    constructor({ id }){
        super({
            id
        });
        this.useMatch = (e)=>u({
                select: e?.select,
                from: this.id,
                structuralSharing: e?.structuralSharing
            });
        this.useRouteContext = (e)=>x({
                ...e,
                from: this.id
            });
        this.useSearch = (e)=>t_3({
                select: e?.select,
                structuralSharing: e?.structuralSharing,
                from: this.id
            });
        this.useParams = (e)=>l({
                select: e?.select,
                structuralSharing: e?.structuralSharing,
                from: this.id
            });
        this.useLoaderDeps = (e)=>b({
                ...e,
                from: this.id,
                strict: false
            });
        this.useLoaderData = (e)=>y({
                ...e,
                from: this.id,
                strict: false
            });
        this.useNavigate = ()=>t_4({
                from: o().routesById[this.id].fullPath
            });
        this.notFound = (e)=>s_3({
                routeId: this.id,
                ...e
            });
        this.Link = S.forwardRef((e, t)=>{
            let fullPath = o().routesById[this.id].fullPath;
            return <P ref={t} from={fullPath} {...e}/>;
        });
    }
};
class E extends g {
    constructor(e){
        super(e);
        this.useMatch = (e)=>u({
                select: e?.select,
                from: this.id,
                structuralSharing: e?.structuralSharing
            });
        this.useRouteContext = (e)=>x({
                ...e,
                from: this.id
            });
        this.useSearch = (e)=>t_3({
                select: e?.select,
                structuralSharing: e?.structuralSharing,
                from: this.id
            });
        this.useParams = (e)=>l({
                select: e?.select,
                structuralSharing: e?.structuralSharing,
                from: this.id
            });
        this.useLoaderDeps = (e)=>b({
                ...e,
                from: this.id
            });
        this.useLoaderData = (e)=>y({
                ...e,
                from: this.id
            });
        this.useNavigate = ()=>t_4({
                from: this.fullPath
            });
        this.Link = S.forwardRef((e, t)=><P ref={t} from={this.fullPath} {...e}/>);
    }
}
export function D(e) {
    return new E(e);
}
export function O() {
    return (e)=>A(e);
}
class k extends v {
    constructor(e){
        super(e);
        this.useMatch = (e)=>u({
                select: e?.select,
                from: this.id,
                structuralSharing: e?.structuralSharing
            });
        this.useRouteContext = (e)=>x({
                ...e,
                from: this.id
            });
        this.useSearch = (e)=>t_3({
                select: e?.select,
                structuralSharing: e?.structuralSharing,
                from: this.id
            });
        this.useParams = (e)=>l({
                select: e?.select,
                structuralSharing: e?.structuralSharing,
                from: this.id
            });
        this.useLoaderDeps = (e)=>b({
                ...e,
                from: this.id
            });
        this.useLoaderData = (e)=>y({
                ...e,
                from: this.id
            });
        this.useNavigate = ()=>t_4({
                from: this.fullPath
            });
        this.Link = S.forwardRef((e, t)=><P ref={t} from={this.fullPath} {...e}/>);
    }
}
function A(e) {
    return new k(e);
}
