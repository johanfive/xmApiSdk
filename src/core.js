/* eslint-disable camelcase */
var https = require('https');
var path = require('path');
var utils = require('./utils');
var constants = require('./constants');

function Core(config) {
  this.basePath = '/api/xm/1/';
  this.path = path.join(this.basePath, config.path || '');
  this.hostname = config.hostname;
  this.clientId = config.clientId;
  this.timeout = config.timeout || 25000; // 25s (Delete method can take up to 22s sometimes)
  this.autoEncodeURI = config.autoEncodeURI; // both undefined and true mean autoEncode
  // These are provided when xmSDK.getTokens(config) is called
  this.username = config.username;
  this.password = config.password;
  // These are provided when xmSDK.getClient(config) is called
  this.accessToken = config.access_token;
  // this.accessToken = ''; // Remember to set this back when done testing and stuff
  this.refreshToken = config.refresh_token;
  this.onTokenChange = config.onTokenChange;
}

Core.prototype.callXmApi = function callXmApi(options) {
  return this.makeCall(this.buildRequest(options), options);
};

Core.prototype.makeCall = function(request, initialRequest) {
  // console.log(request);
  var self = this;
  return new Promise(function (resolve, reject) {
    var req = https.request(request.options, function (res) {
      var body = [];
      res.on('error', function (e) {
        reject(e);
      }).on('data', function (chunk) {
        body.push(chunk);
      }).on('end', function () {
        body = Buffer.concat(body).toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(self.buildResponse(res, body));
        } else if (res.statusCode === 401) {
          self.refreshTokens().then(function (tokensResp) {
            self.accessToken = tokensResp.body.access_token;
            self.refreshToken = tokensResp.body.refresh_token;
            if (self.onTokenChange) {
              self.onTokenChange({
                access_token: self.accessToken,
                refresh_token: self.refreshToken
              });
            }
            return self.callXmApi(initialRequest);
          }).then(resolve).catch(reject);
        } else {
          reject(self.buildResponse(res, body));
        }
      });
    });
    req.on('error', function (e) {
      if (e.code === 'ECONNRESET') {
        e.message += '\nYou may want to set a timeout longer than ' + self.timeout + 'ms in your config object.';
        e.message += '\nIt is likely that your request will eventually succeed despite this error';
      }
      reject(e);
    });
    req.on('timeout', function () {
      req.abort();
    });
    if (request.data) {
      req.write(request.data);
    }
    req.end();
  });
};

Core.prototype.refreshTokens = function refreshTokens() {
  return this.callXmApi(constants.REFRESH_TOKENS);
};

Core.prototype.buildResponse = function (res, body) {
  var response = {
    headers: res.headers,
    statusCode: res.statusCode,
    statusMessage: res.statusMessage
  };
  var parsedBody;
  if (body) {
    try {
      parsedBody = JSON.parse(body);
    } catch (e) {
      parsedBody = null;
    }
    response.body = parsedBody || body;
    if (parsedBody && parsedBody.links && parsedBody.links.next) {
      response.next = parsedBody.links.next;
    }
  }
  return response;
};

Core.prototype.buildRequest = function buildRequest(options) {
  var pathParams = '';
  if (options.pathParams) {
    pathParams = utils.makePathParams(options.pathParams, this.autoEncodeURI);
  }
  var req = {
    options: {
      hostname: this.hostname,
      method: options.method,
      path: path.join(this.path, pathParams),
      headers: {
        Authorization: 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json'
      },
      timeout: this.timeout
    }
  };
  if (options.queryParams) {
    req.options.path += '?' + utils.makeQueryString(options.queryParams, this.autoEncodeURI);
  }
  if (options.data) {
    req.data = JSON.stringify(options.data);
  }
  // getTokens should not be a method on Core, but refreshTokens should be
  // hence buildRequest being the best place to DRY
  if (options === constants.GET_TOKENS || options === constants.REFRESH_TOKENS) {
    req.options.method = 'POST';
    req.options.path = path.join(this.basePath, 'oauth2/token');
    req.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    delete req.options.headers.Authorization;
    var data = {
      'client_id': this.clientId
    };
    if (options === constants.GET_TOKENS) {
      data.grant_type = 'password';
      data.username = this.username;
      data.password = this.password;
    } else {
      data.grant_type = 'refresh_token';
      data.refresh_token = this.refreshToken;
    }
    // This must always be encoded, so we're ignoring the autoEncodeURI config
    req.data = utils.makeQueryString(data, true, true);
  }
  return req;
};

module.exports = Core;
