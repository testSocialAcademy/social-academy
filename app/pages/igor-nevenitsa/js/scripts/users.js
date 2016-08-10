
    //----------------  get


    //------------------------------ Users

    function Users() {

        var _this = this;
        this.findUsers = undefined;

        this.response = function (UsersLink) {
            var resp;

            resp = ajaxResp(UsersLink);

            if (resp == undefined) {
                alert("Can't find Users")
            }
            else {
                _this.findUsers = resp;
                console.log(0 + "  " + resp);
                return _this.findUsers;
            }
        };

        //AJAX запрос с аргументом--------
       function ajaxResp (UsersLink) {

            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            var xhr = new XHR();
            var resp = null;

            xhr.open("GET", UsersLink, false);
            xhr.send();
            xhr.onreadystatechange = function ()
            {
            if (xhr.readyState != 4) return;
            };
         if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
         } else {
            console.log("ok");
          }

           xhr.onload = function() {
            resp = JSON.parse(xhr.responseText).results;
            };
            if (resp == null) {
            resp = JSON.parse(xhr.responseText).results;
        }
        /*console.log(resp);*/
        return resp;

        }


    }


//--------------сортировка
    function UsersSecond () {

        var _this = this;
        var men = [];
        var women = [];
        var genderUsers = this.findUsers;
        this.men = men;
        this.women = women;
        byGender();

        // Сортировка по полам
        function byGender() {
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
        this.getterSettter = function (newUser) {

            if (arguments.length > 0) {
                addUser(newUser);
            }
            else if (arguments.length == 0) {

                return genderUsers;
            }
        };

        //сама добавка людей
        function addUser(newUser) {

            if (newUser.gender == male) {
                men.push(newUser);
            }
            else if (newUser.gender == female) {
                women.push(newUser);
            }
        }
        Users.apply(this, arguments);
    }
        //вывод на страницу
        function display() {

            var users = this.getterSettter();
            var ul;
            for (var i = 0; i < users.length; i++) {
                ul = createList(i);
                appendElement(ul, i);
            }

            function createList(i) {
                var ul;
                var li;
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

            function appendElement(ul, i) {
                var men1 = document.getElementById("Men");
                var women1 = document.getElementById("Women");
                var friendsUsers = document.getElementById("friendsUsers");
                if (users[i].gender == "male")
                    {
                        men1.appendChild(ul);
                    }
                else
                    {
                        women1.appendChild(ul);
                    }
                }
                if (!(i % 4)) {
                    ul = ul.cloneNode(true);
                    if (friendsUsers) {
                        friendsUsers.appendChild(ul);
                    }
                }
            }

function startUsers() {

    var UsersLink = "http://api.randomuser.me/?results=10";
    var start = new Users();
    UsersSecond.prototype = start;
    start.response(UsersLink);
    var usersSecond = new UsersSecond();
    display.prototype = usersSecond;
    var displayUsers = new display;
    }
    startUsers();