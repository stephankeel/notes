'use strict';

var nextNoteId = 1;

function Note(title, details, dueDate, priority) {
    this.id = nextNoteId++;
    this.title = title;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completionDate = null;
    this.completed = false;
}
