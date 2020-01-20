var https = require('https');
var path = require('path');

function Core(config) {
  this.hostname = config.hostname;
  this.auth = config.auth;
  this.path = path.join('/api/xm/1/', config.path);
  this.timeout = config.timeout || 10000; // 10s
}

Core.prototype.callXmApi = function (method, reqOptions) {
  return this.makeCall(this.buildRequest(method, reqOptions));
}

Core.prototype.buildRequest = function (method, reqOptions) {
  if (!reqOptions) {
    reqOptions = {};
  }
  var stringifiedData = reqOptions.data ? JSON.stringify(reqOptions.data) : undefined;
  var reqPath = this.path;
  if (reqOptions.pathParams) {
    reqPath += '/' + reqOptions.pathParams;
  }
  if (reqOptions.queryString) {
    reqPath += '?' + reqOptions.queryString;
  }
  var options = {
    hostname: this.hostname,
    method: method.toUpperCase(),
    path: reqPath,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': this.auth
    }
  };
  if (stringifiedData) {
    options.headers['Content-Length'] = stringifiedData.length;
  }
  return {
    options,
    data: stringifiedData
  };
};

Core.prototype.makeCall = function (request) {
  var self = this;
  return new Promise(function (resolve, reject) {
    var req = https.request(request.options, function (response) {
      var body = [];
      response.on('data', function (chunk) {
        body.push(chunk);
      });
      response.on('end', function () {
        body = Buffer.concat(body).toString();
        if (body.length === 0) {
          console.log(`xM API responded [${response.statusCode}] with no data.`);
        }
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(self.buidResponse(response, body));
        } else {
          reject(self.buidResponse(response, body).body);
        }
      });
    });
    req.on('error', function (error) {
      try {
        reject(JSON.parse(error));
      } catch (e) {
        reject(error);
      }
    });
    req.on('socket', function (socket) {
      socket.setTimeout(self.timeout);
      socket.on('timeout', function () {
        req.abort();
      });
    });
    if (request.data) {
      req.write(request.data);
    }
    req.end();
  });
};

Core.prototype.buidResponse = function (httpResponse, body) {
  let parsedBody;
  try {
    parsedBody = JSON.parse(body);
  } catch (e) {
    parsedBody = null;
  }
  const xMattersResponse = {
    headers: httpResponse.headers,
    statusCode: httpResponse.statusCode,
    statusMessage: httpResponse.statusMessage
  };
  if (body) {
    xMattersResponse.body = parsedBody || body;
  }
  if (parsedBody && parsedBody.links && parsedBody.links.next) {
    xMattersResponse.next = parsedBody.links.next;
  }
  return xMattersResponse;
};

module.exports = Core;
