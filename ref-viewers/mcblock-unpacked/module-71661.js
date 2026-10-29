import { jsx } from "./module-86897.js";
import { useEffect, useRef, useState } from "./module-61426.js";
import _l from "./module-52619.js";
import i from "./module-67909_2.js";
import { useSession } from "./module-36489.js";
import { A } from "./module-10254_2.js";
import { A as A_2 } from "./module-67763.js";
import { A as A_3 } from "./module-47522_3.js";
import { E as E_1 } from "./module-26260.js";
import { V as V_1 } from "./module-14236.js";
import { parseProjectionFile } from "./module-7882.js";
import { v as v_1 } from "./module-8934.js";
import { MI, e0, r9 } from "./module-62751.js";
let v = i(()=>Promise.all([
        require.e(1831),
        require.e(9367),
        require.e(8413),
        require.e(4664),
        require.e(6413),
        require.e(8683),
        require.e(7496),
        require.e(1379),
        require.e(4405),
        require.e(5535),
        require.e(3127),
        require.e(8931),
        require.e(9568),
        require.e(4336),
        require.e(4502),
        require.e(2868),
        require.e(8652),
        require.e(1828),
        require.e(3373),
        require.e(4079),
        require.e(9201),
        require.e(8032)
    ]).then(require.bind(require, 46443)).then((e)=>e.ProjectionPreview), {
    loadableGenerated: {
        webpack: ()=>[
                46443
            ]
    },
    ssr: false
});
let g = "sbm-card flex w-full flex-col gap-4 border-2 border-border-hard bg-bg-card p-5 shadow-block min-[900px]:p-8";
let x = "w-full border-2 border-border-hard bg-bg-inset px-3 py-[10px] text-[14px] text-text-primary placeholder:text-text-disabled focus:border-brand-primary focus:outline-none";
let y = "inline-flex w-full items-center justify-center gap-[9px] border-2 border-border-hard bg-brand-primary px-6 py-[13px] text-[15px] font-bold text-text-on-brand shadow-block-sm transition-[transform,box-shadow,opacity] duration-100 hover:-translate-x-px hover:-translate-y-px hover:shadow-block active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-block-sm";
let className = "flex h-10 w-10 shrink-0 items-center justify-center border-2 border-border-hard bg-brand-primary text-text-on-brand shadow-block-xs";
let _ = MI;
function WComponent() {
    let { data, status } = useSession();
    let w = status === "authenticated";
    let k = status === "loading";
    let { requireLogin, promptLogin } = E_1();
    let { fetchWithCsrf } = V_1();
    let ARef = useRef(null);
    let ORef = useRef(null);
    let MRef = useRef(false);
    let IRef = useRef(false);
    let PRef = useRef("none");
    let LRef = useRef(false);
    let [E, setE] = useState(null);
    let [B, setB] = useState(null);
    let [F, setF] = useState("");
    let [$, set$] = useState(null);
    let [q, setQ] = useState(null);
    let [V, setV] = useState(false);
    let [G, setG] = useState(null);
    let [X, setX] = useState(null);
    let [Y, setY] = useState(false);
    let [W, setW] = useState("");
    let [ee, setEe] = useState("");
    let [er, setEr] = useState("");
    let [ea, setEa] = useState("none");
    let [es, setEs] = useState(null);
    let [eo, setEo] = useState("");
    let [eu, setEu] = useState(null);
    let [em, setEm] = useState(0);
    let [eb, setEb] = useState("");
    let [ep, setEp] = useState(false);
    let [eg, setEg] = useState(false);
    let [ey, setEy] = useState(null);
    let [e_, setE_] = useState(null);
    let [ek, setEk] = useState(false);
    let eS = `mcblock-submission-intake-v1:${data?.user?.id || "signed-out"}`;
    function eC() {
        window.sessionStorage.removeItem(eS);
        ORef.current = null;
        setQ(null);
    }
    async function eA() {
        if (q && !MRef.current) {
            MRef.current = true;
            setEg(true);
            setEy(null);
            try {
                let e = await fetch(`/api/submissions?operationId=${q}`, {
                    cache: "no-store"
                });
                let t = await e.json();
                if (!e.ok || !t.success) {
                    return void setEy(eO(t, "尚未查到结果，请保留原操作并原样重试"));
                }
                eC();
                setE_(W || "本次作品");
            } catch (e) {
                setEy("暂时无法查询，请保留原操作，稍后再试");
            } finally{
                MRef.current = false;
                setEg(false);
            }
        }
    }
    function eO(e, t) {
        if (e.code === "CSRF_VALIDATION_FAILED") {
            return "页面停留太久了，刷新后再试";
        }
        return e.error || t;
    }
    async function eM(e) {
        setX(null);
        setEy(null);
        if (!r9(e.name)) {
            return void setX("只收 .litematic 和 .schem");
        }
        if (e.size > _.maxUploadBytes) {
            return void setX(`文件超过 ${_.maxUploadBytes / 1024 / 1024} MB`);
        }
        setY(true);
        try {
            let t = await parseProjectionFile(e);
            let [r, n, a] = t.size;
            if (r > _.maxSizeX || n > _.maxSizeY || a > _.maxSizeZ) {
                return void setX(`尺寸 ${r}×${n}×${a} 太大了，宽×高×深不超过 ${_.maxSizeX}×${_.maxSizeY}×${_.maxSizeZ} 格`);
            }
            if (r * n * a > _.maxVolumeCells) {
                return void setX(`体积 ${r}×${n}×${a} 太大了，总格数不超过 ${_.maxVolumeCells / 10000} 万格`);
            }
            if (t.totalBlockCount > _.maxBlocks) {
                return void setX(`方块数 ${t.totalBlockCount.toLocaleString()} 超过 ${_.maxBlocks.toLocaleString()}`);
            }
            setE(e);
            setG(t);
            let l = e.name.replace(/\.(litematic|schem)$/i, "").slice(0, _.nameMax);
            setW((e)=>{
                if (e.trim()) {
                    return e;
                }
                return l;
            });
        } catch (e) {
            setX("读不出这个文件，确认是投影 mod 导出的 .litematic 或 .schem");
        } finally{
            setY(false);
        }
    }
    async function eI(email) {
        if (!LRef.current) {
            IRef.current = true;
            setEu(null);
            LRef.current = true;
            setEk(true);
            try {
                let t = await fetch("/api/auth/send-code", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email
                    })
                });
                let r = await t.json().catch(()=>({}));
                if (!t.ok) {
                    setEu(eO(r, "验证码发送失败，稍后再试"));
                    if (typeof r.remainingSeconds === "number") {
                        setEm(r.remainingSeconds);
                    }
                    return;
                }
                setEr(email);
                setEa("sent");
                setEo("");
                setEm(60);
                setEu(null);
            } catch (e) {
                setEu("网络异常，请稍后再试");
            } finally{
                LRef.current = false;
                setEk(false);
            }
        }
    }
    async function eP() {
        let e = e0(er);
        if (!e) {
            return void setEu("邮箱格式不对");
        }
        if (requireLogin({
            action: "验证邮箱",
            strict: true,
            onSuccess: ()=>{
                eI(e);
            }
        })) {
            eI(e);
        }
    }
    async function eL() {
        if (!/^\d{6}$/.test(eo)) {
            return void setEu("请输入邮件里的 6 位验证码");
        }
        try {
            let e = await fetchWithCsrf("/api/submissions/email/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: er,
                    code: eo
                })
            });
            let t = await e.json().catch(()=>({}));
            if (e.status === 401) {
                return void promptLogin({
                    action: "验证邮箱"
                });
            }
            if (!e.ok || !t.token) {
                return void setEu(eO(t, "验证失败，稍后再试"));
            }
            setEs(t.token);
            setEa("ok");
            setEu(null);
        } catch (e) {
            setEu("网络异常，请稍后再试");
        }
    }
    function onClick() {
        setEa("none");
        setEs(null);
        setEo("");
        setEu(null);
    }
    useEffect(()=>{
        ORef.current = null;
        setQ(null);
        setV(false);
        if (w) {
            try {
                let e = window.sessionStorage.getItem(eS);
                if (!e) {
                    return;
                }
                let t = JSON.parse(e);
                if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(t.operationId) || !/^[a-f0-9]{64}$/.test(t.signature)) {
                    throw Error();
                }
                ORef.current = t;
                setQ(t.operationId);
            } catch (e) {
                setV(true);
                setEy("上次投稿记录暂不可读，请保留当前页面，稍后再试");
            }
        }
    }, [
        w,
        eS
    ]);
    useEffect(()=>{
        if (!B) {
            return void setF("");
        }
        let e = URL.createObjectURL(B);
        setF(e);
        return ()=>URL.revokeObjectURL(e);
    }, [
        B
    ]);
    useEffect(()=>{
        PRef.current = ea;
    }, [
        ea
    ]);
    useEffect(()=>{
        if (w && !ee && data?.user?.name) {
            setEe(data.user.name.slice(0, _.authorMax));
        }
    }, [
        w,
        data?.user?.name
    ]);
    useEffect(()=>{
        if (!w) {
            return;
        }
        let e = false;
        fetch("/api/submissions/email").then((e)=>{
            if (e.ok) {
                return e.json();
            }
            return null;
        }).then((t)=>{
            if (!e && t?.email && t?.token) {
                if (!(IRef.current || PRef.current !== "none")) {
                    setEr(t.email);
                    setEs(t.token);
                    setEa("ok");
                }
            }
        }).catch(()=>{});
        return ()=>{
            e = true;
        };
    }, [
        w
    ]);
    useEffect(()=>{
        if (em <= 0) {
            return;
        }
        let e = setTimeout(()=>setEm((e)=>e - 1), 1000);
        return ()=>clearTimeout(e);
    }, [
        em
    ]);
    let ez = !!E && !$ && !V && !!W.trim() && !!ee.trim() && ea === "ok" && !!es && ep && !eg;
    async function eB() {
        if (!w) {
            return void requireLogin({
                action: "投稿",
                strict: true
            });
        }
        if (E && es && ez && !MRef.current) {
            MRef.current = true;
            setEg(true);
            setEy(null);
            try {
                let e = async (e)=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", e)), (e)=>e.toString(16).padStart(2, "0")).join("");
                let signature = await e(new TextEncoder().encode(JSON.stringify({
                    file: await e(await E.arrayBuffer()),
                    fileName: E.name,
                    cover: B ? await e(await B.arrayBuffer()) : null,
                    coverType: B?.type,
                    name: W.trim(),
                    author: ee.trim(),
                    home: eb.trim(),
                    email: e0(er),
                    agree: ep
                })).buffer);
                let r = ORef.current;
                if (r && r.signature !== signature) {
                    throw Error("上次投稿结果尚未核清，请先查询上次结果；重试时保留原文件和原资料");
                }
                if (!r) {
                    r = {
                        operationId: crypto.randomUUID(),
                        signature
                    };
                    window.sessionStorage.setItem(eS, JSON.stringify(r));
                    ORef.current = r;
                    setQ(r.operationId);
                }
                let body = new FormData;
                body.append("operationId", r.operationId);
                body.append("file", E);
                if (B) {
                    body.append("cover", B);
                }
                body.append("name", W);
                body.append("authorName", ee);
                body.append("homeUrl", eb);
                body.append("emailToken", es);
                body.append("agree", ep ? "1" : "0");
                let a = await fetchWithCsrf("/api/submissions", {
                    method: "POST",
                    body
                });
                let l = await a.json().catch(()=>({}));
                if (a.status === 401) {
                    return void promptLogin({
                        action: "投稿"
                    });
                }
                if (!a.ok) {
                    if (l.code === "EMAIL_UNVERIFIED") {
                        onClick();
                    }
                    if ([
                        400,
                        401,
                        403,
                        413,
                        429
                    ].includes(a.status)) {
                        eC();
                    }
                    setEy(eO(l, "提交失败，稍后再试"));
                    return;
                }
                eC();
                setE_(W);
            } catch (error) {
                setEy(error instanceof Error && ![
                    "Failed to fetch",
                    "response lost"
                ].includes(error.message) ? error.message : "提交结果尚未核清，请查询上次结果或原样重试");
            } finally{
                MRef.current = false;
                setEg(false);
            }
        }
    }
    if (e_) {
        return <div className={`${g} sbm-card-done`}><div className="sbm-done"><span className={className}><A size={22}/></span><h2>已提交，等审核</h2><p><b>《{e_}》</b>进了审核队列。结果会发站内通知（右上角铃铛），同时发到 <b>{er}</b>；通过后作品出现在建筑库，自动带 3D 逐层教学。</p><p>想改信息或撤回，通过 <_l href="/feedback" className="text-brand-primary underline underline-offset-[3px]">反馈入口</_l> 告诉我们。</p><div className="sbm-acts"><button type="button" className="sbm-btn" style={{
            height: 46
        }} onClick={function() {
            eC();
            setE(null);
            setB(null);
            set$(null);
            setG(null);
            setW("");
            setEb("");
            setEp(false);
            setE_(null);
            setEy(null);
        }}>再投一个</button><_l href="/buildings" className={y}>回建筑库</_l></div></div></div>;
    }
    let eT = G ? v_1(G.sourceMeta?.dataVersion) : null;
    return <div className={g}><div className="flex w-full items-center gap-3"><span className={className}><A_2 size={20}/></span><div className="min-w-0"><div className="text-base font-black text-brand-primary">投稿建筑</div><div className="text-[12.5px] text-text-muted">人工审核，结果发站内通知和邮件</div></div></div><div className="sbm-body"><div className="sbm-colA"><div className="sbm-lab">投影文件<em>必填</em></div><input ref={ARef} type="file" accept=".litematic,.schem" hidden onChange={(e)=>{
        let r = e.target.files?.[0];
        if (r) {
            eM(r);
        }
        e.target.value = "";
    }}/>{E && G ? <div className="sbm-file"><div className="sbm-thumb">{jsx(v, {
        model: G
    })}</div><div className="sbm-fmeta"><div className="sbm-fname">{E.name}</div><div className="sbm-fspec">{G.size[0]} × {G.size[1]} × {G.size[2]} · {G.totalBlockCount.toLocaleString()} 块{eT ? ` · Java ${eT}` : ""}</div><div className="sbm-fok">文件读取正常</div><button type="button" className="sbm-link" onClick={()=>{
        setE(null);
        setG(null);
    }}>换一个文件</button></div></div> : <button type="button" className="sbm-drop" disabled={Y} onClick={()=>ARef.current?.click()} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{
        e.preventDefault();
        let r = e.dataTransfer.files?.[0];
        if (r) {
            eM(r);
        }
    }}><A_2/>{Y ? "正在读取…" : "把投影文件拖到这里，或点击选择"}<small>.litematic / .schem · 宽×高×深 ≤ {_.maxSizeX}×{_.maxSizeY}×{_.maxSizeZ} 格 · 方块 ≤ {_.maxBlocks / 10000} 万</small></button>}{X && <div className="sbm-err">{X}</div>}<div className="sbm-field mt-4"><label className="sbm-lab" htmlFor="sbmCover">作品封面<em>选填</em></label><input id="sbmCover" type="file" accept="image/png,image/jpeg,image/webp" className={x} disabled={eg} onChange={(e)=>{
        let r = e.target.files?.[0];
        if (r) {
            if (set$(null), [
                "image/png",
                "image/jpeg",
                "image/webp"
            ].includes(r.type)) {
                if (!r.size || r.size > _.coverMaxBytes) {
                    set$(`封面不能超过 ${_.coverMaxBytes / 1024 / 1024} MB`);
                } else {
                    setB(r);
                }
            } else {
                set$("封面只收 PNG、JPEG 或 WebP 静态图片");
            }
        }
        e.target.value = "";
    }}/><div className="sbm-hint">已有作品截图或渲染图可一并提交，仅供审核；PNG / JPEG / WebP，不超过 {_.coverMaxBytes / 1024 / 1024} MB。</div>{F && <img src={F} alt="待提交的封面预览" className="mt-2 max-h-48 w-full border-2 border-border-soft object-contain"/>}{B && <button type="button" className="sbm-link" disabled={eg} onClick={()=>{
        setB(null);
        set$(null);
    }}>移除封面</button>}{$ && <div className="sbm-err">{$}</div>}</div></div><div className="sbm-colB"><div className="sbm-pair"><div className="sbm-field"><label className="sbm-lab" htmlFor="sbmName">作品名称<em>必填</em></label><input id="sbmName" className={x} maxLength={_.nameMax} placeholder="例如：湖边垂钓小屋" value={W} onChange={(e)=>setW(e.target.value)}/></div><div className="sbm-field"><label className="sbm-lab" htmlFor="sbmAuthor">作者署名<em>必填</em></label><input id="sbmAuthor" className={x} maxLength={_.authorMax} placeholder={w ? "作品页显示的作者名" : "登录后默认填你的昵称"} value={ee} onChange={(e)=>setEe(e.target.value)}/><div className="sbm-hint">作品页「作者」一栏显示这个名字</div></div></div><div className="sbm-field"><label className="sbm-lab" htmlFor="sbmEmail">联系邮箱<em>必填 · 要验证</em></label>{ea === "ok" ? <><div className="sbm-inrow"><input id="sbmEmail" className={x} value={er} readOnly/><span className="sbm-ok">已验证</span></div><div className="sbm-hint">审核结果发站内通知，同时发到这个邮箱；邮箱不公开 · <button type="button" className="sbm-link" onClick={onClick}>换一个邮箱</button></div></> : ea === "sent" ? <><div className="sbm-inrow"><input id="sbmEmail" className={x} value={er} readOnly/><button type="button" className="sbm-btn sbm-btn--in" disabled={em > 0 || ek} onClick={()=>void eP()}>{ek ? "发送中…" : em > 0 ? `${em} 秒后重发` : "重发"}</button></div><div className="sbm-inrow" style={{
        marginTop: 8
    }}><input className={`${x} sbm-code`} inputMode="numeric" maxLength={6} placeholder="6 位验证码" value={eo} onChange={(e)=>setEo(e.target.value.replace(/\D/g, "").slice(0, 6))}/><button type="button" className="sbm-btn sbm-btn--in" onClick={()=>void eL()}>确认</button></div><div className={`sbm-hint${eu ? " is-err" : ""}`}>{eu || `验证码已发到 ${er}，5 分钟内有效；收不到看看垃圾邮件`} · <button type="button" className="sbm-link" onClick={onClick}>改邮箱</button></div></> : <><div className="sbm-inrow"><input id="sbmEmail" type="email" className={x} placeholder="name@example.com" value={er} onChange={(e)=>{
        IRef.current = true;
        setEr(e.target.value);
    }}/><button type="button" className="sbm-btn sbm-btn--in" disabled={!e0(er) || em > 0 || ek} onClick={()=>void eP()}>{ek ? "发送中…" : em > 0 ? `${em} 秒后重发` : "发送验证码"}</button></div><div className={`sbm-hint${eu ? " is-err" : ""}`}>{eu || "审核结果会发到这里，要先确认能收到；邮箱不公开"}</div></>}</div><div className="sbm-field"><label className="sbm-lab" htmlFor="sbmHome">个人公开主页<em>选填</em></label><input id="sbmHome" className={x} maxLength={_.homeUrlMax} placeholder="B 站 / 抖音 / 快手主页链接" value={eb} onChange={(e)=>setEb(e.target.value)}/><div className="sbm-hint">通过后作品页显示「作者主页」按钮，只收这几个平台的链接</div></div></div><label className="sbm-chk"><input type="checkbox" checked={ep} onChange={(e)=>setEp(e.target.checked)}/><span className="sbm-box"><A_3 size={13}/></span><span>我确认这是<b>我本人的作品，或已获得原作者授权</b>，并同意作品公开展示和提供下载</span></label><button type="button" className={`sbm-go mt-[14px] ${y}`} disabled={k || !!w && !ez} onClick={()=>void eB()}>{eg ? "提交中…" : w ? "提交审核" : "登录后提交"}</button>{ey && <div className="sbm-err">{ey}</div>}<p className={`sbm-foot mt-[11px] w-full text-center text-[11.5px] text-text-disabled`}>{k ? "" : w ? ea === "ok" ? "审核结果发站内通知和邮件" : "邮箱验证后才能提交" : "会先弹出登录框，登录后接着填，填好的内容不丢"}{q && <span className="mt-2 block"><span className="block">本次投稿编号：{q}</span><button type="button" className="sbm-link" disabled={eg} onClick={()=>void eA()}>查询上次投稿结果</button><span className="block">结果未确认时请保留原文件和资料，原样重试会沿用这个编号。</span></span>}</p></div></div>;
}
export { WComponent as default };
