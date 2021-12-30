/* global data */
/* exported data */
// SWITCHING PAGES
var buttonEntry = document.querySelector('.view-button');
var buttonNew = document.querySelector('.new');

var enterElement = document.getElementById('test1');
var viewElement = document.getElementById('test2');
var editElement = document.getElementById('test3');

buttonEntry.addEventListener('click', viewClick);
buttonNew.addEventListener('click', entryClick);

var emptyDefault = document.querySelector('.empty');

function emptyEntriesCheck() {
  if (data.entries.length === 0) {
    emptyDefault.className = 'empty';
  } else {
    emptyDefault.className = 'empty hidden';
  }
}

emptyEntriesCheck();

function viewClick(event) {
  enterElement.className = 'view hidden';
  viewElement.className = 'view';
  editElement.className = 'view hidden';
}

function entryClick(event) {
  enterElement.className = 'view';
  viewElement.className = 'view hidden';
  editElement.className = 'view hidden';
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

  emptyEntriesCheck();

  enterElement.className = 'view hidden';
  viewElement.className = 'view';
  editElement.className = 'view hidden';
}

// VIEW ENTRY
function renderEntries(entry) {
  var li = document.createElement('li');
  var row = document.createElement('div');
  var img = document.createElement('img');
  var info = document.createElement('div');
  var titleRow = document.createElement('div');
  var title = document.createElement('h3');

  var arrow = document.createElement('div');
  arrow.setAttribute('class', 'arrow');

  var editIcon = document.createElement('i');
  var text = document.createElement('p');

  row.setAttribute('class', 'row');
  title.textContent = entry.title;
  editIcon.setAttribute('class', 'fa fa-edit');
  editIcon.setAttribute('id', entry.entryID);
  editIcon.setAttribute('aria-hidden', 'true');

  arrow.appendChild(editIcon);

  titleRow.setAttribute('class', 'titlerow');
  titleRow.appendChild(title);
  titleRow.appendChild(arrow);

  text.textContent = entry.notes;
  info.appendChild(titleRow);
  info.appendChild(text);

  img.setAttribute('class', 'photo');
  img.setAttribute('src', entry.photoUrl);
  row.appendChild(img);
  row.appendChild(info);
  li.appendChild(row);
  li.setAttribute('class', 'level' + entry.entryID);

  return li;
}

function callEntries() {
  var ul = document.getElementById('list');
  var entryResult;
  for (let i = 0; i < data.entries.length; i++) {
    entryResult = renderEntries(data.entries[i]);
    ul.appendChild(entryResult);
  }
}

callEntries();

// EDIT ENTRY
var editID;
var editFinal = document.querySelector('#edit-entry-form');
var editInputs = document.querySelector('#edit-entry-form').elements;
editFinal.addEventListener('submit', editValues);

var photoEdit = document.querySelector('#edit-entry-form input[name=\'photoUrl\']');
var picUpdateEdit = document.querySelector('.photo-edit');

photoEdit.addEventListener('input', editPhoto);

var editPage = document.querySelector('ul');
editPage.addEventListener('click', editInfo);

function editInfo(event) {
  var closestElement = event.target.closest('i');
  if (Number.isInteger(parseInt(closestElement.id))) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === parseInt(closestElement.id)) {
        editInputs[0].value = data.entries[i].title;
        editInputs[1].value = data.entries[i].photoUrl;
        editInputs[2].value = data.entries[i].notes;
        editID = data.entries[i].entryID;
        picUpdateEdit.src = data.entries[i].photoUrl;
        break;
      }
    }
    enterElement.className = 'view hidden';
    viewElement.className = 'view hidden';
    editElement.className = 'view';
  }
}

function editPhoto(event) {
  picUpdateEdit.src = event.target.value;
}

function editValues(event) {
  event.preventDefault();
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === editID) {
      data.entries[i].title = editInputs[0].value;
      data.entries[i].photoUrl = editInputs[1].value;
      data.entries[i].notes = editInputs[2].value;
      var newEntry = renderEntries(data.entries[i]);
      var outdatedEntry = document.querySelector('.level' + data.entries[i].entryID.toString());
      outdatedEntry.replaceWith(newEntry);
      break;
    }
  }

  document.querySelector('#edit-entry-form').reset();

  emptyEntriesCheck();

  enterElement.className = 'view hidden';
  viewElement.className = 'view';
  editElement.className = 'view hidden';
}

// DELETE ENTRY
var inputTitle = document.getElementById('title-edit');
var inputPhoto = document.getElementById('photoUrl-edit');
var inputText = document.getElementById('notes-edit');
var editButton = document.getElementById('save-edit');
var deletion = document.getElementById('delete');
var box = document.querySelector('.box');

deletion.addEventListener('click', entryDelete);

function entryDelete(event) {
  inputTitle.disabled = true;
  inputPhoto.disabled = true;
  inputText.disabled = true;
  editButton.disabled = true;
  deletion.disabled = true;
  box.className = 'box appear';
}

var cancelButton = document.querySelector('.cancel');
cancelButton.addEventListener('click', cancelBox);

function cancelBox(event) {
  inputTitle.disabled = false;
  inputPhoto.disabled = false;
  inputText.disabled = false;
  editButton.disabled = false;
  deletion.disabled = false;
  box.className = 'box gone';
}

var confirmButton = document.querySelector('.confirm');
confirmButton.addEventListener('click', confirmBox);

function confirmBox(event) {
  event.preventDefault();

  inputTitle.disabled = false;
  inputPhoto.disabled = false;
  inputText.disabled = false;
  editButton.disabled = false;
  deletion.disabled = false;
  box.className = 'box gone';

  var index;
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === editID) {
      index = i;
      break;
    }
  }
  data.entries.splice(index, 1);
  var el = document.querySelector('.level' + editID.toString());
  el.remove();

  emptyEntriesCheck();

  enterElement.className = 'view hidden';
  viewElement.className = 'view';
  editElement.className = 'view hidden';
}
