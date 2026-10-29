import{l as e}from"./dist-C5TDMOul.js";import{g as t,h as n,p as r}from"./dist-C66QuM2X.js";import{c as i,l as a,u as o}from"./blockStateParser-3kR-Ucao.js";var s=256*16;function c(e){return e>>4}function l(e){return e&15}function u(e,t,n){return`${e},${t},${n}`}function d(e,t,n){return u(c(e),c(t),c(n))}function f(e){let[t,n,r]=e.split(`,`,3).map(Number);return{x:t,y:n,z:r}}function p(e,t,n){return`${e},${t},${n}`}function m(e,t,n){return t<<8|n<<4|e}function h(e,t,n){return m(l(e),l(t),l(n))}var g=new Map;function _(e){let{id:r,namespace:i,name:a}=t(e.id??`${e.namespace??`minecraft`}:${e.name??``}`),o=e.properties?{...e.properties}:{},s=e.stateKey??n(r,o),c=g.get(s);if(c)return c;let l=Object.freeze({id:r,namespace:i,name:a,properties:Object.freeze(o),stateKey:s});return g.set(s,l),l}var v=e=>1-(1-e)**3,y=class{constructor(e){this.host=e,this.mode=`orbit`,this.transition=null}get current(){return this.mode}get target(){return this.transition?.to??this.mode}get isTransitioning(){return this.transition!==null}get inputLocked(){return this.transition!==null}to(e){if(e===this.target&&this.transition===null)return;if(this.transition){if(e===this.transition.to)return;this.host.prepareMode(this.transition.from,e),this.transition={from:this.transition.from,to:e,elapsed:0,duration:this.startMove(this.transition.from,e)},this.settleIfInstant();return}let t=this.mode;this.host.prepareMode(t,e),this.host.exitMode(t),this.transition={from:t,to:e,elapsed:0,duration:this.startMove(t,e)},this.settleIfInstant()}update(e){let t=this.transition;if(!t)return;t.elapsed+=e;let n=Math.min(1,t.elapsed/t.duration);this.host.advanceCameraMove(v(n)),n>=1&&this.settle()}cancel(){this.transition&&this.settle()}startMove(e,t){return this.host.resetCameraBaseline(),Math.max(0,this.host.beginCameraMove(e,t))}settleIfInstant(){this.transition&&this.transition.duration<=0&&(this.host.advanceCameraMove(1),this.settle())}settle(){let e=this.transition;e&&(this.transition=null,this.mode=e.to,this.host.enterMode(e.to))}};function b(e,t,n,r){return r===0?e:r===1?t:n}function x(e,t){return Math.max(t.min,Math.min(e,t.max))}function S(e,t){let n=x(e.top,t);return n>=t.max&&!e.isolate?null:n+1}function C(e,t){return e.isolate?x(e.top,t):null}function w(e,t){return e===null?t.max:e-1}function T(e,t){return w(e,t)+1}function E(e,t){return t!==null&&e>=t}var D=0,O=255,k=class{constructor(){this.palette=[null],this.paletteByKey=new Map,this.indices=new Uint8Array(s),this._nonAir=0}get nonAir(){return this._nonAir}get isEmpty(){return this._nonAir===0}getByLocalIndex(e){return this.palette[this.indices[e]]}getLocal(e,t,n){return this.getByLocalIndex(m(e,t,n))}setByLocalIndex(e,t){let n=this.indices[e],r=this.palette[n];if(t===null)return n!==D&&(this.indices[e]=D,this._nonAir--),r;let i=this.internIntoPalette(t);return i!==n&&(n===D&&this._nonAir++,this.indices[e]=i),r}setLocal(e,t,n,r){return this.setByLocalIndex(m(e,t,n),r)}forEachLocal(e){if(this._nonAir!==0)for(let t=0;t<s;t++){let n=this.indices[t];if(n===D)continue;let r=this.palette[n];r&&e(t&15,t>>8&15,t>>4&15,r)}}internIntoPalette(e){let t=this.paletteByKey.get(e.stateKey);if(t!==void 0)return t;let n=this.palette.length;if(this.palette.push(e),this.paletteByKey.set(e.stateKey,n),n>O&&this.indices instanceof Uint8Array){let e=new Uint16Array(s);e.set(this.indices),this.indices=e}return n}},A=class{constructor(){this.chunks=new Map}get(e){return this.chunks.get(e)}getOrCreate(e){let t=this.chunks.get(e);return t||(t=new k,this.chunks.set(e,t)),t}delete(e){this.chunks.delete(e)}has(e){return this.chunks.has(e)}keys(){return this.chunks.keys()}get size(){return this.chunks.size}},j=class{constructor(e=new A){this.blockEntities=new Map,this.rawBlockEntities=new Map,this.store=e}getBlock(e,t,n){let r=this.store.get(d(e,t,n));return r?r.getByLocalIndex(h(e,t,n)):null}setBlock(e,t,n,r){let i=d(e,t,n),a=h(e,t,n),o=this.store.get(i),s=o?o.getByLocalIndex(a):null;if(s===r)return null;let c=o??this.store.getOrCreate(i);return c.setByLocalIndex(a,r),c.isEmpty&&this.store.delete(i),{pos:{x:e,y:t,z:n},prev:s,next:r}}getBlockEntity(e,t,n){return this.blockEntities.get(p(e,t,n))}setBlockEntity(e,t,n,r){let i=p(e,t,n);r==null?this.blockEntities.delete(i):this.blockEntities.set(i,r)}getRawBlockEntity(e,t,n){let r=p(e,t,n);return this.rawBlockEntities.get(r)??this.blockEntities.get(r)}setRawBlockEntity(e,t,n,r){let i=p(e,t,n);r==null?this.rawBlockEntities.delete(i):this.rawBlockEntities.set(i,r)}forEachBlock(e){for(let t of this.store.keys()){let n=this.store.get(t);if(!n)continue;let r=f(t),i=r.x*16,a=r.y*16,o=r.z*16;n.forEachLocal((t,n,r,s)=>e(i+t,a+n,o+r,s))}}forEachInRegion(e,t){for(let n of this.store.keys()){let r=this.store.get(n);if(!r)continue;let i=f(n),a=i.x*16,o=i.y*16,s=i.z*16;a>e.max.x||a+16-1<e.min.x||o>e.max.y||o+16-1<e.min.y||s>e.max.z||s+16-1<e.min.z||r.forEachLocal((n,r,i,c)=>{let l=a+n,u=o+r,d=s+i;l>=e.min.x&&l<=e.max.x&&u>=e.min.y&&u<=e.max.y&&d>=e.min.z&&d<=e.max.z&&t(l,u,d,c)})}}computeBounds(){let e=!1,t=1/0,n=1/0,r=1/0,i=-1/0,a=-1/0,o=-1/0;return this.forEachBlock((s,c,l)=>{e=!0,s<t&&(t=s),c<n&&(n=c),l<r&&(r=l),s>i&&(i=s),c>a&&(a=c),l>o&&(o=l)}),e?{min:{x:t,y:n,z:r},max:{x:i,y:a,z:o}}:null}maxAlong(e){let t=new Set;for(let n of this.store.keys()){let r=f(n);t.add(e===0?r.x:e===1?r.y:r.z)}for(let n of[...t].sort((e,t)=>t-e)){let t=-1/0;for(let r of this.store.keys()){let i=f(r);if((e===0?i.x:e===1?i.y:i.z)!==n)continue;let a=this.store.get(r);if(!a)continue;let o=n*16;a.forEachLocal((n,r,i)=>{let a=o+(e===0?n:e===1?r:i);a>t&&(t=a)})}if(t>-1/0)return t}return null}get chunkCount(){return this.store.size}chunkKeys(){return this.store.keys()}},M=class{constructor(e=new j,t={}){this.undoStack=[],this.redoStack=[],this.active=null,this.listeners=new Set,this.editContext={get:(e,t,n)=>this.world.getBlock(e,t,n),set:(e,t,n,r)=>{let i=this.world.setBlock(e,t,n,r);i&&this.active.push(i)}},this.world=e,this.behavior=t.behavior??null,this.maxHistory=t.maxHistory??200,this.onChange=t.onChange??null}getBlock(e,t,n){return this.world.getBlock(e,t,n)}bounds(){return this.world.computeBounds()}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}get undoDepth(){return this.undoStack.length}addChangeListener(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(e,t){this.onChange?.(e,t);for(let n of this.listeners)n(e,t)}setBlock(e,t,n,r){if(this.active){this.applyPrimary(e,t,n,r);return}this.transaction(()=>this.applyPrimary(e,t,n,r))}transaction(e){if(this.active)return e(),null;this.active=[];try{e()}finally{let e=this.active;if(this.active=null,e.length===0)return null;let t={changes:e};return this.undoStack.push(t),this.undoStack.length>this.maxHistory&&this.undoStack.shift(),this.redoStack.length=0,this.emit(t,`do`),t}}undo(){let e=this.undoStack.pop();if(!e)return null;for(let t=e.changes.length-1;t>=0;t--){let n=e.changes[t];this.world.setBlock(n.pos.x,n.pos.y,n.pos.z,n.prev)}return this.redoStack.push(e),this.emit(e,`undo`),e}redo(){let e=this.redoStack.pop();if(!e)return null;for(let t of e.changes)this.world.setBlock(t.pos.x,t.pos.y,t.pos.z,t.next);return this.undoStack.push(e),this.emit(e,`redo`),e}placeCells(e){return this.transaction(()=>{let t=[];for(let n of e){let e=this.world.setBlock(n.pos.x,n.pos.y,n.pos.z,n.state);e&&(this.active.push(e),t.push(n))}for(let e of t)this.behavior?.(e.pos,e.state,this.editContext)})}setBlocksRaw(e){return this.transaction(()=>{for(let t of e){let e=this.world.setBlock(t.pos.x,t.pos.y,t.pos.z,t.state);e&&this.active.push(e)}})}previewEdit(e,t,n,r){let i=new Map,a=(e,t,n)=>`${e},${t},${n}`,o={get:(e,t,n)=>{let r=a(e,t,n);return i.has(r)?i.get(r):this.world.getBlock(e,t,n)},set:(e,t,n,r)=>{i.set(a(e,t,n),r)}};o.set(e,t,n,r),this.behavior?.({x:e,y:t,z:n},r,o);let s=[];for(let[e,t]of i){let[n,r,i]=e.split(`,`).map(Number);s.push({pos:{x:n,y:r,z:i},state:t})}return s}previewCells(e){let t=new Map,n=(e,t,n)=>`${e},${t},${n}`,r={get:(e,r,i)=>{let a=n(e,r,i);return t.has(a)?t.get(a):this.world.getBlock(e,r,i)},set:(e,r,i,a)=>{t.set(n(e,r,i),a)}};for(let t of e)r.set(t.pos.x,t.pos.y,t.pos.z,t.state);for(let t of e)this.behavior?.(t.pos,t.state,r);let i=[];for(let[e,n]of t){let[t,r,a]=e.split(`,`).map(Number);i.push({pos:{x:t,y:r,z:a},state:n})}return i}clearHistory(){this.undoStack.length=0,this.redoStack.length=0}applyPrimary(e,t,n,r){let i=this.world.setBlock(e,t,n,r);i&&(this.active.push(i),this.behavior?.({x:e,y:t,z:n},r,this.editContext))}},N={north:`east`,east:`south`,south:`west`,west:`north`};function ee(e,t){let n=e,r=(t%4+4)%4;for(let e=0;e<r;e++)n=N[n];return n}var te={down:`y`,up:`y`,north:`z`,south:`z`,west:`x`,east:`x`},ne={down:`up`,up:`down`,north:`south`,south:`north`,west:`east`,east:`west`},re=new Set([`observer`,`piston`,`sticky_piston`]);function ie(e,t,n){let r=e[t],i={...r?.defaultState??{}},a=r?.properties;if(!a)return i;let o=n.rotation??0,s=r?.family,c=n.clickedFace!==`up`&&n.clickedFace!==`down`;if(a.face)return c?(i.face=`wall`,i.facing=n.clickedFace):(i.face=n.clickedFace===`up`?`floor`:`ceiling`,i.facing=ee(me[n.towardPlayer],o)),i;if(s===`trapdoor`)return c?(i.facing=n.clickedFace,i.half=n.topHalf?`top`:`bottom`):(i.facing=ee(n.towardPlayer,o),i.half=n.clickedFace===`up`?`bottom`:`top`),i;if(s===`fence_gate`||s===`bed`)return i.facing=ee(me[n.towardPlayer],o),i;if(s===`rail`&&a.shape)return i.shape=o%2==0?`north_south`:`east_west`,i;if(a.axis){let e=a.axis;i.axis=e[(Math.max(0,e.indexOf(te[n.clickedFace]))+o)%e.length]}if(a.facing){if(!(a.facing.includes(`up`)||a.facing.includes(`down`))){let e=ee(n.towardPlayer,o);a.facing.includes(e)&&(i.facing=e)}else if(n.lookFace){let e=t.replace(/^minecraft:/,``),r=re.has(e)?ne[n.lookFace]:n.lookFace;r!==`up`&&r!==`down`&&(r=ee(r,o)),a.facing.includes(r)&&(i.facing=r)}}if(a.half?.includes(`top`)&&(i.half=n.topHalf?`top`:`bottom`),a.type?.includes(`top`)&&a.type.includes(`bottom`)){let e=n.topHalf?`top`:`bottom`;i.type=o%2==0?e:e===`top`?`bottom`:`top`}return i}function ae(e,t,n){let r=ie(e,t,n),i=e[t];if(i?.family===`door`&&i.properties?.half?.includes(`upper`)){let i=De(t,r.facing??`north`,n,e);return[{dx:0,dy:0,dz:0,properties:{...r,half:`lower`,hinge:i}},{dx:0,dy:1,dz:0,properties:{...r,half:`upper`,hinge:i}}]}if(i?.family===`bed`&&i.properties?.part?.includes(`head`)){let{dx:e,dz:t}=P[r.facing??`north`];return[{dx:0,dy:0,dz:0,properties:{...r,part:`foot`}},{dx:e,dy:0,dz:t,properties:{...r,part:`head`}}]}return[{dx:0,dy:0,dz:0,properties:r}]}var oe=[{dir:`north`,dx:0,dz:-1,opposite:`south`},{dir:`south`,dx:0,dz:1,opposite:`north`},{dir:`west`,dx:-1,dz:0,opposite:`east`},{dir:`east`,dx:1,dz:0,opposite:`west`}],se={down:1,up:2,north:4,south:8,west:16,east:32},ce=[{x:0,y:0,z:0},{x:0,y:-1,z:0},{x:0,y:1,z:0},{x:0,y:0,z:-1},{x:0,y:0,z:1},{x:-1,y:0,z:0},{x:1,y:0,z:0}],le=[{x:1,y:1,z:0},{x:-1,y:1,z:0},{x:0,y:1,z:1},{x:0,y:1,z:-1},{x:1,y:-1,z:0},{x:-1,y:-1,z:0},{x:0,y:-1,z:1},{x:0,y:-1,z:-1}];function ue(e){let t=(t,n,r,i)=>{let a=i.get(t,n,r);if(!a)return;if(a.id===`minecraft:redstone_wire`){we(a,t,n,r,i,e);return}if(Me.has(a.id)){Ne(a,t,n,r,i,e);return}let o=e[a.id]?.family;o===`fence`||o===`pane`||o===`bars`?de(a,o,t,n,r,i,e):o===`stairs`?_e(a,t,n,r,i,e):o===`wall`?ye(a,t,n,r,i,e):o===`door`?ke(a,t,n,r,i,e):o===`bed`?je(a,t,n,r,i,e):o===`fence_gate`?be(a,t,n,r,i,e):o===`rail`&&R(a,t,n,r,i,e)};return(n,r,i)=>{for(let e of ce)t(n.x+e.x,n.y+e.y,n.z+e.z,i);for(let r of le){let a=n.x+r.x,o=n.y+r.y,s=n.z+r.z;e[i.get(a,o,s)?.id??``]?.family===`rail`&&t(a,o,s,i)}}}function de(e,t,n,r,i,a,o){let s={...e.properties},c=!1;for(let l of oe){let u=a.get(n+l.dx,r,i+l.dz),d=u&&fe(t,e,u,l,o)?`true`:`false`;s[l.dir]!==d&&(s[l.dir]=d,c=!0)}c&&a.set(n,r,i,_({id:e.id,properties:s}))}function fe(e,t,n,r,i){let a=i[n.id];if(!a)return!1;if(e===`fence`){if(a.family===`fence`)return pe(t,n,i);if(a.family===`fence_gate`)return(n.properties.facing===`north`||n.properties.facing===`south`)!=(r.dir===`north`||r.dir===`south`)}else if(a.family===`pane`||a.family===`bars`)return!0;return(a.sturdyFaces&se[r.opposite])!==0}function pe(e,t,n){if(e.id===t.id)return!0;let r=e=>n[e]?.tags?.includes(`minecraft:wooden_fences`)??!1;return r(e.id)&&r(t.id)}var P={north:{dx:0,dz:-1},south:{dx:0,dz:1},west:{dx:-1,dz:0},east:{dx:1,dz:0}},me={north:`south`,south:`north`,west:`east`,east:`west`},he={north:`west`,west:`south`,south:`east`,east:`north`},ge={north:`z`,south:`z`,west:`x`,east:`x`};function _e(e,t,n,r,i,a){let o=e.properties.facing;if(!P[o])return;let s=F(e,o,t,n,r,i,a);e.properties.shape!==s&&i.set(t,n,r,_({id:e.id,properties:{...e.properties,shape:s}}))}function F(e,t,n,r,i,a,o){let s=e.properties.half,c=e=>a.get(n+P[e].dx,r,i+P[e].dz),l=c(t);if(ve(l,s,o)){let s=l.properties.facing;if(ge[s]!==ge[t]&&I(e,me[s],n,r,i,a,o))return s===he[t]?`outer_left`:`outer_right`}let u=c(me[t]);if(ve(u,s,o)){let s=u.properties.facing;if(ge[s]!==ge[t]&&I(e,s,n,r,i,a,o))return s===he[t]?`inner_left`:`inner_right`}return`straight`}function ve(e,t,n){return!!e&&n[e.id]?.family===`stairs`&&e.properties.half===t}function I(e,t,n,r,i,a,o){let s=a.get(n+P[t].dx,r,i+P[t].dz);return!s||o[s.id]?.family!==`stairs`||s.properties.facing!==e.properties.facing||s.properties.half!==e.properties.half}function ye(e,t,n,r,i,a){let o=i.get(t,n+1,r),s=!!o&&(a[o.id]?.family===`wall`||(a[o.id]?.sturdyFaces??0)!==0),c={...e.properties},l=!1,u=[];for(let e of oe){let o=i.get(t+e.dx,n,r+e.dz),d=o?L(o,e,a):!1,f=`none`;d&&(u.push(e.dir),f=s?`tall`:`low`),c[e.dir]!==f&&(c[e.dir]=f,l=!0)}let d=!0;!s&&u.length===2&&me[u[0]]===u[1]&&(d=!1);let f=d?`true`:`false`;c.up!==f&&(c.up=f,l=!0),l&&i.set(t,n,r,_({id:e.id,properties:c}))}function L(e,t,n){let r=n[e.id];return r?r.family===`wall`?!0:r.family===`fence_gate`?(e.properties.facing===`north`||e.properties.facing===`south`)!=(t.dir===`north`||t.dir===`south`):(r.sturdyFaces&se[t.opposite])!==0:!1}function be(e,t,n,r,i,a){let o=e.properties.facing;if(!P[o])return;let s=(ge[o]===`z`?[`west`,`east`]:[`north`,`south`]).some(e=>{let o=i.get(t+P[e].dx,n,r+P[e].dz);return!!o&&a[o.id]?.family===`wall`})?`true`:`false`;e.properties.in_wall!==s&&i.set(t,n,r,_({id:e.id,properties:{...e.properties,in_wall:s}}))}function R(e,t,n,r,i,a){let o=a[e.id]?.properties?.shape;if(!o)return;let s=o.includes(`north_east`),c=e=>!!e&&a[e.id]?.family===`rail`,l=(e,a)=>c(i.get(t+P[e].dx,n+a,r+P[e].dz)),u=e=>l(e,0)||l(e,1)||l(e,-1),d=u(`north`),f=u(`south`),p=u(`east`),m=u(`west`),h=d||f,g=p||m,v=null;h&&!g&&(v=`north_south`),g&&!h&&(v=`east_west`),s&&(f&&p&&(v=`south_east`),f&&m&&(v=`south_west`),d&&m&&(v=`north_west`),d&&p&&(v=`north_east`)),v===null&&(h&&(v=`north_south`),g&&(v=`east_west`)),v!==null&&(v===`north_south`?(l(`north`,1)&&(v=`ascending_north`),l(`south`,1)&&(v=`ascending_south`)):v===`east_west`&&(l(`east`,1)&&(v=`ascending_east`),l(`west`,1)&&(v=`ascending_west`)),e.properties.shape!==v&&i.set(t,n,r,_({id:e.id,properties:{...e.properties,shape:v}})))}var z=[`north`,`south`,`west`,`east`],xe=new Set([`minecraft:lever`,`minecraft:redstone_torch`,`minecraft:redstone_wall_torch`,`minecraft:redstone_block`,`minecraft:target`,`minecraft:daylight_detector`,`minecraft:detector_rail`,`minecraft:trapped_chest`,`minecraft:lectern`,`minecraft:sculk_sensor`,`minecraft:calibrated_sculk_sensor`,`minecraft:tripwire_hook`]);function Se(e,t){return!!e&&(t[e.id]?.sturdyFaces??0)===63}function Ce(e,t,n){let r=e.id;if(r===`minecraft:redstone_wire`)return!0;let i=n[r]?.family;if(i===`button`||i===`pressure_plate`)return!0;if(r===`minecraft:repeater`||r===`minecraft:comparator`){let n=e.properties.facing;return n===t||me[n]===t}return r===`minecraft:observer`?e.properties.facing===t:xe.has(r)||r.includes(`lightning_rod`)}function we(e,t,n,r,i,a){let o=!Se(i.get(t,n+1,r),a),s={...e.properties},c=!1;for(let e of z){let l=Te(t,n,r,e,o,i,a);s[e]!==l&&(s[e]=l,c=!0)}c&&i.set(t,n,r,_({id:e.id,properties:s}))}function Te(e,t,n,r,i,a,o){let{dx:s,dz:c}=P[r],l=a.get(e+s,t,n+c);return i&&Se(l,o)&&a.get(e+s,t+1,n+c)?.id===`minecraft:redstone_wire`?`up`:l&&Ce(l,r,o)||!Se(l,o)&&a.get(e+s,t-1,n+c)?.id===`minecraft:redstone_wire`?`side`:`none`}var Ee=[`facing`,`hinge`,`open`,`powered`];function De(e,t,n,r){let{origin:i,getBlock:a}=n;if(!i||!a)return`left`;let o=he[t],s=N[t],c=(e,t)=>a(i.x+P[e].dx,i.y+t,i.z+P[e].dz),l=e=>!!e&&(r[e.id]?.sturdyFaces??0)===63,u=t=>!!t&&t.id===e&&t.properties.half===`lower`,d=c(o,0),f=c(s,0),p=(l(d)?-1:0)+(l(c(o,1))?-1:0)+ +!!l(f)+ +!!l(c(s,1)),m=u(d),h=u(f);return(!m||h)&&p<=0?(!h||m)&&p>=0?Oe(t,n.hit):`left`:`right`}function Oe(e,t){if(!t)return`left`;let{dx:n,dz:r}=P[e];return(n>=0||t.z>=.5)&&(n<=0||t.z<=.5)&&(r>=0||t.x<=.5)&&(r<=0||t.x>=.5)?`left`:`right`}function ke(e,t,n,r,i,a){let o=e.properties.half,s=o===`lower`?n+1:n-1,c=o===`lower`?`upper`:`lower`,l=i.get(t,s,r);if(!l||l.id!==e.id||a[l.id]?.family!==`door`||l.properties.half!==c){i.set(t,n,r,null);return}let u=!1,d={...l.properties};for(let t of Ee){let n=e.properties[t];n!==void 0&&d[t]!==n&&(d[t]=n,u=!0)}u&&i.set(t,s,r,_({id:e.id,properties:d}))}var Ae=[`facing`,`occupied`];function je(e,t,n,r,i,a){let o=e.properties.facing;if(!P[o])return;let s=e.properties.part,c=s===`foot`?o:me[o],l=s===`foot`?`head`:`foot`,u=t+P[c].dx,d=r+P[c].dz,f=i.get(u,n,d);if(!f||f.id!==e.id||a[f.id]?.family!==`bed`||f.properties.part!==l||f.properties.facing!==o){i.set(t,n,r,null);return}let p=!1,m={...f.properties};for(let t of Ae){let n=e.properties[t];n!==void 0&&m[t]!==n&&(m[t]=n,p=!0)}p&&i.set(u,n,d,_({id:e.id,properties:m}))}var Me=new Set([`minecraft:chest`,`minecraft:trapped_chest`]);function Ne(e,t,n,r,i,a){let o=e.properties.facing;if(!P[o])return;let s=e=>i.get(t+P[e].dx,n,r+P[e].dz),c=t=>!!t&&t.id===e.id&&t.properties.facing===o,l=(a,o,c)=>{if(Pe(i,t,n,r,e,o),a){let e=s(a);Pe(i,t+P[a].dx,n,r+P[a].dz,e,c)}},u=s(N[o]),d=s(he[o]),f=e.properties.type;f===`left`&&c(u)&&u.properties.type===`right`||f===`right`&&c(d)&&d.properties.type===`left`||(c(u)&&u.properties.type===`single`?l(N[o],`left`,`right`):c(d)&&d.properties.type===`single`?l(he[o],`right`,`left`):l(null,`single`,`single`))}function Pe(e,t,n,r,i,a){i.properties.type!==a&&e.set(t,n,r,_({id:i.id,properties:{...i.properties,type:a}}))}var Fe=new Set([`minecraft:iron_door`,`minecraft:iron_trapdoor`]),Ie=new Set([`door`,`trapdoor`,`fence_gate`]);function Le(e,t,n,r,i,a){let o=e.getBlock(t,n,r);if(!o)return null;let s=i[o.id],c=s?.family;if(!c||!Ie.has(c)||Fe.has(o.id)||!s?.properties?.open)return null;let l=o.properties.open===`true`?`false`:`true`,u={...o.properties,open:l};if(c===`fence_gate`&&l===`true`&&a){let e=o.properties.facing;P[e]&&e===me[a]&&(u.facing=a)}let d=[{pos:{x:t,y:n,z:r},state:_({id:o.id,properties:u})}];if(c===`door`){let i=o.properties.half,a=i===`lower`?n+1:n-1,s=e.getBlock(t,a,r);s&&s.id===o.id&&s.properties.half===(i===`lower`?`upper`:`lower`)&&d.push({pos:{x:t,y:a,z:r},state:_({id:s.id,properties:{...s.properties,open:l}})})}return d}var Re=[`down`,`up`,`north`,`south`,`west`,`east`],ze=`__placeholder__`,Be=`minecraft:font/ascii`,Ve=[`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0`,`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0`,` !"#$%&'()*+,-./`,`0123456789:;<=>?`,`@ABCDEFGHIJKLMNO`,`PQRSTUVWXYZ[\\]^_`,"`abcdefghijklmno",`pqrstuvwxyz{|}~\0`,`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0`,`\0\0\0\0\0\0\0\0\0\0\0\0£\0\0ƒ`,`\0\0\0\0\0\0ªº\0\0¬\0\0\0«»`,`░▒▓│┤╡╢╖╕╣║╗╝╜╛┐`,`└┴┬├─┼╞╟╚╔╩╦╠═╬╧`,`╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀`,`\0\0\0\0\0\0\0\0\0\0\0\0\0∅∈\0`,`≡±≥≤⌠⌡÷≈°∙\0√ⁿ²■\0`],He=16,Ue=new Map;for(let e=0;e<Ve.length;e++){let t=Ve[e];for(let n=0;n<t.length;n++){let r=t[n];r!==`\0`&&Ue.set(r,e*He+n)}}var We=4,Ge=10,Ke=8,qe=4,Je=16/96,Ye=.05,Xe={white:16777215,orange:16351261,magenta:13061821,light_blue:3847130,yellow:16701501,lime:8439583,pink:15961002,gray:4673362,light_gray:10329495,cyan:1481884,purple:8991416,blue:3949738,brown:8606770,green:6192150,red:11546150,black:0},Ze=new WeakMap;function Qe(e){let t=Ze.get(e);if(t!==void 0)return t;let n=e.textures[Be],r=n?$e(n):null;return r||console.warn(`[shulkr] sign text disabled: this render bundle has no ${Be} page (rebuild it with the packager)`),Ze.set(e,r),r}function $e(e){if(e.alpha!==`cutout`)return null;let{width:t,height:n,alphaMask:r}=e,i=Math.floor(t/He);if(i<1||n<i*He)return null;let a=new Uint8Array(He*He);for(let e=0;e<He;e++)for(let n=0;n<He;n++){let o=-1;for(let a=0;a<i;a++)for(let s=i-1;s>o;s--){let c=(e*i+a)*t+(n*i+s);r[c>>3]&1<<(c&7)&&(o=s)}a[e*He+n]=o+2}return a}function et(e,t){let n=Ue.get(e);if(n===void 0||e===` `)return We;let r=t[n];return r>1?r:We}var tt={south:0,west:90,north:180,east:270};function nt(e,t){if(e.endsWith(`_wall_sign`)){let e=tt[t.facing??`south`];return e===void 0?null:{centerY:8.5,frontZ:2,centerZ:1,yaw:e}}if(e.endsWith(`_sign`)){let e=Number.parseInt(t.rotation??`0`,10);return Number.isFinite(e)?{centerY:12,frontZ:9,centerZ:8,yaw:(e&15)*22.5}:null}return null}var rt=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];function it(e,t){let n=Array(16).fill(0);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[r*4+n]*t[n*4+i];n[r*4+i]=a}return n}function at(e,t,n){return[1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1]}function ot(e){let t=-e*Math.PI/180,n=Math.cos(t),r=Math.sin(t);return[n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1]}function st(e,t,n,r){return it(at(t,n,r),it(e,at(-t,-n,-r)))}function ct(e){return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}function lt(e,t,n){let r=[],i=ct(Xe[e.color??`black`]??Xe.black),a=t.frontZ+Ye,o=t.centerY+qe*Ge/2*Je;for(let t=0;t<qe;t++){let s=e.lines[t]??``;if(s===``)continue;let c=0;for(let e of s)c+=et(e,n);let l=8-c/2*Je,u=o-t*Ge*Je,d=u-Ke*Je;for(let e of s){let t=Ue.get(e);if(t!==void 0&&e!==` `){let e=t%He,n=Math.floor(t/He);r.push({from:[l,d,a],to:[l+Ke*Je,u,a],faces:{south:{texture:Be,uv:[e,n,e+1,n+1],color:i}}})}l+=et(e,n)*Je}}return r}function ut(e){if(typeof e!=`object`||!e)return null;let t=e.sign;return typeof t!=`object`||!t?null:t}function dt(e,t){return e===`minecraft`&&t.endsWith(`_sign`)&&!t.includes(`hanging`)}function ft(e,t,n,r){let i=ut(r);if(!i)return[];let a=nt(t,n);if(!a)return[];let o=Qe(e);if(!o)return[];let s=st(ot(a.yaw),.5,.5,.5),c=[],l=(e,t)=>{if(!e?.lines?.some(e=>e!==``))return;let n=lt(e,a,o);if(n.length===0)return;let r=t?st(ot(180),.5,.5,a.centerZ/16):rt;c.push({elements:n,x:0,y:0,uvlock:!1,attachmentMatrix:it(s,r)})};return l(i.front,!1),l(i.back,!0),c}function pt(e,t=`block`){let n=e.indexOf(`:`),r=n===-1?`minecraft`:e.slice(0,n),i=n===-1?e:e.slice(n+1);return`${r}:${i.startsWith(`${t}/`)||i.startsWith(`block/`)||i.startsWith(`entity/`)||i.startsWith(`colormap/`)?i:`${t}/${i}`}`}function mt(e){if(!e)return{};let t={};for(let n of e.split(`,`)){let e=n.indexOf(`=`);e!==-1&&(t[n.slice(0,e)]=n.slice(e+1))}return t}function ht(e){return Object.keys(e).sort().map(t=>`${t}=${e[t]}`).join(`,`)}function gt(e,t){let n=new Set,r=e;for(;r.startsWith(`#`);){if(n.has(r))return null;n.add(r);let e=t[r.slice(1)];if(!e)return null;r=e}return r}function _t(e,t){let n=[],r=new Set,i=pt(e,`block`);for(;i&&!r.has(i);){r.add(i);let e=t[i];if(!e)break;n.unshift(e),i=e.parent?pt(e.parent,`block`):void 0}return n}function vt(e){if(!e)return;let t=e.origin;return`axis`in e?{origin:t,x:e.axis===`x`?e.angle:0,y:e.axis===`y`?e.angle:0,z:e.axis===`z`?e.angle:0,rescale:e.rescale}:{origin:t,x:e.x??0,y:e.y??0,z:e.z??0,rescale:e.rescale}}function yt(e,t){let n=_t(e,t),r={};for(let e of n)if(e.textures)for(let[t,n]of Object.entries(e.textures))r[t]=typeof n==`string`?n:n.sprite;let i;for(let e=n.length-1;e>=0;e--)if(n[e].elements){i=n[e].elements;break}return(i??[]).map(e=>{let t={};for(let n of Re){let i=e.faces?.[n];if(!i)continue;let a=gt(i.texture,r);t[n]={texture:a?pt(a,`block`):ze,uv:i.uv,cullface:i.cullface===void 0?void 0:i.cullface,rotation:i.rotation,tintindex:i.tintindex}}return{from:e.from,to:e.to,faces:t,rotation:vt(e.rotation),shade:e.shade}})}var bt=new Map,xt=new Map,St=new Map;function Ct(e,t,n,r){bt.set(e,t),n&&xt.set(e,new Set(n)),r&&St.set(e,new Set(r))}function wt(e,t){return dt(e,t)?!0:xt.get(e)?.has(t)??!1}function Tt(e,t){return St.get(e)?.has(t)??!1}function Et(e,t,n,r,i){let a={elements:yt(t,e.blockModels),x:n,y:r,uvlock:i},o=e.objModels?.[pt(t,`block`)];return o&&(a.obj=Dt(o)),a}function Dt(e){let t=e=>{let t=new Uint8Array(e);return new Float32Array(t.buffer,0,t.byteLength/4)};return{positions:t(e.positions),normals:t(e.normals),uvs:t(e.uvs),groups:e.groups.map(e=>({...e}))}}function Ot(e){let t=Array.isArray(e)?e[0]:e;return{model:t.model,x:t.x??0,y:t.y??0,uvlock:t.uvlock??!1}}function kt(e,t){let n=e[ht(t)];if(n)return Ot(n);if(Object.keys(t).length===0){let t=Object.values(e)[0];return t?Ot(t):null}let r=null,i=-1;for(let[n,a]of Object.entries(e)){let e=mt(n),o=!0,s=0;for(let[n,r]of Object.entries(e))if(t[n]!==void 0){if(t[n]!==r){o=!1;break}s++}o&&s>i&&(i=s,r=Ot(a))}return r}function At(e,t){if(!e)return!0;if(Array.isArray(e.OR))return e.OR.some(e=>At(e,t));if(Array.isArray(e.AND))return e.AND.every(e=>At(e,t));for(let[n,r]of Object.entries(e)){if(n===`AND`||n===`OR`)continue;let e=t[n];if(e===void 0||!String(r).split(`|`).includes(e))return!1}return!0}function jt(e,t){if(`variants`in e){let n=kt(e.variants,t);return n?[n]:[]}let n=[];for(let r of e.multipart)At(r.when,t)&&n.push(Ot(r.apply));return n}function Mt(e){if(e.length!==1)return!1;let t=e[0];return t.from[0]!==0||t.from[1]!==0||t.from[2]!==0||t.to[0]!==16||t.to[1]!==16||t.to[2]!==16?!1:Re.every(e=>t.faces[e]!==void 0)}function Nt(e,t){let n=e.length===1&&Mt(e[0].elements),r=!1,i=!1,a=!0;for(let n of e)for(let e of n.elements)for(let n of Re){let o=e.faces[n];if(!o)continue;let s=t.textures[o.texture]?.alpha;s===`partial`?r=!0:s===`cutout`&&(i=!0),s!==`opaque`&&(a=!1)}return{parts:e,fullCube:n,opaque:n&&a,renderLayer:r?`translucent`:i?`cutout`:`opaque`}}function Pt(){let e={};for(let t of Re)e[t]={texture:ze};return{elements:[{from:[0,0,0],to:[16,16,16],faces:e}],x:0,y:0,uvlock:!1}}function Ft(e,t,n){let r=t.namespace??`minecraft`,i=o(r,t.name)??t.name;if(r===`minecraft`&&(i===`water`||i===`lava`))return Nt([],e);let a=e.blockStates[pt(`${r}:${i}`,`block`)];if(!a)return Nt([Pt()],e);let s=[];if(!Tt(r,i))for(let n of jt(a,t.properties))s.push(Et(e,n.model,n.x,n.y,n.uvlock));n&&dt(r,i)&&s.push(...ft(e,i,t.properties,n.normalizedBlockEntity));let c=bt.get(r);if(c)for(let r of c({name:i,properties:t.properties},n)){let t=r.elements?{elements:r.elements,x:0,y:0,uvlock:!1}:Et(e,r.model??``,0,0,!1);r.matrix?t.attachmentMatrix=r.matrix:t.attachmentRotation={x:r.x??0,y:r.y??0,z:r.z??0},s.push(t)}return Nt(s,e)}var It=1.5,Lt=1e-6,Rt=new Set(`minecraft:flower.minecraft:tall_flower.minecraft:double_plant.minecraft:tall_grass.minecraft:short_dry_grass.minecraft:tall_dry_grass.minecraft:dry_vegetation.minecraft:bush.minecraft:sapling.minecraft:bamboo_sapling.minecraft:mangrove_propagule.minecraft:mushroom.minecraft:nether_fungus.minecraft:nether_roots.minecraft:nether_sprouts.minecraft:nether_wart.minecraft:wither_rose.minecraft:eyeblossom.minecraft:cactus_flower.minecraft:firefly_bush.minecraft:crop.minecraft:carrot.minecraft:potato.minecraft:beetroot.minecraft:torchflower_crop.minecraft:pitcher_crop.minecraft:stem.minecraft:attached_stem.minecraft:sugar_cane.minecraft:flower_bed.minecraft:leaf_litter.minecraft:spore_blossom.minecraft:small_dripleaf.minecraft:big_dripleaf_stem.minecraft:seagrass.minecraft:tall_seagrass.minecraft:kelp.minecraft:kelp_plant.minecraft:frogspawn.minecraft:coral_plant.minecraft:coral_fan.minecraft:coral_wall_fan.minecraft:base_coral_plant.minecraft:base_coral_fan.minecraft:base_coral_wall_fan.minecraft:vine.minecraft:twisting_vines.minecraft:twisting_vines_plant.minecraft:weeping_vines.minecraft:weeping_vines_plant.minecraft:cave_vines.minecraft:cave_vines_plant.minecraft:hanging_roots.minecraft:hanging_moss.minecraft:glow_lichen.minecraft:sculk_vein.minecraft:multiface.minecraft:rail.minecraft:powered_rail.minecraft:detector_rail.minecraft:redstone_wire.minecraft:button.minecraft:pressure_plate.minecraft:weighted_pressure_plate.minecraft:lever.minecraft:tripwire.minecraft:trip_wire_hook.minecraft:torch.minecraft:wall_torch.minecraft:redstone_torch.minecraft:redstone_wall_torch.minecraft:standing_sign.minecraft:wall_sign.minecraft:ceiling_hanging_sign.minecraft:wall_hanging_sign.minecraft:banner.minecraft:wall_banner.minecraft:air.minecraft:liquid.minecraft:fire.minecraft:soul_fire.minecraft:nether_portal.minecraft:end_portal.minecraft:end_gateway.minecraft:structure_void.minecraft:light.minecraft:bubble_column.minecraft:moving_piston.minecraft:web.minecraft:powder_snow`.split(`.`)),zt=3/16,Bt=new Set([`minecraft:fence`,`minecraft:wall`,`minecraft:fence_gate`]);function Vt(e,t,n){if(n!==void 0&&Rt.has(n)||n===`minecraft:fence_gate`&&e.properties.open===`true`)return null;if(n===`minecraft:ladder`)return[Ht(e.properties.facing)];let r=Wt(t);return r.length===0?null:n!==void 0&&Bt.has(n)?Ut(r.map(e=>[e[0],0,e[2],e[3],It,e[5]])):Ut(r)}function Ht(e){let t=zt,n=1-zt;switch(e){case`south`:return[0,0,0,1,1,t];case`east`:return[0,0,0,t,1,1];case`west`:return[n,0,0,1,1,1];default:return[0,0,n,1,1,1]}}function Ut(e){let t=[];for(let n of e)t.some(e=>e.every((e,t)=>e===n[t]))||t.push(n);return t}function Wt(e){let t=[];for(let n of e.parts)if(!(n.attachmentRotation||n.attachmentMatrix))for(let e of n.elements){let r=Gt(Kt(e.from,e.to,n.x,n.y));r[3]-r[0]>Lt&&r[4]-r[1]>Lt&&r[5]-r[2]>Lt&&t.push(r)}return t}function Gt(e){return[Math.max(0,e[0]),Math.max(0,e[1]),Math.max(0,e[2]),Math.min(1,e[3]),Math.min(1,e[4]),Math.min(1,e[5])]}function Kt(e,t,n,r){let i=qt(e[0]/16,e[1]/16,e[2]/16,n,r),a=qt(t[0]/16,t[1]/16,t[2]/16,n,r);return[Math.min(i[0],a[0]),Math.min(i[1],a[1]),Math.min(i[2],a[2]),Math.max(i[0],a[0]),Math.max(i[1],a[1]),Math.max(i[2],a[2])]}function qt(e,t,n,r,i){let a=e-.5,o=t-.5,s=n-.5;if(r!==0){let[e,t]=Jt(-r),n=o*t-s*e,i=o*e+s*t;o=n,s=i}if(i!==0){let[e,t]=Jt(-i),n=a*t+s*e,r=-a*e+s*t;a=n,s=r}return[a+.5,o+.5,s+.5]}function Jt(e){switch((e%360+360)%360){case 0:return[0,1];case 90:return[1,0];case 180:return[0,-1];case 270:return[-1,0];default:{let t=e*Math.PI/180;return[Math.sin(t),Math.cos(t)]}}}var Yt=class{constructor(e){this.source=e,this.cache=new Map}boxesFor(e){let t=this.cache.get(e.stateKey);if(t!==void 0)return t;let n=Vt(e,this.source.resolveModel(e),this.source.blockTypeOf(e.id));return this.cache.set(e.stateKey,n),n}clear(){this.cache.clear()}get size(){return this.cache.size}},Xt=new Set([`minecraft:ladder`,`minecraft:vine`,`minecraft:twisting_vines`,`minecraft:twisting_vines_plant`,`minecraft:weeping_vines`,`minecraft:weeping_vines_plant`,`minecraft:cave_vines`,`minecraft:cave_vines_plant`]),Zt=new Set([`minecraft:trapdoor`,`minecraft:weathering_copper_trapdoor`]);function Qt(e,t){if(e===null||e.blockType===void 0)return!1;if(Xt.has(e.blockType))return!0;if(!Zt.has(e.blockType)||e.properties.open!==`true`)return!1;let n=t();return n?.blockType===`minecraft:ladder`&&n.properties.facing===e.properties.facing}var $t=(e,t)=>({properties:e.properties,blockType:t}),en=.6,tn=1e-7,nn=(e,t,n,r)=>({minX:e.minX+t,minY:e.minY+n,minZ:e.minZ+r,maxX:e.maxX+t,maxY:e.maxY+n,maxZ:e.maxZ+r});function rn(e,t,n,r){return{minX:t<0?e.minX+t:e.minX,minY:n<0?e.minY+n:e.minY,minZ:r<0?e.minZ+r:e.minZ,maxX:t>0?e.maxX+t:e.maxX,maxY:n>0?e.maxY+n:e.maxY,maxZ:r>0?e.maxZ+r:e.maxZ}}var an=(e,t)=>e.minX<t.maxX&&e.maxX>t.minX&&e.minY<t.maxY&&e.maxY>t.minY&&e.minZ<t.maxZ&&e.maxZ>t.minZ;function on(e,t){let n=[],r=Math.floor(t.minX),i=Math.floor(t.maxX),a=Math.floor(t.minY-(It-1)),o=Math.floor(t.maxY),s=Math.floor(t.minZ),c=Math.floor(t.maxZ);for(let l=r;l<=i;l++)for(let r=a;r<=o;r++)for(let i=s;i<=c;i++){let a=e.boxesAt(l,r,i);if(a!==null)for(let e of a){let a={minX:l+e[0],minY:r+e[1],minZ:i+e[2],maxX:l+e[3],maxY:r+e[4],maxZ:i+e[5]};an(a,t)&&n.push(a)}}return n}function sn(e,t){return on(e,t).length>0}function cn(e,t,n=en){return sn(e,nn(t,0,-n,0))}function ln(e,t,n,r){if(n===0)return 0;let[i,a,o,s,c,l]=r===0?[`minX`,`maxX`,`minY`,`maxY`,`minZ`,`maxZ`]:r===1?[`minY`,`maxY`,`minX`,`maxX`,`minZ`,`maxZ`]:[`minZ`,`maxZ`,`minX`,`maxX`,`minY`,`maxY`],u=n;for(let n of e)t[s]<=n[o]||t[o]>=n[s]||t[l]<=n[c]||t[c]>=n[l]||(u>0&&t[a]<=n[i]+tn?u=Math.min(n[i]-t[a],u):u<0&&t[i]>=n[a]-tn&&(u=Math.max(n[a]-t[i],u)));return u}function un(e,t,n,r,i){let a=t,o=ln(e,a,r,1);o!==0&&(a=nn(a,0,o,0));let s,c;return Math.abs(n)<Math.abs(i)?(s=ln(e,a,n,0),s!==0&&(a=nn(a,s,0,0)),c=ln(e,a,i,2)):(c=ln(e,a,i,2),c!==0&&(a=nn(a,0,0,c)),s=ln(e,a,n,0)),{dx:s,dy:o,dz:c}}var dn=e=>e.dx*e.dx+e.dz*e.dz;function fn(e,t,n,r,i,a,o=en){let s=on(e,rn(rn(t,n,r,i),0,o>0?o:0,0)),c=un(s,t,n,r,i),l=c.dx!==n||c.dz!==i,u=a||r<0&&c.dy!==r,d=c,f=!1;if(o>0&&u&&l){let e=un(s,t,n,o,i);if(dn(e)>dn(c)){let n=ln(s,nn(t,e.dx,e.dy,e.dz),r-e.dy,1);d={dx:e.dx,dy:e.dy+n,dz:e.dz},f=!0}}return{dx:d.dx,dy:d.dy,dz:d.dz,hitX:d.dx!==n,hitY:d.dy!==r,hitZ:d.dz!==i,onGround:f||r<=0&&d.dy!==r,stepped:f}}var pn=1/20,mn=.6,hn=1.8,gn=1.5,_n=1.62,vn=1.27,yn=.08,bn=.98,xn=.42,Sn=.2,Cn=.15,wn=.2,Tn=.1,En=1.3,Dn=.3,On=.98,kn=.02,An=.91,jn=.6,Mn={ice:.98,packed_ice:.98,frosted_ice:.98,blue_ice:.989,slime_block:.8},Nn=.21600002,Pn=(e,t,n)=>({x:e,y:t,z:n,vx:0,vy:0,vz:0,onGround:!1,sneaking:!1,sprinting:!1});function Fn(e){let t=mn/2;return{minX:e.x-t,minY:e.y,minZ:e.z-t,maxX:e.x+t,maxY:e.y+(e.sneaking?gn:hn),maxZ:e.z+t}}var In=e=>e.sneaking?vn:_n;function Ln(e,t,n){let r=t.sneak,i=t.sprint&&t.forward>0&&!r,a=e.vx,o=e.vy,s=e.vz,c=e.onGround?Un(e,n):jn,l=e.onGround?c*An:An;t.jump&&e.onGround&&(o=xn,i&&(a-=Math.sin(t.yaw)*Sn,s+=Math.cos(t.yaw)*Sn));let u=Hn(t,r,e.onGround?Tn*(i?En:1)*(Nn/(c*c*c)):kn*(i?En:1));a+=u.x,s+=u.z,zn(e,n)&&(a=Rn(a,Cn),s=Rn(s,Cn),o=Math.max(o,-.15),r&&o<0&&(o=0));let d=Fn({...e,sneaking:r}),[f,p]=[a,s];r&&e.onGround&&o<=0&&([f,p]=Vn(n,d,a,s));let m=fn(n,d,f,o,p,e.onGround,en),h={x:e.x+m.dx,y:e.y+m.dy,z:e.z+m.dz,vx:a,vy:o,vz:s,onGround:m.onGround,sneaking:r,sprinting:i};return m.hitX&&(h.vx=0),m.hitZ&&(h.vz=0),m.hitY&&(h.vy=0),(m.hitX||m.hitZ||t.jump)&&zn(h,n)&&(h.vy=wn),h.vy=(h.vy-yn)*bn,h.vx*=l,h.vz*=l,h}var Rn=(e,t)=>Math.min(t,Math.max(-t,e));function zn(e,t){return t.isClimbable?t.isClimbable(Math.floor(e.x),Math.floor(e.y),Math.floor(e.z)):!1}var Bn=.05;function Vn(e,t,n,r){let i=(n,r)=>cn(e,nn(t,n,0,r)),a=e=>Math.abs(e)<Bn?0:e>0?e-Bn:e+Bn,o=n,s=r;for(;o!==0&&!i(o,0);)o=a(o);for(;s!==0&&!i(0,s);)s=a(s);for(;o!==0&&s!==0&&!i(o,s);)o=a(o),s=a(s);return[o,s]}function Hn(e,t,n){let r=On*(t?Dn:1),i=e.forward*r,a=-e.strafe*r,o=i*i+a*a;if(o<1e-7)return{x:0,z:0};if(o>1){let e=Math.sqrt(o);i/=e,a/=e}i*=n,a*=n;let s=Math.sin(e.yaw),c=Math.cos(e.yaw);return{x:a*c-i*s,z:i*c+a*s}}function Un(e,t){if(!t.groundBlockName)return jn;let n=t.groundBlockName(Math.floor(e.x),Math.floor(e.y-.02),Math.floor(e.z));return n===null?jn:Mn[n]??.6}var Wn=[`blockStates`,`blockModels`,`textures`,`textureMetas`];function Gn(e){return Array.isArray(e)?e[0]:e}function Kn(e,t={}){let n={};for(let[r,i]of Object.entries(e.options)){let e={};for(let[n,a]of Object.entries(i)){let i=t[r]?.[n];e[n]=i!==void 0&&(Array.isArray(a)?typeof i==`string`&&a.includes(i):typeof i==`boolean`)?i:Gn(a)}n[r]=e}return n}function qn(e,t){let n=e.match(/[A-Za-z_][\w.]*|[!&|()]/g)??[],r=0,i=()=>n[r],a=()=>n[r++],o=e=>{let n=e.split(`.`);return n.length===2?t[n[0]]?.[n[1]]===!0:n.length===3?t[n[0]]?.[n[1]]===n[2]:!1},s=()=>{if(i()===`!`)return a(),!s();if(i()===`(`){a();let e=l();return i()===`)`&&a(),e}let e=a();return e===void 0?!1:o(e)},c=()=>{let e=s();for(;i()===`&`;){a();let t=s();e&&=t}return e},l=()=>{let e=c();for(;i()===`|`;){a();let t=c();e||=t}return e};return l()}function Jn(e,t){for(let n of e)if(!n.when||qn(n.when,t))return n;return null}function Yn(e,t,n={}){let r=t.pack;if(!r)return;let i=Kn(r,n);for(let n of Wn){let a=t[n],o=r.resolve[n],s={...a};for(let[t,r]of Object.entries(o??{})){let o=Jn(r,i);if(!o){delete s[t];continue}if(o.from===t)continue;let c=a[o.from]??e[n][o.from];c===void 0?delete s[t]:s[t]=c}Object.assign(e[n],s)}t.objModels&&(e.objModels=Object.assign(e.objModels??{},t.objModels))}function Xn(e){return[...e].sort((e,t)=>e.id<t.id?-1:+(e.id>t.id)).map(e=>{let t=Object.entries(e.options??{}).sort(([e],[t])=>e<t?-1:1).map(([e,t])=>Object.entries(t).sort(([e],[t])=>e<t?-1:1).map(([t,n])=>`${e}.${t}=${String(n)}`).join(`,`)).filter(Boolean).join(`,`);return t?`${e.id}[${t}]`:e.id}).join(`+`)}function Zn(e){return`${e.texture}${e.tinted?`|tint`:``}${e.doubleSided?`|ds`:``}`}var Qn={down:[0,-1,0],up:[0,1,0],north:[0,0,-1],south:[0,0,1],west:[-1,0,0],east:[1,0,0]},$n=e=>e*Math.PI/180,er=e=>Math.abs(e%90)<1e-6;function tr(e,t,n=0){return er(e)&&er(t)&&er(n)}function nr(e,t,n,r=0){let[i,a,o]=e,s=(e,t)=>{if(e===0)return;let n=-$n(e);t(Math.cos(n),Math.sin(n))};return s(t,(e,t)=>{let n=a*e-o*t,r=a*t+o*e;a=n,o=r}),s(n,(e,t)=>{let n=i*e+o*t,r=-i*t+o*e;i=n,o=r}),s(r,(e,t)=>{let n=i*e-a*t,r=i*t+a*e;i=n,a=r}),[i,a,o]}function rr(e,t,n,r=0){let i=e,a=e=>(e/90%4+4)%4;for(let e=0;e<a(t);e++)i=i===`up`?`north`:i===`north`?`down`:i===`down`?`south`:i===`south`?`up`:i;for(let e=0;e<a(n);e++)i=i===`north`?`east`:i===`east`?`south`:i===`south`?`west`:i===`west`?`north`:i;for(let e=0;e<a(r);e++)i=i===`up`?`east`:i===`east`?`down`:i===`down`?`west`:i===`west`?`up`:i;return i}function ir(e,t){let n=[t.origin[0]/16,t.origin[1]/16,t.origin[2]/16],r=$n(t.x),i=$n(t.y),a=$n(t.z),o=Math.max(Math.abs(r),Math.abs(i),Math.abs(a)),s=t.rescale&&o!==0?1/Math.cos(o):1;for(let t of e){let e=t[0]-n[0],o=t[1]-n[1],c=t[2]-n[2];if(r!==0){let e=Math.cos(r),t=Math.sin(r),n=o,i=c;o=n*e-i*t,c=n*t+i*e}if(i!==0){let t=Math.cos(i),n=Math.sin(i),r=e,a=c;e=r*t+a*n,c=-r*n+a*t}if(a!==0){let t=Math.cos(a),n=Math.sin(a),r=e,i=o;e=r*t-i*n,o=r*n+i*t}t[0]=e*s+n[0],t[1]=o*s+n[1],t[2]=c*s+n[2]}}var ar=[.5,.5,.5];function or(e,t,n){if(!(t===0&&n===0))for(let r of e){let e=nr([r[0]-.5,r[1]-.5,r[2]-.5],t,n);r[0]=e[0]+ar[0],r[1]=e[1]+ar[1],r[2]=e[2]+ar[2]}}function sr(e,t,n,r){let[i,a,o]=e,s=e=>(e%360+360)%360/90;for(let e=0;e<s(t);e++){let e=o;o=-a,a=e}for(let e=0;e<s(n);e++){let e=-o;o=i,i=e}for(let e=0;e<s(r);e++){let e=i;i=a,a=-e}return[i,a,o]}function cr(e,t){return sr(e,t.x,t.y,t.z)}function lr(e,t){for(let n of e){let e=cr([n[0]-.5,n[1]-.5,n[2]-.5],t);n[0]=e[0]+ar[0],n[1]=e[1]+ar[1],n[2]=e[2]+ar[2]}}function ur(e,t){let[n,r,i]=e;e[0]=t[0]*n+t[1]*r+t[2]*i+t[3],e[1]=t[4]*n+t[5]*r+t[6]*i+t[7],e[2]=t[8]*n+t[9]*r+t[10]*i+t[11]}function dr(e,t){let[n,r,i]=e,a=t[0]*n+t[1]*r+t[2]*i,o=t[4]*n+t[5]*r+t[6]*i,s=t[8]*n+t[9]*r+t[10]*i,c=Math.hypot(a,o,s)||1;return[a/c,o/c,s/c]}function fr(e,t,n){let[r,i,a]=t,[o,s,c]=n;switch(e){case`down`:return[[r,i,a],[o,i,a],[o,i,c],[r,i,c]];case`up`:return[[r,s,c],[o,s,c],[o,s,a],[r,s,a]];case`north`:return[[r,i,a],[r,s,a],[o,s,a],[o,i,a]];case`south`:return[[o,i,c],[o,s,c],[r,s,c],[r,i,c]];case`west`:return[[r,i,c],[r,s,c],[r,s,a],[r,i,a]];case`east`:return[[o,i,a],[o,s,a],[o,s,c],[o,i,c]]}}function pr(e,t,n){let r,i,a,o;if(e.uv)[r,i,a,o]=[e.uv[0]/16,e.uv[1]/16,e.uv[2]/16,e.uv[3]/16];else{let e=n.from,s=n.to;switch(t){case`down`:r=e[0]/16,i=(16-s[2])/16,a=s[0]/16,o=(16-e[2])/16;break;case`up`:r=e[0]/16,i=e[2]/16,a=s[0]/16,o=s[2]/16;break;case`north`:r=(16-s[0])/16,i=(16-s[1])/16,a=(16-e[0])/16,o=(16-e[1])/16;break;case`south`:r=e[0]/16,i=(16-s[1])/16,a=s[0]/16,o=(16-e[1])/16;break;case`west`:r=e[2]/16,i=(16-s[1])/16,a=s[2]/16,o=(16-e[1])/16;break;case`east`:r=(16-s[2])/16,i=(16-s[1])/16,a=(16-e[2])/16,o=(16-e[1])/16;break}}let s=1-o,c=1-i,l;switch(t){case`down`:l=[[r,s],[a,s],[a,c],[r,c]];break;case`up`:l=[[r,s],[a,s],[a,c],[r,c]];break;default:l=[[a,s],[a,c],[r,c],[r,s]];break}let u=e.rotation??0;if(u!==0){let e=(u/90%4+4)%4;for(let t=0;t<e;t++)l=[l[1],l[2],l[3],l[0]]}return l}function mr(e,t=new Set){let n=new Map,r=e=>{let t=Zn(e),r=n.get(t);return r||(r={descriptor:e,data:{positions:[],normals:[],uvs:[],faceColors:[]}},n.set(t,r)),r.data};for(let n of e.parts){let e=tr(n.x,n.y);for(let i of n.elements){let a=i.from[0]>i.to[0]||i.from[1]>i.to[1]||i.from[2]>i.to[2],o=a?[Math.min(i.from[0],i.to[0]),Math.min(i.from[1],i.to[1]),Math.min(i.from[2],i.to[2])]:i.from,s=a?[Math.max(i.from[0],i.to[0]),Math.max(i.from[1],i.to[1]),Math.max(i.from[2],i.to[2])]:i.to,c=[o[0]/16,o[1]/16,o[2]/16],l=[s[0]/16,s[1]/16,s[2]/16],u=a?{...i,from:o,to:s}:i;for(let a of Re){let o=i.faces[a];if(!o)continue;if(o.cullface&&t.size>0&&e){let e=rr(o.cullface,n.x,n.y);if(t.has(e))continue}let s=fr(a,c,l);if(i.rotation&&ir(s,i.rotation),or(s,n.x,n.y),n.attachmentMatrix)for(let e of s)ur(e,n.attachmentMatrix);else n.attachmentRotation&&lr(s,n.attachmentRotation);let d=Qn[a];(n.x!==0||n.y!==0)&&(d=nr(d,n.x,n.y)),n.attachmentMatrix?d=dr(d,n.attachmentMatrix):n.attachmentRotation&&(d=cr(d,n.attachmentRotation));let f=pr(o,a,u),p=o.tintindex!==void 0&&o.tintindex>=0,m=r({texture:o.texture,tinted:p}),h=o.color;m.faceColors.push(h?.[0]??1,h?.[1]??1,h?.[2]??1);for(let[e,t,n]of[[0,1,2],[0,2,3]])for(let r of[e,t,n])m.positions.push(s[r][0],s[r][1],s[r][2]),m.normals.push(d[0],d[1],d[2]),m.uvs.push(f[r][0],f[r][1])}}n.obj&&hr(n.obj,n.x,n.y,n.attachmentRotation,n.attachmentMatrix,r)}return{buckets:n}}function hr(e,t,n,r,i,a){let o=t!==0||n!==0,{positions:s,normals:c,uvs:l}=e;for(let u of e.groups){let e=a({texture:u.texture,tinted:!1,doubleSided:!0}),d=u.start+u.count,f=a=>{let u=s[a*3],d=s[a*3+1],f=s[a*3+2],p=c[a*3],m=c[a*3+1],h=c[a*3+2];if(o){let e=nr([u-.5,d-.5,f-.5],t,n);u=e[0]+.5,d=e[1]+.5,f=e[2]+.5;let r=nr([p,m,h],t,n);p=r[0],m=r[1],h=r[2]}if(r){let e=cr([u-.5,d-.5,f-.5],r);u=e[0]+.5,d=e[1]+.5,f=e[2]+.5;let t=cr([p,m,h],r);p=t[0],m=t[1],h=t[2]}if(i){let e=[u,d,f];ur(e,i),u=e[0],d=e[1],f=e[2];let t=dr([p,m,h],i);p=t[0],m=t[1],h=t[2]}e.positions.push(u,d,f),e.normals.push(p,m,h),e.uvs.push(l[a*2],1-l[a*2+1])};for(let t=u.start;t+2<d;t+=3){let n=t*3,r=(t+1)*3,i=(t+2)*3,a=s[r]-s[n],o=s[r+1]-s[n+1],l=s[r+2]-s[n+2],u=s[i]-s[n],d=s[i+1]-s[n+1],p=s[i+2]-s[n+2],m=o*p-l*d,h=l*u-a*p,g=a*d-o*u;for(m*c[n]+h*c[n+1]+g*c[n+2]>=0?(f(t),f(t+1),f(t+2)):(f(t),f(t+2),f(t+1));e.faceColors.length*6<e.positions.length;)e.faceColors.push(1,1,1)}}}var gr=new WeakMap;function _r(e,t){let n=gr.get(e);n||(n=Array(64),gr.set(e,n));let r=n[t];if(!r){let i=new Set;for(let e=0;e<Re.length;e++)t&1<<e&&i.add(Re[e]);r=mr(e,i),n[t]=r}return r}var vr={minX:0,maxX:16,minZ:0,maxZ:16,bottomY:0},yr={water:`minecraft:block/water_still`,lava:`minecraft:block/lava_still`},br={water:`minecraft:block/water_flow`,lava:`minecraft:block/lava_flow`},xr=`minecraft:block/water_overlay`,Sr=(e,t)=>t===`still`?yr[e]:t===`overlay`&&e===`water`?xr:br[e],Cr=[`north`,`south`,`east`,`west`],wr=e=>yr[e],Tr=e=>{let t=Number(e??`0`);return Number.isFinite(t)?Math.max(0,Math.min(15,t|0)):0},Er=new Set([`bubble_column`]),Dr=new Set([`kelp`,`kelp_plant`,`seagrass`,`tall_seagrass`]);function Or(e,t){return e===`water`?{type:`water`,level:Tr(t.level),waterlogged:!1}:e===`lava`?{type:`lava`,level:Tr(t.level),waterlogged:!1}:Er.has(e)?{type:`water`,level:0,waterlogged:!1}:t.waterlogged===`true`||Dr.has(e)?{type:`water`,level:0,waterlogged:!0}:null}function kr(e){return e>=8?16:e===0?14.2:(8-e)/9*16}function Ar(e){let t={clipY:0,sprite:`still`};return{height:kr(e),topFlow:!1,flowAngle:0,sides:{north:{...t},south:{...t},east:{...t},west:{...t}},footprint:{...vr}}}function jr(e,t){let n=yr[e],r=br[e],i=e===`water`?{tintindex:0}:{},a=t.height,o=[{from:[0,0,0],to:[16,a,16],faces:{down:{texture:n,cullface:`down`,...i},up:t.topFlow?{texture:r,cullface:`up`,rotation:Br(t.flowAngle),...i}:{texture:n,cullface:`up`,...i}}}];for(let n of Cr){let r=t.sides[n];if(r.clipY>=a)continue;let s={texture:Sr(e,r.sprite),cullface:n,...i};o.push({from:[0,r.clipY,0],to:[16,a,16],faces:{[n]:s}})}return{parts:[{elements:o,x:0,y:0,uvlock:!1}],fullCube:!1,opaque:!1,renderLayer:e===`water`?`translucent`:`opaque`}}function Mr(e,t){let n=(n,r)=>Nr(e,t(n,0),t(0,r),t(n,r))*16;return{nw:n(-1,-1),ne:n(1,-1),se:n(1,1),sw:n(-1,1)}}function Nr(e,t,n,r){let i=t>0||n>0?[e,t,n,r]:[e,t,n],a=0,o=0;for(let e of i)if(!(e<0)){if(e>=1)return 1;e>=.8?(a+=e*10,o+=10):(a+=e,o+=1)}return o>0?a/o:e}var Pr=[[0,0],[1,0],[1,1],[0,1]],Fr=[[0,1],[1,1],[1,0],[0,0]],Ir={north:[0,0,-1],south:[0,0,1],west:[-1,0,0],east:[1,0,0]},Lr=.25,Rr=[[-1,-1],[1,-1],[1,1],[-1,1]];function zr(e){let t=Math.cos(e),n=Math.sin(e);return Rr.map(([e,r])=>{let i=e*Lr,a=r*Lr;return[.5+(i*t-a*n),.5+(i*n+a*t)]})}function Br(e){let t=e*180/Math.PI;return(Math.round(t/90)*90%360+360)%360}function Vr(e,t,n,r){let i=new Map,a=e===`water`,o=yr[e],s=br[e],c=e=>{let t={texture:e,tinted:a},n=Zn(t),r=i.get(n);return r||(r={descriptor:t,data:{positions:[],normals:[],uvs:[],faceColors:[]}},i.set(n,r)),r.data},l=(e,t,n,r)=>{let i=c(e);i.faceColors.push(1,1,1);for(let[e,a,o]of[[0,1,2],[0,2,3]])for(let s of[e,a,o])i.positions.push(t[s][0],t[s][1],t[s][2]),i.normals.push(n[0],n[1],n[2]),i.uvs.push(r[s][0],r[s][1])},u=t.nw/16,d=t.ne/16,f=t.se/16,p=t.sw/16,m=n.footprint.minX/16,h=n.footprint.maxX/16,g=n.footprint.minZ/16,_=n.footprint.maxZ/16,v=n.footprint.bottomY/16;if(!r.has(`up`)){let e=n.topFlow?s:o,t=n.topFlow?zr(n.flowAngle):Pr;l(e,[[m,p,_],[h,f,_],[h,d,g],[m,u,g]],[0,1,0],t)}r.has(`down`)||l(o,[[m,v,g],[h,v,g],[h,v,_],[m,v,_]],[0,-1,0],Fr);let y=(t,i)=>{if(r.has(t))return;let a=i.map(([e,n,r])=>[t===`north`?1-e:t===`south`?e:t===`west`?r:1-r,n]);l(Sr(e,n.sides[t].sprite),i,Ir[t],a)},b=(e,t)=>Math.max(e,t),x=Math.max(n.sides.north.clipY/16,v),S=Math.max(n.sides.south.clipY/16,v),C=Math.max(n.sides.west.clipY/16,v),w=Math.max(n.sides.east.clipY/16,v);return y(`north`,[[m,x,g],[m,b(x,u),g],[h,b(x,d),g],[h,x,g]]),y(`south`,[[h,S,_],[h,b(S,f),_],[m,b(S,p),_],[m,S,_]]),y(`west`,[[m,C,_],[m,b(C,p),_],[m,b(C,u),g],[m,C,g]]),y(`east`,[[h,w,g],[h,b(w,d),g],[h,b(w,f),_],[h,w,_]]),i}var Hr={plains:{label:`Plains`,temperature:.8,downfall:.4},sunflower_plains:{label:`Sunflower Plains`,temperature:.8,downfall:.4},forest:{label:`Forest`,temperature:.7,downfall:.8},flower_forest:{label:`Flower Forest`,temperature:.7,downfall:.8},birch_forest:{label:`Birch Forest`,temperature:.6,downfall:.6},old_growth_birch_forest:{label:`Old Growth Birch Forest`,temperature:.6,downfall:.6},meadow:{label:`Meadow`,temperature:.5,downfall:.8},mushroom_fields:{label:`Mushroom Fields`,temperature:.9,downfall:1},dark_forest:{label:`Dark Forest`,temperature:.7,downfall:.8},pale_garden:{label:`Pale Garden`,temperature:.7,downfall:.8,grassOverride:7832178,foliageOverride:8883574,dryFoliageOverride:10528412},taiga:{label:`Taiga`,temperature:.25,downfall:.8},old_growth_pine_taiga:{label:`Old Growth Pine Taiga`,temperature:.3,downfall:.8},old_growth_spruce_taiga:{label:`Old Growth Spruce Taiga`,temperature:.25,downfall:.8},snowy_taiga:{label:`Snowy Taiga`,temperature:-.5,downfall:.4},snowy_plains:{label:`Snowy Plains`,temperature:0,downfall:.5},ice_spikes:{label:`Ice Spikes`,temperature:0,downfall:.5},grove:{label:`Grove`,temperature:-.2,downfall:.8},snowy_slopes:{label:`Snowy Slopes`,temperature:-.3,downfall:.9},frozen_peaks:{label:`Frozen Peaks`,temperature:-.7,downfall:.9},jagged_peaks:{label:`Jagged Peaks`,temperature:-.7,downfall:.9},jungle:{label:`Jungle`,temperature:.95,downfall:.9},sparse_jungle:{label:`Sparse Jungle`,temperature:.95,downfall:.8},bamboo_jungle:{label:`Bamboo Jungle`,temperature:.95,downfall:.9},desert:{label:`Desert`,temperature:2,downfall:0},savanna:{label:`Savanna`,temperature:2,downfall:0},savanna_plateau:{label:`Savanna Plateau`,temperature:2,downfall:0},windswept_savanna:{label:`Windswept Savanna`,temperature:2,downfall:0},swamp:{label:`Swamp`,temperature:.8,downfall:.9,grassOverride:6975545,foliageOverride:6975545,dryFoliageOverride:8082228},mangrove_swamp:{label:`Mangrove Swamp`,temperature:.8,downfall:.9,grassOverride:6975545,foliageOverride:9285927,dryFoliageOverride:8082228},cherry_grove:{label:`Cherry Grove`,temperature:.5,downfall:.8,grassOverride:11983713,foliageOverride:11983713},badlands:{label:`Badlands`,temperature:2,downfall:0,grassOverride:9470285,foliageOverride:10387789,dryFoliageOverride:10387789},eroded_badlands:{label:`Eroded Badlands`,temperature:2,downfall:0,grassOverride:9470285,foliageOverride:10387789,dryFoliageOverride:10387789},wooded_badlands:{label:`Wooded Badlands`,temperature:2,downfall:0,grassOverride:9470285,foliageOverride:10387789,dryFoliageOverride:10387789},windswept_hills:{label:`Windswept Hills`,temperature:.2,downfall:.3},windswept_gravelly_hills:{label:`Windswept Gravelly Hills`,temperature:.2,downfall:.3},windswept_forest:{label:`Windswept Forest`,temperature:.2,downfall:.3},stony_peaks:{label:`Stony Peaks`,temperature:1,downfall:.3},stony_shore:{label:`Stony Shore`,temperature:.2,downfall:.3},river:{label:`River`,temperature:.5,downfall:.5},frozen_river:{label:`Frozen River`,temperature:0,downfall:.5},beach:{label:`Beach`,temperature:.8,downfall:.4},snowy_beach:{label:`Snowy Beach`,temperature:.05,downfall:.3},warm_ocean:{label:`Warm Ocean`,temperature:.5,downfall:.5},lukewarm_ocean:{label:`Lukewarm Ocean`,temperature:.5,downfall:.5},deep_lukewarm_ocean:{label:`Deep Lukewarm Ocean`,temperature:.5,downfall:.5},ocean:{label:`Ocean`,temperature:.5,downfall:.5},deep_ocean:{label:`Deep Ocean`,temperature:.5,downfall:.5},cold_ocean:{label:`Cold Ocean`,temperature:.5,downfall:.5},deep_cold_ocean:{label:`Deep Cold Ocean`,temperature:.5,downfall:.5},frozen_ocean:{label:`Frozen Ocean`,temperature:0,downfall:.5},deep_frozen_ocean:{label:`Deep Frozen Ocean`,temperature:.5,downfall:.5},dripstone_caves:{label:`Dripstone Caves`,temperature:.8,downfall:.4},lush_caves:{label:`Lush Caves`,temperature:.5,downfall:.5},deep_dark:{label:`Deep Dark`,temperature:.8,downfall:.4},nether_wastes:{label:`Nether Wastes`,temperature:2,downfall:0},warped_forest:{label:`Warped Forest`,temperature:2,downfall:0},crimson_forest:{label:`Crimson Forest`,temperature:2,downfall:0},soul_sand_valley:{label:`Soul Sand Valley`,temperature:2,downfall:0},basalt_deltas:{label:`Basalt Deltas`,temperature:2,downfall:0},the_end:{label:`The End`,temperature:.5,downfall:.5},end_highlands:{label:`End Highlands`,temperature:.5,downfall:.5},end_midlands:{label:`End Midlands`,temperature:.5,downfall:.5},small_end_islands:{label:`Small End Islands`,temperature:.5,downfall:.5},end_barrens:{label:`End Barrens`,temperature:.5,downfall:.5}};function Ur(e){return e.map(e=>({id:e,label:Hr[e].label}))}var Wr=[{id:`temperate`,label:`Temperate`,biomes:Ur([`plains`,`sunflower_plains`,`forest`,`flower_forest`,`birch_forest`,`old_growth_birch_forest`,`meadow`,`mushroom_fields`])},{id:`dark_pale`,label:`Dark / Pale`,biomes:Ur([`dark_forest`,`pale_garden`])},{id:`cold`,label:`Cold`,biomes:Ur([`taiga`,`old_growth_pine_taiga`,`old_growth_spruce_taiga`,`snowy_taiga`,`snowy_plains`,`ice_spikes`,`grove`,`snowy_slopes`,`frozen_peaks`,`jagged_peaks`])},{id:`tropical`,label:`Tropical`,biomes:Ur([`jungle`,`sparse_jungle`,`bamboo_jungle`])},{id:`hot_dry`,label:`Hot / Dry`,biomes:Ur([`desert`,`savanna`,`savanna_plateau`,`windswept_savanna`])},{id:`swamp`,label:`Swamp`,biomes:Ur([`swamp`,`mangrove_swamp`])},{id:`special`,label:`Special`,biomes:Ur([`cherry_grove`,`badlands`,`eroded_badlands`,`wooded_badlands`])},{id:`mountains`,label:`Mountains`,biomes:Ur([`windswept_hills`,`windswept_gravelly_hills`,`windswept_forest`,`stony_peaks`,`stony_shore`])},{id:`water`,label:`Water`,biomes:Ur([`river`,`frozen_river`,`beach`,`snowy_beach`,`warm_ocean`,`lukewarm_ocean`,`deep_lukewarm_ocean`,`ocean`,`deep_ocean`,`cold_ocean`,`deep_cold_ocean`,`frozen_ocean`,`deep_frozen_ocean`])},{id:`underground`,label:`Underground`,biomes:Ur([`dripstone_caves`,`lush_caves`,`deep_dark`])},{id:`nether`,label:`Nether`,biomes:Ur([`nether_wastes`,`warped_forest`,`crimson_forest`,`soul_sand_valley`,`basalt_deltas`])},{id:`end`,label:`End`,biomes:Ur([`the_end`,`end_highlands`,`end_midlands`,`small_end_islands`,`end_barrens`])}],Gr=e=>[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255],Kr={grass:Gr(8174955),foliage:Gr(8174955),dryFoliage:Gr(10528412)};function qr(e,t,n){if(!e)return 8371563;let r=Math.max(0,Math.min(1,t)),i=Math.max(0,Math.min(1,n))*r,a=Math.min(e.width-1,Math.floor((1-r)*255)),o=(Math.min(e.height-1,Math.floor((1-i)*255))*e.width+a)*3;return e.data[o]<<16|e.data[o+1]<<8|e.data[o+2]}function Jr(e,t){let n=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,o=t>>8&255,s=t&255;return n+a>>1<<16|r+o>>1<<8|i+s>>1}function Yr(e,t){let n=Hr[e],r;if(n.grassOverride!==void 0)r=n.grassOverride;else{let i=qr(t.grass,n.temperature,n.downfall);r=e===`dark_forest`?Jr(i&16711422,2634762):i}let i=n.foliageOverride??qr(t.foliage,n.temperature,n.downfall),a=n.dryFoliageOverride??qr(t.dryFoliage,n.temperature,n.downfall);return{grass:Gr(r),foliage:Gr(i),dryFoliage:Gr(a)}}var Xr=e=>[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255],Zr=[1,1,1],Qr=Xr(4159204),$r=Xr(57344),ei={spruce_leaves:Xr(6396257),birch_leaves:Xr(8431445),lily_pad:Xr(2129968)},ti=new Set([`grass_block`,`short_grass`,`tall_grass`,`fern`,`large_fern`,`sugar_cane`,`bush`,`pink_petals`,`wildflowers`,`potted_fern`,`bamboo_sapling`]),ni=new Set([`oak_leaves`,`jungle_leaves`,`acacia_leaves`,`dark_oak_leaves`,`mangrove_leaves`,`pale_oak_leaves`,`vine`,`bamboo_large_leaves`,`bamboo_small_leaves`]),ri=new Set([`melon_stem`,`pumpkin_stem`,`attached_melon_stem`,`attached_pumpkin_stem`]),ii=e=>Math.max(0,Math.min(1,e)),ai=Array.from({length:16},(e,t)=>{let n=t/15;return[n*.6+(t>0?.4:.3),ii(n*n*.7-.5),ii(n*n*.6-.7)]});function oi(e,t,n=Kr){let r=ei[e];if(r)return r;if(e===`redstone_wire`){let e=Number(t.power??`0`);return ai[Number.isFinite(e)?Math.max(0,Math.min(15,e|0)):0]}return e===`water`||t.waterlogged===`true`?Qr:ti.has(e)?n.grass:ni.has(e)?n.foliage:e===`leaf_litter`?n.dryFoliage:ri.has(e)?$r:Zr}var si=2147483647,ci=class{constructor(){this.data=new Float32Array(1024),this.length=0}reserve(e){if(this.length+e<=this.data.length)return;let t=this.data.length*2;for(;t<this.length+e;)t*=2;let n=new Float32Array(t);n.set(this.data.subarray(0,this.length)),this.data=n}push1(e){this.reserve(1),this.data[this.length++]=e}push2(e,t){this.reserve(2),this.data[this.length++]=e,this.data[this.length++]=t}push3(e,t,n){this.reserve(3),this.data[this.length++]=e,this.data[this.length++]=t,this.data[this.length++]=n}finish(){return this.data.slice(0,this.length)}},li=.3,ui=[[`down`,0,-1,0],[`up`,0,1,0],[`north`,0,0,-1],[`south`,0,0,1],[`west`,-1,0,0],[`east`,1,0,0]],di=[1,.7,.5,.2],fi=[[1,-1,0,2],[1,1,0,2],[2,-1,0,1],[2,1,0,1],[0,-1,2,1],[0,1,2,1]];function pi(e,t,n){let r=Math.abs(e),i=Math.abs(t),a=Math.abs(n);return i>=r&&i>=a?+(t>0):a>=r?n>0?3:2:e>0?5:4}function mi(e,t,n,r,i,a,o,s){let[c,l,u,d]=fi[r],f=[e,t,n],p=[i+.5,a+.5,o+.5],m=f[u]>=p[u]?1:-1,h=f[d]>=p[d]?1:-1,g=[0,0,0];g[c]=l,g[u]=m,g[d]=0;let _=+!!s(i+g[0],a+g[1],o+g[2]);g[u]=0,g[d]=h;let v=+!!s(i+g[0],a+g[1],o+g[2]);g[u]=m;let y=+!!s(i+g[0],a+g[1],o+g[2]);return di[_&&v?3:_+v+y]}var hi=[0,1,2,3,4,5],gi=[1,2,5,1,5,0],_i=new Float64Array(6);function vi(e,t,n,r,i,a,o,s,c){let l=e.positions,u=e.normals,d=e.uvs,f=e.faceColors,p=Array(18);for(let e=0;e*18<l.length;e++){let m=e*18,h=e*12,g=e*3;for(let e=0;e<6;e++)p[e*3]=l[m+e*3]+n,p[e*3+1]=l[m+e*3+1]+r,p[e*3+2]=l[m+e*3+2]+i;let _=pi(u[m],u[m+1],u[m+2]),v=mi(p[0],p[1],p[2],_,n,r,i,a),y=mi(p[3],p[4],p[5],_,n,r,i,a),b=mi(p[6],p[7],p[8],_,n,r,i,a),x=mi(p[15],p[16],p[17],_,n,r,i,a),S=v+b<y+x,C=S?gi:hi,w=_i;S?(w[0]=y,w[1]=b,w[2]=x,w[3]=y,w[4]=x,w[5]=v):(w[0]=v,w[1]=y,w[2]=b,w[3]=v,w[4]=b,w[5]=x);for(let e=0;e<6;e++){let n=C[e];t.positions.push3(p[n*3],p[n*3+1],p[n*3+2]),t.normals.push3(u[m+n*3],u[m+n*3+1],u[m+n*3+2]),t.uvs.push2(d[h+n*2],d[h+n*2+1]);let r=w[e]*s,i=o?r*o[0]:r,a=o?r*o[1]:r,l=o?r*o[2]:r;t.colors.push3(i*f[g],a*f[g+1],l*f[g+2]),t.steps?.push1(c)}}}function yi(e){let t=new Map,n=(e,n)=>{let r=t.get(e);return r||(r={descriptor:n,data:{positions:new ci,normals:new ci,uvs:new ci,colors:new ci,steps:d?new ci:null}},t.set(e,r)),r.data},{min:r,max:i,modelAt:a,tintAt:o,cullGroupAt:s,fluidAt:c,fluidOverlayAt:l,dimAt:u,stepAt:d}=e,f=e.clipY??1/0,p=e.clipMin??-1/0,m=e.clipAxis??1,h=(e,t,n)=>m===0?e:m===1?t:n,g=(e,t,n)=>{let r=h(e,t,n);return r>=p&&r<f},_=(t,n,r)=>g(t,n,r)&&e.isOpaque(t,n,r),v=(e,t,n)=>g(e,t,n)&&(a(e,t,n)?.fullCube??!1),y=(e,t,n)=>g(e,t,n)&&(l?.(e,t,n)??!1),b=m===1?f:1/0,x=m===1?p:-1/0,S=m===0?Math.max(r.x,p):r.x,C=m===1?Math.max(r.y,p):r.y,w=m===2?Math.max(r.z,p):r.z,T=m===0?Math.min(i.x,f-1):i.x,E=m===1?Math.min(i.y,f-1):i.y,D=m===2?Math.min(i.z,f-1):i.z,O=S-1,k=C-1,A=w-1,j=T-S+3,M=E-C+3,N=D-w+3,ee=j*M*N,te=j>0&&M>0&&N>0&&ee<=1<<20?new Uint8Array(ee):null;if(te){let e=0;for(let t=0;t<j;t++)for(let n=0;n<M;n++)for(let r=0;r<N;r++)_(O+t,k+n,A+r)&&(te[e]=1),e++}let ne=te?(e,t,n)=>{let r=e-O,i=t-k,a=n-A;return r<0||i<0||a<0||r>=j||i>=M||a>=N?_(e,t,n):te[(r*M+i)*N+a]===1}:_;for(let e=S;e<=T;e++)for(let t=C;t<=E;t++)for(let r=w;r<=D;r++){let i=a(e,t,r);if(!i)continue;let l=s?.(e,t,r)??null,f=d?d(e,t,r):si,p=0;for(let n=0;n<ui.length;n++){let[,i,a,o]=ui[n];(ne(e+i,t+a,r+o)||l&&g(e+i,t+a,r+o)&&s?.(e+i,t+a,r+o)===l)&&(p|=1<<n)}let m=o?.(e,t,r)??null,h=u?.(e,t,r)?li:1,_=_r(i,p);for(let[i,{descriptor:a,data:o}]of _.buckets)vi(o,n(i,a),e,t,r,ne,a.tinted?m:null,h,f);let S=c?.(e,t,r);if(S){let{spec:i,corners:o,culled:s}=xi(e,t,r,S,b,x,ne,v,y,a,c),l=Vr(S.type,o,i,s),u=S.type===`water`?Qr:null;for(let[i,{descriptor:a,data:o}]of l)vi(o,n(i,a),e,t,r,ne,a.tinted?u:null,h,f)}}let re=new Map;for(let[e,{descriptor:n,data:r}]of t)re.set(e,{descriptor:n,data:{positions:r.positions.finish(),normals:r.normals.finish(),uvs:r.uvs.finish(),colors:r.colors.finish(),...r.steps?{steps:r.steps.finish()}:{}}});return{buckets:re}}var bi={north:[0,-1],south:[0,1],west:[-1,0],east:[1,0]};function xi(e,t,n,r,i,a,o,s,c,l,u){let d=r.type,f=(e,t,n)=>t>=a&&t<i&&u(e,t,n)?.type===d,p=(e,t,n,r)=>f(e,t+1,n)?16:kr(r.level),m=p(e,t,n,r),h=Mr(m/16,(r,o)=>{if(s(e+r,t,n+o))return-1;let c=t>=a&&t<i?u(e+r,t,n+o):null;return!c||c.type!==d?0:p(e+r,t,n+o,c)/16}),g=r.level>=8,_=g?0:r.level,v=g||r.level>=1&&r.level<=7,y=new Set,b=h.nw>=16&&h.ne>=16&&h.se>=16&&h.sw>=16;(f(e,t+1,n)||o(e,t+1,n)&&b)&&y.add(`up`),(f(e,t-1,n)||o(e,t-1,n))&&y.add(`down`);let x=0,S=0,C=v,w={north:0,south:0,east:0,west:0};for(let r of Cr){let[s,c]=bi[r];o(e+s,t,n+c)&&y.add(r);let f=t>=a&&t<i?u(e+s,t,n+c):null;if(f&&f.type===d){let i=p(e+s,t,n+c,f);if(i>=m?y.add(r):i>0&&(w[r]=i,C=!0),v||i<m&&i>0){let e=f.level>=8?0:f.level;x+=s*(e-_),S+=c*(e-_)}}else v&&l(e+s,t,n+c)===null&&(x+=s,S+=c)}let T=x!==0||S!==0,E=C&&T?-Math.atan2(x,S):0,D=C&&!g&&(r.level>0&&r.level<8||T),O={};for(let i of Cr){let[a,o]=bi[i],s=d===`water`&&c(e+a,t,n+o)?`overlay`:r.level>0||w[i]>0?`flow`:`still`;O[i]={clipY:w[i],sprite:s}}let k=r.waterlogged?.1:.05;return{spec:{height:m,topFlow:D,flowAngle:E,sides:O,footprint:{minX:f(e-1,t,n)?0:k,maxX:f(e+1,t,n)?16:16-k,minZ:f(e,t,n-1)?0:k,maxZ:f(e,t,n+1)?16:16-k,bottomY:f(e,t-1,n)?0:k}},corners:h,culled:y}}var Si=new Set([`glass`,`tinted_glass`,`ice`,`packed_ice`,`blue_ice`,`frosted_ice`,`slime_block`,`honey_block`]);function Ci(e){return e===`water`||e===`lava`||Si.has(e)||e.endsWith(`_stained_glass`)?e:null}function wi(e){return Si.has(e)||e.endsWith(`_stained_glass`)||e.endsWith(`_leaves`)}var Ti=(e,t,n,r)=>(e*r+t)*r+n;function Ei(e,t,n,r,i=0,a={}){let{clipY:o,clipMin:s,clipAxis:c=1,hidden:l,highlight:u,stepOf:d}=a,f={x:t*16-1,y:n*16-1,z:r*16-1},p=[null],m=new Map,h=new Uint16Array(324*18),g=d?new Int32Array(324*18).fill(si):void 0,_,v;for(let t=0;t<18;t++)for(let n=0;n<18;n++)for(let r=0;r<18;r++){let i=f.x+t,a=f.y+n,o=f.z+r,s=e.getBlock(i,a,o);if(!s||(g&&(g[Ti(t,n,r,18)]=d?d(i,a,o):si),l?.has(`${s.namespace}:${s.name}`)))continue;let c=m.get(s.stateKey);c===void 0&&(c=p.length,p.push({namespace:s.namespace,name:s.name,properties:{...s.properties},stateKey:s.stateKey}),m.set(s.stateKey,c));let u=Ti(t,n,r,18);if(h[u]=c,wt(s.namespace,s.name)){let i=e.getRawBlockEntity(f.x+t,f.y+n,f.z+r);i!==void 0&&((_??={})[u]=i);let a=e.getBlockEntity(f.x+t,f.y+n,f.z+r);a!==void 0&&((v??={})[u]=a)}}return{cx:t,cy:n,cz:r,revision:i,base:f,dim:18,palette:p,indices:h,blockEntities:_,normalizedBlockEntities:v,clipY:o,clipMin:s,clipAxis:c,dimPalette:u?Uint8Array.from(p,e=>e&&`${e.namespace}:${e.name}`===u?0:1):void 0,steps:g}}var Di={down:[0,-1,0],up:[0,1,0],north:[0,0,-1],south:[0,0,1],west:[-1,0,0],east:[1,0,0]};function Oi(e,t,n=Kr,r){let{base:i,dim:a,indices:s,blockEntities:c,normalizedBlockEntities:l}=e,u=e.palette.map(e=>{let t=e?o(e.namespace,e.name):void 0;return t&&e?{...e,name:t}:e}),d=u.map(e=>e?t(e):null),f=u.map(e=>e?oi(e.name,e.properties,n):null),p=u.map(e=>e?Ci(e.name):null),m=u.map(e=>e?Or(e.name,e.properties):null),h=u.map(e=>e?wi(e.name):!1),g=u.map(e=>e?wt(e.namespace,e.name):!1),_=r!==void 0&&g.some(Boolean),v=(e,t,n)=>{let r=e-i.x,o=t-i.y,s=n-i.z;return r<0||o<0||s<0||r>=a||o>=a||s>=a?-1:Ti(r,o,s,a)},y=(e,t,n)=>{let r=v(e,t,n);return r<0?0:s[r]},b=new Map,x=(e,t,n)=>{let r=v(e,t,n);if(r<0)return null;let i=u[s[r]];return i?{namespace:i.namespace,name:i.name,properties:i.properties}:null},S=(e,t,n,i,a)=>{let o=b.get(i);if(o===void 0){let s={getNeighbor:(r,i=1)=>{let[a,o,s]=Di[r];return x(e+a*i,t+o*i,n+s*i)},blockEntity:c?.[i]??null,normalizedBlockEntity:l?.[i]??null};o=r(u[a],s),b.set(i,o)}return o},C=(e,t,n)=>{let r=v(e,t,n);if(r<0)return null;let i=s[r];return d[i]?_&&g[i]?S(e,t,n,r,i):d[i]:null},w={x:i.x+1,y:i.y+1,z:i.z+1};return yi({min:w,max:{x:w.x+16-1,y:w.y+16-1,z:w.z+16-1},isOpaque:(e,t,n)=>d[y(e,t,n)]?.opaque??!1,modelAt:C,tintAt:(e,t,n)=>f[y(e,t,n)]??null,cullGroupAt:(e,t,n)=>p[y(e,t,n)]??null,fluidAt:(e,t,n)=>m[y(e,t,n)]??null,fluidOverlayAt:(e,t,n)=>h[y(e,t,n)]??!1,dimAt:e.dimPalette?(t,n,r)=>e.dimPalette[y(t,n,r)]===1:void 0,stepAt:e.steps?(t,n,r)=>{let i=v(t,n,r);return i<0?si:e.steps[i]??2147483647}:void 0,clipY:e.clipY,clipMin:e.clipMin,clipAxis:e.clipAxis})}var ki=class{constructor(e,t,n){this.revisions=new Map,this.dirty=new Set,this.remeshAllPending=!1,this.flushScheduled=!1,this.disposed=!1,this.inFlight=0,this.idleWaiters=[],this.flush=()=>{if(this.flushScheduled&&(this.flushScheduled=!1,!this.disposed)){if(this.remeshAllPending){this.remeshAllPending=!1,this.dirty.clear();for(let e of this.world.chunkKeys())this.bump(e),this.request(e);return}for(let e of this.dirty)this.request(e);this.dirty.clear()}},this.world=e,this.mesher=t,this.onChunkMeshed=n.onChunkMeshed,this.schedule=n.schedule,this.version=n.version,this.namespaces=n.namespaces,this.packs=n.packs,this.biome=n.biome,this.clipY=n.clipY,this.clipAxis=n.clipAxis,this.stepOf=n.stepOf}markDirty(e){for(let t of Ai(e))this.dirty.add(t),this.bump(t);this.scheduleFlush()}bump(e){this.revisions.set(e,(this.revisions.get(e)??0)+1)}remeshAll(){this.remeshAllPending=!0,this.scheduleFlush()}setClip(e,t=1){this.clipY=e??void 0,this.clipAxis=t,this.remeshAll()}setPacks(e){this.packs=e,this.remeshAll()}setBiome(e){e!==this.biome&&(this.biome=e,this.remeshAll())}dispose(){this.disposed=!0,this.dirty.clear(),this.settleWaiters()}whenIdle(){return this.disposed||(this.flushScheduled&&this.flush(),this.inFlight===0)?Promise.resolve():new Promise(e=>this.idleWaiters.push(e))}settleWaiters(){let e=this.idleWaiters;this.idleWaiters=[];for(let t of e)t()}scheduleFlush(){this.flushScheduled||this.disposed||(this.flushScheduled=!0,this.schedule(this.flush))}request(e){let{x:t,y:n,z:r}=f(e),i=this.revisions.get(e)??0,a=Ei(this.world,t,n,r,i,{clipY:this.clipY,clipAxis:this.clipAxis,stepOf:this.stepOf});this.inFlight++,this.mesher.mesh({snapshot:a,version:this.version,biome:this.biome,namespaces:this.namespaces,packs:this.packs}).then(e=>{this.disposed||this.revisions.get(u(e.cx,e.cy,e.cz))===e.revision&&this.onChunkMeshed(e)}).catch(()=>{}).finally(()=>{this.inFlight--,this.inFlight===0&&!this.flushScheduled?this.settleWaiters():this.inFlight===0&&this.flushScheduled&&this.flush()})}};function Ai(e){let t=new Set;for(let{pos:n}of e)for(let e=Math.ceil((n.x-16)/16);e<=Math.floor((n.x+1)/16);e++)for(let r=Math.ceil((n.y-16)/16);r<=Math.floor((n.y+1)/16);r++)for(let i=Math.ceil((n.z-16)/16);i<=Math.floor((n.z+1)/16);i++)t.add(u(e,r,i));return[...t]}async function ji(e,t,n,r,i){let{version:a,namespaces:o,packs:s,biome:c,...l}=r,u=[];for(let r of n){let{x:n,y:d,z:p}=f(r),m=Ei(e,n,d,p,0,l);u.push(t.mesh({snapshot:m,version:a,biome:c,namespaces:o,packs:s}).then(i))}await Promise.all(u)}function Mi(e,t,n,r){return ji(e,t,e.chunkKeys(),n,r)}var Ni=`/editor`;function Pi(e){Ni=e.replace(/\/+$/,``)}function Fi(){return Ni}var Ii=null;function Li(e){Ii=e}function Ri(){return Ii}function zi(e,t){let n=Ii?.files[t];return n?`${Ni}/${t.replace(/\.msgpack$/,``)}.${n}.msgpack`:`${Ni}/${e}/${t}`}async function Bi(e){let t=await fetch(zi(e,`minecraft.msgpack`)).then(e=>e.arrayBuffer());return r(new Uint8Array(t))}var Vi=[`blockModels`,`blockStates`,`textureMetas`,`textures`];function Hi(e,t){for(let n of Vi)Object.assign(e[n],t[n]);t.objModels&&(e.objModels=Object.assign(e.objModels??{},t.objModels))}async function Ui(e,t){let n=await fetch(zi(e,`${t}.msgpack`));return n.ok?r(new Uint8Array(await n.arrayBuffer())):null}function Wi(e){return`pack.${e}.msgpack`}async function Gi(e,t){let n=await fetch(zi(e,Wi(t)));return n.ok?r(new Uint8Array(await n.arrayBuffer())):null}async function Ki(e,t,n=[]){let r=await Bi(e),i=[...new Set(t)].filter(e=>e&&e!==`minecraft`);if(i.length>0){let t=await Promise.all(i.map(t=>Ui(e,t)));for(let e of t)e&&Hi(r,e)}return n.length>0&&(await Promise.all(n.map(t=>Gi(e,t.id)))).forEach((e,t)=>{e&&Yn(r,e,n[t].options)}),r}function qi(e){let t=new Set;for(let n of e.blocks.values())n.namespace&&n.namespace!==`minecraft`&&t.add(n.namespace);return[...t]}async function Ji(e){let t=await fetch(zi(e,`minecraft.registry.msgpack`)).then(e=>e.arrayBuffer());return r(new Uint8Array(t))}var Yi=new Set([`minecraft:water`,`minecraft:lava`]);function Xi(e){let t=[];for(let[n,r]of Object.entries(e.blocks))r.replaceable&&!Yi.has(n)||t.push({id:n,name:n.replace(/^minecraft:/,``),displayName:r.displayName,category:r.category,defaultState:r.defaultState??{}});return t.sort((e,t)=>e.displayName.localeCompare(t.displayName)),t}var Zi=`26.3`,Qi=Zi,$i={x:0,y:0,z:0};function ea(e){return _({id:e.id,name:e.name,namespace:e.namespace,properties:i(e.properties),stateKey:e.stateKey})}function ta(e,t,n=$i){for(let r of e.blocks.values()){let e=ea(r),i=r.pos.x+n.x,a=r.pos.y+n.y,o=r.pos.z+n.z;t.setBlock(i,a,o,e),r.blockEntity&&t.setBlockEntity(i,a,o,r.blockEntity),r.debug?.rawBlockEntity!==void 0&&t.setRawBlockEntity(i,a,o,r.debug.rawBlockEntity)}}function na(e){let t=new j;return ta(e,t),t}var ra={north:`east`,east:`south`,south:`west`,west:`north`};function ia(e){let t={};for(let[n,r]of Object.entries(e))if(n===`facing`)t.facing=ra[r]??r;else if(n===`axis`)t.axis=r===`x`?`z`:r===`z`?`x`:r;else if(n===`rotation`){let e=Number(r);t.rotation=Number.isFinite(e)?String((((e|0)+4)%16+16)%16):r}else n===`north`||n===`south`||n===`east`||n===`west`?t[ra[n]]=r:t[n]=r;return t}function aa(e){let t=new j,n=e.computeBounds();if(!n)return t;let r=n.max.z-n.min.z+1;return e.forEachBlock((i,a,o,s)=>{let c=i-n.min.x,l=a-n.min.y,u=o-n.min.z,d=r-1-u,f=c,p=_({id:s.id,properties:ia(s.properties)});t.setBlock(d,l,f,p);let m=e.getBlockEntity(i,a,o);m&&t.setBlockEntity(d,l,f,m)}),t}function oa(e,t=`schem`){let n=new Map;return e.forEachBlock((t,r,i,o)=>{let s=e.getBlockEntity(t,r,i);n.set(a(t,r,i),{namespace:o.namespace,name:o.name,id:o.id,pos:{x:t,y:r,z:i},properties:{...o.properties},stateKey:o.stateKey,...s?{blockEntity:s}:{}})}),{mcVersion:Qi,sourceFormat:t,blocks:n,bounds:e.computeBounds()??{min:{x:0,y:0,z:0},max:{x:0,y:0,z:0}}}}function sa(e,t,n=`schem`){let r=new Map;return e.forEachInRegion(t,(n,i,o,s)=>{let c=n-t.min.x,l=i-t.min.y,u=o-t.min.z,d=e.getBlockEntity(n,i,o);r.set(a(c,l,u),{namespace:s.namespace,name:s.name,id:s.id,pos:{x:c,y:l,z:u},properties:{...s.properties},stateKey:s.stateKey,...d?{blockEntity:d}:{}})}),{mcVersion:Qi,sourceFormat:n,blocks:r,bounds:{min:{x:0,y:0,z:0},max:{x:t.max.x-t.min.x,y:t.max.y-t.min.y,z:t.max.z-t.min.z}}}}function ca(e,t,n){let r=n*Math.PI/180,i=Math.cos(r),a=Math.sin(r),[o,s,c]=e;return t===`x`?[o,s*i-c*a,s*a+c*i]:t===`y`?[o*i+c*a,s,-o*a+c*i]:[o*i-s*a,o*a+s*i,c]}var la=1e-6,ua=(e,t)=>Math.abs(e[0]-t[0])<la&&Math.abs(e[1]-t[1])<la&&Math.abs(e[2]-t[2])<la,da=[0,90,180,270],fa=[[1,0,0],[0,1,0],[0,0,1]];function pa(e){let t=fa.map(e);for(let e of da)for(let n of da)for(let r of da)if(fa.every((i,a)=>ua(sr(i,e,n,r),t[a])))return{model:``,...e?{x:e}:{},...n?{y:n}:{},...r?{z:r}:{}};return{model:``}}function ma(e){return{south:0,west:90,north:180,east:270,up:0,down:0}[e]}function ha(e){return e===`up`?90:e===`down`?270:0}function ga(e){let t=ma(e),n=ha(e);return e=>ca(ca(e,`x`,n),`y`,t)}function _a(e,t){return{...pa(ga(t)),model:e}}var va={up:{x:0,y:0},down:{x:180,y:0},north:{x:90,y:0},south:{x:90,y:180},east:{x:90,y:90},west:{x:90,y:270}};function ya(e,t){let{x:n,y:r}=va[t];return{...pa(e=>ca(ca(e,`x`,-n),`y`,-r)),model:e}}function ba(e){let{x:t,y:n}=va[e];return{...pa(e=>ca(ca(e,`x`,-t),`y`,-n)),model:`create:block/water_wheel/wheel`}}function xa(e,t){return t===`sideways`?e=>e:e===`east`||e===`west`?e=>ca(e,`x`,90):e=>ca(e,`z`,90)}function Sa(e,t){let n=t===`upward`,r=t===`downward`,i=n||r,a=t===`sideways`,o=t===`vertical`,s=e===`east`||e===`west`,c=e===`north`||e===`south`,l=(!i&&t!==`horizontal`?90:0)+(r?180:0)+(a?90:0)+(o&&c?180:0),u=ma(e)+(i!==s&&!r?180:0)+(a&&c?180:0)+(o&&s?90:0),d=(a?90:0)+(o&&s?90:0);return e=>ca(ca(ca(e,`z`,d),`y`,u),`x`,l)}var Ca={x:[`up`,`down`,`north`,`south`],y:[`north`,`south`,`east`,`west`],z:[`up`,`down`,`east`,`west`]},wa={x:[`east`,`west`],y:[`up`,`down`],z:[`north`,`south`]},Ta={east:`x`,west:`x`,up:`y`,down:`y`,north:`z`,south:`z`},Ea=new Set([`gearshift`,`clutch`,`andesite_encased_shaft`,`brass_encased_shaft`,`metal_girder_encased_shaft`,`encased_chain_drive`]);function Da(e){return{...pa(ga(e)),model:`create:block/shaft_half`}}var Oa={andesite_encased_cogwheel:`create:block/cogwheel_shaftless`,brass_encased_cogwheel:`create:block/cogwheel_shaftless`,andesite_encased_large_cogwheel:`create:block/large_cogwheel_shaftless`,brass_encased_large_cogwheel:`create:block/large_cogwheel_shaftless`};function ka(e,t){return{...pa(t===`x`?e=>ca(e,`z`,90):t===`z`?e=>ca(e,`x`,90):e=>e),model:e}}function Aa(e,t){let n=t.axis??`y`,[r,i]=wa[n],a=[ka(Oa[e],n)];return t.top_shaft===`true`&&a.push(Da(r)),t.bottom_shaft===`true`&&a.push(Da(i)),a}function ja(e){let t=e.facing??`north`;return[_a(`simulated:block/directional_gearshift/barrel`,t),{...pa(ga(t)),model:`simulated:block/directional_gearshift/barrel_shaft`},{...pa(ga(Va[t])),model:`simulated:block/directional_gearshift/barrel_shaft`}]}var Ma=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];function Na(e,t){let n=Array(16).fill(0);for(let r=0;r<4;r++)for(let i=0;i<4;i++)for(let a=0;a<4;a++)n[r*4+i]+=e[r*4+a]*t[a*4+i];return n}function Pa(...e){return e.reduce((e,t)=>Na(t,e),Ma)}function Fa(...e){return e.reduce((e,t)=>Na(e,t),Ma)}var Ia=(e,t,n)=>[1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1],La=e=>{let t=e*Math.PI/180,n=Math.cos(t),r=Math.sin(t);return[1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1]},Ra=e=>{let t=e*Math.PI/180,n=Math.cos(t),r=Math.sin(t);return[n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1]},za=e=>{let t=e*Math.PI/180,n=Math.cos(t),r=Math.sin(t);return[n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1]},Ba=(...e)=>Pa(Ia(-.5,-.5,-.5),...e,Ia(.5,.5,.5)),Va={up:`down`,down:`up`,north:`south`,south:`north`,east:`west`,west:`east`},Ha={up:Ma,down:La(180),north:Na(La(90),za(180)),south:La(90),west:Na(La(90),za(90)),east:Na(La(90),za(270))},Ua=e=>{if(e===`up`||e===`down`)return 0;let t=Qa[e];return e===`east`||e===`west`?-t:t},Wa=e=>e===`up`?-90:e===`down`?90:0;function Ga(e,t){let n=e.facing??`up`,r=n!==`up`&&n!==`down`?[Ba(Ra(Ua(Va[n]))),Ba(La(-90-Wa(n)))]:[Ba(La(-90-Wa(n)))];return[{...pa(ga(Va[n])),model:`create:block/shaft_half`},{model:t,matrix:Fa(...r)}]}function Ka(e){let t=e.facing??`up`,n=e.axis_along_first===`true`||e.axis_along_first_coordinate===`true`,r=Za(t,n),i=t===`up`?270:t===`down`?90:0,a=n===(Ta[t]===`z`)?0:90,o=e=>Fa(Ba(Ra(Ua(t))),Ba(La(i)),...e&&a?[Ba(za(a))]:[]);return[ka(`create:block/shaft`,r),{model:`create:block/deployer/pole`,matrix:o(!0)},{model:`create:block/deployer/hand_pointing`,matrix:o(!1)}]}function qa(e){let t=e.facing??`up`,n=t===`up`||t===`down`,r=n?`create:block/mechanical_saw/blade_vertical_inactive`:`create:block/mechanical_saw/blade_horizontal_inactive`,i=e.axis_along_first===`true`||e.axis_along_first_coordinate===`true`;return[n&&i?{...pa(e=>ca(ga(t)(e),`y`,90)),model:r}:_a(r,t),n?ka(`create:block/shaft`,Za(t,i)):{...pa(ga(Va[t])),model:`create:block/shaft_half`}]}var Ja=`create:block/mechanical_arm`;function Ya(e){let t=Fa(e.ceiling===`true`?Fa(Ia(.5,.5,.5),La(180)):Ia(.5,.5,.5),Ia(0,4/16,0)),n=Fa(t,Ia(0,2/16,0),La(135)),r=Fa(n,Ia(0,0,-14/16),La(-135)),i=Fa(r,Ia(0,0,-15/16),La(-45));return[{model:`${Ja}/cog`},{model:`${Ja}/base`,matrix:t},{model:`${Ja}/lower_body`,matrix:n},{model:`${Ja}/upper_body`,matrix:r},{model:`${Ja}/claw_base`,matrix:i},{model:`${Ja}/lower_claw_grip`,matrix:Fa(i,Ia(0,-1/16,-6/16))},{model:`${Ja}/upper_claw_grip`,matrix:Fa(i,Ia(0,1/16,-6/16))}]}function Xa(e){let t=e.facing??`north`,n=e.axis_along_first===`true`||e.axis_along_first_coordinate===`true`,r=Ta[t],i=r===`x`?n?`y`:`z`:r===`y`?n?`x`:`z`:n?`x`:`y`,a=([`x`,`y`,`z`].find(e=>e!==r&&e!==i)??`z`)===`y`||i===`x`?90:0,o=e.enabled===`true`,s=Fa(Ia(.5,.5,.5),Ra(ma(t)),La(t===`up`?0:t===`down`?180:90),Ra(a+(o?-90:0)),Ia(-.5,-.5,-.5));return[ka(`create:block/shaft`,i),{model:`create:block/fluid_valve/pointer`,matrix:s}]}function Za(e,t){let n=Ta[e];return n===`x`?t?`y`:`z`:n===`y`?t?`x`:`z`:t?`x`:`y`}var Qa={south:0,west:90,north:180,east:270,up:0,down:0};function $a(e,t,n){let r=t.facing??`up`,i=Za(r,t.axis_along_first===`true`||t.axis_along_first_coordinate===`true`),a=e===`speedometer`?`create:block/gauge/speedometer/head`:`create:block/gauge/stressometer/head`,o=[ka(`create:block/shaft`,i)];for(let e of[`north`,`south`,`east`,`west`]){if(Ta[e]===i||e===Va[r]||i===`y`&&e!==r||n?.getNeighbor(e))continue;let t=Ba(Ra(-Qa[e]-90));o.push({model:`create:block/gauge/dial`,matrix:t}),o.push({model:a,matrix:t})}return o}function eo(e){let t=(e.horizontal_axis??e.axis)===`x`;return[ka(`create:block/shaft`,t?`x`:`z`),{model:`create:block/rotation_speed_controller/bracket`,matrix:Pa(Ba(Ra(t?180:90)),Ia(0,1,0))}]}var to=[`down`,`up`,`north`,`south`,`east`,`west`],no=new Set([`fluid_pipe`,`glass_fluid_pipe`,`smart_fluid_pipe`,`encased_fluid_pipe`]),ro={texture:`create:block/pipes_connected`,uv:[4,8,8,12]};function io(e,t){let n=[],r=t=>e[t]===`true`,i={};for(let e of[`x`,`y`,`z`]){let t=wa[e];if(to.filter(e=>!t.includes(e)&&r(e)).length>=3)for(let e of t)r(e)||(i[e]=ro)}Object.keys(i).length>0&&n.push({elements:[{from:[4,4,4],to:[12,12,12],faces:i}]});for(let r of to){if(e[r]!==`true`)continue;let i=t?.getNeighbor(r)??null;i&&i.namespace===`create`&&no.has(i.name)?n.push({model:`create:block/fluid_pipe/connection/${r}`}):i?n.push({model:`create:block/fluid_pipe/rim_connector/${r}`},{model:`create:block/fluid_pipe/drain/${r}`}):n.push({model:`create:block/fluid_pipe/rim_connector/${r}`},{model:`create:block/fluid_pipe/rim/${r}`})}return n}var ao=[`none`,`smouldering`,`fading`,`kindled`,`seething`];function oo(e){let t=e&&typeof e==`object`?e:null,n=t?t.HeatLevel??t.heatLevel??t.blaze:void 0;return typeof n==`string`?n.toLowerCase():typeof n==`number`&&ao[n]?ao[n]:`fading`}function so(e){let t=oo(e?.blockEntity);if(t===`none`)return[];let n=t===`seething`,r=t===`kindled`,i=t===`fading`||r||n,a=[{model:n?`create:block/blaze_burner/blaze/super`:i?`create:block/blaze_burner/blaze/idle`:`create:block/blaze_burner/blaze/inert`}];return i&&a.push({model:n?`create:block/blaze_burner/superheated_rods_small`:`create:block/blaze_burner/rods_small`},{model:n?`create:block/blaze_burner/superheated_rods_large`:`create:block/blaze_burner/rods_large`}),(r||n)&&a.push({model:`create:block/blaze_burner/flame`}),a}function co(e){return e.face===`ceiling`?`down`:e.face===`wall`?e.facing??`north`:`up`}var lo=6/16,uo=14/16;function fo(e,t){return Fa(Ia(.5,.5,.5),Ra(Ua(e)),La(Wa(e)+90),Ra(t?-90:0),Ia(-.5,-.5,-.5))}function po(e,t){let n=co(e),r=Ta[n],i=t?.getNeighbor(n,2),a=Ta[e.facing??`north`],o=i?.properties.axis??(r===`y`?a===`z`?`x`:`z`:`y`),s=r!==`y`&&o===`y`||r===`y`&&o===`z`,c=lo*Math.sin(0)-Math.sqrt(uo**2-(lo*Math.cos(0))**2),l=Math.abs(c-lo*Math.sin(0)),u=Math.acos(l/uo)*(Math.cos(0)>=0?1:-1)*180/Math.PI,d=fo(n,s),f=c+20/16;return[{model:`create:block/steam_engine/piston`,matrix:Fa(d,Ia(0,f,0))},{model:`create:block/steam_engine/linkage`,matrix:Fa(d,Ia(0,1,0),Ia(0,f,0),Ia(0,4/16,8/16),La(u),Ia(0,-4/16,-8/16))},{model:`create:block/steam_engine/shaft_connector`,matrix:Fa(d,Ia(0,2,0),Ia(.5,.5,.5),La(-90),Ia(-.5,-.5,-.5))}]}function mo(e){let t=e.slope??`horizontal`,n=e.facing??`south`,r=t===`upward`||t===`downward`,i=e.part??`middle`,a=i===`start`||i===`end`||i===`pulley`,o=i===`pulley`?`middle`:i,s=pa(Sa(n,t)),c=(r?[`create:block/belt/diagonal_${o}`]:[`create:block/belt/${o}`,`create:block/belt/${o}_bottom`]).map(e=>({...s,model:e}));if(e.casing===`true`){let e=r?`diagonal`:t===`sideways`?`sideways`:`horizontal`,n=a?`pulley`:`middle`;c.push({...s,model:`create:block/belt_casing/${e}_${n}`})}return a&&c.push({...pa(xa(n,t)),model:`create:block/belt_pulley`}),c}function ho(){Ct(`create`,({name:e,properties:t},n)=>{if(e===`fluid_pipe`)return io(t,n);if(e===`blaze_burner`)return so(n);if(e===`gearbox`)return Ca[t.axis??`y`].map(Da);if(Ea.has(e))return wa[t.axis??`y`].map(Da);if(e in Oa)return Aa(e,t);if(e===`belt`)return mo(t);if(e===`steam_engine`)return po(t,n);if(e===`mechanical_mixer`)return[{model:`create:block/cogwheel_shaftless`},{model:`create:block/mechanical_mixer/pole`},{model:`create:block/mechanical_mixer/head`}];if(e===`mechanical_crafter`)return[{model:`create:block/cogwheel_shaftless`},{model:`create:block/mechanical_crafter/lid`},{model:`create:block/mechanical_crafter/arrow`},{model:`create:block/mechanical_crafter/belt`}];if(e===`millstone`)return[{model:`create:block/millstone/inner`}];if(e===`spout`)return[{model:`create:block/spout/top`},{model:`create:block/spout/middle`},{model:`create:block/spout/bottom`}];if(e===`rotation_speed_controller`)return eo(t);if(e===`mechanical_arm`)return Ya(t);if(e===`fluid_valve`)return Xa(t);if(e===`stressometer`||e===`speedometer`)return $a(e,t,n);let r=t.facing??`north`;if(e===`mechanical_drill`||e===`drill`)return[_a(`create:block/mechanical_drill/head`,r)];if(e===`mechanical_pump`)return[_a(`create:block/mechanical_pump/cog`,r)];if(e===`mechanical_press`)return[_a(`create:block/mechanical_press/head`,t.horizontal_facing??r)];if(e===`encased_fan`){let e=Va[r];return[_a(`create:block/encased_fan/propeller`,e),{...pa(ga(e)),model:`create:block/shaft_half`}]}return e===`mechanical_saw`?qa(t):e===`deployer`?Ka(t):e===`hand_crank`?[ya(`create:block/hand_crank/handle`,t.facing??`up`)]:e===`mechanical_bearing`||e===`clockwork_bearing`?Ga(t,`create:block/bearing/top`):e===`windmill_bearing`?Ga(t,`create:block/bearing/top_wooden`):e===`water_wheel`?[ba(r)]:[]},[`fluid_pipe`,`blaze_burner`,`stressometer`,`speedometer`,`steam_engine`]),Ct(`simulated`,({name:e,properties:t})=>e===`directional_gearshift`?ja(t):e===`throttle_lever`?[{model:`simulated:block/throttle_lever/handle`},{model:`simulated:block/throttle_lever/button`},{model:`simulated:block/throttle_lever/diode`}]:[]),Ct(`offroad`,({name:e,properties:t})=>{if(e!==`rockcutting_wheel`)return[];let n=t.facing??`south`,r=t.axis_along_first===`true`||t.axis_along_first_coordinate===`true`,i=(Ta[n]===`z`||Ta[n]===`y`)!==r,a=Ba(Ha[n]);return[{model:`offroad:block/rockcutting_wheel/wheel`,matrix:i?Fa(a,Ba(za(90)),Ia(.625,.5,0)):Fa(a,Ba(La(90)),Ia(0,.5,-.625))}]}),Ct(`aeronautics`,({name:e,properties:t})=>{let n=t.reversed===`true`?`propeller_reversed`:`propeller`;return e===`andesite_propeller`?[{model:`aeronautics:block/andesite_propeller/${n}`}]:e===`wooden_propeller`?[{model:`aeronautics:block/wooden_propeller/${n}`}]:[]})}var go={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},_o={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},vo=`attached`,yo=1e3,bo=1001,xo=1002,So=1003,Co=1004,wo=1005,To=1006,Eo=1007,Do=1008,Oo=1009,ko=1010,Ao=1011,jo=1012,Mo=1013,No=1014,Po=1015,Fo=1016,Io=1017,Lo=1018,Ro=1020,zo=35902,Bo=35899,Vo=1021,Ho=1022,Uo=1023,Wo=1026,Go=1027,Ko=1028,qo=1029,Jo=1030,Yo=1031,Xo=1033,Zo=33776,Qo=33777,$o=33778,es=33779,ts=35840,ns=35841,rs=35842,is=35843,as=36196,os=37492,ss=37496,cs=37488,ls=37489,us=37490,ds=37491,fs=37808,ps=37809,ms=37810,hs=37811,gs=37812,_s=37813,vs=37814,ys=37815,bs=37816,xs=37817,Ss=37818,Cs=37819,ws=37820,Ts=37821,Es=36492,Ds=36494,Os=36495,ks=36283,As=36284,js=36285,Ms=36286,Ns=2300,Ps=2301,Fs=2302,Is=2303,Ls=2400,Rs=2401,zs=2402,Bs=2500,Vs=3200,Hs=`srgb`,Us=`srgb-linear`,Ws=`linear`,Gs=`srgb`,Ks=7680,qs=35044,Js=2e3;function Ys(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Xs(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Zs(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Qs(){let e=Zs(`canvas`);return e.style.display=`block`,e}var $s={},ec=null;function tc(...e){let t=`THREE.`+e.shift();ec?ec(`log`,t,...e):console.log(t,...e)}function nc(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function B(...e){e=nc(e);let t=`THREE.`+e.shift();if(ec)ec(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function V(...e){e=nc(e);let t=`THREE.`+e.shift();if(ec)ec(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function rc(...e){let t=e.join(` `);t in $s||($s[t]=!0,B(...e))}function ic(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ac={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},oc=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},sc=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),cc=1234567,lc=Math.PI/180,uc=180/Math.PI;function dc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(sc[e&255]+sc[e>>8&255]+sc[e>>16&255]+sc[e>>24&255]+`-`+sc[t&255]+sc[t>>8&255]+`-`+sc[t>>16&15|64]+sc[t>>24&255]+`-`+sc[n&63|128]+sc[n>>8&255]+`-`+sc[n>>16&255]+sc[n>>24&255]+sc[r&255]+sc[r>>8&255]+sc[r>>16&255]+sc[r>>24&255]).toLowerCase()}function H(e,t,n){return Math.max(t,Math.min(n,e))}function fc(e,t){return(e%t+t)%t}function pc(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function mc(e,t,n){return e===t?0:(n-e)/(t-e)}function hc(e,t,n){return(1-n)*e+n*t}function gc(e,t,n,r){return hc(e,t,1-Math.exp(-n*r))}function _c(e,t=1){return t-Math.abs(fc(e,t*2)-t)}function vc(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function yc(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function bc(e,t){return e+Math.floor(Math.random()*(t-e+1))}function xc(e,t){return e+Math.random()*(t-e)}function Sc(e){return e*(.5-Math.random())}function Cc(e){e!==void 0&&(cc=e);let t=cc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function wc(e){return e*lc}function Tc(e){return e*uc}function Ec(e){return(e&e-1)==0&&e!==0}function Dc(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Oc(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function kc(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:B(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Ac(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function U(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var jc={DEG2RAD:lc,RAD2DEG:uc,generateUUID:dc,clamp:H,euclideanModulo:fc,mapLinear:pc,inverseLerp:mc,lerp:hc,damp:gc,pingpong:_c,smoothstep:vc,smootherstep:yc,randInt:bc,randFloat:xc,randFloatSpread:Sc,seededRandom:Cc,degToRad:wc,radToDeg:Tc,isPowerOfTwo:Ec,ceilPowerOfTwo:Dc,floorPowerOfTwo:Oc,setQuaternionFromProperEuler:kc,normalize:U,denormalize:Ac},W=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Mc=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:B(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(H(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class e{constructor(t=0,n=0,r=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=r}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Nc.copy(this).projectOnVector(e),this.sub(Nc)}reflect(e){return this.sub(Nc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nc=new G,Pc=new Mc,K=class e{constructor(t,n,r,i,a,o,s,c,l){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Fc.makeScale(e,t)),this}rotate(e){return this.premultiply(Fc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Fc=new K,Ic=new K().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lc=new K().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rc(){let e={enabled:!0,workingColorSpace:Us,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=zc(e.r),e.g=zc(e.g),e.b=zc(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Bc(e.r),e.g=Bc(e.g),e.b=Bc(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ws:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return rc(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return rc(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Us]:{primaries:t,whitePoint:r,transfer:Ws,toXYZ:Ic,fromXYZ:Lc,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Hs},outputColorSpaceConfig:{drawingBufferColorSpace:Hs}},[Hs]:{primaries:t,whitePoint:r,transfer:Gs,toXYZ:Ic,fromXYZ:Lc,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Hs}}}),e}var q=Rc();function zc(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Bc(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Vc,Hc=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vc===void 0&&(Vc=Zs(`canvas`)),Vc.width=e.width,Vc.height=e.height;let t=Vc.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Vc}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Zs(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=zc(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(zc(t[e]/255)*255):t[e]=zc(t[e]);return{data:t,width:e.width,height:e.height}}else return B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Uc=0,Wc=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uc++}),this.uuid=dc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Gc(r[t].image)):e.push(Gc(r[t]))}else e=Gc(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Gc(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Hc.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(B(`Texture: Unable to serialize Texture.`),{})}var Kc=0,qc=new G,Jc=class e extends oc{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=bo,i=bo,a=To,o=Do,s=Uo,c=Oo,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kc++}),this.uuid=dc(),this.name=``,this.source=new Wc(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new K,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(qc).x}get height(){return this.source.getSize(qc).y}get depth(){return this.source.getSize(qc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){B(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){B(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yo:e.x-=Math.floor(e.x);break;case bo:e.x=e.x<0?0:1;break;case xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yo:e.y-=Math.floor(e.y);break;case bo:e.y=e.y<0?0:1;break;case xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Jc.DEFAULT_IMAGE=null,Jc.DEFAULT_MAPPING=300,Jc.DEFAULT_ANISOTROPY=1;var J=class e{constructor(t=0,n=0,r=0,i=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this.w=H(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this.w=H(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yc=class extends oc{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:To,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new J(0,0,e,t),this.scissorTest=!1,this.viewport=new J(0,0,e,t),this.textures=[];let r=new Jc({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:To,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Wc(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xc=class extends Yc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zc=class extends Jc{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=So,this.minFilter=So,this.wrapR=bo,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qc=class extends Jc{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=So,this.minFilter=So,this.wrapR=bo,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Y=class e{constructor(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/$c.setFromMatrixColumn(e,0).length(),i=1/$c.setFromMatrixColumn(e,1).length(),a=1/$c.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tl,e,nl)}lookAt(e,t,n){let r=this.elements;return al.subVectors(e,t),al.lengthSq()===0&&(al.z=1),al.normalize(),rl.crossVectors(n,al),rl.lengthSq()===0&&(Math.abs(n.z)===1?al.x+=1e-4:al.z+=1e-4,al.normalize(),rl.crossVectors(n,al)),rl.normalize(),il.crossVectors(al,rl),r[0]=rl.x,r[4]=il.x,r[8]=al.x,r[1]=rl.y,r[5]=il.y,r[9]=al.y,r[2]=rl.z,r[6]=il.z,r[10]=al.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],te=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*M+c*ne,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*M+f*ne,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*M+g*ne,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*M+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinant();if(i===0)return n.set(1,1,1),t.identity(),this;let a=$c.set(r[0],r[1],r[2]).length(),o=$c.set(r[4],r[5],r[6]).length(),s=$c.set(r[8],r[9],r[10]).length();i<0&&(a=-a),el.copy(this);let c=1/a,l=1/o,u=1/s;return el.elements[0]*=c,el.elements[1]*=c,el.elements[2]*=c,el.elements[4]*=l,el.elements[5]*=l,el.elements[6]*=l,el.elements[8]*=u,el.elements[9]*=u,el.elements[10]*=u,t.setFromRotationMatrix(el),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Js,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Js,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},$c=new G,el=new Y,tl=new G(0,0,0),nl=new G(1,1,1),rl=new G,il=new G,al=new G,ol=new Y,sl=new Mc,cl=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(H(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-H(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(H(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-H(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(H(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-H(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:B(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ol.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ol,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sl.setFromEuler(this),this.setFromQuaternion(sl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};cl.DEFAULT_ORDER=`XYZ`;var ll=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},ul=0,dl=new G,fl=new Mc,pl=new Y,ml=new G,hl=new G,gl=new G,_l=new Mc,vl=new G(1,0,0),yl=new G(0,1,0),bl=new G(0,0,1),xl={type:`added`},Sl={type:`removed`},Cl={type:`childadded`,child:null},wl={type:`childremoved`,child:null},Tl=class e extends oc{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ul++}),this.uuid=dc(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new cl,r=new Mc,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Y},normalMatrix:{value:new K}}),this.matrix=new Y,this.matrixWorld=new Y,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ll,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fl.setFromAxisAngle(e,t),this.quaternion.multiply(fl),this}rotateOnWorldAxis(e,t){return fl.setFromAxisAngle(e,t),this.quaternion.premultiply(fl),this}rotateX(e){return this.rotateOnAxis(vl,e)}rotateY(e){return this.rotateOnAxis(yl,e)}rotateZ(e){return this.rotateOnAxis(bl,e)}translateOnAxis(e,t){return dl.copy(e).applyQuaternion(this.quaternion),this.position.add(dl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vl,e)}translateY(e){return this.translateOnAxis(yl,e)}translateZ(e){return this.translateOnAxis(bl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pl.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ml.copy(e):ml.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),hl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pl.lookAt(hl,ml,this.up):pl.lookAt(ml,hl,this.up),this.quaternion.setFromRotationMatrix(pl),r&&(pl.extractRotation(r.matrixWorld),fl.setFromRotationMatrix(pl),this.quaternion.premultiply(fl.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(V(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xl),Cl.child=e,this.dispatchEvent(Cl),Cl.child=null):V(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sl),wl.child=e,this.dispatchEvent(wl),wl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pl.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pl.multiply(e.parent.matrixWorld)),e.applyMatrix4(pl),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xl),Cl.child=e,this.dispatchEvent(Cl),Cl.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hl,e,gl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hl,_l,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Tl.DEFAULT_UP=new G(0,1,0),Tl.DEFAULT_MATRIX_AUTO_UPDATE=!0,Tl.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var El=class extends Tl{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Dl={type:`move`},Ol=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new El,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new El,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new El,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dl)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new El;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Al={h:0,s:0,l:0},jl={h:0,s:0,l:0};function Ml(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var X=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Hs){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,q.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=q.workingColorSpace){return this.r=e,this.g=t,this.b=n,q.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=q.workingColorSpace){if(e=fc(e,1),t=H(t,0,1),n=H(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ml(i,r,e+1/3),this.g=Ml(i,r,e),this.b=Ml(i,r,e-1/3)}return q.colorSpaceToWorking(this,r),this}setStyle(e,t=Hs){function n(t){t!==void 0&&parseFloat(t)<1&&B(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:B(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);B(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Hs){let n=kl[e.toLowerCase()];return n===void 0?B(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zc(e.r),this.g=zc(e.g),this.b=zc(e.b),this}copyLinearToSRGB(e){return this.r=Bc(e.r),this.g=Bc(e.g),this.b=Bc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Hs){return q.workingToColorSpace(Nl.copy(this),e),Math.round(H(Nl.r*255,0,255))*65536+Math.round(H(Nl.g*255,0,255))*256+Math.round(H(Nl.b*255,0,255))}getHexString(e=Hs){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=q.workingColorSpace){q.workingToColorSpace(Nl.copy(this),t);let n=Nl.r,r=Nl.g,i=Nl.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=q.workingColorSpace){return q.workingToColorSpace(Nl.copy(this),t),e.r=Nl.r,e.g=Nl.g,e.b=Nl.b,e}getStyle(e=Hs){q.workingToColorSpace(Nl.copy(this),e);let t=Nl.r,n=Nl.g,r=Nl.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Al),this.setHSL(Al.h+e,Al.s+t,Al.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Al),e.getHSL(jl);let n=hc(Al.h,jl.h,t),r=hc(Al.s,jl.s,t),i=hc(Al.l,jl.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Nl=new X;X.NAMES=kl;var Pl=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new X(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Fl=class extends Tl{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cl,this.environmentIntensity=1,this.environmentRotation=new cl,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Il=new G,Ll=new G,Rl=new G,zl=new G,Bl=new G,Vl=new G,Hl=new G,Ul=new G,Wl=new G,Gl=new G,Kl=new J,ql=new J,Jl=new J,Yl=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Il.subVectors(e,t),r.cross(Il);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Il.subVectors(r,t),Ll.subVectors(n,t),Rl.subVectors(e,t);let a=Il.dot(Il),o=Il.dot(Ll),s=Il.dot(Rl),c=Ll.dot(Ll),l=Ll.dot(Rl),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,zl)===null?!1:zl.x>=0&&zl.y>=0&&zl.x+zl.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,zl)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,zl.x),s.addScaledVector(a,zl.y),s.addScaledVector(o,zl.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Kl.setScalar(0),ql.setScalar(0),Jl.setScalar(0),Kl.fromBufferAttribute(e,t),ql.fromBufferAttribute(e,n),Jl.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Kl,i.x),a.addScaledVector(ql,i.y),a.addScaledVector(Jl,i.z),a}static isFrontFacing(e,t,n,r){return Il.subVectors(n,t),Ll.subVectors(e,t),Il.cross(Ll).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Il.subVectors(this.c,this.b),Ll.subVectors(this.a,this.b),Il.cross(Ll).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Bl.subVectors(r,n),Vl.subVectors(i,n),Ul.subVectors(e,n);let s=Bl.dot(Ul),c=Vl.dot(Ul);if(s<=0&&c<=0)return t.copy(n);Wl.subVectors(e,r);let l=Bl.dot(Wl),u=Vl.dot(Wl);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Bl,a);Gl.subVectors(e,i);let f=Bl.dot(Gl),p=Vl.dot(Gl);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Vl,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Hl.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Hl,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Bl,a).addScaledVector(Vl,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xl=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ql.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ql.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ql.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Ql):Ql.fromBufferAttribute(r,t),Ql.applyMatrix4(e.matrixWorld),this.expandByPoint(Ql);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),$l.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),$l.copy(e.boundingBox)),$l.applyMatrix4(e.matrixWorld),this.union($l)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ql),Ql.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ou),su.subVectors(this.max,ou),eu.subVectors(e.a,ou),tu.subVectors(e.b,ou),nu.subVectors(e.c,ou),ru.subVectors(tu,eu),iu.subVectors(nu,tu),au.subVectors(eu,nu);let t=[0,-ru.z,ru.y,0,-iu.z,iu.y,0,-au.z,au.y,ru.z,0,-ru.x,iu.z,0,-iu.x,au.z,0,-au.x,-ru.y,ru.x,0,-iu.y,iu.x,0,-au.y,au.x,0];return!uu(t,eu,tu,nu,su)||(t=[1,0,0,0,1,0,0,0,1],!uu(t,eu,tu,nu,su))?!1:(cu.crossVectors(ru,iu),t=[cu.x,cu.y,cu.z],uu(t,eu,tu,nu,su))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ql).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ql).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zl[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zl[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zl[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zl[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zl[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zl[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zl[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zl[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zl),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Zl=[new G,new G,new G,new G,new G,new G,new G,new G],Ql=new G,$l=new Xl,eu=new G,tu=new G,nu=new G,ru=new G,iu=new G,au=new G,ou=new G,su=new G,cu=new G,lu=new G;function uu(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){lu.fromArray(e,a);let o=i.x*Math.abs(lu.x)+i.y*Math.abs(lu.y)+i.z*Math.abs(lu.z),s=t.dot(lu),c=n.dot(lu),l=r.dot(lu);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var du=new G,fu=new W,pu=0,mu=class{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pu++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=qs,this.updateRanges=[],this.gpuType=Po,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fu.fromBufferAttribute(this,t),fu.applyMatrix3(e),this.setXY(t,fu.x,fu.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)du.fromBufferAttribute(this,t),du.applyMatrix3(e),this.setXYZ(t,du.x,du.y,du.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)du.fromBufferAttribute(this,t),du.applyMatrix4(e),this.setXYZ(t,du.x,du.y,du.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)du.fromBufferAttribute(this,t),du.applyNormalMatrix(e),this.setXYZ(t,du.x,du.y,du.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)du.fromBufferAttribute(this,t),du.transformDirection(e),this.setXYZ(t,du.x,du.y,du.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ac(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=U(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ac(t,this.array)),t}setX(e,t){return this.normalized&&(t=U(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ac(t,this.array)),t}setY(e,t){return this.normalized&&(t=U(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ac(t,this.array)),t}setZ(e,t){return this.normalized&&(t=U(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ac(t,this.array)),t}setW(e,t){return this.normalized&&(t=U(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=U(t,this.array),n=U(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=U(t,this.array),n=U(n,this.array),r=U(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=U(t,this.array),n=U(n,this.array),r=U(r,this.array),i=U(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}},hu=class extends mu{constructor(e,t,n){super(new Uint16Array(e),t,n)}},gu=class extends mu{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Z=class extends mu{constructor(e,t,n){super(new Float32Array(e),t,n)}},_u=new Xl,vu=new G,yu=new G,bu=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?_u.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vu.subVectors(e,this.center);let t=vu.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(vu,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vu.copy(e.center).add(yu)),this.expandByPoint(vu.copy(e.center).sub(yu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},xu=0,Su=new Y,Cu=new Tl,wu=new G,Tu=new Xl,Eu=new Xl,Du=new G,Ou=class e extends oc{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=dc(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ys(e)?gu:hu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new K().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Su.makeRotationFromQuaternion(e),this.applyMatrix4(Su),this}rotateX(e){return Su.makeRotationX(e),this.applyMatrix4(Su),this}rotateY(e){return Su.makeRotationY(e),this.applyMatrix4(Su),this}rotateZ(e){return Su.makeRotationZ(e),this.applyMatrix4(Su),this}translate(e,t,n){return Su.makeTranslation(e,t,n),this.applyMatrix4(Su),this}scale(e,t,n){return Su.makeScale(e,t,n),this.applyMatrix4(Su),this}lookAt(e){return Cu.lookAt(e),Cu.updateMatrix(),this.applyMatrix4(Cu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wu).negate(),this.translate(wu.x,wu.y,wu.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Z(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xl);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Tu.setFromBufferAttribute(n),this.morphTargetsRelative?(Du.addVectors(this.boundingBox.min,Tu.min),this.boundingBox.expandByPoint(Du),Du.addVectors(this.boundingBox.max,Tu.max),this.boundingBox.expandByPoint(Du)):(this.boundingBox.expandByPoint(Tu.min),this.boundingBox.expandByPoint(Tu.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bu);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);return}if(e){let n=this.boundingSphere.center;if(Tu.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Eu.setFromBufferAttribute(n),this.morphTargetsRelative?(Du.addVectors(Tu.min,Eu.min),Tu.expandByPoint(Du),Du.addVectors(Tu.max,Eu.max),Tu.expandByPoint(Du)):(Tu.expandByPoint(Eu.min),Tu.expandByPoint(Eu.max))}Tu.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Du.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Du));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Du.fromBufferAttribute(a,t),o&&(wu.fromBufferAttribute(e,t),Du.add(wu)),r=Math.max(r,n.distanceToSquared(Du))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new mu(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let c=new G,l=new G,u=new G,d=new W,f=new W,p=new W,m=new G,h=new G;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new G,y=new G,b=new G,x=new G;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new mu(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Du.fromBufferAttribute(e,t),Du.normalize(),e.setXYZ(t,Du.x,Du.y,Du.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new mu(a,r,i)}if(this.index===null)return B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},ku=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=qs,this.updateRanges=[],this.version=0,this.uuid=dc()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dc()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dc()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Au=new G,ju=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Au.fromBufferAttribute(this,t),Au.applyMatrix4(e),this.setXYZ(t,Au.x,Au.y,Au.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Au.fromBufferAttribute(this,t),Au.applyNormalMatrix(e),this.setXYZ(t,Au.x,Au.y,Au.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Au.fromBufferAttribute(this,t),Au.transformDirection(e),this.setXYZ(t,Au.x,Au.y,Au.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ac(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=U(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=U(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=U(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=U(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=U(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ac(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ac(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ac(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ac(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=U(t,this.array),n=U(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=U(t,this.array),n=U(n,this.array),r=U(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=U(t,this.array),n=U(n,this.array),r=U(r,this.array),i=U(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){tc(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new mu(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){tc(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Mu=0,Nu=class extends oc{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=dc(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ks,this.stencilZFail=Ks,this.stencilZPass=Ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){B(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){B(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Pu=class extends Nu{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fu,Iu=new G,Lu=new G,Ru=new G,zu=new W,Bu=new W,Vu=new Y,Hu=new G,Uu=new G,Wu=new G,Gu=new W,Ku=new W,qu=new W,Ju=class extends Tl{constructor(e=new Pu){if(super(),this.isSprite=!0,this.type=`Sprite`,Fu===void 0){Fu=new Ou;let e=new ku(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Fu.setIndex([0,1,2,0,2,3]),Fu.setAttribute(`position`,new ju(e,3,0,!1)),Fu.setAttribute(`uv`,new ju(e,2,3,!1))}this.geometry=Fu,this.material=e,this.center=new W(.5,.5),this.count=1}raycast(e,t){e.camera===null&&V(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Lu.setFromMatrixScale(this.matrixWorld),Vu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ru.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Lu.multiplyScalar(-Ru.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Yu(Hu.set(-.5,-.5,0),Ru,a,Lu,r,i),Yu(Uu.set(.5,-.5,0),Ru,a,Lu,r,i),Yu(Wu.set(.5,.5,0),Ru,a,Lu,r,i),Gu.set(0,0),Ku.set(1,0),qu.set(1,1);let o=e.ray.intersectTriangle(Hu,Uu,Wu,!1,Iu);if(o===null&&(Yu(Uu.set(-.5,.5,0),Ru,a,Lu,r,i),Ku.set(0,1),o=e.ray.intersectTriangle(Hu,Wu,Uu,!1,Iu),o===null))return;let s=e.ray.origin.distanceTo(Iu);s<e.near||s>e.far||t.push({distance:s,point:Iu.clone(),uv:Yl.getInterpolation(Iu,Hu,Uu,Wu,Gu,Ku,qu,new W),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Yu(e,t,n,r,i,a){zu.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Bu.copy(zu):(Bu.x=a*zu.x-i*zu.y,Bu.y=i*zu.x+a*zu.y),e.copy(t),e.x+=Bu.x,e.y+=Bu.y,e.applyMatrix4(Vu)}var Xu=new G,Zu=new G,Qu=new G,$u=new G,ed=new G,td=new G,nd=new G,rd=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xu)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xu.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xu.copy(this.origin).addScaledVector(this.direction,t),Xu.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Zu.copy(e).add(t).multiplyScalar(.5),Qu.copy(t).sub(e).normalize(),$u.copy(this.origin).sub(Zu);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Qu),o=$u.dot(this.direction),s=-$u.dot(Qu),c=$u.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Zu).addScaledVector(Qu,d),f}intersectSphere(e,t){Xu.subVectors(e.center,this.origin);let n=Xu.dot(this.direction),r=Xu.dot(Xu)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Xu)!==null}intersectTriangle(e,t,n,r,i){ed.subVectors(t,e),td.subVectors(n,e),nd.crossVectors(ed,td);let a=this.direction.dot(nd),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$u.subVectors(this.origin,e);let s=o*this.direction.dot(td.crossVectors($u,td));if(s<0)return null;let c=o*this.direction.dot(ed.cross($u));if(c<0||s+c>a)return null;let l=-o*$u.dot(nd);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},id=class extends Nu{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cl,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ad=new Y,od=new rd,sd=new bu,cd=new G,ld=new G,ud=new G,dd=new G,fd=new G,pd=new G,md=new G,hd=new G,gd=class extends Tl{constructor(e=new Ou,t=new id){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){pd.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(fd.fromBufferAttribute(s,e),a?pd.addScaledVector(fd,r):pd.addScaledVector(fd.sub(t),r))}t.add(pd)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sd.copy(n.boundingSphere),sd.applyMatrix4(i),od.copy(e.ray).recast(e.near),!(sd.containsPoint(od.origin)===!1&&(od.intersectSphere(sd,cd)===null||od.origin.distanceToSquared(cd)>(e.far-e.near)**2))&&(ad.copy(i).invert(),od.copy(e.ray).applyMatrix4(ad),!(n.boundingBox!==null&&od.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,od)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=vd(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=vd(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=vd(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=vd(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function _d(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;hd.copy(s),hd.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(hd);return l<n.near||l>n.far?null:{distance:l,point:hd.clone(),object:e}}function vd(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ld),e.getVertexPosition(c,ud),e.getVertexPosition(l,dd);let u=_d(e,t,n,r,ld,ud,dd,md);if(u){let e=new G;Yl.getBarycoord(md,ld,ud,dd,e),i&&(u.uv=Yl.getInterpolatedAttribute(i,s,c,l,e,new W)),a&&(u.uv1=Yl.getInterpolatedAttribute(a,s,c,l,e,new W)),o&&(u.normal=Yl.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};Yl.getNormal(ld,ud,dd,t.normal),u.face=t,u.barycoord=e}return u}var yd=new G,bd=new J,xd=new J,Sd=new G,Cd=new Y,wd=new G,Td=new bu,Ed=new Y,Dd=new rd,Od=class extends gd{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=vo,this.bindMatrix=new Y,this.bindMatrixInverse=new Y,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xl),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,wd),this.boundingBox.expandByPoint(wd)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new bu),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,wd),this.boundingSphere.expandByPoint(wd)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Td.copy(this.boundingSphere),Td.applyMatrix4(r),e.ray.intersectsSphere(Td)!==!1&&(Ed.copy(r).invert(),Dd.copy(e.ray).applyMatrix4(Ed),!(this.boundingBox!==null&&Dd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Dd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new J,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():B(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;bd.fromBufferAttribute(r.attributes.skinIndex,e),xd.fromBufferAttribute(r.attributes.skinWeight,e),yd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let e=0;e<4;e++){let r=xd.getComponent(e);if(r!==0){let i=bd.getComponent(e);Cd.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(Sd.copy(yd).applyMatrix4(Cd),r)}}return t.applyMatrix4(this.bindMatrixInverse)}},kd=class extends Tl{constructor(){super(),this.isBone=!0,this.type=`Bone`}},Ad=class extends Jc{constructor(e=null,t=1,n=1,r,i,a,o,s,c=So,l=So,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},jd=new Y,Md=new Y,Nd=class e{constructor(e=[],t=[]){this.uuid=dc(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){B(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new Y)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new Y;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:Md;jd.multiplyMatrices(i,t[r]),jd.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ad(t,e,e,Uo,Po);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(B(`Skeleton: No bone found with UUID:`,r),i=new kd),this.bones.push(i),this.boneInverses.push(new Y().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Pd=class extends mu{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Fd=new Y,Id=new Y,Ld=[],Rd=new Xl,zd=new Y,Bd=new gd,Vd=new bu,Hd=class extends gd{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pd(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,zd)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xl),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fd),Rd.copy(e.boundingBox).applyMatrix4(Fd),this.boundingBox.union(Rd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new bu),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fd),Vd.copy(e.boundingSphere).applyMatrix4(Fd),this.boundingSphere.union(Vd)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Bd.geometry=this.geometry,Bd.material=this.material,Bd.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vd.copy(this.boundingSphere),Vd.applyMatrix4(n),e.ray.intersectsSphere(Vd)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Fd),Id.multiplyMatrices(n,Fd),Bd.matrixWorld=Id,Bd.raycast(e,Ld);for(let e=0,n=Ld.length;e<n;e++){let n=Ld[e];n.instanceId=i,n.object=this,t.push(n)}Ld.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ad(new Float32Array(r*this.count),r,this.count,Ko,Po));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;i[s]=o,i.set(n,s+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ud=new G,Wd=new G,Gd=new K,Kd=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ud.subVectors(n,t).cross(Wd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ud),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Gd.getNormalMatrix(e),r=this.coplanarPoint(Ud).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},qd=new bu,Jd=new W(.5,.5),Yd=new G,Xd=class{constructor(e=new Kd,t=new Kd,n=new Kd,r=new Kd,i=new Kd,a=new Kd){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Js,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qd.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qd.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qd)}intersectsSprite(e){return qd.center.set(0,0,0),qd.radius=.7071067811865476+Jd.distanceTo(e.center),qd.applyMatrix4(e.matrixWorld),this.intersectsSphere(qd)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Yd.x=r.normal.x>0?e.max.x:e.min.x,Yd.y=r.normal.y>0?e.max.y:e.min.y,Yd.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Yd)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Zd=class extends Nu{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new X(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Qd=new G,$d=new G,ef=new Y,tf=new rd,nf=new bu,rf=new G,af=new G,of=class extends Tl{constructor(e=new Ou,t=new Zd){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Qd.fromBufferAttribute(t,e-1),$d.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Qd.distanceTo($d);e.setAttribute(`lineDistance`,new Z(n,1))}else B(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nf.copy(n.boundingSphere),nf.applyMatrix4(r),nf.radius+=i,e.ray.intersectsSphere(nf)===!1)return;ef.copy(r).invert(),tf.copy(e.ray).applyMatrix4(ef);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=sf(this,e,tf,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=sf(this,e,tf,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=sf(this,e,tf,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=sf(this,e,tf,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function sf(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Qd.fromBufferAttribute(s,i),$d.fromBufferAttribute(s,a),n.distanceSqToSegment(Qd,$d,rf,af)>r)return;rf.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(rf);if(!(c<t.near||c>t.far))return{distance:c,point:af.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var cf=new G,lf=new G,uf=class extends of{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)cf.fromBufferAttribute(t,e),lf.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+cf.distanceTo(lf);e.setAttribute(`lineDistance`,new Z(n,1))}else B(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},df=class extends of{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},ff=class extends Nu{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},pf=new Y,mf=new rd,hf=new bu,gf=new G,_f=class extends Tl{constructor(e=new Ou,t=new ff){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hf.copy(n.boundingSphere),hf.applyMatrix4(r),hf.radius+=i,e.ray.intersectsSphere(hf)===!1)return;pf.copy(r).invert(),mf.copy(e.ray).applyMatrix4(pf);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);gf.fromBufferAttribute(l,n),vf(gf,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)gf.fromBufferAttribute(l,a),vf(gf,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function vf(e,t,n,r,i,a,o){let s=mf.distanceSqToPoint(e);if(s<n){let n=new G;mf.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var yf=class extends Jc{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},bf=class extends Jc{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},xf=class extends Jc{constructor(e,t,n=No,r,i,a,o=So,s=So,c,l=Wo,u=1){if(l!==1026&&l!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Wc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Sf=class extends xf{constructor(e,t=No,n=301,r,i,a=So,o=So,s,c=Wo){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Cf=class extends Jc{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},wf=class e extends Ou{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Z(c,3)),this.setAttribute(`normal`,new Z(l,3)),this.setAttribute(`uv`,new Z(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Tf=class e extends Ou{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new G,l=new W;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Z(a,3)),this.setAttribute(`normal`,new Z(o,3)),this.setAttribute(`uv`,new Z(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ef=class e extends Ou{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Z(u,3)),this.setAttribute(`normal`,new Z(d,3)),this.setAttribute(`uv`,new Z(f,2));function _(){let a=new G,_=new G,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new W,m=new G,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Df=class e extends Ef{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Of=new G,kf=new G,Af=new G,jf=new Yl,Mf=class extends Ou{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=10**4,r=Math.cos(lc*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u={},d=[];for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:o,c:f}=jf;if(t.fromBufferAttribute(a,s[0]),o.fromBufferAttribute(a,s[1]),f.fromBufferAttribute(a,s[2]),jf.getNormal(Af),l[0]=`${Math.round(t.x*n)},${Math.round(t.y*n)},${Math.round(t.z*n)}`,l[1]=`${Math.round(o.x*n)},${Math.round(o.y*n)},${Math.round(o.z*n)}`,l[2]=`${Math.round(f.x*n)},${Math.round(f.y*n)},${Math.round(f.z*n)}`,!(l[0]===l[1]||l[1]===l[2]||l[2]===l[0]))for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=jf[c[e]],o=jf[c[t]],f=`${n}_${i}`,p=`${i}_${n}`;p in u&&u[p]?(Af.dot(u[p].normal)<=r&&(d.push(a.x,a.y,a.z),d.push(o.x,o.y,o.z)),u[p]=null):f in u||(u[f]={index0:s[e],index1:s[t],normal:Af.clone()})}}for(let e in u)if(u[e]){let{index0:t,index1:n}=u[e];Of.fromBufferAttribute(a,t),kf.fromBufferAttribute(a,n),d.push(Of.x,Of.y,Of.z),d.push(kf.x,kf.y,kf.z)}this.setAttribute(`position`,new Z(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Nf=class e extends Ou{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Z(p,3)),this.setAttribute(`normal`,new Z(m,3)),this.setAttribute(`uv`,new Z(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Pf=class e extends Ou{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new G,p=new W;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Z(s,3)),this.setAttribute(`normal`,new Z(c,3)),this.setAttribute(`uv`,new Z(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Ff=class e extends Ou{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new G,d=new G,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Z(p,3)),this.setAttribute(`normal`,new Z(m,3)),this.setAttribute(`uv`,new Z(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},If=class extends Ou{constructor(e=null){if(super(),this.type=`WireframeGeometry`,this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new G,i=new G;if(e.index!==null){let a=e.attributes.position,o=e.index,s=e.groups;s.length===0&&(s=[{start:0,count:o.count,materialIndex:0}]);for(let e=0,c=s.length;e<c;++e){let c=s[e],l=c.start,u=c.count;for(let e=l,s=l+u;e<s;e+=3)for(let s=0;s<3;s++){let c=o.getX(e+s),l=o.getX(e+(s+1)%3);r.fromBufferAttribute(a,c),i.fromBufferAttribute(a,l),Lf(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}}else{let a=e.attributes.position;for(let e=0,o=a.count/3;e<o;e++)for(let o=0;o<3;o++){let s=3*e+o,c=3*e+(o+1)%3;r.fromBufferAttribute(a,s),i.fromBufferAttribute(a,c),Lf(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}this.setAttribute(`position`,new Z(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Lf(e,t,n){let r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(r)===!0||n.has(i)===!0?!1:(n.add(r),n.add(i),!0)}function Rf(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone():Array.isArray(i)?t[n][r]=i.slice():t[n][r]=i}}return t}function zf(e){let t={};for(let n=0;n<e.length;n++){let r=Rf(e[n]);for(let e in r)t[e]=r[e]}return t}function Bf(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Vf(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:q.workingColorSpace}var Hf={clone:Rf,merge:zf},Uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Gf=class extends Nu{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uf,this.fragmentShader=Wf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rf(e.uniforms),this.uniformsGroups=Bf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Kf=class extends Gf{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},qf=class extends Nu{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new X(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cl,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Jf=class extends qf{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new W(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return H(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new X(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new X(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new X(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Yf=class extends Nu{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type=`MeshPhongMaterial`,this.color=new X(16777215),this.specular=new X(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cl,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Xf=class extends Nu{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cl,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Zf=class extends Nu{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Vs,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Qf=class extends Nu{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},$f=class extends Zd{constructor(e){super(),this.isLineDashedMaterial=!0,this.type=`LineDashedMaterial`,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ep(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function tp(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function np(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function rp(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0)if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}var ip=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},ap=class extends ip{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ls,endingEnd:Ls}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Rs:i=e,o=2*t-n;break;case zs:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Rs:a=e,s=2*n-t;break;case zs:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},op=class extends ip{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},sp=class extends ip{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},cp=class extends ip{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.settings||this.DefaultSettings_,u=l.inTangents,d=l.outTangents;if(!u||!d){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let f=o*2,p=e-1;for(let l=0;l!==o;++l){let o=a[c+l],m=a[s+l],h=p*f+l*2,g=d[h],_=d[h+1],v=e*f+l*2,y=u[v],b=u[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[l]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},lp=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ep(t,this.TimeBufferType),this.values=ep(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ep(e.times,Array),values:ep(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new op(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ap(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new cp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Ns:t=this.InterpolantFactoryMethodDiscrete;break;case Ps:t=this.InterpolantFactoryMethodLinear;break;case Fs:t=this.InterpolantFactoryMethodSmooth;break;case Is:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return B(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ns;case this.InterpolantFactoryMethodLinear:return Ps;case this.InterpolantFactoryMethodSmooth:return Fs;case this.InterpolantFactoryMethodBezier:return Is}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(V(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(V(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){V(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){V(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Xs(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){V(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Fs,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};lp.prototype.ValueTypeName=``,lp.prototype.TimeBufferType=Float32Array,lp.prototype.ValueBufferType=Float32Array,lp.prototype.DefaultInterpolation=Ps;var up=class extends lp{constructor(e,t,n){super(e,t,n)}};up.prototype.ValueTypeName=`bool`,up.prototype.ValueBufferType=Array,up.prototype.DefaultInterpolation=Ns,up.prototype.InterpolantFactoryMethodLinear=void 0,up.prototype.InterpolantFactoryMethodSmooth=void 0;var dp=class extends lp{constructor(e,t,n,r){super(e,t,n,r)}};dp.prototype.ValueTypeName=`color`;var fp=class extends lp{constructor(e,t,n,r){super(e,t,n,r)}};fp.prototype.ValueTypeName=`number`;var pp=class extends ip{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Mc.slerpFlat(i,0,a,c-o,a,c,s);return i}},mp=class extends lp{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new pp(this.times,this.values,this.getValueSize(),e)}};mp.prototype.ValueTypeName=`quaternion`,mp.prototype.InterpolantFactoryMethodSmooth=void 0;var hp=class extends lp{constructor(e,t,n){super(e,t,n)}};hp.prototype.ValueTypeName=`string`,hp.prototype.ValueBufferType=Array,hp.prototype.DefaultInterpolation=Ns,hp.prototype.InterpolantFactoryMethodLinear=void 0,hp.prototype.InterpolantFactoryMethodSmooth=void 0;var gp=class extends lp{constructor(e,t,n,r){super(e,t,n,r)}};gp.prototype.ValueTypeName=`vector`;var _p=class{constructor(e=``,t=-1,n=[],r=Bs){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=dc(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(yp(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(lp.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=tp(o);o=np(o,1,c),s=np(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new fp(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}static parseAnimation(e,t){if(B(`AnimationClip: parseAnimation() is deprecated and will be removed with r185`),!e)return V(`AnimationClip: No animation in JSONLoader data.`),null;let n=function(e,t,n,r,i){if(n.length!==0){let a=[],o=[];rp(n,a,o,r),a.length!==0&&i.push(new e(t,a,o))}},r=[],i=e.name||`default`,a=e.fps||30,o=e.blendMode,s=e.length||-1,c=e.hierarchy||[];for(let e=0;e<c.length;e++){let i=c[e].keys;if(!(!i||i.length===0))if(i[0].morphTargets){let e={},t;for(t=0;t<i.length;t++)if(i[t].morphTargets)for(let n=0;n<i[t].morphTargets.length;n++)e[i[t].morphTargets[n]]=-1;for(let n in e){let e=[],a=[];for(let r=0;r!==i[t].morphTargets.length;++r){let r=i[t];e.push(r.time),a.push(+(r.morphTarget===n))}r.push(new fp(`.morphTargetInfluence[`+n+`]`,e,a))}s=e.length*a}else{let a=`.bones[`+t[e].name+`]`;n(gp,a+`.position`,i,`pos`,r),n(mp,a+`.quaternion`,i,`rot`,r),n(gp,a+`.scale`,i,`scl`,r)}}return r.length===0?null:new this(i,s,r,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function vp(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return fp;case`vector`:case`vector2`:case`vector3`:case`vector4`:return gp;case`color`:return dp;case`quaternion`:return mp;case`bool`:case`boolean`:return up;case`string`:return hp}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function yp(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=vp(e.type);if(e.times===void 0){let t=[],n=[];rp(e.keys,t,n,`value`),e.times=t,e.values=n}return t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e)}var bp={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(xp(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!xp(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function xp(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Sp=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Cp=class{constructor(e){this.manager=e===void 0?Sp:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Cp.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var wp={},Tp=class extends Error{constructor(e,t){super(e),this.response=t}},Ep=class extends Cp{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=bp.get(`file:${e}`);if(i!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0),i;if(wp[e]!==void 0){wp[e].push({onLoad:t,onProgress:n,onError:r});return}wp[e]=[],wp[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&B(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=wp[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}else throw new Tp(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{bp.add(`file:${e}`,t);let n=wp[e];delete wp[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=wp[e];if(n===void 0)throw this.manager.itemError(e),t;delete wp[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Dp=new WeakMap,Op=class extends Cp{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=bp.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Dp.get(a);e===void 0&&(e=[],Dp.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Zs(`img`);function s(){l(),t&&t(this);let n=Dp.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Dp.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),bp.remove(`image:${e}`);let n=Dp.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Dp.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),bp.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},kp=class extends Cp{constructor(e){super(e)}load(e,t,n,r){let i=new Jc,a=new Op(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Ap=class extends Tl{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new X(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},jp=class extends Ap{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Tl.DEFAULT_UP),this.updateMatrix(),this.groundColor=new X(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Mp=new Y,Np=new G,Pp=new G,Fp=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new W(512,512),this.mapType=Oo,this.map=null,this.mapPass=null,this.matrix=new Y,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xd,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new J(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Np.setFromMatrixPosition(e.matrixWorld),t.position.copy(Np),Pp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Pp),t.updateMatrixWorld(),Mp.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mp,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Mp)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ip=new G,Lp=new Mc,Rp=new G,zp=class extends Tl{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Y,this.projectionMatrix=new Y,this.projectionMatrixInverse=new Y,this.coordinateSystem=Js,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ip,Lp,Rp),Rp.x===1&&Rp.y===1&&Rp.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ip,Lp,Rp.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Ip,Lp,Rp),Rp.x===1&&Rp.y===1&&Rp.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ip,Lp,Rp.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Bp=new G,Vp=new W,Hp=new W,Up=class extends zp{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=uc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(lc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return uc*2*Math.atan(Math.tan(lc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bp.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bp.x,Bp.y).multiplyScalar(-e/Bp.z),Bp.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bp.x,Bp.y).multiplyScalar(-e/Bp.z)}getViewSize(e,t){return this.getViewBounds(e,Vp,Hp),t.subVectors(Hp,Vp)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(lc*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Wp=class extends Fp{constructor(){super(new Up(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=uc*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Gp=class extends Ap{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Tl.DEFAULT_UP),this.updateMatrix(),this.target=new Tl,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Wp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Kp=class extends Fp{constructor(){super(new Up(90,1,.5,500)),this.isPointLightShadow=!0}},qp=class extends Ap{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Kp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Jp=class extends zp{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Yp=class extends Fp{constructor(){super(new Jp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Xp=class extends Ap{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Tl.DEFAULT_UP),this.updateMatrix(),this.target=new Tl,this.shadow=new Yp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Zp=class extends Ap{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Qp=class{static extractUrlBase(e){let t=e.lastIndexOf(`/`);return t===-1?`./`:e.slice(0,t+1)}static resolveURL(e,t){return typeof e!=`string`||e===``?``:(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,`$1`)),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},$p=class extends Ou{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},em=new WeakMap,tm=class extends Cp{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&B(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&B(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=bp.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{if(em.has(a)===!0)r&&r(em.get(a)),i.manager.itemError(e),i.manager.itemEnd(e);else return t&&t(n),i.manager.itemEnd(e),n});return}return setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin===`anonymous`?`same-origin`:`include`,o.headers=this.requestHeader,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign(i.options,{colorSpaceConversion:`none`}))}).then(function(n){return bp.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e),n}).catch(function(t){r&&r(t),em.set(s,t),bp.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});bp.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},nm=-90,rm=1,im=class extends Tl{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Up(nm,rm,e,t);r.layers=this.layers,this.add(r);let i=new Up(nm,rm,e,t);i.layers=this.layers,this.add(i);let a=new Up(nm,rm,e,t);a.layers=this.layers,this.add(a);let o=new Up(nm,rm,e,t);o.layers=this.layers,this.add(o);let s=new Up(nm,rm,e,t);s.layers=this.layers,this.add(s);let c=new Up(nm,rm,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},am=class extends Up{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},om=`\\[\\]\\.:\\/`,sm=RegExp(`[\\[\\]\\.:\\/]`,`g`),cm=`[^\\[\\]\\.:\\/]`,lm=`[^`+om.replace(`\\.`,``)+`]`,um=`((?:WC+[\\/:])*)`.replace(`WC`,cm),dm=`(WCOD+)?`.replace(`WCOD`,lm),fm=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,cm),pm=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,cm),mm=RegExp(`^`+um+dm+fm+pm+`$`),hm=[`material`,`materials`,`bones`,`map`],gm=class{constructor(e,t,n){let r=n||_m.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_m=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(sm,``)}static parseTrackName(e){let t=mm.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);hm.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){B(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){V(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){V(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){V(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){V(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){V(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;V(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_m.Composite=gm,_m.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},_m.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},_m.prototype.GetterByBindingType=[_m.prototype._getValue_direct,_m.prototype._getValue_array,_m.prototype._getValue_arrayElement,_m.prototype._getValue_toArray],_m.prototype.SetterByBindingTypeAndVersioning=[[_m.prototype._setValue_direct,_m.prototype._setValue_direct_setNeedsUpdate,_m.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_m.prototype._setValue_array,_m.prototype._setValue_array_setNeedsUpdate,_m.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_m.prototype._setValue_arrayElement,_m.prototype._setValue_arrayElement_setNeedsUpdate,_m.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_m.prototype._setValue_fromArray,_m.prototype._setValue_fromArray_setNeedsUpdate,_m.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var vm=class extends ku{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},ym=new Y,bm=class{constructor(e,t,n=0,r=1/0){this.ray=new rd(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ll,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):V(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return ym.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ym),this}intersectObject(e,t=!0,n=[]){return Sm(e,this,n,t),n.sort(xm),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Sm(e[r],this,n,t);return n.sort(xm),n}};function xm(e,t){return e.distance-t.distance}function Sm(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Sm(r[e],t,n,!0)}}var Cm=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=H(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(H(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},wm=new G,Tm=new G,Em=new G,Dm=new G,Om=new G,km=new G,Am=new G,jm=class{constructor(e=new G,t=new G){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){wm.subVectors(e,this.start),Tm.subVectors(this.end,this.start);let n=Tm.dot(Tm),r=Tm.dot(wm)/n;return t&&(r=H(r,0,1)),r}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=km,n=Am){let r=1e-8*1e-8,i,a,o=this.start,s=e.start,c=this.end,l=e.end;Em.subVectors(c,o),Dm.subVectors(l,s),Om.subVectors(o,s);let u=Em.dot(Em),d=Dm.dot(Dm),f=Dm.dot(Om);if(u<=r&&d<=r)return t.copy(o),n.copy(s),t.sub(n),t.dot(t);if(u<=r)i=0,a=f/d,a=H(a,0,1);else{let e=Em.dot(Om);if(d<=r)a=0,i=H(-e/u,0,1);else{let t=Em.dot(Dm),n=u*d-t*t;i=n===0?0:H((t*f-e*d)/n,0,1),a=(t*i+f)/d,a<0?(a=0,i=H(-e/u,0,1)):a>1&&(a=1,i=H((t-e)/u,0,1))}}return t.copy(o).addScaledVector(Em,i),n.copy(s).addScaledVector(Dm,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},Mm=new G,Nm,Pm,Fm=class extends Tl{constructor(e=new G(0,0,1),t=new G(0,0,0),n=1,r=16776960,i=n*.2,a=i*.2){super(),this.type=`ArrowHelper`,Nm===void 0&&(Nm=new Ou,Nm.setAttribute(`position`,new Z([0,0,0,0,1,0],3)),Pm=new Df(.5,1,5,1),Pm.translate(0,-.5,0)),this.position.copy(t),this.line=new of(Nm,new Zd({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new gd(Pm,new id({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,i,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Mm.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Mm,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},Im=class extends oc{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){B(`Controls: connect() now requires an element.`);return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Lm(e,t,n,r){let i=Rm(r);switch(n){case Vo:return e*t;case Ko:return e*t/i.components*i.byteLength;case qo:return e*t/i.components*i.byteLength;case Jo:return e*t*2/i.components*i.byteLength;case Yo:return e*t*2/i.components*i.byteLength;case Ho:return e*t*3/i.components*i.byteLength;case Uo:return e*t*4/i.components*i.byteLength;case Xo:return e*t*4/i.components*i.byteLength;case Zo:case Qo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case $o:case es:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ns:case is:return Math.max(e,16)*Math.max(t,8)/4;case ts:case rs:return Math.max(e,8)*Math.max(t,8)/2;case as:case os:case cs:case ls:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ss:case us:case ds:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fs:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ps:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ms:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case hs:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case gs:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case _s:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case vs:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ys:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case bs:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case xs:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ss:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Cs:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ws:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ts:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Es:case Ds:case Os:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ks:case As:return Math.ceil(e/4)*Math.ceil(t/4)*8;case js:case Ms:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Rm(e){switch(e){case Oo:case ko:return{byteLength:1,components:1};case jo:case Ao:case Fo:return{byteLength:2,components:1};case Io:case Lo:return{byteLength:2,components:4};case No:case Mo:case Po:return{byteLength:4,components:1};case zo:case Bo:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`183`}})),typeof window<`u`&&(window.__THREE__?B(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`183`);function zm(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Bm(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},$={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new K}},envmap:{envMap:{value:null},envMapRotation:{value:new K},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new K}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new K}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new K},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new K},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new K},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new K}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new K}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new K}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0},uvTransform:{value:new K}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}}},Vm={basic:{uniforms:zf([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:zf([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new X(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:zf([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:zf([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:zf([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new X(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:zf([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:zf([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:zf([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:zf([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:zf([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:zf([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new K},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new K}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:zf([$.common,$.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:zf([$.lights,$.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};Vm.physical={uniforms:zf([Vm.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new K},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new K},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new K},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new K},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new K},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new K},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new K},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new K},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new K},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new K},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new K},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new K}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var Hm={r:0,b:0,g:0},Um=new cl,Wm=new Y;function Gm(e,t,n,r,i,a){let o=new X(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new gd(new wf(1,1,1),new Gf({name:`BackgroundCubeMaterial`,uniforms:Rf(Vm.backgroundCube.uniforms),vertexShader:Vm.backgroundCube.vertexShader,fragmentShader:Vm.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),Um.copy(n.backgroundRotation),Um.x*=-1,Um.y*=-1,Um.z*=-1,i.isCubeTexture&&i.isRenderTargetTexture===!1&&(Um.y*=-1,Um.z*=-1),l.material.uniforms.envMap.value=i,l.material.uniforms.flipEnvMap.value=i.isCubeTexture&&i.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Wm.makeRotationFromEuler(Um)),l.material.toneMapped=q.getTransfer(i.colorSpace)!==Gs,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new gd(new Nf(2,2),new Gf({name:`BackgroundMaterial`,uniforms:Rf(Vm.background.uniforms),vertexShader:Vm.background.vertexShader,fragmentShader:Vm.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=q.getTransfer(i.colorSpace)!==Gs,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Hm,Vf(e)),n.buffers.color.setClear(Hm.r,Hm.g,Hm.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Km(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function qm(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}function c(e,i,a,s){if(a===0)return;let c=t.get(`WEBGL_multi_draw`);if(c===null)for(let t=0;t<e.length;t++)o(e[t],i[t],s[t]);else{c.multiDrawArraysInstancedWEBGL(r,e,0,i,0,s,0,a);let t=0;for(let e=0;e<a;e++)t+=i[e]*s[e];n.update(t,r,1)}}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function Jm(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(B(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ym(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Kd,s=new K,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Xm=4,Zm=[.125,.215,.35,.446,.526,.582],Qm=20,$m=256,eh=new Jp,th=new X,nh=null,rh=0,ih=0,ah=!1,oh=new G,sh=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=oh}=i;nh=this._renderer.getRenderTarget(),rh=this._renderer.getActiveCubeFace(),ih=this._renderer.getActiveMipmapLevel(),ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(nh,rh,ih),this._renderer.xr.enabled=ah,e.scissorTest=!1,uh(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nh=this._renderer.getRenderTarget(),rh=this._renderer.getActiveCubeFace(),ih=this._renderer.getActiveMipmapLevel(),ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:To,minFilter:To,generateMipmaps:!1,type:Fo,format:Uo,colorSpace:Us,depthBuffer:!1},r=lh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lh(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ch(r)),this._blurMaterial=fh(r,e,t),this._ggxMaterial=dh(r,e,t)}return r}_compileMaterial(e){let t=new gd(new Ou,e);this._renderer.compile(t,eh)}_sceneToCubeUV(e,t,n,r,i){let a=new Up(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(th),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new gd(new wf,new id({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(th),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;uh(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ph());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;uh(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,eh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Xm?n-d+Xm:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,uh(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,eh),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,uh(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,eh)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&V(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*Qm-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):Qm;m>Qm&&B(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qm}`);let h=[],g=0;for(let e=0;e<Qm;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];uh(t,3*v*(r>_-Xm?r-_+Xm:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,eh)}};function ch(e){let t=[],n=[],r=[],i=e,a=e-Xm+1+Zm.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Xm?s=Zm[o-e+Xm-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Ou;h.setAttribute(`position`,new mu(f,3)),h.setAttribute(`uv`,new mu(p,2)),h.setAttribute(`faceIndex`,new mu(m,1)),r.push(new gd(h,null)),i>Xm&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function lh(e,t,n){let r=new Xc(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function uh(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function dh(e,t,n){return new Gf({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:$m,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:hh(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fh(e,t,n){let r=new Float32Array(Qm),i=new G(0,1,0);return new Gf({name:`SphericalGaussianBlur`,defines:{n:Qm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ph(){return new Gf({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function mh(){return new Gf({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function hh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var gh=class extends Xc{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new yf(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new wf(5,5,5),i=new Gf({name:`CubemapFromEquirect`,uniforms:Rf(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new gd(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=To),new im(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function _h(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new gh(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}else return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new sh(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new sh(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function vh(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&rc(`WebGLRenderer: `+e+` extension not supported.`),t}}}function yh(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?gu:hu)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function bh(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}function d(e,i,s,c){if(s===0)return;let u=t.get(`WEBGL_multi_draw`);if(u===null)for(let t=0;t<e.length;t++)l(e[t]/o,i[t],c[t]);else{u.multiDrawElementsInstancedWEBGL(r,i,0,a,e,0,c,0,s);let t=0;for(let e=0;e<s;e++)t+=i[e]*c[e];n.update(t,r,1)}}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function xh(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Sh(e,t,n){let r=new WeakMap,i=new J;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Zc(h,p,m,u);g.type=Po,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new W(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ch(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var wh={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Th(e,t,n,r,i){let a=new Xc(t,n,{type:e,depthBuffer:r,stencilBuffer:i}),o=new Xc(t,n,{type:Fo,depthBuffer:!1,stencilBuffer:!1}),s=new Ou;s.setAttribute(`position`,new Z([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute(`uv`,new Z([0,2,0,0,2,0],2));let c=new Kf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new gd(s,c),u=new Jp(-1,1,1,-1,0,1),d=null,f=null,p=!1,m,h=null,g=[],_=!1;this.setSize=function(e,t){a.setSize(e,t),o.setSize(e,t);for(let n=0;n<g.length;n++){let r=g[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){g=e,_=g.length>0&&g[0].isRenderPass===!0;let t=a.width,n=a.height;for(let e=0;e<g.length;e++){let r=g[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(p||e.toneMapping===0&&g.length===0)return!1;if(h=t,t!==null){let e=t.width,n=t.height;(a.width!==e||a.height!==n)&&this.setSize(e,n)}return _===!1&&e.setRenderTarget(a),m=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return _},this.end=function(e,t){e.toneMapping=m,p=!0;let n=a,r=o;for(let i=0;i<g.length;i++){let a=g[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(d!==e.outputColorSpace||f!==e.toneMapping){d=e.outputColorSpace,f=e.toneMapping,c.defines={},q.getTransfer(d)===`srgb`&&(c.defines.SRGB_TRANSFER=``);let t=wh[f];t&&(c.defines[t]=``),c.needsUpdate=!0}c.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(h),e.render(l,u),h=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o.dispose(),s.dispose(),c.dispose()}}var Eh=new Jc,Dh=new xf(1,1),Oh=new Zc,kh=new Qc,Ah=new yf,jh=[],Mh=[],Nh=new Float32Array(16),Ph=new Float32Array(9),Fh=new Float32Array(4);function Ih(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=jh[i];if(a===void 0&&(a=new Float32Array(i),jh[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Lh(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Rh(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function zh(e,t){let n=Mh[t];n===void 0&&(n=new Int32Array(t),Mh[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Bh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Vh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Lh(n,t))return;e.uniform2fv(this.addr,t),Rh(n,t)}}function Hh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Lh(n,t))return;e.uniform3fv(this.addr,t),Rh(n,t)}}function Uh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Lh(n,t))return;e.uniform4fv(this.addr,t),Rh(n,t)}}function Wh(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Lh(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Rh(n,t)}else{if(Lh(n,r))return;Fh.set(r),e.uniformMatrix2fv(this.addr,!1,Fh),Rh(n,r)}}function Gh(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Lh(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Rh(n,t)}else{if(Lh(n,r))return;Ph.set(r),e.uniformMatrix3fv(this.addr,!1,Ph),Rh(n,r)}}function Kh(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Lh(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Rh(n,t)}else{if(Lh(n,r))return;Nh.set(r),e.uniformMatrix4fv(this.addr,!1,Nh),Rh(n,r)}}function qh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Jh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Lh(n,t))return;e.uniform2iv(this.addr,t),Rh(n,t)}}function Yh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Lh(n,t))return;e.uniform3iv(this.addr,t),Rh(n,t)}}function Xh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Lh(n,t))return;e.uniform4iv(this.addr,t),Rh(n,t)}}function Zh(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Qh(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Lh(n,t))return;e.uniform2uiv(this.addr,t),Rh(n,t)}}function $h(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Lh(n,t))return;e.uniform3uiv(this.addr,t),Rh(n,t)}}function eg(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Lh(n,t))return;e.uniform4uiv(this.addr,t),Rh(n,t)}}function tg(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Dh.compareFunction=n.isReversedDepthBuffer()?518:515,a=Dh):a=Eh,n.setTexture2D(t||a,i)}function ng(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||kh,i)}function rg(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Ah,i)}function ig(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Oh,i)}function ag(e){switch(e){case 5126:return Bh;case 35664:return Vh;case 35665:return Hh;case 35666:return Uh;case 35674:return Wh;case 35675:return Gh;case 35676:return Kh;case 5124:case 35670:return qh;case 35667:case 35671:return Jh;case 35668:case 35672:return Yh;case 35669:case 35673:return Xh;case 5125:return Zh;case 36294:return Qh;case 36295:return $h;case 36296:return eg;case 35678:case 36198:case 36298:case 36306:case 35682:return tg;case 35679:case 36299:case 36307:return ng;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return ig}}function og(e,t){e.uniform1fv(this.addr,t)}function sg(e,t){let n=Ih(t,this.size,2);e.uniform2fv(this.addr,n)}function cg(e,t){let n=Ih(t,this.size,3);e.uniform3fv(this.addr,n)}function lg(e,t){let n=Ih(t,this.size,4);e.uniform4fv(this.addr,n)}function ug(e,t){let n=Ih(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function dg(e,t){let n=Ih(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function fg(e,t){let n=Ih(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function pg(e,t){e.uniform1iv(this.addr,t)}function mg(e,t){e.uniform2iv(this.addr,t)}function hg(e,t){e.uniform3iv(this.addr,t)}function gg(e,t){e.uniform4iv(this.addr,t)}function _g(e,t){e.uniform1uiv(this.addr,t)}function vg(e,t){e.uniform2uiv(this.addr,t)}function yg(e,t){e.uniform3uiv(this.addr,t)}function bg(e,t){e.uniform4uiv(this.addr,t)}function xg(e,t,n){let r=this.cache,i=t.length,a=zh(n,i);Lh(r,a)||(e.uniform1iv(this.addr,a),Rh(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Dh:Eh;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Sg(e,t,n){let r=this.cache,i=t.length,a=zh(n,i);Lh(r,a)||(e.uniform1iv(this.addr,a),Rh(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||kh,a[e])}function Cg(e,t,n){let r=this.cache,i=t.length,a=zh(n,i);Lh(r,a)||(e.uniform1iv(this.addr,a),Rh(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Ah,a[e])}function wg(e,t,n){let r=this.cache,i=t.length,a=zh(n,i);Lh(r,a)||(e.uniform1iv(this.addr,a),Rh(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Oh,a[e])}function Tg(e){switch(e){case 5126:return og;case 35664:return sg;case 35665:return cg;case 35666:return lg;case 35674:return ug;case 35675:return dg;case 35676:return fg;case 5124:case 35670:return pg;case 35667:case 35671:return mg;case 35668:case 35672:return hg;case 35669:case 35673:return gg;case 5125:return _g;case 36294:return vg;case 36295:return yg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return xg;case 35679:case 36299:case 36307:return Sg;case 35680:case 36300:case 36308:case 36293:return Cg;case 36289:case 36303:case 36311:case 36292:return wg}}var Eg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ag(t.type)}},Dg=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Tg(t.type)}},Og=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},kg=/(\w+)(\])?(\[|\.)?/g;function Ag(e,t){e.seq.push(t),e.map[t.id]=t}function jg(e,t,n){let r=e.name,i=r.length;for(kg.lastIndex=0;;){let a=kg.exec(r),o=kg.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ag(n,l===void 0?new Eg(s,e,t):new Dg(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new Og(s),Ag(n,e)),n=e}}}var Mg=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);jg(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ng(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Pg=37297,Fg=0;function Ig(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Lg=new K;function Rg(e){q._getMatrix(Lg,q.workingColorSpace,e);let t=`mat3( ${Lg.elements.map(e=>e.toFixed(4))} )`;switch(q.getTransfer(e)){case Ws:return[t,`LinearTransferOETF`];case Gs:return[t,`sRGBTransferOETF`];default:return B(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function zg(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ig(e.getShaderSource(t),r)}else return i}function Bg(e,t){let n=Rg(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Vg={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Hg(e,t){let n=Vg[t];return n===void 0?(B(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ug=new G;function Wg(){return q.getLuminanceCoefficients(Ug),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ug.x.toFixed(4)}, ${Ug.y.toFixed(4)}, ${Ug.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Gg(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Jg).join(`
`)}function Kg(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function qg(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Jg(e){return e!==``}function Yg(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xg(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Zg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qg(e){return e.replace(Zg,e_)}var $g=new Map;function e_(e,t){let n=Q[t];if(n===void 0){let e=$g.get(t);if(e!==void 0)n=Q[e],B(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return Qg(n)}var t_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function n_(e){return e.replace(t_,r_)}function r_(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function i_(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var a_={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function o_(e){return a_[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var s_={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function c_(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:s_[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var l_={302:`ENVMAP_MODE_REFRACTION`};function u_(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:l_[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var d_={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function f_(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:d_[e.combine]||`ENVMAP_BLENDING_NONE`}function p_(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function m_(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=o_(n),l=c_(n),u=u_(n),d=f_(n),f=p_(n),p=Gg(n),m=Kg(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Jg).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Jg).join(`
`),_.length>0&&(_+=`
`)):(g=[i_(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Jg).join(`
`),_=[i_(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:Hg(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,Bg(`linearToOutputTexel`,n.outputColorSpace),Wg(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Jg).join(`
`)),o=Qg(o),o=Yg(o,n),o=Xg(o,n),s=Qg(s),s=Yg(s,n),s=Xg(s,n),o=n_(o),s=n_(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ng(i,i.VERTEX_SHADER,y),S=Ng(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=zg(i,x,`vertex`),n=zg(i,S,`fragment`);V(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):B(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Mg(i,h),T=qg(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Pg)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Fg++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var h_=0,g_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new __(e),t.set(e,n)),n}},__=class{constructor(e){this.id=h_++,this.code=e,this.usedTimes=0}};function v_(e,t,n,r,i,a){let o=new ll,s=new g_,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h){let g=u.fog,_=h.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=b&&b.mapping===306?b.image.height:null,S=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&B(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(S){let e=Vm[S];E=e.vertexShader,D=e.fragmentShader}else E=i.vertexShader,D=i.fragmentShader,s.update(i),O=s.getVertexShaderID(i),k=s.getFragmentShaderID(i);let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,N=h.isBatchedMesh===!0,ee=!!i.map,te=!!i.matcap,ne=!!b,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.dispersion>0,P=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=de&&!!i.anisotropyMap,_e=fe&&!!i.clearcoatMap,F=fe&&!!i.clearcoatNormalMap,ve=fe&&!!i.clearcoatRoughnessMap,I=P&&!!i.iridescenceMap,ye=P&&!!i.iridescenceThicknessMap,L=me&&!!i.sheenColorMap,be=me&&!!i.sheenRoughnessMap,R=!!i.specularMap,z=!!i.specularColorMap,xe=!!i.specularIntensityMap,Se=he&&!!i.transmissionMap,Ce=he&&!!i.thicknessMap,we=!!i.gradientMap,Te=!!i.alphaMap,Ee=i.alphaTest>0,De=!!i.alphaHash,Oe=!!i.extensions,ke=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ke=e.toneMapping);let Ae={shaderID:S,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:N,batchingColor:N&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Us,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:te,envMap:ne,envMapMode:ne&&b.mapping,envMapCubeUVHeight:x,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,metalnessMap:le,roughnessMap:ue,anisotropy:de,anisotropyMap:ge,clearcoat:fe,clearcoatMap:_e,clearcoatNormalMap:F,clearcoatRoughnessMap:ve,dispersion:pe,iridescence:P,iridescenceMap:I,iridescenceThicknessMap:ye,sheen:me,sheenColorMap:L,sheenRoughnessMap:be,specularMap:R,specularColorMap:z,specularIntensityMap:xe,transmission:he,transmissionMap:Se,thicknessMap:Ce,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:Ee,alphaHash:De,combine:i.combine,mapUv:ee&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:oe&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:le&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:F&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:I&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:L&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:be&&m(i.sheenRoughnessMap.channel),specularMapUv:R&&m(i.specularMap.channel),specularColorMapUv:z&&m(i.specularColorMap.channel),specularIntensityMapUv:xe&&m(i.specularIntensityMap.channel),transmissionMapUv:Se&&m(i.transmissionMap.channel),thicknessMapUv:Ce&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(oe||de),vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!_.attributes.uv&&(ee||Te),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:h.isSkinnedMesh===!0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:ke,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&q.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&q.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Oe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Oe&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Vm[t];n=Hf.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new m_(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function y_(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function b_(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function x_(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function S_(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||b_),r.length>1&&r.sort(t||x_),i.length>1&&i.sort(t||x_)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function C_(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new S_,e.set(t,[i])):n>=r.length?(i=new S_,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function w_(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new G,color:new X};break;case`SpotLight`:n={position:new G,direction:new G,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new X,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new X,groundColor:new X};break;case`RectAreaLight`:n={color:new X,position:new G,halfWidth:new G,halfHeight:new G};break}return e[t.id]=n,n}}}function T_(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var E_=0;function D_(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function O_(e){let t=new w_,n=T_(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new Y,o=new Y;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(D_);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=E_++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function k_(e){let t=new O_(e),n=[],r=[];function i(e){l.camera=e,n.length=0,r.length=0}function a(e){n.push(e)}function o(e){r.push(e)}function s(){t.setup(n)}function c(e){t.setupView(n,e)}let l={lightsArray:n,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function A_(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new k_(e),t.set(n,[a])):r>=i.length?(a=new k_(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var j_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,M_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,N_=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],P_=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],F_=new Y,I_=new G,L_=new G;function R_(e,t,n){let r=new Xd,i=new W,a=new W,o=new J,s=new Zf,c=new Qf,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Gf({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:j_,fragmentShader:M_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ou;m.setAttribute(`position`,new mu(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new gd(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(B(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){B(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){B(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Xc(i.x,i.y,{format:Jo,type:Fo,minFilter:To,magFilter:To,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new xf(i.x,i.y,Po),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Wo,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=So,d.map.depthTexture.magFilter=So}else l.isPointLight?(d.map=new gh(i.x),d.map.depthTexture=new Sf(i.x,No)):(d.map=new Xc(i.x,i.y),d.map.depthTexture=new xf(i.x,i.y,No)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Wo,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=To,d.map.depthTexture.magFilter=To):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=So,d.map.depthTexture.magFilter=So);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),I_.setFromMatrixPosition(l.matrixWorld),e.position.copy(I_),L_.copy(e.position),L_.add(N_[t]),e.up.copy(P_[t]),e.lookAt(L_),e.updateMatrixWorld(),n.makeTranslation(-I_.x,-I_.y,-I_.z),F_.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(F_,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Xc(i.x,i.y,{format:Jo,type:Fo})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function z_(e,t){function n(){let t=!1,n=new J,r=null,i=new J(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?le(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ac[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?le(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new X(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,A=null,j=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,ee=e.getParameter(e.VERSION);ee.indexOf(`WebGL`)===-1?ee.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(ee)[1]),M=N>=1);let te=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new J().fromArray(re),oe=new J().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),le(e.DEPTH_TEST),o.setFunc(3),_e(!1),F(1),le(e.CULL_FACE),he(0);function le(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return d[t]===n?!1:(e.bindFramebuffer(t,n),d[t]=n,t===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=p,i=!1;if(t){r=f.get(n),r===void 0&&(r=[],f.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return m===t?!1:(e.useProgram(t),m=t,!0)}let P={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};P[103]=e.MIN,P[104]=e.MAX;let me={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function he(t,n,r,i,a,o,s,c,l,u){if(t===0){h===!0&&(ue(e.BLEND),h=!1);return}if(h===!1&&(le(e.BLEND),h=!0),t!==5){if(t!==g||u!==T){if((_!==100||b!==100)&&(e.blendEquation(e.FUNC_ADD),_=100,b=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t);break}v=null,y=null,x=null,S=null,C.set(0,0,0),w=0,g=t,T=u}return}a||=n,o||=r,s||=i,(n!==_||a!==b)&&(e.blendEquationSeparate(P[n],P[a]),_=n,b=a),(r!==v||i!==y||o!==x||s!==S)&&(e.blendFuncSeparate(me[r],me[i],me[o],me[s]),v=r,y=i,x=o,S=s),(c.equals(C)===!1||l!==w)&&(e.blendColor(c.r,c.g,c.b,l),C.copy(c),w=l),g=t,T=!1}function ge(t,n){t.side===2?ue(e.CULL_FACE):le(e.CULL_FACE);let r=t.side===1;n&&(r=!r),_e(r),t.blending===1&&t.transparent===!1?he(0):he(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),I(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function _e(t){E!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),E=t)}function F(t){t===0?ue(e.CULL_FACE):(le(e.CULL_FACE),t!==D&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),D=t}function ve(t){t!==O&&(M&&e.lineWidth(t),O=t)}function I(t,n,r){t?(le(e.POLYGON_OFFSET_FILL),(k!==n||A!==r)&&(k=n,A=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function ye(t){t?le(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function L(t){t===void 0&&(t=e.TEXTURE0+j-1),te!==t&&(e.activeTexture(t),te=t)}function be(t,n,r){r===void 0&&(r=te===null?e.TEXTURE0+j-1:te);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(te!==r&&(e.activeTexture(r),te=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function R(){let t=ne[te];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function z(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function xe(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Se(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ce(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ee(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function ke(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ae(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function je(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Me(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ne(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Pe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},te=null,ne={},d={},f=new WeakMap,p=[],m=null,h=!1,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=new X(0,0,0),w=0,T=!1,E=null,D=null,O=null,k=null,A=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:le,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:he,setMaterial:ge,setFlipSided:_e,setCullFace:F,setLineWidth:ve,setPolygonOffset:I,setScissorTest:ye,activeTexture:L,bindTexture:be,unbindTexture:R,compressedTexImage2D:z,compressedTexImage3D:xe,texImage2D:Oe,texImage3D:ke,updateUBOMapping:Me,uniformBlockBinding:Ne,texStorage2D:Ee,texStorage3D:De,texSubImage2D:Se,texSubImage3D:Ce,compressedTexSubImage2D:we,compressedTexSubImage3D:Te,scissor:Ae,viewport:je,reset:Pe}}function B_(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new W,u=new WeakMap,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function m(e,t){return p?new OffscreenCanvas(e,t):Zs(`canvas`)}function h(e,t,n){let r=1,i=be(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);d===void 0&&(d=m(n,a));let o=t?m(n,a):d;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),B(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&B(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function g(e){return e.generateMipmaps}function _(t){e.generateMipmap(t)}function v(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function y(n,r,i,a,o=!1){if(n!==null){if(e[n]!==void 0)return e[n];B(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let s=r;if(r===e.RED&&(i===e.FLOAT&&(s=e.R32F),i===e.HALF_FLOAT&&(s=e.R16F),i===e.UNSIGNED_BYTE&&(s=e.R8)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.R8UI),i===e.UNSIGNED_SHORT&&(s=e.R16UI),i===e.UNSIGNED_INT&&(s=e.R32UI),i===e.BYTE&&(s=e.R8I),i===e.SHORT&&(s=e.R16I),i===e.INT&&(s=e.R32I)),r===e.RG&&(i===e.FLOAT&&(s=e.RG32F),i===e.HALF_FLOAT&&(s=e.RG16F),i===e.UNSIGNED_BYTE&&(s=e.RG8)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RG8UI),i===e.UNSIGNED_SHORT&&(s=e.RG16UI),i===e.UNSIGNED_INT&&(s=e.RG32UI),i===e.BYTE&&(s=e.RG8I),i===e.SHORT&&(s=e.RG16I),i===e.INT&&(s=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGB8UI),i===e.UNSIGNED_SHORT&&(s=e.RGB16UI),i===e.UNSIGNED_INT&&(s=e.RGB32UI),i===e.BYTE&&(s=e.RGB8I),i===e.SHORT&&(s=e.RGB16I),i===e.INT&&(s=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(s=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(s=e.RGBA16UI),i===e.UNSIGNED_INT&&(s=e.RGBA32UI),i===e.BYTE&&(s=e.RGBA8I),i===e.SHORT&&(s=e.RGBA16I),i===e.INT&&(s=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_INT_5_9_9_9_REV&&(s=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(s=e.R11F_G11F_B10F)),r===e.RGBA){let t=o?Ws:q.getTransfer(a);i===e.FLOAT&&(s=e.RGBA32F),i===e.HALF_FLOAT&&(s=e.RGBA16F),i===e.UNSIGNED_BYTE&&(s=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT_4_4_4_4&&(s=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(s=e.RGB5_A1)}return(s===e.R16F||s===e.R32F||s===e.RG16F||s===e.RG32F||s===e.RGBA16F||s===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),s}function b(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,B(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function x(e,t){return g(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function S(e){let t=e.target;t.removeEventListener(`dispose`,S),w(t),t.isVideoTexture&&u.delete(t)}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),E(t)}function w(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=f.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&T(e),Object.keys(i).length===0&&f.delete(n)}r.remove(e)}function T(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=f.get(i);delete a[n.__cacheKey],o.memory.textures--}function E(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let D=0;function O(){D=0}function k(){let e=D;return e>=i.maxTextures&&B(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),D+=1,e}function A(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function j(t,i){let a=r.get(t);if(t.isVideoTexture&&ye(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)B(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)B(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ce(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function M(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){ce(a,t,i);return}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function N(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){ce(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ee(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){le(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let te={[yo]:e.REPEAT,[bo]:e.CLAMP_TO_EDGE,[xo]:e.MIRRORED_REPEAT},ne={[So]:e.NEAREST,[Co]:e.NEAREST_MIPMAP_NEAREST,[wo]:e.NEAREST_MIPMAP_LINEAR,[To]:e.LINEAR,[Eo]:e.LINEAR_MIPMAP_NEAREST,[Do]:e.LINEAR_MIPMAP_LINEAR},re={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ie(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&B(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,te[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,te[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,te[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ne[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ne[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,re[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ae(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,S));let i=n.source,a=f.get(i);a===void 0&&(a={},f.set(i,a));let s=A(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&T(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function oe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=oe(n.start,r.width,4),c=oe(t.start,r.width,4);n.start<=i+1&&a===c&&oe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=e.getParameter(e.UNPACK_ROW_LENGTH),l=e.getParameter(e.UNPACK_SKIP_PIXELS),u=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;e.pixelStorei(e.UNPACK_SKIP_PIXELS,u),e.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,c),e.pixelStorei(e.UNPACK_SKIP_PIXELS,l),e.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ce(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ae(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){n.activeTexture(e.TEXTURE0+s);let t=q.getPrimaries(q.workingColorSpace),r=o.colorSpace===``?null:q.getPrimaries(o.colorSpace),f=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,f);let p=h(o.image,!1,i.maxTextureSize);p=L(o,p);let m=a.convert(o.format,o.colorSpace),v=a.convert(o.type),S=y(o.internalFormat,m,v,o.colorSpace,o.isVideoTexture);ie(c,o);let C,w=o.mipmaps,T=o.isVideoTexture!==!0,E=d.__version===void 0||l===!0,D=u.dataReady,O=x(o,p);if(o.isDepthTexture)S=b(o.format===Go,o.type),E&&(T?n.texStorage2D(e.TEXTURE_2D,1,S,p.width,p.height):n.texImage2D(e.TEXTURE_2D,0,S,p.width,p.height,0,m,v,null));else if(o.isDataTexture)if(w.length>0){T&&E&&n.texStorage2D(e.TEXTURE_2D,O,S,w[0].width,w[0].height);for(let t=0,r=w.length;t<r;t++)C=w[t],T?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,C.width,C.height,m,v,C.data):n.texImage2D(e.TEXTURE_2D,t,S,C.width,C.height,0,m,v,C.data);o.generateMipmaps=!1}else T?(E&&n.texStorage2D(e.TEXTURE_2D,O,S,p.width,p.height),D&&se(o,p,m,v)):n.texImage2D(e.TEXTURE_2D,0,S,p.width,p.height,0,m,v,p.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){T&&E&&n.texStorage3D(e.TEXTURE_2D_ARRAY,O,S,w[0].width,w[0].height,p.depth);for(let t=0,r=w.length;t<r;t++)if(C=w[t],o.format!==1023)if(m!==null)if(T){if(D)if(o.layerUpdates.size>0){let r=Lm(C.width,C.height,o.format,o.type);for(let i of o.layerUpdates){let a=C.data.subarray(i*r/C.data.BYTES_PER_ELEMENT,(i+1)*r/C.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,i,C.width,C.height,1,m,a)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,C.width,C.height,p.depth,m,C.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,t,S,C.width,C.height,p.depth,0,C.data,0,0);else B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else T?D&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,t,0,0,0,C.width,C.height,p.depth,m,v,C.data):n.texImage3D(e.TEXTURE_2D_ARRAY,t,S,C.width,C.height,p.depth,0,m,v,C.data)}else{T&&E&&n.texStorage2D(e.TEXTURE_2D,O,S,w[0].width,w[0].height);for(let t=0,r=w.length;t<r;t++)C=w[t],o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,C.width,C.height,m,v,C.data):n.texImage2D(e.TEXTURE_2D,t,S,C.width,C.height,0,m,v,C.data):m===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,C.width,C.height,m,C.data):n.compressedTexImage2D(e.TEXTURE_2D,t,S,C.width,C.height,0,C.data)}else if(o.isDataArrayTexture)if(T){if(E&&n.texStorage3D(e.TEXTURE_2D_ARRAY,O,S,p.width,p.height,p.depth),D)if(o.layerUpdates.size>0){let t=Lm(p.width,p.height,o.format,o.type);for(let r of o.layerUpdates){let i=p.data.subarray(r*t/p.data.BYTES_PER_ELEMENT,(r+1)*t/p.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,r,p.width,p.height,1,m,v,i)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,p.width,p.height,p.depth,m,v,p.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,S,p.width,p.height,p.depth,0,m,v,p.data);else if(o.isData3DTexture)T?(E&&n.texStorage3D(e.TEXTURE_3D,O,S,p.width,p.height,p.depth),D&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,p.width,p.height,p.depth,m,v,p.data)):n.texImage3D(e.TEXTURE_3D,0,S,p.width,p.height,p.depth,0,m,v,p.data);else if(o.isFramebufferTexture){if(E)if(T)n.texStorage2D(e.TEXTURE_2D,O,S,p.width,p.height);else{let t=p.width,r=p.height;for(let i=0;i<O;i++)n.texImage2D(e.TEXTURE_2D,i,S,t,r,0,m,v,null),t>>=1,r>>=1}}else if(w.length>0){if(T&&E){let t=be(w[0]);n.texStorage2D(e.TEXTURE_2D,O,S,t.width,t.height)}for(let t=0,r=w.length;t<r;t++)C=w[t],T?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m,v,C):n.texImage2D(e.TEXTURE_2D,t,S,m,v,C);o.generateMipmaps=!1}else if(T){if(E){let t=be(p);n.texStorage2D(e.TEXTURE_2D,O,S,t.width,t.height)}D&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,m,v,p)}else n.texImage2D(e.TEXTURE_2D,0,S,m,v,p);g(o)&&_(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function le(t,o,s){if(o.image.length!==6)return;let c=ae(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=q.getPrimaries(q.workingColorSpace),r=o.colorSpace===``?null:q.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=h(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=L(o,m[e]);let v=m[0],b=a.convert(o.format,o.colorSpace),S=a.convert(o.type),C=y(o.internalFormat,b,S,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=x(o,v);ie(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,v.width,v.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,b,S,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,b,S,i.data):b===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,b,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=be(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,b,S,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,b,S,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,b,S,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,b,S,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,b,S,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,b,S,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,b,S,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,b,S,i.image[t])}}}g(o)&&_(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=y(o.internalFormat,d,f,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,ve(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function de(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=b(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;I(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ve(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ve(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=y(o.internalFormat,c,l,o.colorSpace);I(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ve(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ve(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function fe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,S)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ie(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else j(i.depthTexture,0);let u=l.__webglTexture,d=ve(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)I(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`Unknown depthTexture format`)}function pe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer)if(a)for(let e=0;e<6;e++)fe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?fe(i.__webglFramebuffer[0],t,0):fe(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),de(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),de(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function P(t,n,i){let a=r.get(t);n!==void 0&&ue(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&pe(t)}function me(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,C);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&I(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=y(r.internalFormat,i,o,r.colorSpace,t.isXRRenderTarget===!0),u=ve(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),de(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ie(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ue(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ue(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);g(i)&&_(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ie(c,a),ue(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),g(a)&&_(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ie(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ue(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ue(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);g(i)&&_(r),n.unbindTexture()}t.depthBuffer&&pe(t)}function he(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(g(a)){let t=v(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),_(t),n.unbindTexture()}}}let ge=[],_e=[];function F(t){if(t.samples>0){if(I(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ge.length=0,_e.length=0,ge.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(ge.push(l),_e.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,_e)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ge))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function ve(e){return Math.min(i.maxSamples,e.samples)}function I(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function ye(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function L(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(q.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&B(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function be(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=M,this.setTexture3D=N,this.setTextureCube=ee,this.rebindTextures=P,this.setupRenderTarget=me,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=I,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function V_(e,t){function n(n,r=``){let i,a=q.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var H_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,W_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Cf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Gf({vertexShader:H_,fragmentShader:U_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gd(new Nf(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},G_=class extends oc{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new W_,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new W,C=null,w=new Up;w.viewport=new J;let T=new Up;T.viewport=new J;let E=[w,T],D=new am,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Ol,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Ol,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Ol,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function j(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,j),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,j),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Go:Wo,a=_.stencil?Ro:No);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Xc(d.textureWidth,d.textureHeight,{format:Uo,type:Oo,depthTexture:new xf(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Xc(f.framebufferWidth,f.framebufferHeight,{format:Uo,type:Oo,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),oe.setContext(r),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let N=new G,ee=new G;function te(e,t,n){N.setFromMatrixPosition(t.matrixWorld),ee.setFromMatrixPosition(n.matrixWorld);let r=N.distanceTo(ee),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ne(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;ne(D,i);for(let e=0;e<a.length;e++)ne(a[e],i);a.length===2?te(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),re(e,D,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=uc*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new Up,o.layers.enable(n),o.viewport=new J,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Cf,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let oe=new zm;oe.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},K_=new cl,q_=new Y;function J_(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Vf(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,K_.copy(o),K_.x*=-1,K_.y*=-1,K_.z*=-1,a.isCubeTexture&&a.isRenderTargetTexture===!1&&(K_.y*=-1,K_.z*=-1),e.envMapRotation.value.setFromMatrix4(q_.makeRotationFromEuler(K_)),e.flipEnvMap.value=a.isCubeTexture&&a.isRenderTargetTexture===!1?-1:1,e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Y_(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return V(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?B(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):B(`WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var X_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Z_=null;function Q_(){return Z_===null&&(Z_=new Ad(X_,16,16,Jo,Fo),Z_.name=`DFG_LUT`,Z_.minFilter=To,Z_.magFilter=To,Z_.wrapS=bo,Z_.wrapT=bo,Z_.generateMipmaps=!1,Z_.needsUpdate=!0),Z_}var $_=class{constructor(e={}){let{canvas:t=Qs(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Oo}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Xo,Yo,qo]),g=new Set([Oo,No,jo,Ro,Io,Lo]),_=new Uint32Array(4),v=new Int32Array(4),y=null,b=null,x=[],S=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let w=this,T=!1;this._outputColorSpace=Hs;let E=0,D=0,O=null,k=-1,A=null,j=new J,M=new J,N=null,ee=new X(0),te=0,ne=t.width,re=t.height,ie=1,ae=null,oe=null,se=new J(0,0,ne,re),ce=new J(0,0,ne,re),le=!1,ue=new Xd,de=!1,fe=!1,pe=new Y,P=new G,me=new J,he={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ge=!1;function _e(){return O===null?ie:1}let F=n;function ve(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r183`),t.addEventListener(`webglcontextlost`,Be,!1),t.addEventListener(`webglcontextrestored`,Ve,!1),t.addEventListener(`webglcontextcreationerror`,He,!1),F===null){let t=`webgl2`;if(F=ve(t,e),F===null)throw ve(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw V(`WebGLRenderer: `+e.message),e}let I,ye,L,be,R,z,xe,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le;function Re(){I=new vh(F),I.init(),Fe=new V_(F,I),ye=new Jm(F,I,e,Fe),L=new z_(F,I),ye.reversedDepthBuffer&&d&&L.buffers.depth.setReversed(!0),be=new xh(F),R=new y_,z=new B_(F,I,L,R,ye,Fe,be),xe=new _h(w),Se=new Bm(F),Ie=new Km(F,Se),Ce=new yh(F,Se,be,Ie),we=new Ch(F,Ce,Se,Ie,be),Me=new Sh(F,ye,z),ke=new Ym(R),Te=new v_(w,xe,I,ye,Ie,ke),Ee=new J_(w,R),De=new C_,Oe=new A_(I),je=new Gm(w,xe,L,we,p,s),Ae=new R_(w,we,ye),Le=new Y_(F,be,ye,L),Ne=new qm(F,I,be),Pe=new bh(F,I,be),be.programs=Te.programs,w.capabilities=ye,w.extensions=I,w.properties=R,w.renderLists=De,w.shadowMap=Ae,w.state=L,w.info=be}Re(),m!==1009&&(C=new Th(m,t.width,t.height,r,i));let ze=new G_(w,F);this.xr=ze,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=I.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=I.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(e){e!==void 0&&(ie=e,this.setSize(ne,re,!1))},this.getSize=function(e){return e.set(ne,re)},this.setSize=function(e,n,r=!0){if(ze.isPresenting){B(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ne=e,re=n,t.width=Math.floor(e*ie),t.height=Math.floor(n*ie),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ne*ie,re*ie).floor()},this.setDrawingBufferSize=function(e,n,r){ne=e,re=n,ie=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){console.error(`THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){console.warn(`THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}C.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(j)},this.getViewport=function(e){return e.copy(se)},this.setViewport=function(e,t,n,r){e.isVector4?se.set(e.x,e.y,e.z,e.w):se.set(e,t,n,r),L.viewport(j.copy(se).multiplyScalar(ie).round())},this.getScissor=function(e){return e.copy(ce)},this.setScissor=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),L.scissor(M.copy(ce).multiplyScalar(ie).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(e){L.setScissorTest(le=e)},this.setOpaqueSort=function(e){ae=e},this.setTransparentSort=function(e){oe=e},this.getClearColor=function(e){return e.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(O!==null){let t=O.texture.format;e=h.has(t)}if(e){let e=O.texture.type,t=g.has(e),n=je.getClearColor(),r=je.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,F.clearBufferuiv(F.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,F.clearBufferiv(F.COLOR,0,v))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Be,!1),t.removeEventListener(`webglcontextrestored`,Ve,!1),t.removeEventListener(`webglcontextcreationerror`,He,!1),je.dispose(),De.dispose(),Oe.dispose(),R.dispose(),xe.dispose(),we.dispose(),Ie.dispose(),Le.dispose(),Te.dispose(),ze.dispose(),ze.removeEventListener(`sessionstart`,Ye),ze.removeEventListener(`sessionend`,Xe),Ze.stop()};function Be(e){e.preventDefault(),tc(`WebGLRenderer: Context Lost.`),T=!0}function Ve(){tc(`WebGLRenderer: Context Restored.`),T=!1;let e=be.autoReset,t=Ae.enabled,n=Ae.autoUpdate,r=Ae.needsUpdate,i=Ae.type;Re(),be.autoReset=e,Ae.enabled=t,Ae.autoUpdate=n,Ae.needsUpdate=r,Ae.type=i}function He(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ue(e){let t=e.target;t.removeEventListener(`dispose`,Ue),We(t)}function We(e){Ge(e),R.remove(e)}function Ge(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){Te.releaseProgram(e)}),e.isShaderMaterial&&Te.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=he);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=ot(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ce.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ie.setup(i,r,s,n,c);let h,g=Ne;if(c!==null&&(h=Se.get(c),g=Pe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*_e()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*_e()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh)if(i._multiDrawInstances!==null)rc(`WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection.`),g.renderMultiDrawInstances(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount,i._multiDrawInstances);else if(I.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Se.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Ke(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,rt(e,t,n),e.side=0,e.needsUpdate=!0,rt(e,t,n),e.side=2):rt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),b=Oe.get(n),b.init(t),S.push(b),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(b.pushLight(e),e.castShadow&&b.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(b.pushLight(e),e.castShadow&&b.pushShadow(e))}),b.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Ke(a,n,e),r.add(a)}else Ke(t,n,e),r.add(t)}),b=S.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){R.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}I.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let qe=null;function Je(e){qe&&qe(e)}function Ye(){Ze.stop()}function Xe(){Ze.start()}let Ze=new zm;Ze.setAnimationLoop(Je),typeof self<`u`&&Ze.setContext(self),this.setAnimationLoop=function(e){qe=e,ze.setAnimationLoop(e),e===null?Ze.stop():Ze.start()},ze.addEventListener(`sessionstart`,Ye),ze.addEventListener(`sessionend`,Xe),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(T===!0)return;let n=ze.enabled===!0&&ze.isPresenting===!0,r=C!==null&&(O===null||n)&&C.begin(w,O);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(t),t=ze.getCamera()),e.isScene===!0&&e.onBeforeRender(w,e,t,O),b=Oe.get(e,S.length),b.init(t),S.push(b),pe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ue.setFromProjectionMatrix(pe,Js,t.reversedDepth),fe=this.localClippingEnabled,de=ke.init(this.clippingPlanes,fe),y=De.get(e,x.length),y.init(),x.push(y),ze.enabled===!0&&ze.isPresenting===!0){let e=w.xr.getDepthSensingMesh();e!==null&&Qe(e,t,-1/0,w.sortObjects)}Qe(e,t,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(ae,oe),ge=ze.enabled===!1||ze.isPresenting===!1||ze.hasDepthSensing()===!1,ge&&je.addToRenderList(y,e),this.info.render.frame++,de===!0&&ke.beginShadows();let i=b.state.shadowsArray;if(Ae.render(i,e,t),de===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),(r&&C.hasRenderPass())===!1){let n=y.opaque,r=y.transmissive;if(b.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];et(n,r,e,a)}ge&&je.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];$e(y,e,n,n.viewport)}}else r.length>0&&et(n,r,e,t),ge&&je.render(e),$e(y,e,t)}O!==null&&D===0&&(z.updateMultisampleRenderTarget(O),z.updateRenderTargetMipmap(O)),r&&C.end(w),e.isScene===!0&&e.onAfterRender(w,e,t),Ie.resetDefaultState(),k=-1,A=null,S.pop(),S.length>0?(b=S[S.length-1],de===!0&&ke.setGlobalState(w.clippingPlanes,b.state.camera)):b=null,x.pop(),y=x.length>0?x[x.length-1]:null};function Qe(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)b.pushLight(e),e.castShadow&&b.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ue.intersectsSprite(e)){r&&me.setFromMatrixPosition(e.matrixWorld).applyMatrix4(pe);let t=we.update(e),i=e.material;i.visible&&y.push(e,t,i,n,me.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||ue.intersectsObject(e))){let t=we.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),me.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),me.copy(e.boundingSphere.center)),me.applyMatrix4(e.matrixWorld).applyMatrix4(pe)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&y.push(e,t,s,n,me.z,o)}}else i.visible&&y.push(e,t,i,n,me.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Qe(i[e],t,n,r)}function $e(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;b.setupLightsView(n),de===!0&&ke.setGlobalState(w.clippingPlanes,n),r&&L.viewport(j.copy(r)),i.length>0&&tt(i,t,n),a.length>0&&tt(a,t,n),o.length>0&&tt(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function et(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[r.id]===void 0){let e=I.has(`EXT_color_buffer_half_float`)||I.has(`EXT_color_buffer_float`);b.state.transmissionRenderTarget[r.id]=new Xc(1,1,{generateMipmaps:!0,type:e?Fo:Oo,minFilter:Do,samples:Math.max(4,ye.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:q.workingColorSpace})}let a=b.state.transmissionRenderTarget[r.id],o=r.viewport||j;a.setSize(o.z*w.transmissionResolutionScale,o.w*w.transmissionResolutionScale);let s=w.getRenderTarget(),c=w.getActiveCubeFace(),l=w.getActiveMipmapLevel();w.setRenderTarget(a),w.getClearColor(ee),te=w.getClearAlpha(),te<1&&w.setClearColor(16777215,.5),w.clear(),ge&&je.render(n);let u=w.toneMapping;w.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),b.setupLightsView(r),de===!0&&ke.setGlobalState(w.clippingPlanes,r),tt(e,n,r),z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a),I.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,nt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a))}w.setRenderTarget(s,c,l),w.setClearColor(ee,te),d!==void 0&&(r.viewport=d),w.toneMapping=u}function tt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&nt(o,t,n,s,l,c)}}function nt(e,t,n,r,i,a){e.onBeforeRender(w,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(w,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,w.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,w.renderBufferDirect(n,t,r,i,e,a),i.side=2):w.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(w,t,n,r,i,a)}function rt(e,t,n){t.isScene!==!0&&(t=he);let r=R.get(e),i=b.state.lights,a=b.state.shadowsArray,o=i.state.version,s=Te.getParameters(e,i.state,a,t,n),c=Te.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=xe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ue),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return at(e,s),d}else s.uniforms=Te.getUniforms(e),e.onBeforeCompile(s,w),d=Te.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=ke.uniform),at(e,s),r.needsLights=ct(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.currentProgram=d,r.uniformsList=null,d}function it(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Mg.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function at(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ot(e,t,n,r,i){t.isScene!==!0&&(t=he),z.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=O===null?w.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Us,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=xe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(h=w.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=R.get(r),y=b.state.lights;if(de===!0&&(fe===!0||e!==A)){let t=e===A&&r.id===k;ke.setState(r,e,t)}let x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?x=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?x=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==ke.numPlanes||v.numIntersection!==ke.numIntersection)?x=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h?v.morphTargetsCount!==_&&(x=!0):x=!0:x=!0:x=!0:(x=!0,v.__version=r.version);let S=v.currentProgram;x===!0&&(S=rt(r,t,i));let C=!1,T=!1,E=!1,D=S.getUniforms(),j=v.uniforms;if(L.useProgram(S.program)&&(C=!0,T=!0,E=!0),r.id!==k&&(k=r.id,T=!0),C||A!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(F,`projectionMatrix`,e.projectionMatrix),D.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=D.map.cameraPosition;t!==void 0&&t.setValue(F,P.setFromMatrixPosition(e.matrixWorld)),ye.logarithmicDepthBuffer&&D.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&D.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),A!==e&&(A=e,T=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&D.setValue(F,`directionalShadowMap`,y.state.directionalShadowMap,z),y.state.spotShadowMap.length>0&&D.setValue(F,`spotShadowMap`,y.state.spotShadowMap,z),y.state.pointShadowMap.length>0&&D.setValue(F,`pointShadowMap`,y.state.pointShadowMap,z)),i.isSkinnedMesh){D.setOptional(F,i,`bindMatrix`),D.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),D.setValue(F,`boneTexture`,e.boneTexture,z))}i.isBatchedMesh&&(D.setOptional(F,i,`batchingTexture`),D.setValue(F,`batchingTexture`,i._matricesTexture,z),D.setOptional(F,i,`batchingIdTexture`),D.setValue(F,`batchingIdTexture`,i._indirectTexture,z),D.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&D.setValue(F,`batchingColorTexture`,i._colorsTexture,z));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Me.update(i,n,S),(T||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,D.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=Q_()),T&&(D.setValue(F,`toneMappingExposure`,w.toneMappingExposure),v.needsLights&&st(j,E),a&&r.fog===!0&&Ee.refreshFogUniforms(j,a),Ee.refreshMaterialUniforms(j,r,ie,re,b.state.transmissionRenderTarget[e.id]),Mg.upload(F,it(v),j,z)),r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Mg.upload(F,it(v),j,z),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&D.setValue(F,`center`,i.center),D.setValue(F,`modelViewMatrix`,i.modelViewMatrix),D.setValue(F,`normalMatrix`,i.normalMatrix),D.setValue(F,`modelMatrix`,i.matrixWorld),r.isShaderMaterial||r.isRawShaderMaterial){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Le.update(n,S),Le.bind(n,S)}}return S}function st(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ct(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let lt=F.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){O=e,E=t,D=n;let r=null,i=!1,a=!1;if(e){let o=R.get(e);if(o.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),j.copy(e.viewport),M.copy(e.scissor),N=e.scissorTest,L.viewport(j),L.scissor(M),L.setScissorTest(N),k=-1;return}else if(o.__webglFramebuffer===void 0)z.setupRenderTarget(e);else if(o.__hasExternalTextures)z.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);z.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&z.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,j.copy(e.viewport),M.copy(e.scissor),N=e.scissorTest}else j.copy(se).multiplyScalar(ie).floor(),M.copy(ce).multiplyScalar(ie).floor(),N=le;if(n!==0&&(r=lt),L.bindFramebuffer(F.FRAMEBUFFER,r)&&L.drawBuffers(e,r),L.viewport(j),L.scissor(M),L.setScissorTest(N),i){let r=R.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}k=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){L.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s),!ye.textureFormatReadable(c)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!ye.textureTypeReadable(l)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,Fe.convert(c),Fe.convert(l),a)}finally{let e=O===null?null:R.get(O).__webglFramebuffer;L.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s),!ye.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!ye.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,d),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,Fe.convert(l),Fe.convert(u),0);let f=O===null?null:R.get(O).__webglFramebuffer;L.bindFramebuffer(F.FRAMEBUFFER,f);let p=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await ic(F,p,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,d),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.deleteBuffer(d),F.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;z.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()};let ut=F.createFramebuffer(),dt=F.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Fe.convert(t.format),_=Fe.convert(t.type),v;t.isData3DTexture?(z.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(z.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(z.setTexture2D(t,0),v=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(F.UNPACK_ROW_LENGTH),b=F.getParameter(F.UNPACK_IMAGE_HEIGHT),x=F.getParameter(F.UNPACK_SKIP_PIXELS),S=F.getParameter(F.UNPACK_SKIP_ROWS),C=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,l),F.pixelStorei(F.UNPACK_SKIP_ROWS,u),F.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,o,s,f,p,o,s,F.DEPTH_BUFFER_BIT,F.NEAREST);L.bindFramebuffer(F.READ_FRAMEBUFFER,null),L.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(F.READ_FRAMEBUFFER,ut),L.bindFramebuffer(F.DRAW_FRAMEBUFFER,dt);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,o,s,f,p,o,s,F.COLOR_BUFFER_BIT,F.NEAREST);L.bindFramebuffer(F.READ_FRAMEBUFFER,null),L.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(F.UNPACK_ROW_LENGTH,y),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(F.UNPACK_SKIP_PIXELS,x),F.pixelStorei(F.UNPACK_SKIP_ROWS,S),F.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&F.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&z.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?z.setTextureCube(e,0):e.isData3DTexture?z.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?z.setTexture2DArray(e,0):z.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){E=0,D=0,O=null,L.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Js}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=q._getDrawingBufferColorSpace(e),t.unpackColorSpace=q._getUnpackColorSpace()}},ev=65535,tv=65535,nv=127,rv=255;function iv(e){let t=1/0,n=1/0,r=1/0,i=-1/0,a=-1/0,o=-1/0;for(let s of e)for(let e=0;e<s.length;e+=3){let c=s[e],l=s[e+1],u=s[e+2];c<t&&(t=c),l<n&&(n=l),u<r&&(r=u),c>i&&(i=c),l>a&&(a=l),u>o&&(o=u)}if(!Number.isFinite(t))return{x:0,y:0,z:0,scale:1};let s=Math.max(i-t,a-n,o-r)||1;return{x:t,y:n,z:r,scale:s}}function av(e){return ev/e.scale}function ov(e,t,n){let r=Math.round((e-t)*n);return r<0?0:r>ev?ev:r}function sv(e){let t=Math.round(e*tv);return t<0?0:t>tv?tv:t}function cv(e){let t=Math.round(e*nv);return t<-127?-127:t>nv?nv:t}function lv(e){let t=Math.round(e*rv);return t<0?0:t>rv?rv:t}function uv(e,t){e.setAttribute(`position`,new mu(t.positions,3,!0)),e.setAttribute(`normal`,new mu(t.normals,3,!0)),e.setAttribute(`uv`,new mu(t.uvs,2,!0)),e.setAttribute(`color`,new mu(t.colors,3,!0))}function dv(e,t){e.position.set(t.x,t.y,t.z),e.scale.setScalar(t.scale)}function fv(e,t){let n=new Map,r=[];for(let i of e){let e=t.blockRect(i.descriptor.texture);if(!e||!pv(i.uvs)){r.push(i);continue}let a=i.descriptor.doubleSided===!0,o=n.get(a);o||n.set(a,o=[]),o.push({bucket:i,rect:e})}let i=[];for(let[e,r]of n){let{geometry:n,frame:a}=mv(r),o=new gd(n,t.blockMaterial(e));dv(o,a),o.castShadow=!0,o.receiveShadow=!0,i.push(o)}return{meshes:i,leftovers:r}}function pv(e){for(let t=0;t<e.length;t++)if(e[t]<-1e-4||e[t]>1.0001)return!1;return!0}function mv(e){let t=0;for(let{bucket:n}of e)t+=n.positions.length/3;let n=iv(e.map(({bucket:e})=>e.positions)),r=av(n),i=new Uint16Array(t*3),a=new Int8Array(t*3),o=new Uint16Array(t*2),s=new Uint8Array(t*3),c=e.some(({bucket:e})=>e.steps!==void 0)?new Float32Array(t):null,l=0;for(let{bucket:t,rect:u}of e){let e=t.positions.length/3;for(let d=0;d<e;d++){let e=d*3,f=(l+d)*3;i[f]=ov(t.positions[e],n.x,r),i[f+1]=ov(t.positions[e+1],n.y,r),i[f+2]=ov(t.positions[e+2],n.z,r),a[f]=cv(t.normals[e]),a[f+1]=cv(t.normals[e+1]),a[f+2]=cv(t.normals[e+2]),s[f]=lv(t.colors[e]),s[f+1]=lv(t.colors[e+1]),s[f+2]=lv(t.colors[e+2]);let p=(l+d)*2;o[p]=sv(u.u0+t.uvs[d*2]*u.uScale),o[p+1]=sv(u.v0+t.uvs[d*2+1]*u.vScale),c&&(c[l+d]=t.steps?.[d]??0)}l+=e}let u=new Ou;return uv(u,{positions:i,normals:a,uvs:o,colors:s}),c&&u.setAttribute(`aStep`,new Z(c,1)),{geometry:u,frame:n}}var hv=15000280,gv=8157289;function _v(e){let t=(e>>16&255)/255,n=(e>>8&255)/255,r=(e&255)/255;return .299*t+.587*n+.114*r}var vv={dark:{background:3091488,gridMinorOpacity:.24,gridMajorOpacity:.46},light:{background:16053230,gridMinorOpacity:.34,gridMajorOpacity:.6}},yv=8e3,bv=.05,xv=`
  varying vec3 vWorldPos;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,Sv=`
  precision highp float;
  varying vec3 vWorldPos;
  uniform vec3 uColor;
  uniform float uMinorOpacity;
  uniform float uMajorOpacity;
  uniform vec2 uCenter;
  uniform float uFadeStart;
  uniform float uFadeEnd;

  const float N = 5.0;
  const float TARGET_PX = 32.0;

  float lineCoverage(vec2 coord, float cell, vec2 footprint) {
    vec2 c = coord / cell;
    vec2 d = footprint / cell;
    vec2 g = abs(fract(c - 0.5) - 0.5) / max(d, vec2(1e-5));
    return 1.0 - clamp(min(g.x, g.y), 0.0, 1.0);
  }

  void main() {
    vec2 coord = vWorldPos.xz;
    vec2 ddx = dFdx(coord);
    vec2 ddy = dFdy(coord);
    vec2 footprint = vec2(length(vec2(ddx.x, ddy.x)), length(vec2(ddx.y, ddy.y)));
    float unitsPerPixel = sqrt(abs(ddx.x * ddy.y - ddx.y * ddy.x));

    float lod = max(0.0, log(unitsPerPixel * TARGET_PX) / log(N));
    float f = fract(lod);
    float cell0 = pow(N, floor(lod));
    float cell1 = cell0 * N;
    float cell2 = cell1 * N;

    float minor = mix(lineCoverage(coord, cell0, footprint), lineCoverage(coord, cell1, footprint), f) * uMinorOpacity;
    float major = mix(lineCoverage(coord, cell1, footprint), lineCoverage(coord, cell2, footprint), f) * uMajorOpacity;
    float alpha = max(minor, major);

    float dist = length(coord - uCenter);
    alpha *= 1.0 - smoothstep(uFadeStart, uFadeEnd, dist);

    if (alpha < 0.002) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;function Cv(e){return _v(e)>.5?gv:hv}var wv=class{constructor(e){this.scene=e,this.fogEnabled=!0,this.theme=`dark`;let t=vv[this.theme];this.background=t.background,e.background=new X(t.background),this.gridMaterial=new Gf({transparent:!0,depthWrite:!1,fog:!1,side:2,uniforms:{uColor:{value:new X(Cv(t.background))},uMinorOpacity:{value:t.gridMinorOpacity},uMajorOpacity:{value:t.gridMajorOpacity},uCenter:{value:new W(0,0)},uFadeStart:{value:140},uFadeEnd:{value:560}},vertexShader:xv,fragmentShader:Sv}),this.grid=new gd(new Nf(yv,yv),this.gridMaterial),this.grid.rotation.x=-Math.PI/2,this.grid.position.y=-.05,this.grid.renderOrder=.5,e.add(this.grid),this.fog=new Pl(new X(t.background),120,600),e.fog=this.fog}setGroundY(e){this.grid.position.y=e-bv}setGridVisible(e){this.grid.visible=e}setFogVisible(e){this.fogEnabled=e,this.scene.fog=e&&this.background!==null?this.fog:null}setBackground(e){this.background=e,this.scene.background=e===null?null:new X(e),this.scene.fog=e===null||!this.fogEnabled?null:this.fog,e!==null&&(this.fog.color.setHex(e),this.gridMaterial.uniforms.uColor.value.setHex(Cv(e)))}getBackground(){return this.background}setExtent(e){this.gridMaterial.uniforms.uFadeStart.value=Math.max(e*3,40),this.gridMaterial.uniforms.uFadeEnd.value=Math.max(e*8,200),this.fog.near=Math.max(e*5,120),this.fog.far=Math.max(e*16,600)}setTheme(e){if(e===this.theme)return;this.theme=e;let t=vv[e];this.gridMaterial.uniforms.uMinorOpacity.value=t.gridMinorOpacity,this.gridMaterial.uniforms.uMajorOpacity.value=t.gridMajorOpacity,this.background!==null&&this.setBackground(t.background)}update(e,t){this.grid.position.x=t.x,this.grid.position.z=t.z,this.grid.renderOrder=e.y>=this.grid.position.y?.5:2,this.gridMaterial.uniforms.uCenter.value.set(t.x,t.z)}dispose(){this.grid.geometry.dispose(),this.gridMaterial.dispose()}},Tv=[.5,1,2,4];function Ev(e){return Tv.some(t=>t===e)}function Dv(e,t){let n=Tv.indexOf(e)+t;return Tv[Math.min(Math.max(n,0),Tv.length-1)]}function Ov(e){return Tv[(Tv.indexOf(e)+1)%Tv.length]}var kv=8,Av=.05;function jv(e,t){let n=t.max.y-t.min.y+3,r=t.max.z-t.min.z+3,i=(e,i,a)=>((e-t.min.x+1)*n+(i-t.min.y+1))*r+(a-t.min.z+1),a=new Set;for(let t of e.blocks.values())a.add(i(t.pos.x,t.pos.y,t.pos.z));let o=[],s=new Set;for(let e of a){if(s.has(e))continue;s.add(e);let c={cells:[],min:{x:1/0,y:1/0,z:1/0},max:{x:-1/0,y:-1/0,z:-1/0}},l=[e];for(;l.length>0;){let e=l.pop(),o=e%r,u=(e-o)/r,d=u%n,f=(u-d)/n-1+t.min.x,p=d-1+t.min.y,m=o-1+t.min.z;c.cells.push(e),f<c.min.x&&(c.min.x=f),p<c.min.y&&(c.min.y=p),m<c.min.z&&(c.min.z=m),f>c.max.x&&(c.max.x=f),p>c.max.y&&(c.max.y=p),m>c.max.z&&(c.max.z=m);for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++){if(e===0&&t===0&&n===0)continue;let r=i(f+e,p+t,m+n);a.has(r)&&!s.has(r)&&(s.add(r),l.push(r))}}o.push(c)}let c=a.size,l=o.filter(e=>e.cells.length>kv),u=c-l.reduce((e,t)=>e+t.cells.length,0);if(l.length===0||u===0||u>c*Av)return{bounds:t,strays:[]};let d={min:{x:1/0,y:1/0,z:1/0},max:{x:-1/0,y:-1/0,z:-1/0}};for(let e of l)d.min.x=Math.min(d.min.x,e.min.x),d.min.y=Math.min(d.min.y,e.min.y),d.min.z=Math.min(d.min.z,e.min.z),d.max.x=Math.max(d.max.x,e.max.x),d.max.y=Math.max(d.max.y,e.max.y),d.max.z=Math.max(d.max.z,e.max.z);let f=[];for(let e of o)if(!(e.cells.length>kv))for(let i of e.cells){let e=i%r,a=(i-e)/r,o=a%n;f.push({x:(a-o)/n-1+t.min.x,y:o-1+t.min.y,z:e-1+t.min.z})}return{bounds:d,strays:f}}function Mv(e){return t=>{e&&(e.updateWorldMatrix(!0,!0),e.traverse(e=>{let n=e.geometry?.getAttribute(`position`);if(!n)return;let r=e.matrixWorld;for(let e=0;e<n.count;e++)Nv.set(n.getX(e),n.getY(e),n.getZ(e)).applyMatrix4(r),t(Nv.x,Nv.y,Nv.z)}))}}var Nv=new G;function Pv(e,t){return n=>{for(let r of[e.x,t.x])for(let i of[e.y,t.y])for(let a of[e.z,t.z])n(r,i,a)}}function Fv(e,t){return n=>t((t,r,i)=>{t<e.min.x||t>e.max.x+1||r<e.min.y||r>e.max.y+1||i<e.min.z||i>e.max.z+1||n(t,r,i)})}var Iv=1.04;function Lv(e){let{center:t,dir:n,fovDeg:r,aspect:i,recenter:a}=e,o=n,s=new G().crossVectors(new G(0,1,0),o).normalize(),c=new G().crossVectors(o,s).normalize(),l=r*Math.PI/180,u=2*Math.atan(Math.tan(l/2)*i),d=e.margin??Iv,f=Math.tan(l/2)/d,p=Math.tan(u/2)/d,m=-1/0,h=-1/0,g=-1/0,_=-1/0,v=t.x,y=t.y,b=t.z;return e.points((e,t,n)=>{let r=e-v,i=t-y,a=n-b,l=r*s.x+i*s.y+a*s.z,u=r*c.x+i*c.y+a*c.z,d=r*o.x+i*o.y+a*o.z;d+l/p>m&&(m=d+l/p),d-l/p>h&&(h=d-l/p),d+u/f>g&&(g=d+u/f),d-u/f>_&&(_=d-u/f)}),Number.isFinite(m)?a?{dist:Math.max((m+h)/2,(g+_)/2,1),target:t.clone().addScaledVector(s,(m-h)*p/2).addScaledVector(c,(g-_)*f/2)}:{dist:Math.max(m,h,g,_,1),target:t.clone()}:null}function Rv(e){let{center:t,dir:n,aspect:r,recenter:i}=e,a=n,o=new G().crossVectors(new G(0,1,0),a).normalize(),s=new G().crossVectors(a,o).normalize(),c=e.margin??Iv,l=1/0,u=-1/0,d=1/0,f=-1/0;if(e.points((e,n,r)=>{let i=e-t.x,a=n-t.y,c=r-t.z,p=i*o.x+a*o.y+c*o.z,m=i*s.x+a*s.y+c*s.z;p<l&&(l=p),p>u&&(u=p),m<d&&(d=m),m>f&&(f=m)}),!Number.isFinite(l))return null;let p=i?u-l:2*Math.max(Math.abs(l),Math.abs(u)),m=i?f-d:2*Math.max(Math.abs(d),Math.abs(f)),h=Math.max(p,m*r,2)/2*c;return{halfWidth:h,halfHeight:h/r,target:i?t.clone().addScaledVector(o,(l+u)/2).addScaledVector(s,(d+f)/2):t.clone()}}var zv=16,Bv=1024;function Vv(e,t){let n=e*Math.PI/180,r=t*Math.PI/180;return new G(Math.cos(r)*Math.sin(n),Math.sin(r),Math.cos(r)*Math.cos(n)).normalize()}var Hv=class{constructor(e,t={}){this.center=new G,this.radius=1,this.azDeg=0,this.elDeg=45,this.maxShadowMapSize=t.maxShadowMapSize??4096,this.ambient=new Zp(16777215,t.ambient??.45),this.hemisphere=new jp(13625087,8952234,t.hemisphere??.8),this.light=new Xp(16774370,t.sun??1.85),this.light.castShadow=!0,this.light.shadow.normalBias=.04,this.light.shadow.bias=-5e-4,e.add(this.ambient),e.add(this.hemisphere),e.add(this.light),e.add(this.light.target)}static configureRenderer(e){e.shadowMap.enabled=!0,e.shadowMap.type=1,e.shadowMap.autoUpdate=!1}static invalidate(e){e.shadowMap.needsUpdate=!0}setExtent(e,t){this.center.copy(e),this.radius=t/2;let n=this.light.shadow.camera;n.left=-this.radius,n.right=this.radius,n.top=this.radius,n.bottom=-this.radius;let r=2**Math.ceil(Math.log2(Math.max(1,t*zv))),i=Math.min(this.maxShadowMapSize,Math.max(Bv,r));this.light.shadow.mapSize.x!==i&&(this.light.shadow.mapSize.set(i,i),this.light.shadow.map?.dispose(),this.light.shadow.map=null),this.place()}aim(e,t){this.azDeg=e,this.elDeg=t,this.place()}place(){let e=Math.max(this.radius*2,1);this.light.target.position.copy(this.center),this.light.position.copy(this.center).addScaledVector(Vv(this.azDeg,this.elDeg),e);let t=this.light.shadow.camera;t.near=Math.max(.05,e-this.radius*1.05),t.far=e+this.radius*1.05,t.updateProjectionMatrix()}dispose(){this.light.shadow.map?.dispose(),this.light.dispose(),this.ambient.dispose(),this.hemisphere.dispose()}},Uv={step:new X(1,.72,.25),extent:new X(.72,.6,1),distance:new X(1,.45,.78),anchor:new X(.42,.9,.55),done:new X(.38,.62,.95)},Wv=e=>`#${e.getHexString()}`;function Gv(e){let t=new Ad(Kv(e),e.width,e.height,Uo,Oo);if(t.magFilter=So,t.minFilter=So,t.colorSpace=Hs,t.generateMipmaps=!1,t.flipY=!0,e.height>e.width&&e.height%e.width===0){let n=e.height/e.width;t.wrapT=yo,t.repeat.set(1,1/n)}return t.needsUpdate=!0,t}function Kv(e){let t=e.width*e.height,n=new Uint8Array(t*4);if(e.alpha===`partial`)return n.set(e.data),n;for(let r=0;r<t;r++){let t=r*3,i=r*4;n[i]=e.data[t],n[i+1]=e.data[t+1],n[i+2]=e.data[t+2],e.alpha===`opaque`?n[i+3]=255:n[i+3]=e.alphaMask[r>>3]&1<<(r&7)?255:0}return n}var qv=.05,Jv=class{constructor(){this.entries=[]}get hasAnimations(){return this.entries.length>0}register(e,t,n=1,r=null){t<=1||this.entries.push({texture:e,totalFrames:t,frametime:n>0?n:1,frames:r,elapsed:0})}update(e){for(let t of this.entries){t.elapsed+=e;let n=t.frametime*qv,r=t.frames?.length??t.totalFrames,i=Math.floor(t.elapsed/n)%r,a=t.frames?t.frames[i]:i;t.texture.offset.y=1-(a+1)/t.totalFrames}}dispose(){this.entries.length=0}},Yv=.05,Xv=4096,Zv=1,Qv=class{constructor(e,t){this.texture=null,this.rects=new Map,this.anims=new Map,this.activeAnims=[],this.data=null,this.width=0,this.height=0;let n=[];for(let r of Object.keys(e.textures).sort()){let i=e.textures[r];if(!t(r,i))continue;let a=i.height>i.width&&i.height%i.width===0;n.push({id:r,w:i.width,h:a?i.width:i.height,animated:a})}if(n.length===0)return;n.sort((e,t)=>t.h-e.h||(e.id<t.id?-1:1));let r=0,i=0;for(let e of n)r+=(e.w+Zv)*(e.h+Zv),i=Math.max(i,e.w);this.width=Math.min(Xv,$v(Math.max(i,Math.ceil(Math.sqrt(r)))));let a=[],o=0,s=0,c=0;for(let e of n){if(o+e.w>this.width&&(o=0,s+=c+Zv,c=0),s+e.h>Xv){console.warn(`[texture-atlas] overflow, ${n.length-a.length} tile(s) not atlased`);break}a.push({...e,x:o,y:s}),o+=e.w+Zv,c=Math.max(c,e.h)}this.height=$v(s+c),this.data=new Uint8Array(this.width*this.height*4);for(let t of a){let n=e.textures[t.id],r=Kv(n);if(this.blit(r,n.width,0,t.x,t.y,t.w,t.h),this.rects.set(t.id,{u0:(t.x+.5)/this.width,v0:1-(t.y+t.h-.5)/this.height,uScale:(t.w-1)/this.width,vScale:(t.h-1)/this.height}),t.animated){let i=e.textureMetas[t.id]?.animation;this.anims.set(t.id,{strip:r,x:t.x,y:t.y,size:t.w,totalFrames:n.height/n.width,frametime:i?.frametime&&i.frametime>0?i.frametime:1,frames:i?.frames??null,elapsed:0,lastFrame:0})}}let l=new Ad(this.data,this.width,this.height,Uo,Oo);l.magFilter=So,l.minFilter=So,l.colorSpace=Hs,l.generateMipmaps=!1,l.flipY=!0,l.needsUpdate=!0,this.texture=l}rect(e){let t=this.rects.get(e);if(t){let t=this.anims.get(e);t&&t.totalFrames>1&&!this.activeAnims.includes(t)&&this.activeAnims.push(t)}return t}get hasAnimations(){return this.activeAnims.length>0}update(e){if(!this.data||!this.texture)return;let t=!1;for(let n of this.activeAnims){n.elapsed+=e;let r=n.frametime*Yv,i=n.frames?.length??n.totalFrames,a=Math.floor(n.elapsed/r)%i,o=n.frames?n.frames[a]:a;o!==n.lastFrame&&(n.lastFrame=o,this.blit(n.strip,n.size,o*n.size,n.x,n.y,n.size,n.size),t=!0)}t&&(this.texture.needsUpdate=!0)}blit(e,t,n,r,i,a,o){let s=this.data;for(let c=0;c<o;c++){let o=(n+c)*t*4,l=((i+c)*this.width+r)*4;s.set(e.subarray(o,o+a*4),l)}}dispose(){this.texture?.dispose(),this.activeAnims.length=0}};function $v(e){let t=1;for(;t<e;)t*=2;return t}var ey=`
attribute float aStep;
varying float vStep;
`,ty=`
vStep = aStep;
`,ny=`
uniform float uRevealOn;
uniform float uRevealDone;
uniform float uRevealNow;
uniform vec3 uRevealCurrent;
uniform vec3 uRevealPrev;
varying float vStep;
`,ry=`
if (uRevealOn > 0.5) {
  if (vStep >= uRevealDone) {
    vec3 lit = min(gl_FragColor.rgb * 1.28 + 0.05, vec3(1.0));
    gl_FragColor.rgb = mix(lit, uRevealCurrent, 0.08);
  } else if (vStep >= uRevealDone - 1.0) {
    gl_FragColor.rgb = mix(gl_FragColor.rgb, uRevealPrev, 0.22);
  }
}
`,iy=class{constructor(e){this.bundle=e,this.materials=new Map,this.textures=new Map,this.animator=new Jv,this.atlasMaterial=null,this.blockMaterials=new Map,this.revealUniforms={uRevealOn:{value:0},uRevealDone:{value:0},uRevealNow:{value:0},uRevealCurrent:{value:Uv.step.clone()},uRevealPrev:{value:Uv.done.clone()}},this.layerUniforms={uLayerOn:{value:0},uLayerTop:{value:0},uLayerAxis:{value:1},uLayerFalloff:{value:.62},uLayerMin:{value:.22}},this.atlas=new Qv(e,(e,t)=>t.alpha===`partial`),this.blockAtlas=new Qv(e,(e,t)=>t.alpha!==`partial`&&!oy(t)&&e!==`minecraft:font/ascii`)}setLayerHighlight(e){if(!e){this.layerUniforms.uLayerOn.value=0;return}this.layerUniforms.uLayerOn.value=1,this.layerUniforms.uLayerTop.value=e.top,this.layerUniforms.uLayerAxis.value=e.axis}updateAnimations(e){this.animator.update(e),this.atlas.update(e)}get hasAnimations(){return this.animator.hasAnimations||this.atlas.hasAnimations}translucentRect(e){return this.atlas.rect(e)}blockRect(e){return this.blockAtlas.rect(e)}blockMaterial(e){let t=this.blockMaterials.get(e);return t||(t=new Xf({map:this.blockAtlas.texture,vertexColors:!0,side:e?2:0,transparent:!1,alphaTest:.5,depthWrite:!0}),this.applyLayerHook(t),this.blockMaterials.set(e,t)),t}translucentMaterial(){return this.atlasMaterial||(this.atlasMaterial=new Xf({map:this.atlas.texture,vertexColors:!0,side:0,transparent:!0,depthWrite:!1}),this.applyLayerHook(this.atlasMaterial)),this.atlasMaterial}get(e){let t=Zn(e),n=this.materials.get(t);if(n)return n;let r=this.bundle.textures[e.texture]?.alpha??`cutout`,i=e.texture===`minecraft:font/ascii`?.25:.5,a=new Xf({map:this.texture(e.texture),vertexColors:!0,side:e.doubleSided?2:0,...r===`opaque`?{transparent:!1,depthWrite:!0}:r===`cutout`?{transparent:!1,alphaTest:i,depthWrite:!0}:{transparent:!0,depthWrite:!1}});return this.applyLayerHook(a),this.materials.set(t,a),a}setReveal(e){this.revealUniforms.uRevealOn.value=+!!e,e&&(this.revealUniforms.uRevealDone.value=e.done,this.revealUniforms.uRevealNow.value=e.now)}applyLayerHook(e){e.onBeforeCompile=e=>{for(let[t,n]of Object.entries(this.revealUniforms))e.uniforms[t]=n;e.uniforms.uLayerOn=this.layerUniforms.uLayerOn,e.uniforms.uLayerTop=this.layerUniforms.uLayerTop,e.uniforms.uLayerAxis=this.layerUniforms.uLayerAxis,e.uniforms.uLayerFalloff=this.layerUniforms.uLayerFalloff,e.uniforms.uLayerMin=this.layerUniforms.uLayerMin,e.vertexShader=ay(e.vertexShader).replace(`#include <common>`,`#include <common>
uniform float uLayerAxis;
varying float vLayerCoord;`+ey).replace(`#include <begin_vertex>`,`#include <begin_vertex>${ty}`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vec3 wLayer = (modelMatrix * vec4(transformed, 1.0)).xyz;
vLayerCoord = uLayerAxis < 0.5 ? wLayer.x : (uLayerAxis < 1.5 ? wLayer.y : wLayer.z);`),e.fragmentShader=ay(e.fragmentShader).replace(`#include <common>`,`#include <common>
uniform float uLayerOn;
uniform float uLayerTop;
uniform float uLayerFalloff;
uniform float uLayerMin;
varying float vLayerCoord;`+ny).replace(`#include <opaque_fragment>`,`#include <opaque_fragment>
float layerDepth = uLayerTop - vLayerCoord;
if (uLayerOn > 0.5 && layerDepth > 0.0) { gl_FragColor.rgb *= max(uLayerMin, pow(uLayerFalloff, layerDepth)); }`+ry)}}isTranslucent(e){return(this.bundle.textures[e.texture]?.alpha??`cutout`)===`partial`}texture(e){let t=this.textures.get(e);if(t)return t;let n=this.bundle.textures[e],r=n?Gv(n):uy();e===`minecraft:font/ascii`&&(r.generateMipmaps=!0,r.minFilter=Do,r.magFilter=So,r.needsUpdate=!0),this.textures.set(e,r);let i=this.bundle.textureMetas[e]?.animation;return n&&i&&n.height>n.width&&n.height%n.width===0&&this.animator.register(r,n.height/n.width,i.frametime??1,i.frames??null),r}dispose(){for(let e of this.materials.values())e.dispose();for(let e of this.textures.values())e.dispose();this.materials.clear(),this.textures.clear(),this.animator.dispose(),this.atlasMaterial?.dispose(),this.atlas.dispose();for(let e of this.blockMaterials.values())e.dispose();this.blockMaterials.clear(),this.blockAtlas.dispose()}};function ay(e){return e.replace(`#include <uv_pars_vertex>`,Q.uv_pars_vertex.replace(`varying vec2 vMapUv;`,`centroid varying vec2 vMapUv;`)).replace(`#include <uv_pars_fragment>`,Q.uv_pars_fragment.replace(`varying vec2 vMapUv;`,`centroid varying vec2 vMapUv;`))}function oy(e){return e.height>e.width&&e.height%e.width===0}var sy=16,cy=[248,0,248],ly=[0,0,0];function uy(){let e=sy/2,t=new Uint8Array(sy*sy*3);for(let n=0;n<sy;n++)for(let r=0;r<sy;r++)t.set(r<e==n<e?ly:cy,(n*sy+r)*3);let n=Gv({alpha:`opaque`,format:`rgb8`,width:sy,height:sy,data:t});return n.minFilter=Do,n.generateMipmaps=!0,n}var dy=class{constructor(e=Math.min(4,navigator.hardwareConcurrency||2)){this.workers=[],this.next=0,this.nextId=1,this.pending=new Map;for(let t=0;t<e;t++){let e=new Worker(new URL(`/assets/meshWorker-Bys5YHhR.js`,``+import.meta.url),{type:`module`});e.postMessage({kind:`config`,assetBaseUrl:Fi(),bundleManifest:Ri()}),e.onmessage=e=>{let t=e.data,n=this.pending.get(t.id);n&&(this.pending.delete(t.id),n.resolve(t))},e.onerror=t=>{this.retire(e,t.message||`mesh worker failed to start`)},e.onmessageerror=()=>{this.retire(e,`mesh worker sent an undeserializable message`)},this.workers.push(e)}}mesh(e){let{snapshot:t,version:n,namespaces:r,packs:i,biome:a=`plains`}=e,o=this.nextId++;return new Promise((e,s)=>{if(this.workers.length===0){s(Error(`no mesh workers available`));return}let c=this.workers[this.next%this.workers.length];this.next=(this.next+1)%this.workers.length,this.pending.set(o,{worker:c,resolve:e,reject:s});let l={id:o,snapshot:t,version:n,biome:a,namespaces:r,packs:i};c.postMessage(l,[t.indices.buffer])})}retire(e,t){let n=this.workers.indexOf(e);if(n!==-1){this.workers.splice(n,1),this.next=0,e.terminate();for(let[n,r]of this.pending)r.worker===e&&(this.pending.delete(n),r.reject(Error(t)))}}dispose(){for(let e of this.workers)e.terminate();this.workers.length=0,this.pending.clear()}};function fy(e){return{x:(e.cx+.5)*16,y:(e.cy+.5)*16,z:(e.cz+.5)*16}}var py=1,my=Math.cos(2*Math.PI/180),hy=6,gy=1,_y=class e{constructor(e,t,n,r,i){this.lastPos=new G,this.lastDir=new G,this.lastOrtho=null,this.cell=new G(r.x,r.y,r.z),this.centroids=n;let a=n.length/3;this.order=new Uint32Array(a);for(let e=0;e<a;e++)this.order[e]=e;this.keys=new Float64Array(a),this.index=new mu(new Uint32Array(a*hy),1);for(let e=0;e<this.index.array.length;e++)this.index.array[e]=e;e.setIndex(this.index),this.mesh=new gd(e,t),dv(this.mesh,i),this.mesh.renderOrder=gy}static build(t,n,r){let i=[],a=[];for(let e of t){let t=n.translucentRect(e.descriptor.texture);t?i.push({bucket:e,rect:t}):a.push(e)}if(i.length===0)return{translucent:null,leftovers:a};let o=0;for(let{bucket:e}of i){let t=e.positions.length/3;o+=e.descriptor.doubleSided?t*2:t}let s=iv(i.map(({bucket:e})=>e.positions)),c=av(s),l=new Uint16Array(o*3),u=new Int8Array(o*3),d=new Uint16Array(o*2),f=new Uint8Array(o*3),p=new Float32Array(o/hy*3),m=0;for(let{bucket:e,rect:t}of i){let n=e.positions.length/3,r=e.descriptor.doubleSided?2:1;for(let i=0;i<r;i++){let r=i===1;for(let i=0;i*hy<n;i++){let n=i*hy,a=0,o=0,h=0;for(let i=0;i<hy;i++){let p=n+(r?[0,2,1,3,5,4][i]:i),g=p*3,_=m*3;l[_]=ov(e.positions[g],s.x,c),l[_+1]=ov(e.positions[g+1],s.y,c),l[_+2]=ov(e.positions[g+2],s.z,c);let v=r?-1:1;u[_]=cv(v*e.normals[g]),u[_+1]=cv(v*e.normals[g+1]),u[_+2]=cv(v*e.normals[g+2]),f[_]=lv(e.colors[g]),f[_+1]=lv(e.colors[g+1]),f[_+2]=lv(e.colors[g+2]);let y=Math.min(1,Math.max(0,e.uvs[p*2])),b=Math.min(1,Math.max(0,e.uvs[p*2+1]));d[m*2]=sv(t.u0+y*t.uScale),d[m*2+1]=sv(t.v0+b*t.vScale),a+=e.positions[g],o+=e.positions[g+1],h+=e.positions[g+2],m++}let g=(m-hy)/hy*3;p[g]=a/hy,p[g+1]=o/hy,p[g+2]=h/hy}}}let h=new Ou;return uv(h,{positions:l,normals:u,uvs:d,colors:f}),{translucent:new e(h,n.translucentMaterial(),p,r,s),leftovers:a}}sortFor(e){let t=e.isOrthographicCamera===!0,n=e.position;if(vy.set(0,0,-1).applyQuaternion(e.quaternion),this.lastOrtho===t&&!(t?vy.dot(this.lastDir)<my:n.distanceToSquared(this.lastPos)>py))return!1;let{centroids:r,keys:i,order:a}=this,o=i.length;if(t)for(let e=0;e<o;e++){let t=e*3;i[e]=r[t]*vy.x+r[t+1]*vy.y+r[t+2]*vy.z}else for(let e=0;e<o;e++){let t=e*3,a=r[t]-n.x,o=r[t+1]-n.y,s=r[t+2]-n.z;i[e]=a*a+o*o+s*s}a.sort((e,t)=>i[t]-i[e]);let s=this.index.array;for(let e=0;e<o;e++){let t=a[e]*hy,n=e*hy;for(let e=0;e<hy;e++)s[n+e]=t+e}return this.index.needsUpdate=!0,this.lastPos.copy(n),this.lastDir.copy(vy),this.lastOrtho=t,!0}},vy=new G;function yy(e,t,n,r){var i;let a=[],o=(t,r)=>{let i=new Ou;i.setAttribute(`position`,new mu(t.positions,3)),i.setAttribute(`normal`,new mu(t.normals,3)),i.setAttribute(`uv`,new mu(t.uvs,2)),i.setAttribute(`color`,new mu(t.colors,3));let a=new gd(i,n.get(t.descriptor));a.renderOrder=r?gy:0,a.castShadow=!r,a.receiveShadow=!0,e.add(a)},s=[];for(let e of t)n.isTranslucent(e.descriptor)?a.push(e):s.push(e);if(s.length>0){let{meshes:t,leftovers:r}=fv(s,n);for(let n of t)e.add(n);for(let e of r)o(e,!1)}if(a.length===0)return;let{translucent:c,leftovers:l}=_y.build(a,n,r);for(let e of l)o(e,!0);c&&(c.mesh.receiveShadow=!0,e.add(c.mesh),((i=e.userData).translucent??(i.translucent=[])).push(c))}function by(e,t){let n=[];for(let t of e){let e=t.userData.translucent;e&&n.push(...e)}if(n.length===0)return;for(let e of n)e.sortFor(t);let r=t.isOrthographicCamera===!0;vy.set(0,0,-1).applyQuaternion(t.quaternion);let i=t.position,a=n.map(e=>({t:e,key:r?e.cell.dot(vy):e.cell.distanceToSquared(i)})).sort((e,t)=>t.key-e.key);for(let e=0;e<a.length;e++)a[e].t.mesh.renderOrder=gy+e/a.length}new Map(e.map(e=>[e.name,e]));var xy={type:`change`},Sy={type:`start`},Cy={type:`end`},wy=new rd,Ty=new Kd,Ey=Math.cos(70*jc.DEG2RAD),Dy=new G,Oy=2*Math.PI,ky={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ay=1e-6,jy=class extends Im{constructor(e,t=null){super(e,t),this.state=ky.NONE,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:go.ROTATE,MIDDLE:go.DOLLY,RIGHT:go.PAN},this.touches={ONE:_o.ROTATE,TWO:_o.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new G,this._lastQuaternion=new Mc,this._lastTargetPosition=new G,this._quat=new Mc().setFromUnitVectors(e.up,new G(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Cm,this._sphericalDelta=new Cm,this._scale=1,this._panOffset=new G,this._rotateStart=new W,this._rotateEnd=new W,this._rotateDelta=new W,this._panStart=new W,this._panEnd=new W,this._panDelta=new W,this._dollyStart=new W,this._dollyEnd=new W,this._dollyDelta=new W,this._dollyDirection=new G,this._mouse=new W,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ny.bind(this),this._onPointerDown=My.bind(this),this._onPointerUp=Py.bind(this),this._onContextMenu=Vy.bind(this),this._onMouseWheel=Ly.bind(this),this._onKeyDown=Ry.bind(this),this._onTouchStart=zy.bind(this),this._onTouchMove=By.bind(this),this._onMouseDown=Fy.bind(this),this._onMouseMove=Iy.bind(this),this._interceptControlDown=Hy.bind(this),this._interceptControlUp=Uy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(xy),this.update(),this.state=ky.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Dy.copy(t).sub(this.target),Dy.applyQuaternion(this._quat),this._spherical.setFromVector3(Dy),this.autoRotate&&this.state===ky.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Oy:n>Math.PI&&(n-=Oy),r<-Math.PI?r+=Oy:r>Math.PI&&(r-=Oy),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(Dy.setFromSpherical(this._spherical),Dy.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dy),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=Dy.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new G(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new G(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=Dy.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(wy.origin.copy(this.object.position),wy.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wy.direction))<Ey?this.object.lookAt(this.target):(Ty.setFromNormalAndCoplanarPoint(this.object.up,this.target),wy.intersectPlane(Ty,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Ay||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ay||this._lastTargetPosition.distanceToSquared(this.target)>Ay?(this.dispatchEvent(xy),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?Oy/60/60*this.autoRotateSpeed:Oy/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dy.setFromMatrixColumn(t,0),Dy.multiplyScalar(-e),this._panOffset.add(Dy)}_panUp(e,t){this.screenSpacePanning===!0?Dy.setFromMatrixColumn(t,1):(Dy.setFromMatrixColumn(t,0),Dy.crossVectors(this.object.up,Dy)),Dy.multiplyScalar(e),this._panOffset.add(Dy)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Dy.copy(r).sub(this.target);let i=Dy.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Oy*this._rotateDelta.x/t.clientHeight),this._rotateUp(Oy*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Oy*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Oy*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Oy*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Oy*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Oy*this._rotateDelta.x/t.clientHeight),this._rotateUp(Oy*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new W,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function My(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Ny(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Py(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Cy),this.state=ky.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function Fy(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case go.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ky.DOLLY;break;case go.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ky.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ky.ROTATE}break;case go.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ky.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ky.PAN}break;default:this.state=ky.NONE}this.state!==ky.NONE&&this.dispatchEvent(Sy)}function Iy(e){switch(this.state){case ky.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ky.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ky.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function Ly(e){this.enabled===!1||this.enableZoom===!1||this.state!==ky.NONE||(e.preventDefault(),this.dispatchEvent(Sy),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Cy))}function Ry(e){this.enabled!==!1&&this._handleKeyDown(e)}function zy(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case _o.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ky.TOUCH_ROTATE;break;case _o.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ky.TOUCH_PAN;break;default:this.state=ky.NONE}break;case 2:switch(this.touches.TWO){case _o.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ky.TOUCH_DOLLY_PAN;break;case _o.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ky.TOUCH_DOLLY_ROTATE;break;default:this.state=ky.NONE}break;default:this.state=ky.NONE}this.state!==ky.NONE&&this.dispatchEvent(Sy)}function By(e){switch(this._trackPointer(e),this.state){case ky.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ky.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ky.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ky.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ky.NONE}}function Vy(e){this.enabled!==!1&&e.preventDefault()}function Hy(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Uy(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}$.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new W(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},Vm.line={uniforms:Hf.merge([$.common,$.fog,$.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

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

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

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

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

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
		`,fragmentShader:`
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
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

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

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

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

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Wy=class extends Gf{constructor(e){super({type:`LineMaterial`,uniforms:Hf.clone(Vm.line.uniforms),vertexShader:Vm.line.vertexShader,fragmentShader:Vm.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE=``:delete this.defines.USE_ALPHA_TO_COVERAGE)}},Gy=new Xl,Ky=new G,qy=class extends $p{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new Z([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new Z([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new vm(t,6,1);return this.setAttribute(`instanceStart`,new ju(n,3,0)),this.setAttribute(`instanceEnd`,new ju(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new vm(t,6,1);return this.setAttribute(`instanceColorStart`,new ju(n,3,0)),this.setAttribute(`instanceColorEnd`,new ju(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new If(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xl);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Gy.setFromBufferAttribute(t),this.boundingBox.union(Gy))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bu),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)Ky.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(Ky)),Ky.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(Ky));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}},Jy=new J,Yy=new G,Xy=new G,Zy=new J,Qy=new J,$y=new J,eb=new G,tb=new Y,nb=new jm,rb=new G,ib=new Xl,ab=new bu,ob=new J,sb,cb;function lb(e,t,n){return ob.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),ob.multiplyScalar(1/ob.w),ob.x=cb/n.width,ob.y=cb/n.height,ob.applyMatrix4(e.projectionMatrixInverse),ob.multiplyScalar(1/ob.w),Math.abs(Math.max(ob.x,ob.y))}function ub(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){nb.start.fromBufferAttribute(i,r),nb.end.fromBufferAttribute(a,r),nb.applyMatrix4(n);let o=new G,s=new G;sb.distanceSqToSegment(nb.start,nb.end,s,o),s.distanceTo(o)<cb*.5&&t.push({point:s,pointOnLine:o,distance:sb.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function db(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;sb.at(1,$y),$y.w=1,$y.applyMatrix4(t.matrixWorldInverse),$y.applyMatrix4(r),$y.multiplyScalar(1/$y.w),$y.x*=i.x/2,$y.y*=i.y/2,$y.z=0,eb.copy($y),tb.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(Zy.fromBufferAttribute(s,t),Qy.fromBufferAttribute(c,t),Zy.w=1,Qy.w=1,Zy.applyMatrix4(tb),Qy.applyMatrix4(tb),Zy.z>u&&Qy.z>u)continue;if(Zy.z>u){let e=Zy.z-Qy.z,t=(Zy.z-u)/e;Zy.lerp(Qy,t)}else if(Qy.z>u){let e=Qy.z-Zy.z,t=(Qy.z-u)/e;Qy.lerp(Zy,t)}Zy.applyMatrix4(r),Qy.applyMatrix4(r),Zy.multiplyScalar(1/Zy.w),Qy.multiplyScalar(1/Qy.w),Zy.x*=i.x/2,Zy.y*=i.y/2,Qy.x*=i.x/2,Qy.y*=i.y/2,nb.start.copy(Zy),nb.start.z=0,nb.end.copy(Qy),nb.end.z=0;let o=nb.closestPointToPointParameter(eb,!0);nb.at(o,rb);let l=jc.lerp(Zy.z,Qy.z,o),d=l>=-1&&l<=1,f=eb.distanceTo(rb)<cb*.5;if(d&&f){nb.start.fromBufferAttribute(s,t),nb.end.fromBufferAttribute(c,t),nb.start.applyMatrix4(a),nb.end.applyMatrix4(a);let r=new G,i=new G;sb.distanceSqToSegment(nb.start,nb.end,i,r),n.push({point:i,pointOnLine:r,distance:sb.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var fb=class extends gd{constructor(e=new qy,t=new Wy({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)Yy.fromBufferAttribute(t,e),Xy.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+Yy.distanceTo(Xy);let i=new vm(r,2,1);return e.setAttribute(`instanceDistanceStart`,new ju(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new ju(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;sb=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;cb=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),ab.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?cb*.5:lb(r,Math.max(r.near,ab.distanceToPoint(sb.origin)),s.resolution),ab.radius+=c,sb.intersectsSphere(ab)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),ib.copy(o.boundingBox).applyMatrix4(a);let l;l=n?cb*.5:lb(r,Math.max(r.near,ib.distanceToPoint(sb.origin)),s.resolution),ib.expandByScalar(l),sb.intersectsBox(ib)!==!1&&(n?ub(this,t):db(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Jy),this.material.uniforms.resolution.value.set(Jy.z,Jy.w))}};function pb(e){let t=1/Math.max(1e-6,e);return{dashSize:11*t,gapSize:7*t}}var mb=null;function hb(e,t){if(!mb){let t=document.createElement(`canvas`);t.width=64,t.height=64;let n=t.getContext(`2d`);n&&(n.fillStyle=`#ffffff`,n.beginPath(),n.arc(64/2,64/2,64/2-1,0,Math.PI*2),n.fill()),mb=new bf(t),mb.colorSpace=Hs,mb.anisotropy=e}let n=new Ju(new Pu({map:mb,color:t,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}));return n.renderOrder=999,n.frustumCulled=!1,n.visible=!1,n}var gb=class{constructor(e,t=1e3,n){this.chip=n,this.aspect=1,this.text=``,this.canvas=document.createElement(`canvas`),this.texture=new bf(this.canvas),this.texture.colorSpace=Hs,this.texture.anisotropy=e,this.sprite=new Ju(new Pu({map:this.texture,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1})),this.sprite.renderOrder=t,this.sprite.frustumCulled=!1,this.sprite.visible=!1,this.anisotropy=e}setText(e){e!==this.text&&(this.text=e,this.draw(e))}setScreenHeight(e,t){let n=e/Math.max(1e-6,t);this.sprite.scale.set(n*this.aspect,n,1)}dispose(){this.texture.dispose(),this.sprite.material.dispose()}draw(e){let t=this.canvas,n=`700 64px ui-sans-serif, system-ui, -apple-system, sans-serif`,r=t.getContext(`2d`);if(!r)return;r.font=n;let i=this.chip?22:28,a=this.chip?13:18,o=Math.ceil(r.measureText(e).width)+i*2,s=64+a*2;t.width=o,t.height=s;let c=t.getContext(`2d`);if(!c)return;c.font=n,c.textAlign=`center`,c.textBaseline=`middle`,this.chip?(c.fillStyle=`rgba(9, 12, 16, 0.86)`,_b(c,1.5,1.5,o-3,s-3,(s-3)/2),c.fill(),c.strokeStyle=this.chip.color,c.lineWidth=3,_b(c,1.5,1.5,o-3,s-3,(s-3)/2),c.stroke(),c.fillStyle=this.chip.color,c.fillText(e,o/2,s/2+1)):(c.lineJoin=`round`,c.lineWidth=9,c.strokeStyle=`rgba(0, 0, 0, 0.85)`,c.strokeText(e,o/2,s/2),c.fillStyle=`#ffffff`,c.fillText(e,o/2,s/2)),this.aspect=o/s,this.texture.dispose();let l=new bf(t);l.colorSpace=Hs,l.anisotropy=this.anisotropy,l.minFilter=To,l.generateMipmaps=!1,this.texture=l;let u=this.sprite.material;u.map=l,u.needsUpdate=!0}};function _b(e,t,n,r,i,a){e.beginPath(),e.roundRect(t,n,r,i,a)}var vb=.4;function yb(e,t=38){let n=Math.min(t,e*vb);return n<11?0:n}var bb=class{constructor(e){this.group=new El,this.caps=[],this.joints=[],this.lineMats=[],this.legs=[],this.span=0;for(let t=0;t<3;t++){let t=new Wy({color:Uv.distance,linewidth:1.6,worldUnits:!1,dashed:!0,dashSize:.3,gapSize:.2,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.95,toneMapped:!1}),n=new fb(new qy,t);n.renderOrder=998,n.frustumCulled=!1,n.visible=!1;let r=new gb(e,1e3,{color:Wv(Uv.distance)});this.lineMats.push(t),this.legs.push({lines:n,label:r}),this.group.add(n,r.sprite)}let t=new Wy({color:Uv.anchor,linewidth:1.8,worldUnits:!1,depthTest:!1,depthWrite:!1,transparent:!0,opacity:1,toneMapped:!1});for(let t=0;t<2;t++){let t=hb(e,Uv.distance);this.caps.push(t),this.group.add(t);let n=hb(e,Uv.distance);this.joints.push(n),this.group.add(n)}this.marker=new fb(new qy,t),this.marker.renderOrder=999,this.marker.frustumCulled=!1,this.lineMats.push(t),this.group.add(this.marker),this.group.visible=!1}set(e){if(!e){this.group.visible=!1;return}this.group.visible=!0;let t=[0,2,1],n=[e.from.x+.5,e.from.y+.5,e.from.z+.5],r=[e.at.x+.5,e.at.y+.5,e.at.z+.5],i=[...n],a=[];for(let e of t)Math.abs(r[e]-i[e])-1>=.5&&a.push(e),i[e]=r[e];this.span=0;let o=[...n],s=0;for(let e of t){let t=r[e]-o[e],n=Math.abs(t)-1,i=o[e];if(o[e]=r[e],n<.5)continue;let c=this.legs[s];if(!c)break;let l=Math.sign(t),u=[...o],d=[...o];u[e]=i+(e===a[0]?.5*l:0),d[e]=r[e]-(e===a[a.length-1]?.5*l:0);let f=new qy;f.setPositions([...u,...d]);let p=c.lines.geometry;if(c.lines.geometry=f,c.lines.computeLineDistances(),p.dispose(),c.lines.visible=!0,c.label.setText(`${Math.round(n)}`),c.label.sprite.position.set((u[0]+d[0])/2,(u[1]+d[1])/2,(u[2]+d[2])/2),e===a[0]&&this.caps[0]?.position.set(u[0],u[1],u[2]),e===a[a.length-1])this.caps[1]?.position.set(d[0],d[1],d[2]);else{let e=this.joints[s];e&&(e.position.set(d[0],d[1],d[2]),e.visible=!0)}this.span+=n,s++}for(let e of this.caps)e.visible=a.length>0;for(let e=Math.max(0,a.length-1);e<this.joints.length;e++){let t=this.joints[e];t&&(t.visible=!1)}for(let e=s;e<this.legs.length;e++){let t=this.legs[e];t&&(t.lines.visible=!1,t.label.sprite.visible=!1)}let c=new wf(1.04,1.04,1.04),l=new Mf(c),u=new qy().fromEdgesGeometry(l);c.dispose(),l.dispose();let d=this.marker.geometry;this.marker.geometry=u,d.dispose(),this.marker.position.set(r[0],r[1],r[2])}update(e,t){if(!this.group.visible)return;let n=pb(e),r=13/Math.max(1e-6,e);for(let e of[...this.caps,...this.joints])e.scale.set(r,r,1);for(let e of this.lineMats)e.dashed&&(e.dashSize=n.dashSize,e.gapSize=n.gapSize);let i=yb(this.span*e,t);for(let t of this.legs)t.label.sprite.visible=t.lines.visible&&i>0,t.label.sprite.visible&&t.label.setScreenHeight(i,e)}dispose(){this.marker.geometry.dispose();for(let e of this.lineMats)e.dispose();for(let e of this.legs)e.lines.geometry.dispose(),e.label.dispose();for(let e of[...this.caps,...this.joints])e.material.dispose()}};function xb(e,t,n,r,i){return[{gap:e.min.x-t.min.x,site:[t.min.x,n,i],step:[e.min.x,n,i]},{gap:t.max.x-e.max.x,site:[t.max.x+1,n,i],step:[e.max.x+1,n,i]},{gap:e.min.z-t.min.z,site:[r,n,t.min.z],step:[r,n,e.min.z]},{gap:t.max.z-e.max.z,site:[r,n,t.max.z+1],step:[r,n,e.max.z+1]}].filter(e=>e.gap>=1)}var Sb=class{constructor(e){this.group=new El,this.legs=[],this.mats=[],this.span=0;for(let t=0;t<4;t++){let t=new Wy({color:Uv.distance,linewidth:1.6,worldUnits:!1,dashed:!0,dashSize:.3,gapSize:.2,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.95,toneMapped:!1}),n=new fb(new qy,t);n.renderOrder=998,n.frustumCulled=!1,n.visible=!1;let r=new gb(e,1e3,{color:Wv(Uv.distance)}),i=hb(e,Uv.distance);this.mats.push(t),this.legs.push({lines:n,label:r,dot:i}),this.group.add(n,r.sprite,i)}let t=new Wy({color:Uv.extent,linewidth:1.2,worldUnits:!1,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.55,toneMapped:!1});this.outline=new fb(new qy,t),this.outline.renderOrder=997,this.outline.frustumCulled=!1,this.mats.push(t),this.group.add(this.outline),this.group.visible=!1}set(e){if(!e){this.group.visible=!1;return}this.group.visible=!0;let{step:t,site:n}=e,r=t.min.y+.5,i=(t.min.x+t.max.x+1)/2,a=(t.min.z+t.max.z+1)/2,o=0;for(let e of xb(t,n,r,i,a)){if(e.gap<1)continue;let t=this.legs[o];if(!t)break;let n=new qy;n.setPositions([...e.site,...e.step]);let r=t.lines.geometry;t.lines.geometry=n,t.lines.computeLineDistances(),r.dispose(),t.lines.visible=!0,t.label.setText(`${Math.round(e.gap)}`),t.label.sprite.position.set((e.site[0]+e.step[0])/2,(e.site[1]+e.step[1])/2,(e.site[2]+e.step[2])/2),t.dot.position.set(e.site[0],e.site[1],e.site[2]),t.dot.visible=!0,o++}for(let e=o;e<this.legs.length;e++){let t=this.legs[e];t&&(t.lines.visible=!1,t.label.sprite.visible=!1,t.dot.visible=!1)}let s=n.min.x,c=n.max.x+1,l=n.min.z,u=n.max.z+1,d=new qy;d.setPositions([s,r,l,c,r,l,c,r,l,c,r,u,c,r,u,s,r,u,s,r,u,s,r,l]);let f=this.outline.geometry;this.outline.geometry=d,f.dispose(),this.span=Math.hypot(c-s,u-l)}update(e,t){if(!this.group.visible)return;let n=pb(e),r=13/Math.max(1e-6,e);for(let e of this.mats)e.dashed&&(e.dashSize=n.dashSize,e.gapSize=n.gapSize);let i=yb(this.span*e,t);for(let t of this.legs)t.dot.scale.set(r,r,1),t.label.sprite.visible=t.lines.visible&&i>0,t.label.sprite.visible&&t.label.setScreenHeight(i,e)}dispose(){this.outline.geometry.dispose();for(let e of this.mats)e.dispose();for(let e of this.legs)e.lines.geometry.dispose(),e.label.dispose(),e.dot.material.dispose()}},Cb=2.4,wb=class{constructor(e,t,n){this.color=e,this.style=n,this.group=new El,this.lineMats=[],this.axes=[],this.box=null,this.age=0,this.lastCamera=new G(NaN,0,0),this.fill=new gd(new wf(1,1,1),new id({color:e.outline,transparent:!0,opacity:.05,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),this.fill.renderOrder=995,this.occluder=new gd(new wf(1,1,1),new id({colorWrite:!1,depthWrite:!0,transparent:!0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})),this.occluder.renderOrder=996;let r=new Wy({color:e.outline,linewidth:n.maxPx,worldUnits:!1,dashed:!0,dashSize:1,gapSize:1,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.5,toneMapped:!1});this.backEdges=new fb(new qy,r),this.backEdges.renderOrder=997,this.backEdges.frustumCulled=!1;let i=new Wy({color:e.outline,linewidth:n.maxPx,worldUnits:!1,depthTest:!0,depthWrite:!1,transparent:!0,opacity:1,toneMapped:!1});this.frontEdges=new fb(new qy,i),this.frontEdges.renderOrder=999,this.frontEdges.frustumCulled=!1,this.lineMats.push(r,i),this.group.add(this.fill,this.occluder,this.backEdges,this.frontEdges);for(let r=0;r<3;r++){let r=new Wy({color:e.measure,linewidth:n.maxPx,worldUnits:!1,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.95,toneMapped:!1}),i=new fb(new qy,r);i.renderOrder=998,i.frustumCulled=!1,i.visible=!1;let a=new gb(t,1e3,{color:Wv(e.measure)});this.lineMats.push(r),this.axes.push({lines:i,label:a,shown:!1,span:0}),this.group.add(i,a.sprite)}this.group.visible=!1}set(e,t=!1){if(!e){this.box=null,this.group.visible=!1;return}let n=this.frontEdges.material;n.dashed!==t&&(n.dashed=t,n.needsUpdate=!0);let r=this.box&&this.box.min.x===e.min.x&&this.box.min.y===e.min.y&&this.box.min.z===e.min.z&&this.box.max.x===e.max.x&&this.box.max.y===e.max.y&&this.box.max.z===e.max.z;if(this.box={min:{...e.min},max:{...e.max}},this.group.visible=!0,r)return;let i=this.size();this.group.position.set(e.min.x+i.x/2,e.min.y+i.y/2,e.min.z+i.z/2),this.fill.scale.set(i.x,i.y,i.z),this.occluder.scale.set(i.x,i.y,i.z);let a=new wf(i.x,i.y,i.z),o=new Mf(a),s=new qy().fromEdgesGeometry(o);a.dispose(),o.dispose();let c=this.backEdges.geometry;this.backEdges.geometry=s,this.frontEdges.geometry=s,this.backEdges.computeLineDistances(),this.frontEdges.computeLineDistances(),c.dispose();let l=[i.x,i.y,i.z];for(let e=0;e<3;e++){let t=this.axes[e];if(!t)continue;let n=l[e]??1;t.shown=n>1,t.lines.visible=t.shown,t.span=n,t.shown&&t.label.setText(String(n))}this.lastCamera.set(NaN,0,0),this.age=0}update(e,t,n,r){if(!this.group.visible||!this.box)return;let i=Math.min(this.style.maxPx,Math.max(this.style.minPx,n*t)),a=pb(t);for(let e of this.lineMats)e.linewidth!==i&&(e.linewidth=i),e.dashed&&(e.dashSize=a.dashSize,e.gapSize=a.gapSize);this.age+=r;let o=.8+.2*Math.cos(this.age*Math.PI*2/Cb);this.frontEdges.material.opacity=o,this.fill.material.opacity=.04+.03*o;let s=this.size(),c=yb(Math.hypot(s.x,s.y,s.z)*t,this.style.labelPx);for(let e of this.axes)e.label.sprite.visible=e.shown&&c>0,e.label.sprite.visible&&e.label.setScreenHeight(c,t);this.lastCamera.distanceToSquared(e)<.02||(this.lastCamera.copy(e),this.placeAnnotations(e))}dispose(){this.fill.geometry.dispose(),this.fill.material.dispose(),this.occluder.geometry.dispose(),this.occluder.material.dispose(),this.backEdges.geometry.dispose(),this.frontEdges.geometry.dispose();for(let e of this.lineMats)e.dispose();for(let e of this.axes)e.lines.geometry.dispose(),e.label.dispose()}size(){let e=this.box;return e?{x:e.max.x-e.min.x+1,y:e.max.y-e.min.y+1,z:e.max.z-e.min.z+1}:{x:1,y:1,z:1}}placeAnnotations(e){let t=this.box;if(!t)return;let n=this.size(),r=[n.x,n.y,n.z],i=[t.min.x,t.min.y,t.min.z],a=[t.max.x+1,t.max.y+1,t.max.z+1],o=[(i[0]+a[0])/2,(i[1]+a[1])/2,(i[2]+a[2])/2],s=[e.x,e.y,e.z],c=e=>s[e]>=o[e]?1:-1,l=(e,t)=>t>0?a[e]:i[e],u=[0,1,2].filter(e=>(r[e]??1)>1).sort((e,t)=>(r[t]??0)-(r[e]??0)||e-t),d=new Set,f=new Map;for(let e of u){let t=[0,1,2].filter(t=>t!==e),n=(r[t[0]]??1)>=(r[t[1]]??1)?t[0]:t[1],i=n===t[0]?t[1]:t[0],a=c(n),o=c(i),s=[[n,a],[i,o],[n,-a],[i,-o]],l=s.find(([e,t])=>!d.has(`${e}:${t}`))??s[0];d.add(`${l[0]}:${l[1]}`),f.set(e,{off:l[0],sign:l[1],flat:l[0]===t[0]?t[1]:t[0]})}let p=e=>[e[0]-o[0],e[1]-o[1],e[2]-o[2]];for(let e=0;e<3;e++){let t=this.axes[e],n=f.get(e);if(!t?.lines.visible||!n)continue;let{off:o,sign:s,flat:u}=n,d=.3+Math.min(.9,(r[o]??1)*.07),m=.14,h=.16,g=(t,n)=>{let r=[0,0,0];return r[e]=t,r[o]=l(o,s)+s*n,r[u]=l(u,c(u)),r},_=new qy;_.setPositions([...p(g(i[e],d)),...p(g(a[e],d)),...p(g(i[e],h)),...p(g(i[e],d+m)),...p(g(a[e],h)),...p(g(a[e],d+m))]);let v=t.lines.geometry;t.lines.geometry=_,v.dispose();let y=p(g((i[e]+a[e])/2,d));t.label.sprite.position.set(y[0],y[1],y[2])}}};function Tb(e,t,n){return`${e>>1},${t>>1},${n>>1}`}function Eb(e){let[t,n,r]=e.split(`,`,3).map(Number);return{x:((t<<1)+1)*16,y:((n<<1)+1)*16,z:((r<<1)+1)*16}}function Db(e){let t=new Set;for(let n of e){let[e,r,i]=n.split(`,`,3).map(Number);t.add(Tb(e,r,i))}let n=[];for(let e of t){let[t,r,i]=e.split(`,`,3).map(Number);for(let e=0;e<2;e++)for(let a=0;a<2;a++)for(let o=0;o<2;o++)n.push(u((t<<1)+e,(r<<1)+a,(i<<1)+o))}return n}var Ob=class{constructor(e){this.collected=new Map,this.awaiting=new Map,this.complete=[];for(let t of e){let[e,n,r]=t.split(`,`,3).map(Number),i=Tb(e,n,r);this.awaiting.set(i,(this.awaiting.get(i)??0)+1)}}collect(e){let t=Tb(e.cx,e.cy,e.cz),n=this.collected.get(t);n||this.collected.set(t,n=[]);for(let t of e.buckets)n.push(t);let r=(this.awaiting.get(t)??0)-1;return r>0?(this.awaiting.set(t,r),!1):(this.awaiting.delete(t),this.complete.push(t),!0)}get pending(){return this.awaiting.size}flush(e,t,n,r){for(let i of this.complete){let a=this.collected.get(i)??[];this.collected.delete(i);let o=t.get(i);if(o&&(e.remove(o),r(o),t.delete(i)),a.length===0)continue;let s=new El;yy(s,a,n,Eb(i)),e.add(s),t.set(i,s)}this.complete.length=0}},kb=.1;function Ab(e){return Math.min(Math.max(e,0),kb)}function jb(e,t,n,r){return r.set(0,e.vertical,0).addScaledVector(t.forward,e.forward).addScaledVector(t.right,e.strafe),r.multiplyScalar(11*n/Math.max(1,r.length()))}var Mb=1,Nb=2,Pb=40,Fb=800,Ib=120,Lb=50,Rb=240,zb=150,Bb=class{constructor(){this.lastEventAt=-1/0,this.lastStepAt=-1/0,this.direction=1,this.travel=0}push(e,t,n){let r=e*(t===Mb?Pb:t===Nb?Fb:1);if(r===0)return 0;let i=r<0?1:-1,a=i!==this.direction||n-this.lastEventAt>=Ib;this.lastEventAt=n,this.direction=i;let o=Math.abs(r);if(a||o>=Lb)this.travel=0;else{if(this.travel+=o,this.travel<Rb)return 0;this.travel=0}return n-this.lastStepAt<zb?0:(this.lastStepAt=n,i)}};ho();var Vb=[[0,0,0,1,1,1]],Hb=.25,Ub=250,Wb=350,Gb=70,Kb=.1,qb=.4,Jb=.6,Yb=3,Xb=5,Zb=(En+1)/2,Qb=.5,$b=.3,ex=.05,tx=.02,nx=8e3,rx=.5,ix=.02,ax=32,ox=4.5,sx=.0022,cx=new G(0,1,0),lx=new Set([`KeyW`,`KeyA`,`KeyS`,`KeyD`,`Space`,`ShiftLeft`,`ShiftRight`]),ux={forward:0,strafe:0,rise:!1,descend:!1},dx=130,fx=45,px=new Set([`KeyW`,`KeyA`,`KeyS`,`KeyD`]),mx=1,hx=(e,t)=>e===t||e!==null&&t!==null&&e.min.x===t.min.x&&e.min.y===t.min.y&&e.min.z===t.min.z&&e.max.x===t.max.x&&e.max.y===t.max.y&&e.max.z===t.max.z,gx=(e,t)=>e===t||e!==null&&t!==null&&hx(e.step,t.step)&&hx(e.site,t.site),_x=(e,t)=>e===t||e!==null&&t!==null&&e.from.x===t.from.x&&e.from.y===t.from.y&&e.from.z===t.from.z&&e.at.x===t.at.x&&e.at.y===t.at.y&&e.at.z===t.at.z;function vx(e){let t=e;return t?.tagName===`INPUT`||t?.tagName===`TEXTAREA`||t?.isContentEditable===!0}var yx=.03,bx=.75,xx=1.8,Sx=.14,Cx=48,wx=38,Tx=9,Ex=class{forgetPivot(){this.lastTarget.set(NaN,0,0),this.lastDistance=this.camera.position.distanceTo(this.controls.target)}constructor(e,t,n,r=[],i=[]){this.canvas=e,this.bundle=t,this.version=n,this.namespaces=r,this.packs=i,this.scene=new Fl,this.camera=new Up(45,1,.05,8e3),this.orthoCamera=new Jp(-1,1,1,-1,.1,1e3),this.projection=`perspective`,this.retiredMaterials=[],this.pool=new dy,this.group=null,this.batchGroups=new Map,this.meshedChunks=0,this.raf=0,this.dirty=!0,this.disposed=!1,this.lastFrameTime=0,this.world=null,this.bounds=null,this.clipY=void 0,this.placedTop=void 0,this.biome=`plains`,this.meshing=!1,this.meshQueued=!1,this.onMeshProgress=null,this.hiddenBlocks=new Set,this.highlightBlock=null,this.stepOf=null,this.revealing=!1,this.revealQueued=null,this.sliceIsolate=!1,this.measureMode=!1,this.sliceHistogram=null,this.raycaster=new bm,this.rawNBT=new Map,this.materialCounts=new Map,this.downX=0,this.downY=0,this.downOnCanvas=!1,this.selectionLineMats=[],this.stepBox=null,this.stepLeader=null,this.siteLeader=null,this.siteLeaderState=null,this.revealState=null,this.stepBoxState=null,this.stepLeaderState=null,this.focusTarget=null,this.lastTarget=new G(NaN,0,0),this.lastDistance=0,this.onFocusBroken=null,this.selectionEnabled=!0,this.tightFraming=!1,this.framedBounds=null,this.selectionAnchor=null,this.selectionRegion=null,this.onSelectCallback=null,this.shiftStart=null,this.shiftMoved=!1,this.clipAxis=1,this.planMode=!1,this.orbitSaved=null,this.planSaved=null,this.gridVisible=!0,this.layerHighlight=!1,this.explore=!1,this.yaw=0,this.pitch=0,this.flyPos=new G,this.pressed=new Set,this.touch=ux,this.flySpeed=1,this.onFlySpeedChange=null,this.wheelNotches=new Bb,this.flyLookDirty=!1,this.pointerLockLook=!1,this.lookLive=!1,this.onLookSuspendedChange=null,this.panEnabled=!0,this.zoomToCursorPref=!0,this.pointerLockWanted=!1,this.pendingArrival=null,this.modeTween=null,this.walkMode=!1,this.onFlightChange=null,this.dropMarker=null,this.dropPending=!1,this.player=null,this.playerPrev=null,this.tickAccumulator=0,this.jumpQueued=!1,this.sprintLatched=!1,this.lastForwardTap=0,this.lastJumpTap=0,this.walkDist=0,this.walkDistPrev=0,this.bob=0,this.bobPrev=0,this.fovScale=1,this.fovScalePrev=1,this.baseFov=Gb,this.fovFrom=Gb,this.fovTo=Gb,this.fovElapsed=$b,this.orbitFov=45,this.machine=new y(this),this.onModeChange=null,this.onModeTargetChange=null,this.announcedTarget=null,this.collision=new Yt({resolveModel:e=>Ft(this.bundle,e),blockTypeOf:e=>this.registry?.blocks[e]?.blockType}),this.registry=null,this.flyVelocity=new G,this.walkEye=new G,this.tmpFwd=new G,this.tmpRight=new G,this.tmpDir=new G,this.tween=null,this.looking=!1,this.lookX=0,this.lookY=0,this.onKeyDown=e=>{if(!this.inputDead){if(this.explore){if(lx.has(e.code)&&!vx(e.target)){if(e.preventDefault(),e.code===`Space`&&!e.repeat){let e=performance.now();e-this.lastJumpTap<Wb?(this.lastJumpTap=0,this.toggleFlight()):this.lastJumpTap=e}if(this.walkMode&&e.code===`KeyW`&&!e.repeat){let e=performance.now();e-this.lastForwardTap<Ub&&(this.sprintLatched=!0),this.lastForwardTap=e}this.pressed.add(e.code)}return}this.planMode&&px.has(e.code)&&!vx(e.target)&&(e.preventDefault(),this.pressed.add(e.code))}},this.onKeyUp=e=>{this.inputDead||(e.code===`KeyW`&&(this.sprintLatched=!1),this.pressed.delete(e.code))},this.onCanvasPointerDown=e=>{if(!this.machine.inputLocked&&!(!this.selectionEnabled&&!this.explore)){if(this.downX=e.clientX,this.downY=e.clientY,this.downOnCanvas=!0,this.explore){this.pointerLockLook?document.pointerLockElement!==this.canvas&&this.requestPointerLock():(this.looking=!0,this.lookX=e.clientX,this.lookY=e.clientY);return}if((e.shiftKey||this.measureMode)&&e.button===0){let t=this.pickBlock(e.clientX,e.clientY);t&&(this.shiftStart={x:t.x,y:t.y,z:t.z},this.shiftMoved=!1,this.controls.enabled=!1)}}},this.onCanvasContextMenu=e=>{this.explore&&e.preventDefault()},this.onCanvasWheel=e=>{if(!this.explore||(e.preventDefault(),this.inputDead||this.walkMode||e.ctrlKey))return;let t=this.wheelNotches.push(e.deltaY,e.deltaMode,e.timeStamp);t!==0&&this.setFlySpeed(Dv(this.flySpeed,t))},this.onCanvasPointerMove=e=>{if(this.shiftStart){if(Math.hypot(e.clientX-this.downX,e.clientY-this.downY)>5){let t=this.pickSelectionCorner(e.clientX,e.clientY,this.shiftStart);t&&(this.shiftMoved=!0,this.applySelection(this.shiftStart,t))}return}this.explore&&(document.pointerLockElement===this.canvas?this.flyLook(e.movementX,e.movementY):this.looking&&(this.flyLook(e.clientX-this.lookX,e.clientY-this.lookY),this.lookX=e.clientX,this.lookY=e.clientY))},this.onCanvasPointerUp=e=>{if(!this.machine.inputLocked){if(this.shiftStart){let t=this.shiftStart,n=this.shiftMoved;if(this.shiftStart=null,this.shiftMoved=!1,this.controls.enabled=!0,this.downOnCanvas=!1,n){let n=this.pickSelectionCorner(e.clientX,e.clientY,t);n&&this.applySelection(t,n)}else if(this.selectionAnchor){let n=this.pickSelectionCorner(e.clientX,e.clientY,this.selectionAnchor)??t;this.applySelection(this.selectionAnchor,n)}else this.applySelection(t,t);return}if(this.looking=!1,this.explore&&!this.lookLive){this.downOnCanvas=!1;return}if(this.downOnCanvas&&this.explore){if(Math.hypot(e.clientX-this.downX,e.clientY-this.downY)<5)if(e.button===0&&this.selectionEnabled){let e=this.pickBlockAtCrosshair();e?this.applySelection(e,e):this.clearSelection()}else e.button===2&&this.interactAtCrosshair();this.downOnCanvas=!1;return}if(this.downOnCanvas&&!this.explore&&Math.hypot(e.clientX-this.downX,e.clientY-this.downY)<5){let t=this.pickBlock(e.clientX,e.clientY);t?this.applySelection(t,t):this.clearSelection()}this.downOnCanvas=!1}},this.onPointerLockChange=()=>{!this.explore||!this.pointerLockLook||this.setLookLive(document.pointerLockElement===this.canvas)},this.loop=()=>{this.raf=requestAnimationFrame(this.loop),this.machine.target!==this.announcedTarget&&(this.announcedTarget=this.machine.target,this.onModeTargetChange?.(this.machine.target));let e=performance.now(),t=this.lastFrameTime?(e-this.lastFrameTime)/1e3:0;if(this.lastFrameTime=e,this.updateFov(t),this.machine.isTransitioning){this.machine.update(t),this.forgetPivot(),this.materials.hasAnimations&&this.materials.updateAnimations(t),this.environment.update(this.camera.position,this.controls.target);let e=this.activeCamera();this.updateSelectionChrome(e,t),this.sortTranslucent(e),this.renderer.render(this.scene,e);return}if(this.explore){this.focusTarget&&(this.focusTarget=null,this.controls.zoomToCursor=this.zoomToCursorPref,this.onFocusBroken?.()),this.walkMode?this.updateWalk(t):this.updateFly(t);let e=this.materials.hasAnimations,n=this.stepBox?.group.visible===!0;(this.dirty||e||n)&&(e&&this.materials.updateAnimations(t),this.environment.update(this.camera.position,this.flyPos),this.updateSelectionChrome(this.camera,t),this.sortTranslucent(this.camera),this.renderer.render(this.scene,this.camera),this.dirty=!1);return}if(this.tween){this.forgetPivot();let e=this.tween;e.elapsed+=t;let n=Math.min(1,e.elapsed/e.duration),r=1-(1-n)**3;this.camera.position.lerpVectors(e.fromPos,e.toPos,r),this.controls.target.lerpVectors(e.fromTarget,e.toTarget,r),this.camera.up.copy(e.fromUp).lerp(e.toUp,r).normalize(),this.camera.lookAt(this.controls.target),this.materials.hasAnimations&&this.materials.updateAnimations(t),this.environment.update(this.camera.position,this.controls.target);let i=this.activeCamera();if(this.updateSelectionChrome(i,t),this.sortTranslucent(i),this.renderer.render(this.scene,i),n>=1){let t=e.onArrive;this.tween=null,t()}return}this.updateLayerPan(t),this.updateFocus(t);let n=this.controls.update(),r=this.materials.hasAnimations,i=this.stepBox?.group.visible===!0;if(this.dirty||n||r||i){r&&this.materials.updateAnimations(t),this.environment.update(this.camera.position,this.controls.target);let e=this.activeCamera();this.updateSelectionChrome(e,t),this.sortTranslucent(e),this.renderer.render(this.scene,e),this.dirty=!1}},this.renderer=new $_({canvas:e,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=Hs,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.2,Hv.configureRenderer(this.renderer),this.sun=new Hv(this.scene,{ambient:.3,hemisphere:.85,sun:1.6,maxShadowMapSize:2048}),this.sun.aim(dx,fx),this.orbitFov=this.camera.fov,this.baseFov=this.camera.fov,this.fovFrom=this.fovTo=this.camera.fov,this.materials=new iy(t),this.environment=new wv(this.scene),this.environment.setBackground(0),this.buildSelectionBox(),this.controls=new jy(this.camera,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.12,this.controls.rotateSpeed=.7,this.controls.zoomToCursor=!0,this.controls.touches={ONE:_o.ROTATE,TWO:_o.DOLLY_PAN},this.controls.addEventListener(`change`,()=>this.dirty=!0),window.addEventListener(`keydown`,this.onKeyDown),window.addEventListener(`keyup`,this.onKeyUp),e.addEventListener(`pointerdown`,this.onCanvasPointerDown),e.addEventListener(`contextmenu`,this.onCanvasContextMenu),e.addEventListener(`wheel`,this.onCanvasWheel,{passive:!1}),window.addEventListener(`pointermove`,this.onCanvasPointerMove),window.addEventListener(`pointerup`,this.onCanvasPointerUp),document.addEventListener(`pointerlockchange`,this.onPointerLockChange),this.resize(),this.loop()}get inputDead(){return this.machine.inputLocked||this.explore&&!this.lookLive}async setBlueprint(e){this.world=na(e),this.bounds=this.world.computeBounds(),this.placedTop=void 0,this.rawNBT=new Map,this.materialCounts=new Map,this.hiddenBlocks=new Set,this.highlightBlock=null,this.sliceIsolate=!1,this.sliceHistogram=null,this.orbitSaved=null,this.planSaved=null;for(let t of e.blocks.values()){let e=t.debug?.rawBlockEntity;e!==void 0&&this.rawNBT.set(`${t.pos.x},${t.pos.y},${t.pos.z}`,e),this.materialCounts.set(t.id,(this.materialCounts.get(t.id)??0)+1)}if(this.framedBounds=this.tightFraming&&this.bounds?jv(e,this.bounds).bounds:null,this.clearSelection(),await this.rebuildMeshes(),this.onMeshProgress=null,this.bounds){let e=new G(this.bounds.min.x,this.bounds.min.y,this.bounds.min.z),t=new G(this.bounds.max.x+1,this.bounds.max.y+1,this.bounds.max.z+1);this.environment.setGroundY(this.bounds.min.y),this.environment.setExtent(t.clone().sub(e).length()/2),this.sun.setExtent(e.clone().add(t).multiplyScalar(.5),t.clone().sub(e).length()),this.applyCamStateInstant(this.computeIsoFrame())}this.dirty=!0}setTheme(e){this.environment.setTheme(e),this.dirty=!0}setClipY(e){let t=e??void 0;t!==this.clipY&&(this.clipY=t,this.updateLayerHighlight(),this.planMode&&this.alignToSlice(this.camera.position,this.controls.target),this.queueRebuild())}isSlicing(){return this.clipY!==void 0}queueRebuild(){if(this.meshing){this.meshQueued=!0;return}this.rebuildMeshes().catch(()=>{})}setHiddenBlocks(e){let t=new Set(e);t.size===this.hiddenBlocks.size&&[...t].every(e=>this.hiddenBlocks.has(e))||(this.hiddenBlocks=t,this.syncSelectionVisibility(),this.queueRebuild())}syncSelectionVisibility(){let e=this.selectionRegion;if(!e)return;let t=e.min.x===e.max.x&&e.min.y===e.max.y&&e.min.z===e.max.z?this.world?.getBlock(e.min.x,e.min.y,e.min.z)?.id:void 0,n=!(t!==void 0&&this.hiddenBlocks.has(t));this.selectionBox.visible!==n&&(this.selectionBox.visible=n,this.dirty=!0)}getHiddenBlocks(){return[...this.hiddenBlocks]}setHighlightBlock(e){e!==this.highlightBlock&&(this.highlightBlock=e,this.queueRebuild())}setRevealPlan(e){this.stepOf!==e&&(this.stepOf=e,e||this.materials.setReveal(null),this.queueRebuild())}setReveal(e){this.revealState?.done===e?.done&&this.revealState?.now===e?.now||(this.revealState=e,this.materials.setReveal(e),this.dirty=!0)}setStepBox(e,t=!1){let n=this.stepBoxState;n&&n.improvised===t&&hx(n.box,e)||(this.stepBoxState={box:e,improvised:t},this.ensureStepChrome(e!==null),this.stepBox?.set(e,t),this.dirty=!0)}setSiteLeader(e){gx(this.siteLeaderState,e)||(this.siteLeaderState=e,this.ensureStepChrome(e!==null),this.siteLeader?.set(e),this.dirty=!0)}setStepLeader(e){_x(this.stepLeaderState,e)||(this.stepLeaderState=e,this.ensureStepChrome(e!==null),this.stepLeader?.set(e),this.dirty=!0)}ensureStepChrome(e){if(this.stepBox||!e)return;let t=this.renderer.capabilities.getMaxAnisotropy();this.stepBox=new wb({outline:Uv.step,measure:Uv.extent},t,{minPx:bx,maxPx:xx,labelPx:wx}),this.stepLeader=new bb(t),this.siteLeader=new Sb(t),this.scene.add(this.stepBox.group,this.stepLeader.group,this.siteLeader.group)}setFocusPoint(e){let t=this.focusTarget;(e?t?.x===e.x&&t.y===e.y&&t.z===e.z:t===null)||(this.focusTarget=e?new G(e.x,e.y,e.z):null,this.controls.zoomToCursor=e?!1:this.zoomToCursorPref,e&&(this.dirty=!0))}setOnFocusBroken(e){this.onFocusBroken=e}updateFocus(e){let t=this.controls.target,n=this.camera.position.distanceTo(t),r=Math.abs(n-this.lastDistance)>1e-5;!Number.isNaN(this.lastTarget.x)&&!r&&t.distanceToSquared(this.lastTarget)>1e-8&&(this.focusTarget=null,this.controls.zoomToCursor=this.zoomToCursorPref,this.onFocusBroken?.());let i=this.focusTarget;if(i){this.tmpDir.copy(i).sub(t),this.planMode&&(this.clipAxis===0?this.tmpDir.x=0:this.clipAxis===1?this.tmpDir.y=0:this.tmpDir.z=0);let n=this.tmpDir.lengthSq();n>1e-6?(this.tmpDir.multiplyScalar(1-Math.exp(-e*Tx)),t.add(this.tmpDir),this.camera.position.add(this.tmpDir),this.dirty=!0):n>0&&(t.add(this.tmpDir),this.camera.position.add(this.tmpDir))}this.lastTarget.copy(t),this.lastDistance=this.camera.position.distanceTo(t)}writeBlock(e,t,n,r){this.world?.setBlock(e,t,n,r),this.sliceHistogram=null,this.placedTop=void 0}worldChanged(e){if(e.length!==0){if(this.revealing||this.meshing){this.revealQueued=[...this.revealQueued??[],...e];return}this.planMode&&this.alignToSlice(this.camera.position,this.controls.target),this.revealing=!0,this.remeshCells([...e]).finally(()=>{this.revealing=!1,this.drainRevealQueue()})}}drainRevealQueue(){let e=this.revealQueued;this.revealQueued=null,e&&e.length>0&&!this.disposed&&this.worldChanged(e)}getHighlightBlock(){return this.highlightBlock}setMeasureMode(e){this.measureMode=e}isMeasureMode(){return this.measureMode}setLayerIsolate(e){e!==this.sliceIsolate&&(this.sliceIsolate=e,this.updateLayerHighlight(),this.queueRebuild())}isLayerIsolate(){return this.sliceIsolate}slicePlane(){return w(this.clipY??null,this.heightRange())}sliceStats(){let e=this.world;if(!e)return{blocks:0,types:0};if(!this.sliceHistogram){let t=this.clipAxis,n=new Map;e.forEachBlock((e,r,i,a)=>{let o=b(e,r,i,t),s=n.get(o);s||n.set(o,s=new Map);let c=`${a.namespace}:${a.name}`;s.set(c,(s.get(c)??0)+1)}),this.sliceHistogram=n}let t=this.sliceHistogram.get(this.slicePlane());if(!t)return{blocks:0,types:0};let n=0;for(let e of t.values())n+=e;return{blocks:n,types:t.size}}visibleRange(){let e=this.heightRange();return this.world?(this.placedTop===void 0&&(this.placedTop=this.world.maxAlong(this.clipAxis)),this.placedTop===null?e:{min:e.min,max:this.placedTop}):e}heightRange(){if(!this.bounds)return{min:0,max:0};let e=this.clipAxis;return e===0?{min:this.bounds.min.x,max:this.bounds.max.x}:e===1?{min:this.bounds.min.y,max:this.bounds.max.y}:{min:this.bounds.min.z,max:this.bounds.max.z}}enterPlanMode(){this.machine.to(`plan`)}exitPlanMode(){this.machine.to(`orbit`)}resetView(){this.bounds&&(this.explore||this.tweenTo(this.planMode?this.computePlanView():this.computeIsoFrame(),()=>{}))}setProjection(e){e!==this.projection&&(this.projection=e,this.dirty=!0)}getProjection(){return this.projection}activeCamera(){return this.projection===`orthographic`&&!this.explore?this.syncOrtho():this.camera}syncOrtho(){let e=this.orthoCamera,t=this.camera;e.position.copy(t.position),e.quaternion.copy(t.quaternion),e.up.copy(t.up);let n=t.position.distanceTo(this.controls.target),r=Math.max(.001,Math.tan(t.fov*Math.PI/360)*n),i=r*t.aspect;return e.left=-i,e.right=i,e.top=r,e.bottom=-r,e.near=-t.far,e.far=t.far,e.updateProjectionMatrix(),e}setGridVisible(e){this.gridVisible=e,this.environment.setGridVisible(e),this.dirty=!0}isGridVisible(){return this.gridVisible}setPanEnabled(e){this.panEnabled=e,this.controls.enablePan=e}setBackground(e){this.environment.setBackground(e===null?null:new X(e).getHex()),this.dirty=!0}getBackground(){let e=this.environment.getBackground();return e===null?null:`#${e.toString(16).padStart(6,`0`)}`}setZoomToCursor(e){this.zoomToCursorPref=e,this.controls.zoomToCursor=e}setTightFraming(e){this.tightFraming=e}setSelectionEnabled(e){this.selectionEnabled=e,e||this.deselect()}capture(){let e=this.activeCamera();return this.sortTranslucent(e),this.renderer.render(this.scene,e),this.renderer.domElement.toDataURL(`image/png`)}profileFrame(){let e=this.activeCamera(),t=performance.now();this.sortTranslucent(e);let n=performance.now();this.renderer.render(this.scene,e);let r=performance.now();this.renderer.getContext().finish();let i=performance.now(),{render:a,memory:o,programs:s}=this.renderer.info;return{sortMs:n-t,renderMs:r-n,gpuMs:i-r,calls:a.calls,triangles:a.triangles,geometries:o.geometries,textures:o.textures,programs:s?.length??0}}sceneCensus(){let e=0,t=0,n=0,r=0;return this.scene.traverse(i=>{let a=i;if(!(!a.isMesh||!a.geometry)){e++,a.renderOrder>=1&&a.renderOrder<2&&t++;for(let e of Object.values(a.geometry.attributes))n+=e.array.byteLength;r+=a.geometry.index?.array.byteLength??0}}),{meshes:e,translucentMeshes:t,chunks:this.meshedChunks,attributeBytes:n,indexBytes:r}}setBiome(e){if(e!==this.biome){if(this.biome=e,this.meshing){this.meshQueued=!0;return}this.rebuildMeshes()}}getBiome(){return this.biome}async setPacks(e){if(Xn(e)===Xn(this.packs))return;this.packs=e;let t=await Ki(this.version,this.namespaces,e);if(!this.disposed){if(this.retiredMaterials.push(this.materials),this.materials=new iy(t),this.bundle=t,this.collision.clear(),this.updateLayerHighlight(),this.meshing){this.meshQueued=!0;return}await this.rebuildMeshes()}}getPacks(){return this.packs}setOnSelect(e){this.onSelectCallback=e}deselect(){this.clearSelection()}setOnMeshProgress(e){this.onMeshProgress=e}getMaterials(){return[...this.materialCounts.entries()].map(([e,t])=>({id:e,count:t}))}clearSelection(){this.selectionAnchor=null,this.shiftStart=null,this.shiftMoved=!1,this.selectionRegion&&(this.selectionRegion=null,this.selectionBox.visible=!1,this.dirty=!0,this.onSelectCallback?.(null))}buildSelectionBox(){let e=new El;this.selectionFill=new gd(new wf(1,1,1),new id({color:16777215,transparent:!0,opacity:.12,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),this.selectionFill.renderOrder=995,this.selectionOccluder=new gd(new wf(1,1,1),new id({colorWrite:!1,depthWrite:!0,transparent:!0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})),this.selectionOccluder.renderOrder=996;let t=new qy,n=new Wy({color:16777215,linewidth:xx,worldUnits:!1,dashed:!0,dashSize:Sx,gapSize:Sx,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.55,toneMapped:!1});this.selectionBackEdges=new fb(t,n),this.selectionBackEdges.renderOrder=997,this.selectionBackEdges.frustumCulled=!1;let r=new Wy({color:16777215,linewidth:xx,worldUnits:!1,depthTest:!0,depthWrite:!1,transparent:!0,opacity:1,toneMapped:!1});this.selectionFrontEdges=new fb(t,r),this.selectionFrontEdges.renderOrder=999,this.selectionFrontEdges.frustumCulled=!1,this.selectionLineMats.push(n,r),this.selectionLabel=new gb(this.renderer.capabilities.getMaxAnisotropy()),e.add(this.selectionFill,this.selectionOccluder,this.selectionBackEdges,this.selectionFrontEdges,this.selectionLabel.sprite),e.visible=!1,this.scene.add(e),this.selectionBox=e}applySelection(e,t){let n={...t};this.planMode&&(this.clipAxis===0?n.x=e.x:this.clipAxis===1?n.y=e.y:n.z=e.z);let r={x:Math.min(e.x,n.x),y:Math.min(e.y,n.y),z:Math.min(e.z,n.z)},i={x:Math.max(e.x,n.x),y:Math.max(e.y,n.y),z:Math.max(e.z,n.z)},a=this.selectionRegion,o=a&&a.min.x===r.x&&a.min.y===r.y&&a.min.z===r.z&&a.max.x===i.x&&a.max.y===i.y&&a.max.z===i.z;if(this.selectionAnchor={...e},o)return;this.selectionRegion={min:r,max:i},this.setSelectionVisual(r,i);let s=r.x===i.x&&r.y===i.y&&r.z===i.z,c=s?this.blockInfoAt(r.x,r.y,r.z):null,l=s?+!!c:this.countBlocks(r,i);this.onSelectCallback?.({region:{min:r,max:i},block:c,blockCount:l})}setSelectionVisual(e,t){let n=t.x-e.x+1,r=t.y-e.y+1,i=t.z-e.z+1;this.selectionBox.position.set(e.x+n/2,e.y+r/2,e.z+i/2),this.selectionBox.visible=!0,this.selectionFill.scale.set(n,r,i),this.selectionOccluder.scale.set(n,r,i);let a=new wf(n,r,i),o=new Mf(a),s=new qy().fromEdgesGeometry(o);a.dispose(),o.dispose();let c=this.selectionBackEdges.geometry;this.selectionBackEdges.geometry=s,this.selectionFrontEdges.geometry=s,this.selectionBackEdges.computeLineDistances(),c.dispose();let l=[n,r,i].filter(e=>e>1);l.length===0?this.selectionLabel.sprite.visible=!1:(this.selectionLabel.setText(l.join(` × `)),this.selectionLabel.sprite.visible=!0),this.dirty=!0}blockInfoAt(e,t,n){let r=this.world?.getBlock(e,t,n);return!r||!this.world?null:{x:e,y:t,z:n,id:r.id,properties:{...r.properties},blockEntity:this.world.getBlockEntity(e,t,n),rawNBT:this.rawNBT.get(`${e},${t},${n}`)}}countBlocks(e,t){if(!this.world)return 0;if((t.x-e.x+1)*(t.y-e.y+1)*(t.z-e.z+1)>1e6)return-1;let n=0;for(let r=e.x;r<=t.x;r++)for(let i=e.y;i<=t.y;i++)for(let a=e.z;a<=t.z;a++)this.world.getBlock(r,i,a)&&n++;return n}pickSelectionCorner(e,t,n){if(this.planMode){let r=this.clipAxis===0?n.x:this.clipAxis===1?n.y:n.z;return this.pickLayerCell(e,t,r)}let r=this.pickBlock(e,t);return r?{x:r.x,y:r.y,z:r.z}:null}pickLayerCell(e,t,n){let r=this.canvas.getBoundingClientRect();this.raycaster.setFromCamera(new W((e-r.left)/r.width*2-1,-((t-r.top)/r.height)*2+1),this.activeCamera());let i=new Kd(this.axisVector(this.clipAxis),-(n+.5)),a=new G;if(!this.raycaster.ray.intersectPlane(i,a))return null;let o={x:Math.floor(a.x),y:Math.floor(a.y),z:Math.floor(a.z)};return this.clipAxis===0?o.x=n:this.clipAxis===1?o.y=n:o.z=n,o}pickBlock(e,t){return this.aimRay(e,t),this.pickBlockAtRay()}aimRay(e,t){let n=this.canvas.getBoundingClientRect();this.raycaster.setFromCamera(new W((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.activeCamera())}pickBlockAtCrosshair(e){if(this.raycaster.setFromCamera(new W(0,0),this.activeCamera()),e===void 0)return this.pickBlockAtRay();let t=this.raycaster.far;this.raycaster.far=e;try{return this.pickBlockAtRay()}finally{this.raycaster.far=t}}pickBlockAtRay(){if(!this.world||!this.group)return null;let e=this.raycaster.intersectObject(this.group,!0).find(e=>e.face);if(!e||!e.face)return null;let t=e.face.normal.clone().transformDirection(e.object.matrixWorld).normalize();for(let n of[.001,.5]){let r=e.point.clone().addScaledVector(t,-n),i=this.blockInfoAt(Math.floor(r.x),Math.floor(r.y),Math.floor(r.z));if(i)return i}return null}lookCardinal(){let e=this.activeCamera().getWorldDirection(new G);return Math.abs(e.x)>Math.abs(e.z)?e.x>0?`east`:`west`:e.z>0?`south`:`north`}interactAtCrosshair(){let e=this.world,t=this.registry?.blocks;if(!e||!t)return;let n=this.pickBlockAtCrosshair(ox);if(!n)return;let r=Le(e,n.x,n.y,n.z,t,this.lookCardinal());if(r){for(let t of r)e.setBlock(t.pos.x,t.pos.y,t.pos.z,t.state);this.worldChanged(r.map(e=>e.pos))}}enterExplore(e){this.pointerLockWanted=e,this.machine.to(`explore`)}exitExplore(){this.machine.to(`orbit`)}resumeLook(){this.isLookSuspended()&&this.requestPointerLock()}requestMode(e){this.machine.to(e)}layerTop(){let e=this.heightRange();return Math.min(w(this.clipY??null,e),e.max)}setOnModeTargetChange(e){this.onModeTargetChange=e,e?.(this.machine.target),this.announcedTarget=this.machine.target}setOnModeChange(e){this.onModeChange=e}currentMode(){return this.machine.current}isWalking(){return this.explore&&this.walkMode}setOnFlightChange(e){this.onFlightChange=e}toggleFlight(){if(this.explore){if(this.walkMode){this.walkMode=!1,this.sprintLatched=!1,this.fovScale=this.fovScalePrev=1,this.camera.fov=this.baseFov,this.camera.updateProjectionMatrix();let e=this.player;e&&this.flyVelocity.set(e.vx,e.vy,e.vz).divideScalar(pn),this.player=this.playerPrev=null,this.camera.rotation.z=0}else this.beginWalking({x:this.flyPos.x,y:this.flyPos.y-_n,z:this.flyPos.z},this.flyVelocity);this.flyLookDirty=!0,this.dirty=!0,this.onFlightChange?.(this.walkMode)}}walkJump(){this.isWalking()&&(this.jumpQueued=!0)}setBlockRegistry(e){this.registry=e,this.collision.clear()}walkTargetAt(e,t){if(!this.world||!this.group)return null;this.aimRay(e,t);let n=this.raycaster.intersectObject(this.group,!0).find(e=>e.face);if(!n?.face)return this.groundDropAt();let r=n.face.normal.clone().transformDirection(n.object.matrixWorld).normalize(),i=n.point.clone();return r.y>.5?i.y+=ix:r.y<-.5?i.y-=hn+ix:i.addScaledVector(r,mn/2+ix),{x:i.x,y:i.y,z:i.z}}groundDropAt(){let e=this.bounds?this.bounds.min.y:0,t=new Kd(cx,-e),n=new G;if(!this.raycaster.ray.intersectPlane(t,n))return null;let r=this.bounds;return r&&(n.x<r.min.x-ax||n.x>r.max.x+1+ax||n.z<r.min.z-ax||n.z>r.max.z+1+ax)?null:{x:n.x,y:e+ix,z:n.z}}setWalkTarget(e){if(!e){this.dropMarker&&(this.dropMarker.visible=!1),this.dirty=!0;return}this.dropMarker||=this.buildDropMarker(),this.dropMarker.position.set(e.x,e.y+.02,e.z),this.dropMarker.visible=!0,this.dirty=!0}dropInAt(e,t){if(this.machine.isTransitioning||this.machine.current===`explore`)return;let n=new G(e.x,e.y+_n,e.z),r=this.controls.target.clone().sub(this.camera.position);r.y=0,r.lengthSq()<1e-6&&r.set(0,0,1),r.normalize(),this.pendingArrival={feet:e,view:{position:n,target:n.clone().addScaledVector(r,12),up:cx.clone(),near:tx,far:this.camera.far,minDistance:this.controls.minDistance,maxDistance:this.controls.maxDistance}},this.setWalkTarget(null),this.deselect(),this.pointerLockWanted=t,this.machine.to(`explore`)}beginWalking(e,t){this.walkMode=!0,this.player={...Pn(e.x,e.y,e.z),vx:(t?.x??0)*pn,vy:(t?.y??0)*pn,vz:(t?.z??0)*pn},this.playerPrev=this.player,this.tickAccumulator=0,this.jumpQueued=!1,this.sprintLatched=!1,this.lastForwardTap=0,this.walkDist=this.walkDistPrev=0,this.bob=this.bobPrev=0,this.fovScale=this.fovScalePrev=1}buildDropMarker(){let e=new El,t=9355388,n=new gd(new Tf(.42,32).rotateX(-Math.PI/2),new id({color:t,transparent:!0,opacity:.25,depthTest:!1})),r=new gd(new Pf(.4,.46,32).rotateX(-Math.PI/2),new id({color:t,transparent:!0,opacity:.9,depthTest:!1}));return e.renderOrder=999,e.add(n,r),this.scene.add(e),e}collisionWorld(){return{boxesAt:(e,t,n)=>this.cellBoxes(e,t,n),groundBlockName:(e,t,n)=>this.groundName(e,t,n),isClimbable:(e,t,n)=>this.climbableAt(e,t,n)}}resetCameraBaseline(){this.camera.near=ex,this.camera.far=nx,this.camera.up.set(0,1,0),this.camera.rotation.z=0,this.camera.updateProjectionMatrix(),this.controls.enabled=!0,this.controls.enableRotate=!0,this.controls.enablePan=this.panEnabled,this.controls.zoomToCursor=this.zoomToCursorPref,this.controls.mouseButtons={LEFT:go.ROTATE,MIDDLE:go.DOLLY,RIGHT:go.PAN},this.controls.touches={ONE:_o.ROTATE,TWO:_o.DOLLY_PAN},this.syncControlsUp()}exitMode(e){e===`orbit`?this.orbitSaved=this.captureCam():e===`plan`?(this.planSaved={cam:this.captureCam()},this.planMode=!1,this.updateLayerHighlight()):this.teardownFirstPerson(),this.pressed.clear()}prepareMode(e,t){t===`explore`&&this.pointerLockWanted&&this.requestPointerLock()}fovFor(e){return e===`explore`?Gb:this.orbitFov}beginCameraMove(e,t){if(this.aimFov(this.fovFor(t)),t===`plan`){let e=this.planSaved?.cam;return e&&this.alignToSlice(e.position,e.target),this.startTween(e??this.computePlanView())}if(t===`explore`)return this.pendingArrival?this.startTween(this.pendingArrival.view):0;let n=this.orbitSaved??(this.bounds?this.computeIsoFrame():null);return n?this.startTween(n):0}captureCam(){return{position:this.camera.position.clone(),target:this.controls.target.clone(),up:this.camera.up.clone(),near:this.camera.near,far:this.camera.far,minDistance:this.controls.minDistance,maxDistance:this.controls.maxDistance}}startTween(e){return this.camera.near=Math.min(this.camera.near,e.near),this.camera.far=Math.max(this.camera.far,e.far),this.camera.updateProjectionMatrix(),this.controls.minDistance=e.minDistance,this.controls.maxDistance=e.maxDistance,this.controls.enabled=!1,this.modeTween={fromPos:this.camera.position.clone(),toPos:e.position,fromTarget:this.controls.target.clone(),toTarget:e.target,fromUp:this.camera.up.clone(),toUp:e.up},rx}advanceCameraMove(e){let t=this.modeTween;t&&(this.camera.position.lerpVectors(t.fromPos,t.toPos,e),this.controls.target.lerpVectors(t.fromTarget,t.toTarget,e),this.camera.up.copy(t.fromUp).lerp(t.toUp,e).normalize(),this.camera.lookAt(this.controls.target),e>=1&&(this.modeTween=null),this.dirty=!0)}enterMode(e){this.controls.enabled=e!==`explore`,e===`plan`?(this.planMode=!0,this.updateLayerHighlight(),this.controls.enableRotate=!1,this.controls.mouseButtons={LEFT:go.PAN,MIDDLE:go.DOLLY,RIGHT:go.PAN},this.controls.touches={ONE:_o.PAN,TWO:_o.DOLLY_PAN}):e===`explore`&&this.setupFirstPerson(),this.controls.update(),this.dirty=!0,this.onModeChange?.(e)}setupFirstPerson(){this.explore=!0,this.walkMode=!1,this.pointerLockLook=this.pointerLockWanted,this.setLookLive(!this.pointerLockLook||document.pointerLockElement===this.canvas),this.onFlightChange?.(!1);let e=this.controls.target.clone().sub(this.camera.position).normalize();this.pitch=Math.asin(Math.max(-1,Math.min(1,e.y))),this.yaw=Math.atan2(e.x,e.z),this.flyPos.copy(this.camera.position),this.touch=ux,this.looking=!1,this.controls.enabled=!1,this.camera.near=tx,this.camera.updateProjectionMatrix(),this.flyLookDirty=!0;let t=this.pendingArrival;this.pendingArrival=null,t&&(this.beginWalking(t.feet),this.pitch=0,this.onFlightChange?.(!0))}teardownFirstPerson(){this.explore=!1,this.walkMode=!1,this.onFlightChange?.(!1),this.player=this.playerPrev=null,this.tickAccumulator=0,this.jumpQueued=!1,this.sprintLatched=!1,this.lastJumpTap=0,this.pendingArrival=null,this.setLookLive(!1),this.pointerLockLook=!1,this.pointerLockWanted=!1,document.pointerLockElement===this.canvas&&document.exitPointerLock()}setLookLive(e){e||(this.pressed.clear(),this.touch=ux,this.sprintLatched=!1,this.jumpQueued=!1,this.looking=!1,this.lastJumpTap=0,this.lastForwardTap=0),this.lookLive=e,this.onLookSuspendedChange?.(this.isLookSuspended())}isLookSuspended(){return this.explore&&this.pointerLockLook&&!this.lookLive}setOnLookSuspendedChange(e){this.onLookSuspendedChange=e}requestPointerLock(){try{Promise.resolve(this.canvas.requestPointerLock()).catch(()=>{})}catch{}}isExploring(){return this.explore&&!this.walkMode}flyMove(e,t){this.touch={...this.touch,forward:e,strafe:t}}flyVertical(e,t){this.touch={...this.touch,[e]:t}}getFlySpeed(){return this.flySpeed}setFlySpeed(e){e!==this.flySpeed&&(this.flySpeed=e,this.onFlySpeedChange?.(e))}setOnFlySpeedChange(e){this.onFlySpeedChange=e}flyLook(e,t){this.yaw-=e*sx,this.pitch-=t*sx;let n=Math.PI/2-.02;this.pitch=Math.max(-n,Math.min(n,this.pitch)),this.flyLookDirty=!0}forwardVec(e){return e.set(Math.cos(this.pitch)*Math.sin(this.yaw),Math.sin(this.pitch),Math.cos(this.pitch)*Math.cos(this.yaw)).normalize()}updateFly(e){let t=this.forwardVec(this.tmpFwd);this.tmpRight.crossVectors(t,cx).normalize();let n=e=>+!!this.pressed.has(e),r=this.pressed.has(`Space`)||this.touch.rise,i=this.pressed.has(`ShiftLeft`)||this.pressed.has(`ShiftRight`)||this.touch.descend;jb({forward:n(`KeyW`)-n(`KeyS`)+this.touch.forward,strafe:n(`KeyD`)-n(`KeyA`)+this.touch.strafe,vertical:Number(r)-Number(i)},{forward:t,right:this.tmpRight},this.flySpeed,this.flyVelocity);let a=this.flyVelocity.lengthSq()>1e-6;a&&this.flyPos.addScaledVector(this.flyVelocity,Ab(e)),(a||this.flyLookDirty)&&(this.camera.position.copy(this.flyPos),this.camera.up.set(0,1,0),this.camera.lookAt(this.tmpDir.copy(this.flyPos).add(t)),this.flyLookDirty=!1,this.dirty=!0)}cellBoxes(e,t,n){if(this.bounds&&t<this.bounds.min.y)return Vb;let r=this.solidAt(e,t,n);return r?this.collision.boxesFor(r):null}groundName(e,t,n){return this.solidAt(e,t,n)?.name??null}solidAt(e,t,n){return E(b(e,t,n,this.clipAxis),this.clipY??null)?null:this.world?.getBlock(e,t,n)??null}climbableAt(e,t,n){return Qt(this.climbCellAt(e,t,n),()=>this.climbCellAt(e,t-1,n))}climbCellAt(e,t,n){let r=this.solidAt(e,t,n);return r?$t(r,this.registry?.blocks[r.id]?.blockType):null}walkInput(){let e=0,t=0;this.pressed.has(`KeyW`)&&(e+=1),this.pressed.has(`KeyS`)&&--e,this.pressed.has(`KeyD`)&&(t+=1),this.pressed.has(`KeyA`)&&--t,e+=this.touch.forward,t+=this.touch.strafe;let n=this.pressed.has(`Space`)||this.jumpQueued;return{forward:jc.clamp(e,-1,1),strafe:jc.clamp(t,-1,1),jump:n,sneak:this.pressed.has(`ShiftLeft`)||this.pressed.has(`ShiftRight`),sprint:this.sprintLatched,yaw:-this.yaw}}updateWalk(e){if(!this.player)return;let t=this.walkInput();for(this.tickAccumulator=Math.min(this.tickAccumulator+e,Hb);this.tickAccumulator>=pn;)this.tickAccumulator-=pn,this.playerPrev=this.player,this.player=Ln(this.player,t,this.collisionWorld()),this.jumpQueued=!1,this.tickViewEffects(this.playerPrev,this.player);(this.applyPlayerCamera(this.tickAccumulator/.05)||this.flyLookDirty)&&(this.flyLookDirty=!1,this.dirty=!0)}tickViewEffects(e,t){let n=t.onGround?Math.hypot(t.x-e.x,t.z-e.z):0;this.walkDistPrev=this.walkDist,this.walkDist+=n*Jb,this.bobPrev=this.bob,this.bob+=(Math.min(Kb,n)-this.bob)*qb,this.fovScalePrev=this.fovScale;let r=t.sprinting?Zb:1;this.fovScale+=(r-this.fovScale)*Qb}aimFov(e){this.baseFov===e&&this.fovElapsed>=$b||(this.fovFrom=this.baseFov,this.fovTo=e,this.fovElapsed=0)}updateFov(e){if(this.fovElapsed>=$b)return;this.fovElapsed=Math.min(this.fovElapsed+e,$b);let t=1-(1-this.fovElapsed/$b)**3;this.baseFov=this.fovFrom+(this.fovTo-this.fovFrom)*t,this.walkMode||(this.camera.fov=this.baseFov,this.camera.updateProjectionMatrix()),this.dirty=!0}applyFov(e){let t=this.fovScalePrev+(this.fovScale-this.fovScalePrev)*e,n=this.baseFov*t;Math.abs(this.camera.fov-n)>1e-4&&(this.camera.fov=n,this.camera.updateProjectionMatrix())}applyBob(e){let t=this.walkDistPrev+(this.walkDist-this.walkDistPrev)*e,n=this.bobPrev+(this.bob-this.bobPrev)*e;if(n<1e-4)return;let r=t*Math.PI,i=Math.sin(r),a=Math.cos(r);this.camera.translateX(-i*n*.5),this.camera.translateY(Math.abs(a*n)),this.camera.rotateZ(-jc.degToRad(i*n*Yb)),this.camera.rotateX(-jc.degToRad(Math.abs(Math.cos(r-.2)*n)*Xb))}applyPlayerCamera(e){let t=this.player;if(!t)return!1;let n=this.playerPrev??t,r=jc.clamp(e,0,1);this.walkEye.set(n.x+(t.x-n.x)*r,n.y+(t.y-n.y)*r+In(t),n.z+(t.z-n.z)*r);let i=!this.walkEye.equals(this.flyPos);return this.flyPos.copy(this.walkEye),this.camera.position.copy(this.flyPos),this.camera.up.set(0,1,0),this.camera.lookAt(this.tmpDir.copy(this.flyPos).add(this.forwardVec(this.tmpFwd))),this.applyFov(r),this.applyBob(r),i||this.bob>1e-4}updateLayerPan(e){if(!this.planMode||this.tween)return;let t=0,n=0;if(this.pressed.has(`KeyD`)&&(t+=1),this.pressed.has(`KeyA`)&&--t,this.pressed.has(`KeyW`)&&(n+=1),this.pressed.has(`KeyS`)&&--n,t===0&&n===0)return;this.tmpRight.setFromMatrixColumn(this.camera.matrix,0).normalize(),this.tmpFwd.setFromMatrixColumn(this.camera.matrix,1).normalize();let r=this.camera.position.distanceTo(this.controls.target),i=mx*(2*Math.tan(this.camera.fov*Math.PI/360)*r)*e;this.tmpDir.set(0,0,0).addScaledVector(this.tmpRight,t*i).addScaledVector(this.tmpFwd,n*i),this.camera.position.add(this.tmpDir),this.controls.target.add(this.tmpDir),this.dirty=!0}setLayerAxis(e){e!==this.clipAxis&&(this.clipAxis=e,this.clipY=void 0,this.placedTop=void 0,this.sliceHistogram=null,this.planSaved=null,this.updateLayerHighlight(),this.planMode&&this.tweenTo(this.computePlanView(),()=>{}),this.queueRebuild())}getLayerAxis(){return this.clipAxis}setLayerHighlight(e){e!==this.layerHighlight&&(this.layerHighlight=e,this.updateLayerHighlight())}isLayerHighlight(){return this.layerHighlight}updateLayerHighlight(){if(!this.planMode||!this.layerHighlight||this.sliceIsolate||!this.bounds){this.materials.setLayerHighlight(null),this.dirty=!0;return}let e=this.clipAxis,t=e===0?this.bounds.max.x:e===1?this.bounds.max.y:this.bounds.max.z,n=this.clipY===void 0?t+1:this.clipY;this.materials.setLayerHighlight({top:n,axis:e}),this.dirty=!0}rotatePlanView(e){if(!this.planMode||this.tween)return;let t=this.axisVector(this.clipAxis),n=Math.PI/2*e,r=this.controls.target.clone(),i=this.camera.position.clone().sub(r).applyAxisAngle(t,n);this.tweenTo({position:r.clone().add(i),target:r,up:this.camera.up.clone().applyAxisAngle(t,n).normalize(),near:this.camera.near,far:this.camera.far,minDistance:this.controls.minDistance,maxDistance:this.controls.maxDistance},()=>{})}axisVector(e){return new G(+(e===0),+(e===1),+(e===2))}computePlanView(){let e=this.bounds,t={x:e.max.x+1-e.min.x,y:e.max.y+1-e.min.y,z:e.max.z+1-e.min.z},n=new G((e.min.x+e.max.x+1)/2,(e.min.y+e.max.y+1)/2,(e.min.z+e.max.z+1)/2),r=this.clipAxis,i=r===0?{w:t.z,h:t.y}:r===1?{w:t.x,h:t.z}:{w:t.x,h:t.y},a=this.fovFor(`plan`)*Math.PI/180,o=2*Math.atan(Math.tan(a/2)*this.camera.aspect),s=Math.max(i.h/2/Math.tan(a/2),i.w/2/Math.tan(o/2),1)*1.12,c=r===0?e.max.x:r===1?e.max.y:e.max.z,l=r===0?e.min.x:r===1?e.min.y:e.min.z,u=T(this.clipY??null,this.visibleRange()),d=n.clone(),f=n.clone(),p=new G(0,1,0);r===0?(d.x=u,f.set(u+s,n.y,n.z)):r===1?(d.y=u,f.set(n.x,u+s,n.z),p.set(0,0,-1)):(d.z=u,f.set(n.x,n.y,u+s));let m=c+1-l;return{position:f,target:d,up:p,near:Math.max(.05,s*.02),far:s+m+10+s*4,minDistance:1,maxDistance:s*4}}alignToSlice(e,t){if(!this.bounds)return;this.forgetPivot();let n=T(this.clipY??null,this.visibleRange()),r=this.clipAxis,i=r===0?`x`:r===1?`y`:`z`,a=e[i]-t[i];t[i]=n,e[i]=n+a}syncControlsUp(){let e=this.controls;e._quat.setFromUnitVectors(this.camera.up,new G(0,1,0)),e._quatInverse.copy(e._quat).invert()}tweenTo(e,t){this.camera.near=Math.min(this.camera.near,e.near),this.camera.far=Math.max(this.camera.far,e.far),this.camera.updateProjectionMatrix(),this.controls.enabled=!1,this.tween={fromPos:this.camera.position.clone(),toPos:e.position,fromTarget:this.controls.target.clone(),toTarget:e.target,fromUp:this.camera.up.clone(),toUp:e.up,elapsed:0,duration:.5,onArrive:()=>{this.camera.near=e.near,this.camera.far=e.far,this.camera.updateProjectionMatrix(),this.controls.minDistance=e.minDistance,this.controls.maxDistance=e.maxDistance,this.controls.enabled=!0,this.syncControlsUp(),this.controls.update(),t()}}}async rebuildMeshes(){let e=this.world;if(!e)return;this.meshing=!0;let t=new El,n=new Map,r=[...e.chunkKeys()],i=new Ob(r),a=0,o=this.onMeshProgress,s=r.length,c=0;if(await Mi(e,this.pool,this.meshOptions(),e=>{this.disposed||(e.buckets.length>0&&a++,i.collect(e)&&i.flush(t,n,this.materials,e=>this.disposeGroup(e)),o&&o(c+=1,s))}).catch(e=>{throw this.disposeGroup(t),this.meshing=!1,this.meshQueued=!1,this.drainRevealQueue(),e}),this.disposed){this.disposeGroup(t);return}if(this.meshedChunks=a,this.group&&(this.scene.remove(this.group),this.disposeGroup(this.group)),this.scene.add(t),this.group=t,this.batchGroups=n,Hv.invalidate(this.renderer),this.dirty=!0,this.meshing=!1,this.meshQueued){this.meshQueued=!1,this.rebuildMeshes();return}this.drainRevealQueue();for(let e of this.retiredMaterials)e.dispose();this.retiredMaterials.length=0}meshOptions(){return{version:this.version,namespaces:this.namespaces,packs:this.packs,biome:this.biome,clipY:this.clipY,clipMin:C({top:this.slicePlane(),isolate:this.sliceIsolate},this.heightRange())??void 0,clipAxis:this.clipAxis,hidden:this.hiddenBlocks.size>0?this.hiddenBlocks:void 0,highlight:this.highlightBlock,stepOf:this.stepOf??void 0}}async remeshCells(e){let t=this.world,n=this.group;if(!t||!n)return;let r=this.batchGroups,i=Db(Ai(e.map(e=>({pos:e})))),a=new Ob(i);await ji(t,this.pool,i,this.meshOptions(),e=>{this.disposed||this.group!==n||a.collect(e)&&a.flush(n,r,this.materials,e=>this.disposeGroup(e))}),!(this.disposed||this.group!==n)&&(Hv.invalidate(this.renderer),this.dirty=!0)}sortTranslucent(e){by(this.batchGroups.values(),e)}computeIsoFrame(){let e=(this.tightFraming?this.framedBounds:null)??this.bounds,t=new G(e.min.x,e.min.y,e.min.z),n=new G(e.max.x+1,e.max.y+1,e.max.z+1),r=t.clone().add(n).multiplyScalar(.5),i=n.clone().sub(t).length()/2,a=new G(.7,.55,.7).normalize(),o=this.fovFor(`orbit`),s=this.tightFraming?Lv({points:Fv(e,Mv(this.group)),center:r,dir:a,fovDeg:o,aspect:this.camera.aspect,recenter:!1})??Lv({points:Pv(t,n),center:r,dir:a,fovDeg:o,aspect:this.camera.aspect,recenter:!1}):null,c=s?s.dist:i/Math.sin(o*Math.PI/360)*1.15,l=c*3;return{position:r.clone().addScaledVector(a,c),target:r,up:new G(0,1,0),near:Math.max(.05,i*.02),far:l+i*24,minDistance:i*.2,maxDistance:l}}applyCamStateInstant(e){this.camera.up.copy(e.up),this.camera.position.copy(e.position),this.controls.target.copy(e.target),this.camera.near=e.near,this.camera.far=e.far,this.camera.updateProjectionMatrix(),this.controls.minDistance=e.minDistance,this.controls.maxDistance=e.maxDistance,this.camera.lookAt(e.target),this.syncControlsUp(),this.controls.update(),this.dirty=!0}resize(){let e=this.canvas.clientWidth||1,t=this.canvas.clientHeight||1;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix();let n=this.renderer.domElement.width,r=this.renderer.domElement.height;for(let e of this.selectionLineMats)e.resolution.set(n,r);this.dirty=!0}updateSelectionChrome(e,t=0){if(this.updateStepBoxChrome(e,t),!this.selectionBox.visible)return;let n=this.renderer.domElement.height,r;if(e instanceof Jp)r=n/Math.max(1e-4,e.top-e.bottom);else{let e=Math.max(.001,this.camera.position.distanceTo(this.selectionBox.position));r=n/2/(Math.tan(this.camera.fov*Math.PI/360)*e)}let i=Math.min(xx,Math.max(bx,yx*r)),a=pb(r);for(let e of this.selectionLineMats)e.linewidth!==i&&(e.linewidth=i),e.dashed&&(e.dashSize=a.dashSize,e.gapSize=a.gapSize);this.selectionLabel.sprite.visible&&this.selectionLabel.setScreenHeight(Cx,r)}updateStepBoxChrome(e,t){let n=this.stepBox;if(!n?.group.visible)return;let r=this.renderer.domElement.height,i;if(e instanceof Jp)i=r/Math.max(1e-4,e.top-e.bottom);else{let e=Math.max(.001,this.camera.position.distanceTo(n.group.position));i=r/2/(Math.tan(this.camera.fov*Math.PI/360)*e)}n.update(this.camera.position,i,yx,t),this.stepLeader?.update(i,wx),this.siteLeader?.update(i,wx)}disposeGroup(e){e.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()})}dispose(){this.disposed=!0,this.stepBox?.dispose(),this.stepLeader?.dispose(),this.siteLeader?.dispose(),cancelAnimationFrame(this.raf),window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`keyup`,this.onKeyUp),this.canvas.removeEventListener(`pointerdown`,this.onCanvasPointerDown),this.canvas.removeEventListener(`contextmenu`,this.onCanvasContextMenu),this.canvas.removeEventListener(`wheel`,this.onCanvasWheel),window.removeEventListener(`pointermove`,this.onCanvasPointerMove),window.removeEventListener(`pointerup`,this.onCanvasPointerUp),document.removeEventListener(`pointerlockchange`,this.onPointerLockChange),this.controls.dispose(),this.pool.dispose(),this.group&&this.disposeGroup(this.group),this.batchGroups.clear(),this.selectionLabel.dispose(),this.selectionBox.traverse(e=>{let t=e;t.geometry?.dispose();let n=t.material;n&&(Array.isArray(n)?n:[n]).forEach(e=>e.dispose())}),this.materials.dispose();for(let e of this.retiredMaterials)e.dispose();this.retiredMaterials.length=0,this.environment.dispose(),this.sun.dispose(),this.renderer.dispose()}},Dx={assetVersion:`26.3`,files:{"aeronautics.msgpack":`3f0b0c95cd4e`,"create.msgpack":`a282249e71ea`,"minecraft.msgpack":`0a43a5e7c556`,"minecraft.registry.msgpack":`3bf198e731da`,"offroad.msgpack":`d4d2968020e7`,"pack.redstone-tweaks.msgpack":`a25eebe06509`,"simulated.msgpack":`8c08f2c0e65b`}};function Ox(){Pi(`/editor`),Li(Dx)}export{Cp as $,Oi as $t,q as A,bu as At,ju as B,na as Bt,kd as C,mp as Ct,Ou as D,Fl as Dt,mu as E,Hs as Et,El as F,W as Ft,Zd as G,qi as Gt,Ns as H,sa as Ht,tm as I,G as It,uf as J,Bi as Jt,$f as K,Ji as Kt,Pd as L,gp as Lt,Mf as M,Gp as Mt,Ep as N,Jc as Nt,bo as O,Nd as Ot,Z as P,kp as Pt,Us as Q,Ei as Qt,Hd as R,Xc as Rt,Fm as S,Mc as St,wf as T,yo as Tt,Ps as U,oa as Ut,ip as V,aa as Vt,of as W,Zi as Wt,Do as X,ki as Xt,To as Y,Xi as Yt,Eo as Z,Mi as Zt,Ev as _,_ as _n,Kd as _t,by as a,Or as an,id as at,Zp as b,ff as bt,Kv as c,mr as cn,qf as ct,Lv as d,ae as dn,wo as dt,oi as en,Qp as et,Rv as f,ue as fn,Co as ft,Ov as g,S as gn,Up as gt,Fv as h,x as hn,Jp as ht,fy as i,jr as in,gd as it,Xp as j,Ff as jt,X as k,Od as kt,Hv as l,Zn as ln,xo as lt,Mv as m,j as mn,Tl as mt,Ex as n,Kr as nn,jc as nt,dy as o,wr as on,Yf as ot,jv as p,M as pn,fp as pt,df as q,Ki as qt,yy as r,Yr as rn,Y as rt,iy as s,Ar as sn,Jf as st,Ox as t,Wr as tn,Nu as tt,Pv as u,Ft as un,So as ut,wv as v,qp as vt,Xl as w,bm as wt,_p as x,_m as xt,$_ as y,_f as yt,ku as z,ea as zt};