'use strict';
/* Created by Stephan on 22.10.2016 */

var Store = require('nedb');
var db = new Store({filename: './data/notes.db', autoload: true});

function getNote(id, callback) {
    db.findOne({_id: id}, function (err, dbNote) {
        callback(err, dbNote);
    });
}

function getAllNotes(callback) {
    db.find({}, function (err, dbNotes) {
        callback(err, dbNotes);
    });
}

function addNote(note, callback) {
    db.insert(note, function (err, dbNote) {
        callback(err, dbNote);
    });
}

function updateNote(id, note, callback) {
    db.update({_id: id}, note, {}, function (err, cnt, dbNote) {
        getNote(id, callback);
    });
}

function deleteNote(id, callback) {
    db.remove({_id: id}, function (err, numDeleted) {
        callback(err, numDeleted);
    });
}

function deleteAllNotes(callback) {
    db.remove({}, {multi: true}, function (err, numDeleted) {
        callback(err, numDeleted);
    });
}

module.exports = {
    get: getNote,
    getAll: getAllNotes,
    add: addNote,
    update: updateNote,
    delete: deleteNote,
    deleteAll: deleteAllNotes
};
