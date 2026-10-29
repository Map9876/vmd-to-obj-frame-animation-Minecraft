import { b, g as g_2, v, y } from "./parts-DB0m3djM/chunk_g.js";
import { S } from "./parts-DB0m3djM/chunk_re.js";
import { T } from "./parts-DB0m3djM/chunk_w.js";
import { U, de, fe, pe } from "./parts-DB0m3djM/chunk_le.js";
import { n, s as s_1, t } from "./jsx-runtime-Db0DjQYK.js";
import { c, f } from "./keys-CMeqocw_.js";
import { g as g_1 } from "./session-BGIR8kU0.js";
import { i as i_1, n as n_2 } from "./react-LvWBhTF7.js";
import { r, t as t_2 } from "./browser-I-D20JeN.js";
import { t as t_3 } from "./utils-B6KiDbIe.js";
import { t as D1 } from "./copy-Cb6l5SEl.js";
import { Lt, Qt, er as M1, mr as Ee, x as H1 } from "./index-DmN1rqCo.js";
function x(e) {
    if (e.granted) {
        return `start`;
    }
    if (!e.known || e.activating) {
        return `wait`;
    }
    return `upsell`;
}
function te(e) {
    let t = Math.max(0, Math.round(e));
    let hours = Math.floor(t / 60);
    let minutes = t % 60;
    return {
        key: hours === 0 ? `m` : minutes === 0 ? `h` : `hm`,
        hours,
        minutes
    };
}
function ne(e) {
    return Math.min(20, Math.round(1000 / Math.max(e, 1) * 10) / 10);
}
function ae(e, t) {
    if (!e.onlineAt) {
        return null;
    }
    let n = e.stoppedAt ? Date.parse(e.stoppedAt) : t;
    return Math.max(0, Math.round((n - Date.parse(e.onlineAt)) / 60000));
}
function oe(e) {
    return e.leftMinutes < 60;
}
function se({ dimensions }, t) {
    if (dimensions && (dimensions.x > 256 || dimensions.z > 256)) {
        return {
            kind: `tooLarge`
        };
    }
    if (t && t.leftMinutes < 5) {
        return {
            kind: `allowance`,
            resetsAt: t.resetsAt
        };
    }
    return null;
}
export function O(e, { replace }) {
    if (!(e instanceof t_2)) {
        return {
            kind: `unknown`
        };
    }
    switch(e.status){
        case 402:
            return {
                kind: `notEntitled`
            };
        case 403:
            {
                if (e.code !== `allowance_used`) {
                    return {
                        kind: `unknown`
                    };
                }
                let t = e.body?.resetsAt;
                return {
                    kind: `allowanceUsed`,
                    resetsAt: typeof t == `string` ? t : null
                };
            }
        case 409:
            if (e.code === `already_running`) {
                return {
                    kind: replace ? `replaceRefused` : `alreadyRunning`
                };
            }
            if (e.code === `not_ready`) {
                return {
                    kind: `notReady`
                };
            }
            return {
                kind: `unknown`
            };
        case 422:
            if (e.code === `too_large`) {
                return {
                    kind: `tooLarge`
                };
            }
            if (e.code === `version_unavailable`) {
                return {
                    kind: `versionUnavailable`
                };
            }
            return {
                kind: `unknown`
            };
        case 503:
            {
                let t = e.body;
                return {
                    kind: e.code === `no_capacity` ? `noCapacity` : `unavailable`,
                    previousStopped: t?.previousStopped === true
                };
            }
        default:
            return {
                kind: `unknown`
            };
    }
}
function E(e) {
    return e.stopReason ?? (e.state === `failed` ? `error` : `host`);
}
const D = new Set([
    `stopping`,
    `stopped`,
    `failed`
]);
export function w(e, server, n, r) {
    if (!server) {
        return {
            next: null,
            events: []
        };
    }
    let i = e?.id === server.id ? e : null;
    let events = [];
    let stopAnnounced = i?.stopAnnounced ?? false;
    if (i?.state === `starting` && server.state === `online`) {
        events.push({
            kind: `ready`,
            server
        });
    }
    if (i && !stopAnnounced && v(i.state) && server.state !== i.state && D.has(server.state)) {
        stopAnnounced = true;
        events.push({
            kind: `stopped`,
            server,
            reason: E(server)
        });
    }
    let s = server.state === `online` && server.nextStop?.reason === `allowance` ? Date.parse(server.nextStop.at) - n : null;
    if (s !== null && s <= 600000 && !r.has(server.id)) {
        r.add(server.id);
        events.push({
            kind: `allowanceSoon`,
            server,
            minutesLeft: Math.max(0, Math.ceil(s / 60000))
        });
    }
    return {
        next: {
            id: server.id,
            state: server.state,
            stopAnnounced
        },
        events
    };
}
async function k() {
    try {
        return await r(`/test-servers/current`);
    } catch (error) {
        if (error instanceof t_2 && error.status === 404) {
            return null;
        }
        throw error;
    }
}
function A() {
    return r(`/test-servers/allowance`);
}
function j() {
    return r(`/test-servers`);
}
function M(e) {
    return r(`/test-servers`, {
        method: `POST`,
        headers: {
            "content-type": `application/json`
        },
        body: JSON.stringify(e)
    });
}
function N(e) {
    return r(`/test-servers/${e}/stop`, {
        method: `POST`
    });
}
const P = [
    `test-servers`
];
const F = [
    `test-servers`,
    `current`
];
const I = [
    `test-servers`,
    `allowance`
];
const L = [
    `test-servers`,
    `recent`
];
export function h() {
    return c({
        queryKey: F,
        queryFn: k,
        enabled: Qt(),
        staleTime: 2000,
        refetchInterval: (e)=>b(e.state.data),
        refetchOnWindowFocus: true,
        retry: false
    });
}
function z(e) {
    return c({
        queryKey: I,
        queryFn: A,
        enabled: Qt() && e,
        staleTime: 0,
        retry: false
    });
}
export function g(e) {
    return c({
        queryKey: L,
        queryFn: j,
        enabled: Qt() && e,
        staleTime: 0,
        retry: false
    });
}
function V() {
    let e = f();
    return (t)=>{
        if (t) {
            e.setQueryData(F, t);
        }
        return e.invalidateQueries({
            queryKey: P
        });
    };
}
export function _() {
    let e = V();
    return g_1({
        mutationFn: (e)=>M(e),
        onSuccess: (t)=>e(t),
        onError: ()=>e()
    });
}
function ce() {
    let e = V();
    return g_1({
        mutationFn: (e)=>N(e),
        onSuccess: (t)=>e(t),
        onError: ()=>e()
    });
}
const q = t();
function MeComponent({ children, fallback }) {
    return <H1 namespaces={[
        `TestServer`
    ]} fallback={fallback}>{children}</H1>;
}
export const i = {
    starting: {
        strip: `border-[#efd9b0] bg-[#fbf1df] dark:border-[#4a3a1c] dark:bg-[#2a2112]`,
        dot: `bg-[#a86a00] ring-[#a86a00]/20 dark:bg-[#f0b45a] dark:ring-[#f0b45a]/20`
    },
    online: {
        strip: `border-[#cfe3b6] bg-[#eef5e4] dark:border-[#2f3d22] dark:bg-[#1c2614]`,
        dot: `bg-[#4f7a17] ring-[#4f7a17]/20 dark:bg-[#9bd35a] dark:ring-[#9bd35a]/20`
    },
    stopping: {
        strip: `border-border bg-muted`,
        dot: `bg-muted-foreground ring-muted-foreground/20`
    }
};
function HeComponent({ state, className }) {
    return <span aria-hidden className={t_3(`inline-block size-2 shrink-0 rounded-full ring-4`, i[state].dot, state === `starting` && `animate-pulse`, className)}/>;
}
function useGe(e = true) {
    let [t, setT] = U.useState(()=>Date.now());
    U.useEffect(()=>{
        if (!e) {
            return;
        }
        setT(Date.now());
        let t = setInterval(()=>setT(Date.now()), 1000);
        return ()=>clearInterval(t);
    }, [
        e
    ]);
    return t;
}
export function s() {
    let e = i_1(`TestServer.duration`);
    return (t)=>{
        let n = te(t);
        return e(n.key, {
            hours: n.hours,
            minutes: n.minutes
        });
    };
}
function _e() {
    let e = n_2();
    return (t)=>e.dateTime(new Date(t), {
            day: `numeric`,
            month: `short`,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
}
function useX(e) {
    let t = e.state === `online` ? e.onlineAt : null;
    let [n, setN] = U.useState(()=>Date.now());
    U.useEffect(()=>{
        if (!t) {
            return;
        }
        let e;
        let n = ()=>{
            let i = Date.now();
            setN(i);
            let a = Math.max(0, i - Date.parse(t));
            e = setTimeout(n, 60000 - a % 60000);
        };
        n();
        return ()=>clearTimeout(e);
    }, [
        t
    ]);
    return n;
}
const ZComponent = (e)=><span className={`font-semibold text-foreground`}>{e}</span>;
function QComponent({ server, surface, className }) {
    let r = i_1(`TestServer`);
    let i = s();
    let a = S(server, surface, useX(server));
    return <span className={t_3(`text-foreground-secondary tabular-nums`, className)}>{a ? r.rich(a.key, {
        time: i(a.minutes),
        b: ZComponent
    }) : ZComponent(r(surface === `bar` ? `status.${server.state}` : `status.${server.state}Short`))}</span>;
}
function useVe(e, surface) {
    let n = i_1(`TestServer`);
    let [copied, setCopied] = U.useState(null);
    let aRef = U.useRef(undefined);
    U.useEffect(()=>()=>clearTimeout(aRef.current), []);
    return {
        copied,
        copy: U.useCallback(async (what)=>{
            await d(what === `address` ? e.address : n(`invite`, {
                address: e.address,
                version: g_2
            }));
            Lt(`test_server_address_copied`, {
                surface,
                what
            });
            setCopied(what);
            clearTimeout(aRef.current);
            aRef.current = setTimeout(()=>setCopied(null), 1600);
        }, [
            e.address,
            surface,
            n
        ])
    };
}
export async function d(e) {
    try {
        await navigator.clipboard.writeText(e);
    } catch  {}
}
function YeComponent({ copied, onClick, label, className, primary, iconOnly }) {
    let s = i_1(`TestServer`);
    let c = copied ? s(`copied`) : label;
    return <M1 variant={`outline`} size={`sm`} onClick={onClick} aria-label={iconOnly ? c : undefined} title={iconOnly ? c : undefined} className={t_3(`h-7 rounded-none text-[12px]`, iconOnly ? `w-7 px-0` : `px-2.5`, primary && `border-primary/70 dark:border-primary/70`, className)}>{copied ? <Ee/> : <D1/>}{!iconOnly && c}<span className={`sr-only`} aria-live={`polite`}>{copied ? s(`copied`) : ``}</span></M1>;
}
export { ne as A, y as C, se as D, T as E, x as S, ae as T, MeComponent as a, g_2 as b, useGe as c, fe as f, S as j, E as k, _e as l, de as m, HeComponent as n, useVe as o, pe as p, QComponent as r, YeComponent as t, useX as u, ce as v, oe as x, z as y };
