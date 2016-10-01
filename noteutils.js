'use strict'

var CSS_STORAGE_KEY = "notes-css";


log("jquery version " + $.fn.jquery);
init();


function init() {
    var storedCSS = localStorage.getItem(CSS_STORAGE_KEY);
    if (storedCSS) {
        var selectedCSS = JSON.parse(storedCSS);
        selectCSS(selectedCSS.id, selectedCSS.name, false);
    }

    initNoteRenderer();
}

function activateMain() {
    $("#mainSection").show();
    $("#editSection").hide();
    $("#mainTitle").text("Notes - Overview");
}

function activateEdit() {
    $("#mainSection").hide();
    $("#editSection").show();
    $("#mainTitle").text("Notes - Edit");
}

function editNote(id) {
    log("edit note: " + id);
    var note = getNoteById(id);
    document.getElementById("title").value = note.title;
    document.getElementById("details").value = note.details;
    document.getElementById("dueDate").value = note.dueDate;
    activateEdit();
}

function saveEditResult() {
    // Store the note
    // TODO
    var formData = JSON.stringify($("#editForm").serializeArray());
    log("save edit result: " + formData);

    // Activate the main page again
    activateMain();
}

function cancelEdit() {
    log("edit cancelled");
    activateMain();
}

function selectCSS(id, name, save = true) {
    document.getElementById(id).setAttribute('href', name);
    if (save) {
        var selectedCSS = {id: id, name: name};
        localStorage.setItem(CSS_STORAGE_KEY, JSON.stringify(selectedCSS));
    } else {
        document.getElementById("styleSelection").value = name;
    }
}

function orderByCompletionDate() {
    log("orderByCompletionDate clicked");
    renderNodesByCompletionDate();
}

function orderByDueDate() {
    log("orderByDueDate clicked");
    renderNodesByDueDate();
}

function orderByImportance() {
    log("orderByImportance clicked");
    renderNotesByPriority();
}

function filterNotes(value) {
    log("filterNotes: " + value);
}

function log(text) {
    var dst = document.getElementsByClassName("logArea")[0];
    dst.innerHTML = text;
}
