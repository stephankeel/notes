'use strict';

// if not available from the internet or no internet available then load it from the local disk
window.jQuery || document.write('<script src="external/jquery-3.1.1.min.js"><\/script>');
window.Handlebars || document.write('<script src="external/handlebars-v4.0.5.js"><\/script>');
window.moment || document.write('<script src="external/moment-2.15.1.min.js"><\/script>');

// load the project scripts themselves
document.write('<script src="note.js"><\/script>');
document.write('<script src="notemodel.js"><\/script>');
document.write('<script src="noterenderer.js"><\/script>');
document.write('<script src="notecontroller.js"><\/script>');
