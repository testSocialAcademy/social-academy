function Users_IN() {

    var _this = this;
    this.findUsers_IN = null;

    console.log(this.findUsers_IN + "  1");
}

Users_IN.prototype.response_IN = function (UsersLink) {
    var resp;

    resp = this.ajaxResp_IN(UsersLink);

    if (resp == undefined) {
        alert("Can't find Users")
    }
    else {
        this.findUsers_IN = resp;
        console.log(0 + "  " + resp);

    }
};

//AJAX запрос с аргументом--------
Users_IN.prototype.ajaxResp_IN = function (UsersLink) {
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

    return resp;
};



//--------------сортировка
function UsersSecond_IN () {

    var men = [];
    var women = [];
    var friends = [];
    this.men_IN = men;
    this.women_IN = women;
    this.friends = friends;
    Users_IN.apply(this, arguments);
}

UsersSecond_IN.prototype = Object.create(Users_IN.prototype);
UsersSecond_IN.prototype.constructor = UsersSecond_IN;

// Сортировка по полам
UsersSecond_IN.prototype.byGender_IN = function() {
    for (var i = 0; i < this.findUsers_IN.length; i++) {
        if (this.findUsers_IN.gender == "male") {
            men.push(this.findUsers_IN[i]);
        }
        else {
            women.push(this.findUsers_IN[i]);
        }
    }
};

//геттер на добавку людей
UsersSecond_IN.prototype.getterSettter_IN = function (newUser) {
    /*this.newUser = newUser;*/
    if (arguments.length > 0) {
        this.addUser_IN(newUser);
    }

    else if (arguments.length == 0) {

        return genderUsers;
    }

};

//сама добавка людей
UsersSecond_IN.prototype.addUser_IN = function (newUser) {

    if (newUser.gender != female && newUser.gender != male) {
        friends.push(newUser);
        return genderUsers;
    }
    else if (newUser.gender == female) {
        women.push(newUser);
        return genderUsers;
    }
    else if (newUser.gender == male) {
        women.push(newUser);
        return genderUsers;
    }
};
/**/

//вывод на страницу
UsersSecond_IN.prototype.display_IN = function () {

    for (var i = 0; i < this.findUsers_IN.length; i++) {
        this.ul = this.createList_IN(i);
        this.appendPeople_IN(this.ul, i);
    }
};

UsersSecond_IN.prototype.createList_IN = function (i) {
    var ul;
    var li;
    var img;
    ul = document.createElement("ul");
    li = document.createElement("li");
    li.setAttribute("class", "list-group-item pull-right ");
    img = document.createElement("img");
    img.className = "img-responsive ";
    img.src = this.findUsers_IN[i].picture.thumbnail;
    li.textContent = this.findUsers_IN[i].name.first + " " + this.findUsers_IN[i].name.last;
    ul.setAttribute("class", "list-group-item ");
    ul.appendChild(li);
    ul.appendChild(img);
    return ul;
};

UsersSecond_IN.prototype.appendPeople_IN = function (ul, i) {
    var men1 = document.getElementById("Men");
    var women1 = document.getElementById("Women");
    var friendsUsers = document.getElementById("friendsUsers");
    if (this.findUsers_IN[i].gender == "male") {
        men1.appendChild(ul);
    }
    else if (this.findUsers_IN[i].gender == "female") {
        women1.appendChild(ul);
    }
    else if (friends) {

        friendsUsers.appendChild(ul);
    }
};

function startUsers_IN() {

    var UsersLink = "http://api.randomuser.me/?results=10";
    var start_IN = new UsersSecond_IN();
    start_IN.response_IN(UsersLink);
    start_IN.display_IN();
}

startUsers_IN();
Ajax_IN();
hobbyAdd_IN();

//-----

String.prototype.createPhone = function(){

    var counter = 0;
    var result = "";

    for (var i=0; i < this.length; i++){
        if (counter%3==0 && counter!==0){
            result+="-"
        }
        if(!isNaN(this)){
            counter++;
            result+=this[i];
        }
        else {
            return "Wrong format"
        }

    }
    return result;
};

var test = "123456789".createPhone();

console.log(test);
