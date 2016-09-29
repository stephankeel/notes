/**
 * Created by Stephan on 17.09.2016.
 */

var CSS_STORAGE_KEY = "notes-css";

log("jquery version " + $.fn.jquery);
init();

function init() {
    var storedCSS = localStorage.getItem(CSS_STORAGE_KEY);
    if (storedCSS) {
        var selectedCSS = JSON.parse(storedCSS);
        selectCSS(selectedCSS.id, selectedCSS.name, false);
    }
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

function selectCSS(id, name, save=true) {
    document.getElementById(id).setAttribute('href', name);
    if (save) {
        var selectedCSS = {id: id, name: name};
        localStorage.setItem(CSS_STORAGE_KEY, JSON.stringify(selectedCSS));
    } else {
        document.getElementById("styleSelection").value = name;
    }
    log("selectCSS: " + id + ", " + name + " --> " + document.getElementById(id).getAttribute('href') + ", saved: " + save);
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
