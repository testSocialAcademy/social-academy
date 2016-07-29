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
		}
		else if (tempArr[i] === " ") {
			//To next iteration
		}
		else {
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
	if(cooperativeBlock) {
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
		if(hobbiesList) {
			hobbiesList.appendChild(tagLi);
		}
	}
}

/*==============================Hobbies Block END====================================================================*/

/*==============================News Block===========================================================================*/

function getNews_af(jsonFile) {
	var	req	= new XMLHttpRequest();
	req.open("GET",	jsonFile, true);

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var responce = JSON.parse(req.responseText);
				var content = responce.responseData.entries;
				return displayNews_af(content);
			}

			else {
				alert(req.status + ": " + req.statusText);
			}
		}
	};
	req.send(null);
}

function displayNews_af(arrNews) {
	var tagLi = {}, tagH3 = {}, tagP = {}, tagA = {};
	var newsList = document.getElementById("newsList_af");
	if(newsList) {
		clearSiblings_af();
		newsList.style.display = "block";
	}
	if(arrNews !== undefined && arrNews.length !== 0 && arrNews instanceof Array) {
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
	}
	else return false;
}

/*==============================News Block END======================================================================*/

/*==============================Items Block===========================================================================*/

function addNewItem_af() {
	
	var itemsList = document.getElementById("itemsList_af");
	var itemValue = document.getElementById("textForm_af").value;
	var listBlock = document.getElementById("toDoList_af");
	var form = document.getElementById("form_af");

	if (itemValue == "") {
		alertMessage_af ("Please insert Description!",listBlock,form_af);
	}
	else if (itemValue === localStorage.getItem(itemValue)) {
		alertMessage_af ("This item is already present! Please insert another Description",listBlock,form);
	}
	else if (localStorage.length >= 30) {
		alertMessage_af ("you can not add more than 30 items! Please clear previous items",listBlock,form);
	}
	else {
		var tagLi = document.createElement('li');
		tagLi.innerHTML = itemValue;
		tagLi.className = "todo-list-li_af";
		tagLi.setAttribute("onclick", "delItem_af(this);");
		itemsList.appendChild(tagLi);
		localStorage.setItem(itemValue, itemValue);
		document.getElementById("textForm_af").value = "";
	}	
}

function alertMessage_af (str, parentElement, nextSibling) {

	var tagDiv = document.createElement('div');
	tagDiv.className = "alert_af";
	tagDiv.innerHTML = str;

	parentElement.insertBefore(tagDiv, nextSibling);

	setTimeout(function() {
		parentElement.removeChild(tagDiv);
	}, 1500)
}

function delItem_af(clickedElem) {
	var itemsList = document.getElementById("itemsList_af");
	localStorage.removeItem(clickedElem.innerHTML);
	itemsList.removeChild(clickedElem);
}

function displayItems_af() {
	var itemsList = document.getElementById("itemsList_af");
	for (var i = 0; i <localStorage.length; i++) {
		var tagLi = document.createElement('li');
		tagLi.innerHTML = localStorage.getItem(localStorage.key(i));
		tagLi.className = "todo-list-li_af";
		tagLi.setAttribute("onclick", "delItem_af(this);");
		itemsList.appendChild(tagLi);	
	}
}

/*==============================Items Block END======================================================================*/

/*==============================Users Block===========================================================================*/

function Users_af(usersSource) {
	this._allUsers = [];
}
Users_af.prototype = Object.create(Object.prototype);
Users_af.prototype.constructor = Users_af;

Users_af.prototype.generateUsers = function (url) {
	var self = this;
	var	req	= new XMLHttpRequest();
	req.open("GET",	url, true);

	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var responce = JSON.parse(req.responseText);
				self._allUsers = responce.results;
				callback_af();
			}

			else {
				alert(req.status + ": " + req.statusText);
			}
		}
	};
	req.send(null);
};

function SortedUsers_af(usersSource) {
	Users_af.apply(this,arguments);
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
			}
			else if (arrAllUsers[i].gender === 'male') {
				this._male.push(arrAllUsers[i]);
			} else { console.log("Unknown gender detected!"); }
		}
	}
	else {
		throw new Error ("Empty users list. Please add their before using 'getSetUser(newUser)' or 'generateUsers(url)'");
	}
};

SortedUsers_af.prototype.getSetUser = function (newUser) {
	var self = this;
	if (arguments.length > 0) {
		addUser(newUser);
	} else if (arguments.length === 0 && this._allUsers === null) {
		throw new Error ("Empty users list. Please add their before using 'getSetUser(newUser)' ");
	} else {
		return {"female": this._female, "male": this._male};
	}

	function addUser(objUser) {
		if(objUser.gender === 'female') {
			self._female.push(objUser);
		}
		else if(objUser.gender === 'male') {
			self._male.push(objUser);
		} else { console.log("Unknown gender detected!"); }
	}
};

function DisplayedUsers_af(usersSource) {
	SortedUsers_af.apply(this, arguments);
}

DisplayedUsers_af.prototype = Object.create(SortedUsers_af.prototype);
DisplayedUsers_af.prototype.constructor = DisplayedUsers_af;

DisplayedUsers_af.prototype.display = function () {
		var usersForDisplay = this.getSetUser();
		var tagLi = {}, tagH3 = {}, tagImg = {};
		var malesList = document.getElementById("males_af");
		var femalesList = document.getElementById("females_af");
		clearSiblings_af();
		malesList.style.display = "block";
		femalesList.style.display = "block";

		for (var i = 0; i < usersForDisplay.female.length; i++) {
			tagLi = document.createElement('li');
			tagLi.className = "some_peoples-block_af";
			femalesList.appendChild(tagLi);

			if(usersForDisplay.female[i].picture.medium) {
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

			if(usersForDisplay.male[j].picture.medium) {
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

function displayUsersOnPage_af() { 									//This function is handler of "Some Peoples" button
	var newUsers = new DisplayedUsers_af();
	newUsers.generateUsers("http://api.randomuser.me/?results=10");	//AJAX Respond will call function callback
//	console.dir(newUsers);

	window.callback_af = function () {
		newUsers.sortUsersByGender();
		newUsers.display();
	}
}

/*==============================Users Block END=======================================================================*/

/*==============================Initialization Page===================================================================*/
function initialStartMainPage_af() {
	displayHobbies_af(setHobbies_af());
	getNews_af("news/news.json");
	displayItems_af();
}

initialStartMainPage_af();

/*==============================Initialization Page End=============================================================*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Aleksandr Feschenko ES5 Script END//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////