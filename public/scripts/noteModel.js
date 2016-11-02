var noteModel = (function ($) {
    'use strict';

    var noteList = [];

    var addCallback = function (note) {
        noteList.push(note);
    }

    function init(successCallback) {
        remoteDataService.init(
            addCallback,
            successCallback,
            function () {
                localDataService.init(addCallback);
                localDataService.persist(noteList);
                successCallback();
            });
    }

    function getNote(id) {
        return noteList.filter(n => n.id == id)[0];
    }

    function getAllNotes() {
        return noteList;
    }

    function addNote(note, successCallback) {
        remoteDataService.add(note, function (note) {
            noteList.push(note);
            successCallback();
        }, function () {
            note.id = note.getMaxId();
            noteList.push(note);
            localDataService.persist(noteList);
            successCallback();
        });
    }

    function updateNote(note, successCallback) {
        remoteDataService.update(
            note,
            function (note) {
                noteList[indexOfNoteWithId(note.id)] = note;
                successCallback();
            },
            function () {
                noteList[indexOfNoteWithId(note.id)] = note;
                localDataService.persist(noteList);
                successCallback();
            }
        );
    }

    function deleteNote(id, successCallback) {
        remoteDataService.delete(id, function (id) {
            noteList.splice(indexOfNoteWithId(id), 1);
            successCallback();
        }, function () {
            noteList.splice(indexOfNoteWithId(id), 1);
            localDataService.persist(noteList);
            successCallback();
        });
    }

    function indexOfNoteWithId(id) {
        for (var index in noteList) {
            if (noteList[index].id == id) {
                return index;
            }
        }
        return noteList.length;
    }

    return {
        init: init,
        get: getNote,
        getAll: getAllNotes,
        add: addNote,
        update: updateNote,
        delete: deleteNote
    };

}(jQuery));