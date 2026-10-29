function Cr(e) {
    let t = String(e);
    if (/[",\n]/.test(t)) {
        return `"${t.replace(/"/g, `""`)}"`;
    }
    return t;
}
function wr(remainder, stackSize) {
    if (stackSize <= 1) {
        return {
            stacks: 0,
            remainder
        };
    }
    return {
        stacks: Math.floor(remainder / stackSize),
        remainder: remainder % stackSize
    };
}
export function Tr(e, t) {
    if (e === `json`) {
        let items = t.map((e)=>({
                id: e.id,
                name: e.label,
                count: e.count,
                stackSize: e.stackSize,
                ...wr(e.count, e.stackSize)
            }));
        return {
            body: JSON.stringify({
                total: t.reduce((acc, item)=>acc + item.count, 0),
                items
            }, null, 2),
            mime: `application/json`
        };
    }
    if (e === `csv`) {
        let e = [
            `Block`,
            `Id`,
            `Count`,
            `Stacks`,
            `Remainder`
        ];
        let n = t.map((e)=>{
            let { stacks, remainder } = wr(e.count, e.stackSize);
            return [
                e.label,
                e.id,
                e.count,
                stacks,
                remainder
            ].map(Cr).join(`,`);
        });
        return {
            body: [
                e.join(`,`),
                ...n
            ].join(`
`),
            mime: `text/csv`
        };
    }
    return {
        body: t.map((e)=>`${e.count}\t${e.label}`).join(`
`),
        mime: `text/plain`
    };
}
