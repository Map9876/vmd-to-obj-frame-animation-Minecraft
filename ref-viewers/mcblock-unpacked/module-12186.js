import "./module-86897.js";
import _a from "./module-52619.js";
import { Suspense, useEffect, useState } from "./module-61426.js";
import { signIn } from "./module-36489.js";
import { sendGAEvent } from "./module-76784.js";
import { A as A_1 } from "./module-65633_2.js";
import { A as A_2 } from "./module-10885.js";
import { v as v_1 } from "./module-52857.js";
const i = require(20063);
const d = require(30674);
const x = require(62371);
const m = require(72747);
const b = require(47522);
const p = require(2149);
const u = require(68595);
const g = require(21258);
const f = require(26545);
const j = require(49294);
const v = require(51750);
const w = require(97003);
const k = require(44460);
function Z1Component() {
    let e = i.useSearchParams();
    let [t, setT] = useState(1);
    let [a, setA] = useState("");
    let [C, setC] = useState("");
    let [A, setA_1] = useState("");
    let [q, setQ] = useState("");
    let [M, setM] = useState(false);
    let [P, setP] = useState(false);
    let [T, setT_1] = useState(false);
    let [Q, setQ_1] = useState(false);
    let [U, setU] = useState(false);
    let [J, setJ] = useState(0);
    let [Z, setZ] = useState("");
    let [L, setL] = useState(0);
    let [B, setB] = useState(false);
    let [formStartTime] = useState(Date.now());
    let { waiting, openOAuth, cancelOAuth } = v_1(e.get("callbackUrl"));
    let [ee, setEe] = useState({});
    function er() {
        let e = Math.random().toString(36).substring(2) + Date.now().toString(36);
        document.cookie = `mcb_oauth_state=${e}; path=/; max-age=600; samesite=lax`;
        return e;
    }
    useEffect(()=>{
        let e;
        setJ((e = 0, A.length >= 8 && (e += 20), A.length >= 12 && (e += 10), A.length >= 16 && (e += 10), /[a-z]/.test(A) && (e += 10), /[A-Z]/.test(A) && (e += 15), /[0-9]/.test(A) && (e += 15), /[^a-zA-Z0-9]/.test(A) && (e += 20), Math.min(e, 100)));
    }, [
        A
    ]);
    useEffect(()=>{
        if (L > 0) {
            let e = setTimeout(()=>setL(L - 1), 1000);
            return ()=>clearTimeout(e);
        }
    }, [
        L
    ]);
    let es = async (e)=>{
        e.preventDefault();
        setEe({});
        let t = {};
        if (A) {
            if (A.length < 8) {
                t.password = "密码至少需要8个字符";
            }
        } else {
            t.password = "请输入密码";
        }
        if (q) {
            if (A !== q) {
                t.confirmPassword = "两次输入的密码不一致";
            }
        } else {
            t.confirmPassword = "请确认密码";
        }
        if (!(T && Q)) {
            t.terms = "请阅读并同意使用条款和隐私政策";
        }
        if (Object.keys(t).length > 0) {
            return void setEe(t);
        }
        setU(true);
        try {
            let e = await fetch("/api/auth/send-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: C,
                    type: "register"
                })
            });
            let t = await e.json();
            if (e.ok) {
                setB(true);
                setL(60);
                setT(3);
                if (t.code) {
                    console.log("📧 验证码:", t.code);
                }
            } else if (e.status === 429) {
                setEe({
                    general: t.error || "发送过于频繁，请稍后再试"
                });
            } else {
                setEe({
                    general: t.error || "发送验证码失败，请稍后重试"
                });
            }
        } catch (error) {
            console.error("发送验证码失败:", error);
            setEe({
                general: "发送验证码失败，请稍后重试"
            });
        } finally{
            setU(false);
        }
    };
    let onClick = async ()=>{
        setEe({});
        try {
            let e = await fetch("/api/auth/send-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: C,
                    type: "register"
                })
            });
            let t = await e.json();
            if (e.ok) {
                setL(60);
                if (t.code) {
                    console.log("📧 验证码:", t.code);
                }
            } else if (e.status === 429) {
                setEe({
                    general: t.error || "发送过于频繁，请稍后再试"
                });
            } else {
                setEe({
                    general: t.error || "发送失败，请稍后重试"
                });
            }
        } catch (error) {
            console.error("发送验证码失败:", error);
            setEe({
                general: "发送失败，请稍后重试"
            });
        }
    };
    let en = async (e)=>{
        e.preventDefault();
        setEe({});
        if (Z) {
            if (Z.length !== 6) {
                return void setEe({
                    code: "请输入6位验证码"
                });
            }
            return void eo();
        }
        setEe({
            code: "请输入验证码"
        });
    };
    let eo = async ()=>{
        setU(true);
        try {
            let t = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: a,
                    email: C,
                    password: A,
                    verificationCode: Z,
                    formStartTime
                })
            });
            let r = await t.json();
            if (t.ok) {
                try {
                    let e = (e)=>document.cookie.match(new RegExp(`(?:^|; )${e}=([^;]*)`))?.[1];
                    sendGAEvent("event", "sign_up", {
                        method: "email",
                        utm_source: e("utm_source") || undefined,
                        utm_medium: e("utm_medium") || undefined,
                        utm_campaign: e("utm_campaign") || undefined
                    });
                } catch (e) {}
                let e = await signIn("credentials", {
                    email: C,
                    password: A,
                    redirect: false
                });
                if (e?.error) {
                    window.location.href = "/login?registered=true";
                } else {
                    window.location.href = "/";
                }
            } else {
                if (r.error?.includes("验证码")) {
                    setEe({
                        code: r.error
                    });
                } else {
                    setEe({
                        general: r.error || "注册失败"
                    });
                }
            }
        } catch (error) {
            console.error("注册请求错误:", error);
            setEe({
                general: "注册失败，请稍后重试"
            });
        } finally{
            setU(false);
        }
    };
    let el = J < 30 ? {
        label: "弱",
        color: "bg-error",
        textColor: "text-error"
    } : J < 50 ? {
        label: "一般",
        color: "bg-warning",
        textColor: "text-warning"
    } : J < 70 ? {
        label: "良好",
        color: "bg-info",
        textColor: "text-info"
    } : {
        label: "强",
        color: "bg-success",
        textColor: "text-success"
    };
    return <d.AuthLayout><div className="w-full max-w-[440px] mx-auto bg-bg-card border-2 border-border-hard border-t-4 border-t-brand-primary shadow-block p-7 max-sm:p-5"><div className="text-center mb-5 max-sm:mb-3"><h1 className="text-2xl max-sm:text-xl font-extrabold text-text-primary mb-1.5">{t === 1 ? "免费创建账号" : t === 2 ? "设置密码" : "验证邮箱"}</h1><p className="text-[13px] max-sm:text-xs text-text-secondary font-semibold">{t === 1 ? "注册解锁全平台功能，同步收藏与进度。" : t === 2 ? "设置一个安全的密码来保护你的账号。" : `验证码已发送至 ${C}`}</p></div>{t === 1 && <><div className="flex gap-3 mb-4"><w.$ type="button" onClick={()=>{
        if (/MicroMessenger/i.test(navigator.userAgent)) {
            return void setEe({
                general: "微信内浏览器暂不支持直接授权，请使用邮箱注册"
            });
        }
        let e = er();
        let t = encodeURIComponent("https://mcblock.top/api/auth/wechat-login");
        openOAuth("wechat", `https://open.weixin.qq.com/connect/qrconnect?appid=wxd5c2b684b90e6366&redirect_uri=${t}&response_type=code&scope=snsapi_login&state=${e}#wechat_redirect`);
    }} disabled={waiting !== null} variant="platform" platform="wechat" size="lg" className="min-w-0 flex-1">{waiting === "wechat" ? <><v.y size="xs"/> 等待微信授权...</> : <><x.A size={18}/> 微信注册</>}</w.$><w.$ type="button" onClick={()=>{
        let e = encodeURIComponent(`${window.location.origin}/api/auth/qq-login`);
        let t = er();
        openOAuth("qq", `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=102810788&redirect_uri=${e}&state=${t}&scope=get_user_info`);
    }} disabled={waiting !== null} variant="platform" platform="qq" size="lg" className="min-w-0 flex-1">{waiting === "qq" ? <><v.y size="xs"/> 等待 QQ 授权...</> : <><m.A size={18}/> QQ注册</>}</w.$></div>{waiting && <div className="mb-4 -mt-1 flex flex-wrap items-center justify-center gap-1 text-center text-[11px] font-bold text-text-muted"><span>已打开{waiting === "wechat" ? "微信" : " QQ "}授权窗口，请在新窗口完成注册</span><w.$ type="button" onClick={cancelOAuth} variant="ghost" size="md">取消</w.$></div>}<div className="relative mb-4"><div className="w-full border-t border-border-soft"/><span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3.5 bg-bg-card text-text-muted text-[11px] font-bold whitespace-nowrap">或使用邮箱注册</span></div></>}<div className="flex items-center justify-center gap-0 mb-5 max-sm:mb-3"><div className={`w-8 h-8 max-sm:w-7 max-sm:h-7 flex items-center justify-center text-sm max-sm:text-xs font-extrabold border-2 border-border-hard ${t === 1 ? "bg-brand-primary text-text-on-brand shadow-block" : "bg-success/20 text-success border-success"}`}>{t > 1 ? <b.A size={16} className="max-sm:w-3.5 max-sm:h-3.5"/> : "1"}</div><div className={`w-16 max-sm:w-10 h-[3px] ${t > 1 ? "bg-brand-primary" : "bg-bg-inset"}`}/><div className={`w-8 h-8 max-sm:w-7 max-sm:h-7 flex items-center justify-center text-sm max-sm:text-xs font-extrabold border-2 border-border-hard ${t === 2 ? "bg-brand-primary text-text-on-brand shadow-block" : t > 2 ? "bg-success/20 text-success border-success" : "bg-bg-inset text-text-secondary"}`}>{t > 2 ? <b.A size={16} className="max-sm:w-3.5 max-sm:h-3.5"/> : "2"}</div><div className={`w-16 max-sm:w-10 h-[3px] ${t > 2 ? "bg-brand-primary" : "bg-bg-inset"}`}/><div className={`w-8 h-8 max-sm:w-7 max-sm:h-7 flex items-center justify-center text-sm max-sm:text-xs font-extrabold border-2 border-border-hard ${t === 3 ? "bg-brand-primary text-text-on-brand shadow-block" : "bg-bg-inset text-text-secondary"}`}>3</div></div>{t === 1 && <form onSubmit={(e)=>{
        e.preventDefault();
        setEe({});
        let t = {};
        if (a) {
            let e = /^[a-zA-Z0-9_]{3,20}$/.test(a) ? /^\d+$/.test(a) ? {
                ok: false,
                reason: "用户名不能是纯数字，请加上字母或下划线"
            } : {
                ok: true
            } : {
                ok: false,
                reason: "用户名必须是 3-20 位字母、数字或下划线（中文请在注册后到个人中心修改昵称）"
            };
            if (!e.ok) {
                t.username = e.reason;
            }
        } else {
            t.username = "请输入用户名";
        }
        if (C) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(C)) {
                t.email = "请输入有效的邮箱地址";
            }
        } else {
            t.email = "请输入邮箱地址";
        }
        if (Object.keys(t).length > 0) {
            return void setEe(t);
        }
        setT(2);
    }}><div className="mb-3"><label className="block text-xs text-text-secondary font-bold uppercase tracking-wide mb-1.5">用户名</label><div className="relative"><input type="text" value={a} onChange={(e)=>setA(e.target.value)} className={`w-full h-11 px-3.5 pr-9 bg-bg-inset border-2 ${ee.username ? "border-error" : "border-border-hard"} text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors`} placeholder="3-20 位字母/数字/下划线"/><A_1 size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"/></div>{ee.username ? <p className="mt-1 text-xs text-error font-bold">{ee.username}</p> : <p className="mt-1.5 text-xs text-text-muted leading-relaxed">3-20 位字母/数字/下划线 · 不能纯数字 · 注册后可改昵称</p>}</div><div className="mb-4"><label className="block text-xs text-text-secondary font-bold uppercase tracking-wide mb-1.5">邮箱地址</label><div className="relative"><input type="email" value={C} onChange={(e)=>setC(e.target.value)} className={`w-full h-11 px-3.5 pr-9 bg-bg-inset border-2 ${ee.email ? "border-error" : "border-border-hard"} text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors`} placeholder="your@email.com"/><p.A size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"/></div>{ee.email && <p className="mt-1 text-xs text-error font-bold">{ee.email}</p>}</div>{ee.general && <div className="mb-4 p-3 bg-error/10 border-2 border-error"><p className="text-sm text-error font-bold">{ee.general}</p></div>}<w.$ type="submit" variant="primary" size="lg" className="w-full">下一步 <u.A size={13}/></w.$></form>}{t === 2 && <form onSubmit={es}><div className="mb-3"><label className="block text-xs text-text-secondary font-bold uppercase tracking-wide mb-1.5">密码</label><div className="relative"><input type={M ? "text" : "password"} value={A} onChange={(e)=>setA_1(e.target.value)} className={`w-full h-11 px-3.5 pr-9 bg-bg-inset border-2 ${ee.password ? "border-error" : "border-border-hard"} text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors`} placeholder="至少8个字符"/><k.K type="button" onClick={()=>setM(!M)} label={M ? "隐藏密码" : "显示密码"} size="md" variant="ghost" className="absolute right-0 top-1/2 -translate-y-1/2 border-transparent text-text-muted shadow-none hover:text-text-secondary">{M ? <g.A size={13}/> : <f.A size={13}/>}</k.K></div>{ee.password && <p className="mt-1 text-xs text-error font-bold">{ee.password}</p>}{A && <div className="flex items-center gap-3 mt-2"><div className="flex-1 h-2 bg-bg-inset border-2 border-border-hard overflow-hidden"><div className={`h-full ${el.color} transition-all duration-300`} style={{
        width: `${J}%`
    }}/></div><span className={`text-xs font-bold ${el.textColor} whitespace-nowrap`}>{el.label}</span></div>}</div><div className="mb-3"><label className="block text-xs text-text-secondary font-bold uppercase tracking-wide mb-1.5">确认密码</label><div className="relative"><input type={P ? "text" : "password"} value={q} onChange={(e)=>setQ(e.target.value)} className={`w-full h-11 px-3.5 pr-9 bg-bg-inset border-2 ${ee.confirmPassword ? "border-error" : "border-border-hard"} text-text-primary text-sm font-medium placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors`} placeholder="再次输入密码"/><k.K type="button" onClick={()=>setP(!P)} label={P ? "隐藏确认密码" : "显示确认密码"} size="md" variant="ghost" className="absolute right-0 top-1/2 -translate-y-1/2 border-transparent text-text-muted shadow-none hover:text-text-secondary">{P ? <g.A size={13}/> : <f.A size={13}/>}</k.K></div>{ee.confirmPassword && <p className="mt-1 text-xs text-error font-bold">{ee.confirmPassword}</p>}</div><div className="my-4 flex flex-col gap-1"><div className="flex min-h-11 items-center gap-2.5 text-[13px] text-text-secondary"><label className="flex min-h-11 cursor-pointer items-center gap-2.5"><input type="checkbox" checked={T} onChange={(e)=>setT_1(e.target.checked)} className="peer sr-only"/><span aria-hidden="true" className={`flex h-5 w-5 flex-shrink-0 items-center justify-center border-2 border-border-hard peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-primary ${T ? "bg-brand-primary" : "bg-bg-inset"}`}>{T && <b.A size={12} className="text-text-on-brand"/>}</span><span>我已阅读并同意</span></label><_a href="/terms" className="font-bold text-brand-primary hover:text-brand-primary-light">使用条款</_a></div><div className="flex min-h-11 items-center gap-2.5 text-[13px] text-text-secondary"><label className="flex min-h-11 cursor-pointer items-center gap-2.5"><input type="checkbox" checked={Q} onChange={(e)=>setQ_1(e.target.checked)} className="peer sr-only"/><span aria-hidden="true" className={`flex h-5 w-5 flex-shrink-0 items-center justify-center border-2 border-border-hard peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-primary ${Q ? "bg-brand-primary" : "bg-bg-inset"}`}>{Q && <b.A size={12} className="text-text-on-brand"/>}</span><span>我已阅读并同意</span></label><_a href="/privacy" className="font-bold text-brand-primary hover:text-brand-primary-light">隐私政策</_a></div>{ee.terms && <p className="text-xs text-error font-bold">{ee.terms}</p>}</div>{ee.general && <div className="mb-4 p-3 bg-error/10 border-2 border-error"><p className="text-sm text-error font-bold">{ee.general}</p></div>}<w.$ type="submit" disabled={U} variant="primary" size="lg" className="w-full">{U ? <><v.y size="xs"/>发送验证码...</> : <>下一步 <u.A size={13}/></>}</w.$><w.$ type="button" onClick={()=>setT(1)} variant="ghost" size="md" className="mt-2.5 w-full"><j.A size={13}/> 上一步</w.$></form>}{t === 3 && <form onSubmit={en}><div className="mb-4 p-3 bg-brand-primary/10 border-2 border-brand-primary"><div className="flex items-start gap-3"><A_2 size={18} className="text-brand-primary mt-0.5 flex-shrink-0"/><div><p className="text-sm text-text-primary font-bold mb-1">验证码已发送</p><p className="text-xs text-text-secondary font-medium">我们已向 <span className="font-bold text-text-primary">{C}</span> 发送了验证码</p></div></div></div><div className="mb-4"><label className="block text-xs text-text-secondary font-bold uppercase tracking-wide mb-1.5">邮箱验证码</label><input type="text" value={Z} onChange={(e)=>setZ(e.target.value)} maxLength={6} className={`w-full h-11 px-4 bg-bg-inset border-2 ${ee.code ? "border-error" : "border-border-hard"} text-text-primary font-bold text-center text-lg tracking-widest font-mono placeholder:text-text-muted outline-none focus:border-brand-primary transition-colors`} placeholder="请输入6位验证码" autoComplete="off"/>{ee.code && <p className="mt-1 text-xs text-error font-bold">{ee.code}</p>}</div><div className="mb-4 text-center"><w.$ type="button" onClick={onClick} disabled={L > 0} variant="ghost" size="md">{L > 0 ? `${L}秒后可重新发送` : "重新发送验证码"}</w.$></div>{ee.general && <div className="mb-4 p-3 bg-error/10 border-2 border-error"><p className="text-sm text-error font-bold">{ee.general}</p></div>}<w.$ type="submit" disabled={U} variant="primary" size="lg" className="w-full">{U ? <><v.y size="xs"/>验证中...</> : <>验证并注册<b.A size={13}/></>}</w.$><w.$ type="button" onClick={()=>setT(2)} disabled={U} variant="ghost" size="md" className="mt-2.5 w-full"><j.A size={13}/>返回修改信息</w.$></form>}<p className="mt-4 text-center text-[13px] text-text-secondary font-semibold">已有账号？ <_a href="/login" className="text-brand-primary font-extrabold hover:text-brand-primary-light transition-colors">去登录</_a></p></div></d.AuthLayout>;
}
function CComponent() {
    return <Suspense fallback=<div className="h-screen flex items-center justify-center bg-bg-primary"><v.y size="md"/></div>><Z1Component/></Suspense>;
}
export { CComponent as default };
