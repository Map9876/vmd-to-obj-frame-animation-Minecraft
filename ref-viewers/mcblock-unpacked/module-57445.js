import "./module-86897.js";
import { useEffect } from "./module-61426.js";
export default function({ html, height = null, width = null, children, dataNtpc = "" }) {
    useEffect(()=>{
        if (dataNtpc) {
            performance.mark("mark_feature_usage", {
                detail: {
                    feature: `next-third-parties-${dataNtpc}`
                }
            });
        }
    }, [
        dataNtpc
    ]);
    return <>{children}{html ? <div style={{
        height: height != null ? `${height}px` : "auto",
        width: width != null ? `${width}px` : "auto"
    }} data-ntpc={dataNtpc} dangerouslySetInnerHTML={{
        __html: html
    }}/> : null}</>;
};
