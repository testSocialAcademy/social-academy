;'use strict';
function createListToDo() {
    if (localStorage.length !== 0) {
        for (var key in localStorage) {
            var dataStorage = localStorage.getItem(key);
            var ulToDo = document.getElementById('toDoItem');
            var newLi = document.createElement('li');
            newLi.className = "list-group-item";
            newLi.setAttribute("onclick", "delLi(this);");
            newLi.innerHTML = dataStorage;
            ulToDo.appendChild(newLi);
        }
    }
}

function delLi(text) {
    localStorage.removeItem(text.innerHTML);
    var ulToDo = document.getElementById('toDoItem');
    ulToDo.removeChild(text);
}

function addLi() {
    var enteredText = document.getElementById('enteredText').value;
    if (enteredText) {
        var ulToDo = document.getElementById('toDoItem');
        var newLi = document.createElement('li');
        newLi.className = "list-group-item";
        newLi.setAttribute("onclick", "delLi(this);");
        newLi.innerHTML = enteredText;
        var result = localStorage.getItem(enteredText);
        if (localStorage.length === 0 || result === null) {
            localStorage.setItem(enteredText, enteredText);
            ulToDo.appendChild(newLi);
            document.getElementById('enteredText').value = "";
        }
    }else alert("Enter text please")

}

createListToDo();


