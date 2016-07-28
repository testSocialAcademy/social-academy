'use strict';
//Homework 5
function loadNews() {
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
           newsDisplay(respText);
            return respText;
        }
    };
    return respText;
}
loadNews();

function newsDisplay(respText){
    var newLi;
    var resp = JSON.parse(respText);
    var blokNews = resp.responseData.entries;
    var list = document.getElementById ('news');
    var i;
    for (i = 0; i < blokNews.length; i++){
        var ul = document.createElement('ul');
        list.appendChild(ul);
    }
    for (i=0; i < blokNews.length; i++){
        if (blokNews[i].title){
            newLi = document.createElement('h4');
            newLi.innerHTML = blokNews[i].title;
            list.children[i].appendChild(newLi);
        }
    }
    for (i=0; i < blokNews.length; i++){
        if (blokNews[i].contentSnippet){
            newLi = document.createElement('p');
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