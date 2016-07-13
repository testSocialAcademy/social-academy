    var xhr = new XMLHttpRequest();

    xhr.open("GET", "news.json", false);

    xhr.send();


    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
    };


    if (xhr.status != 200) {
        alert(xhr.status + ": " + xhr.statusText);
    }
        var ul = document.createElement('li');
        myList.appendChild(li);
        li.innerHTML = ' dffd ';

        var newLi;
        var resp1 = JSON.parse(xhr.responseText);
        var resp = resp1.responseData.entries;


        for (var i = 0; i < resp.length; i++) {
            if (resp[i].title) {
                newLi = document.createElement("li");
                newLi.innerHTML = resp[i].title;

                myList.children[0].appendChild(newLi);
            }
        }

        for (i = 0; i < resp.length; i++) {
            if (resp[i].contentSnippet) {
                newLi = document.createElement("li");
                newLi.innerHTML = resp[i].contentSnippet;

                myList.children[0].appendChild(newLi);
            }
        }

        for (i = 0; i < resp.length; i++) {
            if (resp[i].link) {
                var link = document.createElement("a");
                link.setAttribute("href", resp[i].link);
                link.innerHTML = resp[i].link;
                newLi = document.createElement("li");
                newLi.innerHTML = "";
                myList.children[0].appendChild(newLi);
                myList.children[0].lastChild.appendChild(link);
            }
        }



