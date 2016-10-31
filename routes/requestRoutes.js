'use strict';
/* Created by Stephan on 22.10.2016 */

var controller = require('../controller/requestcontroller');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log('providing note index file');
    controller.showIndexPage(re, res, next);
});
router.get('/test', function (req, res, next) {
    console.log('creating test notes');
    controller.test(req, res, next);
});
router.get('/error', function (req, res, next) {
    console.log('producing an error');
    throw new Error("This is a test error");
});
router.get('/notes', function (req, res, next) {
    console.log('providing note list');
    controller.getAll(req, res, next);
});
router.get('/notes/:id/', function (req, res, next) {
    console.log('providing note with id ' + req.params.id);
    controller.get(req, res, next);
});
router.post('/notes', function (req, res, next) {
    console.log('creating new note ' + JSON.stringify(req.body));
    controller.create(req, res, next);
});
router.put('/notes/:id/', function (req, res, next) {
    console.log('updating note with id ' + req.params.id + "\nbody: " + JSON.stringify(req.body));
    controller.update(req, res, next);
});
router.delete('/notes/:id/', function (req, res, next) {
    console.log('deleting note with id ' + req.params.id);
    controller.delete(req, res, next);
});
router.delete('/notes', function (req, res, next) {
    console.log('deleting all notes');
    controller.deleteAll(req, res, next);
});

function logAndReply(req, res, next, txt) {
    console.log(txt);
    res.type('text/html');
    res.write('<html>');
    res.write('<p>' + txt + '</p>');
    res.end('</html>');
    next();
}

module.exports = router;