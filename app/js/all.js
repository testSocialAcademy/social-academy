'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

;
'use strict';

String.prototype.createPhone = function () {
	var tempArr = this.split('');
	for (var i = 0; i < tempArr.length; i++) {
		if (!isNaN(Number(tempArr[i]))) {
			throw new Error("This string contain not only numbers");
		} else if (i % 4 == 0) {
			tempArr.splice(i, 0, "-");
		}
	}
	tempArr.shift();
	return tempArr.join('');
};

function clearSiblings() {
	var cooperativeBlock = document.getElementById("cooperativeBlock");
	if (cooperativeBlock) {
		for (var i = 0; i < cooperativeBlock.children.length; i++) {
			cooperativeBlock.children[i].innerHTML = '';
			cooperativeBlock.children[i].style.display = "none";
		}
	}
}

/*==============================Hobbies Block========================================================================*/

function setHobbies() {
	var hobbies = ["Programming", "System Administration", "Electronics", "Modern Technologies", "Science", "Psychology", "Sport"];
	return hobbies;
}

function displayHobbies(arrHobbies) {
	var hobbiesList = document.getElementById('hobbiesList');
	for (var i = 0; i < arrHobbies.length; i++) {
		var tagLi = document.createElement('li');
		tagLi.className = "hobbies_list-li";
		tagLi.innerHTML = arrHobbies[i];
		if (hobbiesList) {
			hobbiesList.appendChild(tagLi);
		}
	}
}

/*==============================Hobbies Block END====================================================================*/

/*==============================News Block===========================================================================*/

function getNews(jsonFile) {
	var req = new XMLHttpRequest();
	req.open("GET", jsonFile, true);

	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var responce = JSON.parse(req.responseText);
				var content = responce.responseData.entries;
				return displayNews(content);
			} else {
				alert(req.status + ": " + req.statusText);
			}
		}
	};
	req.send(null);
}

function displayNews(arrNews) {
	var tagLi = {},
	    tagH3 = {},
	    tagP = {},
	    tagA = {};
	var newsList = document.getElementById("newsList");
	if (newsList) {
		clearSiblings();
		newsList.style.display = "block";
	}
	if (arrNews !== undefined && arrNews.length !== 0 && arrNews instanceof Array) {
		for (var i = 0; i < arrNews.length; i++) {
			tagLi = document.createElement('li');
			tagLi.className = "news_list-block";
			newsList.appendChild(tagLi);

			if (arrNews[i].title) {
				tagH3 = document.createElement('h3');
				tagH3.className = "news_list-block-title";
				tagH3.innerHTML = arrNews[i].title;
				newsList.children[i].appendChild(tagH3);
			}

			if (arrNews[i].contentSnippet) {
				tagP = document.createElement('p');
				tagP.className = "news_list-block-content";
				tagP.innerHTML = arrNews[i].contentSnippet;
				newsList.children[i].appendChild(tagP);
			}

			if (arrNews[i].link) {
				tagA = document.createElement('a');
				tagA.setAttribute('href', arrNews[i].link);
				tagA.className = "news_list-block-anchor";
				tagA.innerHTML = arrNews[i].link;
				newsList.children[i].appendChild(tagA);
			}
		}
	} else return false;
}

/*==============================News Block END======================================================================*/

/*==============================Items Block===========================================================================*/

function addNewItem() {

	var itemsList = document.getElementById("itemsList");
	var itemValue = document.getElementById("textForm").value;
	var listBlock = document.getElementById("toDoList");

	if (itemValue == "") {
		alertMessage("Please insert Description!", listBlock, form);
	} else if (itemValue === localStorage.getItem(itemValue)) {
		alertMessage("This item is already present! Please insert another Description", listBlock, form);
	} else if (localStorage.length >= 30) {
		alertMessage("you can not add more than 30 items! Please clear previous items", listBlock, form);
	} else {
		var tagLi = document.createElement('li');
		tagLi.innerHTML = itemValue;
		tagLi.className = "todo-list-li";
		tagLi.setAttribute("onclick", "delItem(this);");
		itemsList.appendChild(tagLi);
		localStorage.setItem(itemValue, itemValue);
		document.getElementById("textForm").value = "";
	}
}

function alertMessage(str, parentElement, nextSibling) {

	var tagDiv = document.createElement('div');
	tagDiv.className = "alert";
	tagDiv.innerHTML = str;

	parentElement.insertBefore(tagDiv, nextSibling);

	setTimeout(function () {
		parentElement.removeChild(tagDiv);
	}, 1500);
}

function delItem(clickedElem) {
	localStorage.removeItem(clickedElem.innerHTML);
	itemsList.removeChild(clickedElem);
}

function displayItems() {
	var itemsList = document.getElementById("itemsList");
	for (var i = 0; i < localStorage.length; i++) {
		var tagLi = document.createElement('li');
		tagLi.innerHTML = localStorage.getItem(localStorage.key(i));
		tagLi.className = "todo-list-li";
		tagLi.setAttribute("onclick", "delItem(this);");
		itemsList.appendChild(tagLi);
	}
}

/*==============================Items Block END======================================================================*/

/*==============================Users Block===========================================================================*/

function Users(usersSource) {
	this._allUsers = null;
}
Users.prototype = Object.create(Object.prototype);
Users.prototype.constructor = Users;

Users.prototype.generateUsers = function (url) {
	var self = this;
	var req = new XMLHttpRequest();
	req.open("GET", url, true);

	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var responce = JSON.parse(req.responseText);
				self._allUsers = responce.results;
				callback();
			} else {
				alert(req.status + ": " + req.statusText);
			}
		}
	};
	req.send(null);
};

function SortedUsers(usersSource) {
	Users.apply(this, arguments);
	this._female = [];
	this._male = [];
}

SortedUsers.prototype = Object.create(Users.prototype);
SortedUsers.prototype.constructor = SortedUsers;

SortedUsers.prototype.sortUsersByGender = function () {
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

SortedUsers.prototype.getSetUser = function (newUser) {
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

function DisplayedUsers(usersSource) {
	SortedUsers.apply(this, arguments);
}

DisplayedUsers.prototype = Object.create(SortedUsers.prototype);
DisplayedUsers.prototype.constructor = DisplayedUsers;

DisplayedUsers.prototype.display = function () {
	var usersForDisplay = this.getSetUser();
	var tagLi = {},
	    tagH3 = {},
	    tagImg = {};
	var malesList = document.getElementById("males");
	var femalesList = document.getElementById("females");
	clearSiblings();
	malesList.style.display = "block";
	femalesList.style.display = "block";

	for (var i = 0; i < usersForDisplay.female.length; i++) {
		tagLi = document.createElement('li');
		tagLi.className = "some_peoples-block";
		femalesList.appendChild(tagLi);

		if (usersForDisplay.female[i].picture.thumbnail) {
			tagImg = document.createElement('img');
			tagImg.className = "some_peoples-block-photo";
			tagImg.setAttribute("src", usersForDisplay.female[i].picture.thumbnail);
			femalesList.children[i].appendChild(tagImg);
		}

		if (usersForDisplay.female[i].name.first) {
			tagH3 = document.createElement('h3');
			tagH3.className = "some_peoples-block-title";
			tagH3.innerHTML = usersForDisplay.female[i].name.first + " " + usersForDisplay.female[i].name.last;
			femalesList.children[i].appendChild(tagH3);
		}
	}
	for (var j = 0; j < usersForDisplay.male.length; j++) {
		tagLi = document.createElement('li');
		tagLi.className = "some_peoples-block";
		malesList.appendChild(tagLi);

		if (usersForDisplay.male[j].picture.thumbnail) {
			tagImg = document.createElement('img');
			tagImg.className = "some_peoples-block-photo";
			tagImg.setAttribute("src", usersForDisplay.male[j].picture.thumbnail);
			malesList.children[j].appendChild(tagImg);
		}

		if (usersForDisplay.male[j].name.first) {
			tagH3 = document.createElement('h3');
			tagH3.className = "some_peoples-block-title";
			tagH3.innerHTML = usersForDisplay.male[j].name.first + " " + usersForDisplay.male[j].name.last;
			malesList.children[j].appendChild(tagH3);
		}
	}
};

function displayUsersOnPage() {
	//This function is handler of "Some Peoples" button
	var newUsers = new DisplayedUsers();
	newUsers.generateUsers("http://api.randomuser.me/?results=10"); //AJAX Respond will call function callback
	console.dir(newUsers);

	window.callback = function () {
		newUsers.sortUsersByGender();
		newUsers.display();
	};
}

/*==============================Users Block END=======================================================================*/

/*==============================Initialization Page===================================================================*/
function initialStart() {
	displayHobbies(setHobbies());
	getNews("news/news.json");
	displayItems();
}

initialStart();

/*==============================Initialization Page End=============================================================*/

'use strict';
//Homework 5
function loadNews() {
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
			newsDisplay(respText);
			return respText;
		}
	};
	return respText;
}
loadNews();

function newsDisplay(respText) {
	var newLi;
	var resp = JSON.parse(respText);
	var blokNews = resp.responseData.entries;
	var list = document.getElementById('news');
	var i;
	for (i = 0; i < blokNews.length; i++) {
		var ul = document.createElement('ul');
		list.appendChild(ul);
	}
	for (i = 0; i < blokNews.length; i++) {
		if (blokNews[i].title) {
			newLi = document.createElement('h4');
			newLi.innerHTML = blokNews[i].title;
			list.children[i].appendChild(newLi);
		}
	}
	for (i = 0; i < blokNews.length; i++) {
		if (blokNews[i].contentSnippet) {
			newLi = document.createElement('p');
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
//Homework4
// basic information hidden
function hiddenBasInfo() {
	var title = document.getElementById('title');
	var list = document.getElementById('list');
	if (!list.style.display || list.style.display == "block") {
		list.style.display = "none";
	} else {
		list.style.display = "block";
	}
}

//add hobby list
function getHobby() {
	var hobby = ["Компьютеры", "Программирование", "Web-дизайн", "IT", "Спорт", "Автомобили", "Мотоциклы"];
	return hobby;
}
getHobby();

function addHobby() {
	var ul = document.getElementById("hobbyList");
	var readyHobby = new getHobby();
	for (var i = 0; i < readyHobby.length; i++) {
		var li = document.createElement("li");
		li.innerHTML = readyHobby[i];
		if (ul) {
			ul.appendChild(li);
		}
	}
}
addHobby();

//Hobby hidden onclick
function hiddenHobby() {
	var ul = document.getElementById("hobbyList");
	if (!ul.style.display || ul.style.display == "block") {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
}
//Homework 6
//add li in 'to do list' and local Storage
function addLiTodoLS() {
	var ulList = document.getElementById('listToDo');
	var info = document.getElementById('todo').value;
	var Li = document.createElement('li');
	Li.addEventListener('click', deleteLi);
	Li.innerHTML = info;
	ulList.appendChild(Li);
	localStorage.setItem(info, info);
}

//delete newLi with 'to do list'
function deleteLi() {
	var ulList = document.getElementById('listToDo');
	ulList.removeChild(this);
	localStorage.removeItem(this.textContent);
}

//recovery with LS
function getLiWithLS() {
	for (var i = 0; i < localStorage.length; i++) {
		var newUlList = document.getElementById('listToDo');
		var newInfo = localStorage.getItem(localStorage.key(i));
		var newLi = document.createElement('li');
		newLi.addEventListener('click', deleteNewLi);
		newLi.innerHTML = newInfo;
		newUlList.appendChild(newLi);
	}
}
getLiWithLS();

//delete newLi with local Storage onclick
function deleteNewLi() {
	var newUlList = document.getElementById('listToDo');
	newUlList.removeChild(this);
	localStorage.removeItem(this.textContent);
}

//////////////////   Homework 8  //////////////////////////


function Users() {
	var _this = this;
	this._users = {};
	this.male = {};
	this.female = {};

	this.userRequest = function (link) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', link, true);

		xhr.onload = function () {
			var responce = JSON.parse(xhr.responseText);
			_this._users = responce.results;
			NewUsers.responseRequest(responce.results);
		};

		xhr.onerror = function () {
			alert(xhr.status + ": " + xhr.statusText);
		};

		xhr.send();
	};
}

var NewUsers = new Users();
NewUsers.userRequest('http://api.randomuser.me/?results=10');

NewUsers.responseRequest = function (responce) {
	var self = this;
	NewUsers._users = responce;
	NewUsers.male = {};
	NewUsers.female = {};

	function sortUsers() {
		for (var i = 0; i < NewUsers._users.length; i++) {
			if (NewUsers._users[i].gender == "female") {
				NewUsers.female[i] = NewUsers._users[i];
			} else if (NewUsers._users[i].gender == "male") {
				NewUsers.male[i] = NewUsers._users[i];
			}
		}
	}
	sortUsers();

	this.getSetUsers = function (addNewUser) {
		if (arguments.length > 0) {
			addUser(addNewUser);
		} else if (arguments.length === 0 && self._allUsers === null) {
			throw new Error("Please add new user ");
		} else {
			return { "female": NewUsers.female, "male": NewUsers.male };
		}
	};

	function addUser(addNewUser) {
		if (addNewUser.gender === 'female') {
			NewUsers.female.push(addNewUser);
		} else if (addNewUser.gender === 'male') {
			NewUsers.male.push(addNewUser);
		} else {
			console.log("Unknown gender!");
		}
	}

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
	}
	usersOnDisplay();
};

function pow(a, b) {

	var ab = a;
	var ac = b;
	return ab + ac;
}

var awdawd = 23;

;'use strict';
//(function(){
//Display hobbies	
function displayHobbies() {
	var div = document.getElementById("personal-data");
	var pText;
	var p = document.createElement('p');
	pText = formHobbies();
	p.innerHTML = pText;
	if (div) {
		div.appendChild(p);
	}
	return 1;
}
function formHobbies() {
	var hobbies = ["literature", "bodybuilding", "art", "walking"];
	var pText = "Hobbies: ";
	for (var i = 0; i < hobbies.length; i++) {
		pText += hobbies[i] + ", ";
	}
	pText = pText.slice(0, pText.length - 2);
	return pText;
}

//Functions for news
function displayNews() {
	var response = null;
	response = newsRequest();
	if (response != null) {
		putNewsOnPage(response);
	} else {
		return false;
	}
}

function newsRequest() {
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

function putNewsOnPage(responseText) {
	var response = JSON.parse(responseText);
	var news = response.responseData.entries;
	var column = document.getElementById("newsColumn");
	var div;
	var obj;
	for (var i = 0; i < news.length; i++) {
		obj = news[i];
		div = formElement();
		column.appendChild(div);
	}

	function formElement() {
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
function addElementLSList() {
	var keyLS = document.getElementById("keyLS");
	var value = keyLS.value;
	var result = localStorage.getItem(value);
	if ((localStorage.length == 0 || result == null) && value != "") {
		addElementLS();
		addElementList();
	}

	function addElementLS() {
		localStorage.setItem(value, value);
	}

	function addElementList() {
		var li = document.createElement("li");
		var listLS = document.getElementById("listLS");
		li.textContent = value;
		li.onclick = removeLi;
		listLS.appendChild(li);
		keyLS.value = "";
		return "very nice";
	}
}

function removeLi() {
	var _this = this;
	removeLiLS();
	removeLiPage();

	function removeLiLS() {
		localStorage.removeItem(_this.textContent);
	}

	function removeLiPage() {
		var listLS = document.getElementById("listLS");
		listLS.removeChild(_this);
	}
}

function displayLS() {
	var li = document.createElement("li");
	var value;
	if (value) {
		value = document.getElementById("keyLS").value;
	}
	var listLS = document.getElementById("listLS");
	for (var i = 0; i < localStorage.length; i++) {
		li.textContent = localStorage.key(i);
		li.onclick = removeLi;
		listLS.appendChild(li);
		li = document.createElement("li");
	}
}
// Work with Users
function Users() {
	var _this = this;
	this._users = null;

	this.getUsers = function (usersSource) {
		var response;

		response = usersRequest(usersSource);
		if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) != 'object') {
			alert('Didn"t get Users!');
		} else {
			_this._users = response;
		}
	};
	//get objectUsers
	function usersRequest(source) {
		var XHR = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;var xhr = new XHR();
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
	}
}

function SexUsers() {
	var girls = [];
	var boys = [];
	var users = this._users;
	var _this = this;
	sortUsers();

	function sortUsers() {
		for (var i = 0; i < users.length; i++) {
			if (users[i].gender == 'male') {
				boys.push(users[i]);
			} else {
				girls.push(users[i]);
			}
		}
	}

	this.getSetUsers = function (newUser) {
		var response;

		if (arguments.length > 0) {
			addUser(newUser);
		} else if (arguments.length == 0 && users == null) {
			alert('No users. Add them!');
		} else if (arguments.length == 0 && users.length > 0) {
			response = boys.slice(0);
			for (var i = 0; i < girls.length; i++) {
				response.push(girls[i]);
			}
			return response;
		}
	};

	function addUser(newUser) {
		users.push(newUser);
		if (newUser.gender == 'male') {
			boys.push(newUser);
		} else {
			girls.push(newUser);
		}
	}
}

function DisplayUsers() {
	var users = this.getSetUsers();
	var div;
	for (var i = 0; i < users.length; i++) {
		div = formElement(i);
		appendElement(div, i);
	}

	function formElement(i) {
		var div;
		var img;
		var p;
		div = document.createElement("div");
		img = document.createElement("img");
		p = document.createElement("p");
		img.className = "img-responsive userImage";
		img.src = users[i].picture.large;
		p.textContent = users[i].name.first + " " + users[i].name.last;
		div.appendChild(img);
		div.appendChild(p);
		return div;
	}

	function appendElement(div, i) {
		var maleUsers = document.getElementById("maleUsers");
		var femaleUsers = document.getElementById("femaleUsers");
		var friendsUsers = document.getElementById("friendsUsers");
		if (users[i].gender == "male") {
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
	}
}
//main body
function workWithUsers() {
	var usersSource = "http://api.randomuser.me/?results=10";
	var users = new Users();
	SexUsers.prototype = users;
	users.getUsers(usersSource);
	var sexUsers = new SexUsers();
	DisplayUsers.prototype = sexUsers;
	var displayUsers = new DisplayUsers();
}

function workWithLS() {
	var submitInputLS = document.getElementById("submitInputLS");
	if (submitInputLS) {
		submitInputLS.addEventListener("click", addElementLSList);
	}
	displayLS();
}

workWithUsers();
workWithLS();
displayHobbies();
displayNews();
//})();