/* global data */
/* exported data */

var photo = document.querySelector('#entry-form input[name=\'photoUrl\']');
var picUpdate = document.querySelector('img');

photo.addEventListener('input', addPhoto);

function addPhoto(event) {
  picUpdate.src = event.target.value;
}
