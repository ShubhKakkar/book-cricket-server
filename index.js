const http = require("http");
const webSocket = require("websocket").server;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const handleWebSocketRoutes = require("./webSockets/routes");
const mongoose = require('mongoose');

// HTTP Server
const httpServer = http.createServer();
httpServer.listen(8080, () => {
    console.log("HTTP Server listening at port 8080");
});

// Express Server
const app = express();
app.use(cors());
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.listen(8081, () => {
    console.log("Express Server listening at port 8081");
})

// mongoose
mongoose.connect("mongodb://127.0.0.1:27017/book_cricket").then(() => {
  console.log("Successfully connected to mongodb database");
}).catch((err) => {
  console.log(err);
});

// Web Socket Server
const webSocketServer = new webSocket({
    httpServer: httpServer,
});

// App Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'App Server for Book-Cricket game',
    })
})


// Web Sockets routes
handleWebSocketRoutes(webSocketServer);