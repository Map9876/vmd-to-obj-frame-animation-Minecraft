import { d, f, p as P1 } from "./guide-blocks-DaPMtvxC/chunk_d.js";
import { j } from "./guide-blocks-DaPMtvxC/chunk_O.js";
import { n, s, t } from "./jsx-runtime-Db0DjQYK.js";
import { t as t_2 } from "./utils-B6KiDbIe.js";
import { t as I1 } from "./copy-Cb6l5SEl.js";
import { Nt, mr as O, or, rr } from "./index-DmN1rqCo.js";
import { n as n_2, t as t_3 } from "./demo-media-DQv-_HFj.js";
const m = {
    os: [
        `windows`,
        `macos`,
        `linux`
    ],
    launcher: [
        `official`,
        `modrinth`,
        `curseforge`,
        `prism`
    ],
    platform: [
        `windows`,
        `android`,
        `ios`,
        `console`
    ]
};
const h = {
    os: `windows`,
    launcher: `official`,
    platform: `windows`
};
const g = `shulkr.guides.env`;
function _() {
    if (typeof navigator > `u`) {
        return {};
    }
    let navigator_userAgent = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(navigator_userAgent)) {
        return {
            platform: `ios`
        };
    }
    if (/Android/.test(navigator_userAgent)) {
        return {
            platform: `android`
        };
    }
    if (/Mac/.test(navigator_userAgent)) {
        return {
            os: `macos`
        };
    }
    if (/Linux|CrOS/.test(navigator_userAgent)) {
        return {
            os: `linux`
        };
    }
    if (/Windows/.test(navigator_userAgent)) {
        return {
            os: `windows`,
            platform: `windows`
        };
    }
    return {};
}
function v() {
    try {
        let e = window.localStorage.getItem(g);
        if (!e) {
            return {};
        }
        let t = JSON.parse(e);
        let n = {};
        for (let e of Object.keys(m)){
            let r = t[e];
            if (r && m[e].includes(r)) {
                Object.assign(n, {
                    [e]: r
                });
            }
        }
        return n;
    } catch  {
        return {};
    }
}
function y(e) {
    try {
        window.localStorage.setItem(g, JSON.stringify(e));
    } catch  {}
}
function b(e) {
    return {
        "data-env-os": e.os,
        "data-env-launcher": e.launcher,
        "data-env-platform": e.platform
    };
}
function x(when) {
    if (!when) {
        return {};
    }
    let t = {};
    for (let n of Object.keys(when)){
        let r = when[n];
        if (r?.length) {
            t[`data-only-${n}`] = r.join(` `);
        }
    }
    return t;
}
const S = Object.keys(m).flatMap((e)=>m[e].map((t)=>`[data-env-${e}="${t}"] [data-only-${e}]:not([data-only-${e}~="${t}"]){display:none!important}`)).join(``);
const CContext = d.createContext(null);
export function i({ children, className }) {
    let [n, setN] = d.useState(h);
    d.useEffect(()=>{
        setN({
            ...h,
            ..._(),
            ...v()
        });
    }, []);
    return <CContext.Provider value={{
        env: n,
        set: (e)=>{
            setN((t)=>{
                let n = {
                    ...t,
                    ...e
                };
                y(n);
                return n;
            });
        }
    }}><style>{S}</style><div {...b(n)} className={className}>{children}</div></CContext.Provider>;
}
function useT() {
    let e = d.useContext(CContext);
    if (!e) {
        throw Error(`useGuideEnv outside GuideEnvRoot`);
    }
    return e;
}
function E({ when, children, as = `div`, className }) {
    if (when) {
        return f.jsx(as, {
            ...x(when),
            className,
            children
        });
    }
    return f.jsx(as, {
        className,
        children
    });
}
function DComponent({ axes, chrome }) {
    let { env, set } = useT();
    return <div className={`sticky top-[var(--site-header-h,57px)] z-20 -mx-4 border-y border-border bg-background/95 px-4 py-2.5 backdrop-blur sm:mx-0 sm:border sm:px-3`}><div className={`flex flex-wrap items-center gap-x-4 gap-y-2`}><span className={`text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground`}>{chrome.showingFor}</span>{axes.map((e)=><fieldset key={e} className={`flex min-w-0 flex-wrap items-center gap-1`}><legend className={`sr-only`}>{chrome.axisLabel[e]}</legend>{m[e].map((a)=>{
            let o = env[e] === a;
            let s = chrome[e][a];
            return <button key={a} type={`button`} aria-pressed={o} onClick={()=>set({
                    [e]: a
                })} className={t_2(`h-8 border px-2.5 text-[12px] font-medium transition-colors`, o ? `border-accent-foreground/40 bg-accent text-accent-foreground` : `border-border bg-card text-foreground-secondary hover:border-ring`)}>{s}</button>;
        })}</fieldset>)}</div></div>;
}
function MComponent({ children, className }) {
    return <Nt className={t_2(`text-[14px] leading-[1.7]`, className)}>{children}</Nt>;
}
function NComponent({ text, chrome }) {
    let [n, setN] = d.useState(false);
    return <button type={`button`} onClick={()=>{
        navigator.clipboard?.writeText(text).then(()=>{
            setN(true);
            setTimeout(()=>setN(false), 1500);
        });
    }} className={`inline-flex shrink-0 items-center gap-1 self-start border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground-secondary hover:border-ring`} aria-label={n ? chrome.copied : chrome.copy}>{n ? <O className={`size-3.5`}/> : <I1 className={`size-3.5`}/>}{n ? chrome.copied : chrome.copy}</button>;
}
function PComponent({ text, chrome }) {
    return <div className={`flex items-start gap-2 border border-border bg-muted/50 p-2.5`}><pre className={`min-w-0 flex-1 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-foreground`}><code>{text}</code></pre><NComponent text={text} chrome={chrome}/></div>;
}
function FComponent({ path, suffix, chrome }) {
    return <>{m.launcher.map((r)=>m.os.map((i)=>{
            let text = j(path, i, r, suffix);
            return <E key={`${r}-${i}`} when={{
                os: [
                    i
                ],
                launcher: [
                    r
                ]
            }}>{text ? <PComponent text={text} chrome={chrome}/> : <MComponent>{chrome.noFixedPath}</MComponent>}</E>;
        }))}</>;
}
function IComponent({ tone, md }) {
    let n = tone === `tip` ? or : rr;
    return <div className={t_2(`flex gap-2.5 border px-3 py-2.5`, tone === `tip` ? `border-border bg-muted/40` : `border-amber-500/40 bg-amber-500/10`)}>{f.jsx(n, {
        className: t_2(`mt-1 size-4 shrink-0`, tone === `tip` ? `text-muted-foreground` : `text-amber-600 dark:text-amber-400`),
        "aria-hidden": true
    })}<MComponent className={`min-w-0 flex-1`}>{md}</MComponent></div>;
}
function LComponent({ lines }) {
    return <pre className={`overflow-x-auto border border-border bg-card px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-foreground-secondary`}>{lines.join(`
`)}</pre>;
}
function RComponent({ media, chrome }) {
    if (media.src) {
        return <figure><img src={media.src} alt={media.alt} loading={`lazy`} decoding={`async`} className={`w-full border border-border`}/></figure>;
    }
    return null;
}
function ZComponent({ block, chrome }) {
    let n = (()=>{
        switch(block.type){
            case `text`:
                return <MComponent>{block.md}</MComponent>;
            case `path`:
                return <FComponent path={block.path} suffix={block.suffix} chrome={chrome}/>;
            case `command`:
                return <PComponent text={block.code} chrome={chrome}/>;
            case `tip`:
            case `warning`:
                return <IComponent tone={block.type} md={block.md}/>;
            case `tree`:
                return <LComponent lines={block.lines}/>;
            case `media`:
                return <RComponent media={block.media} chrome={chrome}/>;
            case `buildModeDemo`:
                return <P1 label={chrome.buildModeDemo} surface={`guide`}/>;
        }
    })();
    return <E when={block.when} className={`mt-3 first:mt-0`}>{n}</E>;
}
export { E as a, MComponent as n, P1 as o, DComponent as r, ZComponent as t };
