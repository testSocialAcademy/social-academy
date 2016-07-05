;'use strict';
if (localStorage.length !==0) {
    for (var key in localStorage){
        var dataStorage = localStorage.getItem(key);
        var ulToDo = document.getElementById('toDoItem');
        var newLi = document.createElement('li');
        newLi.className = "list-group-item";
        // newLi.id = key;
        newLi.addEventListener("click", delLi());
        // console.log(dataStorage);
        newLi.innerHTML = dataStorage;
        ulToDo.appendChild(newLi);
    }
}

function delLi() {
    localStorage.removeItem(this.innerHTML);
}

// var liToDo = document.getElementById('liToDo');
// liToDo.addEventListener("click", function () {
//     localStorage.removeItem();
// });

function addLi() {
    // if(this === 0){
    //     alert("Enter text please!!!")
    //
    // } else {
        var ulToDo = document.getElementById('toDoItem');
        var enteredText = document.getElementById('enteredText').value;
        var newLi = document.createElement('li');
        newLi.className = "list-group-item";
        // newLi.id = enteredText;
        newLi.addEventListener("click", delLi());
        newLi.innerHTML = enteredText;
        var result = localStorage.getItem(enteredText);
        if(localStorage.length ===0 || result === null){
            localStorage.setItem(enteredText, enteredText);

            ulToDo.appendChild(newLi);
        }
    // }

    
}


