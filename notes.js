/**
 * Created by Stephan on 17.09.2016.
 */



function selectCSS(id, name){
    document.getElementById(id).setAttribute('href', name);
    log("selectCSS: " + id + ", " + name + " --> " + document.getElementById(id).getAttribute('href'));
}

function getCurrentCSS() {
    return t.getElementById("style").getAttribute("href");
}

function createNewNote() {
    log("createNewNote clicked");
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
    var dst = document.getElementById("placeholder");
    if (!dst) {
        dst = document.getElementById("logArea");
    }
    dst.innerHTML = text;
}