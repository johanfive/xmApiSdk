var https = require('https');
var makeQueryString = require('querystring').stringify;
var People = require('./people');



module.exports = function (config) {
    'use strict';

    // private and persists even when config is modified outside of this scope
    var baseURL = config.hostname + '.xmatters.com';
    var path = '/api/xm/1';
    var credentials;
    if (config.username && config.password) {
        credentials = 'Basic ' + Buffer.from(config.username + ':' + config.password).toString('base64');
    } else if (config.accessToken) {
        credentials = 'Bearer ' + config.accessToken;
    }

    // private
    var enhanceRequest = function (request) {
        request.method = request.method.toUpperCase();
        request.host = baseURL;
        request.path = path + request.path;
        if (request.queryParams) {
            request.path = request.path + '?' + makeQueryString(request.queryParams);
            delete request.queryParams;
        }
        // Set the request header
        var headersObject = {};
        if (request.data) {
            if (request.oauthing) {
                headersObject = { 'Content-Type': 'application/x-www-form-urlencoded'};
            } else {
                headersObject = { 'Content-Type': 'application/json' };
            }
        }
        headersObject.Authorization = credentials;
        request.headers = headersObject;
    };

    var httpMethod = function (request) {
        enhanceRequest(request);
        return new Promise(function (resolve, reject) {
            var req = https.request(request, function (response) {
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('end', function () {
                    var parsed = JSON.parse(body);
                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        resolve(parsed.data);
                    } else {
                        console.log('xM API error ' + response.statusCode);
                        reject(parsed);
                    }
                });
            });
            req.on('error', function (error) {
                console.log('xM API network error:');
                reject(JSON.parse(error));
            });
            if (request.data) {
                var postData;
                if (request.oauthing) {
                    postData = request.data;
                    delete request.oauthing;
                } else {
                    postData = JSON.stringify(request.data);
                }
                req.write(postData);
            }
            req.end();
        });
    };

    var getOAuthToken = function (payload) {
        var request = {
            data: payload,
            method: 'post',
            oauthing: true,
            path: '/oauth2/token'
        };
        return httpMethod(request);
    };

    // Public
    var getOAuthTokenByPasswordGrantType = function(clientId, username, password) {
        const payload = 'grant_type=password' +
                        '&client_id=' + clientId  +
                        '&username=' + username + // could probably use config.username here no?
                        '&password=' + password;
        return getOAuthToken(payload);
    };

    var getOAuthTokenByAuthorizationCodeGrantType = function (authorizationCode) {
        const payload = 'grant_type=authorization_code&authorization_code= ' + authorizationCode;
        return getOAuthToken(payload);
    };

    return {
        /**
         * Gets an OAuth token.
         * @param {string} authorizationCode The authorizationCode
         * @returns {Object} Response code `200 OK`
         * and an AccessToken object in the response body.
         */
        getOAuthTokenByAuthorizationCodeGrantType: getOAuthTokenByAuthorizationCodeGrantType,
        /**
         * Gets an OAuth token.
         * @param {string} client_id The client_id
         * @param {string} username The username
         * @param {string} password The password
         * @returns {Object} Response code `200 OK`
         * and an AccessToken object in the response body.
         */
        getOAuthTokenByPasswordGrantType: getOAuthTokenByPasswordGrantType,
        /** A people object containing all people related methods */
        people: new People(httpMethod)
    };
};
