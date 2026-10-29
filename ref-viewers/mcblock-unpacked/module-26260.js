import "./module-86897.js";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "./module-61426.js";
import { getSession, signIn, useSession } from "./module-36489.js";
import { A as A_1 } from "./module-45201.js";
import * as o from "./module-71442.js";
import _d from "./module-52619.js";
import { $ as $_1 } from "./module-80645.js";
import * as w from "./module-24048.js";
const i = require(20063);
const x = require(51750);
const b = require(2149);
const m = require(21258);
const h = require(26545);
const p = require(68595);
const f = require(62371);
const g = require(72747);
const v = require(97003);
const y = require(44460);
let j = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function NComponent({ onSuccess, onNavigate, callbackUrl }) {
    let o = i.useRouter();
    let [d, setD] = useState("");
    let [k, setK] = useState("");
    let [S, setS] = useState("");
    let [E, setE] = useState("");
    let [key, setKey] = useState(0);
    let [T, setT] = useState(false);
    let [$, set$] = useState("password");
    let [R, setR] = useState(false);
    let [_, set_] = useState(0);
    let [O, setO] = useState(false);
    let [F, setF] = useState(null);
    useEffect(()=>{
        let e = localStorage.getItem("rememberedEmail");
        if (e) {
            setD(e);
        }
    }, []);
    useEffect(()=>{
        if (_ > 0) {
            let e = setTimeout(()=>set_(_ - 1), 1000);
            return ()=>clearTimeout(e);
        }
    }, [
        _
    ]);
    let onClick = async ()=>{
        setF(null);
        if (!d || !j.test(d)) {
            return void setF("请输入有效的邮箱地址");
        }
        try {
            let e = await fetch("/api/auth/send-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: d
                })
            });
            let t = await e.json();
            if (!e.ok) {
                return void setF(t.error || (e.status === 429 ? "发送过于频繁，请稍后再试" : "发送失败，请稍后重试"));
            }
            setR(true);
            set_(60);
        } catch (e) {
            setF("发送失败，请稍后重试");
        }
    };
    let M = async ()=>{
        localStorage.setItem("rememberedEmail", d);
        await new Promise((resolve)=>setTimeout(resolve, 400));
        await getSession();
        onSuccess();
    };
    let onSubmit = async (e)=>{
        e.preventDefault();
        setF(null);
        if (!d || !j.test(d)) {
            return void setF("请输入有效的邮箱地址");
        }
        if ($ === "password") {
            if (!k || k.length < 6) {
                return void setF("密码至少需要 6 个字符");
            }
        } else {
            if (!S || S.length !== 6) {
                return void setF("请输入 6 位验证码");
            }
            if (!E || E.length < 3) {
                return void setF("请输入图形验证码");
            }
        }
        setO(true);
        try {
            if ($ === "password") {
                let e = await signIn("credentials", {
                    email: d,
                    password: k,
                    redirect: false
                });
                if (e?.error) {
                    setF(e.error === "CredentialsSignin" ? "邮箱或密码错误，请检查后重试" : "登录失败，请稍后重试");
                } else if (e?.ok) {
                    await M();
                }
            } else {
                let e = await fetch("/api/auth/login-with-code", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: d,
                        code: S,
                        captcha: E
                    })
                });
                let t = await e.json();
                if (e.ok) {
                    await M();
                } else {
                    setF(t.error || "登录失败，请稍后重试");
                    if (t?.code === "CAPTCHA_INVALID") {
                        setE("");
                        setKey((e)=>e + 1);
                    }
                }
            }
        } catch (e) {
            setF("登录失败，请稍后重试");
        } finally{
            setO(false);
        }
    };
    return <form onSubmit={onSubmit} className="space-y-3"><div className="relative"><input type="email" value={d} onChange={(e)=>setD(e.target.value)} autoComplete="email" className="h-11 w-full border-2 border-border-hard bg-bg-elevated px-3.5 pr-9 text-sm font-medium text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-primary" placeholder="邮箱地址"/><b.A size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"/></div>{$ === "password" && <div className="relative"><input type={T ? "text" : "password"} value={k} onChange={(e)=>setK(e.target.value)} autoComplete="current-password" className="h-11 w-full border-2 border-border-hard bg-bg-elevated px-3.5 pr-9 text-sm font-medium text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-primary" placeholder="密码"/><y.K type="button" onClick={()=>setT(!T)} label={T ? "隐藏密码" : "显示密码"} size="md" variant="ghost" className="absolute right-0 top-1/2 -translate-y-1/2 border-transparent text-text-muted shadow-none hover:text-text-secondary">{T ? <m.A size={13}/> : <h.A size={13}/>}</y.K></div>}{$ === "code" && <div className="space-y-3"><div><div className="flex gap-2"><input type="text" value={S} onChange={(e)=>setS(e.target.value)} maxLength={6} className="flex-1 h-11 px-3.5 bg-bg-elevated border-2 border-border-hard text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors" placeholder="邮箱验证码"/><v.$ type="button" onClick={onClick} disabled={_ > 0 || !d} variant="secondary" size="md" className="px-4">{_ > 0 ? `${_}秒` : R ? "重发" : "发送"}</v.$></div>{R && <p className="mt-1 text-xs text-success font-bold">验证码已发送，请查收邮件</p>}</div><$_1 key={key} value={E} onChange={setE}/></div>}<div className="space-y-2"><w.I value={$} onValueChange={(e)=>{
        set$(e);
        setF(null);
    }} size="md" label="登录方式" className="w-full"><w.d value="password" className="flex-1">密码登录</w.d><w.d value="code" className="flex-1">验证码登录</w.d></w.I><_d href="/forgot-password" onClick={()=>onNavigate?.()} className="inline-flex min-h-11 items-center text-xs font-bold text-text-muted transition-colors hover:text-text-primary">忘记密码？</_d></div>{F && <div className="p-2.5 bg-error/10 border-2 border-error text-sm font-bold text-error">{F}</div>}<v.$ type="submit" disabled={O} variant="primary" size="lg" className="w-full">{O ? <><x.y size="xs"/> 登录中...</> : <>{$ === "password" ? "登录" : "验证码登录"} <p.A size={13}/></>}</v.$><div className="pt-1 flex items-center justify-between text-[12px] text-text-secondary font-semibold"><v.$ type="button" onClick={()=>{
        let e = callbackUrl || window.location.pathname + window.location.search;
        onNavigate?.();
        o.push(`/login?callbackUrl=${encodeURIComponent(e)}`);
    }} variant="ghost" size="md"><f.A size={15} className="text-platform-wechat"/><g.A size={15} className="text-platform-qq"/>微信 / QQ 登录</v.$><_d href="/register" onClick={()=>onNavigate?.()} className="text-brand-primary font-extrabold hover:text-brand-primary-light">注册账号</_d></div></form>;
}
let KContext = createContext({
    requireLogin: ()=>true,
    promptLogin: ()=>{}
});
export function E() {
    return useContext(KContext);
}
function SComponent({ children }) {
    let { status } = useSession();
    let [i, setI] = useState(false);
    let [c, setC] = useState(null);
    let [b, setB] = useState(null);
    let [callbackUrl, setCallbackUrl] = useState("/");
    let [f, setF] = useState(false);
    let [v, setV] = useState(null);
    let wRef = useRef(null);
    let j = useCallback(function(e, _param_1, s = "precheck") {
        let n = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
        setC(e?.action ?? null);
        setB(e?.description ?? null);
        setCallbackUrl(e?.callbackUrl ?? window.location.pathname + window.location.search);
        wRef.current = e?.onSuccess ?? null;
        setF(n);
        setV(s);
        setI(true);
    }, []);
    let promptLogin = useCallback((e)=>{
        j(e, false, "unauthorized");
    }, [
        j
    ]);
    let requireLogin = useCallback((e)=>status === "authenticated" || (status === "unauthenticated" ? (j(e, false, "precheck"), false) : e == null || !e.strict || (j(e, true, "checking"), false)), [
        status,
        j
    ]);
    useEffect(()=>{
        if (!i || f || v !== "precheck" || status !== "authenticated") {
            return;
        }
        let wRef_current = wRef.current;
        wRef.current = null;
        setV(null);
        setI(false);
        wRef_current?.();
    }, [
        i,
        f,
        v,
        status
    ]);
    useEffect(()=>{
        if (f) {
            if (status === "authenticated") {
                let e = wRef.current;
                wRef.current = null;
                setF(false);
                setV(null);
                setI(false);
                e?.();
                return;
            }
            if (status === "unauthenticated") {
                setF(false);
                setV("precheck");
            }
        }
    }, [
        f,
        status
    ]);
    let z = useCallback(()=>{
        wRef.current = null;
        setF(false);
        setV(null);
        setI(false);
    }, []);
    let onSuccess = useCallback(()=>{
        let wRef_current = wRef.current;
        wRef.current = null;
        setF(false);
        setV(null);
        setI(false);
        wRef_current?.();
    }, []);
    let value = useMemo(()=>({
            requireLogin,
            promptLogin
        }), [
        requireLogin,
        promptLogin
    ]);
    let A = f && status === "loading";
    return <KContext.Provider value={value}>{children}<o.a open={i} onClose={z} title={c ? `『${c}』需要登录` : "登录后继续"} subtitle={b ?? "登录后自动继续当前操作 · 全部功能免费"} icon=<A_1 size={19}/> iconTone="brand" size="md">{A ? <div className="flex items-center justify-center gap-2 h-12 bg-bg-elevated border-2 border-border-hard text-sm font-bold text-text-secondary"><x.y size="sm"/>正在确认登录状态...</div> : <NComponent onSuccess={onSuccess} onNavigate={z} callbackUrl={callbackUrl}/>}</o.a></KContext.Provider>;
}
export { SComponent as m };
