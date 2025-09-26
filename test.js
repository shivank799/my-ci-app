// test.js
const assert = require('assert');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello, World!');
});

// Test to check if the server is running and responding
describe('HTTP Server', function () {
    it('should respond with status 200', function (done) {
        http.get('http://localhost:8080', (res) => {
            assert.strictEqual(res.statusCode, 200);
            done();
        });
    });
});
