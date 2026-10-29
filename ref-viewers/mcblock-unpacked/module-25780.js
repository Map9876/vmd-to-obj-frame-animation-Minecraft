import "./module-86897.js";
import _s from "./module-52619.js";
import { Suspense, useEffect, useState } from "./module-61426.js";
import { getSession, signIn } from "./module-36489.js";
import { $ } from "./module-80645_2.js";
import { v as v_1 } from "./module-52857.js";
import * as w from "./module-24048_2.js";
const i = require(20063);
const c = require(30674);
const x = require(62371);
const m = require(72747);
const b = require(2149);
const u = require(21258);
const p = require(26545);
const h = require(47522);
const g = require(68595);
const f = require(51750);
const v = require(97003);
const y = require(44460);
function NComponent() {
    i.useRouter();
    let e = i.useSearchParams();
    let [t, setT] = useState("");
    let [s, setS] = useState("");
    let [k, setK] = useState("");
    let [C, setC] = useState("");
    let [key, setKey] = useState(0);
    let [E, setE] = useState(false);
    let [q, setQ] = useState(false);
    let [P, setP] = useState(false);
    let [U, setU] = useState("password");
    let [F, setF] = useState(false);
    let [R, setR] = useState(0);
    let [L, setL] = useState(false);
    let { waiting, openOAuth, cancelOAuth } = v_1(e.get("callbackUrl"));
    let [W, setW] = useState({});
    useEffect(()=>{
        setL(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }, []);
    useEffect(()=>{
        if (e.get("registered") === "true") {
            return void setW({
                general: "注册成功！请登录"
            });
        }
        let t = e.get("error");
        if (t) {
            setW({
                general: {
                    OAuthCallback: "第三方登录失败，请重试或使用邮箱登录",
                    OAuthSignin: "第三方登录初始化失败，请稍后重试",
                    OAuthCreateAccount: "无法创建账户，请稍后重试",
                    Callback: "登录回调失败，请重试",
                    CredentialsSignin: "邮箱或密码错误，请检查后重试",
                    SessionRequired: "请先登录"
                }[t] || t || "登录失败，请稍后重试"
            });
        }
    }, [
        e
    ]);
    useEffect(()=>{
        let e = localStorage.getItem("rememberedEmail");
        if (e) {
            setT(e);
            setE(true);
        }
    }, []);
    let H = (e)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    function K() {
        let e = Math.random().toString(36).substring(2) + Date.now().toString(36);
        document.cookie = `mcb_oauth_state=${e}; path=/; max-age=600; samesite=lax`;
        return e;
    }
    useEffect(()=>{
        if (R > 0) {
            let e = setTimeout(()=>setR(R - 1), 1000);
            return ()=>clearTimeout(e);
        }
    }, [
        R
    ]);
    let onSubmit = async (r)=>{
        r.preventDefault();
        setW({});
        let a = {};
        if (t) {
            if (!H(t)) {
                a.email = "请输入有效的邮箱地址";
            }
        } else {
            a.email = "请输入邮箱地址";
        }
        if (U === "password") {
            if (s) {
                if (s.length < 6) {
                    a.password = "密码至少需要6个字符";
                }
            } else {
                a.password = "请输入密码";
            }
        } else {
            if (k) {
                if (k.length !== 6) {
                    a.code = "请输入6位验证码";
                }
            } else {
                a.code = "请输入验证码";
            }
            if (!C || C.length < 3) {
                a.code = "请输入图形验证码";
            }
        }
        if (Object.keys(a).length > 0) {
            return void setW(a);
        }
        setP(true);
        try {
            if (U === "password") {
                let r = await signIn("credentials", {
                    email: t,
                    password: s,
                    redirect: false
                });
                if (r?.error) {
                    setW({
                        general: {
                            CredentialsSignin: "邮箱或密码错误，请检查后重试",
                            OAuthCallback: "第三方登录失败，请使用邮箱登录",
                            OAuthSignin: "登录失败，请稍后重试",
                            OAuthCreateAccount: "无法创建账户，请稍后重试"
                        }[r.error] || r.error || "登录失败，请稍后重试"
                    });
                } else if (r?.ok) {
                    let r;
                    if (E) {
                        localStorage.setItem("rememberedEmail", t);
                    } else {
                        localStorage.removeItem("rememberedEmail");
                    }
                    await new Promise((resolve)=>setTimeout(resolve, 500));
                    let a = await getSession();
                    if (a?.user?.role === "admin") {
                        let t = e.get("callbackUrl");
                        r = t?.startsWith("/admin") ? t : "/admin";
                    } else {
                        r = e.get("callbackUrl") || "/";
                    }
                    window.location.href = r;
                }
            } else {
                let r = await fetch("/api/auth/login-with-code", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: t,
                        code: k,
                        captcha: C
                    })
                });
                let a = await r.json();
                if (r.ok) {
                    let r;
                    if (E) {
                        localStorage.setItem("rememberedEmail", t);
                    } else {
                        localStorage.removeItem("rememberedEmail");
                    }
                    await new Promise((resolve)=>setTimeout(resolve, 500));
                    let a = await getSession();
                    if (a?.user?.role === "admin") {
                        let t = e.get("callbackUrl");
                        r = t?.startsWith("/admin") ? t : "/admin";
                    } else {
                        r = e.get("callbackUrl") || "/";
                    }
                    window.location.href = r;
                } else {
                    setW({
                        general: a.error || "登录失败，请稍后重试"
                    });
                    if (a?.code === "CAPTCHA_INVALID") {
                        setC("");
                        setKey((e)=>e + 1);
                    }
                }
            }
        } catch (error) {
            console.error("登录错误:", error);
            setW({
                general: "登录失败，请稍后重试"
            });
        } finally{
            setP(false);
        }
    };
    let onClick = async ()=>{
        setW({});
        if (!t) {
            return void setW({
                email: "请输入邮箱地址"
            });
        }
        if (!H(t)) {
            return void setW({
                email: "请输入有效的邮箱地址"
            });
        }
        try {
            let e = await fetch("/api/auth/send-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: t
                })
            });
            let r = await e.json();
            if (e.ok) {
                setF(true);
                setR(60);
                if (r.code) {
                    console.log("📧 验证码:", r.code);
                }
            } else if (e.status === 429) {
                setW({
                    general: r.error || "发送过于频繁，请稍后再试"
                });
            } else {
                setW({
                    general: r.error || "发送失败，请稍后重试"
                });
            }
        } catch (error) {
            console.error("发送验证码失败:", error);
            setW({
                general: "发送失败，请稍后重试"
            });
        }
    };
    return <c.AuthLayout><div className="w-full max-w-[420px] mx-auto bg-bg-card border-2 border-border-hard border-t-4 border-t-brand-primary shadow-block p-7 max-sm:p-5"><div className="text-center mb-5 max-sm:mb-3"><h1 className="text-2xl max-sm:text-xl font-extrabold text-text-primary mb-1.5">欢迎回来</h1><p className="text-[13px] max-sm:text-xs text-text-secondary font-semibold">登录后同步收藏与学习进度</p></div><><div className="flex gap-3 mb-4"><v.$ type="button" onClick={()=>{
        if (/MicroMessenger/i.test(navigator.userAgent)) {
            return void setW({
                general: "微信内浏览器暂不支持直接授权，请使用邮箱或验证码登录"
            });
        }
        let e = K();
        let t = encodeURIComponent("https://mcblock.top/api/auth/wechat-login");
        openOAuth("wechat", `https://open.weixin.qq.com/connect/qrconnect?appid=wxd5c2b684b90e6366&redirect_uri=${t}&response_type=code&scope=snsapi_login&state=${e}#wechat_redirect`);
    }} disabled={waiting !== null} variant="platform" platform="wechat" size="lg" className="min-w-0 flex-1">{waiting === "wechat" ? <><f.y size="xs"/> 等待微信授权...</> : <><x.A size={18}/> 微信登录</>}</v.$><v.$ type="button" onClick={()=>{
        let e = encodeURIComponent(`${window.location.origin}/api/auth/qq-login`);
        let t = K();
        openOAuth("qq", `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=102810788&redirect_uri=${e}&state=${t}&scope=get_user_info`);
    }} disabled={waiting !== null} variant="platform" platform="qq" size="lg" className="min-w-0 flex-1">{waiting === "qq" ? <><f.y size="xs"/> 等待 QQ 授权...</> : <><m.A size={18}/> QQ登录</>}</v.$></div>{waiting && <div className="mb-4 -mt-1 flex flex-wrap items-center justify-center gap-1 text-center text-[11px] font-bold text-text-muted"><span>已打开{waiting === "wechat" ? "微信" : " QQ "}授权窗口，请在新窗口完成登录</span><v.$ type="button" onClick={cancelOAuth} variant="ghost" size="md">取消</v.$></div>}<div className="relative mb-4"><div className="w-full border-t border-border-soft"/><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3.5 bg-bg-card text-text-muted text-[11px] font-bold whitespace-nowrap">或使用邮箱</span></div></><form onSubmit={onSubmit}><div className="mb-3"><label className="block text-xs text-text-secondary font-bold uppercase tracking-wide mb-1.5">邮箱地址</label><div className="relative"><input type="email" value={t} onChange={(e)=>setT(e.target.value)} className={`w-full h-11 px-3.5 pr-9 bg-bg-inset border-2 ${W.email ? "border-error" : "border-border-hard"} text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors`} placeholder="your@email.com"/><b.A size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"/></div>{W.email && <p className="mt-1 text-xs text-error font-bold">{W.email}</p>}</div><w.I value={U} onValueChange={(e)=>setU(e)} size="md" label="登录方式" className="mb-3 w-full"><w.d value="password" className="flex-1">密码登录</w.d><w.d value="code" className="flex-1">验证码登录</w.d></w.I>{U === "password" && <div className="mb-3"><label className="block text-xs text-text-secondary font-bold uppercase tracking-wide mb-1.5">密码</label><div className="relative"><input type={q ? "text" : "password"} value={s} onChange={(e)=>setS(e.target.value)} className={`w-full h-11 px-3.5 pr-9 bg-bg-inset border-2 ${W.password ? "border-error" : "border-border-hard"} text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors`} placeholder="请输入密码"/><y.K type="button" onClick={()=>setQ(!q)} label={q ? "隐藏密码" : "显示密码"} size="md" variant="ghost" className="absolute right-0 top-1/2 -translate-y-1/2 border-transparent text-text-muted shadow-none hover:text-text-secondary">{q ? <u.A size={13}/> : <p.A size={13}/>}</y.K></div>{W.password && <p className="mt-1 text-xs text-error font-bold">{W.password}</p>}</div>}{U === "code" && <div className="mb-3"><label className="block text-xs text-text-secondary font-bold uppercase tracking-wide mb-1.5">验证码</label><div className="flex gap-2"><input type="text" value={k} onChange={(e)=>setK(e.target.value)} maxLength={6} className={`flex-1 h-11 px-3.5 bg-bg-inset border-2 ${W.code ? "border-error" : "border-border-hard"} text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors`} placeholder="6位验证码"/><v.$ type="button" onClick={onClick} disabled={R > 0 || !t} variant="secondary" size="md" className="px-4">{R > 0 ? `${R}秒` : F ? "重发" : "发送"}</v.$></div>{W.code && <p className="mt-1 text-xs text-error font-bold">{W.code}</p>}{F && !W.code && <p className="mt-1 text-xs text-success font-bold">验证码已发送，请查收邮件</p>}<div className="mt-4"><$ key={key} value={C} onChange={setC}/></div></div>}{U === "password" && <div className="flex items-center justify-between mb-4"><label className="flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={E} onChange={(e)=>setE(e.target.checked)} className="peer sr-only"/><span aria-hidden="true" className={`flex h-5 w-5 flex-shrink-0 items-center justify-center border-2 border-border-hard peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-primary ${E ? "bg-brand-primary" : "bg-bg-inset"}`}>{E && <h.A size={14} className="text-text-on-brand"/>}</span><span className="text-[13px] text-text-secondary font-semibold">记住我</span></label><_s href="/forgot-password" className="text-[13px] text-brand-primary font-bold hover:text-brand-primary-light transition-colors">忘记密码？</_s></div>}{U === "code" && <div className="mb-4"/>}{W.general && <div className={`mb-4 p-3 border-2 ${W.general.includes("成功") ? "bg-success/10 border-success" : "bg-error/10 border-error"}`}><p className={`text-sm font-bold ${W.general.includes("成功") ? "text-success" : "text-error"}`}>{W.general}</p></div>}<v.$ type="submit" disabled={P} variant="primary" size="lg" className="w-full">{P ? <><f.y size="xs"/>登录中...</> : <>{U === "password" ? "登录" : "验证码登录"}<g.A size={13}/></>}</v.$></form><p className="mt-4 text-center text-[13px] text-text-secondary font-semibold">还没有账号？ <_s href="/register" className="text-brand-primary font-extrabold hover:text-brand-primary-light transition-colors">立即注册</_s></p></div></c.AuthLayout>;
}
function KComponent() {
    return <Suspense fallback=<div className="h-screen flex items-center justify-center bg-bg-primary"><f.y size="md"/></div>><NComponent/></Suspense>;
}
export { KComponent as default };
