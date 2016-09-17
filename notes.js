/**
 * Created by Stephan on 17.09.2016.
 */



function selectCSS(id, name){
    log("selectCSS: " + id + ", " + name);
    document.getElementById(id).setAttribute('href', name);
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
    document.getElementById("placeholder").innerHTML = text;
}