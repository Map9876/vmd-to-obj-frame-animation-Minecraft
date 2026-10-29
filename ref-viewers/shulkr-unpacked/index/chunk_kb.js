import { t as t_1 } from "../current-Bq9r6xhE.js";
import { t as t_2 } from "../useSuspenseQuery-BRxKcF3h.js";
import { n, r as r_1 } from "../meta-C9WvV8WX.js";
import { r as r_2 } from "../route-messages-9yrojIBL.js";
import { n as n_2, t as t_3 } from "../routing-Gv_vGkrc.js";
import { n as n_3 } from "../queries-DlYwNVUA.js";
import { n as n_4 } from "../urls-CrsGixfG.js";
const kb = (namespace, t)=>n_3({
        namespace,
        slug: t.slug,
        locale: t.locale
    });
export function Ab(e) {
    return async ({ params, context })=>{
        let [, r] = await Promise.all([
            context.queryClient.ensureQueryData(kb(e, params)),
            r_2({
                data: {
                    locale: t_1(),
                    namespaces: [
                        `Directory`,
                        `Subtype`
                    ]
                }
            })
        ]);
        return r;
    };
}
export function jb(e, t) {
    return t_2(kb(e, t)).data;
}
export function Mb(e) {
    return ({ match, params })=>{
        let r = match.context.queryClient.getQueryData(kb(e, params).queryKey);
        if (!r) {
            return {};
        }
        let i = `/schematics/${r.namespace}/${r.slug}`;
        let canonical = n_2(i, r.siteUrl, t_1());
        return {
            ...r_1({
                title: r.title,
                absoluteTitle: true,
                description: r.description,
                canonical,
                hreflang: t_3(i, r.siteUrl),
                index: r.indexable,
                image: n_4(r.siteUrl, t_1())
            }),
            scripts: r.indexable ? [
                n(Nb(r, canonical)),
                n(Pb(r))
            ] : []
        };
    };
}
function Nb(e, url) {
    let n = t_1();
    return {
        "@context": `https://schema.org`,
        "@type": `ItemList`,
        name: e.heading,
        url,
        numberOfItems: e.catalog.total,
        itemListElement: e.catalog.items.map((t, r)=>({
                "@type": `ListItem`,
                position: r + 1,
                name: t.title,
                url: n_2(`/schematics/${t.id}/${t.slug}`, e.siteUrl, n)
            }))
    };
}
function Pb(e) {
    let t = t_1();
    let n = [
        {
            name: `Shulkr`,
            item: n_2(`/`, e.siteUrl, t)
        },
        {
            name: `Minecraft Schematics`,
            item: n_2(`/schematics`, e.siteUrl, t)
        }
    ];
    if (e.parent) {
        n.push({
            name: e.parent.heading,
            item: n_2(`/schematics/${e.parent.namespace}/${e.parent.slug}`, e.siteUrl, t)
        });
    }
    n.push({
        name: e.heading
    });
    return {
        "@context": `https://schema.org`,
        "@type": `BreadcrumbList`,
        itemListElement: n.map((e, t)=>({
                "@type": `ListItem`,
                position: t + 1,
                ...e
            }))
    };
}
