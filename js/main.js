/* global data */
/* exported data */

function renderEntries() {
  var ul = document.getElementById('list');
  var li = document.createElement('li');
  var row = document.createElement('div');
  var img = document.createElement('img');
  var info = document.createElement('div');
  var title = document.createElement('h3');
  var text = document.createElement('p');

  row.className = 'row';
  title.textContent = 'Marth';
  text.textContent = 'Victory';
  info.appendChild(title);
  info.appendChild(text);

  img.src = 'https://ssb.wiki.gallery/images/thumb/e/e9/Marth_SSBU.png/1200px-Marth_SSBU.png';
  row.appendChild(img);
  row.appendChild(info);
  li.appendChild(row);
  ul.appendChild(li);
}

renderEntries();
