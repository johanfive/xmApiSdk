const Xm = require('./');
const People = require('./people'); // imported in order to validate with .toBeInstanceOf()


const testConfig = {
    hostname: 'testHostname',
    password: 'testSecret',
    username: 'testFN'
};
const testBase64Cred = 'dGVzdEZOOnRlc3RTZWNyZXQ='; // "testFN:testSecret" base64 encoded

const testData = {
    'count': 4,
    'total': 4,
    'data': [
        {'id': '9306008e-563b-410a-8175-c481e6565b30', 'targetName': 'batman', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/9306008e-563b-410a-8175-c481e6565b30'}, 'firstName': 'Bruce', 'lastName': 'Wayne', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'batman', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'},
        {'id': '3c30e379-5de0-446a-8ad9-ac61ef52b446', 'targetName': 'superman', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/3c30e379-5de0-446a-8ad9-ac61ef52b446'}, 'firstName': 'Clark', 'lastName': 'Kent', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'superman', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'},
        {'id': '95303232-daf4-4677-9b98-13625ffa9280', 'targetName': 'wonderwoman', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/95303232-daf4-4677-9b98-13625ffa9280'}, 'firstName': 'Diana', 'lastName': 'Prince', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'wonderwoman', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'},
        {'id': 'e8cab4b8-e011-43d9-bc67-3ff97a9ddd44', 'targetName': 'spiderman', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/e8cab4b8-e011-43d9-bc67-3ff97a9ddd44'}, 'firstName': 'Peter', 'lastName': 'Parker', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'pparker', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}
    ],
    'links': {'self': '/api/xm/1/people?offset=0&limit=100'}
};


describe('Xm', () => {
    let xM, mockXmRequest;
    beforeEach(() => {
        xM = Xm(testConfig);
        xM.people.makeCall = jest.fn(
            () => Promise.resolve(testData)
        );
        mockXmRequest = jest.fn();
    });


    test('should have People and Oauth related methods', () => {
        expect(xM).toHaveProperty('people');
        expect(xM.people).toBeInstanceOf(People);
        expect(xM).toHaveProperty('getOAuthTokenByAuthorizationCodeGrantType');
        expect(xM).toHaveProperty('getOAuthTokenByPasswordGrantType');
        expect(xM).toHaveProperty('refreshAccessToken');
    });


    test('resolves successfully', () => {
        return expect(xM.people.getAll()).resolves.toBe(testData);
    });


    test('catch error', () => {
        const expectedRequest = {
            method: 'get',
            path: '/people'
        };
        expect.hasAssertions();
        const expectedError = new Error('Something broke');
        xM.people.makeCall.mockImplementationOnce(
            () => Promise.reject(expectedError)
        );
        return xM.people.getAll()
            .catch(error => {
                expect(error).toBe(expectedError);
                expect(xM.people.makeCall).toBeCalledWith(expectedRequest);
            });
    });

    test('enhanceRequest', () => {
        const expectedInitialRequest = {
            method: 'get',
            path: '/people'
        };
        const expectedFinalRequest = {
            headers: {
                Authorization: 'Basic ' + testBase64Cred
            },
            host: testConfig.hostname + '.xmatters.com',
            method: 'GET',
            path: '/api/xm/1' + expectedInitialRequest.path
        };
        xM.people.makeCall.mockImplementationOnce(
            // xM.aaTestEnhanceRequest is available here but will be stripped out on publish
            expectedInitialRequest => mockXmRequest(xM.aaTestEnhanceRequest(expectedInitialRequest))
        );
        xM.people.getAll();
        expect(mockXmRequest).toBeCalledWith(expectedFinalRequest);
        expect(expectedFinalRequest.method).toEqual(expectedInitialRequest.method.toUpperCase());
    });
});
