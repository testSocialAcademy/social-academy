////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////(\/)(>,..,<)(\/)//////////////////SERGEY PIVEN ES5 START///////////////(\/)(>,..,<)(\/)//////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'use strict';
/////////////////////////////////////////HOMEWORK 4/////////////////////////////////////////////////////////////////////

var hobbiesInterests_sp = document.getElementById('hobbiesInterests_sp');
var hobbies_sp = ["IT", "Programming", "Medicine", "Video games", "DC Universe", "Marvel Universe", "Fantasy", "Science",
    "Science fiction", "Cars"];

function setHobbiesInterests_sp() {
    return hobbies_sp;
}

if (hobbiesInterests_sp) {
    for (var i = 0; i < setHobbiesInterests_sp().length; i++) {
        var li_sp = document.createElement('li');
        li_sp.innerHTML = hobbies_sp[i];
        hobbiesInterests_sp.appendChild(li_sp);
    }
}

setHobbiesInterests_sp();

////////////////////////////////////////END OF THE HOMEWORK 4///////////////////////////////////////////////////////////

////////////////////////////////////////HOMEWORK 5//////////////////////////////////////////////////////////////////////

function displayNews_sp(json) {

    var xhr_sp = new XMLHttpRequest();
    xhr_sp.open('GET', json, false);
    xhr_sp.send();

    if (xhr_sp.status != 200) {
        alert(xhr_sp.status + ": " + xhr_sp.statusText);
    } else {
        var result_sp = JSON.parse(xhr_sp.responseText);
        var obj_sp = result_sp.responseData.entries;
    }

    if (typeof obj_sp == "object") {
        var news_sp = document.getElementById("news_sp");
        for (var i = 0; i < obj_sp.length; i++) {
            var ul_sp = document.createElement('ul');
            news_sp.appendChild(ul_sp);
        }

        for (i = 0; i < obj_sp.length; i++) {
            if (obj_sp[i].title) {
                var li_sp = document.createElement('li');
                li_sp.innerHTML = obj_sp[i].title;
                news_sp.children[i].appendChild(li_sp);
            }
        }

        for (i = 0; i < obj_sp.length; i++) {
            if (obj_sp[i].contentSnippet) {
                li_sp = document.createElement('li');
                li_sp.innerHTML = obj_sp[i].contentSnippet;
                news_sp.children[i].appendChild(li_sp);
            }
        }

        for (i = 0; i < obj_sp.length; i++) {
            if (obj_sp[i].link) {
                var link_sp = document.createElement('a');
                link_sp.setAttribute('href', obj_sp[i].link);
                link_sp.innerHTML = obj_sp[i].link;
                li_sp = document.createElement('li');
                li_sp.innerHTML = "";
                news_sp.children[i].appendChild(li_sp);
                news_sp.children[i].lastChild.appendChild(link_sp);
            }
        }
    }
    else return false;
}

displayNews_sp('news.json');

/////////////////////////////////////////END OF THE HOMEWORK 5//////////////////////////////////////////////////////////

/////////////////////////////////////////HOMEWORK 6/////////////////////////////////////////////////////////////////////

var textArea_sp = document.getElementById("toDoListInput_sp");
var button_sp = document.getElementById("saveButton_sp");
var ul_sp = document.getElementById("toDoListOutput_sp");
var text_sp = "";
$('#toDoListOutput_sp').sortable();

function remove_sp() {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
        localStorage.removeItem(localStorage.key(this));
    }
}

function addText(element, event) {
    var text = element.value;

    if (text.length > 0) {
        $('#toDoListOutput_sp li:last-child').text(text);
    }

    if (event.which === 13) {
        $(element).val('');
        for (var i = 0; i < ul_sp.children.length; i++) {
            localStorage.setItem("item" + i, ul_sp.children[i].innerHTML);
            ul_sp.children[i].addEventListener("click", remove_sp);
        }
    }
}

function createList() {
    if ($('#toDoListInput_sp').val().length === 0) {
        $('#toDoListOutput_sp').append('<li></li>');
    }
}

$('#toDoListInput_sp').on('keyup', function (e) {
    addText(this, e);
});

$('#toDoListInput_sp').on('keypress', function () {
    createList();
});

if (ul_sp) {
    for (i = 0; i < localStorage.length; i++) {
        var storage_sp = localStorage.getItem(localStorage.key(i));
        li_sp = document.createElement("li");
        li_sp.innerHTML = storage_sp;
        ul_sp.appendChild(li_sp);
        ul_sp.children[i].addEventListener("click", remove_sp);
    }
}


/////////////////////////////////////END OF THE HOMEWORK 6//////////////////////////////////////////////////////////////

/////////////////////////////////////HOMEWORK 7 is unit testing/////////////////////////////////////////////////////////

/////////////////////////////////////HOMEWORK 8,9///////////////////////////////////////////////////////////////////////

String.prototype.createPhone_sp = function () {
    var arr_sp = this.split('');
    for (var i = 0; i < arr_sp.length; i++) {
        if (isNaN(arr_sp[i])) {
            alert("Error: Неправильный формат");
            break;
        } else if (i % 4 == 0) {
            arr_sp.splice(i, 0, "-");
        }
    }
    arr_sp.shift();
    var resultString_sp = arr_sp.join('');
    return resultString_sp;
};

var malesList_sp = document.getElementById("malesByGender_sp");
var femalesList_sp = document.getElementById("femalesByGender_sp");

function Users_sp() {
    this.male = {};
    this.female = {};
    this._people = {};
}

Users_sp.prototype = Object.create(Object.prototype);
Users_sp.prototype.constructor = Users_sp;


Users_sp.prototype.getAjax = function (link) {
    var _this_sp = this;
    var XHR_sp = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr_sp = new XHR_sp();

    xhr_sp.open('GET', link, true);

    xhr_sp.onload = function () {
        _this_sp._people = JSON.parse(this.responseText);
        callback_sp();
    };

    xhr_sp.onerror = function () {
        alert('Ошибка ' + this.status);
    };

    xhr_sp.send();
};

function NewUsers_sp() {
    var _this_sp = this;
    this.creator = "Serega";
    this.dateOfCreation = new Date();
    Users_sp.apply(this, arguments);
}

NewUsers_sp.prototype = Object.create(Users_sp.prototype);
NewUsers_sp.prototype.constructor = NewUsers_sp;

NewUsers_sp.prototype.sortPeopleByGender_sp = function () {
    var _this_sp = this;
    for (var i = 0; i < _this_sp._people.results.length; i++) {
        if (_this_sp._people.results[i].gender == "female") {
            _this_sp.female[i] = _this_sp._people.results[i];
        } else if (_this_sp._people.results[i].gender == "male") {
            _this_sp.male[i] = _this_sp._people.results[i];
        }
    }
};

NewUsers_sp.prototype.getSet_sp = function (person) {
    var _this_sp = this;
    if (!arguments.length) {
        return _this_sp._people;
    } else if (person.gender == "female") {
        _this_sp.female.newPerson = person;
    } else if (person.gender == "male") {
        _this_sp.male.newPerson = person;
    }
};

NewUsers_sp.prototype.getSetDisplayOnPageByGender_sp = function () {
    var _this_sp = this;
    for (var i = 0; i < _this_sp._people.results.length; i++) {
        if (_this_sp._people.results[i].gender == "male") {
            li_sp = document.createElement('li');
            li_sp.innerHTML = _this_sp._people.results[i].name.title + " " + _this_sp._people.results[i].name.first + " " +
                _this_sp._people.results[i].name.last;
            malesList_sp.appendChild(li_sp);

            li_sp = document.createElement('li');
            li_sp.innerHTML = _this_sp._people.results[i].email;
            malesList_sp.appendChild(li_sp);

            li_sp = document.createElement('hr');
            malesList_sp.appendChild(li_sp);
        } else if (_this_sp._people.results[i].gender == "female") {
            li_sp = document.createElement('li');
            li_sp.innerHTML = _this_sp._people.results[i].name.title + " " + _this_sp._people.results[i].name.first + " " +
                _this_sp._people.results[i].name.last;
            femalesList_sp.appendChild(li_sp);

            li_sp = document.createElement('li');
            li_sp.innerHTML = _this_sp._people.results[i].email;
            femalesList_sp.appendChild(li_sp);

            li_sp = document.createElement('hr');
            femalesList_sp.appendChild(li_sp);
        }
    }
};

var dudes_sp = new NewUsers_sp();

dudes_sp.getAjax("http://api.randomuser.me/?results=10");

function callback_sp() {
    dudes_sp.sortPeopleByGender_sp();
    /*dudes.getSet_sp(objForTest);*/
    dudes_sp.getSetDisplayOnPageByGender_sp();
    console.log(dudes_sp);
}

////////////////////////////////////////END OF THE HOMEWORK 8,9/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////(\/)(>,..,<)(\/)//////////////////SERGEY PIVEN ES5 END////////////////(\/)(>,..,<)(\/)///////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////