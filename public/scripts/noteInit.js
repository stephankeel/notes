;(function (win, doc) {
    'use strict';

// if not available from the internet or no internet available then load it from the local disk
    win.jQuery || doc.write('<script src="./external/jquery-3.1.1.min.js"><\/script>');
    win.Handlebars || doc.write('<script src="./external/handlebars-v4.0.5.js"><\/script>');
    win.moment || doc.write('<script src="./external/moment-2.15.1.min.js"><\/script>');

// load the project scripts themselves
    var root = window.location.pathname;
    doc.write('<script src="./scripts/note.js"><\/script>');
    doc.write('<script src="./scripts/localDataService.js"><\/script>');
    doc.write('<script src="./scripts/remoteDataService.js"><\/script>');
    doc.write('<script src="./scripts/webSocketClient.js"><\/script>');
    doc.write('<script src="./scripts/noteModel.js"><\/script>');
    doc.write('<script src="./scripts/noteRenderer.js"><\/script>');
    doc.write('<script src="./scripts/noteController.js"><\/script>');

}(window, document));