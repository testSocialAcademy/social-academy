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


/////////////////////////////////////////////////////////////
//      HOMEWORK 8, 9
/////////////////////////////////////////////////////////////

var li;
var manList = document.getElementById("male");
var womanList = document.getElementById("female");

function Users() {
    //var _this = this;
    this.man = {};
    this.woman = {};
    this.people = {};
}

Users.prototype = Object.create(Object.prototype);
Users.prototype.constructor = Users;

Users.prototype.getUsers = function (link) {
    var _this = this;

    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();

    xhr.open('GET', link, true);

    xhr.onload = function () {
        _this.people = JSON.parse(this.responseText);
        startFunc();
    };

    xhr.onerror = function () {
        alert('Ошибка ' + this.status);
    };

    xhr.send();
};


function NewUsers() {
    var _this = this;
    Users.apply(this, arguments);
}

NewUsers.prototype = Object.create(Users.prototype);
NewUsers.prototype.constructor = NewUsers;

NewUsers.prototype.sortByGender = function () {
    var _this = this;

    for (var i = 0; i < _this.people.results.length; i++) {
        if (_this.people.results[i].gender == "female") {
                this.woman[i] = _this.people.results[i];
        } else if (_this.people.results[i].gender == "male") {
                _this.man[i] = _this.people.results[i];
        }
    }
};

NewUsers.prototype.postUsers = function () {
    var _this = this;

    for (var i = 0; i < _this.people.results.length; i ++) {

        if (_this.people.results[i].gender == "male") {
            li = document.createElement('li');
            li.innerHTML = _this.people.results[i].name.title + " " + _this.people.results[i].name.first +
                " " + _this.people.results[i].name.last;
            manList.appendChild(li);

            li = document.createElement('li');
            li.innerHTML = _this.people.results[i].email;
            manList.appendChild(li);

            li = document.createElement('br');
            manList.appendChild(li);
        }

        if (_this.people.results[i].gender == "female") {
            li = document.createElement('li');
            li.innerHTML = _this.people.results[i].name.title + " " + _this.people.results[i].name.first +
                " " + _this.people.results[i].name.last;
            womanList.appendChild(li);

            li = document.createElement('li');
            li.innerHTML = _this.people.results[i].email;
            womanList.appendChild(li);

            li = document.createElement('br');
            womanList.appendChild(li);
        }

    }
};

//Users.apply(this, arguments);

var newUsers = new NewUsers();

newUsers.getUsers("http://api.randomuser.me/?results=10");

function startFunc() {
    newUsers.sortByGender();
    newUsers.postUsers();
}

String.prototype.createPhone = function () {
    var arr = this.split('');

    for (var i = 0; i < arr.length; i++) {
        // if (!(typeof arr == "number")) {
        //     alert("Error: Неправильный формат!");
        //     break;
        if (isNaN(arr[i])) {
            alert("Error: Неправильный формат!");
            break;
        } else if (i % 4 == 0) {
            arr.splice(i, 0, "-");
        }
    }

    if (i == arr.length) {
        arr.shift();
        var result = arr.join('');
        return result;
    }
};
//console.log("4545454545".createPhone());
    
    
    
    
    
    
    









