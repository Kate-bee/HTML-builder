const fs = require('fs');
const path = require('path');
const stdout = process.stdout;
const destinationFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, array) => {
    if (err) throw err;
    array.forEach(el => {
        if (el.isFile()) {
            const readStream = fs.createReadStream(path.join(__dirname, 'styles', el.name));
            if (path.parse(el.name).ext === '.css') {
                readStream.on('data', function (data) {
                    destinationFile.write(`${data.toString()}\n`);
                });
            }
        }
    });
});