import fs from 'fs';
import zlib from 'zlib';
function readNBT(buf){let p=0;const u16=()=>{const v=buf.readUInt16BE(p);p+=2;return v;};const u8=()=>{const v=buf.readUInt8(p);p+=1;return v;};const i8=()=>{const v=buf.readInt8(p);p+=1;return v;};const i16=()=>{const v=buf.readInt16BE(p);p+=2;return v;};const i32=()=>{const v=buf.readInt32BE(p);p+=4;return v;};const i64=()=>{const hi=buf.readInt32BE(p);const lo=buf.readInt32BE(p+4);p+=8;return (BigInt(hi>>>0)<<32n)|BigInt(lo>>>0);};const str=()=>{const n=u16();const s=buf.toString('utf8',p,p+n);p+=n;return s;};function payload(t){switch(t){case 0:return null;case 1:return i8();case 2:return i16();case 3:return i32();case 4:return i64();case 5:return i32();case 6:return i32();case 7:{const n=i32();const a=[];for(let k=0;k<n;k++)a.push(i8());return a;}case 8:return str();case 9:{const st=u8();const n=i32();const a=[];for(let k=0;k<n;k++)a.push(payload(st));return{type:st,value:a};}case 10:{const o={};while(true){const nt=u8();if(nt===0)break;const nm=str();o[nm]={type:nt,value:payload(nt)};}return o;}case 11:{const n=i32();const a=[];for(let k=0;k<n;k++)a.push(i32());return a;}case 12:{const n=i32();const a=[];for(let k=0;k<n;k++)a.push(i64());return a;}default:throw new Error('unknown tag '+t);}}const rootType=u8();const rootName=str();return{type:rootType,name:rootName,value:payload(rootType)};}
for (const f of process.argv.slice(2)) {
  const parsed = readNBT(zlib.gunzipSync(fs.readFileSync(f)));
  const regions = parsed.value.Regions.value;
  for (const rname of Object.keys(regions)) {
    const reg = regions[rname].value;
    const pal = reg.BlockStatePalette.value.value;
    const paletteSize = pal.length;
    const bits = Math.max(2, Math.ceil(Math.log2(paletteSize)));
    const longs = reg.BlockStates.value;
    const size = reg.Size.value;
    const sx=size.x.value, sy=size.y.value, sz=size.z.value;
    const volume = sx*sy*sz;
    const expectedLongs = Math.ceil(volume*bits/64);
    console.log(f, rname, 'pal=',paletteSize,'bits=',bits,'vol=',volume,'longs.len=',longs.length,'expectedLongs=',expectedLongs,'maxBitIndex=',(volume-1)*bits,'maxO=',Math.floor((volume-1)*bits/64));
  }
}
