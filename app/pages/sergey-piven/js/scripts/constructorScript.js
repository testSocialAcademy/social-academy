var malesList = document.getElementById("malesByGender");
var femalesList = document.getElementById("femalesByGender");
var li;

var objForTest = {
    name: "Egor",        //Я создал этот объект что бы протестить вызов метода getSet с параметром
    gender: "male"
};

function Users() {
    var _this = this;
    this.male = {};
    this.female = {};
    this._people = {};
    this.getAjax = function (link) {
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
}

function NewUsers() {
    var _this = this;
    this.creator = "Serega";
    this.dateOfCreation = new Date();
    this.sortPeopleByGender = function ( ) {
        for (var i = 0; i < _this._people.results.length; i++) {
            if (_this._people.results[i].gender == "female") {

                _this.female[i] = _this._people.results[i];

            } else if (_this._people.results[i].gender == "male") {
                _this.male[i] = _this._people.results[i];
            }
        }
    };
    this.getSet = function (person) {
        if(!arguments.length) {
            return _this._people;
        } else if (person.gender == "female") {
            _this.female.newPerson = person;
        } else if (person.gender == "male") {
            _this.male.newPerson = person;
        }
    };

    this.getSetDisplayOnPageByGender = function () {
        _this.getSet();
        for (var i = 0; i < _this._people.results.length; i ++) {
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
    Users.apply(this, arguments);
}

var dudes = new NewUsers();

dudes.getAjax("http://api.randomuser.me/?results=10");

function callback() {                                       //Тут я делал тестовое создание объекта дополнительным конструктором, проверку методов
    dudes.sortPeopleByGender();                             //включая тот который делает вывод на страницу
    /*dudes.getSet(objForTest);*/
    dudes.getSetDisplayOnPageByGender();
    console.log(dudes);
}

