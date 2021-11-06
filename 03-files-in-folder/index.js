const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, array) => {//когда fs.readdir()или fs.readdirSync()вызывается с withFileTypesпараметром, установленным в true, результирующий массив заполняется объектами <fs.Dirent>
    if (err) throw err;
    array.forEach((el) => {
        if (el.isFile()) {
            fs.stat(path.join(path.join(__dirname, './secret-folder/'), el.name), (err, stats) => {
                if (err) throw err;
                let a = el.name;
                console.log(`${a.slice(0, a.lastIndexOf('.'))} -${a.slice(a.lastIndexOf('.') + 1)} - ${stats.size} b`);
            });
        }
    })
})