// const createUsers = require('./scripts/createXmUsers');
// const deleteUsers = require('./scripts/deleteXmUsers');
const XmApi = require('./src');
const config = require('./config');

const xMapi = new XmApi(config);

// const handleResponse = ({ body }) => console.log(body);
const handleError = e => console.error(e);

const bob = {
  firstName: 'Bob',
  lastName: 'Lawblaw',
  targetName: 'Boblawblaw',
  roles: ['Standard User']
};
xMapi.people.getAPersonByQuery({ firstName: 'Bob' })
  .then(({ body }) => Promise.resolve(body.total))
  .then(matches => {
    if (matches === 0) {
      console.log('Bob not found. Creating Bob.');
      return xMapi.people.createAPerson(bob);
    }
    return Promise.reject('Bob already exists. Skipped all the things.');
  })
  .then(({ body }) => {
    console.log('Bob successfully created');
    return Promise.resolve(body.targetName);
  })
  .then(targetName => {
    console.log('Looking up Bob by id/targetName');
    return xMapi.people.getAPersonById(targetName);
  })
  .then(({ body: { id, lastName } }) => {
    console.log('Bob found');
    return Promise.resolve({ id, lastName });
  })
  .then(({ id, lastName }) => {
    console.log(`Modifying Bob's lastName from ${lastName} to "loblo"`);
    return xMapi.people.modifyAPerson({ id, lastName: 'loblo' });
  })
  .then(({ body: { firstName, lastName, targetName } }) => {
    console.log(`Bob's lastName is now ${lastName}`);
    const fullName = `${firstName}${lastName}`;
    console.log(`Deleting ${fullName}. Bye ${fullName}...`);
    return xMapi.people.deleteAPerson(targetName);
  })
  .then((response) => {
    if (response.body && response.body.firstName && response.body.lastName) {
      const { firstName, lastName } = response.body;
      console.log(`Successfully deleted ${firstName}${lastName}`);
    }
    console.log(response);
    console.log('THE END');
  })
  .catch(handleError);


// Groups individual checks:

// xMapi.groups.getGroups().then(handleResponse).catch(handleError);
// xMapi.groups.getAGroup('Marvel', ['supervisors', 'observers']).then(handleResponse).catch(handleError);
// xMapi.groups.getAGroupsSupervisors('marvel').then(handleResponse).catch(handleError);
// xMapi.groups.createAGroup({ targetName: 'deletethis' }).then(handleResponse).catch(handleError);
// xMapi.groups.deleteAGroup('deletethis').then(handleResponse).catch(handleError);


// People individual checks:

// xMapi.people.getPeople()
//   .then(handleResponse)
//   .catch(handleError);

// xMapi.people.createAPerson(bob).then(handleResponse).catch(handleError);

// const PERSON = 'wonderwoman';
// xMapi.people.getAPersonById(
//   PERSON,
//   ['roles', 'supervisors']
// ).then(handleResponse).catch(handleError);

// xMapi.people.getAPersonByQuery(
//   { firstName: 'diana' },
//   true
// ).then(handleResponse).catch(handleError);


// // wrapping those in a function so that the http request doesn't happen
// // if the Promise.all() block get commented out
// const wwDevices = () => xMapi.people.getAPersonsDevices(PERSON);
// const wwGroups = () => xMapi.people.getAPersonsGroups(PERSON);
// const wwSupervisors = () => xMapi.people.getAPersonsSupervisors(PERSON);
// // and therefore have to call these funcs here
// Promise.all([wwDevices(), wwGroups(), wwSupervisors()])
//   .then(responses => responses.forEach(handleResponse))
//   .catch(handleError);


// createUsers(5, 'lol').forEach(user => {
//   console.log(`${user.targetName} to be created`);
//   xMapi.people.createAPerson(user)
//     .then(({ body }) => console.log(`Successfully created ${body.targetName}`))
//     .catch(e => console.error(e));
// });

// deleteUsers(5, 'lol').forEach(targetName => {
//   console.log(`${targetName} to be deleted`);
//   xMapi.people.deleteAPerson(targetName)
//     .then(({ body }) => console.log(`Successfully deleted ${body.targetName}`))
//     .catch(e => console.error(e));
// });

// createUsers(5, 'lol').forEach(user => {
//   console.log(`${user.targetName} to be created`);
//   // TODO: implement addMemberToGroup(user, group).then().catch();
// });
