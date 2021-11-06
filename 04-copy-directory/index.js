const fs = require('fs');
const path = require('path');
const sourceDir = path.join(__dirname, "./files");
const destinationDir = path.join(__dirname, "./files-copy");
fs.mkdir(destinationDir, { recursive: true }, () => {//recursive: false - в этом случае вызов, fs.mkdir()когда path является существующим каталогом, приводит к ошибке.
});
fs.readdir(sourceDir, { withFileTypes: true }, (err, array) => {//когда fs.readdir()или fs.readdirSync()вызывается с withFileTypesпараметром, установленным в true, результирующий массив заполняется объектами <fs.Dirent>
    if (err) throw err;
    array.forEach((el) => {
        fs.copyFile(path.join(sourceDir, el.name), path.join(destinationDir, el.name), () => { });
    })
})