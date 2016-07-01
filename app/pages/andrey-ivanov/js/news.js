
(function loadBlokNews(){
    var xhr = new XMLHttpRequest();
    xhr.open ('GET','news.json', false);
    xhr.send ();

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
    };
    if (xhr.status != 200){
        alert (xhr.status + ':' + xhr.statusText);
    }

    var newLi;
    var resp = JSON.parse (xhr.responseText);
    var blokNews = resp.responseData.entries;
    var list = document.getElementById ('news');
    var i;
    for (i = 0; i < blokNews.length; i++){
        var ul = document.createElement('ul');
        list.appendChild(ul);
    }

    for (i=0; i < blokNews.length; i++){
        if (blokNews[i].title){
            newLi = document.createElement('li');
            newLi.innerHTML = blokNews[i].title;
            list.children[i].appendChild(newLi);
        }
    }
    for (i=0; i < blokNews.length; i++){
        if (blokNews[i].contentSnippet){
            newLi = document.createElement('li');
            newLi.innerHTML = blokNews[i].contentSnippet;
            list.children[i].appendChild(newLi);
        }
    }
    for (i=0; i < blokNews.length; i++){
        if (blokNews[i].link){
            newLi = document.createElement('li');
            newLi.innerHTML = blokNews[i].link;
            list.children[i].appendChild(newLi);
        }
    }
})();
