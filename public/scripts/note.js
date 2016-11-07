var Note = (function () {

    Note.nextNoteId = 1;

    function Note(title, details, dueDate, priority, completionDate = null, completed = false) {
        this.id = Note.nextNoteId++;
        this.title = title;
        this.details = details;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        if (completionDate) {
            this.completionDate = new Date(completionDate);
        }
        this.completed = completed;
    }

    Note.prototype.getMaxId = function () {
        return Note.nextNoteId;
    };

    return Note;
}());

