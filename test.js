const fs = require('fs-extra');

var walk = function (dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if(file.substr(file.length-4,file.length)===".sol")console.log(file)
            results.push(file);
        }
    });
    return results;
};

walk("contracts");