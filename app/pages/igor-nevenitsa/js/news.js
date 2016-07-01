;
function addNews() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "../news.json", true);

    xhr.send();


    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
    };


    if (xhr.status != 200) {
        alert(xhr.status + ": " + xhr.statusText);
    } else {
        setText(xhr.responseText);
    }

    function setText(responseText) {
        var newLi;
        var resp = JSON.parse(responseText);

        for (var i = 0; i < resp.lenght; i++) {
            if (resp[i].title) {
                newLi = document.createElement("li");
                newLi.innerHTML = resp[i].name;

                myList.appendChild(newLi);
            }
        }
        ;
        for (var i = 0; i < resp.lenght; i++) {
            if (resp[i].title) {
                newLi = document.createElement("li");
                newLi.innerHTML = resp[i].contentSnippet;

                myList.appendChild(newLi);
            }
        }
        ;
        for (var i = 0; i < resp.lenght; i++) {
            if (resp[i].title) {
                newLi = document.createElement("li");
                newLi.innerHTML = resp[i].link;

                myList.appendChild(newLi);
            }
        }
        ;
    }

};