const http = require("http");
const app = require("./app");

const port = 3000;

const errorHandler = error => {
    console.log(error);
    process.exit(1);
}

app.set('port', port);
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    console.log("serveur en route ");
});

server.listen(port);