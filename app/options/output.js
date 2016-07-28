import { ids } from '../htmlElements/elementIds';

function _inOutputChange(event) {
  console.info('Output value changed:', this.value);
}

export var initOutput = function() {
  var e = document.getElementById(ids['outputId']);
  if (e) { e.addEventListener('change', _inOutputChange); }
}
