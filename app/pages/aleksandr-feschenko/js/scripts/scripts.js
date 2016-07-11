;
'use strict';
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

function addNewItem() {
	/* Used for sort our items 
	var uniqueId = Date.now(); */
	
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

displayHobbies(setHobbies());
getNews("news/news.json");
displayItems();