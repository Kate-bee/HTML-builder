const fs = require('fs');
const path = require('path');
const sourceDir = path.join(__dirname, "files");
const destinationDir = path.join(__dirname, "files-copy");

async function deleteFolder() {
    const prom = fs.promises;
    await prom.rmdir(destinationDir, { recursive: true, force: true }, (err) => {
        if (err) throw err;
    });

}

async function createFolder() {

    await fs.mkdir(destinationDir, {}, (err) => {
        if (err) throw err;
    });

}
async function fillFolder() {

    await fs.readdir(sourceDir, { withFileTypes: true }, (err, array) => {
        if (err) throw err;
        array.forEach(el => {
            if (el.isFile()) {
                fs.copyFile(path.join(sourceDir, el.name), path.join(destinationDir, el.name), (err) => {
                    if (err) throw err;
                });
            };
        });
    });
}
async function go() {
    await deleteFolder();
    await createFolder();
    await fillFolder();
}

go();