;'use strict';
function createListToDo_skr() {
    if (localStorage.length !== 0) {
        for (var key in localStorage) {
            var dataStorage = localStorage.getItem(key);
            var ulToDo = document.getElementById('toDoItem_skr');
            var newLi = document.createElement('li');
            newLi.className = "list-group-item";
            newLi.setAttribute("onclick", "delLi_skr(this);");
            newLi.innerHTML = dataStorage;
            ulToDo.appendChild(newLi);
        }
    }
}

function delLi_skr(text) {
    localStorage.removeItem(text.innerHTML);
    var ulToDo = document.getElementById('toDoItem_skr');
    ulToDo.removeChild(text);
}

function addLi_skr() {
    var enteredText = document.getElementById('enteredText_skr').value;
    if (enteredText) {
        var ulToDo = document.getElementById('toDoItem_skr');
        var newLi = document.createElement('li');
        newLi.className = "list-group-item";
        newLi.setAttribute("onclick", "delLi_skr(this);");
        newLi.innerHTML = enteredText;
        var result = localStorage.getItem(enteredText);
        if (localStorage.length === 0 || result === null) {
            localStorage.setItem(enteredText, enteredText);
            ulToDo.appendChild(newLi);
            document.getElementById('enteredText_skr').value = "";
        }
    }else alert("Enter text please")

}

createListToDo_skr();


