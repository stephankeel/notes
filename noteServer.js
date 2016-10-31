'use strict';
/* Created by Stephan on 22.10.2016 */

var express = require('express');
var bodyParser = require('body-parser');
var requestRoutes = require('./routes/requestRoutes.js');
var server = express();
var router = express.Router();

var errorHandler = function(err, req, res, next) {
    console.log(`ErrorHandler: ${err.stack}`);
    res.status(500).send(err.message);
}

var inputLogger = function(req, res, next) {
    console.log('Request: ' + req.method + ' ' + req.url);
    next();
}

var outputLogger = function(req, res, next) {
    console.log(`Status code: ${res.statusCode}`);
    next();
}

server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(inputLogger);
server.use(requestRoutes);
server.use(outputLogger);
server.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3001;
server.listen(port, hostname, () => {
    console.log(`NoteServer running at http://${hostname}:${port}/`);
});


