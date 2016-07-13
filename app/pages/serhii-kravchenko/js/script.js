'use strict';

var hobbySerhiiKravchenko = ["Плавать", "Стрелять с арбалета", "Нюхать цветы", "Летать на драконах"];

var hobbyIdTag = document.getElementById('hobby');

// hobbyIdTag.appendChild(document.createTextNode(hobbySerhiiKravchenko));


for(var i=0; i<hobbySerhiiKravchenko.length; i++){
    if(i!=hobbySerhiiKravchenko.length-1){
        hobbyIdTag.appendChild(document.createTextNode(hobbySerhiiKravchenko[i]+", "));
    } else{
        hobbyIdTag.appendChild(document.createTextNode(hobbySerhiiKravchenko[i]+"."));
    }
}

