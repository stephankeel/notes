'use strict';
/* Created by Stephan on 22.10.2016 */

var express = require('express');
var bodyParser = require('body-parser');

var requestRoutes = require('./routes/requestRoutes.js');
var server = express();
var router = express.Router();

var errorHandler = function (err, req, res, next) {
    console.log(`ErrorHandler: ${err.stack}`);
    res.status(500).send(err.message);
}

var inputLogger = function (req, res, next) {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
}

var outputLogger = function (req, res, next) {
    console.log(`Response with status code: ${res.statusCode}`);
    next();
}

server.use(express.static(__dirname + '/public'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(inputLogger);
server.use(requestRoutes);
server.use(outputLogger);
server.use(errorHandler);

// WebSocket part
var expressWs = require('express-ws')(server);
var connections = [];

server.ws('/', function (ws, req) {
    console.log('WS connect');
    connections.push(ws);
    ws.on('message', function (msg) {
        console.log('WS echo msg --> ' + msg);
        broadcast(msg);
    });
    ws.on('close', function (id) {
        console.log('WS close: ' + id);
        var index = connections.indexOf(this);
        console.log('WS close index ' + index);
        connections.splice(index, 1);
    });
});

var broadcast = function (msg) {
    console.log(`WS broadcast to ${connections.length} connections: ${msg}`);
    connections.forEach(ws => {
        console.log('WS broadcast');
        ws.send(msg);
    });
}

const hostname = '127.0.0.1';
const port = 3001;
server.listen(port, hostname, () => {
    console.log(`NoteServer running at http://${hostname}:${port}/`);
});


