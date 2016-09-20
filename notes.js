/**
 * Created by Stephan on 17.09.2016.
 */

function activateMain() {
    document.getElementById("mainSection").style.display = "inline";
    document.getElementById("editSection").style.display = "none";
    document.getElementById("mainTitle").innerHTML = "Notes - Overview";
}

function activateEdit() {
    document.getElementById("mainSection").style.display = "none";
    document.getElementById("editSection").style.display = "inline";
    document.getElementById("mainTitle").innerHTML = "Notes - Edit";
}

function saveEditResult() {
    // Store the note
    // TODO
    var params = '';
    for (var i = 0; i < document.editForm.elements.length; i++) {
        var fieldName = document.editForm.elements[i].name;
        if (fieldName) {
            var fieldValue = document.editForm.elements[i].value;
            params += fieldName + '=' + fieldValue + '&';
        }
    }

    log("save edit result: " + params);

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