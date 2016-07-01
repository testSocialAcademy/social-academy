;
function displayHobbies() {

	var hobbies = ["Programming", "System Administration", "Electronics", "Modern Technologies", "Science", "Psychology", "Sport"];
	
	for (var i = 0; i <hobbies.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = hobbies[i];
		hobbiesList.appendChild(li);
	}

}
displayHobbies();