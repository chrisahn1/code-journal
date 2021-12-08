/* global data */
/* exported data */

var results = document.querySelector('#entry-form');
var inputs = document.querySelector('#entry-form').elements;
results.addEventListener('submit', submitValues);

var pic = document.querySelector('#entry-form img');
var photo = document.querySelector('#entry-form input[name=\'photoUrl\']');
var picUpdate = document.querySelector('img');

photo.addEventListener('input', addPhoto);

function addPhoto(event) {
  picUpdate.src = event.target.value;
}

function submitValues(event) {
  event.preventDefault();
  var obj = {};
  obj.title = inputs[0].value;
  obj.photoUrl = inputs[1].value;
  obj.notes = inputs[2].value;

  obj.entryID = data.nextEntryId;

  data.nextEntryId += 1;

  data.entries.unshift(obj);

  pic.src = 'images/placeholder-image-square.jpg';
  document.querySelector('#entry-form').reset();

}
