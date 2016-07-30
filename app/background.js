// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu } from 'electron';
import { devMenuTemplate } from './helpers/dev_menu_template';
import { editMenuTemplate } from './helpers/edit_menu_template';
import createWindow from './helpers/window';
var fs = require('fs');
var path = require('path');
var process = require('process');
var im = require('imagemagick');

//  Ref: https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
//  Receive messages from the client (app.js et al)
const { ipcMain } = require('electron');
ipcMain.on('asynchronous-message', handleAsyncMessage);

//  Handle messages from the client (app.js et al)
function handleAsyncMessage(event, msg) {
  if (event && msg) {
    console.info('[asynchronous-message]', msg);
    if (msg['type'] == 'PROCESS_IMAGES') {
      handleProcessImagesMsg(event, msg);
    } else {
      sendResponse(event, 'Message received');
    }
  }
}

// Send responses to the client (app.js et al)
function sendResponse (event, data) {
  event.sender.send('asynchronous-reply', data);
}

//  Get the user's home directory, platform-agnostic
function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

//  TODO - Needed for when a user uses '~' as a path component
//  Formats a path correctly for usage with fs.readdir(), etc
function formatPath (p) {
  return p;
}

function handleProcessImagesMsg (event, data) {
  validateImageProcessingData(data, function(data) {
    var allowedExtensions = ['.JPG'];
    var inputDir  = formatPath(data['inputDir']);
    var outputDir = formatPath(data['outputDir']);
    var width     = data['width'];

    fs.readdir(inputDir, function(err, files) {
      if (err) { throw err; }
      files.forEach(function(file, index) {
        var src = path.join(inputDir, file);
        var dst = path.join(outputDir, file);
        var ext = path.extname(file).toUpperCase();

        if (allowedExtensions.indexOf(ext) > -1) {
          console.log('Processing', file, '...');
          // im.resize({
          //   srcData: fs.readFileSync(file, 'binary'),
          //   width: width
          // }, function (err, stdout, stderr) {
          //   if (err) throw err;
          //   var outputFile = outputDir + file;
          //   fs.writeFileSync(outputFile, stdout, 'binary');
          //   console.log('Resized', file, 'to width', width, 'and output as', outputFile);
          // });
        } else {
          // console.warning(file, 'has unsupported format', ext);
        }
      });
    });
  });
}

function validateImageProcessingData (data, callback) {
  var isValid = data && data.outputDir != '' && data.inputDir != '' && data.width > 0;
  if (isValid && callback) {
    callback(data);
  } else {
    console.warn('Invalid image processing data', data);
  }
}

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

var setApplicationMenu = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

app.on('ready', function () {
    setApplicationMenu();

    var mainWindow = createWindow('main', {
        width: 1920,
        height: 600
    });

    mainWindow.loadURL('file://' + __dirname + '/app.html');
});

app.on('window-all-closed', function () {
    app.quit();
});
