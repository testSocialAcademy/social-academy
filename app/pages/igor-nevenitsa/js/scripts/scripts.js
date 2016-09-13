//---------------------------------------------------------------------------------------------------
//-------------------------------            IGOR N       -------------------------------------------
//---------------------------------------------------------------------------------------------------


///LOCAL STORAGE--------------------------------

;'use strict';

/*





function reset() {
    $("#toDo").val("");
}


function addItem_IN() {
    var text = document.getElementById("toDoList");
    var form = document.getElementById("toDo").value;
    var newLi = document.createElement("li");

    newLi.innerHTML = form;

    newLi.setAttribute("class", "list-group-item");
    newLi.setAttribute("onclick",  "locStorDel_IN(this)" );

    localStorage.setItem(form, form);

    text.appendChild(newLi);

    return form;

}*/


function locStorStart_IN() {
    var text = document.getElementById("toDoList_second");


    for ( var i = 0; i < localStorage.length; i++) {

        var newLi;
        var locStor = localStorage.getItem(localStorage.key(i));  //Достаем из localStorage ключ по очереди, используя
        //текущее значение i
        newLi = document.createElement("li");
        newLi.setAttribute("class", "list-group-item ");
        newLi.setAttribute("onclick", "locStorDel_IN(this)");
        newLi.innerHTML = locStor;
        text.appendChild(newLi);
    }
}


function locStorDel_IN(param) {

    if(localStorage) {

        a =  localStorage.getItem(param.innerHTML);

        localStorage.removeItem(a);

        param.parentNode.removeChild(param);    //удаляет ребенка ul => li со значением this из
    }                                       // newLi.setAttribute("onclick",  "locStorDel(this)" );
    return true;
}

$(document).ready(function() {
    $('#toDoList_second').sortable();
function appendText_IN(elem, event) {
    var txt = elem.value;
    if(txt.length > 0) {
        $('#toDoList_second li:last-child').text(txt).attr("onclick", "locStorDel_IN(this)");

    }
    if (event.which === 13){
        localStorage.setItem(txt, txt);
        $(elem).val('');

    }
}

function buildLi_IN() {
    if($('#toDo').val().length === 0) {
        $('#toDoList_second').append('<li></li>').addClass("list-group-item");
}}

$('#toDo').on('keypress', function () {
    buildLi_IN();
    });

    $('#toDo').on('keyup', function (ev) {
        appendText_IN(this, ev);
    });



});
//--------------------- HMW 12 ----------
/*

function valueHandler (itsThis, elem) {
    var message = itsThis.value;
    var toDoList = document.getElementById("toDoList_second");

    $('#toDoList li:last-child').text(message);


    let text = document.getElementById("toDoList");
    let form = document.getElementById("toDo").value;
    let newLi = document.createElement("li");

    /!*newLi.innerHTML = form;*!/

    newLi.setAttribute("class", "list-group-item");
    newLi.setAttribute("onclick",  "locStorDel_IN(this)" );

    localStorage.setItem(form, form);

    text.appendChild(newLi);
}

function createList() {
    if ($('#toDo').val().length === 0) {
        $('#toDoList_second').append('<li class="list-group-item"></li>');
    }

}
$('#toDo').on('keyup', function (elem) {
    valueHandler(this, elem);
});

$('#toDo').on('keypress', function () {
    createList();
});


/!*
var text1 = document.getElementById("toDoList");
var newLi1 = document.createElement("li");

$('#toDo').keypress(function(){
    var formVal = $('#toDo').val();
    });*!/
*/

////------





////HObby-------------------------

function divText_IN() {

    var a = ['Coding', 'Investing', 'Golf'];

    return a;
}

function hobbyAdd_IN () {

    var a = divText_IN();
    var b = document.getElementById('hobby');

    for (var i = 0; i < a.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = a[i];

        if (b)
        {  b.appendChild(li); }
    }
    b.style.background = 'lightblue';
}


///NEWS---------------------------

function Ajax_IN() {

    var xhr_IN = new XMLHttpRequest();

    xhr_IN.open("GET", "news.json", false);

    xhr_IN.send();

    xhr_IN.onreadystatechange = function () {
        if (xhr_IN.readyState != 4) return;
    };

    if (xhr_IN.status != 200) {
        alert(xhr_IN.status + ": " + xhr_IN.statusText);
    }


    var newLi;
    var resp1 = JSON.parse(xhr_IN.responseText);
    console.log(resp1);
    var resp = resp1.responseData.entries;
    console.log( resp);


    for (var i = 0; i < resp.length; i++) {
        var ul = document.createElement('ul');
        myList.appendChild(ul);
        ul.setAttribute("class", " list-group-item  ");
    }

    for (i = 0; i < resp.length; i++) {
        if (resp[i].title) {
            newLi = document.createElement("li");
            newLi.innerHTML = resp[i].title;
            newLi.setAttribute("class", "list-group-item ");
            myList.children[i].appendChild(newLi);
        }
    }

    for (i = 0; i < resp.length; i++) {
        if (resp[i].contentSnippet) {
            newLi = document.createElement("li");
            newLi.innerHTML = resp[i].contentSnippet;
            newLi.setAttribute("class", "list-group-item ");
            myList.children[i].appendChild(newLi);
        }
    }

    for (i = 0; i < resp.length; i++) {
        if (resp[i].link) {
            var link = document.createElement("a");
            link.setAttribute("href", resp[i].link);
            link.innerHTML = resp[i].link;
            newLi = document.createElement("li");
            newLi.innerHTML = "";
            newLi.setAttribute("class", "list-group-item ");
            myList.children[i].appendChild(newLi);
            myList.children[i].lastChild.appendChild(link);
        }
    }
}


function Users_IN() {

    var _this = this;
    this.findUsers_IN = null;

    console.log(this.findUsers_IN + "  1");
}

    Users_IN.prototype.response_IN = function (UsersLink) {
        var resp;

        resp = this.ajaxResp_IN(UsersLink);

        if (resp == undefined) {
            alert("Can't find Users")
        }
        else {
            this.findUsers_IN = resp;
            console.log(0 + "  " + resp);

        }

    };

    //AJAX запрос с аргументом--------
    Users_IN.prototype.ajaxResp_IN = function (UsersLink) {
        var XHR_IN = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr_IN = new XHR_IN();
        var resp = null;

        xhr_IN.open("GET", UsersLink, false);
        xhr_IN.send();
        xhr_IN.onreadystatechange = function ()
        {
            if (xhr_IN.readyState != 4) return;
        };
        if (xhr_IN.status != 200) {
            console.log(xhr_IN.status + ': ' + xhr_IN.statusText);
        } else {
            console.log("ok");
        }

        xhr_IN.onload = function() {
            resp = JSON.parse(xhr_IN.responseText).results;

        };
        if (resp == null) {
            resp = JSON.parse(xhr_IN.responseText).results;
        }

        return resp;
    };



//--------------сортировка
function UsersSecond_IN () {

    var men = [];
    var women = [];
    var friends = [];
    this.men_IN = men;
    this.women_IN = women;
    this.friends = friends;
    Users_IN.apply(this, arguments);
}

    UsersSecond_IN.prototype = Object.create(Users_IN.prototype);
    UsersSecond_IN.prototype.constructor = UsersSecond_IN;

   // Сортировка по полам
    UsersSecond_IN.prototype.byGender_IN = function() {
        for (var i = 0; i < this.findUsers_IN.length; i++) {
            if (this.findUsers_IN.gender == "male") {
                men.push(this.findUsers_IN[i]);
            }
            else {
                women.push(this.findUsers_IN[i]);
            }
        }
    };

    //геттер на добавку людей
UsersSecond_IN.prototype.getterSettter_IN = function (newUser) {
        /*this.newUser = newUser;*/
        if (arguments.length > 0) {
            this.addUser_IN(newUser);
        }

        else if (arguments.length == 0) {

            return genderUsers;
        }

    };

    //сама добавка людей
UsersSecond_IN.prototype.addUser_IN = function (newUser) {

        if (newUser.gender != female && newUser.gender != male) {
            friends.push(newUser);
            return genderUsers;
        }
        else if (newUser.gender == female) {
            women.push(newUser);
            return genderUsers;
        }
        else if (newUser.gender == male) {
            women.push(newUser);
            return genderUsers;
        }
    };
    /**/

//вывод на страницу
UsersSecond_IN.prototype.display_IN = function () {

    for (var i = 0; i < this.findUsers_IN.length; i++) {
       this.ul = this.createList_IN(i);
        this.appendPeople_IN(this.ul, i);
    }
};

    UsersSecond_IN.prototype.createList_IN = function (i) {
            var ul;
            var li;
            var img;
            ul = document.createElement("ul");
            li = document.createElement("li");
            li.setAttribute("class", "list-group-item pull-right ");
            img = document.createElement("img");
            img.className = "img-responsive ";
            img.src = this.findUsers_IN[i].picture.thumbnail;
            li.textContent = this.findUsers_IN[i].name.first + " " + this.findUsers_IN[i].name.last;
            ul.setAttribute("class", "list-group-item ");
            ul.appendChild(li);
            ul.appendChild(img);

            return ul;
        };

UsersSecond_IN.prototype.appendPeople_IN = function (ul, i) {
            var men1 = document.getElementById("Men");
            var women1 = document.getElementById("Women");
            var friendsUsers = document.getElementById("friendsUsers");
            if (this.findUsers_IN[i].gender == "male") {
                men1.appendChild(ul);

            }
            else if (this.findUsers_IN[i].gender == "female") {
                women1.appendChild(ul);
            }
            else if (friends) {

                friendsUsers.appendChild(ul);
            }
        };

function startUsers_IN() {

    var UsersLink = "http://api.randomuser.me/?results=10";
    var start_IN = new UsersSecond_IN();

    /*var friendsMy = {
        gender: "female",
        name: {
            first: "Jina",
            last: "Alanee",
                },
        picture: {
            thumbnail: "http://xyya.net/uploads/posts/2013-05/thumbs/1368796510_09872_pic_038_122_522lo.jpg"
        }
    };

    var str = JSON.stringify(friendsMy);
    var str1 = JSON.parse(str);
    console.log(str1);
    start_IN.addUser_IN(str1);*/

    start_IN.response_IN(UsersLink);
    start_IN.display_IN();
}

//------------------ IMAGES  HOMEWORK 10 ------------------------------------


//--------------  10


function  promiseAjax_IN (url) {
    var images;
    return new Promise (function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                images = JSON.parse(xhr.responseText);
                console.log(images);

                resolve(images);
            }
            else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror - function () {
            reject(new error("Net Error, first Ajax"));
        };
        xhr.send();
    });
}


promiseAjax_IN("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500")
    .then(
        images => {
            console.log(`----  USER ------: ${images}`);
            var images1 = images.hits;
            console.log(`----  USER ------: ${images1}`);
            for (let i=0; i < 10; i++) {
                if (images1[i].webformatURL) {
                    console.log(images1[4].webformatURL);
                }
            }
            return images1;
        })
    .then(images1 => {
        addPictures_IN(images1);

    })
    .catch(error => {
        console.log(error); // Error: Not Found
    });
//=== second ajax

function promiseAjax_1_IN(url) {
    var images;
    return new Promise (function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                images = JSON.parse(xhr.responseText);
                console.log(images);

                resolve(images);
            }
            else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror - function () {
            reject(new error("Net Error, first Ajax"));
        };
        xhr.send();
    });
}

promiseAjax_1_IN("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500")
    .then(
        images => {
            console.log(`----  USER ------: ${images}`);
            var images2 = images.hits;
            console.log(`----  USER ------: ${images2}`);
            for (let i=0; i < 10; i++) {
                if (images2[i].webformatURL) {
                    console.log(images2[1].webformatURL);
                }
            }
            return images2;
        })
    .then(images2 => {
        addPictures_IN(images2);

    })
    .catch(error => {
        console.log(error); // Error: Not Found
    });

//========


function addPictures_IN (img) {

    let slidesWrapper = document.getElementById("slidesWrapper_IN");
    console.log(slidesWrapper);
    var images = img;
    /* var div = document.createElement('div');
     slidesWrapper.appendChild(div);*/
    for (let i = 0; i < 10; i++) {
        if (images[i].webformatURL) {
            img = document.createElement("img");
            img.src = images[i].webformatURL;
            slidesWrapper.appendChild(img);

        }
        //проверка загрузи всех картинок и запуск слайдера
        if (document.querySelectorAll('img').length == 20) {
            img.onload = function () {
                main_IN();
            };
            img.onerror = function () {
                alert("Ошибка " + this.src)
            };
        }
        console.log("Картинки загружены   " + new Date());

    }
}


//-----------------


function main_IN() {

    console.log("main Загружен   " + new Date());



    var globals_in = {

        slideDelay: 4000,
        fadeDelay: 35,
        wrapperID: "slidesWrapper_IN",
        buttonID: "slideShowButton_IN",
        buttonStartText: "Start Slides",
        buttonStopText: "Stop Slides",
        wrapperObject:  document.getElementById("slidesWrapper_IN"),
        buttonObject: document.getElementById("slideShowButton_IN"),
        slideImages: document.querySelectorAll('img'),
        slideShowID: null,
        slideShowRunning: true,
        slideIndex: 0,
    };
    console.log(globals_in.slideImages + "  slideImages");



    /*initializeGlobals_IN();*/
    if (insufficientSlideShowMarkup_IN()) {
        return alert("error");
    } //проверка разметки


    if (globals_in.slideImages.length == 1) {
        return;
    }


    initializeSlideShowMarkup_IN(); //подготовка разметки

    globals_in.wrapperObject.addEventListener('click', toggleSlideShow_IN, false); //Отключение слайдшоу

    if (globals_in.buttonObject) {
        globals_in.buttonObject.addEventListener('click', toggleSlideShow_IN, false);
    }

    startSlideShow_IN();


//проверка разметки
    function insufficientSlideShowMarkup_IN() {
        if (!globals_in.wrapperObject) {
            if (globals_in.buttonObject) {
                globals_in.buttonObject.style.display = "none";
            }
            return true;
        }

        if (!globals_in.slideImages.length) {
            if (globals_in.wrapperObject) {
                globals_in.wrapperObject.style.display = "none";
            }

            if (globals_in.buttonObject) {
                globals_in.buttonObject.style.display = "none";
            }

            return true;
        }

        return false;
    }


//подготовка разметки
    function initializeSlideShowMarkup_IN() {
        var slideWidthMax = maxSlideWidth_IN();
        var slideHeightMax = maxSlideHeight_IN();

        globals_in.wrapperObject.style.position = "relative";
        globals_in.wrapperObject.style.overflow = "hidden";
        globals_in.wrapperObject.style.width = slideWidthMax + "px";
        globals_in.wrapperObject.style.height = slideHeightMax + "px";

        var slideCount = globals_in.slideImages.length;
        console.log(slideCount);
        for (var i = 0; i < slideCount; i++) {
            globals_in.slideImages[i].style.opacity = 0;
            globals_in.slideImages[i].style.position = "absolute";
            globals_in.slideImages[i].style.top = (slideHeightMax - globals_in.slideImages[i].getBoundingClientRect().height) / 2 + "px";
            globals_in.slideImages[i].style.left = (slideWidthMax - globals_in.slideImages[i].getBoundingClientRect().width) / 2 + "px";
            //выталкивание меньших изображений из угла
        }

        globals_in.slideImages[0].style.opacity = 1;

        if (globals_in.buttonObject) {
            globals_in.buttonObject.textContent = globals_in.buttonStopText;
        }
    }


// вычисление наибольших размеров слайдов

    function maxSlideWidth_IN() {
        var maxWidth = 0;
        let maxSlideIndex = 0;
        let slideCount = globals_in.slideImages.length;

        for (var i = 0; i < slideCount; i++) {
            if (globals_in.slideImages[i].width > maxWidth) {
                maxWidth = globals_in.slideImages[i].width;
                maxSlideIndex = i;
            }
        }

        return globals_in.slideImages[maxSlideIndex].getBoundingClientRect().width;
    }

    function maxSlideHeight_IN() {
        var maxHeight = 0;
        let maxSlideIndex = 0;
        let slideCount = globals_in.slideImages.length;

        for (var i = 0; i < slideCount; i++) {
            if (globals_in.slideImages[i].width > maxHeight) {
                maxHeight = globals_in.slideImages[i].height;
                maxSlideIndex = i;
            }
        }

        return globals_in.slideImages[maxSlideIndex].getBoundingClientRect().height;
    }


    function startSlideShow_IN() {
        globals_in.slideShowID = setInterval(transitionSlides_IN, globals_in.slideDelay);
    }

    function haltSlideShow_IN() {
        clearInterval(globals_in.slideShowID);
    }

    function toggleSlideShow_IN() {
        if (globals_in.slideShowRunning) {
            haltSlideShow_IN();
            if (globals_in.buttonObject) {
                globals_in.buttonObject.textContent = globals_in.buttonStartText;
            }
        }
        else {
            startSlideShow_IN();
            if (globals_in.buttonObject) {
                globals_in.buttonObject.textContent = globals_in.buttonStopText;
            }
        }
        globals_in.slideShowRunning = !(globals_in.slideShowRunning);
    }


    globals_in.wrapperObject.addEventListener('click', toggleSlideShow_IN, false);

    if (globals_in.buttonObject) {
        globals_in.buttonObject.addEventListener('click', toggleSlideShow_IN, false);
    }

    function transitionSlides_IN() {
        var currentSlide = globals_in.slideImages[globals_in.slideIndex];

        ++(globals_in.slideIndex);
        if (globals_in.slideIndex >= globals_in.slideImages.length) {
            globals_in.slideIndex = 0;
        }

        var nextSlide = globals_in.slideImages[globals_in.slideIndex];

        var currentSlideOpacity = 1;
        var nextSlideOpacity = 0;
        var opacityLevelIncrement = 1 / globals_in.fadeDelay;
        var fadeActiveSlidesID = setInterval(fadeActiveSlides, globals_in.fadeDelay);

        function fadeActiveSlides() {
            currentSlideOpacity -= opacityLevelIncrement;
            nextSlideOpacity += opacityLevelIncrement;

            console.log(currentSlideOpacity + nextSlideOpacity);

            if (currentSlideOpacity >= 0 && nextSlideOpacity <= 1) {
                currentSlide.style.opacity = currentSlideOpacity;
                nextSlide.style.opacity = nextSlideOpacity;
            }
            else {
                currentSlide.style.opacity = 0;
                nextSlide.style.opacity = 1;
                clearInterval(fadeActiveSlidesID);
            }
        }
    }

}



locStorStart_IN();
startUsers_IN();
Ajax_IN();
hobbyAdd_IN();





//---------------------------------------------------------------------------------------------------
//-------------------------------            IGOR N       -------------------------------------------
//----------------------------------------     END  -------------------------------------------------