var People = require('./People');
var Groups = require('./Groups');

function XmApiClient(config) {
  this.config = config;
}

XmApiClient.prototype.getPeopleMethods = function getPeopleMethods() {
  return new People(this.config);
};

XmApiClient.prototype.getGroupsMethods = function getGroupsMethods() {
  return new Groups(this.config);
};

module.exports = XmApiClient;
