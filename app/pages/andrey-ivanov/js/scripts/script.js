'use strict';
//Homework4
// basic information hidden
function hiddenBasInfo() {
    var title = document.getElementById('title');
    var list = document.getElementById('list');
    if (!list.style.display || list.style.display == "block") {
        list.style.display = "none";
    }else {
        list.style.display = "block";
    }
}

//add hobby list
function addHobby() {
    var ul =document.getElementById("hobbyList");
    var hobby= ["Компьютеры", "Программирование", "Web-дизайн", "IT", "Спорт", "Автомобили", "Мотоциклы"];
    for(var i = 0; i < hobby.length;i++){
        var li = document.createElement("li");
        li.innerHTML= hobby[i];
        ul.appendChild(li);
    }
}
  addHobby();

//Hobby hidden onclick
function hiddenHobby() {
    var ul =document.getElementById("hobbyList");
        if (!ul.style.display || ul.style.display == "block") {
            ul.style.display = "none";
        } else {
            ul.style.display = "block";
        }
}
//Homework 6
//add li in 'to do list' and local Storage
function addLiTodoLS() {
    var ulList = document.getElementById('listToDo');
    var info = document.getElementById('todo').value;
    var Li = document.createElement('li');
    Li.addEventListener('click', deleteLi);
    Li.innerHTML = info;
    ulList.appendChild(Li);
    localStorage.setItem(info, info);
}

//delete newLi with 'to do list'
    function deleteLi(){
        var ulList = document.getElementById('listToDo');
        ulList.removeChild(this);
        localStorage.removeItem(this.textContent);
    }

//recovery with LS
function getLiWithLS() {
    for (var i = 0; i < localStorage.length; i++) {
        var newUlList = document.getElementById('listToDo');
        var newInfo = localStorage.getItem(localStorage.key(i));
        var newLi = document.createElement('li');
        newLi.addEventListener('click', deleteNewLi);
        newLi.innerHTML = newInfo;
        newUlList.appendChild(newLi);
    }
}
getLiWithLS();

 //delete newLi with local Storage onclick
function deleteNewLi() {
        var newUlList = document.getElementById('listToDo');
        newUlList.removeChild(this);
        localStorage.removeItem(this.textContent);
    }



