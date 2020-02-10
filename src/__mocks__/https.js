const EventEmitter = require('events');
const res = new EventEmitter();

const req = {
  on: jest.fn().mockName('req.on()'),
  abort: jest.fn().mockName('req.abort()'),
  write: jest.fn().mockName('req.write()'),
  end: jest.fn().mockName('req.end()')
};

module.exports = {
  request: jest.fn(
    (options, callback) => {
      const { mockResponse } = options;
      res.statusCode = mockResponse.statusCode;
      callback(res);
      res.emit('data', Buffer.from(JSON.stringify(mockResponse.body)));
      res.emit('end');
      return req;
    }
  ).mockName('https.request()')
};
