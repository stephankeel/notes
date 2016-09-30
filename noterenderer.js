'use strict'

var notesTableHtml;

function initNoteRenderer() {
    var noteTemplateText = $("#noteTemplate").html();
    Handlebars.registerHelper("myDateFormatter", function (dateTime, format = "de-DE") {
        if (dateTime) {
            var dateTimeStr = dateTime.toLocaleDateString(format);
            var nowStr = new Date().toLocaleDateString(format);
            if (dateTimeStr === nowStr) {
                return "today";
            } else {
                return dateTime.toLocaleDateString(format);
            }
        } else {
            return "";
        }
    });
    notesTableHtml = Handlebars.compile(noteTemplateText);
    renderNodesByDueDate();
}

function renderNodesByDueDate(order = 1) {
    var list = noteList.sort((a, b) => (a.dueDate - b.dueDate) * order);
    renderNotes(list);
}

function renderNodesByCompletionDate(order = 1) {
    var list = noteList.sort((a, b) => (b.completionDate - a.completionDate) * order);
    renderNotes(list);
}

function renderNotesByPriority(order = 1) {
    var list = noteList.sort((a, b) => (b.priority - a.priority) * order);
    renderNotes(list);
}

function renderNotes(list) {
    var noteSection = $("#notesSection");
    if (noteSection.get(0)) {
        noteSection.get(0).innerHTML = notesTableHtml(list);
    } else {
        noteSection.append(notesTableHtml(list));
    }
}