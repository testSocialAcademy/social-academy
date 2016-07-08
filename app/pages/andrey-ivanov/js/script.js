
//noinspection JSAnnotator
'use strict';
(function() {
    var title;
    title = document.getElementById('title');
    var list = document.getElementById('list');
    title.addEventListener("click", function () {
        if (!list.style.display || list.style.display == "block") {
            list.style.display = "none";
        } else {
            list.style.display = "block";
        }
    });

    var title1 = document.getElementById('title1');
    var list1 = document.getElementById('hobbiesList');
    title1.addEventListener("click", function () {
        if (!list1.style.display || list1.style.display == "block") {
            list1.style.display = "none";
        } else {
            list1.style.display = "block";
        }
    });
    function Hobbies() {
        var hobbies = ["Компьютеры", "Программирование", "Web-дизайн", "IT", "Спорт", "Автомобили", "Мотоциклы"];
        for (var i = 0; i < hobbies.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = hobbies[i];
            hobbiesList.appendChild(li);
        }
    }

    Hobbies();


    //add li in 'to do list' and local Storage
    var butt = document.getElementById('save');

    butt.onclick = function () {
        var ulList = document.getElementById('listToDo');
        var info = document.getElementById('todo').value;
        var Li = document.createElement('li');
        Li.innerHTML = info;
        ulList.appendChild(Li);

        localStorage.setItem(info, info);

        //delete Li with 'to do list' and local Storage onclick
        Li.onclick = function deleteLi() {
            ulList.removeChild(Li);
            localStorage.removeItem(info);
        };
    };
    //recovery with LS
    function getWithLS() {
        for (var i = 0; i < localStorage.length; i++) {
             var ulList = document.getElementById('listToDo');
             var newInfo = localStorage.getItem(localStorage.key(i));
             var newLi = document.createElement('li');
             newLi.innerHTML = newInfo;
             ulList.appendChild(newLi);
    }
    //delete newLi with 'to do list' and local Storage onclick
        newLi.onclick = function deleteNewLi() {
        ulList.removeChild(newLi);
        localStorage.removeItem(newInfo);
    }
}
    getWithLS();

})();

