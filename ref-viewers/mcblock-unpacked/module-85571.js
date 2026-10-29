import "./module-88945.js";
import { forwardRef, useEffect, useLayoutEffect, useMemo, useState } from "./module-61426.js";
import { BKk, CmU, I9Y, IUQ, LlO, LuO, NRn, Pq0, Q1f, XJ7, cZY, cj9, eHs, eaF, iyt, kn4, qtW, sPf } from "./module-85339.js";
import { C as C_1 } from "./module-59040.js";
import { UniformsLib } from "./module-87548.js";
let n;
let r;
let c = new NRn;
let d = new Pq0;
class u extends CmU {
    constructor(){
        super();
        this.isLineSegmentsGeometry = true;
        this.type = "LineSegmentsGeometry";
        this.setIndex([
            0,
            2,
            1,
            2,
            3,
            1,
            2,
            4,
            3,
            4,
            5,
            3,
            4,
            6,
            5,
            6,
            7,
            5
        ]);
        this.setAttribute("position", new qtW([
            -1,
            2,
            0,
            1,
            2,
            0,
            -1,
            1,
            0,
            1,
            1,
            0,
            -1,
            0,
            0,
            1,
            0,
            0,
            -1,
            -1,
            0,
            1,
            -1,
            0
        ], 3));
        this.setAttribute("uv", new qtW([
            -1,
            2,
            1,
            2,
            -1,
            1,
            1,
            1,
            -1,
            -1,
            1,
            -1,
            -1,
            -2,
            1,
            -2
        ], 2));
    }
    applyMatrix4(e) {
        let instanceStart = this.attributes.instanceStart;
        let instanceEnd = this.attributes.instanceEnd;
        if (instanceStart !== undefined) {
            instanceStart.applyMatrix4(e);
            instanceEnd.applyMatrix4(e);
            instanceStart.needsUpdate = true;
        }
        if (this.boundingBox !== null) {
            this.computeBoundingBox();
        }
        if (this.boundingSphere !== null) {
            this.computeBoundingSphere();
        }
        return this;
    }
    setPositions(e) {
        let t;
        if (e instanceof Float32Array) {
            t = e;
        } else if (Array.isArray(e)) {
            t = new Float32Array(e);
        }
        let i = new LuO(t, 6, 1);
        this.setAttribute("instanceStart", new eHs(i, 3, 0));
        this.setAttribute("instanceEnd", new eHs(i, 3, 3));
        this.computeBoundingBox();
        this.computeBoundingSphere();
        return this;
    }
    setColors(e, t = 3) {
        let i;
        if (e instanceof Float32Array) {
            i = e;
        } else if (Array.isArray(e)) {
            i = new Float32Array(e);
        }
        let n = new LuO(i, 2 * t, 1);
        this.setAttribute("instanceColorStart", new eHs(n, t, 0));
        this.setAttribute("instanceColorEnd", new eHs(n, t, t));
        return this;
    }
    fromWireframeGeometry(e) {
        this.setPositions(e.attributes.position.array);
        return this;
    }
    fromEdgesGeometry(e) {
        this.setPositions(e.attributes.position.array);
        return this;
    }
    fromMesh(e) {
        this.fromWireframeGeometry(new XJ7(e.geometry));
        return this;
    }
    fromLineSegments({ geometry }) {
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
    computeBoundingBox() {
        if (this.boundingBox === null) {
            this.boundingBox = new NRn;
        }
        let instanceStart = this.attributes.instanceStart;
        let instanceEnd = this.attributes.instanceEnd;
        if (instanceStart !== undefined && instanceEnd !== undefined) {
            this.boundingBox.setFromBufferAttribute(instanceStart);
            c.setFromBufferAttribute(instanceEnd);
            this.boundingBox.union(c);
        }
    }
    computeBoundingSphere() {
        if (this.boundingSphere === null) {
            this.boundingSphere = new iyt;
        }
        if (this.boundingBox === null) {
            this.computeBoundingBox();
        }
        let instanceStart = this.attributes.instanceStart;
        let instanceEnd = this.attributes.instanceEnd;
        if (instanceStart !== undefined && instanceEnd !== undefined) {
            let i = this.boundingSphere.center;
            this.boundingBox.getCenter(i);
            let n = 0;
            for(let r = 0, o = instanceStart.count; r < o; r++){
                d.fromBufferAttribute(instanceStart, r);
                n = Math.max(n, i.distanceToSquared(d));
                d.fromBufferAttribute(instanceEnd, r);
                n = Math.max(n, i.distanceToSquared(d));
            }
            this.boundingSphere.radius = Math.sqrt(n);
            if (isNaN(this.boundingSphere.radius)) {
                console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
            }
        }
    }
    toJSON() {}
    applyMatrix(e) {
        console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().");
        return this.applyMatrix4(e);
    }
}
let m = parseInt(sPf.replace(/\D+/g, ""));
class h extends BKk {
    constructor(e){
        super({
            type: "LineMaterial",
            uniforms: LlO.clone(LlO.merge([
                UniformsLib.common,
                UniformsLib.fog,
                {
                    worldUnits: {
                        value: 1
                    },
                    linewidth: {
                        value: 1
                    },
                    resolution: {
                        value: new I9Y(1, 1)
                    },
                    dashOffset: {
                        value: 0
                    },
                    dashScale: {
                        value: 1
                    },
                    dashSize: {
                        value: 1
                    },
                    gapSize: {
                        value: 1
                    }
                }
            ])),
            vertexShader: `
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,
            fragmentShader: `
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${m >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,
            clipping: true
        });
        this.isLineMaterial = true;
        this.onBeforeCompile = function() {
            if (this.transparent) {
                this.defines.USE_LINE_COLOR_ALPHA = "1";
            } else {
                delete this.defines.USE_LINE_COLOR_ALPHA;
            }
        };
        Object.defineProperties(this, {
            color: {
                enumerable: true,
                get: function() {
                    return this.uniforms.diffuse.value;
                },
                set: function(e) {
                    this.uniforms.diffuse.value = e;
                }
            },
            worldUnits: {
                enumerable: true,
                get: function() {
                    return "WORLD_UNITS" in this.defines;
                },
                set: function(e) {
                    if (e === true) {
                        this.defines.WORLD_UNITS = "";
                    } else {
                        delete this.defines.WORLD_UNITS;
                    }
                }
            },
            linewidth: {
                enumerable: true,
                get: function() {
                    return this.uniforms.linewidth.value;
                },
                set: function(e) {
                    this.uniforms.linewidth.value = e;
                }
            },
            dashed: {
                enumerable: true,
                get: function() {
                    return "USE_DASH" in this.defines;
                },
                set (e) {
                    if (!!e != "USE_DASH" in this.defines) {
                        this.needsUpdate = true;
                    }
                    if (e === true) {
                        this.defines.USE_DASH = "";
                    } else {
                        delete this.defines.USE_DASH;
                    }
                }
            },
            dashScale: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashScale.value;
                },
                set: function(e) {
                    this.uniforms.dashScale.value = e;
                }
            },
            dashSize: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashSize.value;
                },
                set: function(e) {
                    this.uniforms.dashSize.value = e;
                }
            },
            dashOffset: {
                enumerable: true,
                get: function() {
                    return this.uniforms.dashOffset.value;
                },
                set: function(e) {
                    this.uniforms.dashOffset.value = e;
                }
            },
            gapSize: {
                enumerable: true,
                get: function() {
                    return this.uniforms.gapSize.value;
                },
                set: function(e) {
                    this.uniforms.gapSize.value = e;
                }
            },
            opacity: {
                enumerable: true,
                get: function() {
                    return this.uniforms.opacity.value;
                },
                set: function(e) {
                    this.uniforms.opacity.value = e;
                }
            },
            resolution: {
                enumerable: true,
                get: function() {
                    return this.uniforms.resolution.value;
                },
                set: function(e) {
                    this.uniforms.resolution.value.copy(e);
                }
            },
            alphaToCoverage: {
                enumerable: true,
                get: function() {
                    return "USE_ALPHA_TO_COVERAGE" in this.defines;
                },
                set: function(e) {
                    if (!!e != "USE_ALPHA_TO_COVERAGE" in this.defines) {
                        this.needsUpdate = true;
                    }
                    if (e === true) {
                        this.defines.USE_ALPHA_TO_COVERAGE = "";
                        this.extensions.derivatives = true;
                    } else {
                        delete this.defines.USE_ALPHA_TO_COVERAGE;
                        this.extensions.derivatives = false;
                    }
                }
            }
        });
        this.setValues(e);
    }
}
let p = m >= 125 ? "uv1" : "uv2";
let v = new IUQ;
let y = new Pq0;
let g = new Pq0;
let x = new IUQ;
let w = new IUQ;
let E = new IUQ;
let S = new Pq0;
let b = new kn4;
let M = new cZY;
let L = new Pq0;
let A = new NRn;
let P = new iyt;
let _ = new IUQ;
function z(e, t, resolution) {
    _.set(0, 0, -t, 1).applyMatrix4(e.projectionMatrix);
    _.multiplyScalar(1 / _.w);
    _.x = r / resolution.width;
    _.y = r / resolution.height;
    _.applyMatrix4(e.projectionMatrixInverse);
    _.multiplyScalar(1 / _.w);
    return Math.abs(Math.max(_.x, _.y));
}
class U extends eaF {
    constructor(e = new u, t = new h({
        color: 16777215 * Math.random()
    })){
        super(e, t);
        this.isLineSegments2 = true;
        this.type = "LineSegments2";
    }
    computeLineDistances() {
        let geometry = this.geometry;
        let instanceStart = geometry.attributes.instanceStart;
        let instanceEnd = geometry.attributes.instanceEnd;
        let n = new Float32Array(2 * instanceStart.count);
        for(let e = 0, r = 0, o = instanceStart.count; e < o; e++, r += 2){
            y.fromBufferAttribute(instanceStart, e);
            g.fromBufferAttribute(instanceEnd, e);
            n[r] = r === 0 ? 0 : n[r - 1];
            n[r + 1] = n[r] + y.distanceTo(g);
        }
        let r = new LuO(n, 2, 1);
        geometry.setAttribute("instanceDistanceStart", new eHs(r, 1, 0));
        geometry.setAttribute("instanceDistanceEnd", new eHs(r, 1, 1));
        return this;
    }
    raycast(e, t) {
        let i;
        let o;
        let worldUnits = this.material.worldUnits;
        let e_camera = e.camera;
        if (!(e_camera !== null || worldUnits)) {
            console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
        }
        let c = e.params.Line2 !== undefined && e.params.Line2.threshold || 0;
        n = e.ray;
        let matrixWorld = this.matrixWorld;
        let geometry = this.geometry;
        let material = this.material;
        r = material.linewidth + c;
        if (geometry.boundingSphere === null) {
            geometry.computeBoundingSphere();
        }
        P.copy(geometry.boundingSphere).applyMatrix4(matrixWorld);
        if (worldUnits) {
            i = 0.5 * r;
        } else {
            let e = Math.max(e_camera.near, P.distanceToPoint(n.origin));
            i = z(e_camera, e, material.resolution);
        }
        P.radius += i;
        if (n.intersectsSphere(P) !== false) {
            if (geometry.boundingBox === null) {
                geometry.computeBoundingBox();
            }
            A.copy(geometry.boundingBox).applyMatrix4(matrixWorld);
            if (worldUnits) {
                o = 0.5 * r;
            } else {
                let e = Math.max(e_camera.near, A.distanceToPoint(n.origin));
                o = z(e_camera, e, material.resolution);
            }
            A.expandByScalar(o);
            if (n.intersectsBox(A) !== false) {
                if (worldUnits) {
                    ((e, t)=>{
                        let e_matrixWorld = e.matrixWorld;
                        let e_geometry = e.geometry;
                        let instanceStart = e_geometry.attributes.instanceStart;
                        let instanceEnd = e_geometry.attributes.instanceEnd;
                        let c = Math.min(e_geometry.instanceCount, instanceStart.count);
                        for(let o = 0; o < c; o++){
                            M.start.fromBufferAttribute(instanceStart, o);
                            M.end.fromBufferAttribute(instanceEnd, o);
                            M.applyMatrix4(e_matrixWorld);
                            let c = new Pq0;
                            let d = new Pq0;
                            n.distanceSqToSegment(M.start, M.end, d, c);
                            if (d.distanceTo(c) < 0.5 * r) {
                                t.push({
                                    point: d,
                                    pointOnLine: c,
                                    distance: n.origin.distanceTo(d),
                                    object: e,
                                    face: null,
                                    faceIndex: o,
                                    uv: null,
                                    [p]: null
                                });
                            }
                        }
                    })(this, t);
                } else {
                    ((e, e_camera_1, i)=>{
                        let t_projectionMatrix = e_camera_1.projectionMatrix;
                        let resolution = e.material.resolution;
                        let e_matrixWorld = e.matrixWorld;
                        let e_geometry = e.geometry;
                        let instanceStart = e_geometry.attributes.instanceStart;
                        let instanceEnd = e_geometry.attributes.instanceEnd;
                        let f = Math.min(e_geometry.instanceCount, instanceStart.count);
                        let m = -e_camera_1.near;
                        n.at(1, E);
                        E.w = 1;
                        E.applyMatrix4(e_camera_1.matrixWorldInverse);
                        E.applyMatrix4(t_projectionMatrix);
                        E.multiplyScalar(1 / E.w);
                        E.x *= resolution.x / 2;
                        E.y *= resolution.y / 2;
                        E.z = 0;
                        S.copy(E);
                        b.multiplyMatrices(e_camera_1.matrixWorldInverse, e_matrixWorld);
                        for(let t = 0; t < f; t++){
                            x.fromBufferAttribute(instanceStart, t);
                            w.fromBufferAttribute(instanceEnd, t);
                            x.w = 1;
                            w.w = 1;
                            x.applyMatrix4(b);
                            w.applyMatrix4(b);
                            if (x.z > m && w.z > m) {
                                continue;
                            }
                            if (x.z > m) {
                                let e = x.z - w.z;
                                let t = (x.z - m) / e;
                                x.lerp(w, t);
                            } else if (w.z > m) {
                                let e = w.z - x.z;
                                let t = (w.z - m) / e;
                                w.lerp(x, t);
                            }
                            x.applyMatrix4(t_projectionMatrix);
                            w.applyMatrix4(t_projectionMatrix);
                            x.multiplyScalar(1 / x.w);
                            w.multiplyScalar(1 / w.w);
                            x.x *= resolution.x / 2;
                            x.y *= resolution.y / 2;
                            w.x *= resolution.x / 2;
                            w.y *= resolution.y / 2;
                            M.start.copy(x);
                            M.start.z = 0;
                            M.end.copy(w);
                            M.end.z = 0;
                            let c = M.closestPointToPointParameter(S, true);
                            M.at(c, L);
                            let f = cj9.lerp(x.z, w.z, c);
                            let h = f >= -1 && f <= 1;
                            let v = S.distanceTo(L) < 0.5 * r;
                            if (h && v) {
                                M.start.fromBufferAttribute(instanceStart, t);
                                M.end.fromBufferAttribute(instanceEnd, t);
                                M.start.applyMatrix4(e_matrixWorld);
                                M.end.applyMatrix4(e_matrixWorld);
                                let r = new Pq0;
                                let o = new Pq0;
                                n.distanceSqToSegment(M.start, M.end, o, r);
                                i.push({
                                    point: o,
                                    pointOnLine: r,
                                    distance: n.origin.distanceTo(o),
                                    object: e,
                                    face: null,
                                    faceIndex: t,
                                    uv: null,
                                    [p]: null
                                });
                            }
                        }
                    })(this, e_camera, t);
                }
            }
        }
    }
    onBeforeRender(e) {
        let uniforms = this.material.uniforms;
        if (uniforms && uniforms.resolution) {
            e.getViewport(v);
            this.material.uniforms.resolution.value.set(v.z, v.w);
        }
    }
}
class C extends u {
    constructor(){
        super();
        this.isLineGeometry = true;
        this.type = "LineGeometry";
    }
    setPositions(e) {
        let t = e.length - 3;
        let i = new Float32Array(2 * t);
        for(let n = 0; n < t; n += 3){
            i[2 * n] = e[n];
            i[2 * n + 1] = e[n + 1];
            i[2 * n + 2] = e[n + 2];
            i[2 * n + 3] = e[n + 3];
            i[2 * n + 4] = e[n + 4];
            i[2 * n + 5] = e[n + 5];
        }
        super.setPositions(i);
        return this;
    }
    setColors(e, t = 3) {
        let i = e.length - t;
        let n = new Float32Array(2 * i);
        if (t === 3) {
            for(let r = 0; r < i; r += t){
                n[2 * r] = e[r];
                n[2 * r + 1] = e[r + 1];
                n[2 * r + 2] = e[r + 2];
                n[2 * r + 3] = e[r + 3];
                n[2 * r + 4] = e[r + 4];
                n[2 * r + 5] = e[r + 5];
            }
        } else {
            for(let r = 0; r < i; r += t){
                n[2 * r] = e[r];
                n[2 * r + 1] = e[r + 1];
                n[2 * r + 2] = e[r + 2];
                n[2 * r + 3] = e[r + 3];
                n[2 * r + 4] = e[r + 4];
                n[2 * r + 5] = e[r + 5];
                n[2 * r + 6] = e[r + 6];
                n[2 * r + 7] = e[r + 7];
            }
        }
        super.setColors(n, t);
        return this;
    }
    fromLine({ geometry }) {
        this.setPositions(geometry.attributes.position.array);
        return this;
    }
}
class O extends U {
    constructor(e = new C, t = new h({
        color: 16777215 * Math.random()
    })){
        super(e, t);
        this.isLine2 = true;
        this.type = "Line2";
    }
}
export let N = forwardRef(function({ points, color = 16777215, vertexColors, linewidth, lineWidth, segments, dashed, ...rest }, ref) {
    let y = C_1((e)=>e.size);
    let g = useMemo(()=>{
        if (segments) {
            return new U;
        }
        return new O;
    }, [
        segments
    ]);
    let [x] = useState(()=>new h);
    let w = vertexColors?.[0]?.length === 4 ? 4 : 3;
    let E = useMemo(()=>{
        let n = segments ? new u : new C;
        let r = points.map((e)=>{
            let t = Array.isArray(e);
            if (e instanceof Pq0 || e instanceof IUQ) {
                return [
                    e.x,
                    e.y,
                    e.z
                ];
            }
            if (e instanceof I9Y) {
                return [
                    e.x,
                    e.y,
                    0
                ];
            }
            if (t && e.length === 3) {
                return [
                    e[0],
                    e[1],
                    e[2]
                ];
            }
            if (t && e.length === 2) {
                return [
                    e[0],
                    e[1],
                    0
                ];
            }
            return e;
        });
        n.setPositions(r.flat());
        if (vertexColors) {
            color = 16777215;
            let e = vertexColors.map((e)=>{
                if (e instanceof Q1f) {
                    return e.toArray();
                }
                return e;
            });
            n.setColors(e.flat(), w);
        }
        return n;
    }, [
        points,
        segments,
        vertexColors,
        w
    ]);
    useLayoutEffect(()=>{
        g.computeLineDistances();
    }, [
        points,
        g
    ]);
    useLayoutEffect(()=>{
        if (dashed) {
            x.defines.USE_DASH = "";
        } else {
            delete x.defines.USE_DASH;
        }
        x.needsUpdate = true;
    }, [
        dashed,
        x
    ]);
    useEffect(()=>()=>{
            E.dispose();
            x.dispose();
        }, [
        E
    ]);
    return <primitive object={g} ref={ref} {...rest}><primitive object={E} attach="geometry"/><primitive object={x} attach="material" color={color} vertexColors={!!vertexColors} resolution={[
        y.width,
        y.height
    ]} linewidth={linewidth ?? lineWidth ?? 1} dashed={dashed} transparent={w === 4} {...rest}/></primitive>;
});
