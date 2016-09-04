'use strict';
////////////////////////////////////Homework4/////////////////////////////////////////////////////////////////////////
// basic information hidden

function hiddenBasInfo_ai() {
    var title = document.getElementById('title');
    var list = document.getElementById('list');
    if (!list.style.display || list.style.display == "block") {
        list.style.display = "none";
    }else {
        list.style.display = "block";
    }
}

//add hobby list
function getHobby_ai() {
    var hobby = ["Компьютеры", "Программирование", "Web-дизайн", "IT", "Спорт", "Автомобили", "Мотоциклы"];
    return hobby
}
getHobby_ai();

function addHobby_ai() {
    var ul =document.getElementById("hobbyList");
    var readyHobby = new getHobby_ai();
    for(var i = 0; i < readyHobby.length;i++){
        var li = document.createElement("li");
        li.innerHTML = readyHobby[i];
        if(ul) {
            ul.appendChild(li);
        }
    }
}
addHobby_ai();

//Hobby hidden onclick
function hiddenHobby_ai() {
    var ul =document.getElementById("hobbyList");
        if (!ul.style.display || ul.style.display == "block") {
            ul.style.display = "none";
        } else {
            ul.style.display = "block";
        }
}
/////////////////////////////////Homework 6///////////////////////////////////////////////////////////////////////////
//add li in 'to do list' and local Storage

function addLiTodoLS_ai() {
    var ulList = document.getElementById('listToDo_ai');
    var info = document.getElementById('todo').value;
    var Li = document.createElement('li');
    Li.addEventListener('click', deleteLi_ai);
    Li.innerHTML = info;
    ulList.appendChild(Li);
    localStorage.setItem(info, info);
}

//delete newLi with 'to do list'
    function deleteLi_ai(){
        var ulList = document.getElementById('listToDo_ai');
        ulList.removeChild(this);
        localStorage.removeItem(this.textContent);
    }

//recovery with LS
function getLiWithLS_ai() {
    for (var i = 0; i < localStorage.length; i++) {
        var newUlList = document.getElementById('listToDo_ai');
        var newInfo = localStorage.getItem(localStorage.key(i));
        var newLi = document.createElement('li');
        newLi.addEventListener('click', deleteNewLi_ai);
        newLi.innerHTML = newInfo;
        newUlList.appendChild(newLi);
    }
}
getLiWithLS_ai();

 //delete newLi with local Storage onclick
function deleteNewLi_ai() {
        var newUlList = document.getElementById('listToDo_ai');
        newUlList.removeChild(this);
        localStorage.removeItem(this.textContent);
    }


///////////////////////////////////  Homework 8  /////////////////////////////////////////////////////////////////////
/*
  function Users_ai() {
        var _this = this;
        this._users = {};
        this.male = {};
        this.female = {};
}
    Users_ai.prototype.userRequest = function (link) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', link, true);

        xhr.onload = function () {
            var responce = JSON.parse(xhr.responseText);
            _this._users = responce.results;
            Users2_ai.prototype.responseRequest(responce.results);
        };
        xhr.onerror = function () {
            alert(xhr.status + ": " + xhr.statusText);
        };
        xhr.send();
    };

    Users_ai.prototype.getSetUsers = function (addNewUser) {
        if (arguments.length > 0) {
            addUser_ai(addNewUser);
        } else if (arguments.length === 0 && _this._users === null) {
            throw new Error("Please add new user ");
        } else {
            return {"female": _this.female, "male": _this.male};
        }

        function addUser_ai(addNewUser) {
            if (addNewUser.gender === 'female') {
                _this.female.push(addNewUser);
            }
            else if (addNewUser.gender === 'male') {
                _this.male.push(addNewUser);
            } else {
                console.log("Unknown gender!");
            }
        }
    };

    function Users2_ai() {
        var self = this;
        Users_ai.apply(this, arguments);
    }

Users2_ai.prototype = Object.create(Users_ai.prototype);
Users2_ai.prototype.constructor = Users2_ai;

Users2_ai.prototype.responseRequest = function(responce) {
      Users_ai.apply(this, arguments);
      var self = this;
      this._users = responce;

    function sortUsers() {
        for (var i = 0; i < self._users.length; i++) {
            if (self._users[i].gender == "female") {
                self.female[i] = self._users[i];
            } else if (self._users[i].gender == "male") {
                self.male[i] = self._users[i];
            }
        }
    }
    sortUsers();

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
var newUsers_ai = new Users2_ai();
newUsers_ai.userRequest('http://api.randomuser.me/?results=10');
 */

////////////////////////////////Homework 9/////////////////////////////////////////////////////////////////////////////

function Users_ai() {
    var _this = this;
    this._users = {};
    this.male = {};
    this.female = {};
}

    function Request_ai() {
         Users_ai.apply(this, arguments);
    }

Request_ai.prototype = Object.create(Users_ai.prototype);
Request_ai.prototype.constructor = Request_ai;

    Request_ai.prototype.userRequest_ai = function (link) {
          Request_ai.apply(this, arguments);
          var _this = this;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', link, true);

          xhr.onload = function () {
                var responce = JSON.parse(xhr.responseText);
                _this._users = responce.results;
                RespRequest_ai.prototype.responseRequest_ai(responce.results);
          };
          xhr.onerror = function () {
                alert(xhr.status + ": " + xhr.statusText);
           };
           xhr.send();
    };

function GetSet_ai() {
    Request_ai.apply(this, arguments);
}

GetSet_ai.prototype = Object.create(Request_ai.prototype);
GetSet_ai.prototype.constructor = GetSet_ai;


         GetSet_ai.prototype.getSetUsers_ai = function (addNewUser) {
               GetSet_ai.apply(this, arguments);
               if (arguments.length > 0) {
                   AddUserNew_ai.prototype.addUser_ai(addNewUser);
               } else if (arguments.length === 0 && _this._users === null) {
                   throw new Error("Please add new user ");
               } else {
                       return {"female": _this.female, "male": _this.male};
                       }
         };

function AddUserNew_ai() {
    GetSet_ai.apply(this, arguments);
}

AddUserNew_ai.prototype = Object.create(GetSet_ai.prototype);
AddUserNew_ai.prototype.constructor = AddUserNew_ai;

        AddUserNew_ai.prototype.addUser_ai = function (addNewUser) {
                  AddUserNew_ai.apply(this, arguments);
                  if (addNewUser.gender === 'female') {
                      _this.female.push(addNewUser);
                   } else if (addNewUser.gender === 'male') {
                               _this.male.push(addNewUser);
                       } else {console.log("Unknown gender!");}
};

function Users2_ai() {
    AddUserNew_ai.apply(this, arguments);
}

Users2_ai.prototype = Object.create(AddUserNew_ai.prototype);
Users2_ai.prototype.constructor = Users2_ai;

function RespRequest_ai() {
    Users2_ai.apply(this, arguments);
}

RespRequest_ai.prototype = Object.create(Users2_ai.prototype);
RespRequest_ai.prototype.constructor = RespRequest_ai;


         RespRequest_ai.prototype.responseRequest_ai = function(responce) {
                    Users2_ai.apply(this, arguments);
                    this._users = responce;
                    var thisUsers = this._users;
                    OnDisplay_ai.prototype.usersOnDisplay_ai(thisUsers);
};

function SortGender_ai() {
    RespRequest_ai.apply(this, arguments);
}

SortGender_ai.prototype = Object.create(RespRequest_ai.prototype);
SortGender_ai.prototype.constructor = SortGender_ai;


         SortGender_ai.prototype.sortUsers_ai = function () {
                  SortGender_ai.apply(this, arguments);
                  var self = this;
                 for (var i = 0; i < self._users.length; i++) {
                      if (self._users[i].gender == "female") {
                                        self.female[i] = self._users[i];
                       } else if (self._users[i].gender == "male") {
                                         self.male[i] = self._users[i];
                       }
                  }
          };
         SortGender_ai.prototype.sortUsers_ai();

function OnDisplay_ai() {
    SortGender_ai.apply(this, arguments);
}

OnDisplay_ai.prototype = Object.create(SortGender_ai.prototype);
OnDisplay_ai.prototype.constructor = OnDisplay_ai;

          OnDisplay_ai.prototype.usersOnDisplay_ai = function(thisUsers) {
                     OnDisplay_ai.apply(this, arguments);
                      var self = this,
                      people = thisUsers,
                      divMale = document.getElementById("addMale"),
                      divFemale = document.getElementById("addFemale"),
                       user,
                       userImage,
                       userEmail,
                       userPhone,
                       hr;

                     for (var i = 0; i < people.length; i++) {
                            if (people[i].gender == "male") {
                                userImage = document.createElement('img');
                                userImage.src = people[i].picture.large;
                                userImage.className = "style_userImage";
                                divMale.appendChild(userImage);

                                user = document.createElement('strong');
                                user.innerHTML = people[i].name.title + " " + people[i].name.first + " " + people[i].name.last;
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
                                user.innerHTML = people[i].name.title + " " + people[i].name.first + " " + people[i].name.last;
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
          };
var newUsers_ai = new Users2_ai();
newUsers_ai.userRequest_ai('http://api.randomuser.me/?results=10');

////// createPhone ///////////

String.prototype.createPhone_ai = function () {
    var stringArr = this.split('');
    var resultArr = [];
    for (var i = 0; i < stringArr.length; i++) {
        if (isNaN(Number(stringArr[i]))) {
            throw new Error("must contain only numbers");
        } else {
            resultArr.push(stringArr[i]);
        }
    }
    for (var j = 0; j < resultArr.length; j++) {
        if (j % 4 === 0) {
            resultArr.splice(j, 0, "-");
        }
    }
    resultArr.shift();
    return resultArr.join('');
};

   /* var resultPhone = "9873216549".createPhone_ai();
    console.log(resultPhone); //987-321-654-9
    var resultPhone = "9873216tth64465".createPhone_ai();
    console.log(resultPhone); // Error: Неправильный формат
   */
