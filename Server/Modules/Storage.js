module.exports = storage;
var fs = require('fs');

function storage(filepath) {
    'use strict';

    return {
      Update : Update,
      Read : Read,
    }
    filepath = filepath;

    function Update(newObject) {
        fs.writeFileSync(filepath, JSON.stringify(newObject));
    }   

    function Read() {
        if (!(fs.existsSync(filepath))) {
            return -1;
        }
        return JSON.parse(fs.readFileSync(filepath , 'utf8'));
    }   

}





