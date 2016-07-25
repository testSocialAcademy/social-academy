'use strict';
//Homework4
// basic information hidden
function hiddenBasInfo() {
    var title = document.getElementById('title');
    var list = document.getElementById('list');
    if (!list.style.display || list.style.display == "block") {
        list.style.display = "none";
    }else {
        list.style.display = "block";
    }
}

//add hobby list
function getHobby() {
    var hobby = ["Компьютеры", "Программирование", "Web-дизайн", "IT", "Спорт", "Автомобили", "Мотоциклы"];
    return hobby
}
getHobby();

function addHobby( ) {
    var ul =document.getElementById("hobbyList");
    var readyHobby = new getHobby;
    for(var i = 0; i < readyHobby.length;i++){
        var li = document.createElement("li");
        li.innerHTML = readyHobby[i];
        if(ul) {
            ul.appendChild(li);
        }
    }
}
addHobby();
/*function addHobby() {
    var ul =document.getElementById("hobbyList");
    var hobby= ["Компьютеры", "Программирование", "Web-дизайн", "IT", "Спорт", "Автомобили", "Мотоциклы"];
    for(var i = 0; i < hobby.length;i++){
        var li = document.createElement("li");
        li.innerHTML= hobby[i];
        if(ul) {
            ul.appendChild(li);
        }
    }
}
  addHobby();
*/
//Hobby hidden onclick
function hiddenHobby() {
    var ul =document.getElementById("hobbyList");
        if (!ul.style.display || ul.style.display == "block") {
            ul.style.display = "none";
        } else {
            ul.style.display = "block";
        }
}
//Homework 6
//add li in 'to do list' and local Storage
function addLiTodoLS() {
    var ulList = document.getElementById('listToDo');
    var info = document.getElementById('todo').value;
    var Li = document.createElement('li');
    Li.addEventListener('click', deleteLi);
    Li.innerHTML = info;
    ulList.appendChild(Li);
    localStorage.setItem(info, info);
}

//delete newLi with 'to do list'
    function deleteLi(){
        var ulList = document.getElementById('listToDo');
        ulList.removeChild(this);
        localStorage.removeItem(this.textContent);
    }

//recovery with LS
function getLiWithLS() {
    for (var i = 0; i < localStorage.length; i++) {
        var newUlList = document.getElementById('listToDo');
        var newInfo = localStorage.getItem(localStorage.key(i));
        var newLi = document.createElement('li');
        newLi.addEventListener('click', deleteNewLi);
        newLi.innerHTML = newInfo;
        newUlList.appendChild(newLi);
    }
}
getLiWithLS();

 //delete newLi with local Storage onclick
function deleteNewLi() {
        var newUlList = document.getElementById('listToDo');
        newUlList.removeChild(this);
        localStorage.removeItem(this.textContent);
    }


//////////////////   Homework 8  //////////////////////////


function Users() {
    var _this = this;
    this._users = {};
    this.male = {};
    this.female = {};

    this.userRequest = function (link) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', link, true);

        xhr.onload = function() {
            var responce = JSON.parse(xhr.responseText);
           _this._users = responce.results;
            NewUsers.responseRequest(responce.results);
        };

        xhr.onerror = function() {
            alert(xhr.status + ": " + xhr.statusText);
        };

        xhr.send();
    };
}

var NewUsers = new Users();
NewUsers.userRequest('http://api.randomuser.me/?results=10');

NewUsers.responseRequest = function(responce) {
    var self = this;
    NewUsers._users = responce;
    NewUsers.male = {};
    NewUsers.female = {};

    function sortUsers() {
        for (var i = 0; i < NewUsers._users.length; i++) {
            if (NewUsers._users[i].gender == "female") {
                NewUsers.female[i] = NewUsers._users[i];
            } else if (NewUsers._users[i].gender == "male") {
                NewUsers.male[i] = NewUsers._users[i];
            }
        }
    }
    sortUsers();

    this.getSetUsers = function (addNewUser) {
        if (arguments.length > 0) {
            addUser(addNewUser);
        } else if (arguments.length === 0 && self._allUsers === null) {
            throw new Error("Please add new user ");
        } else {
            return {"female": NewUsers.female, "male": NewUsers.male};
        }
    };

    function addUser(addNewUser) {
        if (addNewUser.gender === 'female') {
            NewUsers.female.push(addNewUser);
        }
        else if (addNewUser.gender === 'male') {
            NewUsers.male.push(addNewUser);
        } else {
            console.log("Unknown gender!");
        }
    }

    function usersOnDisplay() {
        var people = self._users;
        var divMale = document.getElementById("addMale");
        var divFemale = document.getElementById("addFemale");
        var user;
        var userImage;
        var userEmail;
        var userPhone;
        var hr;

        for (var i = 0; i < people.length; i++) {
            if (people[i].gender == "male") {

                userImage = document.createElement('img');
                userImage.src = people[i].picture.large;
                userImage.className = "style_userImage";
                divMale.appendChild(userImage);

                user = document.createElement('strong');
                user.innerHTML = people[i].name.title + " " + people[i].name.first + " " +
                    people[i].name.last;
                divMale.appendChild(user);

                userPhone = document.createElement('p');
                userPhone.innerHTML = people[i].phone;
                divMale.appendChild(userPhone);

                userEmail = document.createElement('a');
                userEmail.innerHTML = people[i].email;
                userEmail.setAttribute('href','index.html');
                divMale.appendChild(userEmail);


                hr = document.createElement('hr');
                divMale.appendChild(hr);

            }else if(people[i].gender == "female"){

                userImage = document.createElement('img');
                userImage.src = people[i].picture.large;
                userImage.className = "style_userImage";
                divFemale.appendChild(userImage);

                user = document.createElement('strong');
                user.innerHTML = people[i].name.title + " " + people[i].name.first + " " +
                    people[i].name.last;
                divFemale.appendChild(user);

                userPhone = document.createElement('p');
                userPhone.innerHTML = people[i].phone;
                divFemale.appendChild(userPhone);

                userEmail = document.createElement('a');
                userEmail.innerHTML = people[i].email;
                userEmail.setAttribute('href','index.html');
                divFemale.appendChild(userEmail);


                hr = document.createElement('hr');
                divFemale.appendChild(hr);
            }
        }
    }
    usersOnDisplay();
};

