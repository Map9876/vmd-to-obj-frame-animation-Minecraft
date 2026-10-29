import { te } from "./signin-k-vxR4u-/chunk_te.js";
import { n, s, t } from "./jsx-runtime-Db0DjQYK.js";
import { n as n_2 } from "./current-Bq9r6xhE.js";
import { t as I1 } from "./ClientOnly-BiCdmN1s.js";
import { t as A1 } from "./link-C5CNVKC3.js";
import { c } from "./keys-CMeqocw_.js";
import { f, g as g_1, m, r, t as t_2 } from "./session-BGIR8kU0.js";
import { t as t_3 } from "./useSearch-DY9YFgkc.js";
import { t as t_4 } from "./useNavigate-5hivG_iR.js";
import { i as i_1, r as r_2 } from "./react-LvWBhTF7.js";
import { t as t_5 } from "./public--pAhXrd8.js";
import { K, L as L_1, X as X_1, r as r_3, t as t_6 } from "./browser-I-D20JeN.js";
import { t as S } from "./mail-DzuWh0IN.js";
import { t as C } from "./route-messages-9yrojIBL.js";
import { _r, er as T, tr, vr as D, vt } from "./index-DmN1rqCo.js";
import { t as K1 } from "./input-QawliBzd.js";
import { n as n_3, t as A } from "./turnstile-z7FheHKD.js";
import { t as J1 } from "./badge-uBGdfrIZ.js";
const M = ()=>({
        authenticated: false
    });
const auth = ()=>({
        authenticated: false,
        cookies: true
    });
class P extends Error {
    constructor(e, t, n, r){
        super(t);
        this.status = e;
        this.code = n;
        this.body = r;
        this.name = `ApiError`;
    }
}
function F(error) {
    return error instanceof Error && error.name === `ApiError`;
}
function I(e) {
    let t = new URLSearchParams;
    for (let [n, r] of Object.entries(e)){
        if (r != null && r !== ``) {
            t.set(n, String(r));
        }
    }
    let n = t.toString();
    if (n) {
        return `?${n}`;
    }
    return ``;
}
function L(e) {
    let t = e.fetch ?? globalThis.fetch;
    let n = e.auth ?? M;
    let r = e.baseUrl.replace(/\/$/, ``);
    async function i(method, a, o, s = {}) {
        let c = new Headers(e.headers);
        if (o !== undefined) {
            c.set(`content-type`, `application/json`);
        }
        let l = await n(c);
        if (l.authenticated) {
            e.onAuthenticatedRequest?.();
        }
        let u = await t(`${r}${a}`, {
            method,
            headers: c,
            body: o === undefined ? undefined : JSON.stringify(o),
            signal: s.signal,
            ...l.cookies ? {
                credentials: `include`
            } : {}
        });
        if (!u.ok) {
            throw await R(u);
        }
        if (u.status !== 204) {
            return await u.json();
        }
    }
    async function putUnsigned(e, body, r = {}) {
        let i = await t(e, {
            method: `PUT`,
            headers: {
                "content-type": r.contentType ?? `application/octet-stream`
            },
            body,
            signal: r.signal
        });
        if (!i.ok) {
            throw Error(`Upload to storage failed (${i.status} ${i.statusText}).`);
        }
    }
    async function getUnsigned(e, n = {}) {
        let r = await t(e, {
            method: `GET`,
            signal: n.signal
        });
        if (!r.ok) {
            throw Error(`Download from storage failed (${r.status} ${r.statusText}).`);
        }
        return new Uint8Array(await r.arrayBuffer());
    }
    async function getStream(i, a = {}) {
        let o = new Headers(e.headers);
        o.set(`accept`, `text/event-stream`);
        let s = await n(o);
        if (s.authenticated) {
            e.onAuthenticatedRequest?.();
        }
        let c = await t(`${r}${i}`, {
            method: `GET`,
            headers: o,
            signal: a.signal,
            ...s.cookies ? {
                credentials: `include`
            } : {}
        });
        if (!c.ok) {
            throw await R(c);
        }
        return c;
    }
    return {
        getStream,
        get: (e, t)=>i(`GET`, e, undefined, t),
        post: (e, t, n)=>i(`POST`, e, t, n),
        patch: (e, t, n)=>i(`PATCH`, e, t, n),
        put: (e, t, n)=>i(`PUT`, e, t, n),
        del: (e, t)=>i(`DELETE`, e, undefined, t),
        putUnsigned,
        getUnsigned
    };
}
async function R(e) {
    let e_statusText = e.statusText;
    let n;
    let r;
    try {
        r = await e.json();
        let i = r;
        if (i?.message) {
            e_statusText = i.message;
        }
        if (i?.error) {
            n = i.error;
        }
    } catch  {}
    return new P(e.status, e_statusText, n, r);
}
function re(http) {
    return {
        browse (t = {}, n) {
            return http.get(`/schematics${I({
                q: t.q,
                category: t.category,
                tag: t.tag,
                edition: t.edition,
                version: t.version,
                mods: t.mods,
                size: t.size,
                sort: t.sort,
                page: t.page
            })}`, n);
        },
        get (t, n) {
            return http.get(`/schematics/${encodeURIComponent(t)}`, n);
        },
        files (t, n) {
            return http.get(`/schematics/${encodeURIComponent(t)}/files`, n);
        },
        materials (t, n, r) {
            return http.get(`/schematics/${encodeURIComponent(t)}/files/${encodeURIComponent(n)}/materials`, r);
        },
        create (t, n) {
            return http.post(`/schematics`, t, n);
        },
        addFile (t, n, r) {
            return http.post(`/schematics/${encodeURIComponent(t)}/files`, n, r);
        },
        setPrimary (t, n, r) {
            return http.post(`/schematics/${encodeURIComponent(t)}/files/${encodeURIComponent(n)}/primary`, undefined, r);
        },
        renameFile (t, n, name, i) {
            return http.patch(`/schematics/${encodeURIComponent(t)}/files/${encodeURIComponent(n)}`, {
                name
            }, i);
        },
        removeFile (t, n, r) {
            return http.del(`/schematics/${encodeURIComponent(t)}/files/${encodeURIComponent(n)}`, r);
        },
        reorderFiles (t, ids, r) {
            return http.put(`/schematics/${encodeURIComponent(t)}/files/order`, {
                ids
            }, r);
        },
        update (t, n, r) {
            return http.patch(`/schematics/${encodeURIComponent(t)}`, n, r);
        },
        remove (t, n) {
            return http.del(`/schematics/${encodeURIComponent(t)}`, n);
        },
        async download (t, n, r) {
            let { url, codecVersion } = await http.get(`/schematics/${encodeURIComponent(t)}/files/${encodeURIComponent(n)}/build-url`, r);
            return {
                bytes: await http.getUnsigned(url, r),
                codecVersion
            };
        }
    };
}
function ie(http) {
    return {
        me (t) {
            return http.get(`/auth/me`, t);
        },
        async meOrNull (t) {
            try {
                return await http.get(`/auth/me`, t);
            } catch (error) {
                if (F(error) && error.status === 401) {
                    return null;
                }
                throw error;
            }
        },
        refresh (t) {
            return http.post(`/auth/refresh`, undefined, t);
        },
        logout (t) {
            return http.post(`/auth/logout`, undefined, t);
        }
    };
}
function ae(http) {
    return {
        start (t, n) {
            return http.post(`/auth/cli/start`, t, n);
        },
        pending (t, n) {
            return http.get(`/auth/cli/pending?userCode=${encodeURIComponent(t)}`, n);
        },
        approve (t, n) {
            return http.post(`/auth/cli/approve`, t, n);
        },
        token (t, n) {
            return http.post(`/auth/cli/token`, t, n);
        }
    };
}
function oe(http) {
    function create(size, n, fileName) {
        return http.post(`/uploads`, {
            size,
            fileName
        }, n);
    }
    function complete(t, n) {
        return http.post(`/uploads/${encodeURIComponent(t)}/complete`, undefined, n);
    }
    async function stage(n, fileName, i) {
        let { uploadId, uploadUrl } = await create(n.byteLength, i, fileName);
        await http.putUnsigned(uploadUrl, n, i);
        return {
            id: uploadId,
            fileName
        };
    }
    return {
        create,
        complete,
        stage
    };
}
function z(http) {
    return {
        profile (t, n) {
            return http.get(`/users/${encodeURIComponent(t.toLowerCase())}`, n);
        },
        builds (t, n = {}, r) {
            return http.get(`/users/${encodeURIComponent(t.toLowerCase())}/builds${I({
                tab: n.tab,
                page: n.page
            })}`, r);
        },
        erasurePreview (t) {
            return http.get(`/users/me/erasure`, t);
        },
        erase (t, n) {
            return http.post(`/users/me/erasure`, t, n);
        }
    };
}
function B(e) {
    let http = L(e);
    return {
        http,
        session: ie(http),
        cliPairing: ae(http),
        schematics: re(http),
        uploads: oe(http),
        users: z(http),
        assistant: te(http)
    };
}
const V = s(n(), 1);
const H = t();
function U(returnTo) {
    if (returnTo && returnTo.startsWith(`/`) && !returnTo.startsWith(`//`)) {
        return returnTo;
    }
    return `/`;
}
function W(e) {
    if (!(e instanceof t_6) || e.code !== `rate_limited`) {
        return null;
    }
    let t = e.body?.retryAfterSeconds;
    if (typeof t == `number`) {
        return t;
    }
    return null;
}
const G = 60;
function useK() {
    let [e, setE] = V.useState(0);
    V.useEffect(()=>{
        if (e <= 0) {
            return;
        }
        let n = window.setTimeout(()=>setE((e)=>e - 1), 1000);
        return ()=>window.clearTimeout(n);
    }, [
        e
    ]);
    return [
        e,
        setE
    ];
}
function SeComponent({ returnTo }) {
    let t = i_1(`SignIn.email`);
    let locale = r_2();
    let [r, setR] = V.useState(`email`);
    let [a, setA] = V.useState(``);
    let [s, setS] = V.useState(``);
    let [l, setL] = V.useState(null);
    let [d, setD] = V.useState(null);
    let [p, setP] = V.useState(false);
    let [v, b] = useK();
    let S = n_3();
    let [C, setC] = V.useState(null);
    let [key, setKey] = V.useState(0);
    let ORef = V.useRef(null);
    let j = (error)=>{
        let seconds = W(error);
        if (seconds === null) {
            if (error instanceof t_6) {
                if (error.status === 429) {
                    return t(`tooMany`);
                }
                if (error.status === 403) {
                    return t(`challenge`);
                }
                if (error.code === `mail_unavailable`) {
                    return t(`unavailable`);
                }
                if (error.code === `mail_failed`) {
                    return t(`sendFailed`);
                }
                if (error.status === 400) {
                    return t(`invalidEmail`);
                }
                return t(`failed`);
            }
            return t(`failed`);
        }
        b(seconds);
        return t(`wait`, {
            seconds
        });
    };
    let M = async (e)=>{
        setP(true);
        setL(null);
        setD(null);
        try {
            await K({
                email: a,
                locale
            }, C ?? undefined);
            setR(`code`);
            setS(``);
            b(G);
            if (e) {
                setD(t(`resent`));
            }
        } catch (error) {
            setL(j(error));
        } finally{
            setC(null);
            setKey((e)=>e + 1);
            setP(false);
        }
    };
    let N = async (code)=>{
        setP(true);
        setL(null);
        setD(null);
        try {
            let { needsIdentity } = await X_1({
                email: a,
                code
            });
            let i = U(returnTo);
            window.location.href = needsIdentity ? `/${locale}/welcome?returnTo=${encodeURIComponent(i)}` : i;
        } catch (error) {
            setL(error instanceof t_6 && error.status === 429 ? t(`tooMany`) : t(`badCode`));
            setS(``);
            setP(false);
            ORef.current?.focus();
        }
    };
    let P = !S || C !== null;
    if (r === `email`) {
        return <form className={`flex flex-col gap-2.5`} onSubmit={(e)=>{
            e.preventDefault();
            M(false);
        }}><label htmlFor={`sign-in-email`} className={`sr-only`}>{t(`label`)}</label><K1 id={`sign-in-email`} autoFocus type={`email`} inputMode={`email`} autoComplete={`email`} required placeholder={t(`placeholder`)} value={a} onChange={(e)=>setA(e.target.value)} aria-invalid={l ? true : undefined} className={`h-11`}/><A key={key} onToken={setC} appearance={`interaction-only`} className={`flex justify-center`}/>{l ? <p className={`text-center text-[12px] text-destructive`}>{l}</p> : null}<T type={`submit`} variant={`outline`} size={`xl`} className={`w-full`} disabled={p || !a.trim() || !P}>{t(p ? `sending` : `submit`)}</T></form>;
    }
    return <form className={`flex flex-col gap-2.5`} onSubmit={(e)=>{
        e.preventDefault();
        if (s.length === 6) {
            N(s);
        }
    }}><p className={`text-center text-[13px] text-foreground-secondary`}>{t(`sentTo`, {
        email: a.trim().toLowerCase()
    })}</p><label htmlFor={`sign-in-code`} className={`sr-only`}>{t(`codeLabel`)}</label><K1 ref={ORef} id={`sign-in-code`} autoComplete={`one-time-code`} inputMode={`numeric`} pattern={`[0-9]{6}`} maxLength={6} autoFocus required value={s} disabled={p} onChange={(e)=>{
        let t = e.target.value.replace(/\D/g, ``).slice(0, 6);
        setS(t);
        if (t.length === 6) {
            N(t);
        }
    }} aria-invalid={l ? true : undefined} className={`h-12 text-center font-mono text-xl tracking-[0.5em] md:text-xl`}/>{l ? <p className={`text-center text-[12px] text-destructive`}>{l}</p> : null}{d ? <p className={`text-center text-[12px] text-muted-foreground`}>{d}</p> : null}<T type={`submit`} size={`xl`} className={`w-full`} disabled={p || s.length !== 6}>{t(p ? `verifying` : `verify`)}</T><A key={key} onToken={setC} appearance={`interaction-only`} className={`flex justify-center`}/><div className={`flex items-center justify-between text-[12px]`}><button type={`button`} className={`text-muted-foreground underline-offset-4 hover:underline`} onClick={()=>{
        setR(`email`);
        setL(null);
        setD(null);
    }}>{t(`changeEmail`)}</button><button type={`button`} className={`text-muted-foreground underline-offset-4 hover:underline disabled:no-underline disabled:opacity-50`} disabled={p || v > 0 || !P} onClick={()=>void M(true)}>{v > 0 ? t(`resendIn`, {
        seconds: v
    }) : t(`resend`)}</button></div></form>;
}
async function queryFn() {
    try {
        let { provider } = await r_3(`/auth/last-provider`);
        if (provider === `google` || provider === `discord` || provider === `email`) {
            return provider;
        }
        return null;
    } catch  {
        return null;
    }
}
function LeComponent() {
    return <svg viewBox={`0 0 24 24`} className={`size-4`} aria-hidden={`true`}><path fill={`#4285F4`} d={`M23.5 12.3c0-.9-.1-1.5-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z`}/><path fill={`#34A853`} d={`M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1 .7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z`}/><path fill={`#FBBC05`} d={`M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z`}/><path fill={`#EA4335`} d={`M12 4.8c1.8 0 3.3.6 4.6 1.8L20 3.2A12 12 0 0 0 1.3 6.6l4 3.1c1-2.9 3.6-4.9 6.7-4.9Z`}/></svg>;
}
function UeComponent() {
    return <svg viewBox={`0 0 16 16`} className={`size-4`} fill={`currentColor`} aria-hidden={`true`}><path d={`M13.2 3.5A12 12 0 0 0 10.3 2.6l-.2.4a11 11 0 0 1 2.6.9C11.4 3 9.7 2.7 8 2.7s-3.4.3-4.7 1.2c.8-.4 1.7-.7 2.6-.9l-.2-.4c-1 .2-2 .5-2.9 1C1 6.3.5 9 .7 11.7a12 12 0 0 0 3.6 1.8l.5-.9c-.5-.2-1-.4-1.4-.7l.3-.2a8.4 8.4 0 0 0 7.2 0l.3.2c-.4.3-.9.5-1.4.7l.5.9a12 12 0 0 0 3.6-1.8c.3-3.2-.5-5.9-2.2-8.2ZM5.7 10.2c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4Zm4.6 0c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4Z`}/></svg>;
}
function Q1Component() {
    return <div aria-hidden className={`flex flex-col gap-2.5`}><span className={`h-11 animate-pulse rounded bg-muted`}/><span className={`h-11 animate-pulse rounded bg-muted`}/><span className={`h-11 animate-pulse rounded bg-muted`}/></div>;
}
function JComponent({ show, children }) {
    let n = i_1(`SignIn`);
    return <div className={`relative`}>{children}{show && <J1 variant={`outline`} className={`pointer-events-none absolute -top-2.5 right-3 bg-background text-[10px] text-foreground-secondary`}>{n(`lastUsed`)}</J1>}</div>;
}
function YComponent({ returnTo }) {
    let t = i_1(`SignIn`);
    let { data } = c({
        queryKey: [
            `last-provider`
        ],
        queryFn,
        staleTime: Infinity,
        retry: false
    });
    let r = (t)=>{
        window.location.href = L_1(t, returnTo ?? `/`);
    };
    let { method } = t_3({
        from: `/$locale/signin`
    });
    let a = t_4({
        from: `/$locale/signin`
    });
    if (method === `email`) {
        return <div className={`flex flex-col gap-2.5`}><SeComponent returnTo={returnTo}/><button type={`button`} className={`inline-flex items-center justify-center gap-1.5 pt-1 text-[12px] text-muted-foreground underline-offset-4 hover:underline`} onClick={()=>a({
                search: (e)=>({
                        ...e,
                        method: undefined
                    }),
                replace: true
            })}><_r className={`size-3`}/>{t(`email.back`)}</button></div>;
    }
    return <div className={`flex flex-col gap-2.5`}><JComponent show={data === `google`}><T variant={`outline`} size={`xl`} className={`w-full`} onClick={()=>r(`google`)}><LeComponent/>{t(`google`)}</T></JComponent><JComponent show={data === `discord`}><T size={`xl`} className={`w-full bg-[#5865F2] text-white hover:bg-[#4752c4]`} onClick={()=>r(`discord`)}><UeComponent/>{t(`discord`)}</T></JComponent><JComponent show={data === `email`}><T variant={`outline`} size={`xl`} className={`w-full`} onClick={()=>a({
            search: (e)=>({
                    ...e,
                    method: `email`,
                    error: undefined
                })
        })}><S/>{t(`emailButton`)}</T></JComponent></div>;
}
function DeComponent({ returnTo, error }) {
    let { data, isPending } = m();
    let i = f();
    let a = i_1(`SignIn`);
    let o = i_1(`Auth`);
    if (isPending) {
        return <Q1Component/>;
    }
    if (r(data)) {
        return <div className={`flex flex-col gap-4`}><p className={`text-center text-[13px] text-foreground-secondary`}>{a(`signedInAs`, {
            name: t_2(data)
        })}</p><T variant={`outline`} size={`xl`} onClick={()=>i.mutate()} disabled={i.isPending}>{i.isPending ? o(`signingOut`) : o(`signOut`)}</T></div>;
    }
    return <div className={`flex flex-col gap-4`}>{error ? <p role={`alert`} className={`text-center text-[12px] text-destructive`}>{a(error === `email_unverified` ? `errors.emailUnverified` : `errors.oauth`)}</p> : null}<YComponent returnTo={returnTo}/></div>;
}
let X = null;
function Z() {
    X ||= B({
        baseUrl: t_5().apiUrl,
        auth
    });
    return X;
}
function FeComponent({ userCode }) {
    let t = i_1(`SignIn`);
    let locale = n_2();
    let { data, isPending } = m();
    let f = c({
        queryKey: [
            `cli-pairing`,
            userCode
        ],
        queryFn: ()=>Z().cliPairing.pending(userCode),
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });
    let p = g_1({
        mutationFn: ()=>Z().cliPairing.approve({
                userCode
            })
    });
    if (f.isPending || isPending) {
        return <p className={`text-center text-[13px] text-muted-foreground`}>{t(`cli.loading`)}</p>;
    }
    if (f.isError) {
        return <Component>{t(`cli.expired`)}</Component>;
    }
    if (p.isSuccess) {
        return <Component>{t(`cli.approved`)}</Component>;
    }
    let f_data = f.data;
    let g = r(data);
    let _ = g && !data?.user.identityClaimed;
    return <div className={`flex flex-col gap-5`}><div className={`flex flex-col items-center gap-2 text-center`}><h1 className={`text-[15px] font-medium`}>{t(`cli.heading`)}</h1><p className={`text-[13px] text-muted-foreground`}>{t(`cli.lead`)}</p></div><div className={`flex flex-col items-center gap-2 border border-border bg-muted/40 p-4`}><span className={`text-[11px] uppercase tracking-wide text-muted-foreground`}>{t(`cli.confirmLabel`)}</span><span className={`font-mono text-2xl tracking-[0.3em]`}>{f_data.confirmationCode}</span><p className={`text-center text-[11px] leading-relaxed text-muted-foreground`}>{t(`cli.confirmHelp`)}</p></div><dl className={`flex flex-col gap-1 text-[12px]`}><QComponent label={t(`cli.client`)} value={f_data.clientName}/>{f_data.hostname ? <QComponent label={t(`cli.machine`)} value={f_data.hostname}/> : null}</dl>{g ? _ ? <div className={`flex flex-col gap-2.5`}><p className={`text-center text-[13px] text-muted-foreground`}>{t(`cli.claimFirst`)}</p><A1 to={`/$locale/welcome`} search={{
        returnTo: `/signin?cli=${userCode}`
    }} className={tr({
        variant: `outline`,
        size: `xl`
    })} params={{
        locale
    }}>{t(`cli.claimAction`)}</A1></div> : <div className={`flex flex-col gap-2.5`}><p className={`text-center text-[13px] text-foreground-secondary`}>{t(`cli.authorizeAs`, {
        name: t_2(data)
    })}</p><T size={`xl`} onClick={()=>p.mutate()} disabled={p.isPending}>{p.isPending ? t(`cli.authorizing`) : t(`cli.authorize`)}</T>{p.isError ? <p className={`text-center text-[12px] text-destructive`}>{F(p.error) ? p.error.message : t(`cli.failed`)}</p> : null}</div> : <div className={`flex flex-col gap-2.5`}><p className={`text-center text-[13px] text-muted-foreground`}>{t(`cli.signInFirst`)}</p><YComponent returnTo={`/signin?cli=${encodeURIComponent(userCode)}`}/></div>}</div>;
}
function QComponent({ label, value }) {
    return <div className={`flex items-baseline justify-between gap-4`}><dt className={`text-muted-foreground`}>{label}</dt><dd className={`truncate font-mono`}>{value}</dd></div>;
}
function Component({ children }) {
    return <p className={`text-center text-[13px] leading-relaxed text-foreground-secondary`}>{children}</p>;
}
export function component() {
    let { messages } = vt.useLoaderData();
    return <C messages={messages}><MeComponent/></C>;
}
function MeComponent() {
    let { returnTo, cli, error } = vt.useSearch();
    let r = i_1(`SignIn`);
    return <main className={`flex flex-1 flex-col items-center justify-center px-4 py-16`}><div className={`flex w-full max-w-sm flex-col gap-6 border border-border bg-card p-6`}><div className={`flex flex-col items-center gap-3 text-center`}><D/>{cli ? null : <p className={`text-[13px] text-muted-foreground`}>{r(`lead`)}</p>}</div><I1 fallback=<Q1Component/>>{cli ? <FeComponent userCode={cli}/> : <DeComponent returnTo={returnTo} error={error}/>}</I1>{cli ? null : <p className={`text-center text-[11px] leading-relaxed text-muted-foreground`}>{r(`privacy`)}</p>}</div></main>;
}
