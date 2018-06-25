+ Mainly Vanilla Javascript. Uses Promises which is natively supported since Node v7.3
+ Minimum dependencies
+ IDE autosuggest-friendly / user-friendly
+ Can be used in both ES5 and ES6 codebases

Does not promote callback hell, but might come at a cost. Babel?

# Usage

## Setup
```
var Xm = require('./src');

var config = {
    hostname: 'yourHostName',
    password: 'secret',
    username: 'yourUserName'
};

var xM = Xm(config);
```

For:
```
xM.people.search('wonder')
    .then(data => console.log(data))
    .catch(e => console.error(e.message));
```
Request would be:
```
{
    method: 'GET',
    path: '/api/xm/1/people?search=wonder',
    host:'yourHostName.xmatters.com',
    headers: {
        Authorization: 'Basic eW91clVzZXJOYW1lOnNlY3JldA=='
    }
}
```
Response woud be:
```
{
    count: 1,
    total: 1,
    data: [
        {
            id: '95303232-daf4-4677-9b98-13625ffa9280',
            targetName: 'wonderwoman',
            recipientType: 'PERSON',
            externallyOwned: false,
            links: [Object],
            firstName: 'Diana',
            lastName: 'Prince',
            language: 'en',
            timezone: 'US/Eastern',
            webLogin: 'wonderwoman',
            site: [Object],
            status: 'ACTIVE'
        }
    ],
    links: {
        self: '/api/xm/1/people?search=wonder&offset=0&limit=100'
    }
}
```
Currently returning a parsed response, but can easily revert back to delivering pure JSON.

## Leveraging Promises to handle async
The library relies on `Promises`, which enables the user to:
```
async function getWwFullName() {
    const wonderWoman = await xM.people.search('wonder')
        .then(data => data.data[0])
        .catch(e => console.error(e.message));
    const wwFullName = wonderWoman.firstName + ' ' + wonderWoman.lastName;
    console.log(wwFullName);
}

getWwFullName(); // Diana Prince
```

## Leveraging closures
```
console.log(xM.people.credentials);
// undefined
```

```
delete config.hostname;
delete config.username;
xM.people.getAll()
    .then(data => console.log(data))
    .catch(e => console.error(e.message));
// still works
// request: {... {Authorization: 'Basic eW91clVzZXJOYW1lOnNlY3JldA=='}}
```


# Features


## Get All

```
xM.people.getAll()
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people
```
With embeds
```
xM.people.getAll(['roles'])
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people?&embed=roles
```


## Get By Id Or TargetName

```
xM.people.getByIdOrTargetName('123456')
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people/123456
```
With Embeds
```
xM.people.getByIdOrTargetName('123456', ['roles])
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people/123456?embed=roles
```


## Get By Property

```
var prop = {
    propertyName: '?ZZZ',
    propertyValue: 'AAA&'
};

xM.people.getByProp(prop)
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people?propertyName=%3FZZZ&propertyValue=AAA%26
```
With Embeds
```
// var prop = ...

xM.people.getByProp(prop, ['supervisors])
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people?propertyName=%3FZZZ&propertyValue=AAA%26&embed=supervisors
```


## Search

```
xM.people.search('light').then(onSuccessFn).catch(onErrorFn);

// GET /people?search=light
```
With embeds
```
xM.people.search('light saber', ['roles', 'supervisors'])
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people?search=light%20saber&embed=roles&embed=supervisors
```


## Add

```
var person = {
    firstName: 'Peter',
    lastName: 'Parker',
    roles: ['Standard User'],
    targetName: 'spiderMan'
};

xM.people.add(person)
    .then(onSuccessFn)
    .catch(onErrorFn);

// POST /people
```


## Edit

```
var person = {
    id: 123456,
    roles: ['Super Hero']
};

xM.people.edit(person)
    .then(onSuccessFn)
    .catch(onErrorFn);

// POST /people
```


## Delete

```
xM.people.delete('123456')
    .then(onSuccessFn)
    .catch(onErrorFn);

// DELETE /people/123456
```


## Get Devices Of

```
xM.people.getDevicesOf('uniqueID')
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people/uniqueID/devices
```
With Timeframes and Phone Number Formatting
```
xM.people.getDevicesOf('uniqueID', true, 'notSureHowThatWorksYet')
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people/uniqueID/devices?embed=timeframes&phoneNumberFormat=notSureHowThatWorksYet
```


## Get Groups Of

```
xM.people.getGroupsOf('uniqueID')
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people/uniqueID/groups
```


## Get Supervisors Of

```
xM.people.getSupervisorsOf('uniqueID')
    .then(onSuccessFn)
    .catch(onErrorFn);

// GET /people/uniqueID/groups
```