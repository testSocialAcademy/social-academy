"use strict";
(function() {
//      Function add hobby
    
    function showHobby() {
        var personalInfo = document.getElementById("hobby-list");
        var list = document.createElement("ul");
        var hobby = ["music", "literature", "programming", "basket-ball"];
           for (var i = 0; i < hobby.length; i++){
               var li = document.createElement("li");
               li.innerHTML = hobby[i];
               list.appendChild(li);
            }
            
            personalInfo.appendChild(list);
        }

    showHobby();


//      Function add news
        
    function loadNews() {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "news.json", false);
        xhr.send();

        alert( xhr.responseText );

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState != 4) return;
        // };

        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            setNews(xhr.responseText);
        }

        var newsList = document.getElementById("newsList");

        function setNews(responseText) {
            var newTitle;
            var resp = JSON.parse(responseText);


            for (var i = 0; i < resp.length; i++) {
                if(resp[i].title) {
                    newTitle = document.createElement("h3");
                    newTitle.innerHTML = resp[i].title;
                    newsList.appendChild(newTitle);
                }
            }
        }
    }
    loadNews();
    
})();








