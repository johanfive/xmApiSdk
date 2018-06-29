var People = require('./');


describe('People', () => {
    let people, mockHttpMethod;
    beforeEach(() => {
        mockHttpMethod = jest.fn();
        people = new People(mockHttpMethod);
    });

    const validate = expectedRequest => {
        // httpMethod should be called only once
        expect(mockHttpMethod).toHaveBeenCalledTimes(1);
        // HttpMethod should be called with the expected request
        expect(mockHttpMethod).toBeCalledWith(expectedRequest);
    };


    describe('getAll', () => {
        test('without params', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people'
            };
            people.getAll();
            validate(expectedRequest);
        });

        test('embedding roles', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people',
                queryParams: {
                    embed: ['roles']
                }
            };
            people.getAll(['roles']);
            validate(expectedRequest);
        });
    });


    describe('getByIdOrTargetName', () => {
        const testID = 'testID';
        test('with a string params', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people/' + testID
            };
            people.getByIdOrTargetName(testID);
            validate(expectedRequest);
        });

        test('embedding roles', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people/' + testID,
                queryParams: {
                    embed: ['roles']
                }
            };
            people.getByIdOrTargetName(testID, ['roles']);
            validate(expectedRequest);
        });
    });


    describe('getByProp', () => {
        const testProp = {
            propertyName: 'testing',
            propertyValue: 'getByProp'
        };
        test('with a prop object param that has the propertyName and propertyValue props', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people',
                queryParams: testProp
            };
            people.getByProp(testProp);
            validate(expectedRequest);
        });

        test('embedding roles', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people',
                queryParams: {
                    embed: ['roles'],
                    propertyName: 'testing',
                    propertyValue: 'getByProp'
                }
            };
            people.getByProp(testProp, ['roles']);
            validate(expectedRequest);
        });
    });


    describe('search', () => {
        const searchTerm = 'test';
        test('with a string param over 2 chars long', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people',
                queryParams: {search: searchTerm}
            };
            people.search(searchTerm);
            validate(expectedRequest);
        });

        test('embedding roles', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people',
                queryParams: {
                    embed: ['roles'],
                    search: searchTerm
                }
            };
            people.search(searchTerm, ['roles']);
            validate(expectedRequest);
        });
    });


    describe('add', () => {
        test('with a person object param that has all mandatory props', () => {
            const testPerson = {
                firstName: 'testFN',
                lastName: 'testLN',
                roles: ['testR1', 'testR2'],
                targetName: 'testTN'
            };
            const expectedRequest = {
                data: testPerson,
                method: 'post',
                path: '/people'
            };
            people.add(testPerson);
            validate(expectedRequest);
        });
    });


    describe('edit', () => {
        test('with a person object param that has all mandatory props', () => {
            const testPerson = {
                id: 'testID',
                status: 'ACTIVE'
            };
            const expectedRequest = {
                data: testPerson,
                method: 'post',
                path: '/people'
            };
            people.edit(testPerson);
            validate(expectedRequest);
        });
    });


    describe('delete', () => {
        const testID = 'testID';
        test('with a string params', () => {
            const expectedRequest = {
                method: 'delete',
                path: '/people/' + testID
            };
            people.delete(testID);
            validate(expectedRequest);
        });
    });


    describe('getDevicesOf', () => {
        const testID = 'testID';
        test('with a string param', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people/' + testID + '/devices'
            };
            people.getDevicesOf(testID);
            validate(expectedRequest);
        });

        test('embedding time frames', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people/' + testID + '/devices',
                queryParams: {embed: 'timeframes'}
            };
            people.getDevicesOf(testID, true);
            validate(expectedRequest);
        });

        test('embedding time frames and specifying country code CA', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people/' + testID + '/devices',
                queryParams: {
                    embed: 'timeframes',
                    phoneNumberFormat: 'CA'
                }
            };
            people.getDevicesOf(testID, true, 'CA');
            validate(expectedRequest);
        });

        test('without time frames but specifying country code CA', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people/' + testID + '/devices',
                queryParams: {
                    phoneNumberFormat: 'CA'
                }
            };
            people.getDevicesOf(testID, false, 'CA');
            validate(expectedRequest);
        });
    });


    describe('getGroupsOf', () => {
        const testID = 'testID';
        test('with a string params', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people/' + testID + '/group-memberships'
            };
            people.getGroupsOf(testID);
            validate(expectedRequest);
        });
    });


    describe('getSupervisorsOf', () => {
        const testID = 'testID';
        test('with a string params', () => {
            const expectedRequest = {
                method: 'get',
                path: '/people/' + testID + '/supervisors'
            };
            people.getSupervisorsOf(testID);
            validate(expectedRequest);
        });
    });
});
