import { _ } from "./markdown-nXGeLLbi/chunk_m.js";
import { t } from "./jsx-runtime-Db0DjQYK.js";
import { n as n_1 } from "./current-Bq9r6xhE.js";
import { t as N } from "./link-C5CNVKC3.js";
import { i as i_1 } from "./react-LvWBhTF7.js";
import { d, f, h, p } from "./dist-C5TDMOul.js";
import { t as t_2 } from "./utils-B6KiDbIe.js";
import { t as L } from "./box-DpWO1Dds.js";
import { n as U, t as t_3 } from "./lib-BH1Zsaz9.js";
import { t as F } from "./user-name-Doik7BrP.js";
import { n as n_2 } from "./safe-href-CtVGEDi6.js";
const v = t();
const className = `inline-flex max-w-full items-center gap-1 border border-border bg-muted/60 px-1.5 align-baseline text-[12px] font-medium leading-5 text-foreground`;
function BComponent({ label }) {
    return <span className={t_2(className, `text-muted-foreground`)}>{label}</span>;
}
function XComponent({ user }) {
    return <N to={`/$locale/users/$handle`} params={{
        locale: n_1(),
        handle: user.handle
    }} className={t_2(className, `border-transparent bg-accent/60 text-accent-foreground hover:bg-accent`)}><F name={`@${user.name}`} badge={user.badge}/></N>;
}
function SComponent({ id, schematic }) {
    return <N to={`/$locale/schematics/$id/{-$slug}`} params={{
        locale: n_1(),
        id,
        slug: schematic.slug
    }} className={t_2(className, `hover:bg-muted`)}><L aria-hidden className={`size-3.5 shrink-0 text-muted-foreground`}/><span className={`truncate`}>{schematic.title}</span></N>;
}
function C(e) {
    return (e.includes(`:`) ? e.slice(e.indexOf(`:`) + 1) : e).replace(/_/g, ` `).replace(/\b\w/g, (e)=>e.toUpperCase());
}
function WComponent({ id, info }) {
    let n = info?.label ?? C(id);
    return <span className={className} title={id}>{info?.iconUrl ? <img src={info.iconUrl} alt={``} loading={`lazy`} className={`size-4 shrink-0`}/> : null}{n}</span>;
}
function T(children) {
    if (typeof children == `string`) {
        return children;
    }
    if (Array.isArray(children) && children.length === 1 && typeof children[0] == `string`) {
        return children[0];
    }
}
function E(href) {
    return /\/schematics\/([0-9A-Za-z]{12})(?![0-9A-Za-z])/.exec(href)?.[1] ?? undefined;
}
export function n({ children, className, references }) {
    let i = i_1(`Markdown`);
    return <div className={t_2(`flex max-w-[64ch] flex-col gap-3 text-sm leading-relaxed text-foreground-secondary wrap-anywhere`, className)}><U remarkPlugins={[
        t_3,
        _
    ]} disallowedElements={[
        `img`
    ]} components={{
        h1: ({ children })=><h3 className={`mt-2 text-base text-foreground first:mt-0`}>{children}</h3>,
        h2: ({ children })=><h3 className={`mt-2 text-base text-foreground first:mt-0`}>{children}</h3>,
        h3: ({ children })=><h4 className={`mt-1.5 text-sm text-foreground first:mt-0`}>{children}</h4>,
        h4: ({ children })=><h4 className={`mt-1.5 text-sm text-foreground first:mt-0`}>{children}</h4>,
        h5: ({ children })=><h4 className={`mt-1.5 text-sm text-foreground first:mt-0`}>{children}</h4>,
        h6: ({ children })=><h4 className={`mt-1.5 text-sm text-foreground first:mt-0`}>{children}</h4>,
        span: ({ node, children, ...rest })=>{
            let a = rest;
            let o = a[`data-mention-id`];
            if (typeof o == `string`) {
                let e = references?.users?.[o];
                if (e) {
                    return <XComponent user={e}/>;
                }
                return <BComponent label={i(`unknownUser`)}/>;
            }
            let s = a[`data-mention-handle`];
            if (typeof s == `string`) {
                let e = references?.usersByHandle?.[s];
                if (e) {
                    return <XComponent user={e}/>;
                }
                return children;
            }
            let c = a[`data-block-id`];
            if (typeof c == `string`) {
                return <WComponent id={c} info={references?.blocks?.[c]}/>;
            }
            let l = a[`data-schematic-id`];
            if (typeof l == `string`) {
                let e = references?.schematics?.[l];
                if (e) {
                    return <SComponent id={l} schematic={e}/>;
                }
                return <BComponent label={i(`unknownBuild`)}/>;
            }
            return <span {...rest}>{children}</span>;
        },
        a: ({ href, children })=>{
            let href_1 = n_2(href);
            if (!href_1) {
                return <>{children}</>;
            }
            let a = E(href_1);
            if (a && T(children) === href_1) {
                let e = references?.schematics?.[a];
                if (e) {
                    return <SComponent id={a} schematic={e}/>;
                }
                if (href_1.startsWith(`/`) || references?.siteOrigin !== undefined && href_1.startsWith(`${references.siteOrigin}/`)) {
                    return <BComponent label={i(`unknownBuild`)}/>;
                }
            }
            return <a href={href_1} target={`_blank`} rel={`nofollow ugc noopener noreferrer`} className={`font-medium text-accent-foreground underline underline-offset-2 hover:text-foreground`}>{children}</a>;
        },
        ul: ({ children })=><ul className={`list-disc space-y-1 pl-5`}>{children}</ul>,
        ol: ({ children })=><ol className={`list-decimal space-y-1 pl-5`}>{children}</ol>,
        code: ({ children })=><code className={`bg-muted px-1 py-0.5 font-mono text-[12px]`}>{children}</code>,
        pre: ({ children })=><pre className={`overflow-x-auto border border-border bg-muted/60 p-3 text-[12px]`}>{children}</pre>,
        blockquote: ({ children })=><blockquote className={`border-l-2 border-input pl-3 text-muted-foreground`}>{children}</blockquote>,
        strong: ({ children })=><strong className={`font-semibold text-foreground`}>{children}</strong>,
        table: ({ children })=><div className={`overflow-x-auto`}><table className={`border-collapse text-[13px] [&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-border [&_th]:bg-muted/60 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left`}>{children}</table></div>
    }}>{children}</U></div>;
}
export { className as i, BComponent as r, WComponent as t };
