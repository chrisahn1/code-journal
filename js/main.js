/* global data */
/* exported data */
// SWITCHING PAGES
var buttonEntry = document.querySelector('.view-button');
var buttonNew = document.querySelector('.new');

var enterElement = document.getElementById('test1');
var viewElement = document.getElementById('test2');

buttonEntry.addEventListener('click', viewClick);
buttonNew.addEventListener('click', entryClick);

var emptyDefault = document.querySelector('.empty');

function viewClick(event) {
  enterElement.className = 'view hidden';
  viewElement.className = 'view';
}

function entryClick(event) {
  enterElement.className = 'view';
  viewElement.className = 'view hidden';
}

// CREATE ENTRY
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
  emptyDefault.className = 'empty hidden';
  var obj = {};
  obj.title = inputs[0].value;
  obj.photoUrl = inputs[1].value;
  obj.notes = inputs[2].value;

  obj.entryID = data.nextEntryId;

  data.nextEntryId += 1;

  data.entries.unshift(obj);

  pic.src = 'images/placeholder-image-square.jpg';
  document.querySelector('#entry-form').reset();

  var ul = document.getElementById('list');
  var entryResult = renderEntries(data.entries[0]);
  ul.prepend(entryResult);

  enterElement.className = 'view hidden';
  viewElement.className = 'view';
}

// VIEW ENTRY
function renderEntries(entry) {
  var li = document.createElement('li');
  var row = document.createElement('div');
  var img = document.createElement('img');
  var info = document.createElement('div');
  var title = document.createElement('h3');
  var text = document.createElement('p');

  row.setAttribute('class', 'row');
  title.textContent = entry.title;
  text.textContent = entry.notes;
  info.appendChild(title);
  info.appendChild(text);

  img.setAttribute('class', 'photo');
  img.setAttribute('src', entry.photoUrl);
  row.appendChild(img);
  row.appendChild(info);
  li.appendChild(row);

  return li;
}

function callEntries() {
  var ul = document.getElementById('list');
  var entryResult;
  for (let i = 0; i < data.entries.length; i++) {
    entryResult = renderEntries(data.entries[i]);
    ul.prepend(entryResult);
  }
}

document.addEventListener('DOMContentLoaded', callEntries);
