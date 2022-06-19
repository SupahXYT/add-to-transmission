
function notify(message){
  browser.runtime.sendMessage(message);
}

function injectButton() {
  let bscols = document.getElementsByClassName('col-md-1');
  let panel = document.getElementsByClassName("panel-footer clearfix")[0];
  let rel = panel.getElementsByTagName('a')[0].getAttribute('href')
  let torrentURL = new URL(rel, 'https://nyaa.si')

  for (let col of bscols) {
    if (col.innerHTML.includes('Category'))
      var category = col.nextElementSibling
        .getElementsByTagName('a')[0].innerText
      .toLowerCase().replace(/-/g, ' ');
  }

  const addButton = document.createElement('a');
  const icon = document.createElement("i");

  icon.setAttribute('class', 'fa fa-plus fa-fw');
  addButton.onclick = () => {
    notify({torrent: torrentURL.toString(), 
      category: category}); 
    window.alert("Completed");
  }
  addButton.setAttribute('href', "#");

  addButton.append(icon)
  addButton.append(document.createTextNode('Add to transmission'))
  panel.append(document.createTextNode('or'))
  panel.append(addButton)
}

injectButton()
