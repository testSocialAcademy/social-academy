
///LOCAL STORAGE--------------------------------

;'use strict';


function locStorStart_IN() {
    var text = document.getElementById("toDoList");
    for ( var i = 0; i < localStorage.length; i++) {


        var newLi;
        var locStor = localStorage.getItem(localStorage.key(i));  //Достаем из localStorage ключ по очереди, используя
        //текущее значение i

        newLi = document.createElement("li");
        newLi.setAttribute("class", "list-group-item ");

        /* newLi.setAttribute("onclick",   "this.parentNode.removeChild(this);" );*/

        newLi.setAttribute("onclick", "locStorDel_IN(this)");

        /*newLi.setAttribute("name",  "i");*/

        newLi.innerHTML = locStor;
        text.appendChild(newLi);


    }
}
locStorStart_IN();

function locStorDel_IN(param) {

    if(localStorage) {

        a =  localStorage.getItem(param.innerHTML);

        localStorage.removeItem(a);



        param.parentNode.removeChild(param);    //удаляет ребенка ul => li со значением this из
    }                                       // newLi.setAttribute("onclick",  "locStorDel(this)" );

    return true;

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

}




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
    var resp = resp1.responseData.entries;


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

//----------------  HOmework 8 ----

//------------------------------ Users

function Users_IN() {

    var _this = this;
    this.findUsers_IN = undefined;

    this.response_IN = function (UsersLink) {
        var resp;

        resp = this.ajaxResp_IN(UsersLink);

        if (resp == undefined) {
            alert("Can't find Users")
        }
        else {
            _this.findUsers_IN = resp;
            console.log(0 + "  " + resp);
            return _this.findUsers_IN;
        }
    };

    //AJAX запрос с аргументом--------
    this.ajaxResp_IN = function (UsersLink) {
        /*  function ajaxResp_IN (UsersLink) {*/

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
        /*console.log(resp);*/
        return resp;
    }
}


//--------------сортировка
function UsersSecond_IN () {

    var _this = this;
    var men = [];
    var women = [];
    var friends = [];
    var genderUsers = this.findUsers_IN;
    this.men_IN = men;
    this.women_IN = women;
    this.friends = friends;
    byGender_IN();

    // Сортировка по полам
    function byGender_IN() {
        for (var i = 0; i < genderUsers.length; i++) {
            if (genderUsers.gender == "male") {
                men.push(genderUsers[i]);
            }
            else {
                women.push(genderUsers[i]);
            }


        }
    }

    //геттер на добавку людей
    this.getterSettter_IN = function (newUser) {
        _this.newUser = newUser;
        if (arguments.length > 0) {
            this.addUser_IN(newUser);
        }

        else if (arguments.length == 0) {

            return genderUsers;
        }

    };

    //сама добавка людей
    this.addUser_IN = function (newUser) {

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
    Users_IN.apply(this, arguments);

//вывод на страницу
    this.display_IN = function () {

        var users = this.getterSettter_IN();
        var ul;
        for (var i = 0; i < users.length; i++) {
            ul = createList_IN(i);
            appendPeople_IN(ul, i);
        }

        function createList_IN(i) {
            var ul;
            var li;
            var img;
            ul = document.createElement("ul");
            li = document.createElement("li");
            li.setAttribute("class", "list-group-item pull-right ");
            img = document.createElement("img");
            img.className = "img-responsive ";
            img.src = users[i].picture.thumbnail;
            li.textContent = users[i].name.first + " " + users[i].name.last;
            ul.setAttribute("class", "list-group-item ");
            ul.appendChild(li);
            ul.appendChild(img);
            return ul;
        }

        function appendPeople_IN(ul, i) {
            var men1 = document.getElementById("Men");
            var women1 = document.getElementById("Women");
            var friendsUsers = document.getElementById("friendsUsers");
            if (users[i].gender == "male") {
                men1.appendChild(ul);
            }
            else if (users[i].gender == "female") {
                women1.appendChild(ul);
            }
            else if (friends) {

                friendsUsers.appendChild(ul);


            }

        }

    };
    console.log(friends);


}


function startUsers_IN() {

    var UsersLink = "http://api.randomuser.me/?results=10";
    var start_IN = new Users_IN();
    UsersSecond_IN.prototype = start_IN;
    start_IN.response_IN(UsersLink);
    var usersSecond_IN = new UsersSecond_IN();
    usersSecond_IN.display_IN();
    /* display_IN.prototype = usersSecond_IN;
     var displayUsers_IN = new display_IN;*/
    /* usersSecond_IN.getterSettter_IN("Vasya");
     usersSecond_IN.getterSettter_IN("Vasya1");*/

}

startUsers_IN();
Ajax_IN();
hobbyAdd_IN();



//----------------------------------------- IMAGES
/*

(function( $ ) {
    $.fn.slideshow = function( options ) {
        options = $.extend({
            wrapper: ".slider-wrapper",
            slides: ".slide",
            previous: ".slider-previous",
            next: ".slider-next",
            //...
            speed: 500,
            easing: "linear"
        }, options);

        var slideTo = function( slide, element ) {
            var $currentSlide = $( options.slides, element ).eq( slide );

            $( options.wrapper, element ).
            animate({
                left: - $currentSlide.position().left
            }, options.speed, options.easing );

        };

        return this.each(function() {
            var $element = $( this ),
                $previous = $( options.previous, $element ),
                $next = $( options.next, $element ),
                index = 0,
                total = $( options.slides ).length;

            $next.on( "click", function() {
                index++;
                $previous.show();

                if( index == total - 1 ) {
                    index = total - 1;
                    $next.hide();
                }

                slideTo( index, $element );

            });

            $previous.on( "click", function() {
                index--;
                $next.show();

                if( index == 0 ) {
                    index = 0;
                    $previous.hide();
                }

                slideTo( index, $element );

            });


        });
    };

})( jQuery );*/
//--------------  10

function  promiseAjax_IN (url) {
    var resp = null;
    return new Promise (function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (this.status == 200) {
                resp = JSON.parse(xhr.responseText).results;
                resolve(this.response);
                return resp;
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
        return resp;
    });

}


promiseAjax_IN("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=red+flowers&min_height=500")
    .then(
        response => {
            console.log(`----  Fulfilled  ------: ${response}`);
            var user = JSON.parse(response);
            console.log(`----  Fulfilled 22 ------: ${user}`);
            return user;
        })
.then(user => {
    console.log(`----  USER ------: ${user}`);
});


/* error => console.log(`----- Rejected ------- : ${error}`)*/
/*var secondResp = promiseAjax1_IN("https://pixabay.com/api/?key=2980920-46f1aa264b036ffc6e45ebad0&orientation=vertical&q=yellow+flowers&min_height=500");*/