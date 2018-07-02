/**
 * This script should be converted into a "prebuild" script
 * that will run automatically when the "build" script runs
 */
var fs = require('fs');

function cleanUp(filename) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            console.error('Something did not go too well...' + err);
        }
        var stripped = data.replace(/\s+\/\/ __TestOnlyStart__((.|\n)*)\/\/ __TestOnlyEnd__\n/gm, '');
        fs.writeFile(filename, stripped, 'utf-8', function (err) {
            if (err) throw err;
            console.log(filename + ' modified successfully.');
        });
    });
}

if(!process.argv[2]) {
    console.log('File name missing. Provide the name of the file to clean up.');
} else {
    cleanUp(process.argv[2]);
}
