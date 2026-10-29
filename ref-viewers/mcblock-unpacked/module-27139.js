import "./module-86897.js";
import { Cp } from "./module-27122.js";
import { useEffect } from "./module-61426.js";
import { A } from "./module-43938.js";
function LComponent({ error, reset }) {
    useEffect(()=>{
        Cp(error, {
            tags: {
                route: "buildings/[id]"
            }
        });
    }, [
        error
    ]);
    return <A title="建筑加载失败" message="这座建筑的模型或数据没能加载出来。可能是网络中断，也可能是 3D 渲染在当前设备上出了问题。" onRetry={reset} retryLabel="重新加载" backHref="/buildings" backLabel="返回建筑库" note="如果重试几次仍然失败，多半是显卡驱动或浏览器 WebGL 支持的问题——换一个浏览器通常能解决。" digest={error.digest}/>;
}
export { LComponent as default };
