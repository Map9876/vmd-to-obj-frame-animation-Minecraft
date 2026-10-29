const fs=require('fs');const NBT=require('prismarine-nbt');
const buf=fs.readFileSync(process.argv[2]);
NBT.parse(buf).then(r=>{
  console.log('keys of result:', Object.keys(r));
  console.log('parsed type:', typeof r.parsed, Array.isArray(r.parsed)?'array':'');
  console.log('parsed typeof value:', typeof (r.parsed&&r.parsed.value));
  console.log('JSON sample:', JSON.stringify(r.parsed).slice(0,300));
}).catch(e=>{console.error(e);process.exit(1)});
