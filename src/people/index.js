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
        return httpMethod(request);
    };
    this.path = '/people';
}


/**
 * Gets a paginated list of the users visible to the authenticated user.
 * @param {string[]} [withEmbeds] The array of strings representing the embeds
 * to include in the response
 * @returns {Object} Response code `200 OK`
 * and a Pagination of Person objects in the response body.
 */
People.prototype.getAll = function (withEmbeds) {
    var request = {
        method: 'get',
        path: this.path
    };
    if (withEmbeds) {
        request.queryParams = {
            embed: withEmbeds
        };
    }
    return this.makeCall(request);
};


/**
 * Gets a Person object with matching id or targetName.
 * @param {string} idOrTargetName The id or the targetName of the Person
 * @param {string[]} [withEmbeds] The array of strings representing the embeds
 * to include in the response
 * @returns {object} Response code `200 OK`
 * and a Person object in the response body.
 */
People.prototype.getByIdOrTargetName = function (idOrTargetName, withEmbeds) {
    var request = {
        method: 'get',
        path: this.path + '/' + idOrTargetName
    };
    if (withEmbeds) {
        request.queryParams = {embed: withEmbeds};
    }
    return this.makeCall(request);
};


/**
 * Gets users with matching propertyName and propertyValue.
 * @param {Object} propDesc The object describing the propertyName
 * and PropertyValue to search by
 * @param {string[]} [withEmbeds] The array of strings representing the embeds
 * to include in the response
 * @returns {object} Response code `200 OK`
 * and a Pagination of Person objects in the response body.
 */
People.prototype.getByProp = function (propDesc, withEmbeds) {
    var request = {
        method: 'get',
        path: this.path,
        queryParams: propDesc
    };
    if (withEmbeds) {
        request.queryParams.embed = withEmbeds;
    }
    return this.makeCall(request);
};


/**
 * Gets users with matching names, user IDs, email address, or phone numbers.
 * @param {string} term A list of case-insensitive search terms
 * separated by the + sign or a space.
 * @param {string[]} [withEmbeds] The array of strings representing the embeds
 * to include in the response
 * @returns {Object} Response code `200 OK`
 * and a Pagination of Person objects in the response body.
 */
People.prototype.search = function (term, withEmbeds) {
    var request = {
        method: 'get',
        path: this.path,
        queryParams: {
            search: term
        }
    };
    if (withEmbeds) {
        request.queryParams.embed = withEmbeds;
    }
    return this.makeCall(request);
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
    return this.makeCall({
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
    return this.makeCall({
        data: personObject,
        method: 'post',
        path: this.path
    });
};


/**
 * Deletes a person.
 * @param {string} idOrTargetName The id or the targetName of the Person
 * @returns {Object} Response code `200 OK`
 * and a Person object in the response body.
 */
People.prototype.delete = function (idOrTargetName) {
    return this.makeCall({
        method: 'delete',
        path: this.path + '/' + idOrTargetName
    });
};


/**
 * Gets a list of devices that belong to the specified user.
 * @param {string} idOrTargetName The id or the targetName of the Person
 * @param {boolean} [withTimeFrames] True to include the timeframes
 * each device is configured to receive notifications.
 * @param {string} [countryCode] The country code specifying which format
 * to return the phone numbers in.
 * @returns {Object} Response code `200 OK`
 * and a Pagination of Device objects in the response body.
 */
People.prototype.getDevicesOf = function (idOrTargetName, withTimeFrames, countryCode) {
    var request = {
        method: 'get',
        path: this.path + '/' + idOrTargetName + '/devices'
    };
    var qp = {}; // query params
    if (withTimeFrames) {
        qp.embed = 'timeframes';
    }
    if (countryCode) {
        qp.phoneNumberFormat = countryCode;
    }
    if (qp.hasOwnProperty('embed') || qp.hasOwnProperty('phoneNumberFormat')) {
        request.queryParams = qp;
    }
    return this.makeCall(request);
};


/**
 * Gets a list of groups that a person belongs to.
 * @param {string} idOrTargetName The id or the targetName of the Person
 * @returns {Object} Response code `200 OK`
 * and a Pagination of Group Membership object in the response body.
 */
People.prototype.getGroupsOf = function (idOrTargetName) {
    return this.makeCall({
        method: 'get',
        path: this.path + '/' + idOrTargetName + '/group-memberships'
    });
};


/**
 * Gets a list of a person’s supervisors.
 * @param {string} idOrTargetName The id or the targetName of the Person
 * @returns {Object} Response code `200 OK`
 * and a Pagination of Person objects in the response body.
 */
People.prototype.getSupervisorsOf = function (idOrTargetName) {
    return this.makeCall({
        method: 'get',
        path: this.path + '/' + idOrTargetName + '/supervisors'
    });
};


module.exports = People;


