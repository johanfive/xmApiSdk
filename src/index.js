// const https = require('https');
var makeQueryString = require('querystring').stringify;
var People = require('./people');



module.exports = function (config) {
    'use strict';

    // private and persists even when config is modified outside of this scope
    var baseURL = 'https://' + config.hostname + '.xmatters.com/api/xm/1/';
    var credentials = Buffer.from(config.username + ':' + config.password).toString('base64');

    // private
    var httpMethod = function (request) {
        request.baseURL = baseURL;
        // Set the request header
        var headersObject = {};
        if (request.data) {
            headersObject = {'Content-Type': 'application/json'};
        }
        headersObject.Authorization = 'Basic ' + credentials;
        request.headers = headersObject;

        if (request.queryParams) {
            request.path = request.path + '?' + makeQueryString(request.queryParams);
            delete request.queryParams;
        }
        console.log(request);
    };

    return {
        /** A people object containing all people related methods */
        people: new People(httpMethod)
    };
};
