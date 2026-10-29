import "./module-86897.js";
import { useCallback, useState } from "./module-61426.js";
import { getSession, useSession } from "./module-36489.js";
import * as i from "./module-71442.js";
import { E as E_1 } from "./module-26260.js";
import { A as A_1 } from "./module-94392.js";
import { A as A_2 } from "./module-16114.js";
const s = require(20063);
const o = require(80645);
const d = require(97003);
const c = require(44460);
const x = require(33789);
const b = require(99099);
const h = require(44748);
let f = [
    "/admin",
    "/studio/editor"
];
let g = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let v = {
    action: "错误反馈",
    description: "提交错误反馈需要登录，方便我们追踪问题进度并通过邮箱回复你。注册一个账号即可，全程免费。"
};
export function BetaFeedbackFab() {
    let j = s.usePathname();
    let { data } = useSession();
    let { requireLogin, promptLogin } = E_1();
    let [k, setK] = useState(false);
    let [A, setA] = useState("");
    let [z, setZ] = useState("");
    let [E, setE] = useState("");
    let [L, setL] = useState("");
    let [key, setKey] = useState(0);
    let [loading, setLoading] = useState(false);
    let [W, setW] = useState(null);
    let [q, setQ] = useState(null);
    let [O, setO] = useState(false);
    let $ = useCallback(()=>{
        setA("");
        setZ("");
        setE("");
        setL("");
        setKey((e)=>e + 1);
        setQ(null);
    }, []);
    let onSuccess = async ()=>{
        let r = await getSession();
        let a = r?.user?.email || data?.user?.email || "";
        setE((e)=>{
            if (e.trim()) {
                return e;
            }
            return a;
        });
        setW(null);
        setK(true);
    };
    let onClick = ()=>{
        if (requireLogin({
            ...v,
            onSuccess
        })) {
            onSuccess();
        }
    };
    if (f.some((e)=>j?.startsWith(e))) {
        return null;
    }
    let onSubmit = async (e)=>{
        e.preventDefault();
        setQ(null);
        if (!A || A.trim().length < 4) {
            return setQ("问题简述至少 4 字");
        }
        if (A.length > 200) {
            return setQ("问题简述不得超过 200 字");
        }
        if (!z || z.trim().length < 10) {
            return setQ("详细描述至少 10 字");
        }
        if (z.length > 5000) {
            return setQ("详细描述不得超过 5000 字");
        }
        if (!E.trim()) {
            return setQ("请填写联系邮箱");
        }
        if (!g.test(E.trim())) {
            return setQ("邮箱格式有误，请填写真实邮箱");
        }
        if (!L || L.length < 3) {
            return setQ("请输入图形验证码");
        }
        setLoading(true);
        try {
            let e = ((e, t, r)=>{
                let a = typeof navigator !== "undefined" ? navigator.userAgent : "";
                let n = `${window.innerWidth} × ${window.innerHeight}`;
                let s = new Date().toLocaleString("sv-SE").replace("T", " ");
                return `

--- 自动诊断 ---
页面：${e || "/"}
登录：${t ? `已登录 (${r || t})` : "未登录"}
浏览器：${a}
屏幕：${n}
时间：${s}`;
            })(j, data?.user?.id, data?.user?.name);
            let l = await fetch("/api/feedbacks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category: "beta_feedback",
                    subject: A.trim(),
                    content: z.trim() + e,
                    contactEmail: E.trim(),
                    captcha: L
                })
            });
            let i = await l.json();
            if (i.success) {
                setK(false);
                setW(i.data.id);
                $();
            } else if (i.error?.code === "UNAUTHORIZED") {
                setK(false);
                promptLogin({
                    ...v,
                    onSuccess
                });
            } else {
                setQ(i.error?.message || "提交失败");
                if (i.error?.code === "CAPTCHA_INVALID") {
                    setL("");
                    setKey((e)=>e + 1);
                }
            }
        } catch (e) {
            setQ("网络错误，请稍后重试");
        } finally{
            setLoading(false);
        }
    };
    return <><div className="fixed bottom-6 right-6 z-[100] hidden md:flex flex-col items-center gap-1.5"><d.$ type="button" onClick={onClick} size="sm" variant="primary" className="w-[116px]" title="提交内测错误反馈" aria-label="打开内测错误反馈表单"><A_1 size={12}/>错误反馈</d.$></div><div className="fixed bottom-[72px] right-3 z-[100] flex md:hidden flex-col items-end gap-1.5">{O && <d.$ type="button" onClick={()=>{
        onClick();
        setO(false);
    }} size="sm" variant="primary" className="w-[100px]"><A_1 size={10}/>错误反馈</d.$>}<c.K type="button" onClick={()=>setO(!O)} size="sm" variant="secondary" label={O ? "收起反馈面板" : "展开反馈面板"}>{O ? <b.A size={16}/> : <A_1 size={16}/>}</c.K></div><i.a open={!!W && !k} onClose={()=>setW(null)} size="sm"><div className="text-center py-4"><div className="w-14 h-14 mx-auto mb-4 bg-brand-primary text-text-on-brand border-2 border-border-hard rounded shadow-block flex items-center justify-center"><svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg></div><h3 className="text-xl font-extrabold text-text-primary mb-1">报告已收到</h3><p className="text-sm text-text-secondary mb-1">工单号 <code className="px-2 py-0.5 bg-bg-card border-2 border-border-hard rounded-sm font-mono text-xs text-text-primary">{W}</code></p><p className="text-xs text-text-muted mb-5">已发送到管理员邮箱 · 我们会尽快排查修复</p><i.y variant="primary" onClick={()=>setW(null)}>关闭</i.y></div></i.a><i.a open={k} onClose={()=>setK(false)} title="内测错误反馈" size="md"><div className="flex gap-3 items-start p-4 -mx-6 -mt-4 mb-4 bg-warning/15 border-b-2 border-border-hard"><div className="w-7 h-7 shrink-0 bg-warning text-bg-primary border-2 border-border-hard rounded-sm shadow-[2px_2px_0_rgba(0,0,0,0.5)] flex items-center justify-center"><h.A size={14}/></div><div className="flex-1"><p className="text-sm text-text-secondary leading-relaxed"><strong className="text-text-primary">网站正在内测中</strong>，遇到任何 Bug、体验问题，或有好的建议，欢迎填写表单告诉我们。谢谢大家</p><p className="text-[11px] text-text-muted font-bold mt-1 text-right">—— 开发组敬上</p></div></div><form onSubmit={onSubmit} className="space-y-4"><div><label className="flex items-baseline gap-1 text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">问题简述 <span className="text-error">*</span><span className="ml-auto font-normal text-text-muted normal-case tracking-normal text-xs">{A.length}/200</span></label><x.p value={A} onChange={(e)=>setA(e.target.value)} maxLength={200} placeholder="例：点击登录按钮后页面白屏" inputSize="sm"/></div><div><label className="flex items-baseline gap-1 text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">详细描述 <span className="text-error">*</span><span className="ml-auto font-normal text-text-muted normal-case tracking-normal text-xs">{z.length}/5000</span></label><textarea value={z} onChange={(e)=>setZ(e.target.value)} rows={3} maxLength={5000} placeholder="出了什么问题？你当时在做什么？期望的结果是什么？" className="w-full rounded border-2 border-border-hard bg-bg-card text-text-primary placeholder:text-text-muted px-3 py-2 text-sm transition-colors duration-fast focus:outline-none focus:border-brand-primary resize-y"/></div><div><label className="flex items-baseline gap-1 text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">联系邮箱 <span className="text-error">*</span><span className="ml-auto font-normal text-text-muted normal-case tracking-normal text-xs">用于回复你</span></label><x.p type="email" value={E} onChange={(e)=>setE(e.target.value)} maxLength={100} placeholder="you@example.com" inputSize="sm" autoComplete="email"/><p className="text-[11px] text-text-muted mt-1.5">{data?.user?.email ? "已自动填入账号邮箱，可修改 · 处理结果会发送到这里" : "请填写真实邮箱 · 问题处理结果会发送到这里"}</p></div><details className="bg-bg-card border-2 border-border-hard rounded shadow-inset overflow-hidden"><summary className="px-3 py-2 text-[11px] font-bold text-text-muted uppercase tracking-wide cursor-pointer flex items-center gap-1.5 hover:text-text-secondary [&::-webkit-details-marker]:hidden list-none"><A_1 size={12}/>自动附加诊断信息<svg className="w-2.5 h-2.5 ml-auto transition-transform [[open]>&]:rotate-180" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></summary><div className="px-3 pb-2.5 border-t border-border-soft text-[11px] font-mono text-text-muted leading-[1.9]"><span className="text-text-secondary font-semibold">页面</span> {j}<br/><span className="text-text-secondary font-semibold">登录</span> 已登录 ({data?.user?.name || data?.user?.id})<br/><span className="text-text-secondary font-semibold">浏览器</span> {typeof navigator !== "undefined" ? `${navigator.userAgent.slice(0, 80)}…` : ""}<br/><span className="text-text-secondary font-semibold">屏幕</span> {`${window.innerWidth} × ${window.innerHeight}`}</div></details><o.$ key={key} value={L} onChange={setL}/>{q && <div className="p-3 bg-error/15 border-2 border-error rounded text-sm font-bold text-error">{q}</div>}<div className="flex gap-2 pt-3 border-t-2 border-border-hard"><i.y type="submit" variant="primary" size="lg" loading={loading} loadingLabel="提交中" className="flex-1"><A_2 size={16}/>提交报告</i.y><i.y type="button" onClick={()=>setK(false)} variant="ghost" size="lg">取消</i.y></div><p className="text-[11px] text-text-disabled text-center">提交即同意记录页面诊断信息用于排查</p></form></i.a></>;
}
