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
var pkgVersion  = appDir.read('package.json', 'json').version;
var pkgAuthor   = appDir.read('package.json', 'json').author;
var platform    = os.platform().toUpperCase();
var environment = env.name.toUpperCase();
var debugString = pkgName + ' ' + pkgVersion + ' by ' + pkgAuthor + ' @ ' + platform + ' ' + environment;

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
}());
//# sourceMappingURL=app.js.map