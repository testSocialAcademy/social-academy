/*homework8*/
function Users() {
    this.users=[];
}

    Users.prototype.request = function (url) {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        var responseObject;
        xhr.open('GET',url, false);
        xhr.onload = function () {
            responseObject = JSON.parse(this.responseText).results;
        };
        xhr.onerror = function () {
            alert('Error ' + this.status);
            responseObject = null;
        };
        xhr.send();

        return responseObject;
    };


    Users.prototype.getUsers = function (url) {
        var response;

        response = this.request(url);
        if (typeof response != 'object') {
            alert("Here's no users");
        } else {
            this.users = response;
        }
    };

    function GenderUsers() {
        this.female = [];
        this.male = [];
        this.gen = {};
        Users.apply(this, arguments);
    }
        GenderUsers.prototype = Object.create(Users.prototype);
        GenderUsers.prototype.constructor = GenderUsers;

    GenderUsers.prototype.sortUsers = function () {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].gender == 'female') {
                this.female.push(this.users[i]);
            } else {
                this.male.push(this.users[i]);
            }
        }
    };

    GenderUsers.prototype.addUsers = function (person) {
        if (!arguments.length) {
            return this.Users();
        } else if (person.gender == "female") {
            this.female.push(person);
        } else if (person.gender == "male") {
            this.male.push(person);
        }
    };

    GenderUsers.prototype.setUsers = function (person) {
        var response;

        if (arguments.length > 0) {
            this.addUsers(person);
        } else if (arguments.length == 0 && this.users == null) {
            alert("Here's no users");
        } else if (arguments.length == 0 && this.users.length > 0) {
            response = this.female.slice(0);
            for (var i = 0; i < this.male.length; i++) {
                response.push(this.male[i]);
            }
            return response;
        }
    };

    GenderUsers.prototype.formElement = function (i) {
        var div;
        var img;
        var h1;
        div = document.createElement("div");
        img = document.createElement("img");
        h1 = document.createElement("h1");
        img.src = this.users[i].picture.large;
        h1.textContent = this.users[i].name.first + " " + this.users[i].name.last;
        div.appendChild(img);
        div.appendChild(h1);
        return div;
    };

    GenderUsers.prototype.appendElement = function (div, i) {

        var femaleUsers = document.getElementById("female_gender");
        var maleUsers = document.getElementById("male_gender");

        if (this.users[i].gender == "female") {
            if (femaleUsers) {
                femaleUsers.appendChild(div);
            }
        } else {
            if (maleUsers) {
                maleUsers.appendChild(div);
            }
        }
          };

    GenderUsers.prototype.display = function () {
        for (var i = 0; i < this.users.length; i++) {
            this.gen = this.formElement(i);
            this.appendElement(this.gen, i);
        }
    };

    function imageUsers() {
        var users = new GenderUsers();
        var url = "http://api.randomuser.me/?results=10";
        users.getUsers(url);
        users.sortUsers();
        users.display();
    }

imageUsers();

/*homework9

String.prototype.createPhone = function () {

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
            return "Error"
        }

    }
    return result;
};

var result = "987321654911".createPhone();

console.log(result); //987-321-654-911
------------------------------------------
var result = "a87321654911".createPhone();

console.log(result); // "Error"
*/