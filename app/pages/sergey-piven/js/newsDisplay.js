/*;(function () {*/

function displayNews(json) {


    var xhr = new XMLHttpRequest();
    xhr.open('GET', json, false);
    xhr.send();


    if (xhr.status != 200) {
        alert(xhr.status + ": " + xhr.statusText);
    } else {
        var result = JSON.parse(xhr.responseText);
        var obj = result.responseData.entries;
    }

    if (typeof obj == "object") {
        for (var i = 0; i < obj.length; i++) {
            var ul = document.createElement('ul');
            news.appendChild(ul);
        }


        for (i = 0; i < obj.length; i++) {
            if (obj[i].title) {
                var li = document.createElement('li');
                li.innerHTML = obj[i].title;
                news.children[i].appendChild(li);
            }
        }

        for (i = 0; i < obj.length; i++) {
            if (obj[i].contentSnippet) {
                li = document.createElement('li');
                li.innerHTML = obj[i].contentSnippet;
                news.children[i].appendChild(li);
            }
        }

        for (i = 0; i < obj.length; i++) {
            if (obj[i].link) {
                var link = document.createElement('a');
                link.setAttribute('href', obj[i].link);
                link.innerHTML = obj[i].link;
                li = document.createElement('li');
                li.innerHTML = "";
                news.children[i].appendChild(li);
                news.children[i].lastChild.appendChild(link);
            }
        }
    }
    else return false;
}

displayNews('news.json');
/*
})();*/
