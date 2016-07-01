;'use strict';
(function(){
//Display hobbies	
function displayHobbies(){
	var hobbies = ["literature","bodybuilding","art","walking"];
	var div = document.getElementById("personal-data");
	var p = document.createElement('p');
	var pText = "Hobbies: ";
	for (var i = 0; i < hobbies.length; i++){
		pText += hobbies[i] + ", ";
	}
	pText = pText.slice(0,pText.length - 2);
	p.innerHTML = pText;
	div.appendChild(p);	
}
//Functions for news
function newsRequest() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "news.json", false);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readeState != 4) return;
    }	
		if(xhr.status != 200) {
			alert(xhr.status + ": " + xhr.statusText);	
		} else {
			newsDisplay(xhr.responseText);
		}
}

function newsDisplay(responseText){
	var response = JSON.parse(responseText);
	var news = response.responseData.entries;
	var column = document.getElementById("newsColumn");
	var div;
	var p;
	var obj;
	var a;
	for (var i = 0; i < news.length; i++) {
		div = document.createElement("div");
		obj = news[i];
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
		column.appendChild(div);
	}
}
//Work with Local Storage
function addElementLS () {
	var li = document.createElement("li");
	var keyLS = document.getElementById("keyLS");
	var value = keyLS.value;
	var listLS = document.getElementById("listLS");	
	var result = localStorage.getItem(value);
	if ((localStorage.length == 0 || result == null) && (value != "")){
		localStorage.setItem(value,value)
		li.textContent = value;
		li.onclick = removeLi;
		listLS.appendChild(li);
		keyLS.value = "";
	}
}

function removeLi(){	
	var listLS = document.getElementById("listLS");
	localStorage.removeItem(this.textContent);
	listLS.removeChild(this);
}

function displayLS () {
	var li = document.createElement("li");
	var value = document.getElementById("keyLS").value;
	var listLS = document.getElementById("listLS");
	for (var i = 0; i < localStorage.length; i++) {
		li.textContent = localStorage.key(i);
		li.onclick = removeLi;
		listLS.appendChild(li);
		li = document.createElement("li");
	}		
}
var submitInputLS = document.getElementById("submitInputLS");

submitInputLS.addEventListener("click",addElementLS);
displayLS();
displayHobbies();
newsRequest();	
})();