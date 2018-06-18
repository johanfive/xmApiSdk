+ Vanilla Javascript / Node.js
+ Minimum dependencies
+ IDE autosuggest / user -friendly

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
xM.people.getAll();
```
Request would be:
```
{
    method: 'get',
    path: 'people',
    baseURL: 'https://yourHostName.xmatters.com/api/xm/1/',
    headers: {
        Authorization: 'Basic eW91clVzZXJOYW1lOnNlY3JldA=='
    }
}
```

## Leveraging closures
```
console.log(xM.people.credentials);
// undefined
```

```
delete config.hostname;
xM.people.getAll();
// still works
// ... {Authorization: 'Basic eW91clVzZXJOYW1lOnNlY3JldA=='}
```


# Features


## Get All

```
xM.people.getAll();
// GET /people
```
With embeds
```
xM.people.getAll(['roles']);
// GET /people?&embed=roles
```


## Get By Id Or TargetName

```
xM.people.getByIdOrTargetName('123456');
// GET /people/123456
```
With Embeds
```
xM.people.getByIdOrTargetName('123456', ['roles]);
// GET /people/123456?embed=roles
```


## Get By Property

```
var prop = {
    propertyName: '?ZZZ',
    propertyValue: 'AAA&'
};
xM.people.getByProp(prop);
// GET /people?propertyName=%3FZZZ&propertyValue=AAA%26
```
With Embeds
```
(var prop = ...)
xM.people.getByProp(prop, ['supervisors]);
// GET /people?propertyName=%3FZZZ&propertyValue=AAA%26&embed=supervisors
```


## Search

```
xM.people.search('light');
// GET /people?search=light
```
With embeds
```
xM.people.search('light saber', ['roles', 'supervisors']);
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
xM.people.add(person);
// POST /people
```


## Edit

```
var person = {
    id: 123456,
    roles: ['Super Hero']
};
xM.people.edit(person);
// POST /people/123456
```


## Delete

```
xM.people.edit('123456');
// DELETE /people/123456
```