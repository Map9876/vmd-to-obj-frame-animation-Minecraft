import fs from 'fs';
import zlib from 'zlib';
const f = process.argv[2];
const buf = zlib.gunzipSync(fs.readFileSync(f));
// NBT tag type byte is right before the 2-byte name length of a named tag.
// Find "BlockStates" occurrences and report the preceding type byte.
const name = 'BlockStates';
const nb = Buffer.from(name, 'utf8');
let i = 0, hits = 0;
while ((i = buf.indexOf(nb, i)) !== -1) {
  // name length (2 bytes) precedes name; type byte precedes that
  const nameLen = buf.readUInt16BE(i - 2);
  if (nameLen === name.length) {
    const typeByte = buf.readUInt8(i - 3);
    console.log('BlockStates at', i, 'type byte =', typeByte, '(11=IntArray,12=LongArray)');
    hits++;
  }
  i += name.length;
}
if (hits === 0) console.log('BlockStates not found as named tag (maybe different structure)');
// Also scan for "Size" and its children
for (const key of ['Size','x','y','z','BlockStatePalette','BlockStates']) {
  const k = Buffer.from(key,'utf8'); let j=0;
  while((j=buf.indexOf(k,j))!==-1){ const nl=buf.readUInt16BE(j-2); if(nl===key.length){console.log(key,'typebyte',buf.readUInt8(j-3)); break;} j+=key.length; }
}
