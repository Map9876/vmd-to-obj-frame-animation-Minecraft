import "./module-86897.js";
import { Fragment as Fragment_1 } from "./module-61426.js";
import { A } from "./module-40990.js";
import { v } from "./module-15633.js";
import * as u from "./module-2053.js";
const a = require(64991);
const i = require(26545);
const c = require(55822);
function o(e) {
    let t = c.tX[e];
    if (!t) {
        return "rgb(128, 128, 128)";
    }
    let [n, l, r] = t.map((e)=>Math.round(255 * e));
    return `rgb(${n}, ${l}, ${r})`;
}
function MComponent({ label, lines }) {
    return <div className="bdi-sign-face"><span>{label}</span>{lines.length > 0 ? <b>{lines.map((e, t)=><Fragment_1 key={t}>{t > 0 && <br/>}{e}</Fragment_1>)}</b> : <b className="is-empty">（空）</b>}</div>;
}
function PComponent({ content, children }) {
    if (!content && !children) {
        return null;
    }
    let { sign, banner, customName } = content ?? {};
    return <div className="bdi-jade-more">{sign && <><p className="bdi-jade-more-label">牌面文字</p><MComponent label="正面" lines={sign.front}/><MComponent label="背面" lines={sign.back}/></>}{banner && <><p className="bdi-jade-more-label">{`图案 · ${banner.layers.length} 层`}</p>{banner.base && <div className="bdi-pattern-row"><i className="bdi-pattern-dot" style={{
        background: banner.base.color
    }}/><span>{banner.base.label}</span></div>}{banner.layers.map((e)=><div key={e.index} className="bdi-pattern-row"><i className="bdi-pattern-dot" style={{
            background: e.color
        }}/><span className="bdi-pattern-name">{e.pattern}</span><span className="bdi-pattern-idx">{e.index}</span></div>)}</>}{customName && <div className="bdi-jade-more-kv"><span>名称</span><b>{customName}</b></div>}{children}</div>;
}
let h = (e)=>u.C(e).name;
function FComponent({ label, onJump }) {
    if (onJump) {
        return <button type="button" className="bdi-jade-step" onClick={onJump}><span className="bdi-jade-step-arrow">▸</span><span>{label}</span></button>;
    }
    return <div className="bdi-jade-step is-static"><span>{label}</span></div>;
}
let b = (stepIndex, stepTitle)=>{
    if (stepIndex === undefined) {
        return null;
    }
    return `属于第 ${stepIndex + 1} 步${stepTitle ? ` · ${stepTitle}` : ""}`;
};
export function X({ ref, shifted, block, displayName, textureUrl, onlyThis, onToggleOnlyThis, onFocus, stepIndex, stepTitle, onJump }) {
    let v = block.blockId || "";
    let content = ((block_1)=>{
        let i = {};
        let e_tileText = block_1.tileText;
        if (e_tileText?.signFront || e_tileText?.signBack) {
            i.sign = {
                front: e_tileText.signFront ?? [],
                back: e_tileText.signBack ?? []
            };
        }
        let d = block_1.renderData?.banner;
        if (d?.patterns && d.patterns.length > 0) {
            let t = c.rm(d.baseColor) ?? c.jD(block_1.blockId);
            i.banner = {
                base: t ? {
                    label: `底色 ${c.sj[t] ?? t}`,
                    color: o(t)
                } : null,
                layers: d.patterns.map((e, t)=>({
                        pattern: e.pattern,
                        color: o(e.color),
                        index: t + 1
                    }))
            };
        }
        if (e_tileText?.customName) {
            i.customName = e_tileText.customName;
        }
        if (Object.keys(i).length > 0) {
            return i;
        }
        return null;
    })(block);
    let k = b(stepIndex, stepTitle);
    let C = !!content || k !== null;
    return <div ref={ref} className={`bdi-selection-card ${shifted ? "is-shifted" : ""}${C ? " has-content" : ""}${onFocus ? " has-focus" : ""}`}><span className="bdi-jade-tex">{textureUrl ? <img src={textureUrl} alt={displayName}/> : <a.A size={16}/>}</span><span className="bdi-jade-txt"><b>{displayName}</b><small className="bdi-selection-id">{v}</small></span><i className="bdi-jade-sep" aria-hidden="true"/><button type="button" className={`bdi-jade-act ${onlyThis ? "is-on" : ""}`} onClick={onToggleOnlyThis} aria-pressed={onlyThis} aria-label="只看这一种方块" title="只看这一种方块"><i.A size={15}/></button>{onFocus && <button type="button" className="bdi-jade-focus" onClick={onFocus} title="聚焦这里" aria-label="聚焦这里"><A size={14} className="bdi-jade-focus-icon" aria-hidden="true"/><span>聚焦<span className="bdi-jade-focus-suffix">这里</span></span></button>}{C && <PComponent content={content}>{k && <FComponent label={k} onJump={onJump}/>}</PComponent>}</div>;
}
export function z({ ref, shifted, entity, stepIndex, stepTitle, onJump }) {
    u.k(true);
    let m = v(entity, h);
    let textureUrl = u.C(m.iconItemId).textureUrl;
    let x = b(stepIndex, stepTitle);
    let g = m.groups.length > 0 || x !== null;
    return <div ref={ref} className={`bdi-selection-card ${shifted ? "is-shifted" : ""}${g ? " has-content" : ""}`}><span className="bdi-jade-tex">{textureUrl ? <img src={textureUrl} alt={m.title}/> : <a.A size={16}/>}</span><span className="bdi-jade-txt"><b>{m.title}</b><small className="bdi-selection-id">{m.entityId}</small></span>{g && <div className="bdi-jade-more">{m.groups.map((e, t)=><Fragment_1 key={t}>{e.label && <p className="bdi-jade-more-label">{e.label}</p>}{e.rows.map((e, t)=><div key={t} className="bdi-jade-more-kv"><span>{e.label}</span><b className={e.mono ? "is-mono" : undefined}>{e.value}</b></div>)}</Fragment_1>)}{x && <FComponent label={x} onJump={onJump}/>}</div>}</div>;
}
