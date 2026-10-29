function l(e, t) {
    let n = URL.createObjectURL(e);
    let l = document.createElement("a");
    l.href = n;
    l.download = t;
    document.body.appendChild(l);
    l.click();
    document.body.removeChild(l);
    setTimeout(()=>URL.revokeObjectURL(n), 1000);
}
export async function XV(e, t) {
    if (!e.length) {
        return;
    }
    let r = await Promise.all([
        require.e(3524),
        require.e(8436)
    ]).then(require.bind(require, 4246));
    let a = e.map((e)=>({
            "方块 ID": e.name,
            中文名: e.chineseName || "",
            数量: e.count
        }));
    let i = r.utils.json_to_sheet(a);
    i["!cols"] = [
        {
            wch: 28
        },
        {
            wch: 18
        },
        {
            wch: 10
        }
    ];
    let s = r.utils.book_new();
    r.utils.book_append_sheet(s, i, "材料清单");
    l(new Blob([
        r.write(s, {
            type: "array",
            bookType: "xlsx"
        })
    ], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }), `${t || "建筑"}-材料清单.xlsx`);
}
export function E2(e, t) {
    if (!e.length) {
        return;
    }
    let n = (e)=>`"${String(e).replace(/"/g, '""')}"`;
    l(new Blob([
        `﻿${[
            [
                "方块ID",
                "中文名",
                "数量"
            ],
            ...e.map((e)=>[
                    e.name,
                    e.chineseName || "",
                    e.count
                ])
        ].map((e)=>e.map(n).join(",")).join("\r\n")}\r\n`
    ], {
        type: "text/csv;charset=utf-8"
    }), `${t || "建筑"}-材料清单.csv`);
}
