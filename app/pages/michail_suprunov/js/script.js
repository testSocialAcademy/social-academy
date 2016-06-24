;'use strict';
;(function(){
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
			a.innerHTML = obj[key];
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
displayHobbies();
newsRequest();	
})();