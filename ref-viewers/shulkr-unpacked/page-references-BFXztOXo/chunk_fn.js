import { n as n_1 } from "../current-Bq9r6xhE.js";
import { t as O } from "../ClientOnly-BiCdmN1s.js";
import { t as S1 } from "../link-C5CNVKC3.js";
import { c, f } from "../keys-CMeqocw_.js";
import { m, n as n_2, r, t } from "../session-BGIR8kU0.js";
import { t as t_2 } from "../useNavigate-5hivG_iR.js";
import { i as i_1, n as n_3 } from "../react-LvWBhTF7.js";
import { R as R_1, m as m_2, n as n_4, t as t_3, x } from "../browser-I-D20JeN.js";
import { t as t_4 } from "../utils-B6KiDbIe.js";
import { t as Ae } from "../blocks-BAw4PJ9b.js";
import { t as E } from "../box-DpWO1Dds.js";
import { n as Me } from "../catalog-card-Cn9CUBJ7.js";
import { t as He } from "../search-BlPxHO6p.js";
import { n as n_5 } from "../query-pI4UeOiZ.js";
import { t as t_5 } from "../identity-DKkH2Mq0.js";
import { c as c_1, d, f as f_2, u } from "../queries-DlYwNVUA.js";
import { Ft, Xt, Yt, er as N, fr as Ke, hr as Je, jt as P, nr as Ze } from "../index-DmN1rqCo.js";
import { t as Mt } from "../user-name-Doik7BrP.js";
import { n as Ht } from "../markdown-nXGeLLbi.js";
import { t as _t } from "../textarea-CNdUQNni.js";
import { t as Ot } from "../badge-uBGdfrIZ.js";
import { Y } from "./chunk___vite__mapDeps.js";
import { R, un as Un } from "./chunk_kt.js";
export function fn({ id: key, value, className }) {
    return <Un key={key} value={value} locales={n_1()} className={className}/>;
}
const maxLength = 2000;
function Mn1Component({ workId, parentId, autoFocus, onPosted, onCancel }) {
    let o = i_1(`Schematic.comments`);
    let s = n_1();
    let c = f();
    let u = t_2();
    let { data } = m();
    let [p, setP] = R.useState(``);
    let [v, setV] = R.useState(null);
    let [b, setB] = R.useState(false);
    let S = r(data);
    let C = async ()=>{
        let body = p.trim();
        if (!(!body || b)) {
            setV(null);
            setB(true);
            try {
                let i = await R_1(workId, {
                    body,
                    ...parentId ? {
                        parentId
                    } : {}
                });
                setP(``);
                onPosted?.(i);
                c_1(c, workId, `commentCount`, 1);
                await c.invalidateQueries({
                    queryKey: f_2(workId)
                });
            } catch (error) {
                if (t_5(error)) {
                    u({
                        to: `/$locale/welcome`,
                        params: {
                            locale: s
                        },
                        search: {
                            returnTo: window.location.pathname + window.location.search
                        }
                    });
                    return;
                }
                setV(error instanceof t_3 ? error.message : o(`postFailed`));
            } finally{
                setB(false);
            }
        }
    };
    if (S) {
        return <div className={`flex gap-2.5`}><Yt name={data ? t(data) : `?`} color={Xt(data?.user.handle ?? `?`)}/><div className={`flex min-w-0 flex-1 flex-col gap-2`}><_t value={p} onChange={(e)=>setP(e.target.value)} onKeyDown={(e)=>{
            if (e.key === `Enter` && (e.metaKey || e.ctrlKey)) {
                C();
            }
        }} placeholder={o(parentId ? `replyPlaceholder` : `placeholder`)} maxLength={maxLength} autoFocus={autoFocus} className={`min-h-10 text-[13px]`}/>{v && <p className={`border border-destructive/30 bg-destructive/5 px-2.5 py-1.5 text-[12px] text-destructive`}>{v}</p>}<div className={`flex items-center justify-end gap-2`}>{onCancel && <N variant={`ghost`} size={`sm`} onClick={onCancel} disabled={b}>{o(`cancel`)}</N>}<N size={`sm`} onClick={()=>void C()} disabled={!p.trim() || b}>{o(b ? `posting` : parentId ? `postReply` : `post`)}</N></div></div></div>;
    }
    return <p className={`text-[13px] text-muted-foreground`}>{o.rich(`signInToComment`, {
        link: (e)=><button type={`button`} className={`font-semibold text-accent-foreground hover:underline`} onClick={()=>void u({
                    to: `/$locale/signin`,
                    params: {
                        locale: s
                    },
                    search: {
                        returnTo: window.location.pathname + window.location.search
                    }
                })}>{e}</button>
    })}</p>;
}
function HnComponent() {
    return <Ot variant={`outline`} className={`h-auto border-brand/30 bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand`}>{i_1(`Schematic.comments`)(`creator`)}</Ot>;
}
function GnComponent({ comment }) {
    let t = i_1(`Schematic.comments`);
    let n = n_1();
    if (comment.author) {
        return <><S1 to={`/$locale/users/$handle`} params={{
            locale: n,
            handle: comment.author.handle
        }} className={`text-[13px] font-semibold underline-offset-2 hover:underline wrap-anywhere`}><Mt name={comment.author.name} badge={comment.author.badge}/></S1>{comment.isCreator && <HnComponent/>}</>;
    }
    return <span className={`text-[13px] font-semibold text-muted-foreground`}>{t(`deletedAuthor`)}</span>;
}
function NComponent({ comment }) {
    let t = i_1(`Schematic.comments`);
    if (comment.deleted) {
        return <p className={`text-[13px] italic leading-relaxed text-muted-foreground`}>{t(`wasDeleted`)}</p>;
    }
    return <p className={`whitespace-pre-wrap break-words text-[13px] leading-relaxed text-foreground-secondary`}>{comment.body}</p>;
}
function VnComponent({ workId, comment, onDeleted }) {
    let r = i_1(`Schematic.comments`);
    let i = f();
    let [a, setA] = R.useState(false);
    let { data } = m();
    if (comment.deleted || !n_2(data, comment.author?.handle)) {
        return null;
    }
    let c = async ()=>{
        setA(true);
        try {
            await m_2(workId, comment.id);
            if (onDeleted) {
                onDeleted();
            }
            c_1(i, workId, `commentCount`, -1);
            await i.invalidateQueries({
                queryKey: f_2(workId)
            });
        } finally{
            setA(false);
        }
    };
    return <button type={`button`} className={`text-[11.5px] font-medium text-muted-foreground hover:text-destructive disabled:opacity-50`} disabled={a} onClick={()=>void c()}>{r(a ? `deleting` : `delete`)}</button>;
}
function YnComponent({ reply, workId, onDeleted }) {
    return <div id={`comment-${reply.id}`} className={`flex scroll-mt-24 gap-3 border-l-2 border-input bg-muted/60 p-3`}><Yt name={reply.author?.name ?? `?`} color={Xt(reply.author?.handle ?? reply.id)} className={`size-6 text-xs`}/><div className={`min-w-0 flex-1`}><div className={`mb-1 flex flex-wrap items-center gap-2`}><GnComponent comment={reply}/><span className={`text-[11px] text-muted-foreground`}><Ft value={reply.createdAt} approxChars={11}/></span></div><NComponent comment={reply}/><div className={`mt-1`}><O fallback={null}><VnComponent workId={workId} comment={reply} onDeleted={onDeleted}/></O></div></div></div>;
}
function BnComponent({ comment, workId }) {
    let n = i_1(`Schematic.comments`);
    let [r, setR] = R.useState(false);
    let [a, setA] = R.useState(null);
    let [c, setC] = R.useState(false);
    let u = a ?? comment.replies;
    let d = comment.replyCount - u.length;
    let f = a === null && d > 0;
    let p = async ()=>{
        setC(true);
        try {
            setA((await x(workId, comment.id)).items);
        } finally{
            setC(false);
        }
    };
    return <div id={`comment-${comment.id}`} className={`flex scroll-mt-24 gap-3`}><Yt name={comment.author?.name ?? `?`} color={Xt(comment.author?.handle ?? comment.id)}/><div className={`min-w-0 flex-1`}><div className={`mb-1 flex flex-wrap items-center gap-2`}><GnComponent comment={comment}/><span className={`text-[11px] text-muted-foreground`}><Ft value={comment.createdAt} approxChars={11}/></span></div><NComponent comment={comment}/><O fallback={null}><div className={`mt-1.5 flex gap-3.5`}>{!comment.deleted && <button type={`button`} className={`text-[11.5px] font-medium text-muted-foreground hover:text-foreground`} onClick={()=>setR((e)=>!e)}>{n(`reply`)}</button>}<VnComponent workId={workId} comment={comment}/></div></O>{(u.length > 0 || r) && <div className={`mt-3 flex flex-col gap-2`}>{u.map((reply)=><YnComponent key={reply.id} reply={reply} workId={workId} onDeleted={a ? ()=>setA((t)=>(t ?? []).map((t)=>{
                    if (t.id === reply.id) {
                        return {
                            ...t,
                            deleted: true,
                            body: ``,
                            author: null
                        };
                    }
                    return t;
                })) : undefined}/>)}{f && <O fallback=<span className={`self-start text-[11.5px] text-muted-foreground`}>{n(`moreReplies`, {
        count: d
    })}</span>><button type={`button`} className={`self-start text-[11.5px] font-medium text-muted-foreground hover:text-foreground`} disabled={c} onClick={()=>void p()}>{c ? n(`loadingReplies`) : n(`viewAllReplies`, {
        count: comment.replyCount
    })}</button></O>}{a !== null && d > 0 && <span className={`self-start text-[11.5px] text-muted-foreground`}>{n(`moreReplies`, {
        count: d
    })}</span>}{r && <Mn1Component workId={workId} parentId={comment.id} autoFocus onCancel={()=>setR(false)} onPosted={(t)=>{
        setA((n)=>[
                ...n ?? comment.replies,
                t
            ]);
        setR(false);
    }}/>}</div>}</div></div>;
}
export function xn({ schematic }) {
    let t = i_1(`Schematic.comments`);
    let schematic_id = schematic.id;
    let { data, isPending } = c(d(schematic_id));
    let { commentCount } = u(schematic);
    return <section className={`border border-border bg-card p-4`}><P className={`mb-3.5 flex items-baseline gap-1`}><h2>{t(`heading`)}</h2>{commentCount > 0 ? <span>{`(`}{Y.jsx(fn, {
        id: schematic_id,
        value: commentCount
    })}{`)`}</span> : null}</P><div className={`flex flex-col gap-4.5`}><O fallback={null}><Mn1Component workId={schematic_id}/></O>{data === undefined ? isPending ? null : <p className={`text-[13px] text-muted-foreground`}>{t(`unavailable`)}</p> : data.items.length === 0 ? <p className={`text-[13px] text-muted-foreground`}>{t(`empty`)}</p> : <>{data.items.map((comment)=><BnComponent key={comment.id} comment={comment} workId={schematic_id}/>)}{data.totalPages > 1 && <span className={`self-center text-[12px] text-muted-foreground`}>{t(`morePages`, {
        count: data.total - data.items.length
    })}</span>}</>}</div></section>;
}
function Sn(count, stackSize, n) {
    if (stackSize <= 1 || count < stackSize) {
        return null;
    }
    let r = Math.floor(count / stackSize);
    let i = count % stackSize;
    if (i > 0) {
        return `${n.number(r)}×${stackSize} +${n.number(i)}`;
    }
    return `${n.number(r)}×${stackSize}`;
}
const Cn = 10;
function WnComponent({ materials }) {
    let t = i_1(`Schematic.materials`);
    let n = n_3();
    let [r, setR] = R.useState(``);
    let a = R.useMemo(()=>{
        let t = r.trim().toLowerCase();
        if (t) {
            return materials.filter((e)=>e.label.toLowerCase().includes(t) || e.id.toLowerCase().includes(t));
        }
        return materials;
    }, [
        materials,
        r
    ]);
    if (materials.length === 0) {
        return <p className={`text-[13px] text-muted-foreground`}>{t(`none`)}</p>;
    }
    return <div className={`flex flex-col`}><div className={t_4(`overflow-y-auto`, materials.length > Cn ? `h-[30rem]` : `max-h-[30rem]`)}><div className={`sticky top-0 z-10 border-b border-border bg-card px-4 py-3`}><div className={`flex h-8 items-center gap-2 border border-input bg-background px-2.5 focus-within:border-ring`}><He className={`size-3.5 shrink-0 text-muted-foreground`} aria-hidden/><input type={`search`} value={r} onChange={(e)=>setR(e.target.value)} placeholder={t(`searchPlaceholder`)} aria-label={t(`searchPlaceholder`)} spellCheck={false} className={`min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden`}/>{r && <button type={`button`} aria-label={t(`clearSearch`)} onClick={()=>setR(``)} className={`shrink-0 text-muted-foreground hover:text-foreground`}><Ze className={`size-3.5`}/></button>}</div></div>{a.length === 0 ? <p className={`px-4 py-6 text-[13px] text-muted-foreground`}>{t(`noMatch`)}</p> : <ul className={`px-4`}>{a.map((e)=><li key={e.id} className={`flex h-11 items-center gap-2.5 border-b border-dashed border-border last:border-b-0`}><span className={`grid size-7 shrink-0 place-items-center`}>{e.iconUrl ? <img src={e.iconUrl} alt={``} loading={`lazy`} decoding={`async`} className={`size-7`}/> : <E className={`size-4 text-foreground/25`} strokeWidth={1.5} aria-hidden/>}</span><span className={`min-w-0 flex-1 truncate text-[13px]`}>{e.label}</span><span className={`shrink-0 text-right leading-tight`}><span className={`text-[13px] font-semibold tabular-nums`}>{n.number(e.count)}</span>{Sn(e.count, e.stackSize, n) && <span className={`block text-[10px] font-normal tabular-nums text-muted-foreground`}>{Sn(e.count, e.stackSize, n)}</span>}</span></li>)}</ul>}</div><p className={`border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground`}>{r ? t(`filtered`, {
        shown: a.length,
        total: materials.length
    }) : t(`topN`, {
        count: materials.length
    })}</p></div>;
}
function TnComponent({ schematic, references }) {
    let n = i_1(`Schematic`);
    if (schematic.description) {
        return <Ht references={references}>{schematic.description}</Ht>;
    }
    return <p className={`text-[13px] text-muted-foreground`}>{n(`noDescription`)}</p>;
}
export function En({ schematic, materials, references }) {
    let r = i_1(`Schematic`);
    let [i, setI] = R.useState(`about`);
    return <div className={`flex flex-col gap-5 lg:block lg:gap-0 lg:border lg:border-border lg:bg-card`}><div className={`hidden border-b border-border bg-muted/50 lg:flex`}>{[
        [
            `about`,
            r(`descriptionTab`)
        ],
        [
            `materials`,
            r(`materials.tab`)
        ]
    ].map(([e, t])=><button key={e} type={`button`} aria-pressed={i === e} onClick={()=>setI(e)} className={t_4(`-mb-px flex-none border-b-2 px-5 py-3 text-[13px] font-semibold transition`, i === e ? `border-primary bg-card text-foreground` : `border-transparent text-muted-foreground hover:text-foreground`)}>{t}</button>)}</div><section className={t_4(i !== `about` && `lg:hidden`)}><P as={`h2`} className={`mb-2.5 lg:sr-only`}>{r(`about`)}</P><div className={`lg:p-5`}><TnComponent schematic={schematic} references={references}/></div></section><section className={t_4(`border border-border bg-card lg:border-0 lg:bg-transparent`, i !== `materials` && `lg:hidden`)}><P as={`h2`} className={`block px-4 pt-4 lg:sr-only`}>{r(`materials.heading`)}</P><WnComponent materials={materials}/></section></div>;
}
export function Dn({ file, coverage }) {
    let n = i_1(`Schematic.coverage`);
    let { unknown, unknownTotal, modded, moddedTotal } = coverage;
    let s = unknownTotal + moddedTotal;
    if (s === 0) {
        return null;
    }
    let c = file.blockCount && file.blockCount > 0 ? Math.max(1, Math.round(s / file.blockCount * 100)) : null;
    let l = [
        ...unknown,
        ...modded
    ].slice(0, 3).map((e)=>e.id);
    let u = unknown.length + modded.length;
    let d = Math.max(0, u - l.length);
    let f = moddedTotal > 0 && unknownTotal === 0 ? `reasonMods` : moddedTotal > 0 ? `reasonBoth` : `reasonUnsupported`;
    return <div className={`flex items-start gap-3 border border-tan-border bg-tan px-3 py-2.5`}><span className={`mt-px hidden size-7.5 shrink-0 place-items-center border border-tan-border bg-card text-tan-foreground sm:grid`}><Ae className={`size-4`} aria-hidden/></span><p className={`text-xs leading-normal text-tan-foreground`}><b className={`font-semibold`}>{n(`headline`, {
        count: s,
        pct: c === null ? `` : ` (~${c}%)`
    })}</b>{` `}{n(`placeholders`)}{` `}{n(f)}{` `}{l.length > 0 && <span className={`text-tan-foreground/80`}>{`(`}{l.join(`, `)}{d > 0 ? n(`andMore`, {
        count: d
    }) : ``}{`)`}</span>}</p></div>;
}
export function On({ discovery }) {
    let t = i_1(`Schematic.discovery`);
    let n = i_1(`Category`);
    let r = i_1(`Subtype`);
    let a = n_1();
    let { similar, byCreator } = discovery;
    if (!similar && !byCreator) {
        return null;
    }
    return <div className={`mt-12 flex flex-col gap-10`}>{similar && <JnComponent items={similar.items} headingLink=<S1 to={`/$locale/schematics`} params={{
        locale: a
    }} search={similar.axis === `subtype` ? {
        subtype: similar.value
    } : {
        category: similar.value
    }} className={className}>{t(`similar`, {
        name: similar.axis === `subtype` ? r(`${similar.value}.name`) : n(`${similar.value}.name`)
    })}<AnComponent/></S1>/>}{byCreator && <JnComponent items={byCreator.items} headingLink=<S1 to={`/$locale/users/$handle`} params={{
        locale: a,
        handle: byCreator.handle
    }} className={className}><span>{t.rich(`byCreator`, {
        name: ()=><Mt name={byCreator.name} badge={byCreator.badge}/>
    })}</span><AnComponent/></S1>/>}</div>;
}
var className = `group inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground`;
function AnComponent() {
    return <Ke className={`size-3.5 transition-transform group-hover:translate-x-0.5`} aria-hidden/>;
}
function JnComponent({ headingLink, items }) {
    return <section>{headingLink}<div className={`mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4`}>{items.map((item)=><Me key={item.id} item={item} sizes={`(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 280px`}/>)}</div></section>;
}
export function Mn({ schematic, className, size = `icon` }) {
    let r = i_1(`Schematic.engagement`);
    let { on, pending, toggle } = n_5({
        kind: `bookmarked`,
        id: schematic.id,
        call: (t)=>n_4(schematic.id, t),
        read: (e)=>e.bookmarked,
        signInReason: r(`signInToSave`)
    });
    return <N variant={`outline`} size={size} aria-pressed={on} aria-label={r(on ? `unsave` : `save`)} title={r(on ? `saved` : `save`)} disabled={pending} onClick={toggle} className={t_4(on && `border-primary/40 bg-accent`, className)}><Je className={t_4(on && `fill-primary stroke-primary`)}/></N>;
}
