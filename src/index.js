var runXmRequest = require('./xMrequest');
var makeQueryString = require('querystring').stringify;
var People = require('./people');



module.exports = function (config) {
    'use strict';

    // private and persists even when config is modified outside of this scope
    var baseURL = config.hostname + '.xmatters.com';
    var xMapiPath = '/api/xm/1';
    var credentials;
    if (config.username && config.password) {
        credentials = 'Basic ' + Buffer.from(config.username + ':' + config.password).toString('base64');
    } else if (config.accessToken) {
        credentials = 'Bearer ' + config.accessToken;
    }

    var requestEnhancer = function (req) {
        var request = {};
        request.method = req.method.toUpperCase();
        request.host = baseURL;
        request.path = xMapiPath + req.path;
        if (req.queryParams) {
            request.path = request.path + '?' + makeQueryString(req.queryParams);
        }
        // Set the request header
        var headersObject = {};
        if (req.data) {
            if (req.oauthing) {
                headersObject = {'Content-Type': 'application/x-www-form-urlencoded'};
            } else {
                headersObject = {'Content-Type': 'application/json'};
            }
        }
        headersObject.Authorization = credentials;
        request.headers = headersObject;
        if (req.data) {
            request.body = req.data;
        }
        return request;
    };

    var getOAuthToken = function (payload) {
        var request = {
            data: payload,
            method: 'post',
            oauthing: true,
            path: '/oauth2/token'
        };
        return runXmRequest(requestEnhancer(request));
    };

    // Public
    var getOAuthTokenByPasswordGrantType = function(clientId, username, password) {
        var payload =   'grant_type=password' +
                        '&client_id=' + clientId  +
                        '&username=' + username +
                        '&password=' + password;
        return getOAuthToken(payload);
    };

    var getOAuthTokenByAuthorizationCodeGrantType = function (authorizationCode) {
        var payload = 'grant_type=authorization_code&authorization_code= ' + authorizationCode;
        return getOAuthToken(payload);
    };

    var refreshAccessToken = function (clientId, refreshToken) {
        var payload =   'grant_type=refresh_token' +
                        '&client_id=' + clientId +
                        '&refresh_token=' + refreshToken;
        return getOAuthToken(payload);
    };

    return {
        // __TestOnlyStart__
        // Everything between these 2 comments will be deleted on npm run cleanUp src/index.js
        // That way requestEnhancer can be unit tested, and stay private on publishing
        aaTestEnhanceRequest: requestEnhancer,
        // __TestOnlyEnd__

        /**
         * Gets an OAuth token.
         * @param {string} authorizationCode The authorizationCode
         * @returns {Object} Response code `200 OK`
         * and an AccessToken object in the response body.
         */
        getOAuthTokenByAuthorizationCodeGrantType: getOAuthTokenByAuthorizationCodeGrantType,

        /**
         * Gets an OAuth token.
         * @param {string} clientId The client Id corresponding to your account
         * @param {string} username Your username
         * @param {string} password Your password
         * @returns {Object} Response code `200 OK`
         * and an AccessToken object in the response body.
         */
        getOAuthTokenByPasswordGrantType: getOAuthTokenByPasswordGrantType,

        /** A people object containing all people related methods */
        people: new People(requestEnhancer),

        /**
         * Gets a new OAuth token.
         * @param {string} clientId The client Id corresponding to your account
         * @param {string} refreshToken The refresh token provided in the response
         * the first time you acquired an access token
         * @returns {Object} Response code `200 OK`
         * and an AccessToken object in the response body.
         */
        refreshAccessToken: refreshAccessToken
    };
};
