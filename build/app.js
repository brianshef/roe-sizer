(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = _interopDefault(require('os'));
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

var ids = {
  'inputId':          'input',
  'outputId':         'output',
  'widthId':          'width',
  'processButtonId':  'button',
  'progressBarId':    'progress',
  'statusId':         'status'
};

var _value = '';

function _getElement (callback) {
  var e = document.getElementById(ids['inputId']);
  if (e && callback) { callback(e); }
}

function _onInputChange (event) {
  _value = this.value;
}

var getInputValue = function() {
  return _value;
}

var initInput = function() {
  _getElement(function(e) {
    e.addEventListener('change', _onInputChange);
  });
}

var _value$1 = '';

function _getElement$1 (callback) {
  var e = document.getElementById(ids['outputId']);
  if (e && callback) { callback(e); }
}

function _onOutputChange (event) {
  _value$1 = this.value;
}

var getOutputValue = function() {
  return _value$1;
}

var initOutput = function() {
  _getElement$1(function(e) {
    e.addEventListener('change', _onOutputChange);
  });
}

var _value$2 = 0;

function _getElement$2 (callback) {
  var e = document.getElementById(ids['widthId']);
  if (e && callback) { callback(e); }
}

function _onWidthChange (event) {
  _value$2 = this.value;
}

var getWidthValue = function() {
  return _value$2;
}

var initWidth = function() {
  _getElement$2(function(e) {
    e.addEventListener('change', _onWidthChange);
  });
}

//  Appends a new line to the status console
var _appendLine = function (id, content, callback) {
  var element = document.getElementById(id);
  if (element) {
    var lines = element.value.split("\n");
    lines.push(content);
    element.value = lines.join("\n");
  }

  if (callback) { callback(); }
}

//  Updates the status message to the specified message content.
var updateStatus = function (msg) {
  _appendLine(ids['statusId'], msg);
}

//  Receive messages from server (background.js)
const { ipcRenderer } = require('electron');
ipcRenderer.on('asynchronous-reply', _handleAsyncReply);
ipcRenderer.on('server-message', _handleServerMessage);

//  Logic that occurs when message replies from the server are received.
function _handleAsyncReply (event, msg) {
  console.info('[asynchronous-reply]', msg);
  updateStatus(msg);
}

//  Logic that occurs when messages from the server are received.
function _handleServerMessage (event, msg) {
  console.log('[server-message]', msg);
  alert(msg);
}

//  Send messages to server (background.js)
var sendMsgToServer = function (data) {
  ipcRenderer.send('asynchronous-message', data);
}

//  Get the values of the various options
function _getOptionValues (callback) {
  if (callback) {
    callback(getInputValue(), getOutputValue(), getWidthValue());
  }
}

//  Formats option data into a JSON message to be read by the server
function _formatMsg (inputDir, outputDir, width, callback) {
  var msg = {
    'type': 'PROCESS_IMAGES',
    'inputDir': inputDir ? inputDir : '',
    'outputDir': outputDir ? outputDir : '',
    'width': width ? width : 0
  };

  if (callback) { callback(msg); }
}

//  Gets the option values, formats them in a message, and sends the message
//  to the server to be processed.
function _sendProcessImagesRequest () {
  _getOptionValues(function(inVal, outVal, wVal) {
    _formatMsg(inVal, outVal, wVal, function(msg) {
      sendMsgToServer(msg);
    });
  });
}

//  Logic that occurs when the PROCESS IMAGES button is pressed.
function _onProcessImagesButtonPressed() {
  _sendProcessImagesRequest();
}

//  Initialization of buttons
var initButtons = function () {
  var buttons = [
    {
      "id": ids['processButtonId'],
      "function": _onProcessImagesButtonPressed
    }
  ];

  for (var i in buttons) {
    var button = buttons[i];
    var b = document.getElementById(button['id']);
    if (b) { b.addEventListener("click", button['function']); }
  }
}

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

var app = electron.remote.app;
var appDir = jetpack.cwd(app.getAppPath());

//  Debug variables
var pkg         = appDir.read('package.json', 'json');
var pkgName     = pkg.name;
var productName = pkg.productName;
var pkgVersion  = pkg.version;
var pkgAuthor   = pkg.author;
var platform    = os.platform().toUpperCase();
var environment = env.name.toUpperCase();
var debugString = pkgName + ' ' + pkgVersion + ' by ' + pkgAuthor + ' on ' + platform + ' ' + environment;
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



//  Initialization logic
function _initialize() {
  updateStatus(DEBUG_MODE ? debugString : 'Welcome to ' + productName + ' ' + pkgVersion + ' by ' + pkgAuthor);
  _setVisible(ids['progressBarId']);
  initButtons();
  initInput();
  initOutput();
  initWidth();
}

document.addEventListener('DOMContentLoaded', function () {
  _initialize();
});
}());
//# sourceMappingURL=app.js.map