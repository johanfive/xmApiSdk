var Groups = require('./groups');
var People = require('./people');

function XmApi(init) {
  if (init && init.hostname && init.username && init.password) {
    var auth = 'Basic ' + Buffer.from(init.username + ':' + init.password).toString('base64');
    var config = { hostname: init.hostname, auth: auth, timeout: init.timeout };
    this.groups = new Groups(config);
    this.people = new People(config);
  } else {
    throw new Error('Initiate with a config object containing hostname, username and password keys');
  }
}

module.exports = XmApi;
