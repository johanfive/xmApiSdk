var Core = require('./Core');

function Groups(config) {
  config.path = 'groups';
  Core.call(this, config);
}

Groups.prototype = Object.create(Core.prototype);

Groups.prototype.getAll = function getAll() {
  return this.callXmApi({ method: 'GET', queryString: { embed: 'supervisors' } });
};

Groups.prototype.getById = function getById(id) {
  return this.callXmApi({ method: 'GET', pathParams: id });
};

module.exports = Groups;
