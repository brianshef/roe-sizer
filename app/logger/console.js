import { ids } from '../htmlElements/elementIds';

//  Appends a new line to the status console
export var _appendLine = function (id, content, callback) {
  var element = document.getElementById(id);
  if (element) {
    var lines = element.value.split("\n");
    lines.push(content);
    element.value = lines.join("\n");
  }

  if (callback) { callback(); }
}

//  Updates the status message to the specified message content.
export var updateStatus = function (msg) {
  _appendLine(ids['statusId'], msg);
}
