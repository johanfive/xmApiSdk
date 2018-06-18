// Making use of the lib here.
var Xm = require('./src');

var config = {
    hostname: 'yourHostName',
    password: 'secret',
    username: 'yourUserName'
};


var xM = Xm(config);
console.log(xM.people.path);
xM.people.getAll();
delete config.hostname;
xM.people.getAll(['roles', 'supervisors']);
xM.people.delete('123456');
xM.people.search('light');
xM.people.search('light saber', ['roles', 'supervisors']);
xM.people.getByIdOrTargetName('byId');
xM.people.getByIdOrTargetName('byId', ['roles']);

var prop = {
    propertyName: '?ZZZ',
    propertyValue: 'AAA&'
};
xM.people.getByProp(prop, ['supervisors']);
