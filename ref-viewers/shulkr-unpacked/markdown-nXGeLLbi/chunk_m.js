import { d, f, h as h_1, p } from "../dist-C5TDMOul.js";
const m = [
    {
        regex: p,
        props: (e)=>({
                "data-mention-id": e[1]
            })
    },
    {
        regex: f,
        props: (e)=>({
                "data-mention-handle": e[1]
            })
    },
    {
        regex: d,
        props: (e)=>({
                "data-block-id": h_1(e[1] ? `${e[1]}:${e[2]}` : e[2])
            })
    },
    {
        regex: /(?<![0-9A-Za-z/])\/schematics\/([0-9A-Za-z]{12})(?:\/[a-z0-9-]+)?(?![0-9A-Za-z])/g,
        props: (e)=>({
                "data-schematic-id": e[1]
            })
    }
];
function h(e) {
    let t = [];
    for (let { regex, props } of m){
        for (let i of e.matchAll(regex)){
            t.push({
                start: i.index,
                end: i.index + i[0].length,
                props: props(i)
            });
        }
    }
    t.sort((e, t)=>e.start - t.start);
    let n = [];
    let r = 0;
    for (let e of t){
        if (!(e.start < r)) {
            n.push(e);
            r = e.end;
        }
    }
    return n;
}
function g(e) {
    let t = e.value ?? ``;
    let n = h(t);
    if (n.length === 0) {
        return [
            e
        ];
    }
    let r = [];
    let i = 0;
    for (let e of n){
        if (e.start > i) {
            r.push({
                type: `text`,
                value: t.slice(i, e.start)
            });
        }
        r.push({
            type: `referenceChip`,
            data: {
                hName: `span`,
                hProperties: e.props
            },
            children: [
                {
                    type: `text`,
                    value: t.slice(e.start, e.end)
                }
            ]
        });
        i = e.end;
    }
    if (i < t.length) {
        r.push({
            type: `text`,
            value: t.slice(i)
        });
    }
    return r;
}
export function _() {
    return (e)=>{
        let t = (e)=>{
            if (e.children) {
                if (!(e.type === `link` || e.type === `linkReference`)) {
                    e.children = e.children.flatMap((e)=>{
                        if (e.type === `text`) {
                            return g(e);
                        }
                        t(e);
                        return [
                            e
                        ];
                    });
                }
            }
        };
        t(e);
    };
}
