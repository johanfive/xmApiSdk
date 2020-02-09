var Base = require('./Base');
// var XmSdkError = require('./XmSdkError');
var ROLES = require('./constants').ROLES;

function People(config) {
  config.path = 'people';
  Base.call(this, config);
}

People.prototype = Object.create(Base.prototype);

/**
 * Get a paginated list of the users that are visible to the authenticating user
 *
 * https://help.xmatters.com/xmapi/index.html#get-people
 * @param {Boolean} embedRoles True to include a list of each user’s assigned roles in the response
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.getAll = function getAll(embedRoles) {
  var options = { method: 'GET' };
  if (embedRoles) {
    options.queryParams = { embed: ROLES };
  }
  // If there are more users in xMatters than the limit (default: 100), the results are paginated
  var withUnpaginatedResponse = this.getUnpaginatedRequestor();
  return withUnpaginatedResponse(options);
};

// /**
//  * Get users with matching names, user IDs, email address, or phone numbers
//  *
//  * https://help.xmatters.com/xmapi/index.html#get-people
//  * @param {String} search A list of search terms
//  * @returns {Promise} A promise resolving to the response or rejecting any error
//  */
// People.prototype.getAll = function getAll(search) {
//   if (typeof search !== 'string' || search.length < 2) {
//     throw new XmSdkError('The search must be a string of at least 2 characters');
//   }
//   // KEEPING THIS. Will revisit soon
//   var terms = search.trim().split(/[ +]+/); // split by ' ' or +

//   var options = { method: 'GET' };
//   return this.callXmApi(options);
// };

/**
 * Get a person object that represents a user in xMatters
 *
 * https://help.xmatters.com/xmapi/index.html#get-a-person-by-id
 * @param {String} personId The unique identifier (id) or name (targetName) of the person
 * @param {Array} embeds List of elements to include in the response (roles and/or supervisors)
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.getById = function getById(personId, embeds) {
  var options = { pathParams: personId };
  if (embeds && Array.isArray(embeds) && embeds.length > 0) {
    options.queryParams = { embed: embeds };
  }
  return this.get(options);
};

/**
 * Search for a specific user by using the following explicit query parameters:
 * firstName, lastName, targetName, webLogin, phoneNumber, email
 * Each param is uriEncoded by default. If you wish to disable this behaviour,
 * set autoEncodeURI to false in your xmSDK config object
 *
 * https://help.xmatters.com/xmapi/index.html#get-a-person-by-query
 * @param {String} queryParams An object of key value pairs that will be converted to a uriEncoded queryString
 * @param {Boolean} embedRoles True to include a list of each user’s assigned roles in the response
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.getByQuery = function getByQuery(queryParams, embedRoles) {
  if (!queryParams || typeof queryParams !== 'object') {
    return Promise.reject(new Error('queryParams is required and must be an object'));
  }
  var options = { queryParams: queryParams };
  if (embedRoles) {
    options.queryParams.embed = ROLES;
  }
  return this.get(options);
};

/**
 * Get a person's devices
 *
 * https://help.xmatters.com/xmapi/index.html#get-a-person-39-s-devices
 * @param {String} personId The unique identifier (id) or name (targetName) of the person
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.getDevices = function getDevices(personId) {
  return this.get({ pathParams: [personId, 'devices'] });
};

/**
 * Get a person's groups
 *
 * https://help.xmatters.com/xmapi/index.html#get-a-person-39-s-groups
 * @param {String} personId The unique identifier (id) or name (targetName) of the person
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.getGroups = function getGroups(personId) {
  return this.get({ pathParams: [personId, 'group-memberships'] });
};

/**
 * Get a person's supervisors
 *
 * https://help.xmatters.com/xmapi/index.html#get-a-person-39-s-supervisors
 * @param {String} personId The unique identifier (id) or name (targetName) of the person
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.getSupervisors = function getSupervisors(personId) {
  return this.get({ pathParams: [personId, 'supervisors'] });
};

/**
 * Create a new person in xMatters
 *
 * https://help.xmatters.com/xmapi/index.html#create-a-person
 * @param {Object} person A person object with at least a firstName, lastName, targetName and roles
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.create = function create(person) {
  return this.post({ data: person });
};

/**
 * Modify the properties of an existing person in xMatters
 *
 * https://help.xmatters.com/xmapi/index.html#modify-a-person
 * @param {Object} person A person object with at least the id of the user
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.modify = function modify(person) {
  return this.post({ data: person });
};

/**
 * Delete an existing person from xMatters
 *
 * https://help.xmatters.com/xmapi/index.html#delete-a-person
 * @param {String} personId The unique identifier (id) or name (targetName) of the person
 * @returns {Promise} A promise resolving to the response or rejecting any error
 */
People.prototype.delete = function del(personId) {
  return this.remove({ pathParams: personId });
};

module.exports = People;
