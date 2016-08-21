'use strict';

var hobbySerhiiKravchenko = ["Плавать", "Стрелять с арбалета", "Нюхать цветы", "Летать на драконах"];


function createHobbyList_skr(list) {
    if (list) {
        var hobbyIdTag = document.getElementById('hobby_skr');
        if(hobbyIdTag){
            for (var i = 0; i < list.length; i++) {
                if (i != list.length - 1) {
                    hobbyIdTag.appendChild(document.createTextNode(list[i] + ", "));
                } else {
                    hobbyIdTag.appendChild(document.createTextNode(list[i] + "."));
                }
            }
        }
        return true;
    } else return false;
}

createHobbyList_skr(hobbySerhiiKravchenko);
