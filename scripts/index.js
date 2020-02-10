const xmSDK = require('../src');
const config = require('../config');
const createXusers = require('./createXmUsers');
// const deleteXusers = require('./deleteXmUsers');

const NUM_OF_USERS = 5;
const SUFFIX = 'Bobby';

const createABunch = function createABunch(xmPeople) {
  const usersToCreate = createXusers(NUM_OF_USERS, SUFFIX);
  return Promise.all(usersToCreate.map(newUser => xmPeople.create(newUser)));
};

// const deleteABunch = function deleteABunch(xmPeople) {
//   const usersToDelete = deleteXusers(NUM_OF_USERS, SUFFIX);
//   return Promise.all(usersToDelete.map(targetName => xmPeople.delete(targetName)));
// };

xmSDK.getTokens(config)
  .then(({ body }) => {
    const xmClient = xmSDK.getClient({ ...config, ...body });
    return xmClient.getPeopleMethods();
  })
  .then(createABunch)
  // .then(deleteABunch)
  .then(res => res.forEach(({ body }) => {
    console.log(`${body.targetName}: Success`);
  }))
  .catch(e => console.error(e));
