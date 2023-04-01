const http = require('http');
const app = require('./app');

const server = http.createServer(app);



function startServer() {
    server.listen(4040, () => {
        console.log('Listening on port 4040');
    });
}

startServer();