import { n, s, t } from "../jsx-runtime-Db0DjQYK.js";
import { n as n_2, t as U } from "../demo-media-DQv-_HFj.js";
export const d = s(n(), 1);
export const f = t();
export function p({ label, surface }) {
    let nRef = d.useRef(null);
    let [r, setR] = d.useState(false);
    d.useEffect(()=>{
        let nRef_current = nRef.current;
        if (!nRef_current || r) {
            return;
        }
        let t = new IntersectionObserver((e)=>{
            if (e.some((e)=>e.isIntersecting)) {
                setR(true);
                t.disconnect();
            }
        }, {
            rootMargin: `300px 0px`
        });
        t.observe(nRef_current);
        return ()=>t.disconnect();
    }, [
        r
    ]);
    return <div ref={nRef} className={`overflow-hidden border border-input`}>{r ? <U label={label} surface={surface} className={`border-b-0`}/> : <img src={n_2} alt={label} loading={`lazy`} decoding={`async`} className={`block aspect-video w-full object-cover`}/>}</div>;
}
