import "./module-86897.js";
import { useState } from "./module-61426.js";
import { MP } from "./module-98901_5.js";
import { kh } from "./module-13160.js";
let r = [
    "哪一步方块太多，跟不上？",
    "哪个位置转了视角还是看不清？",
    "材料或说明出现得太早、太晚？",
    "想先看到哪座建筑被拆成步骤？"
];
function CComponent() {
    let [e, setE] = useState(null);
    let [n, setN] = useState("");
    let [o, setO] = useState("idle");
    let [u, setU] = useState("");
    let onClick = async ()=>{
        if (o === "sending") {
            return;
        }
        let content = n.trim();
        if (!e && content.length < 10) {
            setO("error");
            setU("选一个最接近的，或者写下具体卡在哪里（至少 10 字）");
            return;
        }
        setO("sending");
        setU("");
        try {
            let n = await fetch("/api/step-teaching/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    choice: e,
                    content
                })
            });
            let l = await n.json().catch(()=>null);
            if (n.ok && l?.success) {
                MP("step_feedback", {
                    id: l.id ?? null,
                    choice: e,
                    len: content.length
                });
                setO("ok");
                setU("收到了，谢谢。我们会先看最影响跟搭的问题。");
                setN("");
                return;
            }
            setO("error");
            setU(l?.error?.message || "提交失败，稍后再试一次");
        } catch (e) {
            setO("error");
            setU("网络不太好，稍后再试一次");
        }
    };
    let m = o === "ok";
    return <div className="stl-fb"><div className="stl-fb-main"><div className="stl-fb-q" id="stl-fb-q1">和照着视频或图文搭比，怎么样？</div><div className="stl-fb-opts" role="group" aria-labelledby="stl-fb-q1">{kh.map((n)=><button key={n.value} type="button" className={`stl-fb-opt${e === n.value ? " is-on" : ""}`} aria-pressed={e === n.value} onClick={()=>setE((e)=>{
                if (e === n.value) {
                    return null;
                }
                return n.value;
            })}>{n.label}</button>)}</div><label className="stl-fb-q stl-fb-q2" htmlFor="stl-fb-text">具体卡在哪？</label><textarea id="stl-fb-text" className="stl-fb-ta" value={n} maxLength={2000} onChange={(e)=>setN(e.target.value)} placeholder="例如：屋顶那一步方块太多，跟不上；背面的方块转了角度还是看不清；材料清单出现得太晚……"/><div className="stl-fb-send"><button type="button" className="stl-fb-btn" onClick={onClick} disabled={o === "sending" || m}>{o === "sending" ? "提交中…" : m ? "已提交" : "提交"}</button><span className="stl-fb-note">广告、辱骂和与体验无关的内容不会公开。</span></div>{u && <p className={`stl-fb-msg ${o === "ok" ? "is-ok" : "is-err"}`} role="status">{u}</p>}</div><aside className="stl-fb-side"><div className="stl-fb-side-h">可以说说这些</div><ol className="stl-fb-side-l">{r.map((e, t)=><li key={e} className="stl-fb-side-i"><b>{String(t + 1).padStart(2, "0")}</b><span>{e}</span></li>)}</ol></aside></div>;
}
export { CComponent as default };
