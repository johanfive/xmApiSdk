var Core = require('./Core');
var XmApiClient = require('./XmApiClient');
var XmSdkError = require('./XmSdkError');
var GET_TOKENS = require('./constants').GET_TOKENS;

module.exports = {
  getTokens: function getTokens(config) {
    throwOnInvalidConfig(config, true);
    return new Core(config).callXmApi(GET_TOKENS);
  },
  getClient: function getClient(config) {
    throwOnInvalidConfig(config);
    return new XmApiClient(config);
  }
};

function throwOnInvalidConfig(config, isGetTokens) {
  var missing = [];
  if (!config.hostname) {
    missing.push('hostname');
  }
  if (!config.clientId) {
    missing.push('clientId');
  }
  if (isGetTokens) {
    if (!config.username) {
      missing.push('username');
    }
    if (!config.password) {
      missing.push('password');
    }
  } else {
    if (!config.access_token) {
      missing.push('access_token');
    }
    if (!config.refresh_token) {
      missing.push('refresh_token');
    }
    if (config.onTokenChange && typeof config.onTokenChange !== 'function') {
      throw new XmSdkError('onTokenChange must be a function');
    }
  }
  if (missing.length > 0) {
    throw new XmSdkError(
      'The config object you provided is missing the following properties: '
      + missing.join(', ')
    );
  }
}
