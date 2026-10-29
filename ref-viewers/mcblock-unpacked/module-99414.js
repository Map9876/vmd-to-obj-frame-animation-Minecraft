import "./module-86897.js";
import { useEffect, useState } from "./module-61426.js";
import { A } from "./module-44748_4.js";
import { A as A_1 } from "./module-4996.js";
import { A as A_2 } from "./module-2186.js";
function OComponent({ delistedAt, reason, retentionDays = 30, projectionUrl, buildingName }) {
    let [u, setU] = useState(true);
    let m = new Date(delistedAt);
    let p = Math.max(0, retentionDays - Math.floor((Date.now() - m.getTime()) / 86400000));
    let b = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}-${String(m.getDate()).padStart(2, "0")}`;
    useEffect(()=>{
        try {
            let e = `mcb_delist_seen_${buildingName}`;
            if (sessionStorage.getItem(e)) {
                setU(false);
            } else {
                sessionStorage.setItem(e, "1");
            }
        } catch (e) {}
    }, [
        buildingName
    ]);
    return <div className="dln-wrap" role="status"><div className="wrap dln-in"><A size={18} stroke={2} className="dln-ico" aria-hidden/><div className="dln-txt"><b>{reason}</b><span className="dln-sub">下架于 {b}{p > 0 ? `，文件将在 ${p} 天后清理 —— 需要的话请尽快下载保存。` : "，保留期已到，文件随时可能被清理，请立即下载保存。"}</span></div>{projectionUrl && <a className="dln-btn" href={projectionUrl} download><A_1 size={15} stroke={2} aria-hidden/>下载投影</a>}<button className="dln-x" onClick={()=>setU(false)} aria-label="收起提示"><A_2 size={15} stroke={2} aria-hidden/></button></div>{u && <div className="wrap dln-more">这座内容不属于建筑库的收录范围（建筑库只收建筑本体），因此从列表中移除。 你的收藏和学习记录都还在，详情页也可以继续访问，<b>但保留期结束后会被清理</b>，届时链接将失效。</div>}</div>;
}
export { OComponent as default };
