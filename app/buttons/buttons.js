import { ids } from '../htmlElements/elementIds';

//  Logic that occurs when the input button is pressed.
function _onInputButtonPressed() {
  alert('Input button pressed');
}

//  Logic that occurs when the output button is pressed.
function _onOutputButtonPressed() {
  alert('Output button pressed');
}

//  Logic that occurs when the PROCESS IMAGES button is pressed.
function _onProcessImagesButtonPressed() {
  alert('PROCESS IMAGES button pressed');
}

//  Initialization of buttons
export var initButtons = function () {
  var buttons = [
    {
      "id": ids['inputButtonId'],
      "function": _onInputButtonPressed
    },
    {
      "id": ids['outputButtonId'],
      "function": _onOutputButtonPressed
    },
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
