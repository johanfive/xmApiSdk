// const https = require('https');
var People = require('./people');



module.exports = function (config) {
    'use strict';

    // private and persists even when config is modified outside of this scope
    var baseURL = 'https://' + config.hostname + '.xmatters.com/api/xm/1/';
    var credentials = Buffer.from(config.username + ':' + config.password).toString('base64');

    // private
    var httpMethod = function (request) {
        request.baseURL = baseURL;
        request.headers = { auth: 'Basic ' + credentials };
        console.log(request);
    };

    return {
        /** A people object containing all people related methods */
        people: new People(httpMethod)
    };
};
