'use strict'

var nextId = 1;

function Note(title, details, dueDate, priority) {
    this.id = nextId++;
    this.title = title;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completionDate = null;
    this.completed = false;

    this.setCompleted = function(checked) {
        this.completed = checked;
        if (checked) {
            this.completionDate = new Date();
        } else {
            this.completionDate = null;
        }
    };

}
