'use strict';
function Users() {
    var usersData;

    function users() {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.randomuser.me/?results=10", false);
        xhr.send();
        if (xhr.status != 200) {
            alert(xhr.status + " " + xhr.statusText);
        } else {
            var allUsers = JSON.parse(xhr.responseText);
            usersData = allUsers.results;
        }
    }

    this.getUsers = function () {
        users();
        return usersData;
    };
}

function GenderUsers() {
    Users.apply(this, arguments);
    var males = [];
    var females = [];
    var users = this.getUsers();

    (function sortUsersByGender() {
        for (var i = 0; i < users.length; i++) {
            if (users[i].gender == "male") {
                males.push(users[i])
            } else if (users[i].gender == "female") {
                females.push(users[i])
            }
        }
    })();

    this.getOrSetUser = function (person) {
        if (!arguments.length) {
            return users;
        } else if (person.gender == "male") {
            males.push(person)
        } else if (person.gender == "female") {
            females.push(person)
        }
    };
    this.displayOnPageUsersByGender = function () {
        var usersToDisplay = this.getOrSetUser();
        var ulBoys = document.getElementById('boys');
        var ulGirls = document.getElementById('girls');
        for (var i = 0; i < usersToDisplay.length; i++) {
            if (usersToDisplay[i].gender == "male") {
                var liBoys = ulBoys.appendChild(document.createElement('li'));
                liBoys.className = "list-group-item";
                liBoys.innerHTML = usersToDisplay[i].name.first.charAt(0).toUpperCase()+ usersToDisplay[i].name.first.slice(1) + " " + usersToDisplay[i].name.last.charAt(0).toUpperCase()+usersToDisplay[i].name.last.slice(1);
            } else {
                var liGirls = ulGirls.appendChild(document.createElement('li'));
                liGirls.className = "list-group-item";
                liGirls.innerHTML = usersToDisplay[i].name.first.charAt(0).toUpperCase()+ usersToDisplay[i].name.first.slice(1) + " " + usersToDisplay[i].name.last.charAt(0).toUpperCase()+usersToDisplay[i].name.last.slice(1);
            }
        }
    }
}
var gender = new GenderUsers();
gender.displayOnPageUsersByGender();