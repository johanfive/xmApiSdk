var makeQueryString = require('querystring').stringify;
var Core = require('./core');

function Base(config) {
  Core.call(this, config);
  this.type = config.path;
}

Base.prototype = Object.create(Core.prototype);

Base.prototype.getAll = function () {
  return this.callXmApi('get');
};

Base.prototype.getById = function (id, embed) {
  var reqOptions = {
    pathParams: id
  };
  if (embed) {
    if (!Array.isArray(embed)) {
      // This will likely evolve into a switch statement once there's more than just people and groups
      var example = this.type === 'people' ? '["roles", "supervisors"]' : '["observers", "supervisors"]';
      return Promise.reject(new Error('embed must be an array of strings. Eg: ' + example));
    }
    reqOptions.queryString = makeQueryString({ embed: embed });
  }
  return this.callXmApi('get', reqOptions);
};

Base.prototype.create = function (resource) {
  return this.callXmApi('post', { data: resource });
};

Base.prototype.modify = function (resource) {
  return this.callXmApi('post', { data: resource });
};

Base.prototype.delete = function (id) {
  return this.callXmApi('delete', { pathParams: id });
};

Base.prototype.getSupervisors = function (id) {
  return this.callXmApi('get', { pathParams: id + '/supervisors' });
};

module.exports = Base;
