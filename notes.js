/**
 * Created by Stephan on 17.09.2016.
 */

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

function selectCSS(id, name) {
    document.getElementById(id).setAttribute('href', name);
    log("selectCSS: " + id + ", " + name + " --> " + document.getElementById(id).getAttribute('href'));
}

function orderByCompletionDate() {
    log("orderByCompletionDate clicked");
}

function orderByCreationDate() {
    log("orderByCreationDate clicked");
}

function orderByImportance() {
    log("orderByImportance clicked");
}

function filterNotes(value) {
    log("filterNotes: " + value);
}

function log(text) {
    var dst = document.getElementsByClassName("logArea")[0];
    dst.innerHTML = text;
}
