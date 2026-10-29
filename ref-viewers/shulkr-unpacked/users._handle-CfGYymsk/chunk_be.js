import { n, s, t } from "../jsx-runtime-Db0DjQYK.js";
import { n as n_2 } from "../current-Bq9r6xhE.js";
import { o as o_1 } from "../useStore-DX_rDZVw.js";
import { t as A1 } from "../link-C5CNVKC3.js";
import { A as A_1, a, c } from "../keys-CMeqocw_.js";
import { d as d_1, h, m, u } from "../session-BGIR8kU0.js";
import { t as t_2 } from "../useSuspenseQuery-BRxKcF3h.js";
import { i as i_1, n as n_3 } from "../react-LvWBhTF7.js";
import { A as A_2, O as O_1, t as t_3 } from "../browser-I-D20JeN.js";
import { p as p_1 } from "../schemas-Y3Thg5L-.js";
import { b, x, y as y_1 } from "../dist-C5TDMOul.js";
import { t as t_4 } from "../utils-B6KiDbIe.js";
import { t as C } from "../box-DpWO1Dds.js";
import { t as W1 } from "../chevron-left-CJQcpBdr.js";
import { t as T } from "../heart-Da-1zYQ4.js";
import { t as icon_1 } from "../link-2-DBm7yD3x.js";
import { t as D } from "../lock-DY-nPLss.js";
import { t as O } from "../edition-picker-D8jy42NL.js";
import { t as K1 } from "../pencil-dgnv9mtn.js";
import { r as A, t as J1 } from "../catalog-card-Cn9CUBJ7.js";
import { a as M, n as n_4 } from "../query-pI4UeOiZ.js";
import { t as Ne1 } from "../upload-tAmOiBXn.js";
import { t as Re } from "../user-plus-DrmPyE4A.js";
import { t as Ie } from "../route-messages-9yrojIBL.js";
import { o as o_2 } from "../queries-DlYwNVUA.js";
import { Gt, Kt, N, Xt, Yt, cr as Le, er as F, fr as I, ir as Ue, mr as L, qt, sr as icon } from "../index-DmN1rqCo.js";
import { a as Fe, i as Z1, o as B, r as V, s as Pe, t as Me1 } from "../dialog-ClhsnmFs.js";
import { t as He } from "../user-name-Doik7BrP.js";
import { t as t_5 } from "../safe-href-CtVGEDi6.js";
import { t as H } from "../input-QawliBzd.js";
import { t as t_6 } from "../useForm-CnRUj5c6.js";
import { n as n_5, t as t_7 } from "../cdn-image-1M_j1Bpf.js";
import { a as U, r as W, t as G } from "../field-CHsueqT8.js";
const K = s(n(), 1);
const q = t();
const J = [
    {
        key: `youtube`,
        label: `YouTube`,
        placeholder: `https://youtube.com/@handle`
    },
    {
        key: `x`,
        label: `X`,
        placeholder: `https://x.com/handle`
    },
    {
        key: `discord`,
        label: `Discord`,
        placeholder: `https://discord.gg/invite`
    },
    {
        key: `twitch`,
        label: `Twitch`,
        placeholder: `https://twitch.tv/handle`
    },
    {
        key: `tiktok`,
        label: `TikTok`,
        placeholder: `https://tiktok.com/@handle`
    },
    {
        key: `instagram`,
        label: `Instagram`,
        placeholder: `https://instagram.com/handle`
    },
    {
        key: `github`,
        label: `GitHub`,
        placeholder: `https://github.com/handle`
    },
    {
        key: `website`,
        label: `Website`,
        placeholder: `https://example.com`
    }
];
function be(message) {
    return p_1().refine((e)=>{
        if (!e.trim()) {
            return true;
        }
        try {
            let t = new URL(e.trim());
            return t.protocol === `http:` || t.protocol === `https:`;
        } catch  {
            return false;
        }
    }, {
        message
    });
}
function XeComponent({ displayName, socials }) {
    let n = i_1(`Profile.edit`);
    let [open, setOpen] = K.useState(false);
    return <><F variant={`outline`} onClick={()=>setOpen(true)}><K1/>{` `}{n(`button`)}</F><SeComponent displayName={displayName} socials={socials} open={open} onOpenChange={setOpen}/></>;
}
function SeComponent({ displayName, socials, open, onOpenChange }) {
    let a = i_1(`Profile.edit`);
    let o = o_1();
    let [s, setS] = K.useState(null);
    let { data } = m();
    let f = h();
    let [p, setP] = K.useState(null);
    K.useEffect(()=>{
        if (open) {
            setP(data ? [
                ...data.user.editions
            ] : null);
        }
    }, [
        open,
        data
    ]);
    let g = p_1().trim().min(1, a(`nameRequired`)).max(40, a(`nameTooLong`));
    let _ = be(a(`badUrl`));
    let b = t_6({
        defaultValues: {
            displayName,
            ...Object.fromEntries(J.map((e)=>[
                    e.key,
                    socials[e.key] ?? ``
                ]))
        },
        onSubmit: async ({ value })=>{
            let socials_1 = {};
            for (let n of J){
                let r = value[n.key].trim();
                if (r) {
                    socials_1[n.key] = r;
                }
            }
            setS(null);
            try {
                await f.mutateAsync({
                    displayName: value.displayName.trim(),
                    socials: socials_1,
                    editions: p ?? undefined
                });
                await o.invalidate();
                onOpenChange(false);
            } catch (error) {
                setS(error instanceof t_3 || error instanceof Error ? error.message : a(`saveFailed`));
            }
        }
    });
    return <Me1 open={open} onOpenChange={onOpenChange}><V className={`sm:max-w-lg`}><B><Pe>{a(`title`)}</Pe><Z1>{a(`description`)}</Z1></B><form id={`edit-profile-form`} onSubmit={(e)=>{
        e.preventDefault();
        b.handleSubmit();
    }} className={`flex max-h-[60vh] flex-col gap-4 overflow-y-auto px-0.5`}><b.Field name={`displayName`} validators={{
        onChange: g
    }}>{(e)=>{
        let t = e.state.meta.isTouched && !e.state.meta.isValid;
        return <G data-invalid={t || undefined}><U htmlFor={e.name}>{a(`displayName`)}</U><H id={e.name} name={e.name} value={e.state.value} onBlur={e.handleBlur} onChange={(t)=>e.handleChange(t.target.value)} maxLength={40} aria-invalid={t || undefined}/>{t && <W errors={e.state.meta.errors}/>}</G>;
    }}</b.Field>{p !== null && <><div className={`mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground`}>{a(`gameEdition`)}</div><O value={p} onChange={setP}/></>}<div className={`mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground`}>{a(`socialLinks`)}</div>{J.map((e)=><b.Field key={e.key} name={e.key} validators={{
            onChange: _
        }}>{(t)=>{
            let n = t.state.meta.isTouched && !t.state.meta.isValid;
            return <G data-invalid={n || undefined}><U htmlFor={t.name}>{e.label}</U><H id={t.name} name={t.name} type={`url`} inputMode={`url`} value={t.state.value} onBlur={t.handleBlur} onChange={(e)=>t.handleChange(e.target.value)} placeholder={e.placeholder} aria-invalid={n || undefined}/>{n && <W errors={t.state.meta.errors}/>}</G>;
        }}</b.Field>)}{s && <p className={`border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive`}>{s}</p>}</form><Fe><F variant={`outline`} onClick={()=>onOpenChange(false)}>{a(`cancel`)}</F><b.Subscribe selector={(e)=>[
            e.canSubmit,
            e.isSubmitting
        ]}>{([e, t])=><F type={`submit`} form={`edit-profile-form`} disabled={!e || t}>{a(t ? `saving` : `save`)}</F>}</b.Subscribe></Fe></V></Me1>;
}
function CeComponent({ handle }) {
    let t = i_1(`Profile`);
    let { on, pending, toggle } = n_4({
        kind: `following`,
        id: handle,
        call: (t)=>A_2(handle, t),
        read: (e)=>e.following,
        signInReason: t(`signInToFollow`)
    });
    return <F variant={on ? `outline` : `default`} onClick={()=>void toggle()} disabled={pending} aria-pressed={on} className={t_4(on && `text-foreground-secondary`)}>{on ? <L/> : <Re/>}{t(on ? `following` : `follow`)}</F>;
}
function Y(e) {
    if (e < 1000) {
        return String(e);
    }
    let t = e / 1000;
    return `${t.toFixed(+(t < 10)).replace(/\.0$/, ``)}k`;
}
const background = `linear-gradient(180deg, var(--sky-tint) 0%, color-mix(in srgb, var(--sky-tint) 55%, var(--card)) 42%, color-mix(in srgb, var(--sky-tint) 22%, var(--card)) 100%)`;
function TeComponent({ visibility }) {
    let t = i_1(`Profile.card`);
    if (visibility === `private`) {
        return <span className={`absolute bottom-2 left-2 inline-flex items-center gap-1 bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs`}><D className={`size-3`}/>{` `}{t(`private`)}</span>;
    }
    if (visibility === `unlisted`) {
        return <span className={`absolute bottom-2 left-2 inline-flex items-center gap-1 bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs`}><icon_1 className={`size-3`}/>{` `}{t(`unlisted`)}</span>;
    }
    return null;
}
function EeComponent({ item, byline = false }) {
    let n = i_1(`Profile.card`);
    let i = i_1(`Chrome`);
    let o = n_2();
    let s = i_1(`Subtype`);
    return <A1 to={`/$locale/schematics/$id/{-$slug}`} params={{
        locale: o,
        id: item.id,
        slug: item.slug
    }} className={`group flex flex-col border border-border bg-card transition-colors hover:border-ring`}><div className={`relative aspect-[16/10] overflow-hidden`} style={{
        background
    }}>{item.imageUrl ? <img src={t_7(item.imageUrl, 400)} srcSet={n_5(item.imageUrl)} sizes={`(max-width: 768px) 45vw, 300px`} alt={i(`card.renderAlt`, {
        title: item.title
    })} loading={`lazy`} className={`size-full object-contain p-2`}/> : <div className={`grid size-full place-items-center`}><C className={`size-7 text-foreground/25`} strokeWidth={1.5}/></div>}{item.isPublished ? null : <span className={`absolute left-2 top-2 bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs`}>{n(`processing`)}</span>}{item.hasMods && <span title={n(`usesMods`)} className={`absolute right-2 top-2 inline-flex items-center gap-1 bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs`}><A className={`size-3`}/>{` `}{n(`mods`)}</span>}<TeComponent visibility={item.visibility}/></div><div className={`flex flex-1 flex-col p-3`}><span className={`truncate text-[13px] font-semibold group-hover:text-accent-foreground`}>{item.title}</span>{byline && <J1 item={item} className={`mt-0.5`}/>}<div className={`mt-2 flex items-center justify-between gap-2`}><span className={`flex items-center gap-2.5 text-[11px] text-muted-foreground`}><span className={`inline-flex items-center gap-1`}><Le className={`size-3.5`}/>{Y(item.downloadCount)}</span><span className={`inline-flex items-center gap-1`}><T className={`size-3.5`}/>{Y(item.likeCount)}</span></span>{item.subtype && <span className={`shrink-0 truncate text-[10px] text-muted-foreground`}>{s(`${item.subtype}.name`)}</span>}</div></div></A1>;
}
function De(page, totalPages) {
    let n = [
        ...new Set([
            1,
            totalPages,
            page - 1,
            page,
            page + 1
        ])
    ].filter((e)=>e >= 1 && e <= totalPages).sort((e, t)=>e - t);
    let r = [];
    let i = 0;
    for (let e of n){
        if (e - i > 1) {
            r.push(`gap`);
        }
        r.push(e);
        i = e;
    }
    return r;
}
const X = `grid h-8 min-w-8 place-items-center border px-2 text-[13px]`;
function OeComponent({ handle, tab, page, totalPages }) {
    let o = i_1(`Browse.pagination`);
    let s = n_2();
    if (totalPages <= 1 && page <= 1) {
        return null;
    }
    let c = (n)=>({
            to: `/$locale/users/$handle`,
            params: {
                locale: s,
                handle
            },
            search: qt(tab, n)
        });
    return <nav aria-label={o(`label`)} className={`mt-8 flex items-center justify-center gap-1.5`}>{page > 1 ? <A1 {...c(Math.min(page - 1, totalPages))} rel={`prev`} aria-label={o(`previous`)} className={t_4(X, `border-border bg-card hover:bg-muted`)}><W1 className={`size-4`}/></A1> : <span aria-hidden className={t_4(X, `border-border/50 text-muted-foreground/40`)}><W1 className={`size-4`}/></span>}{De(page, totalPages).map((e, t)=>{
        if (e === `gap`) {
            return <span key={`gap-${t}`} aria-hidden className={`px-1 text-muted-foreground`}>{`…`}</span>;
        }
        return <A1 key={e} {...c(e)} aria-current={e === page ? `page` : undefined} className={t_4(X, e === page ? `border-primary bg-primary font-semibold text-primary-foreground` : `border-border bg-card hover:bg-muted`)}>{e}</A1>;
    })}{page < totalPages ? <A1 {...c(page + 1)} rel={`next`} aria-label={o(`next`)} className={t_4(X, `border-border bg-card hover:bg-muted`)}><I className={`size-4`}/></A1> : <span aria-hidden className={t_4(X, `border-border/50 text-muted-foreground/40`)}><I className={`size-4`}/></span>}</nav>;
}
function KeComponent({ url }) {
    let t = i_1(`Profile`);
    let [n, setN] = K.useState(false);
    return <F variant={`outline`} size={`icon-lg`} aria-label={t(`copyLink`)} onClick={async ()=>{
        try {
            await navigator.clipboard.writeText(url);
        } catch  {}
        setN(true);
        setTimeout(()=>setN(false), 1600);
    }}>{n ? <L/> : <M/>}</F>;
}
const Z = {
    youtube: {
        label: `YouTube`,
        icon: icon_1
    },
    x: {
        label: `X`,
        icon: icon_1
    },
    discord: {
        label: `Discord`,
        icon: icon_1
    },
    twitch: {
        label: `Twitch`,
        icon: icon_1
    },
    tiktok: {
        label: `TikTok`,
        icon: icon_1
    },
    instagram: {
        label: `Instagram`,
        icon: icon_1
    },
    github: {
        label: `GitHub`,
        icon: icon_1
    },
    website: {
        label: `Website`,
        icon
    }
};
function AeComponent({ socials }) {
    let t = b.map((p)=>({
            p,
            href: t_5(socials[p])
        })).filter((e)=>e.href !== undefined);
    if (t.length === 0) {
        return null;
    }
    return <div className={`mt-3 flex flex-wrap items-center gap-1.5`}>{t.map(({ p, href })=>{
        let { label, icon } = Z[p];
        return <a key={p} href={href} target={`_blank`} rel={`noopener noreferrer nofollow`} className={`inline-flex items-center gap-1.5 border border-border bg-card px-2.5 py-1 text-[12px] text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground`}>{q.jsx(icon, {
            className: `size-3.5`
        })}{label}</a>;
    })}</div>;
}
export function je() {
    let { messages } = N.useLoaderData();
    return <Ie messages={messages}><NeComponent/></Ie>;
}
function QComponent({ value, label }) {
    return <span className={`text-[13px] text-muted-foreground`}><b className={`font-semibold text-foreground`}>{value}</b>{` `}{label}</span>;
}
function Me(e) {
    let t = e?.parentElement;
    if (!(!e || !t)) {
        t.scrollLeft = e.offsetLeft - (t.clientWidth - e.offsetWidth) / 2;
    }
}
function $(e) {
    if (e < 1000) {
        return String(e);
    }
    let t = e / 1000;
    return `${t.toFixed(+(t < 10)).replace(/\.0$/, ``)}k`;
}
function NeComponent() {
    let { handle } = N.useParams();
    let t = N.useSearch();
    let { data: { profile, builds, siteUrl } } = t_2(o_2({
        handle,
        page: N.useLoaderDeps().page ?? 1
    }));
    let d = i_1(`Profile`);
    let g = n_2();
    let v = n_3();
    let y = u(profile.handle);
    let b = d_1();
    let w = y || b;
    let tab = Kt(t.tab, w);
    let E = t.page ?? 1;
    let D = x(tab) ? tab : null;
    let O = D ? Gt[D] : null;
    let k = c({
        queryKey: a(profile.handle, tab, E),
        queryFn: D ? ()=>O_1(profile.handle, D, E) : A_1,
        retry: false
    });
    let A = D ? k.data : builds;
    let color = Xt(profile.handle);
    let M = y && E === 1 && O?.holds !== `collected`;
    return <>{y && <div className={`border-b border-border bg-muted/40`}><p className={`mx-auto flex max-w-[1180px] items-center gap-2 px-4 py-2 text-[12px] text-muted-foreground sm:px-7`}>{d(`selfNotice`)}</p></div>}<main className={`mx-auto w-full max-w-[1180px] flex-1 px-4 pb-16 pt-6 sm:px-7`}><div className={`flex flex-col gap-4 sm:flex-row sm:items-start`}><Yt name={profile.displayName} color={color} className={`size-16 rounded-none text-2xl sm:size-20 sm:text-3xl`}/><div className={`min-w-0 flex-1`}><h1 className={`font-heading text-2xl font-semibold tracking-wide wrap-anywhere`}><He name={profile.displayName} badge={profile.badge}/></h1><p className={`text-[13px] text-muted-foreground wrap-anywhere`}>{`@`}{profile.handle}</p><div className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5`}><QComponent value={$(profile.followerCount)} label={d(`followers`)}/><QComponent value={$(profile.followingCount)} label={d(`followingCount`)}/><QComponent value={v.number(profile.stats.builds)} label={d(`builds`)}/><QComponent value={$(profile.stats.downloads)} label={d(`downloads`)}/><QComponent value={$(profile.stats.likes)} label={d(`likes`)}/><span className={`text-[13px] text-muted-foreground`}>{d(`joined`, {
        date: v.dateTime(new Date(profile.joinedAt), {
            dateStyle: `long`
        })
    })}</span></div><AeComponent socials={profile.socials}/></div><div className={`flex shrink-0 flex-wrap items-center gap-2`}>{y ? <><F nativeButton={false} render=<A1 to={`/$locale/manage/schematics/create`} params={{
        locale: g
    }}><Ue/>{` `}{d(`newBuild`)}</A1>/><XeComponent displayName={profile.displayName} socials={profile.socials}/></> : <CeComponent handle={profile.handle}/>}<KeComponent url={`${siteUrl}/users/${profile.handle}`}/></div></div><div className={`no-scrollbar relative mt-6 flex items-center gap-1 overflow-x-auto shadow-[inset_0_-1px_0_var(--border)]`}>{y_1.options.filter((e)=>w || !x(e)).map((e)=><A1 key={e} to={`/$locale/users/$handle`} params={{
            locale: g,
            handle: profile.handle
        }} search={qt(e)} activeOptions={{
            explicitUndefined: true
        }} ref={tab === e ? Me : undefined} className={t_4(`shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-[13px] font-medium transition-colors`, tab === e ? `border-primary text-foreground` : `border-transparent text-muted-foreground hover:text-foreground`)}>{x(e) ? d(Gt[e].label) : d(`tabBuilds`, {
            count: profile.stats.builds
        })}</A1>)}</div>{k.isLoadingError ? <div className={`mt-16 flex flex-col items-center gap-3 px-4 py-16 text-center`}><p className={`text-[13px] text-muted-foreground`}>{d(`listFailed`)}</p><F variant={`outline`} onClick={()=>void k.refetch()}>{d(`retry`)}</F></div> : A ? A.total === 0 && !M ? <div className={`mt-16 flex flex-col items-center gap-3 px-4 py-16 text-center`}><C className={`size-8 text-foreground/30`} strokeWidth={1.5} aria-hidden/><h2 className={`font-heading text-xl`}>{d(O ? O.emptyTitle : `emptyTitle`)}</h2><p className={`max-w-sm text-[13px] text-muted-foreground`}>{O ? d(O.emptyBody) : d(`emptyBody`, {
        name: profile.displayName
    })}</p>{O?.holds === `collected` && <A1 to={`/$locale/schematics`} params={{
        locale: g
    }} className={`mt-1 text-[13px] font-semibold underline underline-offset-4`}>{d(`browseBuilds`)}</A1>}</div> : <><div className={`mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4`}>{A.items.map((item)=><EeComponent key={item.id} item={item} byline={O?.holds === `collected`}/>)}{M && <A1 to={`/$locale/manage/schematics/create`} className={`flex aspect-[16/10] flex-col items-center justify-center gap-2 border border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-ring hover:text-foreground`} params={{
        locale: g
    }}><Ne1 className={`size-6`} aria-hidden/><span className={`text-[13px] font-medium`}>{d(`uploadTile`)}</span></A1>}</div><OeComponent handle={profile.handle} tab={tab} page={A.page} totalPages={A.totalPages}/></> : <div className={`mt-6 min-h-40`} aria-busy={`true`}/>}</main></>;
}
