<h1>Project1 @ HSR, the notes web application</h1>

<h2>How to run</h2>
<ol>
<li>Download Notes from github:
<pre>git clone http://github.com/stephankeel/notes.git</pre>
</li>
<li>Start the server:
<pre>
  cd notes
  npm install
  node noteServer.js
	
  --> NoteServer running at http://127.0.0.1:3001/
</pre>
<li>Open the browser on that address and port <code>http://127.0.0.1:3001</code></li>
<li>You may create a dummy data set by calling <pre>http://127.0.0.1:3001/test</pre></li>
</ol>

<h2>Server REST-API</h2>
<table>
<tr><td>GET /</td><td>Provides index.html</td>
<tr><td>GET /test</td><td>Creates dummy data and returns them</td>
</table>

GET /test           Creates dummy data and returns them
GET /error          Creates a server error
GET /notes          Returns all notes
GET /notes/id       Returns the note with the provided id

POST /notes         Create a note

PUT /notes/id       Update the note with the provided id

DELETE /notes/id    Delete the note with the provided id
DELETE /notes       Deletes all notes


<h2>Note</h2>
You may run the client as well without server. In that case all data is stored in the local storage.
A dummy set of data will be created initially and as soon as all data has been delete.
