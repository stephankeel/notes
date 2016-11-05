Project1 @ HSR, the notes web application
=========================================

How to run
----------

1. Download Notes from github:
        git clone http://github.com/stephankeel/notes.git

2. Start the server:
        cd notes
	    npm install
	    node noteServer.js
	
	    --> NoteServer running at http://127.0.0.1:3001/
	
3. Open the browser on that address and port http://127.0.0.1:3001

4. You may create a dummy data set by calling http://127.0.0.1:3001/test


Server REST-API
---------------

GET /               Provides index.html
GET /test           Creates dummy data and returns them
GET /error          Creates a server error
GET /notes          Returns all notes
GET /notes/id       Returns the note with the provided id

POST /notes         Create a note

PUT /notes/id       Update the note with the provided id

DELETE /notes/id    Delete the note with the provided id
DELETE /notes       Deletes all notes


Note
----

You may run the client as well without server. In that case all data is stored in the local storage.
A dummy set of data will be created initially and as soon as all data has been delete.