const Xm = require('./');
const People = require('./people');


const config = {
    hostname: 'testHostname',
    password: 'testSecret',
    username: 'testFN'
};

const testData = {'count': 16, 'total': 16, 'data': [{'id': '9ab490c1-8f18-43de-9969-633b993487f4', 'targetName': 'aaa', 'recipientType': 'PERSON', 'externallyOwned': true, 'externalKey': 'aaa', 'links': {'self': '/api/xm/1/people/9ab490c1-8f18-43de-9969-633b993487f4'}, 'firstName': 'aaa', 'lastName': 'zzz', 'language': 'en', 'timezone': 'US/Pacific', 'webLogin': 'aaa', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '9443d3c8-e51b-46aa-b2d6-c33d7e7119bf', 'targetName': 'aaaSupervisor', 'recipientType': 'PERSON', 'externallyOwned': true, 'externalKey': 'aaaSupervisor', 'links': {'self': '/api/xm/1/people/9443d3c8-e51b-46aa-b2d6-c33d7e7119bf'}, 'firstName': 'aaaSuper', 'lastName': 'visor', 'language': 'en', 'timezone': 'US/Pacific', 'webLogin': 'aaaSupervisor', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '9306008e-563b-410a-8175-c481e6565b30', 'targetName': 'batman', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/9306008e-563b-410a-8175-c481e6565b30'}, 'firstName': 'Bruce', 'lastName': 'Wayne', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'batman', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '3c30e379-5de0-446a-8ad9-ac61ef52b446', 'targetName': 'superman', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/3c30e379-5de0-446a-8ad9-ac61ef52b446'}, 'firstName': 'Clark', 'lastName': 'Kent', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'superman', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '248973a4-de3c-4b2b-a6be-877565fe82b1', 'targetName': 'dreich@xmatters.com', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/248973a4-de3c-4b2b-a6be-877565fe82b1'}, 'firstName': 'Daniel', 'lastName': 'Reich', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'dreich@xmatters.com', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '14dbee67-3c11-4cb4-ac6c-05c796824635', 'targetName': 'deleteMe', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/14dbee67-3c11-4cb4-ac6c-05c796824635'}, 'firstName': 'delete', 'lastName': 'Meh', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'deleteMe', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '95303232-daf4-4677-9b98-13625ffa9280', 'targetName': 'wonderwoman', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/95303232-daf4-4677-9b98-13625ffa9280'}, 'firstName': 'Diana', 'lastName': 'Prince', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'wonderwoman', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': 'd183c0e3-7547-4c90-ab79-9f1fd4e7718c', 'targetName': 'dynatraceiu', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/d183c0e3-7547-4c90-ab79-9f1fd4e7718c'}, 'firstName': 'Dynatrace', 'lastName': 'Integration', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'dynatraceiu', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': 'f3a5bc80-c10f-45ce-ae91-d97c3d0e10c5', 'targetName': 'serviceNowIUser', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/f3a5bc80-c10f-45ce-ae91-d97c3d0e10c5'}, 'firstName': 'Integration', 'lastName': 'User', 'language': 'en', 'timezone': 'US/Pacific', 'webLogin': 'serviceNowIUser', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '1d840b46-7085-44fa-9ec3-c2b055bc1de9', 'targetName': 'JiraCloudIUser', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/1d840b46-7085-44fa-9ec3-c2b055bc1de9'}, 'firstName': 'Integration', 'lastName': 'User', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'JiraCloudIUser', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '26e2758a-fa7a-4495-8ed3-213392d6b2be', 'targetName': 'slackIUser', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/26e2758a-fa7a-4495-8ed3-213392d6b2be'}, 'firstName': 'Integration', 'lastName': 'User', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'slackIU', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '2b3013fa-082d-4cea-bc3c-de083b52fbab', 'targetName': 'jcheung', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/2b3013fa-082d-4cea-bc3c-de083b52fbab'}, 'firstName': 'Jason', 'lastName': 'Cheung', 'language': 'en', 'timezone': 'US/Pacific', 'webLogin': 'jcheung', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '38106384-a23f-4ecc-8c10-5c0ef4c0fad4', 'targetName': 'jfriedrich@xmatters.com', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/38106384-a23f-4ecc-8c10-5c0ef4c0fad4'}, 'firstName': 'Johan', 'lastName': 'Friedrich', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'jfriedrich@xmatters.com', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': 'e82e9dbf-9932-4f1f-b863-48c69884cbec', 'targetName': 'MSteamBot', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/e82e9dbf-9932-4f1f-b863-48c69884cbec'}, 'firstName': 'MSteamBot', 'lastName': 'MSteamBot', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'MSteamBot', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': 'e8cab4b8-e011-43d9-bc67-3ff97a9ddd44', 'targetName': 'spiderman', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/e8cab4b8-e011-43d9-bc67-3ff97a9ddd44'}, 'firstName': 'Peter', 'lastName': 'Parker', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'pparker', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}, {'id': '36383dd5-3e9c-4873-9ac6-18f63e211a75', 'targetName': 'xm-support', 'recipientType': 'PERSON', 'externallyOwned': false, 'links': {'self': '/api/xm/1/people/36383dd5-3e9c-4873-9ac6-18f63e211a75'}, 'firstName': 'xMatters', 'lastName': 'Support', 'language': 'en', 'timezone': 'US/Eastern', 'webLogin': 'xm-support', 'site': {'id': '596c0550-fca0-485c-9395-cc9f4ad3570e', 'name': 'Default Site', 'links': {'self': '/api/xm/1/sites/596c0550-fca0-485c-9395-cc9f4ad3570e'}}, 'status': 'ACTIVE'}], 'links': {'self': '/api/xm/1/people?offset=0&limit=100'}};


describe('Xm', () => {
    let xM;
    beforeEach(() => {
        xM = Xm(config);
        xM.people.makeCall = jest.fn(
            () => Promise.resolve(testData)
        );
    });


    test('has people related methods', () => {
        expect(xM).toHaveProperty('people');
        expect(xM.people).toBeInstanceOf(People);
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
});
