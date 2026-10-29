import "./module-86897.js";
import * as a from "./module-15239.js";
import { useId } from "./module-61426.js";
import { A } from "./module-2186.js";
import { d } from "./module-16010_2.js";
import { EZ } from "./module-98658.js";
import { O9 } from "./module-78968.js";
const l = require(68595);
function UComponent({ announcement, preview = false, onClose, onGo }) {
    let id = useId();
    let h = EZ[announcement.type] || EZ.notice;
    let b = !preview;
    let g = O9(announcement.displayConfig);
    let onClick = ()=>{
        if (b) {
            if (announcement.link) {
                if (onGo != null) {
                    onGo(announcement.link);
                }
            } else if (onClose != null) {
                onClose("ok");
            }
        }
    };
    let v = <section className={`mcb-pop-card${announcement.image ? "" : " mcb-pop-no-image"}${preview ? " mcb-pop-preview" : ""}${g ? " mcb-pop-unified" : ""}`} role={preview ? "group" : "dialog"} aria-modal={!preview || undefined} aria-labelledby={id}><button type="button" className="mcb-pop-close" aria-label="关闭" title="关闭" disabled={!b} onClick={()=>onClose?.("x")}><A aria-hidden="true"/></button><div className="mcb-pop-grid" aria-hidden="true"/><a.default className="mcb-pop-cube mcb-pop-cube-one" src={d("/images/icons/Cube_1.png")} alt="" width={120} height={120} unoptimized/><a.default className="mcb-pop-cube mcb-pop-cube-two" src={d("/images/icons/Cube_6.png")} alt="" width={100} height={100} unoptimized/><a.default className="mcb-pop-cube mcb-pop-cube-three" src={d("/images/icons/Cube_5.png")} alt="" width={110} height={110} unoptimized/><div className="mcb-pop-content"><div className="mcb-pop-reading"><div className="mcb-pop-eyebrow"><span className="mcb-pop-eyebrow-dot" aria-hidden="true"/><span>{h}</span>{announcement.fact && <span className="mcb-pop-fact">· {announcement.fact}</span>}</div><h2 className="mcb-pop-title" id={id}>{announcement.title}</h2><div className="mcb-pop-body">{announcement.image && (announcement.link ? <button type="button" className="mcb-pop-image-action" onClick={onClick} disabled={!b} aria-label="查看详情"><a.default className="mcb-pop-image" src={announcement.image} alt="" width={600} height={520} unoptimized/></button> : <a.default className="mcb-pop-image" src={announcement.image} alt="" width={600} height={520} unoptimized/>)}<p className="mcb-pop-text">{announcement.text}</p></div></div><div className="mcb-pop-actions">{announcement.button && announcement.link ? <button type="button" className="mcb-pop-action" onClick={onClick} disabled={!b}><span>{announcement.button}</span>{announcement.link && <l.A aria-hidden="true"/>}</button> : g ? null : <button type="button" className="mcb-pop-action" onClick={()=>onClose?.("ok")} disabled={!b}>知道了</button>}{g && <button type="button" className="mcb-pop-action" onClick={()=>onClose?.("ok")} disabled={!b}>我知道了</button>}</div></div></section>;
    if (preview) {
        return <div className="mcb-pop-preview-frame">{v}</div>;
    }
    return v;
}
export { UComponent as A };
