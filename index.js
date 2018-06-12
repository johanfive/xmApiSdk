// Making use of the lib here.
var Xm = require('./src');

var config = {
    hostname: 'yourHostName',
    username: 'yourUserName',
    etc: 'etc...'
};


var xM = Xm(config);
xM.people.getAll();
delete config.hostname;
console.log(xM.people.path);
xM.people.getAll();
xM.people.delete('123456');
xM.people.search('light');
