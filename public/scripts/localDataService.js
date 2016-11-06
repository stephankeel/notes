var localDataService = (function ($) {
    'use strict';

    var NOTE_LIST_STORAGE_KEY = 'notes-note-list';
    var storedNotes = localStorage.getItem(NOTE_LIST_STORAGE_KEY);

    function fallbackLoad(itemCallback) {
        if (storedNotes && storedNotes.length > 2) {
            var arr = JSON.parse(storedNotes);
            arr.forEach(note => {
                if (note.dueDate) {
                    note.dueDate = new Date(note.dueDate);
                }
                if (note.completionDate) {
                    note.completionDate = new Date(note.completionDate);
                }
                itemCallback(note);

                // restore the id for the next note created
                if (nextNoteId <= note.id) {
                    nextNoteId++;
                }
            });
        } else {
            var notes = [];
            notes[0] = new Note('Github', 'Projekt 1 im Github erstellen und Link im Excel eintragen', new Date('2016-09-11'), 3);
            notes[1] = new Note('HTML Gerüst erstellen', 'HTML Gerüst erstellen für die WireFrames inkl. CSS. Ändern der Wireframes ist erlaubt.', new Date('2016-09-17'), 5);
            notes[2] = new Note('Fokus auf die Hauptseite', 'HTML Seite ausprogrammieren: Anzeigen der Einträge / Filtern / Sortieren Daten in einer Variable abspeichern & Beispiel Daten erfassen. Handlebars verwenden für das Rendern der Einträge. Style Switcher implementieren.', new Date('2016-09-24'), 4);
            notes[3] = new Note('LocalStorage und weiter mit HTML', 'Die Daten in den LokalStorage verschieben. Navigation zwischen den beiden HTML-Seiten. Flex-Layout ausprobieren.', new Date('2016-10-01'), 3);
            notes[4] = new Note('JavaScript optimieren', 'JavaScript optimieren. Pattern anwenden. Nutzen von Klassen für die Datenhaltung. (Revealing) Module Pattern für die Datenklassen erstellen, IIFE anwenden.', new Date('2016-11-21'), 2);
            notes[5] = new Note('Modularisierung und Node.js', 'Client Modularisierung fortführen. Node-Module erstellen zum Verwalten der Daten auf dem Server. Bonus: Neue Einträge sollen auf andern Browser sichtbar werden. z.B. durch Polling.', new Date('2016-12-16'), 1);
            notes[6] = new Note('REST API', 'Die REST API vom Server implementieren. Diese im Client anbinden.', new Date('2017-01-23'), 1);
            notes[7] = new Note('Finalisieren & Abgabe', 'Projekt 1 ferigstellen und am 10.11.2016 durch Mail mit Link zun Github Branch', new Date('2017-05-08'), 5);

            notes.filter(note => note.dueDate < Date.now()).forEach(note => {
                note.completed = true;
                note.completionDate = note.dueDate;
            });

            notes.forEach(note => itemCallback(note));
        }
    }

    function saveTheNoteList(noteList) {
        var buffer = JSON.stringify(noteList);
        localStorage.setItem(NOTE_LIST_STORAGE_KEY, buffer);
    }

    function init(itemCallback) {
        console.log('load notes from local storage');
        fallbackLoad(itemCallback);
    }

    return {
        init: init,
        persist: saveTheNoteList
    };

}
(jQuery));