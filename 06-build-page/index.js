const fs = require('fs');
const path = require('path');
const destinationDir = path.join(__dirname, "./project-dist");
fs.mkdir(destinationDir, { recursive: true }, () => { });
const destinationFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
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
/*const sourceAssets = path.join(__dirname, "./assets");
const destinationAssets = path.join(destinationDir, "./assets");
fs.mkdir(destinationAssets, { recursive: true }, () => {//recursive: false - в этом случае вызов, fs.mkdir()когда path является существующим каталогом, приводит к ошибке.
});
fs.readdir(sourceAssets, { withFileTypes: true }, (err, array) => {//когда fs.readdir()или fs.readdirSync()вызывается с withFileTypesпараметром, установленным в true, результирующий массив заполняется объектами <fs.Dirent>
    if (err) throw err;
    array.forEach((el) => {
        let sourcePath = path.join(sourceAssets, el.name);
        let destinationPath = path.join(destinationAssets, el.name);
        if (el.isDirectory()) {
            fs.mkdir(destinationPath, { recursive: true });
            copyFiles(sourcePath, destinationPath);
        } else {
            fs.copyFile(sourcePath, destinationPath, () => { });
        }
    })
})*/
const sourceAssets = path.join(__dirname, 'assets');
const copy = async (source, destination) => {
    await fs.mkdir(destination, { recursive: true }, () => { });
    fs.readdir(source, { withFileTypes: true }, (err, array) => {
        array.forEach((el) => {
            let sourcePath = path.join(source, el.name);
            let destinationPath = path.join(destination, el.name);
            if (el.isDirectory()) {
                copy(sourcePath, destinationPath);
            } else {
                fs.copyFile(sourcePath, destinationPath, () => { });
            }
        });
    });
};
const copyDir = async (source, destination) => {
    await fs.mkdir(destination, { recursive: true }, () => { });
    const destinationDeeper = path.join(destination, 'assets');
    await copy(source, destinationDeeper);
};

copyDir(sourceAssets, destinationDir);


const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
function copyHtml(template, components) {
    fs.readFile(template, (err, template) => {
        if (err) throw err;
        let html = template.toString();
        fs.readdir(components, (err, arr) => {
            if (err) throw err;
            arr.forEach((el) => {
                let tag = el.split(".")[0];
                const re = new RegExp(`{{${tag}}}`);
                fs.readFile(path.join(components, el), (err, data) => {
                    if (err) throw err;
                    html = html.replace(re, data);
                    setTimeout(() => fs.writeFile(path.join(__dirname, "project-dist", "index.html"), html, (err) => {
                        if (err) throw err;
                    }), 3000);
                });
            });
        });
    });
}
copyHtml(template, components);
