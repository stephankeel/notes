This is the repository of the first project @ HSR, the notes web application.

How to run:

1. Start the server:

	node noteServer.js
	
	NoteServer running at http://127.0.0.1:3001/
	
2. Open Chrome on that address and port http://127.0.0.1:3001

3. You may create a test data set by calling http://127.0.0.1:3001/test 


REST-API

GET / : Provides index.html
GET /test: Creates test data and returns them.
GET /error: Creates a server error
GET /notes: Returns all notes
GET /notes/id: Returns the note with the provided id 

POST /notes: Create a note

PUT /notes/id: Update the note with the provided id

DELETE /notes/id: Delete the note with the provided id
DELETE /notes: Deletes all notes
