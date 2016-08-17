function newsDisplay() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "news.json", false);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readeState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + " " + xhr.statusText);
        } else {
            return xhr.responseText;
        }
    };
    var response = JSON.parse(xhr.responseText);

    var object = response.responseData.entries;

    var list = document.getElementById ('news');
    
    var i;
    
    for (i = 0; i < object.length; i++) {
        var ul = document.createElement('ul');
        news.appendChild(ul);
    }

    for (i = 0; i < object.length; i++) {
        if (object[i].title) {
            var li = document.createElement('li');
            li.innerHTML = object[i].title;
            news.children[i].appendChild(li);
        }
    }

    for (i = 0; i < object.length; i++) {
        if (object[i].contentSnippet) {
            li = document.createElement('li');
            li.innerHTML = object[i].contentSnippet;
            news.children[i].appendChild(li);
        }
    }

    for (i = 0; i < object.length; i++) {
        if (object[i].link) {
            var link = document.createElement('a');
            link.setAttribute('href', object[i].link);
            link.innerHTML = object[i].link;
            li = document.createElement('li');
            li.innerHTML = "";
            news.children[i].appendChild(li);
            news.children[i].lastChild.appendChild(link);
        }
    }}

newsDisplay('news.json');