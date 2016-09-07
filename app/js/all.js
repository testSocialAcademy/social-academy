"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES6 Script /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getJSONFromUrl_af(sourceUrl) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: sourceUrl,
            dataType: "text",
            success: function success(data) {
                resolve(data);
            },
            error: function error(errorObj, status) {
                if (errorObj.status < 100) {
                    reject("No response from the server");
                }
                reject(status);
            }
        });
    });
}

function getFromUrl_af(srcArr) {
    var chain = Promise.resolve();
    var resultJSON = [];

    srcArr.forEach(function (url) {
        chain = chain.then(function () {
            return getJSONFromUrl_af(url);
        }) //return promise
        .then(function (resultOfXhr) {
            //nothing return
            resultJSON.push(JSON.parse(resultOfXhr));
        });
    });

    chain.then(function () {
        return setDataToTemplate_af(resultJSON);
    }) //return data
    .then(function (cuttedJSON) {
        return displayPreviewImages_af(cuttedJSON);
    }) //nothing return
    .catch(function (error) {
        alert(error);
    });
}

function setDataToTemplate_af(JSON) {
    var imagesList = $('.slide_show-center-list_af');
    var template = Handlebars.compile($('#template_af').html());
    for (var _i = 0; _i < JSON.length; _i++) {
        JSON[_i].hits.length = MAX_COUNT_IMG_ON_PAGE_af / JSON.length; //Cut images count according to the statement
        imagesList.append(template(JSON[_i]));
    }

    $(".slide_af").eq(0).clone().appendTo(".slide_show-center-list_af"); //to create the illusion of an endless canvas

    return JSON;
}

function displayPreviewImages_af(JSON) {
    for (var _i2 = 0; _i2 < JSON.length; _i2++) {
        var previewBlock = $("#images" + _i2 + "_af");
        var template = Handlebars.compile($("#template_preview_" + _i2 + "_af").html());
        previewBlock.append(template(JSON[_i2]));
    }

    highlightingPreviewImg(0);
}

function getImageIndex_af() {
    var currentIndex = 0;
    function current(direction) {
        if (direction === "next") {
            return ++currentIndex;
        } else if (direction === "prev") {
            return --currentIndex;
        } else {
            throw new Error("Wrong Direction!");
        }
    }
    current.set = function (num) {
        currentIndex = num;
    };
    return current;
}

$('.slide_show-left_button_af').on('click', function () {
    setAnotherPicture_af("prev");
});

$('.slide_show-right_button_af').on('click', function () {
    setAnotherPicture_af("next");
});

$('.slide_show-play_button_af').on('click', function () {
    playSlideShow_af();
});

$('.slide_show-pause_button_af').on('click', function () {
    pauseSlideShow_af();
});

function setAnotherPicture_af(direction) {
    var imagesList = $('.slide_show-center-list_af');
    var imagesCollection = $('.slide_af');
    var slideWindow = $('.slide_show-center_af');
    var newImgIndex = imageIndex_af(direction);
    var frameWidth = imagesCollection.eq(newImgIndex).width();
    var maxOffset = 0;

    imagesList.stop(true, true);
    slideWindow.stop(true, true);

    if (direction === "next") {
        var offset = imagesCollection.eq(newImgIndex - 1).width();
        slideWindow.animate({ 'width': frameWidth }, ANIMATION_DELAY_af);
        imagesList.animate({ 'margin-left': '-=' + offset }, ANIMATION_DELAY_af, function () {
            if (newImgIndex >= MAX_COUNT_IMG_ON_PAGE_af) {
                newImgIndex = 0;
                imageIndex_af.set(0);
                imagesList.css('margin-left', 0);
            }
        });
    } else if (direction === "prev") {
        if (newImgIndex < 0) {
            newImgIndex = MAX_COUNT_IMG_ON_PAGE_af - 1;
            imageIndex_af.set(MAX_COUNT_IMG_ON_PAGE_af - 1);
            maxOffset = function () {
                var result = 0;
                for (var _i3 = 1; _i3 < imagesCollection.length; _i3++) {
                    result += imagesCollection.eq(_i3).width();
                }
                return -result;
            }();
            imagesList.css('margin-left', maxOffset);
        }
        var _offset = imagesCollection.eq(newImgIndex).width();
        slideWindow.animate({ 'width': frameWidth }, ANIMATION_DELAY_af);
        imagesList.animate({ 'margin-left': '+=' + _offset }, ANIMATION_DELAY_af);
    }
    console.log(newImgIndex);

    highlightingPreviewImg(newImgIndex);
}

function highlightingPreviewImg(imgIndex) {
    var previewImagesCollection = $('.preview_images-element_af');
    previewImagesCollection.css('border-color', 'transparent');
    if (imgIndex === MAX_COUNT_IMG_ON_PAGE_af) {
        imgIndex = 0;
    }
    previewImagesCollection.eq(imgIndex).css('border-color', 'green');
}

function playSlideShow_af() {
    slideShowIntervalId_af = setInterval(function () {
        return setAnotherPicture_af("next");
    }, SLIDER_DELAY_af);
    $('.slide_show-pause_button_af').show();
    $('.slide_show-left_button_af, .slide_show-right_button_af, .slide_show-play_button_af').hide();
}

function pauseSlideShow_af() {
    clearInterval(slideShowIntervalId_af);
    $('.slide_show-pause_button_af').hide();
    $('.slide_show-left_button_af, .slide_show-right_button_af, .slide_show-play_button_af').show();
}

function initStartPicturesPage_af() {
    var pageId = document.getElementById("afPicturesPage");
    if (pageId) {
        var sourceArr = ["https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500", "https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500"];
        getFromUrl_af(sourceArr);
    }
}

var MAX_COUNT_IMG_ON_PAGE_af = 20;
var SLIDER_DELAY_af = 1000;
var ANIMATION_DELAY_af = 500;
var imageIndex_af = getImageIndex_af();
var slideShowIntervalId_af = void 0;
initStartPicturesPage_af();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES6 Script END//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
;
'use strict';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES5 Script////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

String.prototype.createPhone_af = function () {
    var tempArr = this.split('');
    var resultArr = [];
    for (var i = 0; i < tempArr.length; i++) {
        if (isNaN(Number(tempArr[i]))) {
            throw new Error("This string contain not only numbers");
        } else if (tempArr[i] === " ") {
            //To next iteration
        } else {
            resultArr.push(tempArr[i]);
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

function clearSiblings_af() {
    var cooperativeBlock = document.getElementById("cooperativeBlock_af");
    if (cooperativeBlock) {
        for (var i = 0; i < cooperativeBlock.children.length; i++) {
            cooperativeBlock.children[i].innerHTML = '';
            cooperativeBlock.children[i].style.display = "none";
        }
    }
}

/*==============================Hobbies Block========================================================================*/

function setHobbies_af() {
    var hobbies = ["Programming", "System Administration", "Electronics", "Modern Technologies", "Science", "Psychology", "Sport"];
    return hobbies;
}

function displayHobbies_af(arrHobbies) {
    var hobbiesList = document.getElementById('hobbiesList_af');
    for (var i = 0; i < arrHobbies.length; i++) {
        var tagLi = document.createElement('li');
        tagLi.className = "hobbies_list-li_af";
        tagLi.innerHTML = arrHobbies[i];
        if (hobbiesList) {
            hobbiesList.appendChild(tagLi);
        }
    }
}

/*==============================Hobbies Block END====================================================================*/

/*==============================News Block===========================================================================*/

function getNews_af(jsonFile) {
    var req = new XMLHttpRequest();
    req.open("GET", jsonFile, true);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var responce = JSON.parse(req.responseText);
                var content = responce.responseData.entries;
                return displayNews_af(content);
            } else {
                alert(req.status + ": " + req.statusText);
            }
        }
    };
    req.send(null);
}

function displayNews_af(arrNews) {
    var tagLi, tagH3, tagP, tagA;
    var newsList = document.getElementById("newsList_af");
    if (newsList) {
        clearSiblings_af();
        newsList.style.display = "block";
    }
    if (arrNews !== undefined && arrNews.length !== 0 && arrNews instanceof Array) {
        for (var i = 0; i < arrNews.length; i++) {
            tagLi = document.createElement('li');
            tagLi.className = "news_list-block_af";
            newsList.appendChild(tagLi);

            if (arrNews[i].title) {
                tagH3 = document.createElement('h3');
                tagH3.className = "news_list-block-title_af";
                tagH3.innerHTML = arrNews[i].title;
                newsList.children[i].appendChild(tagH3);
            }

            if (arrNews[i].contentSnippet) {
                tagP = document.createElement('p');
                tagP.className = "news_list-block-content_af";
                tagP.innerHTML = arrNews[i].contentSnippet;
                newsList.children[i].appendChild(tagP);
            }

            if (arrNews[i].link) {
                tagA = document.createElement('a');
                tagA.setAttribute('href', arrNews[i].link);
                tagA.className = "news_list-block-anchor_af";
                tagA.innerHTML = arrNews[i].link;
                newsList.children[i].appendChild(tagA);
            }
        }
    } else return false;
}

/*==============================News Block END======================================================================*/

/*==============================Items Block===========================================================================*/

function alertMessage_af(str, nextSibling) {
    var tagDiv = $('<div></div>').addClass('alert_af').text(str);
    $(nextSibling).before(tagDiv);

    setTimeout(function () {
        $(tagDiv).remove();
    }, 1500);
}

function displayItems_af() {
    var itemsList = $('#itemsList_af');
    for (var i = 0; i < localStorage.length; i++) {
        var tagLi = $('<li></li>').addClass('todo-list-li_af').text(localStorage.getItem(localStorage.key(i)));
        $(itemsList).append($(tagLi));
    }
    $(itemsList).sortable(); //All inside elements will be sortable using JQueryUI
}

function addInsertedItemValue_af(element, event) {
    var text = element.value;
    var form = $('#form_af');

    if (text.length > 0) {
        $('#itemsList_af').children('li').last().text(text);
    }

    if (event.which === 13) {
        if (text.length === 0) {
            alertMessage_af("Please insert Description!", $(form));
        } else if (text === localStorage.getItem(text)) {
            alertMessage_af("This item is already present! Please insert another Description", $(form));
        } else if (localStorage.length >= 30) {
            alertMessage_af("you can not add more than 30 items! Please clear previous items", $(form));
        } else {
            localStorage.setItem(text, text);
            $(element).val('');
        }
    }
}

function createItemsList_af() {
    var itemsList = $('#itemsList_af');
    if ($('#textForm_af').val().length === 0) {
        $(itemsList).append('<li></li>');
        $(itemsList).children('li').last().addClass('todo-list-li_af');
    }
}

$('#textForm_af').on('keyup', function (e) {
    addInsertedItemValue_af(this, e);
});

$('#textForm_af').on('keypress', function () {
    createItemsList_af();
});

$('#button_af').on('click', function () {
    var elem = document.getElementById('textForm_af');
    addInsertedItemValue_af(elem, { which: 13 });
});

$('#itemsList_af').on('dblclick', 'li', function () {
    localStorage.removeItem(this.innerHTML);
    $(this).remove();
});

/*==============================Items Block END======================================================================*/

/*==============================Users Block===========================================================================*/

function Users_af(usersSource) {
    this._allUsers = [];
}
Users_af.prototype = Object.create(Object.prototype);
Users_af.prototype.constructor = Users_af;

Users_af.prototype.generateUsers = function (url) {
    var self = this;
    var req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var responce = JSON.parse(req.responseText);
                self._allUsers = responce.results;
                callback_af();
            } else {
                alert(req.status + ": " + req.statusText);
            }
        }
    };
    req.send(null);
};

function SortedUsers_af(usersSource) {
    Users_af.apply(this, arguments);
    this._female = [];
    this._male = [];
}

SortedUsers_af.prototype = Object.create(Users_af.prototype);
SortedUsers_af.prototype.constructor = SortedUsers_af;

SortedUsers_af.prototype.sortUsersByGender = function () {
    var arrAllUsers = this._allUsers;
    if (arrAllUsers) {
        for (var i = 0; i < arrAllUsers.length; i++) {
            if (arrAllUsers[i].gender === 'female') {
                this._female.push(arrAllUsers[i]);
            } else if (arrAllUsers[i].gender === 'male') {
                this._male.push(arrAllUsers[i]);
            } else {
                console.log("Unknown gender detected!");
            }
        }
    } else {
        throw new Error("Empty users list. Please add their before using 'getSetUser(newUser)' or 'generateUsers(url)'");
    }
};

SortedUsers_af.prototype.getSetUser = function (newUser) {
    var self = this;
    if (arguments.length > 0) {
        addUser(newUser);
    } else if (arguments.length === 0 && this._allUsers === null) {
        throw new Error("Empty users list. Please add their before using 'getSetUser(newUser)' ");
    } else {
        return { "female": this._female, "male": this._male };
    }

    function addUser(objUser) {
        if (objUser.gender === 'female') {
            self._female.push(objUser);
        } else if (objUser.gender === 'male') {
            self._male.push(objUser);
        } else {
            console.log("Unknown gender detected!");
        }
    }
};

function DisplayedUsers_af(usersSource) {
    SortedUsers_af.apply(this, arguments);
}

DisplayedUsers_af.prototype = Object.create(SortedUsers_af.prototype);
DisplayedUsers_af.prototype.constructor = DisplayedUsers_af;

DisplayedUsers_af.prototype.display = function () {
    var usersForDisplay = this.getSetUser();
    var tagLi, tagH3, tagImg;
    var malesList = document.getElementById("males_af");
    var femalesList = document.getElementById("females_af");
    clearSiblings_af();
    malesList.style.display = "block";
    femalesList.style.display = "block";

    for (var i = 0; i < usersForDisplay.female.length; i++) {
        tagLi = document.createElement('li');
        tagLi.className = "some_peoples-block_af";
        femalesList.appendChild(tagLi);

        if (usersForDisplay.female[i].picture.medium) {
            tagImg = document.createElement('img');
            tagImg.className = "some_peoples-block-photo_af";
            tagImg.setAttribute("src", usersForDisplay.female[i].picture.medium);
            femalesList.children[i].appendChild(tagImg);
        }

        if (usersForDisplay.female[i].name.first) {
            tagH3 = document.createElement('h3');
            tagH3.className = "some_peoples-block-title_af";
            tagH3.innerHTML = usersForDisplay.female[i].name.first + " " + usersForDisplay.female[i].name.last;
            femalesList.children[i].appendChild(tagH3);
        }
    }
    for (var j = 0; j < usersForDisplay.male.length; j++) {
        tagLi = document.createElement('li');
        tagLi.className = "some_peoples-block_af";
        malesList.appendChild(tagLi);

        if (usersForDisplay.male[j].picture.medium) {
            tagImg = document.createElement('img');
            tagImg.className = "some_peoples-block-photo_af";
            tagImg.setAttribute("src", usersForDisplay.male[j].picture.medium);
            malesList.children[j].appendChild(tagImg);
        }

        if (usersForDisplay.male[j].name.first) {
            tagH3 = document.createElement('h3');
            tagH3.className = "some_peoples-block-title_af";
            tagH3.innerHTML = usersForDisplay.male[j].name.first + " " + usersForDisplay.male[j].name.last;
            malesList.children[j].appendChild(tagH3);
        }
    }
};

function displayUsersOnPage_af() {
    //This function is handler of "Some Peoples" button
    var newUsers = new DisplayedUsers_af();
    newUsers.generateUsers("http://api.randomuser.me/?results=10"); //AJAX Respond will call function callback
    //	console.dir(newUsers);

    window.callback_af = function () {
        newUsers.sortUsersByGender();
        newUsers.display();
    };
}

/*==============================Users Block END=======================================================================*/

/*==============================Initialization Page===================================================================*/
function initialStartMainPage_af() {
    var pageId = document.getElementById("afMainPage");
    if (pageId) {
        displayHobbies_af(setHobbies_af());
        getNews_af("news/news.json");
        displayItems_af();
    }
}

initialStartMainPage_af();

/*==============================Initialization Page End=============================================================*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES5 Script END//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';
///////////////////////////////////////////Homework 5//////////////////////////////////////////////////////////////
function loadNews_ai() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'news.json', true);
    xhr.send();
    var respText;
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            respText = xhr.responseText;
            newsDisplay_ai(respText);
            return respText;
        }
    };
    return respText;
}
loadNews_ai();

function newsDisplay_ai(respText) {
    var newLi;
    var resp = JSON.parse(respText);
    var blokNews = resp.responseData.entries;
    var list = document.getElementById('news_ai');
    var i;
    for (i = 0; i < blokNews.length; i++) {
        var ul = document.createElement('ul');
        list.appendChild(ul);
    }
    for (i = 0; i < blokNews.length; i++) {
        if (blokNews[i].title) {
            newLi = document.createElement('strong');
            newLi.innerHTML = blokNews[i].title;
            list.children[i].appendChild(newLi);
        }
    }
    for (i = 0; i < blokNews.length; i++) {
        if (blokNews[i].contentSnippet) {
            newLi = document.createElement('span');
            newLi.innerHTML = blokNews[i].contentSnippet;
            list.children[i].appendChild(newLi);
        }
    }
    for (i = 0; i < blokNews.length; i++) {
        if (blokNews[i].link) {
            newLi = document.createElement('a');
            newLi.innerHTML = blokNews[i].link;
            list.children[i].appendChild(newLi);
            newLi.setAttribute('href', 'index.html');
        }
    }
}

'use strict';
////////////////////////////////////Homework4/////////////////////////////////////////////////////////////////////////
// basic information hidden

function hiddenBasInfo_ai() {
    var title = document.getElementById('title');
    var list = document.getElementById('list');
    if (!list.style.display || list.style.display == "block") {
        list.style.display = "none";
    } else {
        list.style.display = "block";
    }
}

//add hobby list
function getHobby_ai() {
    var hobby = ["Компьютеры", "Программирование", "Web-дизайн", "IT", "Спорт", "Автомобили", "Мотоциклы"];
    return hobby;
}
getHobby_ai();

function addHobby_ai() {
    var ul = document.getElementById("hobbyList");
    var readyHobby = new getHobby_ai();
    for (var i = 0; i < readyHobby.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = readyHobby[i];
        if (ul) {
            ul.appendChild(li);
        }
    }
}
addHobby_ai();

//Hobby hidden onclick
function hiddenHobby_ai() {
    var ul = document.getElementById("hobbyList");
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
function deleteLi_ai() {
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
        return { "female": _this.female, "male": _this.male };
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
    } else {
        console.log("Unknown gender!");
    }
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

RespRequest_ai.prototype.responseRequest_ai = function (responce) {
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

OnDisplay_ai.prototype.usersOnDisplay_ai = function (thisUsers) {
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
            userEmail.setAttribute('href', 'index.html');
            divMale.appendChild(userEmail);

            hr = document.createElement('hr');
            divMale.appendChild(hr);
        } else if (people[i].gender == "female") {

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
            userEmail.setAttribute('href', 'index.html');
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

function pow(a, b) {

    var ab = a;
    var ac = b;
    return ab + ac;
}

var awdawd = 23;

;'use strict';
(function () {
    //Display hobbies	
    function displayHobbies_mu() {
        var div = document.getElementById("personal-data_mu");
        var pText;
        var p = document.createElement('p');
        pText = formHobbies_mu();
        p.innerHTML = pText;
        if (div) {
            div.appendChild(p);
        }
        return 1;
    }
    function formHobbies_mu() {
        var hobbies = ["literature", "bodybuilding", "art", "walking"];
        var pText = "Hobbies: ";
        for (var i = 0; i < hobbies.length; i++) {
            pText += hobbies[i] + ", ";
        }
        pText = pText.slice(0, pText.length - 2);
        return pText;
    }

    //Functions for news
    function displayNews_mu() {
        var response = null;
        response = newsRequest_mu();
        if (response != null) {
            putNewsOnPage_mu(response);
        } else {
            return false;
        }
    }

    function newsRequest_mu() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "news.json", false);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readeState != 4) return;
        };
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            return xhr.responseText;
        }
    }

    function putNewsOnPage_mu(responseText) {
        var response = JSON.parse(responseText);
        var news = response.responseData.entries;
        var column = document.getElementById("newsColumn_mu");
        var div;
        var obj;
        for (var i = 0; i < news.length; i++) {
            obj = news[i];
            div = formElement_mu();
            column.appendChild(div);
        }

        function formElement_mu() {
            var p;
            var a;
            var div = document.createElement("div");
            for (var key in obj) {
                if (key == "link") {
                    a = document.createElement("a");
                    a.href = obj[key];
                    a.innerHTML = "Read more";
                    div.appendChild(a);
                } else if (key != "url") {
                    p = document.createElement("p");
                    p.innerHTML = obj[key];
                    div.appendChild(p);
                }
            }
            p = document.createElement("p");
            div.appendChild(p);
            return div;
        }
    }
    //Work with Local Storage
    function addElementLSList_mu() {
        var keyLS = document.getElementById("keyLS_mu");
        var value = keyLS.value;
        var result = localStorage.getItem(value);
        if ((localStorage.length == 0 || result == null) && value != "") {
            addElementLS_mu();
            addElementList_mu();
        }

        function addElementLS_mu() {
            localStorage.setItem(value, value);
        }

        function addElementList_mu() {
            var li = document.createElement("li");
            var listLS = document.getElementById("listLS_mu");
            li.textContent = value;
            li.onclick = removeLi_mu;
            listLS.appendChild(li);
            keyLS.value = "";
            return "very nice";
        }
    }

    function removeLi_mu() {
        var _this = this;
        removeLiLS_mu();
        removeLiPage_mu();

        function removeLiLS_mu() {
            localStorage.removeItem(_this.textContent);
        }

        function removeLiPage_mu() {
            var listLS = document.getElementById("listLS_mu");
            listLS.removeChild(_this);
        }
    }

    function displayLS_mu() {
        var li = document.createElement("li");
        var value;
        if (value) {
            value = document.getElementById("keyLS_mu").value;
        }
        var listLS = document.getElementById("listLS_mu");
        for (var i = 0; i < localStorage.length; i++) {
            li.textContent = localStorage.key(i);
            li.onclick = removeLi_mu;
            listLS.appendChild(li);
            li = document.createElement("li");
        }
    }
    // Work with Users
    function Users_mu() {
        this._users = null;
    }
    Users_mu.prototype.getUsers = function (usersSource) {
        var response;

        response = this._usersRequest(usersSource);
        if ((typeof response === "undefined" ? "undefined" : _typeof(response)) != 'object') {
            alert('Didn"t get Users!');
        } else {
            this._users = response;
        }
    };
    Users_mu.prototype._usersRequest = function (source) {
        var XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        var responseObject;
        xhr.open('GET', source, false);
        xhr.onload = function () {
            responseObject = JSON.parse(this.responseText).results;
        };
        xhr.onerror = function () {
            alert('Ошибка ' + this.status);
            responseObject = null;
        };
        xhr.send();

        return responseObject;
    };

    function SexUsers_mu() {
        this._girls = [];
        this._boys = [];
        this._div = {};
        Users_mu.apply(this, arguments);
    }
    SexUsers_mu.prototype = Object.create(Users_mu.prototype);
    SexUsers_mu.prototype.constructor = SexUsers_mu;

    SexUsers_mu.prototype.sortUsers = function () {
        for (var i = 0; i < this._users.length; i++) {
            if (this._users[i].gender == 'male') {
                this._boys.push(this._users[i]);
            } else {
                this._girls.push(this._users[i]);
            }
        }
    };

    SexUsers_mu.prototype.getSetUsers = function (newUser) {
        var response;

        if (arguments.length > 0) {
            this._addUser(newUser);
        } else if (arguments.length == 0 && this._users == null) {
            alert('No users. Add them!');
        } else if (arguments.length == 0 && this._users.length > 0) {
            response = this._boys.slice(0);
            for (var i = 0; i < this._girls.length; i++) {
                response.push(this._girls[i]);
            }
            return response;
        }
    };

    SexUsers_mu.prototype._addUser = function (newUser) {
        this._users.push(newUser);
        if (newUser.gender == 'male') {
            this._boys.push(newUser);
        } else {
            this._girls.push(newUser);
        }
    };

    SexUsers_mu.prototype.display = function () {
        for (var i = 0; i < this._users.length; i++) {
            this._div = this._formElement(i);
            this._appendElement(this._div, i);
        }
    };

    SexUsers_mu.prototype._formElement = function (i) {
        var div;
        var img;
        var p;
        div = document.createElement("div");
        img = document.createElement("img");
        p = document.createElement("p");
        img.className = "img-responsive userImage_mu";
        img.src = this._users[i].picture.large;
        p.textContent = this._users[i].name.first + " " + this._users[i].name.last;
        div.appendChild(img);
        div.appendChild(p);
        return div;
    };

    SexUsers_mu.prototype._appendElement = function (div, i) {
        var maleUsers = document.getElementById("maleUsers_mu");
        var femaleUsers = document.getElementById("femaleUsers_mu");
        var friendsUsers = document.getElementById("friendsUsers_mu");
        if (this._users[i].gender == "male") {
            if (maleUsers) {
                maleUsers.appendChild(div);
            }
        } else {
            if (femaleUsers) {
                femaleUsers.appendChild(div);
            }
        }
        if (!(i % 4)) {
            div = div.cloneNode(true);
            if (friendsUsers) {
                friendsUsers.appendChild(div);
            }
        }
    };
    //HOMEWORK 9

    function PhoneError_mu(type) {
        this.name = "PhoneError";
        this.message = "Неправильный формат." + type;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor); // (*)
        } else {
            this.stack = new Error().stack;
        }
    }
    PhoneError_mu.prototype = Object.create(Error.prototype);
    PhoneError_mu.prototype.constructor = PhoneError_mu;

    String.prototype.createPhone_mu = function () {
        var i;
        var result = "";
        if (this.search(/\D/) != -1) {
            throw new PhoneError_mu("Вводите только цифры");
        }
        if (this.length != 10) {
            throw new PhoneError_mu("Цифр должно быть 10");
        }
        for (i = 0; i < this.length; i++) {
            if (i != 0 && !(i % 3)) {
                result += "-";
            }
            result += this[i];
        }
        return result;
    };

    try {
        var result = "1231231231".createPhone_mu(); //Пробуем здесь разные входные данные
        console.log(result);
    } catch (err) {
        if (err instanceof PhoneError_mu) {
            alert(err.message);
        } else {
            throw err;
        }
    }

    //main body///////////////
    function workWithUsers_mu() {
        var usersSource = "http://api.randomuser.me/?results=10";
        var users = new SexUsers_mu();
        users.getUsers(usersSource);
        users.sortUsers();
        users.display();
    }

    function workWithLS_mu() {
        var submitInputLS = document.getElementById("submitInputLS_mu");
        if (submitInputLS) {
            submitInputLS.addEventListener("click", addElementLSList_mu);
        }
        displayLS_mu();
    }

    workWithUsers_mu();
    workWithLS_mu();
    displayHobbies_mu();
    displayNews_mu();
})();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////(\/)(>,..,<)(\/)//////////////////SERGEY PIVEN ES5 START///////////////(\/)(>,..,<)(\/)//////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'use strict';
/////////////////////////////////////////HOMEWORK 4/////////////////////////////////////////////////////////////////////

var hobbiesInterests_sp = document.getElementById('hobbiesInterests_sp');
var hobbies_sp = ["IT", "Programming", "Medicine", "Video games", "DC Universe", "Marvel Universe", "Fantasy", "Science", "Science fiction", "Cars"];

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

    if ((typeof obj_sp === "undefined" ? "undefined" : _typeof(obj_sp)) == "object") {
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
    } else return false;
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
    var XHR_sp = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
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
            li_sp.innerHTML = _this_sp._people.results[i].name.title + " " + _this_sp._people.results[i].name.first + " " + _this_sp._people.results[i].name.last;
            malesList_sp.appendChild(li_sp);

            li_sp = document.createElement('li');
            li_sp.innerHTML = _this_sp._people.results[i].email;
            malesList_sp.appendChild(li_sp);

            li_sp = document.createElement('hr');
            malesList_sp.appendChild(li_sp);
        } else if (_this_sp._people.results[i].gender == "female") {
            li_sp = document.createElement('li');
            li_sp.innerHTML = _this_sp._people.results[i].name.title + " " + _this_sp._people.results[i].name.first + " " + _this_sp._people.results[i].name.last;
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////(\/)(>,..,<)(\/)//////////////////SERGEY PIVEN ES6 START///////////////(\/)(>,..,<)(\/)//////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'use strict';
/////////////////////////////////////////HOMEWORK 10,11/////////////////////////////////////////////////////////////////

var picturesDivUl_sp = $("#slides_sp");
var picturesDiv_sp = $("#pictures_sp");
var resultFromFirstLink_sp = void 0;
var resultFromSecondLink_sp = void 0;
var resultFromLinksWidth_sp = [];
var resultFromLinksWidthSum_sp = 0;
var counter_sp = 0;
var liToSliderUl_sp = void 0;
var imgToSliderLi_sp = void 0;
var intervalForSliderAutoPlay_sp = void 0;
var sliderAutoPlayOn_sp = false;

function getPicturesFromFirstLinkAjax_sp(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.responseText);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}

function getPicturesFromSecondLinkAjax_sp(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.responseText);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}

function callbackFirst_sp() {
    for (var _i4 = 0; _i4 < 10; _i4++) {
        resultFromLinksWidth_sp.push(resultFromFirstLink_sp.hits[_i4].webformatWidth);

        liToSliderUl_sp = document.createElement("li");
        imgToSliderLi_sp = document.createElement("img");
        imgToSliderLi_sp.src = resultFromFirstLink_sp.hits[_i4].webformatURL;
        liToSliderUl_sp.appendChild(imgToSliderLi_sp);
        picturesDivUl_sp.append(liToSliderUl_sp);
    }
}

function callbackSecond_sp() {
    for (var _i5 = 0; _i5 < 10; _i5++) {
        resultFromLinksWidth_sp.push(resultFromSecondLink_sp.hits[_i5].webformatWidth);

        liToSliderUl_sp = document.createElement("li");
        imgToSliderLi_sp = document.createElement("img");
        imgToSliderLi_sp.src = resultFromSecondLink_sp.hits[_i5].webformatURL;
        liToSliderUl_sp.appendChild(imgToSliderLi_sp);
        picturesDivUl_sp.append(liToSliderUl_sp);
    }
    for (var _i6 = 10; _i6 < resultFromSecondLink_sp.hits.length; _i6++) {
        if (resultFromSecondLink_sp.hits[_i6].webformatWidth == resultFromLinksWidth_sp[0]) {
            resultFromLinksWidth_sp.push(resultFromSecondLink_sp.hits[_i6].webformatWidth);
            liToSliderUl_sp = document.createElement("li");
            imgToSliderLi_sp = document.createElement("img");
            imgToSliderLi_sp.src = resultFromSecondLink_sp.hits[_i6].webformatURL;
            liToSliderUl_sp.appendChild(imgToSliderLi_sp);
            picturesDivUl_sp.append(liToSliderUl_sp);
            break;
        }
    }
    liToSliderUl_sp = document.createElement("li");
    imgToSliderLi_sp = document.createElement("img");
    imgToSliderLi_sp.src = resultFromFirstLink_sp.hits[0].webformatURL;
    liToSliderUl_sp.appendChild(imgToSliderLi_sp);
    picturesDivUl_sp.append(liToSliderUl_sp);

    for (var _i7 = 0; _i7 < resultFromLinksWidth_sp.length; _i7++) {
        resultFromLinksWidthSum_sp += resultFromLinksWidth_sp[_i7];
    }
}

getPicturesFromFirstLinkAjax_sp("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500").then(function (response) {
    resultFromFirstLink_sp = JSON.parse(response);
    callbackFirst_sp();
}, function (error) {
    return alert("Rejected: " + error);
});

getPicturesFromSecondLinkAjax_sp("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500").then(function (response) {
    resultFromSecondLink_sp = JSON.parse(response);
    callbackSecond_sp();
}, function (error) {
    return alert("Rejected: " + error);
});

$("#sliderRightButton_sp").on('click', function () {
    if (sliderAutoPlayOn_sp == true) {
        sliderAutoPlayOn_sp = false;
        $(".playAndStopButton_sp").css('background-color', '#cc0000');
        clearInterval(intervalForSliderAutoPlay_sp);
    }
    picturesDiv_sp.animate({ 'width': resultFromLinksWidth_sp[counter_sp + 1] }, 1000);
    picturesDivUl_sp.animate({ 'margin-left': '-=' + resultFromLinksWidth_sp[counter_sp] }, 1000, function () {
        if (++counter_sp == resultFromLinksWidth_sp.length) {
            counter_sp = 0;
            picturesDivUl_sp.css('margin-left', 0);
        }
    });
});

$("#sliderLeftButton_sp").on('click', function () {
    if (sliderAutoPlayOn_sp == true) {
        sliderAutoPlayOn_sp = false;
        $(".playAndStopButton_sp").css('background-color', '#cc0000');
        clearInterval(intervalForSliderAutoPlay_sp);
    }
    counter_sp--;
    if (counter_sp == -1) {
        counter_sp = 21;
        picturesDivUl_sp.css('margin-left', -resultFromLinksWidthSum_sp);
        counter_sp--;
    }
    picturesDiv_sp.animate({ 'width': resultFromLinksWidth_sp[counter_sp] }, 1000);
    picturesDivUl_sp.animate({ 'margin-left': '+=' + resultFromLinksWidth_sp[counter_sp] }, 1000);
});

$("#playAndStopButton_sp").on('click', function () {
    if (sliderAutoPlayOn_sp == false) {
        sliderAutoPlayOn_sp = true;
        $(".playAndStopButton_sp").css('background-color', '#00CC66');
        intervalForSliderAutoPlay_sp = setInterval(function () {
            picturesDiv_sp.animate({ 'width': resultFromLinksWidth_sp[counter_sp + 1] }, 1000);
            picturesDivUl_sp.animate({ 'margin-left': '-=' + resultFromLinksWidth_sp[counter_sp] }, 1000, function () {
                if (++counter_sp == resultFromLinksWidth_sp.length) {
                    counter_sp = 0;
                    picturesDivUl_sp.css('margin-left', 0);
                }
            });
        }, 1500);
    } else {
        sliderAutoPlayOn_sp = false;
        $(".playAndStopButton_sp").css('background-color', '#cc0000');
        clearInterval(intervalForSliderAutoPlay_sp);
    }
});

////////////////////////////////////////END OF HOMEWORK 10,11///////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////(\/)(>,..,<)(\/)//////////////////SERGEY PIVEN ES6 END///////////////(\/)(>,..,<)(\/)////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
;'use strict';

var xhr = new XMLHttpRequest();
xhr.open("GET", "news.json", false);
xhr.send();

if (xhr.status != 200) {
    alert(xhr.status + " " + xhr.statusText);
} else {
    var result = JSON.parse(xhr.responseText);
}

function createNews(result) {
    if (result) {
        var data = result.responseData.entries;
        var newsTag = document.getElementById('news');
        if (newsTag) {
            for (var i = 0; i < data.length; i++) {
                var ul = newsTag.appendChild(document.createElement('ul'));
                ul.className = "list-group";

                var liTitle = ul.appendChild(document.createElement('li'));
                liTitle.className = "list-group-item";
                var aTitle = liTitle.appendChild(document.createElement('a'));
                aTitle.href = data[i].url;
                aTitle.innerHTML = data[i].title;

                var liContent = ul.appendChild(document.createElement('li'));
                liContent.className = "list-group-item";
                liContent.innerHTML = data[i].contentSnippet;

                var liLink = ul.appendChild(document.createElement('li'));
                liLink.className = "list-group-item";
                var aLink = liLink.appendChild(document.createElement('a'));
                aLink.href = data[i].link;
                aLink.innerHTML = data[i].link;
            }
        }
        return true;
    } else return false;
}

createNews(result);

'use strict';

var hobbySerhiiKravchenko = ["Плавать", "Стрелять с арбалета", "Нюхать цветы", "Летать на драконах"];

function createHobbyList(list) {
    if (list) {
        var hobbyIdTag = document.getElementById('hobby');
        if (hobbyIdTag) {
            for (var i = 0; i < list.length; i++) {
                if (i != list.length - 1) {
                    hobbyIdTag.appendChild(document.createTextNode(list[i] + ", "));
                } else {
                    hobbyIdTag.appendChild(document.createTextNode(list[i] + "."));
                }
            }
        }
        return true;
    } else return false;
}

createHobbyList(hobbySerhiiKravchenko);

;'use strict';
function createListToDo() {
    if (localStorage.length !== 0) {
        for (var key in localStorage) {
            var dataStorage = localStorage.getItem(key);
            var ulToDo = document.getElementById('toDoItem');
            var newLi = document.createElement('li');
            newLi.className = "list-group-item";
            newLi.setAttribute("onclick", "delLi(this);");
            newLi.innerHTML = dataStorage;
            ulToDo.appendChild(newLi);
        }
    }
}

function delLi(text) {
    localStorage.removeItem(text.innerHTML);
    var ulToDo = document.getElementById('toDoItem');
    ulToDo.removeChild(text);
}

function addLi() {
    var enteredText = document.getElementById('enteredText').value;
    if (enteredText) {
        var ulToDo = document.getElementById('toDoItem');
        var newLi = document.createElement('li');
        newLi.className = "list-group-item";
        newLi.setAttribute("onclick", "delLi(this);");
        newLi.innerHTML = enteredText;
        var result = localStorage.getItem(enteredText);
        if (localStorage.length === 0 || result === null) {
            localStorage.setItem(enteredText, enteredText);
            ulToDo.appendChild(newLi);
            document.getElementById('enteredText').value = "";
        }
    } else alert("Enter text please");
}

createListToDo();

'use strict';
function Users() {
    this.usersData = {};
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
            this.males.push(this.users[i]);
        } else if (this.users[i].gender == "female") {
            this.females.push(this.users[i]);
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

String.prototype.phoneParser = function () {
    var count = 0;
    var result = "";
    for (var i = 0; i < this.length; i++) {
        if (count % 3 == 0 && count !== 0) {
            result += "-";
        }
        if (!isNaN(this)) {
            count++;
            result += this[i];
        } else {
            return "Неправильный формат";
        }
    }
    return result;
};

var result = "9873216549".phoneParser();

console.log(result); //987-321-654-9

var result1 = "9873216549nnn".phoneParser();

console.log(result1); // Error: Неправильный формат