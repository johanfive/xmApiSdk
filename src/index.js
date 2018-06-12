var People = require('./people');

module.exports = function(config) {
    // persists when config is modified outside of this scope
    var baseURL = 'https://' + config.hostname + '.xmatters.com/api/xm/1/';

    // private
    var axios = function(request) {
        console.log(request);
    };

    /* TODO
        const instance = axios.create({
            baseURL: 'https://some-domain.com/api/',
            timeout: 1000,
            headers: {'X-Custom-Header': 'foobar'}
        });    
    */
    
    return {
        /** People object containing all People related methods */
        people: new People({baseURL: baseURL}, axios)
    };
};
