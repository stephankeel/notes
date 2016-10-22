'use strict';

var NOTE_RENDERING_CONTEXT_KEY = "notes-rendering";

var renderingContext = {
    order: 1,
    sortId: 1,
    filter: "all notes"
};

var storedRenderingContext = localStorage.getItem(NOTE_RENDERING_CONTEXT_KEY);
if (storedRenderingContext) {
    renderingContext = JSON.parse(storedRenderingContext);
    if (!renderingContext.filter) {
        renderingContext.filter = "all notes";
    }
    $("#notesFilterSelection").val(renderingContext.filter);
}

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
    reRender();
}

var renderNotesByDueDate = function (order = 1) {
    $(".sortButton").css("border-color", "");
    $("#orderByDueDateButton").css("border-color", "red");
    storeRenderingContextBySorting(1, order)
    var list = noteList.sort((a, b) => (a.dueDate - b.dueDate) * order);
    renderNotes(list);
}

var renderNotesByCompletionDate = function (order = 1) {
    $(".sortButton").css("border-color", "");
    $("#orderByCompletionDateButton").css("border-color", "red");
    storeRenderingContextBySorting(2, order)
    var list = noteList.sort((a, b) => {
        if (!a.completionDate) {
            return order;
        } else if (!b.completionDate) {
            return -1 * order;
        } else {
            return (a.completionDate - b.completionDate) * order
        }
    });
    renderNotes(list);
}

var renderNotesByPriority = function (order = 1) {
    $(".sortButton").css("border-color", "");
    $("#orderByPriorityButton").css("border-color", "red");
    storeRenderingContextBySorting(3, order)
    var list = noteList.sort((a, b) => (b.priority - a.priority) * order);
    renderNotes(list);
}

function storeRenderingContextBySorting(sortId, order) {
    renderingContext.sortId = sortId;
    renderingContext.order = order;
    storeRenderingContext();
}

function renderFilteredNotes(filter) {
    renderingContext.filter = filter;
    reRender();
}

function storeRenderingContextByFiltering(filter) {
    renderingContext.filter = filter;
    storeRenderingContext();
}

function storeRenderingContext() {
    var buffer = JSON.stringify(renderingContext);
    localStorage.setItem(NOTE_RENDERING_CONTEXT_KEY, buffer);
}

function reRender() {
    switch (renderingContext.sortId) {
        case 1:
            renderNotesByDueDate(renderingContext.order);
            break;
        case 2:
            renderNotesByCompletionDate(renderingContext.order);
            break;
        case 3:
            renderNotesByPriority(renderingContext.order);
            break;
    }
}

function renderNotes(list) {
    var noteSection = $("#notesSection");
    var filteredList = list.filter(note => {
        var filterVal = renderingContext.filter;
        if (filterVal === "all notes") {
            return true;
        } else if (filterVal === "complete notes" && note.completed) {
            return true;
        } else if (filterVal === "open notes" && !note.completed) {
            return true;
        }
        return false;
    });
    if (noteSection.get(0)) {
        noteSection.get(0).innerHTML = notesTableHtml(filteredList);
    } else {
        noteSection.append(notesTableHtml(filteredList));
    }
}