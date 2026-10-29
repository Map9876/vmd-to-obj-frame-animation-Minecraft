import "./module-86897.js";
import O from "./module-52619.js";
import * as s from "./module-15239.js";
import { d } from "./module-16010.js";
import { A } from "./module-49294.js";
function CComponent() {
    return <div className="fixed bottom-0 left-0 right-0 h-[120px] max-sm:h-[60px] pointer-events-none z-[1]"><div className="absolute bottom-0 bg-bg-card" style={{
        left: "1%",
        width: 40,
        height: 56
    }}/><div className="absolute bottom-0 bg-bg-elevated" style={{
        left: "calc(1% + 40px)",
        width: 40,
        height: 80
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "calc(1% + 80px)",
        width: 40,
        height: 40
    }}/><div className="absolute bottom-0 bg-bg-elevated" style={{
        left: "12%",
        width: 32,
        height: 96
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "calc(12% + 32px)",
        width: 32,
        height: 64
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "22%",
        width: 56,
        height: 36
    }}/><div className="absolute bottom-0 bg-bg-elevated" style={{
        left: "calc(22% + 56px)",
        width: 40,
        height: 52
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "34%",
        width: 40,
        height: 72
    }}/><div className="absolute bottom-0 bg-bg-elevated" style={{
        left: "calc(34% + 40px)",
        width: 40,
        height: 48
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "calc(34% + 80px)",
        width: 40,
        height: 88
    }}/><div className="absolute bottom-0 bg-bg-elevated" style={{
        left: "50%",
        width: 32,
        height: 44
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "58%",
        width: 48,
        height: 68
    }}/><div className="absolute bottom-0 bg-bg-elevated" style={{
        left: "calc(58% + 48px)",
        width: 48,
        height: 104
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "calc(58% + 96px)",
        width: 32,
        height: 52
    }}/><div className="absolute bottom-0 bg-bg-elevated" style={{
        left: "76%",
        width: 40,
        height: 60
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "calc(76% + 40px)",
        width: 40,
        height: 36
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "86%",
        width: 48,
        height: 84
    }}/><div className="absolute bottom-0 bg-bg-elevated" style={{
        left: "calc(86% + 48px)",
        width: 40,
        height: 56
    }}/><div className="absolute bottom-0 bg-bg-card" style={{
        left: "calc(86% + 88px)",
        width: 40,
        height: 68
    }}/></div>;
}
export function AuthLayout({ children }) {
    return <div className="min-h-[calc(100dvh-52px)] lg:min-h-screen flex flex-col items-center justify-center bg-bg-primary relative px-4 py-10 pb-[100px] sm:px-6 max-sm:py-5 max-sm:pb-3 text-text-primary"><O href="/" className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-bg-card border-2 border-border-hard shadow-block text-text-secondary text-[13px] font-bold hover:text-text-primary transition-colors"><A size={14}/>返回网站</O><div className="flex flex-col items-center mb-6 max-sm:mb-2"><O href="/" className="block mb-2.5 max-sm:mb-1"><s.default src={d("/images/logo/logo-horizontal-mcblock.png")} alt="MCBlock" width={480} height={113} className="h-12 w-auto max-sm:h-10" priority unoptimized/></O><span className="font-pixel text-[13px] max-sm:text-[11px] text-text-muted tracking-[0.15em]">MC 建筑，不止于你的存档</span></div><div className="relative z-10 w-full">{children}</div><CComponent/></div>;
}
