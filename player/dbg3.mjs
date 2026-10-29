import fs from 'fs';
import zlib from 'zlib';
function readNBT(buf){let p=0;const u16=()=>{const v=buf.readUInt16BE(p);p+=2;return v;};const u8=()=>{const v=buf.readUInt8(p);p+=1;return v;};const i8=()=>{const v=buf.readInt8(p);p+=1;return v;};const i16=()=>{const v=buf.readInt16BE(p);p+=2;return v;};const i32=()=>{const v=buf.readInt32BE(p);p+=4;return v;};const i64=()=>{const hi=buf.readInt32BE(p);const lo=buf.readInt32BE(p+4);p+=8;return (BigInt(hi>>>0)<<32n)|BigInt(lo>>>0);};const str=()=>{const n=u16();const s=buf.toString('utf8',p,p+n);p+=n;return s;};function payload(t){switch(t){case 0:return null;case 1:return i8();case 2:return i16();case 3:return i32();case 4:return i64();case 5:return i32();case 6:return i32();case 7:{const n=i32();const a=[];for(let k=0;k<n;k++)a.push(i8());return a;}case 8:return str();case 9:{const st=u8();const n=i32();const a=[];for(let k=0;k<n;k++)a.push(payload(st));return{type:st,value:a};}case 10:{const o={};while(true){const nt=u8();if(nt===0)break;const nm=str();o[nm]={type:nt,value:payload(nt)};}return o;}case 11:{const n=i32();const a=[];for(let k=0;k<n;k++)a.push(i32());return a;}case 12:{const n=i32();const a=[];for(let k=0;k<n;k++)a.push(i64());return a;}default:throw new Error('unknown tag '+t);}}const rootType=u8();const rootName=str();return{type:rootType,name:rootName,value:payload(rootType)};}
function decode(file){
  const parsed=readNBT(zlib.gunzipSync(fs.readFileSync(file)));
  const regions=parsed.value.Regions.value;
  for(const rname of Object.keys(regions)){
    const reg=regions[rname].value;
    const names=reg.BlockStatePalette.value.value.map(c=>c.Name.value);
    const paletteSize=names.length;
    const bits=Math.max(2,Math.ceil(Math.log2(paletteSize)));
    const mask=(1n<<BigInt(bits))-1n;
    const longs=reg.BlockStates.value;
    const size=reg.Size.value;
    const sx=size.x.value,sy=size.y.value,sz=size.z.value;
    let bad=0;
    for(let z=0;z<sz;z++)for(let y=0;y<sy;y++)for(let x=0;x<sx;x++){
      const e=x+y*sx+z*sx*sy;const bitIndex=e*bits;const o=Math.floor(bitIndex/64);const s=bitIndex%64;
      if(o>=longs.length||typeof longs[o]==='undefined'){bad++; if(bad<=3)console.log('  OOB o=',o,'len=',longs.length,'x',x,'y',y,'z',z,'sx',sx,'sy',sy,'sz',sz); continue;}
      const lv=longs[o];
      if(typeof lv!=='bigint'){console.log('  NON-BIGINT at o=',o,'type=',typeof lv); return;}
      let l=lv>>BigInt(s);
      if(s+bits>64&&o+1<longs.length){l|=longs[o+1]<<BigInt(64-s);}
      const idx=Number(l&mask);
      if(idx===0)continue;
    }
    console.log(file,'ok, palette=',paletteSize,'bits=',bits,'bad(voxels beyond array)=',bad);
  }
}
for(const f of process.argv.slice(2)) decode(f);
