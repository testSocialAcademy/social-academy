'use strict';
function Users() {
    this.usersData={};

}
Users.prototype.users = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.randomuser.me/?results=10", false);
    xhr.send();
    if (xhr.status != 200) {
        alert(xhr.status + " " + xhr.statusText);
    } else {
        var allUsers = JSON.parse(xhr.responseText);
        this.usersData = allUsers.results;
    }
};
Users.prototype.getUsers = function () {
    Users.prototype.users();
    return this.usersData;
};

function GenderUsers() {
    this.males = [];
    this.females = [];
}
GenderUsers.prototype = Object.create(Users.prototype);
GenderUsers.prototype.constructor = GenderUsers;

GenderUsers.prototype.sortUsersByGender = function () {
    for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].gender == "male") {
            this.males.push(this.users[i])
        } else if (this.users[i].gender == "female") {
            this.females.push(this.users[i])
        }
    }
};
GenderUsers.prototype.getOrSetUser = function (person) {
    if (!arguments.length) {
        return this.getUsers();
    } else if (person.gender == "male") {
        this.males.push(person);
    } else if (person.gender == "female") {
        this.females.push(person);
    }
};
GenderUsers.prototype.displayOnPageUsersByGender = function () {
    var usersToDisplay = this.getOrSetUser();
    var ulBoys = document.getElementById('boys');
    var ulGirls = document.getElementById('girls');
    if (ulBoys) {
        for (var i = 0; i < usersToDisplay.length; i++) {
            if (usersToDisplay[i].gender == "male") {
                var liBoys = ulBoys.appendChild(document.createElement('li'));
                liBoys.className = "list-group-item";
                liBoys.innerHTML = usersToDisplay[i].name.first.charAt(0).toUpperCase() + usersToDisplay[i].name.first.slice(1) + " " + usersToDisplay[i].name.last.charAt(0).toUpperCase() + usersToDisplay[i].name.last.slice(1);
            } else if (usersToDisplay[i].gender == "female") {
                var liGirls = ulGirls.appendChild(document.createElement('li'));
                liGirls.className = "list-group-item";
                liGirls.innerHTML = usersToDisplay[i].name.first.charAt(0).toUpperCase() + usersToDisplay[i].name.first.slice(1) + " " + usersToDisplay[i].name.last.charAt(0).toUpperCase() + usersToDisplay[i].name.last.slice(1);
            }
        }
    }
};

var gender = new GenderUsers();
gender.displayOnPageUsersByGender();


String.prototype.phoneParser = function(){
    var count = 0;
    var result = "";
    for (var i=0; i<this.length;i++){
        if (count%3==0 && count!==0){
            result+="-"
        }
        if(!isNaN(this)){
            count++;
            result+=this[i];
        }
        else {
            return "Неправильный формат"
        }

    }
    return result;
};

var result = "9873216549".phoneParser();

console.log(result); //987-321-654-9

var result1 = "9873216549nnn".phoneParser();

console.log(result1); // Error: Неправильный формат
