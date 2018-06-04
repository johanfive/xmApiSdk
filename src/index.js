var people = require("./people");
var groups = require("./groups");


module.exports = function (config) {
    var auth = config;

    var doTheAxiosThing = function (request) {
        console.log(request);
        return request;
    };

    var modifyRequest = function(request, options) {
        request.additionalStuff = options;
        return request;
    }

    var generateFunction = function (aFunc) {
        var req = Object.assign({}, aFunc(), { auth: auth });
        return function (options) {
            var finalRequest = options ? modifyRequest(req, options) : req;
            doTheAxiosThing(finalRequest);
        };
    }

    // TODO: create a generateMethods(people || groups || ...) function

    var peopleMethods = {};
    for (var methodName in people) {
        if (people.hasOwnProperty(methodName)) {
            peopleMethods[methodName] = generateFunction(people[methodName]);
        }
    }

    var groupsMethods = {};
    for (var methodName in groups) {
        if (groups.hasOwnProperty(methodName)) {
            groupsMethods[methodName] = generateFunction(groups[methodName]);
        }
    }


    return {
        people: peopleMethods,
        groups: groupsMethods
    };
};
