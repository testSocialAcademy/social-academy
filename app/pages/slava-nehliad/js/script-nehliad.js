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

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState != 4) return;
        // };

        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            setNews(xhr.responseText);
        }
        
        function setNews(responseText) {
            var newTitle;
            var newPost;
            var newsList = document.getElementById("newsList");
            var resp = JSON.parse(responseText);
            
            for (var i = 0; i < resp.responseData.entries.length; i++) {
                newPost = document.createElement("div");
                newPost.setAttribute("class", "newsBlock");


                if(resp.responseData.entries[i].title) {
                    newTitle = document.createElement("h4");
                    newTitle.innerHTML = resp.responseData.entries[i].title;
                    newPost.appendChild(newTitle);
                }
                if(resp.responseData.entries[i].contentSnippet) {
                    newTitle = document.createElement("p");
                    newTitle.innerHTML = resp.responseData.entries[i].contentSnippet;
                    newPost.appendChild(newTitle);
                }
                if(resp.responseData.entries[i].link) {
                    newTitle = document.createElement("a");
                    newTitle.setAttribute("href", resp.responseData.entries[i].link);
                    newTitle.setAttribute("target", "_blank");
                    newTitle.innerHTML = resp.responseData.entries[i].link;
                    newPost.appendChild(newTitle);
                }

                newsList.appendChild(newPost);
            }
        }
    }
    loadNews();
    
})();








