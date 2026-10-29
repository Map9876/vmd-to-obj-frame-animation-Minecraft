import { c, d, h, l, n, p, r, u } from "../schemas-Y3Thg5L-.js";
export const Ct = 1000000;
export const wt = n([
    `draft`,
    `quick`,
    `detailed`
]);
export const Tt = `quick`;
export const X = [
    `tiny`,
    `small`,
    `medium`,
    `large`
];
export const Et = n(X);
const scale = n([
    `player`,
    `miniature`,
    `monument`,
    `scene`
]);
export const Ot = d({
    subject: p().min(1).max(200),
    features: r(p().min(1).max(200)).min(1).max(6),
    palette: r(p().min(1).max(80)).min(1).max(12),
    scale,
    dimensions: d({
        width: u().int().min(1).max(512),
        depth: u().int().min(1).max(512),
        height: u().int().min(1).max(512),
        storeys: u().int().min(1).max(30).optional(),
        storeyHeight: u().int().min(1).max(30).optional()
    }),
    tasks: r(p().min(1).max(200)).min(1).max(12)
});
export const kt = {
    tiny: {
        width: 32,
        height: 32,
        depth: 48
    },
    small: {
        width: 64,
        height: 64,
        depth: 64
    },
    medium: {
        width: 128,
        height: 128,
        depth: 128
    },
    large: {
        width: 192,
        height: 112,
        depth: 192
    }
};
const At = {
    worldSize: `small`
};
export function jt(e) {
    return X.indexOf(e) <= X.indexOf(At.worldSize);
}
const Mt = 500000;
export const Nt = 512000;
const Pt = h([
    l({
        type: c(`file`),
        mediaType: p().regex(/^image\//),
        imageId: p().min(1).max(64)
    }),
    l({
        type: c(`file`),
        mediaType: p().regex(/^image\//),
        url: h([
            p().startsWith(`data:image/`).max(Mt),
            p().startsWith(`https://`).max(2048)
        ])
    })
]);
export const Z = d({
    id: p().optional(),
    role: n([
        `system`,
        `user`,
        `assistant`
    ]),
    parts: r(l({
        type: p()
    })).max(400),
    metadata: l({}).optional()
}).superRefine((e, t)=>{
    let n = e.parts.filter((e)=>e.type === `file`);
    if (n.length !== 0) {
        if (e.role !== `user`) {
            t.addIssue({
                code: `custom`,
                message: `file parts are only allowed on user messages`
            });
            return;
        }
        if (n.length > 4) {
            t.addIssue({
                code: `custom`,
                message: `at most 4 images per message`
            });
            return;
        }
        for (let e of n){
            if (!Pt.safeParse(e).success) {
                t.addIssue({
                    code: `custom`,
                    message: `file parts must carry an imageId (or, for old messages, a bounded image URL)`
                });
                return;
            }
        }
    }
});
const Ft = 2000000;
export const It = p().trim().min(1).max(120);
export const Lt = n([
    `user`,
    `assistant`
]);
export const Rt = d({
    title: It,
    actor: Lt
});
export const zt = d({
    cells: p().min(1).max(Ft)
});
export const Q = u().int().min(0).max(100000);
export const Bt = d({
    plan: Ot,
    completed: r(u().int().min(0))
});
