'use strict';
function Users_skr() {
    this.usersData={};

}
Users_skr.prototype.users = function () {
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
Users_skr.prototype.getUsers = function () {
    Users_skr.prototype.users();
    return this.usersData;
};

function GenderUsers_skr() {
    this.males = [];
    this.females = [];
}
GenderUsers_skr.prototype = Object.create(Users_skr.prototype);
GenderUsers_skr.prototype.constructor = GenderUsers_skr;

GenderUsers_skr.prototype.sortUsersByGender = function () {
    for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].gender == "male") {
            this.males.push(this.users[i])
        } else if (this.users[i].gender == "female") {
            this.females.push(this.users[i])
        }
    }
};
GenderUsers_skr.prototype.getOrSetUser = function (person) {
    if (!arguments.length) {
        return this.getUsers();
    } else if (person.gender == "male") {
        this.males.push(person);
    } else if (person.gender == "female") {
        this.females.push(person);
    }
};
GenderUsers_skr.prototype.displayOnPageUsersByGender = function () {
    var usersToDisplay = this.getOrSetUser();
    var ulBoys = document.getElementById('boys_skr');
    var ulGirls = document.getElementById('girls_skr');
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

var gender_skr = new GenderUsers_skr();
gender_skr.displayOnPageUsersByGender();


String.prototype.phoneParser_skr = function(){
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

var resultPhone_skr = "9873216549".phoneParser_skr();

console.log(resultPhone_skr); //987-321-654-9

var resultPhone1_skr = "9873216549nnn".phoneParser_skr();

console.log(resultPhone1_skr); // Error: Неправильный формат
