// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu } from 'electron';
import { devMenuTemplate } from './helpers/dev_menu_template';
import { editMenuTemplate } from './helpers/edit_menu_template';
import createWindow from './helpers/window';

//  Ref: https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
//  Receive messages from the client (app.js et al)
const { ipcMain } = require('electron');
ipcMain.on('asynchronous-message', handleAsyncMessage);

//  Handle messages from the client (app.js et al)
function handleAsyncMessage(event, msg) {
  if (event && msg) {
    console.info('[asynchronous-message]', msg);
    sendResponse(event, 'Message received');
  }
}

// Send responses to the client (app.js et al)
function sendResponse (event, data) {
  event.sender.send('asynchronous-reply', data);
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
