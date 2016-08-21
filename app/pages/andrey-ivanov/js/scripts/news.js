'use strict';
///////////////////////////////////////////Homework 5//////////////////////////////////////////////////////////////
function loadNews_ai() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'news.json', true);
    xhr.send();
    var respText;
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            respText = xhr.responseText;
           newsDisplay_ai(respText);
            return respText;
        }
    };
    return respText;
}
loadNews_ai();

function newsDisplay_ai(respText){
    var newLi;
    var resp = JSON.parse(respText);
    var blokNews = resp.responseData.entries;
    var list = document.getElementById ('news_ai');
    var i;
    for (i = 0; i < blokNews.length; i++){
        var ul = document.createElement('ul');
        list.appendChild(ul);
    }
    for (i=0; i < blokNews.length; i++){
        if (blokNews[i].title){
            newLi = document.createElement('strong');
            newLi.innerHTML = blokNews[i].title;
            list.children[i].appendChild(newLi);
        }
    }
    for (i=0; i < blokNews.length; i++){
        if (blokNews[i].contentSnippet){
            newLi = document.createElement('span');
            newLi.innerHTML = blokNews[i].contentSnippet;
            list.children[i].appendChild(newLi);
        }
    }
    for (i=0; i < blokNews.length; i++){
        if (blokNews[i].link){
            newLi = document.createElement('a');
            newLi.innerHTML = blokNews[i].link;
            list.children[i].appendChild(newLi);
            newLi.setAttribute('href','index.html');
        }
    }
}
