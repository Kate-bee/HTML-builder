const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
    if (err) console.log(err);
})
const stdout = process.stdout;
stdout.write('Привет, напиши текст! \n');
const stdin = process.stdin;
let lastIn;
stdin.on('data', data => {
    let arr = data.toString().split(' ');
    if (arr.indexOf('exit') == -1 && arr.indexOf('exit\r\n') == -1) {
        fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
            if (err) console.log(err);
        })
    } else if (arr.indexOf('exit') == 0 && arr.indexOf('exit\r\n') == 0) {
        exit();
    }
    else {
        if (arr.indexOf('exit') > 0) {
            arr.length = arr.indexOf('exit');
        }
        if (arr.indexOf('exit\r\n') > 0) {
            arr.length = arr.indexOf('exit\r\n');
        }
        lastIn = arr.join(' ');
        fs.appendFile(path.join(__dirname, 'text.txt'), lastIn, (err) => {
            if (err) console.log(err);
        });
        exit();
    }

})
function exit() {
    stdout.write('                                    \nВы ввели "exit" или "cntr + c", \nваш текст находится в файле text.txt.\nУдачи!!!\n---------------------------------------  \n');
    process.exit();
}
process.on('SIGINT', exit);
