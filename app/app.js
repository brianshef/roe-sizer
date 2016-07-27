// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
// import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

console.log('The author of this app is:', appDir.read('package.json', 'json').author);
console.info('PLATFORM:', os.platform(), 'ENVIRONMENT:', env.name);

//  Debug variables
var pkgName     = appDir.read('package.json', 'json').name;
var pkgVersion  = appDir.read('package.json', 'json').version;
var pkgAuthor   = appDir.read('package.json', 'json').author;
var platform    = os.platform().toUpperCase();
var environment = env.name.toUpperCase();
var debugString = pkgName + ' ' + pkgVersion + ' by ' + pkgAuthor + ' @ ' + platform + ' ' + environment;

//  HTML Element Ids
var inputId       = 'input';
var outputId      = 'output';
var widthId       = 'width';
var progressBarId = 'progress';
var statusId      = 'status';

//  Sets the inner HTML of the element with the specified ID to the specified
//  content, if the element exists.
function _setContent (id, content, callback) {
  var element = document.getElementById(id);
  if (element && element.innerHTML) {
    element.innerHTML = content;
    console.info('Set', id, 'content to', content);
  } else {
    console.warning('Invalid element ID', id);
  }

  if (callback) {
    callback();
  }
}

//  Updates the status message to the specified message content.
function updateStatus (msg) {
  _setContent(statusId, msg);
}

document.addEventListener('DOMContentLoaded', function () {
    updateStatus(debugString);
});
