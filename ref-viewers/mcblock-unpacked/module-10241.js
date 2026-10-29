import "./module-86897.js";
import { A } from "./module-2186.js";
let a = [
    {
        key: "拖动",
        label: "旋转视角"
    },
    {
        key: "滚轮",
        label: "缩放远近"
    },
    {
        key: "右键",
        label: "平移画面"
    }
];
let i = [
    {
        key: "← →",
        label: "上一层 / 下一层"
    },
    {
        key: "空格",
        label: "播放 / 暂停"
    },
    {
        key: "F",
        label: "全屏 / 退出"
    }
];
let s = [
    {
        key: "单指拖动",
        label: "旋转视角"
    },
    {
        key: "双指开合",
        label: "缩放远近"
    },
    {
        key: "双指拖动",
        label: "平移画面"
    },
    {
        key: "点击方块",
        label: "看名称与用量"
    }
];
export function O({ isOpen, onClose, coarsePointer = false }) {
    if (isOpen) {
        return <div className="bdi-help-pop"><button type="button" className="bdi-help-mask" onClick={onClose} aria-label="关闭帮助"/><div className="bdi-help-card" role="dialog" aria-modal="true" aria-label="操作帮助"><div className="bdi-help-head"><b>操作帮助</b><button type="button" onClick={onClose} aria-label="关闭帮助"><A size={14}/></button></div><div className="bdi-help-body">{(coarsePointer ? [
            {
                title: "手势",
                rows: s
            }
        ] : [
            {
                title: "鼠标",
                rows: a
            },
            {
                title: "键盘",
                rows: i
            }
        ]).map((e)=><section key={e.title} className="bdi-help-group"><span>{e.title}</span>{e.rows.map((e)=><div key={e.label}><kbd>{e.key}</kbd><em>{e.label}</em></div>)}</section>)}</div></div></div>;
    }
    return null;
}
