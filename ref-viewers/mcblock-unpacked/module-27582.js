import { jsx } from "./module-86897.js";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "./module-61426.js";
import { n } from "./module-59008_3.js";
import _o from "./module-52619.js";
import * as c from "./module-15239.js";
import { signOut, useSession } from "./module-36489.js";
import { U4 } from "./module-22355.js";
import { A as icon } from "./module-14326.js";
import { A as A_1 } from "./module-57391.js";
import { A as A_3 } from "./module-69950.js";
import { N } from "./module-26497.js";
import S from "./module-1733.js";
import { A as A_4 } from "./module-54620.js";
import { A as A_5 } from "./module-7237.js";
import { A as A_6 } from "./module-58255.js";
import { _ as __1 } from "./module-90908.js";
import { E as E_1 } from "./module-25828.js";
import * as U from "./module-69381_2.js";
import { V } from "./module-42688_2.js";
import { A as A_7 } from "./module-6979.js";
import { A as A_8 } from "./module-27042.js";
import { q as q_1 } from "./module-98542.js";
import { O9, X_, ed as displayConfig } from "./module-78968.js";
import { A as A_9 } from "./module-69981.js";
let LContext = createContext({
    expanded: false,
    setExpanded: ()=>{},
    toggle: ()=>{}
});
let i = "mcblock-desktop-sidebar";
const x = require(20063);
const b = require(85501);
const h = require(73768);
const f = require(79350);
const g = require(95585);
const y = require(65633);
let w = [
    {
        icon: b.A,
        label: "首页",
        href: "/",
        tip: "首页"
    },
    {
        icon: h.A,
        label: "建筑库",
        href: "/buildings",
        tip: "建筑库"
    },
    {
        icon,
        label: "投影编辑",
        href: "/studio",
        tip: "投影编辑器 · 查看与编辑投影文件"
    },
    {
        icon: f.A,
        label: "壁纸站",
        href: "/wallpapers",
        tip: "壁纸站"
    }
];
function NComponent() {
    let { expanded, toggle } = useContext(LContext);
    let S = x.usePathname();
    let z = x.useRouter();
    let { data, status } = useSession();
    let { unreadCount } = U4();
    let L = S.startsWith("/studio/editor");
    let P = /^\/buildings\/[^/]+/.test(S);
    let I = [
        "/login",
        "/register",
        "/forgot-password"
    ].includes(S);
    let M = S.startsWith("/admin");
    if (L || P || I || M) {
        return null;
    }
    let D = async ()=>{
        await signOut({
            redirect: false
        });
        z.push("/");
    };
    let F = expanded ? "w-[220px]" : "w-[64px]";
    return <aside className={`${F} h-screen fixed left-0 top-0 z-sticky bg-bg-card border-r-2 border-border-hard flex flex-col overflow-hidden transition-[width] duration-200`}><button onClick={toggle} aria-label={expanded ? "收起侧栏" : "展开侧栏"} className="absolute top-5 -right-3 w-6 h-6 rounded-full bg-bg-card border-2 border-border-hard text-text-secondary flex items-center justify-center shadow-block hover:bg-brand-cta hover:text-text-on-brand hover:scale-110 transition-all duration-200 z-10"><g.A className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}/></button><div className="flex flex-col h-full w-full px-3 py-3"><_o href="/" className="group flex items-center gap-2.5 p-1 mb-3 rounded hover:bg-white/5 transition-colors duration-150 relative" title={expanded ? undefined : "MCBlock"}><div className="w-9 h-9 shrink-0 bg-brand-cta border-2 border-border-hard rounded shadow-block flex items-center justify-center transition-transform duration-200 group-hover:rotate-[-8deg] group-hover:scale-105"><c.default src="/favicon.ico" alt="MCBlock" width={22} height={22} className="w-[22px] h-[22px] object-contain brightness-[10]" priority/></div>{expanded && <div className="flex flex-col leading-tight min-w-0 overflow-hidden"><span className="text-sm font-extrabold text-text-primary">MCBlock</span><span className="text-[10px] text-text-muted">建筑与创作工具</span></div>}</_o><div className="h-[2px] w-full bg-border-soft mb-1.5"/><nav className="flex-1 flex flex-col gap-1 overflow-y-auto overflow-x-hidden scrollbar-none">{w.map((item)=>{
        var t;
        return <K1Component key={item.href} item={item} active={(t = item.href) === "/" ? S === "/" : S.startsWith(t)} expanded={expanded}/>;
    })}<div className="h-[2px] w-full bg-border-soft my-1.5"/><K1Component item={{
        icon: A_1,
        label: "消息",
        href: "/profile?role=user&tab=messages",
        tip: unreadCount > 0 ? `消息 · ${unreadCount} 条未读` : "消息"
    }} active={false} expanded={expanded} badge={unreadCount}/></nav><div className="mt-2 pt-2 border-t-2 border-border-soft">{status === "authenticated" && data ? <div className="flex flex-col gap-1"><_o href="/profile" title={expanded ? undefined : `${data.user?.name || "个人中心"}`} className="group relative flex items-center gap-2.5 p-1.5 rounded hover:bg-bg-elevated transition-colors duration-150 overflow-hidden"><div className="relative shrink-0">{data.user?.image ? <img src={data.user.image} alt="头像" className="w-9 h-9 rounded border-2 border-border-hard object-cover"/> : <div className="w-9 h-9 bg-brand-primary border-2 border-border-hard rounded flex items-center justify-center text-text-on-brand font-extrabold text-sm">{data.user?.name?.[0]?.toUpperCase() || data.user?.email?.[0]?.toUpperCase() || "U"}</div>}<span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success border-2 border-bg-navbar rounded-full"/></div>{expanded && <div className="flex-1 min-w-0"><div className="text-xs font-bold text-text-primary truncate leading-tight">{data.user?.name || "用户"}</div><div className="text-[10px] text-success leading-tight mt-0.5">● 在线</div></div>}{!expanded && <CComponent text={data.user?.name || "个人中心"}/>}</_o>{expanded && <button onClick={D} className="flex items-center gap-3 px-3 py-1.5 rounded text-[11px] font-semibold text-text-muted hover:bg-error/10 hover:text-error transition-all duration-200"><A_3 size={14} className="shrink-0"/>退出登录</button>}</div> : status !== "loading" ? <div className="flex flex-col gap-1">{expanded ? <><_o href="/login" className="flex items-center justify-center py-2 px-3 rounded text-xs font-semibold text-text-secondary border-2 border-border-hard hover:bg-bg-elevated hover:text-text-primary transition-all duration-200">登录</_o><_o href="/register" className="flex items-center justify-center py-2 px-3 rounded text-xs font-extrabold text-text-on-brand bg-brand-cta border-2 border-border-hard shadow-block hover:-translate-y-0.5 hover:shadow-block-hover transition-all duration-200">注册</_o></> : <_o href="/login" title="登录 / 注册" className="relative group w-full h-10 rounded flex items-center justify-center bg-brand-cta text-text-on-brand border-2 border-border-hard shadow-inset hover:bg-brand-cta-hover transition-all duration-200"><y.A size={18}/><CComponent text="登录 / 注册"/></_o>}</div> : null}</div></div></aside>;
}
function K1Component({ item, active, expanded, badge }) {
    let item_icon = item.icon;
    let i = typeof badge === "number" && badge > 0;
    return <_o href={item.href} title={expanded ? undefined : item.tip} className={`
        relative group flex items-center gap-3 h-10 px-2.5 rounded text-[13px] font-semibold whitespace-nowrap overflow-hidden
        transition-all duration-150
        ${active ? "bg-brand-cta text-text-on-brand" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"}
      `}>{active && <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand-cta rounded-r-sm"/>}{jsx(item_icon, {
        className: "w-5 h-5 shrink-0"
    })}{expanded && <span>{item.label}</span>}{item.hot && expanded && <span className="ml-auto text-[9px] font-extrabold bg-brand-cta text-text-on-brand px-1.5 py-[2px] rounded-sm border-2 border-border-hard leading-none">HOT</span>}{i && expanded && <span className="ml-auto min-w-[18px] h-4 px-1 bg-error text-white text-[10px] font-bold rounded-sm flex items-center justify-center leading-none">{badge > 99 ? "99+" : badge}</span>}{!expanded && item.hot && <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-brand-cta border-2 border-border-hard rounded-full"/>}{!expanded && i && <span className="absolute top-1.5 right-2 w-2 h-2 bg-error border border-bg-navbar rounded-full"/>}{!expanded && <CComponent text={item.tip}/>}</_o>;
}
function CComponent({ text }) {
    return <span className="absolute left-[56px] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black text-white text-xs font-semibold whitespace-nowrap rounded border-2 border-border-hard opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-[1000]">{text}</span>;
}
const z = require(16010);
const _ = require(64991);
const E = require(33186);
const B = require(30885);
const L = require(89710);
const I = require(99099);
const T = require(97003);
const q = require(33159);
const O = require(44460);
let $ = "mcblock:mobile-panel-open";
function H(detail) {
    window.dispatchEvent(new CustomEvent($, {
        detail
    }));
}
function useK(e, t) {
    useEffect(()=>{
        let r = (r)=>{
            if (r.detail !== e) {
                t();
            }
        };
        window.addEventListener($, r);
        return ()=>window.removeEventListener($, r);
    }, [
        t,
        e
    ]);
}
function JComponent({ icon, label, href, onClick, active = false, danger = false, badge, indicator = false }) {
    let className = `
    relative !h-auto min-h-[86px] !w-full !overflow-visible !px-1.5 !py-4
    text-[11px] font-bold
    [&_[data-control-content]]:flex-col [&_[data-control-content]]:gap-2.5
    ${danger ? "!text-error hover:!border-error hover:!bg-error/10" : ""}
  `;
    let x = <><span className="relative inline-flex">{jsx(icon, {
        className: `h-[26px] w-[26px] ${danger ? "text-error" : "text-text-primary"}`
    })}{badge != null && badge !== "" && <U.x className="absolute -right-3 -top-2">{badge}</U.x>}{indicator && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 border-2 border-bg-inset bg-error"/>}</span><span className="whitespace-nowrap">{label}</span></>;
    if (href) {
        return <q.ButtonLink href={href} onClick={onClick} size="xl" variant={active ? "primary" : "secondary"} className={className} aria-current={active ? "page" : undefined}>{x}</q.ButtonLink>;
    }
    return <T.$ type="button" onClick={onClick} size="xl" variant={danger ? "ghost" : active ? "primary" : "secondary"} className={className}>{x}</T.$>;
}
let className = "w-full h-[38px] px-[14px] flex items-center gap-[10px] text-left font-body font-semibold text-[13.5px] leading-none text-text-muted transition-colors duration-fast hover:bg-bg-inset hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary";
function GComponent() {
    let [ex, setEx] = useState(false);
    let [open, setOpen] = useState(false);
    let [eh, setEh] = useState(false);
    let ef = x.usePathname();
    let eg = x.useRouter();
    let { data, status } = useSession();
    let ey = status === "loading";
    let ewRef = useRef(null);
    useEffect(()=>{
        let e = false;
        function t() {
            if (!e) {
                window.requestAnimationFrame(()=>{
                    setEh(window.scrollY > 10);
                    e = false;
                });
                e = true;
            }
        }
        window.addEventListener("scroll", t, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", t);
    }, []);
    useEffect(()=>{
        function e(e) {
            let r;
            let e_target = e.target;
            if (!((r = ewRef.current?.contains(e_target)) != null && r)) {
                setEx(false);
            }
        }
        if (ex) {
            document.addEventListener("mousedown", e);
            return ()=>document.removeEventListener("mousedown", e);
        }
    }, [
        ex
    ]);
    let eN = [
        {
            label: "建筑库",
            shortLabel: "建筑",
            href: "/buildings",
            icon: _.A
        },
        {
            label: "投影编辑",
            shortLabel: "投影",
            href: "/studio",
            icon: E.A
        },
        {
            label: "壁纸站",
            shortLabel: "壁纸",
            href: "/wallpapers",
            icon: f.A
        },
        {
            label: "Blender",
            shortLabel: "Blender",
            href: "/blender",
            icon: B.A
        },
        {
            label: "支持我们",
            shortLabel: "支持",
            href: "/support",
            icon: L.A
        }
    ];
    let ek = async ()=>{
        await signOut({
            redirect: false
        });
        setEx(false);
        setOpen(false);
        eg.push("/");
    };
    let { unreadCount } = U4();
    let eA = useCallback(()=>setOpen(false), []);
    useK("account", eA);
    let eS = data?.user?.image ? <img src={data.user.image} alt="头像" className="w-full h-full object-cover"/> : <div className="w-full h-full bg-brand-primary flex items-center justify-center text-text-on-brand font-bold text-sm">{data?.user?.name?.[0]?.toUpperCase() || data?.user?.email?.[0]?.toUpperCase() || "U"}</div>;
    return <><header className="sticky top-0 z-[60] lg:hidden h-16 bg-bg-navbar border-b-2 border-border-hard flex items-center justify-between px-[var(--pad-side)]"><_o href="/" className="flex items-center shrink-0"><c.default src={z.d("/images/logo/logo-horizontal-mcblock.png")} alt="MCBlock" width={2272} height={536} className="h-[34px] w-auto object-contain" priority unoptimized/></_o><div className="flex items-center gap-2">{!ey && (data ? <><q.ButtonLink href="/profile?role=user&tab=messages" aria-label="消息" size="icon" variant="secondary" className="relative min-h-[var(--control-touch-min)] min-w-[var(--control-touch-min)] !overflow-visible"><A_1/>{unreadCount > 0 && <U.x className="absolute -right-1.5 -top-1.5 !border-bg-primary">{unreadCount > 99 ? "99+" : unreadCount}</U.x>}</q.ButtonLink><O.K onClick={()=>{
        H("account");
        setOpen(true);
    }} label="个人中心" size="md" variant="secondary" className="min-h-[var(--control-touch-min)] min-w-[var(--control-touch-min)] overflow-hidden [&_[data-control-content]]:h-full [&_[data-control-content]]:w-full">{eS}</O.K></> : <><q.ButtonLink href="/login" size="md" variant="secondary" className="min-h-[var(--control-touch-min)]">登录</q.ButtonLink><q.ButtonLink href="/register" size="md" variant="primary" className="hidden min-h-[var(--control-touch-min)]">注册</q.ButtonLink></>)}</div></header>{data && <__1 id="mobile-account-menu" open={open} onClose={eA} position="bottom" size="lg" showCloseButton={false} className="!h-auto bg-bg-card lg:hidden" bodyClassName="!overflow-visible !p-0"><div className="flex items-center gap-3 border-b-2 border-border-hard bg-bg-card px-[18px] py-3.5"><div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden border-2 border-border-hard text-base font-black text-white" style={{
        backgroundColor: V(data.user?.name || data.user?.email)
    }}>{data.user?.image ? <img src={data.user.image} alt="头像" className="h-full w-full object-cover"/> : data.user?.name?.[0]?.toUpperCase() || data.user?.email?.[0]?.toUpperCase() || "U"}</div><div className="min-w-0"><div className="truncate text-sm font-black text-text-primary">{data.user?.name || "未命名用户"}</div><div className="mt-1 truncate text-xs font-semibold text-text-muted">{data.user?.email}</div></div></div><div className="grid grid-cols-[repeat(auto-fit,minmax(82px,1fr))] gap-2.5 bg-bg-card px-[18px] pb-[18px] pt-3">{data.user?.role === "admin" && <JComponent icon={A_4} label="管理后台" href="/admin" onClick={eA}/>}<JComponent icon={y.A} label="个人中心" href="/profile" onClick={eA}/><JComponent icon={A_1} label="消息中心" href="/profile?role=user&tab=messages" onClick={eA} badge={unreadCount > 0 ? unreadCount > 99 ? "99+" : unreadCount : null}/><JComponent icon={A_3} label="退出登录" onClick={ek} danger/></div></__1>}<div className="sticky top-0 z-sticky hidden lg:block"><nav className={`
            h-16 bg-bg-navbar border-b-2 border-border-hard
            transition-shadow duration-fast
            ${eh ? "shadow-block" : ""}
          `}><div className="wrap grid grid-cols-[1fr_auto_1fr] items-center gap-[26px] h-full nav-desktop-grid"><div className="justify-self-start flex items-center shrink-0"><_o href="/" className="flex items-center"><c.default src={z.d("/images/logo/logo-horizontal-mcblock.png")} alt="MCBlock" width={2272} height={536} className="h-[34px] w-auto object-contain" priority unoptimized/></_o></div><div className="justify-self-center flex items-center gap-1">{eN.map((e)=>{
        let t = e.href === "/" ? ef === "/" : ef === e.href || ef.startsWith(`${e.href}/`);
        return <q.ButtonLink key={e.href} href={e.href} size="md" variant={t ? "primary" : "ghost"} className={t ? "group" : "group border-transparent hover:border-border-hard"} aria-current={t ? "page" : undefined}>{e.icon && <e.icon size={13} className={`transition-opacity duration-150 ${t ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`}/>}<span className="hidden xl:inline">{e.label}</span><span className="xl:hidden">{e.shortLabel}</span></q.ButtonLink>;
    })}</div><div className="justify-self-end flex items-center gap-[10px]">{!ey && <>{data ? <><q.ButtonLink href="/profile?role=user&tab=messages" size="icon" variant="secondary" className="relative !overflow-visible" aria-label="消息"><A_1/>{unreadCount > 0 ? <U.x className="absolute -right-1.5 -top-1.5 !border-bg-primary">{unreadCount > 99 ? "99+" : unreadCount}</U.x> : <span className="absolute top-[3px] right-[3px] w-[9px] h-[9px] bg-brand-primary border-2 border-bg-inset"/>}</q.ButtonLink><div className="relative" ref={ewRef}><T.$ type="button" onClick={()=>setEx(!ex)} size="md" variant="secondary" className={`pl-1 !pr-3 ${ex ? "bg-bg-deep" : ""}`} aria-label="用户菜单" aria-expanded={ex}>{data.user?.image ? <img src={data.user.image} alt="头像" className="w-7 h-7 border-2 border-border-hard object-cover"/> : <div className="w-7 h-7 bg-brand-primary border-2 border-border-hard flex items-center justify-center text-text-on-brand font-bold text-[13px]">{data.user?.name?.[0]?.toUpperCase() || data.user?.email?.[0]?.toUpperCase() || "U"}</div>}<span className="text-[13px] font-bold text-text-muted max-w-[72px] truncate hidden xl:block">{data.user?.name || data.user?.email?.split("@")[0]}</span><I.A className={`ml-[2px] text-text-muted transition-transform duration-fast ${ex ? "rotate-180" : ""}`}/></T.$><N>{ex && <S.P.div initial={{
        opacity: 0,
        y: -8
    }} animate={{
        opacity: 1,
        y: 0
    }} exit={{
        opacity: 0,
        y: -8
    }} transition={{
        duration: 0.15
    }} className="absolute right-0 mt-2 w-56 bg-bg-card border-2 border-border-hard shadow-block z-dropdown overflow-hidden"><div className="px-[14px] py-3 border-b-2 border-border-hard"><div className="text-[14px] font-black text-text-primary truncate">{data.user?.name || "未命名用户"}</div><div className="text-xs text-text-disabled truncate mt-0.5">{data.user?.email}</div><div className="mt-1.5"><E_1 tone="success" icon=<A_5/>>全部功能免费</E_1></div></div><div className="py-1.5">{data.user?.role === "admin" && <_o href="/admin" onClick={()=>setEx(false)} className={className}><A_4 size={16} className="shrink-0"/>管理后台</_o>}<_o href="/profile" onClick={()=>setEx(false)} className={className}><y.A size={16} className="shrink-0"/>个人中心</_o><_o href="/profile?role=user&tab=messages" onClick={()=>setEx(false)} className={className}><A_1 size={16} className="shrink-0"/>消息中心{unreadCount > 0 && <U.x className="ml-auto">{unreadCount > 99 ? "99+" : unreadCount}</U.x>}</_o><_o href="/profile?role=user&tab=settings" onClick={()=>setEx(false)} className={className}><A_6 size={16} className="shrink-0"/>账号设置</_o></div><div className="border-t-2 border-border-hard py-1.5"><button type="button" onClick={ek} className={`${className} !text-error hover:!bg-error/10 hover:!text-error`}><A_3 size={16} className="shrink-0"/>退出登录</button></div></S.P.div>}</N></div></> : <><q.ButtonLink href="/login" size="md" variant="secondary">登录</q.ButtonLink><q.ButtonLink href="/register" size="md" variant="primary">注册</q.ButtonLink></>}</>}</div></div></nav></div></>;
}
function XComponent({ enableMessageCenter = false, initialBanner = null }) {
    let n = x.usePathname();
    let s = [
        "/login",
        "/register",
        "/forgot-password",
        "/verify-success"
    ].includes(n) || n.startsWith("/reset-password");
    let l = n.startsWith("/admin");
    let i = n.startsWith("/studio/editor");
    if (s || l || i) {
        return null;
    }
    return <><A_7 initialBanner={initialBanner} enableDynamic={enableMessageCenter}/><GComponent/></>;
}
function YComponent() {
    return <footer className="bg-bg-card border-t-2 border-border-hard mt-auto"><div className="wrap py-4 flex flex-col items-center gap-1.5 md:flex-row md:items-center md:justify-between md:gap-x-5 text-xs font-bold text-text-disabled"><span className="text-center md:text-left md:whitespace-nowrap">© 2026 MCBlock · 长沙引擎猫科技有限公司 · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="text-text-disabled hover:text-text-primary transition-colors">湘ICP备2025137428号-1</a></span><span className="text-center md:text-right md:whitespace-nowrap opacity-70">Minecraft 是 Microsoft / Mojang Studios 的商标，本站与其无关</span></div></footer>;
}
const Z = require(98901);
let ee = [
    {
        label: "建筑库",
        href: "/buildings"
    },
    {
        label: "3D 步骤教学",
        href: "/buildings/step-teaching",
        from: "footer"
    },
    {
        label: "投影编辑",
        href: "/studio"
    },
    {
        label: "壁纸站",
        href: "/wallpapers"
    },
    {
        label: "Blender",
        href: "/blender"
    },
    {
        label: "更新日志",
        href: "/changelog"
    }
];
let et = [
    {
        label: "关于我们",
        href: "/about"
    },
    {
        label: "反馈入口",
        href: "/feedback"
    },
    {
        label: "使用条款",
        href: "/terms"
    },
    {
        label: "隐私政策",
        href: "/privacy"
    }
];
function ErComponent() {
    let e = [
        et[0],
        {
            label: "支持我们",
            href: "/support"
        },
        ...et.slice(1)
    ];
    return <footer className="ft-full"><div className="ft-inner wrap"><div className="ft-top"><div className="ft-brand"><_o href="/" style={{
        display: "inline-block"
    }}><img src={z.d("/images/logo/logo-horizontal-mcblock.png")} alt="MCBlock"/></_o><p>Minecraft 建筑内容与创作工具平台。从发现建筑到编辑投影，再到 Blender 创作，让每一座建筑都被好好展陈。</p></div><div className="ft-cols"><div className="ft-col"><h4>产品</h4>{ee.map((e)=><_o key={e.href} href={e.href} onClick={e.from ? ()=>Z.MP("step_entry_link", {
                from: e.from
            }) : undefined}>{e.label}</_o>)}</div><div className="ft-col"><h4>关于</h4>{e.map((e)=><_o key={e.href} href={e.href}>{e.label}</_o>)}</div><div className="ft-col ft-community"><h4>社群</h4><div className="ft-qr-row"><figure className="ft-qr"><div className="ft-qr-box"><img src="/images/qr-qq.png" alt="QQ 群二维码"/></div><figcaption>QQ 交流群</figcaption></figure><figure className="ft-qr"><div className="ft-qr-box"><img src="/images/qr-partner.png" alt="合作伙伴二维码"/></div><figcaption>合作伙伴</figcaption></figure></div></div></div></div><div className="ft-bottom"><span className="ft-slogan">MC 建筑，不止于你的存档</span><div className="ft-legal"><span>© 2026 MCBlock · 长沙引擎猫科技有限公司</span><span>·</span><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">湘ICP备2025137428号-1</a></div><span className="ft-disclaimer">Minecraft 是 Microsoft / Mojang Studios 的商标，本站与其无关</span></div></div></footer>;
}
function EaComponent() {
    let e = x.usePathname();
    let t = [
        "/login",
        "/register",
        "/forgot-password",
        "/verify-success"
    ].includes(e) || e.startsWith("/reset-password");
    let r = e.startsWith("/admin");
    let n = e.startsWith("/studio/editor");
    let s = e === "/";
    if (t || r || n) {
        return null;
    }
    if (s) {
        return <ErComponent/>;
    }
    return <YComponent/>;
}
const en = require(35440);
const el = require(38582);
let ei = [
    {
        icon: b.A,
        label: "首页",
        href: "/",
        key: "home"
    },
    {
        icon: h.A,
        label: "建筑库",
        href: "/buildings",
        key: "buildings"
    },
    {
        icon: E.A,
        label: "投影编辑",
        href: "/studio",
        key: "studio"
    },
    {
        icon: f.A,
        label: "壁纸站",
        href: "/wallpapers",
        key: "wallpapers"
    }
];
let eo = [
    {
        icon: y.A,
        label: "个人中心",
        href: "/profile"
    },
    {
        icon: en.A,
        label: "Blender",
        href: "/blender"
    },
    {
        icon: A_8,
        label: "更新日志",
        href: "/changelog"
    }
];
function EdComponent() {
    let e = x.usePathname();
    let { unreadCount } = U4();
    let [r, setR] = useState(false);
    let l = useCallback(()=>setR(false), []);
    useK("more", l);
    let i = [
        ...eo,
        {
            icon: L.A,
            label: "支持我们",
            href: "/support"
        }
    ];
    if (e.startsWith("/studio/editor")) {
        return null;
    }
    let o = (href)=>{
        if (href === "/") {
            return e === "/";
        }
        return e === href || e.startsWith(`${href}/`);
    };
    let d = ()=>{
        setR(false);
        if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
            navigator.vibrate(15);
        }
    };
    let c = i.some((e)=>o(e.href));
    return <><__1 id="mobile-more-menu" open={r} onClose={l} position="bottom" size="lg" showCloseButton={false} className="!h-auto bg-bg-card lg:hidden" bodyClassName="!overflow-visible !p-0"><div className="flex items-center gap-2 px-[18px] pt-[15px] text-sm font-black tracking-[.02em] text-text-muted"><span className="w-[11px] h-[11px] bg-brand-cta border-2 border-border-hard"/>更多功能</div><div className="grid grid-cols-3 gap-2.5 px-[18px] pt-3 pb-[18px]">{i.map((e)=>{
        let active = o(e.href);
        return <JComponent key={e.href} icon={e.icon} label={e.label} href={e.href} onClick={d} active={active} badge={e.badge} indicator={e.href === "/profile" && unreadCount > 0}/>;
    })}</div></__1><nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden h-[52px] px-2 bg-bg-card border-t-2 border-border-hard flex items-center justify-around pb-[env(safe-area-inset-bottom)]" role="navigation" aria-label="主导航">{ei.map((e)=>{
        let t = o(e.href);
        let e_icon = e.icon;
        return <q.ButtonLink key={e.href} href={e.href} onClick={d} size="md" variant="ghost" className={`
                relative min-h-[var(--control-touch-min)] min-w-[48px]
                !overflow-visible !border-0 !bg-transparent !px-2 !shadow-none
                [&_[data-control-content]]:flex-col [&_[data-control-content]]:gap-0
                ${t ? "!text-brand-cta" : "!text-text-muted"}
              `} aria-current={t ? "page" : undefined}>{t && <span aria-hidden className="btab-anim-indicator absolute -top-[2px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-brand-cta"/>}{jsx(e_icon, {
            className: `w-[22px] h-[22px] ${t ? "stroke-[2.5] btab-anim-bounce" : "stroke-[1.5]"}`
        }, `${e.key}-${t ? "on" : "off"}`)}<span className={`text-[10px] mt-[2px] ${t ? "font-extrabold" : "font-medium"}`}>{e.label}</span></q.ButtonLink>;
    })}<T.$ type="button" size="md" variant="ghost" onClick={()=>{
        setR((e)=>{
            if (!e) {
                H("more");
            }
            return !e;
        });
        if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
            navigator.vibrate(15);
        }
    }} className={`
            relative min-h-[var(--control-touch-min)] min-w-[48px]
            !overflow-visible !border-0 !bg-transparent !px-2 !shadow-none
            [&_[data-control-content]]:flex-col [&_[data-control-content]]:gap-0
            ${r || c ? "!text-text-primary" : "!text-text-muted"}
          `} aria-expanded={r} aria-controls="mobile-more-menu" aria-label="更多">{(r || c) && <span aria-hidden className="btab-anim-indicator absolute -top-[2px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-brand-cta"/>}<el.A className={`w-[22px] h-[22px] ${r || c ? "stroke-[2.5] btab-anim-bounce" : "stroke-[1.5]"}`}/><span className={`text-[10px] mt-[2px] ${r || c ? "font-extrabold" : "font-medium"}`}>更多</span></T.$></nav></>;
}
function em(e) {
    return new Date(e.getTime() + 28800000).toISOString().slice(0, 10);
}
function eu(e) {
    try {
        let t = JSON.parse(e || "{}");
        if (!t || typeof t !== "object" || Array.isArray(t)) {
            return {};
        }
        return {
            confirmed: t.confirmed === true,
            lastShownDay: typeof t.lastShownDay === "string" ? t.lastShownDay : undefined
        };
    } catch (e) {
        return {};
    }
}
function eb(e, t, r) {
    switch(t){
        case "show":
            return {
                ...e,
                lastShownDay: em(r)
            };
        case "confirm":
            return {
                ...e,
                confirmed: true
            };
        default:
            return {
                ...e
            };
    }
}
let ep = "mcb-pop-pages";
let ef = "mcb-pop-done";
let eg = "mcb-pop-seen:";
let ev = "mcb-pop-v2-receipt:";
let ej = "mcb-pop-v2-session:";
function ey(e, t) {
    try {
        e.setItem(t, "1");
        e.removeItem(t);
        return true;
    } catch (e) {
        return false;
    }
}
function EwComponent({ enabled = false }) {
    let pathname = x.usePathname() || "/";
    let s = x.useRouter();
    let [l, setL] = useState(null);
    let oRef = useRef(null);
    let dRef = useRef(Date.now());
    let cRef = useRef(false);
    let m = useCallback((how)=>{
        if (l) {
            try {
                if (O9(l.displayConfig)) {
                    let t = ev + l.id;
                    localStorage.setItem(t, JSON.stringify(eb(eu(localStorage.getItem(t)), how === "ok" ? "confirm" : "close", new Date)));
                    sessionStorage.setItem(ej + l.id, "1");
                } else {
                    localStorage.setItem(eg + l.id, "1");
                    sessionStorage.setItem(ef, "1");
                }
            } catch (e) {}
            Z.MP("site_popup_close", {
                id: l.id,
                kind: l.type,
                how
            });
            setL(null);
        }
    }, [
        l
    ]);
    let u = useCallback((e)=>{
        if (!e.link || !e.link.startsWith("/") || e.link.startsWith("//") || /[\\\u0000-\u001f]/.test(e.link)) {
            return void m("x");
        }
        Z.MP("site_popup_go", {
            id: e.id,
            kind: e.type,
            href: e.link
        });
        if (e.link.startsWith("/buildings/step-teaching")) {
            Z.MP("step_entry_link", {
                from: "site_popup"
            });
        }
        m("go");
        s.push(e.link);
    }, [
        s,
        m
    ]);
    useEffect(()=>{
        let pageCount;
        let a;
        if (!enabled) {
            return;
        }
        setL(null);
        try {
            if (!ey(sessionStorage, `${ep}:probe`) || !ey(localStorage, `${ev}probe`)) {
                return;
            }
            let t = Number.parseInt(sessionStorage.getItem(ep) || "0", 10);
            pageCount = (Number.isFinite(t) ? Math.max(t, 0) : 0) + +(oRef.current !== pathname);
            sessionStorage.setItem(ep, String(pageCount));
            oRef.current = pathname;
        } catch (e) {
            return;
        }
        let n = {
            storageAvailable: true,
            pageCount,
            seen: false,
            sessionDone: false,
            pathname,
            hasOpenModal: false
        };
        if (!X_({
            ...n,
            displayConfig
        })) {
            return;
        }
        let s = false;
        let l = ()=>document.visibilityState === "hidden" || document.querySelector('[aria-modal="true"]') !== null;
        let c = async ()=>{
            let e = false;
            try {
                var r;
                if (s || l()) {
                    return;
                }
                let a = (await q_1())?.popup;
                if (!a || s || l() || a.until && new Date(a.until).getTime() <= Date.now()) {
                    return;
                }
                let o = O9(a.displayConfig) ? a.displayConfig : null;
                let c = eu(localStorage.getItem(ev + a.id));
                let sessionDone = sessionStorage.getItem(o ? ej + a.id : ef) === "1";
                let seen = o ? (r = new Date, o.frequency === "ack" && !!c.confirmed || o.frequency === "daily" && c.lastShownDay === em(r)) : localStorage.getItem(eg + a.id) === "1";
                if (!X_({
                    ...n,
                    seen,
                    sessionDone,
                    displayConfig: a.displayConfig,
                    targetPath: a.link
                }) || o?.trigger === "delay" && Date.now() - dRef.current < 5000) {
                    return;
                }
                if (o) {
                    sessionStorage.setItem(ej + a.id, "1");
                    localStorage.setItem(ev + a.id, JSON.stringify(eb(c, "show", new Date)));
                } else {
                    sessionStorage.setItem(ef, "1");
                }
                e = true;
                setL(a);
                Z.MP("site_popup_show", {
                    id: a.id,
                    kind: a.type
                });
            } catch (e) {} finally{
                let t = 5000 - (Date.now() - dRef.current);
                if (!(s || e)) {
                    a = setTimeout(c, t > 0 ? Math.min(1000, t) : 1000);
                }
            }
        };
        a = setTimeout(c, 800);
        return ()=>{
            s = true;
            clearTimeout(a);
        };
    }, [
        enabled,
        pathname
    ]);
    useEffect(()=>{
        let e;
        if (!l) {
            return;
        }
        let t = false;
        let r = ()=>{
            if (!l.until || t) {
                return;
            }
            let a = new Date(l.until).getTime() - Date.now();
            if (a <= 0) {
                setL((e)=>{
                    if (e?.id === l.id) {
                        return null;
                    }
                    return e;
                });
            } else {
                e = setTimeout(r, Math.min(a, 2147483647));
            }
        };
        r();
        let a = setInterval(async ()=>{
            let r = await q_1();
            if (!t && r && r.popup?.id !== l.id) {
                setL((e)=>{
                    if (e?.id === l.id) {
                        return null;
                    }
                    return e;
                });
            }
        }, 60000);
        return ()=>{
            t = true;
            if (e) {
                clearTimeout(e);
            }
            clearInterval(a);
        };
    }, [
        l
    ]);
    useEffect(()=>{
        if (!l) {
            return;
        }
        let overflow = document.body.style.overflow;
        let r = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        let a = document.querySelector('.mcb-pop-card[role="dialog"]');
        let n = ()=>Array.from(a?.querySelectorAll("button:not(:disabled), a[href]") || []);
        n()[0]?.focus();
        let s = (e)=>{
            if (e.key === "Escape") {
                e.preventDefault();
                m("esc");
            }
            if (e.key === "Tab") {
                let t = n();
                let r = t[0];
                let a = t[t.length - 1];
                if (e.shiftKey && document.activeElement === r) {
                    e.preventDefault();
                    if (a != null) {
                        a.focus();
                    }
                } else if (!(e.shiftKey || document.activeElement !== a)) {
                    e.preventDefault();
                    if (r != null) {
                        r.focus();
                    }
                }
            }
        };
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", s);
        return ()=>{
            document.body.style.overflow = overflow;
            document.removeEventListener("keydown", s);
            if (r?.isConnected) {
                r.focus();
            }
        };
    }, [
        l,
        m
    ]);
    if (enabled && l) {
        return <div className="mcb-pop-mask" onMouseDown={(e)=>{
            let e_currentTarget = e.currentTarget;
            let r = e.clientX >= e_currentTarget.getBoundingClientRect().left + e_currentTarget.clientWidth;
            cRef.current = e.target === e_currentTarget && !r;
        }} onClick={(e)=>{
            if (cRef.current && e.target === e.currentTarget) {
                m("mask");
            }
            cRef.current = false;
        }}><A_9 announcement={l} onClose={m} onGo={()=>u(l)}/></div>;
    }
    return null;
}
function ENComponent({ children, enableMessageCenter = false, initialBanner = null }) {
    let d = n();
    let c = (()=>{
        let [e, setE] = useState(false);
        useEffect(()=>{
            try {
                let e = localStorage.getItem(i);
                if (e === "expanded") {
                    setE(true);
                }
            } catch (e) {}
        }, []);
        let setExpanded = (e)=>{
            setE(e);
            try {
                localStorage.setItem(i, e ? "expanded" : "collapsed");
            } catch (e) {}
        };
        return {
            expanded: e,
            setExpanded,
            toggle: ()=>setExpanded(!e)
        };
    })();
    if (d) {
        let e = c.expanded ? "ml-[220px]" : "ml-[64px]";
        return <LContext.Provider value={c}><NComponent/><main id="main-content" className={`${e} min-h-screen transition-[margin] duration-200`}>{children}</main></LContext.Provider>;
    }
    return <div className="min-h-[calc(100dvh-52px)] lg:min-h-screen flex flex-col bg-bg-primary"><XComponent enableMessageCenter={enableMessageCenter} initialBanner={initialBanner}/><main id="main-content" className="flex-1">{children}</main><EaComponent/><EdComponent/><EwComponent enabled={enableMessageCenter}/></div>;
}
export { ENComponent as default };
