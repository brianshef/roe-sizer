// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { ids } from './htmlElements/elementIds';
import env from './env';

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

//  Debug variables
var pkg         = appDir.read('package.json', 'json');
var pkgName     = pkg.name;
var productName = pkg.productName;
var pkgVersion  = pkg.version;
var pkgAuthor   = pkg.author;
var platform    = os.platform().toUpperCase();
var environment = env.name.toUpperCase();
var debugString = pkgName + ' ' + pkgVersion + ' by ' + pkgAuthor + ' @ ' + platform + ' ' + environment;
var DEBUG_MODE  = environment == 'DEVELOPMENT';
if (DEBUG_MODE) { console.log(debugString); }

//  Sets the HTML element with the specified ID to the specified visible value
function _setVisible (id, visible, callback) {
  var element = document.getElementById(id);
  if (element) {
    element.visible = visible ? 'VISIBLE' : 'HIDDEN';
    console.info('Set', id, element.visible);

    // element.display = visible ? 'BLOCK' : 'NONE';
    // console.info('Set', id, 'display', element.display);
  }

  if (callback) { callback(); }
}

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

  if (callback) { callback(); }
}

//  Updates the status message to the specified message content.
function updateStatus (msg) {
  _setContent(ids['statusId'], msg);
}

//  Logic that occurs when the input button is pressed.
function onInputButtonPressed() {
  alert('Input button pressed');
}

//  Logic that occurs when the output button is pressed.
function onOutputButtonPressed() {
  alert('Output button pressed');
}

//  Logic that occurs when the PROCESS IMAGES button is pressed.
function onProcessImagesButtonPressed() {
  alert('PROCESS IMAGES button pressed');
}

//  Initialization of buttons
function _initButtons() {
  var buttons = [
    {
      "id": ids['inputButtonId'],
      "function": onInputButtonPressed
    },
    {
      "id": ids['outputButtonId'],
      "function": onOutputButtonPressed
    },
    {
      "id": ids['processButtonId'],
      "function": onProcessImagesButtonPressed
    }
  ];

  for (var i in buttons) {
    var button = buttons[i];
    var b = document.getElementById(button['id']);
    if (b) { b.addEventListener("click", button['function']); }
  }
}

//  Initialization logic
function _initialize() {
  updateStatus(DEBUG_MODE ? debugString : 'Welcome to ' + productName + ' ' + pkgVersion + ' by ' + pkgAuthor);
  _setVisible(ids['progressBarId']);
  _initButtons();
}

document.addEventListener('DOMContentLoaded', function () {
  _initialize();
});
