function addItem() {

    var myText = document.getElementById('text').value;
    var myInputText = document.getElementById('myItems');
    var newLi = document.createElement('li');

    newLi.innerHTML = myText;

    newLi.addEventListener('click', removeItem);

    localStorage.setItem(myText,myText);

    myInputText.appendChild(newLi);
}

function removeItem(){

    var myInputText = document.getElementById('myItems');

    myInputText.removeChild(this);

    localStorage.removeItem(this.textContent);
}

function saveItem() {


    for (var i=0; i<localStorage.length; i++){
        var newLi = document.createElement('li');
        var myInputText = document.getElementById('myItems');
        var myText = localStorage.getItem(localStorage.key(i));

        newLi.innerHTML = myText;

        newLi.addEventListener('click', deleteSavedItem);

        myInputText.appendChild(newLi);
    }
}
saveItem();

function deleteSavedItem() {

    var myInputText = document.getElementById('myItems');

    myInputText.removeChild(this);

    localStorage.removeItem(this.textContent);
}