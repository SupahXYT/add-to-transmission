
function notify(message) {
  browser.runtime.sendMessage(message);
}

function injectButton(row) {
  let linkColumn = row.getElementsByTagName('td')[2];
  let rel = linkColumn.getElementsByTagName('a')[0].getAttribute('href')
  let torrentURL = new URL(rel, 'https://nyaa.si')
  var category = row.getElementsByClassName('category-icon')[0]
    .getAttribute('alt').split('-')[0].trim()
    .toLowerCase().replace(/ /g, '-');

  const plusButton = document.createElement('a');
  const icon = document.createElement("i");

  icon.setAttribute('class', 'fa fa-plus fa-fw');
  plusButton.onclick = () => {
    notify({
      torrent: torrentURL.toString(),
      category: category
    });
  }
  plusButton.setAttribute('href', "#");
  plusButton.append(icon)
  linkColumn.append(plusButton)
}


let rows = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

for (let row of rows) {
  injectButton(row);
}

