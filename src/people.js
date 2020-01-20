var makeQueryString = require('querystring').stringify;
var Base = require('./base');

function People(config) {
  config.path = 'people';
  Base.call(this, config);
}
People.prototype = Object.create(Base.prototype);

/**
 * Get all people
 * 
 * https://help.xmatters.com/xmapi/index.html#get-people
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.getPeople = function () {
  return this.getAll();
};

/**
 * Get a person by ID
 * 
 * https://help.xmatters.com/xmapi/index.html#get-a-person-by-id
 * @param {String} personId The unique identifier (id) or name (targetName) of the person.
 * @param {Array} embed An array of the person’s properties to include in the result (roles, supervisors).
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.getAPersonById = function (personId, embed) {
  return this.getById(personId, embed);
};

/**
 * Get a person by query
 * 
 * https://help.xmatters.com/xmapi/index.html#get-a-person-by-query
 * @param {Object} queryParams An object of key value pairs that will be stringified and uriEncoded
 * @param {Boolean} embedRoles Set to true to include the person’s roles in the result
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.getAPersonByQuery = function (queryParams, embedRoles) {
  var reqOptions = {
    queryString: makeQueryString(queryParams) + (embedRoles ? '&embed=roles' : '')
  };
  return this.callXmApi('get', reqOptions);
};

/**
 * Create a person
 * 
 * https://help.xmatters.com/xmapi/index.html#create-a-person
 * @param {Object} user A person object with at least a targetName, firstName, lastName and roles[]
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.createAPerson = function (user) {
  return this.create(user);
};

/**
 * Modify a person
 * 
 * https://help.xmatters.com/xmapi/index.html#modify-a-person
 * @param {Object} user A person object with at least the id of the person you want to modify
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.modifyAPerson = function (user) {
  return this.modify(user);
};

/**
 * Delete a person
 * 
 * https://help.xmatters.com/xmapi/index.html#delete-a-person
 * @param {String} personId The unique identifier (id) or name (targetName) of the person.
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.deleteAPerson = function (personId) {
  return this.delete(personId);
};

/**
 * Get a person's devices
 * 
 * https://help.xmatters.com/xmapi/index.html#get-a-person-39-s-devices
 * @param {String} personId The unique identifier (id) or name (targetName) of the person.
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.getAPersonsDevices = function (personId) {
  return this.callXmApi('get', { pathParams: personId + '/devices' });
};

/**
 * Get a person's groups
 * 
 * https://help.xmatters.com/xmapi/index.html#get-a-person-39-s-groups
 * @param {String} personId The unique identifier (id) or name (targetName) of the person.
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.getAPersonsGroups = function (personId) {
  return this.callXmApi('get', { pathParams: personId + '/group-memberships' });
};

/**
 * Get a person's supervisors
 * 
 * https://help.xmatters.com/xmapi/index.html#get-a-person-39-s-supervisors
 * @param {String} personId The unique identifier (id) or name (targetName) of the person.
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
People.prototype.getAPersonsSupervisors = function (personId) {
  return this.getSupervisors(personId);
};

module.exports = People;
