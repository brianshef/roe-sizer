//  Sets the inner HTML of the element with the specified ID to the specified
//  content, if the element exists.
export var setContent = function (id, content, callback) {
  var element = document.getElementById(id);
  if (element && element.innerHTML) {
    element.innerHTML = content;
    console.info('Set', id, 'content to', content);
  } else {
    console.warn('Invalid element ID', id);
  }

  if (callback) { callback(); }
}
