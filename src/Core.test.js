jest.mock('https');
const Core = require('./Core');
const { REFRESH_TOKENS } = require('./constants');

const DEFAULT_CONFIG = {
  path: 'testPath',
  hostname: 'test.host.name',
  clientId: 'testClientId',
  username: 'testUsername',
  password: 'testPassword'
};

let config;
let request;
beforeEach(() => {
  jest.resetModules();
  config = Object.assign({}, DEFAULT_CONFIG);
  request = {
    options: {
      method: 'GET',
      path: 'some/path'
    }
  };
});

const buildXmResponse = (mockResponse) => {
  return request.options.mockResponse = mockResponse;
};

describe('Core', () => {
  describe('instantiation with config', () => {
    test('properties take their matching config values', () => {
      config.timeout = 5;
      config.autoEncodeURI = false;
      config.access_token = 'someAccessToken';
      config.refresh_token = 'someRefreshToken';
      config.onTokenChange = () => {};
      const core = new Core(config);
      expect(core.basePath).toBe('/api/xm/1/');
      expect(core.path).toBe(`/api/xm/1/${config.path}`);
      expect(core.hostname).toBe(config.hostname);
      expect(core.clientId).toBe(config.clientId);
      expect(core.timeout).toBe(config.timeout);
      expect(core.autoEncodeURI).toBe(config.autoEncodeURI);
      expect(core.username).toBe(config.username);
      expect(core.password).toBe(config.password);
      expect(core.accessToken).toBe(config.access_token);
      expect(core.refreshToken).toBe(config.refresh_token);
      expect(core.onTokenChange).toBe(config.onTokenChange);
    });
    test('timeout defaults to 25000 if not configured', () => {
      const core = new Core(config);
      expect(core.timeout).toBe(25000);
    });
    test('path defaults to the basePath if not configured', () => {
      delete config.path;
      const core = new Core(config);
      expect(core.path).toBe(core.basePath);
    });
    test('path joins the basePath and the config path with only 1 / separator', () => {
      config.path = '///trailing///';
      const core = new Core(config);
      expect(core.path).toBe('/api/xm/1/trailing/');
    });
  });
  test(`refreshTokens calls callXmApi with the string ${REFRESH_TOKENS}`, () => {
    const core = new Core(config);
    core.callXmApi = jest.fn();
    core.refreshTokens();
    expect(core.callXmApi).toHaveBeenCalledWith(REFRESH_TOKENS);
  });
  describe('callXmApi', () => {
    test('calls makeCall with the output of buildRequest and the initial request', () => {
      const reqOptions = { lol: 'ok' };
      let modifiedReq = { builtBy: 'buildRequest' };
      const core = new Core(config);
      core.buildRequest = jest.fn(req => modifiedReq = { ...modifiedReq, ...req });
      core.makeCall = jest.fn();
      core.callXmApi(reqOptions);
      expect(core.buildRequest).toHaveBeenCalledWith(reqOptions);
      expect(core.makeCall).toHaveBeenCalledWith(modifiedReq, reqOptions);
      expect(modifiedReq.builtBy).toBe('buildRequest');
      expect(reqOptions.builtBy).toBeUndefined();
      expect(modifiedReq.lol).toBe('ok');
      expect(reqOptions.lol).toBe('ok');
    });
  });
  describe('makeCall', () => {
    test('returns a promise that resolves on 2xx responses', () => {
      const Core = require('./Core'); // necessary to reset the mock of the https module
      const core = new Core(config);
      const response = buildXmResponse({
        statusCode: 200,
        body: { lol: 'ok' }
      });
      return core.makeCall(request, request).then(xMres => {
        expect(xMres).toEqual(response);
      });
    });
    test('returns a promise that rejects on non-2xx, non-401 responses', () => {
      const Core = require('./Core'); // necessary to reset the mock of the https module
      const core = new Core(config);
      const response = buildXmResponse({
        statusCode: 404,
        body: {
          'code': 404,
          'reason': 'Not Found',
          'message': 'Could not find the thing'
        }
      });
      return core.makeCall(request, request).catch(e => {
        expect(e).toEqual(response);
      });
      // This would work too:
      // return expect(core.makeCall(request, request)).rejects.toEqual(response);
    });
    test('Automatically refresh tokens + retry initial request on 401', () => {
      const Core = require('./Core'); // necessary to reset the mock of the https module
      const core = new Core(config);
      core.refreshTokens = jest.fn(() => Promise.resolve({
        body: {
          access_token: 'newAccessToken',
          refresh_token: 'newRefreshToken'
        }
      }));
      core.callXmApi = jest.fn(() => Promise.resolve({
        statusCode: 200, body: { lol: 'ok' }
      }));
      buildXmResponse({
        statusCode: 401,
        body: {
          'code': 401,
          'reason': 'Unauthorized',
          'message': 'User authentication failed'
        }
      });
      return core.makeCall(request, request).then(xMres => {
        expect(core.refreshTokens).toHaveBeenCalled();
        expect(core.callXmApi).toHaveBeenCalledWith(request);
        expect(xMres.body.lol).toBe('ok');
      });
    });
  });
});
