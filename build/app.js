(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = _interopDefault(require('os'));
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

console.log('Loaded environment variables:', env);

var app = electron.remote.app;
var appDir = jetpack.cwd(app.getAppPath());

console.log('The author of this app is:', appDir.read('package.json', 'json').author);
console.info('PLATFORM:', os.platform(), 'ENVIRONMENT:', env.name);

//  Debug variables
var pkgName     = appDir.read('package.json', 'json').name;
var productName = appDir.read('package.json', 'json').productName;
var pkgVersion  = appDir.read('package.json', 'json').version;
var pkgAuthor   = appDir.read('package.json', 'json').author;
var platform    = os.platform().toUpperCase();
var environment = env.name.toUpperCase();
var debugString = pkgName + ' ' + pkgVersion + ' by ' + pkgAuthor + ' @ ' + platform + ' ' + environment;
var DEBUG_MODE  = platform == 'DEVELOPMENT';

var progressBarId = 'progress';
var statusId      = 'status';

//  Sets the HTML element with the specified ID to the specified visible value
function _setVisible (id, visible, callback) {
  var element = document.getElementById(id);
  if (element) {
    // element.visible = visible ? 'VISIBLE' : 'HIDDEN';
    // console.info('Set', id, element.visible);

    element.display = visible ? 'BLOCK' : 'NONE';
    console.info('Set', id, element.display);
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
  _setContent(statusId, msg);
}

document.addEventListener('DOMContentLoaded', function () {
  updateStatus( DEBUG_MODE ? debugString : 'Welcome to ' + productName + ' ' + pkgVersion + ' by ' + pkgAuthor);
  _setVisible(progressBarId);
});
}());
//# sourceMappingURL=app.js.map