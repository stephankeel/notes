var remoteDataService = (function ($) {
    'use strict';

    function ajax(metod, url, data, headers) {
        return $.ajax({
            dataType: 'json',
            contentType: 'application/json',
            headers: headers,
            method: metod,
            url: url,
            data: JSON.stringify(data)
        });
    }

    function init(itemCallback, successCallback, failCallback) {
        // Loading all notes from the server if possible. Use local store as fallback
        ajax('GET', '/notes').done(function (msg) {
            console.log('ajax get success: loaded notes successfully');
            msg.forEach(serverNote => {
                var note = new Note(serverNote.title, serverNote.details, serverNote.dueDate, serverNote.priority, serverNote.completionDate, serverNote.completed);
                note.id = serverNote._id;
                itemCallback(note);
            });
            successCallback();
        }).fail(function (msg) {
            console.log('ajax get fail: ' + msg + ' --> using locally saved notes');
            failCallback();
        });
    }

    function addTheNote(note, successCallback, failCallback) {
        ajax('POST', '/notes', note).done(function (msg) {
            var serverNote = msg;
            var note = new Note(serverNote.title, serverNote.details, serverNote.dueDate, serverNote.priority);
            note.id = serverNote._id;
            console.log('ajax post success: id ' + note.id);
            successCallback(note);
        }).fail(function (msg) {
            console.log('ajax post failed: ' + msg + ' --> saving note just in local store');
            failCallback();
        });
    }

    function updateTheNote(note, successCallback, failCallback) {
        ajax('PUT', '/notes/' + note.id, note).done(function (msg) {
            var serverNote = msg;
            var note = new Note(serverNote.title, serverNote.details, serverNote.dueDate, serverNote.priority, serverNote.completionDate, serverNote.completed);
            note.id = serverNote._id;
            console.log('ajax put success: id ' + note.id);
            successCallback(note);
        }).fail(function (msg) {
            console.log('ajax put of ' + note.id + ' failed: ' + msg + ' --> update note just locally');
            failCallback();
        });
    }

    function deleteTheNote(id, successCallback, failCallback) {
        ajax('DELETE', '/notes/' + id).done(function (msg) {
            console.log('ajax deleted: id ' + id);
            successCallback(id);
        }).fail(function (msg) {
            console.log('ajax delete of ' + id + ' failed: ' + msg + ' --> delete note just locally');
            failCallback();
        });
    }

    return {
        init: init,
        add: addTheNote,
        update: updateTheNote,
        delete: deleteTheNote
    };

}(jQuery));