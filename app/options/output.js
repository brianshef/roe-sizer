import { ids } from '../htmlElements/elementIds';

var _value = '';

function _getElement (callback) {
  var e = document.getElementById(ids['outputId']);
  if (e && callback) { callback(e); }
}

function _onOutputChange (event) {
  _value = this.value;
}

export var getOutputValue = function() {
  return _value;
}

export var initOutput = function() {
  _getElement(function(e) {
    e.addEventListener('change', _onOutputChange);
  });
}
