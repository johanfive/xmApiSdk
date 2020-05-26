// manual test is a place to quickly experiment with new features or code changes.
// Whereas demo.js is meant to do just that, demonstrate some of the usage of the SDK

const xmSDK = require('./src/index');
const config = require('./config');

async function getAllUsers() {
  const { body: tokens } = await xmSDK.getTokens(config);
  const xmClient = xmSDK.getClient({ ...config, ...tokens });
  const xmPeople = xmClient.getPeopleMethods();
  return xmPeople.getAll();
}

getAllUsers()
  .then(console.log)
  .catch(console.error);
