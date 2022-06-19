
function notify(message){
  browser.runtime.sendMessage(message);
}

function injectButton(row) {
  let linkColumn = row.getElementsByTagName('td')[2];
  let rel = linkColumn.getElementsByTagName('a')[0].getAttribute('href')
  let torrentURL = new URL(rel, 'https://nyaa.si')
  var category = row.getElementsByClassName('category-icon')[0]
  .getAttribute('alt').split('-')[0].trim()
  .toLowerCase().replace(/ /g, '-');

  console.log('se')

  const plusButton = document.createElement('a');
  const icon = document.createElement("i");
  console.log("fucl")

  icon.setAttribute('class', 'fa fa-plus fa-fw');
  plusButton.onclick = () => {
    console.log('init')
    notify({torrent: torrentURL.toString(), 
      category: category}); 
      console.log("finisied mesasaeg")
  }
  plusButton.setAttribute('href', "#");
  plusButton.append(icon)
  linkColumn.append(plusButton)
  console.log("niggerssss1")
}


let rows = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

for(let row of rows){
  injectButton(row);
}

console.log('are you working?')

