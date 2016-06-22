
//noinspection JSAnnotator
'use strict';
(function() {
    var title;
    title = document.getElementById('title');
    var list = document.getElementById ('list');
title.addEventListener("click", function (){
    if(!list.style.display || list.style.display=="block"){
        list.style.display="none";
    } else {
        list.style.display="block";
    }
});

var title1 = document.getElementById('title1');
var list1 = document.getElementById ('hobbiesList');
title1.addEventListener("click", function (){
    if(!list1.style.display || list1.style.display=="block"){
        list1.style.display="none";
    } else {
        list1.style.display="block";
    }
});
function Hobbies() {
    var hobbies = ["Компьютеры", "Программирование", "Web-дизайн", "IT", "Спорт", "Автомобили", "Мотоциклы"];
    for (var i = 0; i <hobbies.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = hobbies[i];
        hobbiesList.appendChild(li);
    }
}
Hobbies();
})();
