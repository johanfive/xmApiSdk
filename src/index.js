var https = require('https');
var makeQueryString = require('querystring').stringify;
var People = require('./people');



module.exports = function (config) {
    'use strict';

    // private and persists even when config is modified outside of this scope
    var baseURL = config.hostname + '.xmatters.com';
    var path = '/api/xm/1';
    var credentials = Buffer.from(config.username + ':' + config.password).toString('base64');

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
            headersObject = { 'Content-Type': 'application/json' };
        }
        headersObject.Authorization = 'Basic ' + credentials;
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
                var postData = JSON.stringify(request.data);
                req.write(postData);
            }
            req.end();
        });
    };

    return {
        /** A people object containing all people related methods */
        people: new People(httpMethod)
    };
};
