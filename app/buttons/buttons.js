import { ids }              from '../htmlElements/elementIds';
import { getInputValue }    from '../options/input';
import { getOutputValue }   from '../options/output';
import { getWidthValue }    from '../options/width';
import { updateStatus }     from '../logger/console';
import { sendMsgToServer }  from '../messaging/client'


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
export var initButtons = function () {
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
