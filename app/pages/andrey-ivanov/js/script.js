'use strict'
var title = document.getElementById('title');
var list = document.getElementById ('list');
title.addEventListener("click", function (){
    if(!list.style.display || list.style.display=="block"){
        list.style.display="none";
    } else {
        list.style.display="block";
    }
});
var title1 = document.getElementById('title1');
var list1 = document.getElementById ('list1');
title1.addEventListener("click", function (){
    if(!list1.style.display || list1.style.display=="block"){
        list1.style.display="none";
    } else {
        list1.style.display="block";
    }
});
