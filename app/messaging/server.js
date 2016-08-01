import { processImages }    from '../imageProcess/processor';

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

//  TODO - Get working
//  Send a message to the client (app.js et al)
//  Ref: https://github.com/electron/electron/blob/master/docs/api/web-contents.md#contentssendchannel-arg1-arg2-
export var sendMessage = function (browserWindow, msg) {
  if (browserWindow && browserWindow.webContents) {
    browserWindow.webContents.send('server-message', {msg: msg});
  } else {
    console.warn('Invalid browserWindow; cannot send message', msg);
  }
}

//  Logic that occurs for messages regarding image processing
function _handleProcessImagesMsg (event, data) {
  processImages(data, event);
}
