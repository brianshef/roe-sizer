import { ids } from '../htmlElements/elementIds';

var _value = 0;

function _getElement (callback) {
  var e = document.getElementById(ids['widthId']);
  if (e && callback) { callback(e); }
}

function _onWidthChange (event) {
  _value = this.value;
}

export var getWidthValue = function() {
  return _value;
}

export var initWidth = function() {
  _getElement(function(e) {
    e.addEventListener('change', _onWidthChange);
  });
}
