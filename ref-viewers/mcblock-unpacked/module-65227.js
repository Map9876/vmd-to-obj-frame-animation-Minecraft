import { $EB, G_z, Q1f, _4j, hB5 } from "./module-85339.js";
export function fu(e) {
    let a;
    let o;
    let s;
    let f = e.kind === "standard" ? new _4j({
        map: e.atlasTexture,
        vertexColors: true,
        side: e.defaultSide ?? hB5
    }) : new G_z({
        map: e.atlasTexture,
        vertexColors: true,
        side: e.defaultSide ?? hB5
    });
    ((e, t, a = {})=>{
        e.side = t.needsDoubleSide ? $EB : t.needsTransparent ? hB5 : a.defaultSide ?? hB5;
        e.alphaTest = t.alphaTest;
        e.transparent = t.transparent;
        e.opacity = t.opacity;
        e.depthWrite = t.depthWrite;
        e.polygonOffset = t.polygonOffset;
        e.polygonOffsetFactor = t.polygonOffsetFactor;
        e.polygonOffsetUnits = t.polygonOffsetUnits;
        e.forceSinglePass = t.forceSinglePass;
        e.emissive = new Q1f(0);
        e.emissiveIntensity = 1;
        r(e, l(t, a.emissiveConfig));
    })(f, e.visualProfile, {
        defaultSide: e.defaultSide,
        emissiveConfig: e.emissiveConfig
    });
    ((e, t)=>{
        let s = t.animationConfig?.regions?.filter((e)=>e.frameCount > 1 && e.vOffsetPerFrame > 0 && e.u1 > e.u0 && e.v1 > e.v0);
        let l = !!(s && s.length > 0);
        let t_emissionConfig = t.emissionConfig;
        let m = !!t_emissionConfig;
        if (!l && !m) {
            return;
        }
        let regions = s ?? [];
        let fps = t.animationConfig?.fps && t.animationConfig.fps > 0 ? t.animationConfig.fps : 10;
        let p = regions.map((e)=>{
            var n;
            return [
                c(e.u0),
                c(e.v0),
                c(e.u1),
                c(e.v1),
                c(e.frameCount),
                c(e.vOffsetPerFrame),
                JSON.stringify(e.frames ?? []),
                String((n = e.interpolate) != null && n),
                String(e.frameColumns ?? 1),
                String(e.uOffsetPerFrame ?? 0)
            ].join(",");
        }).join("|");
        let h = (t_emissionConfig == null ? undefined : t_emissionConfig.maskRegions.map((e)=>[
                c(e.sourceU0),
                c(e.sourceV0),
                c(e.sourceU1),
                c(e.sourceV1),
                c(e.maskU0),
                c(e.maskV0),
                c(e.maskU1),
                c(e.maskV1)
            ].join(",")).join("|")) ?? "no-mask";
        let v = t_emissionConfig ? `${c(t_emissionConfig.luminanceThreshold)}:${c(t_emissionConfig.luminanceSoftness)}` : "none";
        let e_onBeforeCompile = e.onBeforeCompile;
        let k = e.customProgramCacheKey.bind(e);
        if (l) {
            e.userData.blockAnimationConfig = {
                fps,
                regions
            };
        }
        if (t_emissionConfig) {
            e.userData.blockEmissionConfig = t_emissionConfig;
            r(e, t_emissionConfig.intensity);
        }
        e.customProgramCacheKey = ()=>[
                k(),
                l ? `block-anim:${p}:${c(fps)}` : "block-anim:none",
                m ? `block-emission:${h}:${v}` : "block-emission:none"
            ].join("|");
        e.onBeforeCompile = (t, n)=>{
            e_onBeforeCompile.call(e, t, n);
            let i = [];
            if (l) {
                t.uniforms.blockAnimTime = {
                    value: 0
                };
                e.userData.blockAnimationUniforms = t.uniforms;
                i.push("uniform float blockAnimTime;");
            }
            if (t_emissionConfig) {
                t.uniforms.blockEmissionIntensity = {
                    value: e.userData.blockEmissionIntensityValue ?? t_emissionConfig.intensity
                };
                e.userData.blockEmissionUniforms = t.uniforms;
                i.push("uniform float blockEmissionIntensity;");
            }
            let o = t.fragmentShader.includes("#include <map_fragment>");
            if (i.length > 0) {
                t.fragmentShader = t.fragmentShader.replace("void main() {", `${i.join("\n")}
void main() {`);
            }
            if (o) {
                t.fragmentShader = t.fragmentShader.replace("#include <map_fragment>", ((regions_1, fps_1)=>{
                    let n = regions_1.map((e, n)=>{
                        let o = c(e.u0 - 0.00001);
                        let s = c(e.v0 - 0.00001);
                        let l = c(e.u1 + 0.00001);
                        let r = c(e.v1 + 0.00001);
                        let u = c(Math.max(1, Math.floor(e.frameCount)));
                        let m = c(e.vOffsetPerFrame);
                        let f = `blockAnimFrame${n}`;
                        let d = `blockAnimNext${n}`;
                        let p = c(e.frameColumns ?? 1);
                        let h = c(e.uOffsetPerFrame ?? 0);
                        let e_frames = e.frames;
                        let g = `float ${f} = mod(floor(blockAnimTime * ${c(fps_1)}), ${u});
float ${d} = ${f};`;
                        if (e_frames?.length) {
                            let t = e_frames.reduce((acc, frame)=>acc + frame.ticks, 0);
                            let i = 0;
                            let a = e_frames.map((t, a)=>{
                                let o = i;
                                i += t.ticks;
                                return `${a === 0 ? "if" : "else if"} (blockAnimTick${n} < ${c(i)}) {
          ${f} = ${c(t.index)};
          ${d} = ${c(e_frames[(a + 1) % e_frames.length].index)};
          blockFrameMix = ${e.interpolate ? `(blockAnimTick${n} - ${c(o)}) / ${c(t.ticks)}` : "0.0"};
        }`;
                            }).join("\n");
                            g = `float blockAnimTick${n} = mod(blockAnimTime * 20.0, ${c(t)});
        float ${f} = 0.0; float ${d} = 0.0;
        ${a}`;
                        }
                        return `
  if (vMapUv.x >= ${o} && vMapUv.x <= ${l} && vMapUv.y >= ${s} && vMapUv.y <= ${r}) {
    ${g}
    blockMapUv.x = vMapUv.x + mod(${f}, ${p}) * ${h};
    blockMapUv.y = vMapUv.y + floor(${f} / ${p}) * ${m};
    blockMapUvNext.x = vMapUv.x + mod(${d}, ${p}) * ${h};
    blockMapUvNext.y = vMapUv.y + floor(${d} / ${p}) * ${m};
  }`;
                    }).join("\n");
                    return `
vec4 blockAlbedoTexel = vec4(1.0);
#ifdef USE_MAP
  vec2 blockMapUv = vMapUv;
  vec2 blockMapUvNext = vMapUv;
  float blockFrameMix = 0.0;
${n}
  blockAlbedoTexel = mix(texture2D(map, blockMapUv), texture2D(map, blockMapUvNext), blockFrameMix);
  #ifdef DECODE_VIDEO_TEXTURE
    blockAlbedoTexel = sRGBTransferEOTF(blockAlbedoTexel);
  #endif
  diffuseColor *= blockAlbedoTexel;
#endif`;
                })(regions, fps));
            }
            if (t_emissionConfig && o && t.fragmentShader.includes("#include <emissivemap_fragment>")) {
                t.fragmentShader = t.fragmentShader.replace("#include <emissivemap_fragment>", ((t_emissionConfig_1)=>{
                    let e_maskRegions = t_emissionConfig_1.maskRegions;
                    let n = e_maskRegions.map((e, t)=>{
                        let n = c(e.sourceU0 - 0.00001);
                        let i = c(e.sourceV0 - 0.00001);
                        let a = c(e.sourceU1 + 0.00001);
                        let o = c(e.sourceV1 + 0.00001);
                        let s = c(e.sourceU1 - e.sourceU0);
                        let l = c(e.sourceV1 - e.sourceV0);
                        let r = c(e.maskU0);
                        let u = c(e.maskV0);
                        let m = c(e.maskU1 - e.maskU0);
                        let f = c(e.maskV1 - e.maskV0);
                        let d = `blockEmissionMaskUv${t}`;
                        let p = `blockEmissionMaskColor${t}`;
                        return `
  if (vMapUv.x >= ${n} && vMapUv.x <= ${a} && vMapUv.y >= ${i} && vMapUv.y <= ${o}) {
    vec2 ${d} = vec2(
      ${r} + ((vMapUv.x - ${c(e.sourceU0)}) / ${s}) * ${m},
      ${u} + ((vMapUv.y - ${c(e.sourceV0)}) / ${l}) * ${f}
    );
    vec4 ${p} = texture2D(map, ${d});
    blockEmissionMask = dot(${p}.rgb, vec3(0.299, 0.587, 0.114)) * ${p}.a;
  }`;
                    }).join("\n");
                    let i = e_maskRegions.length > 0 ? "0.0" : "1.0";
                    let a = e_maskRegions.length === 0 && t_emissionConfig_1.luminanceThreshold > 0 ? `
float blockEmissionLuminance = dot(blockAlbedoTexel.rgb, vec3(0.299, 0.587, 0.114));
blockEmissionMask *= smoothstep(
  ${c(t_emissionConfig_1.luminanceThreshold)},
  ${c(Math.min(1, t_emissionConfig_1.luminanceThreshold + t_emissionConfig_1.luminanceSoftness))},
  blockEmissionLuminance
);` : "";
                    return `
float blockEmissionMask = ${i};
${n}
${a}
float blockEmissionStrength = max(blockEmissionIntensity, 0.0) * clamp(blockEmissionMask, 0.0, 1.0);
totalEmissiveRadiance += blockAlbedoTexel.rgb * blockEmissionStrength;`;
                })(t_emissionConfig));
            }
        };
        e.needsUpdate = true;
    })(f, {
        animationConfig: e.animationConfig,
        emissionConfig: (a = e.visualProfile, o = e.emissiveConfig, s = e.emissionMaskConfig, a.needsEmissive ? {
            intensity: l(a, o),
            maskRegions: (s?.regions ?? []).filter((e)=>e.sourceU1 > e.sourceU0 && e.sourceV1 > e.sourceV0 && e.maskU1 > e.maskU0 && e.maskV1 > e.maskV0),
            luminanceThreshold: u(a.emissiveLuminanceThreshold),
            luminanceSoftness: u(a.emissiveLuminanceSoftness || 0.2)
        } : null)
    });
    return f;
}
export function eL(e, t) {
    let blockAnimationUniforms = e.userData.blockAnimationUniforms;
    if (blockAnimationUniforms?.blockAnimTime) {
        blockAnimationUniforms.blockAnimTime.value = t;
    }
}
export function SD(e, t, n) {
    if (n.highlighted) {
        e.emissive = new Q1f(4473856);
        e.emissiveIntensity = Math.max(n.emissiveConfig?.intensity ?? 0, 1);
        r(e, l(t, n.emissiveConfig));
        e.opacity = t.highlightedOpacity;
        e.transparent = t.transparent;
        e.visible = true;
    } else {
        if (n.dimmed) {
            e.visible = false;
        } else {
            e.emissive = new Q1f(0);
            e.emissiveIntensity = 1;
            r(e, l(t, n.emissiveConfig));
            e.opacity = t.opacity;
            e.transparent = t.transparent;
            e.visible = true;
        }
    }
    e.needsUpdate = true;
}
function l(e, t) {
    let n;
    if (t?.enabled && e.needsEmissive) {
        n = e;
        return (t?.intensity ?? 1) * n.emissiveIntensityMultiplier;
    }
    return 0;
}
function r(e, t) {
    let n = Number.isFinite(t) ? Math.max(0, t) : 0;
    e.userData.blockEmissionIntensityValue = n;
    let blockEmissionUniforms = e.userData.blockEmissionUniforms;
    if (blockEmissionUniforms?.blockEmissionIntensity) {
        blockEmissionUniforms.blockEmissionIntensity.value = n;
    }
}
function u(e) {
    if (Number.isFinite(e)) {
        return Math.min(1, Math.max(0, e));
    }
    return 0;
}
function c(e) {
    if (!Number.isFinite(e)) {
        return "0.0";
    }
    let t = e.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
    if (t.includes(".")) {
        return t;
    }
    return `${t}.0`;
}
