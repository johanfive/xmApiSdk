// Making use of the lib here.


var XM = require('./src');

var xm = XM('secret');
xm.people.getAll();
xm.groups.edit('aTeam');

var xm2 = XM('secret2');
xm2.groups.deleteGroup('deleteThisOne');
xm2.people.add({name: 'name'});