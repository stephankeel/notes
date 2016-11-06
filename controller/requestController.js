'use strict';
/* Created by Stephan on 22.10.2016 */

var storeService = require('../services/notesModel.js');
var cnt = 0;
var noteList = [];

function Note(title, details, dueDate, priority) {
    this.title = title;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completionDate = null;
    this.completed = false;
}

function createTestNotes(req, res, next) {
    cnt = 0;
    noteList = [];
    noteList[0] = new Note('Github', 'Projekt 1 im Github erstellen und Link im Excel eintragen', new Date('2016-10-11'), 3);
    noteList[1] = new Note('HTML Gerüst erstellen', 'HTML Gerüst erstellen für die WireFrames inkl. CSS. Ändern der Wireframes ist erlaubt.', new Date('2016-10-17'), 5);
    noteList[2] = new Note('Fokus auf die Hauptseite', 'HTML Seite ausprogrammieren: Anzeigen der Einträge / Filtern / Sortieren Daten in einer Variable abspeichern & Beispiel Daten erfassen. Handlebars verwenden für das Rendern der Einträge. Style Switcher implementieren.', new Date('2016-09-28'), 4);
    noteList[3] = new Note('LocalStorage und weiter mit HTML', 'Die Daten in den LokalStorage verschieben. Navigation zwischen den beiden HTML-Seiten. Flex-Layout ausprobieren.', new Date('2016-11-01'), 3);
    noteList[4] = new Note('JavaScript optimieren', 'JavaScript optimieren. Pattern anwenden. Nutzen von Klassen für die Datenhaltung. (Revealing) Module Pattern für die Datenklassen erstellen, IIFE anwenden.', new Date('2016-11-05'), 2);
    noteList[5] = new Note('Modularisierung und Node.js', 'Client Modularisierung fortführen. Node-Module erstellen zum Verwalten der Daten auf dem Server. Bonus: Neue Einträge sollen auf andern Browser sichtbar werden. z.B. durch Polling.', new Date('2016-11-07'), 1);
    noteList[6] = new Note('REST API', 'Die REST API vom Server implementieren. Diese im Client anbinden.', new Date('2016-11-23'), 1);
    noteList[7] = new Note('Finalisieren & Abgabe', 'Projekt 1 ferigstellen und am 10.11.2016 durch Mail mit Link zun Github Branch', new Date('2016-12-01'), 5);

    noteList.filter(note => note.dueDate < Date.now()).forEach(note => {
        note.completed = true;
        note.completionDate = note.dueDate;
    });

    noteList.forEach(note => {
        storeService.add(note, function (err, dbNote) {
            cnt++;
            if (cnt == noteList.length) {
                getAllNotes(req, res, next);
            }
        });
    });
}

function createNote(req, res, next) {
    var body = req.body;
    var note = new Note(body.title, body.details, body.dueDate, body.priority);
    console.log('Post: ' + JSON.stringify(note));
    storeService.add(note, function(err, dbNote) {
        res.json(dbNote);
        next();
    });
}

function updateNote(req, res, next) {
    var body = req.body;
    var note = new Note(body.title, body.details, body.dueDate, body.priority);
    note.completionDate = body.completionDate;
    note.completed = body.completed;
    console.log('Put: ' + JSON.stringify(note));
    storeService.update(req.params.id, note, function(err, dbNote) {
        res.json(dbNote);
        next();
    });
}

function getAllNotes(req, res, next) {
    storeService.getAll(function (err, dbNotes) {
        res.json(dbNotes);
        next();
    });
}

function getNote(req, res, next) {
    storeService.get(req.params.id, function (err, dbNote) {
        res.json(dbNote);
        next();
    });
}

function deleteNote(req, res, next) {
    storeService.delete(req.params.id, function (err, count) {
        res.json({id : req.params.id});
        next();
    });
}

function deleteAllNotes(req, res, next) {
    storeService.deleteAll(function (err, count) {
        res.json({count : count});
        next();
    });
}

function showIndexPage(req, res, next) {
    res.type('test/html');
    res.sendFile('index.html', {root: '../public/'});
    next();
}

module.exports = {
    test: createTestNotes,
    create: createNote,
    update: updateNote,
    getAll: getAllNotes,
    get: getNote,
    delete: deleteNote,
    deleteAll: deleteAllNotes
};
