const assert = require('assert');
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello, World!');
});

let serverInstance;

// Start the server before tests run
before((done) => {
    serverInstance = server.listen(8080, '127.0.0.1', () => {
        console.log('Server is up and running on port 8080');
        done(); // Calls `done` when the server is up and listening
    });
});

// Retry the connection in case the server isn't up immediately
describe('HTTP Server', function () {
    it('should respond with status 200', function (done) {
        this.timeout(5000); // Set a higher timeout for the test
        function tryRequest() {
            http.get('http://127.0.0.1:8080', (res) => {
                if (res.statusCode === 200) {
                    assert.strictEqual(res.statusCode, 200);
                    done();
                } else {
                    // Retry the connection if not successful
                    setTimeout(tryRequest, 1000);
                }
            }).on('error', (err) => {
                // Retry on connection error
                setTimeout(tryRequest, 1000);
            });
        }
        tryRequest();  // Start the first request attempt
    });
});

// Close the server after tests
after((done) => {
    serverInstance.close(() => {
        console.log('Server is closed');
        done();
    });
});
