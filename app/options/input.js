import { ids } from '../htmlElements/elementIds';

function _onInputChange(event) {
  console.info('Input value changed:', this.value);
}

export var initInput = function() {
  var e = document.getElementById(ids['inputId']);
  if (e) { e.addEventListener('change', _onInputChange); }
}
