;'use strict';
(function(){
//Display hobbies	
function displayHobbies_mu() {
    var div = document.getElementById("personal-data_mu");
    var pText;
    var p = document.createElement('p');
    pText = formHobbies_mu();
    p.innerHTML = pText;
    if (div) {
        div.appendChild(p);
    }
    return 1;
}
function formHobbies_mu() {
    var hobbies = ["literature", "bodybuilding", "art", "walking"];
    var pText = "Hobbies: ";
    for (var i = 0; i < hobbies.length; i++) {
        pText += hobbies[i] + ", ";
    }
    pText = pText.slice(0, pText.length - 2);
    return pText;
}

//Functions for news
function displayNews_mu() {
    var response = null;
    response = newsRequest_mu();
    if (response != null) {
        putNewsOnPage_mu(response);
    }
    else {
        return false;
    }

}

function newsRequest_mu() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "news.json", false);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readeState != 4) return;
    };
    if (xhr.status != 200) {
        alert(xhr.status + ": " + xhr.statusText);
    } else {
        return xhr.responseText;
    }
}

function putNewsOnPage_mu(responseText) {
    var response = JSON.parse(responseText);
    var news = response.responseData.entries;
    var column = document.getElementById("newsColumn_mu");
    var div;
    var obj;
    for (var i = 0; i < news.length; i++) {
        obj = news[i];
        div = formElement_mu();
        column.appendChild(div);
    }

    function formElement_mu() {
        var p;
        var a;
        var div = document.createElement("div");
        for (var key in obj) {
            if (key == "link") {
                a = document.createElement("a");
                a.href = obj[key];
                a.innerHTML = "Read more";
                div.appendChild(a);
            }
            else if (key != "url") {
                p = document.createElement("p");
                p.innerHTML = obj[key];
                div.appendChild(p);
            }
        }
        p = document.createElement("p");
        div.appendChild(p);
        return div;
    }
}
//Work with Local Storage
function addElementLSList_mu() {
    var keyLS = document.getElementById("keyLS_mu");
    var value = keyLS.value;
    var result = localStorage.getItem(value);
    if ((localStorage.length == 0 || result == null) && (value != "")) {
        addElementLS_mu();
        addElementList_mu();
    }

    function addElementLS_mu() {
        localStorage.setItem(value, value);
    }

    function addElementList_mu() {
        var li = document.createElement("li");
        var listLS = document.getElementById("listLS_mu");
        li.textContent = value;
        li.onclick = removeLi_mu;
        listLS.appendChild(li);
        keyLS.value = "";
        return "very nice";
    }
}


function removeLi_mu() {
    var _this = this;
    removeLiLS_mu();
    removeLiPage_mu();

    function removeLiLS_mu() {
        localStorage.removeItem(_this.textContent);
    }

    function removeLiPage_mu() {
        var listLS = document.getElementById("listLS_mu");
        listLS.removeChild(_this);
    }
}

function displayLS_mu() {
    var li = document.createElement("li");
    var value;
    if (value) {
        value = document.getElementById("keyLS_mu").value;
    }
    var listLS = document.getElementById("listLS_mu");
    for (var i = 0; i < localStorage.length; i++) {
        li.textContent = localStorage.key(i);
        li.onclick = removeLi_mu;
        listLS.appendChild(li);
        li = document.createElement("li");
    }
}
// Work with Users
function Users_mu() {
    this._users = null;
}
Users_mu.prototype.getUsers = function (usersSource) {
    var response;

    response = this._usersRequest(usersSource);
    if (typeof response != 'object') {
        alert('Didn"t get Users!');
    } else {
        this._users = response;
    }
};
Users_mu.prototype._usersRequest = function (source) {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    var responseObject;
    xhr.open('GET', source, false);
    xhr.onload = function () {
        responseObject = JSON.parse(this.responseText).results;
    };
    xhr.onerror = function () {
        alert('Ошибка ' + this.status);
        responseObject = null;
    };
    xhr.send();

    return responseObject;
};

function SexUsers_mu() {
    this._girls = [];
    this._boys = [];
    this._div = {};
    Users_mu.apply(this, arguments);
}
SexUsers_mu.prototype = Object.create(Users_mu.prototype);
SexUsers_mu.prototype.constructor = SexUsers_mu;

SexUsers_mu.prototype.sortUsers = function () {
    for (var i = 0; i < this._users.length; i++) {
        if (this._users[i].gender == 'male') {
            this._boys.push(this._users[i]);
        } else {
            this._girls.push(this._users[i]);
        }
    }
};

SexUsers_mu.prototype.getSetUsers = function (newUser) {
    var response;

    if (arguments.length > 0) {
        this._addUser(newUser);
    } else if (arguments.length == 0 && this._users == null) {
        alert('No users. Add them!');
    } else if (arguments.length == 0 && this._users.length > 0) {
        response = this._boys.slice(0);
        for (var i = 0; i < this._girls.length; i++) {
            response.push(this._girls[i]);
        }
        return response;
    }
};

SexUsers_mu.prototype._addUser = function (newUser) {
    this._users.push(newUser);
    if (newUser.gender == 'male') {
        this._boys.push(newUser);
    } else {
        this._girls.push(newUser);
    }
};

SexUsers_mu.prototype.display = function () {
    for (var i = 0; i < this._users.length; i++) {
        this._div = this._formElement(i);
        this._appendElement(this._div, i);
    }
};

SexUsers_mu.prototype._formElement = function (i) {
    var div;
    var img;
    var p;
    div = document.createElement("div");
    img = document.createElement("img");
    p = document.createElement("p");
    img.className = "img-responsive userImage_mu";
    img.src = this._users[i].picture.large;
    p.textContent = this._users[i].name.first + " " + this._users[i].name.last;
    div.appendChild(img);
    div.appendChild(p);
    return div;
};

SexUsers_mu.prototype._appendElement = function (div, i) {
    var maleUsers = document.getElementById("maleUsers_mu");
    var femaleUsers = document.getElementById("femaleUsers_mu");
    var friendsUsers = document.getElementById("friendsUsers_mu");
    if (this._users[i].gender == "male") {
        if (maleUsers) {
            maleUsers.appendChild(div);
        }
    } else {
        if (femaleUsers) {
            femaleUsers.appendChild(div);
        }
    }
    if (!(i % 4)) {
        div = div.cloneNode(true);
        if (friendsUsers) {
            friendsUsers.appendChild(div);
        }
    }
};
//HOMEWORK 9

function PhoneError_mu(type) {
    this.name = "PhoneError";
    this.message = "Неправильный формат." + type;
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor); // (*)
    } else {
        this.stack = (new Error()).stack;
    }

}
PhoneError_mu.prototype = Object.create(Error.prototype);
PhoneError_mu.prototype.constructor = PhoneError_mu;


String.prototype.createPhone_mu = function () {
    var i;
    var result = "";
    if (this.search(/\D/) != -1) {
        throw new PhoneError_mu("Вводите только цифры");
    }
    if (this.length != 10) {
        throw new PhoneError_mu("Цифр должно быть 10");
    }
    for (i = 0; i < this.length; i++) {
        if (i != 0 && !(i % 3)) {
            result += "-"
        }
        result += this[i];
    }
    return result;
};

try {
    var result = "1231231231".createPhone_mu();  //Пробуем здесь разные входные данные
    console.log(result);
} catch (err) {
    if (err instanceof PhoneError_mu) {
        alert(err.message);
    } else {
        throw err;
    }
}

//main body///////////////
function workWithUsers_mu() {
    var usersSource = "http://api.randomuser.me/?results=10";
    var users = new SexUsers_mu();
    users.getUsers(usersSource);
    users.sortUsers();
    users.display();
}

function workWithLS_mu() {
    var submitInputLS = document.getElementById("submitInputLS_mu");
    if (submitInputLS) {
        submitInputLS.addEventListener("click", addElementLSList_mu);
    }
    displayLS_mu();
}

workWithUsers_mu();
workWithLS_mu();
displayHobbies_mu();
displayNews_mu();
})();