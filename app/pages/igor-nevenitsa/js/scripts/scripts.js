
///LOCAL STORAGE--------------------------------




function locStorStart_IN() {
    var text = document.getElementById("toDoList");
    for ( var i = 0; i < localStorage.length; i++) {



        var locStor = localStorage.getItem(localStorage.key(i));  //Достаем из localStorage ключ по очереди, используя
        //текущее значение i

        newLi = document.createElement("li");
        newLi.setAttribute("class", "list-group-item ");

        /* newLi.setAttribute("onclick",   "this.parentNode.removeChild(this);" );*/

        newLi.setAttribute("onclick", "locStorDel_IN(this)");

        /*newLi.setAttribute("name",  "i");*/

        newLi.innerHTML = locStor;
        text.appendChild(newLi);


    }
}
locStorStart_IN();

function locStorDel_IN(param) {

    if(localStorage) {

        a =  localStorage.getItem(param.innerHTML);

        localStorage.removeItem(a);



        param.parentNode.removeChild(param);    //удаляет ребенка ul => li со значением this из
    }                                       // newLi.setAttribute("onclick",  "locStorDel(this)" );

    return true;

}


function addItem_IN() {
    var text = document.getElementById("toDoList");


    var form = document.getElementById("toDo").value;
    var newLi = document.createElement("li");



    newLi.innerHTML = form;



    newLi.setAttribute("class", "list-group-item");
    newLi.setAttribute("onclick",  "locStorDel_IN(this)" );


    localStorage.setItem(form, form);



    text.appendChild(newLi);

    return form;

}




////HObby-------------------------

function divText_IN() {

    var a = ['Coding', 'Investing', 'Golf'];

    return a;
}

function hobbyAdd_IN () {

    var a = divText_IN();
    var b = document.getElementById('hobby');

    for (var i = 0; i < a.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = a[i];

        if (b)
        {  b.appendChild(li); }
    }
    b.style.background = 'lightblue';
}


///NEWS---------------------------

function Ajax_IN() {

    var xhr_IN = new XMLHttpRequest();

    xhr_IN.open("GET", "news.json", false);

    xhr_IN.send();

    xhr_IN.onreadystatechange = function () {
        if (xhr_IN.readyState != 4) return;
    };

    if (xhr_IN.status != 200) {
        alert(xhr_IN.status + ": " + xhr_IN.statusText);
    }


    var newLi;
    var resp1 = JSON.parse(xhr_IN.responseText);
    var resp = resp1.responseData.entries;


    for (var i = 0; i < resp.length; i++) {
        var ul = document.createElement('ul');
        myList.appendChild(ul);
        ul.setAttribute("class", " list-group-item  ");
    }

    for (i = 0; i < resp.length; i++) {
        if (resp[i].title) {
            newLi = document.createElement("li");
            newLi.innerHTML = resp[i].title;
            newLi.setAttribute("class", "list-group-item ");
            myList.children[i].appendChild(newLi);
        }
    }

    for (i = 0; i < resp.length; i++) {
        if (resp[i].contentSnippet) {
            newLi = document.createElement("li");
            newLi.innerHTML = resp[i].contentSnippet;
            newLi.setAttribute("class", "list-group-item ");
            myList.children[i].appendChild(newLi);
        }
    }

    for (i = 0; i < resp.length; i++) {
        if (resp[i].link) {
            var link = document.createElement("a");
            link.setAttribute("href", resp[i].link);
            link.innerHTML = resp[i].link;
            newLi = document.createElement("li");
            newLi.innerHTML = "";
            newLi.setAttribute("class", "list-group-item ");
            myList.children[i].appendChild(newLi);
            myList.children[i].lastChild.appendChild(link);
        }
    }
}

//----------------  get

//------------------------------ Users

function Users_IN() {

    var _this = this;
    this.findUsers_IN = undefined;

    this.response_IN = function (UsersLink) {
        var resp;

        resp = this.ajaxResp_IN(UsersLink);

        if (resp == undefined) {
            alert("Can't find Users")
        }
        else {
            _this.findUsers_IN = resp;
            console.log(0 + "  " + resp);
            return _this.findUsers_IN;
        }
    };

    //AJAX запрос с аргументом--------
    this.ajaxResp_IN = function (UsersLink) {
  /*  function ajaxResp_IN (UsersLink) {*/

        var XHR_IN = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr_IN = new XHR_IN();
        var resp = null;

        xhr_IN.open("GET", UsersLink, false);
        xhr_IN.send();
        xhr_IN.onreadystatechange = function ()
        {
            if (xhr_IN.readyState != 4) return;
        };
        if (xhr_IN.status != 200) {
            console.log(xhr_IN.status + ': ' + xhr_IN.statusText);
        } else {
            console.log("ok");
        }

        xhr_IN.onload = function() {
            resp = JSON.parse(xhr_IN.responseText).results;
        };
        if (resp == null) {
            resp = JSON.parse(xhr_IN.responseText).results;
        }
        /*console.log(resp);*/
        return resp;
    }
}


//--------------сортировка
function UsersSecond_IN () {

    var _this = this;
    var men = [];
    var women = [];
    var genderUsers = this.findUsers_IN;
    this.men_IN = men;
    this.women_IN = women;
    byGender_IN();

    // Сортировка по полам
    function byGender_IN() {
        for (var i = 0; i < genderUsers.length; i++) {
            if (genderUsers.gender == "male") {
                men.push(genderUsers[i]);
            }
            else {
                women.push(genderUsers[i]);
            }
        }
    }

    //геттер на добавку людей
    this.getterSettter_IN = function (newUser) {

        if (arguments.length > 0) {
            addUser_IN(newUser);
        }
        else if (arguments.length == 0) {

            return genderUsers;
        }
    };

    //сама добавка людей
    function addUser_IN(newUser) {

        if (newUser.gender == male) {
            men.push(newUser);
        }
        else if (newUser.gender == female) {
            women.push(newUser);
        }
    }
    Users_IN.apply(this, arguments);
}
//вывод на страницу
function display_IN() {

    var users = this.getterSettter_IN();
    var ul;
    for (var i = 0; i < users.length; i++) {
        ul = createList_IN(i);
        appendPeople_IN(ul, i);
    }

    function createList_IN(i) {
        var ul;
        var li;
        ul = document.createElement("ul");
        li = document.createElement("li");
        li.setAttribute("class", "list-group-item pull-right ");
        img = document.createElement("img");
        img.className = "img-responsive ";
        img.src = users[i].picture.thumbnail;

        li.textContent = users[i].name.first + " " + users[i].name.last;
        ul.setAttribute("class", "list-group-item ");
        ul.appendChild(li);
        ul.appendChild(img);
        return ul;
    }

    function appendPeople_IN(ul, i) {
        var men1 = document.getElementById("Men");
        var women1 = document.getElementById("Women");
        var friendsUsers = document.getElementById("friendsUsers");
        if (users[i].gender == "male")
        {
            men1.appendChild(ul);
        }
        else
        {
            women1.appendChild(ul);
        }
    }
    if (!(i % 4)) {
        ul = ul.cloneNode(true);
        if (friendsUsers) {
            friendsUsers.appendChild(ul);
        }
    }
}

function startUsers_IN() {

    var UsersLink = "http://api.randomuser.me/?results=10";
    var start_IN = new Users_IN();
    UsersSecond_IN.prototype = start_IN;
    start_IN.response_IN(UsersLink);
    var usersSecond_IN = new UsersSecond_IN();
    display_IN.prototype = usersSecond_IN;
    var displayUsers_IN = new display_IN;
}

startUsers_IN();
Ajax_IN();
hobbyAdd_IN ();