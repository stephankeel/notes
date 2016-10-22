'use strict';
/* Created by Stephan on 22.10.2016 */

var storeService = require('../services/notesModel.js');

var nextNoteId = 1;

function Note(title, details, dueDate, priority) {
    this.title = title;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completionDate = null;
    this.completed = false;
}

function createDummyNote(req, res, next) {
    var i = nextNoteId++;
    var note = new Note("Note Title " + i, "Note Details " + i, new Date("2016-11-08"), i % 5 + 1);
    storeService.add(note, function (err, dbNote) {
        res.type('application/json');
        res.end(JSON.stringify(dbNote));
        next();
    });
}

function createNote(req, res, next) {
    next(new Error("Create not yet implemented -- " + JSON.stringify(req.body)));
    /*
     TODO
     var note = new Note(title, details, dueDate, prio);
     storeService.add(note, function(err, dbNote){
     res.type('application/json');
     res.end(JSON.stringify(dbNote));
     next();
     });
     */
}

function updateNote(req, res, next) {
    next(new Error("Update not yet implemented, id: " + req.params.id + " -- " + JSON.stringify(req.body)));
    /*
     TODO
     var note = new Note(title, details, dueDate, prio);
     storeService.update(req.param.id, note, function(err, dbNote) {
     res.type('application/json');
     res.end(JSON.stringify(dbNote));
     next();
     });
     */
}

function getAllNotes(req, res, next) {
    storeService.getAll(function (err, dbNotes) {
        res.type('application/json');
        res.end(JSON.stringify(dbNotes));
        next();
    });
}

function getNote(req, res, next) {
    storeService.get(req.params.id, function (err, dbNote) {
        res.type('application/json');
        res.end(JSON.stringify(dbNote));
    });
}

function deleteNote(req, res, next) {
    storeService.delete(req.params.id, function (err, count) {
        res.type('application/json');
        res.end('{ "id": "' + req.params.id + '" }');
    });
}

function deleteAllNotes(req, res, next) {
    storeService.deleteAll(function (err, count) {
        res.type('application/json');
        res.end('{ "count": "' + count + '" }');
    });
}

function showIndexPage(req, res, next) {
    res.type('test/html');
    res.sendFile('index.html', {root: '../public/'});
    next();
}

module.exports = {
    dummy: createDummyNote,
    create: createNote,
    update: updateNote,
    getAll: getAllNotes,
    get: getNote,
    delete: deleteNote,
    deleteAll: deleteAllNotes
};