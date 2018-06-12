/**
 * Bundles up all People related methods
 * @param {Object} config The config object
 * @param {Function} axios The method used to make the API call
 * @returns {Object} An object containing all the People related methods
 */
function People (config, axios){
    this.path = 'people';
    this.baseURL = config.baseURL;

    this.getAll = function() {
        axios({
            baseURL: this.baseURL,
            path: this.path
        });
    };

    /**
     * Gets a Person object representing a user in xMatters.
     * @param {string} idOrTargetName The id or the targetName of the Person
     */
    this.getByIdOrTargetName = function(idOrTargetName) {
        axios({
            method: 'get',
            baseURL: this.baseURL,
            path: this.path + '/' + idOrTargetName
        });
    };

    /**
     * Returns all Person objects matching the given search criteria.
     * @param {string} term Any of firstName, lastName, targetName, webLogin, phoneNumber, emailAddress
     */
    this.search = function(term) {
        axios({
            method: 'get',
            baseURL: this.baseURL,
            path: this.path + '/?search=' + term
        });
    };

    /**
     * Creates a new user in xMatters.
     * @param {personObject} personObject
     * A Person object containing all the information about the Person to be added in xMatters
     */
    this.add = function(personObject) {
        axios({
            method: 'post',
            baseURL: this.baseURL,
            path: this.path,
            data: personObject
        });
    };

    /**
     * Modifies the properties of a user in xMatters.
     * @param {editPersonObject} personObject
     * The person object including the id and any other parameters that represent the properties you want to modify. 
     */
    this.edit = function(personObject) {
        axios({
            method: 'post',
            baseURL: this.baseURL,
            path: this.path + '/' + personObject.id,
            data: personObject
        });
    };

    this.delete = function(id) {
        axios({
            method: 'delete',
            baseURL: this.baseURL,
            path: this.path + '/' + id
        });
    };
};

module.exports = People;



/**
 @typedef personObject
 @type {Object}
 @property {string} firstName The first name.
 @property {string} lastName The last name.
 @property {string} targetName The targetName.
 @property {string[]} roles The roles.
 @property {string} [externalKey] optional externalKey.
 @property {boolean} [externallyOwned] optional externallyOwned.
 @property {string} [id] optional id.
 @property {string} [language] optional language.
 @property {string} [phoneLogin] optional phoneLogin.
 @property {Object} [properties] optional properties.
 @property {string} [recipientType] optional recipientType.
 @property {string} [site] optional site.
 @property {string} [status] optional status.
 @property {string[]} [supervisors] optional supervisors.
 @property {string} [timezone] optional timezone.
 @property {string} [webLogin] optional webLogin.
 */

 /**
 @typedef editPersonObject
 @type {Object}
 @property {string} id The id of the Person to modify.
 @property {string} [firstName] optional first name.
 @property {string} [lastName] optional last name.
 @property {string} [targetName] optional targetName.
 @property {string[]} [roles] optional roles.
 @property {string} [externalKey] optional externalKey.
 @property {boolean} [externallyOwned] optional externallyOwned.
 @property {string} [language] optional language.
 @property {string} [phoneLogin] optional phoneLogin.
 @property {Object} [properties] optional properties.
 @property {string} [recipientType] optional recipientType.
 @property {string} [site] optional site.
 @property {string} [status] optional status.
 @property {string[]} [supervisors] optional supervisors.
 @property {string} [timezone] optional timezone.
 @property {string} [webLogin] optional webLogin.
 */