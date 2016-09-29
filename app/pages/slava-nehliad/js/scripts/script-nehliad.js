;"use strict";

//      Function add hobby

    function showHobby_nv() {
        var li_nv;
        var personalInfo_nv = document.getElementById("hobby-list_nv");
        var list_nv = document.createElement("ul");
        var hobby_nv = ["music", "literature", "programming", "basket-ball"];

        for (var i = 0; i < hobby_nv.length; i++){
            li_nv = document.createElement("li");
            li_nv.innerHTML = hobby_nv[i];
            list_nv.appendChild(li_nv);
        }

        if (personalInfo_nv) {
            personalInfo_nv.appendChild(list_nv);
        }
        return true;
    }
    showHobby_nv();


//      Function add news

    function loadNews_nv() {

        var xhr_nv = new XMLHttpRequest();
        xhr_nv.open("GET", "news.json", false);
        xhr_nv.send();

        xhr_nv.onreadystatechange = function () {
            if (xhr_nv.readyState != 4) return;
        };

        if (xhr_nv.status != 200) {
            alert(xhr_nv.status + ": " + xhr_nv.statusText);
        } else {
            setNews_nv(xhr_nv.responseText);
        }
    }


        function setNews_nv(responseText) {
            var newTitle_nv;
            var newPost_nv;
            var newsList_nv = document.getElementById("newsList_nv");
            var resp_nv = JSON.parse(responseText);

            for (var i = 0; i < resp_nv.responseData.entries.length; i++) {
                newPost_nv = document.createElement("div");
                newPost_nv.setAttribute("class", "newsBlock_nv");


                if(resp_nv.responseData.entries[i].title) {
                    newTitle_nv = document.createElement("h4");
                    newTitle_nv.innerHTML = resp_nv.responseData.entries[i].title;
                    newPost_nv.appendChild(newTitle_nv);
                }
                if(resp_nv.responseData.entries[i].contentSnippet) {
                    newTitle_nv = document.createElement("p");
                    newTitle_nv.innerHTML = resp_nv.responseData.entries[i].contentSnippet;
                    newPost_nv.appendChild(newTitle_nv);
                }
                if(resp_nv.responseData.entries[i].link) {
                    newTitle_nv = document.createElement("a");
                    newTitle_nv.setAttribute("href", resp_nv.responseData.entries[i].link);
                    newTitle_nv.setAttribute("target", "_blank");
                    newTitle_nv.innerHTML = resp_nv.responseData.entries[i].link;
                    newPost_nv.appendChild(newTitle_nv);
                }

                newsList_nv.appendChild(newPost_nv);
            }

    }
    loadNews_nv();


//    Function add items to "ToDoList" and Local Storage

//     function loadItems_nv() {
//         var todoButton_nv = document.getElementById("toDoButton_nv");
//         var myText_nv = document.getElementById("myItems_nv");
//         var info_nv;
//         var newLi_nv;
//         var tasks = document.getElementsByClassName("tasks");
//
//         if (todoButton_nv) {
//             todoButton_nv.addEventListener("click", addItems_nv);
//         }
//
//
//         for (var i = 0; i < localStorage.length; i++) {
//             var key_nv = localStorage.key(i);
//             newLi_nv = document.createElement("li");
//             newLi_nv.innerHTML = key_nv;
//             myText_nv.appendChild(newLi_nv);
//             newLi_nv.addEventListener("click", delItem_nv);
//         }
//
//         function addItems_nv() {
//             info_nv = document.getElementById("info_nv").value;
//             localStorage.setItem(info_nv, info_nv);
//             newLi_nv = document.createElement("li");
//             newLi_nv.addEventListener("click", delItem_nv);
//             newLi_nv.innerHTML = info_nv;
//             myText_nv.appendChild(newLi_nv);
//             // info.innerHTML = "";
//         }
//
//
//         function delItem_nv() {
//             console.log(this.textContent);
//             if (this.parentNode) {
//                 this.parentNode.removeChild(this);
//                 localStorage.removeItem(this.textContent);
//             }
//         }
//
//     }
//     loadItems_nv();




/////////////////////////////////////////////////////////////
//      HOMEWORK 8, 9
/////////////////////////////////////////////////////////////

var li_nv;
var manList_nv = document.getElementById("male_nv");
var womanList_nv = document.getElementById("female_nv");

function Users_nv() {
    //var _this = this;
    this.man = {};
    this.woman = {};
    this.people = {};
}

Users_nv.prototype = Object.create(Object.prototype);
Users_nv.prototype.constructor = Users_nv;

Users_nv.prototype.getUsers = function (link) {
    var _this_nv = this;

    var XHR_nv = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr_nv = new XHR_nv();

    xhr_nv.open('GET', link, true);

    xhr_nv.onload = function () {
        _this_nv.people = JSON.parse(this.responseText);
        startFunc_nv();
    };

    xhr_nv.onerror = function () {
        alert('Ошибка ' + this.status);
    };

    xhr_nv.send();
}


function NewUsers_nv() {
    var _this_nv = this;
    Users_nv.apply(this, arguments);
}

NewUsers_nv.prototype = Object.create(Users_nv.prototype);
NewUsers_nv.prototype.constructor = NewUsers_nv;

NewUsers_nv.prototype.sortByGender = function () {
    var _this_nv = this;

    for (var i = 0; i < _this_nv.people.results.length; i++) {
        if (_this_nv.people.results[i].gender == "female") {
                _this_nv.woman[i] = _this_nv.people.results[i];
        } else if (_this_nv.people.results[i].gender == "male") {
                _this_nv.man[i] = _this_nv.people.results[i];
        }
    }
};

NewUsers_nv.prototype.postUsers = function () {
    var _this_nv = this;

    for (var i = 0; i < _this_nv.people.results.length; i ++) {

        if (_this_nv.people.results[i].gender == "male") {
            li_nv = document.createElement('li');
            li_nv.innerHTML = _this_nv.people.results[i].name.title + " " + _this_nv.people.results[i].name.first +
                " " + _this_nv.people.results[i].name.last;
            manList_nv.appendChild(li_nv);

            li_nv = document.createElement('li');
            li_nv.innerHTML = _this_nv.people.results[i].email;
            manList_nv.appendChild(li_nv);

            li_nv = document.createElement('br');
            manList_nv.appendChild(li_nv);
        }

        if (_this_nv.people.results[i].gender == "female") {
            li_nv = document.createElement('li');
            li_nv.innerHTML = _this_nv.people.results[i].name.title + " " + _this_nv.people.results[i].name.first +
                " " + _this_nv.people.results[i].name.last;
            womanList_nv.appendChild(li_nv);

            li_nv = document.createElement('li');
            li_nv.innerHTML = _this_nv.people.results[i].email;
            womanList_nv.appendChild(li_nv);

            li_nv = document.createElement('br');
            womanList_nv.appendChild(li_nv);
        }

    }
};

//Users.apply(this, arguments);

var newUsers_nv = new NewUsers_nv();

newUsers_nv.getUsers("http://api.randomuser.me/?results=10");

function startFunc_nv() {
    newUsers_nv.sortByGender();
    newUsers_nv.postUsers();
}

String.prototype.createPhone = function () {
    var arr_nv = this.split('');

    for (var i = 0; i < arr_nv.length; i++) {
        // if (!(typeof arr == "number")) {
        //     alert("Error: Неправильный формат!");
        //     break;
        if (isNaN(arr_nv[i])) {
            alert("Error: Неправильный формат!");
            break;
        } else if (i % 4 == 0) {
            arr_nv.splice(i, 0, "-");
        }
    }

    if (i == arr_nv.length) {
        arr_nv.shift();
        var result_nv = arr_nv.join('');
        return result_nv;
    }
};
//console.log("4545454545".createPhone());


/////////////////////////////////////////////////////////////
//      HOMEWORK 12
/////////////////////////////////////////////////////////////    


// var todoButton_nv = document.getElementById("toDoButton_nv");
var myText_nv = document.getElementById("myItems_nv");
// var textLine_nv = document.getElementById("info_nv");
// var info_nv;
var newLi_nv;
$('#myItems_nv').sortable();

// if (todoButton_nv) {
//     todoButton_nv.addEventListener("click", addText_nv);
// }

function delItem_nv() {
    // console.log(this.textContent);
    if (this.parentNode) {
        this.parentNode.removeChild(this);
        localStorage.removeItem(localStorage.key(this));
    }
}

function addText_nv(element, event) {
    var text = element.value;

    if (text.length > 0) {
        $("#myItems_nv li:last-child").text(text);
    }

    if (event.which === 13) {
        $(element).val("");
        for (var i = 0; i < myText_nv.children.length; i++) {
            localStorage.setItem("item"+i, myText_nv.children[i].innerHTML);
            myText_nv.children[i].addEventListener("click", delItem_nv);
        }
    }
}

function createList_nv() {
    if ($("#info_nv").val().length === 0) {
        $("#myItems_nv").append("<li></li>");
    }
}

$('#info_nv').on('keyup', function (e) {
    addText_nv(this, e);
});

$('#info_nv').on('keypress', function () {
    createList_nv();
});

if (myText_nv) {
    for (var i = 0; i < localStorage.length; i++) {
        var key_nv = localStorage.getItem(localStorage.key(i));
        newLi_nv = document.createElement("li");
        newLi_nv.innerHTML = key_nv;
        myText_nv.appendChild(newLi_nv);
        myText_nv.children[i].addEventListener("click", delItem_nv);
    }
}
    
    









