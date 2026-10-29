import "./module-86897.js";
import "./module-61426.js";
import { A } from "./module-44748_3.js";
import { A as A_1 } from "./module-1371_2.js";
import { $ } from "./module-97003_4.js";
import { ButtonLink } from "./module-33159_3.js";
let IComponent = function({ title, message, onRetry, retryLabel = "重试", backHref, backLabel, note, digest }) {
    return <div className="min-h-[60vh] flex items-center justify-center px-4 py-12"><div className="w-full max-w-lg bg-bg-card border-2 border-border-hard shadow-block p-6 sm:p-8 text-center" role="alert" aria-live="assertive"><div className="w-16 h-16 bg-error/20 border-2 border-error shadow-inset flex items-center justify-center mx-auto mb-5" aria-hidden="true"><A size={32} className="text-error"/></div><h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 uppercase tracking-wide">{title}</h2><p className="text-sm sm:text-base text-text-secondary leading-relaxed">{message}</p>{note && <div className="mt-4 px-4 py-3 bg-bg-elevated border-2 border-border-soft text-sm text-text-secondary text-left">{note}</div>}<div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"><$ variant="primary" size="md" onClick={onRetry}><A_1 size={18} aria-hidden="true"/>{retryLabel}</$><ButtonLink variant="secondary" size="md" href={backHref}>{backLabel}</ButtonLink></div>{digest && <p className="mt-5 text-xs text-text-muted break-all">错误编号 {digest}</p>}</div></div>;
};
export { IComponent as A };
