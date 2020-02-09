/* eslint-disable camelcase */
const xmSDK = require('./src/index');
const config = require('./config');

// // LONG STORY SHORT__________________________________________
// async function getAllTheThings() {
//   const { body: tokens } = await xmSDK.getTokens(config);
//   const xmClient = xmSDK.getClient({ ...config, ...tokens });
//   const xmPeople = xmClient.getPeopleMethods();
//   const xmGroups = xmClient.getGroupsMethods();
//   const allTheThings = { users: [], groups: []};
//   return xmPeople.getAll()
//     .then(({ body }) => {
//       allTheThings.users = body.data;
//       return xmGroups.getAll();
//     })
//     .then(({ body }) => {
//       allTheThings.groups = body.data;
//       return allTheThings;
//     });
// }

// getAllTheThings()
//   .then(res => console.log(res))
//   .catch(e => console.error(e));
// // __________________________________________________________

// LONG STORY LONG
// Here is the DB in your app
const store = {
  userConfig: {
    hostname: null,
    clientId: null,
    access_token: null,
    refresh_token: null
  },
  getTokens: function getTokens() {
    if (!this.userConfig.access_token) {
      console.log('There are no tokens in the data store');
    }
    return Promise.resolve({
      access_token: this.userConfig.access_token,
      refresh_token: this.userConfig.refresh_token
    });
  },
  setTokens: function setTokens(tokens) {
    this.userConfig.access_token = tokens.access_token;
    this.userConfig.refresh_token = tokens.refresh_token;
    console.log('The new tokens are stored');
    return Promise.resolve(tokens);
  },
  setHost: function setHost(ui) {
    this.userConfig.hostname = ui.hostname;
    this.userConfig.clientId = ui.clientId;
    console.log('hostname and clientId are stored');
    return Promise.resolve(ui);
  },
  getHost: function getHost() {
    return Promise.resolve({
      hostname: this.userConfig.hostname,
      clientId: this.userConfig.clientId
    });
  }
};

// Here is a function for the initiation phase of your app, or maybe in your middleware ¯\_(ツ)_/¯
// This function takes an access_token and a refresh_token and returns the xM API client
function getXmClient(tokens) {
  return store.getHost()
    .then(({ hostname, clientId }) => {
      const config = {
        hostname,
        clientId,
        ...tokens,
        // when the access_token expires and the SDK makes use of the refresh_token
        // this function gives you the new tokens.
        onTokenChange: ({ access_token, refresh_token }) => console.log(
          `New tokens: a: ${access_token}, r: ${refresh_token}`
        )
      };
      console.log('Getting the xmApiClient with hostname clientId and tokens, not username password');
      return xmSDK.getClient(config);
    });
}

// This simulates a user filling a form with credentials
function asyncPromptForCredz() {
  console.log('Please login');
  console.log('User types thingz...');
  const userInput = config;
  console.log('User is done and presses enter.');
  console.log('Username password will be used to request tokens');
  console.log('hostname and clientId will be saved in the data store, but not username password');
  return store.setHost(userInput);
}

const handleError = e => console.error(e);

store.getTokens()
  .then(({ access_token, refresh_token }) => {
    if (access_token || refresh_token) {
      console.log('We already had the tokens in store');
      return { access_token, refresh_token };
    }
    console.log('First time user');
    return asyncPromptForCredz().then(xmSDK.getTokens).then(({ body }) => {
      console.log('xM API returned new tokens');
      return store.setTokens(body);
    });
  })
  .then(getXmClient)
  .then(xmClient => {
    // The client is designed to give a banana without the gorilla and the jungle:
    const xmPeople = xmClient.getPeopleMethods();

    // Meat of your app here

    // The Life of Bob
    const bob = {
      firstName: 'Bob',
      lastName: 'Lawblaw',
      targetName: 'Boblawblaw',
      roles: ['Standard User']
    };

    // "return" here ensures errors are handled by the final catch statement
    return xmPeople.getByQuery({ firstName: 'Bob' })
      .then(({ body }) => Promise.resolve(body.total))
      .then(matches => {
        if (matches === 0) {
          console.log('Bob not found. Creating Bob.');
          return xmPeople.create(bob);
        }
        return Promise.reject('Bob already exists. Skipped all the things.');
      })
      .then(({ body }) => {
        console.log('Bob successfully created');
        return Promise.resolve(body.targetName);
      })
      .then(targetName => {
        console.log('Looking up Bob by id/targetName');
        return xmPeople.getById(targetName);
      })
      .then(({ body: { id, lastName } }) => {
        console.log('Bob found');
        return Promise.resolve({ id, lastName });
      })
      .then(({ id, lastName }) => {
        console.log(`Modifying Bob's lastName from ${lastName} to "loblo"`);
        return xmPeople.modify({ id, lastName: 'loblo' });
      })
      .then(({ body: { firstName, lastName, targetName } }) => {
        console.log(`Bob's lastName is now ${lastName}`);
        const fullName = `${firstName}${lastName}`;
        console.log(`Deleting ${fullName}. Bye ${fullName}...`);
        return xmPeople.delete(targetName);
      })
      .then((response) => {
        if (response.body && response.body.firstName && response.body.lastName) {
          const { firstName, lastName } = response.body;
          console.log(`Successfully deleted ${firstName}${lastName}`);
        }
        console.log(response);
        console.log('THE END');
      });

    // // People individual checks
    // // These are commented out as they're only meant for quick tests on People methods one at a time
    // const handleResponse = res => console.log(res.body);

    // return xmPeople.getAll()
    //   .then(handleResponse);

    // const PERSON = 'wonderwoman';
    // return xmPeople.getById(
    //   PERSON,
    //   ['roles', 'supervisors']
    // ).then(handleResponse);

    // return xmPeople.getByQuery(
    //   { firstName: 'diana' },
    //   true
    // ).then(handleResponse);

    // // wrapping those in a function so that the http request doesn't fire immediately
    // // if the Promise.all() block gets commented out
    // const wwDevices = () => xmPeople.getDevices(PERSON);
    // const wwGroups = () => xmPeople.getGroups(PERSON);
    // const wwSupervisors = () => xmPeople.getSupervisors(PERSON);
    // // therefore have to call these funcs here with ()
    // return Promise.all([wwDevices(), wwGroups(), wwSupervisors()])
    //   .then(responses => responses.forEach(handleResponse));
  })
  .catch(handleError);
