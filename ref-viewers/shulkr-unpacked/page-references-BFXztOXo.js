import { Fn, Gt, Nn, Pn, Q, Rn, Vt, X, Xn, Y, Yn, Z, ar as surface, en, fr as Fr, ir as Ir, mr, nn, nr, pr, rn, rr as Rr, tn, tr } from "./page-references-BFXztOXo/chunk___vite__mapDeps.js";
import { R, kt as Kt } from "./page-references-BFXztOXo/chunk_kt.js";
import { Dn, En, Mn, On, fn as Fn1, xn } from "./page-references-BFXztOXo/chunk_fn.js";
import { n, s, t } from "./jsx-runtime-Db0DjQYK.js";
import { c as c_1, n as n_2, t as t_2 } from "./current-Bq9r6xhE.js";
import { t as O1 } from "./ClientOnly-BiCdmN1s.js";
import { t as S1 } from "./link-C5CNVKC3.js";
import { c, f as f_1 } from "./keys-CMeqocw_.js";
import { c as c_2, g, m, n as n_3, o as o_1, r, t as t_3 } from "./session-BGIR8kU0.js";
import { t as t_4 } from "./useNavigate-5hivG_iR.js";
import { i as i_1, n as n_4 } from "./react-LvWBhTF7.js";
import { B, R as R_1, j, m as m_2, n as n_5, t as t_5, x } from "./browser-I-D20JeN.js";
import { L as L_1, T } from "./dist-C5TDMOul.js";
import { t as t_6 } from "./utils-B6KiDbIe.js";
import { t as t_7 } from "./createLucideIcon-BB7uFOth.js";
import { t as t_8 } from "./blocks-BAw4PJ9b.js";
import { t as E } from "./box-DpWO1Dds.js";
import { t as Oe1 } from "./copy-Cb6l5SEl.js";
import { t as Se1 } from "./hammer-CE-GXFeU.js";
import { t as Ce1 } from "./heart-Da-1zYQ4.js";
import { t as Le1 } from "./link-2-DBm7yD3x.js";
import { t as Ue1 } from "./lock-DY-nPLss.js";
import { t as De1 } from "./mail-DzuWh0IN.js";
import { t as Fe1 } from "./pencil-ruler-ndmIqfrF.js";
import { t as Pe1 } from "./play-DPEFnGPk.js";
import { n as n_6 } from "./catalog-card-Cn9CUBJ7.js";
import { t as t_9 } from "./search-BlPxHO6p.js";
import { t as Ge1 } from "./server-D7Yxzr-j.js";
import { a as _e, i as i_2, n as n_7, r as r_2, t as t_10 } from "./query-pI4UeOiZ.js";
import { a as Se, i as Ce, n as We1, o as Te, t as t_11 } from "./identity-DKkH2Mq0.js";
import { t as t_12 } from "./preload-helper-zJ_50EbN.js";
import { c as c_3, d, f as f_2, l, u } from "./queries-DlYwNVUA.js";
import { $, Et, Ft, J, Lr, Lt, Pt, Q as Q_1, Qt, S, Xt, Yt, ar as Be, bn as Ve, cn as M, cr as He, dn as Ue, er as N, f as f_3, fn as Ge, fr, gr as Qe1, hr, jt as P, ln as Ye, mr as Xe, nr as Ze, or as Qe, p, pn as Et1, pr as Tt1, q, sn as Rt, un as It } from "./index-DmN1rqCo.js";
import { i as At, n as Ot1, o as St1, r as Ct1, s as Lt1, t as Ut } from "./dialog-ClhsnmFs.js";
import { n as Dt1, r as Ft1, t as Pt1 } from "./popover-Dkz5qr_F.js";
import { t as Mt } from "./user-name-Doik7BrP.js";
import { n as n_8 } from "./markdown-nXGeLLbi.js";
import { t as Gt1 } from "./switch-HfGl6Tzw.js";
import { t as t_13 } from "./textarea-CNdUQNni.js";
import { C, S as S_2, a as F, f as f_4, h, i as i_3, n as Ct, o as o_2, t as Tt } from "./parts-DB0m3djM.js";
import { n as n_9, t as t_14 } from "./cdn-image-1M_j1Bpf.js";
import { t as Dt } from "./shulkr-loader-BlIlXoJ4.js";
import { t as t_15 } from "./badge-uBGdfrIZ.js";
import { t as L } from "./label-C6-rizCR.js";
String.raw;
Gt.defaultProps = {
    transformTiming: {
        duration: 900,
        easing: `linear(0,.005,.019,.039,.066,.096,.129,.165,.202,.24,.278,.316,.354,.39,.426,.461,.494,.526,.557,.586,.614,.64,.665,.689,.711,.731,.751,.769,.786,.802,.817,.831,.844,.856,.867,.877,.887,.896,.904,.912,.919,.925,.931,.937,.942,.947,.951,.955,.959,.962,.965,.968,.971,.973,.976,.978,.98,.981,.983,.984,.986,.987,.988,.989,.99,.991,.992,.992,.993,.994,.994,.995,.995,.996,.996,.9963,.9967,.9969,.9972,.9975,.9977,.9979,.9981,.9982,.9984,.9985,.9987,.9988,.9989,1)`
    },
    spinTiming: undefined,
    opacityTiming: {
        duration: 450,
        easing: `ease-out`
    },
    animated: true,
    trend: (e, t)=>Math.sign(t - e),
    respectMotionPreference: true,
    plugins: undefined,
    digits: undefined
};
rn.observedAttributes = tn ? [] : nn;
Vt(`number-flow-react`, rn);
en(`-react`);
function In(e) {
    if (e.authorHandle) {
        return new URL(c_1(`/users/${e.authorHandle}`, e.locale), e.siteUrl).toString();
    }
    return null;
}
function Ln(e) {
    let t = In(e);
    let n = e.authorName && t ? ` by <a href="${X(t)}">${X(e.authorName)}</a>` : ``;
    return `<p><a href="${X(Z(e))}">${X(e.title)}</a>${n} on <a href="${X(e.siteUrl)}">Shulkr</a></p>`;
}
function zn(e, t) {
    let n = t.width === `responsive` ? `100%` : String(t.width);
    let r = t.width === `responsive` ? ` style="width:100%;max-width:100%;border:0"` : ` style="border:0"`;
    return `<iframe src="${X(Q(e, t))}" width="${n}" height="${t.height}"${r} title="${X(Rn(e))}" loading="lazy" allowfullscreen></iframe>`;
}
function Bn(e, t) {
    let n = zn(e, t);
    if (t.attribution) {
        return `${n}
${Ln(e)}`;
    }
    return n;
}
function Vn(e, t) {
    let n = `<div style="position:relative;width:100%;aspect-ratio:${Pn}">
  <iframe src="${X(Q(e, t))}" style="position:absolute;inset:0;width:100%;height:100%;border:0" title="${X(Rn(e))}" loading="lazy" allowfullscreen></iframe>
</div>`;
    if (t.attribution) {
        return `${n}
${Ln(e)}`;
    }
    return n;
}
function Hn(e, t) {
    let n = t.width === `responsive` ? `"100%"` : `{${t.width}}`;
    let r = `<iframe
  src="${Q(e, t)}"
  width=${n}
  height={${t.height}}
  style={{ border: 0 }}
  title="${Rn(e).replace(/"/g, `'`)}"
  loading="lazy"
  allowFullScreen
/>`;
    if (!t.attribution) {
        return r;
    }
    let i = e.authorName && e.authorHandle ? ` by ${e.authorName}` : ``;
    return `${r}
<p>
  <a href="${Z(e)}">${e.title}</a>${i} on Shulkr
</p>`;
}
function Un(e, t) {
    let n = Z(e);
    let r = e.authorName ? ` by ${e.authorName}` : ``;
    if (t) {
        return `[![${e.title}](${t})](${n})

[${e.title}${r} - view in 3D on Shulkr](${n})`;
    }
    return `[${e.title}${r} - view in 3D on Shulkr](${n})`;
}
const Wn = [
    `responsive`,
    `html`,
    `react`,
    `markdown`,
    `link`
];
const platforms = `WordPress, Ghost, Discourse, Notion, Craft CMS`;
function KnComponent({ schematic, file, siteUrl, open, onOpenChange }) {
    let o = i_1(`Schematic.embed`);
    let s = i_1(`Schematic.share`);
    let c = t_2();
    let [l, setL] = R.useState(`responsive`);
    let [d, setD] = R.useState(Nn.theme);
    let [p, setP] = R.useState(Nn.height);
    let [h, setH] = R.useState(Nn.attribution);
    let [g, setG] = R.useState(false);
    let [y, setY] = R.useState(false);
    let b = R.useMemo(()=>({
            siteUrl,
            locale: c,
            id: schematic.id,
            slug: schematic.slug,
            title: schematic.title,
            authorName: schematic.owner.isGuest ? null : schematic.owner.name,
            authorHandle: schematic.owner.isGuest ? null : schematic.owner.handle,
            fileId: g ? file.id : undefined
        }), [
        siteUrl,
        c,
        schematic,
        file.id,
        g
    ]);
    let x = R.useMemo(()=>({
            theme: d,
            width: l === `html` ? 720 : `responsive`,
            height: p,
            attribution: h
        }), [
        d,
        l,
        p,
        h
    ]);
    let S = R.useMemo(()=>{
        switch(l){
            case `html`:
                return Bn(b, x);
            case `responsive`:
                return Vn(b, x);
            case `react`:
                return Hn(b, x);
            case `markdown`:
                return Un(b, schematic.cover?.imageUrl ?? null);
            case `link`:
                return Z(b);
        }
    }, [
        l,
        b,
        x,
        schematic.cover?.imageUrl
    ]);
    let ne = async ()=>{
        try {
            await navigator.clipboard.writeText(S);
        } catch  {}
        setY(true);
        Lt(`embed_snippet_copied`, {
            schematic_id: schematic.id,
            flavor: l,
            theme: d
        });
        setTimeout(()=>setY(false), 1600);
    };
    let C = l === `responsive` || l === `html` || l === `react`;
    let re = l === `html` || l === `react`;
    let w = Q(b, x);
    return <Ut open={open} onOpenChange={onOpenChange}><Ct1 className={`max-h-[88vh] overflow-y-auto rounded-none sm:max-w-2xl`}><St1><Lt1>{o(`heading`)}</Lt1><At>{o(`description`)}</At></St1>{schematic.visibility === `private` ? <div className={`flex items-start gap-2.5 border border-input bg-muted/50 p-3 text-[13px] leading-relaxed`}><Ue1 className={`mt-0.5 size-4 shrink-0 text-muted-foreground`} aria-hidden/><span>{o(`privateNotice`)}</span></div> : <><div className={`border border-input`}><iframe key={w} src={w} title={o(`previewTitle`, {
        title: schematic.title
    })} className={`block aspect-[16/10] w-full border-0`}/></div>{schematic.visibility === `unlisted` && <div className={`flex items-start gap-2.5 border border-input bg-muted/50 p-3 text-[12.5px] text-foreground-secondary leading-relaxed`}><Qe className={`mt-0.5 size-3.5 shrink-0 text-muted-foreground`} aria-hidden/><span>{o(`unlistedNotice`)}</span></div>}<We1 value={l} onValueChange={(e)=>setL(e)} className={`gap-2.5`}><Ce variant={`line`} className={`flex-wrap`}>{Wn.map((e)=><Se key={e} value={e}>{o(`tab.${e}`)}</Se>)}</Ce></We1><p className={`-mt-1 text-[12px] text-muted-foreground leading-relaxed`}>{l === `link` ? o(`hint.link`, {
        platforms
    }) : o(`hint.${l}`)}</p>{C && <><div className={`grid gap-3 sm:grid-cols-2`}><div className={`flex flex-col gap-1.5`}><L htmlFor={`embed-theme`}>{o(`theme`)}</L><Rt id={`embed-theme`} className={`w-full`} value={d} onChange={(e)=>setD(e.target.value)}><M value={`auto`}>{o(`themeAuto`)}</M><M value={`light`}>{o(`themeLight`)}</M><M value={`dark`}>{o(`themeDark`)}</M></Rt></div>{re && <div className={`flex flex-col gap-1.5`}><L htmlFor={`embed-height`}>{o(`height`)}</L><Rt id={`embed-height`} className={`w-full`} value={String(p)} onChange={(e)=>setP(Number(e.target.value))}>{Fn.map((e)=><M key={e} value={String(e)}>{o(`heightValue`, {
            px: e
        })}</M>)}</Rt></div>}</div><div className={`flex items-start justify-between gap-4`}><L htmlFor={`embed-credit`} className={`flex flex-col items-start gap-0.5`}><span className={`font-medium text-[13px] text-foreground`}>{o(`credit`)}</span><span className={`font-normal text-[12px] text-muted-foreground`}>{o(`creditHint`)}</span></L><Gt1 id={`embed-credit`} checked={h} onCheckedChange={setH} className={`mt-1`}/></div></>}{schematic.files.length > 1 && <div className={`flex items-start justify-between gap-4`}><L htmlFor={`embed-pin`} className={`flex flex-col items-start gap-0.5`}><span className={`font-medium text-[13px] text-foreground`}>{o(`pin`, {
        name: file.name
    })}</span><span className={`font-normal text-[12px] text-muted-foreground`}>{o(`pinHint`)}</span></L><Gt1 id={`embed-pin`} checked={g} onCheckedChange={setG} className={`mt-1`}/></div>}<div className={`relative`}><pre className={`max-h-44 overflow-auto whitespace-pre-wrap break-all border border-input bg-muted/60 p-3 pr-24 font-mono text-[11.5px] leading-relaxed`}>{S}</pre><N size={`sm`} variant={y ? `default` : `outline`} className={`absolute top-2 right-2`} onClick={ne}>{y ? <Xe aria-hidden/> : <Oe1 aria-hidden/>}{s(y ? `copied` : `copy`)}</N></div></>}</Ct1></Ut>;
}
function Qn1Component({ schematic, file, siteUrl }) {
    let r = i_1(`Schematic.embed`);
    let [i, setI] = R.useState(false);
    return <><N variant={`outline`} size={`icon-xl`} aria-label={r(`trigger`)} onClick={()=>setI(true)}><Kt/></N><KnComponent schematic={schematic} file={file} siteUrl={siteUrl} open={i} onOpenChange={setI}/></>;
}
function JnComponent({ schematic, className, size }) {
    let r = i_1(`Schematic.engagement`);
    let i = f_1();
    let a = i_2(r(`signInToLike`));
    let o = t_10(`liked`, schematic.id);
    let s = r_2();
    let [c, setC] = R.useState(null);
    let f = c ?? o;
    let { likeCount } = u(schematic);
    let queryKey = l(schematic.id);
    let { mutate, isPending } = g({
        mutationFn: (t)=>j(schematic.id, t),
        onMutate: async (t)=>{
            await i.cancelQueries({
                queryKey
            });
            let previous = i.getQueryData(queryKey);
            setC(t);
            c_3(i, schematic.id, `likeCount`, t ? 1 : -1);
            return {
                previous
            };
        },
        onSuccess: (t)=>{
            s(`liked`, schematic.id, t.liked);
            i.setQueryData(queryKey, (e)=>e && {
                    ...e,
                    likeCount: t.likeCount
                });
        },
        onError: (e, t, n)=>{
            if (n?.previous) {
                i.setQueryData(queryKey, n.previous);
            }
            a(e);
        },
        onSettled: ()=>setC(null)
    });
    return <N variant={`outline`} size={size} className={t_6(f && `border-destructive/40 bg-destructive/5 hover:bg-destructive/10`, className)} aria-pressed={f} aria-label={r(f ? `unlike` : `like`)} disabled={isPending} onClick={()=>mutate(!f)}><Ce1 className={t_6(f && `fill-destructive stroke-destructive`)}/><Fn1 id={schematic.id} value={likeCount}/></N>;
}
function ZnComponent({ className }) {
    let t = i_1(`Schematic.download`);
    let n = i_1(`Build`);
    let { granted, known } = c_2(`build_mode`);
    let a = o_1();
    let [o, setO] = R.useState(false);
    let [l, setL] = R.useState(false);
    return <><Ye onOpenChange={(e)=>{
        if (e && !granted) {
            Yn();
        }
    }}><Ve render=<N variant={`outline`} size={`icon-xl`} aria-label={t(`moreWays`)} className={className}><Tt1 className={`transition-transform group-aria-expanded/button:rotate-180`}/></N>/><It align={`end`} className={`w-[max(300px,var(--anchor-width))] rounded-none`}><Ge className={`gap-3 py-2`} render=<S1 from={`/$locale/schematics/$id/{-$slug}`} to={`.`} search={(e)=>({
            ...e,
            [p]: `3d`,
            [f_3]: `survival`
        })} resetScroll={false} onClick={(e)=>{
        Lt(`build_mode_requested`, {
            surface: `schematic_menu`,
            entitled: granted
        });
        if (!(!known || granted || a)) {
            e.preventDefault();
            setL(true);
            setO(true);
        }
    }}/>><Se1/><span className={`flex min-w-0 flex-col leading-snug`}><span className={`truncate font-medium`}>{n(`enter`)}</span><span className={`text-[11px] text-muted-foreground`}>{t(`buildHint`)}</span></span></Ge><div className={`flex items-center gap-3 px-2 py-2 opacity-60`}><Fe1 className={`size-4 shrink-0 text-muted-foreground`} aria-hidden/><span className={`flex min-w-0 flex-col leading-snug`}><span className={`truncate text-sm font-medium text-muted-foreground`}>{t(`openEditor`)}</span><span className={`text-[11px] text-muted-foreground`}>{t(`soon`)}</span></span></div></It></Ye>{l && <R.Suspense fallback={null}><Xn open={o} onOpenChange={setO} surface={`schematic_menu`}/></R.Suspense>}</>;
}
function QnComponent() {
    return <svg viewBox={`0 0 16 16`} className={`size-4`} fill={`currentColor`} aria-hidden={`true`}><path d={`M9.3 7l4.3-5h-1.4L8.7 6.1 5.9 2H2.5l4.5 6.5L2.5 14h1.4l3.7-4.3L10.5 14h3.4L9.3 7Zm-1.3 1.5l-.4-.6L4 3h1.3l2.8 4 .4.6 3.6 5.1H10.8L8 8.5Z`}/></svg>;
}
function NComponent() {
    return <svg viewBox={`0 0 16 16`} className={`size-4`} fill={`currentColor`} aria-hidden={`true`}><path d={`M14 8a1.5 1.5 0 0 0-2.5-1.1c-1-.7-2.3-1.1-3.7-1.1l.7-3.1 2.2.5a1.1 1.1 0 1 0 .2-.9l-2.5-.5a.3.3 0 0 0-.4.2L7.3 5.8c-1.5 0-2.9.4-3.9 1.1A1.5 1.5 0 1 0 2 8.6c0 .2 0 .3.1.4a3 3 0 0 0-.1.8c0 2.1 2.5 3.8 5.5 3.8s5.5-1.7 5.5-3.8c0-.3 0-.5-.1-.8.6-.3 1.1-.7 1.1-1ZM5.3 9c0-.6.5-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1Zm5.3 2.6c-.7.7-2 .7-2.6.7s-1.9 0-2.6-.7a.3.3 0 0 1 .4-.4c.5.4 1.4.5 2.2.5s1.7-.1 2.2-.5a.3.3 0 0 1 .4.4Zm-.3-1.6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.5 1-1 1Z`}/></svg>;
}
function Er1Component({ shareUrl, title, children }) {
    let r = i_1(`Schematic.share`);
    let [i, setI] = R.useState(false);
    let o = async ()=>{
        try {
            await navigator.clipboard.writeText(shareUrl);
        } catch  {}
        setI(true);
        setTimeout(()=>setI(false), 1600);
    };
    let s = encodeURIComponent(shareUrl);
    let c = encodeURIComponent(r(`intent`, {
        title
    }));
    let l = [
        {
            name: `X`,
            icon: <QnComponent/>,
            background: `#000000`,
            href: `https://twitter.com/intent/tweet?url=${s}&text=${c}`
        },
        {
            name: `Reddit`,
            icon: <NComponent/>,
            background: `#FF4500`,
            href: `https://www.reddit.com/submit?url=${s}&title=${c}`
        },
        {
            name: `Email`,
            icon: <De1 className={`size-4`}/>,
            background: `#5d7d22`,
            href: `mailto:?subject=${c}&body=${s}`
        }
    ];
    return <Pt1><Ft1 render={children}/><Dt1 align={`end`} sideOffset={8} className={`flex w-[min(340px,calc(100vw-2rem))] flex-col gap-4 rounded-none border-input p-4`}><div className={`font-heading text-base font-semibold`}>{r(`heading`)}</div><div><div className={`mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground`}>{r(`link`)}</div><div className={`flex border border-input bg-muted/60`}><span className={`flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 text-xs text-foreground-secondary`}><Le1 className={`size-3.5 shrink-0 text-muted-foreground`}/><span className={`truncate`}>{shareUrl.replace(/^https?:\/\//, ``)}</span></span><button type={`button`} className={t_6(`inline-flex shrink-0 items-center gap-1.5 border-l border-input bg-card px-4 text-xs font-semibold transition-colors hover:bg-muted`, i && `border-primary bg-primary text-primary-foreground hover:bg-primary`)} onClick={o}>{i ? <Xe className={`size-3.5`}/> : <Oe1 className={`size-3.5`}/>}{r(i ? `copied` : `copy`)}</button></div></div><div><div className={`mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground`}>{r(`shareTo`)}</div><div className={`grid grid-cols-3 gap-2`}>{l.map((e)=><N key={e.name} variant={`outline`} className={`h-auto flex-col gap-1.5 px-1.5 py-3`} nativeButton={false} render=<a href={e.href} target={`_blank`} rel={`noreferrer`}><span className={`grid size-8 place-items-center text-white`} style={{
            backgroundColor: e.background
        }}>{e.icon}</span><span className={`text-[10.5px] font-semibold text-foreground-secondary`}>{e.name}</span></a>/>)}</div></div></Dt1></Pt1>;
}
function OrComponent({ schematic, file }) {
    let n = i_1(`Schematic.download`);
    let r = Qt();
    let { granted, known } = c_2(`test_servers`);
    let activating = o_1();
    let { data } = h();
    let [c, setC] = R.useState(null);
    let [d, setD] = R.useState({
        start: 0,
        upsell: 0
    });
    let server = r && C(data) && data.schematicId === schematic.id && data.state !== `stopping` ? data : null;
    let fallback = <N variant={`outline`} size={`xl`} className={`w-full`} onPointerEnter={()=>{
        S([
            `TestServer`
        ]);
        if (r) {
            tr();
        } else {
            nr();
        }
    }} onClick={()=>{
        let e = S_2({
            granted,
            known,
            activating
        });
        Lt(`test_server_requested`, {
            surface,
            entitled: granted
        });
        let t = e === `upsell` ? `upsell` : `start`;
        setD((e)=>({
                ...e,
                [t]: e[t] + 1
            }));
        setC(t);
    }}><Ge1/>{` `}{n(`testServer`)}{!r && <span className={`ml-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7e4498] dark:text-[#b97fd2]`}>{`Plus`}</span>}</N>;
    return <>{server ? <F fallback={fallback}><Sr1Component server={server}/></F> : fallback}{d.upsell > 0 && <R.Suspense fallback={null}><F><Ir open={c === `upsell`} onOpenChange={(e)=>setC(e ? `upsell` : null)} surface={surface}/></F></R.Suspense>}{d.start > 0 && <R.Suspense fallback={null}><F><Rr key={d.start} open={c === `start`} onOpenChange={(e)=>setC(e ? `start` : null)} schematic={schematic} file={file} surface={surface}/></F></R.Suspense>}</>;
}
function Sr1Component({ server }) {
    let t = i_1(`TestServer`);
    let { copied, copy } = o_2(server, `button`);
    return <div className={t_6(`flex h-11 items-center gap-2 border pr-2 pl-3 text-[12.5px]`, i_3[server.state].strip)}><Ct state={server.state}/><span title={server.address} className={`min-w-0 flex-1 truncate font-semibold`}>{server.address}</span><Tt primary iconOnly copied={copied === `address`} onClick={()=>copy(`address`)} label={t(`copyAddress`)} className={`shrink-0 bg-card/70 dark:bg-card/40`}/><N variant={`outline`} size={`sm`} className={`h-7 shrink-0 rounded-none bg-transparent px-2.5 text-[12px] dark:bg-transparent`} onClick={()=>f_4.setPanelOpen(true)}>{t(`manage`)}</N></div>;
}
function CrComponent({ schematic, file, shareUrl, siteUrl }) {
    let i = i_1(`Schematic.download`);
    let a = i_1(`Edition`);
    let o = $(schematic.title);
    let c = J(file);
    let l = c.some((e)=>e.available);
    return <div className={`border border-input bg-card shadow-[0_1px_0_rgba(0,0,0,0.03)]`}><div className={`flex flex-col gap-3 p-4`}>{schematic.files.length > 1 && <div className={`flex flex-col gap-1`}><P>{i(`file`)}</P><p className={`break-words text-[13px] font-medium`}>{file.name}</p></div>}{l ? <Ye><Ve render=<N size={`xl`} className={`w-full`}><He/>{` `}{i(`cta`)}<Tt1 className={`transition-transform group-aria-expanded/button:rotate-180`}/></N>/><It align={`center`} className={`w-[max(320px,var(--anchor-width))] rounded-none`}><Ue><Et1><P>{i(`chooseFormat`)}</P></Et1>{c.map(({ format, available })=>{
        if (available) {
            return <Ge key={format} className={`gap-3 py-2`} render=<a href={q(schematic, file, format)}/>><He/><span className={`flex min-w-0 flex-col leading-snug`}><span className={`truncate font-medium`}>{o}{`.`}{format}</span><span className={`text-[11px] text-muted-foreground`}>{a(`qualified`, {
                edition: L_1(format)
            })}</span></span></Ge>;
        }
        return <UrComponent key={format} format={format}/>;
    })}</Ue></It></Ye> : <p className={`text-[13px] text-muted-foreground`}>{i(`noneAvailable`)}</p>}<div className={`flex items-center`}><N variant={`outline`} size={`xl`} className={`flex-1`} nativeButton={false} render=<S1 from={`/$locale/schematics/$id/{-$slug}`} to={`.`} search={(e)=>({
            ...e,
            [p]: `3d`
        })} resetScroll={false}><E/>{` `}{i(`openViewer`)}</S1>/><ZnComponent className={`relative border-l-0 focus-visible:z-10`}/></div><OrComponent schematic={schematic} file={file}/><div className={`flex items-center gap-2`}><JnComponent schematic={schematic} size={`xl`} className={`flex-1`}/><Mn schematic={schematic} size={`icon-xl`}/><Er1Component shareUrl={shareUrl} title={schematic.title}><N variant={`outline`} size={`icon-xl`} aria-label={i(`share`)}><_e/></N></Er1Component><Qn1Component schematic={schematic} file={file} siteUrl={siteUrl}/></div><Et guide={`hub`} className={`self-center font-normal text-muted-foreground hover:text-accent-foreground`}>{i(`howToUse`)}</Et></div><Lr1Component schematic={schematic}/></div>;
}
function Lr1Component({ schematic }) {
    let t = i_1(`Schematic.stats`);
    let n = u(schematic);
    return <dl className={`grid grid-cols-2 divide-x divide-border border-t border-border`}>{[
        {
            key: `downloads`,
            value: n.downloadCount
        },
        {
            key: `views`,
            value: n.viewCount
        }
    ].map(({ key, value })=><div key={key} className={`flex flex-col items-center gap-1 px-2 py-3`}><dd className={`text-[17px] font-semibold leading-none tabular-nums`}><Fn1 id={schematic.id} value={value}/></dd><dt className={`text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground`}>{t(key)}</dt></div>)}</dl>;
}
function UrComponent({ format }) {
    let t = i_1(`Schematic.download`);
    return <div className={`flex items-center gap-3 px-2 py-2 opacity-60`}><Qe1 className={`size-4 shrink-0 text-muted-foreground`} aria-hidden/><span className={`text-sm font-medium text-muted-foreground`}>{t(`tooLarge`, {
        format
    })}</span></div>;
}
function DrComponent({ schematic, file }) {
    let n = i_1(`Schematic.files`);
    let r = n_2();
    if (schematic.files.length <= 1) {
        return null;
    }
    return <div className={`no-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto pb-1`}>{schematic.files.map((i)=>{
        let a = i.id === file?.id;
        return <S1 key={i.id} to={`/$locale/schematics/$id/{-$slug}`} params={{
            locale: r,
            id: schematic.id,
            slug: schematic.slug
        }} search={(e)=>({
                ...e,
                file: i.isPrimary ? undefined : i.id
            })} activeOptions={{
            exact: true
        }} aria-current={a ? `page` : undefined} className={t_6(`inline-flex shrink-0 items-center gap-1.5 border px-3 py-1.5 text-[13px] font-medium transition-colors`, a ? `border-primary bg-primary text-primary-foreground` : `border-border bg-card hover:bg-muted`)}>{i.isPrimary && <Te className={t_6(`size-3 fill-current`, a ? `text-primary-foreground/90` : `text-muted-foreground`)} aria-label={n(`mainFile`)}/>}<span className={`max-w-72 truncate`} title={i.name}>{i.name}</span></S1>;
    })}</div>;
}
function HrComponent({ schematic, file }) {
    let n = i_1(`Schematic.gallery`);
    let file_images = file.images;
    let [i, setI] = R.useState(0);
    let [o, setO] = R.useState(false);
    let c = file_images[Math.min(i, file_images.length - 1)] ?? null;
    return <div className={`flex flex-col gap-2.5`}><div className={`relative -mx-3.5 grid aspect-[16/10] overflow-hidden sm:mx-0`} style={{
        background: pr
    }}>{o ? <><span className={`absolute left-2.5 top-2.5 z-[2] whitespace-nowrap bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-xs`}>{n(`interactive`)}</span><GrComponent schematic={schematic} file={file}/></> : c ? <><span className={`absolute left-2.5 top-2.5 z-[2] whitespace-nowrap bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-xs`}>{i + 1}{` / `}{file_images.length}{` · `}{c.label}</span><img key={c.name} src={t_14(c.url, 960)} srcSet={n_9(c.url)} sizes={`(max-width: 640px) 100vw, 640px`} alt={`${schematic.title} - ${c.label}`} fetchPriority={`high`} className={`relative z-[1] size-full object-contain p-2 sm:p-4`}/></> : <div className={`grid size-full place-items-center`}><div className={`flex flex-col items-center gap-1.5 text-center`}><E className={`size-8 text-foreground/30`} strokeWidth={1.5} aria-hidden/><span className={`text-[10px] uppercase tracking-[0.16em] text-foreground/40`}>{n(`unavailable`)}</span></div></div>}</div>{file_images.length > 0 && <div className={`no-scrollbar flex gap-2.5 overflow-x-auto px-3.5 py-1 sm:-mx-1 sm:px-1`}>{file_images.map((e, t)=><button key={e.name} type={`button`} title={e.label} aria-label={n(`viewAngle`, {
            label: e.label
        })} aria-current={t === i && !o} onClick={()=>{
            setI(t);
            setO(false);
        }} className={t_6(mr, `relative overflow-hidden transition`, t === i && !o ? `ring-2 ring-primary` : `opacity-75 hover:opacity-100`)} style={{
            background: pr
        }}><img src={t_14(e.url, 192)} alt={``} loading={`lazy`} className={`size-full object-contain p-1`}/></button>)}<button type={`button`} title={n(`interactive`)} aria-label={n(`view3d`)} aria-current={o} onClick={()=>setO(true)} className={t_6(mr, `relative grid place-items-center overflow-hidden transition`, o ? `ring-2 ring-primary` : `opacity-75 hover:opacity-100`)} style={{
        background: pr
    }}><span className={`text-lg font-bold tracking-[0.06em] text-foreground/70`}>{`3D`}</span></button></div>}</div>;
}
function GrComponent({ schematic, file }) {
    let n = i_1(`Schematic.gallery`);
    let [r, setR] = R.useState(false);
    let onSettled = R.useCallback(()=>setR(true), []);
    return <><O1 fallback={null}><R.Suspense fallback={null}><Fr schematicId={schematic.id} fileId={file.id} title={schematic.title} onSettled={onSettled} className={`relative z-[1] size-full`}/></R.Suspense></O1>{!r && <div className={`pointer-events-none absolute inset-0 z-[1] grid place-items-center`}><Dt variant={`layers`} size={48}/><span className={`sr-only`}>{n(`viewerLoading`)}</span></div>}</>;
}
const _r = `linear-gradient(180deg, var(--sky-tint) 0%, color-mix(in srgb, var(--sky-tint) 55%, var(--card)) 42%, color-mix(in srgb, var(--sky-tint) 22%, var(--card)) 100%)`;
function VrComponent() {
    let e = i_1(`Schematic.noFiles`);
    return <div className={`-mx-3.5 grid aspect-[16/10] place-items-center sm:mx-0`} style={{
        background: _r
    }}><div className={`flex max-w-64 flex-col items-center gap-1.5 px-4 text-center`}><E className={`size-8 text-foreground/30`} strokeWidth={1.5} aria-hidden/><span className={`text-[10px] uppercase tracking-[0.16em] text-foreground/50`}>{e(`title`)}</span><span className={`text-[12px] text-foreground/50`}>{e(`body`)}</span></div></div>;
}
function useYr({ id }) {
    R.useEffect(()=>{
        B(id);
    }, [
        id
    ]);
    return null;
}
function BrComponent({ schematic }) {
    let t = i_1(`Schematic.related`);
    let n = schematic.relatedWorks ?? [];
    if (n.length === 0) {
        return null;
    }
    return <section className={`border border-border bg-card pb-3`}><P as={`h2`} className={`block px-4 pt-4`}>{t(`heading`)}</P><div className={`mt-2.5 flex flex-col gap-2.5`}>{n.map((related)=><XrComponent key={related.id} related={related}/>)}</div></section>;
}
function XrComponent({ related }) {
    let t = i_1(`Schematic.related`);
    let n = i_1(`Chrome`);
    let r = n_2();
    let a = related.relation === `identical` ? `relationIdentical` : related.relation === `matches` ? `relationMatches` : related.relation === `contains` ? `relationContains` : `relationPartOf`;
    let related_ownerName = related.ownerName;
    return <S1 to={`/$locale/schematics/$id/{-$slug}`} params={{
        locale: r,
        id: related.id,
        slug: related.slug
    }} className={`group flex items-center gap-2.5 px-3`}><span className={`grid aspect-[16/10] w-[86px] shrink-0 place-items-center overflow-hidden`} style={{
        background: `linear-gradient(180deg, var(--sky-tint) 0%, color-mix(in srgb, var(--sky-tint) 40%, var(--card)) 100%)`
    }}>{related.imageUrl ? <img src={t_14(related.imageUrl, 192)} alt={n(`card.renderAlt`, {
        title: related.title
    })} loading={`lazy`} className={`size-full object-contain p-0.5`}/> : <E className={`size-4 text-foreground/25`} strokeWidth={1.5}/>}</span><span className={`flex min-w-0 flex-col gap-0.5`}><span className={`truncate font-heading text-[13px] font-semibold leading-tight transition-colors group-hover:text-accent-foreground`}>{related.title}</span>{related_ownerName && <span className={`flex min-w-0 items-baseline whitespace-pre text-[11px] text-muted-foreground`}>{t.rich(`by`, {
        name: ()=><Mt name={related_ownerName} badge={related.ownerBadge} truncate/>
    })}</span>}<span className={`truncate text-[10.5px] text-muted-foreground`}>{t(a)}</span></span></S1>;
}
function SrComponent({ schematic, file }) {
    let n = i_1(`Schematic.specs`);
    let r = i_1(`Size`);
    let i = i_1(`Edition`);
    let a = n_4();
    let file_dimensions = file.dimensions;
    let s = Q_1(file);
    let c = [];
    if (file_dimensions) {
        c.push({
            key: `dimensions`,
            label: n(`dimensions`),
            value: `${file_dimensions.x} × ${file_dimensions.y} × ${file_dimensions.z}`,
            sub: n(`dimensionsAxes`)
        });
    }
    if (file.blockCount !== null) {
        c.push({
            key: `blocks`,
            label: n(`totalBlocks`),
            value: a.number(file.blockCount),
            sub: file.paletteSize === null ? undefined : n(`paletteTypes`, {
                count: file.paletteSize
            })
        });
    }
    if (file.sizeTier) {
        c.push({
            key: `size`,
            label: n(`size`),
            value: r(`${file.sizeTier}.short`),
            sub: r(`${file.sizeTier}.name`)
        });
    }
    if (file.sourceVersion || s) {
        c.push({
            key: `savedIn`,
            label: n(`savedIn`),
            value: file.sourceVersion?.resolved ?? n(`savedInUnknown`),
            sub: s ? i(`qualified`, {
                edition: s
            }) : undefined
        });
    }
    let schematic_compatibility = schematic.compatibility;
    let u = s === `bedrock` ? [
        `bedrock`,
        `java`
    ] : T.options;
    let d = u.filter((e)=>schematic_compatibility[e]?.supported === true);
    let f = u.filter((e)=>schematic_compatibility[e]?.supported === false);
    if (d.length > 0 || f.length > 0) {
        let e = (e)=>{
            let t = schematic_compatibility[e];
            if (t?.min && t.max) {
                if (t.min === t.max) {
                    return t.min;
                }
                return n(`worksInRange`, {
                    min: t.min,
                    max: t.max
                });
            }
            if (t?.min) {
                return n(`worksInFrom`, {
                    min: t.min
                });
            }
            if (t?.max) {
                return n(`worksInUpTo`, {
                    max: t.max
                });
            }
            return n(`worksInAny`);
        };
        let editions = f.map((e)=>i(e)).join(`, `);
        let r = d.length === 1 ? d[0] : null;
        c.push({
            key: `worksIn`,
            label: n(`worksIn`),
            value: r ? e(r) : d.length > 0 ? d.map((t)=>n(`worksInQualified`, {
                    edition: i(t),
                    range: e(t)
                })).join(` · `) : n(`worksInNotOn`, {
                editions
            }),
            sub: d.length === 0 ? undefined : f.length > 0 ? n(`worksInNotOn`, {
                editions
            }) : r ? i(`qualified`, {
                edition: r
            }) : undefined
        });
    }
    if (file.namespaces.length > 0) {
        c.push({
            key: `mods`,
            label: n(`mods`),
            value: file.hasMods ? a.number(file.mods.length) : n(`noMods`),
            sub: file.hasMods ? file.mods.join(`, `) : n(`vanillaOnly`)
        });
    }
    c.push({
        key: `uploaded`,
        label: n(`uploaded`),
        value: <Pt value={schematic.createdAt} approxChars={12}/>
    });
    return <dl className={`flex flex-col`}>{c.map((e)=><div key={e.key} className={`flex items-baseline justify-between gap-3 border-b border-dashed border-border py-2.5 last:border-b-0 last:pb-0`}><dt className={`text-xs text-muted-foreground`}>{e.label}</dt><dd className={`text-right text-[13px] font-semibold`}>{e.value}{e.sub && <span className={`mt-0.5 block text-[11px] font-normal text-muted-foreground wrap-anywhere`}>{e.sub}</span>}</dd></div>)}</dl>;
}
function Cr({ schematic, showOriginal, onToggle }) {
    let r = i_1(`Schematic`);
    let a = n_2();
    if (schematic.translation) {
        return <p className={`mt-2 text-[12px] text-muted-foreground`}>{showOriginal ? r(`translation.showingOriginal`) : r(`translation.notice`, {
            language: wr(schematic.translation.sourceLocale, a)
        })}{` `}<button type={`button`} onClick={onToggle} className={`font-medium text-foreground underline underline-offset-2 hover:no-underline`}>{r(showOriginal ? `translation.viewTranslation` : `translation.viewOriginal`)}</button></p>;
    }
    return null;
}
function wr(sourceLocale, t) {
    try {
        return new Intl.DisplayNames([
            t
        ], {
            type: `language`
        }).of(sourceLocale) ?? sourceLocale;
    } catch  {
        return sourceLocale;
    }
}
function Component({ videoId, className }) {
    let [n, setN] = R.useState(`maxresdefault`);
    return <img src={`https://i.ytimg.com/vi/${videoId}/${n}.jpg`} onError={()=>setN(`hqdefault`)} alt={``} loading={`lazy`} className={t_6(`size-full object-cover`, className)}/>;
}
function TrComponent({ schematic, variant }) {
    let n = i_1(`Schematic.video`);
    let [r, setR] = R.useState(false);
    let [a, setA] = R.useState(false);
    let schematic_youtubeVideoId = schematic.youtubeVideoId;
    if (!schematic_youtubeVideoId) {
        return null;
    }
    let onOpenChange = (e)=>{
        setR(e);
        if (!e) {
            setA(false);
        }
    };
    let l = n(`watch`);
    return <>{variant === `card` ? <button type={`button`} onClick={()=>setR(true)} aria-label={l} className={`group relative block aspect-video w-full overflow-hidden border border-border bg-black text-left`}><Component videoId={schematic_youtubeVideoId} className={`opacity-90 transition group-hover:opacity-100`}/><span className={`absolute inset-0 grid place-items-center`}><span className={`grid size-11 place-items-center rounded-full bg-black/60 backdrop-blur-xs transition group-hover:scale-105 group-hover:bg-black/75`}><Pe1 className={`ml-0.5 size-5 fill-white text-white`} aria-hidden/></span></span><span className={`absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-xs`}>{n(`badge`)}</span></button> : <button type={`button`} onClick={()=>setR(true)} className={`flex w-full items-center gap-3 border border-border bg-card p-2 text-left`}><span className={`relative block h-14 w-24 shrink-0 overflow-hidden bg-black`}><Component videoId={schematic_youtubeVideoId}/><span className={`absolute inset-0 grid place-items-center`}><Pe1 className={`size-4 fill-white text-white drop-shadow`} aria-hidden/></span></span><span className={`min-w-0`}><span className={`block text-[13px] font-semibold`}>{l}</span><span className={`block text-[11.5px] text-muted-foreground`}>{n(`opensPlayer`)}</span></span></button>}<Ut open={r} onOpenChange={onOpenChange}><Ct1 className={`w-[min(1100px,calc(100%-2rem),calc((100dvh-8rem)*16/9))] max-w-none gap-0 border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-none`} showCloseButton={false}><div className={`flex items-center justify-between gap-3 pb-2`}><Lt1 className={`min-w-0 truncate text-[13px] font-medium text-white/85`}>{schematic.title}</Lt1><Ot1 aria-label={n(`close`)} className={`grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white backdrop-blur-xs transition hover:bg-white/20`}><Ze className={`size-4`}/></Ot1></div><div className={`relative aspect-video w-full overflow-hidden bg-black`}><Component videoId={schematic_youtubeVideoId} className={`absolute inset-0 opacity-50`}/>{!a && <span className={`absolute inset-0 grid place-items-center`}><Be className={`size-8 animate-spin text-white/80`} strokeWidth={1.5}/></span>}{r && <iframe src={`https://www.youtube-nocookie.com/embed/${schematic_youtubeVideoId}?autoplay=1&playsinline=1&rel=0`} title={n(`dialogTitle`, {
        title: schematic.title
    })} onLoad={()=>setA(true)} className={t_6(`absolute inset-0 size-full transition-opacity duration-200`, a ? `opacity-100` : `opacity-0`)} allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`} allowFullScreen referrerPolicy={`strict-origin-when-cross-origin`}/>}</div></Ct1></Ut></>;
}
function Er(e, blocks, n) {
    return {
        users: Object.fromEntries(e.references.users.map((e)=>[
                e.id,
                {
                    handle: e.handle,
                    name: e.name,
                    badge: e.badge
                }
            ])),
        schematics: Object.fromEntries(e.references.schematics.map((e)=>[
                e.id,
                {
                    slug: e.slug,
                    title: e.title
                }
            ])),
        blocks,
        siteOrigin: new URL(n).origin
    };
}
export { BrComponent as a, HrComponent as c, On as d, Dn as f, SrComponent as i, DrComponent as l, xn as m, TrComponent as n, useYr as o, En as p, Cr as r, VrComponent as s, Er as t, CrComponent as u };
