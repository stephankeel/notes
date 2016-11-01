;(function ($) {
    'use strict';

    var CSS_STORAGE_KEY = "notes-css";

    var currentNote = null;
    var deleteConfirmed = false;
    var colorPreConfirmDelete = null;
    var namePreConfirmDelete = null;
    var confirmId = null;

    var reRenderCallback = function() {
        noteRenderer.reRender()
    };


    history.pushState({id: 'Note App'}, '', 'index.html');

    init();

    function init() {
        log("jquery version " + $.fn.jquery);
        var storedCSS = localStorage.getItem(CSS_STORAGE_KEY);
        if (storedCSS) {
            var selectedCSS = JSON.parse(storedCSS);
            selectCSS(selectedCSS.id, selectedCSS.name, false);
        }

        noteRenderer.init();
        noteModel.init(reRenderCallback);

        $('#styleSelection').on('change', function (e) {
            e.stopPropagation();
            selectCSS('style', this.options[this.selectedIndex].value);
        });

        // create button click action
        $('#createButton').on('click', function (e) {
            e.stopPropagation();
            createNote();
        });

        // sorting button click actions
        $('#sortingSection').on('click', '.sortButton', function (e) {
            e.stopPropagation();
            log("sort button: " + e.target.id);
            switch (e.target.id) {
                case "orderByCompletionDateButton":
                    noteRenderer.renderByCompletionDate();
                    break;
                case "orderByDueDateButton":
                    noteRenderer.renderByDueDate();
                    break;
                case "orderByPriorityButton":
                    noteRenderer.renderByPriority();
                    break;
            }
        });

        $('#notesFilterSelection').on('change', function (e) {
            e.stopPropagation();
            noteRenderer.renderFilteredNotes(this.options[this.selectedIndex].value);
        });

        // note table row click actions
        $('#notesSection').on('click', '.rowActionable', function (e) {
            var id = getNoteIdOf(e.target);
            e.stopPropagation();
            log("clicked: " + e.target.name + " for id: " + id);
            switch (e.target.name) {
                case "edit":
                    editNote(id);
                    break;
                case "delete":
                    deleteNote(id);
                    break;
                case "completed":
                    completeNote(id);
                    break;
            }
        });

        $('#editForm').on('submit', function (e) {
            e.stopPropagation();
            saveEditResult();
        });

        $('#cancelButton').on('click', function (e) {
            e.stopPropagation();
            cancelEdit()
        });

        // bind the displayed priority to currently set radio button, both in the editor
        $('input[type=radio][name=proprity]').change(function () {
            $("#selectedPriority").text(this.value);
        });
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

    function getNoteIdOf(element) {
        var tableRow = element.closest("tr");
        var id = tableRow.getAttribute("data-note-id");
        return id;
    }

    function createNote() {
        $("#priority1").prop("checked", true);
        $("#selectedPriority").text(1);
        activateEdit();
    }

    function completeNote(id) {
        currentNote = noteModel.get(id);
        currentNote.completed = !currentNote.completed;
        if (currentNote.completed) {
            currentNote.completionDate = new Date();
        } else {
            currentNote.completionDate = null;
        }
        noteModel.update(currentNote, reRenderCallback);
    }

    function editNote(id) {
        if (deleteConfirmed) {
            abortDelete();
        } else {
            log("edit note: " + id);
            currentNote = noteModel.get(id);
            $("#title").val(currentNote.title);
            $("#details").val(currentNote.details);
            $("#priority" + currentNote.priority).prop("checked", true);
            $("#dueDate").val(moment(currentNote.dueDate).format('YYYY-MM-DD'));
            $("#selectedPriority").text(currentNote.priority);
            activateEdit();
        }
    }

    function abortDelete() {
        $("#editDeleteCell" + confirmId).css("background-color", colorPreConfirmDelete);
        $("#editButton" + confirmId).html(namePreConfirmDelete);
        deleteConfirmed = false;
        confirmId = null;
        log("abort cancel note");
    }

    function saveEditResult() {
        // Store the note
        if (!currentNote) {
            currentNote = new Note();
            currentNote.id = null;
        }
        currentNote.title = $("#title").val();
        currentNote.details = $("#details").val();
        currentNote.priority = $("#priorityGroup input[type='radio']:checked").val();
        var ddd = $("#dueDate").val();
        currentNote.dueDate = new Date($("#dueDate").val());

        if (currentNote.id) {
            noteModel.update(currentNote, reRenderCallback);
        } else {
            noteModel.add(currentNote, reRenderCallback);
        }

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
            namePreConfirmDelete = $("#editButton" + id).html();
            $("#editButton" + id).html("Abort");
        } else if (id != confirmId) {
            abortDelete();
        } else {
            deleteConfirmed = false;
            log("delete note: " + id);
            noteModel.delete(id, reRenderCallback);
        }
    }

    function selectCSS(id, name, save = true) {
        $("#" + id).attr('href', name);
        if (save) {
            var selectedCSS = {id: id, name: name};
            localStorage.setItem(CSS_STORAGE_KEY, JSON.stringify(selectedCSS));
        } else {
            $("#styleSelection").val(name);
        }
    }

    function log(text) {
        $(".logArea").text(text);
    }

}(jQuery));