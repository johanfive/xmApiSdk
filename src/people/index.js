/**
 * Bundles up all People related methods
 * @param {Function} httpMethod The method used to make the API call
 */
function People(httpMethod) {
    'use strict';
    if (!(this instanceof People)) {
        throw new Error('People needs to be called with the `new` keyword');
    }

    this.makeCall = function (request) {
        httpMethod(request);
    };
    this.path = 'people';
    this.embed = function (withRoles) {
        return withRoles && withRoles === 'withRoles' ? '?embed=roles' : '';
    };
}


/**
 * Returns a paginated list of the users
 * that are visible to the authenticated user.
 * @param {boolean} [withRoles] True to include a list of the person’s roles in the response
 * @returns {Object} Response code `200 OK`
 * and a Pagination of Person object in the response body.
 */
People.prototype.getAll = function (withRoles) {
    this.makeCall({
        method: 'get',
        path: this.path + this.embed(withRoles)
    });
};


/**
 * Gets a Person object representing a user in xMatters.
 * @param {string} idOrTargetName The id or the targetName of the Person
 * @param {boolean} [withRoles] True to include a list of the person’s roles in the response
 * @returns {object} Response code `200 OK`
 * and a Person object in the response body.
 */
People.prototype.getByIdOrTargetName = function (idOrTargetName, withRoles) {
    this.makeCall({
        method: 'get',
        path: this.path + '/' + idOrTargetName + this.embed(withRoles)
    });
};


/**
 * return users with matching names, user IDs, email address, or phone numbers.
 * @param {string} term A list of case-insensitive search terms separated by the + sign or a space.
 * @returns {Object} Response code `200 OK`
 * and a Pagination of Person object in the response body.
 */
People.prototype.search = function (term) {
    this.makeCall({
        method: 'get',
        path: this.path + '/?search=' + term
    });
};


/**
 * Creates a new user in xMatters.
 * @param {Object} personObject
 * A Person object containing all the information about
 * the Person to be added to xMatters
 * @returns {Object} Response code `201 Created`
 * and a Person object in the response body.
 */
People.prototype.add = function (personObject) {
    this.makeCall({
        data: personObject,
        method: 'post',
        path: this.path
    });
};


/**
 * Modifies the properties of a user in xMatters.
 * @param {Object} personObject
 * The person object including the id and any other parameters
 * that represent the properties you want to modify.
 * @returns {Object} Response code `200 OK`
 * and a Person object in the response body.
 */
People.prototype.edit = function (personObject) {
    this.makeCall({
        data: personObject,
        method: 'post',
        path: this.path + '/' + personObject.id
    });
};


/**
 * Deletes a person.
 * @param {string} idOrTargetName The id or the targetName of the Person
 * @returns {Object} Response code `200 OK`
 * and a Person object in the response body.
 */
People.prototype.delete = function (idOrTargetName) {
    this.makeCall({
        method: 'delete',
        path: this.path + '/' + idOrTargetName
    });
};


module.exports = People;


