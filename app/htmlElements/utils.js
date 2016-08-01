//  Sets the inner HTML of the element with the specified ID to the specified
//  content, if the element exists.
export var setContent = function (id, content, callback) {
  var element = document.getElementById(id);
  if (element && element.innerHTML) {
    element.innerHTML = content;
  } else {
    console.warn('Invalid element ID', id);
  }

  if (callback) { callback(); }
}

//  Appends the specified content to the existing content of the element
//  with teh specified ID, if it exists.
export var appendContent = function (id, content, callback) {
  var element = document.getElementById(id);
  if (element && element.innerHTML) {
    element.innerHTML += content;
  } else {
    console.warn('Invalid element ID', id);
  }

  if (callback) { callback(); }
}

//  Sets the value of the element with the specified ID to the specified
//  content, if the element exists.
export var setValue = function (id, content, callback) {
  var element = document.getElementById(id);
  if (element && element.innerHTML) {
    element.value = content;
  } else {
    console.warn('Invalid element ID', id);
  }

  if (callback) { callback(); }
}

//  Appends the specified content to the existing value of the element
//  with teh specified ID, if it exists.
export var appendValue = function (id, content, callback) {
  var element = document.getElementById(id);
  if (element && element.innerHTML) {
    element.value += content;
  } else {
    console.warn('Invalid element ID', id);
  }

  if (callback) { callback(); }
}
