const fs = require('fs');
const today = new Date();

const out = fs.createWriteStream('./out.log', { flags: 'a' });
const err = fs.createWriteStream('./err.log', { flags: 'a' });

const c_obj = new console.Console(out, err);

c_obj.log(today);

