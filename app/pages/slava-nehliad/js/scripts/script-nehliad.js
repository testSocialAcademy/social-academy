;"use strict";

//      Function add hobby
    
    function showHobby() {
        var li;
        var personalInfo = document.getElementById("hobby-list");
        var list = document.createElement("ul");
        var hobby = ["music", "literature", "programming", "basket-ball"];

        for (var i = 0; i < hobby.length; i++){
            li = document.createElement("li");
            li.innerHTML = hobby[i];
            list.appendChild(li);
        }

        if (personalInfo) {
            personalInfo.appendChild(list);
        };
        return true;
    };
    showHobby();


//      Function add news
        
    function loadNews() {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "news.json", false);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
        };

        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            setNews(xhr.responseText);
        }
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
    loadNews();
    
    
//    Function add items to "ToDoList" and Local Storage

    function loadItems() {
        var todoButton = document.getElementById("toDoButton");
        var myText = document.getElementById("myItems");
        var info;
        var newLi;
        var tasks = document.getElementsByClassName("tasks");

        if (todoButton) {
            todoButton.addEventListener("click", addItems);
        }


        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            newLi = document.createElement("li");
            newLi.innerHTML = key;
            myText.appendChild(newLi);
            newLi.addEventListener("click", delItem);
        }

        function addItems() {
            info = document.getElementById("info").value;
            localStorage.setItem(info, info);
            newLi = document.createElement("li");
            newLi.addEventListener("click", delItem);
            newLi.innerHTML = info;
            myText.appendChild(newLi);
            // info.innerHTML = "";
        }


        function delItem() {
            console.log(this.textContent);
            if (this.parentNode) {
                this.parentNode.removeChild(this);
                localStorage.removeItem(this.textContent);
            }
        }

    };
    loadItems();
    
    
    
    
    
    
    
    
    









