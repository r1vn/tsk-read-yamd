'use strict'; // 2021-04-14 06.06
const fs = require('fs');
const path = require('path');
/**
- requires the path to be absolute
- creates the directory the file is to be located at if it doesn't exist
*/
function xdFileWrite(abspath, data) {
    const dir = path.parse(abspath).dir;
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(abspath, data);
}
exports.xdFileWrite = xdFileWrite;
