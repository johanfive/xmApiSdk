var https = require('https');


module.exports = function (request) {
    return new Promise(function (resolve, reject) {

        var req = https.request(request, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });

            response.on('end', function () {
                var parsed = JSON.parse(body);
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    if (parsed.count && parsed.data) {
                        parsed = parsed.data;
                    }
                    resolve(parsed);
                } else {
                    console.log('xM API error ' + response.statusCode);
                    reject(parsed);
                }
            });
        });

        req.on('error', function (error) {
            console.log('xM API network error:');
            reject(JSON.parse(error));
        });

        if (request.body) {
            var data = request.body;
            var postData = request.headers['Content-Type'] === 'application/json'
                ? JSON.stringify(data)
                : data;
            req.write(postData);
        }

        req.end();
    });
};
