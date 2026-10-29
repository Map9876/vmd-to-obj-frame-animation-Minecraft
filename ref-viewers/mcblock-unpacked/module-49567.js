import "./module-86897.js";
import { Cp } from "./module-27122.js";
import { useEffect } from "./module-61426.js";
import { A } from "./module-64991_6.js";
function OComponent({ error, reset }) {
    useEffect(()=>{
        Cp(error);
        console.error("全局错误:", error);
    }, [
        error
    ]);
    return <div className="min-h-[60vh] flex items-center justify-center px-4"><div className="text-center max-w-md"><div className="text-6xl mb-4 text-error"><A size={16}/></div><h2 className="text-xl font-semibold text-foreground mb-2">页面出了点问题</h2><p className="text-muted-foreground mb-6">{error.message || "发生了意外错误，请稍后重试"}</p><button onClick={reset} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">重新加载</button></div></div>;
}
export { OComponent as default };
