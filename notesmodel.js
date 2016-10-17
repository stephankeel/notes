'use strict'

var noteList = [];

var NOTE_LIST_STORAGE_KEY = "notes-note-list";
var storedNotes = localStorage.getItem(NOTE_LIST_STORAGE_KEY);

if (storedNotes) {
    var arr = JSON.parse(storedNotes);
    arr.forEach(note => {
        if (note.dueDate) {
            note.dueDate = new Date(note.dueDate);
        }
        if (note.completionDate) {
            note.completionDate = new Date(note.completionDate);
        }
        noteList.push(note);

        // restore the id for the next note created
        if (nextNoteId <= note.id) {
            nextNoteId++;
        }
    });
} else {
    noteList[0] = new Note("Github", "Projekt 1 im Github erstellen und Link im Excel eintragen", new Date("2016-09-11"), 3);
    noteList[1] = new Note("HTML Gerüst erstellen", "HTML Gerüst erstellen für die WireFrames inkl. CSS. Ändern der Wireframes ist erlaubt.", new Date("2016-09-17"), 5);
    noteList[2] = new Note("Fokus auf die Hauptseite", "HTML Seite ausprogrammieren: Anzeigen der Einträge / Filtern / Sortieren Daten in einer Variable abspeichern & Beispiel Daten erfassen. Handlebars verwenden für das Rendern der Einträge. Style Switcher implementieren.", new Date("2016-09-24"), 4);
    noteList[3] = new Note("LocalStorage und weiter mit HTML", "Die Daten in den LokalStorage verschieben. Navigation zwischen den beiden HTML-Seiten. Flex-LAyout ausprobieren.", new Date("2016-10-01"), 3);
    noteList[4] = new Note("JavaScript optimieren", "JavaScript optimieren. Pattern anwenden. Nutzen von Klassen für die Datenhaltung. (Revealing) Module Pattern für die \"Datenklassen\" erstellen, IIFE anwenden.", new Date("2016-10-09"), 2);
    noteList[5] = new Note("Modularisierung und Node.js", "Client Modularisierung fortführen. Node-Module erstellen zum Verwalten der Daten auf dem Server. Bonus: Neue Einträge sollen auf andern Browser sichtbar werden. z.B. durch Polling.", new Date("2016-10-16"), 1);
    noteList[6] = new Note("REST API", "Die REST API vom Server implementieren. Diese im Client anbinden.", new Date("2016-10-23"), 1);
    noteList[7] = new Note("Finalisieren & Abgabe", "Projekt 1 ferigstellen und am 10.11.2016 durch Mail mit Link zun Github Branch", new Date("2016-11-08"), 5);

    noteList.filter(note => note.dueDate < Date.now()).forEach(note => note.setCompleted(true));

    saveNoteList();
}

function getNoteById(id) {
    return noteList.filter(n => n.id == id)[0];
}

function indexOfNoteWithId(id) {
    for (var index in noteList) {
        if (noteList[index].id == id) {
            return index;
        }
    }
    return noteList.length;
}

function setNoteById(note) {
    noteList[indexOfNoteWithId(note.id)] = note;
    saveNoteList();
}

function deleteNoteById(id) {
    var index = indexOfNoteWithId(id);
    noteList.splice(index, 1);
    saveNoteList();
}

function saveNoteList() {
    var buffer = JSON.stringify(noteList);
    localStorage.setItem(NOTE_LIST_STORAGE_KEY, buffer);
}