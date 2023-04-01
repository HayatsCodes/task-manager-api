const http = require('http');
const app = require('./app');
const mongoConnect = require('./config/db')

const server = http.createServer(app);



async function startServer() {
    await mongoConnect();
    server.listen(4040, () => {
        console.log('Listening on port 4040');
    });
}

startServer();