// Making use of the lib here.
var Xm = require('./src');

var config = {
    hostname: 'yourHostName',
    password: 'secret',
    username: 'yourUserName'
};


var xM = Xm(config);
console.log(xM.people.path);

xM.people.getAll()
    .then(data => console.log(data))
    .catch(e => console.error(e.message));


async function getWwFullName() {
    const wonderWoman = await xM.people.search('wonder')
        .then(data => data.data[0])
        .catch(e => console.error(e.message));
    const wwFullName = wonderWoman.firstName + ' ' + wonderWoman.lastName;
    console.log(wwFullName);
}

getWwFullName();


// xM.people.getDevicesOf('batman', true, 'CA?')
// .then(data => console.log(data))
// .catch(error => console.error(error.message));


// var person = {
//     firstName: 'sponge',
//     lastName: 'bob',
//     roles: ['Standard User'],
//     targetName: 'spongebob'
// };
// xM.people.add(person)
// .then(data => console.log(data))
// .catch(error => console.error(error.message));


// var person = {
//     id: '795c18c0-3889-4eda-9c67-bd8a641ccd1b',
//     roles: ['No Access User']
// };
// xM.people.edit(person)
// .then(data => console.log(data))
// .catch(error => console.error(error.message));


// xM.people.delete('795c18c0-3889-4eda-9c67-bd8a641ccd1b')
// .then(data => console.log(data))
// .catch(error => console.error(error.message));


// xM.people.getByIdOrTargetName('795c18c0-3889-4eda-9c67-bd8a641ccd1b')
// .then(data => console.log(data))
// .catch(error => console.error(error.message));