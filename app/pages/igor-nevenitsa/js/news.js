    var xhr = new XMLHttpRequest();

    xhr.open("GET", "news.json", false);

    xhr.send();


    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
    };


    if (xhr.status != 200) {
        alert(xhr.status + ": " + xhr.statusText);
    }

        var newLi;
        var resp1 = JSON.parse(xhr.responseText);
        var resp = resp1.responseData.entries;


        for (var i = 0; i < resp.lenght; i++) {
            if (resp[i].title) {
                newLi = document.createElement("li");
                newLi.innerHTML = resp[i].title;

                myList.children[i].appendChild(newLi);
            }
        }

        for (var i = 0; i < resp.lenght; i++) {
            if (resp[i].contentSnippet) {
                newLi = document.createElement("li");
                newLi.innerHTML = resp[i].contentSnippet;

                myList.children[i].appendChild(newLi);
            }
        }

        for (var i = 0; i < resp.lenght; i++) {
            if (resp[i].link) {
                var link = document.createElement("a");
                link.setAttribute("href", resp[i].link);
                link.innerHTML = resp[i].link;
                newLi = document.createElement("li");
                newLi.innerHTML = "";
                myList.children[i].appendChild(newLi);
                myList.children[i].lastChild.appendChild(link);
            }
        }



