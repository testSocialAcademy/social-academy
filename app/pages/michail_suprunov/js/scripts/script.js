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
	var hobbies = ["literature","bodybuilding","art","walking"];
	var pText = "Hobbies: ";
	for (var i = 0; i < hobbies.length; i++){
		pText += hobbies[i] + ", ";
	}
	pText = pText.slice(0,pText.length - 2);
	return pText;
}

//Functions for news
function displayNews () {
	var response = null;
	response = newsRequest();
	if (response != null) {
		putNewsOnPage(response);
	}
	else {
		return false;
	}
	
}

function newsRequest() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "news.json", false);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readeState != 4) return;
    };
		if(xhr.status != 200) {
			alert(xhr.status + ": " + xhr.statusText);
		} else {
			return xhr.responseText;
		}
}

function putNewsOnPage(responseText){
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
			}
			else if (key != "url") {
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
function addElementLSList () {
	var keyLS = document.getElementById("keyLS");
	var value = keyLS.value;
	var result = localStorage.getItem(value);
	if ((localStorage.length == 0 || result == null) && (value != "")){
		addElementLS();
		addElementList();
	}
	
	function addElementLS() {
		localStorage.setItem(value,value);
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


function removeLi(){	
	var _this = this;
	removeLiLS();
	removeLiPage();
	
	function removeLiLS () {
		localStorage.removeItem(_this.textContent);
	}
	
	function removeLiPage() {
		var listLS = document.getElementById("listLS");
		listLS.removeChild(_this);
	}
}

function displayLS () {
	var li = document.createElement("li");
	var value;
if (value) {value = document.getElementById("keyLS").value;}
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
	
	this.getUsers = function(usersSource) {
		var response;
		
		response = usersRequest(usersSource);
		if (typeof response != 'object') {
			alert('Didn"t get Users!');
		} else {
			_this._users = response;
		}
	};
	//get objectUsers
	function usersRequest(source) {
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;var xhr = new XHR();
		var responseObject;
		xhr.open('GET', source, false);
		xhr.onload = function() {
			responseObject = JSON.parse(this.responseText).results;
		};
		xhr.onerror = function() {
			alert( 'Ошибка ' + this.status );
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
	
	function sortUsers () {
		for (var i = 0; i < users.length; i++) {
			if (users[i].gender == 'male') {
				boys.push(users[i]);
			} else {
				girls.push(users[i]);
			}
		}
	}
	
	this.getSetUsers = function(newUser) {
		var response;
		
		if (arguments.length > 0) {
			addUser(newUser);
		} else if (arguments.length == 0 && users == null) {
			alert('No users. Add them!');
		} else if (arguments.length == 0 && users.length > 0) {
			response = boys.slice(0);
			for ( var i = 0; i<girls.length; i++) {
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

function DisplayUsers () {
	var users = this.getSetUsers();
	var div;
	for (var i = 0; i < users.length; i++) {
		div = formElement(i);
		appendElement(div,i);
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
		
	function appendElement(div,i) {
		var maleUsers = document.getElementById("maleUsers");
		var femaleUsers = document.getElementById("femaleUsers");
		var friendsUsers = document.getElementById("friendsUsers");
		if (users[i].gender == "male") {	
			if (maleUsers) {maleUsers.appendChild(div);}
		} else {
			if (femaleUsers) {femaleUsers.appendChild(div);}
		}
		if (!(i%4)) {
			div = div.cloneNode(true);
			if (friendsUsers) {friendsUsers.appendChild(div);}
		}
	}
}
//main body
function workWithUsers () {
var usersSource = "http://api.randomuser.me/?results=10";
var users = new Users();
SexUsers.prototype = users;
users.getUsers(usersSource);
var sexUsers = new SexUsers();
DisplayUsers.prototype = sexUsers;
var displayUsers = new DisplayUsers;
}

function workWithLS () {
var submitInputLS = document.getElementById("submitInputLS");
 if (submitInputLS) {submitInputLS.addEventListener("click",addElementLSList);}
displayLS();
}

workWithUsers();
workWithLS();
displayHobbies();
displayNews();
//})();