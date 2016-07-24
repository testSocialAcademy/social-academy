;
'use strict';


function clearBlock(parentElem) {
	var block = document.getElementById(parentElem);
	block.innerHTML = '';
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
		if(hobbiesList) {
			hobbiesList.appendChild(tagLi);
		}
	}
}

/*==============================Hobbies Block END====================================================================*/

/*==============================News Block===========================================================================*/

function getNews(jsonFile) {
	var	req	= new XMLHttpRequest();
	req.open("GET",	jsonFile, true);

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var responce = JSON.parse(req.responseText);
				var content = responce.responseData.entries;
				return displayNews(content);
			}

			else {
				alert(req.status + ": " + req.statusText);
			}
		}
	};
	req.send(null);
}

function displayNews(arrNews) {
	var tagLi = {}, tagH3 = {}, tagP = {}, tagA = {};
	var newsList = document.getElementById("newsList");
	var hid = document.getElementById("males");
	var hid2 = document.getElementById("females");
	hid.style.display = "none";
	hid2.style.display = "none";
	newsList.style.display = "block";
	clearBlock("newsList");

	if(arrNews !== undefined && arrNews.length !== 0 && arrNews instanceof Array) {
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
	}
	else return false;
}

/*==============================News Block END======================================================================*/

/*==============================Items Block===========================================================================*/

function addNewItem() {
	
	var itemsList = document.getElementById("itemsList");
	var itemValue = document.getElementById("textForm").value;
	var listBlock = document.getElementById("toDoList");

	if (itemValue == "") {
		alertMessage ("Please insert Description!",listBlock,form);
	}
	else if (itemValue === localStorage.getItem(itemValue)) {
		alertMessage ("This item is already present! Please insert another Description",listBlock,form);
	}
	else if (localStorage.length >= 30) {
		alertMessage ("you can not add more than 30 items! Please clear previous items",listBlock,form);
	}
	else {
		var tagLi = document.createElement('li');
		tagLi.innerHTML = itemValue;
		tagLi.className = "todo-list-li";
		tagLi.setAttribute("onclick", "delItem(this);");
		itemsList.appendChild(tagLi);
		localStorage.setItem(itemValue, itemValue);
		document.getElementById("textForm").value = "";
	}	
}

function alertMessage (str, parentElement, nextSibling) {

	var tagDiv = document.createElement('div');
	tagDiv.className = "alert";
	tagDiv.innerHTML = str;

	parentElement.insertBefore(tagDiv, nextSibling);

	setTimeout(function() {
		parentElement.removeChild(tagDiv);
	}, 1500)
}

function delItem(clickedElem) {	
	localStorage.removeItem(clickedElem.innerHTML);
	itemsList.removeChild(clickedElem);	
}

function displayItems() {
	var itemsList = document.getElementById("itemsList");
	for (var i = 0; i <localStorage.length; i++) {
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
	var self = this;

	this.generateUsers = function (url) {
		var	req	= new XMLHttpRequest();
		req.open("GET",	url, false);

		req.onload = function() {
			var responce = JSON.parse(req.responseText);
			self._allUsers = responce.results;
		};
		req.onerror = function() {
			alert(req.status + ": " + req.statusText);
		};

		req.send(null);
	}
}

function SortedUsers(usersSource) {
	Users.apply(this,arguments);
	this._female = [];
	this._male = [];
	var self = this;

	this.sortUsersByGender = function () {
		var arrAllUsers = self._allUsers;
		if (arrAllUsers) {
			for (var i = 0; i < arrAllUsers.length; i++) {
				if (arrAllUsers[i].gender === 'female') {
					self._female.push(arrAllUsers[i]);
				}
				else if (arrAllUsers[i].gender === 'male') {
					self._male.push(arrAllUsers[i]);
				} else { console.log("Unknown gender detected!"); }
			}
		}
		else {
			throw new Error ("Empty users list. Please add their before using 'getSetUser(newUser)' or 'generateUsers(url)'");
		}
	};

	this.getSetUser = function (newUser) {
		if (arguments.length > 0) {
			addUser(newUser);
		} else if (arguments.length === 0 && self._allUsers === null) {
			throw new Error ("Empty users list. Please add their before using 'getSetUser(newUser)' ");
		} else {
			return {"female": self._female, "male": self._male};
		}
	};

	function addUser(objUser) {
		if(objUser.gender === 'female') {
			self._female.push(objUser);
		}
		else if(objUser.gender === 'male') {
			self._male.push(objUser);
		} else { console.log("Unknown gender detected!"); }
	}
}

function DisplayedUsers(usersSource) {
	SortedUsers.apply(this, arguments);
	var self = this;

	this.display = function () {
		var usersForDisplay = self.getSetUser();
		var tagLi = {}, tagH3 = {}, tagImg = {};
		var malesList = document.getElementById("males");
		var femalesList = document.getElementById("females");
		clearBlock("males");
		clearBlock("females");
		var hid = document.getElementById("newsList");
		hid.style.display = "none";
		malesList.style.display = "block";
		femalesList.style.display = "block";

		for (var i = 0; i < usersForDisplay.female.length; i++) {
			tagLi = document.createElement('li');
			tagLi.className = "some_peoples-block";
			femalesList.appendChild(tagLi);

			if(usersForDisplay.female[i].picture.thumbnail) {
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

			if(usersForDisplay.male[j].picture.thumbnail) {
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
	}

}

function diplayUsersOnPage() { 									//This function is handler of "Some Peoples" button
	var newUsers = new DisplayedUsers();
	newUsers.generateUsers("http://api.randomuser.me/?results=10");
	newUsers.sortUsersByGender();
	newUsers.display();
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