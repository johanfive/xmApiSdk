var Base = require('./base');

function Groups(config) {
  config.path = 'groups';
  Base.call(this, config);
}
Groups.prototype = Object.create(Base.prototype);

/**
 * Get all groups
 *
 * https://help.xmatters.com/xmapi/index.html#get-groups
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
Groups.prototype.getGroups = function () {
  return this.getAll();
};

/**
 * Get a group
 *
 * https://help.xmatters.com/xmapi/index.html#get-a-group
 * @param {String} groupId The unique identifier (id) or name (targetName) of the group.
 * If you use the name to identify the group, it must be URL-encoded.
 * @param {Array} embed An array of the person’s properties to include in the result (roles, supervisors).
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
Groups.prototype.getAGroup = function (groupId, embed) {
  return this.getById(groupId, embed);
};

/**
 * Create a group
 *
 * https://help.xmatters.com/xmapi/index.html#create-a-group
 * @param {Object} group A group object with at least a targetName
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
Groups.prototype.createAGroup = function (group) {
  return this.create(group);
};

/**
 * Modify a group
 *
 * https://help.xmatters.com/xmapi/index.html#modify-a-group
 * @param {Object} group A group object with at least the id of the group you want to modify
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
Groups.prototype.modifyAGroup = function (group) {
  return this.modify(group);
};

/**
 * Delete a group
 *
 * https://help.xmatters.com/xmapi/index.html#delete-a-group
 * @param {String} groupId The unique identifier (id) or name (targetName) of the group.
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
Groups.prototype.deleteAGroup = function (groupId) {
  return this.delete(groupId);
};

/**
 * Get a group's supervisors
 *
 * https://help.xmatters.com/xmapi/index.html#get-a-group-39-s-supervisors
 * @param {String} groupId The unique identifier (id) or name (targetName) of the group.
 * @returns {Promise} A promise resolving to the response or rejecting the error body
 */
Groups.prototype.getAGroupsSupervisors = function (groupId) {
  return this.getSupervisors(groupId);
};

module.exports = Groups;
