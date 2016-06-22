'use strict'
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
displayHobbies();	
})();