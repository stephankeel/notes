'use strict'

var CSS_STORAGE_KEY = "notes-css";

var currentNote = null;
var deleteConfirmed = false;
var colorPreConfirmDelete = null;
var namePreConfirmeDelete = null;
var confirmId = null;

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
    currentNote = null;
    $("#editForm")[0].reset();
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
    if (deleteConfirmed) {
        abortDelete();
    } else {
        log("edit note: " + id);
        currentNote = getNoteById(id);
        $("#title").val(currentNote.title);
        $("#details").val(currentNote.details);
        $("#priority" + currentNote.priority).prop("checked", true);
        $("#dueDate").val(moment(currentNote.dueDate).format('YYYY-MM-DD'));
        activateEdit();
    }
}

function abortDelete() {
    $("#editDeleteCell" + confirmId).css("background-color", colorPreConfirmDelete);
    $("#editButton" + confirmId).val(namePreConfirmeDelete);
    deleteConfirmed = false;
    confirmId = null;
    log("abort cancel note");
}

function saveEditResult() {
    // Store the note
    if (!currentNote) {
        currentNote = new Note();
    }
    currentNote.title = $("#title").val();
    currentNote.details = $("#details").val();
    currentNote.priority = $("#priorityGroup input[type='radio']:checked").val();
    var ddd = $("#dueDate").val();
    currentNote.dueDate = new Date($("#dueDate").val());

    setNoteById(currentNote);

    var formData = JSON.stringify($("#editForm").serializeArray());
    log("save edit result: " + formData);

    reRender();

    // Activate the main page again
    activateMain();
}

function cancelEdit() {
    log("edit cancelled");
    activateMain();
}

function deleteNote(id) {
    if (!deleteConfirmed) {
        deleteConfirmed = true;
        confirmId = id;
        colorPreConfirmDelete = $("#editDeleteCell" + id).css("background-color");
        $("#editDeleteCell" + id).css("background-color", "red");
        namePreConfirmeDelete = $("#editButton" + id).val();
        $("#editButton" + id).val("Abort");
    } else if (id != confirmId) {
        abortDelete();
    } else {
        deleteConfirmed = false;
        log("delete note: " + id);
        deleteNoteById(id);
        reRender();
    }
}

function selectCSS(id, name, save = true) {
//    document.getElementById(id).setAttribute('href', name);
    $("#" + id).attr('href', name);
    if (save) {
        var selectedCSS = {id: id, name: name};
        localStorage.setItem(CSS_STORAGE_KEY, JSON.stringify(selectedCSS));
    } else {
        $("#styleSelection").val(name);
    }
}

function orderByCompletionDate() {
    log("orderByCompletionDate clicked");
    renderNotesByCompletionDate();
}

function orderByDueDate() {
    log("orderByDueDate clicked");
    renderNotesByDueDate();
}

function orderByImportance() {
    log("orderByImportance clicked");
    renderNotesByPriority();
}

function filterNotes(value) {
    log("filterNotes: " + value);
    renderFilteredNotes(value);
}

function log(text) {
    var dst = document.getElementsByClassName("logArea")[0];
    dst.innerHTML = text;
}
