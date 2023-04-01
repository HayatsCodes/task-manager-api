const http = require('http');
const app = require('./app');

const server = http.createServer(app);

async function startServer() {
    server.listen(4040, () => {
        
    })
}