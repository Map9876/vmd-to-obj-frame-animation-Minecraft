const fs = require('fs');
const NBT = require('prismarine-nbt');
const file = process.argv[2];
const buf = fs.readFileSync(file);
NBT.parse(buf).then(({parsed}) => {
  function walk(tag, depth, path) {
    const pad = '  '.repeat(depth);
    const t = tag.type;
    if (t === 'compound') {
      console.log(pad + path + ': compound');
      for (const k of Object.keys(tag.value)) walk(tag.value[k], depth+1, k);
      return;
    }
    if (t === 'list') {
      const lt = tag.value.type;
      const len = tag.value.value.length;
      console.log(pad + path + ': list<' + lt + '> len=' + len);
      if (lt === 'compound' && len) walk(tag.value.value[0], depth+2, '[0]');
      if (depth < 4 && lt !== 'compound' && len) console.log(pad + '  sample: ' + JSON.stringify(tag.value.value.slice(0,6)));
      return;
    }
    let extra = '';
    if (t === 'int_array' || t === 'long_array' || t === 'byte_array')
      extra = ' len=' + tag.value.length + ' [' + Array.from(tag.value.slice(0,8)).join(',') + '...]';
    else if (t === 'string') extra = ' = ' + JSON.stringify(String(tag.value).slice(0,60));
    else if (['byte','short','int','long','float','double'].includes(t)) extra = ' = ' + tag.value;
    console.log(pad + path + ': ' + t + extra);
  }
  walk(parsed, 0, 'ROOT('+parsed.name+')');
}).catch(e=>{console.error('ERR',e);process.exit(1);});
