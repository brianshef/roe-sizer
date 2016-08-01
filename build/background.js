(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

var devMenuTemplate = {
    label: 'Development',
    submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function () {
            electron.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
        }
    },{
        label: 'Toggle DevTools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: function () {
            electron.BrowserWindow.getFocusedWindow().toggleDevTools();
        }
    },{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function () {
            electron.app.quit();
        }
    }]
};

var editMenuTemplate = {
    label: 'Edit',
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]
};

function createWindow (name, options) {

    var userDataDir = jetpack.cwd(electron.app.getPath('userData'));
    var stateStoreFile = 'window-state-' + name +'.json';
    var defaultSize = {
        width: options.width,
        height: options.height
    };
    var state = {};
    var win;

    var restore = function () {
        var restoredState = {};
        try {
            restoredState = userDataDir.read(stateStoreFile, 'json');
        } catch (err) {
            // For some reason json can't be read (might be corrupted).
            // No worries, we have defaults.
        }
        return Object.assign({}, defaultSize, restoredState);
    };

    var getCurrentPosition = function () {
        var position = win.getPosition();
        var size = win.getSize();
        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1]
        };
    };

    var windowWithinBounds = function (windowState, bounds) {
        return windowState.x >= bounds.x &&
            windowState.y >= bounds.y &&
            windowState.x + windowState.width <= bounds.x + bounds.width &&
            windowState.y + windowState.height <= bounds.y + bounds.height;
    };

    var resetToDefaults = function (windowState) {
        var bounds = electron.screen.getPrimaryDisplay().bounds;
        return Object.assign({}, defaultSize, {
            x: (bounds.width - defaultSize.width) / 2,
            y: (bounds.height - defaultSize.height) / 2
        });
    };

    var ensureVisibleOnSomeDisplay = function (windowState) {
        var visible = electron.screen.getAllDisplays().some(function (display) {
            return windowWithinBounds(windowState, display.bounds);
        });
        if (!visible) {
            // Window is partially or fully not visible now.
            // Reset it to safe defaults.
            return resetToDefaults(windowState);
        }
        return windowState;
    };

    var saveState = function () {
        if (!win.isMinimized() && !win.isMaximized()) {
            Object.assign(state, getCurrentPosition());
        }
        userDataDir.write(stateStoreFile, state, { atomic: true });
    };

    state = ensureVisibleOnSomeDisplay(restore());

    win = new electron.BrowserWindow(Object.assign({}, options, state));

    win.on('close', saveState);

    return win;
}

var fs    = require('fs');
var path  = require('path');
var em    = require('easyimage');

var processImages = function(data, event, callback) {
  _validateImageProcessingData(data, function(data) {
    var inputDir  = data['inputDir'];
    var outputDir = data['outputDir'];
    var width     = data['width'];
    var queue     = [];

    var files = fs.readdirSync(inputDir);
    _enqueueValidImages(files, queue, inputDir, outputDir, width, function(queue) {
      _performProcessing(queue, event, function(response) {
        if (callback) { callback(response); }
      });
    });
  });
}

function _validateImageProcessingData (data, callback) {
  var isValid = data && data.outputDir != '' && data.inputDir != '' && data.width > 0;
  if (isValid && callback) {
    callback(data);
  } else {
    console.warn('Invalid image processing data', data);
  }
}

//  Enqueue only valid images and then process the queue with a callback
function _enqueueValidImages(files, queue, inputDir, outputDir, width, callback) {
  var allowedExtensions = ['.JPG'];
  files.forEach(function(file, index) {
    var imgSrc = path.join(inputDir, file);
    var imgDst = path.join(outputDir, 'resized_' + width + '_' + file);
    var ext    = path.extname(file).toUpperCase();

    if (allowedExtensions.indexOf(ext) > -1) {
      queue.push({
        "src": imgSrc,
        "dst": imgDst,
        "width": width
      });
    }
  });

  if (callback) { callback(queue); }
}

//  Perform the image processing on the queue of image data
function _performProcessing(queue, event, callback) {
  queue.forEach(function(img, index) {
    var src   = img['src'];
    var dst   = img['dst'];
    var width = img['width'];

    _resizeImage(src, dst, width);

    var n = index + 1;
    var statusMsg = '( ' + n + ' of ' + queue.length + ' ) Resized ' + src + ' to width ' + width + ' and output to ' + dst;
    event.sender.send('asynchronous-reply', statusMsg);
  });

  if (callback) { callback(queue); }
}

//  Resizes a src image and outputs to dst
function _resizeImage(src, dst, width, callback) {
  var statusMsg = 'Resized ' + src + ' to width ' + width + ' and output to ' + dst;
  em.resize({
     src: src,
     dst: dst,
     width: width,
     quality: 100
  }).then (
  function(image) {
    if (callback) {
      callback(statusMsg);
    } else {
      console.log(statusMsg);
    }
  },
  function (err) {
    console.error(err);
  });
}

//  Ref: https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
//  Receive messages from the client (app.js et al)
const { ipcMain } = require('electron');
ipcMain.on('asynchronous-message', _handleAsyncMessage);

//  Handle messages from the client (app.js et al)
function _handleAsyncMessage(event, msg) {
  if (event && msg) {
    console.info('[asynchronous-message]', msg);
    if (msg['type'] == 'PROCESS_IMAGES') {
      _handleProcessImagesMsg(event, msg);
    } else {
      _sendResponse(event, 'Message received');
    }
  }
}

// Send responses to the client (app.js et al)
function _sendResponse (event, data) {
  event.sender.send('asynchronous-reply', data);
}

//  Logic that occurs for messages regarding image processing
function _handleProcessImagesMsg (event, data) {
  processImages(data, event);
}

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

var setApplicationMenu = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(menus));
};

electron.app.on('ready', function () {
    setApplicationMenu();

    var mainWindow = createWindow('main', {
        width: 1920,
        height: 600
    });

    mainWindow.loadURL('file://' + __dirname + '/app.html');
});

electron.app.on('window-all-closed', function () {
    electron.app.quit();
});
}());
//# sourceMappingURL=background.js.map