var Core = require('./Core');
// var XmSdkError = require('./XmSdkError');

function Base(config) {
  Core.call(this, config);
}

Base.prototype = Object.create(Core.prototype);

Base.prototype.get = function get(options) {
  options.method = 'GET';
  return this.callXmApi(options);
};

Base.prototype.post = function post(options) {
  options.method = 'POST';
  return this.callXmApi(options);
};

Base.prototype.remove = function remove(options) {
  options.method = 'DELETE';
  return this.callXmApi(options);
};

Base.prototype.getUnpaginatedRequestor = function getUnpaginatedRequestor() {
  // Could have made this an immediately invoked function, but this feels more readable
  console.log('Initiating response closure');
  var self = this;
  var response = {
    body: {
      'total': 0,
      'data': []
    }
  };
  return function getUnpaginatedResponse(options) {
    return self.callXmApi(options)
      .then(function handleResponse(res) {
        var keys = Object.keys(res);
        keys.forEach(function(key) {
          if (key === 'body') {
            response.body.total = res.body.total;
            response.body.data = response.body.data.concat(res.body.data);
          } else {
            response[key] = res[key];
          }
        });
        if (res.next) {
          // "next" preserves the queryParams of the initial request
          // eg: "next": "/api/xm/1/people?limit=5&embed=roles&offset=5"
          // here queryParams will be a string. TODO: might be good to create
          // a separate "queryString" property for options objects...
          options.queryParams = res.next.replace(self.path, '').slice(1);
          return getUnpaginatedResponse(options);
        } else {
          return response;
        }
      });
  };
};

module.exports = Base;
