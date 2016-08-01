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
    var ulList = document.getElementById('listToDo');
    var info = document.getElementById('todo').value;
    var Li = document.createElement('li');
    Li.addEventListener('click', deleteLi_ai);
    Li.innerHTML = info;
    ulList.appendChild(Li);
    localStorage.setItem(info, info);
}

//delete newLi with 'to do list'
    function deleteLi_ai(){
        var ulList = document.getElementById('listToDo');
        ulList.removeChild(this);
        localStorage.removeItem(this.textContent);
    }

//recovery with LS
function getLiWithLS_ai() {
    for (var i = 0; i < localStorage.length; i++) {
        var newUlList = document.getElementById('listToDo');
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
        var newUlList = document.getElementById('listToDo');
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

function Users() {
    var _this = this;
    this._users = {};
    this.male = {};
    this.female = {};
}

    function Request() {
         Users.apply(this, arguments);
    }

Request.prototype = Object.create(Users.prototype);
Request.prototype.constructor = Request;

    Request.prototype.userRequest = function (link) {
          Request.apply(this, arguments);
          var _this = this;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', link, true);

          xhr.onload = function () {
                var responce = JSON.parse(xhr.responseText);
                _this._users = responce.results;
                RespRequest.prototype.responseRequest(responce.results);
          };
          xhr.onerror = function () {
                alert(xhr.status + ": " + xhr.statusText);
           };
           xhr.send();
    };

function GetSet() {
    Request.apply(this, arguments);
}

GetSet.prototype = Object.create(Request.prototype);
GetSet.prototype.constructor = GetSet;


         GetSet.prototype.getSetUsers = function (addNewUser) {
               GetSet.apply(this, arguments);
               if (arguments.length > 0) {
                   AddUserNew.prototype.addUser(addNewUser);
               } else if (arguments.length === 0 && _this._users === null) {
                   throw new Error("Please add new user ");
               } else {
                       return {"female": _this.female, "male": _this.male};
                       }
         };

function AddUserNew() {
    GetSet.apply(this, arguments);
}

AddUserNew.prototype = Object.create(GetSet.prototype);
AddUserNew.prototype.constructor = AddUserNew;

        AddUserNew.prototype.addUser = function (addNewUser) {
                  AddUserNew.apply(this, arguments);
                  if (addNewUser.gender === 'female') {
                      _this.female.push(addNewUser);
                   } else if (addNewUser.gender === 'male') {
                               _this.male.push(addNewUser);
                       } else {console.log("Unknown gender!");}
};

function Users2() {
    AddUserNew.apply(this, arguments);
}

Users2.prototype = Object.create(AddUserNew.prototype);
Users2.prototype.constructor = Users2;

function RespRequest() {
    Users2.apply(this, arguments);
}

RespRequest.prototype = Object.create(Users2.prototype);
RespRequest.prototype.constructor = RespRequest;


         RespRequest.prototype.responseRequest = function(responce) {
                    Users2.apply(this, arguments);
                    this._users = responce;
                    var thisUsers = this._users;
                    OnDisplay.prototype.usersOnDisplay(thisUsers);
};

function SortGender() {
    RespRequest.apply(this, arguments);
}

SortGender.prototype = Object.create(RespRequest.prototype);
SortGender.prototype.constructor = SortGender;


         SortGender.prototype.sortUsers = function () {
                  SortGender.apply(this, arguments);
                  var self = this;
                 for (var i = 0; i < self._users.length; i++) {
                      if (self._users[i].gender == "female") {
                                        self.female[i] = self._users[i];
                       } else if (self._users[i].gender == "male") {
                                         self.male[i] = self._users[i];
                       }
                  }
          };
         SortGender.prototype.sortUsers();

function OnDisplay() {
    SortGender.apply(this, arguments);
}

OnDisplay.prototype = Object.create(SortGender.prototype);
OnDisplay.prototype.constructor = OnDisplay;

          OnDisplay.prototype.usersOnDisplay = function(thisUsers) {
                     OnDisplay.apply(this, arguments);
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
var newUsers = new Users2();
newUsers.userRequest('http://api.randomuser.me/?results=10');

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
