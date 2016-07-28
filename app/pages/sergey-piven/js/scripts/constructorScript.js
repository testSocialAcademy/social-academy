String.prototype.createPhone = function () {
    var arr = this.split('');
    for (var i = 0; i < arr.length; i++) {
        if (isNaN(arr[i])) {
            alert("Error: Неправильный формат");
            break;
        } else if (i % 4 == 0) {
            arr.splice(i, 0, "-");
        }
    }
    arr.shift();
    var resultString = arr.join('');
    return resultString;
};

var malesList = document.getElementById("malesByGender");
var femalesList = document.getElementById("femalesByGender");
var li;

/*var objForTest = {
 name: "Egor",
 gender: "male"
 };*/

function Users() {
    this.male = {};
    this.female = {};
    this._people = {};
}

Users.prototype = Object.create(Object.prototype);
Users.prototype.constructor = Users;


Users.prototype.getAjax = function (link) {
    var _this = this;
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();

    xhr.open('GET', link, true);

    xhr.onload = function () {
        _this._people = JSON.parse(this.responseText);
        callback();
    };

    xhr.onerror = function () {
        alert('Ошибка ' + this.status);
    };

    xhr.send();
};

function NewUsers() {
    var _this = this;
    this.creator = "Serega";
    this.dateOfCreation = new Date();
    Users.apply(this, arguments);
}

NewUsers.prototype = Object.create(Users.prototype);
NewUsers.prototype.constructor = NewUsers;

NewUsers.prototype.sortPeopleByGender = function () {
    var _this = this;
    for (var i = 0; i < _this._people.results.length; i++) {
        if (_this._people.results[i].gender == "female") {
            _this.female[i] = _this._people.results[i];
        } else if (_this._people.results[i].gender == "male") {
            _this.male[i] = _this._people.results[i];
        }
    }
};

NewUsers.prototype.getSet = function (person) {
    var _this = this;
    if (!arguments.length) {
        return _this._people;
    } else if (person.gender == "female") {
        _this.female.newPerson = person;
    } else if (person.gender == "male") {
        _this.male.newPerson = person;
    }
};

NewUsers.prototype.getSetDisplayOnPageByGender = function () {
    var _this = this;
    for (var i = 0; i < _this._people.results.length; i++) {
        if (_this._people.results[i].gender == "male") {
            li = document.createElement('li');
            li.innerHTML = _this._people.results[i].name.title + " " + _this._people.results[i].name.first + " " +
                _this._people.results[i].name.last;
            malesList.appendChild(li);

            li = document.createElement('li');
            li.innerHTML = _this._people.results[i].email;
            malesList.appendChild(li);

            li = document.createElement('hr');
            malesList.appendChild(li);
        } else if (_this._people.results[i].gender == "female") {
            li = document.createElement('li');
            li.innerHTML = _this._people.results[i].name.title + " " + _this._people.results[i].name.first + " " +
                _this._people.results[i].name.last;
            femalesList.appendChild(li);

            li = document.createElement('li');
            li.innerHTML = _this._people.results[i].email;
            femalesList.appendChild(li);

            li = document.createElement('hr');
            femalesList.appendChild(li);
        }
    }
};

var dudes = new NewUsers();

dudes.getAjax("http://api.randomuser.me/?results=10");

function callback() {
    dudes.sortPeopleByGender();
    /*dudes.getSet(objForTest);*/
    dudes.getSetDisplayOnPageByGender();
    console.log(dudes);
}


