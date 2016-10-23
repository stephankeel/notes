;(function (win, doc) {
    'use strict';

// if not available from the internet or no internet available then load it from the local disk
    win.jQuery || doc.write('<script src="external/jquery-3.1.1.min.js"><\/script>');
    win.Handlebars || doc.write('<script src="external/handlebars-v4.0.5.js"><\/script>');
    win.moment || doc.write('<script src="external/moment-2.15.1.min.js"><\/script>');

// load the project scripts themselves
    doc.write('<script src="note.js"><\/script>');
    doc.write('<script src="notemodel.js"><\/script>');
    doc.write('<script src="noterenderer.js"><\/script>');
    doc.write('<script src="notecontroller.js"><\/script>');
}(window, document));