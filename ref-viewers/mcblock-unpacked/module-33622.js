import "./module-86897.js";
import { Fragment, useEffect, useMemo } from "./module-61426.js";
import { N } from "./module-85571.js";
import { E } from "./module-43646.js";
import { Pq0, TDQ, iNn, mrM } from "./module-85339.js";
import { r } from "./module-95626.js";
function CComponent({ position, color }) {
    let { edgeGeo, edgeMat } = useMemo(()=>{
        let e = new iNn(1.01, 1.01, 1.01);
        let edgeGeo_1 = new TDQ(e);
        e.dispose();
        return {
            edgeGeo: edgeGeo_1,
            edgeMat: new mrM({
                color,
                transparent: true,
                opacity: 0.9,
                depthTest: false
            })
        };
    }, [
        color
    ]);
    useEffect(()=>()=>{
            edgeGeo.dispose();
            edgeMat.dispose();
        }, [
        edgeGeo,
        edgeMat
    ]);
    return <lineSegments geometry={edgeGeo} material={edgeMat} position={[
        position[0] + 0.5,
        position[1] + 0.5,
        position[2] + 0.5
    ]} renderOrder={999}/>;
}
export function A({ pointA, pointB, confirmed }) {
    let u = useMemo(()=>{
        if (pointA && pointB) {
            return ((pointA_1, pointB_1)=>{
                let n = [];
                let r = new Pq0(pointA_1[0] + 0.5, pointA_1[1] + 0.5, pointA_1[2] + 0.5);
                let l = new Pq0(pointB_1[0] + 0.5, pointB_1[1] + 0.5, pointB_1[2] + 0.5);
                let a = Math.max(0, Math.abs(pointB_1[0] - pointA_1[0]) - 1);
                if (Math.abs(pointB_1[0] - pointA_1[0]) > 0) {
                    let e = r.clone();
                    e.x = l.x;
                    let t = new Pq0().lerpVectors(r, e, 0.5);
                    n.push({
                        axis: "x",
                        from: r.clone(),
                        to: e,
                        mid: t,
                        distance: a
                    });
                    r = e;
                }
                let o = Math.max(0, Math.abs(pointB_1[1] - pointA_1[1]) - 1);
                if (Math.abs(pointB_1[1] - pointA_1[1]) > 0) {
                    let e = r.clone();
                    e.y = l.y;
                    let t = new Pq0().lerpVectors(r, e, 0.5);
                    n.push({
                        axis: "y",
                        from: r.clone(),
                        to: e,
                        mid: t,
                        distance: o
                    });
                    r = e;
                }
                let i = Math.max(0, Math.abs(pointB_1[2] - pointA_1[2]) - 1);
                if (Math.abs(pointB_1[2] - pointA_1[2]) > 0) {
                    let e = r.clone();
                    e.z = l.z;
                    let t = new Pq0().lerpVectors(r, e, 0.5);
                    n.push({
                        axis: "z",
                        from: r.clone(),
                        to: e,
                        mid: t,
                        distance: i
                    });
                    r = e;
                }
                return n;
            })(pointA, pointB);
        }
        return [];
    }, [
        pointA?.[0],
        pointA?.[1],
        pointA?.[2],
        pointB?.[0],
        pointB?.[1],
        pointB?.[2]
    ]);
    let opacity = confirmed ? 1 : 0.5;
    if (pointA) {
        return <group>{u.map((e, key)=><Fragment key={key}><N points={[
                e.from,
                e.to
            ]} color={r[e.axis]} lineWidth={2.5} transparent opacity={opacity} depthTest={false} renderOrder={998}/><E position={e.mid} center zIndexRange={[
                100,
                0
            ]} style={{
                pointerEvents: "none"
            }}><div style={{
                background: r[e.axis],
                opacity,
                color: "#fff",
                fontSize: "11px",
                fontWeight: 800,
                padding: "1px 6px",
                borderRadius: "3px",
                border: "1.5px solid rgba(0,0,0,0.4)",
                whiteSpace: "nowrap",
                fontFamily: "monospace",
                userSelect: "none"
            }}>间距 {e.distance} 格</div></E></Fragment>)}<CComponent position={pointA} color="#48bf36"/>{pointB && <CComponent position={pointB} color="#E05050"/>}</group>;
    }
    return null;
}
