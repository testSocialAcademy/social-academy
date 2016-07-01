;
'use strict'
function displayHobbies() {

	var hobbies = ["Programming", "System Administration", "Electronics", "Modern Technologies", "Science", "Psychology", "Sport"];
	
	for (var i = 0; i <hobbies.length; i++) {
		var tagLi = document.createElement('li');
		tagLi.className = "hobbies_list-li";
		tagLi.innerHTML = hobbies[i];
		hobbiesList.appendChild(tagLi);		//hobbiesList == document.getElementById("hobbiesList");
	}

}

function displayNews() {
	
	var	req	= new XMLHttpRequest();
	req.open("GET",	"news/news.json", true);

	req.onreadystatechange = function() {
	if (req.readyState == 4) {
		if (req.status == 200) {			
			var responce = JSON.parse(req.responseText);

			var content = responce.responseData.entries;
			
			var tagLi = "", tagP = "", tagA = "";
						
			for (var i = 0; i < content.length; i++) {
				tagLi = document.createElement('li');
				tagLi.className = "news_list-block";
				newsList == document.getElementById("newsList");
				newsList.appendChild(tagLi);			//newsList == document.getElementById("newsList");
				
				if (content[i].title) {
					tagH3 = document.createElement('h3');
					tagH3.className = "news_list-block-title";
					tagH3.innerHTML = content[i].title;
					newsList.children[i].appendChild(tagH3);
				}
				
				
				if (content[i].contentSnippet) {
					tagP = document.createElement('p');
					tagP.className = "news_list-block-content";
					tagP.innerHTML = content[i].contentSnippet;
					newsList.children[i].appendChild(tagP);
				}
				
				if (content[i].link) {
					tagA = document.createElement('a');
					tagA.setAttribute('href', content[i].link);
					tagA.className = "news_list-block-anchor";
					tagA.innerHTML = content[i].link;
					newsList.children[i].appendChild(tagA);
				}
			}
			
		}

		else {
			alert(req.status + ": " + req.statusText);
		};
		
	}
	}
	req.send(null);	
}

function addNewItem() {
	/* Used for sort our items 
	var uniqueId = Date.now(); */
	
	var itemsList = document.getElementById("itemsList");
	var itemValue = document.getElementById("textForm").value;
	
	function alertMessage (str) {
		var listBlock = document.getElementById("toDoList");
		var tagDiv = document.createElement('div');
		tagDiv.className = "alert";
		tagDiv.innerHTML = str;

		listBlock.insertBefore(tagDiv, form);

		setTimeout(function() {
			listBlock.removeChild(tagDiv);
		}, 1500)
	}
	
	if (itemValue == "") {
		alertMessage ("Please insert Description!");	
	}
	else if (itemValue === localStorage.getItem(itemValue)) {
		alertMessage ("This item is already present! Please insert another Description");
	}
	else {
		var tagLi = document.createElement('li');
		tagLi.innerHTML = itemValue;
		tagLi.className = "todo-list-li";
		tagLi.setAttribute("onclick", "delItem(this);")
		itemsList.appendChild(tagLi);
		localStorage.setItem(itemValue, itemValue);
		document.getElementById("textForm").value = "";
	}	
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
		tagLi.setAttribute("onclick", "delItem(this);")
		itemsList.appendChild(tagLi);	
	}
}

displayHobbies();
displayNews();
displayItems();