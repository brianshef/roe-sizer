import { updateStatus } from '../logger/console';

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
export var sendMsgToServer = function (data) {
  ipcRenderer.send('asynchronous-message', data);
}
