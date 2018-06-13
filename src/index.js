// const https = require('https');
var People = require('./people');



/**
 * xM API SDK
 * @param {configObject} config The config object with your credentials
 * @returns {xMObject} The interface to use to call xM API
 */
module.exports = function (config) {
    "use strict"

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
        people: new People(httpMethod)
    };
};



/**
    @typedef configObject
    @type {Object}
    @property {string} hostname The hostname of your instance.
    @property {string} username Your username.
    @property {string} password Your password.
*/

/**
    @typedef xMObject
    @type {Object}
    @property {peopleObject} people The People object containing all People related methods.
    @property {Object} groups The Groups object containing all Groups related methods.
*/

/**
    @typedef peopleObject
    @type {Object}
    @property {Function} getAll The method to get all the users from your instance.
*/
