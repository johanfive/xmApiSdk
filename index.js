// Examples making use of the lib here.
// Delete this file before publish.
// Also delete the associate npm script in package.json
var Xm = require('./src');

var config = {
    hostname: 'yourHostname',
    password: 'yourPassword',
    username: 'yourUsername'
};


var xM = Xm(config);
console.log(xM.people.path);

// xM.people.getAll()
//     .then(data => console.log(data))
//     .catch(e => console.error(e.message));


const getWwFullName = async () => {
    const wonderWoman = await xM.people.search('wonder')
        .then(data => data[0])
        .catch(e => console.error(e.message));
    const wwFullName = wonderWoman.firstName + ' ' + wonderWoman.lastName;
    console.log(wwFullName);
}

getWwFullName(); // Diana Prince

xM.getOAuthTokenByPasswordGrantType('xMclientId', 'xMusername', 'xMsecret')
    .then(data => console.log(data))
    .catch(e => console.error(e.message));

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