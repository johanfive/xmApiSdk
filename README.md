# xM API JS SDk
`ES5` Vanilla `Javascript` methods to interact with [xMatters REST API](https://help.xmatters.com/xmapi/index.html#xmatters-rest-api)

Intended for use in `Node.js` apps. (`No dependencies`, but requires versions of Node that have `Promises` natively)

Work In Progress:
+ Prior commits in this repo show the *wonky*, **early stages** of the implementation we currently have in a private repo.
+ Commits moving forward are an attempt at rearchitecting the SDK from scratch.

While our current version gets the job done, I believe it can be improved.

This project is great as it's allowed me to gain a much deeper understanding of `prototypal inheritance` in Javascript.
And maybe even a new perspective on `Promises error handling`.

## Usage
```js
const xmSDK = require('./src'); // this repo isn't published on npm
const config = require('./config'); // { hostname: '', clientId: '', username: '', password: '' }

async function getAllUsers() {
  const { body: tokens } = await xmSDK.getTokens(config);
  const xmClient = xmSDK.getClient({ ...config, ...tokens });
  const xmPeople = xmClient.getPeopleMethods();
  return xmPeople.getAll();
}

getAllUsers()
  .then(res => console.log(res))
  .catch(e => console.error(e));
// All methods return a promise that resolves to an HTTP response object like:
// { headers, statusCode, statusMessage, body }
```

## Funsies
1. Sign up for a `free-for-ever` instance of **xMatters** [here](https://www.xmatters.com/free-2)
2. Clone the repo
    ```sh
    git clone https://github.com/johanfive/xmApiSdk.git
    ```
3. Make a config.json file from config-template.json
    ```sh
    npm run config # then update config.json with your credentials
    ```
4. and from the root of **xmApiSdk/** run:
    ```sh
    node index.js
    ```
5. Watch the riveting story of *Bob Lawblaw* unfold in your terminal...