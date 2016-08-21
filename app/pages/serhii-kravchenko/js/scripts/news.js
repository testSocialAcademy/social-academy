;'use strict';

var xhr_skr = new XMLHttpRequest();
xhr_skr.open("GET", "news.json", false);
xhr_skr.send();


if (xhr_skr.status != 200) {
    alert(xhr_skr.status + " " + xhr_skr.statusText);
} else {
    var result_skr = JSON.parse(xhr_skr.responseText);
}

function createNews(result_skr) {
    if (result_skr) {
        var data = result_skr.responseData.entries;
        var newsTag = document.getElementById('news_skr');
        if (newsTag) {
            for (var i = 0; i < data.length; i++) {
                var ul = newsTag.appendChild(document.createElement('ul'));
                ul.className = "list-group";

                var liTitle = ul.appendChild(document.createElement('li'));
                liTitle.className = "list-group-item";
                var aTitle = liTitle.appendChild(document.createElement('a'));
                aTitle.href = data[i].url;
                aTitle.innerHTML = data[i].title;

                var liContent = ul.appendChild(document.createElement('li'));
                liContent.className = "list-group-item";
                liContent.innerHTML = data[i].contentSnippet;

                var liLink = ul.appendChild(document.createElement('li'));
                liLink.className = "list-group-item";
                var aLink = liLink.appendChild(document.createElement('a'));
                aLink.href = data[i].link;
                aLink.innerHTML = data[i].link;
            }
        }
        return true;
    } else return false;
}

createNews(result_skr);
                
         
    
    





