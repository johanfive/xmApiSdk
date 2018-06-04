Vanilla Javascript, no need for Babel etc

Easier usage than other version. Only one import to do it all:
```
var XM = require('./src');

var xm = XM('secret');
xm.people.getAll();
```

As opposed to:
```
var People = require('./src');

var people = People('secret');
people.getAll();
```

Should be easier to test too.