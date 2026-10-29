import "./module-86897.js";
import { useCallback, useEffect, useState } from "./module-61426.js";
import * as n from "./module-33789.js";
const s = require(25016);
export function $({ value, onChange, label: label_1 = "图形验证码", required = true, disabled = false, className, placeholder = "请输入图中字符" }) {
    let [x, setX] = useState(()=>Date.now());
    let [m, setM] = useState(true);
    let onClick = useCallback(()=>{
        setM(true);
        setX(Date.now());
        onChange("");
    }, [
        onChange
    ]);
    useEffect(()=>{
        setM(true);
    }, [
        x
    ]);
    return <div className={s.cn("flex flex-col gap-cn-2", className)}>{label_1 && <label className="text-sm font-bold text-text-primary">{label_1}{required && <span className="ml-1 text-brand-primary">*</span>}</label>}<div className="flex items-stretch gap-cn-3"><n.p type="text" value={value} onChange={(e)=>onChange(e.target.value.toUpperCase().slice(0, 8))} placeholder={placeholder} disabled={disabled} autoComplete="off" spellCheck={false} required={required} maxLength={8} className="flex-1"/><button type="button" onClick={onClick} disabled={disabled} title="点击刷新" className="relative h-12 w-36 shrink-0 overflow-hidden rounded border-2 border-border-hard bg-bg-card shadow-block hover:shadow-block-hover hover:border-brand-primary transition-all disabled:opacity-50">{m && <span className="absolute inset-0 flex items-center justify-center text-xs text-text-muted bg-bg-card">加载中...</span>}<img src={`/api/captcha?t=${x}`} alt="点击刷新验证码" width={140} height={48} className="h-full w-full object-contain" onLoad={()=>setM(false)} onError={()=>setM(false)}/></button></div><p className="text-xs text-text-muted">看不清？点击图片刷新</p></div>;
}
