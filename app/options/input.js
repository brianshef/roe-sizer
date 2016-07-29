import { ids } from '../htmlElements/elementIds';

var _value = '';

function _getElement (callback) {
  var e = document.getElementById(ids['inputId']);
  if (e && callback) { callback(e); }
}

function _onInputChange (event) {
  _value = this.value;
}

export var getInputValue = function() {
  return _value;
}

export var initInput = function() {
  _getElement(function(e) {
    e.addEventListener('change', _onInputChange);
  });
}
